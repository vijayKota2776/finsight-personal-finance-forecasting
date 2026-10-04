import pandas as pd
import numpy as np
import os

def load_and_clean_data(filepath):
    print("Loading raw dataset...")
    df = pd.read_csv(filepath)
    
    # Standardize column names
    df.columns = [col.lower().replace(' ', '_') for col in df.columns]
    
    # Convert date to datetime
    df['date'] = pd.to_datetime(df['date'])
    
    # Ensure amount is absolute and float
    df['amount'] = df['amount'].abs()
    
    return df

def aggregate_monthly(df):
    print("Aggregating data to monthly level...")
    # Add YearMonth column for grouping
    df['year_month'] = df['date'].dt.to_period('M')
    
    # Separate income and expenses
    income_df = df[df['type'] == 'Income'].groupby('year_month')['amount'].sum().reset_index(name='income')
    expense_df = df[df['type'] == 'Expense'].groupby('year_month')['amount'].sum().reset_index(name='expense')
    
    # Merge them
    monthly_df = pd.merge(income_df, expense_df, on='year_month', how='outer').fillna(0)
    
    # Also get category-wise monthly expenses to add more context
    cat_expense = df[df['type'] == 'Expense'].groupby(['year_month', 'category'])['amount'].sum().unstack(fill_value=0)
    cat_expense.columns = [f"cat_{c.lower().replace(' & ', '_').replace(' ', '_')}" for c in cat_expense.columns]
    cat_expense = cat_expense.reset_index()
    
    # Merge category expenses
    monthly_df = pd.merge(monthly_df, cat_expense, on='year_month', how='left').fillna(0)
    
    # Sort chronologically
    monthly_df = monthly_df.sort_values('year_month').reset_index(drop=True)
    return monthly_df

def engineer_features(df):
    print("Engineering time-series features (Lags, Rolling Averages)...")
    
    # Financial Ratios
    df['savings'] = df['income'] - df['expense']
    df['expense_ratio'] = np.where(df['income'] > 0, df['expense'] / df['income'], 0)
    df['savings_rate'] = np.where(df['income'] > 0, df['savings'] / df['income'], 0)
    
    # Lag Features (Past information)
    df['previous_expense'] = df['expense'].shift(1)
    df['previous_income'] = df['income'].shift(1)
    
    # Rolling Features (3-month rolling averages of PAST data)
    # We use shift(1) before rolling to ensure no data leakage from the current month
    df['rolling_3m_expense'] = df['expense'].shift(1).rolling(window=3, min_periods=1).mean()
    df['rolling_3m_income'] = df['income'].shift(1).rolling(window=3, min_periods=1).mean()
    
    # Expense Growth (Compared to previous month)
    df['expense_growth'] = (df['expense'] - df['previous_expense']) / (df['previous_expense'] + 1e-5)
    
    # Target Variable: Next Month's Expense
    # We shift expense backwards by 1 to represent the "future" expense for the current row
    df['target_expense'] = df['expense'].shift(-1)
    
    # Drop rows with NaN (the first few rows due to lagging, and the last row due to target shifting)
    df = df.dropna().reset_index(drop=True)
    
    return df

if __name__ == "__main__":
    input_path = os.path.join("data", "Personal_Finance_Dataset.csv")
    output_path = os.path.join("data", "monthly_features.csv")
    
    if not os.path.exists(input_path):
        print(f"Error: Could not find {input_path}")
        exit(1)
        
    # 1. Load and Clean
    df_raw = load_and_clean_data(input_path)
    
    # 2. Aggregate
    df_monthly = aggregate_monthly(df_raw)
    
    # 3. Engineer Features
    df_features = engineer_features(df_monthly)
    
    # Save the processed dataset
    # Convert Period to string for saving
    df_features['year_month'] = df_features['year_month'].astype(str)
    
    df_features.to_csv(output_path, index=False)
    
    print(f"Preprocessing complete! Dataset reduced to {len(df_features)} months of training data.")
    print(f"Saved modeling dataset to: {output_path}")
    
    # Display the first few rows of the final dataset to verify
    print("\nSample of final dataset:")
    print(df_features[['year_month', 'income', 'expense', 'previous_expense', 'rolling_3m_expense', 'target_expense']].head())

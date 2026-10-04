import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta
import os

# Set random seed for reproducibility
np.random.seed(42)
random.seed(42)

NUM_USERS = 50
DAYS_OF_HISTORY = 365 * 3  # 3 years of data

# Define categories
EXPENSE_CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Healthcare']
INCOME_CATEGORIES = ['Salary', 'Freelance']

# Define user personas
PERSONAS = {
    'frugal': {
        'income_range': (30000, 60000),
        'spend_ratios': {'Food': 0.15, 'Transport': 0.05, 'Shopping': 0.05, 'Bills': 0.20, 'Entertainment': 0.05, 'Healthcare': 0.05},
        'savings_target': 0.45
    },
    'spender': {
        'income_range': (50000, 100000),
        'spend_ratios': {'Food': 0.20, 'Transport': 0.10, 'Shopping': 0.30, 'Bills': 0.20, 'Entertainment': 0.15, 'Healthcare': 0.05},
        'savings_target': 0.0
    },
    'balanced': {
        'income_range': (40000, 80000),
        'spend_ratios': {'Food': 0.20, 'Transport': 0.10, 'Shopping': 0.15, 'Bills': 0.20, 'Entertainment': 0.10, 'Healthcare': 0.05},
        'savings_target': 0.20
    }
}

def generate_user_profiles(num_users):
    users = []
    for uid in range(1, num_users + 1):
        persona_name = random.choice(list(PERSONAS.keys()))
        persona = PERSONAS[persona_name]
        monthly_income = random.randint(persona['income_range'][0], persona['income_range'][1])
        users.append({
            'user_id': uid,
            'persona': persona_name,
            'monthly_income': monthly_income,
            'spend_ratios': persona['spend_ratios']
        })
    return users

def generate_transactions(users, start_date, num_days):
    transactions = []
    
    for user in users:
        current_date = start_date
        
        # We will generate daily transactions
        for day in range(num_days):
            # 1. Income (happens on 1st of month)
            if current_date.day == 1:
                transactions.append({
                    'user_id': user['user_id'],
                    'date': current_date,
                    'transaction_type': 'Income',
                    'category': 'Salary',
                    'amount': user['monthly_income']
                })
            
            # 2. Daily Expenses
            # Decide if there is a transaction today (e.g., 70% chance)
            if random.random() < 0.7:
                # Pick a random category weighted slightly by their persona ratios
                # For simplicity, we just pick a category and scale amount by their monthly income and ratio
                cat = random.choice(EXPENSE_CATEGORIES)
                
                # Base expected monthly spend for this category
                expected_monthly_spend = user['monthly_income'] * user['spend_ratios'][cat]
                
                # Daily average spend roughly
                daily_base = expected_monthly_spend / 30.0
                
                # Add some noise (exponential distribution works well for transaction sizes)
                amount = np.random.exponential(scale=daily_base * 1.5)
                
                # Seasonality: Higher shopping in Nov/Dec
                if cat == 'Shopping' and current_date.month in [11, 12]:
                    amount *= 1.5
                
                # Anomaly: 1% chance of a huge medical or car bill
                if random.random() < 0.01 and cat in ['Healthcare', 'Transport']:
                    amount *= 5.0
                    
                if amount > 50:  # Ignore micro-transactions below 50 INR
                    transactions.append({
                        'user_id': user['user_id'],
                        'date': current_date,
                        'transaction_type': 'Expense',
                        'category': cat,
                        'amount': round(amount, 2)
                    })
                    
            current_date += timedelta(days=1)
            
    return pd.DataFrame(transactions)

if __name__ == "__main__":
    print("Generating user profiles...")
    users = generate_user_profiles(NUM_USERS)
    
    end_date = datetime.now()
    start_date = end_date - timedelta(days=DAYS_OF_HISTORY)
    
    print(f"Generating transactions from {start_date.date()} to {end_date.date()}...")
    df_transactions = generate_transactions(users, start_date, DAYS_OF_HISTORY)
    
    # Sort by date
    df_transactions = df_transactions.sort_values(by=['user_id', 'date']).reset_index(drop=True)
    
    output_path = os.path.join("data", "raw_transactions.csv")
    df_transactions.to_csv(output_path, index=False)
    print(f"Generated {len(df_transactions)} transactions.")
    print(f"Data saved to {output_path}")

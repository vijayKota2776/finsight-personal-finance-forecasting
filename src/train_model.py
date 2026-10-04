import pandas as pd
import numpy as np
import os
import joblib
from sklearn.model_selection import TimeSeriesSplit
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import warnings
warnings.filterwarnings('ignore')

def load_data(filepath):
    print("Loading preprocessed dataset...")
    df = pd.read_csv(filepath)
    # Drop 'year_month' as it's not a numerical feature for the model
    # but we assume the data is already sorted chronologically
    df_modeling = df.drop(columns=['year_month'])
    return df_modeling

def evaluate_model(model, X, y, n_splits=5):
    """Evaluates the model using TimeSeries Cross-Validation"""
    tscv = TimeSeriesSplit(n_splits=n_splits)
    
    mae_scores = []
    rmse_scores = []
    r2_scores = []
    
    for train_index, test_index in tscv.split(X):
        X_train, X_test = X.iloc[train_index], X.iloc[test_index]
        y_train, y_test = y.iloc[train_index], y.iloc[test_index]
        
        model.fit(X_train, y_train)
        predictions = model.predict(X_test)
        
        mae_scores.append(mean_absolute_error(y_test, predictions))
        rmse_scores.append(np.sqrt(mean_squared_error(y_test, predictions)))
        r2_scores.append(r2_score(y_test, predictions))
        
    return {
        'MAE': np.mean(mae_scores),
        'RMSE': np.mean(rmse_scores),
        'R2': np.mean(r2_scores)
    }

if __name__ == "__main__":
    input_path = os.path.join("data", "monthly_features.csv")
    model_dir = "models"
    
    if not os.path.exists(model_dir):
        os.makedirs(model_dir)
        
    df = load_data(input_path)
    
    # Define features and target
    target_col = 'target_expense'
    X = df.drop(columns=[target_col])
    y = df[target_col]
    
    print(f"Dataset shape: {X.shape}")
    print(f"Features being used: {list(X.columns)}\n")
    
    # 1. Baseline Model: Linear Regression
    print("--- Training Linear Regression (Baseline) ---")
    lr_model = LinearRegression()
    lr_metrics = evaluate_model(lr_model, X, y)
    print(f"Average MAE:  ${lr_metrics['MAE']:.2f}")
    print(f"Average RMSE: ${lr_metrics['RMSE']:.2f}")
    print(f"Average R2:   {lr_metrics['R2']:.4f}\n")
    
    # 2. Advanced Model: Random Forest Regressor
    print("--- Training Random Forest Regressor ---")
    rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
    rf_metrics = evaluate_model(rf_model, X, y)
    print(f"Average MAE:  ${rf_metrics['MAE']:.2f}")
    print(f"Average RMSE: ${rf_metrics['RMSE']:.2f}")
    print(f"Average R2:   {rf_metrics['R2']:.4f}\n")
    
    # Train the final model on the ENTIRE dataset so it's ready for future predictions
    print("Training final Random Forest model on all available data...")
    final_rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
    final_rf_model.fit(X, y)
    
    # Save the model
    model_path = os.path.join(model_dir, "rf_forecasting_model.pkl")
    joblib.dump(final_rf_model, model_path)
    
    # Also save the list of feature names so the Streamlit app knows the exact expected input format
    features_path = os.path.join(model_dir, "feature_names.pkl")
    joblib.dump(list(X.columns), features_path)
    
    print(f"Final model saved to {model_path}")
    print(f"Feature names saved to {features_path}")

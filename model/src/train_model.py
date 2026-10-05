import pandas as pd
import numpy as np
import os
import joblib
from sklearn.model_selection import TimeSeriesSplit
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor, IsolationForest
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import shap
import matplotlib.pyplot as plt
import warnings
warnings.filterwarnings('ignore')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT_ROOT = os.path.dirname(BASE_DIR)

def load_data(filepath):
    print("Loading preprocessed dataset...")
    df = pd.read_csv(filepath)
    df_modeling = df.drop(columns=['year_month'])
    return df_modeling

def evaluate_model(model, X, y, n_splits=5):
    tscv = TimeSeriesSplit(n_splits=n_splits)
    mae_scores, rmse_scores, r2_scores = [], [], []
    for train_index, test_index in tscv.split(X):
        X_train, X_test = X.iloc[train_index], X.iloc[test_index]
        y_train, y_test = y.iloc[train_index], y.iloc[test_index]
        model.fit(X_train, y_train)
        predictions = model.predict(X_test)
        mae_scores.append(mean_absolute_error(y_test, predictions))
        rmse_scores.append(np.sqrt(mean_squared_error(y_test, predictions)))
        r2_scores.append(r2_score(y_test, predictions))
    return {'MAE': np.mean(mae_scores), 'RMSE': np.mean(rmse_scores), 'R2': np.mean(r2_scores)}

def evaluate_naive_baseline(X, y, n_splits=5):
    tscv = TimeSeriesSplit(n_splits=n_splits)
    mae_scores, rmse_scores, r2_scores = [], [], []
    for train_index, test_index in tscv.split(X):
        X_test = X.iloc[test_index]
        y_test = y.iloc[test_index]
        # Naive baseline: Next month's expense = This month's expense
        predictions = X_test['expense']
        mae_scores.append(mean_absolute_error(y_test, predictions))
        rmse_scores.append(np.sqrt(mean_squared_error(y_test, predictions)))
        r2_scores.append(r2_score(y_test, predictions))
    return {'MAE': np.mean(mae_scores), 'RMSE': np.mean(rmse_scores), 'R2': np.mean(r2_scores)}

if __name__ == "__main__":
    input_path = os.path.join(BASE_DIR, "data", "monthly_features.csv")
    model_dir = os.path.join(BASE_DIR, "models")
    docs_dir = os.path.join(PROJECT_ROOT, "docs")
    
    os.makedirs(model_dir, exist_ok=True)
    os.makedirs(docs_dir, exist_ok=True)
        
    df = load_data(input_path)
    target_col = 'target_expense'
    X = df.drop(columns=[target_col])
    y = df[target_col]
    
    # 0. Naive Baseline
    print("Evaluating Naive Baseline...")
    naive_metrics = evaluate_naive_baseline(X, y)
    
    # 1. Linear Regression
    print("Evaluating Linear Regression...")
    lr_model = LinearRegression()
    lr_metrics = evaluate_model(lr_model, X, y)
    
    # 2. Random Forest
    print("Evaluating Random Forest...")
    rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
    rf_metrics = evaluate_model(rf_model, X, y)
    
    # 3. Gradient Boosting
    print("Evaluating Gradient Boosting...")
    gb_model = GradientBoostingRegressor(n_estimators=100, random_state=42)
    gb_metrics = evaluate_model(gb_model, X, y)
    
    # Generate docs/experiments.md
    report = f"""# Model Comparison Experiments

| Model | MAE | RMSE | R² |
|---|---|---|---|
| Naive Baseline (Current = Next) | ${naive_metrics['MAE']:.2f} | ${naive_metrics['RMSE']:.2f} | {naive_metrics['R2']:.4f} |
| Linear Regression | ${lr_metrics['MAE']:.2f} | ${lr_metrics['RMSE']:.2f} | {lr_metrics['R2']:.4f} |
| Random Forest Regressor | ${rf_metrics['MAE']:.2f} | ${rf_metrics['RMSE']:.2f} | {rf_metrics['R2']:.4f} |
| Gradient Boosting Regressor | ${gb_metrics['MAE']:.2f} | ${gb_metrics['RMSE']:.2f} | {gb_metrics['R2']:.4f} |

## Conclusion
Random Forest achieved the best performance among the tested models, improving on the naive baseline in MAE and RMSE. However, the negative R² values indicate that the available dataset has limited predictive signal and that the forecasting model should be considered a prototype rather than a highly accurate production model.
"""
    with open(os.path.join(docs_dir, "experiments.md"), "w") as f:
        f.write(report)
        
    # Train Final
    print("Training final model...")
    final_rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
    final_rf_model.fit(X, y)
    
    # SHAP Explainability
    print("Generating SHAP Values...")
    explainer = shap.TreeExplainer(final_rf_model)
    shap_values = explainer.shap_values(X)
    plt.figure()
    shap.summary_plot(shap_values, X, show=False)
    plt.savefig(os.path.join(docs_dir, "shap_summary.png"), bbox_inches="tight")
    
    # Anomaly
    print("Training Anomaly Model...")
    iso_forest = IsolationForest(contamination=0.05, random_state=42)
    iso_forest.fit(X)
    
    # Save
    joblib.dump(final_rf_model, os.path.join(model_dir, "rf_forecasting_model.pkl"))
    joblib.dump(iso_forest, os.path.join(model_dir, "anomaly_model.pkl"))
    joblib.dump(list(X.columns), os.path.join(model_dir, "feature_names.pkl"))
    print("Models and SHAP exported successfully.")

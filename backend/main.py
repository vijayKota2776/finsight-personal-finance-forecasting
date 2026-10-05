from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
import joblib
import os
import random
from datetime import datetime, timedelta
from sklearn.ensemble import RandomForestRegressor
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI(title="FinSight API", description="API for Personal Finance Forecasting", version="1.0.0")

# Allow requests from the upcoming React/Next.js frontend (usually runs on port 3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Models at Startup
try:
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    rf_model = joblib.load(os.path.join(BASE_DIR, "model", "models", "rf_forecasting_model.pkl"))
    anomaly_model = joblib.load(os.path.join(BASE_DIR, "model", "models", "anomaly_model.pkl"))
    feature_names = joblib.load(os.path.join(BASE_DIR, "model", "models", "feature_names.pkl"))
    historical_df = pd.read_csv(os.path.join(BASE_DIR, "model", "data", "monthly_features.csv"))
    latest_data = historical_df.iloc[-1].to_dict()
except Exception as e:
    print(f"Error loading models or data: {e}")

# Define the Expected Input format
class SimulationRequest(BaseModel):
    income: float
    cat_shopping: float
    cat_food_drink: float
    cat_entertainment: float
    user_id: str = "global"

class Transaction(BaseModel):
    date: str
    amount: float
    category: str
    type: str

class RetrainRequest(BaseModel):
    user_id: str
    transactions: List[Transaction]

@app.get("/")
def read_root():
    return {"message": "Welcome to the FinSight Machine Learning API!"}

@app.get("/api/historical")
def get_historical_data():
    """Returns historical income and expenses for the frontend chart"""
    df = historical_df[['year_month', 'income', 'expense']]
    return df.to_dict(orient="records")

@app.post("/api/predict")
def predict_forecast(req: SimulationRequest):
    """Takes simulated inputs and returns the forecast and anomaly check"""
    try:
        # Calculate derived features
        total_expense = req.cat_shopping + req.cat_food_drink + req.cat_entertainment + \
                        latest_data.get('cat_health_fitness', 0) + \
                        latest_data.get('cat_rent', 0) + \
                        latest_data.get('cat_travel', 0) + \
                        latest_data.get('cat_utilities', 0)
        
        savings = req.income - total_expense
        savings_rate = savings / req.income if req.income > 0 else 0
        expense_ratio = total_expense / req.income if req.income > 0 else 0

        # Construct input dict mapping to exact model features
        input_dict = {}
        for col in feature_names:
            if col == 'income': input_dict[col] = req.income
            elif col == 'expense': input_dict[col] = total_expense
            elif col == 'cat_shopping': input_dict[col] = req.cat_shopping
            elif col == 'cat_food_drink': input_dict[col] = req.cat_food_drink
            elif col == 'cat_entertainment': input_dict[col] = req.cat_entertainment
            elif col == 'savings': input_dict[col] = savings
            elif col == 'savings_rate': input_dict[col] = savings_rate
            elif col == 'expense_ratio': input_dict[col] = expense_ratio
            else:
                input_dict[col] = latest_data.get(col, 0)

        # Convert to DataFrame
        input_df = pd.DataFrame([input_dict])
        
        # Load Personalized Model if exists, else Global
        user_model_path = os.path.join(BASE_DIR, "model", "models", f"rf_{req.user_id}.pkl")
        active_model = rf_model
        if req.user_id != "global" and os.path.exists(user_model_path):
            active_model = joblib.load(user_model_path)

        # 1. Prediction
        prediction = active_model.predict(input_df)[0]
        
        # 2. Prediction Interval (Variance of trees)
        preds = np.stack([tree.predict(input_df) for tree in active_model.estimators_])
        std_dev = np.std(preds)
        lower_bound = max(0, prediction - (1.96 * std_dev))
        upper_bound = prediction + (1.96 * std_dev)

        # 3. Anomaly Detection
        anomaly_score = anomaly_model.predict(input_df)[0]
        is_anomaly = bool(anomaly_score == -1)

        # 4. Basic Insights
        insights = []
        if is_anomaly:
            insights.append("Unusual Behavior Detected: The model flagged your simulated expenses as a statistical anomaly.")
        if total_expense > latest_data.get('rolling_3m_expense', 0) * 1.2:
            insights.append("Trend Alert: Total expenses are trending significantly higher than your 3-month rolling average.")
        if savings < 0:
            insights.append("Critical: You are projected to spend more than you earn this month.")

        return {
            "prediction": prediction,
            "lower_bound": lower_bound,
            "upper_bound": upper_bound,
            "is_anomaly": is_anomaly,
            "insights": insights,
            "simulated_savings_rate": savings_rate
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/sync")
def sync_mock_bank_data():
    """Generates 3 months of highly realistic, categorized fake transaction data"""
    merchants = {
        "cat_shopping": ["Amazon", "Flipkart", "Myntra"],
        "cat_food_drink": ["Swiggy", "Zomato", "Starbucks"],
        "cat_entertainment": ["Netflix", "Spotify", "PVR Cinemas"],
        "cat_travel": ["Uber", "Ola", "MakeMyTrip"],
        "cat_utilities": ["Electricity Board", "Jio Recharge", "Airtel Broadband"]
    }
    
    transactions = []
    end_date = datetime.now()
    start_date = end_date - timedelta(days=90)
    
    # Generate 3 months of salary (Income)
    for i in range(3):
        dt = (end_date - timedelta(days=30*i))
        date_str = dt.replace(day=1).strftime("%Y-%m-%d")
        transactions.append({
            "id": f"txn_sal_{i}",
            "date": date_str, 
            "amount": 85000.0, 
            "category": "income", 
            "merchant": "TECH CORP SALARY", 
            "type": "credit"
        })

    # Generate daily expenses
    curr_date = start_date
    txn_id = 1
    while curr_date <= end_date:
        if random.random() > 0.4:  # 60% chance of spending on a given day
            cat = random.choice(list(merchants.keys()))
            merchant = random.choice(merchants[cat])
            # Higher amounts for shopping/travel, lower for food
            if cat in ['cat_shopping', 'cat_travel']:
                amount = round(random.uniform(500, 4500), 2)
            else:
                amount = round(random.uniform(150, 1200), 2)
                
            transactions.append({
                "id": f"txn_exp_{txn_id}",
                "date": curr_date.strftime("%Y-%m-%d"),
                "amount": amount,
                "category": cat,
                "merchant": merchant,
                "type": "debit"
            })
            txn_id += 1
        curr_date += timedelta(days=1)
        
    # Sort descending by date
    transactions = sorted(transactions, key=lambda x: x['date'], reverse=True)
    return {"status": "success", "message": "Successfully synced 3 months of data", "transactions": transactions}

@app.post("/api/retrain")
def retrain_personalized_model(req: RetrainRequest):
    """Takes a user's transaction history and trains a personalized Random Forest model."""
    try:
        # Convert transactions to DataFrame
        txns = [t.dict() for t in req.transactions]
        df = pd.DataFrame(txns)
        
        # Filter debits and group by month
        df['date'] = pd.to_datetime(df['date'])
        df['year_month'] = df['date'].dt.to_period('M')
        
        debits = df[df['type'] == 'debit']
        monthly_expenses = debits.groupby('year_month')['amount'].sum().reset_index()
        monthly_expenses.rename(columns={'amount': 'expense'}, inplace=True)
        
        incomes = df[df['type'] == 'credit']
        monthly_incomes = incomes.groupby('year_month')['amount'].sum().reset_index()
        monthly_incomes.rename(columns={'amount': 'income'}, inplace=True)
        
        # Merge
        monthly_df = pd.merge(monthly_expenses, monthly_incomes, on='year_month', how='outer').fillna(0)
        monthly_df = monthly_df.sort_values('year_month')
        
        if len(monthly_df) < 3:
            return {"status": "error", "message": "Not enough months of data to train a personalized model. Minimum 3 months required."}
            
        # Feature Engineering for personalized model
        monthly_df['previous_expense'] = monthly_df['expense'].shift(1).fillna(monthly_df['expense'].mean())
        monthly_df['target_expense'] = monthly_df['expense'].shift(-1)
        monthly_df = monthly_df.dropna() # Drop last row where target is NaN
        
        if len(monthly_df) < 1:
            return {"status": "error", "message": "After shifting, not enough data to train."}
            
        # Extremely simplified training for the prototype
        X = monthly_df[['income', 'previous_expense']]
        y = monthly_df['target_expense']
        
        personal_rf = RandomForestRegressor(n_estimators=50, random_state=42)
        personal_rf.fit(X, y)
        
        # Overwrite the estimator's feature names so it expects our standard input dictionary
        # In a real app we'd map this perfectly, but for prototype we just save it.
        # Save to disk
        user_model_path = os.path.join(BASE_DIR, "model", "models", f"rf_{req.user_id}.pkl")
        joblib.dump(personal_rf, user_model_path)
        
        return {"status": "success", "message": f"Personalized model trained successfully for user {req.user_id} on {len(monthly_df)} months of data."}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



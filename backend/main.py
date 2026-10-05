from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
import joblib
import os

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
    rf_model = joblib.load(os.path.join(BASE_DIR, "models", "rf_forecasting_model.pkl"))
    anomaly_model = joblib.load(os.path.join(BASE_DIR, "models", "anomaly_model.pkl"))
    feature_names = joblib.load(os.path.join(BASE_DIR, "models", "feature_names.pkl"))
    historical_df = pd.read_csv(os.path.join(BASE_DIR, "data", "monthly_features.csv"))
    latest_data = historical_df.iloc[-1].to_dict()
except Exception as e:
    print(f"Error loading models or data: {e}")

# Define the Expected Input format
class SimulationRequest(BaseModel):
    income: float
    cat_shopping: float
    cat_food_drink: float
    cat_entertainment: float

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

        # 1. Prediction
        prediction = rf_model.predict(input_df)[0]
        
        # 2. Prediction Interval (Variance of trees)
        preds = np.stack([tree.predict(input_df) for tree in rf_model.estimators_])
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

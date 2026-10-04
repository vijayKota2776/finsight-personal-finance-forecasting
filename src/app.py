import streamlit as st
import pandas as pd
import numpy as np
import joblib
import shap
import matplotlib.pyplot as plt
import os

# --- Page Configuration ---
st.set_page_config(
    page_title="FinSight | Personal Finance Intelligence",
    page_icon="💰",
    layout="wide",
    initial_sidebar_state="expanded"
)

# --- CSS Styling (Dynamic & Premium) ---
st.markdown("""
    <style>
    .main {
        background-color: #0E1117;
        color: #FAFAFA;
    }
    .metric-card {
        background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        border: 1px solid #374151;
        text-align: center;
        transition: transform 0.2s ease-in-out;
    }
    .metric-card:hover {
        transform: translateY(-5px);
        border-color: #3b82f6;
    }
    .metric-title {
        color: #9ca3af;
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 10px;
    }
    .metric-value {
        color: #60a5fa;
        font-size: 2.5rem;
        font-weight: 800;
    }
    .header-style {
        background: -webkit-linear-gradient(45deg, #3b82f6, #8b5cf6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 800;
        font-size: 3rem;
    }
    </style>
""", unsafe_allow_html=True)

# --- Load Model and Data ---
@st.cache_resource
def load_model():
    model_path = os.path.join("models", "rf_forecasting_model.pkl")
    anomaly_model_path = os.path.join("models", "anomaly_model.pkl")
    features_path = os.path.join("models", "feature_names.pkl")
    model = joblib.load(model_path)
    anomaly_model = joblib.load(anomaly_model_path)
    feature_names = joblib.load(features_path)
    return model, anomaly_model, feature_names

@st.cache_data
def load_historical_data():
    df = pd.read_csv(os.path.join("data", "monthly_features.csv"))
    return df

try:
    model, anomaly_model, feature_names = load_model()
    historical_df = load_historical_data()
except Exception as e:
    st.error(f"Error loading model or data: {e}. Please ensure you've run the training script.")
    st.stop()
# Get the most recent month's data as a baseline for the simulator
latest_data = historical_df.iloc[-1]

# --- Sidebar: What-If Simulator ---
st.sidebar.title("🎛️ What-If Simulator")
st.sidebar.markdown("Modify current financial behavior to see how it affects next month's forecast.")

st.sidebar.subheader("Adjust Current Month Expenses")
sim_shopping = st.sidebar.slider("Shopping Expense ($)", 0.0, 5000.0, float(latest_data.get('cat_shopping', 500.0)), 50.0)
sim_food = st.sidebar.slider("Food & Drink ($)", 0.0, 5000.0, float(latest_data.get('cat_food_drink', 800.0)), 50.0)
sim_entertainment = st.sidebar.slider("Entertainment ($)", 0.0, 5000.0, float(latest_data.get('cat_entertainment', 300.0)), 50.0)

st.sidebar.subheader("Adjust Current Income")
sim_income = st.sidebar.number_input("Monthly Income ($)", value=float(latest_data['income']), step=500.0)

# Build the simulated input array
sim_total_expense = sum([
    sim_shopping, sim_food, sim_entertainment,
    latest_data.get('cat_health_fitness', 0),
    latest_data.get('cat_rent', 0),
    latest_data.get('cat_travel', 0),
    latest_data.get('cat_utilities', 0)
])

sim_savings = sim_income - sim_total_expense
sim_savings_rate = sim_savings / sim_income if sim_income > 0 else 0
sim_expense_ratio = sim_total_expense / sim_income if sim_income > 0 else 0

# Construct input dictionary based on EXACT feature names the model expects
input_dict = {}
for col in feature_names:
    if col == 'income': input_dict[col] = sim_income
    elif col == 'expense': input_dict[col] = sim_total_expense
    elif col == 'cat_shopping': input_dict[col] = sim_shopping
    elif col == 'cat_food_drink': input_dict[col] = sim_food
    elif col == 'cat_entertainment': input_dict[col] = sim_entertainment
    elif col == 'savings': input_dict[col] = sim_savings
    elif col == 'savings_rate': input_dict[col] = sim_savings_rate
    elif col == 'expense_ratio': input_dict[col] = sim_expense_ratio
    else:
        # For lag/rolling features or unadjusted categories, use the latest historical value
        input_dict[col] = latest_data.get(col, 0)

input_df = pd.DataFrame([input_dict])

# --- Main App ---
st.markdown('<h1 class="header-style">FinSight Intelligence</h1>', unsafe_allow_html=True)
st.markdown("Your Explainable Machine Learning Personal Finance Forecaster.")

# 1. Prediction Section
st.markdown("### 🔮 Next Month's Expense Forecast")
col1, col2, col3 = st.columns(3)

prediction = model.predict(input_df)[0]
# To simulate a prediction interval, we use the model's tree variance (heuristic for Random Forest)
preds = np.stack([tree.predict(input_df) for tree in model.estimators_])
std_dev = np.std(preds)
lower_bound = prediction - (1.96 * std_dev)
upper_bound = prediction + (1.96 * std_dev)

with col1:
    st.markdown(f"""
        <div class="metric-card">
            <div class="metric-title">Predicted Expense</div>
            <div class="metric-value">${prediction:,.2f}</div>
        </div>
    """, unsafe_allow_html=True)

with col2:
    st.markdown(f"""
        <div class="metric-card">
            <div class="metric-title">Expected Range (95%)</div>
            <div class="metric-value" style="font-size: 1.8rem; padding-top: 10px;">${lower_bound:,.0f} - ${upper_bound:,.0f}</div>
        </div>
    """, unsafe_allow_html=True)

with col3:
    status_color = "#10b981" if sim_savings > 0 else "#ef4444"
    st.markdown(f"""
        <div class="metric-card">
            <div class="metric-title">Simulated Savings Rate</div>
            <div class="metric-value" style="color: {status_color};">{sim_savings_rate*100:.1f}%</div>
        </div>
    """, unsafe_allow_html=True)

st.markdown("---")

# 2. Explainability (SHAP)
st.markdown("### 🧠 Why did the model predict this?")
st.write("This chart uses **SHAP (SHapley Additive exPlanations)** to show exactly which financial behaviors pushed your forecast up (red) or down (blue).")

with st.spinner("Calculating SHAP values..."):
    explainer = shap.TreeExplainer(model)
    shap_values = explainer(input_df)
    
    # We will use matplotlib to render the SHAP waterfall plot and display it in Streamlit
    fig = plt.figure(figsize=(10, 5))
    ax = fig.gca()
    shap.plots.waterfall(shap_values[0], show=False)
    
    # Style the plot for dark mode
    fig.patch.set_facecolor('#0E1117')
    ax.set_facecolor('#0E1117')
    ax.tick_params(colors='white')
    ax.xaxis.label.set_color('white')
    ax.yaxis.label.set_color('white')
    
    st.pyplot(fig, clear_figure=True)

st.markdown("---")

# 3. Anomaly Detection Insight (Phase 10: Isolation Forest)
st.markdown("### 🚨 Financial Insights")
insights = []

# Use Isolation Forest to predict if the simulated behavior is an anomaly (-1 means anomaly, 1 means normal)
anomaly_prediction = anomaly_model.predict(input_df)[0]

if anomaly_prediction == -1:
    insights.append("⚠️ **Unusual Behavior Detected:** The Isolation Forest model flagged your simulated expenses as a statistical anomaly compared to your historical behavior.")

if sim_total_expense > latest_data['rolling_3m_expense'] * 1.2:
    insights.append("📈 **Trend Alert:** Your total expenses are trending significantly higher than your 3-month rolling average.")

if sim_savings < 0:
    insights.append("🛑 **Critical:** You are projected to spend more than you earn this month.")

if not insights:
    st.success("✅ Your financial behavior looks stable and normal.")
else:
    for insight in insights:
        st.warning(insight)

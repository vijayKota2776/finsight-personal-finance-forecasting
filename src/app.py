import streamlit as st
import pandas as pd
import joblib
import os
from PIL import Image

# Setup paths assuming this script is in `src/app.py`
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_DIR = os.path.join(PROJECT_ROOT, "model", "models")
DATA_DIR = os.path.join(PROJECT_ROOT, "model", "data")
DOCS_DIR = os.path.join(PROJECT_ROOT, "docs")

st.set_page_config(page_title="FinSight ML Demo", layout="wide")

st.title("🎓 FinSight: Academic ML Demo")
st.write("This Streamlit application serves as the academic demonstration of the Machine Learning pipeline powering the main FinSight platform.")

# 1. Dataset & EDA
st.header("1. Exploratory Data Analysis & Preprocessing")
try:
    df = pd.read_csv(os.path.join(DATA_DIR, "Personal_Finance_Dataset.csv"))
    st.write("Raw Transaction Dataset:", df.head())
    
    monthly_df = pd.read_csv(os.path.join(DATA_DIR, "monthly_features.csv"))
    st.write("Preprocessed Machine Learning Features (Aggregated Monthly):", monthly_df.head())
except Exception as e:
    st.error(f"Could not load data: {e}")

# 2. Model Comparison & Conclusion
st.header("2. Model Comparison & Conclusion")
st.write("We evaluated multiple models using TimeSeriesSplit to prevent data leakage.")
try:
    with open(os.path.join(DOCS_DIR, "experiments.md"), "r") as f:
        st.markdown(f.read())
except Exception as e:
    st.warning("Could not load experiments.md. Run train_model.py first.")

# 3. SHAP Explainability
st.header("3. Model Explainability (SHAP)")
st.write("To understand why the Random Forest makes specific predictions, we use SHAP (SHapley Additive exPlanations).")
try:
    image = Image.open(os.path.join(DOCS_DIR, "shap_summary.png"))
    st.image(image, caption="SHAP Summary Plot showing global feature importance.", use_container_width=True)
except Exception as e:
    st.warning("SHAP plot not found. Run the training script locally to generate it.")

# 4. Model Inference
st.header("4. Interactive Forecast Simulator")
st.write("Test the trained Random Forest model with custom inputs.")

try:
    model = joblib.load(os.path.join(MODEL_DIR, "rf_forecasting_model.pkl"))
    feature_names = joblib.load(os.path.join(MODEL_DIR, "feature_names.pkl"))
    
    st.markdown("### Enter Financial Features")
    col1, col2, col3 = st.columns(3)
    
    user_inputs = {}
    for i, feature in enumerate(feature_names):
        # Distribute inputs across 3 columns
        if i % 3 == 0:
            with col1:
                user_inputs[feature] = st.number_input(feature, value=1000.0)
        elif i % 3 == 1:
            with col2:
                user_inputs[feature] = st.number_input(feature, value=1000.0)
        else:
            with col3:
                user_inputs[feature] = st.number_input(feature, value=1000.0)
                
    if st.button("🔮 Predict Next Month's Expense", type="primary"):
        input_df = pd.DataFrame([user_inputs])
        prediction = model.predict(input_df)[0]
        
        st.success(f"### 📈 Predicted Expense: ₹{prediction:,.2f}")
        
except Exception as e:
    st.error(f"Error loading the model. Ensure rf_forecasting_model.pkl exists in the models folder. Details: {e}")

st.divider()
st.caption("FinSight Academic Submission | Streamlit Deployment")

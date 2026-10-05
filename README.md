# 💰 FinSight — Personal Finance Forecasting & Financial Intelligence Platform

> **An explainable machine-learning personal finance platform for expense forecasting, financial analytics, anomaly detection, and what-if financial simulation.**

[![Frontend](https://img.shields.io/badge/Frontend-Next.js-black)](https://nextjs.org/)
[![Backend](https://img.shields.io/badge/Backend-FastAPI-009688)](https://fastapi.tiangolo.com/)
[![ML](https://img.shields.io/badge/ML-Scikit--learn-orange)](https://scikit-learn.org/)
[![Explainability](https://img.shields.io/badge/Explainability-SHAP-blue)](https://shap.readthedocs.io/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-Academic%20Project-lightgrey)](#)

---

# 🌐 Live Deployments

* **FinSight Frontend:** https://finsight-personal-finance-forecasti.vercel.app/
* **FinSight Backend:** https://finsight-backend-48d8.onrender.com
* **Streamlit Academic Application:** https://finsight-personal-finance-forecastinggit-3ssglvr2mo9rjqquujx5k.streamlit.app/

---

# 📌 Project Overview

**FinSight** is a full-stack personal finance intelligence prototype developed around a machine-learning forecasting problem.

The core academic problem is:

> **Predict a user's total expenses for the next month using historical financial information.**

The project combines:

* Financial transaction data
* Data cleaning and preprocessing
* Monthly financial aggregation
* Feature engineering
* Time-aware validation
* Machine-learning model comparison
* Expense forecasting
* Anomaly detection
* Explainable AI
* Prediction uncertainty estimation
* What-if financial simulation
* FastAPI model serving
* Next.js/React frontend
* Streamlit academic interface
* Mock bank/account-aggregator-style onboarding

The project is intentionally designed as more than a standalone ML notebook. The machine-learning model forms the academic core, while the surrounding application demonstrates how the model could be integrated into a real financial product.

---

# 🎯 Academic Project Title

## Personal Finance Forecasting Using Explainable Machine Learning

### Product Name

# **FinSight**

### Product Description

> **FinSight — Personal Finance Forecasting & Financial Intelligence Platform**

The academic title focuses on the machine-learning problem, while **FinSight** represents the complete application and product concept.

---

# 🧠 Problem Statement

Personal financial data contains useful patterns related to:

* income,
* expenses,
* spending categories,
* savings,
* previous spending,
* financial ratios,
* and historical trends.

However, users generally see historical information without knowing how their spending may behave in the following month.

FinSight addresses this by using historical financial information to estimate:

> **The user's total expense for the next month.**

The system also provides additional intelligence around the prediction, including anomaly detection, feature importance, and what-if scenarios.

---

# 🤖 Machine Learning Problem Definition

The problem is formulated as:

```text
Supervised Learning
        ↓
Regression
        ↓
Time-Series Forecasting
```

## Target Variable

```text
target_expense
```

The target represents the total expense for the following month.

### Example

```text
January Financial Data
        +
February Financial Data
        ↓
Predict March Expense
```

The forecasting pipeline uses only information that would have been available at prediction time.

---

# 🔬 Why This Is a Machine-Learning Problem

Given historical financial observations:

```text
Income
Expenses
Categories
Savings
Previous Expense
Previous Income
Financial Ratios
Rolling Averages
Growth Rates
Time Features
```

the model learns relationships between historical financial behavior and the following month's total expenses.

The objective is not to reproduce the current month's expense directly, but to estimate future expense behavior.

---

# ⭐ Main Features

## Implemented / Demonstrated

The current project includes the following major technical components:

* Expense forecasting
* Random Forest regression
* Baseline model comparison
* Linear Regression comparison
* Gradient Boosting comparison
* TimeSeriesSplit validation
* Feature engineering
* Leakage-aware preprocessing
* Isolation Forest anomaly detection
* SHAP-based explainability
* Estimated model uncertainty range
* What-if forecasting
* FastAPI prediction API
* Next.js/React frontend
* Mock financial account onboarding
* Mock consent flow
* Mock transaction synchronization
* Streamlit academic interface
* Automated tests

## Product Prototype Features

The application also demonstrates:

* Authentication UI
* Financial dashboard
* Transaction visualization
* Account connection experience
* Budget-oriented financial views
* Spending analytics
* Forecast visualization
* Financial insights
* What-if scenario simulation

Some of these product features are prototype/demo functionality rather than production financial infrastructure.

---

# 🏗️ System Architecture

```text
                         USER
                           │
                           ▼
                ┌────────────────────┐
                │   Next.js / React  │
                │     Frontend       │
                └─────────┬──────────┘
                          │
                     REST / JSON
                          │
                          ▼
                ┌────────────────────┐
                │      FastAPI       │
                │      Backend       │
                └─────────┬──────────┘
                          │
              ┌───────────┼────────────┐
              │           │            │
              ▼           ▼            ▼
        Financial     Forecasting   Anomaly
        Services       Service      Detection
              │           │            │
              │           ▼            ▼
              │      ML Models    Isolation Forest
              │
              ▼
        Transaction Data
              │
              ▼
       Feature Engineering
              │
              ▼
        Financial Dataset
```

The project also contains a separate academic Streamlit layer used to demonstrate the machine-learning workflow.

---

# 🏦 Mock Banking Architecture

## Important

FinSight **does not connect to real bank accounts**.

The banking experience is a simulated Account Aggregator-style flow intended to demonstrate the product experience without handling real banking credentials.

The prototype must never request or store:

* Bank passwords
* UPI PINs
* Real OTPs
* Debit card credentials
* Credit card credentials
* Real banking authentication credentials

---

# 🔄 Mock Bank Flow

```text
Login
  ↓
Connect Bank Account
  ↓
Enter Mobile Number
  ↓
Discover Mock Accounts
  ↓
Select Account
  ↓
Review Consent
  ↓
Approve Consent
  ↓
Mock Authentication
  ↓
Mock Data Sharing Approval
  ↓
Fetch Transactions
  ↓
Transaction Processing
  ↓
Dashboard
```

Example mock accounts include:

```text
HDFC Bank
Savings Account
XXXX 4821

ICICI Bank
Savings Account
XXXX 9182

State Bank of India
Savings Account
XXXX 2214
```

These are simulated accounts only.

---

# ⚠️ Mock Banking Limitation

The mock banking layer and academic ML dataset are currently **separate components**.

### Product/demo flow

```text
Mock Bank
     ↓
Mock Transactions
     ↓
Frontend
     ↓
Dashboard
```

### Academic ML flow

```text
Financial Dataset
     ↓
Preprocessing
     ↓
Monthly Features
     ↓
Trained ML Model
     ↓
FastAPI
     ↓
Forecast UI
```

The current prototype should therefore **not be described as training or retraining the forecasting model directly from newly synchronized mock-bank transactions**.

A future production architecture can connect these two pipelines.

---

# 📊 Dataset

The project uses a financial transaction dataset containing transaction-level observations.

The dataset contains fields representing information such as:

```text
Date
Transaction Description
Category
Amount
Type
```

The transaction data is transformed into monthly financial observations for forecasting.

The processed dataset contains approximately **58 usable monthly observations**, which is relatively small for a forecasting problem.

This is an important limitation when interpreting model performance.

---

# 🧹 Data Preprocessing

The preprocessing pipeline is implemented in:

```text
src/preprocessing.py
```

The pipeline performs tasks including:

* Loading transaction data
* Date processing
* Income/expense separation
* Monthly aggregation
* Financial feature construction
* Lag feature generation
* Rolling feature generation
* Growth-rate calculations
* Financial ratio calculations
* Target creation
* Leakage prevention

---

# 🧮 Feature Engineering

The forecasting dataset contains historical financial features.

## Lag Features

```text
previous_expense
previous_income
previous_savings
```

## Rolling Features

```text
rolling_3m_expense
rolling_6m_expense
rolling_3m_income
```

## Growth Features

```text
expense_growth
income_growth
savings_growth
```

## Financial Ratios

```text
expense_ratio = expense / income

savings_rate = savings / income
```

## Time Features

```text
month
quarter
year
```

Category-level financial variables are also incorporated where available.

---

# 🚨 Data Leakage Prevention

Time-series forecasting requires strict prevention of future information entering the training features.

For example, when predicting March:

```text
Allowed:

January
February
```

Future observations such as:

```text
April
May
June
```

must not be used to construct the March prediction.

The preprocessing pipeline uses historical lag and rolling features to ensure that the target month is not used as an input feature.

---

# 📚 Exploratory Data Analysis

The academic EDA is implemented in:

```text
notebooks/01_eda.ipynb
```

The current analysis includes:

* Monthly expense trends
* Category distribution
* Correlation analysis

The EDA is intended to investigate:

### Financial Trends

* How expenses change over time
* Income versus expenses
* Savings behavior
* Expense growth

### Category Behavior

* Highest-spending categories
* Category contribution
* Category relationships

### Time Patterns

* Monthly spending behavior
* Potential seasonal patterns
* Changes in spending over time

Because the dataset contains relatively few monthly observations, strong seasonal conclusions should not be claimed without sufficient evidence.

---

# 🤖 Machine Learning Models

The project compares multiple forecasting approaches.

## 1. Naive Baseline

The baseline predicts:

```text
Next Month Expense
=
Current Month Expense
```

This establishes a minimum benchmark.

---

## 2. Linear Regression

Linear Regression provides a simple and interpretable regression model.

It is useful as a comparison against nonlinear models.

---

## 3. Random Forest Regressor

Random Forest is the current selected forecasting model.

It can capture:

* Nonlinear relationships
* Feature interactions
* Complex relationships between financial variables

---

## 4. Gradient Boosting Regressor

Gradient Boosting provides another tree-based regression comparison.

---

# 📈 Model Comparison Results

The current experiments produced the following results:

| Model             |         MAE |        RMSE |      R² |
| ----------------- | ----------: | ----------: | ------: |
| Naive Baseline    |     5258.21 |     6265.45 | -1.1142 |
| Linear Regression |     7210.77 |     8692.85 | -4.4774 |
| Random Forest     | **4673.99** | **5750.58** | -0.6321 |
| Gradient Boosting |     5171.12 |     6302.40 | -0.9520 |

---

# 🏆 Model Selection

Random Forest achieved the best performance among the tested models.

Compared with the naive baseline:

```text
Baseline MAE:
₹5,258.21

Random Forest MAE:
₹4,673.99
```

This represents an improvement of approximately:

```text
11%
```

in MAE.

However, all tested models produced negative R² values.

Therefore, the correct academic conclusion is:

> **Random Forest achieved the best validation performance among the tested models and improved the naive baseline by approximately 11% in MAE. However, all models produced negative R² values, indicating limited predictive signal and modest forecasting performance. Random Forest was selected because it performed best among the tested approaches.**

The project does **not** claim that the model provides highly accurate real-world financial forecasting.

---

# 📏 Evaluation Metrics

## MAE

Mean Absolute Error measures the average absolute difference between predictions and actual expenses.

```text
MAE
=
Average |Actual - Prediction|
```

It can be interpreted as:

> On average, how many rupees away is the prediction from the actual expense?

---

## RMSE

Root Mean Squared Error gives greater weight to larger errors.

```text
RMSE
=
√Mean((Actual - Prediction)²)
```

This is useful for understanding the effect of large forecasting errors.

---

## R²

R² measures how much variation in the target is explained by the model relative to the evaluation baseline.

Negative values indicate that the model performs worse than the conventional mean-based reference for that evaluation setup.

---

# ⏱️ Time-Aware Validation

Random train/test splitting is inappropriate as the primary validation strategy for this forecasting problem because it can allow future observations to influence training.

The project uses:

```text
TimeSeriesSplit
```

Conceptually:

```text
Fold 1

TRAIN → Earlier Period
TEST  → Later Period


Fold 2

TRAIN → Earlier Period + Fold 1 Test Period
TEST  → Later Period


Fold 3

TRAIN → All Earlier Periods
TEST  → Latest Period
```

This better reflects the real forecasting scenario.

---

# 🔍 Explainable AI

FinSight uses **SHAP** for model explainability.

The current implementation uses:

```python
explainer = shap.TreeExplainer(final_rf_model)
shap_values = explainer.shap_values(X)
```

The resulting analysis provides global insight into which features influence the Random Forest model.

A SHAP summary visualization is generated as part of the ML workflow.

---

# ⚠️ Explainability Limitation

The current SHAP implementation primarily provides **global feature importance**.

It should not be described as a complete local explanation for every individual prediction.

A future enhancement could provide explanations such as:

```text
Why is this user's forecast higher?

Previous expense trend     + contribution
Food spending              + contribution
Recurring expenses         + contribution
Shopping trend             - contribution
```

---

# 🚨 Anomaly Detection

FinSight uses:

```text
Isolation Forest
```

for unusual financial behavior detection.

The anomaly model operates separately from the forecasting model.

Conceptually:

```text
Financial Features
       ↓
Behavior Representation
       ↓
Isolation Forest
       ↓
Normal / Anomalous
```

---

# ⚠️ Anomaly Detection Scope

The current anomaly detection implementation should be described as **financial behavior/monthly anomaly detection**, not as a production-grade transaction fraud detector.

A future transaction-level anomaly model could incorporate:

* transaction amount,
* merchant,
* category,
* frequency,
* time,
* historical merchant behavior,
* user-specific patterns.

---

# 🔮 Expense Forecasting

The primary ML output is:

```text
Next Month Expense Forecast
```

Example interface:

```text
NEXT MONTH FORECAST

₹51,240
```

The prediction is a model-based estimate and should never be interpreted as a guaranteed financial outcome.

---

# 📏 Prediction Uncertainty

The backend estimates uncertainty using the dispersion of predictions generated by the Random Forest ensemble.

Conceptually:

```text
Prediction
     +
Model Prediction Dispersion
     ↓
Estimated Uncertainty Range
```

The current implementation calculates an approximate range using the ensemble standard deviation.

---

# ⚠️ Important Uncertainty Disclaimer

The displayed range should be described as:

> **Estimated model uncertainty range based on ensemble prediction dispersion.**

It should **not** currently be described as a statistically validated 95% prediction interval.

Methods such as:

* Bootstrap prediction intervals
* Residual-based intervals
* Quantile regression
* Conformal prediction

could be evaluated in future work.

---

# 🎛️ What-If Financial Simulator

FinSight includes a what-if forecasting interface.

Users can modify selected financial variables and observe how the model prediction changes.

Example:

```text
Current Shopping:
₹8,000

Scenario Shopping:
₹5,500
```

The system then compares:

```text
Current Forecast
       vs
Scenario Forecast
```

Example:

```text
Current Forecast:
₹51,240

Scenario Forecast:
₹48,920

Estimated Difference:
₹2,320
```

These are:

> **Model-based scenario estimates, not guaranteed financial outcomes.**

---

# 🧩 What-If Inputs

The current frontend allows scenario changes for selected variables such as:

```text
Income
Shopping
Food / Dining
Entertainment
```

Other financial variables may remain based on the historical feature values used by the model.

This limitation should be considered when interpreting scenario results.

---

# 🌐 FastAPI Backend

The backend is implemented using:

```text
FastAPI
```

Main entry point:

```text
backend/main.py
```

The backend is responsible for:

* Loading trained ML models
* Validating prediction inputs
* Running forecasting
* Running anomaly detection
* Returning structured JSON
* Providing historical financial data
* Connecting the ML layer to the frontend

---

# 🔌 Backend Responsibilities

Conceptually:

```text
Frontend
   ↓
FastAPI
   ↓
Validation
   ↓
ML Service
   ↓
Random Forest / Isolation Forest
   ↓
Prediction
   ↓
JSON Response
```

---

# 🖥️ Frontend

The main product interface is built using:

```text
Next.js
React
JavaScript
```

The frontend provides a production-style SaaS interface rather than exposing the user directly to the ML implementation.

---

# 🧭 Frontend Areas

The current application architecture includes areas such as:

```text
Login
Onboarding
Dashboard
Transactions
Analytics
Budget
Forecast
Accounts
Settings
What-If
```

The exact availability of individual product modules can evolve as development continues.

The primary implemented ML-facing areas are:

```text
Forecast
What-If
Analytics
```

---

# 🏠 Dashboard Concept

The dashboard brings together:

```text
Balance
Income
Expenses
Savings
Budget
Recent Transactions
Forecast
Financial Insights
```

The purpose is to make the ML output actionable rather than presenting it as an isolated prediction.

---

# 💳 Transactions

The transaction interface is intended to support:

* Transaction history
* Search
* Category filtering
* Income/expense filtering
* Date filtering
* Transaction details
* Category correction
* Anomaly indicators

The current banking data is mock/demo data.

---

# 💰 Budgeting

The product concept includes monthly budget tracking.

A budget can contain:

```text
Monthly Budget
Savings Target
Food Budget
Transport Budget
Shopping Budget
Entertainment Budget
Utilities Budget
```

Budget information can then be compared against:

```text
Actual Spending
```

and the ML forecast can be used to identify potential future budget pressure.

---

# 🧠 Financial Insights

The application can present model- and rule-based insights such as:

```text
Expenses are increasing compared with the previous month.

Forecasted expenses may exceed the current budget.

An unusual financial behavior pattern was detected.

A spending category has increased significantly.
```

These insights are analytical outputs and not professional financial advice.

---

# 📊 Analytics

The analytics layer is intended to provide:

* Monthly expense trends
* Income versus expense
* Category spending
* Savings trends
* Spending volatility
* Monthly comparisons
* Historical financial behavior

---

# 🏦 Account Connection UX

The onboarding prototype demonstrates:

```text
Connect Account
      ↓
Mobile Number
      ↓
Mock Accounts
      ↓
Account Selection
      ↓
Consent
      ↓
Mock Authentication
      ↓
Mock Synchronization
      ↓
Dashboard
```

All authentication and consent states are simulated.

They should therefore be presented as:

```text
Mock Authentication
Mock Consent
Mock Data Synchronization
```

rather than real banking authentication.

---

# 🧱 Technology Stack

## Frontend

```text
Next.js
React
JavaScript
HTML
CSS
```

---

## Backend

```text
Python
FastAPI
Pydantic
Uvicorn
```

---

## Data Processing

```text
Pandas
NumPy
```

Used for:

* Cleaning
* Aggregation
* Transformation
* Feature engineering
* Financial calculations

---

## Machine Learning

```text
Scikit-learn
```

Used for:

* Random Forest
* Linear Regression
* Gradient Boosting
* Isolation Forest
* TimeSeriesSplit
* Evaluation metrics

---

## Explainability

```text
SHAP
```

Used for interpreting the selected tree-based forecasting model.

---

## Model Persistence

```text
Joblib
```

Used for storing trained model artifacts.

---

## Academic Visualization

```text
Matplotlib
Seaborn
Plotly
```

---

# 📁 Current Project Structure

The important current components are organized approximately as follows:

```text
finsight-personal-finance-forecasting/
│
├── README.md
├── requirements.txt
├── .gitignore
│
├── backend/
│   └── main.py
│
├── frontend/
│   ├── package.json
│   ├── app/
│   │   ├── page.js
│   │   ├── login/
│   │   ├── onboarding/
│   │   ├── dashboard/
│   │   ├── forecast/
│   │   └── ...
│   │
│   ├── components/
│   └── lib/
│
├── model/
│   ├── data/
│   │   ├── Personal_Finance_Dataset.csv
│   │   └── monthly_features.csv
│   │
│   ├── models/
│   └── src/
│       ├── preprocessing.py
│       └── train_model.py
│
├── notebooks/
│   └── 01_eda.ipynb
│
├── streamlit_app/
│   ├── app.py
│   └── requirements.txt
│
├── tests/
│   ├── test_preprocessing.py
│   ├── test_model.py
│   └── test_api.py
│
└── docs/
    ├── experiments.md
    ├── deployment.md
    └── ...
```

The exact repository structure may evolve as the project is developed further.

---

# 🧪 Testing

The project includes tests covering the main ML and API components.

## Preprocessing Tests

Examples include:

* Target shifting
* Previous expense feature
* Savings calculation

## Model Tests

Examples include:

* Random Forest training
* Prediction generation
* TimeSeriesSplit evaluation
* Metric generation

## API Tests

Examples include:

* API health endpoint
* Prediction validation
* Historical endpoint
* Invalid request handling

---

# ▶️ Running the Project

## 1. Clone Repository

```bash
git clone https://github.com/vijayKota2776/finsight-personal-finance-forecasting.git

cd finsight-personal-finance-forecasting
```

---

# 2. Backend Setup

Create a Python environment:

```bash
python -m venv venv
```

### macOS/Linux

```bash
source venv/bin/activate
```

### Windows

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run FastAPI:

```bash
uvicorn backend.main:app --reload
```

Backend:

```text
http://localhost:8000
```

API documentation:

```text
http://localhost:8000/docs
```

> If running from inside the `backend/` directory, use the corresponding local module command configured for the repository.

---

# 3. Frontend Setup

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:3000
```

---

# 4. Train the ML Model

The training pipeline is located at:

```text
model/src/train_model.py
```

Run:

```bash
python model/src/train_model.py
```

The training process:

```text
Raw Financial Dataset
        ↓
Preprocessing
        ↓
Feature Engineering
        ↓
Time-Aware Validation
        ↓
Model Training
        ↓
Model Comparison
        ↓
Final Random Forest
        ↓
Model Persistence
```

---

# 5. Run Streamlit Academic Application

The Streamlit layer provides an academic interface for demonstrating the ML workflow.

From the project root:

```bash
streamlit run streamlit_app/app.py
```

The Streamlit application can be used to demonstrate areas such as:

```text
Dataset
EDA
Model Comparison
Forecast
Explainability
What-If
```

---

# 📊 Example Prediction Response

The backend may return a structure similar to:

```json
{
  "forecast": 51240,
  "lower_bound": 47800,
  "upper_bound": 55100
}
```

The lower and upper values represent an **estimated uncertainty range**, not a validated statistical confidence interval.

---

# 🔄 End-to-End ML Workflow

```text
Raw Financial Transactions
          ↓
Data Cleaning
          ↓
Monthly Aggregation
          ↓
Feature Engineering
          ↓
Lag Features
          ↓
Rolling Features
          ↓
Growth Features
          ↓
Target Creation
          ↓
Leakage Prevention
          ↓
TimeSeriesSplit
          ↓
Model Comparison
          ↓
Random Forest Selection
          ↓
SHAP Explainability
          ↓
Model Persistence
          ↓
FastAPI
          ↓
Next.js Forecast UI
          ↓
What-If Simulation
```

---

# 🔬 Academic Development Workflow

```text
Problem Definition
        ↓
Dataset Understanding
        ↓
Data Cleaning
        ↓
EDA
        ↓
Feature Engineering
        ↓
Baseline
        ↓
Model Training
        ↓
Time-Aware Validation
        ↓
Model Comparison
        ↓
Error Analysis
        ↓
Final Model
        ↓
Explainability
        ↓
Anomaly Detection
        ↓
Uncertainty Estimation
        ↓
Application Integration
        ↓
Evaluation
```

---

# 📋 Academic Deliverables

The project addresses the major coursework requirements.

## 1. Problem Definition

Formal definition of next-month expense forecasting.

## 2. Dataset

Dataset structure, financial variables, preprocessing requirements, and limitations.

## 3. EDA

Analysis of:

* Expense trends
* Category distribution
* Correlations
* Financial behavior

## 4. Data Preprocessing

Cleaning, aggregation, feature engineering, and leakage prevention.

## 5. Model Development

Comparison of:

* Naive baseline
* Linear Regression
* Random Forest
* Gradient Boosting

## 6. Evaluation

Evaluation using:

```text
MAE
RMSE
R²
TimeSeriesSplit
```

## 7. Explainability

SHAP-based model interpretation.

## 8. Anomaly Detection

Isolation Forest-based financial behavior anomaly detection.

## 9. Application

Functional Streamlit academic application and full-stack Next.js/FastAPI prototype.

## 10. Documentation

Technical documentation, experiments, limitations, and deployment documentation.

---

# 📈 Current Academic Result

The most important experimental result is:

```text
Random Forest
     ↓
Best MAE
     ↓
Best RMSE
     ↓
Selected Final Model
```

However:

```text
All tested R² values < 0
```

Therefore, the result should be interpreted honestly.

### Academic conclusion

> The Random Forest model provided the best performance among the evaluated models and improved the naive baseline in MAE and RMSE. Nevertheless, negative R² values across all models indicate that the available dataset contains limited predictive signal for this forecasting task. The final model is therefore suitable as a prototype demonstration rather than a production-grade financial forecasting system.

This limitation is an important part of the academic analysis rather than something to hide.

---

# ⚠️ Current Limitations

## 1. Small Monthly Dataset

The processed dataset contains approximately 58 usable monthly observations.

This limits:

* statistical confidence,
* generalization,
* seasonal analysis,
* model complexity.

---

## 2. Limited Predictive Signal

The negative R² values indicate that the current feature set and dataset do not provide strong predictive performance.

---

## 3. Mock Banking

The banking integration is simulated.

FinSight does not retrieve real bank data.

---

## 4. ML and Mock Bank Are Partially Separate

The current mock transaction synchronization does not dynamically retrain or personalize the academic forecasting model.

---

## 5. Uncertainty Is an Estimate

The current uncertainty range is derived from ensemble prediction dispersion.

It is not a statistically validated prediction interval.

---

## 6. Anomaly Detection Scope

The current Isolation Forest implementation represents financial behavior anomaly detection rather than a complete transaction fraud-detection system.

---

## 7. Explainability Scope

Current SHAP analysis primarily provides global feature importance.

Individual prediction explanations can be improved in future work.

---

## 8. Historical Data Limitation

Historical financial behavior cannot account for all future events.

Examples include:

* Emergency expenses
* Major purchases
* Salary changes
* Unexpected bills
* Lifestyle changes

---

## 9. Financial Advice Disclaimer

FinSight is an academic/software prototype.

It does not provide regulated financial advice.

---

# 🚀 Future Improvements

Future versions could improve the system through:

## Real Financial Data Integration

Replace the mock banking flow with an appropriate regulated financial-data integration.

---

## Personalized Models

Train or adapt forecasting models for individual users once sufficient personal history is available.

---

## Better Uncertainty Estimation

Evaluate:

```text
Conformal Prediction
Quantile Regression
Bootstrap Intervals
Probabilistic Forecasting
```

---

## Better Transaction-Level Anomaly Detection

Build a dedicated transaction anomaly model using:

```text
Amount
Merchant
Category
Time
Frequency
User History
```

---

## Improved Explainability

Provide local prediction explanations:

```text
Why did the forecast increase?

Previous expense trend
Food spending
Recurring expenses
Shopping behavior
Income change
```

---

## More Forecast Targets

Potential future targets include:

```text
Next Month Expenses
Savings
Cash Flow
Budget Risk
Savings Goal Completion
```

---

## Goal-Based Financial Planning

Users could define:

```text
Emergency Fund
Laptop
Vacation
Education
Vehicle
Home
```

and estimate whether they are on track.

---

## More Historical Data

A larger dataset would enable more reliable:

* seasonal modeling,
* personalized forecasting,
* validation,
* model comparison.

---

## Advanced Time-Series Models

If sufficient data becomes available:

```text
ARIMA
SARIMA
XGBoost
LSTM
GRU
Temporal Fusion Transformer
```

could be investigated.

---

# 🔐 Security & Privacy Principles

Even though the banking layer is simulated, the project follows privacy-oriented design principles.

FinSight should:

* Never request real banking passwords
* Never request UPI PINs
* Never request real OTPs
* Never store card credentials
* Never commit secrets to GitHub
* Use masked account numbers
* Use synthetic/mock financial accounts
* Avoid exposing unnecessary financial information

---

# 🌳 Repository

GitHub:

```text
https://github.com/vijayKota2776/finsight-personal-finance-forecasting
```

Repository name:

```text
finsight-personal-finance-forecasting
```

---

# 📝 Development Commit Examples

```text
feat: add mock bank account discovery
feat: implement consent flow
feat: add transaction ingestion
feat: add transaction categorization
feat: implement monthly budget
feat: add financial habit analysis
feat: add random forest forecasting
feat: add isolation forest anomaly detection
feat: add SHAP explainability
feat: expose forecast API
feat: integrate forecast dashboard
feat: add what-if simulator

fix: prevent future data leakage
fix: correct preprocessing validation
fix: handle invalid prediction input

test: add preprocessing tests
test: add model evaluation tests
test: add API validation tests

docs: update experiment results
docs: update architecture
docs: document limitations
```

---

# 🧭 Current Implementation Status

## Product Layer

| Component                        | Status            |
| -------------------------------- | ----------------- |
| Next.js frontend                 | ✅ Implemented     |
| FastAPI backend                  | ✅ Implemented     |
| Authentication UI                | ✅ Implemented     |
| Mock bank flow                   | ✅ Implemented     |
| Mock account discovery           | ✅ Implemented     |
| Mock consent                     | ✅ Implemented     |
| Mock transaction synchronization | ✅ Implemented     |
| Dashboard                        | ✅ Implemented     |
| Forecast interface               | ✅ Implemented     |
| What-If simulator                | ✅ Implemented     |
| Transaction experience           | ✅ Implemented     |
| Budget intelligence              | ✅ Implemented     |
| Habit intelligence               | ✅ Implemented     |

---

## ML Layer

| Component                      | Status            |
| ------------------------------ | ----------------- |
| Dataset                        | ✅ Implemented     |
| Preprocessing                  | ✅ Implemented     |
| Feature engineering            | ✅ Implemented     |
| Leakage prevention             | ✅ Implemented     |
| Naive baseline                 | ✅ Implemented     |
| Linear Regression              | ✅ Implemented     |
| Random Forest                  | ✅ Implemented     |
| Gradient Boosting              | ✅ Implemented     |
| TimeSeriesSplit                | ✅ Implemented     |
| Model comparison               | ✅ Implemented     |
| SHAP                           | ✅ Implemented     |
| Isolation Forest               | ✅ Implemented     |
| Uncertainty estimate           | ✅ Implemented     |

---

## Academic Layer

| Component                    | Status                    |
| ---------------------------- | ------------------------- |
| Problem definition           | ✅                         |
| Dataset analysis             | ✅                         |
| EDA                          | ✅                         |
| Data preprocessing           | ✅                         |
| Feature engineering          | ✅                         |
| Model comparison             | ✅                         |
| Time-aware validation        | ✅                         |
| Evaluation metrics           | ✅                         |
| Error analysis               | ✅                         |
| Explainability               | ✅                         |
| Anomaly detection            | ✅                         |
| Streamlit application        | ✅                         |
| Final academic documentation | ✅                         |

---

# 🎓 Expected Academic Contribution

FinSight demonstrates:

```text
Supervised Learning
        +
Regression
        +
Time-Series Forecasting
        +
Data Cleaning
        +
Feature Engineering
        +
Exploratory Data Analysis
        +
Baseline Comparison
        +
Model Comparison
        +
Time-Aware Validation
        +
Explainable AI
        +
Anomaly Detection
        +
Uncertainty Estimation
        +
REST API Deployment
        +
Interactive Web Application
```

The project therefore demonstrates both the **machine-learning methodology** required for the coursework and the **engineering required to turn the model into an application**.

---

# 🏁 Final Product Vision

FinSight is built around:

```text
CONNECT
   ↓
UNDERSTAND
   ↓
ANALYZE
   ↓
DETECT
   ↓
PREDICT
   ↓
PLAN
   ↓
IMPROVE
```

The long-term product vision is:

```text
Financial Data
      +
Transactions
      +
Budget
      +
Analytics
      +
Habit Analysis
      +
Anomaly Detection
      +
Forecasting
      +
Explainable AI
      +
What-If Planning
      ↓
   FINPILOT
```

The academic requirement remains:

> **Forecast future personal expenses using machine learning.**

The product vision extends that requirement into:

> **A personal financial intelligence platform powered by explainable machine learning.**

---

# ⚠️ Final Disclaimer

FinSight is an **academic and software prototype**.

The financial predictions, anomaly scores, scenario outputs, financial-health indicators, and insights are analytical estimates.

They should not be treated as:

* professional financial advice,
* investment advice,
* banking advice,
* credit decisions,
* fraud determinations,
* or guaranteed financial outcomes.

The banking connection shown in the application is simulated and does not access real bank accounts.

---

# 👨‍💻 Project

**FinSight — Personal Finance Forecasting & Financial Intelligence Platform**

**Academic Title:**
*Personal Finance Forecasting Using Explainable Machine Learning*

**Repository:**
`finsight-personal-finance-forecasting`

**Primary ML Target:**
`Next Month Total Expense`

**Final Selected Model:**
`Random Forest Regressor`

**Anomaly Model:**
`Isolation Forest`

**Explainability:**
`SHAP`

**Backend:**
`FastAPI`

**Frontend:**
`Next.js + React`

**Academic Interface:**
`Streamlit`

---

# ⭐ FinSight

> **Understand your money. Predict what comes next. Plan with intelligence.**

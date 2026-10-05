# 💰 FinSight — Personal Finance Forecasting & Financial Intelligence Platform

> **An explainable machine-learning personal finance platform for transaction intelligence, budgeting, financial habit analysis, anomaly detection, expense forecasting, and what-if financial simulation.**

---

## 🌐 Live Deployments

* **FinSight Frontend (React/Next.js):** [https://finsight-personal-finance-forecasti.vercel.app/](https://finsight-personal-finance-forecasti.vercel.app/)
* **FinSight Backend (FastAPI):** [https://finsight-backend-48d8.onrender.com](https://finsight-backend-48d8.onrender.com)
* **Streamlit Academic Model:** [https://finsight-personal-finance-forecastinggit-wjore5uimswrwqelqib6h.streamlit.app/](https://finsight-personal-finance-forecastinggit-wjore5uimswrwqelqib6h.streamlit.app/)

---
## 📌 Project Overview

**FinSight** is a full-stack personal finance intelligence prototype designed to help users understand their financial behavior, manage monthly budgets, detect unusual spending, and predict future expenses using machine learning.

The project combines:

* Financial data ingestion
* Mock bank-account connection
* Consent-based account linking simulation
* Transaction processing
* Automatic transaction categorization
* Budget management
* Spending habit analysis
* Recurring expense detection
* Financial analytics
* Machine-learning forecasting
* Explainable AI
* Anomaly detection
* Prediction uncertainty
* What-if financial simulation
* Personalized financial insights

The core academic ML problem remains:

> **Predict a user's total expenses for the next month.**

However, FinSight is designed as a complete financial intelligence product rather than a simple machine-learning prediction script.

---

# 🎯 Project Title

## Personal Finance Forecasting Using Explainable Machine Learning

### Product Name

# **FinSight**

### Product Description

> **FinSight — Personal Finance Forecasting & Financial Intelligence Platform**

The academic title emphasizes the machine-learning component, while **FinSight** is the name of the actual application.

---

# 🚀 What We Are Building

FinSight is designed around a simple idea:

> **Connect → Understand → Analyze → Predict → Plan → Improve**

The user first connects a financial account through a **mock Account Aggregator-style banking flow**.

The prototype then:

1. Discovers mock financial accounts.
2. Lets the user select an account.
3. Shows a consent request.
4. Simulates bank authentication.
5. Fetches the user's previous three months of transaction data.
6. Processes and categorizes transactions.
7. Builds the user's financial profile.
8. Allows the user to set a monthly budget.
9. Analyzes spending habits.
10. Detects recurring expenses.
11. Detects unusual spending.
12. Forecasts next month's expenses.
13. Explains the forecast.
14. Allows what-if financial scenarios.
15. Generates financial insights and alerts.

---

# 🧠 Core Product Philosophy

FinSight should not feel like:

> "A Python program that predicts expenses."

It should feel like:

> **"A personal financial intelligence platform powered by explainable machine learning."**

The ML model is the academic core.

The surrounding application turns that model into a useful financial product.

---

# 🏗️ High-Level Architecture

```text
                         ┌───────────────────────┐
                         │        USER           │
                         └───────────┬───────────┘
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │  Next.js / React UI   │
                         └───────────┬───────────┘
                                     │
                              REST API / JSON
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │     FastAPI Backend   │
                         └───────────┬───────────┘
                                     │
              ┌──────────────────────┼──────────────────────┐
              │                      │                      │
              ▼                      ▼                      ▼
       Authentication        Financial Data          ML Services
              │                      │                      │
              │                      │              ┌───────┼────────┐
              │                      │              │       │        │
              │                      │              ▼       ▼        ▼
              │                      │          Forecast  Anomaly  Explain
              │                      │
              │                      ▼
              │               Transaction Engine
              │                      │
              │          ┌───────────┼────────────┐
              │          ▼           ▼            ▼
              │      Categories   Budgets     Recurring
              │                                  Expenses
              │
              └──────────────────────┐
                                     ▼
                              Financial Database
```

---

# 🔐 Important Banking Architecture

## Prototype Only

FinSight does **not** directly connect to real bank accounts in the academic prototype.

Instead, it implements a **mock banking connection flow** inspired by India's consent-based Account Aggregator ecosystem.

The purpose is to demonstrate what the production user experience could look like without handling real banking credentials or sensitive financial authentication.

---

# 🏦 Mock Bank Connection Flow

The intended user experience is:

```text
Login
  ↓
Connect Bank Account
  ↓
Enter Mobile Number
  ↓
Discover Mock Accounts
  ↓
Select Bank Account
  ↓
Review Data Consent
  ↓
Approve Consent
  ↓
Mock Bank Authentication
  ↓
Bank Data Sharing Approval
  ↓
Fetch Previous 3 Months
  ↓
Transaction Processing
  ↓
Dashboard
```

---

## Example

### Step 1 — Connect Bank

```text
┌─────────────────────────────────────────┐
│           Connect Your Bank              │
│                                         │
│ Connect your financial account to        │
│ automatically understand your spending.  │
│                                         │
│        [ Connect Bank Account ]          │
└─────────────────────────────────────────┘
```

---

### Step 2 — Mobile Number

```text
Find Your Financial Accounts

Mobile Number

+91 98XXXXXX42

[ Continue ]
```

The prototype uses the mobile number to simulate account discovery.

---

### Step 3 — Account Discovery

```text
Accounts Found

○ HDFC Bank
  Savings Account
  XXXX 4821

○ ICICI Bank
  Savings Account
  XXXX 9182

○ State Bank of India
  Savings Account
  XXXX 2214

[ Continue ]
```

---

### Step 4 — Consent

```text
Financial Data Consent

FinSight is requesting:

✓ Account information
✓ Transaction history
✓ Transaction dates
✓ Transaction amounts
✓ Transaction descriptions

Purpose:
Personal financial analysis and
expense forecasting.

Data period:
Last 3 months

[ Approve ]
[ Decline ]
```

---

### Step 5 — Mock Authentication

```text
Connecting to HDFC Bank...

✓ Account discovered
✓ User authenticated
✓ Consent verified
✓ Data access approved
✓ Fetching transactions...
```

---

### Step 6 — Data Import

```text
Financial Data Imported

Transactions: 1,284

Period:
01 July 2026 → 05 October 2026

Accounts:
2

[ Continue ]
```

---

# 🔒 Banking Security Principle

The prototype must never request or store:

* Bank passwords
* Bank PINs
* UPI PINs
* OTPs
* Debit card credentials
* Credit card credentials
* Real banking authentication credentials

The mock connection exists only to demonstrate the intended product workflow.

---

# 🎯 Primary ML Problem

Given historical financial information:

```text
Income
Expenses
Categories
Savings
Account balance
Previous spending
Recurring expenses
Time-related features
```

predict:

> **The user's total expense for the next month.**

---

# 🤖 Machine Learning Problem Type

```text
Supervised Learning
        ↓
Regression
        ↓
Time-Series Forecasting
```

The target variable is:

```text
target_expense
```

Example:

```text
Historical data
      ↓
January + February
      ↓
Predict March expense
```

---

# 🌟 Core Application Features

FinSight consists of the following major product modules.

---

## 1. 🔐 Authentication

Users can:

* Create an account
* Log in
* Log out
* Maintain a session
* Access their financial dashboard

Future production functionality may include:

* Google authentication
* Phone authentication
* Two-factor authentication
* Device/session management

---

# 2. 🏦 Connected Accounts

Users can view their connected financial accounts.

Example:

```text
CONNECTED ACCOUNTS

HDFC Bank
Savings Account
XXXX 4821

Balance:
₹84,500

Status:
✓ Connected
```

Users should also be able to:

* View connected accounts
* View account balances
* View connection status
* Disconnect accounts
* Review consent status

---

# 3. 💳 Transaction Management

Transactions are one of the most important parts of the platform.

Example:

```text
Date       Merchant       Category       Amount
---------------------------------------------------
05 Oct     Swiggy         Food            -₹650
04 Oct     Uber           Transport       -₹320
03 Oct     Amazon         Shopping       -₹2,450
01 Oct     Salary         Income         +₹75,000
```

Users can:

* Search transactions
* Filter transactions
* View transaction details
* Filter by category
* Filter by income/expense
* Filter by date
* Correct categories
* Review unusual transactions

---

# 4. 🏷️ Transaction Categorization

FinSight automatically categorizes transactions.

Example:

```text
Swiggy
   ↓
Food

Uber
   ↓
Transport

Amazon
   ↓
Shopping

Netflix
   ↓
Entertainment

Electricity Board
   ↓
Utilities
```

The prototype can initially use:

* Merchant mapping
* Keyword matching
* Rule-based classification

A future version can use:

* NLP
* ML classification
* User-specific learning

---

# 5. 📊 Dashboard

The dashboard is the primary financial overview.

It should show:

### Financial Summary

```text
Balance
Income
Expenses
Savings
Savings Rate
```

### Budget

```text
Monthly Budget
Actual Spending
Remaining Budget
Budget Variance
```

### Forecast

```text
Next Month Forecast
Prediction Range
Expected Change
```

### Financial Health

```text
Financial Health Score
```

### Insights

```text
Spending Alerts
Habit Insights
Forecast Warnings
Anomalies
```

### Recent Transactions

Display the latest 5–10 transactions.

The dashboard should not display every transaction permanently. Instead:

```text
Recent Transactions

[ View All Transactions ]
```

opens the complete transaction page.

---

# 6. 💰 Monthly Budget Management

At the beginning of each month, users can create a budget.

Example:

```text
OCTOBER BUDGET

Monthly Income
₹75,000

Target Spending
₹45,000

Savings Target
₹30,000
```

Category budgets:

```text
Food             ₹8,000
Transport        ₹5,000
Shopping         ₹6,000
Entertainment    ₹3,000
Utilities        ₹4,000
Other            ₹4,000
```

---

# 7. 📈 Budget Tracking

FinSight continuously compares:

```text
Budget
vs
Actual Spending
```

Example:

```text
FOOD

₹6,820 / ₹8,000

████████████████░░░░

85% Used

⚠ Spending faster than usual
```

Possible states:

```text
✓ On Track
⚠ Approaching Limit
🔴 Over Budget
```

---

# 8. 🧠 Financial Habit Analysis

FinSight analyzes how users behave financially.

Examples:

```text
Food
High frequency

Shopping
Weekend-heavy

Transport
Increasing

Entertainment
Stable

Savings
Strong
```

Potential insights:

> Your weekend spending is 41% higher than your weekday spending.

> Food spending has increased for three consecutive months.

> Your average spending during the final week of the month is higher than your monthly average.

---

# 9. 🔄 Recurring Expense Detection

FinSight identifies repeated financial obligations.

Example:

```text
RECURRING EXPENSES

Rent
₹20,000 / month

Netflix
₹649 / month

Internet
₹999 / month

Insurance
₹2,500 / month
```

Recurring expenses can become features in the forecasting model.

---

# 10. 📅 Upcoming Expense Detection

Based on recurring historical patterns:

```text
UPCOMING EXPECTED EXPENSES

Rent
Expected: 1 Nov
₹20,000

Netflix
Expected: 5 Nov
₹649

Internet
Expected: 8 Nov
₹999
```

These values can also contribute to financial planning.

---

# 11. 🔮 Expense Forecasting

This is the main ML functionality.

Example:

```text
NEXT MONTH FORECAST

₹51,240

Expected Range

₹47,800 — ₹55,100

Compared with Current Month

↑ 6.3%
```

The forecast should not be presented as a guaranteed result.

It is a model-based estimate.

---

# 12. 🧠 Explainable Forecast

FinSight should answer:

> **Why does the model expect this amount?**

Example:

```text
WHY?

Previous Month Expense     +₹3,900
Recurring Expenses         +₹2,100
Food Trend                 +₹1,200
Transport Trend              +₹700
Shopping Trend              -₹450
```

Potential techniques:

```text
SHAP
Feature Importance
Permutation Importance
```

---

# 13. 🚨 Anomaly Detection

The system identifies unusual spending.

Example:

```text
⚠ UNUSUAL TRANSACTION

Amazon

Amount:
₹42,000

Normal Shopping Range:
₹1,000 – ₹8,000

Status:
Highly Unusual
```

Possible methods:

```text
Isolation Forest
IQR
Z-score
```

The final method will be selected based on experimentation.

---

# 14. 🎛️ What-If Financial Simulator

Users can change financial assumptions and immediately see how the forecast changes.

Example:

```text
Current Shopping:
₹8,000

Scenario Shopping:
₹5,500
```

Result:

```text
CURRENT FORECAST

₹51,240

SCENARIO FORECAST

₹48,920

Potential Reduction

₹2,320
```

Possible scenarios:

### Scenario A

Normal spending

### Scenario B

Reduce discretionary spending

### Scenario C

Increase income

### Scenario D

Unexpected expense

### Scenario E

Increase savings target

All outputs must be clearly labeled as:

> **Model-based scenario estimates, not guaranteed financial outcomes.**

---

# 15. 📏 Prediction Uncertainty

FinSight should provide a range rather than pretending the forecast is exact.

Example:

```text
Point Forecast

₹51,240

Prediction Range

₹47,800 — ₹55,100
```

Potential techniques:

* Bootstrap prediction intervals
* Residual-based intervals
* Quantile regression
* Conformal prediction

The final technique will be selected during implementation.

---

# 16. ❤️ Financial Health Score

FinSight can calculate a project-defined financial health indicator.

Possible components:

```text
Savings Rate
Expense-to-Income Ratio
Spending Volatility
Recurring Expense Ratio
Budget Adherence
Expense Growth
```

Example:

```text
FINANCIAL HEALTH

82 / 100

GOOD
```

This is an analytical project metric.

It must not be presented as professional financial advice or a regulated financial score.

---

# 17. 🔔 Financial Alerts

FinSight can generate alerts such as:

### Budget Alert

> Food spending has reached 85% of your monthly budget.

### Forecast Alert

> Next month's predicted expenses are 6.3% higher than this month.

### Anomaly Alert

> An unusually large shopping transaction was detected.

### Habit Alert

> Weekend spending is significantly higher than weekday spending.

### Savings Alert

> You are currently on track to achieve your monthly savings target.

---

# 18. 📑 Monthly Financial Report

At the end of a month, FinSight can summarize:

```text
OCTOBER FINANCIAL REPORT

Income                  ₹75,000
Expenses                ₹48,200
Savings                 ₹26,800
Savings Rate              35.7%

Budget                  ₹45,000
Actual Spending         ₹48,200

Budget Variance          +₹3,200
```

### Highlights

```text
✓ Savings remained strong
⚠ Food spending increased 18%
⚠ Shopping exceeded budget
✓ Transport spending decreased 6%
🔮 November forecast: ₹51,240
```

---

# 📊 Analytics Module

FinSight should provide historical financial analysis.

## Monthly Expense Trend

Line chart showing monthly spending.

## Income vs Expense

Compare monthly income with expenses.

## Category Spending

Show:

```text
Food
Transport
Shopping
Bills
Entertainment
Healthcare
Other
```

## Savings Trend

Track savings over time.

## Spending Volatility

Identify stable vs unstable categories.

## Monthly Comparison

Compare:

```text
Current Month
vs
Previous Month
```

---

# 📚 Academic EDA

The academic analysis should answer:

### Financial Trends

* How does spending change over time?
* Does income affect spending?
* Is savings increasing?
* Is expense growth accelerating?

### Category Behavior

* Which categories consume the most money?
* Which categories are most volatile?
* Which categories are increasing?

### Time Patterns

* Are there seasonal patterns?
* Are particular months more expensive?
* Is spending higher on weekends?
* Does spending increase toward the end of a month?

---

# 📦 Data Pipeline

The system uses two different data paths.

## Prototype Financial Data Flow

```text
Mock Bank
   ↓
Mock Account Connection
   ↓
Mock Consent
   ↓
Transaction Dataset
   ↓
Data Validation
   ↓
Cleaning
   ↓
Categorization
   ↓
Recurring Detection
   ↓
Financial Database
```

## ML Data Flow

```text
Financial Database
        ↓
Transaction Aggregation
        ↓
Monthly Financial Dataset
        ↓
Feature Engineering
        ↓
Time-Aware Split
        ↓
Model Training
        ↓
Evaluation
        ↓
Model Selection
        ↓
Forecast API
```

---

# 🧹 Data Cleaning

The system investigates:

## Missing Values

Possible strategies:

* Median imputation
* Forward filling
* Backward filling
* Domain-based replacement
* Removing rows when justified

## Duplicate Transactions

Duplicate records should be detected and resolved.

## Invalid Values

Examples:

```text
Impossible dates
Invalid transaction amounts
Invalid transaction types
Invalid categories
```

## Outliers

Outliers must be investigated rather than automatically removed.

A large transaction may be completely legitimate.

Therefore:

> **Outlier ≠ automatically incorrect data.**

---

# 🧮 Feature Engineering

The ML system will generate features such as:

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

Potential cyclical encoding:

```text
sin(month)
cos(month)
```

---

# 🚨 Preventing Data Leakage

This is a critical requirement.

When predicting March:

```text
Allowed:

January
February
```

Not allowed:

```text
April
May
June
```

All lag and rolling features must use only information available at prediction time.

---

# 🧪 Machine Learning Models

The current implementation uses a **Random Forest** as the primary forecasting model.

Model experimentation can include:

## Baseline

```text
Previous Month Expense
```

## Linear Regression

Provides an interpretable linear baseline.

## Random Forest Regressor

Captures:

* Nonlinear relationships
* Feature interactions
* Complex financial behavior

## Gradient Boosting

Provides another strong tree-based regression comparison.

## Optional Models

If the dataset supports them:

```text
ARIMA
SARIMA
XGBoost
```

---

# 🧪 Model Comparison

The project should compare models using:

| Model                   | MAE | RMSE | R² |
| ----------------------- | --: | ---: | -: |
| Previous Month Baseline |   — |    — |  — |
| Linear Regression       |   — |    — |  — |
| Random Forest           |   — |    — |  — |
| Gradient Boosting       |   — |    — |  — |
| Optional ARIMA          |   — |    — |  — |

Actual values must come from experiments.

**No performance numbers should be fabricated.**

---

# 📏 Evaluation Metrics

## MAE

Mean Absolute Error.

Answers:

> On average, how many rupees away is the prediction from the actual expense?

## RMSE

Root Mean Squared Error.

Penalizes larger errors more heavily.

## R²

Measures the amount of variation explained by the model.

---

# ⏱️ Time-Aware Validation

Random train/test splitting should not be the primary forecasting evaluation strategy.

Use chronological evaluation.

Example:

```text
2022 ─────────────── 2024 | 2025
        TRAINING          TEST
```

For cross-validation:

```text
TimeSeriesSplit
```

Example:

```text
Fold 1
Train → 2022
Test  → early 2023

Fold 2
Train → 2022 + early 2023
Test  → late 2023

Fold 3
Train → 2022–2023
Test  → 2024
```

---

# 🤖 Current ML Implementation

The current implementation contains:

### Data Pipeline

```text
src/preprocessing.py
```

Responsible for:

* Reading financial data
* Cleaning data
* Feature engineering
* Time-series feature construction
* Preventing future-data leakage

The current feature engineering includes rolling and growth-based financial variables.

### ML Engine

```text
src/train_model.py
```

Responsible for:

* Training forecasting models
* Evaluating models
* Saving trained models
* Expense forecasting
* Anomaly detection

Current important models:

```text
Random Forest
Isolation Forest
```

---

# 🚨 Isolation Forest

The current ML engine uses **Isolation Forest** for unusual spending detection.

This operates separately from the expense forecasting model.

Conceptually:

```text
Transaction Data
       ↓
Behavior Features
       ↓
Isolation Forest
       ↓
Normal / Anomaly
```

---

# 🔌 Backend API

The backend is implemented using:

# FastAPI

Current backend entry point:

```text
backend/main.py
```

The backend is responsible for:

* Loading trained ML models
* Receiving financial data
* Running predictions
* Running anomaly detection
* Returning structured JSON responses
* Serving the frontend with ML functionality

---

# 🌐 Frontend Application

The application frontend is implemented using:

# Next.js + React

The frontend provides the production-style SaaS interface.

The original Streamlit prototype was replaced with this architecture.

---

# 🖥️ Frontend Product Structure

The application should contain:

```text
Dashboard
Transactions
Analytics
Budget
Forecast
My Habits
Alerts
Accounts
What-If Simulator
Settings
```

The academic ML functionality can be surfaced under:

```text
Analytics
Forecast
```

rather than making the entire application look like an ML laboratory.

---

# 🏠 Dashboard

The dashboard should prioritize actionable information.

Example:

```text
┌──────────────────────────────────────────────────────────────┐
│ FinSight                                   October 2026      │
│ Good evening                                                 │
├────────────┬────────────┬────────────┬──────────────────────┤
│ Balance    │ Income     │ Expenses   │ Savings              │
│ ₹84,500    │ ₹75,000    │ ₹48,200    │ ₹26,800              │
├────────────┴────────────┴────────────┴──────────────────────┤
│                                                              │
│ October Spending                                             │
│                                                              │
│ Budget: ₹45,000     Actual: ₹48,200                         │
│ ████████████████████████████████████                         │
│                                                              │
│ ⚠ ₹3,200 over budget                                        │
│                                                              │
├───────────────────────────────────┬──────────────────────────┤
│ Expense Forecast                 │ Financial Health         │
│                                  │                          │
│ ₹51,240                          │       82 / 100           │
│ ↑ 6.3%                           │         GOOD             │
│                                  │                          │
├───────────────────────────────────┴──────────────────────────┤
│                                                              │
│ Spending by Category                                         │
│                                                              │
│ Food           ███████████████ ₹9,400                       │
│ Shopping       ██████████      ₹6,200                       │
│ Transport      ███████         ₹4,800                       │
│ Utilities      █████           ₹4,100                       │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ Insights                                                     │
│                                                              │
│ • Food spending increased 18%                                │
│ • Weekend spending is higher than weekday spending          │
│ • Forecast may exceed your budget next month                 │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ Recent Transactions                                          │
│                                                              │
│ Swiggy          Food             -₹650                       │
│ Uber            Transport        -₹320                       │
│ Amazon          Shopping         -₹2,450                     │
└──────────────────────────────────────────────────────────────┘
```

---

# 💳 Transactions Page

The transaction page provides a complete financial history.

Features:

* Search
* Category filter
* Income/expense filter
* Date filter
* Transaction details
* Category editing
* Anomaly indicators

Example:

```text
05 Oct   Swiggy        Food          -₹650
04 Oct   Uber          Transport     -₹320
03 Oct   Amazon        Shopping      -₹2,450
01 Oct   Salary        Income        +₹75,000
```

---

# 💰 Budget Page

The budget page contains:

```text
Monthly Income
Monthly Budget
Savings Target
Category Budgets
Budget Utilization
Budget Variance
```

Example:

```text
Food
₹6,820 / ₹8,000
85%

Transport
₹3,200 / ₹5,000
64%

Shopping
₹6,200 / ₹6,000
103%
🔴 Over Budget
```

---

# 📊 Analytics Page

The analytics page combines:

* Historical financial trends
* Category analysis
* Savings analysis
* Spending behavior
* Monthly comparisons
* Recurring expenses
* Spending volatility

---

# 🧠 My Habits Page

This page focuses specifically on behavioral patterns.

Possible sections:

```text
Spending Frequency
Top Categories
Weekend vs Weekday
End-of-Month Spending
Recurring Payments
Spending Growth
Savings Behavior
```

Example:

> Your weekend spending is 41% higher than your weekday spending.

---

# 🔮 Forecast Page

The forecast page contains:

```text
Next Month Forecast

₹51,240

Prediction Range

₹47,800 — ₹55,100

Expected Change

+6.3%
```

It should also display:

* Prediction explanation
* Important features
* Historical trend
* Forecast confidence/range
* Budget comparison

---

# 🎛️ What-If Simulator

The user can adjust financial variables.

Example:

```text
Income
₹75,000

Food
₹8,000 → ₹6,000

Shopping
₹6,000 → ₹4,500

Transport
₹5,000 → ₹4,000
```

The backend generates a new prediction.

```text
Current Forecast:
₹51,240

Scenario Forecast:
₹47,900

Estimated Difference:
₹3,340
```

---

# 🚨 Alerts Page

Centralized alerts:

```text
⚠ Food budget 85% used

🚨 Unusual transaction detected

⚠ Forecast exceeds planned budget

📈 Shopping expenses increased 18%

✓ Savings target currently on track
```

---

# 🏦 Accounts Page

Shows:

* Connected banks
* Account type
* Masked account number
* Current balance
* Connection status
* Consent status
* Last data refresh
* Disconnect option

Example:

```text
HDFC Bank
Savings Account
XXXX 4821

Connected
Last synced:
05 Oct 2026
```

---

# ⚙️ Settings

Potential settings:

```text
Profile
Currency
Budget Preferences
Categories
Connected Accounts
Consent Management
Notifications
Security
Data Management
```

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

The frontend provides the modern SaaS interface.

---

## Backend

```text
Python
FastAPI
Pydantic
Uvicorn
```

FastAPI exposes REST endpoints for:

* Financial data
* Forecasting
* Anomaly detection
* Budget calculations
* Financial insights

---

## Data Processing

```text
Pandas
NumPy
```

Used for:

* Data cleaning
* Aggregation
* Transformation
* Feature engineering
* Statistical calculations

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
* Metrics
* Preprocessing

---

## Explainable AI

```text
SHAP
```

Used where compatible with the selected final forecasting model.

---

## Model Persistence

```text
Joblib
```

Used to save:

```text
Forecast model
Preprocessing pipeline
Model metadata
```

---

## Visualization

Frontend visualizations can use a React-compatible charting library.

ML notebooks may use:

```text
Matplotlib
Seaborn
Plotly
```

---

# 📁 Proposed Project Structure

The project is now organized around the full-stack architecture.

```text
finsight-personal-finance-forecasting/
│
├── README.md
├── requirements.txt
├── .gitignore
├── .env.example
│
├── backend/
│   ├── main.py
│   │
│   ├── routes/
│   │   ├── auth.py
│   │   ├── accounts.py
│   │   ├── transactions.py
│   │   ├── budget.py
│   │   ├── forecast.py
│   │   ├── analytics.py
│   │   └── insights.py
│   │
│   ├── services/
│   │   ├── mock_bank.py
│   │   ├── consent.py
│   │   ├── transaction_service.py
│   │   ├── budget_service.py
│   │   ├── forecast_service.py
│   │   ├── anomaly_service.py
│   │   └── insight_service.py
│   │
│   └── models/
│       ├── user.py
│       ├── account.py
│       ├── transaction.py
│       └── budget.py
│
├── frontend/
│   ├── package.json
│   ├── next.config.js
│   │
│   ├── app/
│   │   ├── page.jsx
│   │   ├── login/
│   │   ├── onboarding/
│   │   ├── dashboard/
│   │   ├── transactions/
│   │   ├── analytics/
│   │   ├── budget/
│   │   ├── forecast/
│   │   ├── habits/
│   │   ├── alerts/
│   │   ├── accounts/
│   │   └── settings/
│   │
│   ├── components/
│   │   ├── dashboard/
│   │   ├── transactions/
│   │   ├── budget/
│   │   ├── forecast/
│   │   ├── charts/
│   │   └── ui/
│   │
│   └── lib/
│       └── api.js
│
├── src/
│   ├── preprocessing.py
│   ├── train_model.py
│   │
│   ├── features/
│   │   ├── lag_features.py
│   │   ├── rolling_features.py
│   │   └── financial_features.py
│   │
│   ├── forecasting/
│   │   └── predictor.py
│   │
│   ├── anomaly/
│   │   └── detector.py
│   │
│   ├── explainability/
│   │   └── explainer.py
│   │
│   └── insights/
│       └── generator.py
│
├── data/
│   ├── raw/
│   │   └── financial_data.csv
│   │
│   ├── processed/
│   │   └── monthly_financial_data.csv
│   │
│   └── mock/
│       ├── mock_accounts.json
│       └── mock_transactions.json
│
├── models/
│   ├── forecast_model.pkl
│   ├── anomaly_model.pkl
│   ├── preprocessing.pkl
│   └── metadata.json
│
├── notebooks/
│   ├── 01_dataset_exploration.ipynb
│   ├── 02_data_cleaning.ipynb
│   ├── 03_eda.ipynb
│   ├── 04_feature_engineering.ipynb
│   ├── 05_model_training.ipynb
│   ├── 06_model_comparison.ipynb
│   └── 07_error_analysis.ipynb
│
├── tests/
│   ├── test_data.py
│   ├── test_features.py
│   ├── test_model.py
│   ├── test_api.py
│   └── test_prediction.py
│
├── assets/
│   ├── screenshots/
│   └── diagrams/
│
└── docs/
    ├── architecture.md
    ├── methodology.md
    ├── experiments.md
    ├── banking-prototype.md
    └── limitations.md
```

---

# 🔄 Complete System Workflow

```text
                         USER
                           │
                           ▼
                     LOGIN / SIGNUP
                           │
                           ▼
                  CONNECT BANK ACCOUNT
                           │
                           ▼
                  ENTER MOBILE NUMBER
                           │
                           ▼
                   MOCK ACCOUNT DISCOVERY
                           │
                           ▼
                    SELECT ACCOUNT
                           │
                           ▼
                    CONSENT SCREEN
                           │
                           ▼
                  MOCK BANK AUTHENTICATION
                           │
                           ▼
                    DATA APPROVAL
                           │
                           ▼
               FETCH PREVIOUS 3 MONTHS
                           │
                           ▼
                  TRANSACTION PROCESSING
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        Categorization  Recurring    Validation
                         Detection
              │            │            │
              └────────────┼────────────┘
                           ▼
                    FINANCIAL PROFILE
                           │
                           ▼
                     SET MONTHLY BUDGET
                           │
                           ▼
                      DASHBOARD
                           │
           ┌───────────────┼────────────────┐
           ▼               ▼                ▼
       Analytics        Budget           Transactions
           │               │                │
           └───────────────┼────────────────┘
                           ▼
                    HABIT ANALYSIS
                           │
                           ▼
                  ML FORECASTING ENGINE
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
      Forecast         Anomaly         Explainability
          │             Detection            │
          └────────────────┼────────────────┘
                           ▼
                     WHAT-IF ENGINE
                           │
                           ▼
                    FINANCIAL INSIGHTS
                           │
                           ▼
                       ALERTS
```

---

# 🧪 Academic Development Pipeline

The research/ML side follows:

```text
Raw Dataset
    ↓
Data Understanding
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
Final Model
    ↓
Explainability
    ↓
Anomaly Detection
    ↓
Uncertainty
    ↓
Deployment
```

---

# 🛠️ Development Phases

## PHASE 0 — Project Architecture

### Goal

Finalize the product and technical architecture.

### Tasks

* Finalize FinSight branding
* Define system modules
* Define frontend/backend architecture
* Define mock banking flow
* Define ML target
* Define API structure
* Create GitHub repository

### Deliverables

```text
Architecture
README
Repository
Initial frontend
Initial backend
```

---

# PHASE 1 — Dataset & Mock Financial Data

### Goal

Establish the financial data source.

### Tasks

* Select public dataset
* Document dataset
* Validate columns
* Create mock bank accounts
* Create mock transaction data
* Define transaction schema

### Deliverables

```text
Raw dataset
Mock accounts
Mock transactions
Dataset documentation
```

---

# PHASE 2 — Data Processing

### Goal

Build the data pipeline.

### Tasks

* Missing-value handling
* Duplicate detection
* Date processing
* Transaction validation
* Category normalization
* Monthly aggregation

---

# PHASE 3 — EDA

### Goal

Understand financial behavior.

### Tasks

* Monthly expense analysis
* Income analysis
* Savings analysis
* Category analysis
* Correlation analysis
* Spending volatility
* Seasonal analysis

---

# PHASE 4 — Feature Engineering

Create:

```text
Lag features
Rolling averages
Growth rates
Financial ratios
Recurring expense features
Time features
Seasonal features
```

---

# PHASE 5 — Baseline Model

Implement:

```text
Previous Month Expense
```

The baseline establishes the minimum forecasting performance that a complex ML model must beat.

---

# PHASE 6 — ML Model Development

Train:

```text
Linear Regression
Random Forest
Gradient Boosting
```

Optional:

```text
XGBoost
ARIMA
SARIMA
```

---

# PHASE 7 — Model Evaluation

Evaluate using:

```text
MAE
RMSE
R²
```

Use:

```text
TimeSeriesSplit
```

where appropriate.

---

# PHASE 8 — Forecast API

Connect the trained model to FastAPI.

Example conceptual endpoint:

```text
POST /api/forecast
```

Input:

```json
{
  "income": 75000,
  "food_expense": 8000,
  "transport_expense": 5000,
  "shopping_expense": 6000
}
```

Output:

```json
{
  "forecast": 51240,
  "lower_bound": 47800,
  "upper_bound": 55100
}
```

---

# PHASE 9 — Anomaly API

Example:

```text
POST /api/anomaly
```

The backend returns:

```json
{
  "is_anomaly": true,
  "severity": "high",
  "score": 0.91
}
```

---

# PHASE 10 — Explainability

Implement:

```text
SHAP
Feature Importance
Permutation Importance
```

Expose the result through the forecast UI.

---

# PHASE 11 — Budget System

Implement:

* Monthly budget
* Category budgets
* Budget tracking
* Budget variance
* Budget alerts
* Savings target

---

# PHASE 12 — Habit Intelligence

Implement:

* Spending trends
* Category behavior
* Weekend/weekday behavior
* End-of-month behavior
* Recurring payments
* Spending growth

---

# PHASE 13 — What-If Simulator

Implement:

```text
Baseline
    ↓
Modify financial inputs
    ↓
Call forecast API
    ↓
Compare results
```

---

# PHASE 14 — Frontend Integration

Build:

```text
Login
Onboarding
Bank Connection
Consent
Dashboard
Transactions
Budget
Analytics
Habits
Forecast
What-If
Alerts
Accounts
Settings
```

---

# PHASE 15 — Testing

## Data Tests

* Missing values
* Duplicate records
* Invalid dates
* Invalid amounts
* Category validation

## ML Tests

* Feature consistency
* Prediction shape
* No future leakage
* Model loading
* Forecast stability

## API Tests

* Valid requests
* Invalid requests
* Missing parameters
* Authentication
* Error handling

## Frontend Tests

* Login flow
* Bank connection flow
* Dashboard rendering
* Transaction filtering
* Budget calculations
* Forecast display
* What-if simulation

---

# PHASE 16 — Final Integration

Connect:

```text
Frontend
   ↓
FastAPI
   ↓
Financial Services
   ↓
ML Services
   ↓
Models
   ↓
Financial Data
```

---

# PHASE 17 — Documentation & Report

Prepare:

```text
README
Architecture Documentation
Dataset Documentation
Methodology
Experiments
Model Evaluation
Application Documentation
Limitations
Future Work
```

---

# 🧪 Testing Strategy

The system should test both product and ML functionality.

## Data Layer

```text
✓ Valid transactions
✓ Duplicate transactions
✓ Missing values
✓ Invalid dates
✓ Invalid amounts
```

## ML Layer

```text
✓ Features generated correctly
✓ No future leakage
✓ Model loads correctly
✓ Prediction returns numerical result
✓ Prediction range is valid
```

## Backend

```text
✓ API starts
✓ Endpoints respond
✓ Invalid input handled
✓ Model errors handled
✓ Authentication enforced where applicable
```

## Frontend

```text
✓ Login works
✓ Onboarding works
✓ Mock bank flow works
✓ Transactions load
✓ Budget updates
✓ Forecast loads
✓ What-if scenario works
```

---

# 🔒 Security & Privacy

Because FinSight deals with financial information, security is a major design principle.

The prototype must:

* Never request real banking passwords
* Never request UPI PINs
* Never request real OTPs
* Never store card credentials
* Never expose sensitive financial information
* Never commit secrets to GitHub
* Use masked account numbers
* Use synthetic/mock financial accounts
* Use anonymized user identifiers

Real banking integration is a future production feature and is outside the scope of the academic prototype.

---

# ⚠️ Important Prototype Limitation

The bank connection is **simulated**.

The prototype does not actually retrieve transactions from:

* HDFC
* ICICI
* SBI
* Axis
* Other real banks

Instead, the system simulates:

```text
Account Discovery
→ Account Selection
→ Consent
→ Authentication
→ Data Sharing
→ Transaction Retrieval
```

This allows the project to demonstrate the complete user experience without handling real banking credentials or financial accounts.

---

# 🧑‍💻 Current Implementation

The current system has four major technical layers.

## 1. Data Pipeline

```text
src/preprocessing.py
```

Responsible for:

* Loading raw financial data
* Cleaning
* Feature engineering
* Rolling features
* Growth rates
* Time-series preparation
* Preventing future-data leakage

---

## 2. ML Engine

```text
src/train_model.py
```

Responsible for:

* Training forecasting models
* Evaluating models
* Random Forest expense forecasting
* Isolation Forest anomaly detection
* Saving trained models

---

## 3. Backend API

```text
backend/main.py
```

Built with:

```text
FastAPI
```

Responsible for:

* Loading trained models
* Forecast API
* Anomaly API
* Financial services
* Backend/frontend communication

---

## 4. Frontend

```text
frontend/
```

Built with:

```text
Next.js
React
JavaScript
```

Responsible for:

* SaaS dashboard
* Financial overview
* Transactions
* Forecasting interface
* What-if simulator
* Budget interface
* Account connection UX
* Financial insights

---

# 🆚 Evolution of the Prototype

The project originally started as a basic Streamlit application.

### Original Architecture

```text
Python
   ↓
Streamlit
   ↓
ML Model
   ↓
Prediction
```

This was useful for validating the ML concept.

However, it was replaced with a more professional full-stack architecture.

### Current Architecture

```text
Next.js / React
       ↓
    FastAPI
       ↓
Financial Services
       ↓
ML Engine
       ↓
Forecast / Anomaly / Explainability
```

This allows FinSight to behave more like a real SaaS product.

---

# 📦 Requirements

## Python

```text
Python 3.11+
```

Expected Python dependencies include:

```text
pandas
numpy
scikit-learn
fastapi
uvicorn
joblib
shap
```

Optional:

```text
statsmodels
xgboost
```

---

## Frontend

The frontend uses:

```text
Node.js
Next.js
React
npm
```

---

# ▶️ Running the Project

## 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/finsight-personal-finance-forecasting.git
cd finsight-personal-finance-forecasting
```

---

# 2. Backend Setup

```bash
cd backend
```

Create a Python environment:

```bash
python -m venv venv
```

Activate it.

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
pip install -r ../requirements.txt
```

Run FastAPI:

```bash
uvicorn main:app --reload
```

Backend:

```text
http://localhost:8000
```

API documentation:

```text
http://localhost:8000/docs
```

---

# 3. Frontend Setup

```bash
cd frontend
```

Install packages:

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

# 🧠 ML Model Training

The training pipeline can be executed using:

```bash
python src/train_model.py
```

The resulting models are stored under:

```text
models/
```

Example:

```text
models/
├── forecast_model.pkl
├── anomaly_model.pkl
├── preprocessing.pkl
└── metadata.json
```

---

# 📊 Expected Model Output

Example:

```json
{
  "forecast": 51240,
  "lower_bound": 47800,
  "upper_bound": 55100,
  "change_percentage": 6.3
}
```

---

# 📈 Example Financial Insight

```text
Your predicted expenses for next month are
₹51,240.

This is approximately 6.3% higher than your
current monthly expenses.

The major contributors are:

• Previous spending trend
• Food expenses
• Recurring expenses
• Transportation growth

Your current monthly budget of ₹45,000 may be
approximately ₹6,240 below the predicted expense.
```

---

# 🌳 Git/GitHub Strategy

Recommended repository:

```text
finsight-personal-finance-forecasting
```

Recommended branches:

```text
main

feature/auth
feature/mock-bank
feature/transactions
feature/budget
feature/preprocessing
feature/model-training
feature/forecast-api
feature/anomaly-detection
feature/explainability
feature/frontend
feature/what-if
feature/testing
```

---

# 📝 Commit Examples

```text
feat: add mock bank account discovery
feat: implement consent flow
feat: add transaction ingestion
feat: add transaction categorization
feat: implement monthly budget
feat: add recurring expense detection
feat: implement financial habit analysis
feat: add random forest forecasting
feat: add isolation forest anomaly detection
feat: expose forecast API
feat: integrate forecast dashboard
feat: add what-if simulator
feat: add financial insights
fix: handle invalid transaction data
fix: prevent future data leakage
docs: update architecture documentation
```

---

# 📋 Academic Deliverables

The project will provide evidence for:

## Problem Definition

Formal definition of the financial forecasting problem.

## Dataset

Dataset source, structure, quality, and limitations.

## Data Preprocessing

Cleaning and feature engineering.

## EDA

Financial trends and behavioral analysis.

## Model Development

Multiple ML models and baseline comparison.

## Evaluation

MAE, RMSE, R² and time-aware validation.

## Explainability

Feature importance and prediction explanations.

## Anomaly Detection

Unusual spending identification.

## Application

Functional full-stack FinSight prototype.

## Documentation

Technical and academic documentation.

---

# 🎓 Expected Academic Contribution

The project demonstrates:

```text
Supervised Learning
        +
Regression
        +
Time-Series Forecasting
        +
Feature Engineering
        +
Data Cleaning
        +
Exploratory Data Analysis
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

This makes the project significantly stronger than a basic single-model regression assignment.

---

# ⚠️ Limitations

## Historical behavior may change

Past spending does not guarantee future spending.

## Unexpected events

Emergency expenses and major purchases may not be predictable.

## Dataset limitations

Public or synthetic data may not perfectly represent real financial users.

## Limited history

Three months of data is useful for the prototype but insufficient for robust long-term seasonal modeling.

## Mock banking connection

The prototype does not connect to real banks.

## Forecast uncertainty

ML predictions are estimates rather than guaranteed future outcomes.

## Financial advice

FinSight is an academic analytical prototype and is not intended to provide regulated financial advice.

---

# 🚀 Future Improvements

Future production versions could include:

## Real Account Aggregator Integration

Replace the mock bank layer with an appropriate regulated financial-data integration.

## Automatic Transaction Categorization

Use NLP/ML to improve merchant and transaction classification.

## Personalized Models

Train models specifically for individual users.

## More Forecast Targets

Predict:

```text
Next Month Expenses
Savings
Cash Flow
Budget Risk
Goal Completion
Emergency Fund Growth
```

## Goal-Based Financial Planning

Users could create:

```text
Emergency Fund
New Laptop
Vacation
Education
Vehicle
Home
```

FinSight could estimate whether the user is on track.

## Deep Learning

Potential future models:

```text
LSTM
GRU
Temporal Fusion Transformer
```

if sufficient longitudinal data becomes available.

## Mobile Application

Build native Android/iOS applications.

## Production Infrastructure

Potential stack:

```text
Docker
Cloud Hosting
Database
Authentication
Monitoring
CI/CD
```

---

# 🎯 Definition of Done

## Product

* [ ] User registration/login
* [ ] Mock bank connection
* [ ] Mock account discovery
* [ ] Mock consent flow
* [ ] Mock authentication
* [ ] Three-month transaction import
* [ ] Transaction categorization
* [ ] Transaction page
* [ ] Dashboard
* [ ] Monthly budget
* [ ] Budget tracking
* [ ] Habit analysis
* [ ] Recurring expense detection
* [ ] Financial alerts
* [ ] Financial health score
* [ ] Forecast page
* [ ] What-if simulator
* [ ] Accounts page
* [ ] Settings

## Machine Learning

* [ ] Dataset documented
* [ ] Data cleaning implemented
* [ ] EDA completed
* [ ] Feature engineering implemented
* [ ] Baseline model created
* [ ] Multiple models trained
* [ ] Time-aware evaluation performed
* [ ] MAE calculated
* [ ] RMSE calculated
* [ ] R² calculated
* [ ] Final model selected
* [ ] Error analysis completed
* [ ] Explainability implemented
* [ ] Anomaly detection implemented
* [ ] Prediction uncertainty implemented

## Engineering

* [ ] FastAPI backend functional
* [ ] Next.js frontend functional
* [ ] Frontend/backend integration complete
* [ ] API validation implemented
* [ ] Error handling implemented
* [ ] Tests implemented
* [ ] Environment variables documented
* [ ] No secrets committed
* [ ] README completed

## Academic

* [ ] Problem definition
* [ ] Dataset documentation
* [ ] EDA
* [ ] Methodology
* [ ] Experiments
* [ ] Evaluation
* [ ] Results
* [ ] Limitations
* [ ] Future work
* [ ] Final report
* [ ] Presentation
* [ ] Viva preparation

---

# 🧭 Final Product Vision

FinSight is built around three major layers.

## Layer 1 — Financial Data

> **Bring financial information together.**

```text
Bank Accounts
Transactions
Income
Expenses
Recurring Payments
```

---

## Layer 2 — Financial Intelligence

> **Understand what is happening with the user's money.**

```text
Budget
Analytics
Habits
Categories
Anomalies
Financial Health
Insights
```

---

## Layer 3 — Predictive Intelligence

> **Understand what is likely to happen next.**

```text
Expense Forecast
Prediction Range
Explainable AI
What-If Scenarios
Budget Risk
Future Planning
```

---

# 🔄 The FinSight Intelligence Loop

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
                       │
                       └───────────→ UPDATE DATA
```

---

# 🏁 Final Vision

The final application should not feel like:

> **"A Python script that predicts expenses."**

It should feel like:

> # **"FinSight — a personal financial intelligence platform powered by explainable machine learning."**

The academic requirement remains:

> **Forecast future personal expenses using machine learning.**

But the complete product adds:

```text
             FINANCIAL DATA
                    +
              TRANSACTIONS
                    +
                 BUDGET
                    +
              HABIT ANALYSIS
                    +
             ANOMALY DETECTION
                    +
                FORECASTING
                    +
             EXPLAINABLE AI
                    +
             WHAT-IF PLANNING
                    +
              FINANCIAL INSIGHTS
                    ↓
                 FINSIGHT
```

**FinSight is therefore both:**

1. **An academically defensible machine-learning project**, and
2. **A realistic prototype of a personal financial intelligence product.**

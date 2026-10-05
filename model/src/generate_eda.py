import json

notebook = {
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": ["# Exploratory Data Analysis (EDA)\n", "This notebook analyzes the transaction dataset to find correlations, distributions, and patterns. We check for missing values, duplicates, and outline the general financial profile."]
  },
  {
   "cell_type": "code",
   "execution_count": None,
   "metadata": {},
   "outputs": [],
   "source": [
    "import pandas as pd\n",
    "import matplotlib.pyplot as plt\n",
    "import seaborn as sns\n",
    "import os\n\n",
    "df = pd.read_csv('../model/data/Personal_Finance_Dataset.csv')\n",
    "df['Date'] = pd.to_datetime(df['Date'])\n",
    "print(f\"Dataset Shape: {df.shape}\")\n",
    "print(f\"Missing Values:\\n{df.isnull().sum()}\\n\")\n",
    "print(f\"Duplicate Rows: {df.duplicated().sum()}\")\n",
    "df.head()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": ["## 1. Monthly Expense Trend"]
  },
  {
   "cell_type": "code",
   "execution_count": None,
   "metadata": {},
   "outputs": [],
   "source": [
    "expenses = df[df['Type'].str.lower() == 'expense']\n",
    "monthly_expenses = expenses.resample('ME', on='Date')['Amount'].sum()\n",
    "plt.figure(figsize=(10,5))\n",
    "monthly_expenses.plot(kind='line', marker='o', color='red')\n",
    "plt.title('Monthly Expense Trend')\n",
    "plt.ylabel('Amount')\n",
    "plt.show()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": ["## 2. Category Distribution & Outliers"]
  },
  {
   "cell_type": "code",
   "execution_count": None,
   "metadata": {},
   "outputs": [],
   "source": [
    "plt.figure(figsize=(12,6))\n",
    "sns.boxplot(x='Category', y='Amount', data=expenses)\n",
    "plt.title('Expense Distribution by Category (Outlier Detection)')\n",
    "plt.xticks(rotation=45)\n",
    "plt.show()\n\n",
    "cat_sum = expenses.groupby('Category')['Amount'].sum().sort_values(ascending=False)\n",
    "plt.figure(figsize=(10,5))\n",
    "sns.barplot(x=cat_sum.index, y=cat_sum.values)\n",
    "plt.title('Total Spending by Category')\n",
    "plt.xticks(rotation=45)\n",
    "plt.show()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": ["## 3. Savings Trend (Income vs Expense)"]
  },
  {
   "cell_type": "code",
   "execution_count": None,
   "metadata": {},
   "outputs": [],
   "source": [
    "income = df[df['Type'].str.lower() == 'income'].resample('ME', on='Date')['Amount'].sum()\n",
    "savings = income - monthly_expenses\n",
    "plt.figure(figsize=(10,5))\n",
    "savings.plot(kind='bar', color=savings.apply(lambda x: 'green' if x > 0 else 'red'))\n",
    "plt.title('Monthly Savings (Income - Expense)')\n",
    "plt.ylabel('Savings Amount')\n",
    "plt.show()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": ["## 4. Correlation Matrix (Monthly Features)"]
  },
  {
   "cell_type": "code",
   "execution_count": None,
   "metadata": {},
   "outputs": [],
   "source": [
    "features_df = pd.read_csv('../model/data/monthly_features.csv')\n",
    "plt.figure(figsize=(12,8))\n",
    "sns.heatmap(features_df.drop(['year_month'], axis=1).corr(), annot=True, cmap='coolwarm', fmt='.2f')\n",
    "plt.title('Feature Correlation Matrix')\n",
    "plt.show()"
   ]
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "name": "python"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 4
}

with open('../../notebooks/01_eda.ipynb', 'w') as f:
    json.dump(notebook, f, indent=1)
print("Updated EDA notebook successfully.")

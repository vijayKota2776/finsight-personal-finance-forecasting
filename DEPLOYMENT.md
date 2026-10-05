# Deployment Guide: FinSight Streamlit App

The easiest and free way to deploy a Streamlit application so anyone can access it via a URL is using **Streamlit Community Cloud**.

## Prerequisites
1. Your code must be pushed to a public GitHub repository. (We have already done this!)
2. Ensure `requirements.txt` is up-to-date in the root of your repository.

## Steps to Deploy

1. **Sign up for Streamlit Cloud:**
   Go to [share.streamlit.io](https://share.streamlit.io) and sign in using your GitHub account.

2. **Create a New App:**
   - Click the **"New app"** button.
   - You might be asked to authorize Streamlit to access your GitHub repositories. Accept this.

3. **Configure the App:**
   - **Repository:** Select your repository (e.g., `vijayKota2776/finsight-personal-finance-forecasting`).
   - **Branch:** `main`
   - **Main file path:** Type `src/app.py` (This is crucial, as our app is inside the `src` folder, not the root).

4. **Deploy:**
   - Click **"Deploy!"**
   - Streamlit will read your `requirements.txt`, install all the libraries (like `shap`, `scikit-learn`, `pandas`), and launch the app.
   - This process takes about 2-3 minutes.

5. **Share:**
   - Once it's running, the URL at the top of your browser is public. You can share this link in your resume, portfolio, or with your professors!

## Troubleshooting
- **ModuleNotFoundError:** If Streamlit Cloud says a module is missing (e.g., `ModuleNotFoundError: No module named 'shap'`), it means the module is missing from your `requirements.txt` file. Make sure it is listed there.
- **File Not Found Errors:** If the app can't find `models/rf_forecasting_model.pkl`, ensure that the `models/` folder and `.pkl` files were pushed to GitHub.

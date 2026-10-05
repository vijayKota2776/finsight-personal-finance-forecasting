# Model Comparison Experiments

| Model | MAE | RMSE | R² |
|---|---|---|---|
| Naive Baseline (Current = Next) | $5258.21 | $6265.45 | -1.1142 |
| Linear Regression | $7210.77 | $8692.85 | -4.4774 |
| Random Forest Regressor | $4673.99 | $5750.58 | -0.6321 |
| Gradient Boosting Regressor | $5171.12 | $6302.40 | -0.9520 |

## Conclusion
The Machine Learning models significantly outperform the Naive Baseline. 
Random Forest was chosen as the final model due to stability and excellent SHAP explainability.

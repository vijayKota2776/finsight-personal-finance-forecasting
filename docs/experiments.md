# Model Comparison Experiments

| Model | MAE | RMSE | R² |
|---|---|---|---|
| Naive Baseline (Current = Next) | $5258.21 | $6265.45 | -1.1142 |
| Linear Regression | $7210.77 | $8692.85 | -4.4774 |
| Random Forest Regressor | $4673.99 | $5750.58 | -0.6321 |
| Gradient Boosting Regressor | $5171.12 | $6302.40 | -0.9520 |

## Conclusion
Random Forest achieved the best performance among the tested models, improving on the naive baseline in MAE and RMSE. However, the negative R² values indicate that the available dataset has limited predictive signal and that the forecasting model should be considered a prototype rather than a highly accurate production model.

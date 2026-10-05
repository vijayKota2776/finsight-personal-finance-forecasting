import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from model.src.train_model import evaluate_model

def test_model_training_and_evaluation():
    """Test that the model can train and evaluate successfully on dummy data."""
    
    # Create dummy data matrix
    np.random.seed(42)
    X = pd.DataFrame(np.random.rand(50, 5), columns=['f1', 'f2', 'f3', 'f4', 'f5'])
    y = pd.Series(np.random.rand(50))
    
    model = RandomForestRegressor(n_estimators=10, random_state=42)
    
    # Train
    model.fit(X, y)
    
    # Predict
    preds = model.predict(X)
    assert len(preds) == len(X)
    
    # Test TimeSeries validation loop
    # 50 samples is enough for 2 splits
    metrics = evaluate_model(model, X, y, n_splits=2)
    
    assert 'MAE' in metrics
    assert 'RMSE' in metrics
    assert 'R2' in metrics
    
    print("test_model_training_and_evaluation passed successfully!")

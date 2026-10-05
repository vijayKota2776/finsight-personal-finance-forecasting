import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pandas as pd
import numpy as np
from model.src.preprocessing import engineer_features, aggregate_monthly

def test_engineer_features_logic():
    """Test that feature engineering correctly creates lag and rolling features."""
    
    # Create mock aggregated monthly data
    dates = pd.date_range(start='2023-01-01', periods=5, freq='ME')
    
    mock_data = {
        'year_month': dates.to_period('M'),
        'income': [5000, 5000, 6000, 6000, 7000],
        'expense': [2000, 3000, 2500, 4000, 3500],
        'cat_food': [500, 600, 550, 700, 650]
    }
    
    df = pd.DataFrame(mock_data)
    
    # Apply feature engineering
    features_df = engineer_features(df)
    
    # Validate target shifting (Next month's expense)
    # The first row in features_df is the 2nd row of original (index 1)
    # because shift(1) causes NaNs for the first row.
    # Therefore, features_df row 0 corresponds to '2023-02'
    # The 'target_expense' should be the expense of '2023-03' which is 2500
    assert features_df.iloc[0]['target_expense'] == 2500
    
    # Validate lag features (Previous month's expense)
    # For '2023-02', the previous expense should be '2023-01' expense = 2000
    assert features_df.iloc[0]['previous_expense'] == 2000
    
    # Validate savings logic
    assert features_df.iloc[0]['savings'] == (5000 - 3000)
    
    print("test_engineer_features_logic passed successfully!")

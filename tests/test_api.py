from fastapi.testclient import TestClient
from backend.main import app
import pytest

client = TestClient(app)

def test_health_check():
    """Test that the backend API is up and running."""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to the FinSight Machine Learning API!"}

def test_predict_endpoint_validation():
    """Test that the predict endpoint rejects incomplete payloads."""
    # Send empty payload
    response = client.post("/api/predict", json={})
    assert response.status_code == 422 # Unprocessable Entity (FastAPI standard)

def test_historical_endpoint():
    """Test the historical data endpoint."""
    response = client.get("/api/historical")
    assert response.status_code == 200
    # Even if models aren't loaded locally during tests, it should return a list
    assert isinstance(response.json(), list)

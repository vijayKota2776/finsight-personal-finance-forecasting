"use client";

import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { AlertCircle, TrendingUp, DollarSign, BrainCircuit } from "lucide-react";

export default function Forecast() {
  const [historicalData, setHistoricalData] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [inputs, setInputs] = useState({
    income: 60000,
    cat_shopping: 5000,
    cat_food_drink: 8000,
    cat_entertainment: 3000,
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/historical")
      .then((res) => res.json())
      .then((data) => setHistoricalData(data))
      .catch((err) => console.error(err));
    handleSimulate();
  }, []);

  const handleSimulate = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      setPrediction(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: Number(e.target.value) });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BrainCircuit className="text-emerald-600 w-6 h-6" />
            AI Financial Forecaster
          </h1>
          <p className="text-gray-500 mt-1">Simulate changes to your behavior and see how our Machine Learning model predicts your future expenses.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Simulator Controls */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="text-blue-500 w-5 h-5" />
            What-If Simulator
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                <span>Monthly Income</span>
                <span className="text-emerald-600">${inputs.income.toLocaleString()}</span>
              </label>
              <input type="range" name="income" min="10000" max="150000" step="1000" value={inputs.income} onChange={handleInputChange} onMouseUp={handleSimulate} onTouchEnd={handleSimulate} className="w-full" />
            </div>
            
            <div>
              <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                <span>Shopping</span>
                <span className="text-red-500">${inputs.cat_shopping.toLocaleString()}</span>
              </label>
              <input type="range" name="cat_shopping" min="0" max="20000" step="500" value={inputs.cat_shopping} onChange={handleInputChange} onMouseUp={handleSimulate} onTouchEnd={handleSimulate} className="w-full" />
            </div>

            <div>
              <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                <span>Food & Drink</span>
                <span className="text-orange-500">${inputs.cat_food_drink.toLocaleString()}</span>
              </label>
              <input type="range" name="cat_food_drink" min="0" max="20000" step="500" value={inputs.cat_food_drink} onChange={handleInputChange} onMouseUp={handleSimulate} onTouchEnd={handleSimulate} className="w-full" />
            </div>

            <div>
              <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                <span>Entertainment</span>
                <span className="text-purple-500">${inputs.cat_entertainment.toLocaleString()}</span>
              </label>
              <input type="range" name="cat_entertainment" min="0" max="15000" step="500" value={inputs.cat_entertainment} onChange={handleInputChange} onMouseUp={handleSimulate} onTouchEnd={handleSimulate} className="w-full" />
            </div>
          </div>
          
          <button onClick={handleSimulate} className="w-full mt-8 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 rounded-lg transition-colors">
            Run Simulation
          </button>
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-6">
          {prediction && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Forecasted Expense</h3>
                <p className="text-4xl font-black text-gray-900 mb-1">
                  ${prediction.prediction.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
                <p className="text-sm text-gray-500 font-medium">
                  95% Interval: ${Math.round(prediction.lower_bound).toLocaleString()} - ${Math.round(prediction.upper_bound).toLocaleString()}
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Projected Savings Rate</h3>
                <p className={`text-4xl font-black mb-1 ${prediction.simulated_savings_rate < 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                  {(prediction.simulated_savings_rate * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-gray-500 font-medium">Based on your simulator inputs</p>
              </div>
            </div>
          )}

          {prediction?.insights?.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="text-red-800 font-bold flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5" />
                AI Anomaly Detection
              </h3>
              <ul className="space-y-2">
                {prediction.insights.map((insight, i) => (
                  <li key={i} className="flex items-start gap-2 text-red-700 text-sm font-medium">
                    • {insight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
             <h3 className="text-lg font-bold text-gray-900 mb-6">Historical Trends</h3>
             <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="year_month" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} dot={false} name="Income" />
                    <Line type="monotone" dataKey="expense" stroke="#3b82f6" strokeWidth={3} dot={false} name="Expense" />
                  </LineChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

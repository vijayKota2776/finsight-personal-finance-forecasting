"use client";

import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceArea } from "recharts";
import { BrainCircuit, AlertTriangle, Play, Sparkles, Loader2 } from "lucide-react";

export default function ForecastPage() {
  const [historicalData, setHistoricalData] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);

  // What-If Simulator State
  const [simIncome, setSimIncome] = useState(85000);
  const [simShopping, setSimShopping] = useState(12000);
  const [simFood, setSimFood] = useState(8000);
  const [simEntertainment, setSimEntertainment] = useState(4000);

  useEffect(() => {
    fetchHistoricalData();
    runForecast();
  }, []);

  const fetchHistoricalData = async () => {
    try {
      const stored = localStorage.getItem("finsight_transactions");
      if (stored) {
        const txns = JSON.parse(stored);
        
        // Group debit transactions by month
        const monthlyTotals = {};
        
        // Process chronologically (assume transactions array is newest first, so we reverse it)
        const sortedTxns = [...txns].sort((a, b) => new Date(a.date) - new Date(b.date));
        
        sortedTxns.forEach(t => {
          if (t.type === 'debit') {
            const dateObj = new Date(t.date);
            const monthYear = dateObj.toLocaleString('en-US', { month: 'short', year: 'numeric' });
            if (!monthlyTotals[monthYear]) {
              monthlyTotals[monthYear] = 0;
            }
            monthlyTotals[monthYear] += t.amount;
          }
        });
        
        const formattedData = Object.keys(monthlyTotals).map(key => ({
          year_month: key,
          expense: monthlyTotals[key]
        }));
        
        if (formattedData.length > 0) {
           setHistoricalData(formattedData);
           return;
        }
      }
      
      // Fallback to generic API data if no local transactions exist yet
      const res = await fetch("https://finsight-backend-48d8.onrender.com/api/historical");
      const data = await res.json();
      setHistoricalData(data);
    } catch (e) {
      console.error(e);
    }
  };

  const runForecast = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://finsight-backend-48d8.onrender.com/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          income: simIncome,
          cat_shopping: simShopping,
          cat_food_drink: simFood,
          cat_entertainment: simEntertainment,
          user_id: "user_01"
        })
      });
      const data = await res.json();
      setPrediction(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  // Combine historical and prediction for the chart
  const chartData = historicalData.map(d => ({
    name: d.year_month,
    Expense: d.expense,
  }));
  
  if (prediction && chartData.length > 0) {
    chartData.push({
      name: "Next Month (Predicted)",
      PredictedExpense: prediction.prediction,
      upperBound: prediction.upper_bound,
      lowerBound: prediction.lower_bound
    });
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
          <BrainCircuit className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Expense Forecast & Simulator</h1>
          <p className="text-gray-500">Powered by Random Forest Regression & Isolation Forest Anomaly Detection.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Forecast Chart & Insights */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Expense Trajectory</h2>
            
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value) => formatMoney(value)}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="Expense" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="PredictedExpense" stroke="#3B82F6" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {prediction && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-500" /> AI Insights
              </h2>
              
              <div className="space-y-4">
                {prediction.is_anomaly && (
                  <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                    <div>
                      <h4 className="font-bold text-red-900">Anomaly Detected</h4>
                      <p className="text-sm text-red-800 mt-1">Your simulated inputs have triggered our anomaly detection model (Isolation Forest). This spending pattern is highly unusual based on your history.</p>
                    </div>
                  </div>
                )}
                
                {prediction.insights.map((insight, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                    <p className="text-sm text-gray-700">{insight}</p>
                  </div>
                ))}
                
                {prediction.insights.length === 0 && !prediction.is_anomaly && (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                    <p className="text-sm text-emerald-800">Your simulated expenses are perfectly in line with your historical trends. No warnings generated.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Simulator */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 bg-gray-50 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">What-If Simulator</h2>
              <p className="text-sm text-gray-500 mt-1">Adjust inputs to see how the ML model reacts in real-time.</p>
            </div>
            
            <div className="p-6 space-y-6">
              
              <div>
                <label className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
                  <span>Income</span>
                  <span className="text-emerald-600">{formatMoney(simIncome)}</span>
                </label>
                <input 
                  type="range" min="30000" max="150000" step="1000"
                  value={simIncome} onChange={(e) => setSimIncome(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

              <div>
                <label className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
                  <span>Shopping Category</span>
                  <span className="text-blue-600">{formatMoney(simShopping)}</span>
                </label>
                <input 
                  type="range" min="0" max="50000" step="1000"
                  value={simShopping} onChange={(e) => setSimShopping(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <label className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
                  <span>Food & Drink Category</span>
                  <span className="text-orange-600">{formatMoney(simFood)}</span>
                </label>
                <input 
                  type="range" min="0" max="30000" step="500"
                  value={simFood} onChange={(e) => setSimFood(Number(e.target.value))}
                  className="w-full accent-orange-600"
                />
              </div>

              <div>
                <label className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
                  <span>Entertainment Category</span>
                  <span className="text-purple-600">{formatMoney(simEntertainment)}</span>
                </label>
                <input 
                  type="range" min="0" max="25000" step="500"
                  value={simEntertainment} onChange={(e) => setSimEntertainment(Number(e.target.value))}
                  className="w-full accent-purple-600"
                />
              </div>

              <button 
                onClick={runForecast}
                disabled={loading}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
                Run ML Prediction
              </button>
            </div>
            
            {prediction && (
              <div className="bg-gray-900 text-white p-6">
                <p className="text-sm text-gray-400 font-medium mb-1">Predicted Total Expense</p>
                <h3 className="text-3xl font-bold text-emerald-400">{formatMoney(prediction.prediction)}</h3>
                <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between text-sm text-gray-400">
                  <span>Lower Bound: <span className="text-white">{formatMoney(prediction.lower_bound)}</span></span>
                  <span>Upper Bound: <span className="text-white">{formatMoney(prediction.upper_bound)}</span></span>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

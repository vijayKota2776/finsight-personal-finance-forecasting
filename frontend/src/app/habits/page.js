"use client";

import { useState, useEffect } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { Fingerprint, TrendingUp, Flame, Coffee, ShieldAlert } from "lucide-react";

export default function HabitsPage() {
  const [txns, setTxns] = useState([]);
  
  useEffect(() => {
    const stored = localStorage.getItem("finsight_transactions");
    if (stored) {
      setTxns(JSON.parse(stored).filter(t => t.type === 'debit'));
    }
  }, []);

  // Calculate Habit Intelligence Data
  const categories = {
    cat_shopping: 0,
    cat_food_drink: 0,
    cat_entertainment: 0,
    cat_travel: 0,
    cat_utilities: 0
  };

  let totalSpent = 0;
  txns.forEach(t => {
    if (categories[t.category] !== undefined) {
      categories[t.category] += t.amount;
      totalSpent += t.amount;
    }
  });

  const radarData = [
    { subject: "Shopping", A: categories.cat_shopping, fullMark: totalSpent },
    { subject: "Food", A: categories.cat_food_drink, fullMark: totalSpent },
    { subject: "Entertainment", A: categories.cat_entertainment, fullMark: totalSpent },
    { subject: "Travel", A: categories.cat_travel, fullMark: totalSpent },
    { subject: "Utilities", A: categories.cat_utilities, fullMark: totalSpent }
  ];

  const formatMoney = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
          <Fingerprint className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Habit Intelligence</h1>
          <p className="text-gray-500">Discover your financial personality and spending behaviors.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Radar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Your Spending Footprint</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false} />
                <Radar name="Spent" dataKey="A" stroke="#4f46e5" fill="#6366f1" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Persona Badges */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-sm p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Flame className="w-24 h-24" />
            </div>
            <p className="text-indigo-100 font-medium text-sm mb-1">Financial Persona</p>
            <h3 className="text-2xl font-bold mb-4 relative z-10">
              {categories.cat_food_drink > categories.cat_shopping ? "The Foodie" : "The Retail Therapist"}
            </h3>
            <p className="text-sm text-indigo-50 relative z-10 leading-relaxed">
              Based on your habits, you tend to prioritize {categories.cat_food_drink > categories.cat_shopping ? "dining out and ordering in" : "online shopping and retail experiences"} over other discretionary categories.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">Habit Insights</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                  <Coffee className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">High Frequency</h4>
                  <p className="text-xs text-gray-500 mt-1">You made over 15 transactions in Food & Drink this month. Consider batching your grocery runs to save money.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Impulse Buying</h4>
                  <p className="text-xs text-gray-500 mt-1">Your Shopping transactions peak on weekends. Setting a "48-hour rule" before weekend purchases could improve savings.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

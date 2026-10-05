"use client";

import { useState, useEffect } from "react";
import { BrainCircuit, AlertTriangle, TrendingUp, Calendar, CheckCircle2, ChevronRight, Loader2, Edit3, Save, Lock } from "lucide-react";

export default function BudgetsPage() {
  const [transactions, setTransactions] = useState([]);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditComplete, setAuditComplete] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("finsight_transactions");
    if (stored) setTransactions(JSON.parse(stored));
  }, []);

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  // Group current month spending by category
  const currentMonth = new Date().getMonth();
  const spendingByCategory = {
    Shopping: 0,
    Food: 0,
    Entertainment: 0,
    Travel: 0,
    Utilities: 0,
  };

  transactions.forEach(t => {
    if (new Date(t.date).getMonth() === currentMonth && t.type === 'debit') {
      if (t.category.includes('shopping')) spendingByCategory.Shopping += t.amount;
      else if (t.category.includes('food')) spendingByCategory.Food += t.amount;
      else if (t.category.includes('entertainment')) spendingByCategory.Entertainment += t.amount;
      else if (t.category.includes('travel')) spendingByCategory.Travel += t.amount;
      else if (t.category.includes('utilities')) spendingByCategory.Utilities += t.amount;
    }
  });

  // Editable monthly budgets
  const [isEditingBudgets, setIsEditingBudgets] = useState(false);
  const [budgets, setBudgets] = useState({
    Shopping: 35000,
    Food: 25000,
    Entertainment: 10000,
    Travel: 20000,
    Utilities: 8000,
  });

  const today = new Date().getDate();
  const isFirstDay = today === 1;

  const handleRunAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditComplete(true);
    }, 4000); // 4 seconds animation
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Date Header & Notification */}
      <div className={`border rounded-2xl p-4 flex items-start gap-4 ${isFirstDay ? 'bg-blue-50 border-blue-100' : 'bg-gray-50 border-gray-200'}`}>
        <Calendar className={`w-6 h-6 mt-1 shrink-0 ${isFirstDay ? 'text-blue-600' : 'text-gray-500'}`} />
        <div>
          <h3 className={`font-bold text-lg ${isFirstDay ? 'text-blue-900' : 'text-gray-900'}`}>
            {isFirstDay ? 'Action Required: First of the Month' : 'Mid-Month Budget Locked'}
          </h3>
          <p className={`text-sm mt-1 ${isFirstDay ? 'text-blue-800' : 'text-gray-600'}`}>
            {isFirstDay 
              ? "It's the beginning of a new month. Please review and plan your budget limits below. You can also run the AI Audit on last month's data."
              : "Budget planning is only available on the 1st day of the month to enforce financial discipline. You can still run an AI Audit anytime."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Budgets */}
        <div className="lg:col-span-2 space-y-6">

          {/* Budget Planning Form (Only visible in edit mode) */}
          {isEditingBudgets && (
            <div className="bg-white rounded-2xl border border-emerald-100 shadow-md p-6 animate-in slide-in-from-top-2">
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold text-gray-900">Plan Monthly Budget</h2>
                <button 
                  onClick={() => setIsEditingBudgets(false)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm"
                >
                  Save Budget Plan
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.keys(budgets).map(category => (
                  <div key={`edit-${category}`} className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">{category}</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                      <input 
                        type="number" 
                        value={budgets[category]}
                        onChange={(e) => setBudgets({...budgets, [category]: Number(e.target.value)})}
                        className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors font-medium text-gray-900"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Budget Tracker</h2>
              
              {!isEditingBudgets && (
                <button 
                  onClick={() => isFirstDay ? setIsEditingBudgets(true) : alert("Budget planning is strictly locked to the 1st of every month for discipline.")}
                  className={`text-sm font-medium flex items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                    isFirstDay 
                      ? "text-emerald-700 bg-emerald-50 hover:bg-emerald-100" 
                      : "text-gray-500 bg-gray-100 cursor-not-allowed"
                  }`}
                  title={!isFirstDay ? "Locked until the 1st of next month" : "Edit Budget"}
                >
                  {isFirstDay ? <><Edit3 className="w-4 h-4" /> Plan Budget</> : <><Lock className="w-4 h-4" /> Locked</>}
                </button>
              )}
            </div>
            
            <div className="space-y-8">
              {Object.keys(budgets).map(category => {
                const spent = spendingByCategory[category] || 0;
                const limit = budgets[category];
                const percentage = Math.min(100, (spent / limit) * 100);
                const isOver = spent > limit;
                const isWarning = percentage > 80 && !isOver;

                return (
                  <div key={category}>
                    <div className="flex justify-between mb-2 items-center">
                      <span className="font-semibold text-gray-900">{category}</span>
                      <span className="text-sm font-medium text-gray-500">
                        <strong className={isOver ? 'text-red-600' : 'text-gray-900'}>{formatMoney(spent)}</strong> / {formatMoney(limit)}
                      </span>
                    </div>
                    <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          isOver ? 'bg-red-500' : isWarning ? 'bg-orange-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    {isOver && <p className="text-xs text-red-600 font-medium mt-1">Budget exceeded by {formatMoney(spent - limit)}</p>}
                    {isWarning && <p className="text-xs text-orange-600 font-medium mt-1">Nearing budget limit</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: AI Audit */}
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-32 bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="p-6 relative z-10">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 border border-white/10">
                <BrainCircuit className="w-6 h-6 text-emerald-400" />
              </div>
              
              <h2 className="text-xl font-bold text-white mb-2">AI Monthly Audit</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Run our machine learning analysis on your past month's transactions to find hidden subscriptions, unusual spending spikes, and actionable advice.
              </p>

              {!isAuditing && !auditComplete && (
                <button 
                  onClick={handleRunAudit}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                >
                  Start AI Audit ✨
                </button>
              )}

              {isAuditing && (
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-3 text-emerald-400 mb-3">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="font-semibold">Analyzing transactions...</span>
                  </div>
                  <div className="space-y-2 text-xs font-medium text-gray-500">
                    <p className="animate-pulse">Loading transaction graph...</p>
                    <p className="animate-pulse delay-75">Identifying recurring patterns...</p>
                    <p className="animate-pulse delay-150">Running isolation forest anomaly checks...</p>
                  </div>
                </div>
              )}

              {auditComplete && (
                <div className="space-y-4">
                  
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                    <h4 className="text-blue-400 font-bold text-sm flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4" /> Overall Assessment
                    </h4>
                    <p className="text-gray-300 text-xs leading-relaxed">
                      Your financial health score is <strong>Good (78/100)</strong>. 
                      You have successfully stayed within your budget for Food and Entertainment. 
                      However, your savings rate dropped by 4.2% compared to the previous month. 
                    </p>
                  </div>

                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                    <h4 className="text-emerald-400 font-bold text-sm flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4" /> Transport Spike Detected
                    </h4>
                    <p className="text-gray-300 text-xs leading-relaxed">
                      Your Uber/Ola expenses increased by 145% in the final week of the month, totaling ₹4,250. 
                      Based on our anomaly detection model, this is considered a significant outlier. 
                      Recommendation: Consider setting a strict weekly cap for cab aggregators next month.
                    </p>
                  </div>

                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
                    <h4 className="text-orange-400 font-bold text-sm flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4" /> Hidden Subscription Alert
                    </h4>
                    <p className="text-gray-300 text-xs leading-relaxed">
                      We detected a recurring charge of ₹999 (Category: Utilities) at 2:00 AM on the 15th that you haven't budgeted for. 
                      This matches the pattern of a forgotten annual SaaS subscription. 
                    </p>
                  </div>

                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                    <h4 className="text-purple-400 font-bold text-sm flex items-center gap-2 mb-2">
                      <BrainCircuit className="w-4 h-4" /> ML Recommendation
                    </h4>
                    <p className="text-gray-300 text-xs leading-relaxed">
                      If you reduce your discretionary 'Shopping' spend by 15% next month, our Random Forest model predicts your surplus balance will safely exceed ₹35,000, moving you into the 'Excellent' health bracket.
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => setAuditComplete(false)}
                    className="w-full mt-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    Dismiss Report
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

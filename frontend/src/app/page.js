"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownRight, DollarSign, CreditCard, Activity } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);
  const [metrics, setMetrics] = useState({
    balance: 0,
    income: 0,
    expenses: 0
  });

  useEffect(() => {
    // Load synced data from the Mock Bank API (localStorage)
    const storedData = localStorage.getItem("finsight_transactions");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setTransactions(parsed);
      
      // Calculate current month's metrics
      const currentMonth = new Date().getMonth();
      let inc = 0;
      let exp = 0;
      
      parsed.forEach(t => {
        const tMonth = new Date(t.date).getMonth();
        if (tMonth === currentMonth) {
          if (t.type === 'credit') inc += t.amount;
          if (t.type === 'debit') exp += t.amount;
        }
      });
      
      setMetrics({
        balance: 145000 + inc - exp, // Mock starting balance
        income: inc,
        expenses: exp
      });
    }
  }, []);

  // Format currency (INR as per settings)
  const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Overview</h1>
          <p className="text-sm text-gray-500">Welcome back! Here's your automated summary.</p>
        </div>
        {!transactions.length ? (
          <button 
            onClick={() => router.push('/onboarding')}
            className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-emerald-700 transition-colors shadow-sm animate-pulse"
          >
            Connect Bank to Start
          </button>
        ) : (
          <button className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-sm">
            Add Manual Entry
          </button>
        )}
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-semibold">Total Balance</h3>
            <div className="p-2.5 bg-emerald-50 rounded-xl">
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{formatMoney(metrics.balance)}</p>
          <p className="text-sm text-emerald-600 flex items-center gap-1 mt-3 font-medium bg-emerald-50 w-max px-2 py-1 rounded-md">
            <ArrowUpRight className="w-4 h-4" /> Sync Active
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-semibold">This Month's Income</h3>
            <div className="p-2.5 bg-blue-50 rounded-xl">
              <ArrowUpRight className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{formatMoney(metrics.income)}</p>
          <p className="text-sm text-gray-500 mt-3 font-medium">Expected this month</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-semibold">This Month's Expenses</h3>
            <div className="p-2.5 bg-red-50 rounded-xl">
              <ArrowDownRight className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{formatMoney(metrics.expenses)}</p>
          <p className="text-sm text-red-600 flex items-center gap-1 mt-3 font-medium bg-red-50 w-max px-2 py-1 rounded-md">
            <Activity className="w-4 h-4" /> Forecasting active
          </p>
        </div>
      </div>

      {/* Recent Transactions List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
          <button className="text-sm text-emerald-600 font-bold hover:text-emerald-700">View All</button>
        </div>
        
        <div className="divide-y divide-gray-100">
          {transactions.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No transactions found. Connect your bank to see your history.
            </div>
          ) : (
            transactions.slice(0, 6).map((txn, i) => (
              <div key={txn.id || i} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    txn.type === 'credit' ? 'bg-emerald-100' : 'bg-gray-100'
                  }`}>
                    <CreditCard className={`w-6 h-6 ${txn.type === 'credit' ? 'text-emerald-600' : 'text-gray-600'}`} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{txn.merchant}</p>
                    <p className="text-sm text-gray-500 uppercase tracking-wider mt-0.5 font-medium text-[11px]">{txn.category.replace('cat_', '')} • {new Date(txn.date).toLocaleDateString('en-GB')}</p>
                  </div>
                </div>
                <p className={`font-bold text-lg ${txn.type === 'credit' ? "text-emerald-600" : "text-gray-900"}`}>
                  {txn.type === 'credit' ? "+" : "-"}{formatMoney(txn.amount)}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

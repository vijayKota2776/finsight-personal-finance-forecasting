"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownRight, DollarSign, CreditCard, Activity } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTxn, setNewTxn] = useState({ amount: "", merchant: "", category: "cat_shopping", type: "debit" });
  
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

  const handleAddTransaction = () => {
    if (!newTxn.amount || !newTxn.merchant) return;
    
    const newEntry = {
      id: `txn_manual_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      amount: parseFloat(newTxn.amount),
      merchant: newTxn.merchant,
      category: newTxn.category,
      type: newTxn.type
    };
    
    const updatedTransactions = [newEntry, ...transactions];
    setTransactions(updatedTransactions);
    localStorage.setItem("finsight_transactions", JSON.stringify(updatedTransactions));
    
    // Update metrics
    if (newEntry.type === 'credit') {
      setMetrics(prev => ({ ...prev, balance: prev.balance + newEntry.amount, income: prev.income + newEntry.amount }));
    } else {
      setMetrics(prev => ({ ...prev, balance: prev.balance - newEntry.amount, expenses: prev.expenses + newEntry.amount }));
    }
    
    setIsModalOpen(false);
    setNewTxn({ amount: "", merchant: "", category: "cat_shopping", type: "debit" });
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
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-sm"
          >
            Add Manual Entry
          </button>
        )}
      </div>

      {/* Manual Entry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add Transaction</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Merchant / Details</label>
                <input 
                  type="text" 
                  placeholder="e.g. Starbucks Coffee"
                  value={newTxn.merchant}
                  onChange={(e) => setNewTxn({...newTxn, merchant: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    value={newTxn.amount}
                    onChange={(e) => setNewTxn({...newTxn, amount: e.target.value})}
                    className="w-full pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Type</label>
                  <select 
                    value={newTxn.type}
                    onChange={(e) => setNewTxn({...newTxn, type: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                  >
                    <option value="debit">Expense</option>
                    <option value="credit">Income</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Category</label>
                  <select 
                    value={newTxn.category}
                    onChange={(e) => setNewTxn({...newTxn, category: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                  >
                    <option value="cat_shopping">Shopping</option>
                    <option value="cat_food_drink">Food & Drink</option>
                    <option value="cat_travel">Travel</option>
                    <option value="cat_entertainment">Entertainment</option>
                    <option value="cat_utilities">Utilities</option>
                    <option value="income">Income</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddTransaction}
                disabled={!newTxn.amount || !newTxn.merchant}
                className="flex-1 py-2.5 rounded-xl font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

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
          <button onClick={() => router.push('/transactions')} className="text-sm text-emerald-600 font-bold hover:text-emerald-700">View All</button>
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

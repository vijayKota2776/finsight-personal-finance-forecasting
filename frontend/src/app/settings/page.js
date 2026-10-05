"use client";

import { useState } from "react";
import { User, Mail, Phone, Shield, Bell, Key, Banknote, Save, BrainCircuit, Loader2 } from "lucide-react";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    currency: "INR (₹)",
  });

  const [notifications, setNotifications] = useState({
    largeTransactions: true,
    weeklyReports: true,
    anomalyAlerts: true,
  });

  const [retraining, setRetraining] = useState(false);
  const [retrainStatus, setRetrainStatus] = useState(null);

  const handleRetrain = async () => {
    setRetraining(true);
    setRetrainStatus(null);
    try {
      const stored = localStorage.getItem("finsight_transactions");
      const txns = stored ? JSON.parse(stored) : [];
      
      const res = await fetch("https://finsight-backend-48d8.onrender.com/api/retrain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: "user_01",
          transactions: txns
        })
      });
      const data = await res.json();
      if (data.status === "success") {
        setRetrainStatus({ type: 'success', msg: data.message });
      } else {
        setRetrainStatus({ type: 'error', msg: data.message });
      }
    } catch (err) {
      setRetrainStatus({ type: 'error', msg: "Failed to connect to ML server." });
    }
    setRetraining(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings & Profile</h1>
          <p className="text-gray-500">Manage your account details and preferences.</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-600" /> Personal Information
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Banknote className="w-5 h-5 text-blue-600" /> Financial Preferences
            </h2>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Base Currency</label>
              <select 
                value={profile.currency}
                onChange={(e) => setProfile({...profile, currency: e.target.value})}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option>INR (₹)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">This currency will be used across all your dashboard charts and ML forecasts.</p>
            </div>
          </div>
        </div>

        {/* Sidebar Settings (Security & Notifications) */}
        <div className="space-y-6">
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-orange-600" /> Notifications
            </h2>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Large Transactions</span>
                <input 
                  type="checkbox" 
                  checked={notifications.largeTransactions}
                  onChange={(e) => setNotifications({...notifications, largeTransactions: e.target.checked})}
                  className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500" 
                />
              </label>
              
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Weekly AI Reports</span>
                <input 
                  type="checkbox" 
                  checked={notifications.weeklyReports}
                  onChange={(e) => setNotifications({...notifications, weeklyReports: e.target.checked})}
                  className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500" 
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Anomaly Alerts</span>
                <input 
                  type="checkbox" 
                  checked={notifications.anomalyAlerts}
                  onChange={(e) => setNotifications({...notifications, anomalyAlerts: e.target.checked})}
                  className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500" 
                />
              </label>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-600" /> Security
            </h2>
            
            <div className="space-y-3">
              <button className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-xl border border-gray-200 transition-colors flex items-center justify-center gap-2 text-sm">
                <Key className="w-4 h-4" /> Change Password
              </button>
              <button className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-xl border border-red-100 transition-colors text-sm">
                Disconnect Bank
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-indigo-600" /> AI Personalization
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              Your AI model is currently using the global dataset. You can retrain a personalized Random Forest based on your historical transactions.
            </p>
            
            <button 
              onClick={handleRetrain}
              disabled={retraining}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
            >
              {retraining ? <Loader2 className="w-4 h-4 animate-spin" /> : <BrainCircuit className="w-4 h-4" />}
              {retraining ? "Training..." : "Retrain Personal AI"}
            </button>
            
            {retrainStatus && (
              <p className={`text-xs mt-3 p-2 rounded-md ${retrainStatus.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                {retrainStatus.msg}
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

import { ArrowUpRight, ArrowDownRight, DollarSign, CreditCard } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Financial Overview</h1>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
          Add Transaction
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Total Balance</h3>
            <div className="p-2 bg-emerald-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">$24,500.00</p>
          <p className="text-sm text-emerald-600 flex items-center gap-1 mt-2 font-medium">
            <ArrowUpRight className="w-4 h-4" /> +2.5% from last month
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Monthly Income</h3>
            <div className="p-2 bg-blue-50 rounded-lg">
              <ArrowUpRight className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">$8,250.00</p>
          <p className="text-sm text-gray-500 mt-2 font-medium">Expected this month</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Monthly Expenses</h3>
            <div className="p-2 bg-red-50 rounded-lg">
              <ArrowDownRight className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">$4,120.00</p>
          <p className="text-sm text-red-600 flex items-center gap-1 mt-2 font-medium">
            <ArrowUpRight className="w-4 h-4" /> +5.2% from last month
          </p>
        </div>
      </div>

      {/* Recent Transactions List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
          <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">View All</button>
        </div>
        
        <div className="divide-y divide-gray-100">
          {[
            { name: "Whole Foods Market", cat: "Groceries", date: "Today", amount: -145.20 },
            { name: "TechCorp Salary", cat: "Income", date: "Yesterday", amount: 4125.00 },
            { name: "Netflix Subscription", cat: "Entertainment", date: "Oct 2", amount: -15.99 },
            { name: "Uber Ride", cat: "Transport", date: "Oct 1", amount: -24.50 },
          ].map((txn, i) => (
            <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{txn.name}</p>
                  <p className="text-sm text-gray-500">{txn.cat} • {txn.date}</p>
                </div>
              </div>
              <p className={`font-bold ${txn.amount > 0 ? "text-emerald-600" : "text-gray-900"}`}>
                {txn.amount > 0 ? "+" : ""}{txn.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

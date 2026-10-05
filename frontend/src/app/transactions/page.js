"use client";

import { useState, useEffect } from "react";
import { Search, Filter, ArrowDownUp, Download, CreditCard, Banknote } from "lucide-react";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    const stored = localStorage.getItem("finsight_transactions");
    if (stored) setTransactions(JSON.parse(stored));
  }, []);

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  const filtered = transactions.filter(t => {
    const matchesSearch = t.merchant.toLowerCase().includes(searchTerm.toLowerCase()) || t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || t.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownloadCSV = () => {
    if (!transactions.length) return;
    const headers = ["Date", "Merchant", "Category", "Amount", "Type"];
    const rows = filtered.map(t => [
      t.date,
      `"${t.merchant}"`,
      t.category,
      t.amount,
      t.type
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "finsight_transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Transactions</h1>
          <p className="text-gray-500">View and manage your synced financial data.</p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="p-2 border border-gray-200 rounded-lg bg-white text-gray-600 focus:outline-none focus:border-emerald-500 cursor-pointer text-sm"
          >
            <option value="all">All Categories</option>
            <option value="cat_shopping">Shopping</option>
            <option value="cat_food_drink">Food & Drink</option>
            <option value="cat_travel">Travel</option>
            <option value="cat_entertainment">Entertainment</option>
            <option value="cat_utilities">Utilities</option>
            <option value="income">Income</option>
          </select>
          <button 
            onClick={handleDownloadCSV}
            className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600"
            title="Download CSV"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Merchant / Details</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                    No transactions found. Connect your bank or adjust search.
                  </td>
                </tr>
              ) : (
                filtered.map((txn, i) => (
                  <tr key={txn.id || i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {new Date(txn.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${txn.type === 'credit' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-600'}`}>
                          {txn.type === 'credit' ? <Banknote className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
                        </div>
                        <span className="font-semibold text-gray-900">{txn.merchant}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 uppercase tracking-wider">
                        {txn.category.replace('cat_', '')}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-right font-bold whitespace-nowrap ${txn.type === 'credit' ? 'text-emerald-600' : 'text-gray-900'}`}>
                      {txn.type === 'credit' ? "+" : "-"}{formatMoney(txn.amount)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

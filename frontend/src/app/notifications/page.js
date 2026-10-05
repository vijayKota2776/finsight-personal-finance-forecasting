"use client";

import { AlertTriangle, TrendingUp, Calendar, Bell, CheckCircle2 } from "lucide-react";

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'Hidden Subscription Alert',
      message: 'We detected a recurring charge of ₹999 (Category: Utilities) at 2:00 AM on the 15th that you haven\'t budgeted for.',
      time: '2 hours ago',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    {
      id: 2,
      type: 'insight',
      title: 'Transport Spike Detected',
      message: 'Your Uber/Ola expenses increased by 145% in the final week of the month, totaling ₹4,250.',
      time: '1 day ago',
      icon: TrendingUp,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      id: 3,
      type: 'reminder',
      title: 'First of the Month Action Required',
      message: 'It is the beginning of a new month. Please review and plan your budget limits.',
      time: 'Oct 1',
      icon: Calendar,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      id: 4,
      type: 'success',
      title: 'Monthly Audit Complete',
      message: 'Your automated financial health score is Good (78/100). You successfully stayed within your budget for Food and Entertainment.',
      time: 'Sep 30',
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    }
  ];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
          <Bell className="w-6 h-6 text-gray-900" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500">Your AI-generated alerts, insights, and reminders.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {notifications.map((notif) => {
            const Icon = notif.icon;
            return (
              <div key={notif.id} className="p-6 hover:bg-gray-50 transition-colors flex gap-4 items-start">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.bg}`}>
                  <Icon className={`w-5 h-5 ${notif.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900">{notif.title}</h3>
                    <span className="text-xs font-medium text-gray-400">{notif.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{notif.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

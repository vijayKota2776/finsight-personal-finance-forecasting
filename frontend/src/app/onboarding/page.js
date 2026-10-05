"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Building2, CheckCircle2, ShieldCheck, Landmark, Smartphone, ChevronRight, Loader2, ArrowRight } from "lucide-react";

export default function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [selectedBank, setSelectedBank] = useState(null);

  const banks = [
    { id: 'hdfc', name: 'HDFC Bank', type: 'Savings Account', ending: '4821', color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'icici', name: 'ICICI Bank', type: 'Salary Account', ending: '9182', color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 'sbi', name: 'State Bank of India', type: 'Savings Account', ending: '2214', color: 'text-blue-800', bg: 'bg-blue-100' },
  ];

  // Auto-advance loader
  useEffect(() => {
    if (step === 5) {
      const timer = setTimeout(() => {
        setStep(6);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleNext = () => setStep(step + 1);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      
      {/* Container */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-gray-100">
          <div 
            className="h-full bg-emerald-500 transition-all duration-500 ease-out"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>

        <div className="p-8">
          
          {/* STEP 1: Intro */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <Landmark className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Connect Your Bank</h2>
              <p className="text-gray-500 mb-8">
                Connect your financial account securely to FinSight to automatically understand your spending, detect habits, and generate AI forecasts.
              </p>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 flex gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800 font-medium leading-relaxed">
                  FinSight uses a secure, mock Account Aggregator flow. We never store real passwords or banking credentials.
                </p>
              </div>
              <button 
                onClick={handleNext}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                Continue securely <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Phone Number */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6 text-gray-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Accounts</h2>
              <p className="text-gray-500 mb-8">Enter your mobile number to securely discover your linked bank accounts.</p>
              
              <div className="mb-8">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Mobile Number</label>
                <div className="flex border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-emerald-500 transition-colors">
                  <span className="bg-gray-50 px-4 py-3 text-gray-500 border-r border-gray-200 font-medium">+91</span>
                  <input 
                    type="tel" 
                    placeholder="98765 43210" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 outline-none text-gray-900 font-medium"
                    autoFocus
                  />
                </div>
              </div>

              <button 
                onClick={handleNext}
                disabled={phone.length < 10}
                className="w-full bg-emerald-600 disabled:bg-gray-200 disabled:text-gray-400 hover:bg-emerald-700 text-white font-medium py-3.5 rounded-xl transition-colors"
              >
                Discover Accounts
              </button>
            </div>
          )}

          {/* STEP 3: Select Bank */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Accounts Found</h2>
              <p className="text-gray-500 mb-6">We found the following accounts linked to your number. Select one to connect.</p>
              
              <div className="space-y-3 mb-8">
                {banks.map((bank) => (
                  <button
                    key={bank.id}
                    onClick={() => setSelectedBank(bank.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                      selectedBank === bank.id 
                        ? "border-emerald-500 bg-emerald-50/50" 
                        : "border-gray-100 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${bank.bg}`}>
                        <Building2 className={`w-5 h-5 ${bank.color}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{bank.name}</h3>
                        <p className="text-sm text-gray-500">{bank.type} •••• {bank.ending}</p>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedBank === bank.id ? "border-emerald-500 bg-emerald-500" : "border-gray-300"
                    }`}>
                      {selectedBank === bank.id && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                  </button>
                ))}
              </div>

              <button 
                onClick={handleNext}
                disabled={!selectedBank}
                className="w-full bg-emerald-600 disabled:bg-gray-200 disabled:text-gray-400 hover:bg-emerald-700 text-white font-medium py-3.5 rounded-xl transition-colors"
              >
                Connect Selected Account
              </button>
            </div>
          )}

          {/* STEP 4: Consent */}
          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Data Consent</h2>
              <p className="text-gray-500 mb-6">FinSight is requesting read-only access to your financial data.</p>
              
              <div className="bg-gray-50 rounded-xl p-5 mb-8">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Requested Data</h3>
                <ul className="space-y-3 mb-6">
                  {['Account details', 'Transaction history', 'Transaction amounts & dates'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {item}
                    </li>
                  ))}
                </ul>
                
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Purpose</h3>
                <p className="text-sm text-gray-600 mb-6">Personal financial analysis, budgeting, and ML expense forecasting.</p>

                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Data Period</h3>
                <p className="text-sm text-gray-600">Last 3 months (01 Jul 2026 - 05 Oct 2026)</p>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-3.5 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
                  Decline
                </button>
                <button onClick={handleNext} className="flex-1 py-3.5 rounded-xl font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors">
                  Approve Access
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Loading / Processing */}
          {step === 5 && (
            <div className="animate-in fade-in py-8 flex flex-col items-center text-center">
              <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-6" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Connecting to Bank...</h2>
              
              <div className="space-y-3 text-sm font-medium mt-6 text-left w-full max-w-[250px]">
                <p className="text-emerald-600 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Account discovered</p>
                <p className="text-emerald-600 flex items-center gap-2 animate-in fade-in delay-75"><CheckCircle2 className="w-4 h-4" /> User authenticated</p>
                <p className="text-emerald-600 flex items-center gap-2 animate-in fade-in delay-150"><CheckCircle2 className="w-4 h-4" /> Consent verified</p>
                <p className="text-gray-500 flex items-center gap-2 animate-in fade-in delay-300"><Loader2 className="w-4 h-4 animate-spin" /> Fetching transactions...</p>
              </div>
            </div>
          )}

          {/* STEP 6: Success */}
          {step === 6 && (
            <div className="animate-in zoom-in-95 duration-500 text-center py-4">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Successfully Connected!</h2>
              <p className="text-gray-500 mb-8">
                Imported 1,284 transactions.<br />Your financial profile is ready.
              </p>
              
              <button 
                onClick={() => router.push('/')}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-4 rounded-xl transition-colors shadow-lg shadow-emerald-600/20"
              >
                Go to Dashboard
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

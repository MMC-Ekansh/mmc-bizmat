import React, { useEffect, useRef } from 'react';
import { type UserProfile, type UserAnswer } from '../types';
import OCircle from '../assets/OCircle.png';

interface ResultScreenProps {
  score: number;
  user: UserProfile | null;
  userAnswers: UserAnswer[];
  onRestart: () => void;
}

const CSV_HEADERS = ["Name", "Mobile", "Business Name", "Business Website", "Industry", "Business Email", "Score"];

const ResultScreen: React.FC<ResultScreenProps> = ({ score, user, userAnswers, onRestart }) => {
  const hasSynced = useRef(false);

  useEffect(() => {
    if (!user || hasSynced.current) return;

    const syncToGoogleSheets = async () => {
      try {
        hasSynced.current = true;
        
        // 1. Convert the array of answers into an easy-to-read object (e.g., { q1: "Small & Agile", q2: "..." })
        const formattedAnswers: Record<string, string> = {};
        userAnswers.forEach(ans => {
          formattedAnswers[ans.questionId] = ans.selectedOption;
        });

        // 2. PASTE YOUR GOOGLE SCRIPT URL HERE
        const scriptUrl = 'PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE';
        
        await fetch(scriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            name: user.name,
            mobile: user.mobile,
            businessName: user.businessName,
            businessWebsite: user.businessWebsite || "N/A",
            industry: user.industry,
            email: user.email,
            score: score,
            answers: formattedAnswers // This sends all 12 answers to the script
          })
        });
      } catch (error) {
        console.error("Error syncing to sheets:", error);
      }
    };

    syncToGoogleSheets();
  }, [user, score, userAnswers]);

  const handleDownload = () => {
    if (!user) return;
    
    const csvContent = [
      CSV_HEADERS.join(","), 
      [user.name, user.mobile, user.businessName, user.businessWebsite || "N/A", user.industry, user.email, score].join(",")
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MMC_BizMat_Report_${user.name.replace(/\s+/g, '_')}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden p-8 text-center border-t-8 border-brand">
        
        <div className="flex items-center justify-center gap-3 mb-4">
          <img src={OCircle} alt="MMC Logo" className="h-10 w-10 md:h-12 md:w-12 object-contain" />
          <h2 className="text-2xl md:text-3xl font-black text-brand tracking-tight">MMC BizMat</h2>
        </div>

        <p className="text-slate-500 mt-2">Analysis for: <span className="font-bold text-slate-700">{user?.businessName}</span></p>
        
        <div className="mt-8 bg-slate-50 rounded-2xl p-8 border border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Maturity Score</p>
          <div className="flex items-center justify-center">
            <span className="text-6xl font-black text-brand">{score.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-6 bg-green-50 border border-green-100 rounded-xl p-4 animate-fade-in-up">
          <div className="flex items-center justify-center gap-2 mb-1">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-bold text-green-800">Responses Synced</p>
          </div>
          <p className="text-xs text-green-700 mt-2 leading-relaxed">
            Your responses have been securely synced to our system.<br />
            You will soon receive your report via email.
          </p>
        </div>

        <div className="space-y-3 mt-8">
          <button onClick={onRestart} className="w-full bg-brand text-white font-bold py-4 rounded-xl shadow-lg hover:bg-brand-dark transition-all">
            Restart Assessment
          </button>
          <button onClick={handleDownload} className="w-full bg-white border-2 border-slate-200 text-slate-500 font-bold py-4 rounded-xl hover:bg-slate-50 transition-all">
            Download Detailed Report
          </button>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-100">
           <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-medium">Mountain Monk Consulting • Strategy & Operations</p>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
import React, { useEffect, useRef } from 'react';
import { type UserProfile, type UserAnswer } from '../types';
import OCircle from '../assets/OCircle.png';

interface ResultScreenProps {
  score: number;
  user: UserProfile | null;
  userAnswers: UserAnswer[];
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, user, userAnswers, onRestart }) => {
  const hasSynced = useRef(false);

  useEffect(() => {
    if (!user || hasSynced.current) return;

    const syncToGoogleSheets = async () => {
      try {
        hasSynced.current = true;
        const formattedAnswers: Record<string, string> = {};
        userAnswers.forEach(ans => {
          formattedAnswers[ans.questionId] = ans.selectedOption;
        });

        // ⚠️ PASTE YOUR COPIED URL BETWEEN THE QUOTES BELOW ⚠️
        const scriptUrl = 'https://script.google.com/macros/s/AKfycbxq8gIBTPV2w_gkz2BlPz7mvYsmfyDa-ajbOebRDZEGqd35rqi0xoUA9pDzgLuDZ8Hd/exec';
        
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
            answers: formattedAnswers
          })
        });
      } catch (error) {
        console.error("Sync Error:", error);
      }
    };

    syncToGoogleSheets();
  }, [user, score, userAnswers]);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden p-8 text-center border-t-8 border-brand">
        
        <div className="flex items-center justify-center gap-3 mb-4">
          <img src={OCircle} alt="MMC Logo" className="h-10 w-10 object-contain" />
          <h2 className="text-3xl font-black text-brand tracking-tight">MMC BizMat</h2>
        </div>

        <p className="text-slate-500 mt-2">Analysis for: <span className="font-bold text-slate-700">{user?.businessName}</span></p>
        
        <div className="mt-8 bg-slate-50 rounded-2xl p-8 border border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Maturity Score</p>
          <div className="flex items-center justify-center">
            <span className="text-6xl font-black text-brand">{score.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-6 bg-green-50 border border-green-100 rounded-xl p-4">
          <div className="flex items-center justify-center gap-2 mb-1">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-bold text-green-800 uppercase tracking-wider">Responses Synced</p>
          </div>
          <p className="text-xs text-green-700 mt-2 leading-relaxed">
            Your results are safely stored. Check your inbox for the full MMC growth report.
          </p>
        </div>

        <button onClick={onRestart} className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-4 rounded-xl shadow-lg mt-8 transition-all active:scale-[0.98]">
          Restart Assessment
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
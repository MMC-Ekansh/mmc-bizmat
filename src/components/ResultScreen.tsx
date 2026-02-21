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
        userAnswers.forEach(ans => { formattedAnswers[ans.questionId] = ans.selectedOption; });

        // REPLACE WITH YOUR URL
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
            answers: formattedAnswers
          })
        });
      } catch (error) { console.error("Sync error:", error); }
    };
    syncToGoogleSheets();
  }, [user, score, userAnswers]);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden p-6 md:p-10 text-center border-t-8 border-brand">
        
        <div className="flex items-center justify-center gap-3 mb-6">
          <img src={OCircle} alt="MMC Logo" className="h-10 w-10 object-contain" />
          <h2 className="text-2xl font-black text-brand tracking-tight">MMC BizMat</h2>
        </div>

        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Analysis for</p>
        <p className="text-lg font-bold text-slate-800 mb-8">{user?.businessName}</p>
        
        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 mb-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Maturity Score</p>
          <span className="text-6xl font-black text-brand">{score.toLocaleString()}</span>
        </div>

        <div className="bg-green-50 border border-green-100 rounded-2xl p-4 mb-8">
          <p className="text-xs font-bold text-green-800 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            Responses Synced
          </p>
          <p className="text-[11px] text-green-700 mt-1">
            Your secure report is being generated.<br />Check your email shortly.
          </p>
        </div>

        <button onClick={onRestart} className="w-full bg-brand text-white font-bold py-4 rounded-xl shadow-lg active:scale-[0.97] transition-all uppercase tracking-widest">
          Restart Assessment
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
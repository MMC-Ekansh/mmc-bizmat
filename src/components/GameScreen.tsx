import React from 'react';
import { QUESTIONS } from '../constants';
import { type Question } from '../types';
import OCircle from '../assets/OCircle.png';

interface GameScreenProps {
  score: number; // Kept in the background so App.tsx doesn't break
  askedQuestions: { [category: string]: Question[] };
  onSelectCategory: (category: string) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ askedQuestions, onSelectCategory }) => {
  const categories = Object.keys(QUESTIONS);
  
  const totalQuestions = Object.values(QUESTIONS).reduce((acc, curr) => acc + curr.length, 0);
  const totalAsked = Object.values(askedQuestions).reduce((acc, curr) => acc + curr.length, 0);
  const progressPercentage = (totalAsked / totalQuestions) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <div className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          
          {/* BRAND LOGO AND TITLE */}
          <div className="flex items-center space-x-3">
            <img src={OCircle} alt="MMC Logo" className="h-10 w-10 object-contain" />
            <h1 className="text-xl md:text-2xl font-black text-brand tracking-tight">MMC BizMat</h1>
          </div>
          
          <div className="flex flex-col items-end">
             <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">
                Progress {Math.round(progressPercentage)}%
             </p>
             <div className="w-32 md:w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-brand transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                />
             </div>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-5xl mx-auto w-full p-6 flex flex-col items-center justify-center">
        <div className="text-center mb-10 mt-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">Choose Your Battle</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
                Complete levels sequentially to unlock your full profile.
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {categories.map((category, idx) => {
            const availableCount = QUESTIONS[category].length - (askedQuestions[category]?.length || 0);
            const isExhausted = availableCount === 0;

            let isLocked = false;
            if (idx > 0) {
                const prevCategory = categories[idx - 1];
                const prevTotal = QUESTIONS[prevCategory].length;
                const prevAsked = askedQuestions[prevCategory]?.length || 0;
                if (prevAsked < prevTotal) {
                    isLocked = true;
                }
            }

            const delay = idx * 100;

            let cardClasses = "bg-white border-slate-200 hover:border-brand hover:shadow-xl hover:-translate-y-1";
            let iconClass = "bg-brand-50 text-brand";
            let textClass = "text-slate-800";
            let subTextClass = "text-slate-500";
            
            if (isExhausted) {
                cardClasses = "bg-slate-50 border-slate-200 opacity-60 grayscale cursor-default";
                iconClass = "bg-slate-200 text-slate-400";
                textClass = "text-slate-500";
                subTextClass = "text-slate-400";
            } else if (isLocked) {
                cardClasses = "bg-slate-100 border-slate-200 opacity-75 cursor-not-allowed";
                iconClass = "bg-slate-200 text-slate-400";
                textClass = "text-slate-400";
                subTextClass = "text-slate-400";
            }

            return (
              <button
                key={category}
                onClick={() => !isExhausted && !isLocked && onSelectCategory(category)}
                disabled={isExhausted || isLocked}
                style={{ animationDelay: `${delay}ms` }}
                className={`
                  relative p-6 md:p-8 rounded-2xl text-left border transition-all duration-300 transform animate-fade-in-up
                  ${cardClasses}
                `}
              >
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${iconClass}`}>
                        {isLocked ? (
                            <span className="text-xl">🔒</span>
                        ) : (
                            <>
                                {idx === 0 && '📊'}
                                {idx === 1 && '⚔️'}
                                {idx === 2 && '⚙️'}
                                {idx === 3 && '🔥'}
                            </>
                        )}
                    </div>
                    {isExhausted && (
                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                            <span>Completed</span>
                        </div>
                    )}
                </div>

                <h3 className={`text-xl font-bold mb-2 ${textClass}`}>
                  {category}
                </h3>
                <p className={`text-sm ${subTextClass}`}>
                   {isExhausted 
                     ? 'Zone Cleared' 
                     : isLocked 
                        ? 'Complete previous level to unlock' 
                        : `${availableCount} Challenges Remaining`
                   }
                </p>
                
                {!isExhausted && !isLocked && (
                    <div className="mt-6 w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-brand" style={{ width: `${((QUESTIONS[category].length - availableCount) / QUESTIONS[category].length) * 100}%` }}></div>
                    </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
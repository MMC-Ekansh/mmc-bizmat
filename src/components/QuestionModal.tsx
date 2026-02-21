import React, { useState, useEffect } from 'react';
import { type Question } from '../types';
import { QUESTION_TIME } from '../constants';

interface QuestionModalProps {
  question: Question;
  category: string;
  onSubmit: (score: number, index: number) => void;
}

const QuestionModal: React.FC<QuestionModalProps> = ({ question, category, onSubmit }) => {
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 0.1 ? 0 : prev - 0.1));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0 && selected === null) {
      onSubmit(0, -1);
    }
  }, [timeLeft, selected, onSubmit]);

  const handleSelect = (idx: number) => {
    setSelected(idx);
    const score = (idx + 1) * 1000;
    setTimeout(() => onSubmit(score, idx), 400);
  };

  const progressPercentage = (timeLeft / QUESTION_TIME) * 100;
  let timerColor = "bg-brand";
  if (timeLeft < 5) timerColor = "bg-red-500";
  else if (timeLeft < 10) timerColor = "bg-yellow-500";

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in-up">
        
        <div className="w-full h-2 bg-slate-200">
          <div className={`h-full transition-all duration-100 ease-linear ${timerColor}`} style={{ width: `${progressPercentage}%` }} />
        </div>

        <div className="bg-slate-800 px-6 py-5 flex justify-between items-center">
          <span className="text-white font-bold tracking-wider uppercase text-sm">{category}</span>
          <div className="flex items-center space-x-2 bg-slate-700 px-3 py-1 rounded-full">
            <span className="text-lg">⏱️</span>
            <span className={`font-mono font-bold ${timeLeft < 5 ? 'text-red-400' : 'text-white'}`}>
              {Math.ceil(timeLeft)}s
            </span>
          </div>
        </div>

        <div className="p-8">
          <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-8 leading-snug">
            {question.question}
          </h3>

          <div className="space-y-4">
            {question.options.map((option, index) => {
              const isSelected = selected === index;
              return (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={selected !== null || timeLeft === 0}
                  className={`w-full text-left px-6 py-5 rounded-xl border-2 transition-all flex items-center group
                    ${isSelected ? 'bg-brand text-white border-brand scale-[1.02] shadow-lg' : 'border-slate-100 bg-slate-50 hover:border-brand'}
                  `}
                >
                  <div className={`w-8 h-8 rounded-full border-2 mr-5 flex items-center justify-center shrink-0
                    ${isSelected ? 'border-white bg-white/20' : 'border-slate-300 group-hover:border-brand'}
                  `}>
                    <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-500 group-hover:text-brand'}`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                  </div>
                  <span className={isSelected ? 'font-medium' : 'text-slate-700'}>{option}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
import React, { useState } from 'react';
import { type UserProfile } from '../types';
import circleLogo from '../assets/circle.png';

interface StartScreenProps {
  onStart: (user: UserProfile) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [formData, setFormData] = useState<UserProfile>({ 
    name: '', mobile: '', businessName: '', businessWebsite: '', industry: '', email: '' 
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.mobile.replace(/\D/g, '').length !== 10) {
      return setError('Mobile No must contain exactly 10 numbers.');
    }
    if (formData.name && formData.mobile && formData.businessName && formData.industry && formData.email) {
      onStart(formData);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        
        <div className="bg-brand p-6 flex items-center justify-center gap-4">
          <img src={circleLogo} alt="MMC Logo" className="h-10 w-10 brightness-0 invert" />
          <h1 className="text-2xl font-black text-white">MMC BizMat</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          {error && <div className="text-red-500 text-xs font-bold p-2 bg-red-50 rounded border border-red-200">{error}</div>}

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name *</label>
            <input type="text" name="name" autoComplete="name" required className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:border-brand" onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Mobile No *</label>
            <input type="tel" name="mobile" autoComplete="tel" required className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:border-brand" onChange={(e) => setFormData({...formData, mobile: e.target.value})} />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Business Name *</label>
            <input type="text" name="businessName" autoComplete="organization" required className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:border-brand" onChange={(e) => setFormData({...formData, businessName: e.target.value})} />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Business Website</label>
            <input type="text" name="businessWebsite" autoComplete="url" className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:border-brand" onChange={(e) => setFormData({...formData, businessWebsite: e.target.value})} />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Industry *</label>
            <input type="text" name="industry" required className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:border-brand" onChange={(e) => setFormData({...formData, industry: e.target.value})} />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Business Email *</label>
            <input type="email" name="email" autoComplete="email" required className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:border-brand" onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>

          <button type="submit" className="w-full bg-brand hover:bg-brand-dark text-white font-black py-4 rounded-xl mt-6 uppercase tracking-widest text-sm shadow-lg transition-all">
            Start Assessment
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartScreen;
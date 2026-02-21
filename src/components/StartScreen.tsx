import React, { useState } from 'react';
import { type UserProfile } from '../types';
import OCircle from '../assets/OCircle.png';

interface StartScreenProps {
  onStart: (user: UserProfile) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    businessName: '',
    businessWebsite: '',
    industry: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.mobile) {
      onStart(formData);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-brand p-6 text-white text-center">
          <div className="flex justify-center mb-3">
            <img src={OCircle} alt="MMC Logo" className="h-12 w-12 brightness-0 invert" />
          </div>
          <h1 className="text-2xl font-black tracking-tight uppercase">MMC BizMat</h1>
          <p className="text-orange-100 text-xs font-bold tracking-widest uppercase mt-1">Scale Assessment</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1 tracking-widest">Full Name *</label>
              <input
                required
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand outline-none text-base"
                placeholder="Ekansh Ghai"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1 tracking-widest">Mobile *</label>
                <input
                  required
                  type="tel"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand outline-none text-base"
                  placeholder="98765 43210"
                  value={formData.mobile}
                  onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1 tracking-widest">Email *</label>
                <input
                  required
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand outline-none text-base"
                  placeholder="name@company.in"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1 tracking-widest">Business Name *</label>
              <input
                required
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand outline-none text-base"
                placeholder="Mountain Monk Consulting"
                value={formData.businessName}
                onChange={e => setFormData({ ...formData, businessName: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 transition-all active:scale-[0.97] mt-4 uppercase tracking-widest"
          >
            Start Assessment
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartScreen;
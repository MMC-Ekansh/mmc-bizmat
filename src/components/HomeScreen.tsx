import React from 'react';
import circleLogo from '../assets/circle.png';

interface HomeScreenProps {
  onStartClick: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartClick }) => {
  return (
    <div 
      onClick={onStartClick}
      className="flex flex-col items-center justify-center min-h-screen bg-brand text-white cursor-pointer transition-colors hover:bg-brand-dark p-6 select-none relative overflow-hidden text-center"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col items-center mb-12 z-10 transform transition-transform duration-500 hover:scale-105">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight uppercase mb-3 text-white">
          Mountain Monk Consulting
        </h2>
        <p className="text-[10px] md:text-xs font-medium tracking-[0.4em] text-white/90 uppercase">
          Change | Simplicity | Profitability
        </p>
      </div>
      
      <div className="z-10 flex flex-col items-center mb-16 w-full">
        
        {/* PROPRIETARY TOOL BADGE */}
        <div className="mb-6 px-5 py-2 border border-white/30 rounded-full bg-white/10 backdrop-blur-sm shadow-sm">
          <p className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-white uppercase">
            Proprietary Assessment Tool
          </p>
        </div>

        <h1 className="text-5xl md:text-8xl font-black drop-shadow-lg tracking-tighter mb-4 leading-tight flex items-center justify-center gap-4 md:gap-6">
          <img src={circleLogo} alt="MMC Logo" className="h-14 w-14 md:h-24 md:w-24 object-contain" />
          <span>MMC BizMat</span>
        </h1>
        <p className="text-sm md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed px-4 font-normal mt-4">
          Every business is playing a game, but the rules change as you scale. 
          Answer these 12 rapid-fire questions to audit your current business maturity 
          and discover the specific levers needed to reach the next level.
        </p>
      </div>
      
      <div className="z-10 animate-pulse flex flex-col items-center">
        <p className="text-lg md:text-xl font-bold uppercase tracking-widest border-b-2 border-white/50 pb-1 mb-2">
          Click anywhere to begin
        </p>
      </div>
    </div>
  );
};

export default HomeScreen;
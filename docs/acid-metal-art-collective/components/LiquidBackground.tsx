
import React from 'react';

export const LiquidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-black opacity-90"></div>
      
      {/* Liquid Goo Container */}
      <div className="liquid-metal w-full h-full relative opacity-40">
        <div className="blob w-[400px] h-[400px] top-[10%] left-[10%] bg-white/20 blur-xl"></div>
        <div className="blob w-[500px] h-[500px] top-[40%] left-[50%] bg-zinc-400/30 blur-2xl" style={{ animationDelay: '-2s' }}></div>
        <div className="blob w-[350px] h-[350px] bottom-[10%] right-[20%] bg-zinc-600/40 blur-xl" style={{ animationDelay: '-5s' }}></div>
        <div className="blob w-[600px] h-[600px] top-[-10%] right-[-10%] bg-zinc-200/10 blur-3xl" style={{ animationDelay: '-7s' }}></div>
      </div>
      
      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { SiteConfig, Language } from './types';
import { DEFAULT_CONFIG } from './constants';
import { LiquidBackground } from './components/LiquidBackground';
import { AdminPanel } from './components/AdminPanel';

const App: React.FC = () => {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [lang, setLang] = useState<Language>('en');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load saved config
  useEffect(() => {
    const saved = localStorage.getItem('acid_config');
    if (saved) {
      try {
        setConfig(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load config", e);
      }
    }
  }, []);

  const handleAdminInit = () => {
    if (isAuthenticated) {
      setIsAdminOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'drawme') {
      setIsAuthenticated(true);
      setIsAdminOpen(true);
      setIsAuthModalOpen(false);
      setPasswordInput('');
    } else {
      alert(lang === 'zh' ? '密碼錯誤' : 'Incorrect Password');
    }
  };

  const currentTexts = config.texts[lang];

  const getTextStyles = () => {
    const base: React.CSSProperties = {
      color: config.styles.primaryColor,
      transform: `translate(${config.layout.titlePositionX}px, ${config.layout.titlePositionY}px)`,
      textShadow: config.styles.textEffect === 'glow' ? `0 0 20px ${config.styles.glowColor}` : 'none',
    };

    if (config.styles.textEffect === 'chrometype') {
      return {
        ...base,
        background: `linear-gradient(to bottom, #fff 0%, ${config.styles.primaryColor} 50%, #000 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5)) contrast(1.5)',
      };
    }

    if (config.styles.textEffect === 'distort') {
      return {
        ...base,
        fontFamily: 'Syncopate, sans-serif',
        letterSpacing: '-0.05em',
        fontStyle: 'italic',
        transform: `translate(${config.layout.titlePositionX}px, ${config.layout.titlePositionY}px) skew(-10deg)`,
      };
    }

    return base;
  };

  return (
    <div className="relative min-h-screen">
      <LiquidBackground />

      {/* Language Switcher Button (Top Right) */}
      <div className="fixed top-8 right-32 z-40">
        <button 
          onClick={() => setLang(l => l === 'en' ? 'zh' : 'en')}
          className="glass-morphism px-3 py-1 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all border border-white/20"
        >
          {lang === 'en' ? 'ZH' : 'EN'}
        </button>
      </div>

      {/* Main UI */}
      <main className="relative z-10 container mx-auto px-6 py-12 flex flex-col items-center min-h-screen">
        
        {/* Navigation / Header */}
        <nav className="w-full flex justify-between items-center mb-16">
          <div className="display-font text-sm font-black italic tracking-tighter opacity-80">
            {lang === 'en' ? 'LIQUID_METALS_COLL' : '液態金屬集體'}
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">
            <button className="hover:text-white transition-colors">{lang === 'en' ? 'Archive' : '封存'}</button>
            <button className="hover:text-white transition-colors">{lang === 'en' ? 'Fragments' : '碎片'}</button>
            <button 
              onClick={handleAdminInit}
              className="px-4 py-1 border border-zinc-700 hover:bg-white hover:text-black transition-all"
            >
              System.init()
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-col items-center text-center max-w-5xl w-full mb-24">
          <h1 
            style={getTextStyles()}
            className="acid-font text-5xl md:text-8xl lg:text-9xl font-black mb-4 transition-transform duration-300 ease-out leading-none"
          >
            {currentTexts.heroTitle}
          </h1>
          <p className="display-font text-xs md:text-sm tracking-[0.4em] text-zinc-400 mb-12 uppercase">
            {currentTexts.heroSubtitle}
          </p>

          {/* Center Media Display */}
          <div className="relative w-full aspect-video md:aspect-[21/9] glass-morphism overflow-hidden rounded-sm group cursor-crosshair">
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-[2]"></div>
             <div className="absolute inset-0 border-[0.5px] border-white/10 z-[3] pointer-events-none"></div>
             
             {config.layout.isMediaVideo ? (
               <video 
                src={config.layout.mediaUrl} 
                autoPlay loop muted playsInline
                className="w-full h-full object-cover grayscale contrast-125 opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
               />
             ) : (
               <img 
                src={config.layout.mediaUrl} 
                className="w-full h-full object-cover grayscale contrast-125 opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                alt="Artwork"
               />
             )}

             <div className="absolute bottom-8 left-8 z-[5] text-left">
               <div className="text-[9px] text-white/40 uppercase mb-1 tracking-widest">fragment_id</div>
               <div className="display-font text-lg font-bold tracking-tighter">PROTO-GENESIS_01</div>
             </div>

             <div className="absolute top-8 right-8 z-[5] flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-[9px] tracking-widest opacity-60 uppercase">Live_Render</span>
             </div>
          </div>
        </section>

        {/* Order / Acquisition Section */}
        <section className="w-full max-w-4xl glass-morphism p-12 mb-24 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
             <svg width="200" height="200" viewBox="0 0 100 100">
               <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2 2" />
               <path d="M10 50 L90 50 M50 10 L50 90" stroke="white" strokeWidth="0.5" />
             </svg>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div>
                <h2 className="acid-font text-3xl font-bold mb-6 italic" style={{ color: config.styles.primaryColor }}>
                  {currentTexts.orderTitle}
                </h2>
                <p className="text-sm leading-relaxed text-zinc-400 mb-8 font-light italic">
                  {currentTexts.orderDescription}
                </p>
                <div className="flex items-center gap-8 mb-8 border-y border-zinc-800 py-6">
                   <div>
                     <div className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">{lang === 'en' ? 'Valuation' : '估值'}</div>
                     <div className="display-font text-xl font-black">{config.artwork.price} ETH</div>
                   </div>
                   <div>
                     <div className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">{lang === 'en' ? 'Edition' : '版本'}</div>
                     <div className="display-font text-xl font-black">{config.artwork.edition}</div>
                   </div>
                </div>
             </div>

             <div className="space-y-4">
                <div className="bg-black/50 border border-zinc-800 p-4">
                   <label className="text-[9px] text-zinc-600 block mb-2 uppercase tracking-[0.2em]">{lang === 'en' ? 'Collector_Identifier' : '收藏家標識符'}</label>
                   <input type="text" placeholder={lang === 'en' ? "WALLET_ADDRESS_OR_EMAIL" : "錢包地址或電子郵件"} className="w-full bg-transparent border-b border-zinc-700 py-2 text-xs focus:outline-none focus:border-white transition-colors" />
                </div>
                <button 
                  className="w-full py-6 text-xs font-black uppercase tracking-[0.5em] transition-all relative group overflow-hidden"
                  style={{ backgroundColor: config.styles.accentColor, color: '#000' }}
                >
                  <span className="relative z-10">{currentTexts.ctaButton}</span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
                <p className="text-[8px] text-center text-zinc-600 uppercase tracking-widest">
                  {lang === 'en' ? 'All sales are final. Transactions secured via smart contract.' : '所有銷售均為最終銷售。交易通過智能合約擔保。'}
                </p>
             </div>
           </div>
        </section>

        {/* Footer */}
        <footer className="w-full border-t border-zinc-900 pt-12 pb-24 flex flex-col md:flex-row justify-between items-start gap-8 opacity-40">
           <div className="max-w-xs">
              <div className="display-font text-xs font-bold mb-4">ACID_LABS © 2024</div>
              <p className="text-[10px] leading-relaxed italic">
                {lang === 'en' 
                  ? 'Explorations in digital materiality and neural aesthetics. Built on the edge of the void.'
                  : '探索數位物質性與神經美學。建立在虛空的邊緣。'}
              </p>
           </div>
           <div className="grid grid-cols-2 gap-12 text-[10px] uppercase font-bold tracking-widest">
              <div className="flex flex-col gap-2">
                <a href="#" className="hover:text-white transition-colors">{lang === 'en' ? 'Manifesto' : '宣言'}</a>
                <a href="#" className="hover:text-white transition-colors">{lang === 'en' ? 'Whitepaper' : '白皮書'}</a>
                <a href="#" className="hover:text-white transition-colors">Discord</a>
              </div>
              <div className="flex flex-col gap-2">
                <a href="#" className="hover:text-white transition-colors">{lang === 'en' ? 'Privacy' : '隱私'}</a>
                <a href="#" className="hover:text-white transition-colors">{lang === 'en' ? 'Terms' : '條款'}</a>
                <a href="#" className="hover:text-white transition-colors">{lang === 'en' ? 'Contract' : '合約'}</a>
              </div>
           </div>
        </footer>
      </main>

      {/* Password Prompt Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <form onSubmit={handlePasswordSubmit} className="glass-morphism p-8 w-80 text-center animate-in zoom-in-95 duration-200">
             <h3 className="display-font text-xs tracking-[0.3em] uppercase mb-6">系統身份驗證</h3>
             <input 
                autoFocus
                type="password" 
                placeholder="請輸入密碼" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-black border border-zinc-800 p-3 text-xs mb-4 focus:outline-none focus:border-zinc-500"
             />
             <div className="flex gap-2">
               <button 
                  type="button" 
                  onClick={() => setIsAuthModalOpen(false)}
                  className="flex-1 py-2 text-[10px] border border-zinc-800 hover:bg-zinc-800 transition-colors"
                >取消</button>
               <button 
                  type="submit" 
                  className="flex-1 py-2 text-[10px] bg-white text-black font-bold uppercase"
                >進入</button>
             </div>
          </form>
        </div>
      )}

      {/* Admin UI */}
      <AdminPanel 
        config={config} 
        updateConfig={setConfig} 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />

      {/* Persistent Call To Action for Admin */}
      {!isAdminOpen && (
        <button 
          onClick={handleAdminInit}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full glass-morphism border border-white/20 flex items-center justify-center hover:scale-110 transition-transform bg-black"
        >
          <span className="text-xl">⚙️</span>
        </button>
      )}
    </div>
  );
};

export default App;


import React, { useState } from 'react';
import { SiteConfig, Language, SiteTexts } from '../types';
import { polishText } from '../services/geminiService';

interface AdminPanelProps {
  config: SiteConfig;
  updateConfig: (newConfig: SiteConfig) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ config, updateConfig, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'layout'>('content');
  const [editingLang, setEditingLang] = useState<Language>('zh');
  const [isPolishing, setIsPolishing] = useState(false);

  const handleTextChange = (key: keyof SiteTexts, val: string) => {
    const newTexts = { ...config.texts };
    newTexts[editingLang] = { ...newTexts[editingLang], [key]: val };
    updateConfig({ ...config, texts: newTexts });
  };

  const handleStyleChange = (key: keyof SiteConfig['styles'], val: string) => {
    updateConfig({ ...config, styles: { ...config.styles, [key]: val } });
  };

  const handleLayoutChange = (key: keyof SiteConfig['layout'], val: any) => {
    updateConfig({ ...config, layout: { ...config.layout, [key]: val } });
  };

  const handlePolish = async (key: keyof SiteTexts) => {
    setIsPolishing(true);
    const stylePrompt = editingLang === 'zh' ? "酸性設計, 實驗性, 未來感, 繁體中文" : "acid graphics, experimental, futuristic";
    const newText = await polishText(config.texts[editingLang][key], stylePrompt);
    handleTextChange(key, newText);
    setIsPolishing(false);
  };

  if (!isOpen) return null;

  const currentTexts = config.texts[editingLang];

  return (
    <div className="fixed top-0 right-0 w-80 h-full glass-morphism z-50 p-6 overflow-y-auto border-l border-zinc-700 shadow-2xl animate-in slide-in-from-right duration-300">
      <div className="flex justify-between items-center mb-8">
        <h2 className="display-font text-sm font-bold tracking-widest uppercase">後台管理終端</h2>
        <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">✕</button>
      </div>

      <div className="flex gap-2 mb-6 border-b border-zinc-800 pb-2">
        {(['content', 'style', 'layout'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-[10px] uppercase tracking-tighter px-2 py-1 ${activeTab === tab ? 'text-white border-b border-white' : 'text-zinc-500'}`}
          >
            {tab === 'content' ? '內容' : tab === 'style' ? '樣式' : '佈局'}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {activeTab === 'content' && (
          <div className="space-y-4">
            <div className="flex bg-zinc-900 p-1 rounded mb-4">
              <button 
                onClick={() => setEditingLang('zh')}
                className={`flex-1 text-[10px] py-1 rounded ${editingLang === 'zh' ? 'bg-zinc-700 text-white' : 'text-zinc-500'}`}
              >中文</button>
              <button 
                onClick={() => setEditingLang('en')}
                className={`flex-1 text-[10px] py-1 rounded ${editingLang === 'en' ? 'bg-zinc-700 text-white' : 'text-zinc-500'}`}
              >English</button>
            </div>
            
            <div>
              <label className="text-[10px] text-zinc-500 block mb-1">主標題</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={currentTexts.heroTitle} 
                  onChange={(e) => handleTextChange('heroTitle', e.target.value)}
                  className="bg-black/40 border border-zinc-800 text-xs p-2 w-full focus:outline-none focus:border-zinc-500"
                />
                <button 
                  onClick={() => handlePolish('heroTitle')} 
                  disabled={isPolishing}
                  className="bg-zinc-800 p-1 text-[10px] hover:bg-zinc-700 disabled:opacity-50"
                  title="使用 AI 優化文字"
                >
                  ✨
                </button>
              </div>
            </div>
            <div>
              <label className="text-[10px] text-zinc-500 block mb-1">副標題</label>
              <textarea 
                value={currentTexts.heroSubtitle} 
                onChange={(e) => handleTextChange('heroSubtitle', e.target.value)}
                className="bg-black/40 border border-zinc-800 text-xs p-2 w-full h-20 focus:outline-none focus:border-zinc-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-500 block mb-1">行動按鈕</label>
              <input 
                type="text" 
                value={currentTexts.ctaButton} 
                onChange={(e) => handleTextChange('ctaButton', e.target.value)}
                className="bg-black/40 border border-zinc-800 text-xs p-2 w-full focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>
        )}

        {activeTab === 'style' && (
          <div className="space-y-4">
            <div>
              <label className="text-[10px] text-zinc-500 block mb-1">主要顏色</label>
              <input 
                type="color" 
                value={config.styles.primaryColor} 
                onChange={(e) => handleStyleChange('primaryColor', e.target.value)}
                className="w-full h-10 bg-transparent border-none cursor-pointer"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-500 block mb-1">強調顏色</label>
              <input 
                type="color" 
                value={config.styles.accentColor} 
                onChange={(e) => handleStyleChange('accentColor', e.target.value)}
                className="w-full h-10 bg-transparent border-none cursor-pointer"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-500 block mb-1">文字特效</label>
              <select 
                value={config.styles.textEffect}
                onChange={(e) => handleStyleChange('textEffect', e.target.value as any)}
                className="bg-black/40 border border-zinc-800 text-xs p-2 w-full focus:outline-none"
              >
                <option value="none">無</option>
                <option value="glow">發光</option>
                <option value="chrometype">鉻合金字體</option>
                <option value="distort">扭曲</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="text-[10px] text-zinc-500 block mb-1">標題 X 軸</label>
                <input 
                  type="range" min="-100" max="100"
                  value={config.layout.titlePositionX}
                  onChange={(e) => handleLayoutChange('titlePositionX', parseInt(e.target.value))}
                  className="w-full accent-zinc-500"
                />
              </div>
              <div className="w-1/2">
                <label className="text-[10px] text-zinc-500 block mb-1">標題 Y 軸</label>
                <input 
                  type="range" min="-100" max="100"
                  value={config.layout.titlePositionY}
                  onChange={(e) => handleLayoutChange('titlePositionY', parseInt(e.target.value))}
                  className="w-full accent-zinc-500"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-zinc-500 block mb-1">媒體 URL (影片或圖片)</label>
              <input 
                type="text" 
                value={config.layout.mediaUrl} 
                onChange={(e) => handleLayoutChange('mediaUrl', e.target.value)}
                placeholder="圖片/影片網址"
                className="bg-black/40 border border-zinc-800 text-xs p-2 w-full focus:outline-none focus:border-zinc-500"
              />
              <div className="mt-2 flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={config.layout.isMediaVideo}
                  onChange={(e) => handleLayoutChange('isMediaVideo', e.target.checked)}
                />
                <span className="text-[10px] text-zinc-400">這是影片</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 p-4 border border-zinc-800 bg-zinc-900/50">
        <p className="text-[10px] text-zinc-600 mb-2 leading-tight">變更會立即預覽。重新整理將捨棄未儲存的內容。</p>
        <button 
          onClick={() => {
            localStorage.setItem('acid_config', JSON.stringify(config));
            alert('設定已成功儲存');
          }}
          className="w-full bg-white text-black text-[10px] font-bold py-2 uppercase tracking-widest hover:bg-zinc-200"
        >
          儲存配置
        </button>
      </div>
    </div>
  );
};

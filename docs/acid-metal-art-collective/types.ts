
export interface SiteTexts {
  heroTitle: string;
  heroSubtitle: string;
  ctaButton: string;
  orderTitle: string;
  orderDescription: string;
}

export interface SiteConfig {
  texts: {
    en: SiteTexts;
    zh: SiteTexts;
  };
  styles: {
    primaryColor: string;
    accentColor: string;
    glowColor: string;
    textEffect: 'none' | 'glow' | 'chrometype' | 'distort';
  };
  layout: {
    titlePositionX: number;
    titlePositionY: number;
    mediaUrl: string;
    isMediaVideo: boolean;
  };
  artwork: {
    price: number;
    edition: string;
  };
}

export type AppMode = 'view' | 'admin';
export type Language = 'en' | 'zh';

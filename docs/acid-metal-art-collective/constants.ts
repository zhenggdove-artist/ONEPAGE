
import { SiteConfig } from './types';

export const DEFAULT_CONFIG: SiteConfig = {
  texts: {
    en: {
      heroTitle: "METALMORPHOSIS",
      heroSubtitle: "A LIQUID ODYSSEY IN DIGITAL CHROME",
      ctaButton: "RESERVE FRAGMENT",
      orderTitle: "ACQUISITION PORTAL",
      orderDescription: "Secure your place in the collective. Each piece is generated via neural fluid simulations and serialized on-chain."
    },
    zh: {
      heroTitle: "金屬蛻變",
      heroSubtitle: "數位鉻合金中的液態奧德賽",
      ctaButton: "預約碎片",
      orderTitle: "獲取傳送門",
      orderDescription: "確保您在集體中的位置。每件作品都通過神經流體模擬生成，並在鏈上序列化。"
    }
  },
  styles: {
    primaryColor: "#00FF41",
    accentColor: "#FF00F5",
    glowColor: "rgba(0, 255, 65, 0.5)",
    textEffect: 'chrometype'
  },
  layout: {
    titlePositionX: 0,
    titlePositionY: 0,
    mediaUrl: "https://picsum.photos/1200/800",
    isMediaVideo: false
  },
  artwork: {
    price: 0.85,
    edition: "01/50"
  }
};

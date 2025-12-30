# Acid Metal Art Collective - 單頁作品販售網站

## 專案概述

這是一個**單頁藝術作品販售網站**,採用酸性金屬(Acid Metal)美學風格設計。網站具備雙語支援(中文/英文)及後台管理功能。

## 技術架構

### 主要檔案
- **`/index.html`** - 網站主體,所有 CSS、JavaScript 和 React 程式碼都內嵌於此檔案中,用於 GitHub Pages 部署
- **`/docs/acid-metal-art-collective/`** - 原始開發檔案(TypeScript/React 版本)

### 技術棧
- **React 18** - 前端框架(透過 UMD 方式載入)
- **Babel Standalone** - 瀏覽器端 JSX 轉換
- **Tailwind CSS** - 樣式框架(透過 CDN)
- **LocalStorage** - 設定持久化

### 字體
- Orbitron - 數位風格顯示字體
- Space Mono - 等寬程式碼風格
- Syncopate - 酸性標題字體

## 功能說明

### 1. 訪客功能
- 瀏覽藝術作品展示
- 中英文語言切換(右上角 ZH/EN 按鈕)
- 液態金屬動態背景效果
- 查看價格和版本資訊

### 2. 管理後台
- **入口**: 點擊右下角齒輪按鈕或導航列的 "System.init()"
- **密碼**: `drawme`
- **功能**:
  - **內容管理**: 編輯中英文標題、副標題、按鈕文字
  - **樣式設定**: 主要顏色、強調顏色、文字特效(發光/鉻合金/扭曲)
  - **佈局調整**: 標題位置、媒體素材 URL
  - **價格設定**: ETH 價格、版本編號

### 3. 文字特效類型
- `none` - 無特效
- `glow` - 發光效果
- `chrometype` - 鉻合金漸層字體
- `distort` - 傾斜扭曲效果

## 設定結構 (SiteConfig)

```javascript
{
  texts: {
    en: { heroTitle, heroSubtitle, ctaButton, orderTitle, orderDescription },
    zh: { heroTitle, heroSubtitle, ctaButton, orderTitle, orderDescription }
  },
  styles: {
    primaryColor: "#00FF41",    // 主要顏色
    accentColor: "#FF00F5",     // 強調顏色
    glowColor: "rgba(...)",     // 發光顏色
    textEffect: "chrometype"    // 文字特效
  },
  layout: {
    titlePositionX: 0,          // 標題 X 偏移
    titlePositionY: 0,          // 標題 Y 偏移
    mediaUrl: "https://...",    // 展示媒體 URL
    isMediaVideo: false         // 是否為影片
  },
  artwork: {
    price: 0.85,                // ETH 價格
    edition: "01/50"            // 版本編號
  }
}
```

## 部署說明

### GitHub Pages 設定
1. 進入 Repository Settings > Pages
2. Source 選擇 "Deploy from a branch"
3. Branch 選擇 `main`,資料夾選擇 `/ (root)`
4. 儲存後等待部署完成

### 為何 index.html 要放在根目錄?
GitHub Pages 預設尋找根目錄的 `index.html`。所有程式碼都內嵌在這個檔案中,確保靜態部署時能正常運作,不需要任何建置步驟。

## 開發備註

### 原始開發檔案 (`/docs/acid-metal-art-collective/`)
這些是 Vite + TypeScript 版本的開發檔案,可用於本地開發:
```bash
cd docs/acid-metal-art-collective
npm install
npm run dev
```

### 修改建議
- 如需修改網站,建議直接編輯 `/index.html`
- 所有 React 程式碼在 `<script type="text/babel">` 區塊中
- CSS 樣式在 `<style>` 區塊中

## 常見問題

### Q: 如何更改預設密碼?
A: 搜尋 `drawme` 並替換為新密碼

### Q: 如何更改預設內容?
A: 修改 `DEFAULT_CONFIG` 物件中的值

### Q: 設定儲存在哪裡?
A: 使用者的設定儲存在 LocalStorage 的 `acid_config` 鍵值中

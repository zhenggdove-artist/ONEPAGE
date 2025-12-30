# Acid Metal Art Collective - 單頁作品販售網站

## 專案概述

這是一個**單頁藝術作品販售網站**,採用酸性金屬(Acid Metal)美學風格設計。網站具備雙語支援(中文/英文)及**WIX 風格的直覺式後台編輯功能**。

## 技術架構

### 主要檔案
- **`/index.html`** - 網站主體,所有 CSS、JavaScript 和 React 程式碼都內嵌於此檔案中
- **`/docs/acid-metal-art-collective/`** - 原始開發檔案(TypeScript/React 版本,僅供參考)

### 技術棧
- **React 18** - 前端框架(透過 UMD 方式載入)
- **Babel Standalone** - 瀏覽器端 JSX 轉換
- **Tailwind CSS** - 樣式框架(透過 CDN)
- **LocalStorage** - 設定持久化

### 字體
**英文字體:**
- Orbitron - 科技風格
- Syncopate - 酸性風格
- Bebas Neue - 粗體標題
- Playfair Display - 優雅襯線
- Montserrat - 現代無襯線
- Space Mono - 等寬程式碼風格

**中文字體:**
- Noto Sans TC - 思源黑體
- Noto Serif TC - 思源宋體

## 功能說明

### 1. 訪客功能
- 瀏覽藝術作品展示
- 中英文語言切換(右上角 ZH/EN 按鈕)
- 液態金屬動態背景效果
- 查看價格和版本資訊

### 2. 直覺式編輯後台 (WIX 風格)

#### 進入編輯模式
- **入口**: 點擊右下角齒輪按鈕或導航列的 "System.init()"
- **密碼**: `drawme`

#### 編輯功能
進入編輯模式後,頂部會顯示紫色編輯工具列,所有可編輯元素會有藍色脈衝提示。

**直接點擊編輯:**
- 點擊任何文字元素即可開啟浮動編輯工具列
- 可編輯元素會在 hover 時顯示虛線框

**浮動工具列功能:**
- **文字內容** - 直接編輯中/英文內容
- **字體大小** - 滑桿調整 10-150px
- **顏色選擇** - 顏色選擇器 + HEX 輸入
- **英文字體** - 5 種設計字體可選
- **中文字體** - 思源黑體/宋體
- **X/Y 位移** - 微調元素位置
- **文字特效** - 無/發光/金屬漸層/扭曲

**可編輯元素:**
1. 主標題 (heroTitle)
2. 副標題 (heroSubtitle)
3. 訂購區標題 (orderTitle)
4. 訂購區描述 (orderDescription)
5. CTA 按鈕 (ctaButton) - 額外支援按鈕背景色

**其他編輯功能:**
- 價格和版本 - 直接在頁面上編輯
- 媒體素材 - 點擊「更換媒體」按鈕

#### 儲存與退出
- 點擊「儲存變更」將設定儲存到 LocalStorage
- 點擊「退出編輯」返回預覽模式

## 設定結構 (Config v2)

```javascript
{
  elements: {
    heroTitle: {
      en: "METALMORPHOSIS",
      zh: "金屬蛻變",
      fontSize: 96,
      fontFamily: 'Syncopate',      // 英文字體
      fontFamilyZh: 'Noto Sans TC', // 中文字體
      color: "#00FF41",
      offsetX: 0,
      offsetY: 0,
      textEffect: 'chrometype'      // none|glow|chrometype|distort
    },
    // ... 其他元素類似結構
    ctaButton: {
      // ... 同上
      bgColor: "#FF00F5"            // 按鈕專用背景色
    }
  },
  layout: {
    mediaUrl: "https://...",
    isMediaVideo: false
  },
  artwork: {
    price: 0.85,
    edition: "01/50"
  }
}
```

## 部署說明

### GitHub Pages 設定
1. 進入 Repository Settings > Pages
2. Source 選擇 "Deploy from a branch"
3. Branch 選擇 `main`,資料夾選擇 `/ (root)`
4. 儲存後等待部署完成

### 網站網址
`https://zhenggdove-artist.github.io/ONEPAGE/`

## 文字特效說明

| 特效 | 說明 |
|------|------|
| none | 無特效,純色文字 |
| glow | 發光效果,文字周圍有光暈 |
| chrometype | 鉻合金漸層,上白中彩下黑的金屬質感 |
| distort | 傾斜扭曲效果 |

## 常見問題

### Q: 如何更改預設密碼?
A: 搜尋 `drawme` 並替換為新密碼

### Q: 設定儲存在哪裡?
A: 使用者的設定儲存在 LocalStorage 的 `acid_config_v2` 鍵值中

### Q: 如何重置所有設定?
A: 在瀏覽器開發者工具中執行 `localStorage.removeItem('acid_config_v2')` 後重新整理頁面

### Q: 如何新增更多可編輯元素?
A: 在 `DEFAULT_CONFIG.elements` 中新增元素定義,並在 JSX 中使用 `<EditableText>` 組件包裹

## 開發備註

### 核心組件
- `LiquidBackground` - 液態金屬背景動畫
- `FloatingToolbar` - 浮動編輯工具列
- `EditableText` - 可編輯文字元素包裝器
- `App` - 主應用程式

### 修改建議
- 如需修改網站,直接編輯 `/index.html`
- 所有 React 程式碼在 `<script type="text/babel">` 區塊中
- CSS 樣式在 `<style>` 區塊中

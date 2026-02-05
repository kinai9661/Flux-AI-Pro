# 影片生成模組 - 完整 UI 版本

## 概述

這是 Flux AI Pro 的完整影片生成模組，僅支援 Pollinations.ai 供應商。模組採用模組化架構設計，提供完整的 RESTful API 端點和精美的使用者介面。

## 架構

```
video/
├── config/
│   └── pollinations.config.js    # Pollinations 配置
├── core/
│   ├── video-service.js          # 影片服務核心
│   └── rate-limiter.js           # 限流器
├── providers/
│   └── pollinations-provider.js  # Pollinations 供應商
├── utils/
│   └── logger.js                 # 日日誌工具
├── api/
│   └── handlers.js               # API 處理器
├── ui/
│   ├── templates.js              # HTML 模板
│   ├── components.js             # UI 組件 JavaScript
│   └── page-generator.js         # 頁面生成器
└── index.js                      # 模組入口
```

## UI 介面

### 主頁面 (`/video`)

完整功能的影片生成介面，包含：

- **輸入區域**
  - 提示詞輸入框（多行文字）
  - 圖片上傳區域（支援拖曳上傳）
  - 模型選擇下拉選單（Flux Video、Turbo）
  - 尺寸選擇下拉選單（HD、Full HD、Square、Portrait）
  - FPS 調整滑桿（24-60）
  - 持續時間調整滑桿（3-10 秒）

- **配額顯示**
  - 剩餘配額數量
  - 冷卻時間倒數計時
  - 使用進度條

- **生成按鈕**
  - 生成按鈕（帶載入動畫）
  - 生成進度顯示
  - 取消生成按鈕

- **結果區域**
  - 影片預覽播放器
  - 下載按鈕
  - 分享按鈕
  - 重新生成按鈕

- **歷史記錄**
  - 最近 10 筆生成記錄
  - 縮圖預覽
  - 點擊重新載入

### Nano 版本 (`/video/nano`)

簡化版介面，適合手機瀏覽：

- 精簡的輸入表單
- 快速生成按鈕
- 基本結果顯示
- 下載和重新生成功能

## API 端點

| 端點 | 方法 | 說明 |
|------|------|------|
| `/api/video/generate` | POST | 生成影片 |
| `/api/video/models` | GET | 獲取模型列表 |
| `/api/video/styles` | GET | 獲取樣式列表 |
| `/api/video/sizes` | GET | 獲取尺寸列表 |
| `/api/video/quota` | GET | 獲取配額資訊 |
| `/api/video/config` | GET | 獲取完整配置 |

## 使用範例

### 生成影片（文字轉影片）

```bash
curl -X POST https://your-worker.workers.dev/api/video/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A beautiful sunset over mountains",
    "model": "flux-video",
    "width": 1280,
    "height": 720,
    "fps": 24,
    "duration": 5
  }'
```

### 生成影片（圖片轉影片）

```bash
curl -X POST https://your-worker.workers.dev/api/video/generate \
  -H "Content-Type: application/json" \
  -d '{
    "referenceImage": "https://example.com/image.jpg",
    "model": "flux-video",
    "duration": 5
  }'
```

### 獲取模型列表

```bash
curl https://your-worker.workers.dev/api/video/models
```

### 獲取配額資訊

```bash
curl https://your-worker.workers.dev/api/video/quota
```

## 限流配置

- **每小時限制**: 5 個影片
- **冷卻時間**: 180 秒
- **KV 命名空間**: `FLUX_KV`

## 環境變數

| 變數名稱 | 說明 |
|----------|------|
| `POLLINATIONS_VIDEO_API_KEY` | Pollinations 影片生成 API Key（可選） |

## 支援的模型

| 模型 ID | 名稱 | 說明 |
|---------|------|------|
| `flux-video` | Flux Video | 預設模型，高品質影片生成 |
| `turbo` | Turbo | 快速生成模式 |

## 支援的尺寸

| 比例 | 寬度 | 高度 | 標籤 |
|------|------|------|------|
| 16:9 | 1280 | 720 | HD (16:9) |
| 16:9 | 1920 | 1080 | Full HD (16:9) |
| 1:1 | 720 | 720 | 方形 (1:1) |
| 9:16 | 1080 | 1920 | 直向 (9:16) |

## UI 設計特色

- **深色漸變背景**：使用漸變色背景，營造現代感
- **毛玻璃效果**：面板使用 backdrop-filter 毛玻璃效果
- **響應式設計**：支援桌面和手機瀏覽
- **動畫過渡**：按鈕懸停、載入等動畫效果
- **載入狀態**：生成時顯示進度條和載入動畫
- **錯誤提示**：友好的錯誤訊息顯示

## 模組說明

### config/pollinations.config.js
Pollinations 供應商的配置文件，包含：
- API 端點設定
- 支援的模型列表
- 預設尺寸選項
- 限流設定
- 預設參數

### core/video-service.js
影片服務核心，提供：
- 影片生成服務
- 模型列表查詢
- 樣式列表查詢
- 尺寸列表查詢

### core/rate-limiter.js
限流器，提供：
- IP 限流功能
- 冷卻時間管理
- KV 存儲整合

### providers/pollinations-provider.js
Pollinations 供應商實作，提供：
- 文字轉影片功能
- 圖片轉影片功能
- API 請求處理
- 響應處理

### utils/logger.js
日誌工具，提供：
- 結構化日誌記錄
- 日誌輸出格式化

### api/handlers.js
API 處理器，提供：
- 請求路由
- 參數驗證
- 響應格式化
- 錯誤處理

### ui/templates.js
HTML 模板，包含：
- 主頁面 HTML 模板
- Nano 版本 HTML 模板
- 內嵌 CSS 樣式

### ui/components.js
UI 組件 JavaScript，包含：
- 狀態管理
- 事件監聽器
- API 呼叫
- DOM 操作
- 歷史記錄管理

### ui/page-generator.js
頁面生成器，提供：
- 主頁面生成函數
- Nano 版本生成函數
- 請求處理函數

### index.js
模組入口，導出：
- `handleVideoAPI` - API 處理函數
- `VideoPageGenerator` - 頁面生成器類
- `videoPageGenerator` - 頁面生成器實例
- `VideoService` - 影片服務類
- `VideoRateLimiter` - 限流器類
- `PollinationsProvider` - Pollinations 供應商類

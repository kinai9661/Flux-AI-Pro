# 🎨 Flux AI Pro - NanoBanana Edition

![Version](https://img.shields.io/badge/Version-11.12.0-8B5CF6?style=flat-square)
![Platform](https://img.shields.io/badge/Platform-Cloudflare%20Workers-orange?style=flat-square)
![Engine](https://img.shields.io/badge/Engine-Multi%20Provider-blue?style=flat-square)
![I18N](https://img.shields.io/badge/I18N-5%20Languages-green?style=flat-square)
![Video](https://img.shields.io/badge/Video-Generation-red?style=flat-square)

**Flux AI Pro - NanoBanana Edition** is a high-performance, single-file AI image and video generation solution built on Cloudflare Workers. It integrates top-tier AI providers like Pollinations.ai, Infip/Ghostbot, and Aqua Server to deliver a serverless, lightning-fast, and feature-rich creative experience.

---

## 🌍 English Introduction

**Flux AI Pro** is designed for creators who demand speed, quality, and flexibility. By leveraging the power of Cloudflare's edge network, it provides a seamless interface for generating high-quality AI art without the need for complex server setups.

### 🚀 Key Features
- **Dual Interface Design**:
  - **Professional UI**: Full control over parameters like Steps, Guidance, and Seed.
  - **NanoBanana Pro**: A streamlined, mobile-friendly "one-click" generation experience.
- **Video Generation**:
  - **Text-to-Video**: Generate videos from text prompts using Pollinations.ai.
  - **Image-to-Video**: Transform static images into dynamic videos.
  - **Single Provider**: Pollinations.ai with Flux Video and Turbo models.
- **Multi-Provider Architecture**: Seamlessly switch between Pollinations.ai (Free), Infip/Ghostbot (Pro), and Aqua Server.
- **Global Language Support**: Native support for **English, Traditional Chinese, Japanese, Korean, and Arabic**.
- **Smart Language Detection**: Automatically follows your system/browser language settings.
- **Full RTL Support**: Specialized layout and text direction for Right-to-Left languages (Arabic).
- **AI Prompt Generator**: Powered by Google Gemini 3 Flash to turn simple ideas into professional prompts.
- **Ultra HD by Default**: Built-in optimization strategies to ensure every image is generated at maximum quality.
- **Permanent Local History**: Uses IndexedDB to store your creations locally with export/import capabilities.

---

## 🔥 v11.12.0 更新亮點 (Release Highlights)

- **🎬 完整影片生成 UI**：提供完整的影片生成使用者介面，包含主頁面和 Nano 版本。
- **🤖 單一供應商**：整合 Pollinations.ai 影片生成 API。
- **🎯 模型選擇器**：提供 Flux Video 和 Turbo 兩種影片模型。
- **📐 多種解析度**：支援 4 種預設影片尺寸 (16:9、9:16、1:1、Full HD)。
- **📊 API 端點**：提供完整的 RESTful API 端點供外部呼叫。
- **🌍 多語言支援**：影片生成介面完整支援繁體中文、英文、日文、韓文、阿拉伯語。
- **💾 本地歷史記錄**：使用 LocalStorage 儲存影片生成歷史，點擊可重新載入。
- **🎨 精美 UI 設計**：深色漸變背景、毛玻璃效果、響應式設計。

### v11.11.0 更新亮點

- **⚡ 非同步模型生成優化**：大幅改進 Aqua Provider 的輪詢機制，提升穩定性和可靠性。
- **🕐 延長超時時間**：輪詢超時從 120 秒延長至 300 秒 (5 分鐘)，適應高解析度或複雜提示詞的生成需求。
- **📈 指數退避策略**：實現動態輪詢間隔，從固定 2 秒改為 2-10 秒動態增長，減少不必要的 API 請求。
- **🛡️ 增強錯誤處理**：
  - **Rate Limit (429)**：讀取 `Retry-After` 標頭，使用伺服器建議的等待時間。
  - **伺服器錯誤 (5xx)**：使用指數退避，最多連續 5 次錯誤後放棄。
  - **網路錯誤**：自動檢測並重試，避免因暫時性網路問題失敗。
- **📊 進度回報**：每 10 次輪詢報告一次進度百分比，狀態變化時立即報告，顯示已耗費時間。
- **📝 詳細日誌**：記錄連續錯誤次數、退避等待時間、完成時顯示總嘗試次數和總時間。

### v11.9.0 更新亮點

- **🔄 Aqua Polling Models**：新增 Aqua API 輪詢模型支援，包含 `imagen4` (Google Imagen 4) 和 `nanobanana` (Img2Img)。
- **📸 Img2Img 支援**：nanobanana 模型支援圖片轉圖片功能，可上傳參考圖片進行生成。
- **🎯 動態 UI 顯示**：參考圖片區塊根據模型能力自動顯示或隱藏，提供更直觀的使用體驗。
- **⚡ 輪詢機制優化**：實現智能輪詢系統，自動追蹤任務狀態 (pending → processing → completed/failed)。
- **📊 供應商使用統計追蹤**：新增 API 供應商使用比例追蹤功能，自動記錄各供應商的使用次數與比例。
- **🔄 實時統計數據**：透過 `/api/provider-stats` 端點獲取詳細的供應商使用統計，包含總生成次數與各供應商使用比例。
- **💾 KV 持久化存儲**：統計數據自動存儲在 KV 中，30天後自動過期，確保數據持久性。
- **🌍 多語言支援**：供應商統計介面支援繁體中文、英文、日文、韓文、阿拉伯語。
- **🎨 Aqua Server 供應商**：新增 Aqua Server 作為第三個 API 供應商選項。
- **📡 Health 端點增強**：`/health` 端點現在包含完整的供應商統計信息。

---

## ✨ 核心功能特色

### 1. 雙重操作介面 (Dual UI)
*   **專業版主介面 (`/`)**：提供完整的參數控制，適合需要精細調整的專業創作者。
*   **NanoBanana Pro (`/nano`)**：極簡設計，內建每小時 5 張的免費配額與能量回充系統，適合快速獲取靈感。

### 2. 影片生成功能 (Video Generation)
*   **完整 UI 介面**：
   - **主頁面 (`/video`)**：功能完整的影片生成介面，包含提示詞輸入、圖片上傳、模型選擇、尺寸調整、FPS 調整、持續時間調整。
   - **Nano 版本 (`/video/nano`)**：簡化版介面，適合手機瀏覽。
*   **單一供應商支援**：
   - **Pollinations.ai**：免費影片生成，支援 Flux Video 和 Turbo 模型。
*   **模型選擇**：2 種影片模型 - Flux Video (高品質) 和 Turbo (快速生成)。
*   **多種解析度**：4 種預設影片尺寸 - 16:9 (1280x720)、Full HD (1920x1080)、1:1 (720x720)、9:16 (1080x1920)。
*   **圖片上傳**：支援拖曳上傳參考圖片，實現圖片轉影片功能。
*   **配額顯示**：即時顯示剩餘配額和冷卻時間。
*   **歷史記錄**：最近 10 筆生成記錄，點擊可重新載入影片。
*   **API 端點**：提供完整的 RESTful API 端點供外部呼叫。
*   **限流機制**：每小時每 IP 5 個影片免費配額，180 秒生成冷卻。

### 3. 智慧語言管理 (Smart I18N)
*   **自動偵測**：根據 `navigator.language` 自動切換，並記憶用戶的手動選擇。
*   **RTL 支援**：阿拉伯語模式下，介面元素自動鏡像翻轉，符合母語用戶習慣。

### 4. 多供應商模型庫 (Multi-Model Library)
*   **Pollinations.ai**：提供 `Kontext`、`NanoBanana` (Nano Pro 專用)、`SeeDream`、`Flux Schnell`、`Z-Image`、`FLUX.2 Klein`、`FLUX.2 Klein 9B` 等免費高品質模型。
*   **Infip/Ghostbot**：支援 Google `Imagen 4` 與 `Flux Schnell`，具備更強的併發處理能力。
*   **Aqua Server**：提供 `Flux 2`、`Z-Image`、`Imagen 4` (輪詢模式)、`NanoBanana` (Img2Img 輪詢模式) 等高品質模型。
*   **輪詢模型支援**：imagen4 和 nanobanana 採用輪詢機制，確保大型模型生成的穩定性。
*   **Img2Img 功能**：nanobanana 模型支援參考圖片上傳，實現圖片轉圖片生成。
*   **供應商統計追蹤**：自動追蹤各供應商的使用次數與比例，透過 API 端點查詢。

### 5. 性能與優化 (Performance)
*   **懶加載技術**：利用 IntersectionObserver 優化圖片加載速度。
*   **請求隊列**：智慧管理併發請求，避免瀏覽器卡頓。
*   **自動翻譯**：內建 Google 翻譯接口，支援中文提示詞自動轉英文。
*   **實時生成時間追生成時間追生成時間追蹤**：顯示圖片生成的實時進度與最終耗時，提供透明的性能反饋。

---

## 🛠️ 快速部署 (Quick Deployment)

1.  **複製專案**：
    ```bash
    git clone https://github.com/kinai9661/Flux-AI-Pro.git
    ```
2.  **配置 `wrangler.toml`**：
    ```toml
    name = "flux-ai-pro"
    main = "worker.js"
    [[kv_namespaces]]
    binding = "FLUX_KV"
    id = "你的_KV_ID"
    ```
3.  **設定 Secrets**：
    ```bash
    wrangler secret put POLLINATIONS_API_KEY
    wrangler secret put INFIP_API_KEY
    wrangler secret put AQUA_API_KEY
    wrangler secret put GEMINI_API_KEY
    # 影片生成 API Key (可選)
    wrangler secret put POLLINATIONS_VIDEO_API_KEY
    ```
4.  **部署**：
    ```bash
    wrangler deploy
    ```

## 🎬 影片生成 API 端點

### 環境變數 API Key 配置

影片生成功能支援透過環境變數配置 API Key，這樣可以避免在前端暴露敏感的 API Key。當環境變數配置後，前端會自動隱藏 API Key 輸入框。

**設置環境變數：**

```bash
# Pollinations 影片生成 API Key（可選）
wrangler secret put POLLINATIONS_VIDEO_API_KEY
```

**API Key 優先順序：**
1. 環境變數中的 API Key（優先使用）
2. 前端輸入的 API Key（備用）

### 生成影片
```
POST /api/video/generate
Content-Type: application/json

{
  "prompt": "A beautiful sunset over mountains",
  "model": "seedance",
  "width": 1280,
  "height": 720,
  "fps": 24,
  "duration": 5,
  "referenceImage": "https://example.com/image.jpg",  // 可選，用於圖片轉影片
  "apiKey": "YOUR_API_KEY"  // 可選，如果環境變數已配置則不需要
}
```

### 支援的影片模型

| 供應商 | 模型 | 類型 | 費用 | 說明 |
|--------|------|------|------|------|
| Pollinations.ai | seedance | 文字/圖片轉影片 | 0.0000018/token | BytePlus 模型，預設選項 (2-10秒) |
| Pollinations.ai | seedance-pro | 文字/圖片轉影片 | 0.000001/token | BytePlus 進階版，更好的提示詞遵循 (2-10秒) |
| Pollinations.ai | wan | 圖片轉影片（含音訊） | 0.025 Pollen/sec | 圖片轉影片含音訊 (2-15秒，最高 1080P) |

### 支援的影片尺寸

| 比例 | 寬度 | 高度 | 標籤 |
|------|------|------|------|
| 16:9 | 1280 | 720 | HD (16:9) |
| 16:9 | 1920 | 1080 | Full HD (16:9) |
| 1:1 | 720 | 720 | 方形 (1:1) |
| 9:16 | 1080 | 1920 | 直向 (9:16) |

---

## 📊 限流與冷卻 (Rate Limiting)

*   **Nano 模式**：每小時 5 張免費配額，180 秒生成冷卻。
*   **影片生成**：每小時每 IP 5 個影片免費配額，180 秒生成冷卻。
*   **主介面**：根據供應商不同，設有 30-60 秒的智慧冷卻保護。

### 影片生成 API 端點

*   `POST /api/video/generate` - 生成影片
*   `GET /api/video/models` - 獲取可用模型列表
*   `GET /api/video/styles` - 獲取樣式列表
*   `GET /api/video/sizes` - 獲取尺寸列表
*   `GET /api/video/quota` - 獲取配額資訊
*   `GET /api/video/config` - 獲取完整配置

---

## 🤝 合作與致謝 (Credits)

- [Pollinations.ai](https://pollinations.ai) - Free AI Image & Video API
- [Infip.pro](https://infip.pro) - Ghostbot Web API
- [Aqua Server](https://aqua.server) - AI Generation Server
- [ShowMeBest.AI](https://showmebest.ai) - AI Tool Directory
- [Cloudflare Workers](https://workers.cloudflare.com) - Serverless Platform

---

## 📄 授權協議 (License)

MIT License. 歡迎 Fork 與二次開發。

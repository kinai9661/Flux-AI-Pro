# 🎨 Flux AI Pro - NanoBanana Edition

![Version](https://img.shields.io/badge/Version-11.12.0-8B5CF6?style=flat-square)
![Platform](https://img.shields.io/badge/Platform-Cloudflare%20Workers-orange?style=flat-square)
![Engine](https://img.shields.io/badge/Engine-Multi%20Provider-blue?style=flat-square)
![I18N](https://img.shields.io/badge/I18N-5%20Languages-green?style=flat-square)
![Video](https://img.shields.io/badge/Video-Generation-red?style=flat-square)

**Flux AI Pro - NanoBanana Edition** is a high-performance, single-file AI image and video generation solution built on Cloudflare Workers. It integrates top-tier AI providers like Pollinations.ai, Infip/Ghostbot, Aqua Server, Runway, Pika, Luma, and Kling to deliver a serverless, lightning-fast, and feature-rich creative experience.

---

## 🌍 English Introduction

**Flux AI Pro** is designed for creators who demand speed, quality, and flexibility. By leveraging the power of Cloudflare's edge network, it provides a seamless interface for generating high-quality AI art without the need for complex server setups.

### 🚀 Key Features
- **Dual Interface Design**:
  - **Professional UI**: Full control over parameters like Steps, Guidance, and Seed.
  - **NanoBanana Pro**: A streamlined, mobile-friendly "one-click" generation experience.
- **Video Generation**:
  - **Text-to-Video**: Generate videos from text prompts using multiple AI models.
  - **Image-to-Video**: Transform static images into dynamic videos.
  - **Multiple Providers**: Pollinations.ai, Runway, Pika, Luma, and Kling.
  - **Model Selection**: Choose from 12+ video models across different providers.
- **Multi-Provider Architecture**: Seamlessly switch between Pollinations.ai (Free), Infip/Ghostbot (Pro), Aqua Server, Runway, Pika, Luma, and Kling.
- **Global Language Support**: Native support for **English, Traditional Chinese, Japanese, Korean, and Arabic**.
- **Smart Language Detection**: Automatically follows your system/browser language settings.
- **Full RTL Support**: Specialized layout and text direction for Right-to-Left languages (Arabic).
- **AI Prompt Generator**: Powered by Google Gemini 3 Flash to turn simple ideas into professional prompts.
- **Ultra HD by Default**: Built-in optimization strategies to ensure every image is generated at maximum quality.
- **Permanent Local History**: Uses IndexedDB to store your creations locally with export/import capabilities.

---

## 🔥 v11.12.0 更新亮點 (Release Highlights)

- **🎬 影片生成功能**：全新影片生成模組，支援文字轉影片和圖片轉影片。
- **🤖 多供應商支援**：整合 Pollinations.ai、Runway、Pika、Luma、Kling 五大影片生成供應商。
- **🎯 模型選擇器**：提供 12+ 種影片模型選擇，包含 Stable Video Diffusion、AnimateDiff、ZeroScope、ModelScope、CogVideoX 等。
- **📐 多種解析度**：支援 7 種預設影片尺寸，從 256x256 到 1024x1024。
- **🎨 風格預設**：內建 8 種影片風格預設，包含電影感、動漫、3D 動畫、水彩等。
- **📊 獨立頁面**：提供 `/video` 和 `/video/nano` 兩個獨立影片生成頁面。
- **🌍 多語言支援**：影片生成介面完整支援繁體中文、英文、日文、韓文、阿拉伯語。
- **💾 本地歷史記錄**：使用 LocalStorage 儲存影片生成歷史，支援匯出/匯入功能。

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
*   **專業版影片頁面 (`/video`)**：完整的影片生成介面，支援文字轉影片和圖片轉影片。
*   **Nano 影片頁面 (`/video/nano`)**：簡化版影片生成介面，適合快速生成。
*   **多供應商支援**：
  - **Pollinations.ai**：免費影片生成，支援 SVD、SVD XT、AnimateDiff 模型。
  - **Runway**：專業級影片生成，支援 Gen-2 模型。
  - **Pika**：高品質影片生成，支援 Pika-1.0 模型。
  - **Luma**：先進影片生成，支援 Dream Machine 模型。
  - **Kling**：中文優化影片生成，支援 Kling-1.0 模型。
*   **模型選擇**：12+ 種影片模型，包含 Stable Video Diffusion、AnimateDiff、ZeroScope、ModelScope、CogVideoX 等。
*   **風格預設**：8 種影片風格預設，包含電影感、動漫、3D 動畫、水彩、油畫、素描、像素藝術、賽博龐克。
*   **多種解析度**：7 種預設影片尺寸，從 256x256 到 1024x1024。
*   **本地歷史記錄**：使用 LocalStorage 儲存影片生成歷史，支援匯出/匯入功能。

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
    # 影片生成 API Keys (可選)
    wrangler secret put RUNWAY_API_KEY
    wrangler secret put PIKA_API_KEY
    wrangler secret put LUMA_API_KEY
    wrangler secret put KLING_API_KEY
    ```
4.  **部署**：
    ```bash
    wrangler deploy
    ```

## 🎬 影片生成 API 端點

### 生成影片
```
POST /api/video/generate
Content-Type: application/json

{
  "prompt": "A beautiful sunset over mountains",
  "provider": "pollinations",
  "model": "svd",
  "width": 512,
  "height": 512,
  "fps": 8,
  "style": "cinematic",
  "referenceImage": "https://example.com/image.jpg"  // 可選，用於圖片轉影片
}
```

### 支援的影片模型

| 供應商 | 模型 | 類型 | 說明 |
|--------|------|------|------|
| Pollinations.ai | svd | 文字轉影片 | Stable Video Diffusion 基礎模型 |
| Pollinations.ai | svd-xt | 文字轉影片 | SVD XT 增強版本 |
| Pollinations.ai | animatediff | 文字轉影片 | AnimateDiff 動畫模型 |
| Runway | gen-2 | 文字/圖片轉影片 | Runway Gen-2 專業模型 |
| Pika | pika-1.0 | 文字/圖片轉影片 | Pika 1.0 高品質模型 |
| Luma | dream-machine | 文字/圖片轉影片 | Luma Dream Machine |
| Kling | kling-1.0 | 文字/圖片轉影片 | Kling 1.0 中文優化 |

---

## 📊 限流與冷卻 (Rate Limiting)

*   **Nano 模式**：每小時 5 張免費配額，180 秒生成冷卻。
*   **影片生成**：每小時每 IP 5 個影片免費配額，180 秒生成冷卻。
*   **主介面**：根據供應商不同，設有 30-60 秒的智慧冷卻保護。

### 影片生成 API 端點

*   `POST /api/video/generate` - 生成影片
*   `GET /api/video/models` - 獲取可用模型列表
*   `GET /api/video/styles` - 獲取風格預設
*   `GET /api/video/sizes` - 獲取尺寸預設
*   `GET /api/video/status` - 檢查配額和冷卻狀態

---

## 🤝 合作與致謝 (Credits)

- [Pollinations.ai](https://pollinations.ai) - Free AI Image & Video API
- [Infip.pro](https://infip.pro) - Ghostbot Web API
- [Aqua Server](https://aqua.server) - AI Generation Server
- [Runway](https://runwayml.com) - Professional Video Generation
- [Pika Labs](https://pika.art) - High-Quality Video Generation
- [Luma AI](https://luma.ai) - Advanced Video Generation
- [Kling AI](https://klingai.com) - Chinese-Optimized Video Generation
- [ShowMeBest.AI](https://showmebest.ai) - AI Tool Directory
- [Cloudflare Workers](https://workers.cloudflare.com) - Serverless Platform

---

## 📄 授權協議 (License)

MIT License. 歡迎 Fork 與二次開發。

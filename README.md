# 🎨 Flux AI Pro - NanoBanana Edition

![Version](https://img.shields.io/badge/Version-11.7.0-8B5CF6?style=flat-square)
![Platform](https://img.shields.io/badge/Platform-Cloudflare%20Workers-orange?style=flat-square)
![Engine](https://img.shields.io/badge/Engine-Multi%20Provider-blue?style=flat-square)
![I18N](https://img.shields.io/badge/I18N-5%20Languages-green?style=flat-square)

**Flux AI Pro - NanoBanana Edition** is a high-performance, single-file AI image generation solution built on Cloudflare Workers. It integrates top-tier AI providers like Pollinations.ai and Infip/Ghostbot to deliver a serverless, lightning-fast, and feature-rich creative experience.

---

## 🌍 English Introduction

**Flux AI Pro** is designed for creators who demand speed, quality, and flexibility. By leveraging the power of Cloudflare's edge network, it provides a seamless interface for generating high-quality AI art without the need for complex server setups.

### 🚀 Key Features
- **Dual Interface Design**: 
  - **Professional UI**: Full control over parameters like Steps, Guidance, and Seed.
  - **NanoBanana Pro**: A streamlined, mobile-friendly "one-click" generation experience.
- **Multi-Provider Architecture**: Seamlessly switch between Pollinations.ai (Free) and Infip/Ghostbot (Pro).
- **Global Language Support**: Native support for **English, Traditional Chinese, Japanese, Korean, and Arabic**.
- **Smart Language Detection**: Automatically follows your system/browser language settings.
- **Full RTL Support**: Specialized layout and text direction for Right-to-Left languages (Arabic).
- **AI Prompt Generator**: Powered by Google Gemini 3 Flash to turn simple ideas into professional prompts.
- **Ultra HD by Default**: Built-in optimization strategies to ensure every image is generated at maximum quality.
- **Permanent Local History**: Uses IndexedDB to store your creations locally with export/import capabilities.

---

## 🔥 v11.7.0 更新亮點 (Release Highlights)

- **🌍 全球化多語言支援**：新增日文、韓文、阿拉伯語，總計支援 5 種主流語言。
- **🌐 智慧語言偵測**：系統自動識別瀏覽器語系並切換介面，實現零門檻使用。
- **🔄 完美 RTL 佈局**：針對阿拉伯語進行深度優化，支援從右到左 (Right-to-Left) 的完整視覺佈局。
- **🤖 專業提示詞生成器**：整合 Google Gemini 3 Flash，支援文字與圖片分析，自動生成高品質提示詞。
- **🌌 深空紫玻璃擬態 UI**：主介面全面升級為現代感十足的 Glassmorphism 設計。
- **✨ 全域 Ultra HD 優化**：實裝「最佳品質優先」策略，自動提升生成細節與解析度。
- **💾 IndexedDB 永久存儲**：歷史記錄不再隨頁面重新整理消失，支援本地永久保存與數據導出。
- **🔞 NSFW 模式切換**：針對特定供應商提供內容過濾開關（需自備 API Key）。

---

## ✨ 核心功能特色

### 1. 雙重操作介面 (Dual UI)
*   **專業版主介面 (`/`)**：提供完整的參數控制，適合需要精細調整的專業創作者。
*   **NanoBanana Pro (`/nano`)**：極簡設計，內建每小時 5 張的免費配額與能量回充系統，適合快速獲取靈感。

### 2. 智慧語言管理 (Smart I18N)
*   **自動偵測**：根據 `navigator.language` 自動切換，並記憶用戶的手動選擇。
*   **RTL 支援**：阿拉伯語模式下，介面元素自動鏡像翻轉，符合母語用戶習慣。

### 3. 多供應商模型庫 (Multi-Model Library)
*   **Pollinations.ai**：提供 `FLUX.2 Klein`、`Flux Pro`、`Turbo` 等多種免費高品質模型。
*   **Infip/Ghostbot**：支援 Google `Imagen 4` 與 `Flux Schnell`，具備更強的併發處理能力。

### 4. 性能與優化 (Performance)
*   **懶加載技術**：利用 IntersectionObserver 優化圖片加載速度。
*   **請求隊列**：智慧管理併發請求，避免瀏覽器卡頓。
*   **自動翻譯**：內建 Google 翻譯接口，支援中文提示詞自動轉英文。

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
    wrangler secret put GEMINI_API_KEY
    ```
4.  **部署**：
    ```bash
    wrangler deploy
    ```

---

## 📊 限流與冷卻 (Rate Limiting)

*   **Nano 模式**：每小時 5 張免費配額，180 秒生成冷卻。
*   **主介面**：根據供應商不同，設有 30-60 秒的智慧冷卻保護。

---

## 🤝 合作與致謝 (Credits)

- [Pollinations.ai](https://pollinations.ai) - Free AI Image API
- [Infip.pro](https://infip.pro) - Ghostbot Web API
- [ShowMeBest.AI](https://showmebest.ai) - AI Tool Directory
- [Cloudflare Workers](https://workers.cloudflare.com) - Serverless Platform

---

## 📄 授權協議 (License)

MIT License. 歡迎 Fork 與二次開發。

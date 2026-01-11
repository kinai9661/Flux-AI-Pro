# 🎨 Flux AI Pro - Serverless AI Image Generator

![Version](https://img.shields.io/badge/Version-10.6.3-FACC15?style=flat-square)
![Platform](https://img.shields.io/badge/Platform-Cloudflare%20Workers-orange?style=flat-square)
![Engine](https://img.shields.io/badge/Engine-Pollinations.ai%20(Direct)-blue?style=flat-square)

**Flux AI Pro** 是一個部署在 Cloudflare Workers 上的單檔式 AI 繪圖應用。它利用 Pollinations.ai 的最新 Direct API 提供無伺服器、低延遲的圖像生成服務。

本專案包含兩套獨立介面：**完整專業版 UI** 與 **NanoBanana Pro 極簡版 UI**。

---

## 🔥 v10.6.3 更新亮點 (NanoBanana Edition)

- **🚀 核心升級**：全面改用 `gen.pollinations.ai` 直連 API，支援 API Key 認證，提升穩定度與隱私。
- **🍌 Nano 模式**：新增 `/nano` 獨立入口，專為 `nanobanana-pro` 模型設計的極簡介面。
- **🛡️ 智能限流**：整合 Cloudflare KV，實現基於 IP 的速率限制（預設每小時 5 張），防止濫用。
- **🧠 智能優化**：
  - **自動翻譯**：內建 Google Translate 邏輯，自動將中文提示詞轉為英文。
  - **參數調優**：根據提示詞複雜度自動調整 Steps 與 Guidance Scale。
  - **HD Upscale**：自動檢測並優化高解析度輸出的細節與尺寸。

---

## ✨ 功能特色

### 1. 雙重操作介面
- **主介面 (`/`)**：功能完整的控制台，支援所有模型、數十種藝術風格、歷史紀錄管理 (IndexedDB)、參數微調。
- **Nano 介面 (`/nano`)**：類似 App 的沉浸式體驗，包含燈箱效果、剩餘額度顯示、隨機靈感骰子。

### 2. 多模型支援
支援 Pollinations 生態系下的多種模型：
- **Flux Series**: `Flux Standard`, `Flux Turbo` (極速)
- **GPT Series**: `GPT-Image`, `GPT-Image Large` (高品質)
- **Special**: `Nano Banana Pro` (專屬模型), `Kontext` (支援圖生圖/參考圖)
- **Experimental**: `Z-Image Turbo`

### 3. 進階圖像處理
- **風格預設**：內建 40+ 種風格（動漫、寫實、油畫、賽博龐克、浮世繪等）。
- **參考圖 (Img2Img)**：支援輸入圖片 URL 進行參考生成（僅限特定模型如 Kontext）。
- **畫布比例**：預設多種社群媒體常用比例 (IG, 16:9, 桌布)。

---

## 🛠️ 部署教學 (Deployment)

本專案基於 Cloudflare Workers，無需購買伺服器。

### 前置要求
- Cloudflare 帳號
- Node.js 環境
- Wrangler CLI (`npm install -g wrangler`)

### 1. 下載專案
```bash
git clone https://github.com/kinai9661/Flux-AI-Pro.git
cd Flux-AI-Pro
```

### 2. 配置 Wrangler
編輯 `wrangler.toml`，確保包含 KV 綁定以啟用限流功能：

```toml
name = "flux-ai-pro"
main = "worker.js"
compatibility_date = "2024-01-01"

# 綁定 KV 用於 Nano 模式的限流記錄
[[kv_namespaces]]
binding = "FLUX_KV"
id = "你的_KV_NAMESPACE_ID"
```

> **如何獲取 KV ID？**
> 執行 `wrangler kv:namespace create "FLUX_KV"`，將輸出的 ID 填入上述設定。

### 3. 設定環境變數 (Secrets)
為了使用 Pollinations 的直連 API，建議設定 API Key（可選，但推薦）：

```bash
wrangler secret put POLLINATIONS_API_KEY
# 輸入你的 Pollinations API Key (若無可跳過，但可能受限)
```

### 4. 部署
```bash
wrangler deploy
```

---

## ⚙️ API 接口 (Internal)

Worker 暴露了一個內部的生成 API，供前端呼叫：

**Endpoint:** `POST /_internal/generate`

**Body:**
```json
{
  "prompt": "a cyberpunk cat",
  "model": "flux",
  "width": 1024,
  "height": 1024,
  "style": "anime",
  "auto_optimize": true
}
```

> **注意**：`nanobanana-pro` 模型僅允許來自 Nano 頁面的請求 (`X-Source: nano-page`) 且受 KV 限流控制。

---

## 📄 License
MIT License

// =================================================================================
//  項目: Flux AI Pro - NanoBanana Edition
//  版本: 11.12.0
//  更新: AI 圖像生成服務
// =================================================================================

// 導入風格適配器（僅在服務器端使用）
import { ServerStyleManager } from './utils/style-adapter.js';

// 初始化風格管理器
const styleManager = new ServerStyleManager();
const mergedStyles = styleManager.merge();

const CONFIG = {
  PROJECT_NAME: "Flux-AI-Pro",
  PROJECT_VERSION: "11.12.0",
  API_MASTER_KEY: "1",
  FETCH_TIMEOUT: 120000,
  MAX_RETRIES: 3,
  
  POLLINATIONS_AUTH: {
    enabled: true,
    token: "", 
    method: "header"
  },
  
  PRESET_SIZES: {
    "square-1k": { name: "方形 1024x1024", width: 1024, height: 1024 },
    "square-1.5k": { name: "方形 1536x1536", width: 1536, height: 1536 },
    "square-2k": { name: "方形 2048x2048", width: 2048, height: 2048 },
    "square-4k": { name: "方形 4096x4096 (4K)", width: 4096, height: 4096 },
    "portrait-9-16-hd": { name: "豎屏 9:16 HD", width: 1080, height: 1920 },
    "portrait-9-16-2k": { name: "豎屏 9:16 2K", width: 2160, height: 3840 },
    "portrait-9-16-4k": { name: "豎屏 9:16 4K", width: 4320, height: 7680 },
    "landscape-16-9-hd": { name: "橫屏 16:9 HD", width: 1920, height: 1080 },
    "landscape-16-9-2k": { name: "橫屏 16:9 2K", width: 3840, height: 2160 },
    "landscape-16-9-4k": { name: "橫屏 16:9 4K", width: 7680, height: 4320 },
    "instagram-square": { name: "Instagram 方形", width: 1080, height: 1080 },
    "wallpaper-fhd": { name: "桌布 Full HD", width: 1920, height: 1080 },
    "wallpaper-2k": { name: "桌布 2K", width: 2560, height: 1440 },
    "wallpaper-4k": { name: "桌布 4K", width: 3840, height: 2160 },
    "portrait-3-4": { name: "豎屏 3:4", width: 768, height: 1024 },
    "portrait-4-5": { name: "豎屏 4:5", width: 1080, height: 1350 },
    "landscape-4-3": { name: "橫屏 4:3", width: 1024, height: 768 },
    "landscape-3-2": { name: "橫屏 3:2", width: 1200, height: 800 },
    "cinematic-21-9": { name: "電影感 21:9", width: 1920, height: 822 },
    "cinematic-21-9-2k": { name: "電影感 21:9 2K", width: 3840, height: 1644 },
    "cinematic-21-9-4k": { name: "電影感 21:9 4K", width: 7680, height: 3288 }
  },
  
  PROVIDERS: {
    pollinations: {
      name: "Pollinations.ai",
      endpoint: "https://gen.pollinations.ai",
      pathPrefix: "/image",
      type: "direct",
      auth_mode: "required",
      requires_key: true,
      enabled: true,
      default: true,
      description: "官方 AI 圖像生成服務",
      features: {
        private_mode: true, custom_size: true, seed_control: true, negative_prompt: true, enhance: true, nologo: true, style_presets: true, auto_hd: true, quality_modes: true, auto_translate: true, reference_images: true, image_to_image: true, batch_generation: true, api_key_auth: true
      },
      models: [
        { id: "flux-2-dev", name: "Flux 2 Dev 🌟", confirmed: true, category: "flux", description: "Flux 2 開發者版本 - 高品質圖像生成", max_size: 2048, pricing: { image_price: 0.0005, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "imagen-4", name: "Imagen 4 (Google) 🌟", confirmed: true, category: "google", description: "Google 最新高品質繪圖模型", max_size: 2048, pricing: { image_price: 0.0004, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "nanobanana", name: "NanoBanana 🍌", confirmed: true, category: "flux", description: "NanoBanana 高品質模型", max_size: 2048, pricing: { image_price: 0.00012, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "seedream", name: "SeeDream 🌈", confirmed: true, category: "seedream", description: "夢幻般的圖像生成", max_size: 2048, pricing: { image_price: 0.0002, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "flux-schnell", name: "Flux Schnell ⚡", confirmed: true, category: "flux", description: "快速且高質量的圖像生成", max_size: 2048, pricing: { image_price: 0.00012, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "zimage", name: "Z-Image Turbo ⚡", confirmed: true, category: "zimage", description: "快速 6B 參數圖像生成 (Alpha)", max_size: 2048, pricing: { image_price: 0.0002, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "klein", name: "FLUX.2 Klein 4B", confirmed: true, category: "flux", description: "Advanced Flux 2 model", max_size: 2048, pricing: { image_price: 0.0003, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "klein-large", name: "FLUX.2 Klein 9B 🌟", confirmed: true, category: "flux", description: "Advanced Flux 2 Large model - 9B parameters", max_size: 2048, pricing: { image_price: 0.0004, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] }
      ],
      rate_limit: null,
      max_size: { width: 2048, height: 2048 }
    },
    infip: {
      name: "Ghostbot (Infip)",
      endpoint: "https://api.infip.pro",
      type: "openai_compatible",
      auth_mode: "bearer",
      requires_key: true,
      enabled: true,
      default: false,
      description: "Ghostbot Web API (High Limit)",
      features: {
        private_mode: true, custom_size: true, seed_control: false, negative_prompt: false, enhance: false, nologo: false, style_presets: true, auto_hd: true, quality_modes: false, auto_translate: true, reference_images: false, image_to_image: false, batch_generation: true, api_key_auth: true
      },
      models: [
        { id: "img4", name: "Imagen 4 (Google) 🌟", category: "google", description: "Google 最新高品質繪圖模型", max_size: 1792 },
        { id: "flux-schnell", name: "Flux Schnell ⚡", category: "flux", description: "Flux 極速版", max_size: 1024 },
        { id: "sdxl", name: "SDXL Stable Diffusion", category: "sd", description: "Stable Diffusion XL", max_size: 1024 },
        { id: "lucid-origin", name: "Lucid Origin", category: "other", description: "Lucid 風格模型", max_size: 1024 }
      ],
      rate_limit: { requests: 60, interval: 60 },
      max_size: { width: 1792, height: 1792 }
    },
    aqua: {
      name: "Aqua API",
      endpoint: "https://api.aquadevs.com",
      type: "openai_compatible",
      auth_mode: "bearer",
      requires_key: true,
      enabled: true,
      default: false,
      description: "AquaDevs Premium API (Polling Models: imagen-4, nanobanana)",
      features: {
        private_mode: true, custom_size: true, seed_control: false, negative_prompt: false, enhance: false, nologo: false, style_presets: true, auto_hd: true, quality_modes: false, auto_translate: true, reference_images: true, image_to_image: true, batch_generation: true, api_key_auth: true, polling_mode: true
      },
      models: [
        { id: "flux-2", name: "Flux 2 ⚡", category: "flux", description: "Flux 2 Generation", max_size: 1024, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "zimage", name: "Z-Image", category: "other", description: "Z-Image Model", max_size: 1024, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "nanobanana", name: "NanoBanana 🍌", category: "flux", description: "NanoBanana Img2Img Model (Polling)", max_size: 1024, supports_reference_images: true, max_reference_images: 1, input_modalities: ["text", "image"], output_modalities: ["image"], polling: true },
        { id: "imagen-4", name: "Imagen 4", category: "google", description: "Google Imagen 4 (Polling)", max_size: 1024, input_modalities: ["text"], output_modalities: ["image"], polling: true }
      ],
      rate_limit: { requests: 50, interval: 60 },
      max_size: { width: 2048, height: 2048 }
    },
    kinai: {
      name: "Kinai API",
      endpoint: "https://kinai.eu.cc/v1",
      type: "openai_compatible",
      auth_mode: "bearer",
      requires_key: true,
      enabled: true,
      default: false,
      description: "Kinai AI 圖像生成服務",
      features: {
        private_mode: true, custom_size: true, seed_control: false, negative_prompt: false, enhance: false, nologo: false, style_presets: true, auto_hd: true, quality_modes: false, auto_translate: true, reference_images: false, image_to_image: false, batch_generation: true, api_key_auth: true
      },
      models: [
        { id: "glm-image", name: "GLM Image 🎨", category: "glm", description: "智譜 GLM 圖像生成模型", max_size: 2048 }
      ],
      rate_limit: { requests: 60, interval: 60 },
      max_size: { width: 2048, height: 2048 }
    },
    airforce: {
      name: "Airforce API",
      endpoint: "https://api.airforce",
      type: "openai_compatible",
      auth_mode: "bearer",
      requires_key: true,
      enabled: true,
      default: false,
      description: "Airforce AI 圖像生成服務",
      features: {
        private_mode: true, custom_size: true, seed_control: false, negative_prompt: false, enhance: false, nologo: false, style_presets: true, auto_hd: true, quality_modes: false, auto_translate: true, reference_images: false, image_to_image: false, batch_generation: false, api_key_auth: true, nsfw: false
      },
      models: [
        { id: "plutogen-o1", name: "Plutogen O1 🌟", category: "plutogen", description: "Plutogen O1 高品質圖像生成模型", max_size: 2048 },
        { id: "z-image", name: "Z-Image ⚡", category: "zimage", description: "快速 6B 參數圖像生成", max_size: 2048 },
        { id: "imagen-4", name: "Imagen 4 (Google) 🌟", category: "google", description: "Google 最新高品質繪圖模型", max_size: 2048 },
        { id: "flux-2-pro", name: "Flux 2 Pro 🌟", category: "flux", description: "Flux 2 Pro 高品質模型", max_size: 2048 },
        { id: "flux-2-flex", name: "Flux 2 Flex ⚡", category: "flux", description: "Flux 2 Flex 靈活模型", max_size: 2048 },
        { id: "gpt-image-1.5", name: "GPT Image 1.5 🎨", category: "gpt", description: "GPT Image 1.5 圖像生成模型", max_size: 2048 },
        { id: "flux-2-klein-4b", name: "Flux 2 Klein 4B", category: "flux", description: "Advanced Flux 2 model - 4B parameters", max_size: 2048 },
        { id: "flux-2-klein-9b", name: "Flux 2 Klein 9B 🌟", category: "flux", description: "Advanced Flux 2 Large model - 9B parameters", max_size: 2048 },
        { id: "seedream-4.5", name: "SeeDream 4.5 🌈", category: "seedream", description: "夢幻般的圖像生成 v4.5", max_size: 2048 }
      ],
      rate_limit: { requests: 60, interval: 60 },
      max_size: { width: 2048, height: 2048 }
    },
    nonpon: {
      name: "Nonpon API",
      endpoint: "https://api-reverse-engineering.kines966176.workers.dev",
      type: "openai_compatible",
      auth_mode: "bearer",
      requires_key: true,
      enabled: true,
      default: false,
      description: "Nonpon AI 圖像生成服務",
      features: {
        private_mode: true, custom_size: true, seed_control: false, negative_prompt: false, enhance: false, nologo: false, style_presets: true, auto_hd: true, quality_modes: false, auto_translate: true, reference_images: false, image_to_image: false, batch_generation: true, api_key_auth: true
      },
      models: [
        { id: "gemini-3-pro-image-preview", name: "Gemini 3 Pro Image Preview 🌟", category: "gemini", description: "Gemini 3 Pro 圖像預覽模型 - 高品質圖像生成", max_size: 4096 }
      ],
      rate_limit: { requests: 60, interval: 60 },
      max_size: { width: 4096, height: 4096 }
    }
  },
  
  DEFAULT_PROVIDER: "pollinations",
  
  STYLE_PRESETS: mergedStyles.styles,
  STYLE_CATEGORIES: mergedStyles.categories,
  
  OPTIMIZATION_RULES: {
    MODEL_STEPS: {
      "flux-2-dev": { min: 30, optimal: 35, max: 60 },
      "imagen-4": { min: 25, optimal: 30, max: 50 },
      "nanobanana": { min: 25, optimal: 30, max: 50 },
      "seedream": { min: 25, optimal: 30, max: 50 },
      "flux-schnell": { min: 20, optimal: 25, max: 40 },
      "zimage": { min: 25, optimal: 30, max: 50 },
      "klein": { min: 25, optimal: 30, max: 50 },
      "klein-large": { min: 30, optimal: 35, max: 55 }
    },
    SIZE_MULTIPLIER: { small: { threshold: 512 * 512, multiplier: 0.8 }, medium: { threshold: 1024 * 1024, multiplier: 1.0 }, large: { threshold: 1536 * 1536, multiplier: 1.15 }, xlarge: { threshold: 2048 * 2048, multiplier: 1.3 } },
    STYLE_ADJUSTMENT: { "photorealistic": 1.1, "oil-painting": 1.05, "watercolor": 0.95, "sketch": 0.9, "manga": 1.0, "pixel-art": 0.85, "3d-render": 1.15, "default": 1.0 }
  },
  
  HD_OPTIMIZATION: {
    enabled: true,
    QUALITY_MODES: {
      economy: { name: "經濟模式", description: "快速出圖", min_resolution: 1024, max_resolution: 2048, steps_multiplier: 0.85, guidance_multiplier: 0.9, hd_level: "basic" },
      standard: { name: "標準模式", description: "平衡質量與速度", min_resolution: 1280, max_resolution: 2048, steps_multiplier: 1.15, guidance_multiplier: 1.05, hd_level: "enhanced" },
      ultra: { name: "超高清模式", description: "極致質量", min_resolution: 1536, max_resolution: 2048, steps_multiplier: 1.5, guidance_multiplier: 1.25, hd_level: "maximum", force_upscale: true }
    },
    HD_PROMPTS: { 
      basic: "high quality, detailed, sharp focus", 
      enhanced: "best quality, highly detailed, sharp focus, professional, 4k, 8k, hdr, aesthetic", 
      maximum: "masterpiece, best quality, ultra detailed, 8k uhd, high resolution, professional photography, perfect lighting, sharp focus, HDR, cinematic lighting, hyperrealistic, award winning, intricate details, 32k" 
    },
    HD_NEGATIVE: "blurry, low quality, distorted, ugly, bad anatomy, low resolution, pixelated, artifacts, noise, jpeg artifacts, watermark, text, signature, mutation, deformed, extra limbs, extra fingers, bad hands, bad feet, poor composition, out of frame, worst quality, normal quality, error, missing fingers, extra digit, fewer digits, cropped",
    MODEL_QUALITY_PROFILES: {
      "flux-2-dev": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.25, guidance_boost: 1.2, recommended_quality: "ultra" },
      "imagen-4": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.15, guidance_boost: 1.1, recommended_quality: "ultra" },
      "nanobanana": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.15, guidance_boost: 1.1, recommended_quality: "ultra" },
      "seedream": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.15, guidance_boost: 1.1, recommended_quality: "ultra" },
      "flux-schnell": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.0, guidance_boost: 1.0, recommended_quality: "standard" },
      "zimage": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.15, guidance_boost: 1.1, recommended_quality: "ultra" },
      "klein": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.15, guidance_boost: 1.1, recommended_quality: "ultra" },
      "klein-large": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.2, guidance_boost: 1.15, recommended_quality: "ultra" }
    }
  }
};

class Logger {
  constructor() { this.logs = []; }
  add(title, data) { this.logs.push({ title, data, timestamp: new Date().toISOString() }); }
  get() { return this.logs; }
}

// ====== RateLimiter: 負責 KV 限制邏輯 (3次/分鐘) ======
class RateLimiter {
  constructor(env) {
    this.env = env;
    this.KV = env.FLUX_KV;
  }
  async checkLimit(ip) {
    if (!this.KV) {
      console.warn("65c2232e78044e749adb797599cb6ac8");
      return { allowed: true };
    }
    const key = `nano_limit:${ip}`;
    const windowSize = 60 * 1000; // 1分鐘 (毫秒)
    const maxRequests = 3;
    try {
      const rawData = await this.KV.get(key);
      let timestamps = rawData ? JSON.parse(rawData) : [];
      const now = Date.now();
      timestamps = timestamps.filter(ts => now - ts < windowSize);
      if (timestamps.length >= maxRequests) {
        const oldest = timestamps[0];
        const resetTime = oldest + windowSize;
        const waitSec = Math.ceil((resetTime - now) / 1000);
        return { allowed: false, reason: `🍌 請求過於頻繁！請等待 ${waitSec} 秒後再試。`, remaining: 0 };
      }
      timestamps.push(now);
      await this.KV.put(key, JSON.stringify(timestamps), { expirationTtl: 60 });
      return { allowed: true, remaining: maxRequests - timestamps.length };
    } catch (err) {
      console.error("KV Error:", err);
      return { allowed: true };
    }
  }
}

function getClientIP(request) {
  return request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
}

function corsHeaders(extra = {}) {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Worker-Version, X-Source',
    'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob: ws: wss:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://waust.at https://*.whos.amung.us https:;",
    ...extra
  };
}

async function translateToEnglish(text, env) {
  try {
    const hasChinese = /[\u4e00-\u9fa5\u3400-\u4db5\u20000-\u2a6d6]/.test(text);
    if (!hasChinese) return { text: text, translated: false, reason: "No Chinese detected" };
    const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=" + encodeURIComponent(text);
    const response = await fetch(url, { method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } });
    if (!response.ok) throw new Error(`Google API HTTP ${response.status}`);
    const data = await response.json();
    let translatedText = "";
    if (data && data[0] && Array.isArray(data[0])) { data[0].forEach(segment => { if (segment && segment[0]) translatedText += segment[0]; }); }
    if (!translatedText) throw new Error("Empty translation result");
    console.log(`✅ [Google GTX] Translated: "${text.substring(0,10)}..." -> "${translatedText.substring(0,10)}..."`);
    return { text: translatedText.trim(), translated: true, original: text, model: "google-gtx-free" };
  } catch (error) {
    console.error("❌ Translate Error:", error.message);
    return { text: text, translated: false, error: error.message };
  }
}

class PromptAnalyzer {
  static analyzeComplexity(prompt) {
    const complexKeywords = ['detailed', 'intricate', 'complex', 'elaborate', 'realistic', 'photorealistic', 'hyperrealistic', 'architecture', 'cityscape', 'landscape', 'portrait', 'face', 'eyes', 'hair', 'texture', 'material', 'fabric', 'skin', 'lighting', 'shadows', 'reflections', 'fine details', 'high detail', 'ultra detailed', '4k', '8k', 'uhd', 'hdr'];
    let score = 0;
    const lowerPrompt = prompt.toLowerCase();
    complexKeywords.forEach(keyword => { if (lowerPrompt.includes(keyword)) score += 0.1; });
    if (prompt.length > 100) score += 0.2;
    if (prompt.length > 200) score += 0.3;
    if (prompt.split(',').length > 5) score += 0.15;
    return Math.min(score, 1.0);
  }
  static recommendQualityMode(prompt, model) {
    const complexity = this.analyzeComplexity(prompt);
    const profile = CONFIG.HD_OPTIMIZATION.MODEL_QUALITY_PROFILES[model];
    if (profile?.recommended_quality) return profile.recommended_quality;
    if (complexity > 0.7) return 'ultra';
    if (complexity > 0.4) return 'standard';
    return 'economy';
  }
}

class HDOptimizer {
  static optimize(prompt, negativePrompt, model, width, height, qualityMode = 'standard', autoHD = true) {
    if (!autoHD || !CONFIG.HD_OPTIMIZATION.enabled) return { prompt, negativePrompt, width, height, optimized: false };
    const hdConfig = CONFIG.HD_OPTIMIZATION;
    const modeConfig = hdConfig.QUALITY_MODES[qualityMode] || hdConfig.QUALITY_MODES.standard;
    const profile = hdConfig.MODEL_QUALITY_PROFILES[model];
    const optimizations = [];
    const hdLevel = modeConfig.hd_level;
    let enhancedPrompt = prompt;
    if (hdConfig.HD_PROMPTS[hdLevel]) { enhancedPrompt = prompt + ", " + hdConfig.HD_PROMPTS[hdLevel]; optimizations.push("HD增強: " + hdLevel); }
    let enhancedNegative = negativePrompt || "";
    if (qualityMode !== 'economy') { enhancedNegative = enhancedNegative ? enhancedNegative + ", " + hdConfig.HD_NEGATIVE : hdConfig.HD_NEGATIVE; optimizations.push("負面提示詞: 高清過濾"); }
    let finalWidth = width;
    let finalHeight = height;
    let sizeUpscaled = false;
    const maxModelRes = profile?.max_resolution || 2048;
    const minRes = Math.max(modeConfig.min_resolution, profile?.min_resolution || 1024);
    const currentRes = Math.min(width, height);
    if (currentRes < minRes || modeConfig.force_upscale) {
      const scale = minRes / currentRes;
      finalWidth = Math.min(Math.round(width * scale / 64) * 64, maxModelRes);
      finalHeight = Math.min(Math.round(height * scale / 64) * 64, maxModelRes);
      sizeUpscaled = true;
      optimizations.push("尺寸優化: " + width + "x" + height + " → " + finalWidth + "x" + finalHeight);
    }
    if (finalWidth > maxModelRes || finalHeight > maxModelRes) {
      const scale = maxModelRes / Math.max(finalWidth, finalHeight);
      finalWidth = Math.round(finalWidth * scale / 64) * 64;
      finalHeight = Math.round(finalHeight * scale / 64) * 64;
      optimizations.push("模型限制: 調整至 " + finalWidth + "x" + finalHeight);
    }
    return { prompt: enhancedPrompt, negativePrompt: enhancedNegative, width: finalWidth, height: finalHeight, optimized: true, quality_mode: qualityMode, hd_level: hdLevel, optimizations, size_upscaled: sizeUpscaled };
  }
}

class ParameterOptimizer {
  static optimizeSteps(model, width, height, style = 'none', qualityMode = 'standard', userSteps = null) {
    if (userSteps !== null && userSteps !== -1) { const suggestion = this.calculateOptimalSteps(model, width, height, style, qualityMode); return { steps: userSteps, optimized: false, suggested: suggestion.steps, reasoning: suggestion.reasoning, user_override: true }; }
    return this.calculateOptimalSteps(model, width, height, style, qualityMode);
  }
  static calculateOptimalSteps(model, width, height, style, qualityMode = 'standard') {
    const rules = CONFIG.OPTIMIZATION_RULES;
    const modelRule = rules.MODEL_STEPS[model] || rules.MODEL_STEPS["flux"];
    const modeConfig = CONFIG.HD_OPTIMIZATION.QUALITY_MODES[qualityMode];
    const profile = CONFIG.HD_OPTIMIZATION.MODEL_QUALITY_PROFILES[model];
    let baseSteps = modelRule.optimal;
    const reasoning = [model + ": " + baseSteps + "步"];
    const totalPixels = width * height;
    let sizeMultiplier = 1.0;
    if (totalPixels >= rules.SIZE_MULTIPLIER.xlarge.threshold) { sizeMultiplier = rules.SIZE_MULTIPLIER.xlarge.multiplier; reasoning.push("超大 x" + sizeMultiplier); }
    else if (totalPixels >= rules.SIZE_MULTIPLIER.large.threshold) { sizeMultiplier = rules.SIZE_MULTIPLIER.large.multiplier; reasoning.push("大尺寸 x" + sizeMultiplier); }
    else if (totalPixels <= rules.SIZE_MULTIPLIER.small.threshold) { sizeMultiplier = rules.SIZE_MULTIPLIER.small.multiplier; }
    else { sizeMultiplier = rules.SIZE_MULTIPLIER.medium.multiplier; }
    let styleMultiplier = rules.STYLE_ADJUSTMENT[style] || rules.STYLE_ADJUSTMENT.default;
    let qualityMultiplier = modeConfig?.steps_multiplier || 1.0;
    if (qualityMultiplier !== 1.0) reasoning.push(modeConfig.name + " x" + qualityMultiplier);
    let profileBoost = profile?.optimal_steps_boost || 1.0;
    if (profileBoost !== 1.0) reasoning.push("模型配置 x" + profileBoost);
    let optimizedSteps = Math.round(baseSteps * sizeMultiplier * styleMultiplier * qualityMultiplier * profileBoost);
    optimizedSteps = Math.max(modelRule.min, Math.min(optimizedSteps, modelRule.max));
    reasoning.push("→ " + optimizedSteps + "步");
    return { steps: optimizedSteps, optimized: true, base_steps: baseSteps, size_multiplier: sizeMultiplier, style_multiplier: styleMultiplier, quality_multiplier: qualityMultiplier, profile_boost: profileBoost, min_steps: modelRule.min, max_steps: modelRule.max, reasoning: reasoning.join(' ') };
  }
  static optimizeGuidance(model, style, qualityMode = 'standard') {
    const modeConfig = CONFIG.HD_OPTIMIZATION.QUALITY_MODES[qualityMode];
    const profile = CONFIG.HD_OPTIMIZATION.MODEL_QUALITY_PROFILES[model];
    let baseGuidance = 7.5;
    if (style === 'photorealistic') baseGuidance = 8.5;
    else if (['oil-painting', 'watercolor', 'sketch'].includes(style)) baseGuidance = 6.5;
    else if (['manga', 'anime', 'chibi'].includes(style)) baseGuidance = 7.0;
    else if (['pixel-art', 'low-poly'].includes(style)) baseGuidance = 6.0;
    let qualityBoost = modeConfig?.guidance_multiplier || 1.0;
    let profileBoost = profile?.guidance_boost || 1.0;
    return Math.round(baseGuidance * qualityBoost * profileBoost * 10) / 10;
  }
}

class StyleProcessor {
  static applyStyle(prompt, style, negativePrompt) {
    try {
      if (!style || style === 'none' || style === '') return { enhancedPrompt: prompt, enhancedNegative: negativePrompt || "" };
      const styleConfig = CONFIG.STYLE_PRESETS[style];
      if (!styleConfig) return { enhancedPrompt: prompt, enhancedNegative: negativePrompt || "" };
      let enhancedPrompt = prompt;
      if (styleConfig.prompt && styleConfig.prompt.trim()) enhancedPrompt = prompt + ", " + styleConfig.prompt;
      let enhancedNegative = negativePrompt || "";
      if (styleConfig.negative && styleConfig.negative.trim()) {
        if (enhancedNegative && enhancedNegative.trim()) enhancedNegative = enhancedNegative + ", " + styleConfig.negative;
        else enhancedNegative = styleConfig.negative;
      }
      return { enhancedPrompt: enhancedPrompt, enhancedNegative: enhancedNegative };
    } catch (error) { console.error("❌ StyleProcessor error:", error.message); return { enhancedPrompt: prompt, enhancedNegative: negativePrompt || "" }; }
  }
}

async function fetchWithTimeout(url, options = {}, timeout = CONFIG.FETCH_TIMEOUT) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') throw new Error("Request timeout after " + timeout + "ms");
    throw error;
  }
}


class PollinationsProvider {
  constructor(config, env) { this.config = config; this.name = config.name; this.env = env; }
  
  async generate(prompt, options, logger) {
    const {
      model = "zimage", width = 1024, height = 1024, seed = -1, negativePrompt = "", guidance = null, steps = null,
      enhance = false, nologo = true, privateMode = true, style = "none", autoOptimize = true, autoHD = true,
      qualityMode = 'standard', referenceImages = [],
      detail = 'medium', sampler = 'euler', cfgScale = null, clipSkip = null, denoisingStrength = null
    } = options;

    console.log("🍌 [PollinationsProvider] 開始生成:", { model, prompt: prompt.substring(0, 30) + "..." });

    // 🔥 模型映射: 將自定義模型名稱映射到實際的 Pollinations API 模型
    const MODEL_MAPPING = {
      'klein-large': 'klein-large'
    };
    let apiModel = MODEL_MAPPING[model] || model;
    
    console.log("🍌 [PollinationsProvider] 模型映射:", { original: model, mapped: apiModel });
    
    const modelConfig = this.config.models.find(m => m.id === model);
    console.log("🍌 [PollinationsProvider] 模型配置:", modelConfig ? "找到" : "未找到", modelConfig);
    
    if (!modelConfig) {
        console.error("🍌 [PollinationsProvider] 模型未找到:", model);
        console.log("🍌 [PollinationsProvider] 可用模型:", this.config.models.map(m => m.id));
        throw new Error(`模型 "${model}" 未找到，請檢查配置`);
    }
    
    const supportsRefImages = modelConfig?.supports_reference_images || false;
    const maxRefImages = modelConfig?.max_reference_images || 0;
    
    let validReferenceImages = [];
    if (referenceImages && referenceImages.length > 0) {
      if (!supportsRefImages) {
        logger.add("⚠️ Reference Images", { warning: model + " 不支持參考圖像，已忽略", supported_models: ["flux-2-dev", "imagen-4"] });
      } else if (referenceImages.length > maxRefImages) {
        logger.add("⚠️ Reference Images", { warning: model + " 最多支持 " + maxRefImages + " 張參考圖", provided: referenceImages.length, using: maxRefImages });
        validReferenceImages = referenceImages.slice(0, maxRefImages);
      } else {
        validReferenceImages = referenceImages;
        logger.add("🖼️ Reference Images", { model: model, count: validReferenceImages.length, max_allowed: maxRefImages, mode: "圖生圖" });
      }
      
      // 🔍 參考圖片 URL 驗證
      const validUrls = [];
      for (const imgUrl of validReferenceImages) {
        try {
          const urlObj = new URL(imgUrl);
          if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
            validUrls.push(imgUrl);
          } else {
            logger.add("⚠️ Invalid Reference Image URL", { url: imgUrl, reason: "Invalid protocol" });
          }
        } catch (e) {
          logger.add("⚠️ Invalid Reference Image URL", { url: imgUrl, error: e.message });
        }
      }
      validReferenceImages = validUrls;
    }
    
    let basePrompt = prompt;
    let translationLog = { translated: false };

    if (/[\u4e00-\u9fa5]/.test(prompt)) {
      logger.add("🌐 Pre-translation", { message: "Detecting Chinese, translating first..." });
      const translation = await translateToEnglish(prompt, this.env);
      if (translation.translated) {
        basePrompt = translation.text;
        translationLog = translation;
        logger.add("✅ Translation Success", { original: prompt, translated: basePrompt });
      } else {
        logger.add("⚠️ Translation Failed", { error: translation.error });
      }
    }

    const promptComplexity = PromptAnalyzer.analyzeComplexity(basePrompt);
    const recommendedQuality = PromptAnalyzer.recommendQualityMode(basePrompt, model);
    logger.add("🧠 Prompt Analysis", { complexity: (promptComplexity * 100).toFixed(1) + '%', recommended_quality: recommendedQuality, selected_quality: qualityMode, has_reference_images: validReferenceImages.length > 0 });
    
    let hdOptimization = null;
    let optimizedPrompt = basePrompt;
    let finalNegative = negativePrompt;
    let finalWidth = width;
    let finalHeight = height;
    
    if (autoHD) {
      hdOptimization = HDOptimizer.optimize(basePrompt, negativePrompt, model, width, height, qualityMode, autoHD);
      optimizedPrompt = hdOptimization.prompt;
      finalNegative = hdOptimization.negativePrompt;
      finalWidth = hdOptimization.width;
      finalHeight = hdOptimization.height;
      if (hdOptimization.optimized) {
        logger.add("🎨 HD Optimization", { mode: qualityMode, hd_level: hdOptimization.hd_level, original: width + "x" + height, optimized: finalWidth + "x" + finalHeight, upscaled: hdOptimization.size_upscaled, details: hdOptimization.optimizations });
      }
    }
    
    let finalSteps = steps;
    let finalGuidance = guidance;
    
    if (autoOptimize) {
      const stepsOptimization = ParameterOptimizer.optimizeSteps(model, finalWidth, finalHeight, style, qualityMode, steps);
      finalSteps = stepsOptimization.steps;
      logger.add("🎯 Steps Optimization", { steps: stepsOptimization.steps, reasoning: stepsOptimization.reasoning });
      if (guidance === null) finalGuidance = ParameterOptimizer.optimizeGuidance(model, style, qualityMode);
      else finalGuidance = guidance;
    } else {
      finalSteps = steps || 20;
      finalGuidance = guidance || 7.5;
    }
    
    const { enhancedPrompt, enhancedNegative } = StyleProcessor.applyStyle(optimizedPrompt, style, finalNegative);
    const finalFullPrompt = enhancedPrompt;

    logger.add("🎨 Style Processing", { selected_style: style, style_name: CONFIG.STYLE_PRESETS[style]?.name || style, style_applied: style !== 'none', original_prompt_length: optimizedPrompt.length, enhanced_prompt_length: enhancedPrompt.length });
    
    const currentSeed = seed === -1 ? Math.floor(Math.random() * 1000000) : seed;
    let fullPrompt = finalFullPrompt;
    if (enhancedNegative && enhancedNegative.trim()) fullPrompt = finalFullPrompt + " [negative: " + enhancedNegative + "]";
    
    // 🔍 提示詞長度優化
    const MAX_PROMPT_LENGTH = 2000;
    let truncatedPrompt = fullPrompt;
    if (fullPrompt.length > MAX_PROMPT_LENGTH) {
      truncatedPrompt = fullPrompt.substring(0, MAX_PROMPT_LENGTH);
      logger.add("⚠️ Prompt Truncated", { original_length: fullPrompt.length, truncated_length: MAX_PROMPT_LENGTH });
    }
    const encodedPrompt = encodeURIComponent(truncatedPrompt);
    const pathPrefix = this.config.pathPrefix || "";
    let baseUrl = this.config.endpoint + pathPrefix + "/" + encodedPrompt;
    
    const params = new URLSearchParams();
    // 這裡直接使用 apiModel
    params.append('model', apiModel);
    params.append('width', finalWidth.toString());
    params.append('height', finalHeight.toString());
    params.append('seed', currentSeed.toString());
    params.append('nologo', nologo.toString());
    params.append('enhance', enhance.toString());
    params.append('private', privateMode.toString());
    if (validReferenceImages && validReferenceImages.length > 0) {
      params.append('image', validReferenceImages.join(','));
      logger.add("🖼️ Reference Images Added", { count: validReferenceImages.length, urls: validReferenceImages });
    }
    if (finalGuidance !== 7.5) params.append('guidance', finalGuidance.toString());
    if (finalSteps !== 20) params.append('steps', finalSteps.toString());
    
    // 🔧 新增額外 API 參數
    if (detail !== 'medium') params.append('detail', detail);
    if (sampler !== 'euler') params.append('sampler', sampler);
    if (cfgScale !== null) params.append('cfg_scale', cfgScale.toString());
    if (clipSkip !== null) params.append('clip_skip', clipSkip.toString());
    if (validReferenceImages.length > 0 && denoisingStrength !== null) {
      params.append('denoising_strength', denoisingStrength.toString());
    }
    
    const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Accept': 'image/*', 'Referer': 'https://pollinations.ai/' };
    const authConfig = CONFIG.POLLINATIONS_AUTH;
    if (authConfig.enabled && authConfig.token) {
      headers['Authorization'] = `Bearer ${authConfig.token}`;
      logger.add("🔐 API Authentication", { method: "Bearer Token", token_prefix: authConfig.token.substring(0, 8) + "...", enabled: true, endpoint: this.config.endpoint });
    } else {
      logger.add("⚠️ No API Key", { authenticated: false, note: "新 API 端點需要 API Key，請設置 POLLINATIONS_API_KEY 環境變量", endpoint: this.config.endpoint, warning: "未認證的請求可能會失敗" });
    }
    
    const url = baseUrl + '?' + params.toString();
    logger.add("📡 API Request", { endpoint: this.config.endpoint, path: pathPrefix + "/" + encodedPrompt.substring(0, 50) + "...", model: apiModel, authenticated: authConfig.enabled && !!authConfig.token, full_url: url.substring(0, 100) + "..." });
    
    // ⏱️ 請求超時優化 - 根據圖片大小動態調整
    const pixelCount = finalWidth * finalHeight;
    const baseTimeout = 30000;
    const timeoutPerMPixel = 10000;
    const dynamicTimeout = baseTimeout + (pixelCount / 1000000) * timeoutPerMPixel;
    const finalTimeout = Math.min(dynamicTimeout, 180000);
    
    for (let retry = 0; retry < CONFIG.MAX_RETRIES; retry++) {
      try {
        const response = await fetchWithTimeout(url, { method: 'GET', headers: headers }, finalTimeout);
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.startsWith('image/')) {
            // 📊 速率限制處理
            const rateLimit = {
              remaining: response.headers.get('X-RateLimit-Remaining'),
              reset: response.headers.get('X-RateLimit-Reset'),
              limit: response.headers.get('X-RateLimit-Limit')
            };
            if (rateLimit.remaining) {
              logger.add("📊 Rate Limit", rateLimit);
            }
            
            // 💰 成本追蹤
            const cost = response.headers.get('X-Cost') || modelConfig?.pricing?.image_price || "FREE";
            
            const imageBlob = await response.blob();
            const imageBuffer = await imageBlob.arrayBuffer();
            
            // 🔍 圖片品質驗證
            const MIN_IMAGE_SIZE = 1024;
            if (imageBuffer.byteLength < MIN_IMAGE_SIZE) {
              throw new Error(`生成的圖片過小 (${imageBuffer.byteLength} bytes)，可能生成失敗`);
            }
            
            // 📝 日誌優化
            logger.add("✅ Success", {
              url: response.url,
              used_model: apiModel,
              final_size: finalWidth + "x" + finalHeight,
              quality_mode: qualityMode,
              style_used: style,
              style_name: CONFIG.STYLE_PRESETS[style]?.name || style,
              hd_optimized: autoHD && hdOptimization?.optimized,
              auto_translated: translationLog.translated,
              reference_images_used: validReferenceImages.length,
              generation_mode: validReferenceImages.length > 0 ? "圖生圖" : "文生圖",
              authenticated: authConfig.enabled && !!authConfig.token,
              seed: currentSeed,
              prompt_length: fullPrompt.length,
              steps: finalSteps,
              guidance: finalGuidance,
              detail: detail,
              sampler: sampler,
              cost: cost,
              cost_currency: modelConfig?.pricing?.currency || "pollen"
            });
            
            return {
              imageData: imageBuffer,
              contentType: contentType,
              url: response.url,
              provider: this.name,
              model: model,
              requested_model: model,
              seed: currentSeed,
              style: style,
              style_name: CONFIG.STYLE_PRESETS[style]?.name || style,
              style_category: CONFIG.STYLE_PRESETS[style]?.category || 'unknown',
              steps: finalSteps,
              guidance: finalGuidance,
              width: finalWidth,
              height: finalHeight,
              quality_mode: qualityMode,
              prompt_complexity: promptComplexity,
              hd_optimized: autoHD && hdOptimization?.optimized,
              hd_details: hdOptimization,
              auto_translated: translationLog.translated,
              reference_images: validReferenceImages,
              reference_images_count: validReferenceImages.length,
              generation_mode: validReferenceImages.length > 0 ? "圖生圖" : "文生圖",
              authenticated: authConfig.enabled && !!authConfig.token,
              cost: cost,
              cost_currency: modelConfig?.pricing?.currency || "pollen",
              auto_optimized: autoOptimize,
              detail: detail,
              sampler: sampler
            };
          } else { throw new Error("Invalid content type: " + contentType); }
        } else if (response.status === 401) {
          throw new Error("認證失敗：無效或缺少 API 金鑰。請設置 POLLINATIONS_API_KEY 環境變量");
        }
        else if (response.status === 403) {
          throw new Error("存取被拒絕：API 金鑰可能缺少所需權限");
        }
        else if (response.status === 429) {
          throw new Error("請求過於頻繁：已達到速率限制，請稍後再試");
        }
        else if (response.status === 500) {
          throw new Error("伺服器錯誤：Pollinations API 伺服器暫時無法使用");
        }
        else {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 200)}`);
        }
      } catch (e) {
        logger.add("❌ Request Failed", { error: e.message, model: apiModel, retry: retry + 1, max_retries: CONFIG.MAX_RETRIES, endpoint: this.config.endpoint });
        if (retry < CONFIG.MAX_RETRIES - 1) await new Promise(resolve => setTimeout(resolve, 1000 * (retry + 1)));
        else throw new Error("Generation failed: " + e.message);
      }
    }
    throw new Error("Model " + model + " failed after " + CONFIG.MAX_RETRIES + " retries");
  }
}

class InfipProvider {
  constructor(config, env) { this.config = config; this.name = config.name; this.env = env; }
  
  async generate(prompt, options, logger) {
    const { model = "img4", width = 1024, height = 1024, apiKey = "", nsfw = false, style = "none", negativePrompt = "" } = options;
    
    // Prefer environment variable if available
    const finalApiKey = this.env.INFIP_API_KEY || apiKey;

    if (!finalApiKey) throw new Error("Infip API Key is required (Set INFIP_API_KEY env var or provide via UI)");

    let basePrompt = prompt;
    let translationLog = { translated: false };
    if (/[\u4e00-\u9fa5]/.test(prompt)) {
      logger.add("🌐 Pre-translation", { message: "Detecting Chinese, translating first..." });
      const translation = await translateToEnglish(prompt, this.env);
      if (translation.translated) {
        basePrompt = translation.text;
        translationLog = translation;
        logger.add("✅ Translation Success", { original: prompt, translated: basePrompt });
      }
    }

    // Apply Style
    const { enhancedPrompt } = StyleProcessor.applyStyle(basePrompt, style, negativePrompt);
    logger.add("🎨 Style Processing", { selected_style: style, style_applied: style !== 'none', original: basePrompt, enhanced: enhancedPrompt });

    const url = `${this.config.endpoint}/v1/images/generations`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${finalApiKey}`,
      'User-Agent': 'Flux-AI-Pro-Worker'
    };
    
    // Infip supports 1024x1024, 1792x1024, 1024x1792
    let sizeStr = "1024x1024";
    if (width > height && width >= 1500) sizeStr = "1792x1024";
    else if (height > width && height >= 1500) sizeStr = "1024x1792";
    
    // Infip supports up to 4 images per request
    const batchSize = Math.min(Math.max(options.numOutputs || 1, 1), 4);

    const body = {
      model: model,
      prompt: enhancedPrompt,
      n: batchSize,
      size: sizeStr,
      response_format: "url"
    };

    if (nsfw) {
        body.safety_check = false;
        body.censor_nsfw = false;
        logger.add("🔞 NSFW Mode", { enabled: true, note: "Safety checks disabled" });
    }

    logger.add("📡 Infip Request", { endpoint: url, model: model, size: sizeStr });

    try {
      const response = await fetchWithTimeout(url, { method: 'POST', headers: headers, body: JSON.stringify(body) }, 60000);
      
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Infip API Error (${response.status}): ${errText}`);
      }
      
      const data = await response.json();
      
      // Handle Async Task (if any accidental async model used)
      if (data.task_id) {
         throw new Error("Async models (task_id) are not supported in this version. Please use Sync models like img4.");
      }
      
      if (data.data && data.data.length > 0) {
        // Handle multiple images response
        if (data.data.length > 1) {
            const results = [];
            for(const item of data.data) {
                if(item.url) {
                    const imgUrl = item.url;
                    // For batch results, we return simplified objects
                    // Note: The caller (MultiProviderRouter) expects a single result object if called once, 
                    // but here we are inside generate().
                    // Since MultiProviderRouter loops numOutputs, we need to be careful.
                    // However, for Infip we are now doing batching INSIDE generate().
                    // To support this, we need to return an array or change how MultiProviderRouter works.
                    // BUT, to keep compatibility, let's just return the FIRST image here if called via standard loop,
                    // OR if we want to support true batching, we should return an array.
                    // Let's modify MultiProviderRouter to handle array returns from provider.generate().
                    
                    // Actually, simpler approach: Return the first image as main, and others as extra_images
                    // But that complicates the flow. 
                    
                    // Let's fetch all images in parallel
                    const imgResp = await fetch(imgUrl);
                    const imageBuffer = await imgResp.arrayBuffer();
                    results.push({
                        imageData: imageBuffer,
                        contentType: imgResp.headers.get('content-type') || 'image/png',
                        url: imgUrl,
                        provider: this.name,
                        model: model,
                        seed: -1,
                        width: width,
                        height: height,
                        authenticated: true
                    });
                }
            }
            // Return array of results (Special case handled by router/caller?)
            // No, the router expects a single object. 
            // We will return a special object that contains "batch_results"
            return {
                batch_results: results,
                provider: this.name,
                cost: "QUOTA"
            };
        }

        const imgUrl = data.data[0].url;
        logger.add("⬇️ Downloading Image", { url: imgUrl });
        
        // Download image to return binary
        const imgResp = await fetch(imgUrl);
        const imageBuffer = await imgResp.arrayBuffer();
        const contentType = imgResp.headers.get('content-type') || 'image/png';
        
        return { 
            imageData: imageBuffer, 
            contentType: contentType, 
            url: imgUrl, 
            provider: this.name, 
            model: model, 
            seed: -1, // Infip doesn't return seed usually
            width: width, 
            height: height, 
            auto_translated: translationLog.translated,
            authenticated: true,
            cost: "QUOTA"
        };
      } else {
        throw new Error("Invalid response format from Infip API");
      }
    } catch (e) {
      logger.add("❌ Infip Failed", { error: e.message });
      throw e;
    }
  }
}

class AquaProvider {
  constructor(config, env) { this.config = config; this.name = config.name; this.env = env; }
  
  async generate(prompt, options, logger) {
    const { model = "flux-2", width = 1024, height = 1024, apiKey = "", style = "none", negativePrompt = "", referenceImages = [] } = options;
    const finalApiKey = this.env.AQUA_API_KEY || apiKey;
    if (!finalApiKey) throw new Error("Aqua API Key is required (Set AQUA_API_KEY env var or provide via UI)");

    let basePrompt = prompt;
    let translationLog = { translated: false };
    if (/[\u4e00-\u9fa5]/.test(prompt)) {
      logger.add("🌐 Pre-translation", { message: "Detecting Chinese, translating first..." });
      const translation = await translateToEnglish(prompt, this.env);
      if (translation.translated) {
        basePrompt = translation.text;
        translationLog = translation;
        logger.add("✅ Translation Success", { original: prompt, translated: basePrompt });
      }
    }

    const { enhancedPrompt } = StyleProcessor.applyStyle(basePrompt, style, negativePrompt);
    logger.add("🎨 Style Processing", { style, original: basePrompt, enhanced: enhancedPrompt });

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${finalApiKey}`,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    };

    let imgUrl = null;
    
    // Check for Polling Models (imagen-4, nanobanana)
    const isPollingModel = ["imagen-4", "nanobanana"].includes(model.toLowerCase());
    
    if (isPollingModel) {
      // Polling API Logic for imagen-4 and nanobanana
      logger.add("🔄 Using Polling API", { model });
      
      // Determine ratio based on width/height
      let ratio = "square";
      if (width > height) ratio = "landscape";
      else if (height > width) ratio = "portrait";
      
      // Build request body
      const requestBody = {
        model: model,
        prompt: enhancedPrompt,
        ratio: ratio
      };
      
      // Add image parameter for nanobanana (Img2Img)
      if (model.toLowerCase() === "nanobanana" && referenceImages && referenceImages.length > 0) {
        requestBody.image = referenceImages[0].trim();
        logger.add("📸 Img2Img Mode", { referenceImage: requestBody.image });
      }
      
      // Create task
      const createUrl = `${this.config.endpoint}/v1/polling`;
      logger.add("📡 Creating Task", { url: createUrl, model, ratio });
      
      const createResp = await fetchWithTimeout(createUrl, { method: 'POST', headers, body: JSON.stringify(requestBody) }, 30000);
      
      if (!createResp.ok) {
        const errText = await createResp.text();
        throw new Error(`Task creation failed: Status ${createResp.status} - ${errText}`);
      }
      
      const taskData = await createResp.json();
      logger.add("✅ Task Created", { taskId: taskData.task_id, statusUrl: taskData.url });
      
      if (!taskData.success || !taskData.task_id) {
        throw new Error("Invalid task response: " + JSON.stringify(taskData));
      }
      
      // Poll for result
      imgUrl = await this.pollTask(taskData.task_id, headers, logger);
      
    } else {
      // Smart Routing for non-polling models
      const isChatModel = ["gemini", "grok", "openai", "gpt", "deepseek", "minimax", "glm", "nova", "kimi"].some(k => model.toLowerCase().includes(k));

      if (isChatModel) {
          // Chat API Logic
          try {
              const chatUrl = `${this.config.endpoint}/v1/chat/completions`;
              const chatBody = {
                model: model,
                messages: [{ role: "user", content: "Generate an image of: " + enhancedPrompt + ". Return the image URL." }]
              };
              logger.add("📡 Aqua Request (Chat API)", { url: chatUrl, model });

              const chatResp = await fetchWithTimeout(chatUrl, { method: 'POST', headers, body: JSON.stringify(chatBody) }, 60000);
              if (!chatResp.ok) throw new Error(`Chat API Status ${chatResp.status}: ${await chatResp.text()}`);

              const chatData = await chatResp.json();
              console.log("🌊 [AquaProvider] Chat Response:", JSON.stringify(chatData));
              
              const content = chatData.choices?.[0]?.message?.content || "";
              const urlMatch = content.match(/https?:\/\/[^\s)"']+/);
              if (urlMatch) imgUrl = urlMatch[0];
              else throw new Error("No URL found in chat content: " + content.substring(0, 100));
          } catch (e) {
              throw new Error(`Aqua Chat API Failed: ${e.message}`);
          }
      } else {
          // Image API Logic (No Fallback, but with Retry)
          const url = `${this.config.endpoint}/v1/images/generations`;
          const body = { model, prompt: enhancedPrompt, n: 1, size: `${width}x${height}`, response_format: "url" };
          logger.add("📡 Aqua Request (Image API)", { url, model });

          let lastError;
          for (let attempt = 1; attempt <= 3; attempt++) {
              try {
                  const response = await fetchWithTimeout(url, { method: 'POST', headers, body: JSON.stringify(body) }, 60000);
                  
                  if (response.ok) {
                      const data = await response.json();
                      console.log("🌊 [AquaProvider] Image Response:", JSON.stringify(data));

                      if (data.data && data.data.length > 0) imgUrl = data.data[0].url;
                      else if (data.url) imgUrl = data.url;
                      else if (data.output) imgUrl = Array.isArray(data.output) ? data.output[0] : data.output;
                      
                      if (imgUrl) break; // Success
                      throw new Error("No URL in response: " + JSON.stringify(data));
                  } else {
                      const errText = await response.text();
                      const headersObj = {};
                      response.headers.forEach((v, k) => headersObj[k] = v);
                      
                      logger.add(`⚠️ Attempt ${attempt} Failed`, { status: response.status, headers: headersObj, body: errText });
                      
                      if (response.status === 502 && attempt < 3) {
                          await new Promise(r => setTimeout(r, 1000 * attempt));
                          continue;
                      }
                      throw new Error(`Status ${response.status}: ${errText}`);
                  }
              } catch (e) {
                  lastError = e;
                  if (!e.message.includes("Status 502") || attempt === 3) break;
                  logger.add(`⚠️ Retry ${attempt}/3`, { error: e.message });
              }
          }

          if (!imgUrl) {
               throw new Error(`Aqua Image API Failed: ${lastError?.message}`);
          }
      }
    }

    if (imgUrl) {
      logger.add("⬇️ Downloading Image", { url: imgUrl });
      const imgResp = await fetch(imgUrl);
      const imageBuffer = await imgResp.arrayBuffer();
      const contentType = imgResp.headers.get('content-type') || 'image/png';
      
      return {
          imageData: imageBuffer, contentType, url: imgUrl, provider: this.name, model, seed: -1, width, height,
          auto_translated: translationLog.translated, authenticated: true, cost: "QUOTA"
      };
    }
    
    throw new Error("Failed to retrieve image URL from Aqua API");
  }
  
  /**
   * Poll task status until completion with enhanced error handling and exponential backoff
   * @param {string} taskId - Task ID from create response
   * @param {object} headers - Request headers with auth
   * @param {object} logger - Logger instance
   * @param {number} maxAttempts - Maximum polling attempts (default: 150 = 5 minutes)
   * @param {number} interval - Initial polling interval in ms (default: 2000)
   * @returns {Promise<string>} Image URL
   */
  async pollTask(taskId, headers, logger, maxAttempts = 150, interval = 2000) {
    const statusUrl = `${this.config.endpoint}/v1/polling/${taskId}`;
    const totalTimeout = Math.round(maxAttempts * interval / 1000);
    logger.add("🔄 Starting Poll", { taskId, maxAttempts, interval, totalTimeout: `${totalTimeout}s` });
    
    let currentInterval = interval;
    let consecutiveErrors = 0;
    const maxConsecutiveErrors = 5;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const response = await fetchWithTimeout(statusUrl, { method: 'GET', headers }, 15000);
        
        if (!response.ok) {
          const errText = await response.text();
          const headersObj = {};
          response.headers.forEach((v, k) => headersObj[k] = k);
          
          logger.add(`⚠️ Poll Attempt ${attempt} Failed`, {
            status: response.status,
            error: errText.substring(0, 200),
            headers: headersObj
          });
          
          // Handle Rate Limit (429) with Retry-After header
          if (response.status === 429) {
            const retryAfter = parseInt(response.headers.get('Retry-After') || '5');
            const waitTime = Math.max(retryAfter * 1000, currentInterval);
            logger.add(`⏳ Rate Limited`, { retryAfter: `${retryAfter}s`, waitTime: `${Math.round(waitTime/1000)}s` });
            await new Promise(r => setTimeout(r, waitTime));
            continue;
          }
          
          // Handle server errors (5xx) with exponential backoff
          if (response.status >= 500) {
            consecutiveErrors++;
            if (consecutiveErrors >= maxConsecutiveErrors) {
              throw new Error(`Too many consecutive server errors (${maxConsecutiveErrors}): ${errText}`);
            }
            const backoffTime = Math.min(currentInterval * Math.pow(2, consecutiveErrors), 30000);
            logger.add(`⏳ Server Error - Backoff`, { consecutiveErrors, backoffTime: `${Math.round(backoffTime/1000)}s` });
            await new Promise(r => setTimeout(r, backoffTime));
            continue;
          }
          
          // Client errors (4xx except 429) - throw immediately
          throw new Error(`Poll failed: Status ${response.status} - ${errText}`);
        }
        
        // Reset consecutive errors on successful response
        consecutiveErrors = 0;
        
        const data = await response.json();
        
        // Report progress every 10 attempts or on status change
        if (attempt % 10 === 0 || ['completed', 'failed', 'processing'].includes(data.status)) {
          const progress = Math.round((attempt / maxAttempts) * 100);
          const elapsed = Math.round(attempt * currentInterval / 1000);
          logger.add(`📊 進度: ${progress}%`, {
            attempt: `${attempt}/${maxAttempts}`,
            status: data.status,
            elapsed: `${elapsed}s`
          });
        }
        
        if (data.status === 'completed') {
          if (data.result && data.result.url) {
            logger.add("✅ Task Completed", {
              imageUrl: data.result.url,
              totalAttempts: attempt,
              totalTime: `${Math.round(attempt * currentInterval / 1000)}s`
            });
            return data.result.url;
          }
          throw new Error("Task completed but no image URL in result: " + JSON.stringify(data));
        }
        
        if (data.status === 'failed') {
          const errorMsg = data.result?.error || data.result?.message || data.error || 'Unknown error';
          const errorDetails = data.result?.details || '';
          throw new Error(`Task failed: ${errorMsg}${errorDetails ? ` - ${errorDetails}` : ''}`);
        }
        
        // Still pending or processing, wait with exponential backoff
        if (attempt < maxAttempts) {
          // Exponential backoff: increase interval by 10% each time, max 10 seconds
          currentInterval = Math.min(interval * Math.pow(1.1, attempt), 10000);
          await new Promise(r => setTimeout(r, currentInterval));
        }
        
      } catch (e) {
        if (attempt === maxAttempts) {
          throw e;
        }
        
        // Check if error is network-related and should be retried
        const isNetworkError = e.message.includes('fetch') ||
                              e.message.includes('timeout') ||
                              e.message.includes('ECONN') ||
                              e.name === 'TypeError';
        
        if (isNetworkError) {
          consecutiveErrors++;
          if (consecutiveErrors >= maxConsecutiveErrors) {
            throw new Error(`Too many consecutive network errors (${maxConsecutiveErrors}): ${e.message}`);
          }
          logger.add(`⚠️ Network Error (Attempt ${attempt})`, {
            error: e.message,
            consecutiveErrors,
            willRetry: consecutiveErrors < maxConsecutiveErrors
          });
          const backoffTime = Math.min(currentInterval * Math.pow(2, consecutiveErrors), 30000);
          await new Promise(r => setTimeout(r, backoffTime));
          continue;
        }
        
        // Non-network errors - log and continue
        logger.add(`⚠️ Poll Error (Attempt ${attempt})`, { error: e.message });
        await new Promise(r => setTimeout(r, currentInterval));
      }
    }
    
    throw new Error(`Task timeout after ${maxAttempts} attempts (${totalTimeout}s). The task may still be processing on the server.`);
  }
}

class KinaiProvider {
  constructor(config, env) { this.config = config; this.name = config.name; this.env = env; }
  
  async generate(prompt, options, logger) {
    const { model = "flux-2-dev", width = 1024, height = 1024, apiKey = "", style = "none", negativePrompt = "", nsfw = false } = options;
    
    // Prefer environment variable if available
    const finalApiKey = this.env.KINAI_API_KEY || apiKey;

    if (!finalApiKey) throw new Error("Kinai API Key is required (Set KINAI_API_KEY env var or provide via UI)");

    let basePrompt = prompt;
    let translationLog = { translated: false };
    if (/[\u4e00-\u9fa5]/.test(prompt)) {
      logger.add("🌐 Pre-translation", { message: "Detecting Chinese, translating first..." });
      const translation = await translateToEnglish(prompt, this.env);
      if (translation.translated) {
        basePrompt = translation.text;
        translationLog = translation;
        logger.add("✅ Translation Success", { original: prompt, translated: basePrompt });
      }
    }

    // Apply Style
    const { enhancedPrompt } = StyleProcessor.applyStyle(basePrompt, style, negativePrompt);
    logger.add("🎨 Style Processing", { selected_style: style, style_applied: style !== 'none', original: basePrompt, enhanced: enhancedPrompt });

    const url = `${this.config.endpoint}/images/generations`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${finalApiKey}`,
      'User-Agent': 'Flux-AI-Pro-Worker'
    };
    
    // Kinai supports various sizes
    let sizeStr = "1024x1024";
    if (width > height && width >= 1500) sizeStr = "1792x1024";
    else if (height > width && height >= 1500) sizeStr = "1024x1792";
    else if (width >= 2048) sizeStr = "2048x2048";
    
    // Kinai supports up to 4 images per request
    const batchSize = Math.min(Math.max(options.numOutputs || 1, 1), 4);

    const body = {
      model: model,
      prompt: enhancedPrompt,
      n: batchSize,
      size: sizeStr,
      response_format: "url"
    };

    // NSFW Mode - Disable safety checks
    if (nsfw) {
      body.safety_check = false;
      body.censor_nsfw = false;
      logger.add("🔞 NSFW Mode", { enabled: true, note: "Safety checks disabled" });
    }

    logger.add("📡 Kinai Request", { endpoint: url, model: model, size: sizeStr });

    try {
      const response = await fetchWithTimeout(url, { method: 'POST', headers: headers, body: JSON.stringify(body) }, 60000);
      
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Kinai API Error (${response.status}): ${errText}`);
      }
      
      const data = await response.json();
      
      // Handle Async Task (if any accidental async model used)
      if (data.task_id) {
         throw new Error("Async models (task_id) are not supported in this version. Please use Sync models like flux-2-dev.");
      }
      
      if (data.data && data.data.length > 0) {
        // Handle multiple images response
        if (data.data.length > 1) {
            const results = [];
            for(const item of data.data) {
                if(item.url) {
                    const imgUrl = item.url;
                    const imgResp = await fetch(imgUrl);
                    const imageBuffer = await imgResp.arrayBuffer();
                    results.push({
                        imageData: imageBuffer,
                        contentType: imgResp.headers.get('content-type') || 'image/png',
                        url: imgUrl,
                        provider: this.name,
                        model: model,
                        seed: -1,
                        width: width,
                        height: height,
                        authenticated: true
                    });
                }
            }
            return {
                batch_results: results,
                provider: this.name,
                cost: "QUOTA"
            };
        }

        const imgUrl = data.data[0].url;
        logger.add("⬇️ Downloading Image", { url: imgUrl });
        
        // Download image to return binary
        const imgResp = await fetch(imgUrl);
        const imageBuffer = await imgResp.arrayBuffer();
        const contentType = imgResp.headers.get('content-type') || 'image/png';
        
        return {
            imageData: imageBuffer,
            contentType: contentType,
            url: imgUrl,
            provider: this.name,
            model: model,
            seed: -1,
            width: width,
            height: height,
            auto_translated: translationLog.translated,
            authenticated: true,
            cost: "QUOTA"
        };
      } else {
        throw new Error("Invalid response format from Kinai API");
      }
    } catch (e) {
      logger.add("❌ Kinai Failed", { error: e.message });
      throw e;
    }
  }
}

// =================================================================================
// AirforceProvider - Airforce API Provider
// =================================================================================
class AirforceProvider {
  constructor(config, env) {
    this.config = config;
    this.name = config.name;
    this.env = env;
  }

  async generate(prompt, options, logger) {
    const {
      model = "plutogen-o1",
      width = 1024,
      height = 1024,
      apiKey = "",
      nsfw = false,
      style = "none",
      negativePrompt = "",
      language = "en"
    } = options;

    const finalApiKey = this.env.AIRFORCE_API_KEY || apiKey;
    if (!finalApiKey || finalApiKey.trim() === '') {
      throw new Error("Airforce API key is required. Please configure AIRFORCE_API_KEY in your environment variables or provide it in the request.");
    }
    
    // Validate API key format (should be a bearer token)
    if (finalApiKey.length < 10) {
      throw new Error("Invalid Airforce API key format. API key should be at least 10 characters.");
    }

    logger.add("🎨 Airforce Generating", {
      model,
      width,
      height,
      style,
      nsfw,
      language,
      promptLength: prompt.length
    });

    try {
      // Translate prompt to English if needed
      const translationResult = await translateToEnglish(prompt, this.env);
      const translatedPrompt = translationResult.text || prompt;
      
      // Apply style if specified
      let finalPrompt = translatedPrompt;
      if (style !== "none") {
        const styleResult = StyleProcessor.applyStyle(translatedPrompt, style, negativePrompt);
        finalPrompt = styleResult.enhancedPrompt || translatedPrompt;
      }

      const size = `${width}x${height}`;
      const url = `${this.config.endpoint}/v1/images/generations`;
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': finalApiKey.startsWith('Bearer ') ? finalApiKey : `Bearer ${finalApiKey}`,
        'User-Agent': 'Flux-AI-Pro-Worker'
      };

      const body = {
        model: model,
        prompt: finalPrompt,
        n: 1,
        size: size,
        response_format: "b64_json"
      };

      logger.add("📤 Request to Airforce", {
        url,
        model: body.model,
        size: body.size,
        response_format: body.response_format,
        promptLength: finalPrompt.length,
        apiKeyPrefix: finalApiKey ? finalApiKey.substring(0, 8) + '...' : 'none',
        apiKeyLength: finalApiKey ? finalApiKey.length : 0,
        hasBearerPrefix: finalApiKey ? finalApiKey.startsWith('Bearer ') : false
      });

      const response = await fetchWithTimeout(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
      }, this.config.timeout || 120000);

      logger.add("📥 Airforce Response Status", {
        status: response.status,
        ok: response.ok,
        contentType: response.headers.get('content-type')
      });

      if (!response.ok) {
        const errorText = await response.text();
        logger.add("❌ Airforce API Error", {
          status: response.status,
          statusText: response.statusText,
          error: errorText,
          headers: Object.fromEntries(response.headers.entries())
        });
        
        // Parse error details if possible
        let errorMessage = `Airforce API error: ${response.status}`;
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.error) {
            errorMessage += ` - ${errorData.error.message || errorData.error}`;
            if (errorData.error.code) {
              errorMessage += ` (code: ${errorData.error.code})`;
            }
          } else if (errorData.message) {
            errorMessage += ` - ${errorData.message}`;
          } else {
            errorMessage += ` - ${errorText}`;
          }
        } catch {
          errorMessage += ` - ${errorText}`;
        }
        
        // Add helpful hints for common errors
        if (response.status === 401 || response.status === 403) {
          errorMessage += '. Please check your Airforce API key.';
        } else if (response.status === 429) {
          errorMessage += '. Rate limit exceeded. Please try again later.';
        } else if (response.status === 530) {
          errorMessage += '. This may be an authentication issue. Please verify your API key.';
        }
        
        throw new Error(errorMessage);
      }

      // Check if response is SSE (Server-Sent Events) or regular JSON
      const contentType = response.headers.get('content-type') || '';
      let results = [];
      
      if (contentType.includes('text/event-stream') || contentType.includes('text/plain')) {
        // Handle SSE streaming response (fallback for unexpected SSE responses)
        logger.add("📡 Using SSE stream handler (fallback)");
        results = await this.handleSSEStream(response, logger, width, height, model);
      } else {
        // Handle regular JSON response (standard for Airforce API)
        logger.add("📡 Using JSON response handler");
        const data = await response.json();
        logger.add("📊 Airforce Response Data", {
          data,
          dataType: typeof data,
          dataKeys: Object.keys(data),
          dataPreview: JSON.stringify(data).substring(0, 500)
        });

        // Parse JSON response
        if (data.url) {
          results.push({
            url: data.url,
            width: width,
            height: height,
            model: model,
            provider: this.name
          });
          logger.add("✅ JSON: Found URL in data.url");
        } else if (data.data && Array.isArray(data.data)) {
          for (const item of data.data) {
            if (item.url) {
              results.push({
                url: item.url,
                width: width,
                height: height,
                model: model,
                provider: this.name
              });
            }
            if (item.b64_json) {
              results.push({
                url: `data:image/png;base64,${item.b64_json}`,
                width: width,
                height: height,
                model: model,
                provider: this.name
              });
            }
          }
          logger.add("✅ JSON: Processed data.data array", { count: results.length });
        } else if (data.b64_json) {
          results.push({
            url: `data:image/png;base64,${data.b64_json}`,
            width: width,
            height: height,
            model: model,
            provider: this.name
          });
          logger.add("✅ JSON: Found b64_json");
        } else if (data.images && Array.isArray(data.images)) {
          for (const item of data.images) {
            if (item.url) {
              results.push({
                url: item.url,
                width: width,
                height: height,
                model: model,
                provider: this.name
              });
            }
          }
          logger.add("✅ JSON: Processed data.images array", { count: results.length });
        } else if (data.image) {
          results.push({
            url: data.image,
            width: width,
            height: height,
            model: model,
            provider: this.name
          });
          logger.add("✅ JSON: Found URL in data.image");
        } else if (data.output && Array.isArray(data.output)) {
          for (const item of data.output) {
            if (item.url || item.image) {
              results.push({
                url: item.url || item.image,
                width: width,
                height: height,
                model: model,
                provider: this.name
              });
            }
            if (item.b64_json) {
              results.push({
                url: `data:image/png;base64,${item.b64_json}`,
                width: width,
                height: height,
                model: model,
                provider: this.name
              });
            }
          }
          logger.add("✅ JSON: Processed data.output array", { count: results.length });
        } else if (data.result && (data.result.url || data.result.b64_json)) {
          if (data.result.url) {
            results.push({
              url: data.result.url,
              width: width,
              height: height,
              model: model,
              provider: this.name
            });
          }
          if (data.result.b64_json) {
            results.push({
              url: `data:image/png;base64,${data.result.b64_json}`,
              width: width,
              height: height,
              model: model,
              provider: this.name
            });
          }
          logger.add("✅ JSON: Found data in data.result");
        } else {
          logger.add("⚠️ JSON: Unknown format - deep searching", {
            dataKeys: Object.keys(data),
            fullData: JSON.stringify(data)
          });
          
          const findImages = (obj, path = "") => {
            const images = [];
            if (typeof obj === 'string') {
              if (obj.startsWith('http://') || obj.startsWith('https://')) {
                images.push({ url: obj, path });
              } else if (obj.startsWith('data:image')) {
                images.push({ url: obj, path });
              }
            } else if (typeof obj === 'object' && obj !== null) {
              for (const [key, value] of Object.entries(obj)) {
                images.push(...findImages(value, path ? `${path}.${key}` : key));
              }
            }
            return images;
          };
          
          const foundImages = findImages(data);
          if (foundImages.length > 0) {
            for (const { url } of foundImages) {
              results.push({
                url: url,
                width: width,
                height: height,
                model: model,
                provider: this.name
              });
            }
            logger.add("✅ JSON: Found images via deep search", { count: results.length });
          }
        }
      }

      if (results.length === 0) {
        throw new Error("No images returned from Airforce API");
      }

      logger.add("✅ Success", {
        imageCount: results.length,
        firstUrl: results[0].url?.substring(0, 50) + "..."
      });

      // Return single result object (compatible with other providers)
      const firstResult = results[0];
      
      // If the URL is a base64 data URI, extract the base64 part
      let imgData = null;
      let imgContentType = 'image/png';
      const imgUrl = firstResult.url;
      
      if (imgUrl.startsWith('data:image/')) {
        // It's already a base64 data URI
        const match = imgUrl.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
        if (match) {
          imgContentType = match[1];
          const base64Data = match[2];
          // Convert base64 to ArrayBuffer
          const binaryString = atob(base64Data);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          imgData = bytes.buffer;
        }
      }
      
      return {
        imageData: imgData,
        contentType: imgContentType,
        url: imgUrl,
        provider: this.name,
        model: model,
        seed: -1, // Airforce doesn't return seed
        width: width,
        height: height,
        auto_translated: false,
        authenticated: true,
        cost: "QUOTA"
      };
    } catch (e) {
      logger.add("❌ Airforce Failed", { error: e.message });
      throw e;
    }
  }

  getAspectRatio(width, height) {
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(width, height);
    return `${width / divisor}:${height / divisor}`;
  }

  getResolution(width, height) {
    const totalPixels = width * height;
    if (totalPixels >= 1920 * 1080) return "2k";
    if (totalPixels >= 1024 * 1024) return "1k";
    return "512";
  }

  async handleSSEStream(response, logger, width, height, model) {
    const results = [];
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedData = '';
    let chunkCount = 0;

    logger.add("📡 SSE Stream Started", {
      contentType: response.headers.get('content-type'),
      hasBody: !!response.body
    });

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          logger.add("📡 SSE Stream Ended", {
            totalChunks: chunkCount,
            accumulatedDataLength: accumulatedData.length
          });
          break;
        }

        chunkCount++;
        const decodedChunk = decoder.decode(value, { stream: true });
        accumulatedData += decodedChunk;

        // Use standard SSE format splitting (same as official example)
        const lines = accumulatedData.split('\n\n');
        accumulatedData = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6);
            
            // Skip keepalive and done messages (same as official example)
            if (dataStr === '[DONE]') {
              logger.add("📡 SSE: Received [DONE] signal");
              continue;
            }
            if (dataStr === ': keepalive') continue;
            if (!dataStr || dataStr.trim() === '') continue;

            try {
              const data = JSON.parse(dataStr);
            console.log("📡 [AirforceProvider] SSE Data:", data);

            // Handle different response formats
            // Format 1: Direct URL
            if (data.url) {
              results.push({
                url: data.url,
                width: width,
                height: height,
                model: model,
                provider: this.name
              });
              logger.add("✅ SSE: Found URL in data.url", { url: data.url.substring(0, 50) + "..." });
            }
            // Format 2: OpenAI compatible - data array
            else if (data.data && Array.isArray(data.data)) {
              for (const item of data.data) {
                if (item.url) {
                  results.push({
                    url: item.url,
                    width: width,
                    height: height,
                    model: model,
                    provider: this.name
                  });
                }
                // Handle b64_json in data array
                if (item.b64_json) {
                  results.push({
                    url: `data:image/png;base64,${item.b64_json}`,
                    width: width,
                    height: height,
                    model: model,
                    provider: this.name
                  });
                  logger.add("✅ SSE: Found b64_json in data.data array");
                }
              }
              logger.add("✅ SSE: Processed data.data array", { count: results.length });
            }
            // Format 3: Images array
            else if (data.images && Array.isArray(data.images)) {
              for (const item of data.images) {
                if (item.url) {
                  results.push({
                    url: item.url,
                    width: width,
                    height: height,
                    model: model,
                    provider: this.name
                  });
                }
              }
              logger.add("✅ SSE: Processed data.images array", { count: results.length });
            }
            // Format 4: Direct image property
            else if (data.image) {
              results.push({
                url: data.image,
                width: width,
                height: height,
                model: model,
                provider: this.name
              });
              logger.add("✅ SSE: Found URL in data.image", { url: data.image.substring(0, 50) + "..." });
            }
            // Format 5: Base64 encoded image (b64_json)
            else if (data.b64_json) {
              results.push({
                url: `data:image/png;base64,${data.b64_json}`,
                width: width,
                height: height,
                model: model,
                provider: this.name
              });
              logger.add("✅ SSE: Found b64_json", { dataLength: data.b64_json.length });
            }
            // Format 6: Output array
            else if (data.output && Array.isArray(data.output)) {
              for (const item of data.output) {
                if (item.url || item.image) {
                  results.push({
                    url: item.url || item.image,
                    width: width,
                    height: height,
                    model: model,
                    provider: this.name
                  });
                }
                if (item.b64_json) {
                  results.push({
                    url: `data:image/png;base64,${item.b64_json}`,
                    width: width,
                    height: height,
                    model: model,
                    provider: this.name
                  });
                }
              }
              logger.add("✅ SSE: Processed data.output array", { count: results.length });
            }
            // Format 7: Result object
            else if (data.result && (data.result.url || data.result.b64_json)) {
              if (data.result.url) {
                results.push({
                  url: data.result.url,
                  width: width,
                  height: height,
                  model: model,
                  provider: this.name
                });
              }
              if (data.result.b64_json) {
                results.push({
                  url: `data:image/png;base64,${data.result.b64_json}`,
                  width: width,
                  height: height,
                  model: model,
                  provider: this.name
                });
              }
              logger.add("✅ SSE: Found data in data.result");
            }
            // Format 8: Deep search for any URL or base64
            else {
              logger.add("⚠️ SSE: Unknown format - deep searching", {
                dataKeys: Object.keys(data),
                dataPreview: JSON.stringify(data).substring(0, 300)
              });
              
              const findImages = (obj, path = "") => {
                const images = [];
                if (typeof obj === 'string') {
                  if (obj.startsWith('http://') || obj.startsWith('https://')) {
                    images.push({ url: obj, path });
                  } else if (obj.startsWith('data:image')) {
                    images.push({ url: obj, path });
                  }
                } else if (typeof obj === 'object' && obj !== null) {
                  for (const [key, value] of Object.entries(obj)) {
                    images.push(...findImages(value, path ? `${path}.${key}` : key));
                  }
                }
                return images;
              };
              
              const foundImages = findImages(data);
              if (foundImages.length > 0) {
                for (const { url } of foundImages) {
                  results.push({
                    url: url,
                    width: width,
                    height: height,
                    model: model,
                    provider: this.name
                  });
                }
                logger.add("✅ SSE: Found images via deep search", { count: results.length });
              }
            }
            } catch (parseError) {
              logger.add("⚠️ SSE Parse Error", {
                dataStr: dataStr.substring(0, 500),
                error: parseError.message
              });
            }
          }
        }
      }
    } catch (streamError) {
      logger.add("❌ SSE Stream Error", {
        error: streamError.message
      });
    } finally {
      reader.releaseLock();
    }

    logger.add("📊 SSE Stream Complete", {
      totalResults: results.length,
      accumulatedDataRemaining: accumulatedData.length
    });

    return results;
  }
}

// =================================================================================
// NonponProvider - Nonpon API Provider
// =================================================================================
class NonponProvider {
  constructor(config, env) {
    this.config = config;
    this.name = config.name;
    this.env = env;
  }

  async generate(prompt, options, logger) {
  	const {
  		model = "gemini-3-pro-image-preview",
  		width = 1024,
  		height = 1024,
  		apiKey = "",
  		style = "none",
  		negativePrompt = "",
  		seed = -1,
  		steps = 30,
  		guidance = 7.5,
  		quality_mode = "standard"
  	} = options;
 
  	const finalApiKey = this.env.NONPON_API_KEY || apiKey;
  	if (!finalApiKey || finalApiKey.trim() === '') {
  		throw new Error("Nonpon API key is required. Please configure NONPON_API_KEY in your environment variables or provide it in the request.");
  	}
 
  	logger.add("🎨 Nonpon Generating", {
  		model,
  		width,
  		height,
  		style,
  		seed,
  		steps,
  		guidance,
  		quality_mode,
  		promptLength: prompt.length
  	});
 
  	try {
  		// Translate prompt to English if needed
  		const translationResult = await translateToEnglish(prompt, this.env);
  		const translatedPrompt = translationResult.text || prompt;
 
  		// Apply style if specified
  		let finalPrompt = translatedPrompt;
  		let finalNegativePrompt = negativePrompt;
  		if (style !== "none") {
  			const styleResult = StyleProcessor.applyStyle(translatedPrompt, style, negativePrompt);
  			finalPrompt = styleResult.enhancedPrompt || translatedPrompt;
  			if (styleResult.negativePrompt) {
  				finalNegativePrompt = styleResult.negativePrompt;
  			}
  		}
 
  		const size = `${width}x${height}`;
  		const url = `${this.config.endpoint}/v1/images/generations`;
 
  		const headers = {
  			'Content-Type': 'application/json',
  			'Authorization': finalApiKey.startsWith('Bearer ') ? finalApiKey : `Bearer ${finalApiKey}`,
  			'User-Agent': 'Flux-AI-Pro-Worker'
  		};
 
  		// 映射 quality_mode 到 API 的 quality 參數
  		const qualityMap = {
  			'economy': 'standard',
  			'standard': 'standard',
  			'ultra': 'hd'
  		};
 
  		// 構建符合官方 API 規範的請求體
  		const body = {
  			model: model,
  			prompt: finalPrompt,
  			size: size,
  			quality: qualityMap[quality_mode] || 'standard',
  			style: "vivid",
  			n: 1,
  			response_format: "b64_json",
  			extra_body: {
  				seed: seed > 0 ? seed : undefined,
  				temperature: 0.8,
  				top_p: 0.9,
  				top_k: 40,
  				negative_prompt: finalNegativePrompt || undefined,
  				steps: steps,
  				guidance: guidance
  			}
  		};
 
  		// 移除 undefined 值
  		Object.keys(body.extra_body).forEach(key => {
  			if (body.extra_body[key] === undefined) {
  				delete body.extra_body[key];
  			}
  		});
 
  		logger.add("📤 Request to Nonpon", {
  			url,
  			model: body.model,
  			size: body.size,
  			quality: body.quality,
  			style: body.style,
  			response_format: body.response_format,
  			extra_body: body.extra_body,
  			promptLength: finalPrompt.length,
  			apiKeyPrefix: finalApiKey ? finalApiKey.substring(0, 8) + '...' : 'none'
  		});
 
  		const response = await fetchWithTimeout(url, {
  			method: 'POST',
  			headers: headers,
  			body: JSON.stringify(body)
  		}, 120000);
 
  		logger.add("📥 Nonpon Response Status", {
  			status: response.status,
  			ok: response.ok,
  			contentType: response.headers.get('content-type')
  		});
 
  		if (!response.ok) {
  			const errorText = await response.text();
  			logger.add("❌ Nonpon API Error", {
  				status: response.status,
  				statusText: response.statusText,
  				error: errorText
  			});
 
  			let errorMessage = `Nonpon API error: ${response.status}`;
  			try {
  				const errorData = JSON.parse(errorText);
  				if (errorData.error) {
  					errorMessage += ` - ${errorData.error.message || errorData.error}`;
  				} else if (errorData.message) {
  					errorMessage += ` - ${errorData.message}`;
  				} else {
  					errorMessage += ` - ${errorText}`;
  				}
  			} catch {
  				errorMessage += ` - ${errorText}`;
  			}
 
  			if (response.status === 401 || response.status === 403) {
  				errorMessage += '. Please check your Nonpon API key.';
  			} else if (response.status === 429) {
  				errorMessage += '. Rate limit exceeded. Please try again later.';
  			}
 
  			throw new Error(errorMessage);
  		}
 
  		const data = await response.json();
  		logger.add("📊 Nonpon Response Data", {
  			dataKeys: Object.keys(data),
  			dataPreview: JSON.stringify(data).substring(0, 500)
  		});
 
  		let imageBuffer = null;
  		let contentType = 'image/png';
  		let imgUrl = null;
  		let returnedSeed = -1;
 
  		// Parse response - support multiple formats (b64_json and URL)
  		if (data.b64_json) {
  			// 直接返回 base64 數據
  			const base64Data = data.b64_json;
  			const binaryString = atob(base64Data);
  			const bytes = new Uint8Array(binaryString.length);
  			for (let i = 0; i < binaryString.length; i++) {
  				bytes[i] = binaryString.charCodeAt(i);
  			}
  			imageBuffer = bytes.buffer;
  			logger.add("✅ Found b64_json in data.b64_json");
  		} else if (data.data && Array.isArray(data.data)) {
  			// OpenAI 格式: data.data[0].b64_json 或 data.data[0].url
  			const firstItem = data.data[0];
  			if (firstItem.b64_json) {
  				const base64Data = firstItem.b64_json;
  				const binaryString = atob(base64Data);
  				const bytes = new Uint8Array(binaryString.length);
  				for (let i = 0; i < binaryString.length; i++) {
  					bytes[i] = binaryString.charCodeAt(i);
  				}
  				imageBuffer = bytes.buffer;
  				logger.add("✅ Found b64_json in data.data[0].b64_json");
  			} else if (firstItem.url) {
  				imgUrl = firstItem.url;
  				logger.add("✅ Found URL in data.data[0].url");
  			}
  			// 獲取返回的 seed
  			if (firstItem.seed !== undefined) {
  				returnedSeed = firstItem.seed;
  			}
  		} else if (data.url) {
  			imgUrl = data.url;
  			logger.add("✅ Found URL in data.url");
  		} else if (data.images && Array.isArray(data.images) && data.images[0] && data.images[0].url) {
  			imgUrl = data.images[0].url;
  			logger.add("✅ Found URL in data.images[0].url");
  		} else if (data.image) {
  			imgUrl = data.image;
  			logger.add("✅ Found URL in data.image");
  		} else {
  			throw new Error("Invalid response format from Nonpon API - no image data found");
  		}
 
  		// 如果是 URL，需要下載圖片
  		if (imgUrl && !imageBuffer) {
  			logger.add("⬇️ Downloading Image", { url: imgUrl });
  			const imgResp = await fetch(imgUrl);
  			imageBuffer = await imgResp.arrayBuffer();
  			contentType = imgResp.headers.get('content-type') || 'image/png';
  		}
 
  		// 獲取返回的 seed（如果有的話）
  		if (data.seed !== undefined) {
  			returnedSeed = data.seed;
  		}
 
  		return {
  			imageData: imageBuffer,
  			contentType: contentType,
  			url: imgUrl,
  			provider: this.name,
  			model: model,
  			seed: returnedSeed,
  			width: width,
  			height: height,
  			auto_translated: translationResult.translated,
  			authenticated: true,
  			cost: "QUOTA"
  		};
  	} catch (e) {
  		logger.add("❌ Nonpon Failed", { error: e.message });
  		throw e;
  	}
  }
 }

// =================================================================================
// 供應商隊列管理器 - 為指定供應商提供獨立的隊列和並發控制
// =================================================================================
class ProviderQueueManager {
  constructor() {
    // 只為需要隊列的供應商配置隊列
    this.queues = {
      aqua: { queue: [], maxConcurrent: 2, processing: 0 },
      airforce: { queue: [], maxConcurrent: 1, processing: 0 }
    };
    
    // 不使用隊列的供應商列表
    this.noQueueProviders = ['pollinations', 'infip', 'kinai', 'nonpon'];
  }

  /**
   * 添加請求到指定供應商的隊列
   * @param {string} provider - 供應商名稱
   * @param {Function} requestFn - 請求函數
   * @returns {Promise} 請求結果
   */
  async addToQueue(provider, requestFn) {
    // 如果供應商不使用隊列，直接執行
    if (this.noQueueProviders.includes(provider)) {
      return requestFn();
    }
    
    const queue = this.queues[provider];
    if (!queue) {
      // 如果供應商沒有配置隊列，直接執行
      return requestFn();
    }
    
    return new Promise((resolve, reject) => {
      const position = queue.queue.length;
      const item = {
        fn: requestFn,
        resolve,
        reject,
        position,
        timestamp: Date.now()
      };
      queue.queue.push(item);
      this.processQueue(provider);
    });
  }

  /**
   * 處理指定供應商的隊列
   * @param {string} provider - 供應商名稱
   */
  async processQueue(provider) {
    const queue = this.queues[provider];
    if (!queue) return;
    
    if (queue.processing >= queue.maxConcurrent || queue.queue.length === 0) return;

    queue.processing++;
    const item = queue.queue.shift();
    
    try {
      const result = await item.fn();
      item.resolve(result);
    } catch (error) {
      item.reject(error);
    } finally {
      queue.processing--;
      this.processQueue(provider);
    }
  }

  /**
   * 獲取指定供應商的隊列狀態
   * @param {string} provider - 供應商名稱
   * @returns {Object} 隊列狀態
   */
  getQueueStatus(provider) {
    // 如果供應商不使用隊列，返回空狀態
    if (this.noQueueProviders.includes(provider)) {
      return { waiting: 0, processing: 0, maxConcurrent: 0, total: 0, usesQueue: false };
    }
    
    const queue = this.queues[provider];
    if (!queue) {
      return { waiting: 0, processing: 0, maxConcurrent: 0, total: 0, usesQueue: false };
    }
    
    return {
      waiting: queue.queue.length,
      processing: queue.processing,
      maxConcurrent: queue.maxConcurrent,
      total: queue.queue.length + queue.processing,
      usesQueue: true
    };
  }

  /**
   * 獲取所有供應商的隊列狀態
   * @returns {Object} 所有供應商的隊列狀態
   */
  getAllQueueStatus() {
    const status = {};
    
    // 添加不使用隊列的供應商
    for (const provider of this.noQueueProviders) {
      status[provider] = { waiting: 0, processing: 0, maxConcurrent: 0, total: 0, usesQueue: false };
    }
    
    // 添加使用隊列的供應商
    for (const [provider, queue] of Object.entries(this.queues)) {
      status[provider] = {
        waiting: queue.queue.length,
        processing: queue.processing,
        maxConcurrent: queue.maxConcurrent,
        total: queue.queue.length + queue.processing,
        usesQueue: true
      };
    }
    return status;
  }

  /**
   * 清空指定供應商的隊列
   * @param {string} provider - 供應商名稱
   */
  clearQueue(provider) {
    const queue = this.queues[provider];
    if (queue) {
      // 拒絕所有等待中的請求
      queue.queue.forEach(item => {
        item.reject(new Error('Queue cleared'));
      });
      queue.queue = [];
    }
  }

  /**
   * 清空所有隊列
   */
  clearAllQueues() {
    for (const provider of Object.keys(this.queues)) {
      this.clearQueue(provider);
    }
  }

  /**
   * 更新供應商的並發限制
   * @param {string} provider - 供應商名稱
   * @param {number} maxConcurrent - 最大並發數
   */
  updateMaxConcurrent(provider, maxConcurrent) {
    const queue = this.queues[provider];
    if (queue) {
      queue.maxConcurrent = maxConcurrent;
    }
  }
}

class MultiProviderRouter {
  constructor(apiKeys = {}, env = null) {
    this.providers = {};
    this.apiKeys = apiKeys;
    this.env = env;
    this.queueManager = new ProviderQueueManager();
    for (const [key, config] of Object.entries(CONFIG.PROVIDERS)) {
      if (config.enabled) {
        if (key === 'pollinations') this.providers[key] = new PollinationsProvider(config, env);
        else if (key === 'infip') this.providers[key] = new InfipProvider(config, env);
        else if (key === 'aqua') this.providers[key] = new AquaProvider(config, env);
        else if (key === 'kinai') this.providers[key] = new KinaiProvider(config, env);
        else if (key === 'airforce') this.providers[key] = new AirforceProvider(config, env);
        else if (key === 'nonpon') this.providers[key] = new NonponProvider(config, env);
      }
    }
  }
  getProvider(providerName = null) {
    console.log("🔍 [MultiProviderRouter] getProvider called with:", {
      providerName,
      availableProviders: Object.keys(this.providers),
      hasProviderName: !!providerName,
      providerExists: providerName ? !!this.providers[providerName] : false
    });
    
    if (providerName && this.providers[providerName]) {
      console.log("✅ [MultiProviderRouter] Using requested provider:", providerName);
      return { name: providerName, instance: this.providers[providerName] };
    }
    
    const defaultName = CONFIG.DEFAULT_PROVIDER;
    console.log("🔄 [MultiProviderRouter] Falling back to default provider:", defaultName);
    
    if (this.providers[defaultName]) {
      console.log("✅ [MultiProviderRouter] Using default provider:", defaultName);
      return { name: defaultName, instance: this.providers[defaultName] };
    }
    
    const firstProvider = Object.keys(this.providers)[0];
    console.log("🔄 [MultiProviderRouter] Falling back to first provider:", firstProvider);
    
    if (firstProvider) {
      console.log("✅ [MultiProviderRouter] Using first provider:", firstProvider);
      return { name: firstProvider, instance: this.providers[firstProvider] };
    }
    
    throw new Error('No available provider');
  }
  async generate(prompt, options, logger) {
    const { provider: requestedProvider = null, numOutputs = 1 } = options;
    
    logger.add("🔍 MultiProviderRouter: Generating", {
      requestedProvider,
      availableProviders: Object.keys(this.providers),
      options: { ...options, apiKey: options.apiKey ? '***' : '' }
    });
    
    const { name: providerName, instance: provider } = this.getProvider(requestedProvider);
    
    logger.add("✅ MultiProviderRouter: Provider selected", {
      providerName,
      providerInstance: provider ? provider.name : 'null'
    });
    
    // 使用隊列管理器處理請求
    return await this.queueManager.addToQueue(providerName, async () => {
      const results = [];
      
      // Optimization for Infip: Use native batching if available
      if (providerName === 'infip' && numOutputs > 1) {
           const batchOptions = { ...options, numOutputs: numOutputs, seed: options.seed };
           try {
               const result = await provider.generate(prompt, batchOptions, logger);
               if (result.batch_results) {
                   results.push(...result.batch_results);
                   return results;
               } else {
                   results.push(result);
               }
           } catch (e) {
               logger.add("❌ Batch Generation Failed", { error: e.message });
               throw e;
           }
           return results;
      }

      for (let i = 0; i < numOutputs; i++) {
        const currentOptions = { ...options, seed: options.seed === -1 ? -1 : options.seed + i };
        const result = await provider.generate(prompt, currentOptions, logger);
        results.push(result);
      }
      return results;
    });
  }

  /**
   * 獲取指定供應商的隊列狀態
   * @param {string} provider - 供應商名稱
   * @returns {Object} 隊列狀態
   */
  getQueueStatus(provider) {
    return this.queueManager.getQueueStatus(provider);
  }

  /**
   * 獲取所有供應商的隊列狀態
   * @returns {Object} 所有供應商的隊列狀態
   */
  getAllQueueStatus() {
    return this.queueManager.getAllQueueStatus();
  }
}
// Global Cache for Online Count (To save KV List operations)
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const startTime = Date.now();

    const clientIP = getClientIP(request);
    if (env.POLLINATIONS_API_KEY) { CONFIG.POLLINATIONS_AUTH.enabled = true; CONFIG.POLLINATIONS_AUTH.token = env.POLLINATIONS_API_KEY; } 
    else { console.warn("⚠️ POLLINATIONS_API_KEY not set - requests may fail on new API endpoint"); CONFIG.POLLINATIONS_AUTH.enabled = false; CONFIG.POLLINATIONS_AUTH.token = ""; }
    
    console.log("=== Request Info ===");
    console.log("IP:", clientIP);
    console.log("Path:", url.pathname);
    console.log("Method:", request.method);
    console.log("API Endpoint:", CONFIG.PROVIDERS.pollinations.endpoint);
    console.log("===================");
    
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders() });
    
    try {
      let response;
      if (url.pathname === '/nano') {
        response = handleNanoPage(request);
      }
      else if (url.pathname === '/' || url.pathname === '') {
        response = handleUI(request, env);
      }
      else if (url.pathname === '/_internal/generate') {
        response = await handleInternalGenerate(request, env, ctx);
      }
      else if (url.pathname === '/api/upload') {
        response = await handleUpload(request);
      }
      else if (url.pathname === '/api/generate-prompt') {
        response = await handlePromptGeneration(request, env);
      }
      else if (url.pathname === '/api/queue-status') {
        const router = new MultiProviderRouter({}, env);
        response = new Response(JSON.stringify({
          status: 'ok',
          queues: router.getAllQueueStatus()
        }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
      }
      else if (url.pathname === '/health') {
        response = new Response(JSON.stringify({
          status: 'ok', version: CONFIG.PROJECT_VERSION, timestamp: new Date().toISOString(),
          styles_count: mergedStyles.stats.total,
          styles_breakdown: mergedStyles.stats,
          api_auth: { enabled: CONFIG.POLLINATIONS_AUTH.enabled, method: CONFIG.POLLINATIONS_AUTH.method, has_token: !!CONFIG.POLLINATIONS_AUTH.token, endpoint: CONFIG.PROVIDERS.pollinations.endpoint },
          models: CONFIG.PROVIDERS.pollinations.models.map(m => ({ id: m.id, name: m.name, category: m.category, supports_reference_images: m.supports_reference_images || false })),
          style_categories: Object.keys(CONFIG.STYLE_CATEGORIES).map(key => ({ id: key, name: CONFIG.STYLE_CATEGORIES[key].name, icon: CONFIG.STYLE_CATEGORIES[key].icon, count: Object.values(CONFIG.STYLE_PRESETS).filter(s => s.category === key).length }))
        }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
      } else if (url.pathname.startsWith('/admin')) {
        response = await handleAdminPage(request, env, ctx);
      } else {
        response = new Response(JSON.stringify({ error: 'Not Found', message: '此 Worker 僅提供 Web UI 界面', available_paths: ['/', '/health', '/_internal/generate', '/nano', '/admin'] }), { status: 404, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
      }
      const duration = Date.now() - startTime;
      const headers = new Headers(response.headers);
      headers.set('X-Response-Time', duration + 'ms');
      headers.set('X-Worker-Version', CONFIG.PROJECT_VERSION);
      headers.set('X-API-Endpoint', CONFIG.PROVIDERS.pollinations.endpoint);
      return new Response(response.body, { status: response.status, headers: headers });
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error('Worker error:', error);
      return new Response(JSON.stringify({ error: { message: error.message, type: 'worker_error', timestamp: new Date().toISOString(), duration_ms: duration } }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
    }
  }
};

async function handleUpload(request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: corsHeaders() });
  }
  
  try {
    const formData = await request.formData();
    const file = formData.get('fileToUpload');
    
    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: corsHeaders({ 'Content-Type': 'application/json' })
      });
    }

    // 驗證文件大小（ImgBB 最大支持 32MB）
    const MAX_FILE_SIZE = 32 * 1024 * 1024; // 32MB
    if (file.size > MAX_FILE_SIZE) {
      return new Response(JSON.stringify({
        error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB`,
        maxSize: MAX_FILE_SIZE
      }), {
        status: 400,
        headers: corsHeaders({ 'Content-Type': 'application/json' })
      });
    }

    // 驗證文件類型
    if (!file.type.startsWith('image/')) {
      return new Response(JSON.stringify({ error: 'Invalid file type. Only images are allowed.' }), {
        status: 400,
        headers: corsHeaders({ 'Content-Type': 'application/json' })
      });
    }

    // 使用 ImgBB API 上傳圖片
    // ImgBB 免費 API Key (用於測試，生產環境建議使用自己的 API Key)
    const IMGBB_API_KEY = '8245f772dd33870730fab74e7e236df2'; // 免費測試用 API Key
    
    // 將文件轉換為 Base64（使用分塊處理避免堆疊溢出）
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    let binary = '';
    const chunkSize = 65536; // 每次處理 64KB
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      const chunk = uint8Array.slice(i, i + chunkSize);
      binary += String.fromCharCode.apply(null, chunk);
    }
    const base64 = btoa(binary);
    
    // 構建 ImgBB API 請求
    const imgbbFormData = new FormData();
    imgbbFormData.append('key', IMGBB_API_KEY);
    imgbbFormData.append('image', base64);
    
    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: imgbbFormData,
      headers: {
        'User-Agent': 'FluxAIPro-Worker/1.0'
      }
    });

    const data = await response.json();

    if (response.ok && data.success && data.data && data.data.url) {
      return new Response(JSON.stringify({
        url: data.data.url,
        deleteUrl: data.data.delete_url,
        displayUrl: data.data.display_url,
        thumbUrl: data.data.thumb.url
      }), {
        status: 200,
        headers: corsHeaders({ 'Content-Type': 'application/json' })
      });
    } else {
      console.error('ImgBB API Error:', data);
      return new Response(JSON.stringify({
        error: data.error?.message || 'Upload failed',
        details: data
      }), {
        status: 502,
        headers: corsHeaders({ 'Content-Type': 'application/json' })
      });
    }
  } catch (error) {
    console.error('Upload Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders({ 'Content-Type': 'application/json' })
    });
  }
}

// ====== Pollinations Prompt Generator Handler ======
async function handlePromptGeneration(request, env) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: corsHeaders() });
  }
  
  try {
    const body = await request.json();
    const { input, style, imageUrl, referenceImage } = body;
    const finalImageUrl = imageUrl || referenceImage;
    
    // Check inputs
    if ((!input || !input.trim()) && !finalImageUrl) {
      return new Response(JSON.stringify({ error: 'Input prompt or image is required' }), {
        status: 400,
        headers: corsHeaders({ 'Content-Type': 'application/json' })
      });
    }
    
    // 構建 Pollinations 文本生成請求
    const systemPrompt = `You are an expert image analyzer and prompt generator.

CRITICAL INSTRUCTIONS FOR IMAGE ANALYSIS:
1. Carefully examine the ENTIRE image - look at the main subject, background, colors, lighting, style, and mood
2. Describe what you see ACCURATELY - do not make assumptions or guess
3. Identify the artistic style (photorealistic, anime, oil painting, etc.)
4. Note the composition and perspective
5. Describe the lighting and color palette
6. Capture the emotional tone and atmosphere

GENERATE A DETAILED PROMPT:
- Start with the main subject description
- Add artistic style and visual techniques
- Include lighting, colors, and composition details
- End with mood and atmosphere
- Write in English only
- Keep it descriptive but concise (50-150 words)

OUTPUT FORMAT:
Output ONLY the final prompt. No explanations, no "Here is the prompt:", no additional text.

EXAMPLE OUTPUT:
A serene Japanese garden at sunset, featuring a traditional wooden bridge over a koi pond, cherry blossoms in full bloom, soft golden light filtering through the trees, photorealistic style, warm color palette, peaceful atmosphere, high detail, 8k quality.`;
    
    // 構建用戶內容數組
    const userContent = [];
    
    // 添加文本內容
    let textPrompt = input ? `Optimize this prompt: ${input}` : `Generate a prompt based on the image.`;
    if (style && style !== 'none') {
        textPrompt += `\n\nCRITICAL INSTRUCTION: The generated prompt MUST strictly adhere to the "${style}" art style. You must include specific artistic keywords, lighting techniques, color palettes, and composition styles associated with ${style}. Make the style the dominant visual characteristic of the image.`;
    }
    
    userContent.push({
        type: "text",
        text: textPrompt
    });
    
    // 如果有圖片，添加圖片內容
    if (finalImageUrl) {
        // 驗證圖片 URL 是否可訪問
        try {
            console.log('🔍 Validating image URL:', finalImageUrl);
            
            const imageTestResponse = await fetch(finalImageUrl, {
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'image/*'
                },
                redirect: 'follow'
            });
            
            if (!imageTestResponse.ok) {
                console.error('❌ Image URL not accessible:', {
                    url: finalImageUrl,
                    status: imageTestResponse.status,
                    statusText: imageTestResponse.statusText
                });
                return new Response(JSON.stringify({
                    error: 'Image URL not accessible',
                    details: `Status: ${imageTestResponse.status} ${imageTestResponse.statusText}`
                }), {
                    status: 400,
                    headers: corsHeaders({ 'Content-Type': 'application/json' })
                });
            }
            
            const contentType = imageTestResponse.headers.get('content-type');
            if (!contentType || !contentType.startsWith('image/')) {
                console.error('❌ Invalid content type:', contentType);
                return new Response(JSON.stringify({
                    error: 'URL does not point to an image',
                    details: `Content-Type: ${contentType}`
                }), {
                    status: 400,
                    headers: corsHeaders({ 'Content-Type': 'application/json' })
                });
            }
            
            console.log('✅ Image URL validated successfully');
            
            // 添加圖片到用戶內容
            userContent.push({
                type: "image_url",
                image_url: {
                    url: finalImageUrl,
                    detail: "high"
                }
            });
            
        } catch (error) {
            console.error('❌ Image URL validation error:', error);
            return new Response(JSON.stringify({
                error: 'Failed to validate image URL',
                details: error.message
            }), {
                status: 400,
                headers: corsHeaders({ 'Content-Type': 'application/json' })
            });
        }
    }
    
    // 使用 Pollinations Vision API (v1/chat/completions)
    const apiUrl = 'https://gen.pollinations.ai/v1/chat/completions';
    
    // 構建請求體
    const requestBody = {
        model: "openai",
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: userContent
            }
        ],
        seed: Math.floor(Math.random() * 1000000)
    };
    
    // 構建請求頭
    const headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    };
    
    // 如果有 API Key，添加認證
    if (env.POLLINATIONS_API_KEY) {
        headers['Authorization'] = `Bearer ${env.POLLINATIONS_API_KEY}`;
    }
    
    // Call Pollinations Vision API
    console.log('📤 Sending request to Pollinations Vision API:', {
        endpoint: apiUrl,
        model: requestBody.model,
        hasImage: !!finalImageUrl,
        imageUrl: finalImageUrl?.substring(0, 60) + '...',
        hasTextInput: !!input,
        style: style,
        contentItems: userContent.length
    });
    
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody)
    });

    console.log('📥 Received response from Pollinations:', {
        status: response.status,
        ok: response.ok,
        contentType: response.headers.get('content-type')
    });

    if (!response.ok) {
        const errText = await response.text();
        console.error('❌ Pollinations API Error Details:', {
            status: response.status,
            error: errText,
            endpoint: apiUrl
        });
        throw new Error(`Pollinations API Error (${response.status}): ${errText}`);
    }
    
    const data = await response.json();
    
    // 解析回應
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        console.error('❌ Invalid response format:', data);
        throw new Error('Invalid response format from API');
    }
    
    const generatedPrompt = data.choices[0].message.content;
    console.log('✅ Generated prompt:', {
        length: generatedPrompt.length,
        preview: generatedPrompt.substring(0, 100) + '...'
    });
    
    if (!generatedPrompt || !generatedPrompt.trim()) {
      console.error('❌ Empty prompt received from API');
      throw new Error('Empty response from AI');
    }

    // 驗證生成的提示詞是否合理
    const trimmedPrompt = generatedPrompt.trim();
    if (trimmedPrompt.length < 10) {
        console.warn('⚠️ Generated prompt is very short:', trimmedPrompt);
    }

    if (trimmedPrompt.length > 500) {
        console.warn('⚠️ Generated prompt is very long, may need truncation');
    }
    
    return new Response(JSON.stringify({
      success: true,
      prompt: trimmedPrompt,
      model: requestBody.model
    }), {
      status: 200,
      headers: corsHeaders({ 'Content-Type': 'application/json' })
    });
    
  } catch (error) {
    console.error('Prompt Generation Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders({ 'Content-Type': 'application/json' })
    });
  }
}

async function handleInternalGenerate(request, env, ctx) {
  const logger = new Logger();
  const startTime = Date.now();
  const clientIP = getClientIP(request);
  
  try {
    const body = await request.json();
    const prompt = body.prompt;
    if (!prompt || !prompt.trim()) throw new Error("Prompt is required");

    console.log("🍌 [Server] 收到生成請求:", {
      model: body.model,
      prompt: prompt.substring(0, 50) + "...",
      width: body.width,
      height: body.height,
      provider: body.provider,
      source: request.headers.get('X-Source')
    });

    // ====== Nano Pro 頁面限流檢查 ======
    // 檢查來自 Nano Pro 頁面的請求
    const source = request.headers.get('X-Source');
    if (source === 'nano-page') {
        console.log("🍌 [Server] 檢測到 Nano Pro 頁面請求");
        
        if (body.n && body.n > 1) { body.n = 1; }

        const limiter = new RateLimiter(env);
        const check = await limiter.checkLimit(clientIP);
        
        console.log("🍌 [Server] 限流檢查結果:", check);
        
        if (!check.allowed) {
            console.log("🍌 [Server] 限額已滿，拒絕請求");
            return new Response(JSON.stringify({
                error: { message: check.reason, type: 'rate_limit_exceeded' }
            }), { status: 429, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
        }
    }
    // ===============================================
    
    let width = 1024, height = 1024;
    if (body.width) width = body.width;
    if (body.height) height = body.height;
    
    let referenceImages = [];
    if (body.reference_images && Array.isArray(body.reference_images)) {
      referenceImages = body.reference_images.filter(url => { try { new URL(url); return true; } catch { return false; } });
    }
    
    const seedInput = body.seed !== undefined ? body.seed : -1;
    let seedValue = -1;
    if (seedInput !== -1) { 
        const parsedSeed = parseInt(seedInput); 
        if (!isNaN(parsedSeed)) seedValue = parsedSeed; 
    }
    
    const autoOptimize = body.auto_optimize !== false;
    const userSteps = body.steps ? parseInt(body.steps) : null;
    const userGuidance = body.guidance_scale ? parseFloat(body.guidance_scale) : null;

    const options = {
      provider: body.provider || null,
      model: body.model || "flux-schnell",
      apiKey: request.headers.get('X-API-Key') || body.api_key || "",
      width: Math.min(Math.max(width, 256), 2048),
      height: Math.min(Math.max(height, 256), 2048),
      numOutputs: Math.min(Math.max(body.n || 1, 1), 4),
      seed: seedValue,
      negativePrompt: body.negative_prompt || "",
      guidance: autoOptimize ? null : userGuidance,
      steps: autoOptimize ? null : userSteps,
      enhance: body.enhance === true,
      nologo: body.nologo !== false,
      privateMode: body.private !== false,
      style: body.style || "none",
      autoOptimize: autoOptimize,
      autoHD: body.auto_hd !== false,
      qualityMode: body.quality_mode || 'standard',
      referenceImages: referenceImages,
      nsfw: body.nsfw === true,
      language: body.language || 'en'  // Track interface language
    };
    
    const router = new MultiProviderRouter({}, env);
    const results = await router.generate(prompt, options, logger);
    const duration = Date.now() - startTime;
    
    if (results.length === 1 && results[0].imageData) {
      const result = results[0];
      return new Response(result.imageData, {
        headers: { 'Content-Type': result.contentType || 'image/png', 'Content-Disposition': `inline; filename="flux-ai-${result.seed}.png"`, 'X-Model': result.model, 'X-Model-Name': result.style_name || result.model, 'X-Seed': result.seed.toString(), 'X-Width': result.width.toString(), 'X-Height': result.height.toString(), 'X-Generation-Time': duration + 'ms', 'X-Quality-Mode': result.quality_mode, 'X-Style': result.style, 'X-Style-Name': result.style_name || result.style, 'X-Style-Category': result.style_category || 'unknown', 'X-Generation-Mode': result.generation_mode || '文生圖', 'X-Authenticated': result.authenticated ? 'true' : 'false', 'X-API-Endpoint': CONFIG.PROVIDERS.pollinations.endpoint, ...corsHeaders() }
      });
    }
    const imagesData = await Promise.all(results.map(async (r) => {
      if (r.imageData) {
        const uint8Array = new Uint8Array(r.imageData);
        let binary = '';
        const len = uint8Array.byteLength;
        for (let i = 0; i < len; i++) binary += String.fromCharCode(uint8Array[i]);
        return { image: `data:${r.contentType};base64,${btoa(binary)}`, model: r.model, seed: r.seed, width: r.width, height: r.height, quality_mode: r.quality_mode, style: r.style, style_name: r.style_name || r.style, style_category: r.style_category || 'unknown', generation_mode: r.generation_mode, authenticated: r.authenticated };
      }
      return null;
    }));
    return new Response(JSON.stringify({ created: Math.floor(Date.now() / 1000), data: imagesData.filter(d => d !== null), generation_time_ms: duration, api_endpoint: CONFIG.PROVIDERS.pollinations.endpoint, authenticated: CONFIG.POLLINATIONS_AUTH.enabled, styles_available: mergedStyles.stats.total }), { headers: corsHeaders({ 'Content-Type': 'application/json', 'X-Generation-Time': duration + 'ms', 'X-API-Endpoint': CONFIG.PROVIDERS.pollinations.endpoint, 'X-Styles-Count': mergedStyles.stats.total.toString() }) });
  } catch (e) {
    logger.add("❌ Error", e.message);
    return new Response(JSON.stringify({ error: { message: e.message, debug_logs: logger.get(), api_endpoint: CONFIG.PROVIDERS.pollinations.endpoint, authenticated: CONFIG.POLLINATIONS_AUTH.enabled } }), { status: 400, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  }
}
// 🔥 Cyber-Banana UI: 包含每小時限額(5張)、Pro模型、燈箱、下載功能
function handleNanoPage(request) {
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>🍌 Nano Pro - Gemini 3 Pro 控制台</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍌</text></svg>">
<style>
:root {
    --primary: #FACC15;
    --primary-dim: #cca400;
    --bg-dark: #0f0f11;
    --panel-bg: rgba(30, 30, 35, 0.7);
    --border: rgba(255, 255, 255, 0.1);
    --text: #ffffff;
    --text-muted: #9ca3af;
    --glass: blur(20px) saturate(180%);
}
* { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
body {
    font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: var(--bg-dark);
    background-image: radial-gradient(circle at 10% 20%, rgba(250, 204, 21, 0.05) 0%, transparent 40%);
    color: var(--text);
    height: 100vh;
    overflow: hidden;
    display: flex;
}
/* 語言切換按鈕樣式 */
.nano-lang-btn {
    padding: 6px 12px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 6px;
    color: #ccc;
    cursor: pointer;
    font-size: 11px;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: 0.2s;
    position: relative;
}
.nano-lang-btn:hover {
    background: rgba(250, 204, 21, 0.1);
    color: #FACC15;
    border-color: rgba(250, 204, 21, 0.3);
}
.nano-lang-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background: rgba(20, 20, 23, 0.95);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 6px 0;
    min-width: 120px;
    display: none;
    z-index: 1000;
    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
}
.nano-lang-dropdown.show {
    display: block;
}
.nano-lang-option {
    padding: 8px 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: 0.2s;
    color: #e5e7eb;
    font-size: 12px;
}
.nano-lang-option:hover {
    background: rgba(250, 204, 21, 0.1);
    color: #FACC15;
}
.nano-lang-option.active {
    background: rgba(250, 204, 21, 0.2);
    color: #FACC15;
}
.app-container { display: flex; width: 100%; height: 100%; }
.sidebar {
    width: 380px;
    background: var(--panel-bg);
    backdrop-filter: var(--glass);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    padding: 24px;
    overflow-y: auto;
    z-index: 10;
    position: relative;
}
.main-stage {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at center, #1a1a1d 0%, #000 100%);
    overflow: hidden;
}
.logo-area { display: flex; align-items: center; gap: 12px; margin-bottom: 30px; }
.logo-icon { font-size: 28px; animation: float 3s ease-in-out infinite; }
.logo-text h1 { font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
.logo-text .badge { background: var(--primary); color: #000; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 700; margin-left: 6px; vertical-align: top; }
.control-group { margin-bottom: 24px; }
.label-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
label { font-size: 12px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
textarea, input[type="text"], input[type="number"] {
    width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--border); border-radius: 12px; padding: 14px; color: #fff; font-size: 14px; transition: 0.2s; font-family: inherit; resize: none;
}
textarea:focus, input:focus { border-color: var(--primary); outline: none; background: rgba(0,0,0,0.5); }
.ratio-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; }
.ratio-item {
    background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 8px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; position: relative;
}
.ratio-item:hover { background: rgba(255,255,255,0.1); }
.ratio-item.active { border-color: var(--primary); background: rgba(250, 204, 21, 0.1); color: var(--primary); }
.ratio-shape { border: 2px solid currentColor; opacity: 0.7; }
select { width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--border); padding: 12px; border-radius: 12px; color: white; appearance: none; cursor: pointer; }
.gen-btn {
    width: 100%; background: var(--primary); color: #000; border: none; padding: 16px; border-radius: 14px; font-size: 16px; font-weight: 800; cursor: pointer; transition: 0.3s; box-shadow: 0 4px 20px rgba(250, 204, 21, 0.2); position: relative; overflow: hidden;
}
.gen-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(250, 204, 21, 0.4); }
.gen-btn:active { transform: scale(0.98); }
.gen-btn:disabled { opacity: 0.7; cursor: not-allowed; filter: grayscale(1); }
.tool-btn { background: transparent; border: none; color: var(--text-muted); cursor: pointer; transition: 0.2s; font-size: 14px; }
.tool-btn:hover { color: var(--primary); }
.tool-btn.active { color: var(--primary); }
.quota-box {
    margin-top: auto; padding-top: 20px; border-top: 1px solid var(--border);
}
.quota-info { display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); margin-bottom: 8px; }
.quota-bar { width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden; }
.quota-fill { height: 100%; background: var(--primary); width: 100%; transition: width 0.5s ease; }
.quota-text { font-weight: bold; color: var(--primary); }
#resultImg {
    max-width: 90%; max-height: 85%; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.5); display: none; object-fit: contain; transition: 0.3s; cursor: zoom-in;
}
.placeholder-text { color: rgba(255,255,255,0.1); font-size: 80px; font-weight: 900; user-select: none; }
.history-dock {
    position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); background: rgba(20, 20, 23, 0.8); backdrop-filter: blur(15px); border: 1px solid var(--border); padding: 10px; border-radius: 20px; display: flex; gap: 10px; max-width: 90%; overflow-x: auto; box-shadow: 0 10px 30px rgba(0,0,0,0.5); z-index: 20;
}
.history-item {
    width: 50px; height: 50px; border-radius: 10px; overflow: hidden; cursor: pointer; border: 2px solid transparent; transition: 0.2s; flex-shrink: 0;
}
.history-item img { width: 100%; height: 100%; object-fit: cover; }
.history-item:hover { transform: scale(1.1); z-index: 10; }
.history-item.active { border-color: var(--primary); }
.lightbox {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 1000; display: none; flex-direction: column; justify-content: center; align-items: center; opacity: 0; transition: opacity 0.3s;
}
.lightbox.show { display: flex; opacity: 1; }
.lightbox img { max-width: 95%; max-height: 85vh; border-radius: 8px; box-shadow: 0 0 50px rgba(0,0,0,0.8); }
.lightbox-close { position: absolute; top: 20px; right: 30px; color: #fff; font-size: 40px; cursor: pointer; opacity: 0.7; transition: 0.2s; }
.lightbox-close:hover { opacity: 1; color: var(--primary); }
.lightbox-actions { margin-top: 20px; display: flex; gap: 15px; }
.action-btn { padding: 10px 20px; border-radius: 8px; border: 1px solid var(--border); background: rgba(255,255,255,0.1); color: #fff; cursor: pointer; display: flex; align-items: center; gap: 8px; font-weight: 600; text-decoration: none; transition: 0.2s; }
.action-btn:hover { background: var(--primary); color: #000; border-color: var(--primary); }
.loading-overlay {
    position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(5px); display: none; flex-direction: column; align-items: center; justify-content: center; z-index: 50;
}
.banana-loader { font-size: 60px; animation: spin-bounce 1.5s infinite; margin-bottom: 20px; }
.loading-text { color: var(--primary); font-weight: bold; letter-spacing: 2px; text-transform: uppercase; font-size: 14px; }
@media (max-width: 900px) {
    body { flex-direction: column; overflow-y: auto; height: auto; }
    .sidebar { width: 100%; height: auto; padding-bottom: 100px; border-right: none; }
    .main-stage { height: 50vh; order: -1; border-bottom: 1px solid var(--border); }
    #resultImg { max-height: 90%; }
    .history-dock { bottom: 10px; }
}
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
@keyframes spin-bounce { 0% { transform: scale(1) rotate(0deg); } 50% { transform: scale(1.2) rotate(10deg); } 100% { transform: scale(1) rotate(0deg); } }
.toast { position: fixed; top: 20px; right: 20px; background: #333; border-left: 4px solid var(--primary); color: #fff; padding: 15px 25px; border-radius: 8px; display: none; z-index: 100; box-shadow: 0 10px 30px rgba(0,0,0,0.5); font-size: 14px; animation: slideIn 0.3s forwards; }
@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
/* RTL Support for Nano */
[dir="rtl"]{direction:rtl;text-align:right}
[dir="rtl"] .sidebar{border-right:none;border-left:1px solid var(--border)}
[dir="rtl"] .logo-area{flex-direction:row-reverse}
[dir="rtl"] .label-row{flex-direction:row-reverse}
[dir="rtl"] .ratio-grid{direction:rtl}
[dir="rtl"] .quota-info{flex-direction:row-reverse}
[dir="rtl"] .history-dock{direction:rtl}
[dir="rtl"] .lightbox-actions{flex-direction:row-reverse}
/* 拖放區域樣式 - Nano Pro 版本 */
.nano-drag-drop-zone {
    border: 2px dashed rgba(250, 204, 21, 0.3);
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.2);
    min-height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
}
.nano-drag-drop-zone:hover {
    border-color: rgba(250, 204, 21, 0.6);
    background: rgba(250, 204, 21, 0.08);
}
.nano-drag-drop-zone.drag-over {
    border-color: #FACC15;
    background: rgba(250, 204, 21, 0.2);
    transform: scale(1.02);
}
.nano-drag-drop-zone .drag-icon {
    font-size: 28px;
    opacity: 0.7;
}
.nano-drag-drop-zone .drag-text {
    font-size: 12px;
    color: #9ca3af;
}
.nano-drag-drop-zone .drag-subtext {
    font-size: 10px;
    color: #6b7280;
}
/* Nano Pro 上傳進度條樣式 */
.nano-upload-progress-container {
    width: 100%;
    margin-top: 8px;
    display: none;
}
.nano-upload-progress-container.show {
    display: block;
}
.nano-upload-progress-bar {
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    overflow: hidden;
}
.nano-upload-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #FACC15, #fde047);
    width: 0%;
    transition: width 0.3s ease;
    border-radius: 2px;
}
.nano-upload-progress-text {
    font-size: 10px;
    color: #9ca3af;
    margin-top: 3px;
    text-align: center;
}

/* 方案四：功能區塊重組樣式 */
.core-input-block,
.size-style-block,
.advanced-settings-block,
.action-block,
.prompt-generator-block {
    background: rgba(30, 30, 35, 0.5);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 16px;
    border: 1px solid rgba(250, 204, 21, 0.1);
    transition: all 0.3s ease;
}

.core-input-block:hover,
.size-style-block:hover,
.advanced-settings-block:hover,
.action-block:hover,
.prompt-generator-block:hover {
    border-color: rgba(250, 204, 21, 0.3);
    box-shadow: 0 4px 20px rgba(250, 204, 21, 0.1);
}

/* 可折疊進階設定樣式 */
.collapsible-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding: 12px 16px;
    background: rgba(250, 204, 21, 0.05);
    border-radius: 8px;
    margin-bottom: 12px;
    transition: all 0.3s ease;
    user-select: none;
}

.collapsible-header:hover {
    background: rgba(250, 204, 21, 0.1);
}

.collapsible-header-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    color: #facc15;
}

.collapse-icon {
    transition: transform 0.3s ease;
    font-size: 12px;
    color: #9ca3af;
}

.collapsible-header.collapsed .collapse-icon {
    transform: rotate(-90deg);
}

.collapsible-content {
    max-height: 500px;
    overflow: hidden;
    transition: max-height 0.3s ease, opacity 0.3s ease;
    opacity: 1;
}

.collapsible-content.collapsed {
    max-height: 0;
    opacity: 0;
    padding-top: 0;
    padding-bottom: 0;
}

/* 區塊標題樣式 */
.block-title {
    font-size: 14px;
    font-weight: 600;
    color: #facc15;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.block-title::before {
    content: '';
    width: 3px;
    height: 16px;
    background: linear-gradient(180deg, #facc15, #f59e0b);
    border-radius: 2px;
}

/* 方案三：載入動畫視覺增強 */
.loading-text {
    font-size: 14px;
    color: #FACC15;
    margin-top: 16px;
    text-align: center;
    font-weight: 500;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    animation: textPulse 2s ease-in-out infinite;
}

@keyframes textPulse {
    0%, 100% {
        opacity: 1;
        transform: scale(1);
    }
    50% {
        opacity: 0.8;
        transform: scale(1.02);
    }
}

.banana-loader {
    font-size: 48px;
    animation: bananaBounce 1s ease-in-out infinite;
}

@keyframes bananaBounce {
    0%, 100% {
        transform: translateY(0) rotate(0deg);
    }
    25% {
        transform: translateY(-10px) rotate(-5deg);
    }
    50% {
        transform: translateY(0) rotate(0deg);
    }
    75% {
        transform: translateY(-10px) rotate(5deg);
    }
}

.loading-overlay {
    backdrop-filter: blur(8px);
    background: rgba(15, 15, 17, 0.85);
}

/* 載入狀態文字過渡效果 */
.loading-text.state-change {
    animation: stateTransition 0.5s ease-out;
}

@keyframes stateTransition {
    0% {
        opacity: 0;
        transform: translateY(10px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 方案三：比例預覽樣式 */
.ratio-preview-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(15, 15, 17, 0.9);
    border: 2px solid #FACC15;
    border-radius: 8px;
    padding: 16px;
    display: none;
    z-index: 10;
    backdrop-filter: blur(8px);
    animation: fadeIn 0.3s ease;
}

.ratio-preview-overlay.show {
    display: block;
}

.ratio-preview-box {
    background: rgba(250, 204, 21, 0.1);
    border: 2px dashed #FACC15;
    border-radius: 4px;
    margin: 0 auto;
    transition: all 0.3s ease;
}

.ratio-preview-info {
    text-align: center;
    color: #FACC15;
    font-size: 14px;
    margin-top: 12px;
    font-weight: 500;
}

.ratio-preview-dimensions {
    text-align: center;
    color: #9ca3af;
    font-size: 12px;
    margin-top: 4px;
}

/* 方案三：風格按鈕懸停預覽樣式 */
.style-preview-tooltip {
    position: fixed;
    background: rgba(15, 15, 17, 0.95);
    border: 1px solid rgba(250, 204, 21, 0.3);
    border-radius: 8px;
    padding: 12px 16px;
    z-index: 1000;
    display: none;
    pointer-events: none;
    backdrop-filter: blur(8px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    animation: tooltipFadeIn 0.2s ease;
    max-width: 200px;
}

.style-preview-tooltip.show {
    display: block;
}

.style-preview-title {
    color: #FACC15;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 4px;
}

.style-preview-desc {
    color: #9ca3af;
    font-size: 12px;
    line-height: 1.4;
}

@keyframes tooltipFadeIn {
    from {
        opacity: 0;
        transform: translateY(5px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

/* 比例項目懸停效果 */
.ratio-item:hover {
    transform: scale(1.1);
    box-shadow: 0 0 12px rgba(250, 204, 21, 0.4);
}

/* 風格快捷按鈕懸停效果 */
.style-shortcut-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(250, 204, 21, 0.3);
}

/* 方案三：歷史記錄改進樣式 */
.history-item {
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 8px;
    overflow: hidden;
}

.history-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

/* 縮圖懸停放大效果 */
.history-item:hover img {
    transform: scale(1.15);
}

/* 歷史記錄項目操作按鈕 */
.history-item-actions {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    gap: 4px;
    padding: 4px;
    background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.history-item:hover .history-item-actions {
    opacity: 1;
}

.history-action-btn {
    width: 24px;
    height: 24px;
    border: none;
    border-radius: 4px;
    background: rgba(15, 15, 17, 0.9);
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    transition: all 0.2s ease;
}

.history-action-btn:hover {
    background: #FACC15;
    color: #000;
    transform: scale(1.1);
}

.history-action-btn.delete:hover {
    background: #ef4444;
    color: #fff;
}

/* 歷史記錄項目拖曳樣式 */
.history-item.dragging {
    opacity: 0.5;
    transform: scale(0.95);
}

.history-item.drag-over {
    border: 2px dashed #FACC15;
}

/* 歷史記錄項目激活狀態 */
.history-item.active {
    border: 2px solid #FACC15;
    box-shadow: 0 0 12px rgba(250, 204, 21, 0.5);
}

.history-item.active::after {
    content: '✓';
    position: absolute;
    top: 4px;
    left: 4px;
    background: #FACC15;
    color: #000;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
}
</style>
</head>
<body>
    <div id="toast" class="toast"></div>

    <div class="app-container">
        <!-- Sidebar Controls -->
        <div class="sidebar">
            <div class="logo-area">
                <div class="logo-icon">🍌</div>
                <div class="logo-text">
                    <h1>Nano Pro <span class="badge">V11.7</span></h1>
                    <p style="color:#666; font-size:12px">Flux Engine • Pro Model • Pollinations AI</p>
                    <div style="font-size:11px; color:#22c55e; margin-top:4px; display:flex; align-items:center; gap:4px">
                        <script id="_waudw4">var _wau = _wau || []; _wau.push(["small", "yuynsazz1f", "dw4"]);</script><script async src="//waust.at/s.js"></script>
                    </div>
                </div>
                <div style="position:relative">
                    <button class="nano-lang-btn" id="nanoLangSwitch">
                        <span id="nanoCurrentLangFlag">🇹🇼</span>
                        <span id="nanoCurrentLangName">繁體中文</span>
                        <span style="margin-left:2px">▼</span>
                    </button>
                    <div class="nano-lang-dropdown" id="nanoLangDropdown">
                        <div class="nano-lang-option" data-lang="auto">
                            <span>🌐</span>
                            <span>自動偵測</span>
                        </div>
                        <div class="nano-lang-option" data-lang="zh">
                            <span>🇹🇼</span>
                            <span>繁體中文</span>
                        </div>
                        <div class="nano-lang-option" data-lang="en">
                            <span>🇺🇸</span>
                            <span>English</span>
                        </div>
                        <div class="nano-lang-option" data-lang="ja">
                            <span>🇯🇵</span>
                            <span>日本語</span>
                        </div>
                        <div class="nano-lang-option" data-lang="ko">
                            <span>🇰🇷</span>
                            <span>한국어</span>
                        </div>
                        <div class="nano-lang-option" data-lang="ar">
                            <span>🇸🇦</span>
                            <span>العربية</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ====== 區塊 1: 核心輸入 ====== -->
            <div class="control-group core-input-block">
                <div class="label-row">
                    <label>Prompt</label>
                    <button class="tool-btn" id="randomBtn" title="隨機隨機靈感">🎲 靈感骰子</button>
                </div>
                <textarea id="prompt" rows="4" placeholder="描述你想像中的畫面... (支援中文)"></textarea>
            </div>
         
            <!-- ====== 區塊 2: 尺寸與風格 ====== -->
            <div class="control-group size-style-block">
                <label id="ratioLabel" style="margin-bottom:10px; display:block">畫布比例</label>
                <div class="ratio-grid">
                    <div class="ratio-item active" data-w="1024" data-h="1024" title="1:1 方形">
                        <div class="ratio-shape" style="width:14px; height:14px;"></div>
                    </div>
                    <div class="ratio-item" data-w="1080" data-h="1350" title="4:5 IG">
                        <div class="ratio-shape" style="width:12px; height:15px;"></div>
                    </div>
                    <div class="ratio-item" data-w="1080" data-h="1920" title="9:16 限動">
                        <div class="ratio-shape" style="width:9px; height:16px;"></div>
                    </div>
                    <div class="ratio-item" data-w="1920" data-h="1080" title="16:9 桌布">
                        <div class="ratio-shape" style="width:16px; height:9px;"></div>
                    </div>
                    <div class="ratio-item" data-w="2048" data-h="858" title="21:9 電影">
                        <div class="ratio-shape" style="width:18px; height:7px;"></div>
                    </div>
                    <div class="ratio-item" data-w="2048" data-h="2048" title="2K 方形">
                        <div class="ratio-shape" style="width:14px; height:14px; border: 2px solid #FACC15;"></div>
                    </div>
                    <div class="ratio-item" data-w="3840" data-h="2160" title="2K 16:9">
                        <div class="ratio-shape" style="width:16px; height:9px; border: 2px solid #FACC15;"></div>
                    </div>
                    <div class="ratio-item" data-w="2160" data-h="3840" title="2K 9:16">
                        <div class="ratio-shape" style="width:9px; height:16px; border: 2px solid #FACC15;"></div>
                    </div>
                    <div class="ratio-item" data-w="4096" data-h="4096" title="4K 方形">
                        <div class="ratio-shape" style="width:14px; height:14px; border: 2px solid #8B5CF6;"></div>
                    </div>
                    <div class="ratio-item" data-w="7680" data-h="4320" title="4K 16:9">
                        <div class="ratio-shape" style="width:16px; height:9px; border: 2px solid #8B5CF6;"></div>
                    </div>
                    <div class="ratio-item" data-w="4320" data-h="7680" title="4K 9:16">
                        <div class="ratio-shape" style="width:9px; height:16px; border: 2px solid #8B5CF6;"></div>
                    </div>
                </div>
                <input type="hidden" id="width" value="1024">
                <input type="hidden" id="height" value="1024">
            </div>
         
            <div class="control-group size-style-block">
                <div class="label-row">
                    <label id="styleLabel">風格選擇</label>
                </div>
                <select id="style" style="width: 100%; margin-bottom: 10px;">
                    <!-- 風格選項將由 JavaScript 動態生成 -->
                </select>
                
                <label style="font-size: 12px; color: #9ca3af; margin-bottom: 8px; display: block;">常用風格快捷鍵</label>
                <div class="style-shortcuts" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px;">
                    <button class="style-shortcut-btn" data-style="photorealistic" title="寫實">📷</button>
                    <button class="style-shortcut-btn" data-style="anime" title="動漫">🎭</button>
                    <button class="style-shortcut-btn" data-style="oil-painting" title="油畫">🖼️</button>
                    <button class="style-shortcut-btn" data-style="cyberpunk" title="賽博龐克">🌆</button>
                    <button class="style-shortcut-btn" data-style="watercolor" title="水彩">💧</button>
                    <button class="style-shortcut-btn" data-style="sketch" title="素描">✏️</button>
                    <button class="style-shortcut-btn" data-style="3d-render" title="3D渲染">🎮</button>
                    <button class="style-shortcut-btn" data-style="pixel-art" title="像素title="像素藝術">👾</button>
                    <button class="style-shortcut-btn" data-style="cinematic" title="電影感">🎬</button>
                    <button class="style-shortcut-btn" data-style="none" title="無風格">⚡</button>
                </div>
            </div>
         
            <!-- ====== 區塊 3: 進階設定 (可折疊) ====== -->
            <div class="control-group advanced-settings-block">
                <div class="collapsible-header" id="advancedSettingsHeader">
                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                        <span style="font-size: 16px;">⚙️</span>
                        <span style="font-weight: 700;">進階設定</span>
                        <span class="collapse-icon">▼</span>
                    </label>
                </div>
                <div class="collapsible-content" id="advancedSettingsContent">
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                        <div style="position:relative">
                            <label style="font-size: 11px; color: #9ca3af; display: block; margin-bottom: 4px;">Seed</label>
                            <input type="number" id="seed" placeholder="Seed" value="-1" disabled style="width: 100%; padding-right:30px">
                            <button id="lockSeedBtn" class="tool-btn" style="position:absolute; right:10px; top:50%; transform:translateY(-50%)">🎲</button>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 10px;">
                        <label id="negativeLabel">排除 (Negative)</label>
                        <input type="text" id="negative" value="nsfw, ugly, text, watermark, low quality, bad anatomy" style="font-size:12px; color:#aaa; width: 100%;">
                    </div>
                    
                    <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1)); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 12px; padding: 16px;">
                        <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px; color: #8B5CF6;">
                            <span style="font-size: 14px;">🎯</span>
                            <span style="font-weight: 700;">Gemini 3 Pro 參數</span>
                        </label>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                            <div>
                                <label style="font-size: 11px; color: #9ca3af; display: block; margin-bottom: 4px;">Steps (生成步數)</label>
                                <input type="number" id="nanoSteps" value="30" min="10" max="100" style="width: 100%; background: rgba(0,0,0,0.3); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 6px; padding: 8px; color: #fff;">
                            </div>
                            <div>
                                <label style="font-size: 11px; color: #9ca3af; display: block; margin-bottom: 4px;">Guidance (引導係數)</label>
                                <input type="number" id="nanoGuidance" value="7.5" min="1" max="20" step="0.5" style="width: 100%; background: rgba(0,0,0,0.3); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 6px; padding: 8px; color: #fff;">
                            </div>
                        </div>
                        
                        <div>
                            <label style="font-size: 11px; color: #9ca3af; display: block; margin-bottom: 4px;">質量模式</label>
                            <select id="nanoQuality" style="width: 100%; background: rgba(0,0,0,0.3); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 6px; padding: 8px; color: #fff;">
                                <option value="economy">Economy (快速)</option>
                                <option value="standard" selected>Standard (平衡)</option>
                                <option value="ultra">Ultra HD (極致)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
         
            <!-- ====== 區塊 4: 操作區域 ====== -->
            <div class="control-group action-block">
                <button id="genBtn" class="gen-btn">
                    <span id="genBtnText">生成圖像</span>
                    <span id="genBtnCost" style="font-size:12px; opacity:0.6; font-weight:400; display:block; margin-top:4px">Gemini 3 Pro 🌟</span>
                </button>
                
                <div class="quota-box">
                    <div class="quota-info">
                        <span id="quotaLabel">每分鐘能量</span>
                        <span id="quotaText" class="quota-text">3 / 3</span>
                    </div>
                    <div class="quota-bar">
                        <div id="quotaFill" class="quota-fill"></div>
                    </div>
                    <div style="font-size:10px; color:#9ca3af; margin-top:6px; text-align:center;">支援 2K / 4K 輸出</div>
                </div>
            </div>
         
            <!-- ====== AI 提示詞生成器 (移至底部) ====== -->
            <div class="control-group prompt-generator-block" style="background: linear-gradient(135deg, rgba(250, 204, 21, 0.1), rgba(139, 92, 246, 0.1)); border: 1px solid rgba(250, 204, 21, 0.3); border-radius: 12px; padding: 16px; margin-top: 16px;">
                <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px; color: var(--primary);">
                    <span style="font-size: 16px;">🤖</span>
                    <span id="promptGeneratorTitle" style="font-weight: 700;">AI 提示詞生成器</span>
                    <span style="font-size: 9px; background: rgba(250, 204, 21, 0.3); padding: 2px 6px; border-radius: 8px; margin-left: auto;">Pollinations</span>
                </label>
                
                <div style="margin-bottom: 8px;">
                    <label id="promptGeneratorUploadLabel" style="font-size: 10px; color: #9ca3af; margin-bottom: 4px; display: block;">上傳參考圖片 (可選)</label>
                    <input type="file" id="nanoPromptImageUpload" accept="image/*" style="display:none">
                    <div id="nanoPromptImageDropZone" class="nano-drag-drop-zone">
                        <div class="drag-icon">📷</div>
                        <div class="drag-text" id="promptGeneratorSelectText">拖放圖片或點擊選擇</div>
                        <div class="drag-subtext">支援 JPG, PNG, GIF (最大 32MB)</div>
                        <div id="nanoPromptImageUploadProgress" class="nano-upload-progress-container">
                            <div class="nano-upload-progress-bar">
                                <div class="nano-upload-progress-fill" id="nanoPromptImageUploadProgressFill"></div>
                            </div>
                            <div class="nano-upload-progress-text" id="nanoPromptImageUploadProgressText">上傳中... 0%</div>
                        </div>
                    </div>
                    <button type="button" id="nanoPromptImageClearBtn"
                            style="width: 100%; margin-top: 6px; background: rgba(239, 68, 68, 0.2); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.4); padding: 6px 10px; border-radius: 6px; font-size: 11px; cursor: pointer; display: none;">
                        <span>✕ 清除圖片</span>
                    </button>
                    <div id="nanoPromptImagePreview" style="display: none; margin-top: 6px;">
                        <img id="nanoPromptImagePreviewImg" src="" alt="預覽" style="max-width: 100%; max-height: 80px; border-radius: 6px; border: 1px solid rgba(250, 204, 21, 0.3);">
                    </div>
                </div>
                
                <textarea id="nanoPromptInput" placeholder="描述你想要的畫面..."
                          rows="2" style="width: 100%; background: rgba(0,0,0,0.3); border: 1px solid rgba(250, 204, 21, 0.3); border-radius: 8px; padding: 10px; color: #fff; font-size: 12px; resize: none; margin-bottom: 8px;"></textarea>
                
                <div style="display: flex; gap: 8px;">
                    <button type="button" id="nanoGeneratePromptBtn"
                            style="flex: 1; background: var(--primary); color: #000; border: none; padding: 10px 12px; border-radius: 8px; font-weight: 700; font-size: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px;">
                        <span>✨</span>
                        <span id="promptGeneratorGenerateText">生成</span>
                    </button>
                    <button type="button" id="nanoApplyPromptBtn"
                            style="flex: 1; background: rgba(34, 197, 94, 0.2); color: #22c55e; border: 1px solid rgba(34, 197, 94, 0.4); padding: 10px 12px; border-radius: 8px; font-weight: 700; font-size: 12px; cursor: pointer; display: none;">
                        <span>✓</span>
                        <span id="promptGeneratorApplyText">應用</span>
                    </button>
                </div>
                
                <div id="nanoGeneratedPromptContainer" style="display: none; margin-top: 8px;">
                    <div id="nanoGeneratedPrompt"
                         style="background: rgba(250, 204, 21, 0.1); border: 1px solid rgba(250, 204, 21, 0.3); border-radius: 8px; padding: 10px; color: #fef3c7; font-size: 11px; line-height: 1.5; max-height: 100px; overflow-y: auto; white-space: pre-wrap;"></div>
                </div>
                
                <div id="nanoPromptGeneratorStatus" style="font-size: 10px; color: #9ca3af; margin-top: 6px; display: none;"></div>
            </div>
        </div>

        <div class="main-stage">
            <div id="placeholderText" class="placeholder-text">NANOPRO</div>
            <img id="resultImg" alt="Generated Image" title="點擊放大">
            
            <!-- 方案三：比例預覽覆蓋層 -->
            <div id="ratioPreviewOverlay" class="ratio-preview-overlay">
                <div id="ratioPreviewBox" class="ratio-preview-box"></div>
                <div id="ratioPreviewInfo" class="ratio-preview-info"></div>
                <div id="ratioPreviewDimensions" class="ratio-preview-dimensions"></div>
            </div>
            
            <div class="loading-overlay">
                <div class="banana-loader">🍌</div>
                <div id="loadingText" class="loading-text">正在注入 AI 能量...</div>
            </div>

            <div class="history-dock" id="historyStrip">
                <!-- History Items -->
            </div>
        </div>
    </div>

    <!-- 方案三：風格預覽提示框 -->
    <div id="stylePreviewTooltip" class="style-preview-tooltip">
        <div id="stylePreviewTitle" class="style-preview-title"></div>
        <div id="stylePreviewDesc" class="style-preview-desc"></div>
    </div>
            </div>
        </div>
    </div>
    
    <div class="lightbox" id="lightbox">
        <div class="lightbox-close" id="lbClose">×</div>
        <img id="lbImg" src="">
        <div class="lightbox-actions">
            <a id="lbDownload" class="action-btn" download="nano-banana-art.png" href="#">
                <span id="lightboxSaveText">📥 保存圖片</span>
            </a>
            <button class="action-btn" onclick="document.getElementById('lbClose').click()">
                <span id="lightboxCloseText">❌ 關閉</span>
            </button>
        </div>
    </div>

    <div class="footer">
    </div>
</div>
<script>
    // ====== Nano I18N 多語言支援 ======
    const NANO_I18N = {
        zh: {
            prompt_label: "Prompt",
            random_btn: "🎲 靈感骰子",
            prompt_placeholder: "描述你想像中的畫面... (支援中文)",
            ratio_label: "畫布比例",
            style_label: "風格 & 設定",
            style_none: "✨ 智能無風格",
            style_photorealistic: "📷 寫實照片",
            style_anime: "🌸 日系動漫",
            style_3d_render: "🧊 3D 渲染",
            style_cyberpunk: "🌃 賽博龐克",
            style_manga: "📖 黑白漫畫",
            style_oil_painting: "🎨 古典油畫",
            seed_placeholder: "Seed",
            negative_label: "排除 (Negative)",
            negative_default: "nsfw, ugly, text, watermark, low quality, bad anatomy",
            prompt_generator_title: "AI 提示詞生成器",
            prompt_generator_upload: "上傳參考圖片 (可選)",
            prompt_generator_select: "選擇圖片",
            prompt_generator_placeholder: "描述你想要的畫面...",
            prompt_generator_generate: "生成",
            prompt_generator_apply: "應用",
            prompt_generator_generating: "生成中...",
            prompt_generator_uploading: "正在上傳圖片...",
            prompt_generator_success: "✅ 生成成功！",
            prompt_generator_applied: "✓ 已應用",
            prompt_generator_error_input: "請輸入畫面描述或上傳圖片",
            prompt_generator_error_upload: "❌ 圖片上傳失敗: ",
            prompt_generator_error_generate: "❌ 失敗: ",
            prompt_generator_generating_text: "正在使用 Pollinations 生成專業提示詞...",
            prompt_generator_image_uploaded: "✓ 圖片已上傳",
            prompt_generator_image_error: "圖片讀取失敗",
            prompt_generator_error_size: "圖片太大！最大 32MB",
            prompt_generator_error_type: "請選擇圖片文件",
            gen_btn: "生成圖像",
            gen_btn_cost: "消耗 1 香蕉能量 🍌",
            gen_btn_charging: "⚡ 能量回充中... ({s}s)",
            gen_btn_depleted: "本分鐘能量已耗盡",
            gen_btn_depleted_sub: "請稍後再來",
            quota_label: "每分鐘能量",
            placeholder_text: "NANOPRO",
            loading_text: "正在注入 AI 能量...",
            loading_state_1: "🎨 正在創作...",
            loading_state_2: "✨ 添加細節...",
            loading_state_3: "🖼️ 生成圖像...",
            loading_state_4: "⏳ 即將完成...",
            toast_no_prompt: "⚠️ 請輸入提示詞",
            toast_energy_depleted: "🚫 本分鐘能量已耗盡，請稍後再來！",
            toast_error: "❌ ",
            lightbox_save: "📥 保存圖片",
            lightbox_close: "❌ 關閉"
        },
        en: {
            prompt_label: "Prompt",
            random_btn: "🎲 Random Idea",
            prompt_placeholder: "Describe the image you want... (Chinese supported)",
            ratio_label: "Canvas Ratio",
            style_label: "Style & Settings",
            style_none: "✨ Smart No Style",
            style_photorealistic: "📷 Photorealistic",
            style_anime: "🌸 Anime",
            style_3d_render: "🧊 3D Render",
            style_cyberpunk: "🌃 Cyberpunk",
            style_manga: "📖 Manga",
            style_oil_painting: "🎨 Oil Painting",
            style_watercolor: "💧 Watercolor",
            style_sketch: "✏️ Sketch",
            style_pixel_art: "👾 Pixel Art",
            style_cinematic: "🎬 Cinematic",
            seed_placeholder: "Seed",
            negative_label: "Negative",
            negative_default: "nsfw, ugly, text, watermark, low quality, bad anatomy",
            prompt_generator_title: "AI Prompt Generator",
            prompt_generator_upload: "Upload Reference Image (Optional)",
            prompt_generator_select: "Select Image",
            prompt_generator_placeholder: "Describe the image you want...",
            prompt_generator_generate: "Generate",
            prompt_generator_apply: "Apply",
            prompt_generator_generating: "Generating...",
            prompt_generator_uploading: "Uploading image...",
            prompt_generator_success: "✅ Generated successfully!",
            prompt_generator_applied: "✓ Applied",
            prompt_generator_error_input: "Please enter a description or upload an image",
            prompt_generator_error_upload: "❌ Upload failed: ",
            prompt_generator_error_generate: "❌ Failed: ",
            prompt_generator_generating_text: "Generating professional prompt with Pollinations...",
            prompt_generator_image_uploaded: "✓ Image uploaded",
            prompt_generator_image_error: "Image read failed",
            prompt_generator_error_size: "Image too large! Max 32MB",
            prompt_generator_error_type: "Please select an image file",
            gen_btn: "Generate Image",
            gen_btn_cost: "Consume 1 Banana Energy 🍌",
            gen_btn_charging: "⚡ Energy Charging... ({s}s)",
            gen_btn_depleted: "Energy Depleted This Minute",
            gen_btn_depleted_sub: "Please come back later",
            quota_label: "Minute Energy",
            placeholder_text: "NANOPRO",
            loading_text: "Injecting AI Energy...",
            loading_state_1: "🎨 Creating...",
            loading_state_2: "✨ Adding details...",
            loading_state_3: "🖼️ Generating image...",
            loading_state_4: "⏳ Almost done...",
            toast_no_prompt: "⚠️ Please enter a prompt",
            toast_energy_depleted: "🚫 Energy depleted this minute, please come back later!",
            toast_error: "❌ ",
            lightbox_save: "📥 Save Image",
            lightbox_close: "❌ Close"
        },
        ja: {
            prompt_label: "Prompt",
            random_btn: "🎲 ランダムアイデア",
            prompt_placeholder: "想像する画像を説明してください... (中国語対応)",
            ratio_label: "キャンバス比率",
            style_label: "スタイル & 設定",
            style_none: "✨ スマートスタイルなし",
            style_photorealistic: "📷 写実的",
            style_anime: "🌸 アニメ",
            style_3d_render: "🧊 3Dレンダリング",
            style_cyberpunk: "🌃 サイバーパンク",
            style_manga: "📖 漫画",
            style_oil_painting: "🎨 油絵",
            style_watercolor: "💧 水彩画",
            style_sketch: "✏️ スケッチ",
            style_pixel_art: "👾 ピクセルアート",
            style_cinematic: "🎬 映画的",
            seed_placeholder: "Seed",
            negative_label: "ネガティブ",
            negative_default: "nsfw, ugly, text, watermark, low quality, bad anatomy",
            prompt_generator_title: "AI プロンプトジェネレーター",
            prompt_generator_upload: "参照画像をアップロード（任意）",
            prompt_generator_select: "画像を選択",
            prompt_generator_placeholder: "作成したい画像を説明してください...",
            prompt_generator_generate: "生成",
            prompt_generator_apply: "適用",
            prompt_generator_generating: "生成中...",
            prompt_generator_uploading: "画像をアップロード中...",
            prompt_generator_success: "✅ 生成成功！",
            prompt_generator_applied: "✓ 適用済み",
            prompt_generator_error_input: "説明を入力するか画像をアップロードしてください",
            prompt_generator_error_upload: "❌ アップロード失敗: ",
            prompt_generator_error_generate: "❌ 失敗: ",
            prompt_generator_generating_text: "Pollinationsでプロンプトを生成中...",
            prompt_generator_image_uploaded: "✓ 画像アップロード済み",
            prompt_generator_image_error: "画像の読み取りに失敗しました",
            prompt_generator_error_size: "画像が大きすぎます！最大32MB",
            prompt_generator_error_type: "画像ファイルを選択してください",
            gen_btn: "画像を生成",
            gen_btn_cost: "バナナエネルギー1消費 🍌",
            gen_btn_charging: "⚡ エネルギー充電中... ({s}s)",
            gen_btn_depleted: "今分のエネルギーが枯渇しました",
            gen_btn_depleted_sub: "後でもう一度お越しください",
            quota_label: "1分あたりのエネルギー",
            placeholder_text: "NANOPRO",
            loading_text: "AIエネルギーを注入中...",
            loading_state_1: "🎨 創作中...",
            loading_state_2: "✨ ディテールを追加中...",
            loading_state_3: "🖼️ 画像を生成中...",
            loading_state_4: "⏳ まもなく完了...",
            toast_no_prompt: "⚠️ プロンプトを入力してください",
            toast_energy_depleted: "🚫 今分のエネルギーが枯渇しました。後でもう一度お越しください！",
            toast_error: "❌ ",
            lightbox_save: "📥 画像を保存",
            lightbox_close: "❌ 閉じる"
        },
        ko: {
            prompt_label: "Prompt",
            random_btn: "🎲 랜덤 아이디어",
            prompt_placeholder: "원하는 이미지를 설명하세요... (중국어 지원)",
            ratio_label: "캔버스 비율",
            style_label: "스타일 & 설정",
            style_none: "✨ 스마트 스타일 없음",
            style_photorealistic: "📷 사실적",
            style_anime: "🌸 애니메이션",
            style_3d_render: "🧊 3D 렌더링",
            style_cyberpunk: "🌃 사이버펑크",
            style_manga: "📖 만화",
            style_oil_painting: "🎨 유화",
            style_watercolor: "💧 수채화",
            style_sketch: "✏️ 스케치",
            style_pixel_art: "👾 픽셀 아트",
            style_cinematic: "🎬 시네마틱",
            seed_placeholder: "Seed",
            negative_label: "네거티브",
            negative_default: "nsfw, ugly, text, watermark, low quality, bad anatomy",
            prompt_generator_title: "AI 프롬프트 생성기",
            prompt_generator_upload: "참조 이미지 업로드 (선택 사항)",
            prompt_generator_select: "이미지 선택",
            prompt_generator_placeholder: "원하는 이미지를 설명하세요...",
            prompt_generator_generate: "생성",
            prompt_generator_apply: "적용",
            prompt_generator_generating: "생성 중...",
            prompt_generator_uploading: "이미지 업로드 중...",
            prompt_generator_success: "✅ 생성 성공!",
            prompt_generator_applied: "✓ 적용됨",
            prompt_generator_error_input: "설명을 입력하거나 이미지를 업로드하세요",
            prompt_generator_error_upload: "❌ 업로드 실패: ",
            prompt_generator_error_generate: "❌ 실패: ",
            prompt_generator_generating_text: "Pollinations로 프롬프트 생성 중...",
            prompt_generator_image_uploaded: "✓ 이미지 업로드됨",
            prompt_generator_image_error: "이미지 읽기 실패",
            prompt_generator_error_size: "이미지가 너무 큽니다! 최대 32MB",
            prompt_generator_error_type: "이미지 파일을 선택하세요",
            gen_btn: "이미지 생성",
            gen_btn_cost: "바나나 에너지 1 소비 🍌",
            gen_btn_charging: "⚡ 에너지 충전 중... ({s}s)",
            gen_btn_depleted: "이번 분 에너지 소진됨",
            gen_btn_depleted_sub: "나중에 다시 방문해주세요",
            quota_label: "분당 에너지",
            placeholder_text: "NANOPRO",
            loading_text: "AI 에너지 주입 중...",
            loading_state_1: "🎨 창작 중...",
            loading_state_2: "✨ 디테일 추가 중...",
            loading_state_3: "🖼️ 이미지 생성 중...",
            loading_state_4: "⏳ 곧 완료...",
            toast_no_prompt: "⚠️ 프롬프트를 입력하세요",
            toast_energy_depleted: "🚫 이번 분 에너지가 소진되었습니다. 나중에 다시 방문해주세요！",
            toast_error: "❌ ",
            lightbox_save: "📥 이미지 저장",
            lightbox_close: "❌ 닫기"
        },
        ar: {
            prompt_label: "Prompt",
            random_btn: "🎲 نرد الإلهام",
            prompt_placeholder: "صف الصورة التي تريدها... (يدعم العربية)",
            ratio_label: "نسبة اللوحة",
            style_label: "النمط والإعدادات",
            style_none: "✨ بدون نمط ذكي",
            style_photorealistic: "📷 واقعي",
            style_anime: "🌸 أنمي",
            style_3d_render: "🧊 عرض ثلاثي الأبعاد",
            style_cyberpunk: "🌃 سايبربانك",
            style_manga: "📖 مانغا",
            style_oil_painting: "🎨 رسم زيتي",
            style_watercolor: "💧 ألوان مائية",
            style_sketch: "✏️ رسم تخطيطي",
            style_pixel_art: "👾 فن البكسل",
            style_cinematic: "🎬 سينمائي",
            seed_placeholder: "Seed",
            negative_label: "سلبي",
            negative_default: "nsfw, ugly, text, watermark, low quality, bad anatomy",
            prompt_generator_title: "مولد المطالبات AI",
            prompt_generator_upload: "رفع صورة مرجعية (اختياري)",
            prompt_generator_select: "اختر صورة",
            prompt_generator_placeholder: "صف الصورة التي تريدها...",
            prompt_generator_generate: "إنشاء",
            prompt_generator_apply: "تطبيق",
            prompt_generator_generating: "جاري الإنشاء...",
            prompt_generator_uploading: "جاري رفع الصورة...",
            prompt_generator_success: "✅ تم الإنشاء بنجاح!",
            prompt_generator_applied: "✓ تم التطبيق",
            prompt_generator_error_input: "يرجى إدخال وصف أو رفع صورة",
            prompt_generator_error_upload: "❌ فشل الرفع: ",
            prompt_generator_error_generate: "❌ فشل: ",
            prompt_generator_generating_text: "جاري إنشاء موجه احترافي باستخدام Pollinations...",
            prompt_generator_image_uploaded: "✓ تم رفع الصورة",
            prompt_generator_image_error: "فشل قراءة الصورة",
            prompt_generator_error_size: "الصورة كبيرة جدًا! الحد الأقصى 32 ميجابايت",
            prompt_generator_error_type: "يرجى اختيار ملف صورة",
            gen_btn: "إنشاء صورة",
            gen_btn_cost: "استهلاك 1 طاقة موز 🍌",
            gen_btn_charging: "⚡ إعادة شحن الطاقة... ({s}s)",
            gen_btn_depleted: "نفدت الطاقة لهذه الدقيقة",
            gen_btn_depleted_sub: "يرجى العودة لاحقًا",
            quota_label: "الطاقة لكل دقيقة",
            placeholder_text: "NANOPRO",
            loading_text: "حقن طاقة AI...",
            loading_state_1: "🎨 جاري الإبداع...",
            loading_state_2: "✨ إضافة التفاصيل...",
            loading_state_3: "🖼️ إنشاء الصورة...",
            loading_state_4: "⏳ على وشك الانتهاء...",
            toast_no_prompt: "⚠️ يرجى إدخال موجه",
            toast_energy_depleted: "🚫 نفدت الطاقة لهذه الدقيقة، يرجى العودة لاحقًا!",
            toast_error: "❌ ",
            lightbox_save: "📥 حفظ الصورة",
            lightbox_close: "❌ إغلاق"
        }
    };

    const NANO_LANGUAGE_CONFIG = {
        auto: { name: "自動偵測", flag: "🌐", direction: "ltr" },
        zh: { name: "繁體中文", flag: "🇹🇼", direction: "ltr" },
        en: { name: "English", flag: "🇺🇸", direction: "ltr" },
        ja: { name: "日本語", flag: "🇯🇵", direction: "ltr" },
        ko: { name: "한국어", flag: "🇰🇷", direction: "ltr" },
        ar: { name: "العربية", flag: "🇸🇦", direction: "rtl" }
    };

    let nanoCurLang = 'zh';
    let nanoAutoDetect = false;
    const NANO_AUTO_DETECT_KEY = 'nano-flux-auto-detect';

    // 偵測系統語言
    function nanoDetectSystemLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0];
        if (NANO_I18N[langCode]) return langCode;
        return 'zh';
    }

    // 偵測並載入保存的語言
    function nanoDetectLanguage() {
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        if (langParam && NANO_I18N[langParam]) {
            nanoAutoDetect = false;
            localStorage.setItem(NANO_AUTO_DETECT_KEY, 'false');
            return langParam;
        }
        
        const savedAutoDetect = localStorage.getItem(NANO_AUTO_DETECT_KEY);
        if (savedAutoDetect === 'true') {
            nanoAutoDetect = true;
            return nanoDetectSystemLanguage();
        }
        
        const savedLang = localStorage.getItem('nano-flux-language');
        if (savedLang && NANO_I18N[savedLang]) return savedLang;
        
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0];
        if (NANO_I18N[langCode]) return langCode;
        
        return 'zh';
    }

    // 初始化語言
    nanoCurLang = nanoDetectLanguage();
    localStorage.setItem('nano-flux-language', nanoCurLang);

    // 更新語言切換按鈕
    function nanoUpdateLangButton() {
        let config;
        if (nanoAutoDetect) {
            config = NANO_LANGUAGE_CONFIG['auto'];
            document.getElementById('nanoCurrentLangFlag').textContent = config.flag;
            document.getElementById('nanoCurrentLangName').textContent = config.name;
        } else {
            config = NANO_LANGUAGE_CONFIG[nanoCurLang];
            document.getElementById('nanoCurrentLangFlag').textContent = config.flag;
            document.getElementById('nanoCurrentLangName').textContent = config.name;
        }
        
        document.querySelectorAll('.nano-lang-option').forEach(opt => {
            if (nanoAutoDetect) {
                opt.classList.toggle('active', opt.dataset.lang === 'auto');
            } else {
                opt.classList.toggle('active', opt.dataset.lang === nanoCurLang);
            }
        });
    }

    // 切換語言
    function nanoSetLanguage(lang) {
        // 處理自動偵測選項
        if (lang === 'auto') {
            nanoAutoDetect = true;
            localStorage.setItem(NANO_AUTO_DETECT_KEY, 'true');
            nanoCurLang = nanoDetectSystemLanguage();
            localStorage.setItem('nano-flux-language', nanoCurLang);
        } else {
            nanoAutoDetect = false;
            localStorage.setItem(NANO_AUTO_DETECT_KEY, 'false');
            if (!NANO_I18N[lang]) return;
            nanoCurLang = lang;
            localStorage.setItem('nano-flux-language', lang);
        }
        
        // 更新 RTL 方向
        const langConfig = NANO_LANGUAGE_CONFIG[nanoCurLang];
        if (langConfig && langConfig.direction === 'rtl') {
            document.documentElement.setAttribute('dir', 'rtl');
        } else {
            document.documentElement.removeAttribute('dir');
        }
        
        nanoUpdateLang();
        nanoUpdateLangButton();
    }

    // 獲取翻譯
    function nanoT(key) {
        return NANO_I18N[nanoCurLang][key] || key;
    }

    // 動態生成風格選單
    function nanoPopulateStyleOptions() {
        const styleSelect = document.getElementById('style');
        if (!styleSelect) return;
        
        // 清空現有選項
        styleSelect.innerHTML = '';
        
        // 定義風格列表（與主頁面保持一致）
        const styles = [
            { key: 'none', icon: '✨', nameKey: 'style_none' },
            { key: 'photorealistic', icon: '📷', nameKey: 'style_photorealistic' },
            { key: 'anime', icon: '🌸', nameKey: 'style_anime' },
            { key: '3d-render', icon: '🧊', nameKey: 'style_3d_render' },
            { key: 'cyberpunk', icon: '🌃', nameKey: 'style_cyberpunk' },
            { key: 'manga', icon: '📖', nameKey: 'style_manga' },
            { key: 'oil-painting', icon: '🎨', nameKey: 'style_oil_painting' },
            { key: 'watercolor', icon: '💧', nameKey: 'style_watercolor' },
            { key: 'sketch', icon: '✏️', nameKey: 'style_sketch' },
            { key: 'pixel-art', icon: '👾', nameKey: 'style_pixel_art' },
            { key: 'cinematic', icon: '🎬', nameKey: 'style_cinematic' }
        ];
        
        // 生成選項
        styles.forEach(style => {
            const option = document.createElement('option');
            option.value = style.key;
            option.textContent = nanoT(style.nameKey);
            styleSelect.appendChild(option);
        });
    }

    // 更新所有翻譯
    function nanoUpdateLang() {
        // 更新標籤
        const promptLabel = document.querySelector('.control-group label');
        if (promptLabel && promptLabel.textContent.includes('Prompt')) {
            promptLabel.textContent = nanoT('prompt_label');
        }
        
        // 更新隨機按鈕
        const randomBtn = document.getElementById('randomBtn');
        if (randomBtn) randomBtn.textContent = nanoT('random_btn');
        
        // 更新提示詞輸入框
        const promptInput = document.getElementById('prompt');
        if (promptInput) promptInput.placeholder = nanoT('prompt_placeholder');
        
        // 更新比例標籤
        const ratioLabel = document.getElementById('ratioLabel');
        if (ratioLabel) ratioLabel.textContent = nanoT('ratio_label');
        
        // 更新風格標籤
        const styleLabel = document.getElementById('styleLabel');
        if (styleLabel) styleLabel.textContent = nanoT('style_label');
        
        // 更新風格選項（動態重新生成）
        nanoPopulateStyleOptions();
        
        // 更新 Seed 輸入框
        const seedInput = document.getElementById('seed');
        if (seedInput) seedInput.placeholder = nanoT('seed_placeholder');
        
        // 更新負面提示詞標籤
        const negativeLabel = document.getElementById('negativeLabel');
        if (negativeLabel) negativeLabel.textContent = nanoT('negative_label');
        
        // 更新負面提示詞輸入框
        const negativeInput = document.getElementById('negative');
        if (negativeInput) negativeInput.placeholder = nanoT('negative_default');
        
        // 更新提示詞生成器標題
        const pgTitle = document.getElementById('promptGeneratorTitle');
        if (pgTitle) pgTitle.textContent = nanoT('prompt_generator_title');
        
        // 更新提示詞生成器上傳標籤
        const pgUploadLabel = document.getElementById('promptGeneratorUploadLabel');
        if (pgUploadLabel) pgUploadLabel.textContent = nanoT('prompt_generator_upload');
        
        // 更新提示詞生成器選擇按鈕
        const pgSelectText = document.getElementById('promptGeneratorSelectText');
        if (pgSelectText) pgSelectText.textContent = nanoT('prompt_generator_select');
        
        // 更新提示詞生成器輸入框
        const pgInput = document.getElementById('nanoPromptInput');
        if (pgInput) pgInput.placeholder = nanoT('prompt_generator_placeholder');
        
        // 更新提示詞生成器按鈕
        const pgGenText = document.getElementById('promptGeneratorGenerateText');
        if (pgGenText) pgGenText.textContent = nanoT('prompt_generator_generate');
        
        const pgApplyText = document.getElementById('promptGeneratorApplyText');
        if (pgApplyText) pgApplyText.textContent = nanoT('prompt_generator_apply');
        
        // 更新生成按鈕
        const genBtnText = document.getElementById('genBtnText');
        if (genBtnText) genBtnText.textContent = nanoT('gen_btn');
        
        const genBtnCost = document.getElementById('genBtnCost');
        if (genBtnCost) genBtnCost.textContent = nanoT('gen_btn_cost');
        
        // 更新能量標籤
        const quotaLabel = document.getElementById('quotaLabel');
        if (quotaLabel) quotaLabel.textContent = nanoT('quota_label');
        
        // 更新佔位符文字
        const placeholder = document.getElementById('placeholderText');
        if (placeholder) placeholder.textContent = nanoT('placeholder_text');
        
        // 更新載入文字
        const loadingText = document.getElementById('loadingText');
        if (loadingText) loadingText.textContent = nanoT('loading_text');
        
        // 更新燈箱按鈕
        const lbDownload = document.getElementById('lbDownload');
        if (lbDownload) lbDownload.textContent = nanoT('lightbox_save');
        
        const lbClose = document.getElementById('lbClose');
        if (lbClose) lbClose.textContent = nanoT('lightbox_close');
    }

    // 語言下拉選單控制
    const nanoLangSwitch = document.getElementById('nanoLangSwitch');
    const nanoLangDropdown = document.getElementById('nanoLangDropdown');

    nanoLangSwitch.addEventListener('click', (e) => {
        e.stopPropagation();
        nanoLangDropdown.classList.toggle('show');
    });

    document.addEventListener('click', () => {
        nanoLangDropdown.classList.remove('show');
    });

    document.querySelectorAll('.nano-lang-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const lang = option.dataset.lang;
            nanoSetLanguage(lang);
            nanoLangDropdown.classList.remove('show');
        });
    });

    // 初始化語言按鈕
    nanoUpdateLangButton();
    nanoPopulateStyleOptions();  // 初始化風格選單
    nanoUpdateLang();

    // ====== 性能優化模塊 ======
    const PerformanceOptimizer = {
        // 請求控制器 - 用於取消進行中的請求
        abortController: null,
        
        // 請求去重 - 防止重複提交
        isGenerating: false,
        
        // 圖片懶加載觀察器
        lazyObserver: null,
        
        // 緩存管理
        cache: {
            images: new Map(),
            settings: new Map(),
            
            set(key, value, ttl = 3600000) {
                this.images.set(key, { value, expiry: Date.now() + ttl });
            },
            
            get(key) {
                const item = this.images.get(key);
                if (!item) return null;
                if (Date.now() > item.expiry) {
                    this.images.delete(key);
                    return null;
                }
                return item.value;
            },
            
            clear() {
                this.images.clear();
            }
        },
        
        // 初始化懶加載
        initLazyLoad() {
            if ('IntersectionObserver' in window) {
                this.lazyObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            if (img.dataset.src) {
                                img.src = img.dataset.src;
                                img.removeAttribute('data-src');
                                this.lazyObserver.unobserve(img);
                            }
                        }
                    });
                }, { rootMargin: '50px' });
            }
        },
        
        // 懶加載圖片
        lazyLoad(img) {
            if (this.lazyObserver) {
                this.lazyObserver.observe(img);
            } else {
                // 後備方案：直接加載
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            }
        },
        
        // 取消當前請求
        cancelRequest() {
            if (this.abortController) {
                this.abortController.abort();
                this.abortController = null;
            }
            this.isGenerating = false;
        },
        
        // 創建新的請求控制器
        createRequestController() {
            this.cancelRequest();
            this.abortController = new AbortController();
            return this.abortController;
        },
        
        // 防抖函數
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        // 節流函數
        throttle(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }
    };
    
    // 初始化懶加載
    PerformanceOptimizer.initLazyLoad();
    
    const els = {
        prompt: document.getElementById('prompt'),
        negative: document.getElementById('negative'),
        style: document.getElementById('style'),
        seed: document.getElementById('seed'),
        width: document.getElementById('width'),
        height: document.getElementById('height'),
        genBtn: document.getElementById('genBtn'),
        img: document.getElementById('resultImg'),
        loader: document.querySelector('.loading-overlay'),
        history: document.getElementById('historyStrip'),
        lockSeed: document.getElementById('lockSeedBtn'),
        randomBtn: document.getElementById('randomBtn'),
        ratios: document.querySelectorAll('.ratio-item'),
        quotaText: document.getElementById('quotaText'),
        quotaFill: document.getElementById('quotaFill'),
        lightbox: document.getElementById('lightbox'),
        lbImg: document.getElementById('lbImg'),
        lbClose: document.getElementById('lbClose'),
        lbDownload: document.getElementById('lbDownload')
    };
    
    // UI Quota Logic (Syncs with server limit of 3 per minute)
    let currentQuota = 3;
    const maxQuota = 3;
    
    // Cooldown Logic
    const COOLDOWN_KEY = 'nano_cooldown_timestamp';
    const COOLDOWN_SEC = 20;
    let cooldownInterval = null;

    // Online Count (whos.amung.us widget handled in HTML)

    function checkAndStartCooldown() {
        const lastTime = localStorage.getItem(COOLDOWN_KEY);
        if(!lastTime) return;

        const now = Date.now();
        const diff = Math.floor((now - parseInt(lastTime)) / 1000);
        
        if (diff < COOLDOWN_SEC) {
            startCooldownTimer(COOLDOWN_SEC - diff);
        }
    }

    function startCooldownTimer(seconds) {
        if(cooldownInterval) clearInterval(cooldownInterval);
        
        els.genBtn.disabled = true;
        updateCooldownText(seconds);
        
        let left = seconds;
        cooldownInterval = setInterval(() => {
            left--;
            if(left <= 0) {
                clearInterval(cooldownInterval);
                localStorage.removeItem(COOLDOWN_KEY);
                if(currentQuota > 0) {
                    els.genBtn.disabled = false;
                    els.genBtn.innerHTML = '<span>' + nanoT('gen_btn') + '</span><span style="font-size:12px; opacity:0.6; font-weight:400; display:block; margin-top:4px">' + nanoT('gen_btn_cost') + '</span>';
                } else {
                    updateQuotaUI();
                }
            } else {
                updateCooldownText(left);
            }
        }, 1000);
    }

    function updateCooldownText(sec) {
        els.genBtn.innerHTML = '<span>' + nanoT('gen_btn_charging').replace('{s}', sec) + '</span>';
    }
    
    // Check quota reset (per minute)
    function checkQuotaReset() {
        const now = new Date();
        const currentMinStr = now.toDateString() + '-' + now.getHours() + '-' + now.getMinutes();
        const stored = localStorage.getItem('nano_quota_minutely');
        
        if(stored) {
            const data = JSON.parse(stored);
            if(data.min !== currentMinStr) {
                // New minute, reset quota
                localStorage.setItem('nano_quota_minutely', JSON.stringify({min: currentMinStr, val: maxQuota}));
                currentQuota = maxQuota;
            } else {
                currentQuota = data.val;
            }
        } else {
            localStorage.setItem('nano_quota_minutely', JSON.stringify({min: currentMinStr, val: maxQuota}));
            currentQuota = maxQuota;
        }
        updateQuotaUI();
    }
    
    // Initial quota check
    checkQuotaReset();
    
    // Auto-check quota reset every 10 seconds
    setInterval(checkQuotaReset, 10000);
    
    // Check cooldown on load
    checkAndStartCooldown();
    
    function updateQuotaUI() {
        els.quotaText.textContent = currentQuota + ' / ' + maxQuota;
        const pct = (currentQuota / maxQuota) * 100;
        els.quotaFill.style.width = pct + '%';
        if(currentQuota <= 0) {
            els.quotaFill.style.background = '#ef4444';
            els.genBtn.disabled = true;
            els.genBtn.innerHTML = '<span>' + nanoT('gen_btn_depleted') + '</span><span style="display:block;font-size:12px;font-weight:400;margin-top:4px">' + nanoT('gen_btn_depleted_sub') + '</span>';
        }
    }
    
    function consumeQuota() {
        if(currentQuota > 0) {
            currentQuota--;
            const now = new Date();
            const currentMinStr = now.toDateString() + '-' + now.getHours() + '-' + now.getMinutes();
            localStorage.setItem('nano_quota_minutely', JSON.stringify({min: currentMinStr, val: currentQuota}));
            updateQuotaUI();
        }
    }

    // 方案三：比例預覽功能
    const ratioPreviewOverlay = document.getElementById('ratioPreviewOverlay');
    const ratioPreviewBox = document.getElementById('ratioPreviewBox');
    const ratioPreviewInfo = document.getElementById('ratioPreviewInfo');
    const ratioPreviewDimensions = document.getElementById('ratioPreviewDimensions');
    
    els.ratios.forEach(r => {
        // 點擊事件
        r.onclick = () => {
            els.ratios.forEach(i => i.classList.remove('active'));
            r.classList.add('active');
            els.width.value = r.dataset.w;
            els.height.value = r.dataset.h;
        }
        
        // 懸停事件 - 顯示比例預覽
        r.onmouseenter = () => {
            const width = parseInt(r.dataset.w);
            const height = parseInt(r.dataset.h);
            const title = r.title;
            
            // 計算預覽框尺寸（最大 120px）
            const maxSize = 120;
            let previewWidth, previewHeight;
            
            if (width >= height) {
                previewWidth = maxSize;
                previewHeight = (height / width) * maxSize;
            } else {
                previewHeight = maxSize;
                previewWidth = (width / height) * maxSize;
            }
            
            // 設置預覽框樣式
            ratioPreviewBox.style.width = previewWidth + 'px';
            ratioPreviewBox.style.height = previewHeight + 'px';
            ratioPreviewInfo.textContent = title;
            ratioPreviewDimensions.textContent = width + ' x ' + height;
            
            // 顯示預覽覆蓋層
            ratioPreviewOverlay.classList.add('show');
        }
        
        // 離開事件 - 隱藏比例預覽
        r.onmouseleave = () => {
            ratioPreviewOverlay.classList.remove('show');
        }
    });

    let isSeedRandom = true;
    els.lockSeed.onclick = () => {
        isSeedRandom = !isSeedRandom;
        if(isSeedRandom) {
            els.seed.value = '-1';
            els.seed.disabled = true;
            els.lockSeed.textContent = '🎲';
            els.lockSeed.classList.remove('active');
        } else {
            if(els.seed.value == '-1') els.seed.value = Math.floor(Math.random() * 1000000);
            els.seed.disabled = false;
            els.lockSeed.textContent = '🔒';
            els.lockSeed.classList.add('active');
        }
    };

    const prompts = [
        "Cyberpunk street vendor making noodles, neon rain, detailed, 8k",
        "A translucent glass banana floating in space, nebula background",
        "Cute isometric room, gaming setup, pastel colors, 3d render",
        "Portrait of a futuristic warrior, gold and black armor, cinematic lighting",
        "Traditional Japanese village in winter, snow, ukiyo-e style",
        "Macro shot of a mechanical eye, gears, steampunk"
    ];
    els.randomBtn.onclick = () => {
        els.prompt.value = prompts[Math.floor(Math.random() * prompts.length)];
        els.prompt.focus();
    };
    
    // 更新隨機按鈕文本
    if (els.randomBtn) {
        els.randomBtn.textContent = nanoT('random_btn');
    }
    
    // 方案三：風格按鈕懸停預覽功能
    const stylePreviewTooltip = document.getElementById('stylePreviewTooltip');
    const stylePreviewTitle = document.getElementById('stylePreviewTitle');
    const stylePreviewDesc = document.getElementById('stylePreviewDesc');
    
    // 風格描述映射
    const styleDescriptions = {
        'photorealistic': '照片般真實的細節，適合寫實場景',
        'anime': '日式動漫風格，色彩鮮豔',
        'oil-painting': '經典油畫質感，筆觸豐富',
        'cyberpunk': '未來科技感，霓虹燈光效',
        'watercolor': '水彩畫風格，柔和透明',
        'sketch': '素描線條，藝術感強',
        '3d-render': '3D 渲染效果，立體感強',
        'pixel-art': '像素藝術，復古遊戲風格',
        'cinematic': '電影級光效，戲劇性強',
        'fantasy': '奇幻風格，夢幻色彩',
        'neon': '霓虹發光效果，視覺衝擊',
        'vintage': '復古懷舊風格',
        'steampunk': '蒸汽龐克，機械與魔法結合',
        'minimalist': '極簡主義，乾淨俐落',
        'vaporwave': '蒸汽波風格，80年代復古',
        'pixel-art': '像素藝術，復古遊戲風格',
        'low-poly': '低多邊形，幾何風格',
        'gradient': '漸變色彩，流動美感',
        'glitch': '故障藝術，數位干擾效果',
        'ukiyo-e': '浮世繪風格，日本傳統藝術',
        'stained-glass': '彩色玻璃，宗教藝術風格',
        'paper-cut': '剪紙藝術，層次分明',
        'gothic': '哥特風格，黑暗神秘',
        'art-nouveau': '新藝術風格，曲線優美',
        'cyberpunk': '賽博龐克，未來科技',
        'fantasy': '奇幻風格，夢幻色彩'
    };
    
    // 風格快捷按鈕事件處理
    document.querySelectorAll('.style-shortcut-btn').forEach(btn => {
        // 點擊事件
        btn.onclick = () => {
            const style = btn.dataset.style;
            if (els.style) {
                els.style.value = style;
                // 添加點擊動畫效果
                btn.style.transform = 'scale(0.9)';
                setTimeout(() => btn.style.transform = 'scale(1)', 150);
            }
        };
        
        // 懸停事件 - 顯示風格預覽
        btn.onmouseenter = (e) => {
            const style = btn.dataset.style;
            const title = btn.title || style;
            const desc = styleDescriptions[style] || '選擇此風格';
            
            stylePreviewTitle.textContent = title;
            stylePreviewDesc.textContent = desc;
            
            // 計算提示框位置
            const rect = btn.getBoundingClientRect();
            const tooltipWidth = 200;
            const tooltipHeight = 80;
            
            let left = rect.left + rect.width / 2 - tooltipWidth / 2;
            let top = rect.top - tooltipHeight - 10;
            
            // 防止超出視窗邊界
            if (left < 10) left = 10;
            if (left + tooltipWidth > window.innerWidth - 10) left = window.innerWidth - tooltipWidth - 10;
            if (top < 10) top = rect.bottom + 10;
            
            stylePreviewTooltip.style.left = left + 'px';
            stylePreviewTooltip.style.top = top + 'px';
            stylePreviewTooltip.classList.add('show');
        }
        
        // 離開事件 - 隱藏風格預覽
        btn.onmouseleave = () => {
            stylePreviewTooltip.classList.remove('show');
        }
    });
    
    function openLightbox(url) {
        els.lbImg.src = url;
        els.lbDownload.href = url;
        els.lightbox.classList.add('show');
    }
    els.lbClose.onclick = () => els.lightbox.classList.remove('show');
    els.img.onclick = () => { if(els.img.src) openLightbox(els.img.src); };

    // ====== Nano Pro 專業提示詞生成器 ======
    const NanoPromptGenerator = {
        generatedPrompt: null,
        uploadedImage: null,
        uploadedImageUrl: null,
        
        async generate() {
            const input = document.getElementById('nanoPromptInput').value.trim();
            const style = document.getElementById('style')?.value || 'none';
            
            if (!input && !this.uploadedImage) {
                this.showStatus(nanoT('prompt_generator_error_input'), 'error');
                return;
            }
            
            const btn = document.getElementById('nanoGeneratePromptBtn');
            const originalText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '<span>⏳</span><span>生成中...</span>';
            
            // 如果有上傳圖片但還沒有 URL，先上傳獲取 URL
            if (this.uploadedImage && !this.uploadedImageUrl) {
                this.showStatus(nanoT('prompt_generator_uploading'), 'loading');
                try {
                    this.uploadedImageUrl = await this.uploadImageAndGetUrl(this.uploadedImage);
                    this.showStatus(nanoT('prompt_generator_image_uploaded') + ', ' + nanoT('prompt_generator_generating_text'), 'loading');
                } catch (error) {
                    console.error('Image upload error:', error);
                    this.showStatus(nanoT('prompt_generator_error_upload') + error.message, 'error');
                    btn.disabled = false;
                    btn.innerHTML = originalText;
                    return;
                }
            }
            
            this.showStatus(nanoT('prompt_generator_generating_text'), 'loading');
            
            try {
                const response = await fetch('/api/generate-prompt', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        input: input,
                        style: style,
                        imageUrl: this.uploadedImageUrl
                    })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    this.generatedPrompt = data.prompt;
                    document.getElementById('nanoGeneratedPrompt').textContent = data.prompt;
                    document.getElementById('nanoGeneratedPromptContainer').style.display = 'block';
                    document.getElementById('nanoApplyPromptBtn').style.display = 'flex';
                    this.showStatus(nanoT('prompt_generator_success'), 'success');
                } else {
                    throw new Error(data.error || '生成失敗');
                }
            } catch (error) {
                console.error('Nano Prompt Generation Error:', error);
                this.showStatus(nanoT('prompt_generator_error_generate') + error.message, 'error');
            } finally {
                btn.disabled = false;
                btn.innerHTML = originalText;
            }
        },
        
        // 上傳圖片並獲取 URL
        async uploadImageAndGetUrl(base64Data) {
            // 將 Base64 轉換為 Blob
            const response = await fetch(base64Data);
            const blob = await response.blob();
            
            // 創建 FormData
            const formData = new FormData();
            formData.append('fileToUpload', blob, 'uploaded-image.png');
            
            // 上傳到 /api/upload
            const uploadResponse = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            
            if (!uploadResponse.ok) {
                const errorData = await uploadResponse.json().catch(() => ({}));
                throw new Error(errorData.error || '上傳失敗');
            }
            
            const data = await uploadResponse.json();
            if (!data.url) {
                throw new Error('未獲取到圖片 URL');
            }
            
            return data.url;
        },
        
        applyToPrompt() {
            if (!this.generatedPrompt) return;
            
            const promptTextarea = document.getElementById('prompt');
            if (promptTextarea) {
                promptTextarea.value = this.generatedPrompt;
                this.showStatus(nanoT('prompt_generator_applied'), 'success');
                document.getElementById('nanoPromptInput').value = '';
            }
        },
        
        handleImageUpload(file) {
            if (!file) return;
            
            // 驗證文件大小 (最大 32MB)
            if (file.size > 32 * 1024 * 1024) {
                this.showStatus(nanoT('prompt_generator_error_size'), 'error');
                return;
            }
            
            // 驗證文件類型
            if (!file.type.startsWith('image/')) {
                this.showStatus(nanoT('prompt_generator_error_type'), 'error');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                this.uploadedImage = e.target.result;
                
                // 顯示預覽
                const previewImg = document.getElementById('nanoPromptImagePreviewImg');
                const previewDiv = document.getElementById('nanoPromptImagePreview');
                const clearBtn = document.getElementById('nanoPromptImageClearBtn');
                
                previewImg.src = this.uploadedImage;
                previewDiv.style.display = 'block';
                clearBtn.style.display = 'block';
                
                this.showStatus(nanoT('prompt_generator_image_uploaded'), 'success');
            };
            reader.onerror = () => {
                this.showStatus(nanoT('prompt_generator_image_error'), 'error');
            };
            reader.readAsDataURL(file);
        },
        
        clearImage() {
            this.uploadedImage = null;
            this.uploadedImageUrl = null;
            document.getElementById('nanoPromptImagePreview').style.display = 'none';
            document.getElementById('nanoPromptImagePreviewImg').src = '';
            document.getElementById('nanoPromptImageClearBtn').style.display = 'none';
            document.getElementById('nanoPromptImageUpload').value = '';
        },
        
        showStatus(message, type) {
            const statusEl = document.getElementById('nanoPromptGeneratorStatus');
            statusEl.textContent = message;
            statusEl.style.display = 'block';
            
            if (type === 'error') {
                statusEl.style.color = '#ef4444';
            } else if (type === 'success') {
                statusEl.style.color = '#22c55e';
            } else {
                statusEl.style.color = '#9ca3af';
            }
            
            setTimeout(() => {
                if (statusEl.textContent === message) {
                    statusEl.style.display = 'none';
                }
            }, 3000);
        }
    };
    
    // ====== Nano Pro 拖放功能模塊 ======
    const NanoDragDropHandler = {
        initDropZone(dropZoneId, fileInputId, onFileDrop) {
            const dropZone = document.getElementById(dropZoneId);
            const fileInput = document.getElementById(fileInputId);
            
            if (!dropZone || !fileInput) return;

            // 點擊區域觸發文件選擇
            dropZone.addEventListener('click', () => {
                fileInput.click();
            });

            // 阻止默認拖放行為
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dropZone.addEventListener(eventName, (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }, false);
            });

            // 拖入效果
            ['dragenter', 'dragover'].forEach(eventName => {
                dropZone.addEventListener(eventName, () => {
                    dropZone.classList.add('drag-over');
                }, false);
            });

            // 拖離效果
            ['dragleave', 'drop'].forEach(eventName => {
                dropZone.addEventListener(eventName, () => {
                    dropZone.classList.remove('drag-over');
                }, false);
            });

            // 處理文件放置
            dropZone.addEventListener('drop', (e) => {
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    onFileDrop(files[0]);
                }
            }, false);
        }
    };

    // 初始化 Nano Pro 提示詞生成器拖放區域
    NanoDragDropHandler.initDropZone('nanoPromptImageDropZone', 'nanoPromptImageUpload', (file) => {
        NanoPromptGenerator.handleImageUpload(file);
    });

    // 綁定 Nano Pro 提示詞生成器事件
    const nanoGenBtn = document.getElementById('nanoGeneratePromptBtn');
    if(nanoGenBtn) nanoGenBtn.addEventListener('click', () => NanoPromptGenerator.generate());
    
    const nanoApplyBtn = document.getElementById('nanoApplyPromptBtn');
    if(nanoApplyBtn) nanoApplyBtn.addEventListener('click', () => NanoPromptGenerator.applyToPrompt());
    
    // 圖片上傳按鈕事件（保留原有功能作為後備）
    const nanoUploadBtn = document.getElementById('nanoPromptImageUploadBtn');
    if(nanoUploadBtn) {
        nanoUploadBtn.addEventListener('click', () => {
            const uploadInput = document.getElementById('nanoPromptImageUpload');
            if(uploadInput) uploadInput.click();
        });
    }
    
    // 圖片選擇事件
    const nanoUploadInput = document.getElementById('nanoPromptImageUpload');
    if(nanoUploadInput) {
        nanoUploadInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                NanoPromptGenerator.handleImageUpload(file);
            }
        });
    }
    
    // 清除圖片按鈕事件
    const nanoClearBtn = document.getElementById('nanoPromptImageClearBtn');
    if(nanoClearBtn) {
        nanoClearBtn.addEventListener('click', () => {
            NanoPromptGenerator.clearImage();
        });
    }
    
    // Ctrl + Enter 快捷鍵
    const nanoInput = document.getElementById('nanoPromptInput');
    if(nanoInput) {
        nanoInput.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                NanoPromptGenerator.generate();
            }
        });
    }

    function toast(msg) {
        const t = document.getElementById('toast');
        t.textContent = msg;
        t.style.display = 'block';
        setTimeout(() => t.style.display = 'none', 3000);
    }
    
    // 多語言 toast 函數
    function nanoToast(key, fallbackMsg) {
        const t = document.getElementById('toast');
        t.textContent = nanoT(key) || fallbackMsg;
        t.style.display = 'block';
        setTimeout(() => t.style.display = 'none', 3000);
    }

    // 方案三：增強的歷史記錄功能
    let draggedItem = null;
    
    function addHistory(url) {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.draggable = true;
        div.dataset.url = url;
        
        // 創建圖片
        const img = document.createElement('img');
        img.src = url;
        div.appendChild(img);
        
        // 創建操作按鈕容器
        const actions = document.createElement('div');
        actions.className = 'history-item-actions';
        
        // 下載按鈕
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'history-action-btn';
        downloadBtn.innerHTML = '⬇️';
        downloadBtn.title = '下載';
        downloadBtn.onclick = (e) => {
            e.stopPropagation();
            const a = document.createElement('a');
            a.href = url;
            a.download = 'nano-pro-' + Date.now() + '.png';
            a.click();
        };
        actions.appendChild(downloadBtn);
        
        // 刪除按鈕
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'history-action-btn delete';
        deleteBtn.innerHTML = '✕';
        deleteBtn.title = '刪除';
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            div.style.transform = 'scale(0)';
            div.style.opacity = '0';
            setTimeout(() => div.remove(), 300);
        };
        actions.appendChild(deleteBtn);
        
        div.appendChild(actions);
        
        // 點擊事件 - 顯示圖片
        div.onclick = () => {
            els.img.src = url;
            document.querySelectorAll('.history-item').forEach(i => i.classList.remove('active'));
            div.classList.add('active');
        };
        
        // 拖曳事件
        div.ondragstart = (e) => {
            draggedItem = div;
            div.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
        };
        
        div.ondragend = () => {
            div.classList.remove('dragging');
            document.querySelectorAll('.history-item').forEach(i => i.classList.remove('drag-over'));
            draggedItem = null;
        };
        
        div.ondragover = (e) => {
            e.preventDefault();
            if (draggedItem && draggedItem !== div) {
                div.classList.add('drag-over');
            }
        };
        
        div.ondragleave = () => {
            div.classList.remove('drag-over');
        };
        
        div.ondrop = (e) => {
            e.preventDefault();
            div.classList.remove('drag-over');
            if (draggedItem && draggedItem !== div) {
                const rect = div.getBoundingClientRect();
                const midY = rect.top + rect.height / 2;
                if (e.clientY < midY) {
                    els.history.insertBefore(draggedItem, div);
                } else {
                    els.history.insertBefore(draggedItem, div.nextSibling);
                }
            }
        };
        
        els.history.prepend(div);
        if(els.history.children.length > 10) els.history.lastChild.remove();
        document.querySelectorAll('.history-item').forEach(i => i.classList.remove('active'));
        div.classList.add('active');
    }

    // 方案三：載入狀態循環機制
    let loadingStateInterval = null;
    
    function startLoadingStateCycle() {
        const loadingText = document.getElementById('loadingText');
        if (!loadingText) return;
        
        const states = [
            nanoT('loading_state_1'),
            nanoT('loading_state_2'),
            nanoT('loading_state_3'),
            nanoT('loading_state_4')
        ];
        let currentIndex = 0;
        
        // 立即顯示第一個狀態
        loadingText.textContent = states[0];
        
        // 每 2 秒切換一次狀態
        loadingStateInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % states.length;
            loadingText.textContent = states[currentIndex];
        }, 2000);
    }
    
    function stopLoadingStateCycle() {
        if (loadingStateInterval) {
            clearInterval(loadingStateInterval);
            loadingStateInterval = null;
        }
    }
    
    els.genBtn.onclick = async () => {
        const p = els.prompt.value.trim();
        if(!p) return nanoToast('toast_no_prompt', "⚠️ 請輸入提示詞");
        if(currentQuota <= 0) return nanoToast('toast_energy_depleted', "🚫 本分鐘能量已耗盡，請稍後再來！");

        els.genBtn.disabled = true;
        els.loader.style.display = 'flex';
        startLoadingStateCycle(); // 方案三：啟動載入狀態循環
        els.img.style.opacity = '0.5';

        try {
            console.log("🍌 Nano Pro: 開始生成圖片...", {
                prompt: p,
                provider: 'nonpon',
                model: 'gemini-3-pro-image-preview',
                width: els.width.value,
                height: els.height.value,
                style: els.style.value,
                seed: els.seed.value
            });

            const requestBody = {
                prompt: p,
                negative_prompt: els.negative.value,
                provider: 'nonpon',
                model: 'gemini-3-pro-image-preview',
                width: parseInt(els.width.value),
                height: parseInt(els.height.value),
                style: els.style.value,
                seed: parseInt(els.seed.value),
                steps: parseInt(els.nanoSteps?.value || 30),
                guidance: parseFloat(els.nanoGuidance?.value || 7.5),
                quality_mode: els.nanoQuality?.value || 'standard',
                n: 1,
                nologo: true,
                auto_optimize: true,
                auto_hd: true,
                language: nanoCurLang  // Track interface language
            };
            
            console.log("🍌 Nano Pro: 請求體", requestBody);

            const res = await fetch('/_internal/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Source': 'nano-page' },
                body: JSON.stringify(requestBody)
            });

            console.log("🍌 Nano Pro: API 響應狀態", res.status, res.statusText);
            console.log("🍌 Nano Pro: 響應頭", Object.fromEntries(res.headers.entries()));

            if(res.status === 429) {
                const err = await res.json();
                console.error("🍌 Nano Pro: 限額錯誤", err);
                currentQuota = 0;
                const n = new Date();
                const m = n.toDateString() + '-' + n.getHours() + '-' + n.getMinutes();
                localStorage.setItem('nano_quota_minutely', JSON.stringify({min: m, val: 0}));
                updateQuotaUI();
                throw new Error(err.error?.message || '限額已滿');
            }

            if(!res.ok) {
                const err = await res.json();
                console.error("🍌 Nano Pro: 生成失敗", err);
                throw new Error(err.error?.message || '生成失敗');
            }

            const blob = await res.blob();
            console.log("🍌 Nano Pro: 圖片生成成功", blob.size, "bytes");
            
            // 檢查是否為有效的圖片數據
            if (blob.size === 0) {
                throw new Error("生成的圖片為空，請稍後再試");
            }
            
            const url = URL.createObjectURL(blob);
            
            els.img.src = url;
            els.img.style.display = 'block';
            els.img.style.opacity = '1';
            document.querySelector('.placeholder-text').style.display = 'none';
            
            const realSeed = res.headers.get('X-Seed');
            if(!isSeedRandom && realSeed) els.seed.value = realSeed;

            addHistory(url);
            
            consumeQuota();
            
            // Start Cooldown
            localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
            startCooldownTimer(COOLDOWN_SEC);

        } catch(e) {
            console.error("🍌 Nano Pro: 生成錯誤", e);
            nanoToast('toast_error', "❌ " + e.message);
            // 停止計時器
            clearInterval(timerInterval);
            timerDisplay.style.display = 'none';
            // On error, re-enable button if quota exists (unless rate limited)
            if(currentQuota > 0 && !e.message.includes('限額')) els.genBtn.disabled = false;
        } finally {
            stopLoadingStateCycle(); // 方案三：停止載入狀態循環
            els.loader.style.display = 'none';
        }
    };
</script>
</body>
</html>`;
  
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8', ...corsHeaders() } });
}

// ====== Admin Management System ======
async function handleAdminPage(request, env, ctx) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // API 路由
  if (pathname.startsWith('/admin/api/')) {
    return await handleAdminAPI(request, env, ctx);
  }
  
  // 頁面路由 - 登入頁面
  if (pathname === '/admin/login') {
    return await renderAdminLogin();
  }
  
  // 其他後台頁面 - 直接渲染，由前端 JavaScript 驗證 token
  // 這樣可以避免服務器端驗證頁面請求的問題（瀏覽器不會自動帶 Authorization header）
  if (pathname === '/admin' || pathname === '/admin/') {
    return await renderAdminDashboard();
  } else if (pathname === '/admin/styles') {
    return await renderAdminStyles();
  } else if (pathname === '/admin/providers') {
    return await renderAdminProviders();
  } else if (pathname === '/admin/parameters') {
    return await renderAdminParameters();
  } else if (pathname === '/admin/settings') {
    return await renderAdminSettings();
  } else {
    return new Response('Not Found', { status: 404 });
  }
}

// 身份驗證中間件
async function verifyAdminAuth(request, env) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { valid: false };
  }
  
  const token = authHeader.substring(7);
  try {
    const tokenData = await env.FLUX_KV.get('admin:tokens:' + token, 'json');
    if (!tokenData) {
      return { valid: false };
    }
    
    // 檢查 token 是否過期
    if (Date.now() > tokenData.expiresAt) {
      await env.FLUX_KV.delete('admin:tokens:' + token);
      return { valid: false };
    }
    
    return { valid: true, user: tokenData.user };
  } catch (error) {
    return { valid: false };
  }
}

// API 路由處理
async function handleAdminAPI(request, env, ctx) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const method = request.method;
  
  // 登入 API 不需要驗證
  if (pathname === '/admin/api/login' && method === 'POST') {
    return await handleAdminLogin(request, env);
  }
  
  // 其他 API 需要驗證
  const authResult = await verifyAdminAuth(request, env);
  if (!authResult.valid) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  }
  
  // 風格管理 API
  if (pathname === '/admin/api/styles' && method === 'GET') {
    return await getAdminStyles(env);
  } else if (pathname === '/admin/api/styles' && method === 'POST') {
    return await createAdminStyle(request, env);
  } else if (pathname.match(/^\/admin\/api\/styles\/[^\/]+$/) && method === 'PUT') {
    const styleId = pathname.split('/').pop();
    return await updateAdminStyle(request, env, styleId);
  } else if (pathname.match(/^\/admin\/api\/styles\/[^\/]+$/) && method === 'DELETE') {
    const styleId = pathname.split('/').pop();
    return await deleteAdminStyle(env, styleId);
  }
  
  // 供應商管理 API
  if (pathname === '/admin/api/providers' && method === 'GET') {
    return await getAdminProviders(env);
  } else if (pathname.match(/^\/admin\/api\/providers\/[^\/]+$/) && method === 'PUT') {
    const providerId = pathname.split('/').pop();
    return await updateAdminProvider(request, env, providerId);
  }

  // 自定義模型 API
  if (pathname === '/admin/api/models/custom' && method === 'GET') {
    return await getAdminCustomModels(env);
  } else if (pathname === '/admin/api/models/custom' && method === 'POST') {
    return await createAdminCustomModel(request, env);
  } else if (pathname.match(/^\/admin\/api\/models\/custom\/[^\/]+$/) && method === 'PUT') {
    const modelId = pathname.split('/').pop();
    return await updateAdminCustomModel(request, env, modelId);
  } else if (pathname.match(/^\/admin\/api\/models\/custom\/[^\/]+$/) && method === 'DELETE') {
    const modelId = pathname.split('/').pop();
    return await deleteAdminCustomModel(env, modelId);
  }
  
  // 參數管理 API
  if (pathname === '/admin/api/parameters' && method === 'GET') {
    return await getAdminParameters(env);
  } else if (pathname === '/admin/api/parameters/optimization' && method === 'PUT') {
    return await updateAdminOptimization(request, env);
  } else if (pathname === '/admin/api/parameters/rate-limits' && method === 'PUT') {
    return await updateAdminRateLimits(request, env);
  }
  
  // 全局設置 API
  if (pathname === '/admin/api/settings/global' && method === 'GET') {
    return await getAdminGlobalSettings(env);
  } else if (pathname === '/admin/api/settings/global' && method === 'PUT') {
    return await updateAdminGlobalSettings(request, env);
    }
  
    // 修改密碼 API
    if (pathname === '/admin/api/settings/password' && method === 'PUT') {
    	return await updateAdminPassword(request, env);
    }
   
    // 儀表板統計 API
    if (pathname === '/admin/api/stats' && method === 'GET') {
    	return await getAdminStats(env);
    }
   
    // 數據備份 API
    if (pathname === '/admin/api/backup' && method === 'GET') {
    	return await exportAdminBackup(env);
    }
    else if (pathname === '/admin/api/backup' && method === 'POST') {
    	return await importAdminBackup(request, env);
    }
   
    // 自定義供應商 API
    if (pathname === '/admin/api/providers/custom' && method === 'GET') {
    	return await getAdminCustomProviders(env);
    } else if (pathname === '/admin/api/providers/custom' && method === 'POST') {
    	return await createAdminCustomProvider(request, env);
    } else if (pathname.match(/^\/admin\/api\/providers\/custom\/[^\/]+$/) && method === 'PUT') {
    	const providerId = pathname.split('/').pop();
    	return await updateAdminCustomProvider(request, env, providerId);
    } else if (pathname.match(/^\/admin\/api\/providers\/custom\/[^\/]+$/) && method === 'DELETE') {
    	const providerId = pathname.split('/').pop();
    	return await deleteAdminCustomProvider(env, providerId);
    }
   
    // 供應商連接測試 API
    if (pathname.match(/^\/admin\/api\/providers\/test\/[^\/]+$/) && method === 'POST') {
    	const providerId = pathname.split('/').pop();
    	return await testAdminProviderConnection(request, env, providerId);
    }
   
    return new Response(JSON.stringify({ error: 'Not Found' }), { status: 404, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
   }
  
  // 修改密碼
  async function updateAdminPassword(request, env) {
    try {
      const body = await request.json();
      const { currentPassword, newPassword } = body;
      
      if (!currentPassword || !newPassword) {
        return new Response(JSON.stringify({ error: '請輸入當前密碼和新密碼' }), { status: 400, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
      }
      
      if (newPassword.length < 6) {
        return new Response(JSON.stringify({ error: '新密碼長度至少6個字符' }), { status: 400, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
      }
      
      // 獲取當前管理員憑證
      const credentials = await env.FLUX_KV.get('admin:credentials', 'json');
      if (!credentials) {
        return new Response(JSON.stringify({ error: '管理員賬戶未配置' }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
      }
      
      // 驗證當前密碼
      const currentHash = await hashPassword(currentPassword);
      if (currentHash !== credentials.passwordHash) {
        return new Response(JSON.stringify({ error: '當前密碼不正確' }), { status: 401, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
      }
      
      // 更新密碼
      credentials.passwordHash = await hashPassword(newPassword);
      await env.FLUX_KV.put('admin:credentials', JSON.stringify(credentials));
      
      return new Response(JSON.stringify({ success: true, message: '密碼修改成功' }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
    }
  }
  
  // 登入處理
async function handleAdminLogin(request, env) {
  try {
    console.log('[Admin Login] 收到登入請求');
    const body = await request.json();
    const { username, password } = body;
    console.log('[Admin Login] 用戶名:', username);
    
    // 獲取存儲的管理員憑證
    const credentials = await env.FLUX_KV.get('admin:credentials', 'json');
    console.log('[Admin Login] KV 憑證查詢結果:', credentials ? '找到' : '未找到');
    
    if (!credentials) {
      // 創建默認管理員賬戶
      console.log('[Admin Login] 創建默認管理員賬戶');
      const defaultCredentials = {
        username: 'admin',
        passwordHash: await hashPassword('admin123')
      };
      await env.FLUX_KV.put('admin:credentials', JSON.stringify(defaultCredentials));
      console.log('[Admin Login] 默認賬戶已創建');
    }
    
    const storedCredentials = credentials || {
      username: 'admin',
      passwordHash: await hashPassword('admin123')
    };
    
    // 驗證用戶名和密碼
    if (username !== storedCredentials.username) {
      console.log('[Admin Login] 用戶名不匹配');
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
    }
    
    const passwordHash = await hashPassword(password);
    console.log('[Admin Login] 密碼哈希:', passwordHash);
    console.log('[Admin Login] 存儲的密碼哈希:', storedCredentials.passwordHash);
    
    if (passwordHash !== storedCredentials.passwordHash) {
      console.log('[Admin Login] 密碼不匹配');
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
    }
    
    console.log('[Admin Login] 驗證成功');
    
    // 生成 JWT Token
    const token = await generateAdminToken(username);
    console.log('[Admin Login] Token 已生成:', token.substring(0, 16) + '...');
    
    const tokenData = {
      user: username,
      createdAt: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 小時
    };
    
    await env.FLUX_KV.put('admin:tokens:' + token, JSON.stringify(tokenData), { expirationTtl: 86400 });
    console.log('[Admin Login] Token 已存儲到 KV');
    
    console.log('[Admin Login] 登入成功，返回 Token');
    return new Response(JSON.stringify({ token, user: username }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  } catch (error) {
    console.error('[Admin Login] 登入錯誤:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  }
}

// 密碼哈希
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// 生成 Token
async function generateAdminToken(username) {
  const encoder = new TextEncoder();
  const data = encoder.encode(username + Date.now() + Math.random());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// 渲染登入頁面
async function renderAdminLogin() {
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>管理員登入 - Flux AI Pro</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .login-container {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 16px;
            padding: 40px;
            width: 100%;
            max-width: 400px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        .login-header {
            text-align: center;
            margin-bottom: 30px;
        }
        .login-header h1 {
            color: #333;
            font-size: 24px;
            margin-bottom: 8px;
        }
        .login-header p {
            color: #666;
            font-size: 14px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            color: #333;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 8px;
        }
        .form-group input {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 14px;
            transition: border-color 0.3s;
        }
        .form-group input:focus {
            outline: none;
            border-color: #667eea;
        }
        .login-btn {
            width: 100%;
            padding: 12px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s;
        }
        .login-btn:hover {
            transform: translateY(-2px);
        }
        .error-message {
            color: #ef4444;
            font-size: 14px;
            text-align: center;
            margin-top: 16px;
            display: none;
        }
        .error-message.show {
            display: block;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="login-header">
            <h1>🔐 管理員登入</h1>
            <p>Flux AI Pro 後台管理系統</p>
        </div>
        <form id="loginForm">
            <div class="form-group">
                <label for="username">用戶名</label>
                <input type="text" id="username" name="username" required autocomplete="username">
            </div>
            <div class="form-group">
                <label for="password">密碼</label>
                <input type="password" id="password" name="password" required autocomplete="current-password">
            </div>
            <button type="submit" class="login-btn">登入</button>
        </form>
        <div class="error-message" id="errorMessage"></div>
    </div>
    <script>
        console.log('[Login Script] 腳本開始執行');
        console.log('[Login Script] DOM 狀態:', document.readyState);
        
        function initLoginForm() {
            console.log('[Login Script] 初始化登入表單...');
            const form = document.getElementById('loginForm');
            console.log('[Login Script] 表單元素:', form);
            
            if (!form) {
                console.error('[Login Script] 錯誤: 找不到 loginForm 元素!');
                return;
            }
            
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                console.log('[Login Form] 表單提交事件觸發');
                
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                const errorMessage = document.getElementById('errorMessage');
                
                console.log('[Login Form] 用戶名:', username);
                console.log('[Login Form] 密碼長度:', password ? password.length : 0);
                
                if (!username || !password) {
                    errorMessage.textContent = '請輸入用戶名和密碼';
                    errorMessage.classList.add('show');
                    return;
                }
                
                // 禁用按鈕防止重複提交
                const submitBtn = form.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.textContent = '登入中...';
                
                try {
                    console.log('[Login Form] 發送登入請求...');
                    const response = await fetch('/admin/api/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username, password })
                    });
                    
                    console.log('[Login Form] 響應狀態:', response.status, response.statusText);
                    
                    const data = await response.json();
                    console.log('[Login Form] 響應數據:', data);
                    
                    if (response.ok) {
                        console.log('[Login Form] 登入成功，保存 Token');
                        localStorage.setItem('adminToken', data.token);
                        localStorage.setItem('adminUser', data.user);
                        console.log('[Login Form] Token 已保存，跳轉到 /admin');
                        window.location.href = '/admin';
                    } else {
                        console.log('[Login Form] 登入失敗:', data.error);
                        errorMessage.textContent = data.error || '登入失敗';
                        errorMessage.classList.add('show');
                        submitBtn.disabled = false;
                        submitBtn.textContent = '登入';
                    }
                } catch (error) {
                    console.error('[Login Form] 請求錯誤:', error);
                    errorMessage.textContent = '網絡錯誤，請稍後再試: ' + error.message;
                    errorMessage.classList.add('show');
                    submitBtn.disabled = false;
                    submitBtn.textContent = '登入';
                }
            });
            
            console.log('[Login Script] 事件監聽器已附加');
        }
        
        // 確保 DOM 載入完成後再初始化
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initLoginForm);
            console.log('[Login Script] 等待 DOMContentLoaded 事件');
        } else {
            // DOM 已經載入完成
            initLoginForm();
        }
    </script>
</body>
</html>`;
  
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
}

// 渲染儀表板
async function renderAdminDashboard() {
	const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>儀表板 - Flux AI Pro 管理後台</title>
	<style>
		* { margin: 0; padding: 0; box-sizing: border-box; }
		body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; min-height: 100vh; }
		.sidebar { position: fixed; left: 0; top: 0; width: 250px; height: 100%; background: #1a1a2e; color: white; padding: 20px; }
		.sidebar-header { font-size: 20px; font-weight: 600; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
		.nav-item { display: block; padding: 12px 16px; color: rgba(255, 255, 255, 0.7); text-decoration: none; border-radius: 8px; margin-bottom: 8px; transition: all 0.3s; }
		.nav-item:hover, .nav-item.active { background: rgba(102, 126, 234, 0.2); color: white; }
		.main-content { margin-left: 250px; padding: 30px; }
		.page-header { margin-bottom: 30px; }
		.page-header h1 { font-size: 28px; color: #333; margin-bottom: 8px; }
		.page-header p { color: #666; font-size: 14px; }
		.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
		.stat-card { background: white; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); position: relative; overflow: hidden; }
		.stat-card::before { content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%; }
		.stat-card.styles::before { background: linear-gradient(180deg, #667eea, #764ba2); }
		.stat-card.providers::before { background: linear-gradient(180deg, #f093fb, #f5576c); }
		.stat-card.models::before { background: linear-gradient(180deg, #4facfe, #00f2fe); }
		.stat-card.online::before { background: linear-gradient(180deg, #43e97b, #38f9d7); }
		.stat-card.requests::before { background: linear-gradient(180deg, #fa709a, #fee140); }
		.stat-card.version::before { background: linear-gradient(180deg, #a8edea, #fed6e3); }
		.stat-card h3 { font-size: 13px; color: #888; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
		.stat-card .value { font-size: 36px; font-weight: 700; color: #333; }
		.stat-card .sub { font-size: 12px; color: #999; margin-top: 4px; }
		.stat-card .icon { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); font-size: 40px; opacity: 0.2; }
		.logout-btn { position: fixed; top: 20px; right: 20px; padding: 8px 16px; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; z-index: 100; }
		.logout-btn:hover { background: #dc2626; }
		.section { background: white; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); margin-bottom: 20px; }
		.section h2 { font-size: 18px; color: #333; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid #eee; }
		.backup-actions { display: flex; gap: 12px; flex-wrap: wrap; }
		.btn { padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.3s; display: inline-flex; align-items: center; gap: 8px; }
		.btn-primary { background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
		.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4); }
		.btn-secondary { background: #f3f4f6; color: #333; border: 1px solid #e5e7eb; }
		.btn-secondary:hover { background: #e5e7eb; }
		.btn-success { background: linear-gradient(135deg, #43e97b, #38f9d7); color: white; }
		.btn-success:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(67, 233, 123, 0.4); }
		.file-input { display: none; }
		.status-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; }
		.status-enabled { background: #dcfce7; color: #16a34a; }
		.status-disabled { background: #fee2e2; color: #dc2626; }
		.loading { opacity: 0.5; pointer-events: none; }
		.toast { position: fixed; bottom: 20px; right: 20px; padding: 16px 24px; border-radius: 8px; color: white; font-size: 14px; z-index: 1000; animation: slideIn 0.3s ease; }
		.toast-success { background: #16a34a; }
		.toast-error { background: #dc2626; }
		@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
		.detail-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
		.detail-card { background: #f9fafb; border-radius: 8px; padding: 16px; }
		.detail-card h4 { font-size: 14px; color: #666; margin-bottom: 12px; }
		.detail-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
		.detail-item:last-child { border-bottom: none; }
		.detail-item .label { color: #666; }
		.detail-item .value { color: #333; font-weight: 500; }
	</style>
</head>
<body>
	<div class="sidebar">
		<div class="sidebar-header">🎨 Flux AI Pro</div>
		<a href="/admin" class="nav-item active">📊 儀表板</a>
		<a href="/admin/styles" class="nav-item">🎨 風格管理</a>
		<a href="/admin/providers" class="nav-item">🤖 模型配置</a>
		<a href="/admin/parameters" class="nav-item">⚙️ 參數調整</a>
		<a href="/admin/settings" class="nav-item">🔧 系統設置</a>
	</div>

	<button class="logout-btn" onclick="logout()">登出</button>

	<div class="main-content">
		<div class="page-header">
			<h1>📊 儀表板</h1>
			<p>歡迎來到 Flux AI Pro 管理後台</p>
		</div>

		<div class="stats-grid">
			<div class="stat-card styles">
				<h3>總風格數</h3>
				<div class="value" id="totalStyles">-</div>
				<div class="sub"><span id="builtinStyles">-</span> 內建 · <span id="customStyles">-</span> 自訂</div>
				<div class="icon">🎨</div>
			</div>
			<div class="stat-card providers">
				<h3>供應商</h3>
				<div class="value" id="totalProviders">-</div>
				<div class="sub"><span id="enabledProviders">-</span> 啟用 · <span id="disabledProviders">-</span> 停用</div>
				<div class="icon">🔌</div>
			</div>
			<div class="stat-card models">
				<h3>模型數</h3>
				<div class="value" id="totalModels">-</div>
				<div class="sub"><span id="builtinModels">-</span> 內建 · <span id="customModels">-</span> 自訂</div>
				<div class="icon">🤖</div>
			</div>
			<div class="stat-card online">
				<h3>在線人數</h3>
				<div class="value" id="onlineCount">-</div>
				<div class="sub">即時統計</div>
				<div class="icon">👥</div>
			</div>
			<div class="stat-card requests">
				<h3>今日請求</h3>
				<div class="value" id="todayRequests">-</div>
				<div class="sub"><span id="successRequests">-</span> 成功 · <span id="failedRequests">-</span> 失敗</div>
				<div class="icon">📈</div>
			</div>
			<div class="stat-card version">
				<h3>系統版本</h3>
				<div class="value" id="version">v11.14.0</div>
				<div class="sub" id="lastUpdate">-</div>
				<div class="icon">📦</div>
			</div>
		</div>

		<div class="detail-grid">
			<div class="section">
				<h2>🔄 數據備份</h2>
				<p style="color: #666; margin-bottom: 16px;">導出或導入系統配置數據，包括風格、供應商、模型和參數設置。</p>
				<div class="backup-actions">
					<button class="btn btn-primary" onclick="exportBackup()">
						<span>📥</span> 導出備份
					</button>
					<label class="btn btn-success">
						<span>📤</span> 導入備份
						<input type="file" class="file-input" id="importFile" accept=".json" onchange="importBackup(event)">
					</label>
				</div>
			</div>

			<div class="section">
				<h2>📋 供應商狀態</h2>
				<div class="detail-card">
					<div id="providerDetails">
						<div class="detail-item"><span class="label">載入中...</span></div>
					</div>
				</div>
			</div>
		<script>
		const token = localStorage.getItem('adminToken');
		if (!token) {
			window.location.href = '/admin/login';
		}

		function logout() {
			localStorage.removeItem('adminToken');
			localStorage.removeItem('adminUser');
			window.location.href = '/admin/login';
		}

		function showToast(message, type) {
			type = type || 'success';
			const toast = document.createElement('div');
			toast.className = 'toast toast-' + type;
			toast.textContent = message;
			document.body.appendChild(toast);
			setTimeout(function() { toast.remove(); }, 3000);
		}

		async function loadStats() {
			try {
				const response = await fetch('/admin/api/stats', {
					headers: { 'Authorization': 'Bearer ' + token }
				});
				const data = await response.json();
				if (data.success) {
					const stats = data.stats;
					document.getElementById('totalStyles').textContent = stats.styles.total;
					document.getElementById('builtinStyles').textContent = stats.styles.builtin;
					document.getElementById('customStyles').textContent = stats.styles.custom;
					document.getElementById('totalProviders').textContent = stats.providers.total;
					document.getElementById('enabledProviders').textContent = stats.providers.enabled;
					document.getElementById('disabledProviders').textContent = stats.providers.disabled;
					document.getElementById('totalModels').textContent = stats.models.total;
					document.getElementById('builtinModels').textContent = stats.models.builtin;
					document.getElementById('customModels').textContent = stats.models.custom;
					document.getElementById('onlineCount').textContent = stats.online;
					document.getElementById('todayRequests').textContent = stats.daily.requests || 0;
					document.getElementById('successRequests').textContent = stats.daily.success || 0;
					document.getElementById('failedRequests').textContent = stats.daily.failed || 0;
					document.getElementById('version').textContent = stats.version;
					document.getElementById('lastUpdate').textContent = '更新: ' + new Date(stats.lastUpdate).toLocaleString('zh-TW');
				}
				await loadProviderDetails();
			} catch (error) {
				console.error('Failed to load stats:', error);
				showToast('載入統計數據失敗', 'error');
			}
		}

		async function loadProviderDetails() {
			try {
				const response = await fetch('/admin/api/providers', {
					headers: { 'Authorization': 'Bearer ' + token }
				});
				const data = await response.json();
				if (data.providers) {
					const container = document.getElementById('providerDetails');
					container.innerHTML = '';
					Object.entries(data.providers).forEach(function(entry) {
						const id = entry[0];
						const provider = entry[1];
						const item = document.createElement('div');
						item.className = 'detail-item';
						item.innerHTML = '<span class="label">' + (provider.name || id) + '</span><span class="status-badge ' + (provider.enabled !== false ? 'status-enabled' : 'status-disabled') + '">' + (provider.enabled !== false ? '啟用' : '停用') + '</span>';
						container.appendChild(item);
					});
				}
			} catch (error) {
				console.error('Failed to load provider details:', error);
			}
		}

		async function exportBackup() {
			try {
				const response = await fetch('/admin/api/backup', {
					headers: { 'Authorization': 'Bearer ' + token }
				});
				if (!response.ok) throw new Error('導出失敗');
				const blob = await response.blob();
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = 'flux-ai-backup-' + new Date().toISOString().split('T')[0] + '.json';
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				window.URL.revokeObjectURL(url);
				showToast('備份導出成功');
			} catch (error) {
				showToast('導出失敗: ' + error.message, 'error');
			}
		}

		async function importBackup(event) {
			const file = event.target.files[0];
			if (!file) return;
			try {
				const text = await file.text();
				const data = JSON.parse(text);
				const response = await fetch('/admin/api/backup', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + token
					},
					body: JSON.stringify(data)
				});
				const result = await response.json();
				if (result.success) {
					showToast('備份導入成功: ' + result.results.imported.join(', '));
					setTimeout(function() { loadStats(); }, 500);
				} else {
					throw new Error(result.error);
				}
			} catch (error) {
				showToast('導入失敗: ' + error.message, 'error');
			}
			event.target.value = '';
		}

		loadStats();
		setInterval(function() { loadStats(); }, 30000);
	</script>
</body>
</html>`;
	return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
}

// 渲染風格管理頁面// 渲染風格管理頁面
async function renderAdminStyles() {
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>風格管理 - Flux AI Pro 管理後台</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f5f5;
            min-height: 100vh;
        }
        .sidebar {
            position: fixed;
            left: 0;
            top: 0;
            width: 250px;
            height: 100%;
            background: #1a1a2e;
            color: white;
            padding: 20px;
        }
        .sidebar-header {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .nav-item {
            display: block;
            padding: 12px 16px;
            color: rgba(255, 255, 255, 0.7);
            text-decoration: none;
            border-radius: 8px;
            margin-bottom: 8px;
            transition: all 0.3s;
        }
        .nav-item:hover, .nav-item.active {
            background: rgba(102, 126, 234, 0.2);
            color: white;
        }
        .main-content {
            margin-left: 250px;
            padding: 30px;
        }
        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }
        .page-header h1 {
            font-size: 28px;
            color: #333;
        }
        .add-btn {
            padding: 10px 20px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
        }
        .styles-table {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .styles-table table {
            width: 100%;
            border-collapse: collapse;
        }
        .styles-table th {
            background: #f8f9fa;
            padding: 16px;
            text-align: left;
            font-weight: 600;
            color: #333;
            border-bottom: 1px solid #e9ecef;
        }
        .styles-table td {
            padding: 16px;
            border-bottom: 1px solid #e9ecef;
        }
        .action-btn {
            padding: 6px 12px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            margin-right: 8px;
        }
        .edit-btn {
            background: #667eea;
            color: white;
        }
        .delete-btn {
            background: #ef4444;
            color: white;
        }
        .logout-btn {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 8px 16px;
            background: #ef4444;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
        }
        .status-enabled {
            color: #10b981;
            font-weight: 500;
        }
        .status-disabled {
            color: #ef4444;
            font-weight: 500;
        }
        .badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 11px;
            margin-left: 8px;
        }
        .badge-builtin {
            background: #e0e7ff;
            color: #4f46e5;
        }
        .badge-custom {
            background: #d1fae5;
            color: #059669;
        }
        .stats-bar {
            display: flex;
            gap: 20px;
            margin-bottom: 20px;
            padding: 12px 16px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .stat {
            font-size: 14px;
            color: #666;
        }
        .stat strong {
            color: #333;
        }
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .modal-content {
            background: white;
            border-radius: 12px;
            padding: 24px;
            width: 90%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .modal-header h2 {
            font-size: 18px;
            color: #333;
        }
        .close-btn {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        }
        .form-group {
            margin-bottom: 16px;
        }
        .form-group label {
            display: block;
            font-size: 14px;
            color: #333;
            margin-bottom: 6px;
            font-weight: 500;
        }
        .form-group input, .form-group textarea, .form-group select {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 14px;
        }
        .form-group input:focus, .form-group textarea:focus, .form-group select:focus {
            outline: none;
            border-color: #667eea;
        }
        .form-group textarea {
            min-height: 80px;
            resize: vertical;
        }
        .modal-actions {
            display: flex;
            gap: 12px;
            margin-top: 20px;
        }
        .btn-save {
            flex: 1;
            padding: 10px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
        }
        .btn-cancel {
            flex: 1;
            padding: 10px;
            background: #e5e7eb;
            color: #333;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="sidebar">
        <div class="sidebar-header">🎨 Flux AI Pro</div>
        <a href="/admin" class="nav-item">📊 儀表板</a>
        <a href="/admin/styles" class="nav-item active">🎨 風格管理</a>
        <a href="/admin/providers" class="nav-item">🤖 模型配置</a>
        <a href="/admin/parameters" class="nav-item">⚙️ 參數調整</a>
        <a href="/admin/settings" class="nav-item">🔧 系統設置</a>
    </div>
    
    <button class="logout-btn" onclick="logout()">登出</button>
    
    <div class="main-content">
        <div class="page-header">
            <h1>風格管理</h1>
            <button class="add-btn" onclick="showCreateModal()">+ 新增風格</button>
        </div>
        
        <div class="stats-bar" id="styleStats">
            <span class="stat">載入中...</span>
        </div>
        
        <div class="styles-table">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>名稱</th>
                        <th>分類</th>
                        <th>狀態</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="stylesTableBody">
                    <tr><td colspan="5" style="text-align:center;">載入中...</td></tr>
                </tbody>
            </table>
        </div>
    </div>
    
    <!-- 風格編輯模態框 -->
    <div class="modal" id="styleModal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="modalTitle">新增風格</h2>
                <button class="close-btn" onclick="closeModal()">&times;</button>
            </div>
            <form id="styleForm">
                <input type="hidden" id="styleId">
                <div class="form-group">
                    <label>名稱（中文）</label>
                    <input type="text" id="styleNameZh" placeholder="風格中文名稱">
                </div>
                <div class="form-group">
                    <label>名稱（英文）</label>
                    <input type="text" id="styleNameEn" placeholder="Style English Name">
                </div>
                <div class="form-group">
                    <label>分類</label>
                    <select id="styleCategory">
                        <option value="basic">基礎</option>
                        <option value="illustration">插畫</option>
                        <option value="manga">漫畫</option>
                        <option value="realistic">寫實</option>
                        <option value="painting">繪畫</option>
                        <option value="digital">數位</option>
                        <option value="aesthetic">美學</option>
                        <option value="scifi">科幻</option>
                        <option value="fantasy">奇幻</option>
                        <option value="custom">自定義</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>圖標</label>
                    <input type="text" id="styleIcon" placeholder="🎨" maxlength="2">
                </div>
                <div class="form-group">
                    <label>提示詞</label>
                    <textarea id="stylePrompt" placeholder="風格提示詞..."></textarea>
                </div>
                <div class="form-group">
                    <label>負面提示詞</label>
                    <textarea id="styleNegative" placeholder="負面提示詞..."></textarea>
                </div>
            </form>
            <div class="modal-actions">
                <button class="btn-cancel" onclick="closeModal()">取消</button>
                <button class="btn-save" id="saveStyleBtn" onclick="saveStyle()">保存</button>
            </div>
        </div>
    </div>
    
    <script>
        const token = localStorage.getItem('adminToken');
        if (!token) {
            window.location.href = '/admin/login';
        }
        
        function logout() {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            window.location.href = '/admin/login';
        }
        
        let allStyles = [];
        
        async function loadStyles() {
            try {
                const response = await fetch('/admin/api/styles', {
                    headers: { 'Authorization': 'Bearer ' + token }
                });
                const data = await response.json();
                
                allStyles = data.styles || [];
                const tbody = document.getElementById('stylesTableBody');
                
                if (allStyles.length > 0) {
                    tbody.innerHTML = allStyles.map(style => {
                        const isBuiltin = style.builtin;
                        const statusClass = style.enabled ? 'status-enabled' : 'status-disabled';
                        const statusText = style.enabled ? '啟用' : '禁用';
                        const typeText = isBuiltin ? '<span class="badge badge-builtin">內建</span>' : '<span class="badge badge-custom">自定義</span>';
                        
                        return '<tr>' +
                            '<td>' + style.id + '</td>' +
                            '<td>' + style.icon + ' ' + (style.name?.zh || style.name?.en || style.id) + ' ' + typeText + '</td>' +
                            '<td>' + style.category + '</td>' +
                            '<td><span class="' + statusClass + '">' + statusText + '</span></td>' +
                            '<td>' +
                                (isBuiltin ?
                                    '<button class="action-btn edit-btn" onclick="editStyle(\'' + style.id + '\')">查看</button>' :
                                    '<button class="action-btn edit-btn" onclick="editStyle(\'' + style.id + '\')">編輯</button>' +
                                    '<button class="action-btn delete-btn" onclick="deleteStyle(\'' + style.id + '\')">刪除</button>'
                                ) +
                            '</td>' +
                        '</tr>';
                    }).join('');
                    
                    // 更新統計
                    document.getElementById('styleStats').innerHTML =
                        '<span class="stat">總計: ' + data.total + '</span>' +
                        '<span class="stat">內建: ' + data.builtin + '</span>' +
                        '<span class="stat">自定義: ' + data.custom + '</span>';
                } else {
                    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">暫無風格</td></tr>';
                }
            } catch (error) {
                console.error('Failed to load styles:', error);
                document.getElementById('stylesTableBody').innerHTML = '<tr><td colspan="5" style="text-align:center;">載入失敗: ' + error.message + '</td></tr>';
            }
        }
        
        function showCreateModal() {
            const modal = document.getElementById('styleModal');
            document.getElementById('modalTitle').textContent = '新增風格';
            document.getElementById('styleId').value = '';
            document.getElementById('styleNameZh').value = '';
            document.getElementById('styleNameEn').value = '';
            document.getElementById('styleCategory').value = 'custom';
            document.getElementById('styleIcon').value = '🎨';
            document.getElementById('stylePrompt').value = '';
            document.getElementById('styleNegative').value = '';
            modal.style.display = 'flex';
        }
        
        function editStyle(id) {
            const style = allStyles.find(s => s.id === id);
            if (!style) return;
            
            const modal = document.getElementById('styleModal');
            document.getElementById('modalTitle').textContent = style.builtin ? '查看風格' : '編輯風格';
            document.getElementById('styleId').value = style.id;
            document.getElementById('styleNameZh').value = style.name?.zh || '';
            document.getElementById('styleNameEn').value = style.name?.en || '';
            document.getElementById('styleCategory').value = style.category || 'custom';
            document.getElementById('styleIcon').value = style.icon || '🎨';
            document.getElementById('stylePrompt').value = style.prompt || '';
            document.getElementById('styleNegative').value = style.negative || '';
            
            // 內建風格只能查看
            if (style.builtin) {
                document.querySelectorAll('#styleModal input, #styleModal textarea').forEach(el => el.disabled = true);
                document.getElementById('saveStyleBtn').style.display = 'none';
            } else {
                document.querySelectorAll('#styleModal input, #styleModal textarea').forEach(el => el.disabled = false);
                document.getElementById('saveStyleBtn').style.display = 'inline-block';
            }
            
            modal.style.display = 'flex';
        }
        
        function closeModal() {
            document.getElementById('styleModal').style.display = 'none';
        }
        
        async function saveStyle() {
            const id = document.getElementById('styleId').value;
            const isNew = !id || id.startsWith('new');
            
            const styleData = {
                name: {
                    zh: document.getElementById('styleNameZh').value,
                    en: document.getElementById('styleNameEn').value
                },
                category: document.getElementById('styleCategory').value,
                icon: document.getElementById('styleIcon').value,
                prompt: document.getElementById('stylePrompt').value,
                negative: document.getElementById('styleNegative').value,
                enabled: true
            };
            
            try {
                const url = isNew ? '/admin/api/styles' : '/admin/api/styles/' + id;
                const method = isNew ? 'POST' : 'PUT';
                
                const response = await fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(styleData)
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    alert(isNew ? '風格創建成功！' : '風格更新成功！');
                    closeModal();
                    loadStyles();
                } else {
                    alert('操作失敗: ' + (data.error || '未知錯誤'));
                }
            } catch (error) {
                alert('網絡錯誤: ' + error.message);
            }
        }
        
        async function deleteStyle(id) {
            if (!confirm('確定要刪除此風格嗎？此操作無法撤銷。')) return;
            
            try {
                const response = await fetch('/admin/api/styles/' + id, {
                    method: 'DELETE',
                    headers: { 'Authorization': 'Bearer ' + token }
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    alert('風格已刪除！');
                    loadStyles();
                } else {
                    alert('刪除失敗: ' + (data.error || '未知錯誤'));
                }
            } catch (error) {
                alert('網絡錯誤: ' + error.message);
            }
        }
        
        loadStyles();
    </script>
</body>
</html>`;
  
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
}

// 渲染供應商管理頁面
async function renderAdminProviders() {
	const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>模型配置 - Flux AI Pro 管理後台</title>
	<style>
		* { margin: 0; padding: 0; box-sizing: border-box; }
		body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; min-height: 100vh; }
		.sidebar { position: fixed; left: 0; top: 0; width: 250px; height: 100%; background: #1a1a2e; color: white; padding: 20px; }
		.sidebar-header { font-size: 20px; font-weight: 600; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
		.nav-item { display: block; padding: 12px 16px; color: rgba(255, 255, 255, 0.7); text-decoration: none; border-radius: 8px; margin-bottom: 8px; transition: all 0.3s; }
		.nav-item:hover, .nav-item.active { background: rgba(102, 126, 234, 0.2); color: white; }
		.main-content { margin-left: 250px; padding: 30px; }
		.page-header h1 { font-size: 28px; color: #333; margin-bottom: 30px; }
		.logout-btn { position: fixed; top: 20px; right: 20px; padding: 8px 16px; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; }
		.stats-bar { display: flex; gap: 20px; margin-bottom: 30px; flex-wrap: wrap; }
		.stat-card { background: white; border-radius: 12px; padding: 20px; flex: 1; min-width: 150px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
		.stat-value { font-size: 28px; font-weight: 700; color: #667eea; }
		.stat-label { font-size: 13px; color: #666; margin-top: 5px; }
		.section-title { font-size: 18px; font-weight: 600; color: #333; margin: 30px 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; }
		.section-title:first-child { margin-top: 0; }
		.providers-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
		.provider-card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); transition: transform 0.2s, box-shadow 0.2s; border: 2px solid transparent; }
		.provider-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); }
		.provider-card.custom { border-color: #667eea; }
		.provider-card.disabled { opacity: 0.7; }
		.provider-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
		.provider-name { font-size: 16px; font-weight: 600; color: #333; display: flex; align-items: center; gap: 8px; }
		.provider-name .badge { font-size: 10px; padding: 2px 6px; border-radius: 4px; background: #667eea; color: white; }
		.provider-status { padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; }
		.provider-status.enabled { background: #dcfce7; color: #166534; }
		.provider-status.disabled { background: #fee2e2; color: #991b1b; }
		.provider-info { margin-bottom: 15px; }
		.provider-info p { font-size: 13px; color: #666; margin: 4px 0; }
		.provider-actions { display: flex; gap: 8px; flex-wrap: wrap; }
		.action-btn-small { padding: 6px 12px; border: none; border-radius: 4px; font-size: 12px; cursor: pointer; background: #f3f4f6; color: #374151; transition: background 0.2s; }
		.action-btn-small:hover { background: #e5e7eb; }
		.action-btn-small.edit { background: #667eea; color: white; }
		.action-btn-small.edit:hover { background: #5a67d8; }
		.action-btn-small.delete { background: #ef4444; color: white; }
		.action-btn-small.delete:hover { background: #dc2626; }
		.action-btn-small.test { background: #10b981; color: white; }
		.action-btn-small.test:hover { background: #059669; }
		.add-btn { padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; }
		.add-btn:hover { background: #5a67d8; }
		.custom-models-section { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); }
		.models-list { margin-top: 15px; }
		.models-table { width: 100%; border-collapse: collapse; }
		.models-table th, .models-table td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
		.models-table th { background: #f9fafb; font-weight: 600; color: #374151; }
		.status-badge { padding: 4px 8px; border-radius: 4px; font-size: 12px; }
		.status-badge.enabled { background: #d1fae5; color: #065f46; }
		.status-badge.disabled { background: #fee2e2; color: #991b1b; }
		.empty-text { color: #9ca3af; text-align: center; padding: 40px; }
		.error-text { color: #ef4444; text-align: center; padding: 20px; }
		.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
		.modal { background: white; border-radius: 16px; padding: 30px; width: 90%; max-width: 500px; max-height: 90vh; overflow-y: auto; position: relative; }
		.modal h2 { margin-bottom: 20px; color: #333; }
		.form-group { margin-bottom: 20px; }
		.form-group label { display: block; margin-bottom: 8px; font-weight: 500; color: #374151; }
		.form-group input, .form-group select, .form-group textarea { width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; }
		.form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline: none; border-color: #667eea; }
		.form-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px; }
		.btn-primary { padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer; }
		.btn-secondary { padding: 10px 20px; background: #e5e7eb; color: #374151; border: none; border-radius: 8px; cursor: pointer; }
		.test-result { margin-top: 15px; padding: 15px; border-radius: 8px; }
		.test-result.success { background: #dcfce7; border: 1px solid #86efac; }
		.test-result.error { background: #fee2e2; border: 1px solid #fca5a5; }
		.test-result h4 { margin-bottom: 10px; }
		.test-result p { font-size: 13px; margin: 4px 0; }
	</style>
</head>
<body>
	<div class="sidebar">
		<div class="sidebar-header">🎨 Flux AI Pro</div>
		<a href="/admin" class="nav-item">📊 儀表板</a>
		<a href="/admin/styles" class="nav-item">🎨 風格管理</a>
		<a href="/admin/providers" class="nav-item active">🤖 模型配置</a>
		<a href="/admin/parameters" class="nav-item">⚙️ 參數調整</a>
		<a href="/admin/settings" class="nav-item">🔧 系統設置</a>
	</div>
	<button class="logout-btn" onclick="logout()">登出</button>
	<div class="main-content">
		<h1>模型配置</h1>
		<div class="stats-bar">
			<div class="stat-card"><div class="stat-value" id="totalProviders">-</div><div class="stat-label">總供應商</div></div>
			<div class="stat-card"><div class="stat-value" id="enabledProviders">-</div><div class="stat-label">已啟用</div></div>
			<div class="stat-card"><div class="stat-value" id="customProviders">-</div><div class="stat-label">自定義</div></div>
			<div class="stat-card"><div class="stat-value" id="totalModels">-</div><div class="stat-label">模型總數</div></div>
		</div>
		<div class="section-title"><span>內建供應商</span></div>
		<div id="builtinProviders" class="providers-grid"><p>載入中...</p></div>
		<div class="section-title"><span>自定義供應商</span><button class="add-btn" onclick="showAddProviderModal()">+ 新增供應商</button></div>
		<div id="customProvidersGrid" class="providers-grid"><p>載入中...</p></div>
		<div class="section-title"><span>自定義模型</span><button class="add-btn" onclick="showAddModelModal()">+ 新增模型</button></div>
		<div class="custom-models-section"><div id="customModelsList" class="models-list">載入中...</div></div>
	</div>
	<div id="modalContainer"></div>
	<script>
		const token = localStorage.getItem('adminToken');
		if (!token) window.location.href = '/admin/login';
		function logout() { localStorage.removeItem('adminToken'); localStorage.removeItem('adminUser'); window.location.href = '/admin/login'; }
		let allProviders = {};
		let allCustomProviders = {};
		
		async function loadProviders() {
			try {
				const response = await fetch('/admin/api/providers', { headers: { 'Authorization': 'Bearer ' + token } });
				const data = await response.json();
				allProviders = data.providers || {};
				const total = Object.keys(allProviders).length;
				const enabled = Object.values(allProviders).filter(p => p.enabled !== false).length;
				document.getElementById('totalProviders').textContent = total;
				document.getElementById('enabledProviders').textContent = enabled;
				let modelCount = 0;
				Object.values(allProviders).forEach(p => { modelCount += (p.models?.length || 0); });
				document.getElementById('totalModels').textContent = modelCount;
				renderBuiltinProviders();
				await loadCustomProviders();
			} catch (error) {
				console.error('Failed to load providers:', error);
				document.getElementById('builtinProviders').innerHTML = '<p class="error-text">載入失敗</p>';
			}
		}
		
		function renderBuiltinProviders() {
			const container = document.getElementById('builtinProviders');
			const providers = Object.entries(allProviders).filter(([id, p]) => !p.custom);
			if (providers.length > 0) {
				container.innerHTML = providers.map(([id, provider]) => 
					'<div class="provider-card ' + (provider.enabled === false ? 'disabled' : '') + '">' +
						'<div class="provider-header">' +
							'<span class="provider-name">' + (provider.name || id) + '</span>' +
							'<span class="provider-status ' + (provider.enabled !== false ? 'enabled' : 'disabled') + '">' + (provider.enabled !== false ? '啟用' : '禁用') + '</span>' +
						'</div>' +
						'<div class="provider-info">' +
							'<p><strong>端點:</strong> ' + (provider.endpoint || 'N/A') + '</p>' +
							'<p><strong>模型數:</strong> ' + (provider.models?.length || 0) + '</p>' +
							'<p><strong>優先級:</strong> ' + (provider.priority || 'normal') + '</p>' +
						'</div>' +
						'<div class="provider-actions">' +
							'<button class="action-btn-small" onclick="toggleProvider(\'' + id + '\', ' + (provider.enabled !== false) + ')">' + (provider.enabled !== false ? '禁用' : '啟用') + '</button>' +
							'<button class="action-btn-small edit" onclick="editProvider(\'' + id + '\')">配置</button>' +
							'<button class="action-btn-small test" onclick="testProvider(\'' + id + '\')">測試</button>' +
						'</div>' +
					'</div>'
				).join('');
			} else {
				container.innerHTML = '<p class="empty-text">暫無內建供應商</p>';
			}
		}
		
		async function loadCustomProviders() {
			try {
				const response = await fetch('/admin/api/providers/custom', { headers: { 'Authorization': 'Bearer ' + token } });
				const data = await response.json();
				allCustomProviders = data.providers || {};
				document.getElementById('customProviders').textContent = Object.keys(allCustomProviders).length;
				const container = document.getElementById('customProvidersGrid');
				const providers = Object.entries(allCustomProviders);
				if (providers.length > 0) {
					container.innerHTML = providers.map(([id, provider]) => 
						'<div class="provider-card custom ' + (provider.enabled === false ? 'disabled' : '') + '">' +
							'<div class="provider-header">' +
								'<span class="provider-name">' + (provider.name || id) + ' <span class="badge">自定義</span></span>' +
								'<span class="provider-status ' + (provider.enabled !== false ? 'enabled' : 'disabled') + '">' + (provider.enabled !== false ? '啟用' : '禁用') + '</span>' +
							'</div>' +
							'<div class="provider-info">' +
								'<p><strong>類型:</strong> ' + (provider.type || 'openai') + '</p>' +
								'<p><strong>端點:</strong> ' + (provider.endpoint || 'N/A') + '</p>' +
								'<p><strong>API Key:</strong> ' + (provider.api_key ? '已配置' : '未配置') + '</p>' +
								'<p><strong>模型數:</strong> ' + (provider.models?.length || 0) + '</p>' +
							'</div>' +
							'<div class="provider-actions">' +
								'<button class="action-btn-small" onclick="toggleCustomProvider(\'' + id + '\', ' + (provider.enabled !== false) + ')">' + (provider.enabled !== false ? '禁用' : '啟用') + '</button>' +
								'<button class="action-btn-small edit" onclick="editCustomProvider(\'' + id + '\')">編輯</button>' +
								'<button class="action-btn-small test" onclick="testCustomProvider(\'' + id + '\')">測試</button>' +
								'<button class="action-btn-small delete" onclick="deleteCustomProvider(\'' + id + '\')">刪除</button>' +
							'</div>' +
						'</div>'
					).join('');
				} else {
					container.innerHTML = '<p class="empty-text">暫無自定義供應商，點擊上方按鈕新增</p>';
				}
			} catch (error) {
				console.error('Failed to load custom providers:', error);
				document.getElementById('customProvidersGrid').innerHTML = '<p class="error-text">載入失敗</p>';
			}
		}
		
		async function loadCustomModels() {
			try {
				const response = await fetch('/admin/api/models/custom', { headers: { 'Authorization': 'Bearer ' + token } });
				const data = await response.json();
				const container = document.getElementById('customModelsList');
				const models = Object.values(data.models || {});
				if (models.length > 0) {
					container.innerHTML = '<table class="models-table"><thead><tr><th>ID</th><th>名稱</th><th>供應商</th><th>模型 ID</th><th>狀態</th><th>操作</th></tr></thead><tbody>' +
						models.map(model => 
							'<tr>' +
								'<td>' + model.id + '</td>' +
								'<td>' + model.name + '</td>' +
								'<td>' + model.provider + '</td>' +
								'<td>' + model.model_id + '</td>' +
								'<td><span class="status-badge ' + (model.enabled ? 'enabled' : 'disabled') + '">' + (model.enabled ? '啟用' : '禁用') + '</span></td>' +
								'<td>' +
									'<button class="action-btn-small edit" onclick="editModel(\'' + model.id + '\')">編輯</button>' +
									'<button class="action-btn-small delete" onclick="deleteModel(\'' + model.id + '\')">刪除</button>' +
								'</td>' +
							'</tr>'
						).join('') + '</tbody></table>';
				} else {
					container.innerHTML = '<p class="empty-text">暫無自定義模型</p>';
				}
			} catch (error) {
				document.getElementById('customModelsList').innerHTML = '<p class="error-text">載入失敗</p>';
			}
		}
		
		async function toggleProvider(id, currentEnabled) {
			try {
				const response = await fetch('/admin/api/providers/' + id, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
					body: JSON.stringify({ enabled: !currentEnabled })
				});
				if (response.ok) loadProviders();
				else alert('操作失敗');
			} catch (error) { alert('網絡錯誤: ' + error.message); }
		}
		
		async function toggleCustomProvider(id, currentEnabled) {
			try {
				const response = await fetch('/admin/api/providers/custom/' + id, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
					body: JSON.stringify({ enabled: !currentEnabled })
				});
				if (response.ok) loadCustomProviders();
				else alert('操作失敗');
			} catch (error) { alert('網絡錯誤: ' + error.message); }
		}
		
		function editProvider(id) {
			const provider = allProviders[id];
			if (!provider) return;
			const modal = '<div class="modal-overlay" onclick="closeModal(event)">' +
				'<div class="modal" onclick="event.stopPropagation()">' +
					'<h2>配置供應商: ' + (provider.name || id) + '</h2>' +
					'<div class="form-group"><label>端點 URL</label><input type="text" id="editEndpoint" value="' + (provider.endpoint || '') + '" /></div>' +
					'<div class="form-group"><label>API Key (可選)</label><input type="password" id="editApiKey" value="' + (provider.apiKey || '') + '" placeholder="輸入新的 API Key" /></div>' +
					'<div class="form-group"><label>優先級</label><select id="editPriority">' +
						'<option value="high" ' + (provider.priority === 'high' ? 'selected' : '') + '>高</option>' +
						'<option value="normal" ' + (provider.priority === 'normal' || !provider.priority ? 'selected' : '') + '>普通</option>' +
						'<option value="low" ' + (provider.priority === 'low' ? 'selected' : '') + '>低</option>' +
					'</select></div>' +
					'<div class="form-actions">' +
						'<button class="btn-secondary" onclick="closeModal()">取消</button>' +
						'<button class="btn-primary" onclick="saveProvider(\'' + id + '\')">保存</button>' +
					'</div>' +
				'</div>' +
			'</div>';
			document.getElementById('modalContainer').innerHTML = modal;
		}
		
		async function saveProvider(id) {
			const endpoint = document.getElementById('editEndpoint').value;
			const apiKey = document.getElementById('editApiKey').value;
			const priority = document.getElementById('editPriority').value;
			const updateData = { endpoint, priority };
			if (apiKey) updateData.apiKey = apiKey;
			try {
				const response = await fetch('/admin/api/providers/' + id, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
					body: JSON.stringify(updateData)
				});
				if (response.ok) { closeModal(); loadProviders(); }
				else alert('保存失敗');
			} catch (error) { alert('網絡錯誤: ' + error.message); }
		}
		
		function testProvider(id) {
			const provider = allProviders[id];
			if (!provider) return;
			showTestModal(id, provider.endpoint, provider.apiKey, 'openai');
		}
		
		function testCustomProvider(id) {
			const provider = allCustomProviders[id];
			if (!provider) return;
			showTestModal(id, provider.endpoint, provider.api_key, provider.type);
		}
		
		function showTestModal(id, endpoint, apiKey, type) {
			const modal = '<div class="modal-overlay" onclick="closeModal(event)">' +
				'<div class="modal" onclick="event.stopPropagation()">' +
					'<h2>測試供應商連接</h2>' +
					'<div class="form-group"><label>供應商 ID</label><input type="text" value="' + id + '" disabled /></div>' +
					'<div class="form-group"><label>端點 URL</label><input type="text" id="testEndpoint" value="' + (endpoint || '') + '" /></div>' +
					'<div class="form-group"><label>API Key</label><input type="password" id="testApiKey" value="' + (apiKey || '') + '" /></div>' +
					'<div class="form-group"><label>供應商類型</label><select id="testType">' +
						'<option value="openai" ' + (type === 'openai' ? 'selected' : '') + '>OpenAI 兼容</option>' +
						'<option value="stability" ' + (type === 'stability' ? 'selected' : '') + '>Stability AI</option>' +
						'<option value="custom" ' + (type === 'custom' ? 'selected' : '') + '>自定義</option>' +
					'</select></div>' +
					'<div id="testResult"></div>' +
					'<div class="form-actions">' +
						'<button class="btn-secondary" onclick="closeModal()">關閉</button>' +
						'<button class="btn-primary" onclick="runTest(\'' + id + '\')">測試連接</button>' +
					'</div>' +
				'</div>' +
			'</div>';
			document.getElementById('modalContainer').innerHTML = modal;
		}
		
		async function runTest(id) {
			const endpoint = document.getElementById('testEndpoint').value;
			const apiKey = document.getElementById('testApiKey').value;
			const type = document.getElementById('testType').value;
			document.getElementById('testResult').innerHTML = '<p>測試中...</p>';
			try {
				const response = await fetch('/admin/api/providers/test/' + id, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
					body: JSON.stringify({ endpoint, api_key: apiKey, type })
				});
				const data = await response.json();
				if (data.success) {
					document.getElementById('testResult').innerHTML = '<div class="test-result success"><h4>✅ 連接成功</h4><p>狀態碼: ' + data.status + '</p><p>響應時間: ' + data.responseTime + '</p>' + (data.models?.length ? '<p>可用模型: ' + data.models.slice(0, 5).join(', ') + (data.models.length > 5 ? '...' : '') + '</p>' : '') + '</div>';
				} else {
					document.getElementById('testResult').innerHTML = '<div class="test-result error"><h4>❌ 連接失敗</h4><p>錯誤: ' + data.error + '</p>' + (data.status ? '<p>狀態碼: ' + data.status + '</p>' : '') + '</div>';
				}
			} catch (error) {
				document.getElementById('testResult').innerHTML = '<div class="test-result error"><h4>❌ 測試失敗</h4><p>' + error.message + '</p></div>';
			}
		}
		
		function showAddProviderModal() {
			const modal = '<div class="modal-overlay" onclick="closeModal(event)">' +
				'<div class="modal" onclick="event.stopPropagation()">' +
					'<h2>新增自定義供應商</h2>' +
					'<div class="form-group"><label>供應商 ID *</label><input type="text" id="newProviderId" placeholder="例如: my-openai" /></div>' +
					'<div class="form-group"><label>名稱 *</label><input type="text" id="newProviderName" placeholder="例如: 我的 OpenAI" /></div>' +
					'<div class="form-group"><label>端點 URL *</label><input type="text" id="newProviderEndpoint" placeholder="例如: https://api.openai.com" /></div>' +
					'<div class="form-group"><label>API Key</label><input type="password" id="newProviderApiKey" placeholder="輸入 API Key" /></div>' +
					'<div class="form-group"><label>供應商類型</label><select id="newProviderType">' +
						'<option value="openai">OpenAI 兼容</option>' +
						'<option value="stability">Stability AI</option>' +
						'<option value="custom">自定義</option>' +
					'</select></div>' +
					'<div class="form-group"><label>描述</label><textarea id="newProviderDesc" rows="2" placeholder="供應商描述"></textarea></div>' +
					'<div class="form-actions">' +
						'<button class="btn-secondary" onclick="closeModal()">取消</button>' +
						'<button class="btn-primary" onclick="createProvider()">創建</button>' +
					'</div>' +
				'</div>' +
			'</div>';
			document.getElementById('modalContainer').innerHTML = modal;
		}
		
		async function createProvider() {
			const id = document.getElementById('newProviderId').value.trim();
			const name = document.getElementById('newProviderName').value.trim();
			const endpoint = document.getElementById('newProviderEndpoint').value.trim();
			const api_key = document.getElementById('newProviderApiKey').value;
			const type = document.getElementById('newProviderType').value;
			const description = document.getElementById('newProviderDesc').value;
			if (!id || !name || !endpoint) { alert('請填寫必要欄位'); return; }
			try {
				const response = await fetch('/admin/api/providers/custom', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
					body: JSON.stringify({ id, name, endpoint, api_key, type, description, models: [] })
				});
				const data = await response.json();
				if (data.success) { closeModal(); loadCustomProviders(); }
				else alert('創建失敗: ' + (data.error || '未知錯誤'));
			} catch (error) { alert('網絡錯誤: ' + error.message); }
		}
		
		function editCustomProvider(id) {
			const provider = allCustomProviders[id];
			if (!provider) return;
			const modal = '<div class="modal-overlay" onclick="closeModal(event)">' +
				'<div class="modal" onclick="event.stopPropagation()">' +
					'<h2>編輯供應商: ' + provider.name + '</h2>' +
					'<div class="form-group"><label>名稱</label><input type="text" id="editProviderName" value="' + (provider.name || '') + '" /></div>' +
					'<div class="form-group"><label>端點 URL</label><input type="text" id="editProviderEndpoint" value="' + (provider.endpoint || '') + '" /></div>' +
					'<div class="form-group"><label>API Key</label><input type="password" id="editProviderApiKey" placeholder="留空保持不變" /></div>' +
					'<div class="form-group"><label>供應商類型</label><select id="editProviderType">' +
						'<option value="openai" ' + (provider.type === 'openai' ? 'selected' : '') + '>OpenAI 兼容</option>' +
						'<option value="stability" ' + (provider.type === 'stability' ? 'selected' : '') + '>Stability AI</option>' +
						'<option value="custom" ' + (provider.type === 'custom' ? 'selected' : '') + '>自定義</option>' +
					'</select></div>' +
					'<div class="form-group"><label>描述</label><textarea id="editProviderDesc" rows="2">' + (provider.description || '') + '</textarea></div>' +
					'<div class="form-actions">' +
						'<button class="btn-secondary" onclick="closeModal()">取消</button>' +
						'<button class="btn-primary" onclick="updateCustomProvider(\'' + id + '\')">保存</button>' +
					'</div>' +
				'</div>' +
			'</div>';
			document.getElementById('modalContainer').innerHTML = modal;
		}
		
		async function updateCustomProvider(id) {
			const name = document.getElementById('editProviderName').value;
			const endpoint = document.getElementById('editProviderEndpoint').value;
			const api_key = document.getElementById('editProviderApiKey').value;
			const type = document.getElementById('editProviderType').value;
			const description = document.getElementById('editProviderDesc').value;
			const updateData = { name, endpoint, type, description };
			if (api_key) updateData.api_key = api_key;
			try {
				const response = await fetch('/admin/api/providers/custom/' + id, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
					body: JSON.stringify(updateData)
				});
				if (response.ok) { closeModal(); loadCustomProviders(); }
				else alert('更新失敗');
			} catch (error) { alert('網絡錯誤: ' + error.message); }
		}
		
		async function deleteCustomProvider(id) {
			if (!confirm('確定要刪除此供應商嗎？此操作無法復原。')) return;
			try {
				const response = await fetch('/admin/api/providers/custom/' + id, {
					method: 'DELETE',
					headers: { 'Authorization': 'Bearer ' + token }
				});
				if (response.ok) loadCustomProviders();
				else alert('刪除失敗');
			} catch (error) { alert('網絡錯誤: ' + error.message); }
		}
		
		function showAddModelModal() {
			const providerOptions = Object.keys(allProviders).map(id => '<option value="' + id + '">' + (allProviders[id].name || id) + ' (內建)</option>').join('') +
				Object.keys(allCustomProviders).map(id => '<option value="' + id + '">' + (allCustomProviders[id].name || id) + ' (自定義)</option>').join('');
			const modal = '<div class="modal-overlay" onclick="closeModal(event)">' +
				'<div class="modal" onclick="event.stopPropagation()">' +
					'<h2>新增自定義模型</h2>' +
					'<div class="form-group"><label>模型 ID *</label><input type="text" id="newModelId" placeholder="例如: my-model-v1" /></div>' +
					'<div class="form-group"><label>顯示名稱 *</label><input type="text" id="newModelName" placeholder="例如: 我的模型 V1" /></div>' +
					'<div class="form-group"><label>所屬供應商 *</label><select id="newModelProvider"><option value="">選擇供應商</option>' + providerOptions + '</select></div>' +
					'<div class="form-group"><label>實際模型 ID *</label><input type="text" id="newModelRealId" placeholder="API 中使用的模型 ID" /></div>' +
					'<div class="form-group"><label>描述</label><textarea id="newModelDesc" rows="2" placeholder="模型描述"></textarea></div>' +
					'<div class="form-actions">' +
						'<button class="btn-secondary" onclick="closeModal()">取消</button>' +
						'<button class="btn-primary" onclick="createModel()">創建</button>' +
					'</div>' +
				'</div>' +
			'</div>';
			document.getElementById('modalContainer').innerHTML = modal;
		}
		
		async function createModel() {
			const id = document.getElementById('newModelId').value.trim();
			const name = document.getElementById('newModelName').value.trim();
			const provider = document.getElementById('newModelProvider').value;
			const model_id = document.getElementById('newModelRealId').value.trim();
			const description = document.getElementById('newModelDesc').value;
			if (!id || !name || !provider || !model_id) { alert('請填寫必要欄位'); return; }
			try {
				const response = await fetch('/admin/api/models/custom', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
					body: JSON.stringify({ id, name, provider, model_id, description })
				});
				const data = await response.json();
				if (data.success) { closeModal(); loadCustomModels(); }
				else alert('創建失敗: ' + (data.error || '未知錯誤'));
			} catch (error) { alert('網絡錯誤: ' + error.message); }
		}
		
		function editModel(id) {
			fetch('/admin/api/models/custom', { headers: { 'Authorization': 'Bearer ' + token } })
			.then(r => r.json())
			.then(data => {
				const model = data.models[id];
				if (!model) return;
				const providerOptions = Object.keys(allProviders).map(pid => '<option value="' + pid + '" ' + (model.provider === pid ? 'selected' : '') + '>' + (allProviders[pid].name || pid) + ' (內建)</option>').join('') +
					Object.keys(allCustomProviders).map(pid => '<option value="' + pid + '" ' + (model.provider === pid ? 'selected' : '') + '>' + (allCustomProviders[pid].name || pid) + ' (自定義)</option>').join('');
				const modal = '<div class="modal-overlay" onclick="closeModal(event)">' +
					'<div class="modal" onclick="event.stopPropagation()">' +
						'<h2>編輯模型</h2>' +
						'<div class="form-group"><label>顯示名稱</label><input type="text" id="editModelName" value="' + (model.name || '') + '" /></div>' +
						'<div class="form-group"><label>所屬供應商</label><select id="editModelProvider">' + providerOptions + '</select></div>' +
						'<div class="form-group"><label>實際模型 ID</label><input type="text" id="editModelRealId" value="' + (model.model_id || '') + '" /></div>' +
						'<div class="form-group"><label>描述</label><textarea id="editModelDesc" rows="2">' + (model.description || '') + '</textarea></div>' +
						'<div class="form-group"><label>狀態</label><select id="editModelEnabled">' +
							'<option value="true" ' + (model.enabled ? 'selected' : '') + '>啟用</option>' +
							'<option value="false" ' + (!model.enabled ? 'selected' : '') + '>禁用</option>' +
						'</select></div>' +
						'<div class="form-actions">' +
							'<button class="btn-secondary" onclick="closeModal()">取消</button>' +
							'<button class="btn-primary" onclick="updateModel(\'' + id + '\')">保存</button>' +
						'</div>' +
					'</div>' +
				'</div>';
				document.getElementById('modalContainer').innerHTML = modal;
			});
		}
		
		async function updateModel(id) {
			const name = document.getElementById('editModelName').value;
			const provider = document.getElementById('editModelProvider').value;
			const model_id = document.getElementById('editModelRealId').value;
			const description = document.getElementById('editModelDesc').value;
			const enabled = document.getElementById('editModelEnabled').value === 'true';
			try {
				const response = await fetch('/admin/api/models/custom/' + id, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
					body: JSON.stringify({ name, provider, model_id, description, enabled })
				});
				if (response.ok) { closeModal(); loadCustomModels(); }
				else alert('更新失敗');
			} catch (error) { alert('網絡錯誤: ' + error.message); }
		}
		
		async function deleteModel(id) {
			if (!confirm('確定要刪除此模型嗎？')) return;
			try {
				const response = await fetch('/admin/api/models/custom/' + id, {
					method: 'DELETE',
					headers: { 'Authorization': 'Bearer ' + token }
				});
				if (response.ok) loadCustomModels();
				else alert('刪除失敗');
			} catch (error) { alert('網絡錯誤: ' + error.message); }
		}
		
		function closeModal(event) {
			if (event && event.target !== event.currentTarget) return;
			document.getElementById('modalContainer').innerHTML = '';
		}
		
		loadProviders();
		loadCustomModels();
	</script>
</body>
</html>`;
	return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
}


async function renderAdminParameters() {
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>參數調整 - Flux AI Pro 管理後台</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f5f5;
            min-height: 100vh;
        }
        .sidebar {
            position: fixed;
            left: 0;
            top: 0;
            width: 250px;
            height: 100%;
            background: #1a1a2e;
            color: white;
            padding: 20px;
        }
        .sidebar-header {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .nav-item {
            display: block;
            padding: 12px 16px;
            color: rgba(255, 255, 255, 0.7);
            text-decoration: none;
            border-radius: 8px;
            margin-bottom: 8px;
            transition: all 0.3s;
        }
        .nav-item:hover, .nav-item.active {
            background: rgba(102, 126, 234, 0.2);
            color: white;
        }
        .main-content {
            margin-left: 250px;
            padding: 30px;
        }
        .page-header h1 {
            font-size: 28px;
            color: #333;
            margin-bottom: 30px;
        }
        .param-section {
            background: white;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .param-section h2 {
            font-size: 18px;
            color: #333;
            margin-bottom: 16px;
        }
        .param-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .param-item:last-child {
            border-bottom: none;
        }
        .param-label {
            color: #333;
            font-size: 14px;
        }
        .param-value {
            color: #666;
            font-size: 14px;
        }
        .logout-btn {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 8px 16px;
            background: #ef4444;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="sidebar">
        <div class="sidebar-header">🎨 Flux AI Pro</div>
        <a href="/admin" class="nav-item">📊 儀表板</a>
        <a href="/admin/styles" class="nav-item">🎨 風格管理</a>
        <a href="/admin/providers" class="nav-item">🤖 模型配置</a>
        <a href="/admin/parameters" class="nav-item active">⚙️ 參數調整</a>
        <a href="/admin/settings" class="nav-item">🔧 系統設置</a>
    </div>
    
    <button class="logout-btn" onclick="logout()">登出</button>
    
    <div class="main-content">
        <h1>參數調整</h1>
        <div id="parametersContainer">
            <p>載入中...</p>
        </div>
    </div>
    
    <script>
        const token = localStorage.getItem('adminToken');
        if (!token) {
            window.location.href = '/admin/login';
        }
        
        function logout() {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            window.location.href = '/admin/login';
        }
        
        async function loadParameters() {
            try {
                const response = await fetch('/admin/api/parameters', {
                    headers: { 'Authorization': 'Bearer ' + token }
                });
                const data = await response.json();
                
                const container = document.getElementById('parametersContainer');
                if (data.optimization_rules) {
                    let html = '<div class="param-section"><h2>優化規則</h2>';
                    Object.entries(data.optimization_rules.MODEL_STEPS || {}).forEach(([model, config]) => {
                        html += '<div class="param-item">' +
                            '<span class="param-label">' + model + ' 步數</span>' +
                            '<span class="param-value">' + config.min + ' - ' + config.max + ' (默認: ' + config.default + ')</span>' +
                        '</div>';
                    });
                    html += '</div>';
                    container.innerHTML = html;
                } else {
                    container.innerHTML = '<p>暫無參數配置</p>';
                }
            } catch (error) {
                console.error('Failed to load parameters:', error);
                document.getElementById('parametersContainer').innerHTML = '<p>載入失敗</p>';
            }
        }
        
        loadParameters();
    </script>
</body>
</html>`;
  
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
}

// 渲染系統設置頁面
async function renderAdminSettings() {
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>系統設置 - Flux AI Pro 管理後台</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f5f5;
            min-height: 100vh;
        }
        .sidebar {
            position: fixed;
            left: 0;
            top: 0;
            width: 250px;
            height: 100%;
            background: #1a1a2e;
            color: white;
            padding: 20px;
        }
        .sidebar-header {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .nav-item {
            display: block;
            padding: 12px 16px;
            color: rgba(255, 255, 255, 0.7);
            text-decoration: none;
            border-radius: 8px;
            margin-bottom: 8px;
            transition: all 0.3s;
        }
        .nav-item:hover, .nav-item.active {
            background: rgba(102, 126, 234, 0.2);
            color: white;
        }
        .main-content {
            margin-left: 250px;
            padding: 30px;
        }
        .page-header h1 {
            font-size: 28px;
            color: #333;
            margin-bottom: 30px;
        }
        .settings-section {
            background: white;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .settings-section h2 {
            font-size: 18px;
            color: #333;
            margin-bottom: 16px;
        }
        .setting-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .setting-item:last-child {
            border-bottom: none;
        }
        .setting-label {
            color: #333;
            font-size: 14px;
        }
        .setting-value {
            color: #666;
            font-size: 14px;
        }
        .logout-btn {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 8px 16px;
            background: #ef4444;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
        }
        .password-form {
            display: flex;
            flex-direction: column;
            gap: 16px;
            max-width: 400px;
        }
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        .form-group label {
            font-size: 14px;
            color: #333;
            font-weight: 500;
        }
        .form-group input {
            padding: 10px 14px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 14px;
        }
        .form-group input:focus {
            outline: none;
            border-color: #667eea;
        }
        .btn-primary {
            padding: 10px 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 14px;
            cursor: pointer;
            transition: transform 0.2s;
        }
        .btn-primary:hover {
            transform: translateY(-1px);
        }
        .btn-primary:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
        .message {
            padding: 10px 14px;
            border-radius: 6px;
            font-size: 14px;
            margin-top: 10px;
        }
        .message.success {
            background: #d4edda;
            color: #155724;
        }
        .message.error {
            background: #f8d7da;
            color: #721c24;
        }
    </style>
</head>
<body>
    <div class="sidebar">
        <div class="sidebar-header">🎨 Flux AI Pro</div>
        <a href="/admin" class="nav-item">📊 儀表板</a>
        <a href="/admin/styles" class="nav-item">🎨 風格管理</a>
        <a href="/admin/providers" class="nav-item">🤖 模型配置</a>
        <a href="/admin/parameters" class="nav-item">⚙️ 參數調整</a>
        <a href="/admin/settings" class="nav-item active">🔧 系統設置</a>
    </div>
    
    <button class="logout-btn" onclick="logout()">登出</button>
    
    <div class="main-content">
        <h1>系統設置</h1>
        <div id="settingsContainer">
            <p>載入中...</p>
        </div>
    </div>
    
    <script>
        const token = localStorage.getItem('adminToken');
        if (!token) {
            window.location.href = '/admin/login';
        }
        
        function logout() {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            window.location.href = '/admin/login';
        }
        
        async function loadSettings() {
            try {
                const response = await fetch('/admin/api/settings/global', {
                    headers: { 'Authorization': 'Bearer ' + token }
                });
                const data = await response.json();
                
                const container = document.getElementById('settingsContainer');
                let html = '';
                
                // 全局設置
                if (data.global_settings) {
                    html += '<div class="settings-section"><h2>全局設置</h2>';
                    html += '<div class="setting-item">' +
                        '<span class="setting-label">默認供應商</span>' +
                        '<span class="setting-value">' + (data.global_settings.defaultProvider || 'pollinations') + '</span>' +
                    '</div>';
                    html += '<div class="setting-item">' +
                        '<span class="setting-label">默認模型</span>' +
                        '<span class="setting-value">' + (data.global_settings.defaultModel || 'flux-2-dev') + '</span>' +
                    '</div>';
                    html += '<div class="setting-item">' +
                        '<span class="setting-label">默認尺寸</span>' +
                        '<span class="setting-value">' + (data.global_settings.defaultSize || 'square-1k') + '</span>' +
                    '</div>';
                    html += '</div>';
                }
                
                // 修改密碼區塊
                html += '<div class="settings-section"><h2>修改密碼</h2>';
                html += '<form class="password-form" id="passwordForm" onsubmit="return changePassword(event)">';
                html += '<div class="form-group">';
                html += '<label for="currentPassword">當前密碼</label>';
                html += '<input type="password" id="currentPassword" name="currentPassword" required placeholder="請輸入當前密碼">';
                html += '</div>';
                html += '<div class="form-group">';
                html += '<label for="newPassword">新密碼</label>';
                html += '<input type="password" id="newPassword" name="newPassword" required minlength="6" placeholder="請輸入新密碼（至少6個字符）">';
                html += '</div>';
                html += '<div class="form-group">';
                html += '<label for="confirmPassword">確認新密碼</label>';
                html += '<input type="password" id="confirmPassword" name="confirmPassword" required placeholder="請再次輸入新密碼">';
                html += '</div>';
                html += '<button type="submit" class="btn-primary" id="submitBtn">修改密碼</button>';
                html += '</form>';
                html += '<div id="passwordMessage"></div>';
                html += '</div>';
                
                container.innerHTML = html;
            } catch (error) {
                console.error('Failed to load settings:', error);
                document.getElementById('settingsContainer').innerHTML = '<p>載入失敗</p>';
            }
        }
        
        async function changePassword(event) {
            event.preventDefault();
            
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const messageDiv = document.getElementById('passwordMessage');
            const submitBtn = document.getElementById('submitBtn');
            
            // 清除之前的訊息
            messageDiv.innerHTML = '';
            messageDiv.className = '';
            
            // 驗證新密碼
            if (newPassword !== confirmPassword) {
                messageDiv.innerHTML = '新密碼與確認密碼不一致';
                messageDiv.className = 'message error';
                return false;
            }
            
            if (newPassword.length < 6) {
                messageDiv.innerHTML = '新密碼長度至少6個字符';
                messageDiv.className = 'message error';
                return false;
            }
            
            // 禁用按鈕
            submitBtn.disabled = true;
            submitBtn.textContent = '處理中...';
            
            try {
                const response = await fetch('/admin/api/settings/password', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({ currentPassword, newPassword })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    messageDiv.innerHTML = '密碼修改成功！';
                    messageDiv.className = 'message success';
                    document.getElementById('passwordForm').reset();
                } else {
                    messageDiv.innerHTML = data.error || '修改失敗';
                    messageDiv.className = 'message error';
                }
            } catch (error) {
                messageDiv.innerHTML = '網絡錯誤：' + error.message;
                messageDiv.className = 'message error';
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = '修改密碼';
            }
            
            return false;
        }
        
        loadSettings();
    </script>
</body>
</html>`;
  
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
}

// 內建風格定義
const BUILTIN_STYLES = [
  { id: 'none', name: { zh: '無風格', en: 'No Style' }, category: 'basic', icon: '⚡', enabled: true, builtin: true },
  { id: 'anime', name: { zh: '動漫風格', en: 'Anime Style' }, category: 'illustration', icon: '🎭', enabled: true, builtin: true },
  { id: 'ghibli', name: { zh: '吉卜力', en: 'Ghibli' }, category: 'illustration', icon: '🍃', enabled: true, builtin: true },
  { id: 'manga', name: { zh: '日本漫畫', en: 'Manga' }, category: 'manga', icon: '📖', enabled: true, builtin: true },
  { id: 'photorealistic', name: { zh: '照片寫實', en: 'Photorealistic' }, category: 'realistic', icon: '📷', enabled: true, builtin: true },
  { id: 'oil-painting', name: { zh: '油畫', en: 'Oil Painting' }, category: 'painting', icon: '🖼️', enabled: true, builtin: true },
  { id: 'watercolor', name: { zh: '水彩', en: 'Watercolor' }, category: 'painting', icon: '🎨', enabled: true, builtin: true },
  { id: 'cyberpunk', name: { zh: '賽博龐克', en: 'Cyberpunk' }, category: 'scifi', icon: '🌆', enabled: true, builtin: true },
  { id: 'fantasy', name: { zh: '奇幻', en: 'Fantasy' }, category: 'fantasy', icon: '🐉', enabled: true, builtin: true },
  { id: 'pixel-art', name: { zh: '像素藝術', en: 'Pixel Art' }, category: 'digital', icon: '👾', enabled: true, builtin: true },
  { id: '3d-render', name: { zh: '3D 渲染', en: '3D Render' }, category: 'digital', icon: '🎮', enabled: true, builtin: true },
  { id: 'steampunk', name: { zh: '蒸氣龐克', en: 'Steampunk' }, category: 'aesthetic', icon: '⚙️', enabled: true, builtin: true },
  { id: 'vintage', name: { zh: '復古', en: 'Vintage' }, category: 'aesthetic', icon: '📻', enabled: true, builtin: true },
  { id: 'minimalist', name: { zh: '極簡主義', en: 'Minimalist' }, category: 'visual', icon: '⬜', enabled: true, builtin: true },
  { id: 'sketch', name: { zh: '素描', en: 'Sketch' }, category: 'monochrome', icon: '✏️', enabled: true, builtin: true }
];

// API 實現函數
async function getAdminStyles(env) {
  try {
    const stylesData = await env.FLUX_KV.get('admin:styles', 'json');
    const customStyles = stylesData?.custom_styles || {};
    
    // 合併內建風格和自定義風格
    const allStyles = [...BUILTIN_STYLES, ...Object.values(customStyles).map(s => ({ ...s, builtin: false }))];
    
    return new Response(JSON.stringify({
      styles: allStyles,
      total: allStyles.length,
      builtin: BUILTIN_STYLES.length,
      custom: Object.keys(customStyles).length
    }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  }
}

async function createAdminStyle(request, env) {
  try {
    const body = await request.json();
    const styleId = 'custom_' + Date.now();
    
    const stylesData = await env.FLUX_KV.get('admin:styles', 'json') || { custom_styles: {}, style_categories: {} };
    stylesData.custom_styles[styleId] = {
      id: styleId,
      name: body.name || {},
      prompt: body.prompt || '',
      negative: body.negative || '',
      category: body.category || 'custom',
      icon: body.icon || '🎨',
      description: body.description || {},
      enabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await env.FLUX_KV.put('admin:styles', JSON.stringify(stylesData));
    
    return new Response(JSON.stringify({ success: true, styleId }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  }
}

async function updateAdminStyle(request, env, styleId) {
  try {
    const body = await request.json();
    const stylesData = await env.FLUX_KV.get('admin:styles', 'json');
    
    if (!stylesData || !stylesData.custom_styles[styleId]) {
      return new Response(JSON.stringify({ error: 'Style not found' }), { status: 404, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
    }
    
    stylesData.custom_styles[styleId] = {
      ...stylesData.custom_styles[styleId],
      ...body,
      updatedAt: new Date().toISOString()
    };
    
    await env.FLUX_KV.put('admin:styles', JSON.stringify(stylesData));
    
    return new Response(JSON.stringify({ success: true }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  }
}

async function deleteAdminStyle(env, styleId) {
  try {
    const stylesData = await env.FLUX_KV.get('admin:styles', 'json');
    
    if (!stylesData || !stylesData.custom_styles[styleId]) {
      return new Response(JSON.stringify({ error: 'Style not found' }), { status: 404, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
    }
    
    delete stylesData.custom_styles[styleId];
    await env.FLUX_KV.put('admin:styles', JSON.stringify(stylesData));
    
    return new Response(JSON.stringify({ success: true }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  }
}

async function getAdminProviders(env) {
	try {
		const providersData = await env.FLUX_KV.get('admin:providers', 'json');
		
		// 如果 KV 中沒有數據，返回 CONFIG.PROVIDERS 作為默認值
		const providers = (providersData?.providers && Object.keys(providersData.providers).length > 0)
			? providersData.providers
			: CONFIG.PROVIDERS;

		return new Response(JSON.stringify({
			providers: providers,
			global_settings: providersData?.global_settings || {}
		}), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
	}
}

async function updateAdminProvider(request, env, providerId) {
  try {
    const body = await request.json();
    const providersData = await env.FLUX_KV.get('admin:providers', 'json') || { providers: {}, global_settings: {} };
    
    if (!providersData.providers[providerId]) {
      return new Response(JSON.stringify({ error: 'Provider not found' }), { status: 404, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
    }
    
    providersData.providers[providerId] = {
      ...providersData.providers[providerId],
      ...body
    };
    
    await env.FLUX_KV.put('admin:providers', JSON.stringify(providersData));
    
    return new Response(JSON.stringify({ success: true }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  }
}

// Custom Models Management
async function getAdminCustomModels(env) {
  try {
    const customModelsData = await env.FLUX_KV.get('admin:custom_models', 'json') || { models: {} };
    return new Response(JSON.stringify({
      success: true,
      models: customModelsData.models
    }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  }
}

async function createAdminCustomModel(request, env) {
  try {
    const body = await request.json();
    const { id, name, provider, model_id, description, enabled = true } = body;
    
    if (!id || !name || !provider || !model_id) {
      return new Response(JSON.stringify({ error: 'Missing required fields: id, name, provider, model_id' }), {
        status: 400,
        headers: corsHeaders({ 'Content-Type': 'application/json' })
      });
    }
    
    const customModelsData = await env.FLUX_KV.get('admin:custom_models', 'json') || { models: {} };
    
    if (customModelsData.models[id]) {
      return new Response(JSON.stringify({ error: 'Model ID already exists' }), {
        status: 400,
        headers: corsHeaders({ 'Content-Type': 'application/json' })
      });
    }
    
    customModelsData.models[id] = {
      id,
      name,
      provider,
      model_id,
      description: description || '',
      enabled,
      created_at: new Date().toISOString(),
      custom: true
    };
    
    await env.FLUX_KV.put('admin:custom_models', JSON.stringify(customModelsData));
    
    return new Response(JSON.stringify({ success: true, model: customModelsData.models[id] }), {
      headers: corsHeaders({ 'Content-Type': 'application/json' })
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  }
}

async function updateAdminCustomModel(request, env, modelId) {
  try {
    const body = await request.json();
    const customModelsData = await env.FLUX_KV.get('admin:custom_models', 'json') || { models: {} };
    
    if (!customModelsData.models[modelId]) {
      return new Response(JSON.stringify({ error: 'Model not found' }), {
        status: 404,
        headers: corsHeaders({ 'Content-Type': 'application/json' })
      });
    }
    
    customModelsData.models[modelId] = {
      ...customModelsData.models[modelId],
      ...body,
      id: modelId, // Prevent ID change
      updated_at: new Date().toISOString()
    };
    
    await env.FLUX_KV.put('admin:custom_models', JSON.stringify(customModelsData));
    
    return new Response(JSON.stringify({ success: true, model: customModelsData.models[modelId] }), {
      headers: corsHeaders({ 'Content-Type': 'application/json' })
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  }
}

async function deleteAdminCustomModel(env, modelId) {
  try {
    const customModelsData = await env.FLUX_KV.get('admin:custom_models', 'json') || { models: {} };
    
    if (!customModelsData.models[modelId]) {
      return new Response(JSON.stringify({ error: 'Model not found' }), {
        status: 404,
        headers: corsHeaders({ 'Content-Type': 'application/json' })
      });
    }
    
    delete customModelsData.models[modelId];
    
    await env.FLUX_KV.put('admin:custom_models', JSON.stringify(customModelsData));
    
    return new Response(JSON.stringify({ success: true }), {
      headers: corsHeaders({ 'Content-Type': 'application/json' })
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  }
}

async function getAdminParameters(env) {
  try {
    const parametersData = await env.FLUX_KV.get('admin:parameters', 'json');
    
    return new Response(JSON.stringify({
      optimization_rules: parametersData?.optimization_rules || CONFIG.OPTIMIZATION_RULES,
      rate_limits: parametersData?.rate_limits || {},
      hd_optimization: parametersData?.hd_optimization || CONFIG.HD_OPTIMIZATION
    }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  }
}

async function updateAdminOptimization(request, env) {
  try {
    const body = await request.json();
    const parametersData = await env.FLUX_KV.get('admin:parameters', 'json') || { optimization_rules: {}, rate_limits: {}, hd_optimization: {} };
    
    parametersData.optimization_rules = {
      ...parametersData.optimization_rules,
      ...body
    };
    
    await env.FLUX_KV.put('admin:parameters', JSON.stringify(parametersData));
    
    return new Response(JSON.stringify({ success: true }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  }
}

async function updateAdminRateLimits(request, env) {
  try {
    const body = await request.json();
    const parametersData = await env.FLUX_KV.get('admin:parameters', 'json') || { optimization_rules: {}, rate_limits: {}, hd_optimization: {} };
    
    parametersData.rate_limits = {
      ...parametersData.rate_limits,
      ...body
    };
    
    await env.FLUX_KV.put('admin:parameters', JSON.stringify(parametersData));
    
    return new Response(JSON.stringify({ success: true }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  }
}

async function getAdminGlobalSettings(env) {
  try {
    const providersData = await env.FLUX_KV.get('admin:providers', 'json');
    
    return new Response(JSON.stringify({
      global_settings: providersData?.global_settings || {}
    }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  }
}

async function updateAdminGlobalSettings(request, env) {
  try {
    const body = await request.json();
    const providersData = await env.FLUX_KV.get('admin:providers', 'json') || { providers: {}, global_settings: {} };
    
    providersData.global_settings = {
      ...providersData.global_settings,
      ...body
    };
    
    await env.FLUX_KV.put('admin:providers', JSON.stringify(providersData));
    
    return new Response(JSON.stringify({ success: true }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  }
 }
 
 // 獲取儀表板統計數據
 async function getAdminStats(env) {
  try {
  	// 獲取風格統計
  	const stylesData = await env.FLUX_KV.get('admin:styles', 'json') || { custom_styles: {} };
  	const builtinCount = BUILTIN_STYLES.length;
  	const customStylesCount = Object.keys(stylesData.custom_styles || {}).length;
  	const totalStyles = builtinCount + customStylesCount;
 
  	// 獲取供應商統計
  	const providersData = await env.FLUX_KV.get('admin:providers', 'json') || { providers: {} };
  	const configProviders = Object.keys(CONFIG.PROVIDERS).length;
  	const enabledProviders = Object.values(providersData.providers || {}).filter(p => p.enabled !== false).length;
  	const totalProviders = configProviders;
 
  	// 獲取模型統計
  	const customModelsData = await env.FLUX_KV.get('admin:custom_models', 'json') || { models: {} };
  	const customModelsCount = Object.keys(customModelsData.models || {}).length;
  	let totalModels = 0;
  	Object.values(CONFIG.PROVIDERS).forEach(provider => {
  		if (provider.models) {
  			totalModels += provider.models.length;
  		}
  	});
  	totalModels += customModelsCount;
 
  	// 獲取在線人數
  	let onlineCount = 0;
  	try {
  		const list = await env.FLUX_KV.list({ prefix: 'online:' });
  		onlineCount = list.keys.length;
  	} catch(e) {
  		onlineCount = 0;
  	}
 
  	// 獲取今日請求數（從 KV 中獲取）
  	const today = new Date().toISOString().split('T')[0];
  	const dailyStats = await env.FLUX_KV.get(`stats:daily:${today}`, 'json') || { requests: 0, success: 0, failed: 0 };
 
  	return new Response(JSON.stringify({
  		success: true,
  		stats: {
  			styles: {
  				builtin: builtinCount,
  				custom: customStylesCount,
  				total: totalStyles
  			},
  			providers: {
  				total: totalProviders,
  				enabled: enabledProviders,
  				disabled: totalProviders - enabledProviders
  			},
  			models: {
  				builtin: totalModels - customModelsCount,
  				custom: customModelsCount,
  				total: totalModels
  			},
  			online: onlineCount,
  			daily: dailyStats,
  			version: 'v11.14.0',
  			lastUpdate: new Date().toISOString()
  		}
  	}), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  } catch (error) {
  	return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  }
 }
 
 // 導出備份數據
 async function exportAdminBackup(env) {
  try {
  	const backup = {
  		version: 'v11.14.0',
  		exportedAt: new Date().toISOString(),
  		data: {}
  	};
 
  	// 導出風格
  	const stylesData = await env.FLUX_KV.get('admin:styles', 'json');
  	if (stylesData) backup.data.styles = stylesData;
 
  	// 導出供應商配置
  	const providersData = await env.FLUX_KV.get('admin:providers', 'json');
  	if (providersData) backup.data.providers = providersData;
 
  	// 導出自定義模型
  	const customModelsData = await env.FLUX_KV.get('admin:custom_models', 'json');
  	if (customModelsData) backup.data.customModels = customModelsData;
 
  	// 導出參數配置
  	const parametersData = await env.FLUX_KV.get('admin:parameters', 'json');
  	if (parametersData) backup.data.parameters = parametersData;
 
  	// 導出管理員憑證
  	const credentials = await env.FLUX_KV.get('admin:credentials', 'json');
  	if (credentials) backup.data.credentials = credentials;
 
  	return new Response(JSON.stringify(backup, null, 2), {
  		headers: {
  			...corsHeaders({ 'Content-Type': 'application/json' }),
  			'Content-Disposition': `attachment; filename="flux-ai-backup-${new Date().toISOString().split('T')[0]}.json"`
  		}
  	});
  } catch (error) {
  	return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  }
 }
 
 // 導入備份數據
 async function importAdminBackup(request, env) {
  try {
  	const body = await request.json();
 
  	if (!body.data) {
  		return new Response(JSON.stringify({ error: 'Invalid backup format' }), { status: 400, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  	}
 
  	const results = { imported: [], errors: [] };
 
  	// 導入風格
  	if (body.data.styles) {
  		try {
  			await env.FLUX_KV.put('admin:styles', JSON.stringify(body.data.styles));
  			results.imported.push('styles');
  		} catch (e) {
  			results.errors.push(`styles: ${e.message}`);
  		}
  	}
 
  	// 導入供應商配置
  	if (body.data.providers) {
  		try {
  			await env.FLUX_KV.put('admin:providers', JSON.stringify(body.data.providers));
  			results.imported.push('providers');
  		} catch (e) {
  			results.errors.push(`providers: ${e.message}`);
  		}
  	}
 
  	// 導入自定義模型
  	if (body.data.customModels) {
  		try {
  			await env.FLUX_KV.put('admin:custom_models', JSON.stringify(body.data.customModels));
  			results.imported.push('customModels');
  		} catch (e) {
  			results.errors.push(`customModels: ${e.message}`);
  		}
  	}
 
  	// 導入參數配置
  	if (body.data.parameters) {
  		try {
  			await env.FLUX_KV.put('admin:parameters', JSON.stringify(body.data.parameters));
  			results.imported.push('parameters');
  		} catch (e) {
  			results.errors.push(`parameters: ${e.message}`);
  		}
  	}
 
  	// 導入管理員憑證（可選）
  	if (body.data.credentials) {
  		try {
  			await env.FLUX_KV.put('admin:credentials', JSON.stringify(body.data.credentials));
  			results.imported.push('credentials');
  		} catch (e) {
  			results.errors.push(`credentials: ${e.message}`);
  		}
  	}
 
  	return new Response(JSON.stringify({ success: true, results }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  	} catch (error) {
  		return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  	}
  }
  
  // ============================================
  // 自定義供應商管理 API
  // ============================================
  
  // 獲取自定義供應商列表
  async function getAdminCustomProviders(env) {
  	try {
  		const customProvidersData = await env.FLUX_KV.get('admin:custom_providers', 'json') || { providers: {} };
  		return new Response(JSON.stringify({
  			success: true,
  			providers: customProvidersData.providers
  		}), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  	} catch (error) {
  		return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  	}
  }
  
  // 創建自定義供應商
  async function createAdminCustomProvider(request, env) {
  	try {
  		const body = await request.json();
  		const { id, name, endpoint, api_key, models, description, enabled = true, type = 'openai' } = body;
  
  		if (!id || !name || !endpoint) {
  			return new Response(JSON.stringify({ error: '缺少必要欄位: id, name, endpoint' }), { status: 400, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  		}
  
  		// 檢查是否與內建供應商衝突
  		if (CONFIG.PROVIDERS[id]) {
  			return new Response(JSON.stringify({ error: '供應商 ID 與內建供應商衝突' }), { status: 400, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  		}
  
  		const customProvidersData = await env.FLUX_KV.get('admin:custom_providers', 'json') || { providers: {} };
  
  		if (customProvidersData.providers[id]) {
  			return new Response(JSON.stringify({ error: '供應商 ID 已存在' }), { status: 400, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  		}
  
  		customProvidersData.providers[id] = {
  			id,
  			name,
  			endpoint,
  			api_key: api_key || '',
  			models: models || [],
  			description: description || '',
  			enabled,
  			type,
  			custom: true,
  			created_at: new Date().toISOString()
  		};
  
  		await env.FLUX_KV.put('admin:custom_providers', JSON.stringify(customProvidersData));
  
  		return new Response(JSON.stringify({
  			success: true,
  			provider: customProvidersData.providers[id]
  		}), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  	} catch (error) {
  		return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  	}
  }
  
  // 更新自定義供應商
  async function updateAdminCustomProvider(request, env, providerId) {
  	try {
  		const body = await request.json();
  		const customProvidersData = await env.FLUX_KV.get('admin:custom_providers', 'json') || { providers: {} };
  
  		if (!customProvidersData.providers[providerId]) {
  			return new Response(JSON.stringify({ error: '供應商不存在' }), { status: 404, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  		}
  
  		customProvidersData.providers[providerId] = {
  			...customProvidersData.providers[providerId],
  			...body,
  			id: providerId, // 防止 ID 被修改
  			updated_at: new Date().toISOString()
  		};
  
  		await env.FLUX_KV.put('admin:custom_providers', JSON.stringify(customProvidersData));
  
  		return new Response(JSON.stringify({
  			success: true,
  			provider: customProvidersData.providers[providerId]
  		}), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  	} catch (error) {
  		return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  	}
  }
  
  // 刪除自定義供應商
  async function deleteAdminCustomProvider(env, providerId) {
  	try {
  		const customProvidersData = await env.FLUX_KV.get('admin:custom_providers', 'json') || { providers: {} };
  
  		if (!customProvidersData.providers[providerId]) {
  			return new Response(JSON.stringify({ error: '供應商不存在' }), { status: 404, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  		}
  
  		delete customProvidersData.providers[providerId];
  		await env.FLUX_KV.put('admin:custom_providers', JSON.stringify(customProvidersData));
  
  		return new Response(JSON.stringify({ success: true }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  	} catch (error) {
  		return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  	}
  }
  
  // 測試供應商連接
  async function testAdminProviderConnection(request, env, providerId) {
  	try {
  		const body = await request.json();
  		const { endpoint, api_key, type = 'openai' } = body;
  
  		if (!endpoint) {
  			return new Response(JSON.stringify({ error: '缺少端點 URL' }), { status: 400, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  		}
  
  		let testUrl = endpoint;
  		let testHeaders = { 'Content-Type': 'application/json' };
  		let testBody = null;
  
  		// 根據供應商類型設置測試請求
  		if (type === 'openai' || type === 'openai-compatible') {
  			// OpenAI 兼容 API 測試
  			testUrl = endpoint.replace(/\/$/, '') + '/v1/models';
  			if (api_key) {
  				testHeaders['Authorization'] = `Bearer ${api_key}`;
  			}
  		} else if (type === 'stability') {
  			// Stability AI 測試
  			testUrl = endpoint.replace(/\/$/, '') + '/v1/engines/list';
  			if (api_key) {
  				testHeaders['Authorization'] = `Bearer ${api_key}`;
  			}
  		} else {
  			// 通用測試 - 嘗試獲取模型列表
  			if (api_key) {
  				testHeaders['Authorization'] = `Bearer ${api_key}`;
  			}
  		}
  
  		const startTime = Date.now();
  		const response = await fetch(testUrl, {
  			method: 'GET',
  			headers: testHeaders
  		});
  		const responseTime = Date.now() - startTime;
  
  		if (response.ok) {
  			let models = [];
  			try {
  				const data = await response.json();
  				if (data.data && Array.isArray(data.data)) {
  					models = data.data.map(m => m.id).slice(0, 10);
  				} else if (Array.isArray(data)) {
  					models = data.map(m => m.id || m.name).slice(0, 10);
  				}
  			} catch (e) {
  				// JSON 解析失敗，但連接成功
  			}
  
  			return new Response(JSON.stringify({
  				success: true,
  				status: response.status,
  				responseTime: `${responseTime}ms`,
  				models: models,
  				message: '連接成功'
  			}), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  		} else {
  			let errorMessage = `HTTP ${response.status}`;
  			try {
  				const errorData = await response.json();
  				errorMessage = errorData.error?.message || errorData.message || errorMessage;
  			} catch (e) {}
  
  			return new Response(JSON.stringify({
  				success: false,
  				status: response.status,
  				responseTime: `${responseTime}ms`,
  				error: errorMessage,
  				message: '連接失敗: ' + errorMessage
  			}), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  		}
  	} catch (error) {
  		return new Response(JSON.stringify({
  			success: false,
  			error: error.message,
  			message: '連接失敗: ' + error.message
  		}), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  	}
  }
  
  // KV-based Online Counter (Free)
 async function handleHeartbeat(request, env) {
  const ip = request.headers.get('cf-connecting-ip') || 'unknown';
  const now = Math.floor(Date.now() / 1000);
  const key = `online:${ip}`;
  
  // 1. Update current user's heartbeat
  await env.FLUX_KV.put(key, now.toString(), { expirationTtl: 60 }); // Expire in 60s
  
  // 2. Count active keys (Approximate)
  // Note: KV list is eventually consistent and might be slow for huge lists.
  // For free tier small traffic, this is acceptable.
  // Ideally, we would use a counter in KV, but race conditions exist.
  // Instead, we just list keys with prefix 'online:'
  
  let count = 0;
  try {
      const list = await env.FLUX_KV.list({ prefix: 'online:' });
      count = list.keys.length;
  } catch(e) {
      count = 1; // Fallback
  }

  return new Response(JSON.stringify({ count }), { 
    headers: { 'Content-Type': 'application/json', ...corsHeaders() } 
  });
}

function handleUI(request, env) {
  const ip = request.headers.get('cf-connecting-ip') || 'unknown';
  const now = Math.floor(Date.now() / 1000);
  const key = `ratelimit:${ip}`;
    const hasInfipServerKey = !!(env && env.INFIP_API_KEY);
    const hasAquaServerKey = !!(env && env.AQUA_API_KEY);
    const hasKinaiServerKey = !!(env && env.KINAI_API_KEY);
    const hasAirforceServerKey = !!(env && env.AIRFORCE_API_KEY);
    const authStatus = CONFIG.POLLINATIONS_AUTH.enabled ? '<span style="color:#22c55e;font-weight:600;font-size:12px">🔐 已認證</span>' : '<span style="color:#f59e0b;font-weight:600;font-size:12px">⚠️ 需要 API Key</span>';
    
    // 生成樣式選單 HTML
  const url = new URL(request.url);
  const currentLang = url.searchParams.get('lang') || 'zh';
  const styleCategories = CONFIG.STYLE_CATEGORIES;
  const stylePresets = CONFIG.STYLE_PRESETS;
  let styleOptionsHTML = '';
  const sortedCategories = Object.entries(styleCategories).sort((a, b) => a[1].order - b[1].order);
  for (const [categoryKey, categoryInfo] of sortedCategories) {
    const stylesInCategory = Object.entries(stylePresets).filter(([key, style]) => style.category === categoryKey);
    if (stylesInCategory.length > 0) {
      // Get translated category name
      const categoryName = typeof categoryInfo.name === 'object' ? (categoryInfo.name[currentLang] || categoryInfo.name.zh || categoryInfo.name) : categoryInfo.name;
      styleOptionsHTML += `<optgroup label="${categoryInfo.icon} ${categoryName}">`;
      for (const [styleKey, styleConfig] of stylesInCategory) {
        const selected = styleKey === 'none' ? ' selected' : '';
        // Get translated style name
        let styleName = typeof styleConfig.name === 'object' ? (styleConfig.name[currentLang] || styleConfig.name.zh || styleConfig.name) : styleConfig.name;
        const enName = typeof styleConfig.name === 'object' ? (styleConfig.name.en || styleConfig.name) : styleConfig.name;
        if (styleName !== enName && enName) {
            styleName = `${styleName} (${enName})`;
        }
        styleOptionsHTML += `<option value="${styleKey}"${selected}>${styleConfig.icon} ${styleName}</option>`;
      }
      styleOptionsHTML += '</optgroup>';
    }
  }

  // 生成尺寸選單 HTML
  let sizeOptionsHTML = '';
  for (const [key, size] of Object.entries(CONFIG.PRESET_SIZES)) {
      const selected = key === 'square-1k' ? ' selected' : '';
      sizeOptionsHTML += `<option value="${key}"${selected}>${size.name} (${size.width}x${size.height})</option>`;
  }
  
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Flux AI Pro v${CONFIG.PROJECT_VERSION}</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎨</text></svg>">
<style>
/* 完整版 CSS 樣式 - Flux Pro 主界面 (深空紫主題) */
/* 頁腳樣式 */
.footer{padding:20px;text-align:center;font-size:12px;color:#64748b;border-top:1px solid rgba(255,255,255,0.05);margin-top:auto;line-height:1.8}
.footer a{color:#fbbf24;text-decoration:none;transition:0.3s;margin:0 4px}
.footer a:hover{text-decoration:underline;color:#f59e0b}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;background:linear-gradient(135deg,#0a0a0a 0%,#1a1a2e 100%);color:#fff;min-height:100vh}
.container{max-width:100%;margin:0;padding:0;height:100vh;display:flex;flex-direction:column}
.top-nav{background:rgba(255,255,255,0.05);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,0.1);padding:15px 25px;display:flex;justify-content:space-between;align-items:center;flex-shrink:0}
.nav-left{display:flex;align-items:center;gap:20px}
.logo{color:#f59e0b;font-size:24px;font-weight:800;text-shadow:0 0 20px rgba(245,158,11,0.6);display:flex;align-items:center;gap:10px}
.badge{background:linear-gradient(135deg,#10b981 0%,#059669 100%);padding:4px 10px;border-radius:12px;font-size:11px;font-weight:600}
.nav-menu{display:flex;gap:10px;align-items:center}
.nav-btn{padding:8px 16px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#9ca3af;cursor:pointer;font-size:14px;font-weight:600;transition:all 0.3s;display:flex;align-items:center;gap:6px;text-decoration:none}
.nav-btn:hover{border-color:#f59e0b;color:#fff}
.nav-btn.active{background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#fff;border-color:#f59e0b}
.nav-btn.nano-btn:hover {border-color: #FACC15; background: rgba(250, 204, 21, 0.1); color: #FACC15; box-shadow: 0 0 10px rgba(250, 204, 21, 0.2);}
.nav-btn.edit-btn:hover {border-color: #A855F7; background: rgba(168, 85, 247, 0.1); color: #A855F7; box-shadow: 0 0 10px rgba(168, 85, 247, 0.2);}
.lang-btn{padding:6px 10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#ccc;cursor:pointer;font-size:12px;margin-left:10px;position:relative}
.lang-dropdown{position:absolute;top:100%;right:0;background:rgba(20,20,25,0.95);backdrop-filter:blur(15px);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:8px 0;min-width:140px;display:none;z-index:1000;box-shadow:0 10px 40px rgba(0,0,0,0.5)}
.lang-dropdown.show{display:block}
.lang-option{padding:10px 16px;cursor:pointer;display:flex;align-items:center;gap:10px;transition:0.2s;color:#e5e7eb}
.lang-option:hover{background:rgba(245,158,11,0.1);color:#f59e0b}
.lang-option.active{background:rgba(245,158,11,0.2);color:#f59e0b}
.lang-flag{font-size:16px}
.lang-name{font-size:13px;font-weight:500}
/* RTL Support */
[dir="rtl"]{direction:rtl;text-align:right}
[dir="rtl"] .nav-left{flex-direction:row-reverse}
[dir="rtl"] .nav-menu{flex-direction:row-reverse}
[dir="rtl"] .logo{flex-direction:row-reverse}
[dir="rtl"] .left-panel{border-right:none;border-left:1px solid rgba(255,255,255,0.1)}
[dir="rtl"] .right-panel{border-left:none;border-right:1px solid rgba(255,255,255,0.1)}
[dir="rtl"] .gallery-actions{flex-direction:row-reverse}
[dir="rtl"] .gallery-meta{flex-direction:row-reverse}
.main-content{flex:1;display:flex;overflow:hidden}
.left-panel{width:320px;background:rgba(255,255,255,0.03);border-right:1px solid rgba(255,255,255,0.1);overflow-y:auto;padding:20px;flex-shrink:0}
.center-panel{flex:1;padding:20px;overflow-y:auto}
.right-panel{width:380px;background:rgba(255,255,255,0.03);border-left:1px solid rgba(255,255,255,0.1);overflow-y:auto;padding:20px;flex-shrink:0}
@media(max-width:1024px){.main-content{flex-direction:column}.left-panel,.right-panel{width:100%;border:none;border-bottom:1px solid rgba(255,255,255,0.1)}}
.page{display:none}
.page.active{display:block}
.page.active .main-content{display:flex}
.form-group{margin-bottom:16px}
label{display:block;margin-bottom:6px;font-weight:600;font-size:13px;color:#e5e7eb}
input,textarea,select{width:100%;padding:10px;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.2);border-radius:8px;color:#fff;font-size:13px;transition:all 0.3s}
input:focus,textarea:focus,select:focus{outline:none;border-color:#f59e0b;box-shadow:0 0 0 3px rgba(245,158,11,0.1)}
select{background-color:#1e293b!important;color:#e2e8f0!important;cursor:pointer}
.btn{padding:12px 24px;border:none;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.3s;display:inline-flex;align-items:center;gap:8px;justify-content:center;width:100%}
.btn-primary{background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#fff;box-shadow:0 4px 15px rgba(245,158,11,0.3)}
.btn-primary:disabled{opacity:0.5;cursor:not-allowed}
.gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px}
.gallery-item{background:rgba(0,0,0,0.4);border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);transition:all 0.3s}
.gallery-item img{width:100%;height:280px;object-fit:cover;display:block;cursor:pointer}
.gallery-info{padding:15px}
.gallery-meta{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:5px}
.model-badge,.seed-badge,.style-badge{padding:4px 10px;border-radius:6px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.1)}
.gallery-actions{display:flex;gap:8px;margin-top:10px}
.action-btn{padding:6px 12px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:6px;font-size:12px;color:#fff;cursor:pointer;flex:1}
.action-btn:hover{background:rgba(255,255,255,0.2)}
.loading{text-align:center;padding:60px 20px;color:#9ca3af}
.spinner{border:3px solid rgba(255,255,255,0.1);border-top:3px solid #f59e0b;border-radius:50%;width:40px;height:40px;animation:spin 1s linear infinite;margin:0 auto 15px}
@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
.history-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;padding:20px;background:rgba(255,255,255,0.03);border-radius:12px}
.history-stats{display:flex;gap:20px;font-size:14px}
.modal{display:none;position:fixed;z-index:1000;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,0.9);align-items:center;justify-content:center}
.modal.show{display:flex}
.modal-content img{max-width:90vw;max-height:90vh;border-radius:8px}
.modal-close{position:absolute;top:20px;right:20px;color:#fff;font-size:32px;cursor:pointer}
@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
/* 拖放區域樣式 - 主頁面版本 */
.drag-drop-zone {
    border: 2px dashed rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.2);
    min-height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
}
.drag-drop-zone:hover {
    border-color: rgba(245, 158, 11, 0.5);
    background: rgba(245, 158, 11, 0.05);
}
.drag-drop-zone.drag-over {
    border-color: #f59e0b;
    background: rgba(245, 158, 11, 0.15);
    transform: scale(1.02);
}
.drag-drop-zone .drag-icon {
    font-size: 32px;
    opacity: 0.7;
}
.drag-drop-zone .drag-text {
    font-size: 13px;
    color: #9ca3af;
}
.drag-drop-zone .drag-subtext {
    font-size: 11px;
    color: #6b7280;
}
/* 上傳進度條樣式 */
.upload-progress-container {
    width: 100%;
    margin-top: 10px;
    display: none;
}
.upload-progress-container.show {
    display: block;
}
.upload-progress-bar {
    width: 100%;
    height: 6px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    overflow: hidden;
}
.upload-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #f59e0b, #fbbf24);
    width: 0%;
    transition: width 0.3s ease;
    border-radius: 3px;
}
.upload-progress-text {
    font-size: 11px;
    color: #9ca3af;
    margin-top: 4px;
    text-align: center;
}
/* 生成進度條樣式 */
.generation-progress-container {
    width: 100%;
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}
.generation-progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}
.generation-progress-title {
    font-size: 14px;
    font-weight: 600;
    color: #e5e7eb;
}
.generation-progress-percentage {
    font-size: 14px;
    font-weight: 700;
    color: #f59e0b;
}
.generation-progress-bar {
    width: 100%;
    height: 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    overflow: hidden;
}
.generation-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b);
    background-size: 200% 100%;
    width: 0%;
    transition: width 0.3s ease;
    border-radius: 4px;
    animation: shimmer 2s infinite;
}
@keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}
.generation-progress-status {
    font-size: 12px;
    color: #9ca3af;
    margin-top: 8px;
    text-align: center;
}
.generation-progress-steps {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    font-size: 11px;
    color: #6b7280;
}
.generation-progress-step {
    display: flex;
    align-items: center;
    gap: 4px;
}
.generation-progress-step.active {
    color: #f59e0b;
}
.generation-progress-step.completed {
    color: #22c55e;
}
</style>
</head>
<body>
<div class="container">
<div class="top-nav">
    <div class="nav-left">
        <div class="logo">
    🎨 Flux AI Pro <span class="badge">v${CONFIG.PROJECT_VERSION}</span>
</div>
<div style="font-size:12px; color:#22c55e; margin-left:20px; display:flex; align-items:center; gap:6px; font-weight:normal; text-shadow:none; min-width:80px; min-height:20px;">
    <script id="_wau96x">var _wau = _wau || []; _wau.push(["dynamic", "yrofl40dzz", "96x", "c4302bffffff", "small"]);</script><script async src="https://waust.at/d.js"></script>
</div>
        <div><div class="api-status">${authStatus}</div></div>
    </div>
    <div class="nav-menu">
        <a href="/nano" target="_blank" class="nav-btn nano-btn" style="border-color:rgba(250,204,21,0.5);color:#FACC15;margin-right:5px">
            🍌 <span data-t="nav_nano">Nano版</span>
        </a>
        <button class="nav-btn active" data-page="generate"><span data-t="nav_gen">🎨 生成圖像</span></button>
        <button class="nav-btn" data-page="history"><span data-t="nav_his">📚 歷史記錄</span> <span id="historyCount" style="background:rgba(245,158,11,0.2);padding:2px 8px;border-radius:10px;font-size:11px">0</span></button>
        <div style="position:relative">
            <button class="lang-btn" id="langSwitch">
                <span id="currentLangFlag">🇹🇼</span>
                <span id="currentLangName">繁體中文</span>
                <span style="margin-left:4px">▼</span>
            </button>
            <div class="lang-dropdown" id="langDropdown">
                <div class="lang-option" data-lang="auto">
                    <span class="lang-flag">🌐</span>
                    <span class="lang-name">自動偵測</span>
                </div>
                <div class="lang-option" data-lang="zh">
                    <span class="lang-flag">🇹🇼</span>
                    <span class="lang-name">繁體中文</span>
                </div>
                <div class="lang-option" data-lang="en">
                    <span class="lang-flag">🇺🇸</span>
                    <span class="lang-name">English</span>
                </div>
                <div class="lang-option" data-lang="ja">
                    <span class="lang-flag">🇯🇵</span>
                    <span class="lang-name">日本語</span>
                </div>
                <div class="lang-option" data-lang="ko">
                    <span class="lang-flag">🇰🇷</span>
                    <span class="lang-name">한국어</span>
                </div>
                <div class="lang-option" data-lang="ar">
                    <span class="lang-flag">🇸🇦</span>
                    <span class="lang-name">العربية</span>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="generatePage" class="page active">
<div class="main-content">
<div class="left-panel">
<div class="section-title" data-t="settings_title">⚙️ 生成參數</div>
<form id="generateForm">
<div class="form-group">
    <label data-t="provider_label">API Provider (供應商)</label>
    <select id="provider">
        <option value="pollinations" selected>Pollinations.ai (Free)</option>
        <option value="infip">Ghostbot (Infip) 🌟</option>
        <option value="aqua">Aqua API 💧</option>
        <option value="kinai">Kinai API 🚀</option>
        <option value="airforce">Airforce API ✈️</option>
    </select>
</div>
<div class="form-group" id="apiKeyGroup" style="display:none; background:rgba(245, 158, 11, 0.1); padding:10px; border-radius:8px; border:1px solid rgba(245, 158, 11, 0.3);">
    <label>API Key <span style="font-weight:normal;opacity:0.7">(Stored locally)</span></label>
    <input type="password" id="apiKey" placeholder="Paste your API Key here">
    <div style="font-size:11px;color:#ccc;margin-top:6px">
        Get free key from <a id="apiKeysLink" href="https://infip.pro/api-keys" target="_blank" style="color:#f59e0b;text-decoration:underline">infip.pro/api-keys</a>
    </div>
</div>

<div class="form-group" id="nsfwGroup" style="display:none; align-items:center; justify-content:space-between; background:rgba(239, 68, 68, 0.1); padding:10px; border-radius:8px; border:1px solid rgba(239, 68, 68, 0.3);">
    <div>
        <label for="nsfwToggle" style="margin:0; cursor:pointer; color:#f87171;">🔞 解除成人內容限制 (NSFW)</label>
        <div style="font-size:11px; color:#fca5a5; margin-top:2px;">啟用此選項將允許生成成人內容 (Infip, Kinai)</div>
    </div>
    <input type="checkbox" id="nsfwToggle" style="width:20px; height:20px; cursor:pointer;">
</div>

<div class="form-group">
    <label data-t="model_label">模型選擇</label>
    <select id="model">
        <!-- JS will populate this -->
    </select>
</div>
<div class="form-group"><label data-t="size_label">尺寸預設</label><select id="size">${sizeOptionsHTML}</select></div>
<div class="form-group"><label data-t="style_label">藝術風格 🎨</label><select id="style">${styleOptionsHTML}</select></div>
<div class="form-group"><label data-t="quality_label">質量模式</label><select id="qualityMode"><option value="economy">Economy</option><option value="standard" selected>Standard</option><option value="ultra">Ultra HD</option></select></div>

<div class="form-group">
    <label data-t="seed_label">Seed (種子碼)</label>
    <div style="display:flex; gap:10px;">
        <input type="number" id="seed" value="-1" placeholder="Random (-1)" disabled style="flex:1; opacity: 0.7; cursor: not-allowed; font-family: monospace;">
        <button type="button" id="seedToggleBtn" class="btn" style="width:auto; padding:0 15px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2);">🎲</button>
    </div>
</div>

<div class="form-group" style="background:rgba(255,255,255,0.05); padding:10px; border-radius:8px; margin-top:15px;">
    <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
            <label for="autoOptimize" style="margin:0; cursor:pointer;" data-t="auto_opt_label">✨ 自動優化</label>
            <div style="font-size:11px; color:#9ca3af; margin-top:2px;" data-t="auto_opt_desc">自動調整 Steps 與 Guidance</div>
        </div>
        <input type="checkbox" id="autoOptimize" checked style="width:auto; width:20px; height:20px; cursor:pointer;">
    </div>
    
    <div id="batchGroup" style="display:none; margin-top:15px; border-top:1px solid rgba(255,255,255,0.1); padding-top:15px;">
        <div style="font-size:12px; color:#f59e0b; margin-bottom:10px; font-weight:bold;">🖼️ 批量生成</div>
        <div class="form-group">
            <label>生成數量 (Batch Size)</label>
            <select id="batchSize">
                <option value="1">1 張</option>
                <option value="2">2 張</option>
                <option value="3">3 張</option>
                <option value="4">4 張</option>
            </select>
        </div>
    </div>

    <div id="advancedParams" style="display:none; margin-top:15px; border-top:1px solid rgba(255,255,255,0.1); padding-top:15px;">
        <div style="font-size:12px; color:#f59e0b; margin-bottom:10px; font-weight:bold;" data-t="adv_settings">🛠️ 進階參數</div>
        
        <div class="form-group">
            <label data-t="steps_label">生成步數 (Steps)</label>
            <input type="number" id="steps" value="25" min="1" max="50">
        </div>
        
        <div class="form-group">
            <label data-t="guidance_label">引導係數 (Guidance)</label>
            <input type="number" id="guidanceScale" value="7.5" step="0.1" min="1" max="20">
        </div>
    </div>
</div>

<!-- 隊列狀態顯示 -->
<div id="queueStatus" style="margin-top:10px; padding:8px 12px; background:rgba(255,255,255,0.05); border-radius:8px; font-size:12px; display:none;">
    <div style="display:flex; align-items:center; gap:8px;">
        <span style="font-size:14px;">📊</span>
        <span id="queueStatusText">隊列狀態</span>
    </div>
</div>

<button type="submit" class="btn btn-primary" id="generateBtn" data-t="gen_btn" style="margin-top:10px;">🎨 開始生成</button>
</form>
</div>
<div class="center-panel">
<div id="results"><div class="empty-state"><p data-t="empty_title">尚未生成任何圖像</p></div></div>
</div>
<div class="right-panel">
<div class="form-group"><label data-t="pos_prompt">正面提示詞</label><textarea id="prompt" placeholder="Describe your image..." required></textarea></div>
<div class="form-group"><label data-t="neg_prompt">負面提示詞 (可選)</label><textarea id="negativePrompt" placeholder="What to avoid..." rows="4">nsfw, ugly, text, watermark, low quality, bad anatomy, distortion, blurry</textarea></div>
<div class="form-group" id="referenceImagesSection"><label data-t="ref_img">參考圖像 (Img2Img) 📸</label>
    <input type="file" id="imageUpload" accept="image/*" style="display:none">
    <div id="imageDropZone" class="drag-drop-zone">
        <div class="drag-icon">📷</div>
        <div class="drag-text">拖放圖片或點擊選擇</div>
        <div class="drag-subtext">支援 JPG, PNG, GIF (最大 32MB)</div>
        <div id="imageUploadProgress" class="upload-progress-container">
            <div class="upload-progress-bar">
                <div class="upload-progress-fill" id="imageUploadProgressFill"></div>
            </div>
            <div class="upload-progress-text" id="imageUploadProgressText">上傳中... 0%</div>
        </div>
    </div>
    <textarea id="referenceImages" placeholder="Image URL (or upload above)" rows="3" style="margin-top:10px;"></textarea>
    <div style="font-size:11px; color:#9ca3af; margin-top:4px;">* 支援模型: Flux 2 Dev, Imagen 4, Flux, Klein, NanoBanana (Aqua)</div>
</div>

<!-- ====== 專業提示詞生成器 (Pollinations) ====== -->
<div class="form-group" style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1)); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 12px; padding: 16px; margin-top: 20px;">
    <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
        <span style="font-size: 18px;">🤖</span>
        <span style="font-weight: 700; color: #a78bfa;" data-t="prompt_generator_title">專業提示詞生成器</span>
        <span style="font-size: 10px; background: rgba(139, 92, 246, 0.3); padding: 2px 8px; border-radius: 10px; margin-left: auto;">Pollinations</span>
    </label>
    
    <div style="margin-bottom: 12px;">
        <label style="font-size: 11px; color: #9ca3af; margin-bottom: 6px; display: block;" data-t="prompt_generator_upload_ref">上傳參考圖片 (可選 - 用於圖片分析)</label>
        <input type="file" id="promptImageUpload" accept="image/*" style="display:none">
        <div id="promptImageDropZone" class="drag-drop-zone">
            <div class="drag-icon">📷</div>
            <div class="drag-text" data-t="prompt_generator_select_image">拖放圖片或點擊選擇</div>
            <div class="drag-subtext">支援 JPG, PNG, GIF (最大 32MB)</div>
            <div id="promptImageUploadProgress" class="upload-progress-container">
                <div class="upload-progress-bar">
                    <div class="upload-progress-fill" id="promptImageUploadProgressFill"></div>
                </div>
                <div class="upload-progress-text" id="promptImageUploadProgressText">上傳中... 0%</div>
            </div>
        </div>
        <button type="button" id="promptImageClearBtn"
                style="width: 100%; margin-top: 6px; background: rgba(239, 68, 68, 0.2); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.4); padding: 6px 10px; border-radius: 6px; font-size: 11px; cursor: pointer; display: none;">
            <span>✕ 清除圖片</span>
        </button>
        <div id="promptImagePreview" style="display: none; margin-top: 8px;">
            <img id="promptImagePreviewImg" src="" alt="預覽" style="max-width: 100%; max-height: 120px; border-radius: 6px; border: 1px solid rgba(139, 92, 246, 0.3);">
        </div>
    </div>
    
    <div style="margin-bottom: 12px;">
        <label style="font-size: 11px; color: #9ca3af; margin-bottom: 6px; display: block;" data-t="prompt_generator_simple_desc">簡單描述你想要的畫面</label>
        <textarea id="promptInput" placeholder="例如：一隻可愛的貓咪在陽光下睡覺..."
                  rows="3" style="width: 100%; background: rgba(0,0,0,0.3); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 8px; padding: 10px 12px; color: #fff; font-size: 13px; resize: none;"></textarea>
    </div>
    
    <div style="font-size: 11px; color: #f59e0b; margin-bottom: 12px; background: rgba(245, 158, 11, 0.1); padding: 8px; border-radius: 6px; border: 1px solid rgba(245, 158, 11, 0.2);" data-t="prompt_generator_tip">
        💡 <strong>小提示：</strong> 選擇左側的「藝術風格」後，生成器會自動融合該風格（如：賽博龐克、水墨畫等）到提示詞中，讓畫面更具藝術感！
    </div>

    <div style="display: flex; gap: 10px; margin-bottom: 12px;">
        <button type="button" id="generatePromptBtn"
                style="flex: 1; background: linear-gradient(135deg, #8b5cf6, #3b82f6); color: #fff; border: none; padding: 12px 16px; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 6px;">
            <span>✨</span>
            <span data-t="prompt_generator_generate">生成專業提示詞</span>
        </button>
        <button type="button" id="applyPromptBtn"
                style="flex: 1; background: rgba(34, 197, 94, 0.2); color: #22c55e; border: 1px solid rgba(34, 197, 94, 0.4); padding: 12px 16px; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; transition: all 0.3s; display: none;">
            <span>✓</span>
            <span data-t="prompt_generator_apply">應用到提示詞</span>
        </button>
    </div>
    
    <div id="generatedPromptContainer" style="display: none;">
        <label style="font-size: 11px; color: #a78bfa; margin-bottom: 6px; display: block;" data-t="prompt_generator_generated">生成的專業提示詞</label>
        <div id="generatedPrompt"
             style="background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 8px; padding: 12px; color: #e0e7ff; font-size: 13px; line-height: 1.6; max-height: 150px; overflow-y: auto; white-space: pre-wrap;"></div>
    </div>
    
    <div id="promptGeneratorStatus" style="font-size: 11px; color: #9ca3af; margin-top: 8px; display: none;"></div>
</div>
</div></div></div>
<div id="historyPage" class="page">
<div class="main-content" style="flex-direction:column;padding:20px">
<div class="history-header">
<div class="history-stats"><div class="stat-item"><div class="label" data-t="stat_total">📊 總記錄數</div><div class="value" id="historyTotal">0</div></div><div class="stat-item"><div class="label" data-t="stat_storage">💾 存儲空間 (永久)</div><div class="value" id="storageSize">0 KB</div></div></div>
<div class="history-actions"><button class="btn btn-secondary" id="exportBtn" style="width:auto;padding:10px 20px" data-t="btn_export">📥 導出</button><button class="btn btn-danger" id="clearBtn" style="width:auto;padding:10px 20px" data-t="btn_clear">🗑️ 清空</button></div>
</div>
<div id="historyList" style="padding:0 20px"><p>Loading history...</p></div>
</div></div>
<div id="imageModal" class="modal">
    <div class="modal-content" style="position:relative; display:flex; flex-direction:column; align-items:center;">
        <img id="modalImage" src="" style="max-height:85vh; margin-bottom:15px;">
        <div style="display:flex; gap:15px;">
            <a id="modalDownload" href="#" class="btn btn-primary" download="image.png" style="text-decoration:none; width:auto; padding:10px 25px;">
                📥 保存圖片
            </a>
            <button class="btn" onclick="document.getElementById('imageModal').classList.remove('show')" style="width:auto; background:rgba(255,255,255,0.1);">
                ❌ 關閉
            </button>
        </div>
    </div>
    <div class="modal-close" id="modalCloseBtn">×</div>
</div>
<script>
// ====== 性能優化模塊 ======
const PerformanceOptimizer = {
    // 請求控制器 - 用於取消進行中的請求
    abortController: null,
    
    // 請求隊列管理
    requestQueue: [],
    isProcessing: false,
    maxConcurrent: 2,
    
    // 圖片懶加載觀察器
    lazyObserver: null,
    
    // 緩存管理
    cache: {
        images: new Map(),
        requests: new Map(),
        
        set(key, value, ttl = 3600000) {
            this.images.set(key, { value, expiry: Date.now() + ttl });
        },
        
        get(key) {
            const item = this.images.get(key);
            if (!item) return null;
            if (Date.now() > item.expiry) {
                this.images.delete(key);
                return null;
            }
            return item.value;
        },
        
        clear() {
            this.images.clear();
        },
        
        // 清理過期緩存
        cleanup() {
            const now = Date.now();
            for (const [key, item] of this.images.entries()) {
                if (now > item.expiry) {
                    this.images.delete(key);
                }
            }
        }
    },
    
    // 初始化懶加載
    initLazyLoad() {
        if ('IntersectionObserver' in window) {
            this.lazyObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            this.lazyObserver.unobserve(img);
                        }
                    }
                });
            }, { rootMargin: '100px' });
        }
    },
    
    // 懶加載圖片
    lazyLoad(img) {
        if (this.lazyObserver) {
            this.lazyObserver.observe(img);
        } else {
            // 後備方案：直接加載
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        }
    },
    
    // 取消當前請求
    cancelRequest() {
        if (this.abortController) {
            this.abortController.abort();
            this.abortController = null;
        }
    },
    
    // 創建新的請求控制器
    createRequestController() {
        this.cancelRequest();
        this.abortController = new AbortController();
        return this.abortController;
    },
    
    // 添加請求到隊列
    async addToQueue(requestFn) {
        return new Promise((resolve, reject) => {
            this.requestQueue.push({ fn: requestFn, resolve, reject });
            this.processQueue();
        });
    },
    
    // 處理請求隊列
    async processQueue() {
        if (this.isProcessing || this.requestQueue.length === 0) return;
        
        this.isProcessing = true;
        const concurrent = Math.min(this.maxConcurrent, this.requestQueue.length);
        const promises = [];
        
        for (let i = 0; i < concurrent; i++) {
            const item = this.requestQueue.shift();
            if (item) {
                promises.push(this.executeRequest(item));
            }
        }
        
        await Promise.allSettled(promises);
        this.isProcessing = false;
        
        // 繼續處理隊列
        if (this.requestQueue.length > 0) {
            this.processQueue();
        }
    },
    
    // 執行單個請求
    async executeRequest(item) {
        try {
            const result = await item.fn();
            item.resolve(result);
        } catch (error) {
            item.reject(error);
        }
    },
    
    // 生成緩存鍵
    generateCacheKey(prompt, model, width, height, style, seed) {
        return prompt + '-' + model + '-' + width + 'x' + height + '-' + style + '-' + seed;
    },
    
    // 防抖函數
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // 節流函數
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// 初始化性能優化
PerformanceOptimizer.initLazyLoad();
// 定期清理過期緩存
setInterval(() => PerformanceOptimizer.cache.cleanup(), 300000); // 每5分鐘清理一次

// ====== IndexedDB 管理核心 (解決死圖) ======
const DB_NAME='FluxAI_DB',STORE_NAME='images',DB_VERSION=2;
const dbPromise=new Promise((resolve,reject)=>{
    const req=indexedDB.open(DB_NAME,DB_VERSION);
    req.onupgradeneeded=(e)=>{
        const db=e.target.result;
        if(!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME,{keyPath:'id'});
    };
    req.onsuccess=(e)=>resolve(e.target.result);
    req.onerror=(e)=>reject(e.target.error);
});
async function saveToDB(item){
    const db=await dbPromise;
    return new Promise((resolve)=>{
        const tx=db.transaction(STORE_NAME,'readwrite');
        const store=tx.objectStore(STORE_NAME);
        store.put(item);
        tx.oncomplete=()=>resolve();
    });
}
async function getHistoryFromDB(){
    const db=await dbPromise;
    return new Promise((resolve)=>{
        const tx=db.transaction(STORE_NAME,'readonly');
        const store=tx.objectStore(STORE_NAME);
        const req=store.getAll();
        req.onsuccess=()=>resolve((req.result||[]).sort((a,b)=>new Date(b.timestamp)-new Date(a.timestamp)));
    });
}
async function deleteFromDB(id){
    const db=await dbPromise;
    const tx=db.transaction(STORE_NAME,'readwrite');
    tx.objectStore(STORE_NAME).delete(id);
    await new Promise(r=>tx.oncomplete=r);
    updateHistoryDisplay();
}
async function clearDB(){
    const db=await dbPromise;
    const tx=db.transaction(STORE_NAME,'readwrite');
    tx.objectStore(STORE_NAME).clear();
    await new Promise(r=>tx.oncomplete=r);
    updateHistoryDisplay();
}

// ====== I18N 與 UI 邏輯 ======
// 多語言支援（繁體中文、英文、日文、韓文）
const I18N={
    zh:{
        nav_gen:"🎨 生成圖像", nav_his:"📚 歷史記錄", nav_nano:"Nano版", settings_title:"⚙️ 生成參數", provider_label:"API 供應商", model_label:"模型選擇", size_label:"尺寸預設", style_label:"藝術風格 🎨", quality_label:"質量模式", seed_label:"Seed (種子碼)", seed_random:"🎲 隨機", seed_lock:"🔒 鎖定", auto_opt_label:"✨ 自動優化", auto_opt_desc:"自動調整 Steps 與 Guidance", adv_settings:"🛠️ 進階參數", steps_label:"生成步數 (Steps)", guidance_label:"引導係數 (Guidance)", gen_btn:"🎨 開始生成", empty_title:"尚未生成任何圖像", pos_prompt:"正面提示詞", neg_prompt:"負面提示詞 (可選)", ref_img:"參考圖像 URL (Flux 2 Dev / Imagen 4 專用)", stat_total:"📊 總記錄數", stat_storage:"💾 存儲空間 (永久)", btn_export:"📥 導出", btn_clear:"🗑️ 清空", no_history:"暫無歷史記錄", btn_reuse:"🔄 重用", btn_dl:"💾 下載",
        cooldown_msg: "⏳ 請等待冷卻時間...",
        quality_economy: "Economy", quality_standard: "Standard", quality_ultra: "Ultra HD",
        provider_pollinations: "Pollinations.ai (Free)", provider_infip: "Ghostbot (Infip) 🌟", provider_airforce: "Airforce API ✈️",
        api_key_label: "API Key", api_key_desc: "Stored locally", api_key_placeholder: "Paste your API Key here",
        nsfw_label: "🔞 解除成人內容限制 (NSFW)", nsfw_desc: "啟用此選項將允許生成成人內容 (Infip, Kinai)",
        batch_label: "🖼️ 批量生成", batch_size_label: "生成數量 (Batch Size)",
        prompt_generator_title: "專業提示詞生成器", prompt_generator_upload_ref: "上傳參考圖片 (可選)",
        prompt_generator_select_image: "選擇圖片", prompt_generator_simple_desc: "簡單描述你想要的畫面",
        prompt_generator_generate: "生成專業提示詞", prompt_generator_apply: "應用到提示詞",
        prompt_generator_generated: "生成的專業提示詞",
        prompt_generator_tip: "💡 小提示：選擇左側的「藝術風格」後，生成器會自動融合該風格（如：賽博龐克、水墨畫等）到提示詞中，讓畫面更具藝術感！",
        error_no_prompt: "⚠️ 請輸入提示詞", error_energy_depleted: "🚫 本小時能量已耗盡，請稍後再來！",
        error_image_too_large: "圖片太大！最大 32MB", error_invalid_file: "請選擇圖片文件", error_upload_failed: "上傳失敗"
    },
    en:{
        nav_gen:"🎨 Generate Image", nav_his:"📚 History", nav_nano:"Nano", settings_title:"⚙️ Generation Settings", provider_label:"API Provider", model_label:"Model Selection", size_label:"Image Size", style_label:"Art Style 🎨", quality_label:"Quality Mode", seed_label:"Seed Value", seed_random:"🎲 Random", seed_lock:"🔒 Lock", auto_opt_label:"✨ Auto Optimize", auto_opt_desc:"Automatically adjust Steps & Guidance", adv_settings:"🛠️ Advanced Settings", steps_label:"Generation Steps", guidance_label:"Guidance Scale", gen_btn:"🎨 Start Generation", empty_title:"No images generated yet", pos_prompt:"Positive Prompt", neg_prompt:"Negative Prompt (Optional)", ref_img:"Reference Image URL (Flux 2 Dev / Imagen 4 Only)", stat_total:"📊 Total Records", stat_storage:"💾 Storage Space (Permanent)", btn_export:"📥 Export", btn_clear:"🗑️ Clear All", no_history:"No history records found", btn_reuse:"🔄 Reuse Settings", btn_dl:"💾 Download",
        cooldown_msg: "⏳ Please wait for cooldown...",
        quality_economy: "Economy", quality_standard: "Standard", quality_ultra: "Ultra HD",
        provider_pollinations: "Pollinations.ai (Free)", provider_infip: "Ghostbot (Infip) 🌟", provider_airforce: "Airforce API ✈️",
        api_key_label: "API Key", api_key_desc: "Stored locally", api_key_placeholder: "Paste your API Key here",
        nsfw_label: "🔞 Disable NSFW Filter", nsfw_desc: "Enable this option to allow adult content generation (Infip, Kinai)",
        batch_label: "🖼️ Batch Generation", batch_size_label: "Batch Size",
        prompt_generator_title: "Professional Prompt Generator", prompt_generator_upload_ref: "Upload Reference Image (Optional)",
        prompt_generator_select_image: "Select Image", prompt_generator_simple_desc: "Simply describe the image you want",
        prompt_generator_generate: "Generate Professional Prompt", prompt_generator_apply: "Apply to Prompt",
        prompt_generator_generated: "Generated Professional Prompt",
        prompt_generator_tip: "💡 Tip: After selecting an 'Art Style' on the left, the generator will automatically blend that style (e.g., Cyberpunk, Ink Wash) into your prompt for more artistic results!",
        error_no_prompt: "⚠️ Please enter a prompt", error_energy_depleted: "🚫 Energy depleted this hour, please come back later!",
        error_image_too_large: "Image too large! Max size is 32MB", error_invalid_file: "Please select an image file", error_upload_failed: "Upload failed"
    },
    ja:{
        nav_gen:"🎨 画像生成", nav_his:"📚 履歴", nav_nano:"Nano版", settings_title:"⚙️ 生成設定", provider_label:"API プロバイダー", model_label:"モデル選択", size_label:"画像サイズ", style_label:"アートスタイル 🎨", quality_label:"品質モード", seed_label:"シード値", seed_random:"🎲 ランダム", seed_lock:"🔒 固定", auto_opt_label:"✨ 自動最適化", auto_opt_desc:"ステップ数とガイダンスを自動調整", adv_settings:"🛠️ 詳細設定", steps_label:"生成ステップ数", guidance_label:"ガイダンススケール", gen_btn:"🎨 生成開始", empty_title:"まだ画像が生成されていません", pos_prompt:"ポジティブプロンプト", neg_prompt:"ネガティブプロンプト（任意）", ref_img:"参照画像 (Img2Img) 📸", stat_total:"📊 総記録数", stat_storage:"💾 ストレージ（永続）", btn_export:"📥 エクスポート", btn_clear:"🗑️ 全削除", no_history:"履歴がありません", btn_reuse:"🔄 再利用", btn_dl:"💾 ダウンロード",
        cooldown_msg: "⏳ クールダウンをお待ちください...",
        quality_economy: "エコノミー", quality_standard: "スタンダード", quality_ultra: "ウルトラHD",
        provider_pollinations: "Pollinations.ai (無料)", provider_infip: "Ghostbot (Infip) 🌟", provider_airforce: "Airforce API ✈️",
        api_key_label: "APIキー", api_key_desc: "ローカルに保存", api_key_placeholder: "ここにAPIキーを貼り付け",
        nsfw_label: "🔞 NSFWフィルターを無効化", nsfw_desc: "このオプションを有効にすると、成人向けコンテンツの生成が可能になります（Infip, Kinai）",
        batch_label: "🖼️ バッチ生成", batch_size_label: "バッチサイズ",
        prompt_generator_title: "プロフェッショナルプロンプトジェネレーター", prompt_generator_upload_ref: "参照画像をアップロード（任意）",
        prompt_generator_select_image: "画像を選択", prompt_generator_simple_desc: "作成したい画像を簡単に説明",
        prompt_generator_generate: "プロフェッショナルプロンプトを生成", prompt_generator_apply: "プロンプトに適用",
        prompt_generator_generated: "生成されたプロフェッショナルプロンプト",
        prompt_generator_tip: "💡 ヒント：左側の「アートスタイル」を選択すると、ジェネレーターがそのスタイル（サイバーパンク、水墨画など）を自動的にプロンプトにブレンドし、より芸術的な結果が得られます！",
        error_no_prompt: "⚠️ プロンプトを入力してください", error_energy_depleted: "🚫 今時間のエネルギーが枯渇しました。後でもう一度お越しください！",
        error_image_too_large: "画像が大きすぎます！最大サイズは32MBです", error_invalid_file: "画像ファイルを選択してください", error_upload_failed: "アップロードに失敗しました"
    },
    ko:{
        nav_gen:"🎨 이미지 생성", nav_his:"📚 기록", nav_nano:"Nano", settings_title:"⚙️ 생성 설정", provider_label:"API 공급자", model_label:"모델 선택", size_label:"이미지 크기", style_label:"아트 스타일 🎨", quality_label:"품질 모드", seed_label:"시드 값", seed_random:"🎲 랜덤", seed_lock:"🔒 잠금", auto_opt_label:"✨ 자동 최적화", auto_opt_desc:"스텝 및 가이던스 자동 조정", adv_settings:"🛠️ 고급 설정", steps_label:"생성 스텝", guidance_label:"가이던스 스케일", gen_btn:"🎨 생성 시작", empty_title:"아직 생성된 이미지가 없습니다", pos_prompt:"긍정적 프롬프트", neg_prompt:"부정적 프롬프트 (선택 사항)", ref_img:"참조 이미지 (Img2Img) 📸", stat_total:"📊 총 기록 수", stat_storage:"💾 저장 공간 (영구)", btn_export:"📥 내보내기", btn_clear:"🗑️ 전체 삭제", no_history:"기록이 없습니다", btn_reuse:"🔄 설정 재사용", btn_dl:"💾 다운로드",
        cooldown_msg: "⏳ 쿨다운을 기다려주세요...",
        quality_economy: "이코노미", quality_standard: "스탠다드", quality_ultra: "울트라 HD",
        provider_pollinations: "Pollinations.ai (무료)", provider_infip: "Ghostbot (Infip) 🌟", provider_airforce: "Airforce API ✈️",
        api_key_label: "API 키", api_key_desc: "로컬에 저장", api_key_placeholder: "여기에 API 키를 붙여넣으세요",
        nsfw_label: "🔞 NSFW 필터 비활성화", nsfw_desc: "이 옵션을 활성화하면 성인 콘텐츠 생성이 허용됩니다 (Infip, Kinai)",
        batch_label: "🖼️ 배치 생성", batch_size_label: "배치 크기",
        prompt_generator_title: "전문 프롬프트 생성기", prompt_generator_upload_ref: "참조 이미지 업로드 (선택 사항)",
        prompt_generator_select_image: "이미지 선택", prompt_generator_simple_desc: "원하는 이미지를 간단히 설명",
        prompt_generator_generate: "전문 프롬프트 생성", prompt_generator_apply: "프롬프트에 적용",
        prompt_generator_generated: "생성된 전문 프롬프트",
        prompt_generator_tip: "💡 팁: 왼쪽의 '아트 스타일'을 선택하면 생성기가 해당 스타일(사이버펑크, 수묵화 등)을 자동으로 프롬프트에 혼합하여 더 예술적인 결과를 얻을 수 있습니다!",
        error_no_prompt: "⚠️ 프롬프트를 입력하세요", error_energy_depleted: "🚫 이번 시간 에너지가 소진되었습니다. 나중에 다시 방문해주세요！",
        error_image_too_large: "이미지가 너무 큽니다! 최대 크기는 32MB입니다", error_invalid_file: "이미지 파일을 선택하세요", error_upload_failed: "업로드 실패"
    },
    ar:{
        nav_gen:"🎨 إنشاء صورة", nav_his:"📚 السجل", nav_nano:"Nano", settings_title:"⚙️ إعدادات الإنشاء", provider_label:"مزود API", model_label:"اختيار النموذج", size_label:"حجم الصورة", style_label:"النمط الفني 🎨", quality_label:"وضع الجودة", seed_label:"قيمة البذرة", seed_random:"🎲 عشوائي", seed_lock:"🔒 قفل", auto_opt_label:"✨ تحسين تلقائي", auto_opt_desc:"ضبط الخطوات والتوجيه تلقائيًا", adv_settings:"🛠️ إعدادات متقدمة", steps_label:"خطوات الإنشاء", guidance_label:"مقياس التوجيه", gen_btn:"🎨 بدء الإنشاء", empty_title:"لم يتم إنشاء أي صور بعد", pos_prompt:"موجه إيجابي", neg_prompt:"موجه سلبي (اختياري)", ref_img:"صورة مرجعية (Img2Img) 📸", stat_total:"📊 إجمالي السجلات", stat_storage:"💾 مساحة التخزين (دائمة)", btn_export:"📥 تصدير", btn_clear:"🗑️ مسح الكل", btn_reuse:"🔄 إعادة الاستخدام", btn_dl:"💾 تنزيل", no_history:"لا توجد سجلات", cooldown_msg:"⏳ يرجى الانتظار...", quality_economy:"اقتصادي", quality_standard:"قياسي", quality_ultra:"فائق الدقة", provider_pollinations:"Pollinations.ai (مجاني)", provider_infip:"Ghostbot (Infip) 🌟", provider_kinai:"Kinai API 🚀", provider_airforce:"Airforce API ✈️", api_key_label:"مفتاح API", api_key_desc:"مخزن محليًا", api_key_placeholder:"الصق مفتاح API هنا", nsfw_label:"🔞 تعطيل فلتر NSFW", nsfw_desc:"تمكين هذا الخيار للسماح بإنشاء محتوى للبالغين (Infip, Airforce)", batch_label:"🖼️ إنشاء مجموع", batch_size_label:"حجم المجموعة", prompt_generator_title:"مولد المطالبات الاحترافي", prompt_generator_upload_ref:"رفع صورة مرجعية (اختياري)", prompt_generator_select_image:"اختر صورة", prompt_generator_simple_desc:"صف الصورة التي تريدها ببساطة", prompt_generator_generate:"إنشاء موجه احترافي", prompt_generator_apply:"تطبيق على الموجه", prompt_generator_generated:"الموجه الاحترافي المُنشأ", prompt_generator_tip:"💡 نصيحة: بعد تحديد 'نمط فني' على اليسار، سيقوم المولد بدمج هذا النمط (مثل السايبربانك، الرسم بالحبر) تلقائيًا في موجهك للحصول على نتائج أكثر فنية!", error_no_prompt:"⚠️ يرجى إدخال موجه", error_energy_depleted:"🚫 نفدت الطاقة لهذه الساعة، يرجى العودة لاحقًا!", error_image_too_large:"الصورة كبيرة جدًا! الحد الأقصى 5 ميجابايت", error_invalid_file:"يرجى اختيار ملف صورة", error_upload_failed:"فشل الرفع"
    }
};

// 語言配置
const LANGUAGE_CONFIG = {
    auto: { name: "自動偵測", flag: "🌐", direction: "ltr" },
    zh: { name: "繁體中文", flag: "🇹🇼", direction: "ltr" },
    en: { name: "English", flag: "🇺🇸", direction: "ltr" },
    ja: { name: "日本語", flag: "🇯🇵", direction: "ltr" },
    ko: { name: "한국어", flag: "🇰🇷", direction: "ltr" },
    ar: { name: "العربية", flag: "🇸🇦", direction: "rtl" }
};

let curLang='zh';
let autoDetect = false;
const AUTO_DETECT_KEY = 'flux-ai-auto-detect';

// 偵測系統語言
function detectSystemLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0];
    if (I18N[langCode]) return langCode;
    return 'zh';
}

// 偵測並載入保存的語言
function detectLanguage() {
    // 1. 檢查 URL 參數
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && I18N[langParam]) {
        autoDetect = false;
        localStorage.setItem(AUTO_DETECT_KEY, 'false');
        return langParam;
    }
    
    // 2. 檢查自動偵測設定
    const savedAutoDetect = localStorage.getItem(AUTO_DETECT_KEY);
    if (savedAutoDetect === 'true') {
        autoDetect = true;
        return detectSystemLanguage();
    }
    
    // 3. 檢查 localStorage
    const savedLang = localStorage.getItem('flux-ai-language');
    if (savedLang && I18N[savedLang]) return savedLang;
    
    // 4. 檢查瀏覽器語言
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0];
    if (I18N[langCode]) return langCode;
    
    return 'zh';
}

// 初始化語言
curLang = detectLanguage();
localStorage.setItem('flux-ai-language', curLang);

// 更新語言切換按鈕
function updateLangButton() {
    let config;
    if (autoDetect) {
        config = LANGUAGE_CONFIG['auto'];
        document.getElementById('currentLangFlag').textContent = config.flag;
        document.getElementById('currentLangName').textContent = config.name;
    } else {
        config = LANGUAGE_CONFIG[curLang];
        document.getElementById('currentLangFlag').textContent = config.flag;
        document.getElementById('currentLangName').textContent = config.name;
    }
    
    // 更新下拉選單的 active 狀態
    document.querySelectorAll('.lang-option').forEach(opt => {
        if (autoDetect) {
            opt.classList.toggle('active', opt.dataset.lang === 'auto');
        } else {
            opt.classList.toggle('active', opt.dataset.lang === curLang);
        }
    });
}

// 切換語言
function setLanguage(lang) {
    // 處理自動偵測選項
    if (lang === 'auto') {
        autoDetect = true;
        localStorage.setItem(AUTO_DETECT_KEY, 'true');
        curLang = detectSystemLanguage();
        localStorage.setItem('flux-ai-language', curLang);
    } else {
        autoDetect = false;
        localStorage.setItem(AUTO_DETECT_KEY, 'false');
        if (!I18N[lang]) return;
        curLang = lang;
        localStorage.setItem('flux-ai-language', lang);
    }
    
    // 更新 RTL 方向
    const langConfig = LANGUAGE_CONFIG[curLang];
    if (langConfig && langConfig.direction === 'rtl') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.removeAttribute('dir');
    }
    
    updateLang();
    updateLangButton();
    updateStyleOptions();
}

// 更新風格選單
function updateStyleOptions() {
    const styleSelect = document.getElementById('style');
    if (!styleSelect) return;
    
    const currentVal = styleSelect.value;
    styleSelect.innerHTML = '';
    
    const sortedCategories = Object.entries(STYLE_CATEGORIES).sort((a, b) => a[1].order - b[1].order);
    
    for (const [categoryKey, categoryInfo] of sortedCategories) {
        const stylesInCategory = Object.entries(STYLE_PRESETS).filter(([key, style]) => style.category === categoryKey);
        
        if (stylesInCategory.length > 0) {
            const categoryName = typeof categoryInfo.name === 'object' ? (categoryInfo.name[curLang] || categoryInfo.name.zh || categoryInfo.name) : categoryInfo.name;
            const optgroup = document.createElement('optgroup');
            optgroup.label = categoryInfo.icon + ' ' + categoryName;
            
            for (const [styleKey, styleConfig] of stylesInCategory) {
                let styleName = typeof styleConfig.name === 'object' ? (styleConfig.name[curLang] || styleConfig.name.zh || styleConfig.name) : styleConfig.name;
                const enName = typeof styleConfig.name === 'object' ? (styleConfig.name.en || styleConfig.name) : styleConfig.name;
                if (styleName !== enName && enName) {
                    styleName = styleName + ' (' + enName + ')';
                }
                const option = document.createElement('option');
                option.value = styleKey;
                option.textContent = styleConfig.icon + ' ' + styleName;
                if (styleKey === currentVal) option.selected = true;
                optgroup.appendChild(option);
            }
            styleSelect.appendChild(optgroup);
        }
    }
}

// 更新所有翻譯
function updateLang(){
    updateStyleOptions();
    document.querySelectorAll('[data-t]').forEach(el=>{
        const k=el.getAttribute('data-t');
        if(I18N[curLang][k]){
            // 檢查元素是否包含 HTML 標籤，如果是則使用 innerHTML
            if(el.innerHTML.includes('<strong>') || el.innerHTML.includes('<em>') || el.innerHTML.includes('<b>')){
                el.innerHTML = I18N[curLang][k];
            } else {
                el.textContent = I18N[curLang][k];
            }
        }
    });
    const seedToggleBtn = document.getElementById('seedToggleBtn');
    if(seedToggleBtn && isSeedRandom !== undefined) {
        seedToggleBtn.innerHTML = isSeedRandom ? I18N[curLang].seed_random : I18N[curLang].seed_lock;
    }
}

// 語言下拉選單控制
const langSwitch = document.getElementById('langSwitch');
const langDropdown = document.getElementById('langDropdown');

langSwitch.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('show');
});

// 點擊外部關閉下拉選單
document.addEventListener('click', () => {
    langDropdown.classList.remove('show');
});

// 語言選項點擊事件
document.querySelectorAll('.lang-option').forEach(option => {
    option.addEventListener('click', (e) => {
        e.stopPropagation();
        const lang = option.dataset.lang;
        setLanguage(lang);
        langDropdown.classList.remove('show');
    });
});

// 初始化語言按鈕
updateLangButton();

document.querySelectorAll('.nav-btn:not(.nano-btn)').forEach(btn=>{
    btn.addEventListener('click',function(){
        const p=this.dataset.page;
        if(!p) return;
        document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(x=>x.classList.remove('active'));
        document.getElementById(p+'Page').classList.add('active');
        this.classList.add('active');
        if(p==='history') updateHistoryDisplay();
    });
});

const seedInput = document.getElementById('seed');
const seedToggleBtn = document.getElementById('seedToggleBtn');
const autoOptCheckbox = document.getElementById('autoOptimize');
const advParamsDiv = document.getElementById('advancedParams');
let isSeedRandom = true;

function updateSeedUI() {
    if (isSeedRandom) {
        seedInput.value = '-1';
        seedInput.disabled = true;
        seedInput.style.opacity = '0.7';
        seedInput.style.cursor = 'not-allowed';
        seedToggleBtn.innerHTML = I18N[curLang].seed_random;
        seedToggleBtn.classList.remove('active');
        seedToggleBtn.style.background = 'rgba(255,255,255,0.1)';
        seedToggleBtn.style.color = '#fff';
    } else {
        if(seedInput.value === '-1') seedInput.value = Math.floor(Math.random() * 1000000);
        seedInput.disabled = false;
        seedInput.style.opacity = '1';
        seedInput.style.cursor = 'text';
        seedToggleBtn.innerHTML = I18N[curLang].seed_lock;
        seedToggleBtn.classList.add('active');
        seedToggleBtn.style.background = '#f59e0b';
        seedToggleBtn.style.color = '#000';
    }
}

seedToggleBtn.addEventListener('click', () => { isSeedRandom = !isSeedRandom; updateSeedUI(); });
autoOptCheckbox.addEventListener('change', () => { advParamsDiv.style.display = autoOptCheckbox.checked ? 'none' : 'block'; });

const providerSelect = document.getElementById('provider');
const apiKeyGroup = document.getElementById('apiKeyGroup');
const apiKeyInput = document.getElementById('apiKey');
const modelSelect = document.getElementById('model');

function updateModelOptions() {
    const p = providerSelect.value;
    const config = PROVIDERS[p];
    if(!config) return;
    
    // Update API Key link based on provider
    const apiKeysLink = document.getElementById('apiKeysLink');
    if (apiKeysLink) {
        const providerLinks = {
            'infip': { url: 'https://infip.pro/api-keys', text: 'infip.pro/api-keys' },
            'aqua': { url: 'https://aqua-api.com/api-keys', text: 'aqua-api.com/api-keys' },
            'kinai': { url: 'https://kinai.ai/api-keys', text: 'kinai.ai/api-keys' },
            'airforce': { url: 'https://api.airforce/', text: 'api.airforce/' }
        };
        if (providerLinks[p]) {
            apiKeysLink.href = providerLinks[p].url;
            apiKeysLink.textContent = providerLinks[p].text;
        }
    }
    
    // Logic: Show API Key input only if required AND not provided by server
    if(config.requires_key && config.auth_mode === 'bearer') {
        if (config.has_server_key) {
            apiKeyGroup.style.display = 'none';
        } else {
            apiKeyGroup.style.display = 'block';
            let storedKey = '';
            if (p === 'infip') storedKey = sessionStorage.getItem('infip_api_key');
            if (p === 'aqua') storedKey = sessionStorage.getItem('aqua_api_key');
            if (p === 'kinai') storedKey = sessionStorage.getItem('kinai_api_key');
            if (p === 'airforce') storedKey = sessionStorage.getItem('airforce_api_key');
            
            apiKeyInput.value = storedKey || '';
            apiKeyInput.placeholder = "Paste your API Key here";
        }
    } else {
        apiKeyGroup.style.display = 'none';
    }
    
    // Logic: Show NSFW Toggle for Infip and Kinai only
    const nsfwGroup = document.getElementById('nsfwGroup');
    const batchGroup = document.getElementById('batchGroup');
    
    if (p === 'infip' || p === 'kinai') {
        nsfwGroup.style.display = 'flex';
        batchGroup.style.display = 'block';
    } else {
        nsfwGroup.style.display = 'none';
        batchGroup.style.display = 'none';
        document.getElementById('nsfwToggle').checked = false;
        document.getElementById('batchSize').value = '1';
    }

    modelSelect.innerHTML = '';
    const models = config.models;
    const groups = {};
    models.forEach(m => {
        // Skip nanobanana model - only available in Nano Pro page
        // imagen-4 is available in Professional UI (Aqua polling model)
        if (m.id === 'nanobanana') return;
        
        const cat = m.category || 'other';
        if(!groups[cat]) groups[cat] = [];
        groups[cat].push(m);
    });
    
    for(const [cat, list] of Object.entries(groups)) {
        const optgroup = document.createElement('optgroup');
        optgroup.label = cat.toUpperCase();
        list.forEach(m => {
            const opt = document.createElement('option');
            opt.value = m.id;
            opt.textContent = m.name;
            // Set default model to FLUX.2 Klein 9B
            if (m.id === 'klein-large') opt.selected = true;
            optgroup.appendChild(opt);
        });
        modelSelect.appendChild(optgroup);
    }
    
    // Update reference images visibility after model list is updated
    updateReferenceImagesVisibility();
}

// ====== 拖放功能模塊 ======
const DragDropHandler = {
    // 初始化拖放區域
    initDropZone(dropZoneId, fileInputId, onFileDrop) {
        const dropZone = document.getElementById(dropZoneId);
        const fileInput = document.getElementById(fileInputId);
        
        if (!dropZone || !fileInput) return;

        // 點擊區域觸發文件選擇
        dropZone.addEventListener('click', () => {
            fileInput.click();
        });

        // 阻止默認拖放行為
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            }, false);
        });

        // 拖入效果
        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.classList.add('drag-over');
            }, false);
        });

        // 拖離效果
        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.classList.remove('drag-over');
            }, false);
        });

        // 處理文件放置
        dropZone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                onFileDrop(files[0]);
            }
        }, false);
    },

    // 驗證圖片文件
    validateImageFile(file) {
        // 檢查文件類型
        if (!file.type.startsWith('image/')) {
            return { valid: false, error: '請選擇圖片文件' };
        }
        
        // 檢查文件大小 (最大 32MB)
        if (file.size > 32 * 1024 * 1024) {
            return { valid: false, error: '圖片太大！最大 32MB' };
        }
        
        return { valid: true };
    },

    // 讀取文件為 Base64
    readFileAsBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = () => reject(new Error('文件讀取失敗'));
            reader.readAsDataURL(file);
        });
    }
};

// 初始化主頁面參考圖像拖放區域
DragDropHandler.initDropZone('imageDropZone', 'imageUpload', async (file) => {
    const validation = DragDropHandler.validateImageFile(file);
    if (!validation.valid) {
        alert(validation.error);
        return;
    }

    const dropZone = document.getElementById('imageDropZone');
    const originalContent = dropZone.innerHTML;
    dropZone.innerHTML = '<div class="drag-icon">⏳</div><div class="drag-text">上傳中...</div>';

    try {
        const base64 = await DragDropHandler.readFileAsBase64(file);
        
        const formData = new FormData();
        formData.append('fileToUpload', file);
        
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            if (data.url && data.url.startsWith('http')) {
                const textarea = document.getElementById('referenceImages');
                const currentVal = textarea.value.trim();
                textarea.value = currentVal ? currentVal + ', ' + data.url : data.url;
                dropZone.innerHTML = '<div class="drag-icon">✅</div><div class="drag-text">上傳成功！</div>';
                setTimeout(() => {
                    dropZone.innerHTML = originalContent;
                }, 2000);
            } else {
                throw new Error("Invalid response from server");
            }
        } else {
            const errData = await response.json().catch(()=>({}));
            throw new Error("Upload failed: " + (errData.error || response.status));
        }
    } catch (error) {
        console.error("Upload error:", error);
        dropZone.innerHTML = '<div class="drag-icon">❌</div><div class="drag-text">上傳失敗</div>';
        setTimeout(() => {
            dropZone.innerHTML = originalContent;
        }, 2000);
    }
});

const imageUpload = document.getElementById('imageUpload');
imageUpload.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file size (max 32MB)
    if (file.size > 32 * 1024 * 1024) {
        alert("Image too large! Max size is 32MB.");
        return;
    }

    const dropZone = document.getElementById('imageDropZone');
    const originalContent = dropZone.innerHTML;
    dropZone.innerHTML = '<div class="drag-icon">⏳</div><div class="drag-text">上傳中...</div>';

    try {
        // Convert to Base64
        const reader = new FileReader();
        reader.onload = async (event) => {
            const base64 = event.target.result;
            // Upload to catbox.moe (or similar temporary host) for URL
            // Since we need a public URL for the API
            // For now, let's use a simple cors-proxy trick or just assume direct base64 support if API allows
            // Pollinations supports base64 in some endpoints but URL is safer.
            
            // Using a free image host upload via backend proxy would be best,
            // but for a static-like worker, we can try to use the image directly if the model supports it.
            // However, 'reference_images' usually expects URLs.
            // Let's use a reliable temporary host service.
            
            const formData = new FormData();
            formData.append('fileToUpload', file);
            
            try {
                // Use our own worker proxy endpoint to avoid CORS issues
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.url && data.url.startsWith('http')) {
                         const textarea = document.getElementById('referenceImages');
                         const currentVal = textarea.value.trim();
                         textarea.value = currentVal ? currentVal + ', ' + data.url : data.url;
                         dropZone.innerHTML = '<div class="drag-icon">✅</div><div class="drag-text">上傳成功！</div>';
                         setTimeout(() => { dropZone.innerHTML = originalContent; }, 2000);
                    } else {
                        throw new Error("Invalid response from server");
                    }
                } else {
                    const errData = await response.json().catch(()=>({}));
                    throw new Error("Upload failed: " + (errData.error || response.status));
                }
            } catch (proxyError) {
                console.error("Upload error:", proxyError);
                dropZone.innerHTML = '<div class="drag-icon">❌</div><div class="drag-text">上傳失敗</div>';
                setTimeout(() => { dropZone.innerHTML = originalContent; }, 2000);
            }
        };
        reader.readAsDataURL(file);
    } catch (err) {
        console.error(err);
        dropZone.innerHTML = '<div class="drag-icon">❌</div><div="drag-text">上傳失敗</div>';
        setTimeout(() => { dropZone.innerHTML = originalContent; }, 2000);
    }
});

providerSelect.addEventListener('change', updateModelOptions);
apiKeyInput.addEventListener('input', (e) => {
    const p = providerSelect.value;
    if (p === 'infip') sessionStorage.setItem('infip_api_key', e.target.value);
    if (p === 'aqua') sessionStorage.setItem('aqua_api_key', e.target.value);
    if (p === 'kinai') sessionStorage.setItem('kinai_api_key', e.target.value);
    if (p === 'airforce') sessionStorage.setItem('airforce_api_key', e.target.value);
});

// Show/hide reference images section based on model support
function updateReferenceImagesVisibility() {
    const provider = providerSelect.value;
    const model = modelSelect.value;
    const config = PROVIDERS[provider];
    const modelConfig = config?.models?.find(m => m.id === model);
    const refImagesSection = document.getElementById('referenceImagesSection');
    
    if (refImagesSection) {
        const supportsRefImages = modelConfig?.supports_reference_images || false;
        refImagesSection.style.display = supportsRefImages ? 'block' : 'none';
    }
}

modelSelect.addEventListener('change', updateReferenceImagesVisibility);

const PRESET_SIZES=${JSON.stringify(CONFIG.PRESET_SIZES)};
const STYLE_PRESETS=${JSON.stringify(CONFIG.STYLE_PRESETS)};
const STYLE_CATEGORIES=${JSON.stringify(CONFIG.STYLE_CATEGORIES)};
// Inject server-side key status
const frontendProviders = ${JSON.stringify(CONFIG.PROVIDERS)};
// Remove nonpon provider from main UI (only available in Nano Pro page)
delete frontendProviders.nonpon;
if (${hasInfipServerKey} && frontendProviders.infip) {
    frontendProviders.infip.has_server_key = true;
}
if (${hasAquaServerKey} && frontendProviders.aqua) {
    frontendProviders.aqua.has_server_key = true;
}
if (${hasKinaiServerKey} && frontendProviders.kinai) {
    frontendProviders.kinai.has_server_key = true;
}
if (${hasAirforceServerKey} && frontendProviders.airforce) {
    frontendProviders.airforce.has_server_key = true;
}
const PROVIDERS=frontendProviders;

async function addToHistory(item){
    let base64Data = item.image;
    if(!base64Data && item.url){
        try{
            const resp = await fetch(item.url);
            const blob = await resp.blob();
            base64Data = await new Promise(r=>{const fr=new FileReader();fr.onload=()=>r(fr.result);fr.readAsDataURL(blob);});
        }catch(e){console.error("Image convert failed",e);}
    }
    const record={
        id: Date.now()+Math.random(), timestamp: new Date().toISOString(), prompt: item.prompt, model: item.model, style: item.style, seed: item.seed, base64: base64Data || item.url
    };
    await saveToDB(record);
}

async function updateHistoryDisplay(){
    const history = await getHistoryFromDB();
    const list = document.getElementById('historyList');
    document.getElementById('historyCount').textContent=history.length;
    document.getElementById('historyTotal').textContent=history.length;
    const size = JSON.stringify(history).length;
    document.getElementById('storageSize').textContent = (size/1024/1024).toFixed(2)+' MB';

    if(history.length===0){ list.innerHTML='<div class="empty-state"><p>'+I18N[curLang].no_history+'</p></div>'; return; }
    const div=document.createElement('div');div.className='gallery';
    history.forEach(item=>{
        const imgSrc = item.base64 || item.url;
        const d=document.createElement('div'); d.className='gallery-item';
        d.innerHTML='<img src="'+imgSrc+'" loading="lazy"><div class="gallery-info"><div class="gallery-meta"><span class="model-badge">'+item.model+'</span><span class="seed-badge">#'+item.seed+'</span></div><div class="gallery-actions"><button class="action-btn reuse-btn">'+I18N[curLang].btn_reuse+'</button><button class="action-btn download-btn">'+I18N[curLang].btn_dl+'</button><button class="action-btn delete delete-btn">🗑️</button></div></div>';
        d.querySelector('img').onclick=()=>openModal(imgSrc);
        d.querySelector('.reuse-btn').onclick=()=>{
            document.getElementById('prompt').value=item.prompt||'';
            const modelSelect = document.getElementById('model');
            const targetModel = item.model || 'flux-schnell';
            
            // Check if model exists in current provider, if not, try to switch provider or just warn
            // Ideally we should switch provider based on model, but we don't store provider in history yet (we should!)
            // For now, let's just try to set value. If not found, it stays default.
            
            // Try to find which provider has this model
            let providerFound = null;
            for(const [pKey, pConfig] of Object.entries(PROVIDERS)) {
                if(pConfig.models.some(m => m.id === targetModel)) {
                    providerFound = pKey;
                    break;
                }
            }
            
            if(providerFound) {
                document.getElementById('provider').value = providerFound;
                updateModelOptions(); // Refresh model list
            }
            
            modelSelect.value = targetModel;
            document.getElementById('style').value=item.style||'none';
            const savedSeed = item.seed;
            if (savedSeed && savedSeed !== -1 && savedSeed !== '-1') { isSeedRandom = false; seedInput.value = savedSeed; } else { isSeedRandom = true; seedInput.value = '-1'; }
            updateSeedUI();
            document.querySelector('[data-page="generate"]').click();
        };
        d.querySelector('.download-btn').onclick=()=>{
            const a=document.createElement('a');
            a.href=imgSrc;
            a.download=item.model+'-'+item.seed+'.png';
            a.click();
        };
        d.querySelector('.delete-btn').onclick=()=>deleteFromDB(item.id);
        div.appendChild(d);
    });
    list.innerHTML=''; list.appendChild(div);
}

function openModal(src){
    const modalImg = document.getElementById('modalImage');
    const downloadBtn = document.getElementById('modalDownload');
    modalImg.src=src;
    
    // Auto set download filename
    downloadBtn.href = src;
    downloadBtn.download = \`flux-ai-\${Date.now()}.png\`;
    
    document.getElementById('imageModal').classList.add('show');
}
document.getElementById('modalCloseBtn').onclick=()=>document.getElementById('imageModal').classList.remove('show');
document.getElementById('clearBtn').onclick=()=>{if(confirm('Clear all history?'))clearDB();};
document.getElementById('exportBtn').onclick=async()=>{
    const history=await getHistoryFromDB();
    const blob=new Blob([JSON.stringify(history,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');a.href=url;a.download='flux-history.json';a.click();
};

// ====== 生成邏輯與 60秒冷卻 ======
let cooldownTimer = null;
const COOLDOWN_SEC = 60; // Default cooldown
const INFIP_COOLDOWN_SEC = 30; // Infip specific cooldown

document.getElementById('generateForm').addEventListener('submit',async(e)=>{
    e.preventDefault();
    
    // 檢查冷卻狀態
    const btn=document.getElementById('generateBtn');
    if(btn.disabled && btn.classList.contains('cooldown-active')) return;

    // Save API Keys
    const curProvider = document.getElementById('provider').value;
    const curKey = document.getElementById('apiKey').value;
    if(curProvider === 'infip') localStorage.setItem('infip_api_key', curKey);
    if(curProvider === 'aqua') localStorage.setItem('aqua_api_key', curKey);
    if(curProvider === 'kinai') localStorage.setItem('kinai_api_key', curKey);
    if(curProvider === 'airforce') localStorage.setItem('airforce_api_key', curKey);

    const prompt=document.getElementById('prompt').value;
    const resDiv=document.getElementById('results');
    const sizeConfig=PRESET_SIZES[document.getElementById('size').value];
    
    if(!prompt)return;
    
    // 開始生成，鎖定按鈕
    btn.disabled=true;
    const generatingText = curLang === 'zh' ? '生成中...' :
                          curLang === 'en' ? 'Generating...' :
                          curLang === 'ja' ? '生成中...' :
                          curLang === 'ko' ? '생성 중...' :
                          curLang === 'ar' ? 'جاري الإنشاء...' : '生成中...';
    btn.textContent = generatingText;
    // 顯示進度條
    showGenerationProgress();
    // 模擬進度更新（實際進度由 API 響應更新）
    simulateProgress();
    
    const currentSeed = isSeedRandom ? -1 : parseInt(seedInput.value);
    const isAutoOpt = autoOptCheckbox.checked;
    const isNSFW = document.getElementById('nsfwToggle').checked;
    const batchSize = parseInt(document.getElementById('batchSize').value) || 1;
    
    // Auto-Set Quality to ULTRA for ALL models (Best Quality Policy)
    let qualityMode = 'ultra'; 
    console.log("Auto-switching to ULTRA quality for optimal results");
    // Also update UI to reflect this if needed, but for now just send it to API
    // If the element exists, we can try to update it visually:
    const qualityEl = document.getElementById('qualityMode');
    if(qualityEl) qualityEl.value = 'ultra';
    
    let finalNegative = document.getElementById('negativePrompt').value;
    if (isNSFW && (document.getElementById('provider').value === 'infip' || document.getElementById('provider').value === 'kinai' || document.getElementById('provider').value === 'airforce')) {
        // Filter out common NSFW keywords from negative prompt
        const nsfwKeywords = ['nsfw', 'nudity', 'naked', 'porn', 'xxx', 'uncensored'];
        let negParts = finalNegative.split(',').map(s => s.trim());
        negParts = negParts.filter(p => !nsfwKeywords.some(k => p.toLowerCase().includes(k)));
        finalNegative = negParts.join(', ');
    }

    try{
        const res=await fetch('/_internal/generate',{
            method:'POST', headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                prompt, model:document.getElementById('model').value, width:sizeConfig.width, height:sizeConfig.height,
                style:document.getElementById('style').value, quality_mode:qualityMode,
                seed: currentSeed, auto_optimize: isAutoOpt,
                steps: isAutoOpt ? null : parseInt(document.getElementById('steps').value),
                guidance_scale: isAutoOpt ? null : parseFloat(document.getElementById('guidanceScale').value),
                negative_prompt: finalNegative,
                reference_images:document.getElementById('referenceImages').value.split(',').filter(u=>u.trim()),
                provider: document.getElementById('provider').value,
                api_key: document.getElementById('apiKey').value,
                nsfw: isNSFW,
                n: batchSize,
                language: curLang  // Track interface language
            })
        });
        
        let items=[];
        const contentType=res.headers.get('content-type');
        if(contentType&&contentType.startsWith('image/')){
            const blob=await res.blob();
            const reader=new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend=async()=>{
                let base64=reader.result;
                const realSeed = res.headers.get('X-Seed');
                const item={ image:base64, prompt, model:res.headers.get('X-Model'), seed: realSeed, style:res.headers.get('X-Style') };
                await addToHistory(item);
                // 更新進度到 100%
                const completeText = curLang === 'zh' ? '生成完成！' :
                                   curLang === 'en' ? 'Generation Complete!' :
                                   curLang === 'ja' ? '生成完了！' :
                                   curLang === 'ko' ? '생성 완료!' :
                                   curLang === 'ar' ? 'اكتمل الإنشاء!' : '生成完成！';
                updateProgressUI(100, completeText);
                setTimeout(() => {
                    hideGenerationProgress();
                    displayResult([item]);
                }, 500);
                
                // Determine cooldown based on provider
                const provider = document.getElementById('provider').value;
                const cooldownTime = provider === 'infip' ? INFIP_COOLDOWN_SEC : (provider === 'kinai' ? INFIP_COOLDOWN_SEC : (provider === 'airforce' ? INFIP_COOLDOWN_SEC : COOLDOWN_SEC));
                startCooldown(cooldownTime);
            };
        }else{
            const data=await res.json();
            if(data.error) throw new Error(data.error.message);
            for(const d of data.data){ const item={...d, prompt}; await addToHistory(item); items.push(item); }
            // 更新進度到 100%
            const completeText = curLang === 'zh' ? '生成完成！' :
                               curLang === 'en' ? 'Generation Complete!' :
                               curLang === 'ja' ? '生成完了！' :
                               curLang === 'ko' ? '생성 완료!' :
                               curLang === 'ar' ? 'اكتمل الإنشاء!' : '生成完成！';
            updateProgressUI(100, completeText);
            setTimeout(() => {
                hideGenerationProgress();
                displayResult(items);
            }, 500);
            
            // Determine cooldown based on provider
            const provider = document.getElementById('provider').value;
            const cooldownTime = provider === 'infip' ? INFIP_COOLDOWN_SEC : (provider === 'kinai' ? INFIP_COOLDOWN_SEC : (provider === 'airforce' ? INFIP_COOLDOWN_SEC : COOLDOWN_SEC));
            startCooldown(cooldownTime);
        }
    }catch(err){
        hideGenerationProgress();
        resDiv.innerHTML='<p style="color:red;text-align:center">'+err.message+'</p>';
        // 失敗時不冷卻，直接解鎖
        btn.disabled=false;
        btn.textContent=I18N[curLang].gen_btn;
    }
});

function startCooldown(duration = COOLDOWN_SEC) {
    const btn = document.getElementById('generateBtn');
    btn.classList.add('cooldown-active');
    btn.disabled = true;
    let secondsLeft = duration;
    
    // 立即更新 UI
    updateBtnText(secondsLeft);
    
    cooldownTimer = setInterval(() => {
        secondsLeft--;
        if (secondsLeft <= 0) {
            clearInterval(cooldownTimer);
            btn.disabled = false;
            btn.classList.remove('cooldown-active');
            btn.textContent = I18N[curLang].gen_btn;
        } else {
            updateBtnText(secondsLeft);
        }
    }, 1000);
}

function updateBtnText(sec) {
    const btn = document.getElementById('generateBtn');
    const msg = curLang === 'zh' ? \`⏳ 冷卻中 (\${sec}s)\` : \`⏳ Cooldown (\${sec}s)\`;
    btn.textContent = msg;
}

// ====== 圖像生成進度追蹤 ======
let progressInterval = null;
let currentProgress = 0;

function showGenerationProgress() {
    const resDiv = document.getElementById('results');
    const statusText = curLang === 'zh' ? '🎨 正在生成圖像...' :
                      curLang === 'en' ? '🎨 Generating image...' :
                      curLang === 'ja' ? '🎨 画像を生成中...' :
                      curLang === 'ko' ? '🎨 이미지 생성 중...' :
                      curLang === 'ar' ? '🎨 جاري إنشاء الصورة...' : '🎨 正在生成圖像...';
    const initText = curLang === 'zh' ? '初始化中...' :
                     curLang === 'en' ? 'Initializing...' :
                     curLang === 'ja' ? '初期化中...' :
                     curLang === 'ko' ? '초기화 중...' :
                     curLang === 'ar' ? 'جاري التهيئة...' : '初始化中...';
    
    resDiv.innerHTML =
        '<div class="generation-progress-container">' +
            '<div class="generation-progress-header">' +
                '<span class="generation-progress-status">' + statusText + '</span>' +
                '<span class="generation-progress-percentage" id="progressPercentage">0%</span>' +
            '</div>' +
            '<div class="generation-progress-bar">' +
                '<div class="generation-progress-fill" id="progressFill"></div>' +
            '</div>' +
            '<div class="generation-progress-steps">' +
                '<span class="step-indicator" id="step1">📝</span>' +
                '<span class="step-indicator" id="step2">🎨</span>' +
                '<span class="step-indicator" id="step3">✨</span>' +
                '<span class="step-indicator" id="step4">🖼️</span>' +
            '</div>' +
            '<div class="generation-progress-text" id="progressText">' + initText + '</div>' +
        '</div>';
    currentProgress = 0;
    updateProgressUI(0, initText);
}

function updateProgressUI(percentage, text) {
    const progressFill = document.getElementById('progressFill');
    const progressPercentage = document.getElementById('progressPercentage');
    const progressText = document.getElementById('progressText');
    
    if (progressFill) progressFill.style.width = percentage + '%';
    if (progressPercentage) progressPercentage.textContent = percentage + '%';
    if (progressText) progressText.textContent = text;
    
    // 更新步驟指示器
    updateStepIndicators(percentage);
}

function updateStepIndicators(percentage) {
    const steps = ['step1', 'step2', 'step3', 'step4'];
    const stepLabels = ['📝', '🎨', '✨', '🖼️'];
    const activeLabels = ['✅', '🎨', '✨', '🖼️'];
    
    steps.forEach((stepId, index) => {
        const stepEl = document.getElementById(stepId);
        if (stepEl) {
            const threshold = (index + 1) * 25;
            if (percentage >= threshold) {
                stepEl.textContent = activeLabels[index];
                stepEl.classList.add('active');
            } else {
                stepEl.textContent = stepLabels[index];
                stepEl.classList.remove('active');
            }
        }
    });
}

function simulateProgress() {
    // 清除之前的進度計時器
    if (progressInterval) {
        clearInterval(progressInterval);
    }
    
    // 根據語言獲取進度訊息
    const progressMessages = curLang === 'zh' ? [
        { percent: 5, text: '正在分析提示詞...' },
        { percent: 15, text: '正在選擇模型...' },
        { percent: 25, text: '正在初始化生成參數...' },
        { percent: 35, text: '正在連接 API 服務器...' },
        { percent: 45, text: '正在生成圖像...' },
        { percent: 55, text: '正在渲染細節...' },
        { percent: 65, text: '正在優化質量...' },
        { percent: 75, text: '正在應用風格...' },
        { percent: 85, text: '正在最終處理...' },
        { percent: 95, text: '即將完成...' }
    ] : curLang === 'en' ? [
        { percent: 5, text: 'Analyzing prompt...' },
        { percent: 15, text: 'Selecting model...' },
        { percent: 25, text: 'Initializing parameters...' },
        { percent: 35, text: 'Connecting to API...' },
        { percent: 45, text: 'Generating image...' },
        { percent: 55, text: 'Rendering details...' },
        { percent: 65, text: 'Optimizing quality...' },
        { percent: 75, text: 'Applying style...' },
        { percent: 85, text: 'Final processing...' },
        { percent: 95, text: 'Almost done...' }
    ] : curLang === 'ja' ? [
        { percent: 5, text: 'プロンプトを分析中...' },
        { percent: 15, text: 'モデルを選択中...' },
        { percent: 25, text: 'パラメータを初期化中...' },
        { percent: 35, text: 'APIに接続中...' },
        { percent: 45, text: '画像を生成中...' },
        { percent: 55, text: '詳細をレンダリング中...' },
        { percent: 65, text: '品質を最適化中...' },
        { percent: 75, text: 'スタイルを適用中...' },
        { percent: 85, text: '最終処理中...' },
        { percent: 95, text: 'もうすぐ完了...' }
    ] : curLang === 'ko' ? [
        { percent: 5, text: '프롬프트 분석 중...' },
        { percent: 15, text: '모델 선택 중...' },
        { percent: 25, text: '매개변수 초기화 중...' },
        { percent: 35, text: 'API 연결 중...' },
        { percent: 45, text: '이미지 생성 중...' },
        { percent: 55, text: '세부 사항 렌더링 중...' },
        { percent: 65, text: '품질 최적화 중...' },
        { percent: 75, text: '스타일 적용 중...' },
        { percent: 85, text: '최종 처리 중...' },
        { percent: 95, text: '거의 완료...' }
    ] : curLang === 'ar' ? [
        { percent: 5, text: 'جاري تحليل الموجه...' },
        { percent: 15, text: 'جاري اختيار النموذج...' },
        { percent: 25, text: 'جاري تهيئة المعلمات...' },
        { percent: 35, text: 'جاري الاتصال بـ API...' },
        { percent: 45, text: 'جاري إنشاء الصورة...' },
        { percent: 55, text: 'جاري عرض التفاصيل...' },
        { percent: 65, text: 'جاري تحسين الجودة...' },
        { percent: 75, text: 'جاري تطبيق النمط...' },
        { percent: 85, text: 'جاري المعالجة النهائية...' },
        { percent: 95, text: 'قريب من الانتهاء...' }
    ] : [
        { percent: 5, text: '正在分析提示詞...' },
        { percent: 15, text: '正在選擇模型...' },
        { percent: 25, text: '正在初始化生成參數...' },
        { percent: 35, text: '正在連接 API 服務器...' },
        { percent: 45, text: '正在生成圖像...' },
        { percent: 55, text: '正在渲染細節...' },
        { percent: 65, text: '正在優化質量...' },
        { percent: 75, text: '正在應用風格...' },
        { percent: 85, text: '正在最終處理...' },
        { percent: 95, text: '即將完成...' }
    ];
    
    let messageIndex = 0;
    
    progressInterval = setInterval(() => {
        if (currentProgress < 95) {
            // 找到當前應該顯示的消息
            while (messageIndex < progressMessages.length && currentProgress >= progressMessages[messageIndex].percent) {
                messageIndex++;
            }
            
            if (messageIndex < progressMessages.length) {
                const targetPercent = progressMessages[messageIndex].percent;
                const increment = Math.max(1, Math.floor((targetPercent - currentProgress) / 5));
                currentProgress = Math.min(targetPercent, currentProgress + increment);
                updateProgressUI(currentProgress, progressMessages[messageIndex].text);
            }
        }
    }, 500);
}

function hideGenerationProgress() {
    if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
    }
    // 進度條會在 displayResult 中被替換
}

function displayResult(items){
    const div=document.createElement('div');div.className='gallery';
    items.forEach(item=>{
        const d=document.createElement('div');d.className='gallery-item';
        d.innerHTML='<img src="' + (item.image||item.url) + '" onclick="openModal(this.src)">';
        div.appendChild(d);
    });
    document.getElementById('results').innerHTML='';
    document.getElementById('results').appendChild(div);
}

// Online Count (whos.amung.us widget handled in HTML)
window.onload=()=>{
    updateLang();
    updateStyleOptions();
    updateHistoryDisplay();
    updateModelOptions();
};

// ====== 專業提示詞生成器 (Pollinations) ======
const PromptGenerator = {
    generatedPrompt: null,
    uploadedImage: null,
    uploadedImageUrl: null,
    
    async generate() {
        const input = document.getElementById('promptInput').value.trim();
        const style = document.getElementById('style')?.value || 'none';
        const referenceImage = document.getElementById('referenceImages')?.value.trim() || '';
        
        if (!input && !referenceImage && !this.uploadedImage) {
            const errorText = curLang === 'zh' ? '請輸入畫面描述或上傳圖片' :
                               curLang === 'en' ? 'Please enter a description or upload an image' :
                               curLang === 'ja' ? '説明を入力するか画像をアップロードしてください' :
                               curLang === 'ko' ? '설명을 입력하거나 이미지를 업로드하세요' :
                               curLang === 'ar' ? 'الرجاء إدخال وصف أو رفع صورة' : '請輸入畫面描述或上傳圖片';
            this.showStatus(errorText, 'error');
            return;
        }
        
        const btn = document.getElementById('generatePromptBtn');
        const originalText = btn.innerHTML;
        btn.disabled = true;
        const generatingText = curLang === 'zh' ? '生成中...' :
                              curLang === 'en' ? 'Generating...' :
                              curLang === 'ja' ? '生成中...' :
                              curLang === 'ko' ? '생성 중...' :
                              curLang === 'ar' ? 'جاري الإنشاء...' : '生成中...';
        btn.innerHTML = '<span>⏳</span><span>' + generatingText + '</span>';
        
        // 如果有上傳圖片但還沒有 URL，先上傳獲取 URL
        if (this.uploadedImage && !this.uploadedImageUrl) {
            const uploadingText = curLang === 'zh' ? '正在上傳圖片...' :
                                  curLang === 'en' ? 'Uploading image...' :
                                  curLang === 'ja' ? '画像をアップロード中...' :
                                  curLang === 'ko' ? '이미지 업로드 중...' :
                                  curLang === 'ar' ? 'جاري رفع الصورة...' : '正在上傳圖片...';
            this.showStatus(uploadingText, 'loading');
            try {
                this.uploadedImageUrl = await this.uploadImageAndGetUrl(this.uploadedImage);
                this.showStatus('圖片上傳成功，正在生成提示詞...', 'loading');
            } catch (error) {
                console.error('Image upload error:', error);
                this.showStatus('❌ 圖片上傳失敗: ' + error.message, 'error');
                btn.disabled = false;
                btn.innerHTML = originalText;
                return;
            }
        }
        
        const statusText = style !== 'none' ? '正在使用 Pollinations (Gemini) 生成專業提示詞... [風格: ' + style + ']' : '正在使用 Pollinations (Gemini) 生成專業提示詞...';
        this.showStatus(statusText, 'loading');
        
        try {
            const response = await fetch('/api/generate-prompt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    input: input,
                    style: style,
                    referenceImage: referenceImage,
                    imageUrl: this.uploadedImageUrl
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                this.generatedPrompt = data.prompt;
                document.getElementById('generatedPrompt').textContent = data.prompt;
                document.getElementById('generatedPromptContainer').style.display = 'block';
                document.getElementById('applyPromptBtn').style.display = 'flex';
                this.showStatus('✅ 提示詞生成成功！', 'success');
            } else {
                throw new Error(data.error || '生成失敗');
            }
        } catch (error) {
            console.error('Prompt Generation Error:', error);
            this.showStatus('❌ 生成失敗: ' + error.message, 'error');
        } finally {
            btn.disabled = false;
            btn.innerHTML = originalText;
        }
    },
    
    // 上傳圖片並獲取 URL
    async uploadImageAndGetUrl(base64Data) {
        // 將 Base64 轉換為 Blob
        const response = await fetch(base64Data);
        const blob = await response.blob();
        
        // 創建 FormData
        const formData = new FormData();
        formData.append('fileToUpload', blob, 'uploaded-image.png');
        
        // 上傳到 /api/upload
        const uploadResponse = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });
        
        if (!uploadResponse.ok) {
            const errorData = await uploadResponse.json().catch(() => ({}));
            throw new Error(errorData.error || '上傳失敗');
        }
        
        const data = await uploadResponse.json();
        if (!data.url) {
            throw new Error('未獲取到圖片 URL');
        }
        
        return data.url;
    },
    
    applyToPrompt() {
        if (!this.generatedPrompt) return;
        
        const promptTextarea = document.getElementById('prompt');
        if (promptTextarea) {
            promptTextarea.value = this.generatedPrompt;
            this.showStatus('✓ 已應用到提示詞框', 'success');
            
            // 可選：清空輸入框
            document.getElementById('promptInput').value = '';
        }
    },
    
    handleImageUpload(file) {
        if (!file) return;
        
        // 驗證文件大小 (最大 32MB)
        if (file.size > 32 * 1024 * 1024) {
            this.showStatus('圖片太大！最大 32MB', 'error');
            return;
        }
        
        // 驗證文件類型
        if (!file.type.startsWith('image/')) {
            this.showStatus('請選擇圖片文件', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            this.uploadedImage = e.target.result;
            
            // 顯示預覽
            const previewImg = document.getElementById('promptImagePreviewImg');
            const previewDiv = document.getElementById('promptImagePreview');
            const clearBtn = document.getElementById('promptImageClearBtn');
            
            previewImg.src = this.uploadedImage;
            previewDiv.style.display = 'block';
            clearBtn.style.display = 'block';
            
            this.showStatus('✓ 圖片已上傳', 'success');
        };
        reader.onerror = () => {
            this.showStatus('圖片讀取失敗', 'error');
        };
        reader.readAsDataURL(file);
    },
    
    clearImage() {
        this.uploadedImage = null;
        this.uploadedImageUrl = null;
        document.getElementById('promptImagePreview').style.display = 'none';
        document.getElementById('promptImagePreviewImg').src = '';
        document.getElementById('promptImageClearBtn').style.display = 'none';
        document.getElementById('promptImageUpload').value = '';
    },
    
    showStatus(message, type) {
        const statusEl = document.getElementById('promptGeneratorStatus');
        statusEl.textContent = message;
        statusEl.style.display = 'block';
        
        // 設置顏色
        if (type === 'error') {
            statusEl.style.color = '#ef4444';
        } else if (type === 'success') {
            statusEl.style.color = '#22c55e';
        } else {
            statusEl.style.color = '#9ca3af';
        }
        
        // 3秒後隱藏
        setTimeout(() => {
            if (statusEl.textContent === message) {
                statusEl.style.display = 'none';
            }
        }, 3000);
    }
};

// 綁定事件監聽器
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generatePromptBtn');
    const applyBtn = document.getElementById('applyPromptBtn');
    
    if (generateBtn) {
        generateBtn.addEventListener('click', () => PromptGenerator.generate());
    }
    
    if (applyBtn) {
        applyBtn.addEventListener('click', () => PromptGenerator.applyToPrompt());
    }
    
    // ====== 隊列狀態更新 ======
    const queueStatusEl = document.getElementById('queueStatus');
    const queueStatusTextEl = document.getElementById('queueStatusText');
    
    // 更新隊列狀態顯示
    async function updateQueueStatus() {
        try {
            const response = await fetch('/api/queue-status');
            const data = await response.json();
            
            if (data.status === 'ok' && data.queues) {
                const provider = document.getElementById('provider')?.value || 'pollinations';
                const queue = data.queues[provider];
                
                // 只為使用隊列的供應商顯示隊列狀態
                if (queue && queue.usesQueue && (queue.waiting > 0 || queue.processing > 0)) {
                    queueStatusEl.style.display = 'block';
                    var waitingText = queue.waiting > 0 ? queue.waiting + ' ' + I18N[curLang].queue_waiting : '';
                    var processingText = queue.processing > 0 ? queue.processing + ' ' + I18N[curLang].queue_processing : '';
                    var separator = waitingText && processingText ? ', ' : '';
                    queueStatusTextEl.textContent = I18N[curLang].queue_label + ': ' + waitingText + separator + processingText;
                } else {
                    queueStatusEl.style.display = 'none';
                }
            }
        } catch (error) {
            console.error('Failed to fetch queue status:', error);
        }
    }
    
    // 每2秒更新一次隊列狀態
    setInterval(updateQueueStatus, 2000);
    updateQueueStatus(); // 初始更新
    
    // ====== 主頁面提示詞生成器拖放功能 ======
    const promptImageDropZone = document.getElementById('promptImageDropZone');
    const promptImageUpload = document.getElementById('promptImageUpload');
    
    if (promptImageDropZone && promptImageUpload) {
        // 點擊區域觸發文件選擇
        promptImageDropZone.addEventListener('click', () => {
            promptImageUpload.click();
        });
        
        // 阻止默認拖放行為
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            promptImageDropZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            }, false);
        });
        
        // 拖入效果
        ['dragenter', 'dragover'].forEach(eventName => {
            promptImageDropZone.addEventListener(eventName, () => {
                promptImageDropZone.classList.add('drag-over');
            }, false);
        });
        
        // 拖離效果
        ['dragleave', 'drop'].forEach(eventName => {
            promptImageDropZone.addEventListener(eventName, () => {
                promptImageDropZone.classList.remove('drag-over');
            }, false);
        });
        
        // 處理文件放置
        promptImageDropZone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                PromptGenerator.handleImageUpload(files[0]);
            }
        }, false);
    }
    
    // 圖片選擇事件（保留原有功能作為後備）
    if (promptImageUpload) {
        promptImageUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                PromptGenerator.handleImageUpload(file);
            }
        });
    }
    
    // 清除圖片按鈕事件
    const imageClearBtn = document.getElementById('promptImageClearBtn');
    if (imageClearBtn) {
        imageClearBtn.addEventListener('click', () => {
            PromptGenerator.clearImage();
        });
    }
    
    // 支持按 Enter 生成（Ctrl + Enter）
    const promptInput = document.getElementById('promptInput');
    if (promptInput) {
        promptInput.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                PromptGenerator.generate();
            }
        });
    }
});
</script>
<div class="footer" style="position:relative; z-index:10; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; gap:15px; flex-wrap:wrap; padding:15px 20px;">
    <span style="font-size:14px;">Powered by Flux AI Pro • <a href="https://github.com/kinai9661/Flux-AI-Pro" target="_blank">Engine</a> • <a href="/nano" target="_blank">Nano Version</a></span>
    <span style="opacity:0.5">|</span>
    <span style="opacity:0.9; font-size:14px;">友情鏈接: <a href="https://pollinations.ai" target="_blank">Pollinations.ai</a> • <a href="https://infip.pro" target="_blank">Infip</a> • <a href="https://aquadevs.com" target="_blank">AquaDevs</a> • <a href="https://kinai.eu.cc" target="_blank">Kinai</a> • <a href="https://github.com" target="_blank">GitHub</a></span>
    <span style="opacity:0.5">|</span>
    <div class="friend-badges" style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
        <a href="https://dofollow.tools" target="_blank" style="display:inline-flex; align-items:center; justify-content:center;">
            <img src="https://dofollow.tools/badge/badge_dark.svg" alt="Featured on Dofollow.Tools" style="max-width:200px; width:auto; height:auto; max-height:54px; object-fit:contain;" />
        </a>
        <a href="https://showmebest.ai" target="_blank" style="display:inline-flex; align-items:center; justify-content:center;">
            <img src="https://showmebest.ai/badge/feature-badge-dark.webp" alt="Featured on ShowMeBestAI" style="max-width:165px; width:auto; height:auto; max-height:45px; object-fit:contain;" />
        </a>
    </div>
</div>
<style>
.footer {
    font-size: 14px;
    line-height: 1.6;
}
.footer a {
    color: #fff;
    text-decoration: none;
    transition: opacity 0.2s;
}
.footer a:hover {
    opacity: 0.8;
}
.friend-badges img {
    transition: transform 0.2s, opacity 0.2s;
}
.friend-badges img:hover {
    transform: scale(1.05);
    opacity: 0.9;
}
@media (max-width: 768px) {
    .footer {
        flex-direction: column;
        gap: 10px;
        padding: 15px;
    }
    .footer span {
        text-align: center;
    }
    .friend-badges {
        justify-content: center;
    }
    .friend-badges img {
        max-width: 150px;
        max-height: 40px;
    }
}
@media (max-width: 480px) {
    .footer {
        font-size: 12px;
        padding: 10px;
    }
    .friend-badges img {
        max-width: 120px;
        max-height: 35px;
    }
}
</style>
</body>
</html>`;
  
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8', ...corsHeaders() } });
}

// =================================================================================
//  項目: Flux AI Pro - NanoBanana Edition
//  版本: 11.8.0 (Aqua API 集成)
//  更新: 新增 Aqua API (Flux-2, Z-Image, NanoBanana, Imagen4)、風格擴展多語言支援
// =================================================================================

// 導入風格適配器（僅在服務器端使用）
import { ServerStyleManager } from './utils/style-adapter.js';

// 初始化風格管理器
const styleManager = new ServerStyleManager();
const mergedStyles = styleManager.merge();

const CONFIG = {
  PROJECT_NAME: "Flux-AI-Pro",
  PROJECT_VERSION: "11.7.0",
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
    "portrait-9-16-hd": { name: "豎屏 9:16 HD", width: 1080, height: 1920 },
    "landscape-16-9-hd": { name: "橫屏 16:9 HD", width: 1920, height: 1080 },
    "instagram-square": { name: "Instagram 方形", width: 1080, height: 1080 },
    "wallpaper-fhd": { name: "桌布 Full HD", width: 1920, height: 1080 },
    "portrait-3-4": { name: "豎屏 3:4", width: 768, height: 1024 },
    "portrait-4-5": { name: "豎屏 4:5", width: 1080, height: 1350 },
    "landscape-4-3": { name: "橫屏 4:3", width: 1024, height: 768 },
    "landscape-3-2": { name: "橫屏 3:2", width: 1200, height: 800 },
    "cinematic-21-9": { name: "電影感 21:9", width: 1920, height: 822 }
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
        { id: "gptimage", name: "GPT-Image 🎨", confirmed: true, category: "gptimage", description: "通用 GPT 圖像生成模型", max_size: 2048, pricing: { image_price: 0.0002, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "gptimage-large", name: "GPT-Image Large 🌟", confirmed: true, category: "gptimage", description: "高質量 GPT 圖像生成模型", max_size: 2048, pricing: { image_price: 0.0003, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "zimage", name: "Z-Image Turbo ⚡", confirmed: true, category: "zimage", description: "快速 6B 參數圖像生成 (Alpha)", max_size: 2048, pricing: { image_price: 0.0002, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "flux", name: "Flux 標準版", confirmed: true, category: "flux", description: "快速且高質量的圖像生成", max_size: 2048, pricing: { image_price: 0.00012, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "turbo", name: "Flux Turbo ⚡", confirmed: true, category: "flux", description: "超快速圖像生成", max_size: 2048, pricing: { image_price: 0.0003, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "kontext", name: "Kontext 🎨", confirmed: true, category: "kontext", description: "上下文感知圖像生成（支持圖生圖）", max_size: 2048, pricing: { image_price: 0.04, currency: "pollen" }, supports_reference_images: true, max_reference_images: 1, input_modalities: ["text", "image"], output_modalities: ["image"] },
        { id: "seedream", name: "SeeDream 🌈", confirmed: true, category: "seedream", description: "夢幻般的圖像生成", max_size: 2048, pricing: { image_price: 0.0002, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "seedream-pro", name: "SeeDream Pro 🌟", confirmed: true, category: "seedream", description: "高品質夢幻圖像生成", max_size: 2048, pricing: { image_price: 0.0003, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "klein", name: "FLUX.2 Klein 4B", confirmed: true, category: "flux", description: "Advanced Flux 2 model", max_size: 2048, pricing: { image_price: 0.0003, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "klein-large", name: "FLUX.2 Klein 9B 🌟", confirmed: true, category: "flux", description: "Advanced Flux 2 Large model - 9B parameters", max_size: 2048, pricing: { image_price: 0.0004, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "nanobanana-pro", name: "NanoBanana Pro 🍌", confirmed: true, category: "flux", description: "Nano Pro 專用高品質模型", max_size: 2048, pricing: { image_price: 0.00012, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "flux-pro", name: "Flux Pro 🚀", confirmed: true, category: "flux", description: "Flux Pro 高品質模型", max_size: 2048, pricing: { image_price: 0.00012, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] }
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
      rate_limit: { requests: 30, interval: 60 },
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
      description: "AquaDevs Premium API",
      features: {
        private_mode: true, custom_size: true, seed_control: false, negative_prompt: false, enhance: false, nologo: false, style_presets: true, auto_hd: true, quality_modes: false, auto_translate: true, reference_images: false, image_to_image: false, batch_generation: true, api_key_auth: true
      },
      models: [
        { id: "flux-2", name: "Flux 2 ⚡", category: "flux", description: "Flux 2 Generation", max_size: 1024 },
        { id: "zimage", name: "Z-Image", category: "other", description: "Z-Image Model", max_size: 1024 },
        { id: "nanobanana", name: "NanoBanana 🍌", category: "flux", description: "NanoBanana Model", max_size: 1024 },
        { id: "imagen4", name: "Imagen 4", category: "google", description: "Google Imagen 4", max_size: 1024 }
      ],
      rate_limit: { requests: 50, interval: 60 },
      max_size: { width: 2048, height: 2048 }
    }
  },
  
  DEFAULT_PROVIDER: "pollinations",
  
  STYLE_PRESETS: mergedStyles.styles,
  STYLE_CATEGORIES: mergedStyles.categories,
  
  OPTIMIZATION_RULES: {
    MODEL_STEPS: {
      "nanobanana-pro": { min: 20, optimal: 25, max: 40 },
      "gptimage": { min: 15, optimal: 25, max: 35 },
      "gptimage-large": { min: 20, optimal: 30, max: 45 },
      "zimage": { min: 10, optimal: 20, max: 30 },
      "flux": { min: 20, optimal: 28, max: 40 },
      "klein": { min: 25, optimal: 30, max: 50 },
      "klein-large": { min: 30, optimal: 35, max: 55 },
      "kontext": { min: 20, optimal: 28, max: 40 }
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
      "nanobanana-pro": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.0, guidance_boost: 1.0, recommended_quality: "standard" },
      "gptimage": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.0, guidance_boost: 1.0, recommended_quality: "standard" },
      "gptimage-large": { min_resolution: 1280, max_resolution: 2048, optimal_steps_boost: 1.15, guidance_boost: 1.05, recommended_quality: "ultra" },
      "zimage": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.0, guidance_boost: 1.0, recommended_quality: "economy" },
      "flux": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.1, guidance_boost: 1.0, recommended_quality: "standard" },
      "klein": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.15, guidance_boost: 1.1, recommended_quality: "ultra" },
      "klein-large": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.2, guidance_boost: 1.15, recommended_quality: "ultra" },
      "turbo": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 0.9, guidance_boost: 0.95, recommended_quality: "economy" },
      "kontext": { min_resolution: 1280, max_resolution: 2048, optimal_steps_boost: 1.2, guidance_boost: 1.1, recommended_quality: "ultra" }
    }
  }
};

class Logger {
  constructor() { this.logs = []; }
  add(title, data) { this.logs.push({ title, data, timestamp: new Date().toISOString() }); }
  get() { return this.logs; }
}

// ====== RateLimiter: 負責 KV 限制邏輯 (5次/小時) ======
class RateLimiter {
  constructor(env) {
    this.env = env;
    this.KV = env.FLUX_KV;
  }
  async checkLimit(ip) {
    if (!this.KV) {
      console.warn("⚠️ FLUX_KV 未綁定，跳過限制");
      return { allowed: true };
    }
    const key = `nano_limit:${ip}`;
    const windowSize = 3600 * 1000; // 1小時 (毫秒)
    const maxRequests = 5; 
    try {
      const rawData = await this.KV.get(key);
      let timestamps = rawData ? JSON.parse(rawData) : [];
      const now = Date.now();
      timestamps = timestamps.filter(ts => now - ts < windowSize);
      if (timestamps.length >= maxRequests) {
        const oldest = timestamps[0];
        const resetTime = oldest + windowSize;
        const waitMin = Math.ceil((resetTime - now) / 60000);
        return { allowed: false, reason: `🍌 香蕉能量耗盡！限額已滿 (5張/小時)。請休息 ${waitMin} 分鐘後再來。`, remaining: 0 };
      }
      timestamps.push(now);
      await this.KV.put(key, JSON.stringify(timestamps), { expirationTtl: 3600 });
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
    if (model.includes('turbo')) baseGuidance = style === 'photorealistic' ? 3.0 : 2.5;
    else if (style === 'photorealistic') baseGuidance = 8.5;
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
      qualityMode = 'standard', referenceImages = []
    } = options;

    console.log("🍌 [PollinationsProvider] 開始生成:", { model, prompt: prompt.substring(0, 30) + "..." });

    // 🔥 模型映射: 將自定義模型名稱映射到實際的 Pollinations API 模型
    const MODEL_MAPPING = {
      'nanobanana-pro': 'flux',
      'flux-pro': 'flux',
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
        logger.add("⚠️ Reference Images", { warning: model + " 不支持參考圖像，已忽略", supported_models: ["kontext"] });
      } else if (referenceImages.length > maxRefImages) {
        logger.add("⚠️ Reference Images", { warning: model + " 最多支持 " + maxRefImages + " 張參考圖", provided: referenceImages.length, using: maxRefImages });
        validReferenceImages = referenceImages.slice(0, maxRefImages);
      } else {
        validReferenceImages = referenceImages;
        logger.add("🖼️ Reference Images", { model: model, count: validReferenceImages.length, max_allowed: maxRefImages, mode: "圖生圖" });
      }
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
    
    const encodedPrompt = encodeURIComponent(fullPrompt);
    const pathPrefix = this.config.pathPrefix || "";
    let baseUrl = this.config.endpoint + pathPrefix + "/" + encodedPrompt;
    
    const params = new URLSearchParams();
    // 這裡直接使用 apiModel (即 nanobanana-pro)
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
    
    for (let retry = 0; retry < CONFIG.MAX_RETRIES; retry++) {
      try {
        const response = await fetchWithTimeout(url, { method: 'GET', headers: headers }, 120000);
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.startsWith('image/')) {
            logger.add("✅ Success", { url: response.url, used_model: apiModel, final_size: finalWidth + "x" + finalHeight, quality_mode: qualityMode, style_used: style, style_name: CONFIG.STYLE_PRESETS[style]?.name || style, hd_optimized: autoHD && hdOptimization?.optimized, auto_translated: translationLog.translated, reference_images_used: validReferenceImages.length, generation_mode: validReferenceImages.length > 0 ? "圖生圖" : "文生圖", authenticated: authConfig.enabled && !!authConfig.token, seed: currentSeed });
            const imageBlob = await response.blob();
            const imageBuffer = await imageBlob.arrayBuffer();
            return { imageData: imageBuffer, contentType: contentType, url: response.url, provider: this.name, model: model, requested_model: model, seed: currentSeed, style: style, style_name: CONFIG.STYLE_PRESETS[style]?.name || style, style_category: CONFIG.STYLE_PRESETS[style]?.category || 'unknown', steps: finalSteps, guidance: finalGuidance, width: finalWidth, height: finalHeight, quality_mode: qualityMode, prompt_complexity: promptComplexity, hd_optimized: autoHD && hdOptimization?.optimized, hd_details: hdOptimization, auto_translated: translationLog.translated, reference_images: validReferenceImages, reference_images_count: validReferenceImages.length, generation_mode: validReferenceImages.length > 0 ? "圖生圖" : "文生圖", authenticated: authConfig.enabled && !!authConfig.token, cost: "FREE", auto_optimized: autoOptimize };
          } else { throw new Error("Invalid content type: " + contentType); }
        } else if (response.status === 401) { throw new Error("Authentication failed: Invalid or missing API key. Please set POLLINATIONS_API_KEY"); } 
        else if (response.status === 403) { throw new Error("Access forbidden: API key may lack required permissions"); } 
        else { throw new Error("HTTP " + response.status + ": " + (await response.text()).substring(0, 200)); }
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
    const { model = "flux-2", width = 1024, height = 1024, apiKey = "", style = "none", negativePrompt = "" } = options;
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
    
    // Smart Routing
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
        // Image API Logic (No Fallback)
        try {
          const url = `${this.config.endpoint}/v1/images/generations`;
          const body = { model, prompt: enhancedPrompt, n: 1, size: `${width}x${height}`, response_format: "url" };
          logger.add("📡 Aqua Request (Image API)", { url, model });

          const response = await fetchWithTimeout(url, { method: 'POST', headers, body: JSON.stringify(body) }, 60000);
          
          if (!response.ok) {
             const errText = await response.text();
             throw new Error(`Status ${response.status}: ${errText}`);
          }
          
          const data = await response.json();
          console.log("🌊 [AquaProvider] Image Response:", JSON.stringify(data));

          if (data.data && data.data.length > 0) imgUrl = data.data[0].url;
          else if (data.url) imgUrl = data.url;
          else if (data.output) imgUrl = Array.isArray(data.output) ? data.output[0] : data.output;
          
          if (!imgUrl) throw new Error("No URL in response: " + JSON.stringify(data));
        } catch (e) {
          logger.add("⚠️ Image API Failed", { error: e.message });
          throw new Error(`Aqua Image API Failed: ${e.message}`);
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
}

class MultiProviderRouter {
  constructor(apiKeys = {}, env = null) {
    this.providers = {};
    this.apiKeys = apiKeys;
    this.env = env;
    for (const [key, config] of Object.entries(CONFIG.PROVIDERS)) {
      if (config.enabled) {
        if (key === 'pollinations') this.providers[key] = new PollinationsProvider(config, env);
        else if (key === 'infip') this.providers[key] = new InfipProvider(config, env);
        else if (key === 'aqua') this.providers[key] = new AquaProvider(config, env);
      }
    }
  }
  getProvider(providerName = null) {
    if (providerName && this.providers[providerName]) return { name: providerName, instance: this.providers[providerName] };
    const defaultName = CONFIG.DEFAULT_PROVIDER;
    if (this.providers[defaultName]) return { name: defaultName, instance: this.providers[defaultName] };
    const firstProvider = Object.keys(this.providers)[0];
    if (firstProvider) return { name: firstProvider, instance: this.providers[firstProvider] };
    throw new Error('No available provider');
  }
  async generate(prompt, options, logger) {
    const { provider: requestedProvider = null, numOutputs = 1 } = options;
    const { name: providerName, instance: provider } = this.getProvider(requestedProvider);
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
      else if (url.pathname === '/health') {
        response = new Response(JSON.stringify({
          status: 'ok', version: CONFIG.PROJECT_VERSION, timestamp: new Date().toISOString(),
          styles_count: mergedStyles.stats.total,
          styles_breakdown: mergedStyles.stats,
          api_auth: { enabled: CONFIG.POLLINATIONS_AUTH.enabled, method: CONFIG.POLLINATIONS_AUTH.method, has_token: !!CONFIG.POLLINATIONS_AUTH.token, endpoint: CONFIG.PROVIDERS.pollinations.endpoint },
          models: CONFIG.PROVIDERS.pollinations.models.map(m => ({ id: m.id, name: m.name, category: m.category, supports_reference_images: m.supports_reference_images || false })),
          style_categories: Object.keys(CONFIG.STYLE_CATEGORIES).map(key => ({ id: key, name: CONFIG.STYLE_CATEGORIES[key].name, icon: CONFIG.STYLE_CATEGORIES[key].icon, count: Object.values(CONFIG.STYLE_PRESETS).filter(s => s.category === key).length }))
        }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
      } else {
        response = new Response(JSON.stringify({ error: 'Not Found', message: '此 Worker 僅提供 Web UI 界面', available_paths: ['/', '/health', '/_internal/generate', '/nano'] }), { status: 404, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
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
      model: body.model || "gptimage", 
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
      nsfw: body.nsfw === true
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
<title>🍌 NanoBanana Pro - 控制台</title>
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

            <div class="control-group">
                <div class="label-row">
                    <label>Prompt</label>
                    <button class="tool-btn" id="randomBtn" title="隨機靈感">🎲 靈感骰子</button>
                </div>
                <textarea id="prompt" rows="4" placeholder="描述你想像中的畫面... (支援中文)"></textarea>
            </div>

            <div class="control-group">
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
                </div>
                <input type="hidden" id="width" value="1024">
                <input type="hidden" id="height" value="1024">
            </div>

            <div class="control-group">
                <div class="label-row">
                    <label id="styleLabel">風格 & 設定</label>
                </div>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <select id="style" id="nanoStyleSelect">
                        <!-- 風格選項將由 JavaScript 動態生成 -->
                    </select>
                    <div style="position:relative">
                         <input type="number" id="seed" placeholder="Seed" value="-1" disabled style="padding-right:30px">
                         <button id="lockSeedBtn" class="tool-btn" style="position:absolute; right:10px; top:50%; transform:translateY(-50%)">🎲</button>
                    </div>
                </div>
            </div>

            <div class="control-group">
                <label id="negativeLabel">排除 (Negative)</label>
                <input type="text" id="negative" value="nsfw, ugly, text, watermark, low quality, bad anatomy" style="font-size:12px; color:#aaa">
            </div>

            <!-- ====== 專業提示詞生成器 (Nano Pro 版) ====== -->
            <div class="control-group" style="background: linear-gradient(135deg, rgba(250, 204, 21, 0.1), rgba(139, 92, 246, 0.1)); border: 1px solid rgba(250, 204, 21, 0.3); border-radius: 12px; padding: 16px; margin-top: 16px;">
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

            <button id="genBtn" class="gen-btn">
                <span id="genBtnText">生成圖像</span>
                <span id="genBtnCost" style="font-size:12px; opacity:0.6; font-weight:400; display:block; margin-top:4px">消耗 1 香蕉能量 🍌</span>
            </button>
            
            <div class="quota-box">
                <div class="quota-info">
                    <span id="quotaLabel">每小時能量</span>
                    <span id="quotaText" class="quota-text">5 / 5</span>
                </div>
                <div class="quota-bar">
                    <div id="quotaFill" class="quota-fill"></div>
                </div>
            </div>
        </div>

        <div class="main-stage">
            <div id="placeholderText" class="placeholder-text">NANOPRO</div>
            <img id="resultImg" alt="Generated Image" title="點擊放大">
            
            <div class="loading-overlay">
                <div class="banana-loader">🍌</div>
                <div id="loadingText" class="loading-text">正在注入 AI 能量...</div>
            </div>

            <div class="history-dock" id="historyStrip">
                <!-- History Items -->
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
            gen_btn_depleted: "本小時能量已耗盡",
            gen_btn_depleted_sub: "請稍後再來",
            quota_label: "每小時能量",
            placeholder_text: "NANOPRO",
            loading_text: "正在注入 AI 能量...",
            toast_no_prompt: "⚠️ 請輸入提示詞",
            toast_energy_depleted: "🚫 本小時能量已耗盡，請稍後再來！",
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
            gen_btn_depleted: "Energy Depleted This Hour",
            gen_btn_depleted_sub: "Please come back later",
            quota_label: "Hourly Energy",
            placeholder_text: "NANOPRO",
            loading_text: "Injecting AI Energy...",
            toast_no_prompt: "⚠️ Please enter a prompt",
            toast_energy_depleted: "🚫 Energy depleted this hour, please come back later!",
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
            gen_btn_depleted: "今時間のエネルギーが枯渇しました",
            gen_btn_depleted_sub: "後でもう一度お越しください",
            quota_label: "1時間あたりのエネルギー",
            placeholder_text: "NANOPRO",
            loading_text: "AIエネルギーを注入中...",
            toast_no_prompt: "⚠️ プロンプトを入力してください",
            toast_energy_depleted: "🚫 今時間のエネルギーが枯渇しました。後でもう一度お越しください！",
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
            gen_btn_depleted: "이번 시간 에너지 소진됨",
            gen_btn_depleted_sub: "나중에 다시 방문해주세요",
            quota_label: "시간당 에너지",
            placeholder_text: "NANOPRO",
            loading_text: "AI 에너지 주입 중...",
            toast_no_prompt: "⚠️ 프롬프트를 입력하세요",
            toast_energy_depleted: "🚫 이번 시간 에너지가 소진되었습니다. 나중에 다시 방문해주세요！",
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
            gen_btn_depleted: "نفدت الطاقة لهذه الساعة",
            gen_btn_depleted_sub: "يرجى العودة لاحقًا",
            quota_label: "الطاقة لكل ساعة",
            placeholder_text: "NANOPRO",
            loading_text: "حقن طاقة AI...",
            toast_no_prompt: "⚠️ يرجى إدخال موجه",
            toast_energy_depleted: "🚫 نفدت الطاقة لهذه الساعة، يرجى العودة لاحقًا!",
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
            { key: 'oil-painting', icon: '🎨', nameKey: 'style_oil_painting' }
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
    
    // UI Quota Logic (Syncs with server limit of 5)
    let currentQuota = 5;
    const maxQuota = 5;
    
    // Cooldown Logic
    const COOLDOWN_KEY = 'nano_cooldown_timestamp';
    const COOLDOWN_SEC = 180;
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
        els.genBtn.innerHTML = \`<span>\${nanoT('gen_btn_charging').replace('{s}', sec)}</span>\`;
    }
    
    const now = new Date();
    const currentHourStr = now.toDateString() + '-' + now.getHours();
    const stored = localStorage.getItem('nano_quota_hourly_v2'); 
    
    if(stored) {
        const data = JSON.parse(stored);
        if(data.hour === currentHourStr) {
            currentQuota = data.val;
        } else {
            localStorage.setItem('nano_quota_hourly_v2', JSON.stringify({hour: currentHourStr, val: maxQuota}));
            currentQuota = maxQuota;
        }
    } else {
        localStorage.setItem('nano_quota_hourly_v2', JSON.stringify({hour: currentHourStr, val: maxQuota}));
    }
    updateQuotaUI();
    
    // Check cooldown on load
    checkAndStartCooldown();
    
    function updateQuotaUI() {
        els.quotaText.textContent = \`\${currentQuota} / \${maxQuota}\`;
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
            const n = new Date();
            const h = n.toDateString() + '-' + n.getHours();
            localStorage.setItem('nano_quota_hourly_v2', JSON.stringify({hour: h, val: currentQuota}));
            updateQuotaUI();
        }
    }

    els.ratios.forEach(r => {
        r.onclick = () => {
            els.ratios.forEach(i => i.classList.remove('active'));
            r.classList.add('active');
            els.width.value = r.dataset.w;
            els.height.value = r.dataset.h;
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

    function addHistory(url) {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = \`<img src="\${url}">\`;
        div.onclick = () => {
            els.img.src = url;
            document.querySelectorAll('.history-item').forEach(i => i.classList.remove('active'));
            div.classList.add('active');
        };
        els.history.prepend(div);
        if(els.history.children.length > 10) els.history.lastChild.remove();
        document.querySelectorAll('.history-item').forEach(i => i.classList.remove('active'));
        div.classList.add('active');
    }

    els.genBtn.onclick = async () => {
        const p = els.prompt.value.trim();
        if(!p) return nanoToast('toast_no_prompt', "⚠️ 請輸入提示詞");
        if(currentQuota <= 0) return nanoToast('toast_energy_depleted', "🚫 本小時能量已耗盡，請稍後再來！");

        els.genBtn.disabled = true;
        els.loader.style.display = 'flex';
        els.img.style.opacity = '0.5';

        try {
            console.log("🍌 Nano Pro: 開始生成圖片...", {
                prompt: p,
                model: 'nanobanana-pro',
                width: els.width.value,
                height: els.height.value,
                style: els.style.value,
                seed: els.seed.value
            });

            const requestBody = {
                prompt: p,
                negative_prompt: els.negative.value,
                model: 'nanobanana-pro',
                width: parseInt(els.width.value),
                height: parseInt(els.height.value),
                style: els.style.value,
                seed: parseInt(els.seed.value),
                n: 1,
                nologo: true,
                auto_optimize: true,
                auto_hd: true,
                quality_mode: 'standard'
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
                const h = n.toDateString() + '-' + n.getHours();
                localStorage.setItem('nano_quota_hourly_v2', JSON.stringify({hour: h, val: 0}));
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
            els.loader.style.display = 'none';
        }
    };
</script>
</body>
</html>`;
  
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8', ...corsHeaders() } });
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
    </select>
</div>
<div class="form-group" id="apiKeyGroup" style="display:none; background:rgba(245, 158, 11, 0.1); padding:10px; border-radius:8px; border:1px solid rgba(245, 158, 11, 0.3);">
    <label>API Key <span style="font-weight:normal;opacity:0.7">(Stored locally)</span></label>
    <input type="password" id="apiKey" placeholder="Paste your API Key here">
    <div style="font-size:11px;color:#ccc;margin-top:6px">
        Get free key from <a href="https://infip.pro/api-keys" target="_blank" style="color:#f59e0b;text-decoration:underline">infip.pro/api-keys</a>
    </div>
</div>

<div class="form-group" id="nsfwGroup" style="display:none; align-items:center; justify-content:space-between; background:rgba(239, 68, 68, 0.1); padding:10px; border-radius:8px; border:1px solid rgba(239, 68, 68, 0.3);">
    <div>
        <label for="nsfwToggle" style="margin:0; cursor:pointer; color:#f87171;">🔞 解除成人內容限制 (NSFW)</label>
        <div style="font-size:11px; color:#fca5a5; margin-top:2px;">啟用此選項將允許生成成人內容 (僅 Infip)</div>
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

<button type="submit" class="btn btn-primary" id="generateBtn" data-t="gen_btn" style="margin-top:10px;">🎨 開始生成</button>
</form>
</div>
<div class="center-panel">
<div id="results"><div class="empty-state"><p data-t="empty_title">尚未生成任何圖像</p></div></div>
</div>
<div class="right-panel">
<div class="form-group"><label data-t="pos_prompt">正面提示詞</label><textarea id="prompt" placeholder="Describe your image..." required></textarea></div>
<div class="form-group"><label data-t="neg_prompt">負面提示詞 (可選)</label><textarea id="negativePrompt" placeholder="What to avoid..." rows="4">nsfw, ugly, text, watermark, low quality, bad anatomy, distortion, blurry</textarea></div>
<div class="form-group"><label data-t="ref_img">參考圖像 (Img2Img) 📸</label>
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
    <div style="font-size:11px; color:#9ca3af; margin-top:4px;">* 支援模型: Kontext, Flux, Klein</div>
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
        nav_gen:"🎨 生成圖像", nav_his:"📚 歷史記錄", nav_nano:"Nano版", settings_title:"⚙️ 生成參數", provider_label:"API 供應商", model_label:"模型選擇", size_label:"尺寸預設", style_label:"藝術風格 🎨", quality_label:"質量模式", seed_label:"Seed (種子碼)", seed_random:"🎲 隨機", seed_lock:"🔒 鎖定", auto_opt_label:"✨ 自動優化", auto_opt_desc:"自動調整 Steps 與 Guidance", adv_settings:"🛠️ 進階參數", steps_label:"生成步數 (Steps)", guidance_label:"引導係數 (Guidance)", gen_btn:"🎨 開始生成", empty_title:"尚未生成任何圖像", pos_prompt:"正面提示詞", neg_prompt:"負面提示詞 (可選)", ref_img:"參考圖像 URL (Kontext 專用)", stat_total:"📊 總記錄數", stat_storage:"💾 存儲空間 (永久)", btn_export:"📥 導出", btn_clear:"🗑️ 清空", no_history:"暫無歷史記錄", btn_reuse:"🔄 重用", btn_dl:"💾 下載",
        cooldown_msg: "⏳ 請等待冷卻時間...",
        quality_economy: "Economy", quality_standard: "Standard", quality_ultra: "Ultra HD",
        provider_pollinations: "Pollinations.ai (Free)", provider_infip: "Ghostbot (Infip) 🌟",
        api_key_label: "API Key", api_key_desc: "Stored locally", api_key_placeholder: "Paste your API Key here",
        nsfw_label: "🔞 解除成人內容限制 (NSFW)", nsfw_desc: "啟用此選項將允許生成成人內容 (僅 Infip)",
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
        nav_gen:"🎨 Generate Image", nav_his:"📚 History", nav_nano:"Nano", settings_title:"⚙️ Generation Settings", provider_label:"API Provider", model_label:"Model Selection", size_label:"Image Size", style_label:"Art Style 🎨", quality_label:"Quality Mode", seed_label:"Seed Value", seed_random:"🎲 Random", seed_lock:"🔒 Lock", auto_opt_label:"✨ Auto Optimize", auto_opt_desc:"Automatically adjust Steps & Guidance", adv_settings:"🛠️ Advanced Settings", steps_label:"Generation Steps", guidance_label:"Guidance Scale", gen_btn:"🎨 Start Generation", empty_title:"No images generated yet", pos_prompt:"Positive Prompt", neg_prompt:"Negative Prompt (Optional)", ref_img:"Reference Image URL (Kontext Only)", stat_total:"📊 Total Records", stat_storage:"💾 Storage Space (Permanent)", btn_export:"📥 Export", btn_clear:"🗑️ Clear All", no_history:"No history records found", btn_reuse:"🔄 Reuse Settings", btn_dl:"💾 Download",
        cooldown_msg: "⏳ Please wait for cooldown...",
        quality_economy: "Economy", quality_standard: "Standard", quality_ultra: "Ultra HD",
        provider_pollinations: "Pollinations.ai (Free)", provider_infip: "Ghostbot (Infip) 🌟",
        api_key_label: "API Key", api_key_desc: "Stored locally", api_key_placeholder: "Paste your API Key here",
        nsfw_label: "🔞 Disable NSFW Filter", nsfw_desc: "Enable this option to allow adult content generation (Infip only)",
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
        provider_pollinations: "Pollinations.ai (無料)", provider_infip: "Ghostbot (Infip) 🌟",
        api_key_label: "APIキー", api_key_desc: "ローカルに保存", api_key_placeholder: "ここにAPIキーを貼り付け",
        nsfw_label: "🔞 NSFWフィルターを無効化", nsfw_desc: "このオプションを有効にすると、成人向けコンテンツの生成が可能になります（Infipのみ）",
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
        provider_pollinations: "Pollinations.ai (무료)", provider_infip: "Ghostbot (Infip) 🌟",
        api_key_label: "API 키", api_key_desc: "로컬에 저장", api_key_placeholder: "여기에 API 키를 붙여넣으세요",
        nsfw_label: "🔞 NSFW 필터 비활성화", nsfw_desc: "이 옵션을 활성화하면 성인 콘텐츠 생성이 허용됩니다 (Infip만 해당)",
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
        nav_gen:"🎨 إنشاء صورة", nav_his:"📚 السجل", nav_nano:"Nano", settings_title:"⚙️ إعدادات الإنشاء", provider_label:"مزود API", model_label:"اختيار النموذج", size_label:"حجم الصورة", style_label:"النمط الفني 🎨", quality_label:"وضع الجودة", seed_label:"قيمة البذرة", seed_random:"🎲 عشوائي", seed_lock:"🔒 قفل", auto_opt_label:"✨ تحسين تلقائي", auto_opt_desc:"ضبط الخطوات والتوجيه تلقائيًا", adv_settings:"🛠️ إعدادات متقدمة", steps_label:"خطوات الإنشاء", guidance_label:"مقياس التوجيه", gen_btn:"🎨 بدء الإنشاء", empty_title:"لم يتم إنشاء أي صور بعد", pos_prompt:"موجه إيجابي", neg_prompt:"موجه سلبي (اختياري)", ref_img:"صورة مرجعية (Img2Img) 📸", stat_total:"📊 إجمالي السجلات", stat_storage:"💾 مساحة التخزين (دائمة)", btn_export:"📥 تصدير", btn_clear:"🗑️ مسح الكل", btn_reuse:"🔄 إعادة الاستخدام", btn_dl:"💾 تنزيل", no_history:"لا توجد سجلات", cooldown_msg:"⏳ يرجى الانتظار...", quality_economy:"اقتصادي", quality_standard:"قياسي", quality_ultra:"فائق الدقة", provider_pollinations:"Pollinations.ai (مجاني)", provider_infip:"Ghostbot (Infip) 🌟", api_key_label:"مفتاح API", api_key_desc:"مخزن محليًا", api_key_placeholder:"الصق مفتاح API هنا", nsfw_label:"🔞 تعطيل فلتر NSFW", nsfw_desc:"تمكين هذا الخيار للسماح بإنشاء محتوى للبالغين (Infip فقط)", batch_label:"🖼️ إنشاء مجموع", batch_size_label:"حجم المجموعة", prompt_generator_title:"مولد المطالبات الاحترافي", prompt_generator_upload_ref:"رفع صورة مرجعية (اختياري)", prompt_generator_select_image:"اختر صورة", prompt_generator_simple_desc:"صف الصورة التي تريدها ببساطة", prompt_generator_generate:"إنشاء موجه احترافي", prompt_generator_apply:"تطبيق على الموجه", prompt_generator_generated:"الموجه الاحترافي المُنشأ", prompt_generator_tip:"💡 نصيحة: بعد تحديد 'نمط فني' على اليسار، سيقوم المولد بدمج هذا النمط (مثل السايبربانك، الرسم بالحبر) تلقائيًا في موجهك للحصول على نتائج أكثر فنية!", error_no_prompt:"⚠️ يرجى إدخال موجه", error_energy_depleted:"🚫 نفدت الطاقة لهذه الساعة، يرجى العودة لاحقًا!", error_image_too_large:"الصورة كبيرة جدًا! الحد الأقصى 5 ميجابايت", error_invalid_file:"يرجى اختيار ملف صورة", error_upload_failed:"فشل الرفع"
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
    
    // Logic: Show API Key input only if required AND not provided by server
    if(config.requires_key && config.auth_mode === 'bearer') {
        if (config.has_server_key) {
            apiKeyGroup.style.display = 'none';
        } else {
            apiKeyGroup.style.display = 'block';
            let storedKey = '';
            if (p === 'infip') storedKey = sessionStorage.getItem('infip_api_key');
            if (p === 'aqua') storedKey = sessionStorage.getItem('aqua_api_key');
            
            apiKeyInput.value = storedKey || '';
            apiKeyInput.placeholder = "Paste your API Key here";
        }
    } else {
        apiKeyGroup.style.display = 'none';
    }
    
    // Logic: Show NSFW Toggle only for Infip
    const nsfwGroup = document.getElementById('nsfwGroup');
    const batchGroup = document.getElementById('batchGroup');
    
    if (p === 'infip') {
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
        // 🔥 過濾掉 nanobanana-pro 模型（僅限 Nano Pro 頁面使用）
        if (m.id === 'nanobanana-pro') return;
        
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
});

const PRESET_SIZES=${JSON.stringify(CONFIG.PRESET_SIZES)};
const STYLE_PRESETS=${JSON.stringify(CONFIG.STYLE_PRESETS)};
const STYLE_CATEGORIES=${JSON.stringify(CONFIG.STYLE_CATEGORIES)};
// Inject server-side key status
const frontendProviders = ${JSON.stringify(CONFIG.PROVIDERS)};
if (${hasInfipServerKey} && frontendProviders.infip) {
    frontendProviders.infip.has_server_key = true;
}
if (${hasAquaServerKey} && frontendProviders.aqua) {
    frontendProviders.aqua.has_server_key = true;
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
        d.innerHTML=\`<img src="\${imgSrc}" loading="lazy"><div class="gallery-info"><div class="gallery-meta"><span class="model-badge">\${item.model}</span><span class="seed-badge">#\${item.seed}</span></div><div class="gallery-actions"><button class="action-btn reuse-btn">\${I18N[curLang].btn_reuse}</button><button class="action-btn download-btn">\${I18N[curLang].btn_dl}</button><button class="action-btn delete delete-btn">🗑️</button></div></div>\`;
        d.querySelector('img').onclick=()=>openModal(imgSrc);
        d.querySelector('.reuse-btn').onclick=()=>{
            document.getElementById('prompt').value=item.prompt||'';
            const modelSelect = document.getElementById('model');
            const targetModel = item.model || 'gptimage';
            
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
            a.download=\`\${item.model}-\${item.seed}.png\`;
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
    downloadBtn.download = \`flux-pro-\${Date.now()}.png\`;
    
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

    const prompt=document.getElementById('prompt').value;
    const resDiv=document.getElementById('results');
    const sizeConfig=PRESET_SIZES[document.getElementById('size').value];
    
    if(!prompt)return;
    
    // 開始生成，鎖定按鈕
    btn.disabled=true; 
    btn.textContent=curLang==='zh'?'生成中...':'Generating...';
    resDiv.innerHTML='<div class="loading"><div class="spinner"></div></div>';
    
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
    if (isNSFW && document.getElementById('provider').value === 'infip') {
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
                n: batchSize
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
                displayResult([item]);
                
                // Determine cooldown based on provider
                const provider = document.getElementById('provider').value;
                const cooldownTime = provider === 'infip' ? INFIP_COOLDOWN_SEC : COOLDOWN_SEC;
                startCooldown(cooldownTime);
            };
        }else{
            const data=await res.json();
            if(data.error) throw new Error(data.error.message);
            for(const d of data.data){ const item={...d, prompt}; await addToHistory(item); items.push(item); }
            displayResult(items);
            
            // Determine cooldown based on provider
            const provider = document.getElementById('provider').value;
            const cooldownTime = provider === 'infip' ? INFIP_COOLDOWN_SEC : COOLDOWN_SEC;
            startCooldown(cooldownTime); 
        }
    }catch(err){ 
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

function displayResult(items){
    const div=document.createElement('div');div.className='gallery';
    items.forEach(item=>{
        const d=document.createElement('div');d.className='gallery-item';
        d.innerHTML=\`<img src="\${item.image||item.url}" onclick="openModal(this.src)">\`;
        div.appendChild(d);
    });
    document.getElementById('results').innerHTML='';
    document.getElementById('results').appendChild(div);
}

// Online Count (whos.amung.us widget handled in HTML)
window.onload=()=>{
    updateLang();
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
            this.showStatus('請輸入畫面描述或上傳圖片', 'error');
            return;
        }
        
        const btn = document.getElementById('generatePromptBtn');
        const originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<span>⏳</span><span>生成中...</span>';
        
        // 如果有上傳圖片但還沒有 URL，先上傳獲取 URL
        if (this.uploadedImage && !this.uploadedImageUrl) {
            this.showStatus('正在上傳圖片...', 'loading');
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
<div class="footer" style="position:relative; z-index:10; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; gap:15px; flex-wrap:wrap;">
    <span>Powered by Flux AI Pro • <a href="https://github.com/kinai9661/Flux-AI-Pro" target="_blank">Engine</a> • <a href="/nano" target="_blank">Nano Version</a></span>
    <span style="opacity:0.5">|</span>
    <span style="opacity:0.9">友情鏈接: <a href="https://pollinations.ai" target="_blank">Pollinations.ai</a> • <a href="https://infip.pro" target="_blank">Infip</a> • <a href="https://aquadevs.com" target="_blank">AquaDevs</a> • <a href="https://github.com" target="_blank">GitHub</a></span>
    <span style="opacity:0.5">|</span>
    <a href="https://showmebest.ai" target="_blank" style="display:flex; align-items:center;"><img src="https://showmebest.ai/badge/feature-badge-dark.webp" alt="Featured on ShowMeBestAI" width="165" height="45"></a>
</div>
</body>
</html>`;
  
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8', ...corsHeaders() } });
}

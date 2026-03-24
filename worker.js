// =================================================================================
// 項目: Flux AI Pro - NanoBanana Edition
// 版本: 11.16.0
// 更新: AI 圖像生成服務
// =================================================================================

// 導入風格適配器（僅在服務器端使用）
import { ServerStyleManager } from './utils/style-adapter.js';

// 初始化風格管理器
const styleManager = new ServerStyleManager();
const mergedStyles = styleManager.merge();

const CONFIG = {
PROJECT_NAME: "Flux-AI-Pro",
PROJECT_VERSION: "11.16.0",
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
        { id: "flux-schnell",  name: "Flux Schnell ⚡",    confirmed: true, category: "flux",  description: "快速且高質量的圖像生成",                      max_size: 2048, pricing: { image_price: 0.00012, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "zimage",        name: "Z-Image Turbo ⚡",   confirmed: true, category: "zimage",description: "快速 6B 參數圖像生成 (Alpha)",                  max_size: 2048, pricing: { image_price: 0.0002,  currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "klein",         name: "FLUX.2 Klein 4B",    confirmed: true, category: "flux",  description: "Advanced Flux 2 model",                      max_size: 2048, pricing: { image_price: 0.0003,  currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "klein-large",   name: "FLUX.2 Klein 9B 🌟", confirmed: true, category: "flux",  description: "Advanced Flux 2 Large model - 9B parameters", max_size: 2048, pricing: { image_price: 0.0004,  currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "grok-imagine",  name: "Grok Imagine 🚀",    confirmed: true, category: "grok",  description: "xAI Grok 圖像生成模型",                      max_size: 2048, pricing: { image_price: 0.0005,  currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "qwen-image",    name: "Qwen Image 🎨",      confirmed: true, category: "qwen",  description: "通義千問圖像生成模型",                        max_size: 2048, pricing: { image_price: 0.0003,  currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] }
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
            private_mode: true,
            custom_size: true,
            seed_control: false,
            negative_prompt: false,
            enhance: false,
            nologo: false,
            style_presets: true,
            auto_hd: true,
            quality_modes: false,
            auto_translate: true,
            reference_images: true,
            image_to_image: true,
            batch_generation: true,
            api_key_auth: true,
            polling_mode: true
        },
      models: [
            { id: "img4", name: "Imagen 4 (Google) 🌟", category: "google", description: "Google 最新高品質繪圖模型", max_size: 1792 },
            { id: "img3", name: "Imagen 3 (Google)", category: "google", description: "Google Imagen 3 模型", max_size: 1024 },
            { id: "flux-schnell", name: "Flux Schnell ⚡", category: "flux", description: "Flux 極速版", max_size: 1024 },
            { id: "lucid-origin", name: "Lucid Origin", category: "other", description: "Lucid 風格模型", max_size: 1024 },
            { id: "phoenix", name: "Phoenix 🔥", category: "other", description: "Phoenix 圖像生成模型", max_size: 1024 },
            { id: "sdxl", name: "SDXL Stable Diffusion", category: "sd", description: "Stable Diffusion XL", max_size: 1024 },
            { id: "sdxl-lite", name: "SDXL Lite ⚡", category: "sd", description: "SDXL 輕量版", max_size: 1024 },
            { id: "z-image-turbo", name: "Z-Image Turbo ⚡", category: "other", description: "Z-Image 快速版（異步輪詢）", max_size: 1024, polling: true },
            { id: "nano-banana", name: "Nano Banana 🍌", category: "flux", description: "Nano Banana Img2Img 模型（異步輪詢）", max_size: 1024, polling: true, supports_img2img: true },
            { id: "nbpro", name: "NB Pro 🌟", category: "flux", description: "NB Pro 高品質模型（異步輪詢）", max_size: 1024, polling: true, supports_img2img: true },
            { id: "qwen", name: "Qwen Image 🎨", category: "qwen", description: "通義千問圖像模型（異步輪詢）", max_size: 1024, polling: true }
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
      	{ id: "gemini-3-pro-image-preview", name: "Gemini 3 Pro Image Preview 🌟", category: "gemini", description: "Gemini 3 Pro 圖像預覽模型 - 高品質圖像生成", max_size: 4096 },
      	{ id: "gemini-3.1-flash-image-preview", name: "Gemini 3.1 Flash Image Preview ⚡", category: "gemini", description: "Gemini 3.1 Flash 圖像預覽模型 - 快速圖像生成", max_size: 4096 }
      ],
      rate_limit: { requests: 60, interval: 60 },
      max_size: { width: 4096, height: 4096 }
    },
      supabase: {
      name: "Supabase API",
      endpoint: "https://gjosebfngzowbcrwzxnw.supabase.co/functions/v1/openai-compatible",
      type: "openai_compatible",
      auth_mode: "bearer",
      requires_key: true,
      enabled: true,
      default: false,
      description: "Supabase OpenAI 相容 API 圖像生成服務",
      features: {
      private_mode: true,
      custom_size: true,
      seed_control: false,
      negative_prompt: false,
      enhance: false,
      nologo: false,
      style_presets: true,
      auto_hd: true,
      quality_modes: false,
      auto_translate: true,
      reference_images: false,
      image_to_image: false,
      batch_generation: true,
      api_key_auth: true
      },
      models: [
      { id: "gemini-3.1-flash-image-preview", name: "Gemini 3.1 Flash Image Preview ⚡", category: "gemini", description: "Gemini 3.1 Flash 圖像預覽模型 - 快速圖像生成", max_size: 4096 },
      { id: "dall-e-3", name: "DALL-E 3 ✨", category: "dalle", description: "DALL-E 3 - 高品質圖像生成", max_size: 1024 },
      { id: "gpt-image-1", name: "GPT Image 1 🖼️", category: "gpt", description: "GPT Image 1 - OpenAI 圖像生成模型", max_size: 1024 }
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
      "imagen-4":     { min: 25, optimal: 30, max: 50 },
      "flux-schnell": { min: 20, optimal: 25, max: 40 },
      "zimage":       { min: 25, optimal: 30, max: 50 },
      "klein":        { min: 25, optimal: 30, max: 50 },
      "klein-large":  { min: 30, optimal: 35, max: 55 },
      "grok-imagine": { min: 25, optimal: 30, max: 50 },
      "qwen-image":   { min: 25, optimal: 30, max: 50 }
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
      "imagen-4":     { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.15, guidance_boost: 1.1,  recommended_quality: "ultra" },
      "flux-schnell": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.0,  guidance_boost: 1.0,  recommended_quality: "standard" },
      "zimage":       { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.15, guidance_boost: 1.1,  recommended_quality: "ultra" },
      "klein":        { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.15, guidance_boost: 1.1,  recommended_quality: "ultra" },
      "klein-large":  { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.2,  guidance_boost: 1.15, recommended_quality: "ultra" },
      "grok-imagine": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.15, guidance_boost: 1.1,  recommended_quality: "ultra" },
      "qwen-image":   { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.1,  guidance_boost: 1.05, recommended_quality: "standard" }
    }
  }
};

class Logger {
  constructor() { this.logs = []; }
  add(title, data) { this.logs.push({ title, data, timestamp: new Date().toISOString() }); }
  get() { return this.logs; }
}

class AdaptiveStrategyManager {
  static get VERSION() { return 'd2-pilot-v1'; }

  constructor(env) {
    this.env = env;
    this.KV = env?.FLUX_KV || null;
    this.ttl = 60 * 60 * 24 * 7; // 7 days
  }

  getProviderStatsKey(provider) {
    return `d2:provider:${provider}`;
  }

  createEmptyStats() {
    return {
      success: 0,
      failure: 0,
      timeout: 0,
      rate_limit: 0,
      auth: 0,
      service_unavailable: 0,
      other: 0,
      total_duration: 0,
      count: 0,
      updated_at: Date.now()
    };
  }

  normalizeStats(stats) {
    const base = this.createEmptyStats();
    return {
      ...base,
      ...(stats || {}),
      success: Number(stats?.success || 0),
      failure: Number(stats?.failure || 0),
      timeout: Number(stats?.timeout || 0),
      rate_limit: Number(stats?.rate_limit || 0),
      auth: Number(stats?.auth || 0),
      service_unavailable: Number(stats?.service_unavailable || 0),
      other: Number(stats?.other || 0),
      total_duration: Number(stats?.total_duration || 0),
      count: Number(stats?.count || 0),
      updated_at: Number(stats?.updated_at || Date.now())
    };
  }

  async readProviderStats(provider) {
    if (!this.KV || !provider) return this.createEmptyStats();
    try {
      const raw = await this.KV.get(this.getProviderStatsKey(provider));
      if (!raw) return this.createEmptyStats();
      return this.normalizeStats(JSON.parse(raw));
    } catch (error) {
      console.warn('⚠️ Strategy stats read failed:', provider, error.message);
      return this.createEmptyStats();
    }
  }

  async writeProviderStats(provider, stats) {
    if (!this.KV || !provider) return;
    try {
      await this.KV.put(this.getProviderStatsKey(provider), JSON.stringify(stats), { expirationTtl: this.ttl });
    } catch (error) {
      console.warn('⚠️ Strategy stats write failed:', provider, error.message);
    }
  }

  applyQueuePenalty(score, queueStatus) {
    if (!queueStatus || queueStatus.usesQueue === false) return score;
    const waiting = Number(queueStatus.waiting || 0);
    const processing = Number(queueStatus.processing || 0);
    const penalty = Math.min(waiting * 2 + processing, 20);
    return score - penalty;
  }

  async getProviderHealth(provider, queueStatus = null) {
    const stats = await this.readProviderStats(provider);
    const count = Math.max(stats.count, 0);

    if (count === 0) {
      const neutralScore = this.applyQueuePenalty(72, queueStatus);
      return {
        provider,
        score: Math.max(5, Math.min(99, neutralScore)),
        success_rate: 0.95,
        avg_latency: 3200,
        count,
        rate_limit_rate: 0,
        stats
      };
    }

    const successRate = stats.success / count;
    const avgLatency = stats.total_duration > 0 ? stats.total_duration / count : 3200;
    const rateLimitRate = stats.rate_limit / count;
    const unavailableRate = stats.service_unavailable / count;

    let score = successRate * 100;
    score -= Math.min(avgLatency / 400, 25);
    score -= rateLimitRate * 20;
    score -= unavailableRate * 25;
    score = this.applyQueuePenalty(score, queueStatus);
    score = Math.max(5, Math.min(99, score));

    return {
      provider,
      score,
      success_rate: successRate,
      avg_latency: avgLatency,
      count,
      rate_limit_rate: rateLimitRate,
      service_unavailable_rate: unavailableRate,
      stats
    };
  }

  async selectProvider({ requestedProvider = null, defaultProvider = null, availableProviders = [], queueStatusMap = {} }) {
    const providers = (availableProviders || []).filter(Boolean);
    if (providers.length === 0) {
      return {
        provider: requestedProvider || defaultProvider || CONFIG.DEFAULT_PROVIDER,
        health: { score: 50 },
        reason: 'no_available_provider',
        candidates: []
      };
    }

    if (requestedProvider && providers.includes(requestedProvider)) {
      const health = await this.getProviderHealth(requestedProvider, queueStatusMap[requestedProvider]);
      return {
        provider: requestedProvider,
        health,
        reason: 'user_requested_provider',
        candidates: [{ provider: requestedProvider, score: health.score }]
      };
    }

    const candidates = [];
    for (const provider of providers) {
      const health = await this.getProviderHealth(provider, queueStatusMap[provider]);
      candidates.push({ provider, score: health.score, health });
    }
    candidates.sort((a, b) => b.score - a.score);

    const best = candidates[0];
    const defaultCandidate = candidates.find(c => c.provider === defaultProvider);

    let selected = best;
    let reason = 'best_score';

    if (defaultCandidate) {
      const diff = best.score - defaultCandidate.score;
      if (diff < 8) {
        selected = defaultCandidate;
        reason = 'keep_default_small_gap';
      }
    }

    return {
      provider: selected.provider,
      health: selected.health,
      reason,
      candidates: candidates.slice(0, 3).map(c => ({ provider: c.provider, score: c.score }))
    };
  }

  adjustQualityMode(baseMode = 'standard', health = null, queueStatus = null) {
    const modes = ['economy', 'standard', 'ultra'];
    const mode = modes.includes(baseMode) ? baseMode : 'standard';
    const startIndex = modes.indexOf(mode);

    const score = health?.score ?? 72;
    const waiting = Number(queueStatus?.waiting || 0);
    const processing = Number(queueStatus?.processing || 0);

    let delta = 0;
    if (score < 45) delta -= 1;
    if (waiting >= 3 || processing >= 2) delta -= 1;
    if (score > 88 && waiting === 0 && processing <= 1) delta += 1;

    const finalIndex = Math.max(0, Math.min(modes.length - 1, startIndex + delta));
    const finalMode = modes[finalIndex];

    return {
      mode: finalMode,
      delta: finalIndex - startIndex,
      reason: `score=${score.toFixed(1)}, waiting=${waiting}, processing=${processing}`
    };
  }

  classifyError(errorMessage = '') {
    const message = String(errorMessage || '').toLowerCase();
    if (/429|rate limit|too many requests/.test(message)) return 'rate_limit';
    if (/503|service is temporarily unavailable|temporarily unavailable|cooldown|all tokens are on cooldown/.test(message)) return 'service_unavailable';
    if (/timeout|timed out|abort/.test(message)) return 'timeout';
    if (/401|403|unauthorized|forbidden|invalid api key/.test(message)) return 'auth';
    return 'other';
  }

  async recordProviderResult(provider, { success, duration = 0, errorMessage = '' }) {
    if (!provider) return;

    const stats = await this.readProviderStats(provider);

    if (stats.count > 500) {
      stats.success = Math.round(stats.success * 0.5);
      stats.failure = Math.round(stats.failure * 0.5);
      stats.timeout = Math.round(stats.timeout * 0.5);
      stats.rate_limit = Math.round(stats.rate_limit * 0.5);
      stats.auth = Math.round(stats.auth * 0.5);
      stats.service_unavailable = Math.round(stats.service_unavailable * 0.5);
      stats.other = Math.round(stats.other * 0.5);
      stats.total_duration = Math.round(stats.total_duration * 0.5);
      stats.count = Math.round(stats.count * 0.5);
    }

    stats.count += 1;
    stats.total_duration += Math.max(0, Number(duration || 0));

    if (success) {
      stats.success += 1;
    } else {
      stats.failure += 1;
      const type = this.classifyError(errorMessage);
      if (type === 'timeout') stats.timeout += 1;
      else if (type === 'rate_limit') stats.rate_limit += 1;
      else if (type === 'auth') stats.auth += 1;
      else if (type === 'service_unavailable') stats.service_unavailable += 1;
      else stats.other += 1;
    }

    stats.updated_at = Date.now();
    await this.writeProviderStats(provider, stats);
  }
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
        logger.add("⚠️ Reference Images", { warning: model + " 不支持參考圖像，已忽略", supported_models: ["imagen-4"] });
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

 // 異步模型列表（需要輪詢）
 static ASYNC_MODELS = ['qwen', 'nano-banana', 'nbpro', 'z-image-turbo'];

 // 支援 Img2Img 的模型
 static IMG2IMG_MODELS = ['nano-banana', 'nbpro'];

 // 檢查是否為異步模型
 isAsyncModel(model) {
 return InfipProvider.ASYNC_MODELS.includes(model.toLowerCase());
 }

 // 檢查是否支援 Img2Img
 supportsImg2Img(model) {
 return InfipProvider.IMG2IMG_MODELS.includes(model.toLowerCase());
 }

 isCooldownOrUnavailable(status, errText = '') {
 const text = String(errText || '').toLowerCase();
 if (status !== 503) return false;
 return /temporarily unavailable|cooldown|all tokens are on cooldown|tokens are on cooldown|disabled/.test(text);
 }

 createTransientError(prefix, status, errText = '') {
 const error = new Error(`${prefix} (${status}): ${errText}`);
 error._status = Number(status || 0);
 error._providerName = 'infip';
 error._isTransient = true;
 error._retryable = true;
 error._isCooldown = this.isCooldownOrUnavailable(status, errText);
 return error;
 }

 extractTaskInfo(data = {}) {
 const taskId = data.task_id || data.taskId || data.id || data.result?.task_id || data.result?.taskId || data.result?.id || null;
 const pollUrl = data.poll_url || data.pollUrl || data.status_url || data.statusUrl || null;
 return { taskId, pollUrl };
 }

 extractImageUrls(data = {}) {
 const urls = [];
 const pushUrl = (value) => {
 if (typeof value === 'string' && /^https?:\/\//i.test(value)) urls.push(value);
 };

 pushUrl(data.url);
 pushUrl(data.result?.url);

 if (Array.isArray(data.data)) {
 for (const item of data.data) {
 pushUrl(item?.url);
 pushUrl(item?.image_url);
 pushUrl(item?.imageUrl);
 }
 }

 if (Array.isArray(data.output)) {
 for (const item of data.output) {
 if (typeof item === 'string') pushUrl(item);
 else {
 pushUrl(item?.url);
 pushUrl(item?.image_url);
 pushUrl(item?.imageUrl);
 }
 }
 }

 if (Array.isArray(data.result?.images)) {
 for (const item of data.result.images) {
 if (typeof item === 'string') pushUrl(item);
 else {
 pushUrl(item?.url);
 pushUrl(item?.image_url);
 pushUrl(item?.imageUrl);
 }
 }
 }

 return [...new Set(urls)];
 }

 parseInfipResponse(data = {}) {
 const task = this.extractTaskInfo(data);
 const imageUrls = this.extractImageUrls(data);
 return {
 taskId: task.taskId,
 pollUrl: task.pollUrl,
 imageUrls,
 primaryImageUrl: imageUrls[0] || null
 };
 }

 async generate(prompt, options, logger) {
 const { model = "img4", width = 1024, height = 1024, apiKey = "", nsfw = false, style = "none", negativePrompt = "", referenceImages = [] } = options;

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

 const headers = {
 'Content-Type': 'application/json',
 'Authorization': `Bearer ${finalApiKey}`,
 'User-Agent': 'Flux-AI-Pro-Worker'
 };

 // Infip supports 1024x1024, 1792x1024, 1024x1792
 let sizeStr = "1024x1024";
 if (width > height && width >= 1500) sizeStr = "1792x1024";
 else if (height > width && height >= 1500) sizeStr = "1024x1792";

 // 檢查是否為 Img2Img 模式
 const isImg2Img = this.supportsImg2Img(model) && referenceImages && referenceImages.length > 0;

 // 檢查是否為異步模型
 const isAsync = this.isAsyncModel(model);

 let imgUrl = null;

 if (isImg2Img) {
 // ========== Img2Img 模式 ==========
 logger.add("🖼️ Img2Img Mode", { model, referenceImageCount: referenceImages.length });

 const url = `${this.config.endpoint}/v1/images/edits`;
 const body = {
 model: model,
 prompt: enhancedPrompt,
 image: referenceImages[0].trim(),
 size: sizeStr,
 response_format: "url"
 };

 if (nsfw) {
 body.safety_check = false;
 body.censor_nsfw = false;
 logger.add("🔞 NSFW Mode", { enabled: true });
 }

 logger.add("📡 Infip Img2Img Request", { endpoint: url, model, size: sizeStr });

 const response = await fetchWithTimeout(url, { method: 'POST', headers: headers, body: JSON.stringify(body) }, 60000);

 if (!response.ok) {
 const errText = await response.text();
 if (this.isCooldownOrUnavailable(response.status, errText)) {
 throw this.createTransientError('Infip Img2Img API Error', response.status, errText);
 }
 throw new Error(`Infip Img2Img API Error (${response.status}): ${errText}`);
 }

 const data = await response.json();

 // Img2Img 可能返回 task_id / poll_url（異步）或直接返回圖片
 const parsedImg2Img = this.parseInfipResponse(data);
 if (parsedImg2Img.taskId || parsedImg2Img.pollUrl) {
 logger.add("🔄 Img2Img Task Created", {
 taskId: parsedImg2Img.taskId,
 pollUrl: parsedImg2Img.pollUrl || 'derived_from_task_id'
 });
 imgUrl = await this.pollTask({ taskId: parsedImg2Img.taskId, pollUrl: parsedImg2Img.pollUrl }, headers, logger);
 } else if (parsedImg2Img.primaryImageUrl) {
 imgUrl = parsedImg2Img.primaryImageUrl;
 } else {
 throw new Error("Invalid Img2Img response: " + JSON.stringify(data));
 }

 } else if (isAsync) {
 // ========== 異步模型模式 ==========
 logger.add("🔄 Async Model Detected", { model, note: "Will use polling" });

 const url = `${this.config.endpoint}/v1/images/generations`;
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
 logger.add("🔞 NSFW Mode", { enabled: true });
 }

 logger.add("📡 Infip Async Request", { endpoint: url, model, size: sizeStr });

 const response = await fetchWithTimeout(url, { method: 'POST', headers: headers, body: JSON.stringify(body) }, 60000);

 if (!response.ok) {
 const errText = await response.text();
 if (this.isCooldownOrUnavailable(response.status, errText)) {
 throw this.createTransientError('Infip API Error', response.status, errText);
 }
 throw new Error(`Infip API Error (${response.status}): ${errText}`);
 }

 const data = await response.json();

 const parsedAsync = this.parseInfipResponse(data);
 if (parsedAsync.taskId || parsedAsync.pollUrl) {
 logger.add("🔄 Task Created", {
 taskId: parsedAsync.taskId,
 pollUrl: parsedAsync.pollUrl || 'derived_from_task_id'
 });
 imgUrl = await this.pollTask({ taskId: parsedAsync.taskId, pollUrl: parsedAsync.pollUrl }, headers, logger);
 } else if (parsedAsync.primaryImageUrl) {
 // 某些異步模型可能直接返回結果
 imgUrl = parsedAsync.primaryImageUrl;
 logger.add("✅ Direct Response", { url: imgUrl });
 } else {
 throw new Error("Invalid async response: " + JSON.stringify(data));
 }

 } else {
 // ========== 同步模型模式 ==========
 const url = `${this.config.endpoint}/v1/images/generations`;
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

 const response = await fetchWithTimeout(url, { method: 'POST', headers: headers, body: JSON.stringify(body) }, 60000);

 if (!response.ok) {
 const errText = await response.text();
 if (this.isCooldownOrUnavailable(response.status, errText)) {
 throw this.createTransientError('Infip API Error', response.status, errText);
 }
 throw new Error(`Infip API Error (${response.status}): ${errText}`);
 }

 const data = await response.json();

 const parsedSync = this.parseInfipResponse(data);
 if (parsedSync.taskId || parsedSync.pollUrl) {
 // 同步模型理論上不應返回 task，若返回則兼容處理
 logger.add("⚠️ Unexpected Async Task On Sync Path", {
 taskId: parsedSync.taskId,
 pollUrl: parsedSync.pollUrl || 'derived_from_task_id',
 note: "Sync path returned task metadata, polling anyway"
 });
 imgUrl = await this.pollTask({ taskId: parsedSync.taskId, pollUrl: parsedSync.pollUrl }, headers, logger);
 } else if (parsedSync.imageUrls.length > 0) {
 // 處理多圖片響應
 if (parsedSync.imageUrls.length > 1) {
 const results = [];
 for (const itemUrl of parsedSync.imageUrls) {
 const imgResp = await fetch(itemUrl);
 const imageBuffer = await imgResp.arrayBuffer();
 results.push({
 imageData: imageBuffer,
 contentType: imgResp.headers.get('content-type') || 'image/png',
 url: itemUrl,
 provider: this.name,
 model: model,
 seed: -1,
 width: width,
 height: height,
 authenticated: true
 });
 }
 return {
 batch_results: results,
 provider: this.name,
 cost: "QUOTA"
 };
 }
 imgUrl = parsedSync.primaryImageUrl;
 } else {
 throw new Error("Invalid response format from Infip API");
 }
 }

 // 下載圖片
 if (!imgUrl) {
 throw new Error("No image URL obtained from Infip API");
 }

 logger.add("⬇️ Downloading Image", { url: imgUrl });
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
 cost: "QUOTA",
 generation_mode: isImg2Img ? "img2img" : "text2img",
 is_async: isAsync
 };
 }

 /**
 * 輪詢異步任務狀態
 * @param {string|object} taskRef - 任務 ID 或 { taskId, pollUrl }
 * @param {object} headers - 請求標頭
 * @param {object} logger - 日誌實例
 * @param {number} maxAttempts - 最大輪詢次數（默認 60 次，約 2 分鐘）
 * @param {number} interval - 輪詢間隔（默認 2000ms）
 * @returns {Promise<string>} 圖片 URL
 */
 async pollTask(taskRef, headers, logger, maxAttempts = 60, interval = 2000) {
 const taskId = typeof taskRef === 'string' ? taskRef : (taskRef?.taskId || null);
 const pollUrl = typeof taskRef === 'object' ? (taskRef?.pollUrl || null) : null;
 const statusUrl = pollUrl || (taskId ? `${this.config.endpoint}/v1/tasks/${taskId}` : null);

 if (!statusUrl) {
 throw new Error('Infip polling requires task_id or poll_url');
 }

 const totalTimeout = Math.round(maxAttempts * interval / 1000);
 logger.add("🔄 Starting Poll", { taskId, pollUrl, statusUrl, maxAttempts, interval, totalTimeout: `${totalTimeout}s` });

 let currentInterval = interval;
 let consecutiveErrors = 0;
 const maxConsecutiveErrors = 5;

 for (let attempt = 1; attempt <= maxAttempts; attempt++) {
 try {
 const response = await fetchWithTimeout(statusUrl, { method: 'GET', headers }, 15000);

 if (!response.ok) {
 const errText = await response.text();

 logger.add(`⚠️ Poll Attempt ${attempt} Failed`, {
 status: response.status,
 error: errText.substring(0, 200)
 });

 // 處理速率限制 (429)
 if (response.status === 429) {
 const retryAfter = parseInt(response.headers.get('Retry-After') || '5');
 const waitTime = Math.max(retryAfter * 1000, currentInterval);
 logger.add(`⏳ Rate Limited`, { retryAfter: `${retryAfter}s`, waitTime: `${Math.round(waitTime/1000)}s` });
 await new Promise(r => setTimeout(r, waitTime));
 continue;
 }

 // 優先處理 503，支援 Retry-After
 if (response.status === 503) {
 consecutiveErrors++;
 if (consecutiveErrors >= maxConsecutiveErrors) {
 throw new Error(`Too many consecutive service unavailable errors (${maxConsecutiveErrors}): ${errText}`);
 }

 const retryAfterHeader = parseInt(response.headers.get('Retry-After') || '0');
 const retryAfterMs = Number.isFinite(retryAfterHeader) && retryAfterHeader > 0 ? retryAfterHeader * 1000 : 0;
 const backoffTime = retryAfterMs > 0
 ? Math.max(retryAfterMs, currentInterval)
 : Math.min(currentInterval * Math.pow(2, consecutiveErrors), 30000);

 logger.add(`⏳ Service Unavailable - Backoff`, {
 consecutiveErrors,
 retryAfter: retryAfterMs > 0 ? `${Math.round(retryAfterMs / 1000)}s` : 'n/a',
 backoffTime: `${Math.round(backoffTime/1000)}s`
 });
 await new Promise(r => setTimeout(r, backoffTime));
 continue;
 }

 // 處理其餘伺服器錯誤 (5xx)
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

 throw new Error(`Poll failed: Status ${response.status} - ${errText}`);
 }

 // 重置連續錯誤計數
 consecutiveErrors = 0;

 const data = await response.json();
 const status = String(data?.status || '').toLowerCase();

 // 每 10 次或狀態變化時報告進度
 if (attempt % 10 === 0 || ['completed', 'failed', 'processing', 'pending', 'queued', 'succeeded', 'success', 'done'].includes(status)) {
 const progress = Math.round((attempt / maxAttempts) * 100);
 const elapsed = Math.round(attempt * currentInterval / 1000);
 logger.add(`📊 進度: ${progress}%`, {
 attempt: `${attempt}/${maxAttempts}`,
 status: status || 'unknown',
 elapsed: `${elapsed}s`
 });
 }

 if (['completed', 'succeeded', 'success', 'done'].includes(status)) {
 const parsed = this.parseInfipResponse(data);
 if (parsed.primaryImageUrl) {
 logger.add("✅ Task Completed", {
 imageUrl: parsed.primaryImageUrl,
 totalAttempts: attempt,
 totalTime: `${Math.round(attempt * currentInterval / 1000)}s`
 });
 return parsed.primaryImageUrl;
 }
 throw new Error("Task completed but no image URL in result: " + JSON.stringify(data));
 }

 if (['failed', 'error', 'cancelled', 'canceled'].includes(status)) {
 const errorMsg = data.result?.error || data.result?.message || data.error || data.message || 'Unknown error';
 throw new Error(`Task failed: ${errorMsg}`);
 }

 // 仍在處理中，等待後繼續（pending/queued/processing/unknown）
 if (attempt < maxAttempts) {
 // 指數退避：每次增加 10%，最大 10 秒
 currentInterval = Math.min(interval * Math.pow(1.1, attempt), 10000);
 await new Promise(r => setTimeout(r, currentInterval));
 }

 } catch (e) {
 if (attempt === maxAttempts) {
 throw e;
 }

 // 檢查是否為網絡錯誤
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

 logger.add(`⚠️ Poll Error (Attempt ${attempt})`, { error: e.message });
 await new Promise(r => setTimeout(r, currentInterval));
 }
 }

 throw new Error(`Task timeout after ${maxAttempts} attempts (${totalTimeout}s). The task may still be processing on the server.`);
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

  // =================================================================================
  // SupabaseProvider - Supabase OpenAI Compatible API Provider
  // =================================================================================
  // SupabaseProvider - Supabase OpenAI Compatible API Provider with Polling
  // =================================================================================
  class SupabaseProvider {
    constructor(config, env) {
      this.config = config;
      this.name = config.name;
      this.env = env;
    }
  
    async generate(prompt, options, logger) {
      const {
        model = "gemini-3.1-flash-image-preview",
        width = 1024,
        height = 1024,
        apiKey = "",
        style = "none",
        negativePrompt = "",
        quality = "standard"
      } = options;
  
      // Prefer environment variable if available
      const finalApiKey = this.env.SUPABASE_API_KEY || apiKey;
  
      if (!finalApiKey) throw new Error("Supabase API Key is required (Set SUPABASE_API_KEY env var or provide via UI)");
  
      // 中文自動翻譯
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
      logger.add("🎨 Style Processing", {
        selected_style: style,
        style_applied: style !== 'none',
        original: basePrompt,
        enhanced: enhancedPrompt
      });
  
      const url = `${this.config.endpoint}/images/generations`;
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${finalApiKey}`,
        'User-Agent': 'Flux-AI-Pro-Worker'
      };
  
      // Map size to supported formats
      let sizeStr = "1024x1024";
      if (width > height && width >= 1500) sizeStr = "1792x1024";
      else if (height > width && height >= 1500) sizeStr = "1024x1792";
  
      const body = {
        model: model,
        prompt: enhancedPrompt,
        n: 1,
        size: sizeStr,
        quality: quality,
        response_format: "url"
      };
  
      logger.add("📡 Supabase Request", { endpoint: url, model: model, size: sizeStr, quality: quality });
  
      try {
        const response = await fetchWithTimeout(url, { method: 'POST', headers: headers, body: JSON.stringify(body) }, 60000);
  
        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Supabase API Error (${response.status}): ${errText}`);
        }
  
        const data = await response.json();
        logger.add("📥 Supabase Response", { data: JSON.stringify(data).substring(0, 500) });
  
        // ===== 檢查是否為非同步任務 =====
        if (data.data && data.data[0] && data.data[0].task_id) {
          const taskId = data.data[0].task_id;
          const status = data.data[0].status;
          logger.add("🔄 Async Task Created", { taskId, status });
  
          // 啟動輪詢
          const imageUrl = await this.pollTask(taskId, headers, logger);
  
          // 下載圖片
          logger.add("⬇️ Downloading Image", { url: imageUrl });
          const imgResp = await fetch(imageUrl);
          const imageBuffer = await imgResp.arrayBuffer();
          const contentType = imgResp.headers.get('content-type') || 'image/png';
  
          return {
            imageData: imageBuffer,
            contentType: contentType,
            url: imageUrl,
            provider: this.name,
            model: model,
            seed: -1,
            width: width,
            height: height,
            auto_translated: translationLog.translated,
            authenticated: true,
            cost: "QUOTA"
          };
        }
  
        // ===== 同步回應處理 =====
        if (data.data && data.data.length > 0 && data.data[0].url) {
          const imgUrl = data.data[0].url;
          logger.add("⬇️ Downloading Image (Sync)", { url: imgUrl });
  
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
        }
  
        throw new Error("Invalid response format from Supabase API: " + JSON.stringify(data).substring(0, 200));
  
      } catch (e) {
        logger.add("❌ Supabase Failed", { error: e.message });
        throw e;
      }
    }
  
    // ===== 輪詢任務狀態 =====
    async pollTask(taskId, headers, logger, maxAttempts = 60, interval = 3000) {
      // 嘗試多種可能的狀態查詢端點
      const statusUrls = [
        `${this.config.endpoint}/images/generations/${taskId}`,
        `${this.config.endpoint}/tasks/${taskId}`,
        `${this.config.endpoint}/v1/tasks/${taskId}`,
        `${this.config.endpoint}/v1/images/generations/${taskId}`
      ];
  
      const totalTimeout = Math.round(maxAttempts * interval / 1000);
      logger.add("🔄 Starting Poll", {
        taskId,
        maxAttempts,
        interval: `${interval}ms`,
        totalTimeout: `${totalTimeout}s`,
        endpoints: statusUrls.length
      });
  
      let currentInterval = interval;
      let consecutiveErrors = 0;
      const maxConsecutiveErrors = 5;
  
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        // 嘗試所有可能的端點
        let lastError = null;
        let data = null;
        let successUrl = null;
  
        for (const statusUrl of statusUrls) {
          try {
            const response = await fetchWithTimeout(statusUrl, { method: 'GET', headers }, 15000);
            
            if (response.ok) {
              data = await response.json();
              successUrl = statusUrl;
              lastError = null;
              break; // 成功獲取數據，跳出端點嘗試循環
            } else if (response.status === 404) {
              // 404 表示此端點不存在，繼續嘗試下一個
              continue;
            } else {
              const errText = await response.text();
              lastError = new Error(`Status ${response.status}: ${errText.substring(0, 100)}`);
            }
          } catch (e) {
            lastError = e;
          }
        }
  
        // 如果所有端點都失敗
        if (lastError && !data) {
          consecutiveErrors++;
          if (consecutiveErrors >= maxConsecutiveErrors) {
            throw new Error(`All status endpoints failed after ${maxConsecutiveErrors} consecutive errors: ${lastError.message}`);
          }
          
          const backoffTime = Math.min(currentInterval * Math.pow(2, consecutiveErrors), 30000);
          logger.add(`⚠️ All Endpoints Failed`, {
            attempt,
            consecutiveErrors,
            backoffTime: `${Math.round(backoffTime/1000)}s`,
            lastError: lastError.message.substring(0, 100)
          });
          await new Promise(r => setTimeout(r, backoffTime));
          continue;
        }
  
        consecutiveErrors = 0;
  
        // 進度報告 - 每 5 次或狀態變化時
        const statusValue = data?.status || data?.data?.[0]?.status || 'unknown';
        if (attempt % 5 === 0 || ['completed', 'failed', 'processing'].includes(statusValue)) {
          const progress = Math.round((attempt / maxAttempts) * 100);
          const elapsed = Math.round(attempt * currentInterval / 1000);
          logger.add(`📊 Poll Progress: ${progress}%`, {
            attempt: `${attempt}/${maxAttempts}`,
            status: statusValue,
            elapsed: `${elapsed}s`,
            endpoint: successUrl ? successUrl.replace(this.config.endpoint, '') : 'N/A'
          });
        }
  
        // 檢查任務狀態 - 多種格式支援
        const taskStatus = data?.status || data?.data?.[0]?.status || data?.task?.status;
        
        if (taskStatus === 'completed' || taskStatus === 'succeeded') {
          // 嘗試多種可能的圖片 URL 路徑
          const imageUrl =
            data?.result?.url ||
            data?.url ||
            data?.data?.[0]?.url ||
            data?.data?.[0]?.result?.url ||
            data?.output?.url ||
            data?.image_url;
  
          if (imageUrl) {
            const totalTime = Math.round(attempt * currentInterval / 1000);
            logger.add("✅ Task Completed", {
              imageUrl,
              totalAttempts: attempt,
              totalTime: `${totalTime}s`,
              endpoint: successUrl ? successUrl.replace(this.config.endpoint, '') : 'N/A'
            });
            return imageUrl;
          }
          throw new Error("Task completed but no image URL found: " + JSON.stringify(data).substring(0, 300));
        }
  
        if (taskStatus === 'failed' || taskStatus === 'error') {
          const errorMsg =
            data?.error ||
            data?.message ||
            data?.data?.[0]?.error ||
            data?.data?.[0]?.message ||
            data?.result?.error ||
            'Unknown error';
          throw new Error(`Task failed: ${errorMsg}`);
        }
  
        // 仍在處理中
        if (attempt < maxAttempts) {
          // 指數退避：每次增加 10%，最大 10 秒
          currentInterval = Math.min(interval * Math.pow(1.1, attempt), 10000);
          await new Promise(r => setTimeout(r, currentInterval));
        }
      }
  
      throw new Error(`Task timeout after ${maxAttempts} attempts (${totalTimeout}s). Task ID: ${taskId}`);
    }
  }
// =================================================================================
// RatioResolver - Shared Gemini ratio/size resolver
// =================================================================================
class RatioResolver {
	static GEMINI_SUPPORTED_RATIOS = [
		{ ratio: '1:1', w: 1, h: 1 },
		{ ratio: '16:9', w: 16, h: 9 },
		{ ratio: '9:16', w: 9, h: 16 },
		{ ratio: '4:3', w: 4, h: 3 },
		{ ratio: '3:4', w: 3, h: 4 },
		{ ratio: '3:2', w: 3, h: 2 },
		{ ratio: '2:3', w: 2, h: 3 },
		{ ratio: '21:9', w: 21, h: 9 },
		{ ratio: '9:21', w: 9, h: 21 }
	];

	static toSafeInt(value, fallback = 1) {
		const n = Number.parseInt(value, 10);
		return Number.isFinite(n) && n > 0 ? n : fallback;
	}

	static gcd(a, b) {
		let x = Math.abs(a);
		let y = Math.abs(b);
		while (y !== 0) {
			const t = y;
			y = x % y;
			x = t;
		}
		return x || 1;
	}

	static findExactRatio(width, height) {
		const w = this.toSafeInt(width);
		const h = this.toSafeInt(height);
		const d = this.gcd(w, h);
		const ratioStr = `${Math.round(w / d)}:${Math.round(h / d)}`;
		const found = this.GEMINI_SUPPORTED_RATIOS.find(item => item.ratio === ratioStr);
		return found ? found.ratio : null;
	}

	static findClosestRatio(width, height) {
		const w = this.toSafeInt(width);
		const h = this.toSafeInt(height);
		const inputLogRatio = Math.log(w / h);
		let closest = this.GEMINI_SUPPORTED_RATIOS[0];
		let minDiff = Number.POSITIVE_INFINITY;

		for (const ratioInfo of this.GEMINI_SUPPORTED_RATIOS) {
			const supportedLogRatio = Math.log(ratioInfo.w / ratioInfo.h);
			const diff = Math.abs(inputLogRatio - supportedLogRatio);
			if (diff < minDiff) {
				minDiff = diff;
				closest = ratioInfo;
			}
		}

		return closest.ratio;
	}

	static convertToGeminiAspectRatio(width, height) {
		const exact = this.findExactRatio(width, height);
		if (exact) return exact;
		return this.findClosestRatio(width, height);
	}

	static convertToGeminiImageSize(width, height) {
		const w = this.toSafeInt(width);
		const h = this.toSafeInt(height);
		const totalPixels = w * h;

		if (totalPixels >= 3840 * 2160) {
			return "4K";
		}
		if (totalPixels >= 1920 * 1080) {
			return "2K";
		}
		return "1K";
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

	/**
	 * 將 width/height 轉換為 Gemini 支援的 aspectRatio
	 * @param {number} width - 圖片寬度
	 * @param {number} height - 圖片高度
	 * @returns {string} - Gemini 支援的 aspectRatio 字串
	 */
	convertToGeminiAspectRatio(width, height) {
		return RatioResolver.convertToGeminiAspectRatio(width, height);
	}

	/**
	 * 將像素尺寸轉換為 Gemini 的 imageSize
	 * @param {number} width - 圖片寬度
	 * @param {number} height - 圖片高度
	 * @returns {string} - "1K", "2K", 或 "4K"
	 */
	convertToGeminiImageSize(width, height) {
		return RatioResolver.convertToGeminiImageSize(width, height);
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
 
  		// 判斷是否為 Gemini 模型，使用原生 API 格式
  		const isGeminiModel = model.includes('gemini');
  		const aspectRatio = this.convertToGeminiAspectRatio(width, height);
  		const imageSize = this.convertToGeminiImageSize(width, height);
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
  		// Gemini 模型使用原生格式 (aspectRatio + imageSize)，其他模型維持 OpenAI 格式 (size)
  		const body = {
  			model: model,
  			prompt: finalPrompt,
  			...(isGeminiModel ? {
  				aspectRatio: aspectRatio,
  				imageSize: imageSize
  			} : {
  				size: size
  			}),
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
  			...(isGeminiModel ? {
  				aspectRatio: body.aspectRatio,
  				imageSize: body.imageSize
  			} : {
  				size: body.size
  			}),
  			quality: body.quality,
  			style: body.style,
  			response_format: body.response_format,
  			extra_body: body.extra_body,
  			promptLength: finalPrompt.length,
  			apiKeyPrefix: finalApiKey ? finalApiKey.substring(0, 8) + '...' : 'none',
  			isGeminiModel: isGeminiModel
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
    this.queues = {      aqua: { queue: [], maxConcurrent: 2, processing: 0 }
    };
    
    // 不使用隊列的供應商列表
    this.noQueueProviders = ['pollinations', 'infip', 'nonpon'];
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
  constructor(apiKeys = {}, env = null, strategyManager = null) {
    this.providers = {};
    this.apiKeys = apiKeys;
    this.env = env;
    this.queueManager = new ProviderQueueManager();
    this.strategyManager = strategyManager || new AdaptiveStrategyManager(env);
    for (const [key, config] of Object.entries(CONFIG.PROVIDERS)) {
    if (config.enabled) {
    if (key === 'pollinations') this.providers[key] = new PollinationsProvider(config, env);
    else if (key === 'infip') this.providers[key] = new InfipProvider(config, env);
    else if (key === 'aqua') this.providers[key] = new AquaProvider(config, env);
    else if (key === 'nonpon') this.providers[key] = new NonponProvider(config, env);
    else if (key === 'supabase') this.providers[key] = new SupabaseProvider(config, env);
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
    let effectiveOptions = { ...options };

    logger.add("🔍 MultiProviderRouter: Generating", {
      requestedProvider,
      availableProviders: Object.keys(this.providers),
      options: { ...options, apiKey: options.apiKey ? '***' : '' }
    });

    const queueStatusMap = this.getAllQueueStatus();
    let selectedProviderName = null;
    let provider = null;
    let providerHealth = null;
    let routingReason = 'legacy_fallback';

    const applyRoutingContext = (providerName, health, reason) => {
      selectedProviderName = providerName;
      providerHealth = health || null;
      routingReason = reason || routingReason;
    };

    if (this.strategyManager) {
      const selection = await this.strategyManager.selectProvider({
        requestedProvider,
        defaultProvider: CONFIG.DEFAULT_PROVIDER,
        availableProviders: Object.keys(this.providers),
        queueStatusMap
      });

      selectedProviderName = selection.provider;
      providerHealth = selection.health || null;
      routingReason = selection.reason || 'strategy_selected';
      provider = this.providers[selectedProviderName] || null;

      if (!provider) {
        const fallback = this.getProvider(requestedProvider);
        selectedProviderName = fallback.name;
        provider = fallback.instance;
        routingReason = 'strategy_missing_provider_fallback';
      }

      const queueStatus = this.queueManager.getQueueStatus(selectedProviderName);
      const adjusted = this.strategyManager.adjustQualityMode(effectiveOptions.qualityMode || 'standard', providerHealth, queueStatus);
      effectiveOptions.qualityMode = adjusted.mode;
      effectiveOptions._qualityModeInput = options.qualityMode || 'standard';
      effectiveOptions._qualityModeAdjust = adjusted;
      effectiveOptions._strategyVersion = AdaptiveStrategyManager.VERSION;

      logger.add("🧠 Strategy Selected", {
        provider: selectedProviderName,
        score: providerHealth ? Number(providerHealth.score.toFixed(2)) : null,
        routing_reason: routingReason,
        quality_input: effectiveOptions._qualityModeInput,
        quality_output: effectiveOptions.qualityMode,
        quality_adjust_reason: adjusted.reason,
        candidates: selection.candidates || []
      });
    } else {
      const fallback = this.getProvider(requestedProvider);
      selectedProviderName = fallback.name;
      provider = fallback.instance;
      effectiveOptions._qualityModeInput = options.qualityMode || 'standard';
      effectiveOptions._qualityModeAdjust = { mode: effectiveOptions.qualityMode || 'standard', delta: 0, reason: 'strategy_disabled' };
      effectiveOptions._strategyVersion = 'disabled';
    }

    logger.add("✅ MultiProviderRouter: Provider selected", {
      providerName: selectedProviderName,
      providerInstance: provider ? provider.name : 'null',
      providerScore: providerHealth ? Number(providerHealth.score.toFixed(2)) : null,
      routingReason,
      qualityModeInput: effectiveOptions._qualityModeInput,
      qualityModeOutput: effectiveOptions.qualityMode
    });

    const enrichResult = (raw) => ({
      ...raw,
      selected_provider: selectedProviderName,
      requested_provider: requestedProvider,
      provider_score: providerHealth ? Number(providerHealth.score.toFixed(2)) : null,
      strategy_version: effectiveOptions._strategyVersion,
      quality_mode_input: effectiveOptions._qualityModeInput,
      quality_mode_output: raw.quality_mode || effectiveOptions.qualityMode,
      routing_reason: routingReason
    });

    const executeProvider = async (activeProviderName, activeProvider) => {
      return await this.queueManager.addToQueue(activeProviderName, async () => {
        const results = [];

        // Optimization for Infip: Use native batching if available
        if (activeProviderName === 'infip' && numOutputs > 1) {
          const batchOptions = { ...effectiveOptions, numOutputs: numOutputs, seed: effectiveOptions.seed };
          try {
            const result = await activeProvider.generate(prompt, batchOptions, logger);
            if (result.batch_results) {
              results.push(...result.batch_results.map(item => enrichResult(item)));
              return results;
            } else {
              results.push(enrichResult(result));
            }
          } catch (e) {
            logger.add("❌ Batch Generation Failed", { error: e.message, provider: activeProviderName });
            e._providerName = activeProviderName;
            e._providerScore = providerHealth ? Number(providerHealth.score.toFixed(2)) : null;
            throw e;
          }
          return results;
        }

        for (let i = 0; i < numOutputs; i++) {
          const currentOptions = { ...effectiveOptions, seed: effectiveOptions.seed === -1 ? -1 : effectiveOptions.seed + i };
          const result = await activeProvider.generate(prompt, currentOptions, logger);
          results.push(enrichResult(result));
        }
        return results;
      });
    };

    const isInfipCooldownError = (error) => {
      const message = String(error?.message || '').toLowerCase();
      if (error?._isCooldown === true) return true;
      if (error?._status === 503 && /temporarily unavailable|cooldown|all tokens are on cooldown/.test(message)) return true;
      return /infip api error \(503\)|service is temporarily unavailable|all tokens are on cooldown|cooldown/.test(message);
    };

    try {
      return await executeProvider(selectedProviderName, provider);
    } catch (firstError) {
      const shouldRetryAndFallback = selectedProviderName === 'infip' && isInfipCooldownError(firstError);

      if (!shouldRetryAndFallback) {
        firstError._providerName = firstError._providerName || selectedProviderName;
        firstError._providerScore = firstError._providerScore ?? (providerHealth ? Number(providerHealth.score.toFixed(2)) : null);
        throw firstError;
      }

      logger.add("♻️ Infip Cooldown Detected", {
        provider: selectedProviderName,
        action: 'retry_once_then_fallback',
        error: firstError.message
      });

      if (this.strategyManager?.recordProviderResult) {
        await this.strategyManager.recordProviderResult(selectedProviderName, { success: false, duration: 0, errorMessage: firstError.message });
      }

      await new Promise(resolve => setTimeout(resolve, 1200));

      try {
        logger.add("🔁 Retrying Infip Once", { provider: selectedProviderName, wait_ms: 1200 });
        return await executeProvider(selectedProviderName, provider);
      } catch (retryError) {
        logger.add("⚠️ Infip Retry Failed", { provider: selectedProviderName, error: retryError.message });

        if (this.strategyManager?.recordProviderResult) {
          await this.strategyManager.recordProviderResult(selectedProviderName, { success: false, duration: 0, errorMessage: retryError.message });
        }

        const fallbackProviders = Object.keys(this.providers).filter(name => name !== selectedProviderName);
        if (fallbackProviders.length === 0) {
          retryError._providerName = retryError._providerName || selectedProviderName;
          retryError._providerScore = retryError._providerScore ?? (providerHealth ? Number(providerHealth.score.toFixed(2)) : null);
          throw retryError;
        }

        const fallbackSelection = this.strategyManager
          ? await this.strategyManager.selectProvider({
              requestedProvider: null,
              defaultProvider: CONFIG.DEFAULT_PROVIDER,
              availableProviders: fallbackProviders,
              queueStatusMap: this.getAllQueueStatus()
            })
          : { provider: fallbackProviders[0], health: null, reason: 'legacy_first_available' };

        const fallbackProviderName = fallbackSelection?.provider;
        const fallbackProvider = fallbackProviderName ? this.providers[fallbackProviderName] : null;

        if (!fallbackProvider) {
          retryError._providerName = retryError._providerName || selectedProviderName;
          retryError._providerScore = retryError._providerScore ?? (providerHealth ? Number(providerHealth.score.toFixed(2)) : null);
          throw retryError;
        }

        applyRoutingContext(
          fallbackProviderName,
          fallbackSelection?.health || null,
          `fallback_after_infip_cooldown:${fallbackSelection?.reason || 'selected'}`
        );

        if (this.strategyManager) {
          const fallbackQueueStatus = this.queueManager.getQueueStatus(fallbackProviderName);
          const fallbackAdjusted = this.strategyManager.adjustQualityMode(
            effectiveOptions._qualityModeInput || options.qualityMode || 'standard',
            providerHealth,
            fallbackQueueStatus
          );
          effectiveOptions.qualityMode = fallbackAdjusted.mode;
          effectiveOptions._qualityModeAdjust = fallbackAdjusted;
        }

        logger.add("🛟 Fallback Provider Selected", {
          from: 'infip',
          to: fallbackProviderName,
          score: providerHealth ? Number(providerHealth.score.toFixed(2)) : null,
          routing_reason: routingReason,
          quality_output: effectiveOptions.qualityMode
        });

        try {
          return await executeProvider(fallbackProviderName, fallbackProvider);
        } catch (fallbackError) {
          fallbackError._providerName = fallbackError._providerName || fallbackProviderName;
          fallbackError._providerScore = fallbackError._providerScore ?? (providerHealth ? Number(providerHealth.score.toFixed(2)) : null);
          throw fallbackError;
        }
      }
    }
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
  const strategyManager = new AdaptiveStrategyManager(env);

  let requestedProviderForMetrics = null;
  let selectedProviderForMetrics = null;
  let providerScoreForMetrics = null;
  let requestedQualityMode = 'standard';
  let finalQualityModeForMetrics = 'standard';
  
  try {
    const body = await request.json();
    const prompt = body.prompt;
    if (!prompt || !prompt.trim()) throw new Error("Prompt is required");

    requestedProviderForMetrics = body.provider || null;
    requestedQualityMode = body.quality_mode || 'standard';

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
      qualityMode: requestedQualityMode,
      referenceImages: referenceImages,
      nsfw: body.nsfw === true,
      language: body.language || 'en'  // Track interface language
    };
    
    const router = new MultiProviderRouter({}, env, strategyManager);
    const results = await router.generate(prompt, options, logger);
    const duration = Date.now() - startTime;

    if (results.length > 0) {
      const first = results[0];
      selectedProviderForMetrics = first.selected_provider || first.provider || requestedProviderForMetrics || CONFIG.DEFAULT_PROVIDER;
      providerScoreForMetrics = typeof first.provider_score === 'number' ? first.provider_score : null;
      finalQualityModeForMetrics = first.quality_mode_output || first.quality_mode || options.qualityMode || requestedQualityMode;
      await strategyManager.recordProviderResult(selectedProviderForMetrics, { success: true, duration });
    }
    
    if (results.length === 1 && results[0].imageData) {
      const result = results[0];
      return new Response(result.imageData, {
        headers: {
          'Content-Type': result.contentType || 'image/png',
          'Content-Disposition': `inline; filename="flux-ai-${result.seed}.png"`,
          'X-Model': result.model,
          'X-Model-Name': result.style_name || result.model,
          'X-Seed': result.seed.toString(),
          'X-Width': result.width.toString(),
          'X-Height': result.height.toString(),
          'X-Generation-Time': duration + 'ms',
          'X-Quality-Mode': result.quality_mode,
          'X-Quality-Mode-Input': requestedQualityMode,
          'X-Quality-Mode-Output': finalQualityModeForMetrics,
          'X-Style': result.style,
          'X-Style-Name': result.style_name || result.style,
          'X-Style-Category': result.style_category || 'unknown',
          'X-Generation-Mode': result.generation_mode || '文生圖',
          'X-Authenticated': result.authenticated ? 'true' : 'false',
          'X-API-Endpoint': CONFIG.PROVIDERS.pollinations.endpoint,
          'X-Selected-Provider': selectedProviderForMetrics || 'unknown',
          'X-Provider-Score': providerScoreForMetrics === null ? 'n/a' : providerScoreForMetrics.toString(),
          'X-Strategy-Version': AdaptiveStrategyManager.VERSION,
          ...corsHeaders()
        }
      });
    }

    const imagesData = await Promise.all(results.map(async (r) => {
      if (r.imageData) {
        const uint8Array = new Uint8Array(r.imageData);
        let binary = '';
        const len = uint8Array.byteLength;
        for (let i = 0; i < len; i++) binary += String.fromCharCode(uint8Array[i]);
        return {
          image: `data:${r.contentType};base64,${btoa(binary)}`,
          model: r.model,
          seed: r.seed,
          width: r.width,
          height: r.height,
          quality_mode: r.quality_mode,
          quality_mode_input: r.quality_mode_input || requestedQualityMode,
          quality_mode_output: r.quality_mode_output || r.quality_mode,
          style: r.style,
          style_name: r.style_name || r.style,
          style_category: r.style_category || 'unknown',
          generation_mode: r.generation_mode,
          authenticated: r.authenticated,
          selected_provider: r.selected_provider || r.provider,
          provider_score: r.provider_score,
          strategy_version: r.strategy_version || AdaptiveStrategyManager.VERSION,
          routing_reason: r.routing_reason
        };
      }
      return null;
    }));

    return new Response(JSON.stringify({
      created: Math.floor(Date.now() / 1000),
      data: imagesData.filter(d => d !== null),
      generation_time_ms: duration,
      api_endpoint: CONFIG.PROVIDERS.pollinations.endpoint,
      authenticated: CONFIG.POLLINATIONS_AUTH.enabled,
      styles_available: mergedStyles.stats.total,
      strategy: {
        version: AdaptiveStrategyManager.VERSION,
        selected_provider: selectedProviderForMetrics,
        provider_score: providerScoreForMetrics,
        quality_mode_input: requestedQualityMode,
        quality_mode_output: finalQualityModeForMetrics
      }
    }), {
      headers: corsHeaders({
        'Content-Type': 'application/json',
        'X-Generation-Time': duration + 'ms',
        'X-API-Endpoint': CONFIG.PROVIDERS.pollinations.endpoint,
        'X-Styles-Count': mergedStyles.stats.total.toString(),
        'X-Selected-Provider': selectedProviderForMetrics || 'unknown',
        'X-Provider-Score': providerScoreForMetrics === null ? 'n/a' : providerScoreForMetrics.toString(),
        'X-Strategy-Version': AdaptiveStrategyManager.VERSION
      })
    });
  } catch (e) {
    const failedDuration = Date.now() - startTime;
    const failedProvider = e._providerName || selectedProviderForMetrics || requestedProviderForMetrics || CONFIG.DEFAULT_PROVIDER;
    await strategyManager.recordProviderResult(failedProvider, { success: false, duration: failedDuration, errorMessage: e.message });

    logger.add("❌ Error", e.message);
    return new Response(JSON.stringify({ error: { message: e.message, debug_logs: logger.get(), api_endpoint: CONFIG.PROVIDERS.pollinations.endpoint, authenticated: CONFIG.POLLINATIONS_AUTH.enabled, strategy_version: AdaptiveStrategyManager.VERSION, selected_provider: failedProvider } }), { status: 400, headers: corsHeaders({ 'Content-Type': 'application/json', 'X-Strategy-Version': AdaptiveStrategyManager.VERSION }) });
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
/* Gemini 參數預覽區塊樣式 */
.gemini-preview {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(59, 130, 246, 0.08));
  border: 1px solid rgba(139, 92, 246, 0.35);
  border-radius: 12px;
  padding: 12px 16px;
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.gemini-preview-header {
  display: flex;
  align-items: center;
  gap: 6px;
}
.gemini-icon { font-size: 16px; }
.gemini-title { font-weight: 600; color: #a78bfa; font-size: 14px; }
.gemini-params { display: flex; gap: 12px; flex: 1; flex-wrap: wrap; }
.gemini-param {
  background: rgba(255,255,255,0.08);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.param-label { color: #9ca3af; }
.param-value { font-weight: 600; }
#geminiAspect { color: #fbbf24; }
#geminiSize { color: #34d399; }
/* Gemini 支援標記 */
.ratio-item[data-gemini-supported="true"]::after {
  content: '✓';
  position: absolute;
  bottom: 2px;
  right: 4px;
  font-size: 10px;
  color: #a78bfa;
}
.ratio-item[data-gemini-converted="true"] {
  border-color: rgba(251, 191, 36, 0.5);
}
.ratio-item[data-gemini-converted="true"]::after {
  content: '⟳';
  position: absolute;
  bottom: 2px;
  right: 4px;
  font-size: 10px;
  color: #fbbf24;
}
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
                <div class="ratio-item active" data-w="1024" data-h="1024" title="1:1 方形" data-gemini-supported="true">
                <div class="ratio-shape" style="width:14px; height:14px;"></div>
                </div>
                <div class="ratio-item" data-w="1080" data-h="1350" title="4:5 IG (轉換為 3:4)" data-gemini-converted="true">
                <div class="ratio-shape" style="width:12px; height:15px;"></div>
                </div>
                <div class="ratio-item" data-w="1080" data-h="1920" title="9:16 限動" data-gemini-supported="true">
                <div class="ratio-shape" style="width:9px; height:16px;"></div>
                </div>
                <div class="ratio-item" data-w="1920" data-h="1080" title="16:9 桌布" data-gemini-supported="true">
                <div class="ratio-shape" style="width:16px; height:9px;"></div>
                </div>
                <div class="ratio-item" data-w="2048" data-h="858" title="21:9 電影" data-gemini-supported="true">
                <div class="ratio-shape" style="width:18px; height:7px;"></div>
                </div>
                <div class="ratio-item" data-w="2048" data-h="2048" title="2K 方形" data-gemini-supported="true">
                <div class="ratio-shape" style="width:14px; height:14px; border: 2px solid #FACC15;"></div>
                </div>
                <div class="ratio-item" data-w="3840" data-h="2160" title="2K 16:9" data-gemini-supported="true">
                <div class="ratio-shape" style="width:16px; height:9px; border: 2px solid #FACC15;"></div>
                </div>
                <div class="ratio-item" data-w="2160" data-h="3840" title="2K 9:16" data-gemini-supported="true">
                <div class="ratio-shape" style="width:9px; height:16px; border: 2px solid #FACC15;"></div>
                </div>
                <div class="ratio-item" data-w="4096" data-h="4096" title="4K 方形" data-gemini-supported="true">
                <div class="ratio-shape" style="width:14px; height:14px; border: 2px solid #8B5CF6;"></div>
                </div>
                <div class="ratio-item" data-w="7680" data-h="4320" title="4K 16:9" data-gemini-supported="true">
                <div class="ratio-shape" style="width:16px; height:9px; border: 2px solid #8B5CF6;"></div>
                </div>
                <div class="ratio-item" data-w="4320" data-h="7680" title="4K 9:16" data-gemini-supported="true">
                <div class="ratio-shape" style="width:9px; height:16px; border: 2px solid #8B5CF6;"></div>
                </div>
                </div>
                <input type="hidden" id="width" value="1024">
                <input type="hidden" id="height" value="1024">
                
                <!-- Gemini 參數預覽區塊 -->
                <div class="gemini-preview" id="geminiPreview">
                <div class="gemini-preview-header">
                <span class="gemini-icon">🎯</span>
                <span class="gemini-title">Gemini 參數</span>
                </div>
                <div class="gemini-params">
                <div class="gemini-param">
                <span class="param-label">aspectRatio:</span>
                <span class="param-value" id="geminiAspect">1:1</span>
                </div>
                <div class="gemini-param">
                <span class="param-label">imageSize:</span>
                <span class="param-value" id="geminiSize">1K</span>
                </div>
                </div>
                </div>
                </div>
         
            <!-- ====== API 供應商選擇 ====== -->
            <div class="control-group provider-select-block">
            <div class="label-row">
            <label id="providerLabel">API 供應商</label>
            </div>
            <select id="nanoProvider" style="width: 100%; margin-bottom: 10px;">
            <option value="nonpon" selected>🍌 Nonpon API (Gemini)</option>
            <option value="supabase">⚡ Supabase API</option>
            </select>
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
    lbDownload: document.getElementById('lbDownload'),
    nanoProvider: document.getElementById('nanoProvider'),
    nanoSteps: document.getElementById('nanoSteps'),
    nanoGuidance: document.getElementById('nanoGuidance'),
    nanoQuality: document.getElementById('nanoQuality')
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
    
    // ====== Gemini 參數轉換函數（與伺服端 RatioResolver 對齊） ======
    const GEMINI_SUPPORTED_RATIOS = [
    { ratio: '1:1', w: 1, h: 1 },
    { ratio: '16:9', w: 16, h: 9 },
    { ratio: '9:16', w: 9, h: 16 },
    { ratio: '4:3', w: 4, h: 3 },
    { ratio: '3:4', w: 3, h: 4 },
    { ratio: '3:2', w: 3, h: 2 },
    { ratio: '2:3', w: 2, h: 3 },
    { ratio: '21:9', w: 21, h: 9 },
    { ratio: '9:21', w: 9, h: 21 }
    ];

    function toSafeInt(value, fallback = 1) {
    const n = parseInt(value, 10);
    return Number.isFinite(n) && n > 0 ? n : fallback;
    }

    function gcd(a, b) {
    let x = Math.abs(a);
    let y = Math.abs(b);
    while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
    }
    return x || 1;
    }

    function convertToGeminiAspectRatio(width, height) {
    const w = toSafeInt(width);
    const h = toSafeInt(height);

    const divisor = gcd(w, h);
    const ratioStr = Math.round(w / divisor) + ':' + Math.round(h / divisor);
    const exact = GEMINI_SUPPORTED_RATIOS.find(item => item.ratio === ratioStr);
    if (exact) {
    return exact.ratio;
    }

    const inputLogRatio = Math.log(w / h);
    let closestRatio = GEMINI_SUPPORTED_RATIOS[0].ratio;
    let minDiff = Number.POSITIVE_INFINITY;

    for (const item of GEMINI_SUPPORTED_RATIOS) {
    const supportedLogRatio = Math.log(item.w / item.h);
    const diff = Math.abs(inputLogRatio - supportedLogRatio);
    if (diff < minDiff) {
    minDiff = diff;
    closestRatio = item.ratio;
    }
    }

    return closestRatio;
    }
    
    function convertToGeminiImageSize(width, height) {
    const w = toSafeInt(width);
    const h = toSafeInt(height);
    const pixels = w * h;
    if (pixels >= 3840 * 2160) return '4K';
    if (pixels >= 1920 * 1080) return '2K';
    return '1K';
    }
    
    function updateGeminiPreview(width, height) {
    const aspectEl = document.getElementById('geminiAspect');
    const sizeEl = document.getElementById('geminiSize');
    if (aspectEl && sizeEl) {
    aspectEl.textContent = convertToGeminiAspectRatio(width, height);
    sizeEl.textContent = convertToGeminiImageSize(width, height);
    }
    }
    
    // 初始化 Gemini 參數預覽
    updateGeminiPreview(1024, 1024);
    
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
    // 更新 Gemini 參數預覽
    updateGeminiPreview(r.dataset.w, r.dataset.h);
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
        // 取得選擇的供應商
        const selectedProvider = els.nanoProvider?.value || 'nonpon';
        const providerModelMap = {
        'nonpon': 'gemini-3.1-flash-image-preview',
        'supabase': 'gemini-3.1-flash-image-preview'
        };
        const selectedModel = providerModelMap[selectedProvider] || 'gemini-3.1-flash-image-preview';
        
        console.log("🍌 Nano Pro: 開始生成圖片...", {
        prompt: p,
        provider: selectedProvider,
        model: selectedModel,
        width: els.width.value,
        height: els.height.value,
        style: els.style.value,
        seed: els.seed.value
        });
        
        const requestBody = {
        prompt: p,
        negative_prompt: els.negative.value,
        provider: selectedProvider,
        model: selectedModel,
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
        <div style="font-size:11px; color:#fca5a5; margin-top:2px;">啟用此選項將允許生成成人內容 (Infip)</div>
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
        <div style="font-size:12px; color:#f59e0b; margin-bottom:10px; font-weight:bold; display:flex; align-items:center; gap:6px;">
            <span>🖼️</span>
            <span data-t="batch_label">批量生成</span>
            <span style="font-size:10px; color:#888; font-weight:normal; margin-left:auto; background:rgba(245,158,11,0.15); padding:2px 8px; border-radius:10px;">1-4 張</span>
        </div>
        <div class="form-group" style="background:rgba(255,255,255,0.03); padding:12px; border-radius:10px; border:1px solid rgba(255,255,255,0.08);">
            <label data-t="batch_size_label" style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
                <span style="font-size:14px;">📊</span>
                <span>生成數量</span>
            </label>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <label style="flex:1; min-width:60px; cursor:pointer;">
                    <input type="radio" name="batchSize" value="1" checked style="display:none;">
                    <span style="display:block; text-align:center; padding:10px 8px; background:rgba(255,255,255,0.1); border-radius:8px; border:2px solid transparent; transition:all 0.2s; font-size:13px;" onclick="document.querySelectorAll('[name=\\'batchSize\\']').forEach(el=>el.parentElement.querySelector('span').style.borderColor='transparent');this.style.borderColor='#f59e0b';this.style.background='rgba(245,158,11,0.2)';">1 張</span>
                </label>
                <label style="flex:1; min-width:60px; cursor:pointer;">
                    <input type="radio" name="batchSize" value="2" style="display:none;">
                    <span style="display:block; text-align:center; padding:10px 8px; background:rgba(255,255,255,0.1); border-radius:8px; border:2px solid transparent; transition:all 0.2s; font-size:13px;" onclick="document.querySelectorAll('[name=\\'batchSize\\']').forEach(el=>el.parentElement.querySelector('span').style.borderColor='transparent');this.style.borderColor='#f59e0b';this.style.background='rgba(245,158,11,0.2)';">2 張</span>
                </label>
                <label style="flex:1; min-width:60px; cursor:pointer;">
                    <input type="radio" name="batchSize" value="3" style="display:none;">
                    <span style="display:block; text-align:center; padding:10px 8px; background:rgba(255,255,255,0.1); border-radius:8px; border:2px solid transparent; transition:all 0.2s; font-size:13px;" onclick="document.querySelectorAll('[name=\\'batchSize\\']').forEach(el=>el.parentElement.querySelector('span').style.borderColor='transparent');this.style.borderColor='#f59e0b';this.style.background='rgba(245,158,11,0.2)';">3 張</span>
                </label>
                <label style="flex:1; min-width:60px; cursor:pointer;">
                    <input type="radio" name="batchSize" value="4" style="display:none;">
                    <span style="display:block; text-align:center; padding:10px 8px; background:rgba(255,255,255,0.1); border-radius:8px; border:2px solid transparent; transition:all 0.2s; font-size:13px;" onclick="document.querySelectorAll('[name=\\'batchSize\\']').forEach(el=>el.parentElement.querySelector('span').style.borderColor='transparent');this.style.borderColor='#f59e0b';this.style.background='rgba(245,158,11,0.2)';">4 張</span>
                </label>
            </div>
            <div style="font-size:11px; color:#888; margin-top:10px; text-align:center;">
                💡 選擇多張可一次生成多個版本，方便比較選擇
            </div>
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
        provider_pollinations: "Pollinations.ai (Free)", provider_infip: "Ghostbot (Infip) 🌟",
        api_key_label: "API Key", api_key_desc: "Stored locally", api_key_placeholder: "Paste your API Key here",
        nsfw_label: "🔞 解除成人內容限制 (NSFW)", nsfw_desc: "啟用此選項將允許生成成人內容 (Infip)",
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
        provider_pollinations: "Pollinations.ai (Free)", provider_infip: "Ghostbot (Infip) 🌟",
        api_key_label: "API Key", api_key_desc: "Stored locally", api_key_placeholder: "Paste your API Key here",
        nsfw_label: "🔞 Disable NSFW Filter", nsfw_desc: "Enable this option to allow adult content generation (Infip)",
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
        nsfw_label: "🔞 NSFWフィルターを無効化", nsfw_desc: "このオプションを有効にすると、成人向けコンテンツの生成が可能になります（Infip）",
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
        nsfw_label: "🔞 NSFW 필터 비활성화", nsfw_desc: "이 옵션을 활성화하면 성인 콘텐츠 생성이 허용됩니다 (Infip)",
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
        nav_gen:"🎨 إنشاء صورة", nav_his:"📚 السجل", nav_nano:"Nano", settings_title:"⚙️ إعدادات الإنشاء", provider_label:"مزود API", model_label:"اختيار النموذج", size_label:"حجم الصورة", style_label:"النمط الفني 🎨", quality_label:"وضع الجودة", seed_label:"قيمة البذرة", seed_random:"🎲 عشوائي", seed_lock:"🔒 قفل", auto_opt_label:"✨ تحسين تلقائي", auto_opt_desc:"ضبط الخطوات والتوجيه تلقائيًا", adv_settings:"🛠️ إعدادات متقدمة", steps_label:"خطوات الإنشاء", guidance_label:"مقياس التوجيه", gen_btn:"🎨 بدء الإنشاء", empty_title:"لم يتم إنشاء أي صور بعد", pos_prompt:"موجه إيجابي", neg_prompt:"موجه سلبي (اختياري)", ref_img:"صورة مرجعية (Img2Img) 📸", stat_total:"📊 إجمالي السجلات", stat_storage:"💾 مساحة التخزين (دائمة)", btn_export:"📥 تصدير", btn_clear:"🗑️ مسح الكل", btn_reuse:"🔄 إعادة الاستخدام", btn_dl:"💾 تنزيل", no_history:"لا توجد سجلات", cooldown_msg:"⏳ يرجى الانتظار...", quality_economy:"اقتصادي", quality_standard:"قياسي", quality_ultra:"فائق الدقة", provider_pollinations:"Pollinations.ai (مجاني)", provider_infip:"Ghostbot (Infip) 🌟", api_key_label:"مفتاح API", api_key_desc:"مخزن محليًا", api_key_placeholder:"الصق مفتاح API هنا", nsfw_label:"🔞 تعطيل فلتر NSFW", nsfw_desc:"تمكين هذا الخيار للسماح بإنشاء محتوى للبالغين (Infip)", batch_label:"🖼️ إنشاء مجموع", batch_size_label:"حجم المجموعة", prompt_generator_title:"مولد المطالبات الاحترافي", prompt_generator_upload_ref:"رفع صورة مرجعية (اختياري)", prompt_generator_select_image:"اختر صورة", prompt_generator_simple_desc:"صف الصورة التي تريدها ببساطة", prompt_generator_generate:"إنشاء موجه احترافي", prompt_generator_apply:"تطبيق على الموجه", prompt_generator_generated:"الموجه الاحترافي المُنشأ", prompt_generator_tip:"💡 نصيحة: بعد تحديد 'نمط فني' على اليسار، سيقوم المولد بدمج هذا النمط (مثل السايبربانك، الرسم بالحبر) تلقائيًا في موجهك للحصول على نتائج أكثر فنية!", error_no_prompt:"⚠️ يرجى إدخال موجه", error_energy_depleted:"🚫 نفدت الطاقة لهذه الساعة، يرجى العودة لاحقًا!", error_image_too_large:"الصورة كبيرة جدًا! الحد الأقصى 5 ميجابايت", error_invalid_file:"يرجى اختيار ملف صورة", error_upload_failed:"فشل الرفع"
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
            'aqua': { url: 'https://aqua-api.com/api-keys', text: 'aqua-api.com/api-keys' }
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
            
            apiKeyInput.value = storedKey || '';
            apiKeyInput.placeholder = "Paste your API Key here";
        }
    } else {
        apiKeyGroup.style.display = 'none';
    }
    
    // Logic: Show batch generation for Infip only
    const nsfwGroup = document.getElementById('nsfwGroup');
    const batchGroup = document.getElementById('batchGroup');
    
    if (p === 'infip') {
        nsfwGroup.style.display = 'none';
        batchGroup.style.display = 'block';
    } else {
        nsfwGroup.style.display = 'none';
        batchGroup.style.display = 'none';
        document.getElementById('nsfwToggle').checked = false;
        // Reset batch size radio buttons
        document.querySelectorAll('input[name="batchSize"]').forEach(el => {
            el.checked = (el.value === '1');
            const span = el.parentElement.querySelector('span');
            if (span) {
                span.style.borderColor = el.value === '1' ? '#f59e0b' : 'transparent';
                span.style.background = el.value === '1' ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.1)';
            }
        });
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
    const batchSizeRadio = document.querySelector('input[name="batchSize"]:checked');
    const batchSize = batchSizeRadio ? parseInt(batchSizeRadio.value) : 1;
    
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
                const cooldownTime = provider === 'infip' ? INFIP_COOLDOWN_SEC : COOLDOWN_SEC;
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
            const cooldownTime = provider === 'infip' ? INFIP_COOLDOWN_SEC : COOLDOWN_SEC;
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
    <span style="font-size:14px;">Powered by Flux AI Pro • <a href="https://github.com" target="_blank">Engine</a> • <a href="/nano" target="_blank">Nano Version</a></span>
    <span style="opacity:0.5">|</span>
    <span style="opacity:0.9; font-size:14px;">友情鏈接: <a href="https://pollinations.ai" target="_blank">Pollinations.ai</a> • <a href="https://infip.pro" target="_blank">Infip</a> • <a href="https://aquadevs.com" target="_blank">AquaDevs</a> • <a href="https://github.com" target="_blank">GitHub</a></span>
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

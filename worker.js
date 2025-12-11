// =================================================================================
//  項目: Flux AI Pro
//  版本: 9.2.0 (圖生圖 + 多圖融合 + 4K + FLUX官方優化)
//  作者: Enhanced by AI Assistant  
//  日期: 2025-12-12
//  功能: 計時器 | 歷史記錄 | 圖生圖 | 多圖融合 | 4K支持 | FLUX官方參數
// =================================================================================

const CONFIG = {
  PROJECT_NAME: "Flux-AI-Pro",
  PROJECT_VERSION: "9.2.0",
  API_MASTER_KEY: "1",
  
  PROVIDERS: {
    pollinations: {
      name: "Pollinations.ai",
      endpoint: "https://image.pollinations.ai",
      type: "direct",
      auth_mode: "free",
      requires_key: false,
      enabled: true,
      default: true,
      description: "完全免費的 AI 圖像生成服務",
      features: {
        private_mode: true,
        custom_size: true,
        seed_control: true,
        negative_prompt: true,
        enhance: true,
        nologo: true,
        style_presets: true,
        auto_hd: true,
        quality_modes: true,
        auto_translate: true,
        ultra_hd_4k: true,
        reference_images: true,
        image_to_image: true,
        multi_image_fusion: true
      },
      models: [
        { id: "flux", name: "Flux", confirmed: true, category: "flux", description: "均衡速度與質量", max_size: 2048 },
        { id: "flux-realism", name: "Flux Realism", confirmed: true, category: "flux", description: "超寫實風格", max_size: 2048 },
        { id: "flux-anime", name: "Flux Anime", confirmed: true, category: "flux", description: "日系動漫風格", max_size: 2048 },
        { id: "flux-3d", name: "Flux 3D", confirmed: true, category: "flux", description: "3D 渲染風格", max_size: 2048 },
        { id: "flux-pro", name: "Flux Pro", confirmed: true, category: "flux", description: "專業版最高質量", max_size: 2048 },
        { id: "any-dark", name: "Any Dark", confirmed: true, category: "flux", description: "暗黑風格", max_size: 2048 },
        { id: "turbo", name: "Turbo", confirmed: true, category: "flux", description: "極速生成", max_size: 2048 },
        { id: "flux-1.1-pro", name: "Flux 1.1 Pro 🔥", confirmed: false, fallback: ["flux-pro", "flux-realism"], experimental: true, category: "flux-advanced", description: "最新 Flux 1.1", max_size: 2048 },
        { id: "flux-kontext", name: "Flux Kontext 🎨", confirmed: false, fallback: ["flux-pro", "flux-realism"], experimental: true, category: "flux-advanced", description: "圖像編輯 (1張參考圖)", max_size: 2048, supports_reference_images: true, max_reference_images: 1 },
        { id: "flux-kontext-pro", name: "Flux Kontext Pro 💎", confirmed: false, fallback: ["flux-kontext", "flux-pro"], experimental: true, category: "flux-advanced", description: "圖像編輯專業版 (1張參考圖)", max_size: 2048, supports_reference_images: true, max_reference_images: 1 },
        { id: "nanobanana", name: "Nano Banana 🍌", confirmed: true, category: "gemini", description: "Gemini 2.5 Flash (4張參考圖)", max_size: 2048, supports_reference_images: true, max_reference_images: 4 },
        { id: "nanobanana-pro", name: "Nano Banana Pro 🍌💎", confirmed: true, category: "gemini", description: "Gemini 3 Pro (4K + 4張參考圖)", max_size: 4096, ultra_hd: true, supports_reference_images: true, max_reference_images: 4 },
        { id: "sd3", name: "Stable Diffusion 3 ⚡", confirmed: false, fallback: ["flux-realism", "flux"], experimental: true, category: "stable-diffusion", description: "SD3 標準版", max_size: 2048 },
        { id: "sd3.5-large", name: "SD 3.5 Large 🔥", confirmed: false, fallback: ["sd3", "flux-realism"], experimental: true, category: "stable-diffusion", description: "SD 3.5 大模型", max_size: 2048 },
        { id: "sd3.5-turbo", name: "SD 3.5 Turbo ⚡", confirmed: false, fallback: ["turbo", "flux"], experimental: true, category: "stable-diffusion", description: "SD 3.5 快速版", max_size: 2048 },
        { id: "sdxl", name: "SDXL 📐", confirmed: false, fallback: ["flux-realism", "flux"], experimental: true, category: "stable-diffusion", description: "經典 SDXL", max_size: 2048 },
        { id: "sdxl-lightning", name: "SDXL Lightning ⚡", confirmed: false, fallback: ["turbo", "flux"], experimental: true, category: "stable-diffusion", description: "SDXL 極速版", max_size: 2048 }
      ],
      rate_limit: null,
      max_size: { width: 4096, height: 4096 }
    }
  },
  
  DEFAULT_PROVIDER: "pollinations",
  
  FLUX_OFFICIAL_PARAMS: {
    schnell: {
      guidance_scale: 0.0,
      num_inference_steps: 4,
      max_sequence_length: 256,
      description: "FLUX.1 [schnell] 官方參數"
    },
    dev: {
      guidance_scale: 3.5,
      num_inference_steps: 50,
      max_sequence_length: 512,
      description: "FLUX.1 [dev] 官方參數"
    },
    pro: {
      guidance_scale: 7.0,
      num_inference_steps: 28,
      max_sequence_length: 512,
      description: "FLUX.1 [pro] 官方參數"
    }
  },
  
  STYLE_PRESETS: {
    none: { name: "無 (使用原始提示詞)", prompt: "", negative: "" },
    "anime": { name: "動漫風格 ✨", prompt: "anime style, anime art, vibrant colors, anime character, detailed anime", negative: "realistic, photograph, 3d, ugly" },
    "photorealistic": { name: "寫實照片 📷", prompt: "photorealistic, ultra realistic, 8k uhd, professional photography, detailed, sharp focus", negative: "anime, cartoon, illustration, painting" },
    "oil-painting": { name: "油畫 🎨", prompt: "oil painting, classical oil painting style, visible brushstrokes, rich colors, artistic", negative: "photograph, digital art, anime" },
    "watercolor": { name: "水彩畫 💧", prompt: "watercolor painting, soft colors, watercolor texture, artistic, hand-painted", negative: "photograph, digital, sharp edges" },
    "sketch": { name: "素描 ✏️", prompt: "pencil sketch, hand-drawn, sketch art, graphite drawing, artistic sketch", negative: "colored, painted, digital" },
    "cyberpunk": { name: "賽博朋克 🌃", prompt: "cyberpunk style, neon lights, futuristic, sci-fi, dystopian, high-tech low-life", negative: "natural, rustic, medieval" },
    "fantasy": { name: "奇幻風格 🐉", prompt: "fantasy art, magical, epic fantasy, detailed fantasy illustration", negative: "modern, realistic, mundane" }
  },
  
  OPTIMIZATION_RULES: {
    MODEL_STEPS: {
      "turbo": { min: 4, optimal: 8, max: 12 },
      "sdxl-lightning": { min: 4, optimal: 6, max: 10 },
      "sd3.5-turbo": { min: 8, optimal: 12, max: 20 },
      "flux": { min: 15, optimal: 20, max: 30 },
      "flux-anime": { min: 15, optimal: 20, max: 30 },
      "flux-3d": { min: 15, optimal: 22, max: 35 },
      "sd3": { min: 18, optimal: 25, max: 35 },
      "sdxl": { min: 20, optimal: 28, max: 40 },
      "flux-realism": { min: 20, optimal: 28, max: 40 },
      "flux-pro": { min: 25, optimal: 32, max: 45 },
      "flux-1.1-pro": { min: 20, optimal: 28, max: 40 },
      "sd3.5-large": { min: 25, optimal: 35, max: 50 },
      "flux-kontext": { min: 22, optimal: 30, max: 40 },
      "flux-kontext-pro": { min: 25, optimal: 35, max: 45 },
      "any-dark": { min: 18, optimal: 24, max: 35 },
      "nanobanana": { min: 15, optimal: 22, max: 30 },
      "nanobanana-pro": { min: 25, optimal: 35, max: 50 }
    },
    SIZE_MULTIPLIER: {
      small: { threshold: 512 * 512, multiplier: 0.8 },
      medium: { threshold: 1024 * 1024, multiplier: 1.0 },
      large: { threshold: 1536 * 1536, multiplier: 1.15 },
      xlarge: { threshold: 2048 * 2048, multiplier: 1.3 },
      ultra_4k: { threshold: 4096 * 4096, multiplier: 1.5 }
    },
    STYLE_ADJUSTMENT: {
      "photorealistic": 1.1,
      "oil-painting": 1.05,
      "watercolor": 0.95,
      "sketch": 0.9,
      "default": 1.0
    }
  },
  
  HD_OPTIMIZATION: {
    enabled: true,
    QUALITY_MODES: {
      economy: {
        name: "經濟模式",
        description: "快速出圖,適合測試",
        min_resolution: 1024,
        max_resolution: 2048,
        steps_multiplier: 0.85,
        guidance_multiplier: 0.9,
        hd_level: "basic"
      },
      standard: {
        name: "標準模式",
        description: "平衡質量與速度",
        min_resolution: 1280,
        max_resolution: 2048,
        steps_multiplier: 1.0,
        guidance_multiplier: 1.0,
        hd_level: "enhanced"
      },
      ultra: {
        name: "超高清模式",
        description: "極致質量,耗時較長",
        min_resolution: 1536,
        max_resolution: 4096,
        steps_multiplier: 1.35,
        guidance_multiplier: 1.15,
        hd_level: "maximum",
        force_upscale: true
      },
      ultra_4k: {
        name: "4K超高清",
        description: "Nano Banana Pro 專屬",
        min_resolution: 2048,
        max_resolution: 4096,
        steps_multiplier: 1.5,
        guidance_multiplier: 1.2,
        hd_level: "ultra_4k",
        force_upscale: true,
        exclusive_models: ["nanobanana-pro"]
      }
    },
    HD_PROMPTS: {
      basic: "high quality, detailed, sharp",
      enhanced: "high quality, extremely detailed, sharp focus, crisp, clear, professional, 8k uhd, masterpiece, fine details",
      maximum: "ultra high quality, extremely detailed, razor sharp focus, crystal clear, professional grade, 8k uhd resolution, masterpiece quality, fine details, intricate details, perfect clarity",
      ultra_4k: "ultra high definition 4K quality, extreme detail precision, professional grade, pixel-perfect clarity, masterpiece quality, intricate fine details"
    },
    HD_NEGATIVE: "low quality, blurry, pixelated, low resolution, jpeg artifacts, compression artifacts, bad quality, distorted, noisy, grainy, poor details, soft focus, out of focus",
    MODEL_QUALITY_PROFILES: {
      "flux-realism": { priority: "ultra_detail", min_resolution: 1536, max_resolution: 2048, optimal_steps_boost: 1.25, guidance_boost: 1.15, recommended_quality: "ultra" },
      "flux-pro": { priority: "maximum_quality", min_resolution: 1536, max_resolution: 2048, optimal_steps_boost: 1.3, guidance_boost: 1.2, recommended_quality: "ultra" },
      "flux-1.1-pro": { priority: "maximum_quality", min_resolution: 1536, max_resolution: 2048, optimal_steps_boost: 1.25, guidance_boost: 1.15, recommended_quality: "ultra" },
      "sd3.5-large": { priority: "high_detail", min_resolution: 1280, max_resolution: 2048, optimal_steps_boost: 1.2, guidance_boost: 1.1, recommended_quality: "standard" },
      "flux-anime": { priority: "clarity", min_resolution: 1280, max_resolution: 2048, optimal_steps_boost: 1.15, guidance_boost: 1.1, recommended_quality: "standard" },
      "flux-3d": { priority: "detail", min_resolution: 1280, max_resolution: 2048, optimal_steps_boost: 1.2, guidance_boost: 1.1, recommended_quality: "standard" },
      "flux-kontext": { priority: "image_edit", min_resolution: 1280, max_resolution: 2048, optimal_steps_boost: 1.2, guidance_boost: 1.1, recommended_quality: "standard" },
      "flux-kontext-pro": { priority: "image_edit_pro", min_resolution: 1536, max_resolution: 2048, optimal_steps_boost: 1.3, guidance_boost: 1.15, recommended_quality: "ultra" },
      "nanobanana": { priority: "multi_image", min_resolution: 1280, max_resolution: 2048, optimal_steps_boost: 1.15, guidance_boost: 1.1, recommended_quality: "standard" },
      "nanobanana-pro": { priority: "ultra_4k_multi", min_resolution: 2048, max_resolution: 4096, optimal_steps_boost: 1.5, guidance_boost: 1.25, recommended_quality: "ultra_4k" },
      "turbo": { priority: "speed", min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 0.7, guidance_boost: 0.85, recommended_quality: "economy" },
      "sdxl-lightning": { priority: "speed", min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 0.6, guidance_boost: 0.8, recommended_quality: "economy" },
      "sd3.5-turbo": { priority: "balanced_speed", min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 0.8, guidance_boost: 0.9, recommended_quality: "economy" }
    }
  },
  
  FETCH_TIMEOUT: 90000,
  MAX_RETRIES: 3,
  
  PRESET_SIZES: {
    "square-1k": { width: 1024, height: 1024, name: "方形 1K" },
    "square-2k": { width: 2048, height: 2048, name: "方形 2K" },
    "square-4k": { width: 4096, height: 4096, name: "方形 4K 🍌", exclusive: ["nanobanana-pro"] },
    "portrait": { width: 768, height: 1344, name: "豎屏 9:16" },
    "portrait-2k": { width: 1536, height: 2688, name: "豎屏 2K" },
    "landscape": { width: 1344, height: 768, name: "橫屏 16:9" },
    "landscape-2k": { width: 2688, height: 1536, name: "橫屏 2K" },
    "standard-portrait": { width: 768, height: 1024, name: "標準豎屏 3:4" },
    "standard-landscape": { width: 1024, height: 768, name: "標準橫屏 4:3" },
    "custom": { width: 1024, height: 1024, name: "自定義" }
  },
  
  HISTORY: {
    MAX_ITEMS: 100,
    STORAGE_KEY: "flux_ai_history"
  }
};

class Logger {
    constructor() { this.logs = []; }
    add(step, data) {
        const time = new Date().toISOString().split('T')[1].slice(0, -1);
        this.logs.push({ time, step, data });
        console.log(`[${step}]`, data);
    }
    get() { return this.logs; }
}

async function translateToEnglish(text, env) {
    try {
        const hasChinese = /[\u4e00-\u9fa5]/.test(text);
        if (!hasChinese) {
            return { text: text, translated: false };
        }
        if (env?.AI) {
            const response = await env.AI.run("@cf/meta/m2m100-1.2b", {
                text: text,
                source_lang: "chinese",
                target_lang: "english"
            });
            return { 
                text: response.translated_text || text, 
                translated: true,
                original: text
            };
        }
        return { text: text, translated: false };
    } catch (e) {
        console.error("Translation error:", e);
        return { text: text, translated: false, error: e.message };
    }
}

class PromptAnalyzer {
    static analyzeComplexity(prompt) {
        const complexKeywords = ['detailed', 'intricate', 'complex', 'elaborate', 'realistic', 'photorealistic', 'hyperrealistic', 'architecture', 'cityscape', 'landscape', 'portrait', 'face', 'eyes', 'hair', 'texture', 'material', 'fabric', 'skin', 'lighting', 'shadows', 'reflections', 'fine details', 'high detail', 'ultra detailed', '4k', '8k', 'uhd'];
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
        
        if (model === 'nanobanana-pro') return 'ultra_4k';
        if (profile?.recommended_quality) return profile.recommended_quality;
        if (complexity > 0.7) return 'ultra';
        if (complexity > 0.4) return 'standard';
        return 'economy';
    }
}

class HDOptimizer {
    static optimize(prompt, negativePrompt, model, width, height, qualityMode = 'standard', autoHD = true) {
        if (!autoHD || !CONFIG.HD_OPTIMIZATION.enabled) {
            return { prompt: prompt, negativePrompt: negativePrompt, width: width, height: height, optimized: false };
        }
        const hdConfig = CONFIG.HD_OPTIMIZATION;
        const modeConfig = hdConfig.QUALITY_MODES[qualityMode] || hdConfig.QUALITY_MODES.standard;
        const profile = hdConfig.MODEL_QUALITY_PROFILES[model];
        const optimizations = [];
        
        const hdLevel = modeConfig.hd_level;
        let enhancedPrompt = prompt;
        
        if (hdConfig.HD_PROMPTS[hdLevel]) {
            const hdBoost = hdConfig.HD_PROMPTS[hdLevel];
            enhancedPrompt = prompt + ", " + hdBoost;
            optimizations.push("HD增強: " + hdLevel);
        }
        
        let enhancedNegative = negativePrompt || "";
        if (qualityMode !== 'economy') {
            enhancedNegative = enhancedNegative ? enhancedNegative + ", " + hdConfig.HD_NEGATIVE : hdConfig.HD_NEGATIVE;
            optimizations.push("負面提示詞: 高清過濾");
        }
        
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
        
        return { 
            prompt: enhancedPrompt, 
            negativePrompt: enhancedNegative, 
            width: finalWidth, 
            height: finalHeight, 
            optimized: true, 
            quality_mode: qualityMode, 
            hd_level: hdLevel, 
            optimizations: optimizations, 
            size_upscaled: sizeUpscaled
        };
    }
}

class ParameterOptimizer {
    static optimizeSteps(model, width, height, style = 'none', qualityMode = 'standard', userSteps = null) {
        if (userSteps !== null && userSteps !== -1) {
            const suggestion = this.calculateOptimalSteps(model, width, height, style, qualityMode);
            return { steps: userSteps, optimized: false, suggested: suggestion.steps, reasoning: suggestion.reasoning, user_override: true };
        }
        return this.calculateOptimalSteps(model, width, height, style, qualityMode);
    }
    
    static calculateOptimalSteps(model, width, height, style, qualityMode = 'standard') {
        const rules = CONFIG.OPTIMIZATION_RULES;
        const modelRule = rules.MODEL_STEPS[model] || rules.MODEL_STEPS["flux"];
        const modeConfig = CONFIG.HD_OPTIMIZATION.QUALITY_MODES[qualityMode];
        const profile = CONFIG.HD_OPTIMIZATION.MODEL_QUALITY_PROFILES[model];
        let baseSteps = modelRule.optimal;
        const reasoning = [];
        reasoning.push(model + ": " + baseSteps + "步");
        
        const totalPixels = width * height;
        let sizeMultiplier = 1.0;
        
        if (totalPixels >= rules.SIZE_MULTIPLIER.ultra_4k.threshold) {
            sizeMultiplier = rules.SIZE_MULTIPLIER.ultra_4k.multiplier;
            reasoning.push("4K超大 x" + sizeMultiplier);
        } else if (totalPixels >= rules.SIZE_MULTIPLIER.xlarge.threshold) {
            sizeMultiplier = rules.SIZE_MULTIPLIER.xlarge.multiplier;
            reasoning.push("超大 x" + sizeMultiplier);
        } else if (totalPixels >= rules.SIZE_MULTIPLIER.large.threshold) {
            sizeMultiplier = rules.SIZE_MULTIPLIER.large.multiplier;
            reasoning.push("大尺寸 x" + sizeMultiplier);
        } else if (totalPixels <= rules.SIZE_MULTIPLIER.small.threshold) {
            sizeMultiplier = rules.SIZE_MULTIPLIER.small.multiplier;
        } else {
            sizeMultiplier = rules.SIZE_MULTIPLIER.medium.multiplier;
        }
        
        let styleMultiplier = rules.STYLE_ADJUSTMENT[style] || rules.STYLE_ADJUSTMENT.default;
        let qualityMultiplier = modeConfig?.steps_multiplier || 1.0;
        if (qualityMultiplier !== 1.0) reasoning.push(modeConfig.name + " x" + qualityMultiplier);
        
        let profileBoost = profile?.optimal_steps_boost || 1.0;
        if (profileBoost !== 1.0) reasoning.push("模型配置 x" + profileBoost);
        
        let optimizedSteps = Math.round(baseSteps * sizeMultiplier * styleMultiplier * qualityMultiplier * profileBoost);
        optimizedSteps = Math.max(modelRule.min, Math.min(optimizedSteps, modelRule.max));
        
        reasoning.push("→ " + optimizedSteps + "步");
        return { 
            steps: optimizedSteps, 
            optimized: true, 
            base_steps: baseSteps, 
            size_multiplier: sizeMultiplier, 
            style_multiplier: styleMultiplier, 
            quality_multiplier: qualityMultiplier, 
            profile_boost: profileBoost, 
            min_steps: modelRule.min, 
            max_steps: modelRule.max, 
            reasoning: reasoning.join(' ') 
        };
    }
    
    static optimizeGuidance(model, style, qualityMode = 'standard') {
        const modeConfig = CONFIG.HD_OPTIMIZATION.QUALITY_MODES[qualityMode];
        const profile = CONFIG.HD_OPTIMIZATION.MODEL_QUALITY_PROFILES[model];
        let baseGuidance = 7.5;
        
        if (model.includes('turbo') || model.includes('lightning')) {
            baseGuidance = style === 'photorealistic' ? 3.0 : 2.5;
        } else if (style === 'photorealistic') {
            baseGuidance = 8.5;
        } else if (['oil-painting', 'watercolor', 'sketch'].includes(style)) {
            baseGuidance = 6.5;
        }
        
        let qualityBoost = modeConfig?.guidance_multiplier || 1.0;
        let profileBoost = profile?.guidance_boost || 1.0;
        return Math.round(baseGuidance * qualityBoost * profileBoost * 10) / 10;
    }
}

class StyleProcessor {
    static applyStyle(prompt, style, negativePrompt) {
        const styleConfig = CONFIG.STYLE_PRESETS[style];
        if (!styleConfig || style === 'none') {
            return { enhancedPrompt: prompt, enhancedNegative: negativePrompt };
        }
        let enhancedPrompt = prompt;
        if (styleConfig.prompt) enhancedPrompt = prompt + ", " + styleConfig.prompt;
        
        let enhancedNegative = negativePrompt || "";
        if (styleConfig.negative) {
            enhancedNegative = enhancedNegative ? enhancedNegative + ", " + styleConfig.negative : styleConfig.negative;
        }
        return { enhancedPrompt, enhancedNegative };
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
    constructor(config, env) {
        this.config = config;
        this.name = config.name;
        this.env = env;
    }
    
    async generate(prompt, options, logger) {
        const { 
            model = "flux", 
            width = 1024, 
            height = 1024, 
            seed = -1, 
            negativePrompt = "", 
            guidance = null, 
            steps = null, 
            enhance = false, 
            nologo = true, 
            privateMode = true, 
            style = "none", 
            autoOptimize = true, 
            autoHD = true, 
            qualityMode = 'standard',
            referenceImages = []
        } = options;
        
        const modelConfig = this.config.models.find(m => m.id === model);
        const supportsRefImages = modelConfig?.supports_reference_images || false;
        const maxRefImages = modelConfig?.max_reference_images || 0;
        const is4KModel = modelConfig?.max_size === 4096;
        
        let validReferenceImages = [];
        if (referenceImages && referenceImages.length > 0) {
            if (!supportsRefImages) {
                logger.add("⚠️ Reference Images", { 
                    warning: model + " 不支持參考圖,已忽略", 
                    supported_models: ["kontext", "kontext-pro", "nanobanana", "nanobanana-pro"] 
                });
            } else if (referenceImages.length > maxRefImages) {
                logger.add("⚠️ Reference Images", { 
                    warning: model + " 最多支持 " + maxRefImages + " 張參考圖", 
                    provided: referenceImages.length, 
                    using: maxRefImages 
                });
                validReferenceImages = referenceImages.slice(0, maxRefImages);
            } else {
                validReferenceImages = referenceImages;
                logger.add("🖼️ Reference Images", { 
                    model: model, 
                    count: validReferenceImages.length, 
                    max_allowed: maxRefImages,
                    mode: validReferenceImages.length === 1 ? "圖生圖" : "多圖融合"
                });
            }
        }
        
        let hdOptimization = null;
        let finalPrompt = prompt;
        let finalNegativePrompt = negativePrompt;
        let finalWidth = width;
        let finalHeight = height;
        
        const promptComplexity = PromptAnalyzer.analyzeComplexity(prompt);
        const recommendedQuality = PromptAnalyzer.recommendQualityMode(prompt, model);
        logger.add("🧠 Prompt Analysis", { 
            complexity: (promptComplexity * 100).toFixed(1) + '%', 
            recommended_quality: recommendedQuality, 
            selected_quality: qualityMode,
            is_4k_model: is4KModel,
            has_reference_images: validReferenceImages.length > 0
        });
        
        if (autoHD) {
            hdOptimization = HDOptimizer.optimize(
                prompt, 
                negativePrompt, 
                model, 
                width, 
                height, 
                qualityMode, 
                autoHD
            );
            finalPrompt = hdOptimization.prompt;
            finalNegativePrompt = hdOptimization.negativePrompt;
            finalWidth = hdOptimization.width;
            finalHeight = hdOptimization.height;
            
            if (hdOptimization.optimized) {
                logger.add("🎨 HD Optimization", { 
                    mode: qualityMode, 
                    hd_level: hdOptimization.hd_level, 
                    original: width + "x" + height, 
                    optimized: finalWidth + "x" + finalHeight, 
                    upscaled: hdOptimization.size_upscaled, 
                    details: hdOptimization.optimizations 
                });
            }
        }
        
        let finalSteps = steps;
        let finalGuidance = guidance;
        
        if (autoOptimize) {
            const stepsOptimization = ParameterOptimizer.optimizeSteps(model, finalWidth, finalHeight, style, qualityMode, steps);
            finalSteps = stepsOptimization.steps;
            logger.add("🎯 Steps Optimization", { steps: stepsOptimization.steps, reasoning: stepsOptimization.reasoning });
            
            if (guidance === null) {
                finalGuidance = ParameterOptimizer.optimizeGuidance(model, style, qualityMode);
            } else {
                finalGuidance = guidance;
            }
        } else {
            finalSteps = steps || 20;
            finalGuidance = guidance || 7.5;
        }
        
        const { enhancedPrompt, enhancedNegative } = StyleProcessor.applyStyle(finalPrompt, style, finalNegativePrompt);
        
        const translation = await translateToEnglish(enhancedPrompt, this.env);
        const finalPromptForAPI = translation.text;
        
        if (translation.translated) {
            logger.add("🌐 Auto Translation", { 
                original_zh: translation.original,
                translated_en: finalPromptForAPI,
                success: true
            });
        }
        
        const modelsToTry = [model];
        if (modelConfig?.experimental && modelConfig?.fallback) {
            modelsToTry.push(...modelConfig.fallback);
        }
        
        logger.add("🎨 Generation Config", { 
            provider: this.name, 
            model: model, 
            dimensions: finalWidth + "x" + finalHeight,
            is_4k: finalWidth >= 4096 || finalHeight >= 4096,
            quality_mode: qualityMode, 
            hd_optimized: autoHD && hdOptimization?.optimized, 
            auto_translated: translation.translated,
            reference_images: validReferenceImages.length,
            generation_mode: validReferenceImages.length > 0 ? (validReferenceImages.length === 1 ? "圖生圖" : "多圖融合") : "文生圖",
            steps: finalSteps, 
            guidance: finalGuidance 
        });
        
        const currentSeed = seed === -1 ? Math.floor(Math.random() * 1000000) : seed;
        let fullPrompt = finalPromptForAPI;
        if (enhancedNegative && enhancedNegative.trim()) {
            fullPrompt = finalPromptForAPI + " [negative: " + enhancedNegative + "]";
        }
        
        const encodedPrompt = encodeURIComponent(fullPrompt);
        
        for (const tryModel of modelsToTry) {
            for (let retry = 0; retry < CONFIG.MAX_RETRIES; retry++) {
                try {
                    let url = this.config.endpoint + "/prompt/" + encodedPrompt;
                    const params = new URLSearchParams();
                    params.append('model', tryModel);
                    params.append('width', finalWidth.toString());
                    params.append('height', finalHeight.toString());
                    params.append('seed', currentSeed.toString());
                    params.append('nologo', nologo.toString());
                    params.append('enhance', enhance.toString());
                    params.append('private', privateMode.toString());
                    
                    if (validReferenceImages && validReferenceImages.length > 0) {
                        params.append('image', validReferenceImages.join(','));
                        logger.add("🖼️ Reference Images Added", { 
                            count: validReferenceImages.length,
                            urls: validReferenceImages 
                        });
                    }
                    
                    if (finalGuidance !== 7.5) params.append('guidance', finalGuidance.toString());
                    if (finalSteps !== 20) params.append('steps', finalSteps.toString());
                    url += '?' + params.toString();
                    
                    const response = await fetchWithTimeout(url, { 
                        method: 'GET', 
                        headers: { 
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 
                            'Accept': 'image/*,*/*', 
                            'Accept-Encoding': 'gzip, deflate, br', 
                            'Connection': 'keep-alive', 
                            'Referer': 'https://pollinations.ai/' 
                        } 
                    }, 90000);
                    
                    if (response.ok) {
                        const contentType = response.headers.get('content-type');
                        if (contentType && contentType.startsWith('image/')) {
                            logger.add("✅ Success", { 
                                url: response.url, 
                                used_model: tryModel, 
                                final_size: finalWidth + "x" + finalHeight,
                                is_4k: finalWidth >= 4096 || finalHeight >= 4096,
                                quality_mode: qualityMode, 
                                hd_optimized: autoHD && hdOptimization?.optimized, 
                                auto_translated: translation.translated,
                                reference_images_used: validReferenceImages.length,
                                generation_mode: validReferenceImages.length > 0 ? (validReferenceImages.length === 1 ? "圖生圖" : "多圖融合") : "文生圖",
                                seed: currentSeed 
                            });
                            
                            return { 
                                url: response.url, 
                                provider: this.name, 
                                model: tryModel, 
                                requested_model: model, 
                                seed: currentSeed, 
                                style: style, 
                                steps: finalSteps, 
                                guidance: finalGuidance, 
                                width: finalWidth, 
                                height: finalHeight,
                                is_4k: finalWidth >= 4096 || finalHeight >= 4096,
                                quality_mode: qualityMode, 
                                prompt_complexity: promptComplexity, 
                                hd_optimized: autoHD && hdOptimization?.optimized, 
                                hd_details: hdOptimization, 
                                auto_translated: translation.translated,
                                reference_images: validReferenceImages,
                                reference_images_count: validReferenceImages.length,
                                generation_mode: validReferenceImages.length > 0 ? (validReferenceImages.length === 1 ? "圖生圖" : "多圖融合") : "文生圖",
                                cost: "FREE", 
                                fallback_used: tryModel !== model, 
                                auto_optimized: autoOptimize 
                            };
                        } else {
                            throw new Error("Invalid content type: " + contentType);
                        }
                    } else {
                        throw new Error("HTTP " + response.status);
                    }
                } catch (e) {
                    if (retry < CONFIG.MAX_RETRIES - 1) {
                        await new Promise(resolve => setTimeout(resolve, 1000 * (retry + 1)));
                    }
                }
            }
        }
        throw new Error("All models failed");
    }
}

class MultiProviderRouter {
    constructor(apiKeys = {}, env = null) {
        this.providers = {};
        this.apiKeys = apiKeys;
        this.env = env;
        for (const [key, config] of Object.entries(CONFIG.PROVIDERS)) {
            if (config.enabled) {
                if (key === 'pollinations') {
                    this.providers[key] = new PollinationsProvider(config, env);
                }
            }
        }
    }
    
    getProvider(providerName = null) {
        if (providerName && this.providers[providerName]) {
            return { name: providerName, instance: this.providers[providerName] };
        }
        const defaultName = CONFIG.DEFAULT_PROVIDER;
        if (this.providers[defaultName]) {
            return { name: defaultName, instance: this.providers[defaultName] };
        }
        const firstProvider = Object.keys(this.providers)[0];
        if (firstProvider) {
            return { name: firstProvider, instance: this.providers[firstProvider] };
        }
        throw new Error('No available provider');
    }
    
    async generate(prompt, options, logger) {
        const { provider: requestedProvider = null, numOutputs = 1 } = options;
        const { name: providerName, instance: provider } = this.getProvider(requestedProvider);
        const results = [];
        for (let i = 0; i < numOutputs; i++) {
            const currentOptions = { ...options, seed: options.seed === -1 ? -1 : options.seed + i };
            const result = await provider.generate(prompt, currentOptions, logger);
            results.push(result);
        }
        return results;
    }
}

function corsHeaders(additionalHeaders = {}) {
    return { 
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With', 
        'Access-Control-Max-Age': '86400', 
        ...additionalHeaders 
    };
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }
    try {
      if (url.pathname === '/') {
        return handleUI(request);
      } else if (url.pathname === '/v1/chat/completions') {
        return handleChatCompletions(request, env);
      } else if (url.pathname === '/v1/images/generations') {
        return handleImageGenerations(request, env);
      } else if (url.pathname === '/v1/models') {
        return handleModelsRequest();
      } else if (url.pathname === '/v1/providers') {
        return handleProvidersRequest();
      } else if (url.pathname === '/v1/styles') {
        return handleStylesRequest();
      } else if (url.pathname === '/health') {
        return new Response(JSON.stringify({ 
          status: 'ok', 
          version: CONFIG.PROJECT_VERSION, 
          timestamp: new Date().toISOString(),
          features: [
            '圖生圖 (Image-to-Image)',
            '多圖融合 (Multi-Image Fusion)',
            '4K Ultra HD Support',
            'Generation Timer',
            'Full History',
            '17 Models',
            '8 Styles',
            'FLUX Official Params',
            'Smart Optimization'
          ]
        }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
      } else {
        return new Response(JSON.stringify({ 
          project: CONFIG.PROJECT_NAME, 
          version: CONFIG.PROJECT_VERSION, 
          features: [
            '17 Models', 
            '8 Styles', 
            '4 Quality Modes', 
            'Image-to-Image 🎨',
            'Multi-Image Fusion 🖼️',
            'Smart Analysis', 
            'Auto HD', 
            '4K Support 🍌',
            'Generation Timer ⏱️',
            'Full History 📜',
            'Auto Translation'
          ], 
          endpoints: [
            '/v1/images/generations', 
            '/v1/chat/completions', 
            '/v1/models', 
            '/v1/providers', 
            '/v1/styles', 
            '/health'
          ] 
        }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
      }
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({ 
        error: { 
          message: error.message, 
          type: 'worker_error' 
        } 
      }), { 
        status: 500, 
        headers: corsHeaders({ 'Content-Type': 'application/json' }) 
      });
    }
  }
};

async function handleChatCompletions(request, env) {
    const logger = new Logger();
    try {
        const body = await request.json();
        const isWebUI = body.is_web_ui === true;
        const messages = body.messages || [];
        const lastMsg = messages[messages.length - 1];
        if (!lastMsg) throw new Error("No messages found");
        
        let prompt = "";
        if (typeof lastMsg.content === 'string') {
            prompt = lastMsg.content;
        } else if (Array.isArray(lastMsg.content)) {
            for (const part of lastMsg.content) {
                if (part.type === 'text') prompt += part.text + " ";
            }
        }
        prompt = prompt.trim();
        if (!prompt) throw new Error("Empty prompt");
        
        let referenceImages = [];
        if (body.reference_images && Array.isArray(body.reference_images)) {
            referenceImages = body.reference_images.filter(url => {
                try {
                    new URL(url);
                    return true;
                } catch {
                    return false;
                }
            });
        }
        
        const options = { 
            provider: body.provider || null, 
            model: body.model || "flux", 
            width: body.width || 1024, 
            height: body.height || 1024, 
            numOutputs: Math.min(Math.max(body.n || 1, 1), 4), 
            seed: body.seed !== undefined ? body.seed : -1, 
            negativePrompt: body.negative_prompt || "", 
            guidance: body.guidance_scale || null, 
            steps: body.steps || null, 
            enhance: body.enhance === true, 
            nologo: body.nologo !== false, 
            privateMode: body.private !== false, 
            style: body.style || "none", 
            autoOptimize: body.auto_optimize !== false, 
            autoHD: body.auto_hd !== false, 
            qualityMode: body.quality_mode || 'standard',
            referenceImages: referenceImages
        };
        
        const router = new MultiProviderRouter({}, env);
        const results = await router.generate(prompt, options, logger);
        
        let respContent = "";
        results.forEach((result, index) => { 
            respContent += "![Generated Image " + (index + 1) + "](" + result.url + ")\n"; 
        });
        
        const respId = "chatcmpl-" + crypto.randomUUID();
        
        if (body.stream) {
            const { readable, writable } = new TransformStream();
            const writer = writable.getWriter();
            const encoder = new TextEncoder();
            (async () => {
                try {
                    if (isWebUI) await writer.write(encoder.encode("data: " + JSON.stringify({ debug: logger.get() }) + "\n\n"));
                    const chunk = { 
                        id: respId, 
                        object: 'chat.completion.chunk', 
                        created: Math.floor(Date.now()/1000), 
                        model: options.model, 
                        choices: [{ index: 0, delta: { content: respContent }, finish_reason: null }] 
                    };
                    await writer.write(encoder.encode("data: " + JSON.stringify(chunk) + "\n\n"));
                    const endChunk = { 
                        id: respId, 
                        object: 'chat.completion.chunk', 
                        created: Math.floor(Date.now()/1000), 
                        model: options.model, 
                        choices: [{ index: 0, delta: {}, finish_reason: 'stop' }] 
                    };
                    await writer.write(encoder.encode("data: " + JSON.stringify(endChunk) + "\n\n"));
                    await writer.write(encoder.encode('data: [DONE]\n\n'));
                } finally {
                    await writer.close();
                }
            })();
            return new Response(readable, { headers: corsHeaders({ 'Content-Type': 'text/event-stream' }) });
        } else {
            return new Response(JSON.stringify({ 
                id: respId, 
                object: "chat.completion", 
                created: Math.floor(Date.now() / 1000), 
                model: options.model, 
                choices: [{ 
                    index: 0, 
                    message: { role: "assistant", content: respContent }, 
                    finish_reason: "stop" 
                }] 
            }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
        }
    } catch (e) {
        logger.add("❌ Error", e.message);
        return new Response(JSON.stringify({ 
            error: { 
                message: e.message, 
                debug_logs: logger.get() 
            } 
        }), { 
            status: 500, 
            headers: corsHeaders({ 'Content-Type': 'application/json' }) 
        });
    }
}

async function handleImageGenerations(request, env) {
    const logger = new Logger();
    try {
        const body = await request.json();
        const prompt = body.prompt;
        if (!prompt || !prompt.trim()) throw new Error("Prompt is required");
        
        let width = 1024, height = 1024;
        if (body.size) {
            const [w, h] = body.size.split('x').map(Number);
            if (w && h) { width = w; height = h; }
        }
        if (body.width) width = body.width;
        if (body.height) height = body.height;
        
        let referenceImages = [];
        if (body.reference_images && Array.isArray(body.reference_images)) {
            referenceImages = body.reference_images.filter(url => {
                try {
                    new URL(url);
                    return true;
                } catch {
                    return false;
                }
            });
        }
        
        const options = { 
            provider: body.provider || null, 
            model: body.model || "flux", 
            width: Math.min(Math.max(width, 256), 4096), 
            height: Math.min(Math.max(height, 256), 4096), 
            numOutputs: Math.min(Math.max(body.n || 1, 1), 4), 
            seed: body.seed !== undefined ? body.seed : -1, 
            negativePrompt: body.negative_prompt || "", 
            guidance: body.guidance_scale || null, 
            steps: body.steps || null, 
            enhance: body.enhance === true, 
            nologo: body.nologo !== false, 
            privateMode: body.private !== false, 
            style: body.style || "none", 
            autoOptimize: body.auto_optimize !== false, 
            autoHD: body.auto_hd !== false, 
            qualityMode: body.quality_mode || 'standard',
            referenceImages: referenceImages
        };
        
        const router = new MultiProviderRouter({}, env);
        const results = await router.generate(prompt, options, logger);
        
        return new Response(JSON.stringify({ 
            created: Math.floor(Date.now() / 1000), 
            data: results.map(r => ({ 
                url: r.url, 
                provider: r.provider, 
                model: r.model, 
                seed: r.seed, 
                width: r.width, 
                height: r.height,
                is_4k: r.is_4k,
                reference_images: r.reference_images || [],
                reference_images_count: r.reference_images_count || 0,
                generation_mode: r.generation_mode || "文生圖",
                style: r.style, 
                quality_mode: r.quality_mode, 
                prompt_complexity: r.prompt_complexity, 
                steps: r.steps, 
                guidance: r.guidance, 
                auto_optimized: r.auto_optimized, 
                hd_optimized: r.hd_optimized, 
                auto_translated: r.auto_translated,
                cost: r.cost 
            })) 
        }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
    } catch (e) {
        logger.add("❌ Error", e.message);
        return new Response(JSON.stringify({ 
            error: { 
                message: e.message, 
                debug_logs: logger.get() 
            } 
        }), { 
            status: 500, 
            headers: corsHeaders({ 'Content-Type': 'application/json' }) 
        });
    }
}

function handleModelsRequest() {
    const models = [];
    for (const [providerKey, providerConfig] of Object.entries(CONFIG.PROVIDERS)) {
        if (providerConfig.enabled && providerConfig.models) {
            for (const model of providerConfig.models) {
                models.push({ 
                    id: model.id, 
                    object: 'model', 
                    name: model.name, 
                    provider: providerKey, 
                    category: model.category, 
                    confirmed: model.confirmed || false, 
                    experimental: model.experimental || false, 
                    description: model.description,
                    max_size: model.max_size || 2048,
                    ultra_hd: model.ultra_hd || false,
                    supports_reference_images: model.supports_reference_images || false,
                    max_reference_images: model.max_reference_images || 0
                });
            }
        }
    }
    return new Response(JSON.stringify({ 
        object: 'list', 
        data: models, 
        total: models.length 
    }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
}

function handleProvidersRequest() {
    const providers = {};
    for (const [key, config] of Object.entries(CONFIG.PROVIDERS)) {
        providers[key] = { 
            name: config.name, 
            endpoint: config.endpoint, 
            auth_mode: config.auth_mode, 
            enabled: config.enabled, 
            features: config.features 
        };
    }
    return new Response(JSON.stringify({ 
        object: 'list', 
        data: providers 
    }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
}

function handleStylesRequest() {
    const styles = Object.entries(CONFIG.STYLE_PRESETS).map(([key, value]) => ({ 
        id: key, 
        name: value.name, 
        prompt_addition: value.prompt, 
        negative_addition: value.negative
    }));
    return new Response(JSON.stringify({ 
        object: 'list', 
        data: styles 
    }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
}

function handleUI() {
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Flux AI Pro v${CONFIG.PROJECT_VERSION}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;background:linear-gradient(135deg,#0a0a0a 0%,#1a1a2e 100%);color:#fff;padding:20px;min-height:100vh}.container{max-width:1400px;margin:0 auto}
.header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:15px}
.header-left{flex:1}
h1{color:#f59e0b;margin:0;font-size:36px;font-weight:800;text-shadow:0 0 30px rgba(245,158,11,0.6)}
.badge{background:linear-gradient(135deg,#10b981 0%,#059669 100%);padding:6px 14px;border-radius:20px;font-size:14px;margin-left:10px}
.badge-new{background:linear-gradient(135deg,#ec4899 0%,#db2777 100%);padding:4px 10px;border-radius:12px;font-size:11px;font-weight:700;margin-left:8px}
.subtitle{color:#9ca3af;margin-top:8px;font-size:15px}
.history-btn{background:linear-gradient(135deg,#8b5cf6 0%,#7c3aed 100%);color:#fff;border:none;padding:12px 24px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:8px;transition:all 0.3s;position:relative}
.history-btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(139,92,246,0.4)}
.history-badge{position:absolute;top:-8px;right:-8px;background:#ef4444;color:#fff;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:20px 0}@media (max-width:768px){.grid{grid-template-columns:1fr}}
.box{background:rgba(26,26,26,0.95);padding:24px;border-radius:16px;border:1px solid rgba(255,255,255,0.1)}h3{color:#f59e0b;margin-bottom:18px;font-size:18px;font-weight:700}label{display:block;margin:16px 0 8px 0;color:#e5e7eb;font-weight:600;font-size:13px}
select,textarea,input{width:100%;padding:12px;margin:0;background:#2a2a2a;border:1px solid #444;color:#fff;border-radius:10px;font-size:14px;font-family:inherit;transition:all 0.3s}select:focus,textarea:focus,input:focus{outline:none;border-color:#f59e0b;box-shadow:0 0 0 3px rgba(245,158,11,0.15)}textarea{resize:vertical;min-height:90px}
button{width:100%;padding:16px;background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#fff;border:none;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;margin-top:20px;transition:all 0.3s;box-shadow:0 4px 15px rgba(245,158,11,0.4)}button:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(245,158,11,0.6)}button:disabled{background:#555;cursor:not-allowed;transform:none;box-shadow:none}
.ref-img-section{background:rgba(236,72,153,0.1);border:2px dashed #ec4899;padding:15px;border-radius:10px;margin-top:15px}
.ref-img-list{display:flex;gap:10px;flex-wrap:wrap;margin-top:10px}
.ref-img-item{position:relative;width:80px;height:80px}
.ref-img-item img{width:100%;height:100%;object-fit:cover;border-radius:8px;border:2px solid #ec4899}
.ref-img-remove{position:absolute;top:-8px;right:-8px;background:#ef4444;color:#fff;border:none;border-radius:50%;width:24px;height:24px;cursor:pointer;font-size:14px;font-weight:700}
.tag-mode{display:inline-block;background:linear-gradient(135deg,#ec4899 0%,#db2777 100%);color:#fff;padding:3px 10px;border-radius:6px;font-size:11px;font-weight:700;margin-left:6px}
.result-meta{background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);padding:8px 12px;border-radius:8px;margin-top:8px;font-size:12px;color:#10b981}
.tag-4k{display:inline-block;background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#000;padding:2px 8px;border-radius:6px;font-size:10px;font-weight:700;margin-left:6px}
.timer{color:#10b981;font-weight:700;margin-left:8px}
.modal{display:none;position:fixed;z-index:1000;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,0.8);overflow:auto}
.modal-content{background:#1a1a2e;margin:5% auto;padding:30px;border-radius:16px;max-width:900px;border:2px solid #f59e0b}
.modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
.close{color:#9ca3af;font-size:32px;font-weight:700;cursor:pointer;transition:all 0.3s}
.close:hover{color:#f59e0b}
.history-item{background:rgba(255,255,255,0.05);padding:15px;border-radius:10px;margin-bottom:15px;border:1px solid rgba(255,255,255,0.1);transition:all 0.3s}
.history-item:hover{background:rgba(255,255,255,0.08);border-color:rgba(245,158,11,0.3)}
.history-img{width:100px;height:100px;object-fit:cover;border-radius:8px;cursor:pointer}
.history-info{color:#9ca3af;font-size:12px;margin-top:5px}
.history-actions{display:flex;gap:10px;margin-top:10px}
.history-actions button{padding:8px 16px;font-size:12px;margin:0}
</style>
</head>
<body>
<div class="container">
<div class="header">
<div class="header-left">
<h1>🎨 Flux AI Pro<span class="badge">v${CONFIG.PROJECT_VERSION}</span><span class="badge-new">圖生圖 🎨</span></h1>
<p class="subtitle">圖生圖 · 多圖融合 · 4K超清 · FLUX官方參數</p>
</div>
<button onclick="toggleHistory()" class="history-btn">📜 歷史<span id="historyBadge" class="history-badge" style="display:none">0</span></button>
</div>

<div class="grid">
<div class="box">
<h3>📝 生成設置</h3>
<label>提示詞 *</label>
<textarea id="prompt" placeholder="描述你想要的圖片..."></textarea>
<label>負面提示詞</label>
<textarea id="negativePrompt" placeholder="low quality, blurry"></textarea>

<div class="ref-img-section">
<label>🖼️ 參考圖 (圖生圖/多圖融合)</label>
<input type="text" id="refImageUrl" placeholder="輸入圖片 URL 後按 Enter 添加">
<div class="ref-img-list" id="refImageList"></div>
<small style="color:#9ca3af;font-size:11px">kontext: 最多1張 | nanobanana: 最多4張</small>
</div>

<label>AI 模型</label>
<select id="model" onchange="updateRefImageLimit()">
<optgroup label="⚡ Flux 系列">
<option value="flux">Flux (均衡)</option>
<option value="flux-realism">Flux Realism (超寫實)</option>
<option value="flux-anime">Flux Anime (動漫)</option>
<option value="flux-pro">Flux Pro (專業版)</option>
<option value="turbo">Turbo (極速)</option>
</optgroup>
<optgroup label="🎨 圖像編輯">
<option value="flux-kontext">Kontext 🎨 (1張參考圖)</option>
<option value="flux-kontext-pro">Kontext Pro 💎 (1張參考圖)</option>
</optgroup>
<optgroup label="🍌 Nano Banana">
<option value="nanobanana">Nano Banana 🍌 (4張參考圖)</option>
<option value="nanobanana-pro">Nano Banana Pro 🍌💎 (4K+4張)</option>
</optgroup>
</select>
<label>藝術風格</label>
<select id="style">
<option value="none">無</option>
${Object.entries(CONFIG.STYLE_PRESETS).map(([k,v])=>'<option value="' + k + '">' + v.name + '</option>').join('')}
</select>
</div>

<div class="box">
<h3>🎨 圖像參數</h3>
<label>尺寸預設</label>
<select id="sizePreset" onchange="applySizePreset()">
${Object.entries(CONFIG.PRESET_SIZES).map(([k,v])=>'<option value="' + k + '">' + v.name + (v.exclusive?' 🍌':'') + '</option>').join('')}
</select>
<label>寬度: <span id="widthValue">1024</span>px</label>
<input type="range" id="width" min="256" max="4096" step="64" value="1024">
<label>高度: <span id="heightValue">1024</span>px</label>
<input type="range" id="height" min="256" max="4096" step="64" value="1024">
<label>質量模式</label>
<select id="qualityMode">
<option value="economy">⚡ 經濟</option>
<option value="standard" selected>⭐ 標準</option>
<option value="ultra">💎 超高清</option>
<option value="ultra_4k">🍌 4K超高清</option>
</select>
<button onclick="generate()">🚀 開始生成</button>
</div>
</div>

<div id="result"></div>
</div>

<div id="historyModal" class="modal">
<div class="modal-content">
<div class="modal-header">
<h2>📜 生成歷史</h2>
<span class="close" onclick="closeHistory()">&times;</span>
</div>
<div style="display:flex;justify-content:space-between;margin-bottom:20px">
<button onclick="clearHistory()" style="width:auto;background:#ef4444">🗑️ 清空歷史</button>
</div>
<div id="historyList"></div>
</div>
</div>

<script>
const PRESETS=${JSON.stringify(CONFIG.PRESET_SIZES)};
let generationHistory=[];
let referenceImages=[];

document.getElementById('refImageUrl').addEventListener('keypress',function(e){
if(e.key==='Enter'){
const url=this.value.trim();
if(url){
try{
new URL(url);
const model=document.getElementById('model').value;
const maxRef=getMaxReferenceImages(model);
if(referenceImages.length>=maxRef){
alert('此模型最多支持 '+maxRef+' 張參考圖');
return;
}
referenceImages.push(url);
this.value='';
renderReferenceImages();
}catch{
alert('請輸入有效的圖片 URL');
}
}
}
});

function getMaxReferenceImages(model){
const config=${JSON.stringify(CONFIG.PROVIDERS.pollinations.models)};
const m=config.find(x=>x.id===model);
return m?.max_reference_images||0;
}

function updateRefImageLimit(){
const model=document.getElementById('model').value;
const maxRef=getMaxReferenceImages(model);
const section=document.querySelector('.ref-img-section small');
if(maxRef>0){
section.textContent='此模型最多支持 '+maxRef+' 張參考圖';
section.style.color='#10b981';
}else{
section.textContent='此模型不支持參考圖';
section.style.color='#ef4444';
}
}

function renderReferenceImages(){
const list=document.getElementById('refImageList');
list.innerHTML='';
referenceImages.forEach((url,index)=>{
const div=document.createElement('div');
div.className='ref-img-item';
div.innerHTML='<img src="'+url+'"><button class="ref-img-remove" onclick="removeRefImage('+index+')">×</button>';
list.appendChild(div);
});
}

function removeRefImage(index){
referenceImages.splice(index,1);
renderReferenceImages();
}

function loadHistory(){
try{
const saved=localStorage.getItem('flux_ai_history');
if(saved){
generationHistory=JSON.parse(saved);
updateHistoryBadge();
}
}catch(e){console.error('Load history error:',e);}
}

function saveHistory(){
try{
localStorage.setItem('flux_ai_history',JSON.stringify(generationHistory.slice(0,100)));
}catch(e){console.error('Save history error:',e);}
}

function addToHistory(item){
generationHistory.unshift({...item,timestamp:new Date().toISOString()});
if(generationHistory.length>100)generationHistory=generationHistory.slice(0,100);
saveHistory();
updateHistoryBadge();
}

function updateHistoryBadge(){
const badge=document.getElementById('historyBadge');
if(generationHistory.length>0){
badge.textContent=generationHistory.length;
badge.style.display='flex';
}else{
badge.style.display='none';
}
}

function toggleHistory(){
const modal=document.getElementById('historyModal');
modal.style.display='block';
renderHistory();
}

function closeHistory(){
document.getElementById('historyModal').style.display='none';
}

function renderHistory(){
const list=document.getElementById('historyList');
if(generationHistory.length===0){
list.innerHTML='<p style="text-align:center;color:#9ca3af">暫無歷史記錄</p>';
return;
}
list.innerHTML='';
generationHistory.forEach((item,index)=>{
const div=document.createElement('div');
div.className='history-item';
const modeTag=item.generation_mode?'<span class="tag-mode">'+item.generation_mode+'</span>':'';
const refCount=item.reference_images_count>0?' | '+item.reference_images_count+'張參考圖':'';
div.innerHTML='<div style="display:flex;gap:15px"><img src="'+item.url+'" class="history-img" onclick="window.open(\\''+item.url+'\\')"><div style="flex:1"><p style="color:#f59e0b;font-weight:600">'+item.prompt.substring(0,50)+'...'+modeTag+'</p><div class="history-info">'+item.model+' | '+item.width+'x'+item.height+refCount+' | '+(item.duration||'N/A')+'</div><div class="history-info">'+new Date(item.timestamp).toLocaleString('zh-TW')+'</div><div class="history-actions"><button onclick="regenFromHistory('+index+')">🔄 重新生成</button><button onclick="deleteHistory('+index+')" style="background:#ef4444">🗑️ 刪除</button></div></div></div>';
list.appendChild(div);
});
}

function regenFromHistory(index){
const item=generationHistory[index];
document.getElementById('prompt').value=item.prompt;
document.getElementById('model').value=item.model;
document.getElementById('width').value=item.width;
document.getElementById('height').value=item.height;
document.getElementById('widthValue').textContent=item.width;
document.getElementById('heightValue').textContent=item.height;
if(item.negative_prompt)document.getElementById('negativePrompt').value=item.negative_prompt;
if(item.style)document.getElementById('style').value=item.style;
if(item.quality_mode)document.getElementById('qualityMode').value=item.quality_mode;
if(item.reference_images){
referenceImages=item.reference_images;
renderReferenceImages();
}
closeHistory();
alert('已載入歷史配置,點擊生成按鈕即可!');
}

function deleteHistory(index){
if(confirm('確定刪除此記錄?')){
generationHistory.splice(index,1);
saveHistory();
updateHistoryBadge();
renderHistory();
}
}

function clearHistory(){
if(confirm('確定清空所有歷史記錄?')){
generationHistory=[];
saveHistory();
updateHistoryBadge();
renderHistory();
}
}

function applySizePreset(){
const preset=PRESETS[document.getElementById('sizePreset').value];
if(preset){
document.getElementById('width').value=preset.width;
document.getElementById('height').value=preset.height;
document.getElementById('widthValue').textContent=preset.width;
document.getElementById('heightValue').textContent=preset.height;
}
}

document.getElementById('width').oninput=function(){document.getElementById('widthValue').textContent=this.value;};
document.getElementById('height').oninput=function(){document.getElementById('heightValue').textContent=this.value;};

window.onclick=function(event){
const modal=document.getElementById('historyModal');
if(event.target===modal)modal.style.display='none';
};

async function generate(){
const prompt=document.getElementById('prompt').value.trim();
if(!prompt){alert('請輸入提示詞');return;}

const params={
prompt:prompt,
negative_prompt:document.getElementById('negativePrompt').value,
model:document.getElementById('model').value,
style:document.getElementById('style').value,
width:parseInt(document.getElementById('width').value),
height:parseInt(document.getElementById('height').value),
quality_mode:document.getElementById('qualityMode').value,
auto_optimize:true,
auto_hd:true,
reference_images:referenceImages
};

const resultDiv=document.getElementById('result');
const button=document.querySelector('button[onclick="generate()"]');
button.disabled=true;

const startTime=Date.now();
let timerInterval;
button.textContent='生成中 ⏱️ 0.0s';
timerInterval=setInterval(()=>{
const elapsed=((Date.now()-startTime)/1000).toFixed(1);
button.textContent='生成中 ⏱️ '+elapsed+'s';
},100);

try{
const response=await fetch('/v1/images/generations',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify(params)
});
const data=await response.json();
if(!response.ok)throw new Error(data.error?.message||'生成失敗');

const duration=((Date.now()-startTime)/1000).toFixed(1)+'s';
clearInterval(timerInterval);

resultDiv.innerHTML='<div style="background:rgba(16,185,129,0.15);border:1px solid #10b981;padding:16px;border-radius:12px;color:#10b981"><strong>✅ 生成成功!</strong><span class="timer">⏱️ '+duration+'</span></div>';
data.data.forEach(function(item,index){
const is4K=item.is_4k?'<span class="tag-4k">4K</span>':'';
const modeTag=item.generation_mode?'<span class="tag-mode">'+item.generation_mode+'</span>':'';
const imgDiv=document.createElement('div');
imgDiv.style.marginTop='20px';
imgDiv.innerHTML='<img src="'+item.url+'" style="width:100%;border-radius:12px;cursor:pointer"><div class="result-meta">'+item.model+' | '+item.width+'x'+item.height+is4K+modeTag+' | '+item.quality_mode+' | <span class="timer">⏱️ '+duration+'</span></div>';
imgDiv.querySelector('img').onclick=function(){window.open(item.url);};
resultDiv.appendChild(imgDiv);

addToHistory({
url:item.url,
prompt:params.prompt,
negative_prompt:params.negative_prompt,
model:item.model,
width:item.width,
height:item.height,
style:params.style,
quality_mode:params.quality_mode,
reference_images:item.reference_images||[],
reference_images_count:item.reference_images_count||0,
generation_mode:item.generation_mode||'文生圖',
duration:duration
});
});
}catch(error){
clearInterval(timerInterval);
resultDiv.innerHTML='<div style="background:rgba(239,68,68,0.15);border:1px solid #ef4444;padding:16px;border-radius:12px;color:#ef4444"><strong>❌ 錯誤:</strong> '+error.message+'</div>';
}finally{
button.disabled=false;
button.textContent='🚀 開始生成';
}
}

loadHistory();
updateRefImageLimit();
</script>
</body>
</html>`;
  return new Response(html, { headers: corsHeaders({ 'Content-Type': 'text/html; charset=utf-8' }) });
}

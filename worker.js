// =================================================================================
//  項目: Flux AI Pro
//  版本: 9.5.2-bytes (返回圖片字節數據)
//  作者: Enhanced by AI Assistant  
//  日期: 2025-12-17
//  更新: ✅ 返回圖片字節而非 URL | ✅ 支持單/多圖生成 | ✅ Base64 編碼
//  模型: zimage, flux, turbo, kontext (4個模型)
// =================================================================================

const CONFIG = {
  PROJECT_NAME: "Flux-AI-Pro",
  PROJECT_VERSION: "9.5.2-bytes",
  API_MASTER_KEY: "1",
  FETCH_TIMEOUT: 120000,
  MAX_RETRIES: 3,
  
  POLLINATIONS_AUTH: {
    enabled: false,
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
    "wallpaper-fhd": { name: "桌布 Full HD", width: 1920, height: 1080 }
  },
  
  PROVIDERS: {
    pollinations: {
      name: "Pollinations.ai",
      endpoint: "https://image.pollinations.ai",
      pathPrefix: "",
      type: "direct",
      auth_mode: "optional",
      requires_key: false,
      enabled: true,
      default: true,
      description: "官方 AI 圖像生成服務（基於官方模型列表）",
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
        reference_images: true,
        image_to_image: true,
        batch_generation: true,
        api_key_auth: true
      },
      models: [
        { 
          id: "zimage", 
          name: "Z-Image Turbo ⚡", 
          confirmed: true, 
          category: "zimage", 
          description: "快速 6B 參數圖像生成 (Alpha)", 
          max_size: 2048,
          pricing: { image_price: 0.0002, currency: "pollen" },
          input_modalities: ["text"],
          output_modalities: ["image"]
        },
        { 
          id: "flux", 
          name: "Flux 標準版", 
          confirmed: true, 
          category: "flux", 
          description: "快速且高質量的圖像生成", 
          max_size: 2048,
          pricing: { image_price: 0.00012, currency: "pollen" },
          input_modalities: ["text"],
          output_modalities: ["image"]
        },
        { 
          id: "turbo", 
          name: "Flux Turbo ⚡", 
          confirmed: true, 
          category: "flux", 
          description: "超快速圖像生成", 
          max_size: 2048,
          pricing: { image_price: 0.0003, currency: "pollen" },
          input_modalities: ["text"],
          output_modalities: ["image"]
        },
        { 
          id: "kontext", 
          name: "Kontext 🎨", 
          confirmed: true, 
          category: "kontext", 
          description: "上下文感知圖像生成（支持圖生圖）", 
          max_size: 2048,
          pricing: { image_price: 0.04, currency: "pollen" },
          supports_reference_images: true,
          max_reference_images: 1,
          input_modalities: ["text", "image"],
          output_modalities: ["image"]
        }
      ],
      rate_limit: null,
      max_size: { width: 2048, height: 2048 }
    }
  },
  
  DEFAULT_PROVIDER: "pollinations",
  
  STYLE_PRESETS: {
    none: { name: "無 (使用原始提示詞)", prompt: "", negative: "" },
    anime: { name: "動漫風格 ✨", prompt: "anime style, anime art, vibrant colors, anime character, detailed anime", negative: "realistic, photograph, 3d, ugly" },
    photorealistic: { name: "寫實照片 📷", prompt: "photorealistic, ultra realistic, 8k uhd, professional photography, detailed, sharp focus, DSLR, high resolution", negative: "anime, cartoon, illustration, painting, drawing, art" },
    "oil-painting": { name: "油畫 🎨", prompt: "oil painting, classical oil painting style, visible brushstrokes, rich colors, artistic, canvas texture", negative: "photograph, digital art, anime, flat" },
    watercolor: { name: "水彩畫 💧", prompt: "watercolor painting, soft colors, watercolor texture, artistic, hand-painted, paper texture, flowing colors", negative: "photograph, digital, sharp edges, 3d" },
    cyberpunk: { name: "賽博朋克 🌃", prompt: "cyberpunk style, neon lights, futuristic, sci-fi, dystopian, high-tech low-life, blade runner style", negative: "natural, rustic, medieval, fantasy" },
    fantasy: { name: "奇幻風格 🐉", prompt: "fantasy art, magical, epic fantasy, detailed fantasy illustration, mystical, enchanted", negative: "modern, realistic, mundane, contemporary" },
    "studio-ghibli": { name: "吉卜力風格 🍃", prompt: "Studio Ghibli style, Hayao Miyazaki, anime, soft colors, whimsical, detailed background, hand-drawn", negative: "realistic, dark, 3D, western animation" }
  },
  
  OPTIMIZATION_RULES: {
    MODEL_STEPS: {
      "zimage": { min: 8, optimal: 15, max: 25 },
      "flux": { min: 15, optimal: 20, max: 30 },
      "turbo": { min: 4, optimal: 8, max: 12 },
      "kontext": { min: 18, optimal: 25, max: 35 }
    },
    SIZE_MULTIPLIER: {
      small: { threshold: 512 * 512, multiplier: 0.8 },
      medium: { threshold: 1024 * 1024, multiplier: 1.0 },
      large: { threshold: 1536 * 1536, multiplier: 1.15 },
      xlarge: { threshold: 2048 * 2048, multiplier: 1.3 }
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
      economy: { name: "經濟模式", description: "快速出圖", min_resolution: 1024, max_resolution: 2048, steps_multiplier: 0.85, guidance_multiplier: 0.9, hd_level: "basic" },
      standard: { name: "標準模式", description: "平衡質量與速度", min_resolution: 1280, max_resolution: 2048, steps_multiplier: 1.0, guidance_multiplier: 1.0, hd_level: "enhanced" },
      ultra: { name: "超高清模式", description: "極致質量", min_resolution: 1536, max_resolution: 2048, steps_multiplier: 1.35, guidance_multiplier: 1.15, hd_level: "maximum", force_upscale: true }
    },
    HD_PROMPTS: {
      basic: "high quality, detailed, sharp",
      enhanced: "high quality, highly detailed, sharp focus, professional, 8k uhd",
      maximum: "masterpiece, best quality, ultra detailed, 8k uhd, high resolution, professional photography, sharp focus, HDR"
    },
    HD_NEGATIVE: "blurry, low quality, distorted, ugly, bad anatomy, low resolution, pixelated, artifacts, noise",
    MODEL_QUALITY_PROFILES: {
      "zimage": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.0, guidance_boost: 1.0, recommended_quality: "economy" },
      "flux": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.1, guidance_boost: 1.0, recommended_quality: "standard" },
      "turbo": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 0.9, guidance_boost: 0.95, recommended_quality: "economy" },
      "kontext": { min_resolution: 1280, max_resolution: 2048, optimal_steps_boost: 1.2, guidance_boost: 1.1, recommended_quality: "ultra" }
    }
  }
};

class Logger {
  constructor() {
    this.logs = [];
  }
  add(title, data) {
    this.logs.push({ title, data, timestamp: new Date().toISOString() });
  }
  get() {
    return this.logs;
  }
}

function getClientIP(request) {
  return request.headers.get('cf-connecting-ip') || 
         request.headers.get('x-forwarded-for') || 
         request.headers.get('x-real-ip') || 
         'unknown';
}
// =================================================================================
// 第 2 段：翻譯和優化功能類
// =================================================================================

async function translateToEnglish(text, env) {
    try {
        const hasChinese = /[\u4e00-\u9fa5]/.test(text);
        if (!hasChinese) return { text: text, translated: false, reason: "No Chinese detected" };
        if (!env || !env.AI) {
            console.warn("⚠️ Workers AI not configured");
            return { text: text, translated: false, reason: "AI not configured" };
        }
        try {
            const response = await env.AI.run("@cf/meta/m2m100", { text: text, source_lang: "chinese", target_lang: "english" });
            if (response && response.translated_text) {
                console.log("✅ Translation:", text, "→", response.translated_text);
                return { text: response.translated_text, translated: true, original: text, model: "m2m100" };
            }
        } catch (primaryError) {
            console.warn("⚠️ m2m100 failed:", primaryError.message);
            try {
                const response = await env.AI.run("@cf/meta/m2m100-1.2b", { text: text, source_lang: "chinese", target_lang: "english" });
                if (response && response.translated_text) {
                    return { text: response.translated_text, translated: true, original: text, model: "m2m100-1.2b" };
                }
            } catch (fallbackError) {
                console.error("❌ All translation failed");
            }
        }
        return { text: text, translated: false };
    } catch (error) {
        console.error("❌ translateToEnglish error:", error);
        return { text: text, translated: false, error: error.message };
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
        
        return { prompt: enhancedPrompt, negativePrompt: enhancedNegative, width: finalWidth, height: finalHeight, optimized: true, quality_mode: qualityMode, hd_level: hdLevel, optimizations: optimizations, size_upscaled: sizeUpscaled };
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
        
        if (totalPixels >= rules.SIZE_MULTIPLIER.xlarge.threshold) {
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
        return { steps: optimizedSteps, optimized: true, base_steps: baseSteps, size_multiplier: sizeMultiplier, style_multiplier: styleMultiplier, quality_multiplier: qualityMultiplier, profile_boost: profileBoost, min_steps: modelRule.min, max_steps: modelRule.max, reasoning: reasoning.join(' ') };
    }
    
    static optimizeGuidance(model, style, qualityMode = 'standard') {
        const modeConfig = CONFIG.HD_OPTIMIZATION.QUALITY_MODES[qualityMode];
        const profile = CONFIG.HD_OPTIMIZATION.MODEL_QUALITY_PROFILES[model];
        let baseGuidance = 7.5;
        
        if (model.includes('turbo')) {
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
        try {
            if (!style || style === 'none' || style === '') {
                return { enhancedPrompt: prompt, enhancedNegative: negativePrompt || "" };
            }
            if (!CONFIG.STYLE_PRESETS || typeof CONFIG.STYLE_PRESETS !== 'object') {
                console.warn("⚠️ STYLE_PRESETS not found");
                return { enhancedPrompt: prompt, enhancedNegative: negativePrompt || "" };
            }
            const styleConfig = CONFIG.STYLE_PRESETS[style];
            if (!styleConfig) {
                console.warn("⚠️ Style '" + style + "' not found");
                return { enhancedPrompt: prompt, enhancedNegative: negativePrompt || "" };
            }
            let enhancedPrompt = prompt;
            if (styleConfig.prompt && styleConfig.prompt.trim()) {
                enhancedPrompt = prompt + ", " + styleConfig.prompt;
            }
            let enhancedNegative = negativePrompt || "";
            if (styleConfig.negative && styleConfig.negative.trim()) {
                if (enhancedNegative && enhancedNegative.trim()) {
                    enhancedNegative = enhancedNegative + ", " + styleConfig.negative;
                } else {
                    enhancedNegative = styleConfig.negative;
                }
            }
            console.log("✅ Style applied:", style);
            return { enhancedPrompt: enhancedPrompt, enhancedNegative: enhancedNegative };
        } catch (error) {
            console.error("❌ StyleProcessor error:", error.message);
            return { enhancedPrompt: prompt, enhancedNegative: negativePrompt || "" };
        }
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

function corsHeaders(additionalHeaders = {}) {
    return { 
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With', 
        'Access-Control-Max-Age': '86400', 
        ...additionalHeaders 
    };
}
// =================================================================================
// 第 3 段：PollinationsProvider 核心生成類（返回圖片字節）
// =================================================================================

class PollinationsProvider {
    constructor(config, env) {
        this.config = config;
        this.name = config.name;
        this.env = env;
    }
    
    async generate(prompt, options, logger) {
        const { 
            model = "zimage", 
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
        
        let validReferenceImages = [];
        if (referenceImages && referenceImages.length > 0) {
            if (!supportsRefImages) {
                logger.add("⚠️ Reference Images", { 
                    warning: model + " 不支持參考圖,已忽略", 
                    supported_models: ["kontext"] 
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
                    mode: "圖生圖"
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
        
        logger.add("🎨 Style Processing", { 
            selected_style: style,
            style_applied: style !== 'none',
            original_prompt_length: finalPrompt.length,
            enhanced_prompt_length: enhancedPrompt.length,
            prompt_added: enhancedPrompt.length - finalPrompt.length
        });
        
        const translation = await translateToEnglish(enhancedPrompt, this.env);
        const finalPromptForAPI = translation.text;
        
        if (translation.translated) {
            logger.add("🌐 Auto Translation", { 
                original_zh: translation.original,
                translated_en: finalPromptForAPI.substring(0, 100) + (finalPromptForAPI.length > 100 ? '...' : ''),
                success: true,
                model: translation.model || "unknown"
            });
        } else {
            logger.add("⚠️ Translation", { 
                status: "skipped",
                reason: translation.reason || "Unknown",
                using_original: true
            });
        }
        
        logger.add("🎨 Generation Config", { 
            provider: this.name, 
            model: model, 
            dimensions: finalWidth + "x" + finalHeight,
            quality_mode: qualityMode, 
            hd_optimized: autoHD && hdOptimization?.optimized, 
            auto_translated: translation.translated,
            style_applied: style !== 'none',
            reference_images: validReferenceImages.length,
            generation_mode: validReferenceImages.length > 0 ? "圖生圖" : "文生圖",
            steps: finalSteps, 
            guidance: finalGuidance,
            seed: seed
        });
        
        const currentSeed = seed === -1 ? Math.floor(Math.random() * 1000000) : seed;
        let fullPrompt = finalPromptForAPI;
        if (enhancedNegative && enhancedNegative.trim()) {
            fullPrompt = finalPromptForAPI + " [negative: " + enhancedNegative + "]";
        }
        
        const encodedPrompt = encodeURIComponent(fullPrompt);
        
        const pathPrefix = this.config.pathPrefix || "";
        let baseUrl = this.config.endpoint + pathPrefix + "/prompt/" + encodedPrompt;
        
        const params = new URLSearchParams();
        params.append('model', model);
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
        
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'image/*',
            'Referer': 'https://pollinations.ai/'
        };
        
        const authConfig = CONFIG.POLLINATIONS_AUTH;
        if (authConfig.enabled && authConfig.token) {
            headers['Authorization'] = `Bearer ${authConfig.token}`;
            logger.add("🔐 API Authentication", { 
                method: "Bearer Token",
                token_prefix: authConfig.token.substring(0, 8) + "...",
                enabled: true
            });
        } else {
            logger.add("🔓 Anonymous Mode", { 
                authenticated: false,
                note: "未配置 API Key,使用匿名模式"
            });
        }
        
        const url = baseUrl + '?' + params.toString();
        
        logger.add("📡 API Request", { 
            endpoint: this.config.endpoint,
            path: pathPrefix + "/prompt/" + encodedPrompt.substring(0, 50) + "...",
            model: model,
            authenticated: authConfig.enabled
        });
        
        for (let retry = 0; retry < CONFIG.MAX_RETRIES; retry++) {
            try {
                const response = await fetchWithTimeout(url, { 
                    method: 'GET', 
                    headers: headers
                }, 120000);
                
                if (response.ok) {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.startsWith('image/')) {
                        logger.add("✅ Success", { 
                            url: response.url, 
                            used_model: model, 
                            final_size: finalWidth + "x" + finalHeight,
                            quality_mode: qualityMode, 
                            style_used: style,
                            hd_optimized: autoHD && hdOptimization?.optimized, 
                            auto_translated: translation.translated,
                            reference_images_used: validReferenceImages.length,
                            generation_mode: validReferenceImages.length > 0 ? "圖生圖" : "文生圖",
                            authenticated: authConfig.enabled,
                            seed: currentSeed 
                        });
                        
                        // ✅ 獲取圖片字節數據
                        const imageBlob = await response.blob();
                        const imageBuffer = await imageBlob.arrayBuffer();
                        
                        return { 
                            // ✅ 新增：返回圖片字節數據
                            imageData: imageBuffer,
                            contentType: contentType,
                            
                            // 保留原有信息
                            url: response.url, 
                            provider: this.name, 
                            model: model, 
                            requested_model: model, 
                            seed: currentSeed, 
                            style: style, 
                            steps: finalSteps, 
                            guidance: finalGuidance, 
                            width: finalWidth, 
                            height: finalHeight,
                            quality_mode: qualityMode, 
                            prompt_complexity: promptComplexity, 
                            hd_optimized: autoHD && hdOptimization?.optimized, 
                            hd_details: hdOptimization, 
                            auto_translated: translation.translated,
                            reference_images: validReferenceImages,
                            reference_images_count: validReferenceImages.length,
                            generation_mode: validReferenceImages.length > 0 ? "圖生圖" : "文生圖",
                            authenticated: authConfig.enabled,
                            cost: "FREE", 
                            auto_optimized: autoOptimize 
                        };
                    } else {
                        throw new Error("Invalid content type: " + contentType);
                    }
                } else {
                    throw new Error("HTTP " + response.status);
                }
            } catch (e) {
                logger.add("❌ Request Failed", { 
                    error: e.message, 
                    model: model, 
                    retry: retry + 1,
                    max_retries: CONFIG.MAX_RETRIES
                });
                
                if (retry < CONFIG.MAX_RETRIES - 1) {
                    await new Promise(resolve => setTimeout(resolve, 1000 * (retry + 1)));
                }
            }
        }
        throw new Error("Model " + model + " failed after " + CONFIG.MAX_RETRIES + " retries");
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
// =================================================================================
// 第 4 段：主入口和內部生成函數（返回圖片字節）
// =================================================================================

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const startTime = Date.now();
        const clientIP = getClientIP(request);
        
        if (env.POLLINATIONS_API_KEY) {
            CONFIG.POLLINATIONS_AUTH.enabled = true;
            CONFIG.POLLINATIONS_AUTH.token = env.POLLINATIONS_API_KEY;
        }
        
        console.log("=== Web UI Request ===");
        console.log("IP:", clientIP);
        console.log("Path:", url.pathname);
        console.log("Method:", request.method);
        console.log("Workers AI:", !!env.AI);
        console.log("API Auth:", CONFIG.POLLINATIONS_AUTH.enabled ? "✅ Enabled" : "❌ Disabled");
        console.log("=====================");
        
        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers: corsHeaders() });
        }
        
        try {
            let response;
            
            if (url.pathname === '/' || url.pathname === '') {
                response = handleUI(request);
            } else if (url.pathname === '/_internal/generate') {
                response = await handleInternalGenerate(request, env, ctx);
            } else if (url.pathname === '/health') {
                response = new Response(JSON.stringify({
                    status: 'ok',
                    version: CONFIG.PROJECT_VERSION,
                    timestamp: new Date().toISOString(),
                    workers_ai: !!env.AI,
                    api_auth: {
                        enabled: CONFIG.POLLINATIONS_AUTH.enabled,
                        method: CONFIG.POLLINATIONS_AUTH.method,
                        has_token: !!CONFIG.POLLINATIONS_AUTH.token
                    },
                    models: CONFIG.PROVIDERS.pollinations.models.map(m => ({
                        id: m.id,
                        name: m.name,
                        category: m.category,
                        supports_reference_images: m.supports_reference_images || false
                    }))
                }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
            } else {
                response = new Response(JSON.stringify({
                    error: 'Not Found',
                    message: '此 Worker 僅提供 Web UI 界面',
                    available_paths: ['/', '/health']
                }), { 
                    status: 404,
                    headers: corsHeaders({ 'Content-Type': 'application/json' }) 
                });
            }
            
            const duration = Date.now() - startTime;
            const headers = new Headers(response.headers);
            headers.set('X-Response-Time', duration + 'ms');
            headers.set('X-Worker-Version', CONFIG.PROJECT_VERSION);
            headers.set('X-API-Endpoint', CONFIG.PROVIDERS.pollinations.endpoint);
            headers.set('X-API-Authenticated', CONFIG.POLLINATIONS_AUTH.enabled ? 'true' : 'false');
            
            return new Response(response.body, { status: response.status, headers: headers });
        } catch (error) {
            const duration = Date.now() - startTime;
            console.error('Worker error:', error);
            return new Response(JSON.stringify({
                error: {
                    message: error.message,
                    type: 'worker_error',
                    timestamp: new Date().toISOString()
                }
            }), {
                status: 500,
                headers: corsHeaders({ 'Content-Type': 'application/json' })
            });
        }
    }
};

async function handleInternalGenerate(request, env, ctx) {
    const logger = new Logger();
    const startTime = Date.now();
    
    try {
        const body = await request.json();
        const prompt = body.prompt;
        if (!prompt || !prompt.trim()) throw new Error("Prompt is required");
        
        let width = 1024, height = 1024;
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
        
        const seedInput = body.seed !== undefined ? body.seed : -1;
        let seedValue = -1;
        if (seedInput !== -1) {
            const parsedSeed = parseInt(seedInput);
            if (!isNaN(parsedSeed) && parsedSeed >= 0 && parsedSeed <= 999999) {
                seedValue = parsedSeed;
            }
        }
        
        const options = { 
            provider: body.provider || null, 
            model: body.model || "zimage", 
            width: Math.min(Math.max(width, 256), 2048), 
            height: Math.min(Math.max(height, 256), 2048), 
            numOutputs: Math.min(Math.max(body.n || 1, 1), 4), 
            seed: seedValue,
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
        
        const duration = Date.now() - startTime;
        
        // ✅ 如果只生成一張圖片，直接返回圖片字節
        if (results.length === 1 && results[0].imageData) {
            const result = results[0];
            
            return new Response(result.imageData, {
                headers: {
                    'Content-Type': result.contentType || 'image/png',
                    'Content-Disposition': `inline; filename="flux-ai-${result.seed}.png"`,
                    'X-Model': result.model,
                    'X-Seed': result.seed.toString(),
                    'X-Width': result.width.toString(),
                    'X-Height': result.height.toString(),
                    'X-Generation-Time': duration + 'ms',
                    'X-Quality-Mode': result.quality_mode,
                    'X-Style': result.style,
                    'X-Generation-Mode': result.generation_mode || '文生圖',
                    'X-Authenticated': result.authenticated ? 'true' : 'false',
                    ...corsHeaders()
                }
            });
        }
        
        // ✅ 如果生成多張圖片，返回 JSON（包含 base64 編碼的圖片）
        const imagesData = await Promise.all(results.map(async (r) => {
            if (r.imageData) {
                // 將 ArrayBuffer 轉換為 base64
                const uint8Array = new Uint8Array(r.imageData);
                let binary = '';
                const len = uint8Array.byteLength;
                for (let i = 0; i < len; i++) {
                    binary += String.fromCharCode(uint8Array[i]);
                }
                const base64 = btoa(binary);
                
                return {
                    image: `data:${r.contentType};base64,${base64}`,
                    model: r.model,
                    seed: r.seed,
                    width: r.width,
                    height: r.height,
                    quality_mode: r.quality_mode,
                    style: r.style,
                    generation_mode: r.generation_mode,
                    authenticated: r.authenticated
                };
            }
            return null;
        }));
        
        return new Response(JSON.stringify({ 
            created: Math.floor(Date.now() / 1000), 
            data: imagesData.filter(d => d !== null),
            generation_time_ms: duration
        }), { 
            headers: corsHeaders({ 
                'Content-Type': 'application/json',
                'X-Generation-Time': duration + 'ms'
            }) 
        });
        
    } catch (e) {
        logger.add("❌ Error", e.message);
        return new Response(JSON.stringify({ 
            error: { 
                message: e.message, 
                debug_logs: logger.get() 
            } 
        }), { 
            status: 400, 
            headers: corsHeaders({ 'Content-Type': 'application/json' }) 
        });
    }
}
// =================================================================================
// 第 5 段：完整 Web UI 界面（處理圖片字節響應）
// =================================================================================

function handleUI() {
  const authStatus = CONFIG.POLLINATIONS_AUTH.enabled ? 
    '<span style="color:#22c55e;font-weight:600;font-size:12px">🔐 已認證</span>' : 
    '<span style="color:#f59e0b;font-weight:600;font-size:12px">🔓 匿名模式</span>';
    
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Flux AI Pro v${CONFIG.PROJECT_VERSION}</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎨</text></svg>">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;background:linear-gradient(135deg,#0a0a0a 0%,#1a1a2e 100%);color:#fff;min-height:100vh}
.container{max-width:100%;margin:0;padding:0;height:100vh;display:flex;flex-direction:column}
.top-nav{background:rgba(255,255,255,0.05);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,0.1);padding:15px 25px;display:flex;justify-content:space-between;align-items:center;flex-shrink:0}
.nav-left{display:flex;align-items:center;gap:20px}
.logo{color:#f59e0b;font-size:24px;font-weight:800;text-shadow:0 0 20px rgba(245,158,11,0.6);display:flex;align-items:center;gap:10px}
.badge{background:linear-gradient(135deg,#10b981 0%,#059669 100%);padding:4px 10px;border-radius:12px;font-size:11px;font-weight:600}
.badge-new{background:linear-gradient(135deg,#ec4899 0%,#db2777 100%);padding:4px 10px;border-radius:12px;font-size:11px;font-weight:700}
.nav-menu{display:flex;gap:10px}
.nav-btn{padding:8px 16px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#9ca3af;cursor:pointer;font-size:14px;font-weight:600;transition:all 0.3s;display:flex;align-items:center;gap:6px}
.nav-btn:hover{border-color:#f59e0b;color:#fff}
.nav-btn.active{background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#fff;border-color:#f59e0b}
.api-status{padding:6px 12px;border-radius:8px;font-size:12px;font-weight:600;background:rgba(16,185,129,0.1);border:1px solid #10b981}
.main-content{flex:1;display:flex;overflow:hidden}
.left-panel{width:320px;background:rgba(255,255,255,0.03);border-right:1px solid rgba(255,255,255,0.1);overflow-y:auto;padding:20px;flex-shrink:0}
.center-panel{flex:1;padding:20px;overflow-y:auto}
.right-panel{width:380px;background:rgba(255,255,255,0.03);border-left:1px solid rgba(255,255,255,0.1);overflow-y:auto;padding:20px;flex-shrink:0}
@media(max-width:1400px){.left-panel{width:280px}.right-panel{width:320px}}
@media(max-width:1024px){.main-content{flex-direction:column}.left-panel,.right-panel{width:100%;border:none;border-bottom:1px solid rgba(255,255,255,0.1)}}
.page{display:none}
.page.active{display:block}
.page.active .main-content{display:flex}
.section-title{font-size:16px;font-weight:700;color:#f59e0b;margin-bottom:15px;display:flex;align-items:center;gap:8px}
.form-group{margin-bottom:16px}
label{display:block;margin-bottom:6px;font-weight:600;font-size:13px;color:#e5e7eb}
input,select,textarea{width:100%;padding:10px;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.2);border-radius:8px;color:#fff;font-size:13px;transition:all 0.3s}
input:focus,select:focus,textarea:focus{outline:none;border-color:#f59e0b;box-shadow:0 0 0 3px rgba(245,158,11,0.1)}
textarea{min-height:120px;resize:vertical;font-family:inherit;line-height:1.6}
select{cursor:pointer}
.input-hint{font-size:11px;color:#6b7280;margin-top:4px}
.btn{padding:12px 24px;border:none;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.3s;display:inline-flex;align-items:center;gap:8px;justify-content:center;width:100%}
.btn-primary{background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#fff;box-shadow:0 4px 15px rgba(245,158,11,0.3)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(245,158,11,0.4)}
.btn-primary:disabled{opacity:0.5;cursor:not-allowed;transform:none}
.btn-secondary{background:rgba(255,255,255,0.1);color:#fff;border:1px solid rgba(255,255,255,0.2)}
.btn-secondary:hover{background:rgba(255,255,255,0.15)}
.btn-danger{background:linear-gradient(135deg,#ef4444 0%,#dc2626 100%);color:#fff}
.gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px}
.gallery-item{background:rgba(0,0,0,0.4);border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);transition:all 0.3s}
.gallery-item:hover{transform:translateY(-5px);box-shadow:0 10px 30px rgba(245,158,11,0.3)}
.gallery-item img{width:100%;height:280px;object-fit:cover;display:block;cursor:pointer}
.gallery-info{padding:15px}
.gallery-meta{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:5px}
.model-badge{background:rgba(245,158,11,0.2);color:#f59e0b;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:600}
.seed-badge{background:rgba(16,185,129,0.2);color:#10b981;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:600}
.time-badge{background:rgba(59,130,246,0.2);color:#3b82f6;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:600}
.gallery-actions{display:flex;gap:8px;margin-top:10px}
.action-btn{padding:6px 12px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:6px;font-size:12px;color:#fff;cursor:pointer;transition:all 0.3s;display:inline-flex;align-items:center;gap:5px;flex:1;justify-content:center}
.action-btn:hover{background:rgba(255,255,255,0.2);border-color:#f59e0b}
.action-btn.delete{border-color:rgba(239,68,68,0.5)}
.action-btn.delete:hover{background:rgba(239,68,68,0.2);border-color:#ef4444}
.prompt-display{background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:15px;margin-bottom:20px}
.prompt-display .label{font-size:12px;color:#9ca3af;margin-bottom:6px;font-weight:600}
.prompt-display .content{color:#e5e7eb;font-size:13px;line-height:1.6;word-break:break-word}
.loading{text-align:center;padding:60px 20px;color:#9ca3af}
.spinner{border:3px solid rgba(255,255,255,0.1);border-top:3px solid #f59e0b;border-radius:50%;width:40px;height:40px;animation:spin 1s linear infinite;margin:0 auto 15px}
@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
.empty-state{text-align:center;padding:60px 20px;color:#9ca3af}
.empty-state svg{margin:0 auto 20px;opacity:0.5}
.alert{padding:12px 15px;border-radius:8px;margin-bottom:15px;border-left:4px solid;font-size:13px}
.alert-success{background:rgba(16,185,129,0.1);border-color:#10b981;color:#10b981}
.alert-error{background:rgba(239,68,68,0.1);border-color:#ef4444;color:#ef4444}
.advanced-toggle{cursor:pointer;color:#3b82f6;font-size:13px;margin-bottom:12px;display:inline-block}
.advanced-toggle:hover{text-decoration:underline}
.advanced-section{display:none;animation:fadeIn 0.3s}
.advanced-section.show{display:block}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.modal{display:none;position:fixed;z-index:1000;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,0.9);align-items:center;justify-content:center}
.modal.show{display:flex}
.modal-content{max-width:90%;max-height:90%;position:relative}
.modal-content img{max-width:100%;max-height:90vh;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,0.5)}
.modal-close{position:absolute;top:20px;right:20px;background:rgba(255,255,255,0.1);backdrop-filter:blur(10px);border:none;color:#fff;font-size:32px;width:48px;height:48px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.3s}
.modal-close:hover{background:rgba(255,255,255,0.2);transform:rotate(90deg)}
.history-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;padding:20px;background:rgba(255,255,255,0.03);border-radius:12px}
.history-stats{display:flex;gap:20px;font-size:14px}
.stat-item{display:flex;flex-direction:column;gap:4px}
.stat-item .label{color:#9ca3af;font-size:12px}
.stat-item .value{color:#f59e0b;font-size:20px;font-weight:700}
.history-actions{display:flex;gap:10px}
::-webkit-scrollbar{width:8px;height:8px}
::-webkit-scrollbar-track{background:rgba(255,255,255,0.05)}
::-webkit-scrollbar-thumb{background:rgba(245,158,11,0.3);border-radius:4px}
::-webkit-scrollbar-thumb:hover{background:rgba(245,158,11,0.5)}
</style>
</head>
<body>
<div class="container">
<div class="top-nav">
<div class="nav-left">
<div class="logo">🎨 Flux AI Pro<span class="badge">v${CONFIG.PROJECT_VERSION}</span><span class="badge-new">圖片字節</span></div>
<div class="api-status">${authStatus}</div>
</div>
<div class="nav-menu">
<button class="nav-btn active" data-page="generate"><span>🎨</span> 生成圖像</button>
<button class="nav-btn" data-page="history"><span>📚</span> 歷史記錄 <span id="historyCount" style="background:rgba(245,158,11,0.2);padding:2px 8px;border-radius:10px;font-size:11px">0</span></button>
</div>
</div>
<div id="generatePage" class="page active">
<div class="main-content">
<div class="left-panel">
<div class="section-title">⚙️ 生成參數</div>
<form id="generateForm">
<div class="form-group">
<label>模型選擇</label>
<select id="model">
<optgroup label="⚡ Z-Image 系列（默認）"><option value="zimage" selected>Z-Image Turbo ⚡ (6B 參數, 極速)</option></optgroup>
<optgroup label="🎨 Flux 系列"><option value="flux">Flux 標準版 (平衡速度與質量)</option><option value="turbo">Flux Turbo ⚡ (超快速生成)</option></optgroup>
<optgroup label="🖼️ Kontext 系列（圖生圖）"><option value="kontext">Kontext 🎨 (支持參考圖像)</option></optgroup>
</select>
<div class="input-hint">💰 價格: Z-Image (0.0002) | Flux (0.00012) | Turbo (0.0003) | Kontext (0.04)</div>
</div>
<div class="form-group">
<label>尺寸預設</label>
<select id="size">
<option value="square-1k" selected>方形 1024x1024</option>
<option value="square-1.5k">方形 1536x1536</option>
<option value="square-2k">方形 2048x2048</option>
<option value="portrait-9-16-hd">豎屏 1080x1920</option>
<option value="landscape-16-9-hd">橫屏 1920x1080</option>
<option value="instagram-square">Instagram 方形</option>
<option value="wallpaper-fhd">桌布 Full HD</option>
</select>
</div>
<div class="form-group">
<label>藝術風格</label>
<select id="style">
<option value="none" selected>無 (原始)</option>
<option value="anime">動漫風格 ✨</option>
<option value="photorealistic">寫實照片 📷</option>
<option value="oil-painting">油畫 🎨</option>
<option value="watercolor">水彩畫 💧</option>
<option value="cyberpunk">賽博朋克 🌃</option>
<option value="fantasy">奇幻風格 🐉</option>
<option value="studio-ghibli">吉卜力風格 🍃</option>
</select>
</div>
<div class="form-group">
<label>質量模式</label>
<select id="qualityMode">
<option value="economy">經濟模式</option>
<option value="standard" selected>標準模式</option>
<option value="ultra">超高清模式</option>
</select>
</div>
<a class="advanced-toggle" id="advancedToggle">▼ 進階選項</a>
<div id="advancedSection" class="advanced-section">
<div class="form-group">
<label>Seed</label>
<input type="number" id="seed" value="-1" min="-1" max="999999">
<div class="input-hint">-1 = 隨機</div>
</div>
<div class="form-group">
<label>生成數量</label>
<input type="number" id="numOutputs" value="1" min="1" max="4">
</div>
<div class="form-group">
<label><input type="checkbox" id="autoOptimize" checked> 自動優化參數</label>
</div>
<div class="form-group">
<label><input type="checkbox" id="autoHD" checked> 自動HD增強</label>
</div>
</div>
<button type="submit" class="btn btn-primary" id="generateBtn">🎨 開始生成</button>
</form>
</div>
<div class="center-panel">
<div class="section-title">🖼️ 生成結果</div>
<div id="results">
<div class="empty-state">
<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
<p style="font-size:16px;margin-bottom:10px">尚未生成任何圖像</p>
<p style="font-size:14px">填寫左側參數並輸入提示詞後點擊生成</p>
</div>
</div>
</div>
<div class="right-panel">
<div class="section-title">💬 提示詞</div>
<div class="form-group">
<label>正面提示詞</label>
<textarea id="prompt" placeholder="描述你想生成的圖像...

例如：
• A beautiful sunset over mountains
• 一隻可愛的貓咪在花園裡玩耍
• Cyberpunk city at night, neon lights" required></textarea>
<div class="input-hint">支持中文自動翻譯</div>
</div>
<div class="form-group">
<label>負面提示詞 (可選)</label>
<textarea id="negativePrompt" placeholder="描述不想要的內容...

例如：
• blurry, low quality, distorted
• ugly, deformed, bad anatomy" rows="4"></textarea>
</div>
<div class="form-group">
<label>參考圖像 URL (可選)</label>
<textarea id="referenceImages" placeholder="多張圖片用逗號分隔

例如：
https://example.com/image1.jpg,
https://example.com/image2.jpg" rows="3"></textarea>
<div class="input-hint">支持圖生圖的模型：Kontext</div>
</div>
<div class="section-title" style="margin-top:25px">📋 當前配置預覽</div>
<div class="prompt-display"><div class="label">模型</div><div class="content" id="previewModel">Z-Image Turbo</div></div>
<div class="prompt-display"><div class="label">尺寸</div><div class="content" id="previewSize">1024x1024</div></div>
<div class="prompt-display"><div class="label">風格</div><div class="content" id="previewStyle">無</div></div>
</div>
</div>
</div>
<div id="historyPage" class="page">
<div class="main-content" style="flex-direction:column;padding:20px">
<div class="history-header">
<div class="history-stats">
<div class="stat-item"><div class="label">📊 總記錄數</div><div class="value" id="historyTotal">0</div></div>
<div class="stat-item"><div class="label">💾 存儲空間</div><div class="value" id="storageSize">0 KB</div></div>
<div class="stat-item"><div class="label">🎨 最近模型</div><div class="value" id="recentModel" style="font-size:14px">-</div></div>
</div>
<div class="history-actions">
<button class="btn btn-secondary" id="exportBtn" style="width:auto;padding:10px 20px">📥 導出記錄</button>
<button class="btn btn-danger" id="clearBtn" style="width:auto;padding:10px 20px">🗑️ 清空記錄</button>
</div>
</div>
<div id="historyList" style="padding:0 20px">
<div class="empty-state">
<p style="font-size:16px;margin-bottom:10px">暫無歷史記錄</p>
<p style="font-size:14px">生成的圖像會自動保存在這裡</p>
</div>
</div>
</div>
</div>
</div>
<div id="imageModal" class="modal">
<button class="modal-close" id="modalCloseBtn">×</button>
<div class="modal-content" id="modalContentDiv">
<img id="modalImage" src="" alt="Preview">
</div>
</div>
<script>
document.querySelectorAll('.nav-btn').forEach(btn=>{btn.addEventListener('click',function(){const pageName=this.dataset.page;document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));document.getElementById(pageName+'Page').classList.add('active');this.classList.add('active');if(pageName==='history')updateHistoryDisplay()})});
document.getElementById('advancedToggle').addEventListener('click',function(){document.getElementById('advancedSection').classList.toggle('show')});
document.getElementById('exportBtn').addEventListener('click',exportHistory);
document.getElementById('clearBtn').addEventListener('click',clearHistory);
document.getElementById('modalCloseBtn').addEventListener('click',closeModal);
document.getElementById('imageModal').addEventListener('click',function(e){if(e.target===this)closeModal()});
document.getElementById('modalContentDiv').addEventListener('click',function(e){e.stopPropagation()});
function updatePreview(){const model=document.getElementById('model').value;const sizePreset=document.getElementById('size').value;const style=document.getElementById('style').value;const sizes=${JSON.stringify(CONFIG.PRESET_SIZES)};const sizeConfig=sizes[sizePreset]||sizes['square-1k'];const modelNames={'zimage':'Z-Image Turbo ⚡','flux':'Flux 標準版','turbo':'Flux Turbo ⚡','kontext':'Kontext 🎨'};document.getElementById('previewModel').textContent=modelNames[model]||model;document.getElementById('previewSize').textContent=sizeConfig.name+' ('+sizeConfig.width+'x'+sizeConfig.height+')';document.getElementById('previewStyle').textContent=style==='none'?'無':style}
document.getElementById('model').addEventListener('change',updatePreview);
document.getElementById('size').addEventListener('change',updatePreview);
document.getElementById('style').addEventListener('change',updatePreview);
updatePreview();
const STORAGE_KEY='flux_ai_history';const MAX_HISTORY=100;
function getHistory(){try{const data=localStorage.getItem(STORAGE_KEY);return data?JSON.parse(data):[]}catch(e){console.error('Failed to load history:',e);return[]}}
function saveHistory(history){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(history));updateHistoryStats()}catch(e){console.error('Failed to save history:',e)}}
function addToHistory(item){let history=getHistory();history.unshift({...item,id:Date.now()+Math.random(),timestamp:new Date().toISOString()});if(history.length>MAX_HISTORY)history=history.slice(0,MAX_HISTORY);saveHistory(history)}
function deleteFromHistory(id){if(!confirm('確定要刪除這條記錄嗎？'))return;let history=getHistory();history=history.filter(item=>item.id!==id);saveHistory(history);updateHistoryDisplay()}
function clearHistory(){if(!confirm('確定要清空所有歷史記錄嗎？此操作不可恢復！'))return;localStorage.removeItem(STORAGE_KEY);updateHistoryDisplay();updateHistoryStats()}
function exportHistory(){const history=getHistory();const dataStr=JSON.stringify(history,null,2);const dataBlob=new Blob([dataStr],{type:'application/json'});const url=URL.createObjectURL(dataBlob);const link=document.createElement('a');link.href=url;link.download='flux-ai-history-'+new Date().toISOString().split('T')[0]+'.json';link.click();URL.revokeObjectURL(url)}
function updateHistoryStats(){const history=getHistory();document.getElementById('historyCount').textContent=history.length;document.getElementById('historyTotal').textContent=history.length;const sizeKB=new Blob([JSON.stringify(history)]).size/1024;document.getElementById('storageSize').textContent=sizeKB.toFixed(1)+' KB';if(history.length>0){const modelNames={'zimage':'Z-Image','flux':'Flux','turbo':'Turbo','kontext':'Kontext'};document.getElementById('recentModel').textContent=modelNames[history[0].model]||history[0].model}else{document.getElementById('recentModel').textContent='-'}}
function updateHistoryDisplay(){const history=getHistory();const historyList=document.getElementById('historyList');if(history.length===0){historyList.innerHTML='<div class="empty-state"><p style="font-size:16px;margin-bottom:10px">暫無歷史記錄</p><p style="font-size:14px">生成的圖像會自動保存在這裡</p></div>';updateHistoryStats();return}const galleryDiv=document.createElement('div');galleryDiv.className='gallery';history.forEach(item=>{const date=new Date(item.timestamp);const timeStr=date.toLocaleString('zh-TW',{month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'});const itemDiv=document.createElement('div');itemDiv.className='gallery-item';itemDiv.innerHTML='<img src="'+item.url+'" alt="History" loading="lazy"><div class="gallery-info"><div class="gallery-meta"><span class="model-badge">'+item.model+'</span><span class="seed-badge">Seed: '+item.seed+'</span></div><div class="gallery-meta" style="margin-top:5px"><span class="time-badge">'+timeStr+'</span></div><div style="margin-top:8px;font-size:11px;color:#6b7280">'+item.width+'x'+item.height+' | '+(item.quality_mode||'standard')+'</div><div class="gallery-actions"><button class="action-btn reuse-btn">🔄 重用</button><button class="action-btn download-btn">💾 下載</button><button class="action-btn delete delete-btn">🗑️ 刪除</button></div></div>';const img=itemDiv.querySelector('img');img.addEventListener('click',function(){openModal(item.url)});const reuseBtn=itemDiv.querySelector('.reuse-btn');reuseBtn.addEventListener('click',function(){reusePrompt(item.id)});const downloadBtn=itemDiv.querySelector('.download-btn');downloadBtn.addEventListener('click',function(){downloadImage(item.url,item.seed)});const deleteBtn=itemDiv.querySelector('.delete-btn');deleteBtn.addEventListener('click',function(){deleteFromHistory(item.id)});galleryDiv.appendChild(itemDiv)});historyList.innerHTML='';historyList.appendChild(galleryDiv);updateHistoryStats()}
function reusePrompt(id){const history=getHistory();const item=history.find(h=>h.id===id);if(!item)return;document.getElementById('prompt').value=item.prompt||'';document.getElementById('model').value=item.model||'zimage';document.getElementById('seed').value=item.seed||-1;document.getElementById('style').value=item.style||'none';document.getElementById('negativePrompt').value=item.negative_prompt||'';document.getElementById('referenceImages').value=(item.reference_images||[]).join(', ');updatePreview();document.querySelector('[data-page="generate"]').click();document.getElementById('prompt').focus()}
function downloadImage(url,seed){const link=document.createElement('a');link.href=url;link.download='flux-ai-'+seed+'-'+Date.now()+'.png';link.click()}
function openModal(url){document.getElementById('modalImage').src=url;document.getElementById('imageModal').classList.add('show')}
function closeModal(){document.getElementById('imageModal').classList.remove('show')}
function displayGeneratedImages(images){const history=getHistory();const galleryDiv=document.createElement('div');galleryDiv.className='gallery';const newImages=history.slice(0,images.length);newImages.forEach((item,index)=>{const date=new Date(item.timestamp);const timeStr=date.toLocaleString('zh-TW',{month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'});const itemDiv=document.createElement('div');itemDiv.className='gallery-item';itemDiv.style.animation='fadeIn 0.5s ease-in';itemDiv.innerHTML='<img src="'+item.url+'" alt="Generated '+(index+1)+'" loading="lazy"><div class="gallery-info"><div style="background:linear-gradient(135deg,#10b981 0%,#059669 100%);color:#fff;padding:4px 8px;border-radius:6px;font-size:10px;font-weight:700;margin-bottom:8px;text-align:center">✅ 剛剛生成</div><div class="gallery-meta"><span class="model-badge">'+item.model+'</span><span class="seed-badge">Seed: '+item.seed+'</span></div><div class="gallery-meta" style="margin-top:5px"><span class="time-badge">'+timeStr+'</span></div><div style="margin-top:8px;font-size:11px;color:#6b7280">'+item.width+'x'+item.height+' | '+(item.quality_mode||'standard')+(item.generation_mode?' | '+item.generation_mode:'')+'</div><div class="gallery-actions"><button class="action-btn reuse-result-btn">🔄 重用</button><button class="action-btn download-result-btn">💾 下載</button><button class="action-btn view-history-btn">📚 查看歷史</button></div></div>';const img=itemDiv.querySelector('img');img.addEventListener('click',function(){openModal(item.url)});const reuseBtn=itemDiv.querySelector('.reuse-result-btn');reuseBtn.addEventListener('click',function(){reusePrompt(item.id)});const downloadBtn=itemDiv.querySelector('.download-result-btn');downloadBtn.addEventListener('click',function(){downloadImage(item.url,item.seed)});const viewBtn=itemDiv.querySelector('.view-history-btn');viewBtn.addEventListener('click',function(){document.querySelector('[data-page="history"]').click()});galleryDiv.appendChild(itemDiv)});const resultsDiv=document.getElementById('results');resultsDiv.innerHTML='';const successDiv=document.createElement('div');successDiv.className='alert alert-success';successDiv.innerHTML='<strong>✅ 生成成功！</strong> 已生成 '+images.length+' 張圖片並保存到歷史記錄';resultsDiv.appendChild(successDiv);resultsDiv.appendChild(galleryDiv)}
const form=document.getElementById('generateForm');
const resultsDiv=document.getElementById('results');
const generateBtn=document.getElementById('generateBtn');
form.addEventListener('submit',async(e)=>{e.preventDefault();const prompt=document.getElementById('prompt').value;if(!prompt.trim()){alert('請輸入提示詞');document.getElementById('prompt').focus();return}const model=document.getElementById('model').value;const sizePreset=document.getElementById('size').value;const style=document.getElementById('style').value;const qualityMode=document.getElementById('qualityMode').value;const seed=parseInt(document.getElementById('seed').value);const numOutputs=parseInt(document.getElementById('numOutputs').value);const negativePrompt=document.getElementById('negativePrompt').value;const autoOptimize=document.getElementById('autoOptimize').checked;const autoHD=document.getElementById('autoHD').checked;const refImagesInput=document.getElementById('referenceImages').value;let referenceImages=[];if(refImagesInput.trim()){referenceImages=refImagesInput.split(',').map(url=>url.trim()).filter(url=>url)}const sizes=${JSON.stringify(CONFIG.PRESET_SIZES)};const sizeConfig=sizes[sizePreset]||sizes['square-1k'];generateBtn.disabled=true;generateBtn.innerHTML='<div class="spinner"></div>生成中...';resultsDiv.innerHTML='<div class="loading"><div class="spinner"></div><p>正在生成圖像,請稍候...</p></div>';try{const response=await fetch('/_internal/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt,model,width:sizeConfig.width,height:sizeConfig.height,style,quality_mode:qualityMode,seed:seed,n:numOutputs,negative_prompt:negativePrompt,auto_optimize:autoOptimize,auto_hd:autoHD,reference_images:referenceImages})});const contentType=response.headers.get('content-type');if(contentType&&contentType.startsWith('image/')){const imageBlob=await response.blob();const imageUrl=URL.createObjectURL(imageBlob);const modelUsed=response.headers.get('X-Model')||model;const seedUsed=parseInt(response.headers.get('X-Seed'))||seed;const widthUsed=parseInt(response.headers.get('X-Width'))||sizeConfig.width;const heightUsed=parseInt(response.headers.get('X-Height'))||sizeConfig.height;const qualityUsed=response.headers.get('X-Quality-Mode')||qualityMode;const genMode=response.headers.get('X-Generation-Mode')||'文生圖';addToHistory({url:imageUrl,prompt:prompt,model:modelUsed,seed:seedUsed,width:widthUsed,height:heightUsed,style:style,quality_mode:qualityUsed,negative_prompt:negativePrompt,reference_images:referenceImages,generation_mode:genMode});displayGeneratedImages([{url:imageUrl,model:modelUsed,seed:seedUsed,width:widthUsed,height:heightUsed,quality_mode:qualityUsed}])}else if(contentType&&contentType.includes('application/json')){const data=await response.json();if(data.error){resultsDiv.innerHTML='<div class="alert alert-error"><strong>錯誤:</strong> '+data.error.message+'</div>'}else{const images=data.data.map(item=>{addToHistory({url:item.image,prompt:prompt,model:item.model,seed:item.seed,width:item.width,height:item.height,style:style,quality_mode:item.quality_mode,negative_prompt:negativePrompt,reference_images:referenceImages,generation_mode:item.generation_mode});return item});displayGeneratedImages(images)}}}catch(error){resultsDiv.innerHTML='<div class="alert alert-error"><strong>錯誤:</strong> '+error.message+'</div>'}finally{generateBtn.disabled=false;generateBtn.innerHTML='🎨 開始生成'}});
window.addEventListener('DOMContentLoaded',()=>{updateHistoryStats();updatePreview()});
</script>
</body>
</html>`;
  
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      ...corsHeaders()
    }
  });
}

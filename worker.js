// =================================================================================
//  項目: multi-provider-image-generator
//  版本: 8.6.1 (移除成人內容功能)
//  作者: Enhanced by AI Assistant
//  日期: 2025-12-10
//
//  完整功能:
//  ✅ 17個模型 (Flux + SD3)
//  ✅ 12種風格預設
//  ✅ 三檔質量模式
//  ✅ 智能提示詞分析
//  ✅ 模型專屬優化
//  ✅ 歷史記錄系統
//  ✅ OpenAI 兼容 API
// =================================================================================

const CONFIG = {
  PROJECT_NAME: "multi-provider-image-generator",
  PROJECT_VERSION: "8.6.1",
  
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
      description: "完全免費的 AI 圖像生成服務 - 支持 Flux & SD3 系列 + 智能自適應高清",
      features: {
        private_mode: true,
        custom_size: true,
        seed_control: true,
        negative_prompt: true,
        enhance: true,
        nologo: true,
        style_presets: true,
        auto_hd: true,
        quality_modes: true
      },
      models: [
        { id: "flux", name: "Flux", confirmed: true, category: "flux", description: "均衡速度與質量" },
        { id: "flux-realism", name: "Flux Realism", confirmed: true, category: "flux", description: "超寫實風格" },
        { id: "flux-anime", name: "Flux Anime", confirmed: true, category: "flux", description: "日系動漫風格" },
        { id: "flux-3d", name: "Flux 3D", confirmed: true, category: "flux", description: "3D 渲染風格" },
        { id: "flux-pro", name: "Flux Pro", confirmed: true, category: "flux", description: "專業版最高質量" },
        { id: "any-dark", name: "Any Dark", confirmed: true, category: "flux", description: "暗黑風格" },
        { id: "turbo", name: "Turbo", confirmed: true, category: "flux", description: "極速生成" },
        { id: "flux-1.1-pro", name: "Flux 1.1 Pro 🔥", confirmed: false, fallback: ["flux-pro", "flux-realism"], experimental: true, category: "flux-advanced", description: "最新 Flux 1.1" },
        { id: "flux-kontext", name: "Flux Kontext 🎨", confirmed: false, fallback: ["flux-pro", "flux-realism"], experimental: true, category: "flux-advanced", description: "圖像編輯標準版" },
        { id: "flux-kontext-pro", name: "Flux Kontext Pro 💎", confirmed: false, fallback: ["flux-kontext", "flux-pro", "flux-realism"], experimental: true, category: "flux-advanced", description: "圖像編輯專業版" },
        { id: "sd3", name: "Stable Diffusion 3 ⚡", confirmed: false, fallback: ["flux-realism", "flux"], experimental: true, category: "stable-diffusion", description: "SD3 標準版" },
        { id: "sd3.5-large", name: "SD 3.5 Large 🔥", confirmed: false, fallback: ["sd3", "flux-realism", "flux"], experimental: true, category: "stable-diffusion", description: "SD 3.5 大模型" },
        { id: "sd3.5-turbo", name: "SD 3.5 Turbo ⚡", confirmed: false, fallback: ["turbo", "flux"], experimental: true, category: "stable-diffusion", description: "SD 3.5 快速版" },
        { id: "sdxl", name: "SDXL 📐", confirmed: false, fallback: ["flux-realism", "flux"], experimental: true, category: "stable-diffusion", description: "經典 SDXL" },
        { id: "sdxl-lightning", name: "SDXL Lightning ⚡", confirmed: false, fallback: ["turbo", "flux"], experimental: true, category: "stable-diffusion", description: "SDXL 極速版" }
      ],
      rate_limit: null,
      max_size: { width: 2048, height: 2048 }
    }
  },
  
  DEFAULT_PROVIDER: "pollinations",
  
  STYLE_PRESETS: {
    none: { name: "無 (使用原始提示詞)", prompt: "", negative: "" },
    "japanese-manga": { name: "日本漫畫 🇯🇵", prompt: "Japanese manga style, manga art, black and white manga, detailed linework, screentone, manga panel", negative: "photograph, realistic, 3d render, western comic" },
    "anime": { name: "動漫風格 ✨", prompt: "anime style, anime art, vibrant colors, anime character, detailed anime", negative: "realistic, photograph, 3d, ugly" },
    "vector": { name: "矢量圖 📐", prompt: "vector art, flat design, clean lines, minimalist, geometric shapes, vector illustration", negative: "photograph, realistic, textured, noisy" },
    "oil-painting": { name: "油畫 🎨", prompt: "oil painting, classical oil painting style, visible brushstrokes, rich colors, artistic", negative: "photograph, digital art, anime" },
    "watercolor": { name: "水彩畫 💧", prompt: "watercolor painting, soft colors, watercolor texture, artistic, hand-painted", negative: "photograph, digital, sharp edges" },
    "pixel-art": { name: "像素藝術 👾", prompt: "pixel art, 8-bit style, retro pixel graphics, pixelated", negative: "high resolution, smooth, realistic" },
    "cyberpunk": { name: "賽博朋克 🌃", prompt: "cyberpunk style, neon lights, futuristic, sci-fi, dystopian, high-tech low-life", negative: "natural, rustic, medieval" },
    "fantasy": { name: "奇幻風格 🐉", prompt: "fantasy art, magical, epic fantasy, detailed fantasy illustration", negative: "modern, realistic, mundane" },
    "photorealistic": { name: "寫實照片 📷", prompt: "photorealistic, ultra realistic, 8k uhd, professional photography, detailed, sharp focus", negative: "anime, cartoon, illustration, painting" },
    "studio-ghibli": { name: "吉卜力風格 🌿", prompt: "Studio Ghibli style, Ghibli art, Hayao Miyazaki style, whimsical, detailed background", negative: "dark, gritty, realistic" },
    "comic-book": { name: "美式漫畫 💥", prompt: "comic book style, American comic art, bold lines, vibrant colors, superhero comic", negative: "photograph, manga, realistic" },
    "sketch": { name: "素描 ✏️", prompt: "pencil sketch, hand-drawn, sketch art, graphite drawing, artistic sketch", negative: "colored, painted, digital" }
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
      "any-dark": { min: 18, optimal: 24, max: 35 }
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
      "pixel-art": 0.85,
      "sketch": 0.9,
      "vector": 0.85,
      "default": 1.0
    }
  },
  
  HD_OPTIMIZATION: {
    enabled: true,
    
    QUALITY_MODES: {
      economy: {
        name: "經濟模式",
        description: "快速出圖，適合測試",
        min_resolution: 1024,
        steps_multiplier: 0.85,
        guidance_multiplier: 0.9,
        hd_level: "basic"
      },
      standard: {
        name: "標準模式",
        description: "平衡質量與速度",
        min_resolution: 1280,
        steps_multiplier: 1.0,
        guidance_multiplier: 1.0,
        hd_level: "enhanced"
      },
      ultra: {
        name: "超高清模式",
        description: "極致質量，耗時較長",
        min_resolution: 1536,
        steps_multiplier: 1.35,
        guidance_multiplier: 1.15,
        hd_level: "maximum",
        force_upscale: true
      }
    },
    
    HD_PROMPTS: {
      basic: "high quality, detailed, sharp",
      enhanced: "high quality, extremely detailed, sharp focus, crisp, clear, professional, 8k uhd, masterpiece, fine details",
      maximum: "ultra high quality, extremely detailed, razor sharp focus, crystal clear, professional grade, 8k uhd resolution, masterpiece quality, fine details, intricate details, perfect clarity, photographic precision, studio lighting, professional color grading, maximum detail preservation"
    },
    
    HD_NEGATIVE: "low quality, blurry, pixelated, low resolution, jpeg artifacts, compression artifacts, bad quality, distorted, noisy, grainy, poor details, soft focus, out of focus",
    
    MODEL_QUALITY_PROFILES: {
      "flux-realism": {
        priority: "ultra_detail",
        min_resolution: 1536,
        optimal_steps_boost: 1.25,
        guidance_boost: 1.15,
        recommended_quality: "ultra"
      },
      "flux-pro": {
        priority: "maximum_quality",
        min_resolution: 1536,
        optimal_steps_boost: 1.3,
        guidance_boost: 1.2,
        recommended_quality: "ultra"
      },
      "flux-1.1-pro": {
        priority: "maximum_quality",
        min_resolution: 1536,
        optimal_steps_boost: 1.25,
        guidance_boost: 1.15,
        recommended_quality: "ultra"
      },
      "sd3.5-large": {
        priority: "high_detail",
        min_resolution: 1280,
        optimal_steps_boost: 1.2,
        guidance_boost: 1.1,
        recommended_quality: "standard"
      },
      "flux-anime": {
        priority: "clarity",
        min_resolution: 1280,
        optimal_steps_boost: 1.15,
        guidance_boost: 1.1,
        recommended_quality: "standard"
      },
      "flux-3d": {
        priority: "detail",
        min_resolution: 1280,
        optimal_steps_boost: 1.2,
        guidance_boost: 1.1,
        recommended_quality: "standard"
      },
      "turbo": {
        priority: "speed",
        min_resolution: 1024,
        optimal_steps_boost: 0.7,
        guidance_boost: 0.85,
        recommended_quality: "economy"
      },
      "sdxl-lightning": {
        priority: "speed",
        min_resolution: 1024,
        optimal_steps_boost: 0.6,
        guidance_boost: 0.8,
        recommended_quality: "economy"
      },
      "sd3.5-turbo": {
        priority: "balanced_speed",
        min_resolution: 1024,
        optimal_steps_boost: 0.8,
        guidance_boost: 0.9,
        recommended_quality: "economy"
      }
    },
    
    SIZE_RECOMMENDATION: {
      min_recommended: 1024,
      auto_upscale_threshold: 768,
      max_size: 2048,
      upscale_rules: {
        "512x512": { suggested: "1024x1024", multiplier: 2 },
        "768x768": { suggested: "1536x1536", multiplier: 2 },
        "640x640": { suggested: "1280x1280", multiplier: 2 },
        "512x768": { suggested: "1024x1536", multiplier: 2 },
        "768x512": { suggested: "1536x1024", multiplier: 2 }
      }
    }
  },
  
  FETCH_TIMEOUT: 60000,
  MAX_RETRIES: 3,
  
  PRESET_SIZES: {
    "square": { width: 1024, height: 1024, name: "方形 1:1" },
    "portrait": { width: 768, height: 1344, name: "豎屏 9:16" },
    "landscape": { width: 1344, height: 768, name: "橫屏 16:9" },
    "standard-portrait": { width: 768, height: 1024, name: "標準豎屏 3:4" },
    "standard-landscape": { width: 1024, height: 768, name: "標準橫屏 4:3" },
    "ultrawide": { width: 1536, height: 640, name: "超寬屏 21:9" },
    "ultrawide-portrait": { width: 640, height: 1536, name: "超豎屏 9:21" },
    "custom": { width: 1024, height: 1024, name: "自定義" }
  },
  
  HISTORY: {
    MAX_ITEMS: 100,
    STORAGE_KEY: "image_generation_history"
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

class PromptAnalyzer {
    static analyzeComplexity(prompt) {
        const complexKeywords = [
            'detailed', 'intricate', 'complex', 'elaborate',
            'realistic', 'photorealistic', 'hyperrealistic',
            'architecture', 'cityscape', 'landscape',
            'portrait', 'face', 'eyes', 'hair',
            'texture', 'material', 'fabric', 'skin',
            'lighting', 'shadows', 'reflections',
            'fine details', 'high detail', 'ultra detailed'
        ];
        
        let score = 0;
        const lowerPrompt = prompt.toLowerCase();
        
        complexKeywords.forEach(keyword => {
            if (lowerPrompt.includes(keyword)) {
                score += 0.1;
            }
        });
        
        if (prompt.length > 100) score += 0.2;
        if (prompt.length > 200) score += 0.3;
        if (prompt.split(',').length > 5) score += 0.15;
        
        return Math.min(score, 1.0);
    }
    
    static recommendQualityMode(prompt, model) {
        const complexity = this.analyzeComplexity(prompt);
        const profile = CONFIG.HD_OPTIMIZATION.MODEL_QUALITY_PROFILES[model];
        
        if (profile?.recommended_quality) {
            return profile.recommended_quality;
        }
        
        if (complexity > 0.7) return 'ultra';
        if (complexity > 0.4) return 'standard';
        return 'economy';
    }
}

class HDOptimizer {
    static optimize(prompt, negativePrompt, model, width, height, qualityMode = 'standard', autoHD = true) {
        if (!autoHD || !CONFIG.HD_OPTIMIZATION.enabled) {
            return {
                prompt: prompt,
                negativePrompt: negativePrompt,
                width: width,
                height: height,
                optimized: false
            };
        }
        
        const hdConfig = CONFIG.HD_OPTIMIZATION;
        const modeConfig = hdConfig.QUALITY_MODES[qualityMode] || hdConfig.QUALITY_MODES.standard;
        const profile = hdConfig.MODEL_QUALITY_PROFILES[model];
        
        const optimizations = [];
        
        const hdLevel = modeConfig.hd_level;
        let enhancedPrompt = prompt;
        
        if (hdConfig.HD_PROMPTS[hdLevel]) {
            const hdBoost = hdConfig.HD_PROMPTS[hdLevel];
            enhancedPrompt = `${prompt}, ${hdBoost}`;
            optimizations.push(`HD增強: ${hdLevel}`);
        }
        
        let enhancedNegative = negativePrompt || "";
        if (qualityMode !== 'economy') {
            enhancedNegative = enhancedNegative 
                ? `${enhancedNegative}, ${hdConfig.HD_NEGATIVE}`
                : hdConfig.HD_NEGATIVE;
            optimizations.push(`負面提示詞: 高清過濾`);
        }
        
        let finalWidth = width;
        let finalHeight = height;
        let sizeUpscaled = false;
        
        const minRes = Math.max(
            modeConfig.min_resolution,
            profile?.min_resolution || 1024
        );
        
        const currentRes = Math.min(width, height);
        if (currentRes < minRes || modeConfig.force_upscale) {
            const scale = minRes / currentRes;
            finalWidth = Math.min(Math.round(width * scale / 64) * 64, hdConfig.SIZE_RECOMMENDATION.max_size);
            finalHeight = Math.min(Math.round(height * scale / 64) * 64, hdConfig.SIZE_RECOMMENDATION.max_size);
            sizeUpscaled = true;
            optimizations.push(`尺寸優化: ${width}x${height} → ${finalWidth}x${finalHeight}`);
        }
        
        const sizeKey = `${width}x${height}`;
        if (hdConfig.SIZE_RECOMMENDATION.upscale_rules[sizeKey] && !sizeUpscaled) {
            const rule = hdConfig.SIZE_RECOMMENDATION.upscale_rules[sizeKey];
            const [suggestedW, suggestedH] = rule.suggested.split('x').map(Number);
            
            if (suggestedW <= hdConfig.SIZE_RECOMMENDATION.max_size) {
                finalWidth = suggestedW;
                finalHeight = suggestedH;
                sizeUpscaled = true;
                optimizations.push(`智能提升: ${width}x${height} → ${finalWidth}x${finalHeight}`);
            }
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
            return {
                steps: userSteps,
                optimized: false,
                suggested: suggestion.steps,
                reasoning: suggestion.reasoning,
                user_override: true
            };
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
        reasoning.push(`${model}: ${baseSteps}步`);
        
        const totalPixels = width * height;
        let sizeMultiplier = 1.0;
        
        if (totalPixels <= rules.SIZE_MULTIPLIER.small.threshold) {
            sizeMultiplier = rules.SIZE_MULTIPLIER.small.multiplier;
        } else if (totalPixels <= rules.SIZE_MULTIPLIER.medium.threshold) {
            sizeMultiplier = rules.SIZE_MULTIPLIER.medium.multiplier;
        } else if (totalPixels <= rules.SIZE_MULTIPLIER.large.threshold) {
            sizeMultiplier = rules.SIZE_MULTIPLIER.large.multiplier;
            reasoning.push(`大尺寸 x${sizeMultiplier}`);
        } else {
            sizeMultiplier = rules.SIZE_MULTIPLIER.xlarge.multiplier;
            reasoning.push(`超大 x${sizeMultiplier}`);
        }
        
        let styleMultiplier = rules.STYLE_ADJUSTMENT[style] || rules.STYLE_ADJUSTMENT.default;
        
        let qualityMultiplier = modeConfig?.steps_multiplier || 1.0;
        if (qualityMultiplier !== 1.0) {
            reasoning.push(`${modeConfig.name} x${qualityMultiplier}`);
        }
        
        let profileBoost = profile?.optimal_steps_boost || 1.0;
        if (profileBoost !== 1.0) {
            reasoning.push(`模型配置 x${profileBoost}`);
        }
        
        let optimizedSteps = Math.round(baseSteps * sizeMultiplier * styleMultiplier * qualityMultiplier * profileBoost);
        optimizedSteps = Math.max(modelRule.min, Math.min(optimizedSteps, modelRule.max));
        
        reasoning.push(`→ ${optimizedSteps}步`);
        
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
        if (styleConfig.prompt) {
            enhancedPrompt = `${prompt}, ${styleConfig.prompt}`;
        }
        
        let enhancedNegative = negativePrompt || "";
        if (styleConfig.negative) {
            enhancedNegative = enhancedNegative 
                ? `${enhancedNegative}, ${styleConfig.negative}`
                : styleConfig.negative;
        }
        
        return { enhancedPrompt, enhancedNegative };
    }
}

async function fetchWithTimeout(url, options = {}, timeout = CONFIG.FETCH_TIMEOUT) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new Error(`Request timeout after ${timeout}ms`);
        }
        throw error;
    }
}

class PollinationsProvider {
    constructor(config) {
        this.config = config;
        this.name = config.name;
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
            qualityMode = 'standard'
        } = options;
        
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
            selected_quality: qualityMode
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
                    original: `${width}x${height}`,
                    optimized: `${finalWidth}x${finalHeight}`,
                    upscaled: hdOptimization.size_upscaled,
                    details: hdOptimization.optimizations
                });
            }
        }
        
        let finalSteps = steps;
        let finalGuidance = guidance;
        
        if (autoOptimize) {
            const stepsOptimization = ParameterOptimizer.optimizeSteps(
                model, 
                finalWidth,
                finalHeight, 
                style,
                qualityMode,
                steps
            );
            finalSteps = stepsOptimization.steps;
            
            logger.add("🎯 Steps Optimization", {
                steps: stepsOptimization.steps,
                reasoning: stepsOptimization.reasoning
            });
            
            if (guidance === null) {
                finalGuidance = ParameterOptimizer.optimizeGuidance(model, style, qualityMode);
            } else {
                finalGuidance = guidance;
            }
        } else {
            finalSteps = steps || 20;
            finalGuidance = guidance || 7.5;
        }
        
        const { enhancedPrompt, enhancedNegative } = StyleProcessor.applyStyle(
            finalPrompt,
            style, 
            finalNegativePrompt
        );
        
        const modelConfig = this.config.models.find(m => m.id === model);
        const modelsToTry = [model];
        
        if (modelConfig?.experimental && modelConfig?.fallback) {
            modelsToTry.push(...modelConfig.fallback);
        }
        
        logger.add("🎨 Generation Config", {
            provider: this.name,
            model: model,
            dimensions: `${finalWidth}x${finalHeight}`,
            quality_mode: qualityMode,
            hd_optimized: autoHD && hdOptimization?.optimized,
            steps: finalSteps,
            guidance: finalGuidance
        });
        
        const currentSeed = seed === -1 ? Math.floor(Math.random() * 1000000) : seed;
        
        let fullPrompt = enhancedPrompt;
        if (enhancedNegative && enhancedNegative.trim()) {
            fullPrompt = `${enhancedPrompt} [negative: ${enhancedNegative}]`;
        }
        
        const encodedPrompt = encodeURIComponent(fullPrompt);
        
        for (const tryModel of modelsToTry) {
            let lastError = null;
            
            for (let retry = 0; retry < CONFIG.MAX_RETRIES; retry++) {
                try {
                    let url = `${this.config.endpoint}/prompt/${encodedPrompt}`;
                    
                    const params = new URLSearchParams();
                    params.append('model', tryModel);
                    params.append('width', finalWidth.toString());
                    params.append('height', finalHeight.toString());
                    params.append('seed', currentSeed.toString());
                    params.append('nologo', nologo.toString());
                    params.append('enhance', enhance.toString());
                    params.append('private', privateMode.toString());
                    
                    if (finalGuidance !== 7.5) {
                        params.append('guidance', finalGuidance.toString());
                    }
                    if (finalSteps !== 20) {
                        params.append('steps', finalSteps.toString());
                    }
                    
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
                    }, 45000);
                    
                    if (response.ok) {
                        const contentType = response.headers.get('content-type');
                        if (contentType && contentType.startsWith('image/')) {
                            logger.add(`✅ Success`, { 
                                url: response.url,
                                used_model: tryModel,
                                final_size: `${finalWidth}x${finalHeight}`,
                                quality_mode: qualityMode,
                                hd_optimized: autoHD && hdOptimization?.optimized,
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
                                quality_mode: qualityMode,
                                prompt_complexity: promptComplexity,
                                hd_optimized: autoHD && hdOptimization?.optimized,
                                hd_details: hdOptimization,
                                cost: "FREE",
                                fallback_used: tryModel !== model,
                                auto_optimized: autoOptimize
                            };
                        } else {
                            throw new Error(`Invalid content type: ${contentType}`);
                        }
                    } else {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    
                } catch (e) {
                    lastError = e;
                    
                    if (retry < CONFIG.MAX_RETRIES - 1) {
                        await new Promise(resolve => setTimeout(resolve, 1000 * (retry + 1)));
                    }
                }
            }
        }
        
        throw new Error(`All models failed`);
    }
}

class MultiProviderRouter {
    constructor(apiKeys = {}) {
        this.providers = {};
        this.apiKeys = apiKeys;
        
        for (const [key, config] of Object.entries(CONFIG.PROVIDERS)) {
            if (config.enabled) {
                if (key === 'pollinations') {
                    this.providers[key] = new PollinationsProvider(config);
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
            const currentOptions = {
                ...options,
                seed: options.seed === -1 ? -1 : options.seed + i
            };
            
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
      return new Response(null, { 
        status: 204, 
        headers: corsHeaders()
      });
    }

    try {
      if (url.pathname === '/') {
        return handleUI(request);
      } 
      else if (url.pathname === '/v1/chat/completions') {
        return handleChatCompletions(request);
      } 
      else if (url.pathname === '/v1/images/generations') {
        return handleImageGenerations(request);
      }
      else if (url.pathname === '/v1/models') {
        return handleModelsRequest();
      }
      else if (url.pathname === '/v1/providers') {
        return handleProvidersRequest();
      }
      else if (url.pathname === '/v1/styles') {
        return handleStylesRequest();
      }
      else if (url.pathname === '/health') {
        return new Response(JSON.stringify({
          status: 'ok',
          version: CONFIG.PROJECT_VERSION,
          timestamp: new Date().toISOString()
        }), {
          headers: corsHeaders({ 'Content-Type': 'application/json' })
        });
      }
      else {
        return new Response(JSON.stringify({
          project: CONFIG.PROJECT_NAME,
          version: CONFIG.PROJECT_VERSION,
          features: ['17 Models', '12 Styles', '3 Quality Modes', 'Smart Analysis', 'Auto HD', 'History'],
          endpoints: [
            '/v1/images/generations',
            '/v1/chat/completions',
            '/v1/models',
            '/v1/providers',
            '/v1/styles',
            '/health'
          ]
        }), { 
          headers: corsHeaders({ 'Content-Type': 'application/json' })
        });
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

async function handleChatCompletions(request) {
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
                if (part.type === 'text') {
                    prompt += part.text + " ";
                }
            }
        }

        prompt = prompt.trim();
        if (!prompt) throw new Error("Empty prompt");

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
            qualityMode: body.quality_mode || 'standard'
        };

        const router = new MultiProviderRouter();
        const results = await router.generate(prompt, options, logger);

        let respContent = "";
        results.forEach((result, index) => {
            respContent += `![Generated Image ${index + 1}](${result.url})\n`;
        });

        const respId = `chatcmpl-${crypto.randomUUID()}`;

        if (body.stream) {
            const { readable, writable } = new TransformStream();
            const writer = writable.getWriter();
            const encoder = new TextEncoder();

            (async () => {
                try {
                    if (isWebUI) {
                        await writer.write(encoder.encode(`data: ${JSON.stringify({ debug: logger.get() })}\n\n`));
                    }

                    const chunk = {
                        id: respId, 
                        object: 'chat.completion.chunk', 
                        created: Math.floor(Date.now()/1000),
                        model: options.model, 
                        choices: [{ index: 0, delta: { content: respContent }, finish_reason: null }]
                    };
                    await writer.write(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
                    
                    const endChunk = {
                        id: respId, 
                        object: 'chat.completion.chunk', 
                        created: Math.floor(Date.now()/1000),
                        model: options.model, 
                        choices: [{ index: 0, delta: {}, finish_reason: 'stop' }]
                    };
                    await writer.write(encoder.encode(`data: ${JSON.stringify(endChunk)}\n\n`));
                    await writer.write(encoder.encode('data: [DONE]\n\n'));
                } finally {
                    await writer.close();
                }
            })();

            return new Response(readable, {
                headers: corsHeaders({ 'Content-Type': 'text/event-stream' })
            });
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
            }), { 
              headers: corsHeaders({ 'Content-Type': 'application/json' })
            });
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

async function handleImageGenerations(request) {
    const logger = new Logger();

    try {
        const body = await request.json();
        
        const prompt = body.prompt;
        if (!prompt || !prompt.trim()) {
            throw new Error("Prompt is required");
        }

        let width = 1024, height = 1024;
        if (body.size) {
            const [w, h] = body.size.split('x').map(Number);
            if (w && h) {
                width = w;
                height = h;
            }
        }
        if (body.width) width = body.width;
        if (body.height) height = body.height;

        const options = {
            provider: body.provider || null,
            model: body.model || "flux",
            width: Math.min(Math.max(width, 256), 2048),
            height: Math.min(Math.max(height, 256), 2048),
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
            qualityMode: body.quality_mode || 'standard'
        };

        const router = new MultiProviderRouter();
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
                style: r.style,
                quality_mode: r.quality_mode,
                prompt_complexity: r.prompt_complexity,
                steps: r.steps,
                guidance: r.guidance,
                auto_optimized: r.auto_optimized,
                hd_optimized: r.hd_optimized,
                cost: r.cost
            }))
        }), { 
          headers: corsHeaders({ 'Content-Type': 'application/json' })
        });
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
                    description: model.description
                });
            }
        }
    }
    
    return new Response(JSON.stringify({
        object: 'list',
        data: models,
        total: models.length
    }), { 
      headers: corsHeaders({ 'Content-Type': 'application/json' })
    });
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
    }), { 
      headers: corsHeaders({ 'Content-Type': 'application/json' })
    });
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
    }), { 
      headers: corsHeaders({ 'Content-Type': 'application/json' })
    });
}

function handleUI() {
  return new Response('Web UI temporarily disabled for file size optimization. Please use API endpoints.', {
    headers: corsHeaders({ 'Content-Type': 'text/plain' })
  });
}

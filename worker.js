// =================================================================================
//  項目: Flux AI Pro - Multi-Provider Edition
//  版本: 10.7.1 (修復 IndexedDB keyPath 錯誤 + 模板字串語法)
//  更新: 支持 Pollinations + Infip.pro 多供應商，自動獲取模型
// =================================================================================

const CONFIG = {
  PROJECT_NAME: "Flux-AI-Pro",
  PROJECT_VERSION: "10.7.1",
  API_MASTER_KEY: "1",
  FETCH_TIMEOUT: 120000,
  MAX_RETRIES: 3,
  
  POLLINATIONS_AUTH: {
    enabled: true,
    token: "", 
    method: "header"
  },
  
  INFIP_AUTH: {
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
      auth_mode: "required",
      requires_key: true,
      enabled: true,
      default: true,
      description: "官方 AI 圖像生成服務",
      features: {
        private_mode: true, custom_size: true, seed_control: true, negative_prompt: true, 
        enhance: true, nologo: true, style_presets: true, auto_hd: true, quality_modes: true, 
        auto_translate: true, reference_images: true, image_to_image: true, batch_generation: true, 
        api_key_auth: true
      },
      models: [
        { id: "nanobanana-pro", name: "Nano Banana Pro 🍌", confirmed: true, category: "special", description: "Nano Banana Pro 風格模型", max_size: 2048, pricing: { image_price: 0, currency: "free" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "gptimage", name: "GPT-Image 🎨", confirmed: true, category: "gptimage", description: "通用 GPT 圖像生成模型", max_size: 2048, pricing: { image_price: 0.0002, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "gptimage-large", name: "GPT-Image Large 🌟", confirmed: true, category: "gptimage", description: "高質量 GPT 圖像生成模型", max_size: 2048, pricing: { image_price: 0.0003, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "zimage", name: "Z-Image Turbo ⚡", confirmed: true, category: "zimage", description: "快速 6B 參數圖像生成", max_size: 2048, pricing: { image_price: 0.0002, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "flux", name: "Flux 標準版", confirmed: true, category: "flux", description: "快速且高質量的圖像生成", max_size: 2048, pricing: { image_price: 0.00012, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "turbo", name: "Flux Turbo ⚡", confirmed: true, category: "flux", description: "超快速圖像生成", max_size: 2048, pricing: { image_price: 0.0003, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "kontext", name: "Kontext 🎨", confirmed: true, category: "kontext", description: "上下文感知圖像生成（支持圖生圖）", max_size: 2048, pricing: { image_price: 0.04, currency: "pollen" }, supports_reference_images: true, max_reference_images: 1, input_modalities: ["text", "image"], output_modalities: ["image"] }
      ],
      rate_limit: null,
      max_size: { width: 2048, height: 2048 }
    },
    
    infip: {
      name: "Infip.pro",
      endpoint: "https://api.infip.pro",
      pathPrefix: "/v1/images/generations",
      type: "openai-compatible",
      auth_mode: "required",
      requires_key: true,
      enabled: false,
      default: false,
      description: "OpenAI 兼容的圖像生成 API",
      features: {
        private_mode: true, custom_size: true, seed_control: false, negative_prompt: true, 
        enhance: false, nologo: true, style_presets: true, auto_hd: true, quality_modes: true, 
        auto_translate: true, reference_images: false, image_to_image: false, batch_generation: true, 
        api_key_auth: true, auto_fetch_models: true
      },
      models: [],
      rate_limit: null,
      max_size: { width: 2048, height: 2048 }
    }
  },
  
  DEFAULT_PROVIDER: "pollinations",
  
  STYLE_CATEGORIES: {
    basic: { name: "基礎", icon: "⚡", order: 1 },
    illustration: { name: "插畫", icon: "🎨", order: 2 },
    manga: { name: "漫畫", icon: "📖", order: 3 },
    monochrome: { name: "黑白", icon: "⚫", order: 4 },
    realistic: { name: "寫實", icon: "📷", order: 5 },
    painting: { name: "繪畫", icon: "🖼️", order: 6 },
    "art-movement": { name: "藝術運動", icon: "🎭", order: 7 },
    visual: { name: "視覺風格", icon: "✨", order: 8 },
    digital: { name: "數位藝術", icon: "💻", order: 9 }
  },
  
  STYLE_PRESETS: {
    none: { name: "無風格", prompt: "", negative: "", category: "basic", icon: "⚡", description: "使用原始提示詞" },
    anime: { name: "動漫風格", prompt: "anime style, anime art, vibrant colors, cel shading, detailed anime", negative: "realistic, photograph, 3d, ugly", category: "illustration", icon: "🎭", description: "日系動漫風格" },
    ghibli: { name: "吉卜力", prompt: "Studio Ghibli style, Hayao Miyazaki, anime, soft colors, whimsical, detailed background, hand-drawn", negative: "realistic, dark, 3D, western animation", category: "illustration", icon: "🍃", description: "宮崎駿動畫風格" },
    manga: { name: "日本漫畫", prompt: "manga style, japanese comic art, black and white, screentones, halftone patterns, dynamic poses, detailed linework", negative: "color, colorful, realistic, photo, western comic", category: "manga", icon: "📖", description: "經典日本漫畫黑白網點" },
    "manga-color": { name: "彩色日漫", prompt: "colored manga style, japanese comic art, vibrant colors, cel shading, clean linework, digital coloring", negative: "realistic, photo, western style, messy", category: "manga", icon: "🎨", description: "彩色日本漫畫風格" },
    "american-comic": { name: "美式漫畫", prompt: "american comic book style, bold lines, vibrant colors, superhero art, dynamic action, dramatic shading", negative: "anime, manga, realistic photo, soft", category: "manga", icon: "💥", description: "美國超級英雄漫畫" },
    "korean-webtoon": { name: "韓國網漫", prompt: "korean webtoon style, manhwa art, detailed linework, soft colors, romantic, vertical scroll format", negative: "american comic, rough sketch, dark", category: "manga", icon: "📱", description: "韓國網路漫畫風格" },
    chibi: { name: "Q版漫畫", prompt: "chibi style, super deformed, cute, kawaii, big head small body, simple features, adorable", negative: "realistic proportions, serious, dark", category: "manga", icon: "🥰", description: "Q版可愛漫畫風格" },
    "black-white": { name: "黑白", prompt: "black and white, monochrome, high contrast, dramatic lighting, grayscale", negative: "color, colorful, vibrant, saturated", category: "monochrome", icon: "⚫⚪", description: "純黑白高對比效果" },
    sketch: { name: "素描", prompt: "pencil sketch, hand drawn, graphite drawing, detailed shading, artistic sketch, loose lines", negative: "color, digital, polished, photo", category: "monochrome", icon: "✏️", description: "鉛筆素描手繪質感" },
    "ink-drawing": { name: "水墨畫", prompt: "traditional chinese ink painting, sumi-e, brush strokes, minimalist, zen aesthetic, black ink on white paper", negative: "color, western style, detailed, cluttered", category: "monochrome", icon: "🖌️", description: "中國傳統水墨畫" },
    silhouette: { name: "剪影", prompt: "silhouette art, stark contrast, black shapes, minimalist, dramatic, shadow play, clean edges", negative: "detailed, realistic, colorful, textured", category: "monochrome", icon: "👤", description: "剪影藝術極簡構圖" },
    charcoal: { name: "炭筆畫", prompt: "charcoal drawing, rough texture, dramatic shading, expressive, smudged, artistic, monochrome", negative: "clean, digital, colorful, precise", category: "monochrome", icon: "🖤", description: "炭筆繪畫粗糙質感" },
    photorealistic: { name: "寫實照片", prompt: "photorealistic, 8k uhd, high quality, detailed, professional photography, sharp focus", negative: "anime, cartoon, illustration, painting, drawing, art", category: "realistic", icon: "📷", description: "攝影級寫實效果" },
    "oil-painting": { name: "油畫", prompt: "oil painting, canvas texture, visible brushstrokes, rich colors, artistic, masterpiece", negative: "photograph, digital art, anime, flat", category: "painting", icon: "🖼️", description: "經典油畫質感" },
    watercolor: { name: "水彩畫", prompt: "watercolor painting, soft colors, watercolor texture, artistic, hand-painted, paper texture, flowing colors", negative: "photograph, digital, sharp edges, 3d", category: "painting", icon: "💧", description: "清新水彩風格" },
    impressionism: { name: "印象派", prompt: "impressionist painting, soft brushstrokes, light and color focus, Monet style, outdoor scene, visible brush marks", negative: "sharp, detailed, photorealistic, dark", category: "art-movement", icon: "🌅", description: "印象派繪畫光影捕捉" },
    abstract: { name: "抽象派", prompt: "abstract art, non-representational, geometric shapes, bold colors, modern art, expressive", negative: "realistic, figurative, detailed, representational", category: "art-movement", icon: "🎭", description: "抽象藝術幾何圖形" },
    cubism: { name: "立體主義", prompt: "cubist style, geometric shapes, multiple perspectives, fragmented, Picasso inspired, angular forms", negative: "realistic, smooth, traditional, single perspective", category: "art-movement", icon: "🔷", description: "立體主義多視角解構" },
    surrealism: { name: "超現實主義", prompt: "surrealist art, dreamlike, bizarre, impossible scenes, Salvador Dali style, imaginative, symbolic", negative: "realistic, mundane, ordinary, logical", category: "art-movement", icon: "🌀", description: "超現實主義夢幻場景" },
    "pop-art": { name: "普普藝術", prompt: "pop art style, bold colors, comic book elements, Andy Warhol inspired, retro, screen print effect", negative: "subtle, muted, traditional, realistic", category: "art-movement", icon: "🎪", description: "普普藝術大膽色彩" },
    neon: { name: "霓虹燈", prompt: "neon lights, glowing, vibrant neon colors, night scene, electric, luminous, dark background", negative: "daylight, muted, natural, dull", category: "visual", icon: "💡", description: "霓虹燈發光效果" },
    vintage: { name: "復古", prompt: "vintage style, retro, aged, nostalgic, warm tones, classic, faded colors, old photograph", negative: "modern, futuristic, clean, vibrant", category: "visual", icon: "📻", description: "復古懷舊褪色效果" },
    steampunk: { name: "蒸汽朋克", prompt: "steampunk style, Victorian era, brass and copper, gears and mechanisms, mechanical, industrial", negative: "modern, minimalist, clean, futuristic", category: "visual", icon: "⚙️", description: "蒸汽朋克機械美學" },
    minimalist: { name: "極簡主義", prompt: "minimalist design, clean, simple, geometric, negative space, modern, uncluttered", negative: "detailed, complex, ornate, busy", category: "visual", icon: "◽", description: "極簡設計留白美學" },
    vaporwave: { name: "蒸氣波", prompt: "vaporwave aesthetic, retro futuristic, pastel colors, glitch art, 80s 90s nostalgia, neon pink and blue", negative: "realistic, natural, muted, traditional", category: "visual", icon: "🌴", description: "蒸氣波復古未來" },
    "pixel-art": { name: "像素藝術", prompt: "pixel art, 8-bit, 16-bit, retro gaming style, pixelated, nostalgic, limited color palette", negative: "high resolution, smooth, realistic, detailed", category: "digital", icon: "🎮", description: "像素藝術復古遊戲" },
    "low-poly": { name: "低多邊形", prompt: "low poly 3d, geometric, faceted, minimalist 3d art, polygonal, angular shapes", negative: "high poly, detailed, realistic, organic", category: "digital", icon: "🔺", description: "低多邊形3D幾何" },
    "3d-render": { name: "3D渲染", prompt: "3d render, cinema 4d, octane render, detailed, professional lighting, ray tracing, photorealistic 3d", negative: "2d, flat, hand drawn, sketchy", category: "digital", icon: "🎬", description: "專業3D渲染效果" },
    cyberpunk: { name: "賽博龐克", prompt: "cyberpunk style, neon lights, futuristic, dystopian, high tech low life, dark atmosphere, rain, urban", negative: "natural, rural, historical, bright daylight", category: "visual", icon: "🌃", description: "賽博龐克未來都市" }
  }
};

function corsHeaders(additional = {}) {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Source',
    ...additional
  };
}

function getClientIP(request) {
  return request.headers.get('CF-Connecting-IP') || 
         request.headers.get('X-Forwarded-For')?.split(',')[0] || 
         'unknown';
}

async function fetchWithTimeout(url, options = {}, timeout = 30000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

function normalizeInfipSize(width, height) {
  const ratio = width / height;
  if (Math.abs(ratio - 1) < 0.12) return "1024x1024";
  if (ratio > 1) return "1792x1024";
  return "1024x1792";
}

async function fetchInfipModels(apiKey) {
  try {
    const response = await fetchWithTimeout('https://api.infip.pro/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      }
    }, 10000);

    if (!response.ok) {
      console.error('Infip /v1/models failed: ' + response.status);
      return [];
    }

    const data = await response.json();
    return (data.data || []).map(m => ({
      id: m.id,
      name: m.id,
      confirmed: true,
      category: "infip",
      description: 'Infip model (tier: ' + (m.tier || 'unknown') + ')',
      max_size: 2048,
      pricing: { image_price: 0, currency: "credits" },
      input_modalities: ["text"],
      output_modalities: ["image"]
    }));
  } catch (error) {
    console.error("Failed to fetch Infip models:", error.message);
    return [];
  }
}

class Logger {
  constructor() { this.logs = []; }
  add(stage, data) { this.logs.push({ stage: stage, timestamp: new Date().toISOString(), ...data }); }
  get() { return this.logs; }
}

class RateLimiter {
  constructor(env) { this.env = env; }
  async checkLimit(clientIP) {
    if (!this.env.FLUX_KV) return { allowed: true, remaining: 5 };
    const now = new Date();
    const hourKey = 'nano_limit_' + clientIP + '_' + now.toDateString() + '_' + now.getHours();
    const count = await this.env.FLUX_KV.get(hourKey);
    const used = count ? parseInt(count) : 0;
    if (used >= 5) return { allowed: false, remaining: 0, reason: "🍌 本小時的 Nano Banana 能量已耗盡！請稍後再來（每小時限 5 張）" };
    await this.env.FLUX_KV.put(hourKey, (used + 1).toString(), { expirationTtl: 3600 });
    return { allowed: true, remaining: 5 - used - 1 };
  }
}

async function translateToEnglish(text, env) {
  if (!env || !env.AI) return { translated: false, text: text, error: "AI binding not available" };
  try {
    const response = await env.AI.run('@cf/meta/m2m100-1.2b', {
      text: text,
      source_lang: "zh",
      target_lang: "en"
    });
    if (response && response.translated_text) {
      return { translated: true, text: response.translated_text, original: text };
    }
    return { translated: false, text: text, error: "No translation returned" };
  } catch (error) {
    return { translated: false, text: text, error: error.message };
  }
}

class PromptAnalyzer {
  static analyzeComplexity(prompt) {
    const words = prompt.split(/\s+/).length;
    const hasDetails = /\b(detailed|intricate|complex|elaborate)\b/i.test(prompt);
    const hasLighting = /\b(lighting|light|shadow|glow|illuminate)\b/i.test(prompt);
    const hasTexture = /\b(texture|material|surface|grain)\b/i.test(prompt);
    let score = Math.min(words / 50, 1) * 0.4;
    if (hasDetails) score += 0.2;
    if (hasLighting) score += 0.2;
    if (hasTexture) score += 0.2;
    return Math.min(score, 1);
  }
  
  static recommendQualityMode(prompt, model) {
    const complexity = this.analyzeComplexity(prompt);
    if (complexity > 0.7) return 'ultra';
    if (complexity > 0.4) return 'standard';
    return 'economy';
  }
}

class HDOptimizer {
  static optimize(prompt, negativePrompt, model, width, height, qualityMode, autoHD) {
    if (!autoHD) return { prompt: prompt, negativePrompt: negativePrompt, width: width, height: height, optimized: false };
    
    let enhancedPrompt = prompt;
    let enhancedNegative = negativePrompt;
    let finalWidth = width;
    let finalHeight = height;
    let optimizations = [];
    let hdLevel = 'standard';
    let sizeUpscaled = false;
    
    if (qualityMode === 'ultra') {
      hdLevel = 'ultra';
      if (width <= 1024 && height <= 1024) {
        finalWidth = Math.min(width * 1.5, 2048);
        finalHeight = Math.min(height * 1.5, 2048);
        sizeUpscaled = true;
        optimizations.push('Resolution upscaled 1.5x for ultra quality');
      }
      if (!/\b(8k|4k|uhd|ultra|high.?quality|high.?res)\b/i.test(enhancedPrompt)) {
        enhancedPrompt = enhancedPrompt + ', 8k uhd, ultra high quality, sharp focus, professional';
        optimizations.push('Added ultra HD quality keywords');
      }
      if (enhancedNegative && !/\blow.?quality\b/i.test(enhancedNegative)) {
        enhancedNegative = enhancedNegative + ', low quality, blurry, pixelated, low resolution';
        optimizations.push('Enhanced negative prompt for ultra mode');
      }
    } else if (qualityMode === 'standard') {
      hdLevel = 'standard';
      if (!/\b(high.?quality|detailed)\b/i.test(enhancedPrompt)) {
        enhancedPrompt = enhancedPrompt + ', high quality, detailed';
        optimizations.push('Added standard HD keywords');
      }
    }
    
    return {
      prompt: enhancedPrompt,
      negativePrompt: enhancedNegative,
      width: Math.round(finalWidth),
      height: Math.round(finalHeight),
      optimized: optimizations.length > 0,
      optimizations: optimizations,
      hd_level: hdLevel,
      size_upscaled: sizeUpscaled
    };
  }
}

class ParameterOptimizer {
  static optimizeSteps(model, width, height, style, qualityMode, userSteps) {
    if (userSteps !== null && userSteps !== undefined) return { steps: userSteps, reasoning: "User specified" };
    
    let baseSteps = 20;
    const totalPixels = width * height;
    
    if (qualityMode === 'ultra') baseSteps = 30;
    else if (qualityMode === 'economy') baseSteps = 15;
    
    if (totalPixels > 2048 * 2048) baseSteps += 5;
    
    if (style !== 'none' && CONFIG.STYLE_PRESETS[style]) {
      const styleCategory = CONFIG.STYLE_PRESETS[style].category;
      if (styleCategory === 'realistic' || styleCategory === 'painting') baseSteps += 5;
    }
    
    if (model === 'turbo') baseSteps = Math.max(Math.round(baseSteps * 0.6), 10);
    
    return { steps: Math.min(baseSteps, 50), reasoning: "Auto-optimized based on quality mode, size, and style" };
  }
  
  static optimizeGuidance(model, style, qualityMode) {
    let guidance = 7.5;
    
    if (qualityMode === 'ultra') guidance = 8.5;
    else if (qualityMode === 'economy') guidance = 6.5;
    
    if (style !== 'none' && CONFIG.STYLE_PRESETS[style]) {
      const styleCategory = CONFIG.STYLE_PRESETS[style].category;
      if (styleCategory === 'realistic') guidance += 1;
      else if (styleCategory === 'abstract' || styleCategory === 'art-movement') guidance -= 0.5;
    }
    
    if (model === 'turbo') guidance = Math.max(guidance - 1, 5);
    
    return Math.max(Math.min(guidance, 15), 3);
  }
}

class StyleProcessor {
  static applyStyle(prompt, styleKey, negativePrompt) {
    if (!styleKey || styleKey === 'none') return { enhancedPrompt: prompt, enhancedNegative: negativePrompt };
    
    const style = CONFIG.STYLE_PRESETS[styleKey];
    if (!style) return { enhancedPrompt: prompt, enhancedNegative: negativePrompt };
    
    let enhancedPrompt = prompt;
    if (style.prompt) {
      enhancedPrompt = prompt + ', ' + style.prompt;
    }
    
    let enhancedNegative = negativePrompt || "";
    if (style.negative) {
      enhancedNegative = enhancedNegative ? enhancedNegative + ', ' + style.negative : style.negative;
    }
    
    return { enhancedPrompt: enhancedPrompt, enhancedNegative: enhancedNegative };
  }
}
// =================================================================================
//  Provider 類別：Pollinations 和 Infip
// =================================================================================

class PollinationsProvider {
  constructor(config, env) { 
    this.config = config; 
    this.name = config.name; 
    this.env = env; 
  }
  
  async generate(prompt, options, logger) {
    const { 
      model = "zimage", width = 1024, height = 1024, seed = -1, 
      negativePrompt = "", guidance = null, steps = null, 
      enhance = false, nologo = true, privateMode = true, 
      style = "none", autoOptimize = true, autoHD = true, 
      qualityMode = 'standard', referenceImages = []
    } = options;

    let apiModel = model; 
    
    const modelConfig = this.config.models.find(m => m.id === model);
    const supportsRefImages = modelConfig?.supports_reference_images || false;
    const maxRefImages = modelConfig?.max_reference_images || 0;
    
    let validReferenceImages = [];
    if (referenceImages && referenceImages.length > 0) {
      if (!supportsRefImages) {
        logger.add("⚠️ Reference Images", { 
          warning: model + " 不支持參考圖像，已忽略", 
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
    logger.add("🧠 Prompt Analysis", { 
      complexity: (promptComplexity * 100).toFixed(1) + '%', 
      recommended_quality: recommendedQuality, 
      selected_quality: qualityMode, 
      has_reference_images: validReferenceImages.length > 0 
    });
    
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
      logger.add("🎯 Steps Optimization", { 
        steps: stepsOptimization.steps, 
        reasoning: stepsOptimization.reasoning 
      });
      if (guidance === null) finalGuidance = ParameterOptimizer.optimizeGuidance(model, style, qualityMode);
      else finalGuidance = guidance;
    } else {
      finalSteps = steps || 20;
      finalGuidance = guidance || 7.5;
    }
    
    const { enhancedPrompt, enhancedNegative } = StyleProcessor.applyStyle(optimizedPrompt, style, finalNegative);
    const finalFullPrompt = enhancedPrompt;

    logger.add("🎨 Style Processing", { 
      selected_style: style, 
      style_name: CONFIG.STYLE_PRESETS[style]?.name || style, 
      style_applied: style !== 'none', 
      original_prompt_length: optimizedPrompt.length, 
      enhanced_prompt_length: enhancedPrompt.length 
    });
    
    const currentSeed = seed === -1 ? Math.floor(Math.random() * 1000000) : seed;
    let fullPrompt = finalFullPrompt;
    if (enhancedNegative && enhancedNegative.trim()) {
      fullPrompt = finalFullPrompt + " [negative: " + enhancedNegative + "]";
    }
    
    const encodedPrompt = encodeURIComponent(fullPrompt);
    const pathPrefix = this.config.pathPrefix || "";
    let baseUrl = this.config.endpoint + pathPrefix + "/" + encodedPrompt;
    
    const params = new URLSearchParams();
    params.append('model', apiModel); 
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
      headers['Authorization'] = 'Bearer ' + authConfig.token;
      logger.add("🔐 API Authentication", { 
        method: "Bearer Token", 
        token_prefix: authConfig.token.substring(0, 8) + "...", 
        enabled: true, 
        endpoint: this.config.endpoint 
      });
    } else {
      logger.add("⚠️ No API Key", { 
        authenticated: false, 
        note: "新 API 端點需要 API Key，請設置 POLLINATIONS_API_KEY 環境變量", 
        endpoint: this.config.endpoint, 
        warning: "未認證的請求可能會失敗" 
      });
    }
    
    const url = baseUrl + '?' + params.toString();
    logger.add("📡 API Request", { 
      endpoint: this.config.endpoint, 
      path: pathPrefix + "/" + encodedPrompt.substring(0, 50) + "...", 
      model: apiModel, 
      authenticated: authConfig.enabled && !!authConfig.token, 
      full_url: url.substring(0, 100) + "..." 
    });
    
    for (let retry = 0; retry < CONFIG.MAX_RETRIES; retry++) {
      try {
        const response = await fetchWithTimeout(url, { method: 'GET', headers: headers }, 120000);
        
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.startsWith('image/')) {
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
              seed: currentSeed 
            });
            
            const imageBlob = await response.blob();
            const imageBuffer = await imageBlob.arrayBuffer();
            
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
              cost: "FREE", 
              auto_optimized: autoOptimize 
            };
          } else { 
            throw new Error("Invalid content type: " + contentType); 
          }
        } else if (response.status === 401) { 
          throw new Error("Authentication failed: Invalid or missing API key"); 
        } else if (response.status === 403) { 
          throw new Error("Access forbidden: API key may lack required permissions"); 
        } else { 
          throw new Error("HTTP " + response.status + ": " + (await response.text()).substring(0, 200)); 
        }
      } catch (e) {
        logger.add("❌ Request Failed", { 
          error: e.message, 
          model: apiModel, 
          retry: retry + 1, 
          max_retries: CONFIG.MAX_RETRIES, 
          endpoint: this.config.endpoint 
        });
        if (retry < CONFIG.MAX_RETRIES - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (retry + 1)));
        } else {
          throw new Error("Generation failed: " + e.message);
        }
      }
    }
    throw new Error("Model " + model + " failed after " + CONFIG.MAX_RETRIES + " retries");
  }
}

class InfipProvider {
  constructor(config, env) { 
    this.config = config; 
    this.name = config.name; 
    this.env = env; 
  }
  
  async generate(prompt, options, logger) {
    const { 
      model = "flux-pro", width = 1024, height = 1024, 
      negativePrompt = "", style = "none", autoOptimize = true, 
      autoHD = true, qualityMode = 'standard'
    } = options;

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

    const promptComplexity = PromptAnalyzer.analyzeComplexity(basePrompt);
    logger.add("🧠 Prompt Analysis", { 
      complexity: (promptComplexity * 100).toFixed(1) + '%', 
      selected_quality: qualityMode 
    });
    
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
        logger.add("🎨 HD Optimization", { 
          mode: qualityMode, 
          original: width + "x" + height, 
          optimized: finalWidth + "x" + finalHeight 
        });
      }
    }
    
    const { enhancedPrompt, enhancedNegative } = StyleProcessor.applyStyle(optimizedPrompt, style, finalNegative);
    logger.add("🎨 Style Processing", { 
      selected_style: style, 
      style_name: CONFIG.STYLE_PRESETS[style]?.name || style 
    });
    
    const authConfig = CONFIG.INFIP_AUTH;
    if (!authConfig.enabled || !authConfig.token) {
      throw new Error("Infip API Key not configured. Please set INFIP_API_KEY environment variable.");
    }

    const size = normalizeInfipSize(finalWidth, finalHeight);
    let finalPrompt = enhancedPrompt;
    if (enhancedNegative && enhancedNegative.trim()) {
      finalPrompt = enhancedPrompt + "\n\nAvoid: " + enhancedNegative;
    }

    const payload = {
      model: model,
      prompt: finalPrompt,
      n: 1,
      size: size,
      response_format: "url"
    };

    const headers = {
      'Authorization': 'Bearer ' + authConfig.token,
      'Content-Type': 'application/json'
    };

    logger.add("📡 API Request", { 
      endpoint: this.config.endpoint, 
      model: model, 
      size: size,
      authenticated: true 
    });

    for (let retry = 0; retry < CONFIG.MAX_RETRIES; retry++) {
      try {
        const response = await fetchWithTimeout(
          this.config.endpoint + this.config.pathPrefix,
          { 
            method: 'POST', 
            headers: headers,
            body: JSON.stringify(payload)
          }, 
          120000
        );

        if (!response.ok) {
          const errorText = await response.text();
          if (response.status === 401) throw new Error("Invalid Infip API Key");
          if (response.status === 403) throw new Error("Access forbidden");
          throw new Error("HTTP " + response.status + ": " + errorText.substring(0, 200));
        }

        const data = await response.json();
        logger.add("✅ Response Received", { 
          model: model, 
          images_count: data.data?.length || 0 
        });

        if (!data.data || data.data.length === 0) {
          throw new Error("No image data in response");
        }

        const imageUrl = data.data[0].url;
        
        const imageResponse = await fetchWithTimeout(imageUrl, { method: 'GET' }, 60000);
        if (!imageResponse.ok) throw new Error("Failed to download image from URL");

        const imageBlob = await imageResponse.blob();
        const imageBuffer = await imageBlob.arrayBuffer();

        logger.add("✅ Success", { 
          provider: "Infip.pro",
          model: model, 
          size: size,
          quality_mode: qualityMode,
          style: style,
          auto_translated: translationLog.translated
        });

        return { 
          imageData: imageBuffer, 
          contentType: 'image/png',
          url: imageUrl,
          provider: this.name, 
          model: model,
          seed: -1,
          style: style, 
          style_name: CONFIG.STYLE_PRESETS[style]?.name || style,
          width: finalWidth, 
          height: finalHeight, 
          quality_mode: qualityMode,
          auto_translated: translationLog.translated,
          authenticated: true,
          cost: "CREDITS"
        };

      } catch (e) {
        logger.add("❌ Request Failed", { 
          error: e.message, 
          model: model, 
          retry: retry + 1, 
          max_retries: CONFIG.MAX_RETRIES 
        });
        if (retry < CONFIG.MAX_RETRIES - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (retry + 1)));
        } else {
          throw new Error("Generation failed: " + e.message);
        }
      }
    }
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
        if (key === 'infip') this.providers[key] = new InfipProvider(config, env);
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
    
    logger.add("🚀 Provider Selection", { 
      requested: requestedProvider || 'default', 
      selected: providerName,
      num_outputs: numOutputs 
    });
    
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
  
  getAvailableProviders() {
    return Object.entries(CONFIG.PROVIDERS)
      .filter(([key, config]) => config.enabled)
      .map(([key, config]) => ({
        id: key,
        name: config.name,
        endpoint: config.endpoint,
        authenticated: key === 'pollinations' ? CONFIG.POLLINATIONS_AUTH.enabled : CONFIG.INFIP_AUTH.enabled,
        models_count: config.models.length
      }));
  }
}

// =================================================================================
//  主 Worker 處理器
// =================================================================================

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const startTime = Date.now();
    const clientIP = getClientIP(request);

    if (env.POLLINATIONS_API_KEY) {
      CONFIG.POLLINATIONS_AUTH.enabled = true;
      CONFIG.POLLINATIONS_AUTH.token = env.POLLINATIONS_API_KEY;
    } else {
      CONFIG.POLLINATIONS_AUTH.enabled = false;
      CONFIG.POLLINATIONS_AUTH.token = "";
    }

    if (env.INFIP_API_KEY) {
      CONFIG.INFIP_AUTH.enabled = true;
      CONFIG.INFIP_AUTH.token = env.INFIP_API_KEY;
      CONFIG.PROVIDERS.infip.enabled = true;

      try {
        const models = await fetchInfipModels(env.INFIP_API_KEY);
        if (models && models.length > 0) CONFIG.PROVIDERS.infip.models = models;
      } catch (e) {
        console.error("Failed to fetch infip models:", e.message);
      }
    } else {
      CONFIG.INFIP_AUTH.enabled = false;
      CONFIG.INFIP_AUTH.token = "";
      CONFIG.PROVIDERS.infip.enabled = false;
      CONFIG.PROVIDERS.infip.models = [];
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    try {
      let response;

      if (url.pathname === '/' || url.pathname === '') {
        response = handleUI(request);
      } else if (url.pathname === '/nano') {
        response = handleNanoPage(request);
      } else if (url.pathname === '/_internal/generate') {
        response = await handleInternalGenerate(request, env, ctx);
      } else if (url.pathname === '/health') {
        const providers = Object.entries(CONFIG.PROVIDERS)
          .filter(([_, cfg]) => cfg.enabled)
          .map(([id, cfg]) => ({
            id,
            name: cfg.name,
            endpoint: cfg.endpoint,
            authenticated: id === 'pollinations' ? CONFIG.POLLINATIONS_AUTH.enabled : CONFIG.INFIP_AUTH.enabled,
            models_count: (cfg.models || []).length
          }));

        response = new Response(JSON.stringify({
          status: "ok",
          version: CONFIG.PROJECT_VERSION,
          timestamp: new Date().toISOString(),
          client_ip: clientIP,
          providers
        }), {
          headers: corsHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
        });
      } else {
        response = new Response(JSON.stringify({
          error: "Not Found",
          available_paths: ["/", "/nano", "/_internal/generate", "/health"]
        }), {
          status: 404,
          headers: corsHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
        });
      }

      const duration = Date.now() - startTime;
      const headers = new Headers(response.headers);
      headers.set('X-Response-Time', duration + 'ms');
      headers.set('X-Worker-Version', CONFIG.PROJECT_VERSION);

      return new Response(response.body, { status: response.status, headers });
    } catch (error) {
      const duration = Date.now() - startTime;
      return new Response(JSON.stringify({
        error: {
          message: error.message,
          type: "worker_error",
          duration_ms: duration
        }
      }), {
        status: 500,
        headers: corsHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
      });
    }
  }
};

async function handleInternalGenerate(request, env, ctx) {
  const logger = new Logger();
  const startTime = Date.now();
  const clientIP = getClientIP(request);

  try {
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: { message: "Method not allowed" } }), {
        status: 405,
        headers: corsHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
      });
    }

    const body = await request.json();
    const prompt = (body.prompt || '').trim();
    if (!prompt) throw new Error("Prompt is required");

    if (body.model === 'nanobanana-pro') {
      const source = request.headers.get('X-Source');
      if (source !== 'nano-page') {
        return new Response(JSON.stringify({ error: { message: "🍌 Nano Banana Pro 模型僅限 /nano 使用", type: "access_denied" } }), {
          status: 403,
          headers: corsHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
        });
      }

      const limiter = new RateLimiter(env);
      const check = await limiter.checkLimit(clientIP);
      if (!check.allowed) {
        return new Response(JSON.stringify({ error: { message: check.reason, type: "rate_limit_exceeded" } }), {
          status: 429,
          headers: corsHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
        });
      }
    }

    const width = Math.min(Math.max(parseInt(body.width || 1024), 256), 2048);
    const height = Math.min(Math.max(parseInt(body.height || 1024), 256), 2048);

    const seedInput = body.seed !== undefined ? body.seed : -1;
    let seedValue = -1;
    if (seedInput !== -1) {
      const parsed = parseInt(seedInput);
      if (!isNaN(parsed)) seedValue = parsed;
    }

    let referenceImages = [];
    if (Array.isArray(body.reference_images)) {
      referenceImages = body.reference_images
        .map(s => String(s || '').trim())
        .filter(Boolean)
        .filter(u => { try { new URL(u); return true; } catch { return false; } });
    }

    const autoOptimize = body.auto_optimize !== false;
    const userSteps = body.steps ? parseInt(body.steps) : null;
    const userGuidance = body.guidance_scale ? parseFloat(body.guidance_scale) : null;

    const options = {
      provider: body.provider || null,
      model: body.model || "gptimage",
      width,
      height,
      numOutputs: Math.min(Math.max(parseInt(body.n || 1), 1), 4),
      seed: seedValue,
      negativePrompt: body.negative_prompt || "",
      guidance: autoOptimize ? null : userGuidance,
      steps: autoOptimize ? null : userSteps,
      enhance: body.enhance === true,
      nologo: body.nologo !== false,
      privateMode: body.private !== false,
      style: body.style || "none",
      autoOptimize,
      autoHD: body.auto_hd !== false,
      qualityMode: body.quality_mode || "standard",
      referenceImages
    };

    const router = new MultiProviderRouter({}, env);
    const results = await router.generate(prompt, options, logger);
    const duration = Date.now() - startTime;

    if (results.length === 1 && results[0].imageData) {
      const r = results[0];
      return new Response(r.imageData, {
        headers: {
          'Content-Type': r.contentType || 'image/png',
          'Content-Disposition': 'inline; filename="flux-ai-' + r.seed + '.png"',
          'X-Provider': r.provider,
          'X-Model': r.model,
          'X-Seed': String(r.seed),
          'X-Width': String(r.width),
          'X-Height': String(r.height),
          'X-Quality-Mode': r.quality_mode || 'standard',
          'X-Style': r.style || 'none',
          'X-Style-Name': r.style_name || r.style || 'none',
          'X-Generation-Time': duration + 'ms',
          ...corsHeaders()
        }
      });
    }

    const data = await Promise.all(results.map(async (r) => {
      const u8 = new Uint8Array(r.imageData);
      let bin = '';
      for (let i = 0; i < u8.byteLength; i++) bin += String.fromCharCode(u8[i]);
      return {
        image: 'data:' + (r.contentType || 'image/png') + ';base64,' + btoa(bin),
        provider: r.provider,
        model: r.model,
        seed: r.seed,
        width: r.width,
        height: r.height
      };
    }));

    return new Response(JSON.stringify({
      created: Math.floor(Date.now() / 1000),
      generation_time_ms: duration,
      data
    }), {
      headers: corsHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
    });
  } catch (e) {
    logger.add("❌ Error", { message: e.message });
    return new Response(JSON.stringify({
      error: { message: e.message, debug_logs: logger.get() }
    }), {
      status: 400,
      headers: corsHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
    });
  }
}
// =================================================================================
//  /nano 頁面（簡化版，仍保留：seed、尺寸、風格、冷卻、限額 header）
// =================================================================================

function handleNanoPage(request) {
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>NanoBanana Pro</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif; background:#0b0b0f; color:#fff; margin:0; }
  .wrap { max-width: 980px; margin: 0 auto; padding: 20px; }
  .card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 16px; }
  textarea,input,select,button { width:100%; padding:10px; border-radius:10px; border:1px solid rgba(255,255,255,0.18); background: rgba(0,0,0,0.3); color:#fff; }
  textarea { resize: vertical; min-height: 110px; }
  .row { display:grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .row3 { display:grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
  .btn { background: #FACC15; color:#000; font-weight: 800; cursor:pointer; border:none; }
  .btn:disabled { opacity:0.6; cursor:not-allowed; }
  .muted { color:#9ca3af; font-size: 12px; }
  img { max-width:100%; border-radius: 12px; border:1px solid rgba(255,255,255,0.12); }
  .top { display:flex; align-items:center; justify-content:space-between; margin-bottom: 12px; }
  .pill { font-size:12px; padding: 4px 8px; border-radius: 999px; background: rgba(250,204,21,0.12); border:1px solid rgba(250,204,21,0.35); color:#FACC15; }
</style>
</head>
<body>
  <div class="wrap">
    <div class="top">
      <div style="font-weight:900;font-size:18px;">NanoBanana Pro</div>
      <div class="pill">/nano 限定</div>
    </div>

    <div class="card">
      <div style="margin-bottom:8px;font-weight:700;">Prompt</div>
      <textarea id="prompt" placeholder="輸入提示詞（支援中文）"></textarea>

      <div style="margin-top:12px;" class="row">
        <div>
          <div style="margin-bottom:6px;font-weight:700;">Negative</div>
          <input id="negative" value="nsfw, ugly, text, watermark, low quality, bad anatomy" />
        </div>
        <div>
          <div style="margin-bottom:6px;font-weight:700;">Style</div>
          <select id="style">
            <option value="none">None</option>
            <option value="photorealistic">Photorealistic</option>
            <option value="anime">Anime</option>
            <option value="3d-render">3D Render</option>
            <option value="cyberpunk">Cyberpunk</option>
            <option value="manga">Manga</option>
            <option value="oil-painting">Oil Painting</option>
          </select>
        </div>
      </div>

      <div style="margin-top:12px;" class="row3">
        <div>
          <div style="margin-bottom:6px;font-weight:700;">Width</div>
          <input id="width" type="number" value="1024" min="256" max="2048" />
        </div>
        <div>
          <div style="margin-bottom:6px;font-weight:700;">Height</div>
          <input id="height" type="number" value="1024" min="256" max="2048" />
        </div>
        <div>
          <div style="margin-bottom:6px;font-weight:700;">Seed</div>
          <input id="seed" type="number" value="-1" disabled />
          <div class="muted" style="margin-top:6px;">
            <button id="toggleSeed" style="width:auto;padding:6px 10px;">切換隨機/鎖定</button>
          </div>
        </div>
      </div>

      <div style="margin-top:12px;display:flex;gap:10px;align-items:center;">
        <button id="genBtn" class="btn">Generate</button>
        <div class="muted" id="cooldownText"></div>
      </div>

      <div class="muted" style="margin-top:10px;">
        注意：此頁面會送出 <code>X-Source: nano-page</code>，後端才允許呼叫 nanobanana-pro。
      </div>
    </div>

    <div style="margin-top:16px;" class="card">
      <div style="font-weight:700;margin-bottom:8px;">Result</div>
      <div id="status" class="muted" style="margin-bottom:10px;">Idle.</div>
      <img id="img" style="display:none;" />
      <div style="margin-top:10px; display:flex; gap:10px;">
        <button id="downloadBtn" style="width:auto;display:none;">Download</button>
        <a href="/" style="color:#9ca3af;align-self:center;">Back to main</a>
      </div>
    </div>
  </div>

<script>
  var COOLDOWN_KEY = 'nano_cooldown_ts_v1';
  var COOLDOWN_SEC = 180;
  var cooldownTimer = null;

  var seedLocked = false;
  var els = {
    prompt: document.getElementById('prompt'),
    negative: document.getElementById('negative'),
    style: document.getElementById('style'),
    width: document.getElementById('width'),
    height: document.getElementById('height'),
    seed: document.getElementById('seed'),
    toggleSeed: document.getElementById('toggleSeed'),
    genBtn: document.getElementById('genBtn'),
    cooldownText: document.getElementById('cooldownText'),
    status: document.getElementById('status'),
    img: document.getElementById('img'),
    downloadBtn: document.getElementById('downloadBtn'),
  };

  function setCooldown(seconds) {
    if (cooldownTimer) clearInterval(cooldownTimer);
    els.genBtn.disabled = true;

    var left = seconds;
    els.cooldownText.textContent = 'Cooldown: ' + left + 's';

    cooldownTimer = setInterval(function() {
      left--;
      if (left <= 0) {
        clearInterval(cooldownTimer);
        localStorage.removeItem(COOLDOWN_KEY);
        els.cooldownText.textContent = '';
        els.genBtn.disabled = false;
      } else {
        els.cooldownText.textContent = 'Cooldown: ' + left + 's';
      }
    }, 1000);
  }

  function resumeCooldownIfAny() {
    var ts = localStorage.getItem(COOLDOWN_KEY);
    if (!ts) return;
    var diff = Math.floor((Date.now() - parseInt(ts, 10)) / 1000);
    if (diff < COOLDOWN_SEC) setCooldown(COOLDOWN_SEC - diff);
  }

  els.toggleSeed.onclick = function() {
    seedLocked = !seedLocked;
    if (seedLocked) {
      els.seed.disabled = false;
      if (els.seed.value === '-1') els.seed.value = Math.floor(Math.random() * 1000000);
    } else {
      els.seed.value = '-1';
      els.seed.disabled = true;
    }
  };

  els.downloadBtn.onclick = function() {
    var a = document.createElement('a');
    a.href = els.img.src;
    a.download = 'nano-banana.png';
    a.click();
  };

  els.genBtn.onclick = async function() {
    var p = els.prompt.value.trim();
    if (!p) { els.status.textContent = 'Prompt required.'; return; }

    els.status.textContent = 'Generating...';
    els.genBtn.disabled = true;

    try {
      var res = await fetch('/_internal/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Source': 'nano-page' },
        body: JSON.stringify({
          prompt: p,
          negative_prompt: els.negative.value,
          model: 'nanobanana-pro',
          width: parseInt(els.width.value, 10),
          height: parseInt(els.height.value, 10),
          style: els.style.value,
          seed: parseInt(els.seed.value, 10),
          n: 1,
          nologo: true
        })
      });

      if (!res.ok) {
        var errJson = null;
        try { errJson = await res.json(); } catch {}
        throw new Error(errJson?.error?.message || ('HTTP ' + res.status));
      }

      var blob = await res.blob();
      var url = URL.createObjectURL(blob);

      els.img.src = url;
      els.img.style.display = 'block';
      els.downloadBtn.style.display = 'inline-block';

      els.status.textContent = 'Done. Provider=' + (res.headers.get('X-Provider') || '') + ', seed=' + (res.headers.get('X-Seed') || '');

      // 啟動冷卻
      localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
      setCooldown(COOLDOWN_SEC);

      // 如果鎖 seed，回填實際 seed
      if (seedLocked) {
        var realSeed = res.headers.get('X-Seed');
        if (realSeed) els.seed.value = realSeed;
      }
    } catch (e) {
      els.status.textContent = 'Error: ' + e.message;
      els.genBtn.disabled = false;
    }
  };

  resumeCooldownIfAny();
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
function handleUI(request) {
  const providerStatusHTML = Object.entries(CONFIG.PROVIDERS)
    .filter(([key, cfg]) => cfg.enabled)
    .map(([key, cfg]) => {
      const authEnabled = key === 'pollinations' ? CONFIG.POLLINATIONS_AUTH.enabled : CONFIG.INFIP_AUTH.enabled;
      const statusColor = authEnabled ? '#22c55e' : '#f59e0b';
      const statusIcon = authEnabled ? '🔐' : '⚠️';
      const statusText = authEnabled ? '已認證' : '需要 API Key';
      return '<div style="font-size:11px;color:' + statusColor + ';font-weight:600;margin-left:8px">' +
        statusIcon + ' ' + cfg.name + ': ' + statusText +
      '</div>';
    }).join('');

  const styleCategories = CONFIG.STYLE_CATEGORIES;
  const stylePresets = CONFIG.STYLE_PRESETS;

  let styleOptionsHTML = '';
  const sortedCategories = Object.entries(styleCategories).sort((a, b) => a[1].order - b[1].order);
  for (const [categoryKey, categoryInfo] of sortedCategories) {
    const stylesInCategory = Object.entries(stylePresets).filter(([k, s]) => s.category === categoryKey);
    if (stylesInCategory.length > 0) {
      styleOptionsHTML += '<optgroup label="' + categoryInfo.icon + ' ' + categoryInfo.name + '">';
      for (const [styleKey, styleCfg] of stylesInCategory) {
        const selected = styleKey === 'none' ? ' selected' : '';
        styleOptionsHTML += '<option value="' + styleKey + '"' + selected + '>' + styleCfg.icon + ' ' + styleCfg.name + '</option>';
      }
      styleOptionsHTML += '</optgroup>';
    }
  }

  const ENABLED_PROVIDERS_DATA = Object.entries(CONFIG.PROVIDERS)
    .filter(([id, p]) => p.enabled)
    .map(([id, p]) => ({ id: id, name: p.name, supports_seed: id !== 'infip' }));

  const MODELS_BY_PROVIDER_DATA = Object.fromEntries(
    Object.entries(CONFIG.PROVIDERS)
      .filter(([id, p]) => p.enabled)
      .map(([id, p]) => {
        const models = (p.models || []).filter(m => m.id !== 'nanobanana-pro');
        return [id, models.map(m => ({ id: m.id, name: m.name || m.id, category: m.category || 'default' }))];
      })
  );

  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${CONFIG.PROJECT_NAME} v${CONFIG.PROJECT_VERSION}</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎨</text></svg>">

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
  color: #fff;
  min-height: 100vh;
}
.container { max-width: 100%; margin: 0; padding: 0; height: 100vh; display: flex; flex-direction: column; }

.top-nav {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding: 15px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}
.nav-left { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
.logo {
  color: #f59e0b;
  font-size: 24px;
  font-weight: 800;
  text-shadow: 0 0 20px rgba(245,158,11,0.6);
  display: flex;
  align-items: center;
  gap: 10px;
}
.badge {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}
.api-status { display: flex; gap: 5px; flex-wrap: wrap; }

.nav-menu { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
.nav-btn {
  padding: 8px 16px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  color: #9ca3af;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
}
.nav-btn:hover { border-color: #f59e0b; color: #fff; }
.nav-btn.active {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: #fff;
  border-color: #f59e0b;
}
.nav-btn.nano-btn:hover {
  border-color: #FACC15;
  background: rgba(250,204,21,0.1);
  color: #FACC15;
  box-shadow: 0 0 10px rgba(250,204,21,0.2);
}

.main-content { flex: 1; display: flex; overflow: hidden; }

.left-panel {
  width: 320px;
  background: rgba(255,255,255,0.03);
  border-right: 1px solid rgba(255,255,255,0.1);
  overflow-y: auto;
  padding: 20px;
  flex-shrink: 0;
}
.center-panel {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
.right-panel {
  width: 380px;
  background: rgba(255,255,255,0.03);
  border-left: 1px solid rgba(255,255,255,0.1);
  overflow-y: auto;
  padding: 20px;
  flex-shrink: 0;
}

@media (max-width: 1024px) {
  .main-content { flex-direction: column; }
  .left-panel, .right-panel {
    width: 100%;
    border: none;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }
}

.form-group { margin-bottom: 16px; }
label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  font-size: 13px;
  color: #e5e7eb;
}
input, textarea, select {
  width: 100%;
  padding: 10px;
  background: rgba(0,0,0,0.3);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  transition: all 0.3s;
}
input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: #f59e0b;
  background: rgba(0,0,0,0.5);
}
textarea { resize: vertical; min-height: 100px; font-family: inherit; }

.btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  border: none;
  border-radius: 10px;
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(245,158,11,0.3);
}
.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(245,158,11,0.5);
}
.btn:active { transform: scale(0.98); }
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.size-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 8px;
  margin-bottom: 16px;
}
.size-card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}
.size-card:hover { background: rgba(255,255,255,0.1); }
.size-card.active {
  border-color: #f59e0b;
  background: rgba(245,158,11,0.1);
}
.size-name { font-size: 11px; font-weight: 600; color: #d1d5db; }
.size-dim { font-size: 10px; color: #6b7280; margin-top: 4px; }

.result-image {
  width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.1);
  margin-bottom: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}
.meta-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-top: 12px;
}
.meta-item {
  background: rgba(255,255,255,0.05);
  padding: 8px;
  border-radius: 6px;
  font-size: 12px;
}
.meta-label { color: #9ca3af; font-weight: 600; }
.meta-value { color: #e5e7eb; margin-top: 4px; }

.action-btns {
  display: flex;
  gap: 10px;
  margin-top: 12px;
}
.action-btn {
  flex: 1;
  padding: 10px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  color: #e5e7eb;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.3s;
  text-align: center;
}
.action-btn:hover {
  background: rgba(255,255,255,0.1);
  border-color: #f59e0b;
}

.history-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
  margin-top: 16px;
}
.history-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid rgba(255,255,255,0.1);
}
.history-item:hover { transform: scale(1.05); box-shadow: 0 4px 16px rgba(0,0,0,0.4); }
.history-item img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  display: block;
}
.history-meta {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
  padding: 8px;
  font-size: 10px;
  color: #d1d5db;
}
.history-delete {
  position: absolute;
  top: 6px;
  right: 6px;
  background: rgba(239,68,68,0.9);
  border: none;
  color: #fff;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}
.history-item:hover .history-delete { opacity: 1; }

.status-text {
  font-size: 13px;
  color: #9ca3af;
  margin-top: 12px;
  padding: 10px;
  background: rgba(0,0,0,0.3);
  border-radius: 6px;
  border-left: 3px solid #f59e0b;
}

.advanced-toggle {
  margin-top: 12px;
  padding: 8px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 6px;
  cursor: pointer;
  text-align: center;
  font-size: 12px;
  color: #9ca3af;
  font-weight: 600;
  transition: all 0.3s;
}
.advanced-toggle:hover { background: rgba(255,255,255,0.08); }
.advanced-panel { display: none; margin-top: 12px; }
.advanced-panel.active { display: block; }

.row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.storage-info {
  font-size: 11px;
  color: #6b7280;
  margin-top: 8px;
  text-align: center;
}
</style>
</head>
<body>
  <div class="container">
    <div class="top-nav">
      <div class="nav-left">
        <div class="logo">
          <span>🎨</span>
          <div>
            <div>${CONFIG.PROJECT_NAME}</div>
            <div class="badge">v${CONFIG.PROJECT_VERSION}</div>
          </div>
        </div>
        <div class="api-status">${providerStatusHTML}</div>
      </div>
      <div class="nav-menu">
        <a href="/nano" class="nav-btn nano-btn">🍌 Nano Pro</a>
        <button id="historyBtn" class="nav-btn">📚 歷史記錄 (<span id="historyCount">0</span>)</button>
      </div>
    </div>

    <div class="main-content">
      <div class="left-panel">
        <div class="form-group">
          <label>🎯 Provider</label>
          <select id="provider"></select>
        </div>

        <div class="form-group">
          <label>🤖 Model</label>
          <select id="model"></select>
        </div>

        <div class="form-group">
          <label>📐 預設尺寸</label>
          <div class="size-grid" id="sizePresets"></div>
        </div>

        <div class="form-group">
          <div class="row">
            <div>
              <label>寬度</label>
              <input type="number" id="width" value="1024" min="256" max="2048">
            </div>
            <div>
              <label>高度</label>
              <input type="number" id="height" value="1024" min="256" max="2048">
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>🎨 風格預設</label>
          <select id="style">${styleOptionsHTML}</select>
        </div>

        <div class="form-group">
          <label>⚡ 品質模式</label>
          <select id="qualityMode">
            <option value="economy">Economy - 快速生成</option>
            <option value="standard" selected>Standard - 標準品質</option>
            <option value="ultra">Ultra - 超高品質</option>
          </select>
        </div>

        <div class="advanced-toggle" id="advancedToggle">🔧 進階選項</div>
        <div class="advanced-panel" id="advancedPanel">
          <div class="form-group">
            <label>🎲 Seed</label>
            <div class="row">
              <input type="number" id="seed" value="-1" disabled>
              <button id="toggleSeed" class="action-btn">鎖定 Seed</button>
            </div>
          </div>

          <div class="form-group">
            <label>🖼️ 參考圖像 (Kontext 專用)</label>
            <textarea id="referenceImages" rows="2" placeholder="輸入圖片網址，逗號分隔"></textarea>
          </div>

          <div class="form-group">
            <label>📊 生成數量</label>
            <input type="number" id="numOutputs" value="1" min="1" max="4">
          </div>
        </div>
      </div>

      <div class="center-panel">
        <div class="form-group">
          <label>✨ 提示詞 (Prompt)</label>
          <textarea id="prompt" rows="5" placeholder="描述你想生成的圖像... (支援中文自動翻譯)"></textarea>
        </div>

        <div class="form-group">
          <label>🚫 負面提示詞 (Negative Prompt)</label>
          <textarea id="negativePrompt" rows="3" placeholder="描述你不想要的元素..."></textarea>
        </div>

        <button id="genBtn" class="btn">🎨 開始生成</button>

        <div class="status-text" id="status">準備就緒</div>

        <div id="resultArea" style="display:none; margin-top:24px;">
          <img id="resultImg" class="result-image" alt="Generated Image">
          <div class="action-btns">
            <button id="downloadBtn" class="action-btn">💾 下載</button>
            <button id="saveToHistoryBtn" class="action-btn">📌 保存到歷史</button>
          </div>
          <div class="meta-grid" id="metaGrid"></div>
        </div>
      </div>

      <div class="right-panel">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <label style="margin:0;">📚 生成歷史</label>
          <div style="display:flex; gap:8px;">
            <button id="exportBtn" class="action-btn" style="flex:none; padding:6px 12px;">匯出</button>
            <button id="clearBtn" class="action-btn" style="flex:none; padding:6px 12px;">清空</button>
          </div>
        </div>
        <div class="storage-info">儲存空間: <span id="storageSize">0 KB</span></div>
        <div class="history-grid" id="historyGrid"></div>
      </div>
    </div>
  </div>

<script>
  var ENABLED_PROVIDERS = ${JSON.stringify(ENABLED_PROVIDERS_DATA)};
  var MODELS_BY_PROVIDER = ${JSON.stringify(MODELS_BY_PROVIDER_DATA)};
  var PRESET_SIZES = ${JSON.stringify(CONFIG.PRESET_SIZES)};

  var DB_NAME = 'FluxAI_DB';
  var STORE_NAME = 'images';
  var DB_VERSION = 2;

  function idbReqToPromise(req) {
    return new Promise(function(resolve, reject) {
      req.onsuccess = function() { resolve(req.result); };
      req.onerror = function() { reject(req.error); };
    });
  }
  function txDone(tx) {
    return new Promise(function(resolve, reject) {
      tx.oncomplete = function() { resolve(); };
      tx.onerror = function() { reject(tx.error); };
      tx.onabort = function() { reject(tx.error || new Error('Transaction aborted')); };
    });
  }

  var dbPromise = new Promise(function(resolve, reject) {
    var req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = function(e) {
      var db = e.target.result;
      if (db.objectStoreNames.contains(STORE_NAME)) db.deleteObjectStore(STORE_NAME);
      db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
    };
    req.onsuccess = function(e) { resolve(e.target.result); };
    req.onerror = function(e) { reject(e.target.error); };
  });

  async function dbAddImage(doc) {
    var db = await dbPromise;
    var tx = db.transaction(STORE_NAME, 'readwrite');
    var store = tx.objectStore(STORE_NAME);
    var clean = Object.assign({}, doc);
    delete clean.id;
    var id = await idbReqToPromise(store.add(clean));
    await txDone(tx);
    return id;
  }

  async function dbGetAllImages() {
    var db = await dbPromise;
    var tx = db.transaction(STORE_NAME, 'readonly');
    var store = tx.objectStore(STORE_NAME);
    var list = await idbReqToPromise(store.getAll());
    await txDone(tx);
    return list || [];
  }

  async function dbDeleteImageById(id) {
    var db = await dbPromise;
    var tx = db.transaction(STORE_NAME, 'readwrite');
    var store = tx.objectStore(STORE_NAME);
    await idbReqToPromise(store.delete(id));
    await txDone(tx);
  }

  async function dbClearAllImages() {
    var db = await dbPromise;
    var tx = db.transaction(STORE_NAME, 'readwrite');
    var store = tx.objectStore(STORE_NAME);
    await idbReqToPromise(store.clear());
    await txDone(tx);
  }

  function escapeHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  var els = {
    provider: document.getElementById('provider'),
    model: document.getElementById('model'),
    sizePresets: document.getElementById('sizePresets'),
    width: document.getElementById('width'),
    height: document.getElementById('height'),
    style: document.getElementById('style'),
    qualityMode: document.getElementById('qualityMode'),
    seed: document.getElementById('seed'),
    toggleSeed: document.getElementById('toggleSeed'),
    referenceImages: document.getElementById('referenceImages'),
    numOutputs: document.getElementById('numOutputs'),
    prompt: document.getElementById('prompt'),
    negativePrompt: document.getElementById('negativePrompt'),
    genBtn: document.getElementById('genBtn'),
    status: document.getElementById('status'),
    resultArea: document.getElementById('resultArea'),
    resultImg: document.getElementById('resultImg'),
    downloadBtn: document.getElementById('downloadBtn'),
    saveToHistoryBtn: document.getElementById('saveToHistoryBtn'),
    metaGrid: document.getElementById('metaGrid'),
    historyGrid: document.getElementById('historyGrid'),
    historyCount: document.getElementById('historyCount'),
    historyBtn: document.getElementById('historyBtn'),
    exportBtn: document.getElementById('exportBtn'),
    clearBtn: document.getElementById('clearBtn'),
    storageSize: document.getElementById('storageSize'),
    advancedToggle: document.getElementById('advancedToggle'),
    advancedPanel: document.getElementById('advancedPanel')
  };

  var currentResult = null;

  function populateProviders() {
    els.provider.innerHTML = '';
    ENABLED_PROVIDERS.forEach(function(p) {
      var opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = p.name;
      els.provider.appendChild(opt);
    });
    updateModelsForProvider(els.provider.value);
  }

  function updateModelsForProvider(providerId) {
    els.model.innerHTML = '';
    var models = MODELS_BY_PROVIDER[providerId] || [];
    if (!models.length) {
      els.model.innerHTML = '<option value="">無可用模型</option>';
      return;
    }
    models.forEach(function(m) {
      var opt = document.createElement('option');
      opt.value = m.id;
      opt.textContent = m.name;
      els.model.appendChild(opt);
    });
  }

  function populateSizePresets() {
    els.sizePresets.innerHTML = '';
    Object.entries(PRESET_SIZES).forEach(function([key, preset]) {
      var div = document.createElement('div');
      div.className = 'size-card';
      div.dataset.width = preset.width;
      div.dataset.height = preset.height;
      div.innerHTML = '<div class="size-name">' + escapeHtml(preset.name) + '</div><div class="size-dim">' + preset.width + 'x' + preset.height + '</div>';
      div.onclick = function() {
        document.querySelectorAll('.size-card').forEach(function(c) { c.classList.remove('active'); });
        div.classList.add('active');
        els.width.value = preset.width;
        els.height.value = preset.height;
      };
      els.sizePresets.appendChild(div);
      if (key === 'square-1k') div.classList.add('active');
    });
  }

  els.provider.onchange = function() {
    updateModelsForProvider(els.provider.value);
  };

  var seedLocked = false;
  els.toggleSeed.onclick = function() {
    seedLocked = !seedLocked;
    if (seedLocked) {
      els.seed.disabled = false;
      if (els.seed.value === '-1') els.seed.value = Math.floor(Math.random() * 1000000);
      els.toggleSeed.textContent = '解鎖 Seed';
    } else {
      els.seed.value = '-1';
      els.seed.disabled = true;
      els.toggleSeed.textContent = '鎖定 Seed';
    }
  };

  els.advancedToggle.onclick = function() {
    els.advancedPanel.classList.toggle('active');
    els.advancedToggle.textContent = els.advancedPanel.classList.contains('active') ? '🔽 收起進階' : '🔧 進階選項';
  };

  els.downloadBtn.onclick = function() {
    if (!currentResult) return;
    var a = document.createElement('a');
    a.href = currentResult.url;
    a.download = 'flux-ai-' + currentResult.seed + '.png';
    a.click();
  };

  els.saveToHistoryBtn.onclick = async function() {
    if (!currentResult) return;
    await dbAddImage(currentResult);
    await updateHistoryCount();
    await loadHistory();
    els.status.textContent = '✅ 已保存到歷史記錄';
  };

  async function updateHistoryCount() {
    var images = await dbGetAllImages();
    els.historyCount.textContent = images.length;
    var total = images.reduce(function(sum, img) { return sum + (img.size || 0); }, 0);
    els.storageSize.textContent = (total / 1024).toFixed(2) + ' KB';
  }

  async function loadHistory() {
    var images = await dbGetAllImages();
    els.historyGrid.innerHTML = '';
    images.slice().reverse().forEach(function(img) {
      var div = document.createElement('div');
      div.className = 'history-item';
      div.innerHTML = '<img src="' + img.url + '"><div class="history-meta">Seed: ' + escapeHtml(img.seed) + '</div><button class="history-delete">×</button>';
      
      div.querySelector('img').onclick = function() {
        els.resultImg.src = img.url;
        els.resultArea.style.display = 'block';
        currentResult = img;
        displayMetadata(img);
      };
      
      div.querySelector('.history-delete').onclick = async function(e) {
        e.stopPropagation();
        if (!confirm('確定刪除此圖片？')) return;
        await dbDeleteImageById(img.id);
        await updateHistoryCount();
        await loadHistory();
      };
      
      els.historyGrid.appendChild(div);
    });
  }

  els.clearBtn.onclick = async function() {
    if (!confirm('確定清空所有歷史記錄？')) return;
    await dbClearAllImages();
    await updateHistoryCount();
    await loadHistory();
  };

  els.exportBtn.onclick = async function() {
    var images = await dbGetAllImages();
    var blob = new Blob([JSON.stringify(images, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'flux-history-' + Date.now() + '.json';
    a.click();
  };

  function displayMetadata(data) {
    els.metaGrid.innerHTML = '';
    var meta = {
      'Provider': data.provider,
      'Model': data.model,
      'Seed': data.seed,
      '尺寸': data.width + 'x' + data.height,
      '風格': data.style_name || data.style,
      '品質': data.quality_mode
    };
    Object.entries(meta).forEach(function([k, v]) {
      var div = document.createElement('div');
      div.className = 'meta-item';
      div.innerHTML = '<div class="meta-label">' + escapeHtml(k) + '</div><div class="meta-value">' + escapeHtml(v) + '</div>';
      els.metaGrid.appendChild(div);
    });
  }

  els.genBtn.onclick = async function() {
    var p = els.prompt.value.trim();
    if (!p) {
      els.status.textContent = '❌ 請輸入提示詞';
      return;
    }

    els.genBtn.disabled = true;
    els.status.textContent = '🎨 正在生成...';

    try {
      var refs = els.referenceImages.value.trim();
      var refList = refs ? refs.split(',').map(function(s) { return s.trim(); }).filter(Boolean) : [];

      var payload = {
        prompt: p,
        negative_prompt: els.negativePrompt.value.trim(),
        provider: els.provider.value,
        model: els.model.value,
        width: parseInt(els.width.value, 10),
        height: parseInt(els.height.value, 10),
        style: els.style.value,
        quality_mode: els.qualityMode.value,
        seed: parseInt(els.seed.value, 10),
        n: parseInt(els.numOutputs.value, 10),
        auto_optimize: true,
        auto_hd: true,
        reference_images: refList
      };

      var res = await fetch('/_internal/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        var errJson = null;
        try { errJson = await res.json(); } catch {}
        throw new Error(errJson?.error?.message || ('HTTP ' + res.status));
      }

      var blob = await res.blob();
      var url = URL.createObjectURL(blob);

      els.resultImg.src = url;
      els.resultArea.style.display = 'block';

      currentResult = {
        url: url,
        size: blob.size,
        timestamp: Date.now(),
        prompt: p,
        negative_prompt: payload.negative_prompt,
        provider: res.headers.get('X-Provider') || payload.provider,
        model: res.headers.get('X-Model') || payload.model,
        seed: res.headers.get('X-Seed') || payload.seed,
        width: res.headers.get('X-Width') || payload.width,
        height: res.headers.get('X-Height') || payload.height,
        style: res.headers.get('X-Style') || payload.style,
        style_name: res.headers.get('X-Style-Name') || payload.style,
        quality_mode: res.headers.get('X-Quality-Mode') || payload.quality_mode
      };

      displayMetadata(currentResult);
      els.status.textContent = '✅ 生成完成！Provider: ' + currentResult.provider + ', Seed: ' + currentResult.seed;

    } catch (e) {
      els.status.textContent = '❌ 錯誤: ' + e.message;
    } finally {
      els.genBtn.disabled = false;
    }
  };

  populateProviders();
  populateSizePresets();
  updateHistoryCount();
  loadHistory();
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

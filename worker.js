// =================================================================================
//  項目: Flux AI Pro - NanoBanana Pro Edition (方案 C - 完整版)
//  版本: 11.0.0-nano-pro-c
//  功能: 圖生圖 + 多圖融合 + 限額追蹤 + 參考強度控制 + 完整記錄
//  更新: 2026-01-10
// =================================================================================

const CONFIG = {
  PROJECT_NAME: "Flux-AI-Pro-NanoBanana-Pro",
  PROJECT_VERSION: "11.0.0-nano-pro-c",
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
    "wallpaper-fhd": { name: "桌布 Full HD", width: 1920, height: 1080 }
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
      description: "官方 AI 圖像生成服務（需要 API Key）",
      features: {
        private_mode: true, custom_size: true, seed_control: true, negative_prompt: true, enhance: true, nologo: true, style_presets: true, auto_hd: true, quality_modes: true, auto_translate: true, reference_images: true, image_to_image: true, batch_generation: true, api_key_auth: true
      },
      models: [
        { 
          id: "nano-banana", 
          name: "Nano Banana 🍌", 
          confirmed: true, 
          category: "special", 
          description: "Nano Banana 風格模型 (每小時限額 20 張)", 
          max_size: 2048, 
          pricing: { image_price: 0, currency: "free" }, 
          input_modalities: ["text", "image"], 
          output_modalities: ["image"],
          supports_reference_images: true,
          max_reference_images: 3,
          supports_image_to_image: true
        },
        { 
          id: "gptimage", 
          name: "GPT-Image 🎨", 
          confirmed: true, 
          category: "gptimage", 
          description: "通用 GPT 圖像生成模型", 
          max_size: 2048, 
          pricing: { image_price: 0.0002, currency: "pollen" }, 
          input_modalities: ["text"], 
          output_modalities: ["image"] 
        },
        { 
          id: "gptimage-large", 
          name: "GPT-Image Large 🌟", 
          confirmed: true, 
          category: "gptimage", 
          description: "高質量 GPT 圖像生成模型", 
          max_size: 2048, 
          pricing: { image_price: 0.0003, currency: "pollen" }, 
          input_modalities: ["text"], 
          output_modalities: ["image"] 
        },
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
          output_modalities: ["image"],
          supports_image_to_image: true
        }
      ],
      rate_limit: null,
      max_size: { width: 2048, height: 2048 }
    }
  },
  
  DEFAULT_PROVIDER: "pollinations",
  
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
    "3d-render": { name: "3D渲染", prompt: "3d render, cinema 4d, octane render, detailed, professional lighting, ray tracing, photorealistic 3d", negative: "2d, flat, hand drawn, sketchy", category: "digital", icon: "🎬", description: "專業3D渲染寫實光影" },
    gradient: { name: "漸變", prompt: "gradient art, smooth color transitions, modern, vibrant gradients, soft blending, colorful", negative: "solid colors, flat, harsh edges, traditional", category: "digital", icon: "🌈", description: "漸變藝術柔和過渡" },
    glitch: { name: "故障藝術", prompt: "glitch art, digital corruption, RGB shift, distorted, cyberpunk, data moshing, scanlines", negative: "clean, perfect, traditional, smooth", category: "digital", icon: "📺", description: "故障美學數位崩壞" },
    "ukiyo-e": { name: "浮世繪", prompt: "ukiyo-e style, japanese woodblock print, Hokusai inspired, traditional japanese art, flat colors, bold outlines", negative: "modern, western, photographic, 3d", category: "traditional", icon: "🗾", description: "日本浮世繪木刻版畫" },
    "stained-glass": { name: "彩繪玻璃", prompt: "stained glass art, colorful, leaded glass, church window style, luminous, geometric patterns, light through glass", negative: "realistic, photographic, modern, opaque", category: "traditional", icon: "🪟", description: "彩繪玻璃透光效果" },
    "paper-cut": { name: "剪紙藝術", prompt: "paper cut art, layered paper, shadow box effect, intricate patterns, handcrafted, silhouette", negative: "painted, digital, realistic, photographic", category: "traditional", icon: "✂️", description: "剪紙藝術層次堆疊" },
    gothic: { name: "哥特風格", prompt: "gothic style, dark, ornate, Victorian gothic, mysterious, dramatic, baroque elements, elegant darkness", negative: "bright, cheerful, minimalist, modern", category: "aesthetic", icon: "🦇", description: "哥特美學黑暗華麗" },
    "art-nouveau": { name: "新藝術", prompt: "art nouveau style, organic forms, flowing lines, decorative, elegant, floral motifs, Alphonse Mucha inspired", negative: "geometric, minimalist, modern, rigid", category: "aesthetic", icon: "🌺", description: "新藝術流動線條" },
    cyberpunk: { name: "賽博朋克", prompt: "cyberpunk style, neon lights, futuristic, sci-fi, dystopian, high-tech low-life, blade runner style", negative: "natural, rustic, medieval, fantasy", category: "scifi", icon: "🌃", description: "賽博朋克未來科幻" },
    fantasy: { name: "奇幻風格", prompt: "fantasy art, magical, epic fantasy, detailed fantasy illustration, mystical, enchanted", negative: "modern, realistic, mundane, contemporary", category: "fantasy", icon: "🐉", description: "奇幻魔法世界" }
  },
  
  STYLE_CATEGORIES: {
    'basic': { name: '基礎', icon: '⚡', order: 1 },
    'illustration': { name: '插畫動畫', icon: '🎨', order: 2 },
    'manga': { name: '漫畫風格', icon: '📖', order: 3 },
    'monochrome': { name: '黑白單色', icon: '⚫', order: 4 },
    'realistic': { name: '寫實照片', icon: '📷', order: 5 },
    'painting': { name: '繪畫風格', icon: '🖼️', order: 6 },
    'art-movement': { name: '藝術流派', icon: '🎭', order: 7 },
    'visual': { name: '視覺風格', icon: '✨', order: 8 },
    'digital': { name: '數位風格', icon: '💻', order: 9 },
    'traditional': { name: '傳統藝術', icon: '🏛️', order: 10 },
    'aesthetic': { name: '美學風格', icon: '🌟', order: 11 },
    'scifi': { name: '科幻', icon: '🚀', order: 12 },
    'fantasy': { name: '奇幻', icon: '🐉', order: 13 }
  },
  
  OPTIMIZATION_RULES: {
    MODEL_STEPS: { 
      "nano-banana": { min: 15, optimal: 20, max: 30 },
      "gptimage": { min: 10, optimal: 18, max: 28 },
      "gptimage-large": { min: 15, optimal: 25, max: 35 },
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
      "manga": 1.0, 
      "pixel-art": 0.85, 
      "3d-render": 1.15, 
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
      "nano-banana": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.0, guidance_boost: 1.0, recommended_quality: "standard" },
      "gptimage": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.0, guidance_boost: 1.0, recommended_quality: "standard" },
      "gptimage-large": { min_resolution: 1280, max_resolution: 2048, optimal_steps_boost: 1.15, guidance_boost: 1.05, recommended_quality: "ultra" },
      "zimage": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.0, guidance_boost: 1.0, recommended_quality: "economy" },
      "flux": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.1, guidance_boost: 1.0, recommended_quality: "standard" },
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

class RateLimiter {
  constructor(env) {
    this.env = env;
    this.KV = env.FLUX_KV;
  }
  
  async checkLimit(ip) {
    if (!this.KV) {
      console.warn("⚠️ FLUX_KV 未綁定，跳過限制");
      return { allowed: true, remaining: 20 };
    }
    
    const key = `nano_limit:${ip}`;
    const windowSize = 3600 * 1000;
    const maxRequests = 20;
    
    try {
      const rawData = await this.KV.get(key);
      let timestamps = rawData ? JSON.parse(rawData) : [];
      const now = Date.now();
      
      timestamps = timestamps.filter(ts => now - ts < windowSize);
      
      if (timestamps.length >= maxRequests) {
        const oldest = timestamps[0];
        const resetTime = oldest + windowSize;
        const waitMin = Math.ceil((resetTime - now) / 60000);
        return { 
          allowed: false, 
          reason: `🍌 香蕉能量耗盡！限額已滿 (20張/小時)。請休息 ${waitMin} 分鐘後再來。`, 
          remaining: 0,
          resetTime: resetTime,
          waitMinutes: waitMin
        };
      }
      
      timestamps.push(now);
      await this.KV.put(key, JSON.stringify(timestamps), { expirationTtl: 3600 });
      
      return { 
        allowed: true, 
        remaining: maxRequests - timestamps.length,
        used: timestamps.length,
        total: maxRequests
      };
    } catch (err) {
      console.error("KV Error:", err);
      return { allowed: true, remaining: 20 };
    }
  }
}

function getClientIP(request) {
  return request.headers.get('cf-connecting-ip') || 
         request.headers.get('x-forwarded-for') || 
         request.headers.get('x-real-ip') || 
         'unknown';
}

async function translateToEnglish(text, env) {
  try {
    const hasChinese = /[\u4e00-\u9fa5\u3400-\u4db5\u20000-\u2a6d6]/.test(text);
    if (!hasChinese) return { text: text, translated: false, reason: "No Chinese detected" };
    
    const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=" + encodeURIComponent(text);
    const response = await fetch(url, { 
      method: 'GET', 
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' 
      } 
    });
    
    if (!response.ok) throw new Error(`Google API HTTP ${response.status}`);
    
    const data = await response.json();
    let translatedText = "";
    
    if (data && data[0] && Array.isArray(data[0])) { 
      data[0].forEach(segment => { 
        if (segment && segment[0]) translatedText += segment[0]; 
      }); 
    }
    
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
    
    complexKeywords.forEach(keyword => { 
      if (lowerPrompt.includes(keyword)) score += 0.1; 
    });
    
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
    if (hdConfig.HD_PROMPTS[hdLevel]) { 
      enhancedPrompt = prompt + ", " + hdConfig.HD_PROMPTS[hdLevel]; 
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
      optimizations, 
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
    const reasoning = [model + ": " + baseSteps + "步"];
    
    const totalPixels = width * height;
    let sizeMultiplier = 1.0;
    
    if (totalPixels >= rules.SIZE_MULTIPLIER.xlarge.threshold) { 
      sizeMultiplier = rules.SIZE_MULTIPLIER.xlarge.multiplier; 
      reasoning.push("超大 x" + sizeMultiplier); 
    }
    else if (totalPixels >= rules.SIZE_MULTIPLIER.large.threshold) { 
      sizeMultiplier = rules.SIZE_MULTIPLIER.large.multiplier; 
      reasoning.push("大尺寸 x" + sizeMultiplier); 
    }
    else if (totalPixels <= rules.SIZE_MULTIPLIER.small.threshold) { 
      sizeMultiplier = rules.SIZE_MULTIPLIER.small.multiplier; 
    }
    else { 
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
      if (!CONFIG.STYLE_PRESETS || typeof CONFIG.STYLE_PRESETS !== 'object') return { enhancedPrompt: prompt, enhancedNegative: negativePrompt || "" };
      
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
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-Source', 
    'Access-Control-Max-Age': '86400', 
    ...additionalHeaders 
  };
}

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
      referenceImages = [],
      imageToImageMode = false,
      referenceStrength = 0.7
    } = options;
    
    const modelConfig = this.config.models.find(m => m.id === model);
    const supportsRefImages = modelConfig?.supports_reference_images || false;
    const maxRefImages = modelConfig?.max_reference_images || 0;
    const supportsI2I = modelConfig?.supports_image_to_image || false;
    
    let validReferenceImages = [];
    if (referenceImages && referenceImages.length > 0) {
      if (!supportsRefImages) {
        logger.add("⚠️ Reference Images", { 
          warning: model + " 不支持參考圖像，已忽略", 
          supported_models: ["nano-banana", "kontext"] 
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
          mode: imageToImageMode ? "圖生圖" : "多圖融合" 
        });
      }
    }
    
    if (imageToImageMode && !supportsI2I) {
      logger.add("⚠️ Image-to-Image Not Supported", { 
        model: model, 
        message: "該模型不支持圖生圖，改用文生圖模式" 
      });
      imageToImageMode = false;
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
      has_reference_images: validReferenceImages.length > 0,
      image_to_image_mode: imageToImageMode
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
    if (enhancedNegative && enhancedNegative.trim()) fullPrompt = finalFullPrompt + " [negative: " + enhancedNegative + "]";
    
    const encodedPrompt = encodeURIComponent(fullPrompt);
    const pathPrefix = this.config.pathPrefix || "";
    let baseUrl = this.config.endpoint + pathPrefix + "/" + encodedPrompt;
    
    const params = new URLSearchParams();
    params.append('model', model);
    params.append('width', finalWidth.toString());
    params.append('height', finalHeight.toString());
    params.append('seed', currentSeed.toString());
    params.append('nologo', nologo.toString());
    params.append('enhance', enhance.toString());
    params.append('private', privateMode.toString());
    
    if (validReferenceImages && validReferenceImages.length > 0) {
      if (imageToImageMode) {
        params.append('image', validReferenceImages[0]);
        params.append('strength', referenceStrength.toString());
        logger.add("🖼️ Image-to-Image Parameters", { 
          image: validReferenceImages[0].substring(0, 50) + "...", 
          strength: referenceStrength 
        });
      } else {
        params.append('image', validReferenceImages.join(','));
        logger.add("🔀 Reference Fusion Parameters", { 
          count: validReferenceImages.length, 
          urls: validReferenceImages 
        });
      }
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
      model: model, 
      authenticated: authConfig.enabled && !!authConfig.token, 
      generation_mode: imageToImageMode ? "圖生圖" : (validReferenceImages.length > 0 ? "多圖融合" : "文生圖"),
      reference_images_count: validReferenceImages.length,
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
              used_model: model, 
              final_size: finalWidth + "x" + finalHeight, 
              quality_mode: qualityMode, 
              style_used: style, 
              style_name: CONFIG.STYLE_PRESETS[style]?.name || style, 
              hd_optimized: autoHD && hdOptimization?.optimized, 
              auto_translated: translationLog.translated, 
              reference_images_used: validReferenceImages.length, 
              generation_mode: imageToImageMode ? "圖生圖" : (validReferenceImages.length > 0 ? "多圖融合" : "文生圖"),
              reference_strength: imageToImageMode ? referenceStrength : null,
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
              reference_strength: imageToImageMode ? referenceStrength : null,
              generation_mode: imageToImageMode ? "圖生圖" : (validReferenceImages.length > 0 ? "多圖融合" : "文生圖"), 
              authenticated: authConfig.enabled && !!authConfig.token, 
              cost: "FREE", 
              auto_optimized: autoOptimize 
            };
          } else { 
            throw new Error("Invalid content type: " + contentType); 
          }
        } else if (response.status === 401) { 
          throw new Error("Authentication failed: Invalid or missing API key. Please set POLLINATIONS_API_KEY"); 
        } 
        else if (response.status === 403) { 
          throw new Error("Access forbidden: API key may lack required permissions"); 
        } 
        else { 
          throw new Error("HTTP " + response.status + ": " + (await response.text()).substring(0, 200)); 
        }
      } catch (e) {
        logger.add("❌ Request Failed", { 
          error: e.message, 
          model: model, 
          retry: retry + 1, 
          max_retries: CONFIG.MAX_RETRIES, 
          endpoint: this.config.endpoint 
        });
        if (retry < CONFIG.MAX_RETRIES - 1) await new Promise(resolve => setTimeout(resolve, 1000 * (retry + 1)));
        else throw new Error("Generation failed: " + e.message);
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
        if (key === 'pollinations') this.providers[key] = new PollinationsProvider(config, env);
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
    for (let i = 0; i < numOutputs; i++) {
      const currentOptions = { ...options, seed: options.seed === -1 ? -1 : options.seed + i };
      const result = await provider.generate(prompt, currentOptions, logger);
      results.push(result);
    }
    return results;
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

    if (body.model === 'nano-banana') {
        const source = request.headers.get('X-Source');
        if (source !== 'nano-page') {
             return new Response(JSON.stringify({ 
                error: { message: "🍌 Nano Banana 模型僅限於獨立頁面使用！", type: 'access_denied' } 
            }), { status: 403, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
        }

        const limiter = new RateLimiter(env);
        const check = await limiter.checkLimit(clientIP);
        
        if (!check.allowed) {
            return new Response(JSON.stringify({ 
                error: { 
                    message: check.reason, 
                    type: 'rate_limit_exceeded',
                    remaining: check.remaining,
                    used: check.used,
                    total: check.total,
                    reset_in_minutes: check.waitMinutes
                } 
            }), { status: 429, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
        }

        logger.add("🍌 Rate Limit Status", { 
            remaining: check.remaining, 
            used: check.used,
            max: check.total, 
            ip: clientIP,
            window: "1小時"
        });
    }
    
    let width = 1024, height = 1024;
    if (body.width) width = body.width;
    if (body.height) height = body.height;
    
    let referenceImages = [];
    if (body.reference_images && Array.isArray(body.reference_images)) {
      referenceImages = body.reference_images.filter(url => { 
        try { new URL(url); return true; } 
        catch { return false; } 
      }).slice(0, 3);
    }

    const imageToImageMode = body.generation_mode === 'image-to-image' && referenceImages.length > 0;
    const referenceStrength = body.reference_strength !== undefined ? parseFloat(body.reference_strength) : 0.7;
    
    const validStrength = Math.max(0.1, Math.min(1.0, referenceStrength));
    
    if (imageToImageMode) {
      logger.add("🖼️ Image-to-Image Mode", { 
        base_image: referenceImages[0].substring(0, 50) + "...",
        strength: validStrength,
        reference_images_count: referenceImages.length
      });
    } else if (referenceImages.length > 0) {
      logger.add("🔀 Reference Fusion Mode", { 
        images: referenceImages.map(url => url.substring(0, 50) + "..."),
        count: referenceImages.length
      });
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
      imageToImageMode: imageToImageMode,
      referenceStrength: validStrength
    };
    
    const router = new MultiProviderRouter({}, env);
    const results = await router.generate(prompt, options, logger);
    const duration = Date.now() - startTime;
    
    if (results.length === 1 && results[0].imageData) {
      const result = results[0];
      return new Response(result.imageData, {
        headers: { 
          'Content-Type': result.contentType || 'image/png', 
          'Content-Disposition': 'inline; filename="nano-' + result.seed + '.png"',
          'X-Model': result.model, 
          'X-Model-Name': result.style_name || result.model,
          'X-Seed': result.seed.toString(), 
          'X-Width': result.width.toString(), 
          'X-Height': result.height.toString(), 
          'X-Generation-Time': duration + 'ms',
          'X-Quality-Mode': result.quality_mode,
          'X-Style': result.style,
          'X-Style-Name': result.style_name || result.style,
          'X-Style-Category': result.style_category || 'unknown',
          'X-Generation-Mode': result.generation_mode || '文生圖',
          'X-Reference-Count': result.reference_images_count.toString(),
          'X-Reference-Strength': result.reference_strength?.toString() || '0',
          'X-Authenticated': result.authenticated ? 'true' : 'false', 
          'X-API-Endpoint': CONFIG.PROVIDERS.pollinations.endpoint, 
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
          image: 'data:' + r.contentType + ';base64,' + btoa(binary), 
          model: r.model, 
          seed: r.seed, 
          width: r.width, 
          height: r.height,
          quality_mode: r.quality_mode,
          style: r.style,
          style_name: r.style_name,
          style_category: r.style_category,
          generation_mode: r.generation_mode,
          reference_count: r.reference_images_count,
          reference_strength: r.reference_strength,
          authenticated: r.authenticated 
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
      styles_available: Object.keys(CONFIG.STYLE_PRESETS).length 
    }), { headers: corsHeaders({ 'Content-Type': 'application/json', 'X-Generation-Time': duration + 'ms' }) });
  } catch (e) {
    logger.add("❌ Error", e.message);
    return new Response(JSON.stringify({ 
      error: { 
        message: e.message, 
        debug_logs: logger.get(), 
        api_endpoint: CONFIG.PROVIDERS.pollinations.endpoint, 
        authenticated: CONFIG.POLLINATIONS_AUTH.enabled 
      } 
    }), { status: 400, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  }
}

function getHtmlContent() {
  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Flux AI Pro</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #1a1a1a; color: #fff; min-height: 100vh; }
.container { max-width: 1200px; margin: 0 auto; padding: 20px; }
.header { margin-bottom: 30px; }
.title { font-size: 32px; font-weight: bold; margin-bottom: 10px; }
.nav { display: flex; gap: 10px; margin-bottom: 20px; }
.nav-btn { padding: 10px 20px; background: #333; border: none; color: #fff; border-radius: 8px; cursor: pointer; }
.nav-btn:hover { background: #444; }
.form-group { margin-bottom: 15px; }
label { display: block; margin-bottom: 5px; font-weight: 600; }
input, textarea, select { width: 100%; padding: 10px; background: #333; border: 1px solid #555; border-radius: 8px; color: #fff; font-family: inherit; }
input:focus, textarea:focus, select:focus { outline: none; border-color: #f59e0b; }
.btn { padding: 12px 24px; background: linear-gradient(135deg, #f59e0b, #d97706); border: none; border-radius: 8px; color: #fff; font-weight: bold; cursor: pointer; }
.btn:hover { opacity: 0.9; }
.gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-top: 30px; }
.gallery-item { background: #333; border-radius: 12px; overflow: hidden; }
.gallery-item img { width: 100%; height: 250px; object-fit: cover; }
</style>
</head>
<body>
<div class="container">
<div class="header">
<h1 class="title">🎨 Flux AI Pro</h1>
<p>Powered by Pollinations.ai</p>
</div>
<div class="nav">
<button class="nav-btn" onclick="showPage('generate')">生成圖像</button>
<button class="nav-btn" onclick="window.open('/nano', '_blank')">🍌 Nano版本</button>
<a href="/health" class="nav-btn">系統狀態</a>
</div>
<div id="generate" style="display: none;">
<div class="form-group">
<label>模型選擇</label>
<select id="model">
<option value="gptimage">GPT-Image</option>
<option value="flux">Flux</option>
<option value="turbo">Flux Turbo</option>
<option value="nano-banana">Nano Banana 🍌</option>
</select>
</div>
<div class="form-group">
<label>提示詞</label>
<textarea id="prompt" placeholder="描述你想生成的圖像..." rows="4"></textarea>
</div>
<div class="form-group">
<label>尺寸</label>
<select id="size">
<option value="1024,1024">1024x1024</option>
<option value="1920,1080">1920x1080</option>
</select>
</div>
<button class="btn" onclick="generate()">生成圖像</button>
<div class="gallery" id="gallery"></div>
</div>
</div>
<script>
function showPage(page) {
  const el = document.getElementById(page);
  if (el) el.style.display = 'block';
}
async function generate() {
  const prompt = document.getElementById('prompt').value;
  if (!prompt) { alert('請輸入提示詞'); return; }
  const model = document.getElementById('model').value;
  const [w, h] = document.getElementById('size').value.split(',').map(Number);
  try {
    const res = await fetch('/_internal/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, model, width: w, height: h, style: 'none' })
    });
    if (!res.ok) throw new Error(await res.text());
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = '<img src="' + url + '" alt="generated">';
    document.getElementById('gallery').appendChild(div);
  } catch (e) {
    alert('錯誤: ' + e.message);
  }
}
window.addEventListener('load', () => showPage('generate'));
</script>
</body>
</html>`;
}

function handleUI() {
  const html = getHtmlContent();
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8', ...corsHeaders() } });
}

function handleNanoPage(request) {
  const html = getHtmlContent();
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8', ...corsHeaders() } });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const startTime = Date.now();
    const clientIP = getClientIP(request);
    
    if (env.POLLINATIONS_API_KEY) { 
      CONFIG.POLLINATIONS_AUTH.enabled = true; 
      CONFIG.POLLINATIONS_AUTH.token = env.POLLINATIONS_API_KEY; 
    } 
    else { 
      console.warn("⚠️ POLLINATIONS_API_KEY not set"); 
      CONFIG.POLLINATIONS_AUTH.enabled = false; 
      CONFIG.POLLINATIONS_AUTH.token = ""; 
    }
    
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders() });
    
    try {
      let response;
      if (url.pathname === '/nano') { 
        response = handleNanoPage(request); 
      } 
      else if (url.pathname === '/' || url.pathname === '') { 
        response = handleUI(); 
      } 
      else if (url.pathname === '/_internal/generate') { 
        response = await handleInternalGenerate(request, env, ctx); 
      } 
      else if (url.pathname === '/health') {
        response = new Response(JSON.stringify({
          status: 'ok', 
          version: CONFIG.PROJECT_VERSION
        }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
      } else {
        response = new Response(JSON.stringify({ error: 'Not Found' }), { status: 404, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
      }
      
      const duration = Date.now() - startTime;
      const headers = new Headers(response.headers);
      headers.set('X-Response-Time', duration + 'ms');
      return new Response(response.body, { status: response.status, headers: headers });
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
    }
  }
};

// =================================================================================
//  項目: Flux AI Pro - Extended Styles Edition
//  版本: 9.6.1-extended-styles (✅ 45+ 種藝術風格)
//  作者: Enhanced by AI Assistant  
//  日期: 2025-12-17
//  更新: ✅ 45+ 種藝術風格 | ✅ 分類組織 | ✅ 新 API 端點 | ✅ Google 翻譯整合
//  模型: zimage, flux, turbo, kontext (4個模型)
//  翻譯: Google Translate Free API (無需 API Key)
// =================================================================================

const CONFIG = {
  PROJECT_NAME: "Flux-AI-Pro",
  PROJECT_VERSION: "9.6.1-extended-styles-google-translate",
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
    none: { 
      name: "無風格", 
      prompt: "", 
      negative: "",
      category: "basic",
      icon: "⚡",
      description: "使用原始提示詞"
    },
    anime: { 
      name: "動漫風格", 
      prompt: "anime style, anime art, vibrant colors, cel shading, detailed anime", 
      negative: "realistic, photograph, 3d, ugly",
      category: "illustration",
      icon: "🎭",
      description: "日系動漫風格"
    },
    ghibli: { 
      name: "吉卜力", 
      prompt: "Studio Ghibli style, Hayao Miyazaki, anime, soft colors, whimsical, detailed background, hand-drawn", 
      negative: "realistic, dark, 3D, western animation",
      category: "illustration",
      icon: "🍃",
      description: "宮崎駿動畫風格"
    },
    manga: {
      name: "日本漫畫",
      prompt: "manga style, japanese comic art, black and white, screentones, halftone patterns, dynamic poses, detailed linework",
      negative: "color, colorful, realistic, photo, western comic",
      category: "manga",
      icon: "📖",
      description: "經典日本漫畫黑白網點"
    },
    "manga-color": {
      name: "彩色日漫",
      prompt: "colored manga style, japanese comic art, vibrant colors, cel shading, clean linework, digital coloring",
      negative: "realistic, photo, western style, messy",
      category: "manga",
      icon: "🎨",
      description: "彩色日本漫畫風格"
    },
    "american-comic": {
      name: "美式漫畫",
      prompt: "american comic book style, bold lines, vibrant colors, superhero art, dynamic action, dramatic shading",
      negative: "anime, manga, realistic photo, soft",
      category: "manga",
      icon: "💥",
      description: "美國超級英雄漫畫"
    },
    "korean-webtoon": {
      name: "韓國網漫",
      prompt: "korean webtoon style, manhwa art, detailed linework, soft colors, romantic, vertical scroll format",
      negative: "american comic, rough sketch, dark",
      category: "manga",
      icon: "📱",
      description: "韓國網路漫畫風格"
    },
    chibi: {
      name: "Q版漫畫",
      prompt: "chibi style, super deformed, cute, kawaii, big head small body, simple features, adorable",
      negative: "realistic proportions, serious, dark",
      category: "manga",
      icon: "🥰",
      description: "Q版可愛漫畫風格"
    },
    "black-white": {
      name: "黑白",
      prompt: "black and white, monochrome, high contrast, dramatic lighting, grayscale",
      negative: "color, colorful, vibrant, saturated",
      category: "monochrome",
      icon: "⚫⚪",
      description: "純黑白高對比效果"
    },
    sketch: {
      name: "素描",
      prompt: "pencil sketch, hand drawn, graphite drawing, detailed shading, artistic sketch, loose lines",
      negative: "color, digital, polished, photo",
      category: "monochrome",
      icon: "✏️",
      description: "鉛筆素描手繪質感"
    },
    "ink-drawing": {
      name: "水墨畫",
      prompt: "traditional chinese ink painting, sumi-e, brush strokes, minimalist, zen aesthetic, black ink on white paper",
      negative: "color, western style, detailed, cluttered",
      category: "monochrome",
      icon: "🖌️",
      description: "中國傳統水墨畫"
    },
    silhouette: {
      name: "剪影",
      prompt: "silhouette art, stark contrast, black shapes, minimalist, dramatic, shadow play, clean edges",
      negative: "detailed, realistic, colorful, textured",
      category: "monochrome",
      icon: "👤",
      description: "剪影藝術極簡構圖"
    },
    charcoal: {
      name: "炭筆畫",
      prompt: "charcoal drawing, rough texture, dramatic shading, expressive, smudged, artistic, monochrome",
      negative: "clean, digital, colorful, precise",
      category: "monochrome",
      icon: "🖤",
      description: "炭筆繪畫粗糙質感"
    },
    photorealistic: { 
      name: "寫實照片", 
      prompt: "photorealistic, 8k uhd, high quality, detailed, professional photography, sharp focus", 
      negative: "anime, cartoon, illustration, painting, drawing, art",
      category: "realistic",
      icon: "📷",
      description: "攝影級寫實效果"
    },
    "oil-painting": { 
      name: "油畫", 
      prompt: "oil painting, canvas texture, visible brushstrokes, rich colors, artistic, masterpiece", 
      negative: "photograph, digital art, anime, flat",
      category: "painting",
      icon: "🖼️",
      description: "經典油畫質感"
    },
    watercolor: { 
      name: "水彩畫", 
      prompt: "watercolor painting, soft colors, watercolor texture, artistic, hand-painted, paper texture, flowing colors", 
      negative: "photograph, digital, sharp edges, 3d",
      category: "painting",
      icon: "💧",
      description: "清新水彩風格"
    },
    impressionism: {
      name: "印象派",
      prompt: "impressionist painting, soft brushstrokes, light and color focus, Monet style, outdoor scene, visible brush marks",
      negative: "sharp, detailed, photorealistic, dark",
      category: "art-movement",
      icon: "🌅",
      description: "印象派繪畫光影捕捉"
    },
    abstract: {
      name: "抽象派",
      prompt: "abstract art, non-representational, geometric shapes, bold colors, modern art, expressive",
      negative: "realistic, figurative, detailed, representational",
      category: "art-movement",
      icon: "🎭",
      description: "抽象藝術幾何圖形"
    },
    cubism: {
      name: "立體主義",
      prompt: "cubist style, geometric shapes, multiple perspectives, fragmented, Picasso inspired, angular forms",
      negative: "realistic, smooth, traditional, single perspective",
      category: "art-movement",
      icon: "🔷",
      description: "立體主義多視角解構"
    },
    surrealism: {
      name: "超現實主義",
      prompt: "surrealist art, dreamlike, bizarre, impossible scenes, Salvador Dali style, imaginative, symbolic",
      negative: "realistic, mundane, ordinary, logical",
      category: "art-movement",
      icon: "🌀",
      description: "超現實主義夢幻場景"
    },
    "pop-art": {
      name: "普普藝術",
      prompt: "pop art style, bold colors, comic book elements, Andy Warhol inspired, retro, screen print effect",
      negative: "subtle, muted, traditional, realistic",
      category: "art-movement",
      icon: "🎪",
      description: "普普藝術大膽色彩"
    },
    neon: {
      name: "霓虹燈",
      prompt: "neon lights, glowing, vibrant neon colors, night scene, electric, luminous, dark background",
      negative: "daylight, muted, natural, dull",
      category: "visual",
      icon: "💡",
      description: "霓虹燈發光效果"
    },
    vintage: {
      name: "復古",
      prompt: "vintage style, retro, aged, nostalgic, warm tones, classic, faded colors, old photograph",
      negative: "modern, futuristic, clean, vibrant",
      category: "visual",
      icon: "📻",
      description: "復古懷舊褪色效果"
    },
    steampunk: {
      name: "蒸汽朋克",
      prompt: "steampunk style, Victorian era, brass and copper, gears and mechanisms, mechanical, industrial",
      negative: "modern, minimalist, clean, futuristic",
      category: "visual",
      icon: "⚙️",
      description: "蒸汽朋克機械美學"
    },
    minimalist: {
      name: "極簡主義",
      prompt: "minimalist design, clean, simple, geometric, negative space, modern, uncluttered",
      negative: "detailed, complex, ornate, busy",
      category: "visual",
      icon: "◽",
      description: "極簡設計留白美學"
    },
    vaporwave: {
      name: "蒸氣波",
      prompt: "vaporwave aesthetic, retro futuristic, pastel colors, glitch art, 80s 90s nostalgia, neon pink and blue",
      negative: "realistic, natural, muted, traditional",
      category: "visual",
      icon: "🌴",
      description: "蒸氣波復古未來"
    },
    "pixel-art": {
      name: "像素藝術",
      prompt: "pixel art, 8-bit, 16-bit, retro gaming style, pixelated, nostalgic, limited color palette",
      negative: "high resolution, smooth, realistic, detailed",
      category: "digital",
      icon: "🎮",
      description: "像素藝術復古遊戲"
    },
    "low-poly": {
      name: "低多邊形",
      prompt: "low poly 3d, geometric, faceted, minimalist 3d art, polygonal, angular shapes",
      negative: "high poly, detailed, realistic, organic",
      category: "digital",
      icon: "🔺",
      description: "低多邊形3D幾何"
    },
    "3d-render": {
      name: "3D渲染",
      prompt: "3d render, cinema 4d, octane render, detailed, professional lighting, ray tracing, photorealistic 3d",
      negative: "2d, flat, hand drawn, sketchy",
      category: "digital",
      icon: "🎬",
      description: "專業3D渲染寫實光影"
    },
    gradient: {
      name: "漸變",
      prompt: "gradient art, smooth color transitions, modern, vibrant gradients, soft blending, colorful",
      negative: "solid colors, flat, harsh edges, traditional",
      category: "digital",
      icon: "🌈",
      description: "漸變藝術柔和過渡"
    },
    glitch: {
      name: "故障藝術",
      prompt: "glitch art, digital corruption, RGB shift, distorted, cyberpunk, data moshing, scanlines",
      negative: "clean, perfect, traditional, smooth",
      category: "digital",
      icon: "📺",
      description: "故障美學數位崩壞"
    },
    "ukiyo-e": {
      name: "浮世繪",
      prompt: "ukiyo-e style, japanese woodblock print, Hokusai inspired, traditional japanese art, flat colors, bold outlines",
      negative: "modern, western, photographic, 3d",
      category: "traditional",
      icon: "🗾",
      description: "日本浮世繪木刻版畫"
    },
    "stained-glass": {
      name: "彩繪玻璃",
      prompt: "stained glass art, colorful, leaded glass, church window style, luminous, geometric patterns, light through glass",
      negative: "realistic, photographic, modern, opaque",
      category: "traditional",
      icon: "🪟",
      description: "彩繪玻璃透光效果"
    },
    "paper-cut": {
      name: "剪紙藝術",
      prompt: "paper cut art, layered paper, shadow box effect, intricate patterns, handcrafted, silhouette",
      negative: "painted, digital, realistic, photographic",
      category: "traditional",
      icon: "✂️",
      description: "剪紙藝術層次堆疊"
    },
    gothic: {
      name: "哥特風格",
      prompt: "gothic style, dark, ornate, Victorian gothic, mysterious, dramatic, baroque elements, elegant darkness",
      negative: "bright, cheerful, minimalist, modern",
      category: "aesthetic",
      icon: "🦇",
      description: "哥特美學黑暗華麗"
    },
    "art-nouveau": {
      name: "新藝術",
      prompt: "art nouveau style, organic forms, flowing lines, decorative, elegant, floral motifs, Alphonse Mucha inspired",
      negative: "geometric, minimalist, modern, rigid",
      category: "aesthetic",
      icon: "🌺",
      description: "新藝術流動線條"
    },
    cyberpunk: { 
      name: "賽博朋克", 
      prompt: "cyberpunk style, neon lights, futuristic, sci-fi, dystopian, high-tech low-life, blade runner style", 
      negative: "natural, rustic, medieval, fantasy",
      category: "scifi",
      icon: "🌃",
      description: "賽博朋克未來科幻"
    },
    fantasy: { 
      name: "奇幻風格", 
      prompt: "fantasy art, magical, epic fantasy, detailed fantasy illustration, mystical, enchanted", 
      negative: "modern, realistic, mundane, contemporary",
      category: "fantasy",
      icon: "🐉",
      description: "奇幻魔法世界"
    }
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
      economy: { 
        name: "經濟模式", 
        description: "快速出圖", 
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
        description: "極致質量", 
        min_resolution: 1536, 
        max_resolution: 2048, 
        steps_multiplier: 1.35, 
        guidance_multiplier: 1.15, 
        hd_level: "maximum", 
        force_upscale: true 
      }
    },
    HD_PROMPTS: {
      basic: "high quality, detailed, sharp",
      enhanced: "high quality, highly detailed, sharp focus, professional, 8k uhd",
      maximum: "masterpiece, best quality, ultra detailed, 8k uhd, high resolution, professional photography, sharp focus, HDR"
    },
    HD_NEGATIVE: "blurry, low quality, distorted, ugly, bad anatomy, low resolution, pixelated, artifacts, noise",
    MODEL_QUALITY_PROFILES: {
      "zimage": { 
        min_resolution: 1024, 
        max_resolution: 2048, 
        optimal_steps_boost: 1.0, 
        guidance_boost: 1.0, 
        recommended_quality: "economy" 
      },
      "flux": { 
        min_resolution: 1024, 
        max_resolution: 2048, 
        optimal_steps_boost: 1.1, 
        guidance_boost: 1.0, 
        recommended_quality: "standard" 
      },
      "turbo": { 
        min_resolution: 1024, 
        max_resolution: 2048, 
        optimal_steps_boost: 0.9, 
        guidance_boost: 0.95, 
        recommended_quality: "economy" 
      },
      "kontext": { 
        min_resolution: 1280, 
        max_resolution: 2048, 
        optimal_steps_boost: 1.2, 
        guidance_boost: 1.1, 
        recommended_quality: "ultra" 
      }
    }
  }
};
// =================================================================================
// 工具類：Logger, IP獲取, Google 免費翻譯, 優化器
// =================================================================================

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

async function translateToEnglish(text, env) {
  try {
    const hasChinese = /[\u4e00-\u9fa5]/.test(text);
    if (!hasChinese) {
      return { 
        text: text, 
        translated: false, 
        reason: "No Chinese detected" 
      };
    }

    console.log("🌐 檢測到中文，準備翻譯:", text.substring(0, 50) + (text.length > 50 ? "..." : ""));

    try {
      const url = new URL('https://translate.googleapis.com/translate_a/single');
      url.searchParams.append('client', 'gtx');
      url.searchParams.append('sl', 'auto');
      url.searchParams.append('tl', 'en');
      url.searchParams.append('dt', 't');
      url.searchParams.append('q', text);

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': '*/*',
          'Accept-Language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7'
        }
      });

      if (!response.ok) {
        console.error("❌ Google Translate API 回應錯誤:", response.status, response.statusText);
        return { 
          text: text, 
          translated: false, 
          reason: "API returned " + response.status
        };
      }

      const result = await response.json();
      let translatedText = '';

      if (result && Array.isArray(result) && result[0]) {
        for (const item of result[0]) {
          if (Array.isArray(item) && item[0]) {
            translatedText += item[0];
          }
        }
      }

      translatedText = translatedText.trim();

      if (!translatedText || translatedText === text) {
        console.warn("⚠️ 翻譯結果為空或與原文相同");
        return { 
          text: text, 
          translated: false, 
          reason: "Empty or identical translation" 
        };
      }

      const detectedLang = result[2] || 'unknown';

      console.log("✅ Google 翻譯成功!");
      console.log("   原文 (" + detectedLang + "):", text.substring(0, 50) + (text.length > 50 ? "..." : ""));
      console.log("   譯文 (en):", translatedText.substring(0, 50) + (translatedText.length > 50 ? "..." : ""));

      return { 
        text: translatedText, 
        translated: true, 
        original: text,
        detectedLanguage: detectedLang,
        model: "Google Translate (Free API)",
        confidence: 0.95,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error("❌ Google 翻譯過程發生錯誤:", error.message);
      console.error("   錯誤堆疊:", error.stack);

      return { 
        text: text, 
        translated: false, 
        reason: "Translation error",
        error: error.message 
      };
    }

  } catch (error) {
    console.error("❌ translateToEnglish 函數錯誤:", error);
    return { 
      text: text, 
      translated: false, 
      error: error.message 
    };
  }
}

class PromptAnalyzer {
  static analyzeComplexity(prompt) {
    const complexKeywords = [
      'detailed', 'intricate', 'complex', 'elaborate', 
      'realistic', 'photorealistic', 'hyperrealistic',
      'architecture', 'cityscape', 'landscape', 'portrait',
      'face', 'eyes', 'hair', 'texture', 'material',
      'fabric', 'skin', 'lighting', 'shadows', 'reflections',
      'fine details', 'high detail', 'ultra detailed',
      '4k', '8k', 'uhd', 'hdr'
    ];

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
      enhancedPrompt = prompt + ", " + hdBoost;
      optimizations.push("HD增強: " + hdLevel);
    }

    let enhancedNegative = negativePrompt || "";
    if (qualityMode !== 'economy') {
      enhancedNegative = enhancedNegative 
        ? enhancedNegative + ", " + hdConfig.HD_NEGATIVE 
        : hdConfig.HD_NEGATIVE;
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

    if (model.includes('turbo')) {
      baseGuidance = style === 'photorealistic' ? 3.0 : 2.5;
    } else if (style === 'photorealistic') {
      baseGuidance = 8.5;
    } else if (['oil-painting', 'watercolor', 'sketch'].includes(style)) {
      baseGuidance = 6.5;
    } else if (['manga', 'anime', 'chibi'].includes(style)) {
      baseGuidance = 7.0;
    } else if (['pixel-art', 'low-poly'].includes(style)) {
      baseGuidance = 6.0;
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
        return { 
          enhancedPrompt: prompt, 
          enhancedNegative: negativePrompt || "" 
        };
      }

      if (!CONFIG.STYLE_PRESETS || typeof CONFIG.STYLE_PRESETS !== 'object') {
        console.warn("⚠️ STYLE_PRESETS not found");
        return { 
          enhancedPrompt: prompt, 
          enhancedNegative: negativePrompt || "" 
        };
      }

      const styleConfig = CONFIG.STYLE_PRESETS[style];
      if (!styleConfig) {
        console.warn("⚠️ Style '" + style + "' not found");
        return { 
          enhancedPrompt: prompt, 
          enhancedNegative: negativePrompt || "" 
        };
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

      console.log("✅ Style applied:", style, "-", styleConfig.name);
      return { 
        enhancedPrompt: enhancedPrompt, 
        enhancedNegative: enhancedNegative 
      };
    } catch (error) {
      console.error("❌ StyleProcessor error:", error.message);
      return { 
        enhancedPrompt: prompt, 
        enhancedNegative: negativePrompt || "" 
      };
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
    if (error.name === 'AbortError') {
      throw new Error("Request timeout after " + timeout + "ms");
    }
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
// PollinationsProvider：核心圖像生成類
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

    logger.add("🎨 Style Processing", { 
      selected_style: style,
      style_name: CONFIG.STYLE_PRESETS[style]?.name || style,
      style_category: CONFIG.STYLE_PRESETS[style]?.category || 'unknown',
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
        detected_language: translation.detectedLanguage || 'unknown',
        success: true,
        model: translation.model || "Google Translate (Free API)",
        confidence: translation.confidence || 0.95
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
      model: model,
      authenticated: authConfig.enabled && !!authConfig.token,
      full_url: url.substring(0, 100) + "..."
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
              style_name: CONFIG.STYLE_PRESETS[style]?.name || style,
              hd_optimized: autoHD && hdOptimization?.optimized, 
              auto_translated: translation.translated,
              translation_model: translation.model || "None",
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
              auto_translated: translation.translated,
              translation_info: translation.translated ? {
                original: translation.original,
                translated: finalPromptForAPI,
                detected_language: translation.detectedLanguage,
                model: translation.model,
                confidence: translation.confidence
              } : null,
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
          throw new Error("Authentication failed: Invalid or missing API key. Please set POLLINATIONS_API_KEY");
        } else if (response.status === 403) {
          throw new Error("Access forbidden: API key may lack required permissions");
        } else {
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
// =================================================================================
// 主 Worker Handler
// =================================================================================

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const clientIP = getClientIP(request);

    if (request.method === 'OPTIONS') {
      return new Response(null, { 
        status: 204, 
        headers: corsHeaders() 
      });
    }

    if (path === '/_internal/generate' && request.method === 'POST') {
      const logger = new Logger();
      logger.add("📥 Request Info", { 
        method: request.method, 
        path: path, 
        ip: clientIP,
        timestamp: new Date().toISOString()
      });

      try {
        const body = await request.json();
        const { 
          prompt, 
          model = "zimage", 
          provider = "pollinations", 
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
          numOutputs = 1, 
          responseFormat = "url", 
          autoOptimize = true, 
          autoHD = true, 
          qualityMode = 'standard',
          referenceImages = []
        } = body;

        if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
          return Response.json({ 
            error: "Missing or invalid 'prompt' parameter" 
          }, { 
            status: 400, 
            headers: corsHeaders() 
          });
        }

        logger.add("📝 Request Params", { 
          prompt: prompt.substring(0, 100) + (prompt.length > 100 ? '...' : ''),
          model: model, 
          provider: provider, 
          size: width + "x" + height, 
          style: style,
          quality_mode: qualityMode, 
          num_outputs: numOutputs, 
          response_format: responseFormat,
          auto_optimize: autoOptimize, 
          auto_hd: autoHD,
          reference_images: referenceImages?.length || 0,
          generation_mode: referenceImages?.length > 0 ? "圖生圖" : "文生圖"
        });

        const pollinationsApiKey = env.POLLINATIONS_API_KEY || "";
        if (pollinationsApiKey) {
          CONFIG.POLLINATIONS_AUTH.token = pollinationsApiKey;
          logger.add("🔐 API Key", { 
            status: "loaded",
            token_prefix: pollinationsApiKey.substring(0, 8) + "...",
            source: "environment variable"
          });
        } else {
          logger.add("⚠️ API Key", { 
            status: "not found",
            warning: "新 API 端點需要 API Key，請設置 POLLINATIONS_API_KEY 環境變量"
          });
        }

        const router = new MultiProviderRouter({
          pollinations: pollinationsApiKey
        }, env);

        const results = await router.generate(prompt, { 
          provider: provider, 
          model: model, 
          width: width, 
          height: height, 
          seed: seed, 
          negativePrompt: negativePrompt, 
          guidance: guidance, 
          steps: steps, 
          enhance: enhance, 
          nologo: nologo, 
          privateMode: privateMode, 
          style: style, 
          numOutputs: numOutputs, 
          autoOptimize: autoOptimize, 
          autoHD: autoHD, 
          qualityMode: qualityMode,
          referenceImages: referenceImages
        }, logger);

        if (responseFormat === 'b64_json') {
          const data = results.map((result, index) => {
            const base64 = btoa(String.fromCharCode(...new Uint8Array(result.imageData)));
            return {
              b64_json: base64,
              seed: result.seed,
              model: result.model,
              style: result.style,
              style_name: result.style_name,
              style_category: result.style_category,
              width: result.width,
              height: result.height,
              quality_mode: result.quality_mode,
              hd_optimized: result.hd_optimized,
              auto_translated: result.auto_translated,
              translation_info: result.translation_info,
              reference_images_count: result.reference_images_count,
              generation_mode: result.generation_mode,
              authenticated: result.authenticated
            };
          });

          return Response.json({ 
            created: Math.floor(Date.now() / 1000), 
            data: data,
            logs: logger.get() 
          }, { 
            headers: corsHeaders({ 'Content-Type': 'application/json' }) 
          });

        } else {
          if (results.length === 1) {
            return new Response(results[0].imageData, { 
              headers: corsHeaders({ 
                'Content-Type': results[0].contentType || 'image/png',
                'X-Generation-Seed': results[0].seed.toString(),
                'X-Generation-Model': results[0].model,
                'X-Generation-Style': results[0].style,
                'X-Generation-Style-Name': encodeURIComponent(results[0].style_name || ''),
                'X-Generation-Quality': results[0].quality_mode,
                'X-Generation-HD-Optimized': results[0].hd_optimized.toString(),
                'X-Generation-Auto-Translated': results[0].auto_translated.toString(),
                'X-Generation-Mode': results[0].generation_mode || '文生圖',
                'X-Generation-Authenticated': results[0].authenticated.toString()
              }) 
            });
          } else {
            const data = results.map((result, index) => {
              const base64 = btoa(String.fromCharCode(...new Uint8Array(result.imageData)));
              return {
                image: 'data:' + (result.contentType || 'image/png') + ';base64,' + base64,
                seed: result.seed,
                model: result.model,
                style: result.style,
                style_name: result.style_name,
                style_category: result.style_category,
                width: result.width,
                height: result.height,
                quality_mode: result.quality_mode,
                hd_optimized: result.hd_optimized,
                auto_translated: result.auto_translated,
                translation_info: result.translation_info,
                reference_images_count: result.reference_images_count,
                generation_mode: result.generation_mode,
                authenticated: result.authenticated
              };
            });

            return Response.json({ 
              created: Math.floor(Date.now() / 1000), 
              data: data,
              logs: logger.get() 
            }, { 
              headers: corsHeaders({ 'Content-Type': 'application/json' }) 
            });
          }
        }
      } catch (error) {
        logger.add("❌ Generation Error", { 
          error: error.message, 
          stack: error.stack 
        });

        return Response.json({ 
          error: error.message, 
          logs: logger.get() 
        }, { 
          status: 500, 
          headers: corsHeaders() 
        });
      }
    }

    if (path === '/api/config' || path === '/_internal/config') {
      const configData = {
        project: {
          name: CONFIG.PROJECT_NAME,
          version: CONFIG.PROJECT_VERSION
        },
        providers: Object.keys(CONFIG.PROVIDERS).map(key => {
          const provider = CONFIG.PROVIDERS[key];
          return {
            id: key,
            name: provider.name,
            enabled: provider.enabled,
            default: provider.default || false,
            description: provider.description,
            models: provider.models.map(m => ({
              id: m.id,
              name: m.name,
              description: m.description,
              category: m.category,
              max_size: m.max_size,
              supports_reference_images: m.supports_reference_images || false,
              max_reference_images: m.max_reference_images || 0,
              input_modalities: m.input_modalities || ["text"],
              output_modalities: m.output_modalities || ["image"]
            })),
            features: provider.features
          };
        }),
        default_provider: CONFIG.DEFAULT_PROVIDER,
        styles: Object.keys(CONFIG.STYLE_PRESETS).map(key => ({
          id: key,
          name: CONFIG.STYLE_PRESETS[key].name,
          category: CONFIG.STYLE_PRESETS[key].category,
          icon: CONFIG.STYLE_PRESETS[key].icon,
          description: CONFIG.STYLE_PRESETS[key].description
        })),
        style_categories: CONFIG.STYLE_CATEGORIES,
        preset_sizes: CONFIG.PRESET_SIZES,
        quality_modes: Object.keys(CONFIG.HD_OPTIMIZATION.QUALITY_MODES).map(key => ({
          id: key,
          name: CONFIG.HD_OPTIMIZATION.QUALITY_MODES[key].name,
          description: CONFIG.HD_OPTIMIZATION.QUALITY_MODES[key].description
        })),
        features: {
          auto_translation: true,
          translation_engine: "Google Translate (Free API)",
          hd_optimization: CONFIG.HD_OPTIMIZATION.enabled,
          auto_optimize: true,
          style_presets: true,
          reference_images: true,
          image_to_image: true,
          quality_modes: true
        }
      };

      return Response.json(configData, { 
        headers: corsHeaders({ 'Content-Type': 'application/json' }) 
      });
    }

    if (path === '/health' || path === '/_internal/health') {
      const pollinationsApiKey = env.POLLINATIONS_API_KEY || "";

      return Response.json({ 
        status: 'ok', 
        version: CONFIG.PROJECT_VERSION,
        timestamp: new Date().toISOString(),
        api_key_configured: !!pollinationsApiKey,
        translation_engine: "Google Translate (Free API)",
        providers: Object.keys(CONFIG.PROVIDERS).filter(k => CONFIG.PROVIDERS[k].enabled),
        models: CONFIG.PROVIDERS.pollinations.models.length,
        styles: Object.keys(CONFIG.STYLE_PRESETS).length,
        features: {
          auto_translation: true,
          translation_free: true,
          hd_optimization: CONFIG.HD_OPTIMIZATION.enabled,
          reference_images: true,
          image_to_image: true
        }
      }, { 
        headers: corsHeaders({ 'Content-Type': 'application/json' }) 
      });
    }

    if (path === '/api/styles' || path === '/_internal/styles') {
      const groupedStyles = {};

      for (const [styleId, styleConfig] of Object.entries(CONFIG.STYLE_PRESETS)) {
        const category = styleConfig.category || 'basic';
        if (!groupedStyles[category]) {
          groupedStyles[category] = {
            ...CONFIG.STYLE_CATEGORIES[category],
            styles: []
          };
        }
        groupedStyles[category].styles.push({
          id: styleId,
          name: styleConfig.name,
          icon: styleConfig.icon,
          description: styleConfig.description,
          prompt: styleConfig.prompt,
          negative: styleConfig.negative
        });
      }

      const sortedCategories = Object.entries(groupedStyles)
        .sort(([, a], [, b]) => (a.order || 999) - (b.order || 999))
        .map(([id, data]) => ({ id, ...data }));

      return Response.json({ 
        total: Object.keys(CONFIG.STYLE_PRESETS).length,
        categories: sortedCategories 
      }, { 
        headers: corsHeaders({ 'Content-Type': 'application/json' }) 
      });
    }

    if (path === '/api/models' || path === '/_internal/models') {
      const models = CONFIG.PROVIDERS.pollinations.models.map(m => ({
        id: m.id,
        name: m.name,
        description: m.description,
        category: m.category,
        max_size: m.max_size,
        confirmed: m.confirmed,
        pricing: m.pricing,
        supports_reference_images: m.supports_reference_images || false,
        max_reference_images: m.max_reference_images || 0,
        input_modalities: m.input_modalities || ["text"],
        output_modalities: m.output_modalities || ["image"]
      }));

      return Response.json({ 
        provider: "pollinations",
        total: models.length,
        models: models 
      }, { 
        headers: corsHeaders({ 'Content-Type': 'application/json' }) 
      });
    }

    if (path === '/api/translate' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { text } = body;

        if (!text) {
          return Response.json({ 
            error: "Missing 'text' parameter" 
          }, { 
            status: 400, 
            headers: corsHeaders() 
          });
        }

        const result = await translateToEnglish(text, env);

        return Response.json({ 
          success: true,
          translated: result.translated,
          original: text,
          result: result.text,
          detected_language: result.detectedLanguage || 'unknown',
          model: result.model || "Google Translate (Free API)",
          confidence: result.confidence || 0,
          reason: result.reason || null,
          timestamp: new Date().toISOString()
        }, { 
          headers: corsHeaders({ 'Content-Type': 'application/json' }) 
        });
      } catch (error) {
        return Response.json({ 
          error: error.message 
        }, { 
          status: 500, 
          headers: corsHeaders() 
        });
      }
    }

    if (path === '/' || path === '/index.html') {
      return new Response(HTML_CONTENT, { 
        headers: corsHeaders({ 'Content-Type': 'text/html; charset=utf-8' }) 
      });
    }

    return Response.json({ 
      error: 'Not Found',
      available_endpoints: [
        'POST /_internal/generate - 生成圖片',
        'GET /api/config - 獲取配置',
        'GET /api/styles - 獲取風格列表',
        'GET /api/models - 獲取模型列表',
        'POST /api/translate - 測試翻譯',
        'GET /health - 健康檢查',
        'GET / - 前端界面'
      ]
    }, { 
      status: 404, 
      headers: corsHeaders() 
    });
  }

// =================================================================================
// 前端 HTML 界面（深色模式 + 雙語 + 100 張歷史記錄）
// =================================================================================

const HTML_CONTENT = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Flux AI Pro - Dark Mode</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Microsoft JhengHei', 'PingFang TC', sans-serif;
      background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
      min-height: 100vh;
      padding: 20px;
      color: #e5e7eb;
    }
    .container {
      max-width: 1600px;
      margin: 0 auto;
      background: rgba(26, 26, 26, 0.95);
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      overflow: hidden;
      border: 1px solid rgba(168, 85, 247, 0.2);
    }
    .header {
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      color: white;
      padding: 30px;
      text-align: center;
      position: relative;
      border-bottom: 2px solid rgba(168, 85, 247, 0.3);
    }
    .header h1 {
      font-size: 2.5em;
      margin-bottom: 10px;
      background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: glow 2s ease-in-out infinite alternate;
    }
    @keyframes glow {
      from { filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.5)); }
      to { filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.8)); }
    }
    .header .subtitle { font-size: 1.1em; opacity: 0.8; color: #9ca3af; }
    .header .version {
      display: inline-block;
      background: rgba(168, 85, 247, 0.2);
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 0.9em;
      margin-top: 10px;
      border: 1px solid rgba(168, 85, 247, 0.3);
      color: #a855f7;
    }
    .lang-switch {
      position: absolute;
      top: 20px;
      right: 20px;
      display: flex;
      gap: 10px;
      background: rgba(45, 45, 45, 0.8);
      padding: 8px 12px;
      border-radius: 20px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(168, 85, 247, 0.3);
    }
    .lang-btn {
      background: transparent;
      border: 2px solid rgba(168, 85, 247, 0.5);
      color: #a855f7;
      padding: 6px 16px;
      border-radius: 15px;
      cursor: pointer;
      font-size: 0.9em;
      font-weight: 600;
      transition: all 0.3s;
      font-family: inherit;
    }
    .lang-btn:hover { background: rgba(168, 85, 247, 0.2); box-shadow: 0 0 15px rgba(168, 85, 247, 0.4); }
    .lang-btn.active {
      background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
      color: white;
      border-color: transparent;
      box-shadow: 0 0 20px rgba(168, 85, 247, 0.6);
    }
    .history-toggle {
      position: absolute;
      top: 20px;
      left: 20px;
      background: rgba(45, 45, 45, 0.8);
      border: 2px solid rgba(59, 130, 246, 0.5);
      color: #3b82f6;
      padding: 8px 20px;
      border-radius: 20px;
      cursor: pointer;
      font-size: 0.9em;
      font-weight: 600;
      transition: all 0.3s;
      backdrop-filter: blur(10px);
    }
    .history-toggle:hover { background: rgba(59, 130, 246, 0.2); box-shadow: 0 0 15px rgba(59, 130, 246, 0.4); }
    .main-content { display: grid; grid-template-columns: 400px 1fr; gap: 0; }
    @media (max-width: 1200px) { .main-content { grid-template-columns: 1fr; } }
    .left-panel {
      background: rgba(30, 30, 30, 0.95);
      padding: 25px;
      border-right: 1px solid rgba(168, 85, 247, 0.2);
      max-height: calc(100vh - 200px);
      overflow-y: auto;
    }
    .left-panel::-webkit-scrollbar { width: 8px; }
    .left-panel::-webkit-scrollbar-track { background: rgba(45, 45, 45, 0.5); border-radius: 4px; }
    .left-panel::-webkit-scrollbar-thumb { background: rgba(168, 85, 247, 0.5); border-radius: 4px; }
    .left-panel::-webkit-scrollbar-thumb:hover { background: rgba(168, 85, 247, 0.7); }
    .right-panel { display: grid; grid-template-rows: 1fr auto; gap: 0; }
    .result-panel { padding: 25px; background: rgba(26, 26, 26, 0.95); }
    .history-panel {
      background: rgba(30, 30, 30, 0.95);
      border-top: 2px solid rgba(168, 85, 247, 0.3);
      padding: 20px 25px;
      max-height: 300px;
      overflow-y: auto;
      display: none;
    }
    .history-panel.show { display: block; }
    .history-panel::-webkit-scrollbar { height: 8px; }
    .history-panel::-webkit-scrollbar-track { background: rgba(45, 45, 45, 0.5); border-radius: 4px; }
    .history-panel::-webkit-scrollbar-thumb { background: rgba(168, 85, 247, 0.5); border-radius: 4px; }
    .panel h2 {
      background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 20px;
      font-size: 1.5em;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .form-group { margin-bottom: 20px; }
    .form-group label { display: block; margin-bottom: 8px; font-weight: 600; color: #9ca3af; font-size: 0.95em; }
    .form-group input[type="text"],
    .form-group textarea,
    .form-group select,
    .form-group input[type="number"] {
      width: 100%;
      padding: 12px 15px;
      border: 2px solid rgba(168, 85, 247, 0.3);
      border-radius: 10px;
      font-size: 1em;
      transition: all 0.3s;
      font-family: inherit;
      background: rgba(45, 45, 45, 0.8);
      color: #e5e7eb;
    }
    .form-group input:focus,
    .form-group textarea:focus,
    .form-group select:focus {
      outline: none;
      border-color: #a855f7;
      box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.2), 0 0 20px rgba(168, 85, 247, 0.3);
      background: rgba(45, 45, 45, 0.95);
    }
    .form-group textarea { min-height: 80px; resize: vertical; }
    .form-group select option { background: #2d2d2d; color: #e5e7eb; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    @media (max-width: 768px) { .form-row { grid-template-columns: 1fr; } }
    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 10px;
      font-size: 1em;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      text-decoration: none;
      font-family: inherit;
    }
    .btn-primary {
      background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
      color: white;
      width: 100%;
      box-shadow: 0 4px 15px rgba(168, 85, 247, 0.4);
      border: 1px solid rgba(168, 85, 247, 0.5);
    }
    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 25px rgba(168, 85, 247, 0.6), 0 0 30px rgba(168, 85, 247, 0.4);
    }
    .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
    .btn-secondary { background: rgba(59, 130, 246, 0.2); color: #3b82f6; border: 2px solid rgba(59, 130, 246, 0.5); }
    .btn-secondary:hover { background: rgba(59, 130, 246, 0.3); box-shadow: 0 0 20px rgba(59, 130, 246, 0.4); }
    .btn-danger { background: rgba(239, 68, 68, 0.2); color: #ef4444; border: 2px solid rgba(239, 68, 68, 0.5); }
    .btn-danger:hover { background: rgba(239, 68, 68, 0.3); box-shadow: 0 0 20px rgba(239, 68, 68, 0.4); }
    .btn-small { padding: 6px 12px; font-size: 0.85em; }
    .result-container {
      background: rgba(45, 45, 45, 0.5);
      border-radius: 10px;
      padding: 20px;
      min-height: 400px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(168, 85, 247, 0.2);
    }
    .result-container img {
      max-width: 100%;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(168, 85, 247, 0.3);
      border: 2px solid rgba(168, 85, 247, 0.3);
    }
    .loading { text-align: center; }
    .loading .spinner {
      width: 60px;
      height: 60px;
      border: 4px solid rgba(45, 45, 45, 0.5);
      border-top: 4px solid #a855f7;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
      box-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
    }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    .loading p { color: #9ca3af; font-size: 1.1em; }
    .placeholder { text-align: center; color: #6b7280; }
    .placeholder .icon { font-size: 4em; margin-bottom: 20px; opacity: 0.3; }
    .placeholder p { font-size: 1.1em; }
    .info-box {
      background: rgba(59, 130, 246, 0.1);
      border-left: 4px solid #3b82f6;
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 16px;
      font-size: 0.9em;
      border: 1px solid rgba(59, 130, 246, 0.3);
    }
    .info-box.success { background: rgba(34, 197, 94, 0.1); border-left-color: #22c55e; border-color: rgba(34, 197, 94, 0.3); }
    .info-box.warning { background: rgba(251, 146, 60, 0.1); border-left-color: #fb923c; border-color: rgba(251, 146, 60, 0.3); }
    .info-box h4 { margin-bottom: 6px; font-size: 1em; color: #3b82f6; }
    .info-box.success h4 { color: #22c55e; }
    .info-box.warning h4 { color: #fb923c; }
    .info-box p { color: #9ca3af; line-height: 1.5; }
    .toggle-switch { display: flex; align-items: center; gap: 10px; margin-bottom: 15px; }
    .toggle-switch input[type="checkbox"] {
      width: 50px;
      height: 26px;
      position: relative;
      appearance: none;
      background: rgba(75, 85, 99, 0.5);
      border-radius: 13px;
      cursor: pointer;
      transition: all 0.3s;
      border: 1px solid rgba(168, 85, 247, 0.3);
    }
    .toggle-switch input[type="checkbox"]:checked {
      background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
      box-shadow: 0 0 15px rgba(168, 85, 247, 0.5);
    }
    .toggle-switch input[type="checkbox"]::before {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: white;
      top: 2px;
      left: 2px;
      transition: all 0.3s;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    }
    .toggle-switch input[type="checkbox"]:checked::before { left: 26px; }
    .toggle-switch label { font-weight: 600; color: #9ca3af; margin: 0; cursor: pointer; font-size: 0.9em; }
    .meta-info {
      background: rgba(45, 45, 45, 0.8);
      border-radius: 10px;
      padding: 12px;
      margin-top: 12px;
      font-size: 0.85em;
      color: #9ca3af;
      border: 1px solid rgba(168, 85, 247, 0.2);
    }
    .meta-info div { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid rgba(75, 85, 99, 0.3); }
    .meta-info div:last-child { border-bottom: none; }
    .meta-info strong { color: #e5e7eb; }
    .action-buttons { display: flex; gap: 10px; margin-top: 12px; }
    .action-buttons .btn { flex: 1; }
    .translation-info {
      background: rgba(168, 85, 247, 0.1);
      border: 2px solid rgba(168, 85, 247, 0.3);
      border-radius: 10px;
      padding: 12px;
      margin-top: 12px;
      font-size: 0.85em;
    }
    .translation-info h4 {
      background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 8px;
      font-size: 1em;
    }
    .translation-info p { margin: 6px 0; line-height: 1.5; color: #9ca3af; }
    .history-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
    .history-header h3 {
      background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 1.2em;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .history-actions { display: flex; gap: 8px; }
    .history-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
    .history-item {
      background: rgba(45, 45, 45, 0.8);
      border: 2px solid rgba(168, 85, 247, 0.3);
      border-radius: 10px;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s;
      position: relative;
    }
    .history-item:hover {
      border-color: #a855f7;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3), 0 0 20px rgba(168, 85, 247, 0.2);
    }
    .history-item img { width: 100%; height: 150px; object-fit: cover; display: block; border-bottom: 1px solid rgba(168, 85, 247, 0.2); }
    .history-item-info { padding: 8px; font-size: 0.8em; }
    .history-item-prompt {
      color: #e5e7eb;
      font-weight: 600;
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .history-item-meta { color: #6b7280; font-size: 0.9em; display: flex; justify-content: space-between; align-items: center; }
    .history-item-delete {
      position: absolute;
      top: 8px;
      right: 8px;
      background: rgba(239, 68, 68, 0.9);
      color: white;
      border: none;
      border-radius: 50%;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 1.2em;
      opacity: 0;
      transition: all 0.3s;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    }
    .history-item:hover .history-item-delete { opacity: 1; }
    .history-item-delete:hover { background: #dc2626; transform: scale(1.1); box-shadow: 0 0 20px rgba(239, 68, 68, 0.6); }
    .history-empty { text-align: center; padding: 40px; color: #6b7280; grid-column: 1 / -1; }
    .history-empty .icon { font-size: 3em; margin-bottom: 12px; opacity: 0.3; }
    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 10px;
      font-size: 0.75em;
      font-weight: 600;
      background: rgba(168, 85, 247, 0.2);
      color: #a855f7;
      border: 1px solid rgba(168, 85, 247, 0.3);
    }
    .badge.success { background: rgba(34, 197, 94, 0.2); color: #22c55e; border-color: rgba(34, 197, 94, 0.3); }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <button class="history-toggle" onclick="toggleHistory()" id="historyToggleBtn">
        📜 <span data-i18n="historyBtn">歷史記錄</span> (<span id="historyCount">0</span>)
      </button>
      
      <div class="lang-switch">
        <button class="lang-btn active" onclick="switchLanguage('zh')" id="langZh">中文</button>
        <button class="lang-btn" onclick="switchLanguage('en')" id="langEn">English</button>
      </div>
      
      <h1>🎨 Flux AI Pro</h1>
      <p class="subtitle" data-i18n="subtitle">AI 圖像生成工具 - 深色模式 + 歷史記錄</p>
      <span class="version">v9.6.2-dark | 45+ 藝術風格 | 免費翻譯 | 100 張歷史</span>
    </div>
    
    <div class="main-content">
      <div class="left-panel">
        <h2><span data-i18n="settings">⚙️ 生成設定</span></h2>
        
        <div class="info-box success">
          <h4 data-i18n="autoTranslateTitle">🌐 自動翻譯已啟用</h4>
          <p data-i18n="autoTranslateDesc">輸入中文將自動翻譯成英文生成圖片</p>
        </div>
        
        <div class="form-group">
          <label data-i18n="promptLabel">✨ 提示詞</label>
          <textarea id="prompt" placeholder="例如：一隻可愛的橘貓在花園裡玩耍"></textarea>
        </div>
        
        <div class="form-group">
          <label data-i18n="negativePromptLabel">🚫 負面提示詞</label>
          <textarea id="negativePrompt" placeholder="不想出現的內容"></textarea>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label data-i18n="modelLabel">🤖 模型</label>
            <select id="model">
              <option value="zimage">Z-Image Turbo</option>
              <option value="flux">Flux Standard</option>
              <option value="turbo">Flux Turbo</option>
              <option value="kontext">Kontext</option>
            </select>
          </div>
          
          <div class="form-group">
            <label data-i18n="qualityLabel">💎 質量</label>
            <select id="qualityMode">
              <option value="economy" data-i18n="qualityEconomy">經濟</option>
              <option value="standard" selected data-i18n="qualityStandard">標準</option>
              <option value="ultra" data-i18n="qualityUltra">超高清</option>
            </select>
          </div>
        </div>
        
        <div class="form-group">
          <label data-i18n="styleLabel">🎨 風格</label>
          <select id="style">
            <option value="none" data-i18n="styleNone">無風格</option>
            <option value="anime">🎭 動漫</option>
            <option value="photorealistic">📷 寫實</option>
            <option value="oil-painting">🖼️ 油畫</option>
            <option value="watercolor">💧 水彩</option>
            <option value="cyberpunk">🌃 賽博朋克</option>
            <option value="fantasy">🐉 奇幻</option>
          </select>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label data-i18n="widthLabel">📏 寬度</label>
            <input type="number" id="width" value="1024" min="512" max="2048" step="64">
          </div>
          
          <div class="form-group">
            <label data-i18n="heightLabel">📏 高度</label>
            <input type="number" id="height" value="1024" min="512" max="2048" step="64">
          </div>
        </div>
        
        <div class="toggle-switch">
          <input type="checkbox" id="autoOptimize" checked>
          <label for="autoOptimize" data-i18n="autoOptimizeLabel">🎯 自動優化</label>
        </div>
        
        <div class="toggle-switch">
          <input type="checkbox" id="autoHD" checked>
          <label for="autoHD" data-i18n="autoHDLabel">✨ HD 優化</label>
        </div>
        
        <button class="btn btn-primary" id="generateBtn">
          <span data-i18n="generateBtn">🎨 開始生成</span>
        </button>
      </div>
      
      <div class="right-panel">
        <div class="result-panel">
          <h2><span data-i18n="resultTitle">🖼️ 生成結果</span></h2>
          
          <div class="result-container" id="resultContainer">
            <div class="placeholder">
              <div class="icon">🎨</div>
              <p data-i18n="resultPlaceholder">設定參數後點擊「開始生成」</p>
            </div>
          </div>
          
          <div id="metaInfo" style="display: none;"></div>
          <div id="translationInfo" style="display: none;"></div>
          <div id="actionButtons" style="display: none;"></div>
        </div>
        
        <div class="history-panel" id="historyPanel">
          <div class="history-header">
            <h3>
              <span data-i18n="historyTitle">📜 生成歷史</span>
              <span class="badge" id="historyCountBadge">0</span>
            </h3>
            <div class="history-actions">
              <button class="btn btn-secondary btn-small" onclick="exportHistory()">
                <span data-i18n="exportBtn">📥 匯出</span>
              </button>
              <button class="btn btn-danger btn-small" onclick="clearHistory()">
                <span data-i18n="clearBtn">🗑️ 清空</span>
              </button>
            </div>
          </div>
          
          <div class="history-grid" id="historyGrid">
            <div class="history-empty">
              <div class="icon">📭</div>
              <p data-i18n="historyEmpty">暫無歷史記錄</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    const MAX_HISTORY = 100;
    
    const translations = {
      zh: {
        subtitle: 'AI 圖像生成工具 - 深色模式 + 歷史記錄',
        settings: '⚙️ 生成設定',
        autoTranslateTitle: '🌐 自動翻譯已啟用',
        autoTranslateDesc: '輸入中文將自動翻譯成英文生成圖片',
        promptLabel: '✨ 提示詞',
        negativePromptLabel: '🚫 負面提示詞',
        modelLabel: '🤖 模型',
        qualityLabel: '💎 質量',
        qualityEconomy: '經濟',
        qualityStandard: '標準',
        qualityUltra: '超高清',
        styleLabel: '🎨 風格',
        styleNone: '無風格',
        widthLabel: '📏 寬度',
        heightLabel: '📏 高度',
        autoOptimizeLabel: '🎯 自動優化',
        autoHDLabel: '✨ HD 優化',
        generateBtn: '🎨 開始生成',
        generating: '⏳ 生成中...',
        resultTitle: '🖼️ 生成結果',
        resultPlaceholder: '設定參數後點擊「開始生成」',
        downloadBtn: '⬇️ 下載',
        newBtn: '🔄 重新生成',
        historyBtn: '歷史記錄',
        historyTitle: '📜 生成歷史',
        exportBtn: '📥 匯出',
        clearBtn: '🗑️ 清空',
        historyEmpty: '暫無歷史記錄',
        clearConfirm: '確定要清空所有歷史記錄嗎？',
        deleteConfirm: '確定要刪除這條記錄嗎？',
        translating: '🌐 正在翻譯...',
        generating_text: '正在生成圖片...',
        no_prompt: '請輸入提示詞',
        no_image: '沒有可下載的圖片'
      },
      en: {
        subtitle: 'AI Image Generation - Dark Mode + History',
        settings: '⚙️ Settings',
        autoTranslateTitle: '🌐 Auto Translation Enabled',
        autoTranslateDesc: 'Chinese prompts will be automatically translated',
        promptLabel: '✨ Prompt',
        negativePromptLabel: '🚫 Negative Prompt',
        modelLabel: '🤖 Model',
        qualityLabel: '💎 Quality',
        qualityEconomy: 'Economy',
        qualityStandard: 'Standard',
        qualityUltra: 'Ultra HD',
        styleLabel: '🎨 Style',
        styleNone: 'No Style',
        widthLabel: '📏 Width',
        heightLabel: '📏 Height',
        autoOptimizeLabel: '🎯 Auto Optimize',
        autoHDLabel: '✨ HD Enhancement',
        generateBtn: '🎨 Generate',
        generating: '⏳ Generating...',
        resultTitle: '🖼️ Result',
        resultPlaceholder: 'Configure and click "Generate"',
        downloadBtn: '⬇️ Download',
        newBtn: '🔄 New',
        historyBtn: 'History',
        historyTitle: '📜 Generation History',
        exportBtn: '📥 Export',
        clearBtn: '🗑️ Clear',
        historyEmpty: 'No history yet',
        clearConfirm: 'Clear all history?',
        deleteConfirm: 'Delete this record?',
        translating: '🌐 Translating...',
        generating_text: 'Generating image...',
        no_prompt: 'Please enter a prompt',
        no_image: 'No image to download'
      }
    };
    
    let currentLang = localStorage.getItem('language') || 'zh';
    let currentConfig = null;
    let currentImage = null;
    let currentMetadata = null;
    let imageHistory = JSON.parse(localStorage.getItem('imageHistory') || '[]');
    
    function switchLanguage(lang) {
      currentLang = lang;
      localStorage.setItem('language', lang);
      
      document.getElementById('langZh').classList.toggle('active', lang === 'zh');
      document.getElementById('langEn').classList.toggle('active', lang === 'en');
      
      document.querySelectorAll('[data-i18n]').forEach(function(element) {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
          element.textContent = translations[lang][key];
        }
      });
      
      document.querySelectorAll('option[data-i18n]').forEach(function(element) {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
          element.textContent = translations[lang][key];
        }
      });
      
      console.log('🌐 語言已切換至:', lang === 'zh' ? '繁體中文' : 'English');
    }
    function toggleHistory() {
      const panel = document.getElementById('historyPanel');
      panel.classList.toggle('show');
      renderHistory();
    }
    
    function saveToHistory(imageData, metadata) {
      const record = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        image: imageData,
        prompt: metadata.prompt || document.getElementById('prompt').value.trim(),
        model: metadata.model,
        style: metadata.style,
        width: metadata.width,
        height: metadata.height,
        seed: metadata.seed,
        translated: metadata.auto_translated || metadata.autoTranslated || false,
        translationInfo: metadata.translation_info || null
      };
      
      imageHistory.unshift(record);
      
      if (imageHistory.length > MAX_HISTORY) {
        imageHistory = imageHistory.slice(0, MAX_HISTORY);
      }
      
      try {
        localStorage.setItem('imageHistory', JSON.stringify(imageHistory));
        updateHistoryCount();
        console.log('✅ 已儲存到歷史記錄，共', imageHistory.length, '條');
      } catch (e) {
        console.error('❌ 儲存歷史記錄失敗:', e);
        if (e.name === 'QuotaExceededError') {
          imageHistory = imageHistory.slice(0, 10);
          localStorage.setItem('imageHistory', JSON.stringify(imageHistory));
        }
      }
    }
    
    function updateHistoryCount() {
      const count = imageHistory.length;
      document.getElementById('historyCount').textContent = count;
      document.getElementById('historyCountBadge').textContent = count;
    }
    
    function renderHistory() {
      const grid = document.getElementById('historyGrid');
      
      if (imageHistory.length === 0) {
        grid.innerHTML = '<div class="history-empty"><div class="icon">📭</div><p data-i18n="historyEmpty">' + translations[currentLang].historyEmpty + '</p></div>';
        return;
      }
      
      const items = imageHistory.map(function(record) {
        const date = new Date(record.timestamp);
        const dateStr = date.toLocaleDateString(currentLang === 'zh' ? 'zh-TW' : 'en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        
        const promptText = record.prompt.substring(0, 30);
        const promptFull = promptText + (record.prompt.length > 30 ? '...' : '');
        
        return '<div class="history-item" onclick="loadFromHistory(' + record.id + ')">' +
          '<button class="history-item-delete" onclick="deleteFromHistory(' + record.id + ', event)">×</button>' +
          '<img src="' + record.image + '" alt="Generated Image">' +
          '<div class="history-item-info">' +
          '<div class="history-item-prompt">' + promptFull + '</div>' +
          '<div class="history-item-meta">' +
          '<span>' + record.model + '</span>' +
          '<span>' + dateStr + '</span>' +
          '</div></div></div>';
      });
      
      grid.innerHTML = items.join('');
    }
    
    function loadFromHistory(id) {
      const record = imageHistory.find(function(r) { return r.id === id; });
      if (!record) return;
      
      currentImage = record.image;
      currentMetadata = {
        model: record.model,
        style: record.style,
        width: record.width,
        height: record.height,
        seed: record.seed,
        auto_translated: record.translated,
        translation_info: record.translationInfo
      };
      
      displayResult(record.image, currentMetadata);
      
      document.getElementById('prompt').value = record.prompt;
      document.getElementById('model').value = record.model;
      document.getElementById('style').value = record.style;
      document.getElementById('width').value = record.width;
      document.getElementById('height').value = record.height;
      
      console.log('✅ 已從歷史記錄載入:', record.prompt.substring(0, 50));
    }
    
    function deleteFromHistory(id, event) {
      if (event) {
        event.stopPropagation();
      }
      
      const confirmMsg = translations[currentLang].deleteConfirm;
      if (!confirm(confirmMsg)) return;
      
      imageHistory = imageHistory.filter(function(r) { return r.id !== id; });
      localStorage.setItem('imageHistory', JSON.stringify(imageHistory));
      updateHistoryCount();
      renderHistory();
      
      console.log('🗑️ 已刪除歷史記錄，剩餘', imageHistory.length, '條');
    }
    
    function clearHistory() {
      const confirmMsg = translations[currentLang].clearConfirm;
      if (!confirm(confirmMsg)) return;
      
      imageHistory = [];
      localStorage.removeItem('imageHistory');
      updateHistoryCount();
      renderHistory();
      
      console.log('🗑️ 已清空所有歷史記錄');
    }
    
    function exportHistory() {
      if (imageHistory.length === 0) {
        alert(currentLang === 'zh' ? '沒有可匯出的記錄' : 'No records to export');
        return;
      }
      
      const dataStr = JSON.stringify(imageHistory, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'flux-ai-history-' + Date.now() + '.json';
      link.click();
      URL.revokeObjectURL(url);
      
      console.log('📥 已匯出', imageHistory.length, '條歷史記錄');
    }
    
    async function generateImage() {
      const prompt = document.getElementById('prompt').value.trim();
      if (!prompt) {
        alert(translations[currentLang].no_prompt);
        return;
      }
      
      const model = document.getElementById('model').value;
      const width = parseInt(document.getElementById('width').value);
      const height = parseInt(document.getElementById('height').value);
      const negativePrompt = document.getElementById('negativePrompt').value.trim();
      const style = document.getElementById('style').value;
      const qualityMode = document.getElementById('qualityMode').value;
      const autoOptimize = document.getElementById('autoOptimize').checked;
      const autoHD = document.getElementById('autoHD').checked;
      
      const generateBtn = document.getElementById('generateBtn');
      const resultContainer = document.getElementById('resultContainer');
      const metaInfo = document.getElementById('metaInfo');
      const translationInfo = document.getElementById('translationInfo');
      const actionButtons = document.getElementById('actionButtons');
      
      const hasChinese = /[\u4e00-\u9fa5]/.test(prompt);
      const translatingText = translations[currentLang].translating;
      const translationHint = hasChinese ? '<p style="font-size: 0.9em; color: #9ca3af; margin-top: 10px;">' + translatingText + '</p>' : '';
      
      generateBtn.disabled = true;
      generateBtn.innerHTML = translations[currentLang].generating;
      resultContainer.innerHTML = '<div class="loading"><div class="spinner"></div><p>' + translations[currentLang].generating_text + '</p>' + translationHint + '</div>';
      metaInfo.style.display = 'none';
      translationInfo.style.display = 'none';
      actionButtons.style.display = 'none';
      
      try {
        const response = await fetch('/_internal/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: prompt,
            model: model,
            width: width,
            height: height,
            negativePrompt: negativePrompt,
            style: style,
            qualityMode: qualityMode,
            autoOptimize: autoOptimize,
            autoHD: autoHD,
            seed: -1,
            nologo: true,
            privateMode: true,
            enhance: false,
            responseFormat: 'url'
          })
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || '生成失敗');
        }
        
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.startsWith('image/')) {
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
          
          currentImage = imageUrl;
          currentMetadata = {
            prompt: prompt,
            model: model,
            width: width,
            height: height,
            style: style,
            qualityMode: qualityMode,
            seed: response.headers.get('X-Generation-Seed'),
            autoTranslated: response.headers.get('X-Generation-Auto-Translated') === 'true',
            hdOptimized: response.headers.get('X-Generation-HD-Optimized') === 'true',
            authenticated: response.headers.get('X-Generation-Authenticated') === 'true'
          };
          
          displayResult(imageUrl, currentMetadata);
          saveToHistory(imageUrl, currentMetadata);
          
        } else {
          const data = await response.json();
          console.log('✅ 生成成功:', data);
          
          if (data.data && data.data.length > 0) {
            const result = data.data[0];
            const imageUrl = result.image || result.url;
            
            currentImage = imageUrl;
            currentMetadata = { prompt: prompt, model: model, style: style, width: width, height: height };
            Object.assign(currentMetadata, result);
            
            displayResult(imageUrl, result);
            saveToHistory(imageUrl, currentMetadata);
          } else {
            throw new Error('未收到圖片數據');
          }
        }
        
      } catch (error) {
        console.error('❌ 生成失敗:', error);
        resultContainer.innerHTML = '<div class="placeholder"><div class="icon" style="color: #ef4444;">❌</div><p style="color: #ef4444;">生成失敗：' + error.message + '</p><p style="font-size: 0.9em; color: #6b7280; margin-top: 10px;">請檢查網絡連接或稍後重試</p></div>';
      } finally {
        generateBtn.disabled = false;
        generateBtn.innerHTML = '<span data-i18n="generateBtn">' + translations[currentLang].generateBtn + '</span>';
      }
    }
    function displayResult(imageUrl, metadata) {
      const resultContainer = document.getElementById('resultContainer');
      const metaInfo = document.getElementById('metaInfo');
      const translationInfo = document.getElementById('translationInfo');
      const actionButtons = document.getElementById('actionButtons');
      
      resultContainer.innerHTML = '<img src="' + imageUrl + '" alt="Generated Image">';
      
      const modelLabel = currentLang === 'zh' ? '模型' : 'Model';
      const sizeLabel = currentLang === 'zh' ? '尺寸' : 'Size';
      const styleLabel = currentLang === 'zh' ? '風格' : 'Style';
      const qualityLabel = currentLang === 'zh' ? '質量' : 'Quality';
      const seedLabel = currentLang === 'zh' ? '種子' : 'Seed';
      const translatedLabel = currentLang === 'zh' ? '翻譯' : 'Translated';
      const authLabel = currentLang === 'zh' ? '認證' : 'Auth';
      
      let metaHTML = '<div><strong>🤖 ' + modelLabel + '</strong><span>' + metadata.model + '</span></div>' +
        '<div><strong>📐 ' + sizeLabel + '</strong><span>' + metadata.width + ' × ' + metadata.height + '</span></div>' +
        '<div><strong>🎨 ' + styleLabel + '</strong><span>' + metadata.style + '</span></div>' +
        '<div><strong>💎 ' + qualityLabel + '</strong><span>' + (metadata.quality_mode || metadata.qualityMode) + '</span></div>';
      
      if (metadata.seed) {
        metaHTML += '<div><strong>🎲 ' + seedLabel + '</strong><span>' + metadata.seed + '</span></div>';
      }
      
      metaHTML += '<div><strong>✨ HD</strong><span>' + (metadata.hd_optimized || metadata.hdOptimized ? '✅' : '❌') + '</span></div>';
      metaHTML += '<div><strong>🌐 ' + translatedLabel + '</strong><span>' + (metadata.auto_translated || metadata.autoTranslated ? '✅' : '❌') + '</span></div>';
      metaHTML += '<div><strong>🔐 ' + authLabel + '</strong><span>' + (metadata.authenticated ? '✅' : '⚠️') + '</span></div>';
      
      metaInfo.innerHTML = metaHTML;
      metaInfo.style.display = 'block';
      
      if (metadata.translation_info && metadata.translation_info.original) {
        const ti = metadata.translation_info;
        const originalLabel = currentLang === 'zh' ? '原文' : 'Original';
        const translatedTextLabel = currentLang === 'zh' ? '譯文' : 'Translated';
        const engineLabel = currentLang === 'zh' ? '引擎' : 'Engine';
        const freeLabel = currentLang === 'zh' ? '免費' : 'Free';
        
        translationInfo.innerHTML = '<h4>🌐 ' + (currentLang === 'zh' ? 'Google 翻譯資訊' : 'Google Translation Info') + '</h4>' +
          '<p><strong>' + originalLabel + '：</strong>' + ti.original + '</p>' +
          '<p><strong>' + translatedTextLabel + '：</strong>' + ti.translated + '</p>' +
          '<p><strong>' + engineLabel + '：</strong>' + ti.model + ' <span class="badge success">' + freeLabel + '</span></p>';
        translationInfo.style.display = 'block';
      } else {
        translationInfo.style.display = 'none';
      }
      
      actionButtons.innerHTML = '<div class="action-buttons">' +
        '<button class="btn btn-secondary" onclick="downloadImage()"><span data-i18n="downloadBtn">' + translations[currentLang].downloadBtn + '</span></button>' +
        '<button class="btn btn-secondary" onclick="generateNew()"><span data-i18n="newBtn">' + translations[currentLang].newBtn + '</span></button>' +
        '</div>';
      actionButtons.style.display = 'block';
    }
    
    function downloadImage() {
      if (!currentImage) {
        alert(translations[currentLang].no_image);
        return;
      }
      
      const link = document.createElement('a');
      link.href = currentImage;
      link.download = 'flux-ai-' + Date.now() + '.png';
      link.click();
    }
    
    function generateNew() {
      document.getElementById('resultContainer').innerHTML = '<div class="placeholder"><div class="icon">🎨</div><p data-i18n="resultPlaceholder">' + translations[currentLang].resultPlaceholder + '</p></div>';
      document.getElementById('metaInfo').style.display = 'none';
      document.getElementById('translationInfo').style.display = 'none';
      document.getElementById('actionButtons').style.display = 'none';
      currentImage = null;
      currentMetadata = null;
    }
    
    document.getElementById('generateBtn').addEventListener('click', generateImage);
    
    document.getElementById('prompt').addEventListener('keydown', function(e) {
      if (e.ctrlKey && e.key === 'Enter') {
        generateImage();
      }
    });
    
    window.addEventListener('DOMContentLoaded', async function() {
      console.log('🌙 Flux AI Pro Dark Mode 正在初始化...');
      
      switchLanguage(currentLang);
      updateHistoryCount();
      
      try {
        const response = await fetch('/api/config');
        currentConfig = await response.json();
        console.log('✅ 配置載入成功:', currentConfig);
      } catch (error) {
        console.error('❌ 載入配置失敗:', error);
      }
      
      try {
        const healthResponse = await fetch('/health');
        const health = await healthResponse.json();
        console.log('📊 系統狀態:', health);
        
        if (!health.api_key_configured) {
          const warningBox = document.createElement('div');
          warningBox.className = 'info-box warning';
          warningBox.innerHTML = '<h4>⚠️ API Key 未設定</h4>' +
            '<p>新 Pollinations API 端點需要 API Key 才能正常使用。請在 Cloudflare Workers 環境變數中設定 <code>POLLINATIONS_API_KEY</code>。</p>' +
            '<p style="margin-top: 8px;">未設定 API Key 的請求可能會失敗。</p>';
          document.querySelector('.left-panel').insertBefore(warningBox, document.querySelector('.info-box'));
        }
        
        console.log('🌐 翻譯引擎:', health.translation_engine);
        console.log('✅ 免費翻譯:', health.features && health.features.translation_free ? '是' : '否');
        console.log('📜 歷史記錄:', imageHistory.length, '/ 100 條');
        console.log('🌙 深色模式已啟用');
      } catch (error) {
        console.error('❌ 無法獲取系統狀態:', error);
      }
      
      console.log('✅ 初始化完成！');
      console.log('💡 提示：使用 Ctrl+Enter 快速生成圖片');
    });
  </script>
</body>
</html>
`;

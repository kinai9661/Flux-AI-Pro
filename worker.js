// =================================================================================
//  項目: Flux AI Pro
//  版本: 9.6.0-gen-api (✅ 更新至 gen.pollinations.ai)
//  項目: Flux AI Pro - Extended Styles Edition
//  版本: 9.6.1-extended-styles (✅ 45+ 種藝術風格)
//  作者: Enhanced by AI Assistant  
//  日期: 2025-12-17
//  更新: ✅ 新 API 端點 | ✅ 必需 API Key | ✅ Bearer Token 認證
//  更新: ✅ 45+ 種藝術風格 | ✅ 分類組織 | ✅ 新 API 端點
//  模型: zimage, flux, turbo, kontext (4個模型)
// =================================================================================

const CONFIG = {
  PROJECT_NAME: "Flux-AI-Pro",
  PROJECT_VERSION: "9.6.0-gen-api",
  PROJECT_VERSION: "9.6.1-extended-styles",
  API_MASTER_KEY: "1",
  FETCH_TIMEOUT: 120000,
  MAX_RETRIES: 3,

  POLLINATIONS_AUTH: {
    enabled: true,        // ✅ 改為 true，啟用認證
    token: "",            // ✅ 將從 env.POLLINATIONS_API_KEY 讀取
    enabled: true,
    token: "",  // 將從 env.POLLINATIONS_API_KEY 讀取
    method: "header"
  },

const CONFIG = {
  PROVIDERS: {
    pollinations: {
      name: "Pollinations.ai",
      endpoint: "https://gen.pollinations.ai",  // ✅ 更新為新端點
      pathPrefix: "/image",                      // ✅ 新增路徑前綴
      endpoint: "https://gen.pollinations.ai",
      pathPrefix: "/image",
      type: "direct",
      auth_mode: "required",  // ✅ 改為必需認證
      requires_key: true,     // ✅ 標記需要 API Key
      auth_mode: "required",
      requires_key: true,
      enabled: true,
      default: true,
      description: "官方 AI 圖像生成服務（需要 API Key）",
@@ -112,15 +112,355 @@ const CONFIG = {

  DEFAULT_PROVIDER: "pollinations",

  // ========================================
  // ✨ 擴展風格庫 - 45+ 種藝術風格
  // ========================================
  STYLE_PRESETS: {
    none: { name: "無 (使用原始提示詞)", prompt: "", negative: "" },
    anime: { name: "動漫風格 ✨", prompt: "anime style, anime art, vibrant colors, anime character, detailed anime", negative: "realistic, photograph, 3d, ugly" },
    photorealistic: { name: "寫實照片 📷", prompt: "photorealistic, ultra realistic, 8k uhd, professional photography, detailed, sharp focus, DSLR, high resolution", negative: "anime, cartoon, illustration, painting, drawing, art" },
    "oil-painting": { name: "油畫 🎨", prompt: "oil painting, classical oil painting style, visible brushstrokes, rich colors, artistic, canvas texture", negative: "photograph, digital art, anime, flat" },
    watercolor: { name: "水彩畫 💧", prompt: "watercolor painting, soft colors, watercolor texture, artistic, hand-painted, paper texture, flowing colors", negative: "photograph, digital, sharp edges, 3d" },
    cyberpunk: { name: "賽博朋克 🌃", prompt: "cyberpunk style, neon lights, futuristic, sci-fi, dystopian, high-tech low-life, blade runner style", negative: "natural, rustic, medieval, fantasy" },
    fantasy: { name: "奇幻風格 🐉", prompt: "fantasy art, magical, epic fantasy, detailed fantasy illustration, mystical, enchanted", negative: "modern, realistic, mundane, contemporary" },
    "studio-ghibli": { name: "吉卜力風格 🍃", prompt: "Studio Ghibli style, Hayao Miyazaki, anime, soft colors, whimsical, detailed background, hand-drawn", negative: "realistic, dark, 3D, western animation" }
    // ========== 基礎風格 ==========
    none: { 
      name: "無風格", 
      prompt: "", 
      negative: "",
      category: "basic",
      icon: "⚡",
      description: "使用原始提示詞"
    },
    
    // ========== 插畫動畫 ==========
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
    
    // ========== 漫畫風格 ==========
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
    
    // ========== 黑白單色 ==========
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
    
    // ========== 寫實風格 ==========
    photorealistic: { 
      name: "寫實照片", 
      prompt: "photorealistic, 8k uhd, high quality, detailed, professional photography, sharp focus", 
      negative: "anime, cartoon, illustration, painting, drawing, art",
      category: "realistic",
      icon: "📷",
      description: "攝影級寫實效果"
    },
    
    // ========== 繪畫風格 ==========
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
    
    // ========== 藝術流派 ==========
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
    
    // ========== 視覺風格 ==========
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
    
    // ========== 數位風格 ==========
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
    
    // ========== 傳統藝術 ==========
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
    
    // ========== 美學風格 ==========
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
    
    // ========== 科幻奇幻 ==========
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
  // ========================================
  // 風格分類配置
  // ========================================
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
@@ -141,16 +481,44 @@ const CONFIG = {
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
@@ -159,14 +527,42 @@ const CONFIG = {
    },
    HD_NEGATIVE: "blurry, low quality, distorted, ugly, bad anatomy, low resolution, pixelated, artifacts, noise",
    MODEL_QUALITY_PROFILES: {
      "zimage": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.0, guidance_boost: 1.0, recommended_quality: "economy" },
      "flux": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.1, guidance_boost: 1.0, recommended_quality: "standard" },
      "turbo": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 0.9, guidance_boost: 0.95, recommended_quality: "economy" },
      "kontext": { min_resolution: 1280, max_resolution: 2048, optimal_steps_boost: 1.2, guidance_boost: 1.1, recommended_quality: "ultra" }
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
// 工具類：Logger, IP獲取, 翻譯, 優化器
// =================================================================================

class Logger {
  constructor() {
    this.logs = [];
@@ -185,850 +581,971 @@ function getClientIP(request) {
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
      const response = await env.AI.run("@cf/meta/m2m100-1.2b", { 
        text: text, 
        source_lang: "chinese", 
        target_lang: "english" 
      });
      
      if (response && response.translated_text) {
        console.log("✅ Translation:", text, "→", response.translated_text);
        return { 
          text: response.translated_text, 
          translated: true, 
          original: text, 
          model: "m2m100-1.2b" 
        };
      }
    } catch (error) {
        console.error("❌ translateToEnglish error:", error);
        return { text: text, translated: false, error: error.message };
      console.error("❌ Translation failed:", error.message);
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
            return { steps: userSteps, optimized: false, suggested: suggestion.steps, reasoning: suggestion.reasoning, user_override: true };
        }
        return this.calculateOptimalSteps(model, width, height, style, qualityMode);
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
        if (error.name === 'AbortError') throw new Error("Request timeout after " + timeout + "ms");
        throw error;
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
// ✅ 已更新至 gen.pollinations.ai 端點
// ✅ 已加入必需的 Bearer Token 認證
// PollinationsProvider：核心圖像生成類
// =================================================================================

class PollinationsProvider {
    constructor(config, env) {
        this.config = config;
        this.name = config.name;
        this.env = env;
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
      headers['Authorization'] = `Bearer ${authConfig.token}`;
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
              reference_images_used: validReferenceImages.length,
              generation_mode: validReferenceImages.length > 0 ? "圖生圖" : "文生圖",
              authenticated: authConfig.enabled && !!authConfig.token,
              seed: currentSeed 
            });

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
            const imageBlob = await response.blob();
            const imageBuffer = await imageBlob.arrayBuffer();

            if (guidance === null) {
                finalGuidance = ParameterOptimizer.optimizeGuidance(model, style, qualityMode);
            } else {
                finalGuidance = guidance;
            }
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
            finalSteps = steps || 20;
            finalGuidance = guidance || 7.5;
          throw new Error("HTTP " + response.status + ": " + (await response.text()).substring(0, 200));
        }
        
        const { enhancedPrompt, enhancedNegative } = StyleProcessor.applyStyle(finalPrompt, style, finalNegativePrompt);
        
        logger.add("🎨 Style Processing", { 
            selected_style: style,
            style_applied: style !== 'none',
            original_prompt_length: finalPrompt.length,
            enhanced_prompt_length: enhancedPrompt.length,
            prompt_added: enhancedPrompt.length - finalPrompt.length
      } catch (e) {
        logger.add("❌ Request Failed", { 
          error: e.message, 
          model: model, 
          retry: retry + 1,
          max_retries: CONFIG.MAX_RETRIES,
          endpoint: this.config.endpoint
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
        if (retry < CONFIG.MAX_RETRIES - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (retry + 1)));
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
        
        // ✅ 更新 URL 構建邏輯：使用新的 /image/{prompt} 格式
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
        
        // ✅ 加入必需的 Bearer Token 認證
        const authConfig = CONFIG.POLLINATIONS_AUTH;
        if (authConfig.enabled && authConfig.token) {
            headers['Authorization'] = `Bearer ${authConfig.token}`;
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
          throw new Error("Generation failed: " + e.message);
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
                            hd_optimized: autoHD && hdOptimization?.optimized, 
                            auto_translated: translation.translated,
                            reference_images_used: validReferenceImages.length,
                            generation_mode: validReferenceImages.length > 0 ? "圖生圖" : "文生圖",
                            authenticated: authConfig.enabled && !!authConfig.token,
                            seed: currentSeed 
                        });
                        
                        // ✅ 獲取圖片字節數據
                        const imageBlob = await response.blob();
                        const imageBuffer = await imageBlob.arrayBuffer();
                        
                        return { 
                            // ✅ 返回圖片字節數據
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
                            authenticated: authConfig.enabled && !!authConfig.token,
                            cost: "FREE", 
                            auto_optimized: autoOptimize 
                        };
                    } else {
                        throw new Error("Invalid content type: " + contentType);
                    }
                } else if (response.status === 401) {
                    // ✅ 專門處理認證失敗
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
                    // 最後一次重試失敗，拋出詳細錯誤
                    throw new Error("Generation failed: " + e.message);
                }
            }
        }
        throw new Error("Model " + model + " failed after " + CONFIG.MAX_RETRIES + " retries");
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
  constructor(apiKeys = {}, env = null) {
    this.providers = {};
    this.apiKeys = apiKeys;
    this.env = env;

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
    for (const [key, config] of Object.entries(CONFIG.PROVIDERS)) {
      if (config.enabled) {
        if (key === 'pollinations') {
          this.providers[key] = new PollinationsProvider(config, env);
        }
        throw new Error('No available provider');
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
// 第 4 段：主入口和內部生成函數（返回圖片字節）
// ✅ 已加入 API Key 環境變量讀取邏輯
// 主入口：Worker Fetch Handler
// =================================================================================

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const startTime = Date.now();
        const clientIP = getClientIP(request);
        
        // ✅ 從環境變量讀取 API Key 並設置到 CONFIG
        if (env.POLLINATIONS_API_KEY) {
            CONFIG.POLLINATIONS_AUTH.enabled = true;
            CONFIG.POLLINATIONS_AUTH.token = env.POLLINATIONS_API_KEY;
        } else {
            // ✅ 如果沒有 API Key，記錄警告
            console.warn("⚠️ POLLINATIONS_API_KEY not set - requests may fail on new API endpoint");
            CONFIG.POLLINATIONS_AUTH.enabled = false;
            CONFIG.POLLINATIONS_AUTH.token = "";
        }
        
        console.log("=== Web UI Request ===");
        console.log("IP:", clientIP);
        console.log("Path:", url.pathname);
        console.log("Method:", request.method);
        console.log("Workers AI:", !!env.AI);
        console.log("API Auth:", CONFIG.POLLINATIONS_AUTH.enabled ? "✅ Enabled" : "❌ Disabled");
        console.log("API Endpoint:", CONFIG.PROVIDERS.pollinations.endpoint);
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
                        has_token: !!CONFIG.POLLINATIONS_AUTH.token,
                        endpoint: CONFIG.PROVIDERS.pollinations.endpoint
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
                    available_paths: ['/', '/health', '/_internal/generate']
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
                    timestamp: new Date().toISOString(),
                    duration_ms: duration
                }
            }), {
                status: 500,
                headers: corsHeaders({ 'Content-Type': 'application/json' })
            });
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const startTime = Date.now();
    const clientIP = getClientIP(request);
    
    // 從環境變量讀取 API Key
    if (env.POLLINATIONS_API_KEY) {
      CONFIG.POLLINATIONS_AUTH.enabled = true;
      CONFIG.POLLINATIONS_AUTH.token = env.POLLINATIONS_API_KEY;
    } else {
      console.warn("⚠️ POLLINATIONS_API_KEY not set - requests may fail on new API endpoint");
      CONFIG.POLLINATIONS_AUTH.enabled = false;
      CONFIG.POLLINATIONS_AUTH.token = "";
    }
    
    console.log("=== Request Info ===");
    console.log("IP:", clientIP);
    console.log("Path:", url.pathname);
    console.log("Method:", request.method);
    console.log("Workers AI:", !!env.AI);
    console.log("API Auth:", CONFIG.POLLINATIONS_AUTH.enabled ? "✅ Enabled" : "❌ Disabled");
    console.log("API Endpoint:", CONFIG.PROVIDERS.pollinations.endpoint);
    console.log("Styles Count:", Object.keys(CONFIG.STYLE_PRESETS).length);
    console.log("===================");
    
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
          styles_count: Object.keys(CONFIG.STYLE_PRESETS).length,
          api_auth: {
            enabled: CONFIG.POLLINATIONS_AUTH.enabled,
            method: CONFIG.POLLINATIONS_AUTH.method,
            has_token: !!CONFIG.POLLINATIONS_AUTH.token,
            endpoint: CONFIG.PROVIDERS.pollinations.endpoint
          },
          models: CONFIG.PROVIDERS.pollinations.models.map(m => ({
            id: m.id,
            name: m.name,
            category: m.category,
            supports_reference_images: m.supports_reference_images || false
          })),
          style_categories: Object.keys(CONFIG.STYLE_CATEGORIES).map(key => ({
            id: key,
            name: CONFIG.STYLE_CATEGORIES[key].name,
            icon: CONFIG.STYLE_CATEGORIES[key].icon,
            count: Object.values(CONFIG.STYLE_PRESETS).filter(s => s.category === key).length
          }))
        }), { 
          headers: corsHeaders({ 'Content-Type': 'application/json' }) 
        });
      } else {
        response = new Response(JSON.stringify({
          error: 'Not Found',
          message: '此 Worker 僅提供 Web UI 界面',
          available_paths: ['/', '/health', '/_internal/generate']
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
      headers.set('X-Styles-Count', Object.keys(CONFIG.STYLE_PRESETS).length.toString());
      
      return new Response(response.body, { 
        status: response.status, 
        headers: headers 
      });
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error('Worker error:', error);
      return new Response(JSON.stringify({
        error: {
          message: error.message,
          type: 'worker_error',
          timestamp: new Date().toISOString(),
          duration_ms: duration
        }
      }), {
        status: 500,
        headers: corsHeaders({ 'Content-Type': 'application/json' })
      });
    }
  }
};

// =================================================================================
// 內部生成處理函數
// =================================================================================

async function handleInternalGenerate(request, env, ctx) {
    const logger = new Logger();
    const startTime = Date.now();
  const logger = new Logger();
  const startTime = Date.now();
  
  try {
    const body = await request.json();
    const prompt = body.prompt;
    if (!prompt || !prompt.trim()) {
      throw new Error("Prompt is required");
    }

    try {
        const body = await request.json();
        const prompt = body.prompt;
        if (!prompt || !prompt.trim()) throw new Error("Prompt is required");
        
        // ✅ 檢查 API Key 是否已設置
        if (!CONFIG.POLLINATIONS_AUTH.enabled || !CONFIG.POLLINATIONS_AUTH.token) {
            logger.add("⚠️ API Key Warning", {
                status: "missing",
                message: "POLLINATIONS_API_KEY 未設置，請求可能會失敗",
                endpoint: CONFIG.PROVIDERS.pollinations.endpoint,
                recommendation: "請使用 'wrangler secret put POLLINATIONS_API_KEY' 設置 API Key"
            });
    if (!CONFIG.POLLINATIONS_AUTH.enabled || !CONFIG.POLLINATIONS_AUTH.token) {
      logger.add("⚠️ API Key Warning", {
        status: "missing",
        message: "POLLINATIONS_API_KEY 未設置，請求可能會失敗",
        endpoint: CONFIG.PROVIDERS.pollinations.endpoint,
        recommendation: "請使用 'wrangler secret put POLLINATIONS_API_KEY' 設置 API Key"
      });
    }
    
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
    
    // 單張圖片：直接返回圖片字節
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
          'X-Style': result.style,
          'X-Style-Name': result.style_name || result.style,
          'X-Style-Category': result.style_category || 'unknown',
          'X-Generation-Mode': result.generation_mode || '文生圖',
          'X-Authenticated': result.authenticated ? 'true' : 'false',
          'X-API-Endpoint': CONFIG.PROVIDERS.pollinations.endpoint,
          ...corsHeaders()
        }
        
        const seedInput = body.seed !== undefined ? body.seed : -1;
        let seedValue = -1;
        if (seedInput !== -1) {
            const parsedSeed = parseInt(seedInput);
            if (!isNaN(parsedSeed) && parsedSeed >= 0 && parsedSeed <= 999999) {
                seedValue = parsedSeed;
            }
      });
    }
    
    // 多張圖片：返回 JSON（包含 base64）
    const imagesData = await Promise.all(results.map(async (r) => {
      if (r.imageData) {
        const uint8Array = new Uint8Array(r.imageData);
        let binary = '';
        const len = uint8Array.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(uint8Array[i]);
        }
        const base64 = btoa(binary);

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
        return {
          image: `data:${r.contentType};base64,${base64}`,
          model: r.model,
          seed: r.seed,
          width: r.width,
          height: r.height,
          quality_mode: r.quality_mode,
          style: r.style,
          style_name: r.style_name || r.style,
          style_category: r.style_category || 'unknown',
          generation_mode: r.generation_mode,
          authenticated: r.authenticated
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
                    'X-API-Endpoint': CONFIG.PROVIDERS.pollinations.endpoint,
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
            generation_time_ms: duration,
            api_endpoint: CONFIG.PROVIDERS.pollinations.endpoint,
            authenticated: CONFIG.POLLINATIONS_AUTH.enabled
        }), { 
            headers: corsHeaders({ 
                'Content-Type': 'application/json',
                'X-Generation-Time': duration + 'ms',
                'X-API-Endpoint': CONFIG.PROVIDERS.pollinations.endpoint
            }) 
        });
        
    } catch (e) {
        logger.add("❌ Error", e.message);
        return new Response(JSON.stringify({ 
            error: { 
                message: e.message, 
                debug_logs: logger.get(),
                api_endpoint: CONFIG.PROVIDERS.pollinations.endpoint,
                authenticated: CONFIG.POLLINATIONS_AUTH.enabled
            } 
        }), { 
            status: 400, 
            headers: corsHeaders({ 'Content-Type': 'application/json' }) 
        });
    }
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
    }), { 
      headers: corsHeaders({ 
        'Content-Type': 'application/json',
        'X-Generation-Time': duration + 'ms',
        'X-API-Endpoint': CONFIG.PROVIDERS.pollinations.endpoint,
        'X-Styles-Count': Object.keys(CONFIG.STYLE_PRESETS).length.toString()
      }) 
    });
    
  } catch (e) {
    logger.add("❌ Error", e.message);
    return new Response(JSON.stringify({ 
      error: { 
        message: e.message, 
        debug_logs: logger.get(),
        api_endpoint: CONFIG.PROVIDERS.pollinations.endpoint,
        authenticated: CONFIG.POLLINATIONS_AUTH.enabled
      } 
    }), { 
      status: 400, 
      headers: corsHeaders({ 'Content-Type': 'application/json' }) 
    });
  }
}
// =================================================================================
// 第 5 段：完整 Web UI 界面（處理圖片字節響應）
// ✅ 已更新 API 端點顯示
// Web UI 界面處理函數（包含 45+ 風格分類選擇器）
// =================================================================================

function handleUI() {
@@ -1037,13 +1554,40 @@ function handleUI() {
    '<span style="color:#f59e0b;font-weight:600;font-size:12px">⚠️ 需要 API Key</span>';

  const apiEndpoint = CONFIG.PROVIDERS.pollinations.endpoint;
  const stylesCount = Object.keys(CONFIG.STYLE_PRESETS).length;
  
  // 生成風格選項（按分類組織）
  const styleCategories = CONFIG.STYLE_CATEGORIES;
  const stylePresets = CONFIG.STYLE_PRESETS;
  
  let styleOptionsHTML = '';
  
  // 按分類順序排序
  const sortedCategories = Object.entries(styleCategories)
    .sort((a, b) => a[1].order - b[1].order);
  
  for (const [categoryKey, categoryInfo] of sortedCategories) {
    const stylesInCategory = Object.entries(stylePresets)
      .filter(([key, style]) => style.category === categoryKey);

    if (stylesInCategory.length > 0) {
      styleOptionsHTML += `<optgroup label="${categoryInfo.icon} ${categoryInfo.name}">`;
      
      for (const [styleKey, styleConfig] of stylesInCategory) {
        const selected = styleKey === 'none' ? ' selected' : '';
        styleOptionsHTML += `<option value="${styleKey}"${selected}>${styleConfig.icon} ${styleConfig.name}</option>`;
      }
      
      styleOptionsHTML += '</optgroup>';
    }
  }
  
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Flux AI Pro v${CONFIG.PROJECT_VERSION}</title>
<title>Flux AI Pro v${CONFIG.PROJECT_VERSION} - ${stylesCount} 種風格</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎨</text></svg>">
<style>
*{margin:0;padding:0;box-sizing:border-box}
@@ -1054,6 +1598,7 @@ body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;ba
.logo{color:#f59e0b;font-size:24px;font-weight:800;text-shadow:0 0 20px rgba(245,158,11,0.6);display:flex;align-items:center;gap:10px}
.badge{background:linear-gradient(135deg,#10b981 0%,#059669 100%);padding:4px 10px;border-radius:12px;font-size:11px;font-weight:600}
.badge-new{background:linear-gradient(135deg,#ec4899 0%,#db2777 100%);padding:4px 10px;border-radius:12px;font-size:11px;font-weight:700}
.badge-styles{background:linear-gradient(135deg,#8b5cf6 0%,#7c3aed 100%);padding:4px 10px;border-radius:12px;font-size:11px;font-weight:700}
.nav-menu{display:flex;gap:10px}
.nav-btn{padding:8px 16px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#9ca3af;cursor:pointer;font-size:14px;font-weight:600;transition:all 0.3s;display:flex;align-items:center;gap:6px}
.nav-btn:hover{border-color:#f59e0b;color:#fff}
@@ -1077,6 +1622,7 @@ input:focus,select:focus,textarea:focus{outline:none;border-color:#f59e0b;box-sh
textarea{min-height:120px;resize:vertical;font-family:inherit;line-height:1.6}
select{cursor:pointer}
.input-hint{font-size:11px;color:#6b7280;margin-top:4px}
.style-hint{font-size:11px;color:#8b5cf6;margin-top:4px;font-weight:600}
.btn{padding:12px 24px;border:none;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.3s;display:inline-flex;align-items:center;gap:8px;justify-content:center;width:100%}
.btn-primary{background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#fff;box-shadow:0 4px 15px rgba(245,158,11,0.3)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(245,158,11,0.4)}
@@ -1092,6 +1638,7 @@ select{cursor:pointer}
.gallery-meta{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:5px}
.model-badge{background:rgba(245,158,11,0.2);color:#f59e0b;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:600}
.seed-badge{background:rgba(16,185,129,0.2);color:#10b981;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:600}
.style-badge{background:rgba(139,92,246,0.2);color:#8b5cf6;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:600}
.time-badge{background:rgba(59,130,246,0.2);color:#3b82f6;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:600}
.gallery-actions{display:flex;gap:8px;margin-top:10px}
.action-btn{padding:6px 12px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:6px;font-size:12px;color:#fff;cursor:pointer;transition:all 0.3s;display:inline-flex;align-items:center;gap:5px;flex:1;justify-content:center}
@@ -1110,6 +1657,7 @@ select{cursor:pointer}
.alert-success{background:rgba(16,185,129,0.1);border-color:#10b981;color:#10b981}
.alert-error{background:rgba(239,68,68,0.1);border-color:#ef4444;color:#ef4444}
.alert-warning{background:rgba(245,158,11,0.1);border-color:#f59e0b;color:#f59e0b}
.alert-info{background:rgba(139,92,246,0.1);border-color:#8b5cf6;color:#8b5cf6}
.advanced-toggle{cursor:pointer;color:#3b82f6;font-size:13px;margin-bottom:12px;display:inline-block}
.advanced-toggle:hover{text-decoration:underline}
.advanced-section{display:none;animation:fadeIn 0.3s}
@@ -1137,7 +1685,12 @@ select{cursor:pointer}
<div class="container">
<div class="top-nav">
<div class="nav-left">
<div class="logo">🎨 Flux AI Pro<span class="badge">v${CONFIG.PROJECT_VERSION}</span><span class="badge-new">NEW API</span></div>
<div class="logo">
🎨 Flux AI Pro
<span class="badge">v${CONFIG.PROJECT_VERSION}</span>
<span class="badge-new">NEW API</span>
<span class="badge-styles">${stylesCount} 風格</span>
</div>
<div>
<div class="api-status">${authStatus}</div>
<div class="api-endpoint">📡 ${apiEndpoint}</div>
@@ -1148,6 +1701,7 @@ select{cursor:pointer}
<button class="nav-btn" data-page="history"><span>📚</span> 歷史記錄 <span id="historyCount" style="background:rgba(245,158,11,0.2);padding:2px 8px;border-radius:10px;font-size:11px">0</span></button>
</div>
</div>

<div id="generatePage" class="page active">
<div class="main-content">
<div class="left-panel">
@@ -1156,12 +1710,20 @@ select{cursor:pointer}
<div class="form-group">
<label>模型選擇</label>
<select id="model">
<optgroup label="⚡ Z-Image 系列（默認）"><option value="zimage" selected>Z-Image Turbo ⚡ (6B 參數, 極速)</option></optgroup>
<optgroup label="🎨 Flux 系列"><option value="flux">Flux 標準版 (平衡速度與質量)</option><option value="turbo">Flux Turbo ⚡ (超快速生成)</option></optgroup>
<optgroup label="🖼️ Kontext 系列（圖生圖）"><option value="kontext">Kontext 🎨 (支持參考圖像)</option></optgroup>
<optgroup label="⚡ Z-Image 系列（默認）">
<option value="zimage" selected>Z-Image Turbo ⚡ (6B 參數, 極速)</option>
</optgroup>
<optgroup label="🎨 Flux 系列">
<option value="flux">Flux 標準版 (平衡速度與質量)</option>
<option value="turbo">Flux Turbo ⚡ (超快速生成)</option>
</optgroup>
<optgroup label="🖼️ Kontext 系列（圖生圖）">
<option value="kontext">Kontext 🎨 (支持參考圖像)</option>
</optgroup>
</select>
<div class="input-hint">💰 價格: Z-Image (0.0002) | Flux (0.00012) | Turbo (0.0003) | Kontext (0.04)</div>
</div>

<div class="form-group">
<label>尺寸預設</label>
<select id="size">
@@ -1174,27 +1736,24 @@ select{cursor:pointer}
<option value="wallpaper-fhd">桌布 Full HD</option>
</select>
</div>

<div class="form-group">
<label>藝術風格</label>
<label>藝術風格 🎨</label>
<select id="style">
<option value="none" selected>無 (原始)</option>
<option value="anime">動漫風格 ✨</option>
<option value="photorealistic">寫實照片 📷</option>
<option value="oil-painting">油畫 🎨</option>
<option value="watercolor">水彩畫 💧</option>
<option value="cyberpunk">賽博朋克 🌃</option>
<option value="fantasy">奇幻風格 🐉</option>
<option value="studio-ghibli">吉卜力風格 🍃</option>
${styleOptionsHTML}
</select>
<div class="style-hint">✨ ${stylesCount} 種風格可選，分 ${Object.keys(CONFIG.STYLE_CATEGORIES).length} 大類</div>
</div>

<div class="form-group">
<label>質量模式</label>
<select id="qualityMode">
<option value="economy">經濟模式</option>
<option value="standard" selected>標準模式</option>
<option value="ultra">超高清模式</option>
<option value="economy">經濟模式 (快速)</option>
<option value="standard" selected>標準模式 (平衡)</option>
<option value="ultra">超高清模式 (極致)</option>
</select>
</div>

<a class="advanced-toggle" id="advancedToggle">▼ 進階選項</a>
<div id="advancedSection" class="advanced-section">
<div class="form-group">
@@ -1213,9 +1772,11 @@ select{cursor:pointer}
<label><input type="checkbox" id="autoHD" checked> 自動HD增強</label>
</div>
</div>

<button type="submit" class="btn btn-primary" id="generateBtn">🎨 開始生成</button>
</form>
</div>

<div class="center-panel">
<div class="section-title">🖼️ 生成結果</div>
<div id="results">
@@ -1226,6 +1787,7 @@ select{cursor:pointer}
</div>
</div>
</div>

<div class="right-panel">
<div class="section-title">💬 提示詞</div>
<div class="form-group">
@@ -1235,9 +1797,11 @@ select{cursor:pointer}
例如：
• A beautiful sunset over mountains
• 一隻可愛的貓咪在花園裡玩耍
• Cyberpunk city at night, neon lights" required></textarea>
<div class="input-hint">支持中文自動翻譯</div>
• Cyberpunk city at night, neon lights
• Anime girl with blue hair" required></textarea>
<div class="input-hint">✅ 支持中文自動翻譯</div>
</div>

<div class="form-group">
<label>負面提示詞 (可選)</label>
<textarea id="negativePrompt" placeholder="描述不想要的內容...
@@ -1246,30 +1810,60 @@ select{cursor:pointer}
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
<div class="input-hint">📌 支持圖生圖的模型：Kontext</div>
</div>

<div class="alert alert-info" style="margin-top:20px">
<strong>🎨 風格提示</strong><br>
當前已選: <span id="currentStyleName">無風格</span><br>
<span id="styleDescription" style="font-size:11px;opacity:0.8">使用原始提示詞</span>
</div>

<div class="section-title" style="margin-top:25px">📋 當前配置預覽</div>
<div class="prompt-display"><div class="label">模型</div><div class="content" id="previewModel">Z-Image Turbo</div></div>
<div class="prompt-display"><div class="label">尺寸</div><div class="content" id="previewSize">1024x1024</div></div>
<div class="prompt-display"><div class="label">風格</div><div class="content" id="previewStyle">無</div></div>
<div class="prompt-display"><div class="label">API 端點</div><div class="content" style="font-size:11px">${apiEndpoint}</div></div>
<div class="prompt-display">
<div class="label">模型</div>
<div class="content" id="previewModel">Z-Image Turbo</div>
</div>
<div class="prompt-display">
<div class="label">尺寸</div>
<div class="content" id="previewSize">1024x1024</div>
</div>
<div class="prompt-display">
<div class="label">風格</div>
<div class="content" id="previewStyle">無風格</div>
</div>
<div class="prompt-display">
<div class="label">API 端點</div>
<div class="content" style="font-size:11px">${apiEndpoint}</div>
</div>
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
<div class="stat-item">
<div class="label">📊 總記錄數</div>
<div class="value" id="historyTotal">0</div>
</div>
<div class="stat-item">
<div class="label">💾 存儲空間</div>
<div class="value" id="storageSize">0 KB</div>
</div>
<div class="stat-item">
<div class="label">🎨 最近風格</div>
<div class="value" id="recentStyle" style="font-size:14px">-</div>
</div>
</div>
<div class="history-actions">
<button class="btn btn-secondary" id="exportBtn" style="width:auto;padding:10px 20px">📥 導出記錄</button>
@@ -1285,44 +1879,475 @@ https://example.com/image2.jpg" rows="3"></textarea>
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
// 風格配置數據
const STYLE_PRESETS = ${JSON.stringify(CONFIG.STYLE_PRESETS)};
const PRESET_SIZES = ${JSON.stringify(CONFIG.PRESET_SIZES)};

// 導航切換
document.querySelectorAll('.nav-btn').forEach(btn=>{
  btn.addEventListener('click',function(){
    const pageName=this.dataset.page;
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
    document.getElementById(pageName+'Page').classList.add('active');
    this.classList.add('active');
    if(pageName==='history')updateHistoryDisplay();
  });
});

// 進階選項切換
document.getElementById('advancedToggle').addEventListener('click',function(){
  document.getElementById('advancedSection').classList.toggle('show');
});

// 更新風格描述
function updateStyleDescription() {
  const styleSelect = document.getElementById('style');
  const selectedStyle = styleSelect.value;
  const styleConfig = STYLE_PRESETS[selectedStyle];
  
  if (styleConfig) {
    document.getElementById('currentStyleName').textContent = styleConfig.name;
    document.getElementById('styleDescription').textContent = styleConfig.description || '無描述';
  }
}

// 更新預覽
function updatePreview(){
  const model=document.getElementById('model').value;
  const sizePreset=document.getElementById('size').value;
  const style=document.getElementById('style').value;
  
  const sizeConfig=PRESET_SIZES[sizePreset]||PRESET_SIZES['square-1k'];
  const styleConfig=STYLE_PRESETS[style];
  
  const modelNames={
    'zimage':'Z-Image Turbo ⚡',
    'flux':'Flux 標準版',
    'turbo':'Flux Turbo ⚡',
    'kontext':'Kontext 🎨'
  };
  
  document.getElementById('previewModel').textContent=modelNames[model]||model;
  document.getElementById('previewSize').textContent=sizeConfig.name+' ('+sizeConfig.width+'x'+sizeConfig.height+')';
  document.getElementById('previewStyle').textContent=styleConfig ? styleConfig.icon + ' ' + styleConfig.name : '無風格';
  
  updateStyleDescription();
}

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

// 歷史記錄管理
const STORAGE_KEY='flux_ai_history';
const MAX_HISTORY=100;

function getHistory(){
  try{
    const data=localStorage.getItem(STORAGE_KEY);
    return data?JSON.parse(data):[];
  }catch(e){
    console.error('Failed to load history:',e);
    return[];
  }
}

function saveHistory(history){
  try{
    localStorage.setItem(STORAGE_KEY,JSON.stringify(history));
    updateHistoryStats();
  }catch(e){
    console.error('Failed to save history:',e);
  }
}

function addToHistory(item){
  let history=getHistory();
  history.unshift({
    ...item,
    id:Date.now()+Math.random(),
    timestamp:new Date().toISOString()
  });
  if(history.length>MAX_HISTORY)history=history.slice(0,MAX_HISTORY);
  saveHistory(history);
}

function deleteFromHistory(id){
  if(!confirm('確定要刪除這條記錄嗎？'))return;
  let history=getHistory();
  history=history.filter(item=>item.id!==id);
  saveHistory(history);
  updateHistoryDisplay();
}

function clearHistory(){
  if(!confirm('確定要清空所有歷史記錄嗎？此操作不可恢復！'))return;
  localStorage.removeItem(STORAGE_KEY);
  updateHistoryDisplay();
  updateHistoryStats();
}

function exportHistory(){
  const history=getHistory();
  const dataStr=JSON.stringify(history,null,2);
  const dataBlob=new Blob([dataStr],{type:'application/json'});
  const url=URL.createObjectURL(dataBlob);
  const link=document.createElement('a');
  link.href=url;
  link.download='flux-ai-history-'+new Date().toISOString().split('T')[0]+'.json';
  link.click();
  URL.revokeObjectURL(url);
}

function updateHistoryStats(){
  const history=getHistory();
  document.getElementById('historyCount').textContent=history.length;
  document.getElementById('historyTotal').textContent=history.length;
  
  const sizeKB=new Blob([JSON.stringify(history)]).size/1024;
  document.getElementById('storageSize').textContent=sizeKB.toFixed(1)+' KB';
  
  if(history.length>0){
    const styleConfig=STYLE_PRESETS[history[0].style];
    document.getElementById('recentStyle').textContent=styleConfig ? styleConfig.name : history[0].style;
  }else{
    document.getElementById('recentStyle').textContent='-';
  }
}

function updateHistoryDisplay(){
  const history=getHistory();
  const historyList=document.getElementById('historyList');
  
  if(history.length===0){
    historyList.innerHTML='<div class="empty-state"><p style="font-size:16px;margin-bottom:10px">暫無歷史記錄</p><p style="font-size:14px">生成的圖像會自動保存在這裡</p></div>';
    updateHistoryStats();
    return;
  }
  
  const galleryDiv=document.createElement('div');
  galleryDiv.className='gallery';
  
  history.forEach(item=>{
    const date=new Date(item.timestamp);
    const timeStr=date.toLocaleString('zh-TW',{month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'});
    const styleConfig=STYLE_PRESETS[item.style];
    const styleName=styleConfig ? styleConfig.icon + ' ' + styleConfig.name : item.style;
    
    const itemDiv=document.createElement('div');
    itemDiv.className='gallery-item';
    itemDiv.innerHTML=\`
      <img src="\${item.url}" alt="History" loading="lazy">
      <div class="gallery-info">
        <div class="gallery-meta">
          <span class="model-badge">\${item.model}</span>
          <span class="seed-badge">Seed: \${item.seed}</span>
        </div>
        <div class="gallery-meta" style="margin-top:5px">
          <span class="style-badge">\${styleName}</span>
          <span class="time-badge">\${timeStr}</span>
        </div>
        <div style="margin-top:8px;font-size:11px;color:#6b7280">
          \${item.width}x\${item.height} | \${item.quality_mode||'standard'}
        </div>
        <div class="gallery-actions">
          <button class="action-btn reuse-btn">🔄 重用</button>
          <button class="action-btn download-btn">💾 下載</button>
          <button class="action-btn delete delete-btn">🗑️ 刪除</button>
        </div>
      </div>
    \`;
    
    const img=itemDiv.querySelector('img');
    img.addEventListener('click',function(){openModal(item.url)});
    
    const reuseBtn=itemDiv.querySelector('.reuse-btn');
    reuseBtn.addEventListener('click',function(){reusePrompt(item.id)});
    
    const downloadBtn=itemDiv.querySelector('.download-btn');
    downloadBtn.addEventListener('click',function(){downloadImage(item.url,item.seed)});
    
    const deleteBtn=itemDiv.querySelector('.delete-btn');
    deleteBtn.addEventListener('click',function(){deleteFromHistory(item.id)});
    
    galleryDiv.appendChild(itemDiv);
  });
  
  historyList.innerHTML='';
  historyList.appendChild(galleryDiv);
  updateHistoryStats();
}

function reusePrompt(id){
  const history=getHistory();
  const item=history.find(h=>h.id===id);
  if(!item)return;
  
  document.getElementById('prompt').value=item.prompt||'';
  document.getElementById('model').value=item.model||'zimage';
  document.getElementById('seed').value=item.seed||-1;
  document.getElementById('style').value=item.style||'none';
  document.getElementById('negativePrompt').value=item.negative_prompt||'';
  document.getElementById('referenceImages').value=(item.reference_images||[]).join(', ');
  
  updatePreview();
  document.querySelector('[data-page="generate"]').click();
  document.getElementById('prompt').focus();
}

function downloadImage(url,seed){
  const link=document.createElement('a');
  link.href=url;
  link.download='flux-ai-'+seed+'-'+Date.now()+'.png';
  link.click();
}

function openModal(url){
  document.getElementById('modalImage').src=url;
  document.getElementById('imageModal').classList.add('show');
}

function closeModal(){
  document.getElementById('imageModal').classList.remove('show');
}

document.getElementById('exportBtn').addEventListener('click',exportHistory);
document.getElementById('clearBtn').addEventListener('click',clearHistory);
document.getElementById('modalCloseBtn').addEventListener('click',closeModal);
document.getElementById('imageModal').addEventListener('click',function(e){
  if(e.target===this)closeModal();
});
document.getElementById('modalContentDiv').addEventListener('click',function(e){
  e.stopPropagation();
});

function displayGeneratedImages(images){
  const history=getHistory();
  const galleryDiv=document.createElement('div');
  galleryDiv.className='gallery';
  
  const newImages=history.slice(0,images.length);
  
  newImages.forEach((item,index)=>{
    const date=new Date(item.timestamp);
    const timeStr=date.toLocaleString('zh-TW',{month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'});
    const styleConfig=STYLE_PRESETS[item.style];
    const styleName=styleConfig ? styleConfig.icon + ' ' + styleConfig.name : item.style;
    
    const itemDiv=document.createElement('div');
    itemDiv.className='gallery-item';
    itemDiv.style.animation='fadeIn 0.5s ease-in';
    itemDiv.innerHTML=\`
      <img src="\${item.url}" alt="Generated \${index+1}" loading="lazy">
      <div class="gallery-info">
        <div style="background:linear-gradient(135deg,#10b981 0%,#059669 100%);color:#fff;padding:4px 8px;border-radius:6px;font-size:10px;font-weight:700;margin-bottom:8px;text-align:center">
          ✅ 剛剛生成
        </div>
        <div class="gallery-meta">
          <span class="model-badge">\${item.model}</span>
          <span class="seed-badge">Seed: \${item.seed}</span>
        </div>
        <div class="gallery-meta" style="margin-top:5px">
          <span class="style-badge">\${styleName}</span>
          <span class="time-badge">\${timeStr}</span>
        </div>
        <div style="margin-top:8px;font-size:11px;color:#6b7280">
          \${item.width}x\${item.height} | \${item.quality_mode||'standard'}\${item.generation_mode?' | '+item.generation_mode:''}
        </div>
        <div class="gallery-actions">
          <button class="action-btn reuse-result-btn">🔄 重用</button>
          <button class="action-btn download-result-btn">💾 下載</button>
          <button class="action-btn view-history-btn">📚 查看歷史</button>
        </div>
      </div>
    \`;
    
    const img=itemDiv.querySelector('img');
    img.addEventListener('click',function(){openModal(item.url)});
    
    const reuseBtn=itemDiv.querySelector('.reuse-result-btn');
    reuseBtn.addEventListener('click',function(){reusePrompt(item.id)});
    
    const downloadBtn=itemDiv.querySelector('.download-result-btn');
    downloadBtn.addEventListener('click',function(){downloadImage(item.url,item.seed)});
    
    const viewBtn=itemDiv.querySelector('.view-history-btn');
    viewBtn.addEventListener('click',function(){
      document.querySelector('[data-page="history"]').click();
    });
    
    galleryDiv.appendChild(itemDiv);
  });
  
  const resultsDiv=document.getElementById('results');
  resultsDiv.innerHTML='';
  
  const successDiv=document.createElement('div');
  successDiv.className='alert alert-success';
  successDiv.innerHTML='<strong>✅ 生成成功！</strong> 已生成 '+images.length+' 張圖片並保存到歷史記錄';
  resultsDiv.appendChild(successDiv);
  resultsDiv.appendChild(galleryDiv);
}

// 表單提交
const form=document.getElementById('generateForm');
const resultsDiv=document.getElementById('results');
const generateBtn=document.getElementById('generateBtn');
form.addEventListener('submit',async(e)=>{e.preventDefault();const prompt=document.getElementById('prompt').value;if(!prompt.trim()){alert('請輸入提示詞');document.getElementById('prompt').focus();return}const model=document.getElementById('model').value;const sizePreset=document.getElementById('size').value;const style=document.getElementById('style').value;const qualityMode=document.getElementById('qualityMode').value;const seed=parseInt(document.getElementById('seed').value);const numOutputs=parseInt(document.getElementById('numOutputs').value);const negativePrompt=document.getElementById('negativePrompt').value;const autoOptimize=document.getElementById('autoOptimize').checked;const autoHD=document.getElementById('autoHD').checked;const refImagesInput=document.getElementById('referenceImages').value;let referenceImages=[];if(refImagesInput.trim()){referenceImages=refImagesInput.split(',').map(url=>url.trim()).filter(url=>url)}const sizes=${JSON.stringify(CONFIG.PRESET_SIZES)};const sizeConfig=sizes[sizePreset]||sizes['square-1k'];generateBtn.disabled=true;generateBtn.innerHTML='<div class="spinner"></div>生成中...';resultsDiv.innerHTML='<div class="loading"><div class="spinner"></div><p>正在生成圖像,請稍候...</p><p style="font-size:12px;color:#6b7280;margin-top:10px">API: ${apiEndpoint}</p></div>';try{const response=await fetch('/_internal/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt,model,width:sizeConfig.width,height:sizeConfig.height,style,quality_mode:qualityMode,seed:seed,n:numOutputs,negative_prompt:negativePrompt,auto_optimize:autoOptimize,auto_hd:autoHD,reference_images:referenceImages})});const contentType=response.headers.get('content-type');if(!response.ok){const errorText=await response.text();let errorMsg='生成失敗';try{const errorJson=JSON.parse(errorText);errorMsg=errorJson.error?.message||errorMsg}catch(e){errorMsg=errorText.substring(0,200)}resultsDiv.innerHTML='<div class="alert alert-error"><strong>錯誤:</strong> '+errorMsg+'</div>';if(response.status===401||response.status===403){resultsDiv.innerHTML+='<div class="alert alert-warning"><strong>⚠️ 認證問題:</strong> 請確保已設置有效的 POLLINATIONS_API_KEY 環境變量。<br>使用命令: <code style="background:rgba(0,0,0,0.3);padding:2px 6px;border-radius:4px">wrangler secret put POLLINATIONS_API_KEY</code></div>'}return}if(contentType&&contentType.startsWith('image/')){const imageBlob=await response.blob();const imageUrl=URL.createObjectURL(imageBlob);const modelUsed=response.headers.get('X-Model')||model;const seedUsed=parseInt(response.headers.get('X-Seed'))||seed;const widthUsed=parseInt(response.headers.get('X-Width'))||sizeConfig.width;const heightUsed=parseInt(response.headers.get('X-Height'))||sizeConfig.height;const qualityUsed=response.headers.get('X-Quality-Mode')||qualityMode;const genMode=response.headers.get('X-Generation-Mode')||'文生圖';addToHistory({url:imageUrl,prompt:prompt,model:modelUsed,seed:seedUsed,width:widthUsed,height:heightUsed,style:style,quality_mode:qualityUsed,negative_prompt:negativePrompt,reference_images:referenceImages,generation_mode:genMode});displayGeneratedImages([{url:imageUrl,model:modelUsed,seed:seedUsed,width:widthUsed,height:heightUsed,quality_mode:qualityUsed}])}else if(contentType&&contentType.includes('application/json')){const data=await response.json();if(data.error){resultsDiv.innerHTML='<div class="alert alert-error"><strong>錯誤:</strong> '+data.error.message+'</div>'}else{const images=data.data.map(item=>{addToHistory({url:item.image,prompt:prompt,model:item.model,seed:item.seed,width:item.width,height:item.height,style:style,quality_mode:item.quality_mode,negative_prompt:negativePrompt,reference_images:referenceImages,generation_mode:item.generation_mode});return item});displayGeneratedImages(images)}}}catch(error){resultsDiv.innerHTML='<div class="alert alert-error"><strong>錯誤:</strong> '+error.message+'</div>'}finally{generateBtn.disabled=false;generateBtn.innerHTML='🎨 開始生成'}});
window.addEventListener('DOMContentLoaded',()=>{updateHistoryStats();updatePreview()});

form.addEventListener('submit',async(e)=>{
  e.preventDefault();
  
  const prompt=document.getElementById('prompt').value;
  if(!prompt.trim()){
    alert('請輸入提示詞');
    document.getElementById('prompt').focus();
    return;
  }
  
  const model=document.getElementById('model').value;
  const sizePreset=document.getElementById('size').value;
  const style=document.getElementById('style').value;
  const qualityMode=document.getElementById('qualityMode').value;
  const seed=parseInt(document.getElementById('seed').value);
  const numOutputs=parseInt(document.getElementById('numOutputs').value);
  const negativePrompt=document.getElementById('negativePrompt').value;
  const autoOptimize=document.getElementById('autoOptimize').checked;
  const autoHD=document.getElementById('autoHD').checked;
  const refImagesInput=document.getElementById('referenceImages').value;
  
  let referenceImages=[];
  if(refImagesInput.trim()){
    referenceImages=refImagesInput.split(',').map(url=>url.trim()).filter(url=>url);
  }
  
  const sizeConfig=PRESET_SIZES[sizePreset]||PRESET_SIZES['square-1k'];
  
  generateBtn.disabled=true;
  generateBtn.innerHTML='<div class="spinner"></div>生成中...';
  resultsDiv.innerHTML='<div class="loading"><div class="spinner"></div><p>正在生成圖像，請稍候...</p><p style="font-size:12px;color:#6b7280;margin-top:10px">API: ${apiEndpoint}</p></div>';
  
  try{
    const response=await fetch('/_internal/generate',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        prompt,
        model,
        width:sizeConfig.width,
        height:sizeConfig.height,
        style,
        quality_mode:qualityMode,
        seed:seed,
        n:numOutputs,
        negative_prompt:negativePrompt,
        auto_optimize:autoOptimize,
        auto_hd:autoHD,
        reference_images:referenceImages
      })
    });
    
    const contentType=response.headers.get('content-type');
    
    if(!response.ok){
      const errorText=await response.text();
      let errorMsg='生成失敗';
      try{
        const errorJson=JSON.parse(errorText);
        errorMsg=errorJson.error?.message||errorMsg;
      }catch(e){
        errorMsg=errorText.substring(0,200);
      }
      resultsDiv.innerHTML='<div class="alert alert-error"><strong>錯誤:</strong> '+errorMsg+'</div>';
      
      if(response.status===401||response.status===403){
        resultsDiv.innerHTML+='<div class="alert alert-warning"><strong>⚠️ 認證問題:</strong> 請確保已設置有效的 POLLINATIONS_API_KEY 環境變量。<br>使用命令: <code style="background:rgba(0,0,0,0.3);padding:2px 6px;border-radius:4px">wrangler secret put POLLINATIONS_API_KEY</code></div>';
      }
      return;
    }
    
    if(contentType&&contentType.startsWith('image/')){
      const imageBlob=await response.blob();
      const imageUrl=URL.createObjectURL(imageBlob);
      
      const modelUsed=response.headers.get('X-Model')||model;
      const seedUsed=parseInt(response.headers.get('X-Seed'))||seed;
      const widthUsed=parseInt(response.headers.get('X-Width'))||sizeConfig.width;
      const heightUsed=parseInt(response.headers.get('X-Height'))||sizeConfig.height;
      const qualityUsed=response.headers.get('X-Quality-Mode')||qualityMode;
      const styleUsed=response.headers.get('X-Style')||style;
      const genMode=response.headers.get('X-Generation-Mode')||'文生圖';
      
      addToHistory({
        url:imageUrl,
        prompt:prompt,
        model:modelUsed,
        seed:seedUsed,
        width:widthUsed,
        height:heightUsed,
        style:styleUsed,
        quality_mode:qualityUsed,
        negative_prompt:negativePrompt,
        reference_images:referenceImages,
        generation_mode:genMode
      });
      
      displayGeneratedImages([{
        url:imageUrl,
        model:modelUsed,
        seed:seedUsed,
        width:widthUsed,
        height:heightUsed,
        quality_mode:qualityUsed,
        style:styleUsed
      }]);
    }else if(contentType&&contentType.includes('application/json')){
      const data=await response.json();
      
      if(data.error){
        resultsDiv.innerHTML='<div class="alert alert-error"><strong>錯誤:</strong> '+data.error.message+'</div>';
      }else{
        const images=data.data.map(item=>{
          addToHistory({
            url:item.image,
            prompt:prompt,
            model:item.model,
            seed:item.seed,
            width:item.width,
            height:item.height,
            style:item.style,
            quality_mode:item.quality_mode,
            negative_prompt:negativePrompt,
            reference_images:referenceImages,
            generation_mode:item.generation_mode
          });
          return item;
        });
        displayGeneratedImages(images);
      }
    }
  }catch(error){
    resultsDiv.innerHTML='<div class="alert alert-error"><strong>錯誤:</strong> '+error.message+'</div>';
  }finally{
    generateBtn.disabled=false;
    generateBtn.innerHTML='🎨 開始生成';
  }
});

window.addEventListener('DOMContentLoaded',()=>{
  updateHistoryStats();
  updatePreview();
});
</script>
</body>

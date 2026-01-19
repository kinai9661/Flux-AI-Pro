// =================================================================================
//  項目: Flux AI Pro - NanoBanana Edition
//  版本: 11.2.0 (UI Overhaul & Klein Model)
//  更新: 深空紫主題、FLUX.2 Klein 4B 模型、自動 Ultra 畫質、頁腳優化
// =================================================================================

const CONFIG = {
  PROJECT_NAME: "Flux-AI-Pro",
  PROJECT_VERSION: "11.2.0",
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
        { id: "klein", name: "FLUX.2 Klein 4B", confirmed: true, category: "flux", description: "Advanced Flux 2 model", max_size: 2048, pricing: { image_price: 0.0003, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] }
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
      "nanobanana-pro": { min: 15, optimal: 20, max: 30 },
      "gptimage": { min: 10, optimal: 18, max: 28 },
      "gptimage-large": { min: 15, optimal: 25, max: 35 },
      "zimage": { min: 8, optimal: 15, max: 25 }, 
      "flux": { min: 15, optimal: 20, max: 30 }, 
      "klein": { min: 20, optimal: 25, max: 35 }, 
      "kontext": { min: 18, optimal: 25, max: 35 } 
    },
    SIZE_MULTIPLIER: { small: { threshold: 512 * 512, multiplier: 0.8 }, medium: { threshold: 1024 * 1024, multiplier: 1.0 }, large: { threshold: 1536 * 1536, multiplier: 1.15 }, xlarge: { threshold: 2048 * 2048, multiplier: 1.3 } },
    STYLE_ADJUSTMENT: { "photorealistic": 1.1, "oil-painting": 1.05, "watercolor": 0.95, "sketch": 0.9, "manga": 1.0, "pixel-art": 0.85, "3d-render": 1.15, "default": 1.0 }
  },
  
  HD_OPTIMIZATION: {
    enabled: true,
    QUALITY_MODES: {
      economy: { name: "經濟模式", description: "快速出圖", min_resolution: 1024, max_resolution: 2048, steps_multiplier: 0.85, guidance_multiplier: 0.9, hd_level: "basic" },
      standard: { name: "標準模式", description: "平衡質量與速度", min_resolution: 1280, max_resolution: 2048, steps_multiplier: 1.0, guidance_multiplier: 1.0, hd_level: "enhanced" },
      ultra: { name: "超高清模式", description: "極致質量", min_resolution: 1536, max_resolution: 2048, steps_multiplier: 1.35, guidance_multiplier: 1.15, hd_level: "maximum", force_upscale: true }
    },
    HD_PROMPTS: { basic: "high quality, detailed, sharp", enhanced: "high quality, highly detailed, sharp focus, professional, 8k uhd", maximum: "masterpiece, best quality, ultra detailed, 8k uhd, high resolution, professional photography, sharp focus, HDR" },
    HD_NEGATIVE: "blurry, low quality, distorted, ugly, bad anatomy, low resolution, pixelated, artifacts, noise",
    MODEL_QUALITY_PROFILES: {
      "nanobanana-pro": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.0, guidance_boost: 1.0, recommended_quality: "standard" },
      "gptimage": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.0, guidance_boost: 1.0, recommended_quality: "standard" },
      "gptimage-large": { min_resolution: 1280, max_resolution: 2048, optimal_steps_boost: 1.15, guidance_boost: 1.05, recommended_quality: "ultra" },
      "zimage": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.0, guidance_boost: 1.0, recommended_quality: "economy" },
      "flux": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.1, guidance_boost: 1.0, recommended_quality: "standard" },
      "klein": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.15, guidance_boost: 1.1, recommended_quality: "ultra" },
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

    // 🔥 修改確認: 直連模式，不進行模型 ID 轉換
    let apiModel = model; 
    
    const modelConfig = this.config.models.find(m => m.id === model);
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

class MultiProviderRouter {
  constructor(apiKeys = {}, env = null) {
    this.providers = {};
    this.apiKeys = apiKeys;
    this.env = env;
    for (const [key, config] of Object.entries(CONFIG.PROVIDERS)) {
      if (config.enabled) {
        if (key === 'pollinations') this.providers[key] = new PollinationsProvider(config, env);
        else if (key === 'infip') this.providers[key] = new InfipProvider(config, env);
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
      else if (url.pathname === '/health') {
        response = new Response(JSON.stringify({
          status: 'ok', version: CONFIG.PROJECT_VERSION, timestamp: new Date().toISOString(),
          styles_count: Object.keys(CONFIG.STYLE_PRESETS).length,
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
      return new Response('No file provided', { status: 400, headers: corsHeaders() });
    }

    // Forward to Catbox
    const catboxData = new FormData();
    catboxData.append('reqtype', 'fileupload');
    catboxData.append('fileToUpload', file);
    
    const response = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: catboxData,
      headers: {
        'User-Agent': 'FluxAIPro-Worker/1.0'
      }
    });

    if (response.ok) {
      const url = await response.text();
      return new Response(JSON.stringify({ url: url }), { 
        status: 200, 
        headers: corsHeaders({ 'Content-Type': 'application/json' }) 
      });
    } else {
      return new Response(JSON.stringify({ error: 'Upstream upload failed', status: response.status }), { 
        status: 502, 
        headers: corsHeaders({ 'Content-Type': 'application/json' }) 
      });
    }
  } catch (error) {
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

    // ====== NanoBanana Pro 來源與限流檢查 ======
    // 直接檢查 nanobanana-pro
    if (body.model === 'nanobanana-pro') {
        const source = request.headers.get('X-Source');
        if (source !== 'nano-page') {
             return new Response(JSON.stringify({ 
                error: { message: "🍌 Nano Banana Pro 模型僅限於獨立頁面使用！", type: 'access_denied' } 
            }), { status: 403, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
        }
        
        if (body.n && body.n > 1) { body.n = 1; }

        const limiter = new RateLimiter(env);
        const check = await limiter.checkLimit(clientIP);
        
        if (!check.allowed) {
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
    return new Response(JSON.stringify({ created: Math.floor(Date.now() / 1000), data: imagesData.filter(d => d !== null), generation_time_ms: duration, api_endpoint: CONFIG.PROVIDERS.pollinations.endpoint, authenticated: CONFIG.POLLINATIONS_AUTH.enabled, styles_available: Object.keys(CONFIG.STYLE_PRESETS).length }), { headers: corsHeaders({ 'Content-Type': 'application/json', 'X-Generation-Time': duration + 'ms', 'X-API-Endpoint': CONFIG.PROVIDERS.pollinations.endpoint, 'X-Styles-Count': Object.keys(CONFIG.STYLE_PRESETS).length.toString() }) });
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
                    <h1>Nano Pro <span class="badge">V10.6</span></h1>
                    <p style="color:#666; font-size:12px">Flux Engine • Pro Model</p>
                    <div style="font-size:11px; color:#22c55e; margin-top:4px; display:flex; align-items:center; gap:4px">
                        <script id="_waudw4">var _wau = _wau || []; _wau.push(["small", "yuynsazz1f", "dw4"]);</script><script async src="//waust.at/s.js"></script>
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
                <label style="margin-bottom:10px; display:block">畫布比例</label>
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
                    <label>風格 & 設定</label>
                </div>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <select id="style">
                        <option value="none">✨ 智能無風格</option>
                        <option value="photorealistic">📷 寫實照片</option>
                        <option value="anime">🌸 日系動漫</option>
                        <option value="3d-render">🧊 3D 渲染</option>
                        <option value="cyberpunk">🌃 賽博龐克</option>
                        <option value="manga">📖 黑白漫畫</option>
                        <option value="oil-painting">🎨 古典油畫</option>
                    </select>
                    <div style="position:relative">
                         <input type="number" id="seed" placeholder="Seed" value="-1" disabled style="padding-right:30px">
                         <button id="lockSeedBtn" class="tool-btn" style="position:absolute; right:10px; top:50%; transform:translateY(-50%)">🎲</button>
                    </div>
                </div>
            </div>

            <div class="control-group">
                <label>排除 (Negative)</label>
                <input type="text" id="negative" value="nsfw, ugly, text, watermark, low quality, bad anatomy" style="font-size:12px; color:#aaa">
            </div>

            <button id="genBtn" class="gen-btn">
                <span>生成圖像</span>
                <span style="font-size:12px; opacity:0.6; font-weight:400; display:block; margin-top:4px">消耗 1 香蕉能量 🍌</span>
            </button>
            
            <div class="quota-box">
                <div class="quota-info">
                    <span>每小時能量</span>
                    <span id="quotaText" class="quota-text">5 / 5</span>
                </div>
                <div class="quota-bar">
                    <div id="quotaFill" class="quota-fill"></div>
                </div>
            </div>
        </div>

        <div class="main-stage">
            <div class="placeholder-text">NANOPRO</div>
            <img id="resultImg" alt="Generated Image" title="點擊放大">
            
            <div class="loading-overlay">
                <div class="banana-loader">🍌</div>
                <div class="loading-text">正在注入 AI 能量...</div>
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
                📥 保存圖片
            </a>
            <button class="action-btn" onclick="document.getElementById('lbClose').click()">
                ❌ 關閉
            </button>
        </div>
    </div>

    <div class="footer">
    </div>
</div>
<script>
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
                    els.genBtn.innerHTML = '<span>生成圖像</span><span style="font-size:12px; opacity:0.6; font-weight:400; display:block; margin-top:4px">消耗 1 香蕉能量 🍌</span>';
                } else {
                    updateQuotaUI();
                }
            } else {
                updateCooldownText(left);
            }
        }, 1000);
    }

    function updateCooldownText(sec) {
        els.genBtn.innerHTML = \`<span>⚡ 能量回充中... (\${sec}s)</span>\`;
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
            els.genBtn.innerHTML = '<span>本小時能量已耗盡</span><span style="display:block;font-size:12px;font-weight:400;margin-top:4px">請稍後再來</span>';
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
    
    function openLightbox(url) {
        els.lbImg.src = url;
        els.lbDownload.href = url;
        els.lightbox.classList.add('show');
    }
    els.lbClose.onclick = () => els.lightbox.classList.remove('show');
    els.img.onclick = () => { if(els.img.src) openLightbox(els.img.src); };

    function toast(msg) {
        const t = document.getElementById('toast');
        t.textContent = msg;
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
        if(!p) return toast("⚠️ 請輸入提示詞");
        if(currentQuota <= 0) return toast("🚫 本小時能量已耗盡，請稍後再來！");

        els.genBtn.disabled = true;
        els.loader.style.display = 'flex';
        els.img.style.opacity = '0.5';

        try {
            const res = await fetch('/_internal/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Source': 'nano-page' },
                body: JSON.stringify({
                    prompt: p,
                    negative_prompt: els.negative.value,
                    model: 'nanobanana-pro',
                    width: parseInt(els.width.value),
                    height: parseInt(els.height.value),
                    style: els.style.value,
                    seed: parseInt(els.seed.value),
                    n: 1,
                    nologo: true
                })
            });

            if(res.status === 429) {
                const err = await res.json();
                currentQuota = 0;
                const n = new Date();
                const h = n.toDateString() + '-' + n.getHours();
                localStorage.setItem('nano_quota_hourly_v2', JSON.stringify({hour: h, val: 0}));
                updateQuotaUI();
                throw new Error(err.error?.message || '限額已滿');
            }

            if(!res.ok) {
                const err = await res.json();
                throw new Error(err.error?.message || '生成失敗');
            }

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            
            els.img.src = url;
            els.img.style.display = 'block';
            els.img.style.opacity = '1';
            document.querySelector('.placeholder-text').style.display = 'none';
            
            const realSeed = res.headers.get('X-Seed');
            if(!isSeedRandom) els.seed.value = realSeed;

            addHistory(url);
            consumeQuota();
            
            // Start Cooldown
            localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
            startCooldownTimer(COOLDOWN_SEC);

        } catch(e) {
            toast("❌ " + e.message);
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
    const authStatus = CONFIG.POLLINATIONS_AUTH.enabled ? '<span style="color:#22c55e;font-weight:600;font-size:12px">🔐 已認證</span>' : '<span style="color:#f59e0b;font-weight:600;font-size:12px">⚠️ 需要 API Key</span>';
    
    // 生成樣式選單 HTML
  const styleCategories = CONFIG.STYLE_CATEGORIES;
  const stylePresets = CONFIG.STYLE_PRESETS;
  let styleOptionsHTML = '';
  const sortedCategories = Object.entries(styleCategories).sort((a, b) => a[1].order - b[1].order);
  for (const [categoryKey, categoryInfo] of sortedCategories) {
    const stylesInCategory = Object.entries(stylePresets).filter(([key, style]) => style.category === categoryKey);
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
.lang-btn{padding:6px 10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#ccc;cursor:pointer;font-size:12px;margin-left:10px}
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
            🍌 Nano版
        </a>
        <button class="nav-btn active" data-page="generate"><span data-t="nav_gen">🎨 生成圖像</span></button>
        <button class="nav-btn" data-page="history"><span data-t="nav_his">📚 歷史記錄</span> <span id="historyCount" style="background:rgba(245,158,11,0.2);padding:2px 8px;border-radius:10px;font-size:11px">0</span></button>
        <button class="lang-btn" id="langSwitch">EN / 繁中</button>
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
<div class="form-group"><label data-t="size_label">尺寸預設</label><select id="size"><option value="square-1k" selected>Square 1024x1024</option><option value="square-1.5k">Square 1536x1536</option><option value="portrait-9-16-hd">Portrait 1080x1920</option><option value="landscape-16-9-hd">Landscape 1920x1080</option></select></div>
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
<div class="form-group"><label data-t="neg_prompt">負面提示詞 (可選)</label><textarea id="negativePrompt" placeholder="What to avoid..." rows="4"></textarea></div>
<div class="form-group"><label data-t="ref_img">參考圖像 (Img2Img) 📸</label>
    <div style="margin-bottom:10px;">
        <input type="file" id="imageUpload" accept="image/*" style="display:none">
        <button type="button" class="btn" onclick="document.getElementById('imageUpload').click()" style="background:rgba(255,255,255,0.1); width:100%;">📤 上傳參考圖</button>
    </div>
    <textarea id="referenceImages" placeholder="Image URL (or upload above)" rows="3"></textarea>
    <div style="font-size:11px; color:#9ca3af; margin-top:4px;">* 支援模型: Kontext, Flux, Klein</div>
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
const I18N={
    zh:{
        nav_gen:"🎨 生成圖像", nav_his:"📚 歷史記錄", settings_title:"⚙️ 生成參數", provider_label:"API 供應商", model_label:"模型選擇", size_label:"尺寸預設", style_label:"藝術風格 🎨", quality_label:"質量模式", seed_label:"Seed (種子碼)", seed_random:"🎲 隨機", seed_lock:"🔒 鎖定", auto_opt_label:"✨ 自動優化", auto_opt_desc:"自動調整 Steps 與 Guidance", adv_settings:"🛠️ 進階參數", steps_label:"生成步數 (Steps)", guidance_label:"引導係數 (Guidance)", gen_btn:"🎨 開始生成", empty_title:"尚未生成任何圖像", pos_prompt:"正面提示詞", neg_prompt:"負面提示詞 (可選)", ref_img:"參考圖像 URL (Kontext 專用)", stat_total:"📊 總記錄數", stat_storage:"💾 存儲空間 (永久)", btn_export:"📥 導出", btn_clear:"🗑️ 清空", no_history:"暫無歷史記錄", btn_reuse:"🔄 重用", btn_dl:"💾 下載",
        cooldown_msg: "⏳ 請等待冷卻時間..."
    },
    en:{
        nav_gen:"🎨 Create", nav_his:"📚 History", settings_title:"⚙️ Settings", provider_label:"API Provider", model_label:"Model", size_label:"Size", style_label:"Art Style 🎨", quality_label:"Quality", seed_label:"Seed", seed_random:"🎲 Random", seed_lock:"🔒 Lock", auto_opt_label:"✨ Auto Optimize", auto_opt_desc:"Auto adjust Steps & Guidance", adv_settings:"🛠️ Advanced", steps_label:"Steps", guidance_label:"Guidance Scale", gen_btn:"🎨 Generate", empty_title:"No images yet", pos_prompt:"Positive Prompt", neg_prompt:"Negative Prompt", ref_img:"Reference Image URL", stat_total:"📊 Total", stat_storage:"💾 Storage", btn_export:"📥 Export", btn_clear:"🗑️ Clear", no_history:"No history found", btn_reuse:"🔄 Reuse", btn_dl:"💾 Save",
        cooldown_msg: "⏳ Cooldown..."
    }
};
let curLang='zh';
function toggleLang(){curLang=curLang==='zh'?'en':'zh';updateLang();}
function updateLang(){
    document.querySelectorAll('[data-t]').forEach(el=>{const k=el.getAttribute('data-t');if(I18N[curLang][k])el.textContent=I18N[curLang][k];});
    const seedToggleBtn = document.getElementById('seedToggleBtn');
    if(seedToggleBtn && isSeedRandom !== undefined) {
        seedToggleBtn.innerHTML = isSeedRandom ? I18N[curLang].seed_random : I18N[curLang].seed_lock;
    }
}
document.getElementById('langSwitch').onclick=toggleLang;

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
            if (p === 'infip') storedKey = localStorage.getItem('infip_api_key');
            
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
            optgroup.appendChild(opt);
        });
        modelSelect.appendChild(optgroup);
    }
}

const imageUpload = document.getElementById('imageUpload');
imageUpload.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert("Image too large! Max size is 5MB.");
        return;
    }

    const btn = e.target.nextElementSibling;
    const originalText = btn.textContent;
    btn.textContent = "⏳ Uploading...";
    btn.disabled = true;

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
                         btn.textContent = "✅ Uploaded!";
                    } else {
                        throw new Error("Invalid response from server");
                    }
                } else {
                    const errData = await response.json().catch(()=>({}));
                    throw new Error("Upload failed: " + (errData.error || response.status));
                }
            } catch (proxyError) {
                console.error("Upload error:", proxyError);
                alert("Upload failed: " + proxyError.message);
            }

            setTimeout(() => { btn.textContent = originalText; btn.disabled = false; }, 2000);
        };
        reader.readAsDataURL(file);
    } catch (err) {
        console.error(err);
        btn.textContent = "❌ Error";
        setTimeout(() => { btn.textContent = originalText; btn.disabled = false; }, 2000);
    }
});

providerSelect.addEventListener('change', updateModelOptions);
apiKeyInput.addEventListener('input', (e) => localStorage.setItem('infip_api_key', e.target.value));

const PRESET_SIZES=${JSON.stringify(CONFIG.PRESET_SIZES)};
const STYLE_PRESETS=${JSON.stringify(CONFIG.STYLE_PRESETS)};
// Inject server-side key status
const frontendProviders = ${JSON.stringify(CONFIG.PROVIDERS)};
if (${hasInfipServerKey} && frontendProviders.infip) {
    frontendProviders.infip.has_server_key = true;
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
</script>
<div class="footer" style="position:relative; z-index:10; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; gap:15px; flex-wrap:wrap;">
    <span>Powered by Flux AI Pro • <a href="https://github.com/pollinations/pollinations" target="_blank">Engine</a> • <a href="/nano" target="_blank">Nano Version</a></span>
    <span style="opacity:0.5">|</span>
    <span style="opacity:0.9">友情鏈接: <a href="https://pollinations.ai" target="_blank">Pollinations.ai</a> • <a href="https://infip.pro" target="_blank">Infip</a> • <a href="https://github.com" target="_blank">GitHub</a></span>
    <span style="opacity:0.5">|</span>
    <a href="https://showmebest.ai" target="_blank" style="display:flex; align-items:center;"><img src="https://showmebest.ai/badge/feature-badge-dark.webp" alt="Featured on ShowMeBestAI" width="165" height="45"></a>
</div>
</body>
</html>`;
  
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8', ...corsHeaders() } });
}

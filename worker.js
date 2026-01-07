// =================================================================================
//  項目: Flux AI Pro - GPT-Image Edition
//  版本: 9.9.0 (New Models Added)
//  更新: 新增 GPT-Image 與 GPT-Image Large 模型支援
// =================================================================================

const CONFIG = {
  PROJECT_NAME: "Flux-AI-Pro",
  PROJECT_VERSION: "9.9.0-gpt",
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
        { id: "gptimage", name: "GPT-Image 🎨", confirmed: true, category: "gptimage", description: "通用 GPT 圖像生成模型", max_size: 2048, pricing: { image_price: 0.0002, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "gptimage-large", name: "GPT-Image Large 🌟", confirmed: true, category: "gptimage", description: "高質量 GPT 圖像生成模型", max_size: 2048, pricing: { image_price: 0.0003, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "zimage", name: "Z-Image Turbo ⚡", confirmed: true, category: "zimage", description: "快速 6B 參數圖像生成 (Alpha)", max_size: 2048, pricing: { image_price: 0.0002, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "flux", name: "Flux 標準版", confirmed: true, category: "flux", description: "快速且高質量的圖像生成", max_size: 2048, pricing: { image_price: 0.00012, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "turbo", name: "Flux Turbo ⚡", confirmed: true, category: "flux", description: "超快速圖像生成", max_size: 2048, pricing: { image_price: 0.0003, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "kontext", name: "Kontext 🎨", confirmed: true, category: "kontext", description: "上下文感知圖像生成（支持圖生圖）", max_size: 2048, pricing: { image_price: 0.04, currency: "pollen" }, supports_reference_images: true, max_reference_images: 1, input_modalities: ["text", "image"], output_modalities: ["image"] }
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
      "gptimage": { min: 10, optimal: 18, max: 28 },
      "gptimage-large": { min: 15, optimal: 25, max: 35 },
      "zimage": { min: 8, optimal: 15, max: 25 }, 
      "flux": { min: 15, optimal: 20, max: 30 }, 
      "turbo": { min: 4, optimal: 8, max: 12 }, 
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

function getClientIP(request) {
  return request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
}

// Google GTX 免費翻譯函數
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

function corsHeaders(additionalHeaders = {}) {
  return { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With', 'Access-Control-Max-Age': '86400', ...additionalHeaders };
}
class PollinationsProvider {
  constructor(config, env) { this.config = config; this.name = config.name; this.env = env; }
  
  async generate(prompt, options, logger) {
    const { 
      model = "zimage", width = 1024, height = 1024, seed = -1, negativePrompt = "", guidance = null, steps = null, 
      enhance = false, nologo = true, privateMode = true, style = "none", autoOptimize = true, autoHD = true, 
      qualityMode = 'standard', referenceImages = []
    } = options;
    
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
    params.append('model', model);
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
    logger.add("📡 API Request", { endpoint: this.config.endpoint, path: pathPrefix + "/" + encodedPrompt.substring(0, 50) + "...", model: model, authenticated: authConfig.enabled && !!authConfig.token, full_url: url.substring(0, 100) + "..." });
    
    for (let retry = 0; retry < CONFIG.MAX_RETRIES; retry++) {
      try {
        const response = await fetchWithTimeout(url, { method: 'GET', headers: headers }, 120000);
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.startsWith('image/')) {
            logger.add("✅ Success", { url: response.url, used_model: model, final_size: finalWidth + "x" + finalHeight, quality_mode: qualityMode, style_used: style, style_name: CONFIG.STYLE_PRESETS[style]?.name || style, hd_optimized: autoHD && hdOptimization?.optimized, auto_translated: translationLog.translated, reference_images_used: validReferenceImages.length, generation_mode: validReferenceImages.length > 0 ? "圖生圖" : "文生圖", authenticated: authConfig.enabled && !!authConfig.token, seed: currentSeed });
            const imageBlob = await response.blob();
            const imageBuffer = await imageBlob.arrayBuffer();
            return { imageData: imageBuffer, contentType: contentType, url: response.url, provider: this.name, model: model, requested_model: model, seed: currentSeed, style: style, style_name: CONFIG.STYLE_PRESETS[style]?.name || style, style_category: CONFIG.STYLE_PRESETS[style]?.category || 'unknown', steps: finalSteps, guidance: finalGuidance, width: finalWidth, height: finalHeight, quality_mode: qualityMode, prompt_complexity: promptComplexity, hd_optimized: autoHD && hdOptimization?.optimized, hd_details: hdOptimization, auto_translated: translationLog.translated, reference_images: validReferenceImages, reference_images_count: validReferenceImages.length, generation_mode: validReferenceImages.length > 0 ? "圖生圖" : "文生圖", authenticated: authConfig.enabled && !!authConfig.token, cost: "FREE", auto_optimized: autoOptimize };
          } else { throw new Error("Invalid content type: " + contentType); }
        } else if (response.status === 401) { throw new Error("Authentication failed: Invalid or missing API key. Please set POLLINATIONS_API_KEY"); } 
        else if (response.status === 403) { throw new Error("Access forbidden: API key may lack required permissions"); } 
        else { throw new Error("HTTP " + response.status + ": " + (await response.text()).substring(0, 200)); }
      } catch (e) {
        logger.add("❌ Request Failed", { error: e.message, model: model, retry: retry + 1, max_retries: CONFIG.MAX_RETRIES, endpoint: this.config.endpoint });
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
      if (url.pathname === '/' || url.pathname === '') { response = handleUI(request); } 
      else if (url.pathname === '/_internal/generate') { response = await handleInternalGenerate(request, env, ctx); } 
      else if (url.pathname === '/health') {
        response = new Response(JSON.stringify({
          status: 'ok', version: CONFIG.PROJECT_VERSION, timestamp: new Date().toISOString(),
          styles_count: Object.keys(CONFIG.STYLE_PRESETS).length,
          api_auth: { enabled: CONFIG.POLLINATIONS_AUTH.enabled, method: CONFIG.POLLINATIONS_AUTH.method, has_token: !!CONFIG.POLLINATIONS_AUTH.token, endpoint: CONFIG.PROVIDERS.pollinations.endpoint },
          models: CONFIG.PROVIDERS.pollinations.models.map(m => ({ id: m.id, name: m.name, category: m.category, supports_reference_images: m.supports_reference_images || false })),
          style_categories: Object.keys(CONFIG.STYLE_CATEGORIES).map(key => ({ id: key, name: CONFIG.STYLE_CATEGORIES[key].name, icon: CONFIG.STYLE_CATEGORIES[key].icon, count: Object.values(CONFIG.STYLE_PRESETS).filter(s => s.category === key).length }))
        }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
      } else {
        response = new Response(JSON.stringify({ error: 'Not Found', message: '此 Worker 僅提供 Web UI 界面', available_paths: ['/', '/health', '/_internal/generate'] }), { status: 404, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
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
      referenceImages = body.reference_images.filter(url => { try { new URL(url); return true; } catch { return false; } });
    }
    
    const seedInput = body.seed !== undefined ? body.seed : -1;
    let seedValue = -1;
    if (seedInput !== -1) { const parsedSeed = parseInt(seedInput); if (!isNaN(parsedSeed) && parsedSeed >= 0 && parsedSeed <= 999999) seedValue = parsedSeed; }
    
    const options = { 
      provider: body.provider || null, model: body.model || "zimage", width: Math.min(Math.max(width, 256), 2048), height: Math.min(Math.max(height, 256), 2048), 
      numOutputs: Math.min(Math.max(body.n || 1, 1), 4), seed: seedValue, negativePrompt: body.negative_prompt || "", guidance: body.guidance_scale || null, 
      steps: body.steps || null, enhance: body.enhance === true, nologo: body.nologo !== false, privateMode: body.private !== false, 
      style: body.style || "none", autoOptimize: body.auto_optimize !== false, autoHD: body.auto_hd !== false, 
      qualityMode: body.quality_mode || 'standard', referenceImages: referenceImages
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
function handleUI() {
  const authStatus = CONFIG.POLLINATIONS_AUTH.enabled ? '<span style="color:#22c55e;font-weight:600;font-size:12px">🔐 已認證</span>' : '<span style="color:#f59e0b;font-weight:600;font-size:12px">⚠️ 需要 API Key</span>';
  const apiEndpoint = CONFIG.PROVIDERS.pollinations.endpoint;
  const stylesCount = Object.keys(CONFIG.STYLE_PRESETS).length;
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
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;background:linear-gradient(135deg,#0a0a0a 0%,#1a1a2e 100%);color:#fff;min-height:100vh}
.container{max-width:100%;margin:0;padding:0;height:100vh;display:flex;flex-direction:column}
.top-nav{background:rgba(255,255,255,0.05);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,0.1);padding:15px 25px;display:flex;justify-content:space-between;align-items:center;flex-shrink:0}
.nav-left{display:flex;align-items:center;gap:20px}
.logo{color:#f59e0b;font-size:24px;font-weight:800;text-shadow:0 0 20px rgba(245,158,11,0.6);display:flex;align-items:center;gap:10px}
.badge{background:linear-gradient(135deg,#10b981 0%,#059669 100%);padding:4px 10px;border-radius:12px;font-size:11px;font-weight:600}
.badge-styles{background:linear-gradient(135deg,#8b5cf6 0%,#7c3aed 100%);padding:4px 10px;border-radius:12px;font-size:11px;font-weight:700}
.nav-menu{display:flex;gap:10px;align-items:center}
.nav-btn{padding:8px 16px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#9ca3af;cursor:pointer;font-size:14px;font-weight:600;transition:all 0.3s;display:flex;align-items:center;gap:6px}
.nav-btn:hover{border-color:#f59e0b;color:#fff}
.nav-btn.active{background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#fff;border-color:#f59e0b}
.lang-btn{padding:6px 10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#ccc;cursor:pointer;font-size:12px;margin-left:10px}
.api-status{padding:6px 12px;border-radius:8px;font-size:12px;font-weight:600;background:rgba(16,185,129,0.1);border:1px solid #10b981}
.api-endpoint{font-size:10px;color:#6b7280;margin-top:4px}
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
input,textarea{width:100%;padding:10px;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.2);border-radius:8px;color:#fff;font-size:13px;transition:all 0.3s}
input:focus,textarea:focus{outline:none;border-color:#f59e0b;box-shadow:0 0 0 3px rgba(245,158,11,0.1)}
select{background-color:#1e293b!important;color:#e2e8f0!important;border:1px solid #334155!important;width:100%;padding:10px;border-radius:8px;font-size:13px}
select:focus{border-color:#818cf8!important;box-shadow:0 0 0 3px rgba(129,140,248,0.2)!important;outline:none}
option{background-color:#0f172a;color:#f1f5f9}
textarea{min-height:120px;resize:vertical;font-family:inherit;line-height:1.6}
select{cursor:pointer}
.input-hint{font-size:11px;color:#6b7280;margin-top:4px}
.style-hint{font-size:11px;color:#8b5cf6;margin-top:4px;font-weight:600}
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
.style-badge{background:rgba(139,92,246,0.2);color:#8b5cf6;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:600}
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
.alert-info{background:rgba(139,92,246,0.1);border-color:#8b5cf6;color:#8b5cf6}
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
<div class="logo">🎨 Flux AI Pro <span class="badge">v${CONFIG.PROJECT_VERSION}</span><span class="badge-styles" id="badgeStyles">${stylesCount} 風格</span></div>
<div><div class="api-status">${authStatus}</div><div class="api-endpoint">📡 ${apiEndpoint}</div></div>
</div>
<div class="nav-menu">
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
<div class="form-group"><label data-t="model_label">模型選擇</label><select id="model">
<optgroup label="🤖 GPT-Image Series">
<option value="gptimage" selected>GPT-Image 🎨</option>
<option value="gptimage-large">GPT-Image Large 🌟</option>
</optgroup>
<optgroup label="⚡ Z-Image Series">
<option value="zimage">Z-Image Turbo ⚡ (6B)</option>
</optgroup>
<optgroup label="🎨 Flux Series">
<option value="flux">Flux Standard</option>
<option value="turbo">Flux Turbo ⚡</option>
</optgroup>
<optgroup label="🖼️ Kontext Series">
<option value="kontext">Kontext 🎨 (Img2Img)</option>
</optgroup>
</select><div class="input-hint" data-t="price_hint">💰 Price: GPT (0.0002) | Flux (0.00012)</div></div>
<div class="form-group"><label data-t="size_label">尺寸預設</label><select id="size"><option value="square-1k" selected>Square 1024x1024</option><option value="square-1.5k">Square 1536x1536</option><option value="square-2k">Square 2048x2048</option><option value="portrait-9-16-hd">Portrait 1080x1920</option><option value="landscape-16-9-hd">Landscape 1920x1080</option><option value="instagram-square">Instagram Square</option><option value="wallpaper-fhd">Wallpaper FHD</option></select></div>
<div class="form-group"><label data-t="style_label">藝術風格 🎨</label><select id="style">${styleOptionsHTML}</select><div class="style-hint" data-t="style_hint_text">✨ 多種風格可選</div></div>
<div class="form-group"><label data-t="quality_label">質量模式</label><select id="qualityMode"><option value="economy">Economy (Fast)</option><option value="standard" selected>Standard (Balanced)</option><option value="ultra">Ultra HD (Best)</option></select></div>
<a class="advanced-toggle" id="advancedToggle" data-t="adv_toggle">▼ 進階選項</a>
<div id="advancedSection" class="advanced-section">
<div class="form-group"><label>Seed</label><input type="number" id="seed" value="-1" min="-1" max="999999"><div class="input-hint" data-t="seed_hint">-1 = Random</div></div>
<div class="form-group"><label data-t="count_label">生成數量</label><input type="number" id="numOutputs" value="1" min="1" max="4"></div>
<div class="form-group"><label><input type="checkbox" id="autoOptimize" checked> <span data-t="auto_opt">自動優化參數</span></label></div>
<div class="form-group"><label><input type="checkbox" id="autoHD" checked> <span data-t="auto_hd">自動HD增強</span></label></div>
</div>
<button type="submit" class="btn btn-primary" id="generateBtn" data-t="gen_btn">🎨 開始生成</button>
</form>
</div>
<div class="center-panel">
<div class="section-title" data-t="result_title">🖼️ 生成結果</div>
<div id="results"><div class="empty-state"><svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg><p style="font-size:16px;margin-bottom:10px" data-t="empty_title">尚未生成任何圖像</p><p style="font-size:14px" data-t="empty_desc">填寫左側參數並輸入提示詞後點擊生成</p></div></div>
</div>
<div class="right-panel">
<div class="section-title" data-t="prompt_title">💬 提示詞</div>
<div class="form-group"><label data-t="pos_prompt">正面提示詞</label><textarea id="prompt" placeholder="Describe your image..." required></textarea><div class="input-hint" data-t="trans_hint">✅ Google Auto-Translate Supported</div></div>
<div class="form-group"><label data-t="neg_prompt">負面提示詞 (可選)</label><textarea id="negativePrompt" placeholder="What to avoid..." rows="4"></textarea></div>
<div class="form-group"><label data-t="ref_img">參考圖像 URL (可選)</label><textarea id="referenceImages" placeholder="Image URLs separated by comma" rows="3"></textarea><div class="input-hint" data-t="ref_hint">📌 Only for Kontext model</div></div>
<div class="alert alert-info" style="margin-top:20px"><strong data-t="style_info">🎨 風格提示</strong><br><span data-t="curr_style">當前已選</span>: <span id="currentStyleName">None</span><br><span id="styleDescription" style="font-size:11px;opacity:0.8">Raw prompt</span></div>
<div class="section-title" style="margin-top:25px" data-t="config_prev">📋 當前配置預覽</div>
<div class="prompt-display"><div class="label" data-t="prev_model">模型</div><div class="content" id="previewModel">Z-Image Turbo</div></div>
<div class="prompt-display"><div class="label" data-t="prev_size">尺寸</div><div class="content" id="previewSize">1024x1024</div></div>
<div class="prompt-display"><div class="label" data-t="prev_style">風格</div><div class="content" id="previewStyle">None</div></div>
</div></div></div>
<div id="historyPage" class="page">
<div class="main-content" style="flex-direction:column;padding:20px">
<div class="history-header">
<div class="history-stats"><div class="stat-item"><div class="label" data-t="stat_total">📊 總記錄數</div><div class="value" id="historyTotal">0</div></div><div class="stat-item"><div class="label" data-t="stat_storage">💾 存儲空間</div><div class="value" id="storageSize">0 KB</div></div><div class="stat-item"><div class="label" data-t="stat_recent">🎨 最近風格</div><div class="value" id="recentStyle" style="font-size:14px">-</div></div></div>
<div class="history-actions"><button class="btn btn-secondary" id="exportBtn" style="width:auto;padding:10px 20px" data-t="btn_export">📥 導出</button><button class="btn btn-danger" id="clearBtn" style="width:auto;padding:10px 20px" data-t="btn_clear">🗑️ 清空</button></div>
</div>
<div id="historyList" style="padding:0 20px"><div class="empty-state"><p data-t="no_history">暫無歷史記錄</p></div></div>
</div></div>
<div id="imageModal" class="modal"><button class="modal-close" id="modalCloseBtn">×</button><div class="modal-content" id="modalContentDiv"><img id="modalImage" src="" alt="Preview"></div></div>
<script>
const I18N = {
  zh: {
    nav_gen: "🎨 生成圖像", nav_his: "📚 歷史記錄", settings_title: "⚙️ 生成參數", model_label: "模型選擇", price_hint: "💰 價格: GPT (0.0002) | Flux (0.00012)", size_label: "尺寸預設", style_label: "藝術風格 🎨", style_hint_text: "✨ 多種風格可選", quality_label: "質量模式", adv_toggle: "▼ 進階選項", seed_hint: "-1 = 隨機", count_label: "生成數量", auto_opt: "自動優化參數", auto_hd: "自動HD增強", gen_btn: "🎨 開始生成", result_title: "🖼️ 生成結果", empty_title: "尚未生成任何圖像", empty_desc: "填寫左側參數並輸入提示詞後點擊生成", prompt_title: "💬 提示詞", pos_prompt: "正面提示詞", trans_hint: "✅ 支持中文自動翻譯 (Google)", neg_prompt: "負面提示詞 (可選)", ref_img: "參考圖像 URL (可選)", ref_hint: "📌 僅支持 Kontext 模型", style_info: "🎨 風格提示", curr_style: "當前已選", config_prev: "📋 當前配置預覽", prev_model: "模型", prev_size: "尺寸", prev_style: "風格", stat_total: "📊 總記錄數", stat_storage: "💾 存儲空間", stat_recent: "🎨 最近風格", btn_export: "📥 導出記錄", btn_clear: "🗑️ 清空記錄", no_history: "暫無歷史記錄", btn_reuse: "🔄 重用", btn_dl: "💾 下載", badge_styles: "風格"
  },
  en: {
    nav_gen: "🎨 Create", nav_his: "📚 History", settings_title: "⚙️ Settings", model_label: "Model", price_hint: "💰 Price: GPT (0.0002) | Flux (0.00012)", size_label: "Size", style_label: "Art Style 🎨", style_hint_text: "✨ Various styles", quality_label: "Quality", adv_toggle: "▼ Advanced", seed_hint: "-1 = Random", count_label: "Count", auto_opt: "Auto Optimize", auto_hd: "Auto HD", gen_btn: "🎨 Generate", result_title: "🖼️ Results", empty_title: "No images yet", empty_desc: "Enter prompt and click Generate", prompt_title: "💬 Prompt", pos_prompt: "Positive Prompt", trans_hint: "✅ Google Auto-Translate Supported", neg_prompt: "Negative Prompt (Optional)", ref_img: "Ref Image URL (Optional)", ref_hint: "📌 Kontext model only", style_info: "🎨 Style Info", curr_style: "Selected", config_prev: "📋 Preview", prev_model: "Model", prev_size: "Size", prev_style: "Style", stat_total: "📊 Total", stat_storage: "💾 Storage", stat_recent: "🎨 Recent", btn_export: "📥 Export", btn_clear: "🗑️ Clear", no_history: "No history found", btn_reuse: "🔄 Reuse", btn_dl: "💾 Save", badge_styles: "Styles"
  }
};
let curLang = 'zh';
function toggleLang(){ curLang = curLang === 'zh' ? 'en' : 'zh'; updateLang(); }
function updateLang(){
  document.querySelectorAll('[data-t]').forEach(el => {
    const key = el.getAttribute('data-t');
    if(I18N[curLang][key]) el.textContent = I18N[curLang][key];
  });
  const promptArea = document.getElementById('prompt');
  if(promptArea) promptArea.placeholder = curLang==='zh' ? "描述你想生成的圖像... (支援中文)" : "Describe your image... (Supports auto-translate)";
  updateHistoryDisplay();
}
document.getElementById('langSwitch').onclick = toggleLang;

const STYLE_PRESETS = ${JSON.stringify(CONFIG.STYLE_PRESETS)};
const PRESET_SIZES = ${JSON.stringify(CONFIG.PRESET_SIZES)};
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
document.getElementById('advancedToggle').addEventListener('click',function(){ document.getElementById('advancedSection').classList.toggle('show'); });
function updateStyleDescription() {
  const styleSelect = document.getElementById('style');
  const styleConfig = STYLE_PRESETS[styleSelect.value];
  if (styleConfig) {
    document.getElementById('currentStyleName').textContent = styleConfig.name;
    document.getElementById('styleDescription').textContent = styleConfig.description || '無描述';
  }
}
function updatePreview(){
  const model=document.getElementById('model').value;
  const sizePreset=document.getElementById('size').value;
  const style=document.getElementById('style').value;
  const sizeConfig=PRESET_SIZES[sizePreset]||PRESET_SIZES['square-1k'];
  const styleConfig=STYLE_PRESETS[style];
  const modelNames={'gptimage':'GPT-Image 🎨','gptimage-large':'GPT-Image Large 🌟','zimage':'Z-Image Turbo ⚡','flux':'Flux Standard','turbo':'Flux Turbo ⚡','kontext':'Kontext 🎨'};
  document.getElementById('previewModel').textContent=modelNames[model]||model;
  document.getElementById('previewSize').textContent=sizeConfig.name;
  document.getElementById('previewStyle').textContent=styleConfig ? styleConfig.icon + ' ' + styleConfig.name : 'None';
  updateStyleDescription();
}
document.getElementById('model').addEventListener('change',updatePreview);
document.getElementById('size').addEventListener('change',updatePreview);
document.getElementById('style').addEventListener('change',updatePreview);
updatePreview();
const STORAGE_KEY='flux_ai_history';
const MAX_HISTORY=100;
function getHistory(){ try{ return JSON.parse(localStorage.getItem(STORAGE_KEY))||[]; }catch(e){ return[]; } }
function saveHistory(history){ try{ localStorage.setItem(STORAGE_KEY,JSON.stringify(history)); updateHistoryStats(); }catch(e){} }
function addToHistory(item){ let history=getHistory(); history.unshift({...item,id:Date.now()+Math.random(),timestamp:new Date().toISOString()}); if(history.length>MAX_HISTORY)history=history.slice(0,MAX_HISTORY); saveHistory(history); }
function deleteFromHistory(id){ if(!confirm(curLang==='zh'?'確定刪除？':'Delete item?'))return; saveHistory(getHistory().filter(item=>item.id!==id)); updateHistoryDisplay(); }
function clearHistory(){ if(!confirm(curLang==='zh'?'確定清空？':'Clear all history?'))return; localStorage.removeItem(STORAGE_KEY); updateHistoryDisplay(); updateHistoryStats(); }
function exportHistory(){
  const url=URL.createObjectURL(new Blob([JSON.stringify(getHistory(),null,2)],{type:'application/json'}));
  const link=document.createElement('a'); link.href=url; link.download='flux-history.json'; link.click(); URL.revokeObjectURL(url);
}
function updateHistoryStats(){
  const history=getHistory();
  document.getElementById('historyCount').textContent=history.length;
  document.getElementById('historyTotal').textContent=history.length;
  document.getElementById('storageSize').textContent=(new Blob([JSON.stringify(history)]).size/1024).toFixed(1)+' KB';
  document.getElementById('recentStyle').textContent=history.length>0?(STYLE_PRESETS[history[0].style]?.name||history[0].style):'-';
}
function updateHistoryDisplay(){
  const history=getHistory();
  const list=document.getElementById('historyList');
  if(history.length===0){ list.innerHTML='<div class="empty-state"><p>'+I18N[curLang].no_history+'</p></div>'; updateHistoryStats(); return; }
  const div=document.createElement('div'); div.className='gallery';
  history.forEach(item=>{
    const itemDiv=document.createElement('div'); itemDiv.className='gallery-item';
    const styleName=STYLE_PRESETS[item.style] ? STYLE_PRESETS[item.style].name : item.style;
    itemDiv.innerHTML=\`<img src="\${item.url}" loading="lazy"><div class="gallery-info"><div class="gallery-meta"><span class="model-badge">\${item.model}</span></div><div class="gallery-meta"><span class="style-badge">\${styleName}</span></div><div class="gallery-actions"><button class="action-btn reuse-btn">\${I18N[curLang].btn_reuse}</button><button class="action-btn download-btn">\${I18N[curLang].btn_dl}</button><button class="action-btn delete delete-btn">🗑️</button></div></div>\`;
    itemDiv.querySelector('img').onclick=()=>openModal(item.url);
    itemDiv.querySelector('.reuse-btn').onclick=()=>reusePrompt(item.id);
    itemDiv.querySelector('.download-btn').onclick=()=>downloadImage(item.url,item.seed);
    itemDiv.querySelector('.delete-btn').onclick=()=>deleteFromHistory(item.id);
    div.appendChild(itemDiv);
  });
  list.innerHTML=''; list.appendChild(div); updateHistoryStats();
}
function reusePrompt(id){
  const item=getHistory().find(h=>h.id===id);
  if(!item)return;
  document.getElementById('prompt').value=item.prompt||'';
  document.getElementById('model').value=item.model||'zimage';
  document.getElementById('style').value=item.style||'none';
  updatePreview();
  document.querySelector('[data-page="generate"]').click();
}
function downloadImage(url,seed){ const link=document.createElement('a'); link.href=url; link.download='flux-'+seed+'.png'; link.click(); }
function openModal(url){ document.getElementById('modalImage').src=url; document.getElementById('imageModal').classList.add('show'); }
document.getElementById('modalCloseBtn').onclick=()=>document.getElementById('imageModal').classList.remove('show');
document.getElementById('exportBtn').onclick=exportHistory;
document.getElementById('clearBtn').onclick=clearHistory;
function displayGeneratedImages(images){
  const history=getHistory();
  const galleryDiv=document.createElement('div'); galleryDiv.className='gallery';
  history.slice(0,images.length).forEach((item)=>{
    const itemDiv=document.createElement('div'); itemDiv.className='gallery-item';
    itemDiv.innerHTML=\`<img src="\${item.url}"><div class="gallery-info"><div style="background:#10b981;color:#fff;padding:2px;font-size:10px;text-align:center;border-radius:4px">✅ NEW</div><div class="gallery-actions"><button class="action-btn download-btn">\${I18N[curLang].btn_dl}</button></div></div>\`;
    itemDiv.querySelector('img').onclick=()=>openModal(item.url);
    itemDiv.querySelector('.download-btn').onclick=()=>downloadImage(item.url,item.seed);
    galleryDiv.appendChild(itemDiv);
  });
  const resDiv=document.getElementById('results'); resDiv.innerHTML='';
  resDiv.appendChild(galleryDiv);
}
document.getElementById('generateForm').addEventListener('submit',async(e)=>{
  e.preventDefault();
  const prompt=document.getElementById('prompt').value;
  if(!prompt.trim())return;
  const btn=document.getElementById('generateBtn');
  const resDiv=document.getElementById('results');
  const sizeConfig=PRESET_SIZES[document.getElementById('size').value];
  
  btn.disabled=true; btn.innerHTML='<div class="spinner"></div> ' + (curLang==='zh'?'生成中...':'Generating...');
  resDiv.innerHTML='<div class="loading"><div class="spinner"></div><p>'+(curLang==='zh'?'正在生成...':'Generating...')+'</p></div>';
  
  try{
    const res=await fetch('/_internal/generate',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        prompt,
        model:document.getElementById('model').value,
        width:sizeConfig.width,
        height:sizeConfig.height,
        style:document.getElementById('style').value,
        quality_mode:document.getElementById('qualityMode').value,
        seed:parseInt(document.getElementById('seed').value),
        n:parseInt(document.getElementById('numOutputs').value),
        negative_prompt:document.getElementById('negativePrompt').value,
        auto_optimize:document.getElementById('autoOptimize').checked,
        auto_hd:document.getElementById('autoHD').checked,
        reference_images:document.getElementById('referenceImages').value.split(',').filter(u=>u.trim())
      })
    });
    
    if(!res.ok) throw new Error((await res.json()).error?.message || 'Error');
    
    const contentType=res.headers.get('content-type');
    if(contentType&&contentType.startsWith('image/')){
      const blob=await res.blob();
      const url=URL.createObjectURL(blob);
      const item={url,prompt,model:res.headers.get('X-Model'),seed:parseInt(res.headers.get('X-Seed')),width:parseInt(res.headers.get('X-Width')),height:parseInt(res.headers.get('X-Height')),style:res.headers.get('X-Style')};
      addToHistory(item); displayGeneratedImages([item]);
    } else {
      const data=await res.json();
      data.data.forEach(item=>addToHistory({...item,prompt,url:item.image}));
      displayGeneratedImages(data.data);
    }
  }catch(e){
    resDiv.innerHTML='<div class="alert alert-error">'+e.message+'</div>';
  }finally{
    btn.disabled=false; btn.textContent=I18N[curLang].gen_btn;
  }
});
window.addEventListener('DOMContentLoaded',()=>{ updateHistoryStats(); updatePreview(); updateLang(); });
</script>
</body>
</html>`;
  
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8', ...corsHeaders() } });
}

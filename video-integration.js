// =================================================================================
// Flux AI Pro - 影片生成功能完整整合代碼
// =================================================================================
// 此文件包含所有需要添加到 worker.js 的影片生成相關代碼
// 請按照以下步驟整合：
// 1. 在 CONFIG 對象中添加影片相關配置
// 2. 添加 VideoGenerator 類
// 3. 在 export default.fetch 中添加影片路由
// 4. 添加影片頁面處理函數
// =================================================================================

// =================================================================================
// 步驟 1: 在 CONFIG 對象中添加影片相關配置 (約在 line 156 之後)
// =================================================================================

const VIDEO_CONFIG = {
  // 影片預設尺寸
  PRESET_SIZES: {
    'square-480': { name: '正方形 480p', width: 480, height: 480, fps: 8, duration: 4 },
    'square-720': { name: '正方形 720p', width: 720, height: 720, fps: 8, duration: 4 },
    'landscape-480': { name: '橫向 480p', width: 640, height: 480, fps: 8, duration: 4 },
    'landscape-720': { name: '橫向 720p', width: 1280, height: 720, fps: 8, duration: 4 },
    'portrait-480': { name: '直向 480p', width: 480, height: 640, fps: 8, duration: 4 },
    'portrait-720': { name: '直向 720p', width: 720, height: 1280, fps: 8, duration: 4 },
    'wide-1080': { name: '寬屏 1080p', width: 1920, height: 1080, fps: 8, duration: 4 },
  },

  // 影片模型配置
  MODELS: {
    pollinations: {
      name: 'Pollinations.ai',
      icon: '🌸',
      models: [
        { id: 'seedance-pro', name: 'Seedance Pro', category: 'text-to-video', fps: 24, maxDuration: 10, description: 'Seedance Pro 專業級影片生成模型，更好的提示詞遵循能力 (2-10秒)', cost: '0.000001/token' },
        { id: 'seedance', name: 'Seedance', category: 'text-to-video', fps: 24, maxDuration: 10, description: 'Seedance 高品質影片生成模型，支援文字和圖片輸入 (2-10秒)', cost: '0.0000018/token' },
        { id: 'wan', name: 'Wan', category: 'text-to-video', fps: 24, maxDuration: 15, description: 'Wan 影片生成模型，支援圖片輸入和音頻 (2-15秒，最高1080P)', cost: '0.025 Pollen/sec' },
        { id: 'veo', name: 'Veo', category: 'text-to-video', fps: 24, maxDuration: 8, description: 'Google 的影片生成模型，僅支援文字輸入 (4-8秒)，需要 API Key', cost: '0.15 Pollen/sec', requiresAuth: true },
      ]
    },
    runway: {
      name: 'Runway ML',
      icon: '🎬',
      models: [
        { id: 'gen-2', name: 'Gen-2', category: 'text-to-video', fps: 24, maxDuration: 4, description: 'Runway 的影片生成模型' },
        { id: 'gen-2-img', name: 'Gen-2 (Img2Vid)', category: 'image-to-video', fps: 24, maxDuration: 4, description: '圖片轉影片' },
      ]
    },
    pika: {
      name: 'Pika Labs',
      icon: '⚡',
      models: [
        { id: 'pika-1.0', name: 'Pika 1.0', category: 'text-to-video', fps: 24, maxDuration: 3, description: 'Pika Labs 的影片生成模型' },
        { id: 'pika-img', name: 'Pika (Img2Vid)', category: 'image-to-video', fps: 24, maxDuration: 3, description: '圖片轉影片' },
      ]
    },
    luma: {
      name: 'Luma AI',
      icon: '🌟',
      models: [
        { id: 'dream-machine', name: 'Dream Machine', category: 'text-to-video', fps: 24, maxDuration: 5, description: 'Luma AI 的影片生成模型' },
      ]
    },
    kling: {
      name: 'Kling AI',
      icon: '🎥',
      models: [
        { id: 'kling-v1', name: 'Kling v1', category: 'text-to-video', fps: 24, maxDuration: 5, description: 'Kling AI 的影片生成模型' },
      ]
    }
  },

  // 影片風格預設
  STYLE_PRESETS: {
    'none': { name: { zh: '無風格', en: 'No Style' }, category: 'basic', prompt: '' },
    'cinematic': { name: { zh: '電影風格', en: 'Cinematic' }, category: 'film', prompt: 'cinematic lighting, film grain, dramatic atmosphere, professional cinematography' },
    'anime': { name: { zh: '動漫風格', en: 'Anime' }, category: 'animation', prompt: 'anime style, vibrant colors, smooth animation, Japanese animation aesthetic' },
    '3d-render': { name: { zh: '3D 渲染', en: '3D Render' }, category: '3d', prompt: '3D rendered, octane render, ray tracing, high detail, realistic lighting' },
    'watercolor': { name: { zh: '水彩畫風', en: 'Watercolor' }, category: 'artistic', prompt: 'watercolor painting style, soft edges, artistic brushstrokes, pastel colors' },
    'cyberpunk': { name: { zh: '賽博龐克', en: 'Cyberpunk' }, category: 'scifi', prompt: 'cyberpunk aesthetic, neon lights, futuristic city, high tech low life' },
    'nature': { name: { zh: '自然風景', en: 'Nature' }, category: 'nature', prompt: 'natural lighting, organic movement, serene atmosphere, beautiful scenery' },
    'abstract': { name: { zh: '抽象藝術', en: 'Abstract' }, category: 'artistic', prompt: 'abstract shapes, flowing colors, artistic interpretation, creative visuals' },
  },

  // 風格分類
  STYLE_CATEGORIES: {
    basic: { name: { zh: '基礎風格', en: 'Basic' }, icon: '🎨', order: 1 },
    film: { name: { zh: '電影風格', en: 'Film' }, icon: '🎬', order: 2 },
    animation: { name: { zh: '動畫風格', en: 'Animation' }, icon: '✨', order: 3 },
    '3d': { name: { zh: '3D 風格', en: '3D' }, icon: '🧊', order: 4 },
    artistic: { name: { zh: '藝術風格', en: 'Artistic' }, icon: '🖼️', order: 5 },
    scifi: { name: { zh: '科幻風格', en: 'Sci-Fi' }, icon: '🚀', order: 6 },
    nature: { name: { zh: '自然風格', en: 'Nature' }, icon: '🌿', order: 7 },
  },

  // API 配置
  API: {
    pollinations: {
      baseUrl: 'https://gen.pollinations.ai/image',
      animateUrl: 'https://gen.pollinations.ai/image/animate',
      timeout: 120000, // 2 分鐘
    },
    runway: {
      baseUrl: 'https://api.runwayml.com/v1',
      timeout: 180000, // 3 分鐘
    },
    pika: {
      baseUrl: 'https://api.pika.art/v1',
      timeout: 180000,
    },
    luma: {
      baseUrl: 'https://api.lumalabs.ai/v1',
      timeout: 180000,
    },
    kling: {
      baseUrl: 'https://api.klingai.com/v1',
      timeout: 180000,
    }
  },

  // 限流配置
  RATE_LIMIT: {
    pollinations: { requests: 10, window: 60 }, // 每分鐘 10 次
    runway: { requests: 5, window: 60 },
    pika: { requests: 5, window: 60 },
    luma: { requests: 5, window: 60 },
    kling: { requests: 5, window: 60 },
  },

  // 影片生成限流配置
  VIDEO_RATE_LIMIT: {
    maxVideosPerHour: 5, // 每小時每IP 5個影片免費配額
    cooldownSeconds: 180, // 180秒生成冷卻
  }
};

// =================================================================================
// 步驟 2: 添加 VideoRateLimiter 和 VideoGenerator 類 (約在 AquaProvider 類之後, line 1096 之後)
// =================================================================================

/**
 * CORS 頭部設置
 */
function corsHeaders(extra = {}) {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Worker-Version, X-Source',
    'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob: ws: wss:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://waust.at https://*.whos.amung.us https:;",
    ...extra
  };
}

/**
 * Logger: 負責記錄日誌
 */
class Logger {
  constructor() { this.logs = []; }
  add(title, data) { this.logs.push({ title, data, timestamp: new Date().toISOString() }); }
  get() { return this.logs; }
  getLogs() { return this.logs; }
  clear() { this.logs = []; }
}

/**
 * 帶超時的 fetch 請求
 */
async function fetchWithTimeout(url, options = {}, timeout = 120000) {
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

/**
 * 影片生成限流器
 * 負責檢查每小時每IP的影片生成配額和冷卻時間
 */
class VideoRateLimiter {
  constructor(env, config = VIDEO_CONFIG) {
    this.env = env;
    this.config = config;
    this.KV = env?.FLUX_KV;
  }

  /**
   * 獲取客戶端 IP
   */
  getClientIP(request) {
    return request.headers.get('cf-connecting-ip') ||
           request.headers.get('x-forwarded-for') ||
           request.headers.get('x-real-ip') ||
           'unknown';
  }

  /**
   * 檢查影片生成配額
   * @param {string} ip - 客戶端 IP
   * @returns {Promise<Object>} { allowed: boolean, reason?: string, remaining?: number, resetTime?: number }
   */
  async checkQuota(ip) {
    if (!this.KV) {
      console.warn("⚠️ FLUX_KV 未綁定，跳過影片配額限制");
      return { allowed: true };
    }

    const key = `video_quota:${ip}`;
    const windowSize = 3600 * 1000; // 1小時 (毫秒)
    const maxVideos = this.config.VIDEO_RATE_LIMIT.maxVideosPerHour;

    try {
      const rawData = await this.KV.get(key);
      let timestamps = rawData ? JSON.parse(rawData) : [];
      const now = Date.now();
      
      // 移除過期的時間戳
      timestamps = timestamps.filter(ts => now - ts < windowSize);

      if (timestamps.length >= maxVideos) {
        const oldest = timestamps[0];
        const resetTime = oldest + windowSize;
        const waitMin = Math.ceil((resetTime - now) / 60000);
        return {
          allowed: false,
          reason: `🎬 影片配額已用盡！每小時免費配額為 ${maxVideos} 個影片。請 ${waitMin} 分鐘後再試。`,
          remaining: 0,
          resetTime
        };
      }

      return {
        allowed: true,
        remaining: maxVideos - timestamps.length
      };
    } catch (err) {
      console.error("影片配額檢查錯誤:", err);
      return { allowed: true };
    }
  }

  /**
   * 檢查冷卻時間
   * @param {string} ip - 客戶端 IP
   * @returns {Promise<Object>} { allowed: boolean, reason?: string, waitSeconds?: number }
   */
  async checkCooldown(ip) {
    if (!this.KV) {
      console.warn("⚠️ FLUX_KV 未綁定，跳過冷卻限制");
      return { allowed: true };
    }

    const key = `video_cooldown:${ip}`;
    const cooldownSeconds = this.config.VIDEO_RATE_LIMIT.cooldownSeconds;

    try {
      const lastGenerationTime = await this.KV.get(key);
      
      if (lastGenerationTime) {
        const now = Date.now();
        const elapsed = now - parseInt(lastGenerationTime);
        const waitSeconds = Math.ceil((cooldownSeconds * 1000 - elapsed) / 1000);

        if (elapsed < cooldownSeconds * 1000) {
          return {
            allowed: false,
            reason: `⏳ 影片生成冷卻中！請等待 ${waitSeconds} 秒後再試。`,
            waitSeconds
          };
        }
      }

      return { allowed: true };
    } catch (err) {
      console.error("冷卻檢查錯誤:", err);
      return { allowed: true };
    }
  }

  /**
   * 記錄影片生成
   * @param {string} ip - 客戶端 IP
   * @returns {Promise<void>}
   */
  async recordGeneration(ip) {
    if (!this.KV) return;

    try {
      // 更新配額
      const quotaKey = `video_quota:${ip}`;
      const rawData = await this.KV.get(quotaKey);
      let timestamps = rawData ? JSON.parse(rawData) : [];
      timestamps.push(Date.now());
      await this.KV.put(quotaKey, JSON.stringify(timestamps), { expirationTtl: 3600 });

      // 更新冷卻時間
      const cooldownKey = `video_cooldown:${ip}`;
      await this.KV.put(cooldownKey, Date.now().toString(), { expirationTtl: 180 });
    } catch (err) {
      console.error("記錄影片生成錯誤:", err);
    }
  }

  /**
   * 檢查並記錄影片生成
   * @param {string} ip - 客戶端 IP
   * @returns {Promise<Object>} 檢查結果
   */
  async checkAndRecord(ip) {
    // 檢查冷卻
    const cooldownCheck = await this.checkCooldown(ip);
    if (!cooldownCheck.allowed) {
      return cooldownCheck;
    }

    // 檢查配額
    const quotaCheck = await this.checkQuota(ip);
    if (!quotaCheck.allowed) {
      return quotaCheck;
    }

    // 記錄生成
    await this.recordGeneration(ip);

    return {
      allowed: true,
      remaining: quotaCheck.remaining
    };
  }
}

class VideoGenerator {
  constructor(config = VIDEO_CONFIG, env = null) {
    this.config = config;
    this.env = env;
    this.logger = new Logger();
  }

  /**
   * 生成影片
   * @param {string} prompt - 提示詞
   * @param {Object} options - 生成選項
   * @param {string} options.provider - 供應商 (pollinations, runway, pika, luma, kling)
   * @param {string} options.model - 模型 ID
   * @param {number} options.width - 寬度
   * @param {number} options.height - 高度
   * @param {number} options.fps - 幀率
   * @param {number} options.duration - 持續時間 (秒)
   * @param {string} options.style - 風格
   * @param {string} options.referenceImage - 參考圖片 URL (圖片轉影片)
   * @param {string} options.apiKey - API Key (如需要)
   * @returns {Promise<Object>} 生成結果
   */
  async generate(prompt, options = {}) {
    const {
      provider = 'pollinations',
      model = 'svd',
      width = 480,
      height = 480,
      fps = 8,
      duration = 4,
      style = 'none',
      referenceImage = null,
      apiKey = null,
    } = options;

    this.logger.clear();
    this.logger.add('🎬 開始影片生成', { provider, model, prompt });

    try {
      // 應用風格
      let finalPrompt = prompt;
      if (style !== 'none' && this.config.STYLE_PRESETS[style]) {
        const styleConfig = this.config.STYLE_PRESETS[style];
        finalPrompt = `${prompt}, ${styleConfig.prompt}`;
        this.logger.add('🎨 應用風格', { style });
      }

      // 根據供應商調用不同的 API
      let result;
      switch (provider) {
        case 'pollinations':
          result = await this.generatePollinations(finalPrompt, { model, width, height, fps, duration, referenceImage });
          break;
        case 'runway':
          result = await this.generateRunway(finalPrompt, { model, width, height, fps, duration, referenceImage, apiKey });
          break;
        case 'pika':
          result = await this.generatePika(finalPrompt, { model, width, height, fps, duration, referenceImage, apiKey });
          break;
        case 'luma':
          result = await this.generateLuma(finalPrompt, { model, width, height, fps, duration, referenceImage, apiKey });
          break;
        case 'kling':
          result = await this.generateKling(finalPrompt, { model, width, height, fps, duration, referenceImage, apiKey });
          break;
        default:
          throw new Error(`不支援的供應商: ${provider}`);
      }

      this.logger.add('✅ 影片生成成功', { url: result.url });
      return {
        success: true,
        url: result.url,
        model: model,
        provider: provider,
        prompt: finalPrompt,
        width: width,
        height: height,
        fps: fps,
        duration: duration,
        style: style,
        logs: this.logger.getLogs(),
      };

    } catch (error) {
      this.logger.add('❌ 影片生成失敗', { error: error.message });
      return {
        success: false,
        error: error.message,
        logs: this.logger.getLogs(),
      };
    }
  }

  /**
   * Pollinations 影片生成
   * 新 API: https://gen.pollinations.ai/image/{prompt}?model={model}
   * Image-to-video: https://gen.pollinations.ai/image/animate?model={model}&image={image_url}
   */
  async generatePollinations(prompt, options) {
    const { model, width, height, fps, duration, referenceImage, apiKey } = options;
    const apiConfig = this.config.API.pollinations;

    let url;
    const params = new URLSearchParams();
    params.append('model', model);
    
    // 新 API 參數
    if (width) params.append('width', width);
    if (height) params.append('height', height);
    if (fps) params.append('fps', fps);
    if (duration) params.append('duration', duration);

    // 構建請求標頭 - 優先使用環境變數中的 API Key
    const headers = {};
    const envApiKey = this.env?.POLLINATIONS_VIDEO_API_KEY;
    const finalApiKey = envApiKey || apiKey;
    if (finalApiKey) {
      headers['Authorization'] = `Bearer ${finalApiKey}`;
    }

    if (referenceImage) {
      // Image-to-video: 使用 animate 端點
      url = `${apiConfig.animateUrl}?${params.toString()}`;
      params.append('image', referenceImage);
      this.logger.add('📤 發送 Image-to-Video 請求到 Pollinations', { url, model });
    } else {
      // Text-to-video: 使用新的端點格式
      url = `${apiConfig.baseUrl}/${encodeURIComponent(prompt)}?${params.toString()}`;
      this.logger.add('📤 發送 Text-to-Video 請求到 Pollinations', { url, model });
    }

    const response = await fetchWithTimeout(url, { headers }, apiConfig.timeout);

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Pollinations API 錯誤: ${response.status} ${response.statusText}`;
      
      // 針對 429 錯誤提供更友好的訊息
      if (response.status === 429) {
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.retryAfterSeconds) {
            const minutes = Math.floor(errorData.retryAfterSeconds / 60);
            const seconds = Math.floor(errorData.retryAfterSeconds % 60);
            errorMessage = `Pollinations API 速率限制超過。請等待 ${minutes} 分 ${seconds} 秒後重試。如需無限請求，請提供 API Key (sk_*)。`;
          } else {
            errorMessage = `Pollinations API 速率限制超過。請稍後重試或提供 API Key (sk_*) 以獲得無限請求。`;
          }
        } catch (e) {
          errorMessage = `Pollinations API 速率限制超過。請稍後重試或提供 API Key (sk_*) 以獲得無限請求。`;
        }
      } else {
        errorMessage += ` - ${errorText}`;
      }
      
      throw new Error(errorMessage);
    }

    // Pollinations 直接返回影片文件
    const blob = await response.blob();
    // 將 blob 轉換為 base64 字符串（Cloudflare Workers 不支持 URL.createObjectURL）
    const arrayBuffer = await blob.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    const mimeType = blob.type || 'video/mp4';
    const videoUrl = `data:${mimeType};base64,${base64}`;

    return { url: videoUrl };
  }

  /**
   * Runway 影片生成
   */
  async generateRunway(prompt, options) {
    const { model, width, height, fps, duration, referenceImage, apiKey } = options;
    const apiConfig = this.config.API.runway;

    // 優先使用環境變數中的 API Key
    const envApiKey = this.env?.RUNWAY_VIDEO_API_KEY;
    const finalApiKey = envApiKey || apiKey;

    if (!finalApiKey) {
      throw new Error('Runway 需要 API Key');
    }

    const headers = {
      'Authorization': `Bearer ${finalApiKey}`,
      'Content-Type': 'application/json',
    };

    const body = {
      model: model,
      prompt: prompt,
      width: width,
      height: height,
      fps: fps,
      duration: duration,
    };

    if (referenceImage) {
      body.image = referenceImage;
    }

    this.logger.add('📤 發送請求到 Runway', { model });

    const response = await fetchWithTimeout(
      `${apiConfig.baseUrl}/generate`,
      { method: 'POST', headers, body: JSON.stringify(body) },
      apiConfig.timeout
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(`Runway API 錯誤: ${error.message || response.statusText}`);
    }

    const data = await response.json();

    // Runway 使用異步任務，需要輪詢
    if (data.task_id) {
      return await this.pollRunwayTask(data.task_id, headers, apiConfig.timeout);
    }

    return { url: data.url };
  }

  /**
   * 輪詢 Runway 任務
   */
  async pollRunwayTask(taskId, headers, timeout) {
    const maxAttempts = 60;
    const interval = 3000;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      this.logger.add(`⏳ 輪詢任務 ${attempt}/${maxAttempts}`, { taskId });

      const response = await fetch(
        `https://api.runwayml.com/v1/tasks/${taskId}`,
        { headers }
      );

      if (!response.ok) {
        throw new Error(`Runway 輪詢錯誤: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === 'succeeded') {
        this.logger.add('✅ 任務完成', { url: data.output.url });
        return { url: data.output.url };
      }

      if (data.status === 'failed') {
        throw new Error(`Runway 任務失敗: ${data.error}`);
      }

      if (data.status === 'processing') {
        const progress = data.progress || 0;
        this.logger.add(`📊 進度: ${progress}%`, { status: data.status });
      }

      await new Promise(resolve => setTimeout(resolve, interval));
    }

    throw new Error('Runway 任務超時');
  }

  /**
   * Pika 影片生成
   */
  async generatePika(prompt, options) {
    const { model, width, height, fps, duration, referenceImage, apiKey } = options;
    const apiConfig = this.config.API.pika;

    // 優先使用環境變數中的 API Key
    const envApiKey = this.env?.PIKA_VIDEO_API_KEY;
    const finalApiKey = envApiKey || apiKey;

    if (!finalApiKey) {
      throw new Error('Pika 需要 API Key');
    }

    const headers = {
      'Authorization': `Bearer ${finalApiKey}`,
      'Content-Type': 'application/json',
    };

    const body = {
      model: model,
      prompt: prompt,
      width: width,
      height: height,
      fps: fps,
      duration: duration,
    };

    if (referenceImage) {
      body.image = referenceImage;
    }

    this.logger.add('📤 發送請求到 Pika', { model });

    const response = await fetchWithTimeout(
      `${apiConfig.baseUrl}/generate`,
      { method: 'POST', headers, body: JSON.stringify(body) },
      apiConfig.timeout
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(`Pika API 錯誤: ${error.message || response.statusText}`);
    }

    const data = await response.json();

    if (data.task_id) {
      return await this.pollPikaTask(data.task_id, headers, apiConfig.timeout);
    }

    return { url: data.url };
  }

  /**
   * 輪詢 Pika 任務
   */
  async pollPikaTask(taskId, headers, timeout) {
    const maxAttempts = 60;
    const interval = 3000;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      this.logger.add(`⏳ 輪詢任務 ${attempt}/${maxAttempts}`, { taskId });

      const response = await fetch(
        `https://api.pika.art/v1/tasks/${taskId}`,
        { headers }
      );

      if (!response.ok) {
        throw new Error(`Pika 輪詢錯誤: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === 'completed') {
        this.logger.add('✅ 任務完成', { url: data.video_url });
        return { url: data.video_url };
      }

      if (data.status === 'failed') {
        throw new Error(`Pika 任務失敗: ${data.error}`);
      }

      if (data.status === 'processing') {
        const progress = data.progress || 0;
        this.logger.add(`📊 進度: ${progress}%`, { status: data.status });
      }

      await new Promise(resolve => setTimeout(resolve, interval));
    }

    throw new Error('Pika 任務超時');
  }

  /**
   * Luma 影片生成
   */
  async generateLuma(prompt, options) {
    const { model, width, height, fps, duration, referenceImage, apiKey } = options;
    const apiConfig = this.config.API.luma;

    // 優先使用環境變數中的 API Key
    const envApiKey = this.env?.LUMA_VIDEO_API_KEY;
    const finalApiKey = envApiKey || apiKey;

    if (!finalApiKey) {
      throw new Error('Luma 需要 API Key');
    }

    const headers = {
      'Authorization': `Bearer ${finalApiKey}`,
      'Content-Type': 'application/json',
    };

    const body = {
      model: model,
      prompt: prompt,
      width: width,
      height: height,
      fps: fps,
      duration: duration,
    };

    if (referenceImage) {
      body.image = referenceImage;
    }

    this.logger.add('📤 發送請求到 Luma', { model });

    const response = await fetchWithTimeout(
      `${apiConfig.baseUrl}/generate`,
      { method: 'POST', headers, body: JSON.stringify(body) },
      apiConfig.timeout
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(`Luma API 錯誤: ${error.message || response.statusText}`);
    }

    const data = await response.json();

    if (data.task_id) {
      return await this.pollLumaTask(data.task_id, headers, apiConfig.timeout);
    }

    return { url: data.url };
  }

  /**
   * 輪詢 Luma 任務
   */
  async pollLumaTask(taskId, headers, timeout) {
    const maxAttempts = 60;
    const interval = 3000;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      this.logger.add(`⏳ 輪詢任務 ${attempt}/${maxAttempts}`, { taskId });

      const response = await fetch(
        `https://api.lumalabs.ai/v1/tasks/${taskId}`,
        { headers }
      );

      if (!response.ok) {
        throw new Error(`Luma 輪詢錯誤: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === 'succeeded') {
        this.logger.add('✅ 任務完成', { url: data.video.url });
        return { url: data.video.url };
      }

      if (data.status === 'failed') {
        throw new Error(`Luma 任務失敗: ${data.error}`);
      }

      if (data.status === 'processing') {
        const progress = data.progress || 0;
        this.logger.add(`📊 進度: ${progress}%`, { status: data.status });
      }

      await new Promise(resolve => setTimeout(resolve, interval));
    }

    throw new Error('Luma 任務超時');
  }

  /**
   * Kling 影片生成
   */
  async generateKling(prompt, options) {
    const { model, width, height, fps, duration, referenceImage, apiKey } = options;
    const apiConfig = this.config.API.kling;

    // 優先使用環境變數中的 API Key
    const envApiKey = this.env?.KLING_VIDEO_API_KEY;
    const finalApiKey = envApiKey || apiKey;

    if (!finalApiKey) {
      throw new Error('Kling 需要 API Key');
    }

    const headers = {
      'Authorization': `Bearer ${finalApiKey}`,
      'Content-Type': 'application/json',
    };

    const body = {
      model: model,
      prompt: prompt,
      width: width,
      height: height,
      fps: fps,
      duration: duration,
    };

    if (referenceImage) {
      body.image = referenceImage;
    }

    this.logger.add('📤 發送請求到 Kling', { model });

    const response = await fetchWithTimeout(
      `${apiConfig.baseUrl}/generate`,
      { method: 'POST', headers, body: JSON.stringify(body) },
      apiConfig.timeout
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(`Kling API 錯誤: ${error.message || response.statusText}`);
    }

    const data = await response.json();

    if (data.task_id) {
      return await this.pollKlingTask(data.task_id, headers, apiConfig.timeout);
    }

    return { url: data.url };
  }

  /**
   * 輪詢 Kling 任務
   */
  async pollKlingTask(taskId, headers, timeout) {
    const maxAttempts = 60;
    const interval = 3000;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      this.logger.add(`⏳ 輪詢任務 ${attempt}/${maxAttempts}`, { taskId });

      const response = await fetch(
        `https://api.klingai.com/v1/tasks/${taskId}`,
        { headers }
      );

      if (!response.ok) {
        throw new Error(`Kling 輪詢錯誤: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === 'succeeded') {
        this.logger.add('✅ 任務完成', { url: data.video_url });
        return { url: data.video_url };
      }

      if (data.status === 'failed') {
        throw new Error(`Kling 任務失敗: ${data.error}`);
      }

      if (data.status === 'processing') {
        const progress = data.progress || 0;
        this.logger.add(`📊 進度: ${progress}%`, { status: data.status });
      }

      await new Promise(resolve => setTimeout(resolve, interval));
    }

    throw new Error('Kling 任務超時');
  }
}

// =================================================================================
// 步驟 3: 在 export default.fetch 中添加影片路由 (約在 line 1151-1210)
// =================================================================================

// 在 export default.fetch 函數中，添加以下路由處理：

/*
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // ... 現有路由 ...

    // ====== 影片生成路由 ======
    if (path === '/video' || path === '/video/') {
      return handleVideoPage(request, env);
    }

    if (path === '/video/nano') {
      return handleVideoNanoPage(request, env);
    }

    if (path.startsWith('/api/video/')) {
      return handleVideoAPI(request, env);
    }

    // ... 現有路由 ...
  }
};
*/

// =================================================================================
// 步驟 4: 添加影片 API 處理函數 (約在 handlePromptGeneration 之後)
// =================================================================================

/**
 * 處理影片生成 API 請求
 */
async function handleVideoAPI(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;

  // 生成影片
  if (path === '/api/video/generate' && request.method === 'POST') {
    try {
      const body = await request.json();
      const {
        prompt,
        provider = 'pollinations',
        model = 'svd',
        width = 480,
        height = 480,
        fps = 8,
        duration = 4,
        style = 'none',
        reference_image = null,
        api_key = null,
      } = body;

      if (!prompt) {
        return new Response(JSON.stringify({ error: '請提供提示詞' }), {
          status: 400,
          headers: corsHeaders({ 'Content-Type': 'application/json' }),
        });
      }

      // 檢查影片生成限流和冷卻（不記錄）
      const rateLimiter = new VideoRateLimiter(env);
      const ip = rateLimiter.getClientIP(request);
      
      // 先檢查配額
      const quotaCheck = await rateLimiter.checkQuota(ip);
      if (!quotaCheck.allowed) {
        return new Response(JSON.stringify({
          error: quotaCheck.reason,
          code: 'QUOTA_EXCEEDED',
          remaining: quotaCheck.remaining,
          resetTime: quotaCheck.resetTime
        }), {
          status: 429,
          headers: corsHeaders({ 'Content-Type': 'application/json' }),
        });
      }
      
      // 再檢查冷卻
      const cooldownCheck = await rateLimiter.checkCooldown(ip);
      if (!cooldownCheck.allowed) {
        return new Response(JSON.stringify({
          error: cooldownCheck.reason,
          code: 'COOLDOWN',
          waitSeconds: cooldownCheck.waitSeconds,
          resetTime: cooldownCheck.resetTime
        }), {
          status: 429,
          headers: corsHeaders({ 'Content-Type': 'application/json' }),
        });
      }

      const videoGenerator = new VideoGenerator(VIDEO_CONFIG, env);
      const result = await videoGenerator.generate(prompt, {
        provider,
        model,
        width,
        height,
        fps,
        duration,
        style,
        referenceImage: reference_image,
        apiKey: api_key,
      });

      // 只有生成成功才記錄
      if (result.success) {
        // 記錄生成（扣除配額並設置冷卻）
        await rateLimiter.recordGeneration(ip);
        return new Response(JSON.stringify({
          ...result,
          remaining: limitCheck.remaining - 1
        }), {
          headers: corsHeaders({ 'Content-Type': 'application/json' }),
        });
      } else {
        return new Response(JSON.stringify({ error: result.error }), {
          status: 500,
          headers: corsHeaders({ 'Content-Type': 'application/json' }),
        });
      }
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: corsHeaders({ 'Content-Type': 'application/json' }),
      });
    }
  }

  // 獲取模型列表
  if (path === '/api/video/models' && request.method === 'GET') {
    const provider = url.searchParams.get('provider') || 'all';
    let models = VIDEO_CONFIG.MODELS;

    if (provider !== 'all' && models[provider]) {
      models = { [provider]: models[provider] };
    }

    return new Response(JSON.stringify(models), {
      headers: corsHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  // 獲取風格列表
  if (path === '/api/video/styles' && request.method === 'GET') {
    return new Response(JSON.stringify(VIDEO_CONFIG.STYLE_PRESETS), {
      headers: corsHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  // 獲取尺寸預設
  if (path === '/api/video/sizes' && request.method === 'GET') {
    return new Response(JSON.stringify(VIDEO_CONFIG.PRESET_SIZES), {
      headers: corsHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  // 檢查配額和冷卻狀態
  if (path === '/api/video/status' && request.method === 'GET') {
    const rateLimiter = new VideoRateLimiter(env);
    const ip = rateLimiter.getClientIP(request);
    
    const quotaCheck = await rateLimiter.checkQuota(ip);
    const cooldownCheck = await rateLimiter.checkCooldown(ip);
    
    return new Response(JSON.stringify({
      quota: {
        maxVideosPerHour: VIDEO_CONFIG.VIDEO_RATE_LIMIT.maxVideosPerHour,
        remaining: quotaCheck.remaining,
        resetTime: quotaCheck.resetTime,
      },
      cooldown: {
        cooldownSeconds: VIDEO_CONFIG.VIDEO_RATE_LIMIT.cooldownSeconds,
        inCooldown: !cooldownCheck.allowed,
        waitSeconds: cooldownCheck.waitSeconds,
      },
      allowed: quotaCheck.allowed && cooldownCheck.allowed,
    }), {
      headers: corsHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  // 檢查環境變數 API Key 配置
  if (path === '/api/video/config' && request.method === 'GET') {
    const provider = url.searchParams.get('provider') || 'pollinations';
    const envKeyMap = {
      pollinations: 'POLLINATIONS_VIDEO_API_KEY',
      runway: 'RUNWAY_VIDEO_API_KEY',
      pika: 'PIKA_VIDEO_API_KEY',
      luma: 'LUMA_VIDEO_API_KEY',
      kling: 'KLING_VIDEO_API_KEY',
    };
    
    const envKey = envKeyMap[provider];
    const hasEnvKey = envKey ? !!env?.[envKey] : false;
    
    return new Response(JSON.stringify({
      provider,
      hasEnvKey,
      envKeyName: envKey,
    }), {
      headers: corsHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  return new Response(JSON.stringify({ error: '未知的 API 端點' }), {
    status: 404,
    headers: corsHeaders({ 'Content-Type': 'application/json' }),
  });
}

// =================================================================================
// 步驟 5: 添加影片頁面處理函數 (約在 handleUI 之後)
// =================================================================================

/**
 * 處理影片生成頁面
 */
function handleVideoPage(request, env) {
  const url = new URL(request.url);
  const currentLang = url.searchParams.get('lang') || 'zh';

  // 生成尺寸選單 HTML
  let sizeOptionsHTML = '';
  for (const [key, size] of Object.entries(VIDEO_CONFIG.PRESET_SIZES)) {
    const selected = key === 'square-480' ? ' selected' : '';
    sizeOptionsHTML += `<option value="${key}"${selected}>${size.name} (${size.width}x${size.height}, ${size.fps}fps, ${size.duration}s)</option>`;
  }

  // 生成風格選單 HTML
  let styleOptionsHTML = '';
  const sortedCategories = Object.entries(VIDEO_CONFIG.STYLE_CATEGORIES).sort((a, b) => a[1].order - b[1].order);
  for (const [categoryKey, categoryInfo] of sortedCategories) {
    const stylesInCategory = Object.entries(VIDEO_CONFIG.STYLE_PRESETS).filter(([key, style]) => style.category === categoryKey);
    if (stylesInCategory.length > 0) {
      const categoryName = typeof categoryInfo.name === 'object' ? (categoryInfo.name[currentLang] || categoryInfo.name.zh || categoryInfo.name) : categoryInfo.name;
      styleOptionsHTML += `<optgroup label="${categoryInfo.icon} ${categoryName}">`;
      for (const [styleKey, styleConfig] of stylesInCategory) {
        const selected = styleKey === 'none' ? ' selected' : '';
        let styleName = typeof styleConfig.name === 'object' ? (styleConfig.name[currentLang] || styleConfig.name.zh || styleConfig.name) : styleConfig.name;
        const enName = typeof styleConfig.name === 'object' ? (styleConfig.name.en || styleConfig.name) : styleConfig.name;
        if (styleName !== enName && enName) {
          styleName = `${styleName} (${enName})`;
        }
        styleOptionsHTML += `<option value="${styleKey}"${selected}>${styleName}</option>`;
      }
      styleOptionsHTML += '</optgroup>';
    }
  }

  // 生成供應商選單 HTML
  let providerOptionsHTML = '';
  for (const [key, provider] of Object.entries(VIDEO_CONFIG.MODELS)) {
    const selected = key === 'pollinations' ? ' selected' : '';
    providerOptionsHTML += `<option value="${key}"${selected}>${provider.icon} ${provider.name}</option>`;
  }

  const html = `<!DOCTYPE html>
<html lang="${currentLang}" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Flux AI Pro - 影片生成</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎬</text></svg>">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root {
  --bg-primary: #0a0a0a;
  --bg-secondary: #1a1a2e;
  --bg-card: rgba(255,255,255,0.03);
  --bg-input: rgba(0,0,0,0.3);
  --border-color: rgba(255,255,255,0.1);
  --text-primary: #fff;
  --text-secondary: #9ca3af;
  --text-muted: #6b7280;
  --accent-color: #f59e0b;
  --accent-gradient: linear-gradient(135deg,#f59e0b 0%,#d97706 100%);
  --success-color: #22c55e;
  --error-color: #ef4444;
  --shadow-color: rgba(245,158,11,0.3);
}
[data-theme="light"] {
  --bg-primary: #f8fafc;
  --bg-secondary: #e2e8f0;
  --bg-card: rgba(255,255,255,0.8);
  --bg-input: rgba(0,0,0,0.05);
  --border-color: rgba(0,0,0,0.1);
  --text-primary: #1e293b;
  --text-secondary: #475569;
  --text-muted: #94a3b8;
  --shadow-color: rgba(245,158,11,0.2);
}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;background:linear-gradient(135deg,var(--bg-primary) 0%,var(--bg-secondary) 100%);color:var(--text-primary);min-height:100vh;transition:background 0.3s,color 0.3s}
.container{max-width:100%;margin:0;padding:0;height:100vh;display:flex;flex-direction:column}
.top-nav{background:rgba(255,255,255,0.05);backdrop-filter:blur(10px);border-bottom:1px solid var(--border-color);padding:15px 25px;display:flex;justify-content:space-between;align-items:center;flex-shrink:0}
[data-theme="light"] .top-nav{background:rgba(255,255,255,0.8)}
.nav-left{display:flex;align-items:center;gap:20px}
.logo{color:var(--accent-color);font-size:24px;font-weight:800;text-shadow:0 0 20px var(--shadow-color);display:flex;align-items:center;gap:10px}
.nav-menu{display:flex;gap:10px;align-items:center}
.nav-btn{padding:8px 16px;background:rgba(255,255,255,0.05);border:1px solid var(--border-color);border-radius:8px;color:var(--text-secondary);cursor:pointer;font-size:14px;font-weight:600;transition:all 0.3s;display:flex;align-items:center;gap:6px;text-decoration:none}
[data-theme="light"] .nav-btn{background:rgba(0,0,0,0.05)}
.nav-btn:hover{border-color:var(--accent-color);color:var(--text-primary)}
.nav-btn.active{background:var(--accent-gradient);color:#fff;border-color:var(--accent-color)}
.theme-toggle{padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid var(--border-color);border-radius:8px;color:var(--text-secondary);cursor:pointer;font-size:18px;transition:all 0.3s}
[data-theme="light"] .theme-toggle{background:rgba(0,0,0,0.05)}
.theme-toggle:hover{border-color:var(--accent-color);color:var(--text-primary)}
.main-content{flex:1;display:flex;overflow:hidden;gap:20px;padding:20px}
.left-panel{width:340px;overflow-y:auto;flex-shrink:0}
.center-panel{flex:1;overflow-y:auto}
.right-panel{width:400px;overflow-y:auto;flex-shrink:0}
@media(max-width:1200px){.main-content{flex-direction:column}.left-panel,.right-panel{width:100%;max-height:400px}}
.card{background:var(--bg-card);border:1px solid var(--border-color);border-radius:16px;padding:20px;margin-bottom:20px;backdrop-filter:blur(10px);transition:all 0.3s}
[data-theme="light"] .card{background:rgba(255,255,255,0.9);box-shadow:0 4px 20px rgba(0,0,0,0.08)}
.card:hover{border-color:rgba(245,158,11,0.3);transform:translateY(-2px)}
.card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid var(--border-color)}
.card-title{font-size:16px;font-weight:700;color:var(--accent-color);display:flex;align-items:center;gap:8px}
.card-toggle{background:none;border:none;color:var(--text-secondary);cursor:pointer;font-size:18px;padding:4px;transition:all 0.3s}
.card-toggle:hover{color:var(--accent-color);transform:rotate(180deg)}
.card-content{transition:all 0.3s}
.card-content.collapsed{display:none}
.form-group{margin-bottom:14px}
label{display:block;margin-bottom:6px;font-weight:600;font-size:13px;color:var(--text-primary)}
input,textarea,select{width:100%;padding:10px;background:var(--bg-input);border:1px solid var(--border-color);border-radius:8px;color:var(--text-primary);font-size:13px;transition:all 0.3s}
[data-theme="light"] input,[data-theme="light"] textarea,[data-theme="light"] select{background:#fff}
input:focus,textarea:focus,select:focus{outline:none;border-color:var(--accent-color);box-shadow:0 0 0 3px rgba(245,158,11,0.1)}
select{background-color:var(--bg-secondary)!important;color:var(--text-primary)!important;cursor:pointer}
[data-theme="light"] select{background-color:#fff!important}
.btn{padding:12px 24px;border:none;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.3s;display:inline-flex;align-items:center;gap:8px;justify-content:center;width:100%}
.btn-primary{background:var(--accent-gradient);color:#fff;box-shadow:0 4px 15px var(--shadow-color)}
.btn-primary:disabled{opacity:0.5;cursor:not-allowed}
.btn-secondary{background:rgba(255,255,255,0.1);border:1px solid var(--border-color);color:var(--text-primary)}
[data-theme="light"] .btn-secondary{background:rgba(0,0,0,0.05)}
.btn-secondary:hover{border-color:var(--accent-color)}
.btn-sm{padding:6px 12px;font-size:12px;width:auto}
.video-container{background:var(--bg-input);border-radius:12px;overflow:hidden;border:1px solid var(--border-color);margin-bottom:20px}
.video-container video{width:100%;display:block}
.video-info{padding:15px}
.video-meta{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:5px}
.model-badge,.provider-badge,.style-badge{padding:4px 10px;border-radius:6px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.1)}
[data-theme="light"] .model-badge,[data-theme="light"] .provider-badge,[data-theme="light"] .style-badge{background:rgba(0,0,0,0.1)}
.loading{text-align:center;padding:60px 20px;color:var(--text-secondary)}
.spinner{border:3px solid rgba(255,255,255,0.1);border-top:3px solid var(--accent-color);border-radius:50%;width:40px;height:40px;animation:spin 1s linear infinite;margin:0 auto 15px}
[data-theme="light"] .spinner{border-color:rgba(0,0,0,0.1)}
@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
.drag-drop-zone{border:2px dashed var(--border-color);border-radius:12px;padding:20px;text-align:center;transition:all 0.3s ease;cursor:pointer;background:var(--bg-input);min-height:100px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px}
.drag-drop-zone:hover{border-color:rgba(245,158,11,0.5);background:rgba(245,158,11,0.05)}
.drag-drop-zone.drag-over{border-color:var(--accent-color);background:rgba(245,158,11,0.15);transform:scale(1.02)}
.drag-drop-zone .drag-icon{font-size:32px;opacity:0.7}
.drag-drop-zone .drag-text{font-size:13px;color:var(--text-secondary)}
.drag-drop-zone .drag-subtext{font-size:11px;color:var(--text-muted)}
.footer{padding:20px;text-align:center;font-size:12px;color:var(--text-muted);border-top:1px solid var(--border-color);margin-top:auto;line-height:1.8}
.footer a{color:#fbbf24;text-decoration:none;transition:0.3s;margin:0 4px}
.footer a:hover{text-decoration:underline;color:var(--accent-color)}
.history-item{background:var(--bg-input);border:1px solid var(--border-color);border-radius:8px;padding:12px;margin-bottom:10px;cursor:pointer;transition:all 0.3s}
.history-item:hover{border-color:var(--accent-color);transform:translateX(4px)}
.history-item .history-meta{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
.history-item .history-prompt{font-size:12px;color:var(--text-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.history-item .history-time{font-size:11px;color:var(--text-muted)}
.history-item .history-badges{display:flex;gap:4px;flex-wrap:wrap;margin-top:6px}
.history-item .history-badge{padding:2px 6px;border-radius:4px;font-size:10px;background:rgba(255,255,255,0.1)}
[data-theme="light"] .history-item .history-badge{background:rgba(0,0,0,0.1)}
.advanced-params{display:none}
.advanced-params.show{display:block}
.toggle-advanced{display:flex;align-items:center;gap:8px;cursor:pointer;color:var(--text-secondary);font-size:12px;margin-bottom:12px}
.toggle-advanced:hover{color:var(--accent-color)}
.toggle-advanced input{width:auto;margin:0}
.api-key-group{display:none;background:rgba(245,158,11,0.1);padding:10px;border-radius:8px;border:1px solid rgba(245,158,11,0.3)}
.api-key-group.show{display:block}
[data-theme="light"] .api-key-group{background:rgba(245,158,11,0.15)}
.logs-container{background:var(--bg-input);border:1px solid var(--border-color);border-radius:8px;padding:10px;height:180px;overflow-y:auto;font-size:11px;font-family:monospace;color:var(--text-secondary)}
.log-entry{margin-bottom:4px}
.log-entry.error{color:var(--error-color)}
.log-entry.success{color:var(--success-color)}
.empty-state{text-align:center;padding:40px 20px;color:var(--text-muted)}
.empty-state .empty-icon{font-size:48px;margin-bottom:16px;opacity:0.5}
.empty-state .empty-text{font-size:14px;margin-bottom:8px}
.empty-state .empty-subtext{font-size:12px}
.rate-limit-card{background:linear-gradient(135deg,rgba(245,158,11,0.1) 0%,rgba(217,119,6,0.05) 100%);border:1px solid rgba(245,158,11,0.3)}
[data-theme="light"] .rate-limit-card{background:linear-gradient(135deg,rgba(245,158,11,0.15) 0%,rgba(217,119,6,0.08) 100%);border:1px solid rgba(245,158,11,0.4)}
.rate-limit-status{display:flex;align-items:center;gap:12px;margin-bottom:12px}
.rate-limit-icon{font-size:24px}
.rate-limit-info{flex:1}
.rate-limit-label{font-size:12px;color:var(--text-secondary);margin-bottom:4px}
.rate-limit-value{font-size:18px;font-weight:700;color:var(--accent-color)}
.rate-limit-value.warning{color:#f59e0b}
.rate-limit-value.error{color:var(--error-color)}
.rate-limit-value.success{color:var(--success-color)}
.rate-limit-bar{height:6px;background:rgba(255,255,255,0.1);border-radius:3px;overflow:hidden;margin-top:8px}
[data-theme="light"] .rate-limit-bar{background:rgba(0,0,0,0.1)}
.rate-limit-bar-fill{height:100%;background:var(--accent-gradient);transition:width 0.3s ease}
.rate-limit-bar-fill.warning{background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%)}
.rate-limit-bar-fill.error{background:linear-gradient(135deg,#ef4444 0%,#dc2626 100%)}
.rate-limit-bar-fill.success{background:linear-gradient(135deg,#22c55e 0%,#16a34a 100%)}
.rate-limit-detail{font-size:11px;color:var(--text-muted);margin-top:6px}
</style>
</head>
<body>
<div class="container">
<div class="top-nav">
    <div class="nav-left">
        <div class="logo">
            🎬 Flux AI Pro <span style="font-size:12px;background:linear-gradient(135deg,#10b981 0%,#059669 100%);padding:4px 10px;border-radius:12px;font-weight:600">影片生成</span>
        </div>
    </div>
    <div class="nav-menu">
        <a href="/" class="nav-btn">🎨 圖像生成</a>
        <a href="/nano" class="nav-btn">🍌 Nano版</a>
        <a href="/video" class="nav-btn active">🎬 影片生成</a>
        <button class="theme-toggle" id="themeToggle" title="切換主題">🌙</button>
    </div>
</div>
<div class="main-content">
<div class="left-panel">
    <div class="card rate-limit-card">
        <div class="card-header">
            <div class="card-title">📊 限流狀態</div>
            <button class="btn btn-secondary btn-sm" id="refreshRateLimit">🔄</button>
        </div>
        <div class="card-content">
            <div class="rate-limit-status">
                <div class="rate-limit-icon">🎬</div>
                <div class="rate-limit-info">
                    <div class="rate-limit-label">每小時免費配額</div>
                    <div class="rate-limit-value" id="quotaValue">載入中...</div>
                    <div class="rate-limit-bar">
                        <div class="rate-limit-bar-fill" id="quotaBar" style="width:0%"></div>
                    </div>
                    <div class="rate-limit-detail" id="quotaDetail">正在檢查配額...</div>
                </div>
            </div>
            <div class="rate-limit-status">
                <div class="rate-limit-icon">⏱️</div>
                <div class="rate-limit-info">
                    <div class="rate-limit-label">生成冷卻時間</div>
                    <div class="rate-limit-value" id="cooldownValue">載入中...</div>
                    <div class="rate-limit-bar">
                        <div class="rate-limit-bar-fill" id="cooldownBar" style="width:0%"></div>
                    </div>
                    <div class="rate-limit-detail" id="cooldownDetail">正在檢查冷卻...</div>
                </div>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-header">
            <div class="card-title">⚙️ 基本參數</div>
        </div>
        <div class="card-content">
            <form id="videoForm">
                <div class="form-group">
                    <label>🏢 供應商</label>
                    <select id="provider">${providerOptionsHTML}</select>
                </div>
                <div class="form-group api-key-group" id="apiKeyGroup">
                    <label>🔑 API Key</label>
                    <input type="password" id="apiKey" placeholder="輸入 API Key">
                    <div style="font-size:11px;color:var(--text-secondary);margin-top:6px">API Key 將存儲在本地</div>
                </div>
                <div class="form-group">
                    <label>🤖 模型選擇</label>
                    <select id="model">
                        <!-- JS 將填充此選單 -->
                    </select>
                </div>
                <div class="form-group">
                    <label>📐 尺寸預設</label>
                    <select id="size">${sizeOptionsHTML}</select>
                </div>
                <div class="form-group">
                    <label>🎨 藝術風格</label>
                    <select id="style">${styleOptionsHTML}</select>
                </div>
                <div class="form-group">
                    <label>⏱️ 持續時間 (秒)</label>
                    <input type="number" id="duration" value="4" min="1" max="10">
                </div>
                <div class="form-group">
                    <label>🎞️ 幀率 (FPS)</label>
                    <input type="number" id="fps" value="8" min="1" max="30">
                </div>
                <button type="submit" class="btn btn-primary" id="generateBtn">🎬 開始生成</button>
            </form>
        </div>
    </div>
    
    <div class="card">
        <div class="card-header">
            <div class="card-title">🔧 進階參數</div>
            <button class="card-toggle" id="advancedToggle">▼</button>
        </div>
        <div class="card-content advanced-params" id="advancedParams">
            <div class="form-group">
                <label>🌱 Seed 值</label>
                <input type="number" id="seed" placeholder="留空為隨機" min="0" max="4294967295">
                <div style="font-size:11px;color:var(--text-secondary);margin-top:4px">相同的 Seed 會產生相同的結果</div>
            </div>
            <div class="form-group">
                <label>🚫 負面提示詞</label>
                <textarea id="negativePrompt" placeholder="描述你不想要的內容..." rows="3"></textarea>
            </div>
            <div class="form-group">
                <label>📏 自定義寬度</label>
                <input type="number" id="customWidth" placeholder="留空使用預設" min="64" max="1920">
            </div>
            <div class="form-group">
                <label>📐 自定義高度</label>
                <input type="number" id="customHeight" placeholder="留空使用預設" min="64" max="1920">
            </div>
            <div class="form-group">
                <label>🎯 CFG Scale</label>
                <input type="number" id="cfgScale" value="7.5" min="1" max="20" step="0.5">
                <div style="font-size:11px;color:var(--text-secondary);margin-top:4px">控制提示詞影響程度 (1-20)</div>
            </div>
        </div>
    </div>
</div>
<div class="center-panel">
    <div class="card">
        <div class="card-header">
            <div class="card-title">🎬 生成結果</div>
            <button class="btn btn-secondary btn-sm" id="clearResults">清除</button>
        </div>
        <div class="card-content">
            <div id="results">
                <div class="empty-state">
                    <div class="empty-icon">🎬</div>
                    <div class="empty-text">尚未生成任何影片</div>
                    <div class="empty-subtext">輸入提示詞並點擊「開始生成」</div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="right-panel">
    <div class="card">
        <div class="card-header">
            <div class="card-title">✍️ 提示詞輸入</div>
        </div>
        <div class="card-content">
            <div class="form-group">
                <textarea id="prompt" placeholder="描述你想要的影片..." rows="5" required></textarea>
            </div>
            <div class="form-group">
                <label>📷 參考圖片 (圖片轉影片)</label>
                <input type="file" id="imageUpload" accept="image/*" style="display:none">
                <div id="imageDropZone" class="drag-drop-zone">
                    <div class="drag-icon">📷</div>
                    <div class="drag-text">拖放圖片或點擊選擇</div>
                    <div class="drag-subtext">支援 JPG, PNG, GIF (最大 32MB)</div>
                </div>
                <textarea id="referenceImage" placeholder="圖片 URL (或上傳上方)" rows="2" style="margin-top:10px"></textarea>
            </div>
        </div>
    </div>
    
    <div class="card">
        <div class="card-header">
            <div class="card-title">📝 生成日誌</div>
            <button class="btn btn-secondary btn-sm" id="clearLogs">清除</button>
        </div>
        <div class="card-content">
            <div class="logs-container" id="logs">
                <div class="log-entry">等待生成...</div>
            </div>
        </div>
    </div>
    
    <div class="card">
        <div class="card-header">
            <div class="card-title">📜 生成歷史</div>
            <button class="btn btn-secondary btn-sm" id="clearHistory">清除</button>
        </div>
        <div class="card-content">
            <div id="history">
                <div class="empty-state" style="padding:20px">
                    <div class="empty-icon" style="font-size:32px">📜</div>
                    <div class="empty-text" style="font-size:12px">暫無歷史記錄</div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
<div class="footer">
    <span>Powered by Flux AI Pro • <a href="https://github.com/kinai9661/Flux-AI-Pro" target="_blank">Engine</a></span>
    <span style="opacity:0.5">|</span>
    <span style="opacity:0.9">友情鏈接: <a href="https://pollinations.ai" target="_blank">Pollinations.ai</a> • <a href="https://runwayml.com" target="_blank">Runway</a> • <a href="https://pika.art" target="_blank">Pika</a> • <a href="https://dofollow.tools" target="_blank"><img src="https://dofollow.tools/badge/badge_dark.svg" alt="Featured on Dofollow.Tools" width="200" height="54" /></a></span>
</div>
</div>
<script>
// 配置數據
const VIDEO_CONFIG = ${JSON.stringify(VIDEO_CONFIG, null, 2)};

// 狀態管理
let isGenerating = false;
let uploadedImageUrl = null;
let generationHistory = JSON.parse(localStorage.getItem('video_generation_history') || '[]');

// DOM 元素
const providerSelect = document.getElementById('provider');
const modelSelect = document.getElementById('model');
const apiKeyGroup = document.getElementById('apiKeyGroup');
const apiKeyInput = document.getElementById('apiKey');
const sizeSelect = document.getElementById('size');
const styleSelect = document.getElementById('style');
const durationInput = document.getElementById('duration');
const fpsInput = document.getElementById('fps');
const promptInput = document.getElementById('prompt');
const referenceImageInput = document.getElementById('referenceImage');
const generateBtn = document.getElementById('generateBtn');
const resultsDiv = document.getElementById('results');
const logsDiv = document.getElementById('logs');
const historyDiv = document.getElementById('history');
const themeToggle = document.getElementById('themeToggle');
const advancedToggle = document.getElementById('advancedToggle');
const advancedParams = document.getElementById('advancedParams');

// 主題切換
function initTheme() {
    const savedTheme = localStorage.getItem('video_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('video_theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
}

// 進階參數切換
advancedToggle.addEventListener('click', () => {
    advancedParams.classList.toggle('show');
    advancedToggle.textContent = advancedParams.classList.contains('show') ? '▲' : '▼';
});

// 檢查限流狀態
async function checkRateLimitStatus() {
    try {
        const response = await fetch('/api/video/status');
        const data = await response.json();
        
        // 更新配額狀態
        const quotaValue = document.getElementById('quotaValue');
        const quotaBar = document.getElementById('quotaBar');
        const quotaDetail = document.getElementById('quotaDetail');
        
        if (data.quota) {
            const remaining = data.quota.remaining;
            const limit = data.quota.limit;
            const percentage = (remaining / limit) * 100;
            
            quotaValue.textContent = \`\${remaining} / \${limit}\`;
            quotaBar.style.width = \`\${percentage}%\`;
            
            // 根據剩餘配額設置顏色
            quotaValue.className = 'rate-limit-value';
            quotaBar.className = 'rate-limit-bar-fill';
            
            if (remaining === 0) {
                quotaValue.classList.add('error');
                quotaBar.classList.add('error');
                quotaDetail.textContent = '⚠️ 已達配額上限，請等待一小時後重試';
            } else if (remaining <= 1) {
                quotaValue.classList.add('warning');
                quotaBar.classList.add('warning');
                quotaDetail.textContent = '⚠️ 配額即將用盡';
            } else {
                quotaValue.classList.add('success');
                quotaBar.classList.add('success');
                quotaDetail.textContent = '✅ 配額充足';
            }
        }
        
        // 更新冷卻狀態
        const cooldownValue = document.getElementById('cooldownValue');
        const cooldownBar = document.getElementById('cooldownBar');
        const cooldownDetail = document.getElementById('cooldownDetail');
        
        if (data.cooldown) {
            const remaining = data.cooldown.remaining;
            const total = data.cooldown.total;
            const percentage = ((total - remaining) / total) * 100;
            
            if (remaining > 0) {
                const minutes = Math.floor(remaining / 60);
                const seconds = remaining % 60;
                cooldownValue.textContent = \`\${minutes}:\${seconds.toString().padStart(2, '0')}\`;
                cooldownBar.style.width = \`\${percentage}%\`;
                cooldownValue.className = 'rate-limit-value warning';
                cooldownBar.className = 'rate-limit-bar-fill warning';
                cooldownDetail.textContent = '⏳ 冷卻中，請稍候...';
            } else {
                cooldownValue.textContent = '就緒';
                cooldownBar.style.width = '100%';
                cooldownValue.className = 'rate-limit-value success';
                cooldownBar.className = 'rate-limit-bar-fill success';
                cooldownDetail.textContent = '✅ 可以立即生成';
            }
        }
    } catch (error) {
        console.error('檢查限流狀態失敗:', error);
        document.getElementById('quotaValue').textContent = '無法獲取';
        document.getElementById('cooldownValue').textContent = '無法獲取';
        document.getElementById('quotaDetail').textContent = '❌ 無法檢查限流狀態';
        document.getElementById('cooldownDetail').textContent = '❌ 無法檢查冷卻狀態';
    }
}

// 檢查環境變數 API Key 配置
async function checkEnvApiKeyConfig(provider) {
    try {
        const response = await fetch(\`/api/video/config?provider=\${provider}\`);
        const data = await response.json();
        return data.hasEnvKey;
    } catch (error) {
        console.error('檢查環境變數配置失敗:', error);
        return false;
    }
}

// 更新模型選單
async function updateModelOptions() {
    const provider = providerSelect.value;
    const config = VIDEO_CONFIG.MODELS[provider];
    
    if (!config) return;
    
    // 檢查環境變數 API Key 配置
    const hasEnvKey = await checkEnvApiKeyConfig(provider);
    
    // 顯示/隱藏 API Key 輸入框
    // 如果環境變數已配置，隱藏 API Key 輸入框
    if (hasEnvKey) {
        apiKeyGroup.classList.remove('show');
        apiKeyInput.value = '';
    } else {
        apiKeyGroup.classList.add('show');
        const storedKey = localStorage.getItem(\`\${provider}_api_key\`);
        apiKeyInput.value = storedKey || '';
    }
    
    // 更新模型選單
    modelSelect.innerHTML = '';
    const groups = {};
    config.models.forEach(m => {
        const cat = m.category || 'other';
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(m);
    });
    
    for (const [cat, list] of Object.entries(groups)) {
        const optgroup = document.createElement('optgroup');
        optgroup.label = cat.toUpperCase();
        list.forEach(m => {
            const opt = document.createElement('option');
            opt.value = m.id;
            opt.textContent = m.name;
            // 將模型數據存儲在 dataset 屬性中
            opt.dataset.fps = m.fps || 24;
            opt.dataset.maxDuration = Math.min(m.maxDuration || 10, 10); // 限制最大為10秒
            opt.dataset.description = m.description || '';
            if (m.id === 'seedance-pro') opt.selected = true;
            optgroup.appendChild(opt);
        });
        modelSelect.appendChild(optgroup);
    }
    
    // 觸發模型參數更新
    updateModelParams();
}

// 根據選擇的模型自動更新 FPS 和持續時間
function updateModelParams() {
    const selectedOption = modelSelect.options[modelSelect.selectedIndex];
    if (!selectedOption) return;
    
    const modelFps = parseInt(selectedOption.dataset.fps) || 24;
    const modelMaxDuration = parseInt(selectedOption.dataset.maxDuration) || 10;
    const modelDescription = selectedOption.dataset.description || '';
    
    // 自動設置 FPS
    fpsInput.value = modelFps;
    
    // 自動設置持續時間（不超過模型最大值和10秒）
    const currentDuration = parseInt(durationInput.value) || 4;
    const newDuration = Math.min(currentDuration, modelMaxDuration);
    durationInput.value = newDuration;
    
    // 更新持續時間的最大值
    durationInput.max = modelMaxDuration;
    
    // 顯示模型限制提示
    showModelLimitHint(modelFps, modelMaxDuration, modelDescription);
}

// 顯示模型限制提示
function showModelLimitHint(fps, maxDuration, description) {
    // 檢查是否已存在提示元素
    let hintElement = document.getElementById('modelLimitHint');
    
    if (!hintElement) {
        // 創建提示元素
        hintElement = document.createElement('div');
        hintElement.id = 'modelLimitHint';
        hintElement.style.cssText = 'background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 8px; padding: 10px; margin-bottom: 14px; font-size: 12px; color: var(--text-secondary);';
        
        // 插入到模型選擇之後
        const modelGroup = modelSelect.closest('.form-group');
        if (modelGroup) {
            modelGroup.parentNode.insertBefore(hintElement, modelGroup.nextSibling);
        }
    }
    
    // 更新提示內容
    hintElement.innerHTML = \`
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
            <span style="font-size: 16px;">📋</span>
            <strong style="color: var(--accent-color);">模型參數限制</strong>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <div>
                <span style="opacity: 0.7;">幀率 (FPS):</span>
                <strong style="color: var(--text-primary);">\${fps}</strong>
            </div>
            <div>
                <span style="opacity: 0.7;">最大持續時間:</span>
                <strong style="color: var(--text-primary);">\${maxDuration}秒</strong>
            </div>
        </div>
        <div style="margin-top: 6px; font-size: 11px; opacity: 0.8;">
            \${description}
        </div>
    \`;
}

// 更新尺寸參數
function updateSizeParams() {
    const sizeKey = sizeSelect.value;
    const sizeConfig = VIDEO_CONFIG.PRESET_SIZES[sizeKey];
    
    if (sizeConfig) {
        // 尺寸預設不再自動覆蓋 FPS 和持續時間
        // 這些參數現在由模型決定
        // 只在用戶手動選擇尺寸時更新
        // durationInput.value = sizeConfig.duration;
        // fpsInput.value = sizeConfig.fps;
    }
}

// 持續時間輸入驗證
function validateDurationInput() {
    const selectedOption = modelSelect.options[modelSelect.selectedIndex];
    if (!selectedOption) return;
    
    const modelMaxDuration = parseInt(selectedOption.dataset.maxDuration) || 10;
    const inputValue = parseInt(durationInput.value);
    
    if (inputValue > modelMaxDuration) {
        durationInput.value = modelMaxDuration;
        addLog(\`持續時間已自動調整為模型最大值 \${modelMaxDuration}秒\`, 'warning');
    }
}

// 添加日誌
function addLog(message, type = 'info') {
    const time = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    logEntry.className = \`log-entry \${type}\`;
    logEntry.textContent = \`[\${time}] \${message}\`;
    logsDiv.appendChild(logEntry);
    logsDiv.scrollTop = logsDiv.scrollHeight;
}

// 清除日誌
document.getElementById('clearLogs').addEventListener('click', () => {
    logsDiv.innerHTML = '<div class="log-entry">等待生成...</div>';
});

// 清除結果
document.getElementById('clearResults').addEventListener('click', () => {
    resultsDiv.innerHTML = \`
        <div class="empty-state">
            <div class="empty-icon">🎬</div>
            <div class="empty-text">尚未生成任何影片</div>
            <div class="empty-subtext">輸入提示詞並點擊「開始生成」</div>
        </div>
    \`;
});

// 保存歷史記錄
function saveToHistory(data) {
    const historyItem = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        prompt: data.prompt,
        provider: data.provider,
        model: data.model,
        style: data.style,
        width: data.width,
        height: data.height,
        fps: data.fps,
        duration: data.duration,
        url: data.url
    };
    
    generationHistory.unshift(historyItem);
    if (generationHistory.length > 20) {
        generationHistory = generationHistory.slice(0, 20);
    }
    
    localStorage.setItem('video_generation_history', JSON.stringify(generationHistory));
    renderHistory();
}

// 渲染歷史記錄
function renderHistory() {
    if (generationHistory.length === 0) {
        historyDiv.innerHTML = \`
            <div class="empty-state" style="padding:20px">
                <div class="empty-icon" style="font-size:32px">📜</div>
                <div class="empty-text" style="font-size:12px">暫無歷史記錄</div>
            </div>
        \`;
        return;
    }
    
    historyDiv.innerHTML = '';
    generationHistory.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = \`
            <div class="history-meta">
                <span class="history-prompt">\${item.prompt || '無提示詞'}</span>
                <span class="history-time">\${new Date(item.timestamp).toLocaleString()}</span>
            </div>
            <div class="history-badges">
                <span class="history-badge">\${item.provider}</span>
                <span class="history-badge">\${item.model}</span>
                <span class="history-badge">\${item.width}x\${item.height}</span>
            </div>
        \`;
        historyItem.addEventListener('click', () => {
            promptInput.value = item.prompt;
            providerSelect.value = item.provider;
            // updateModelOptions() 會由 change 事件自動觸發
            modelSelect.value = item.model;
            styleSelect.value = item.style;
            durationInput.value = item.duration;
            fpsInput.value = item.fps;
            displayVideo(item);
        });
        historyDiv.appendChild(historyItem);
    });
}

// 清除歷史記錄
document.getElementById('clearHistory').addEventListener('click', () => {
    if (confirm('確定要清除所有歷史記錄嗎？')) {
        generationHistory = [];
        localStorage.removeItem('video_generation_history');
        renderHistory();
    }
});

// 拖放功能
const imageDropZone = document.getElementById('imageDropZone');
const imageUpload = document.getElementById('imageUpload');

imageDropZone.addEventListener('click', () => imageUpload.click());

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    imageDropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
});

['dragenter', 'dragover'].forEach(eventName => {
    imageDropZone.addEventListener(eventName, () => imageDropZone.classList.add('drag-over'));
});

['dragleave', 'drop'].forEach(eventName => {
    imageDropZone.addEventListener(eventName, () => imageDropZone.classList.remove('drag-over'));
});

imageDropZone.addEventListener('drop', async (e) => {
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        await handleImageUpload(files[0]);
    }
});

imageUpload.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file) {
        await handleImageUpload(file);
    }
});

async function handleImageUpload(file) {
    if (file.size > 32 * 1024 * 1024) {
        alert('圖片太大！最大 32MB');
        return;
    }
    
    if (!file.type.startsWith('image/')) {
        alert('請選擇圖片文件');
        return;
    }
    
    const formData = new FormData();
    formData.append('fileToUpload', file);
    
    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            const data = await response.json();
            if (data.url) {
                uploadedImageUrl = data.url;
                referenceImageInput.value = data.url;
                imageDropZone.innerHTML = '<div class="drag-icon">✅</div><div class="drag-text">上傳成功！</div>';
                addLog('圖片上傳成功: ' + data.url, 'success');
            }
        }
    } catch (error) {
        addLog('圖片上傳失敗: ' + error.message, 'error');
    }
}

// 生成影片
document.getElementById('videoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (isGenerating) return;
    
    const prompt = promptInput.value.trim();
    if (!prompt && !uploadedImageUrl) {
        alert('請輸入提示詞或上傳參考圖片');
        return;
    }
    
    isGenerating = true;
    generateBtn.disabled = true;
    generateBtn.textContent = '生成中...';
    
    // 保存 API Key（Pollinations 現在也需要 API Key）
    const provider = providerSelect.value;
    localStorage.setItem(\`\${provider}_api_key\`, apiKeyInput.value);
    
    // 清空日誌
    logsDiv.innerHTML = '';
    addLog('開始影片生成...', 'info');
    
    // 顯示加載動畫
    resultsDiv.innerHTML = '<div class="loading"><div class="spinner"></div><p>生成中，請稍候...</p></div>';
    
    const sizeConfig = VIDEO_CONFIG.PRESET_SIZES[sizeSelect.value];
    
    // 獲取進階參數
    const seedInput = document.getElementById('seed');
    const negativePromptInput = document.getElementById('negativePrompt');
    const customWidthInput = document.getElementById('customWidth');
    const customHeightInput = document.getElementById('customHeight');
    const cfgScaleInput = document.getElementById('cfgScale');
    
    try {
        const response = await fetch('/api/video/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: prompt,
                provider: provider,
                model: modelSelect.value,
                width: customWidthInput.value ? parseInt(customWidthInput.value) : sizeConfig.width,
                height: customHeightInput.value ? parseInt(customHeightInput.value) : sizeConfig.height,
                fps: parseInt(fpsInput.value),
                duration: parseInt(durationInput.value),
                style: styleSelect.value,
                reference_image: uploadedImageUrl || referenceImageInput.value,
                api_key: apiKeyInput.value,
                seed: seedInput.value ? parseInt(seedInput.value) : null,
                negative_prompt: negativePromptInput.value.trim() || null,
                cfg_scale: parseFloat(cfgScaleInput.value),
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            addLog('影片生成成功！', 'success');
            data.prompt = prompt;
            displayVideo(data);
            saveToHistory(data);
        } else {
            throw new Error(data.error || '生成失敗');
        }
    } catch (error) {
        addLog('生成失敗: ' + error.message, 'error');
        resultsDiv.innerHTML = '<div class="loading"><p style="color:var(--error-color)">生成失敗: ' + error.message + '</p></div>';
    } finally {
        isGenerating = false;
        generateBtn.disabled = false;
        generateBtn.textContent = '🎬 開始生成';
    }
});

// 顯示影片
function displayVideo(data) {
    const videoContainer = document.createElement('div');
    videoContainer.className = 'video-container';
    videoContainer.innerHTML = \`
        <video controls autoplay loop>
            <source src="\${data.url}" type="video/mp4">
            您的瀏覽器不支援影片播放。
        </video>
        <div class="video-info">
            <div class="video-meta">
                <span class="provider-badge">\${data.provider}</span>
                <span class="model-badge">\${data.model}</span>
                <span class="style-badge">\${data.style}</span>
            </div>
            <div style="font-size:12px;color:var(--text-secondary);margin-top:8px">
                \${data.width}x\${data.height} | \${data.fps}fps | \${data.duration}s
            </div>
            <div style="margin-top:10px;display:flex;gap:10px">
                <a href="\${data.url}" download="video.mp4" class="btn btn-primary" style="text-decoration:none;padding:8px 16px;font-size:12px;flex:1">📥 下載影片</a>
                <button class="btn btn-secondary" onclick="navigator.clipboard.writeText('\${data.url}')" style="padding:8px 16px;font-size:12px">📋 複製連結</button>
            </div>
        </div>
    \`;
    resultsDiv.innerHTML = '';
    resultsDiv.appendChild(videoContainer);
}

// 事件監聽
providerSelect.addEventListener('change', updateModelOptions);
modelSelect.addEventListener('change', updateModelParams);
sizeSelect.addEventListener('change', updateSizeParams);
durationInput.addEventListener('input', validateDurationInput);
durationInput.addEventListener('change', validateDurationInput);
themeToggle.addEventListener('click', toggleTheme);
document.getElementById('refreshRateLimit').addEventListener('click', checkRateLimitStatus);

// 初始化
initTheme();
updateModelOptions();
updateSizeParams();
renderHistory();
checkRateLimitStatus();

// 每30秒自動刷新限流狀態
setInterval(checkRateLimitStatus, 30000);
</script>
</body>
</html>`;

  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8', ...corsHeaders() } });
}

/**
 * 處理影片 Nano 頁面 (簡化版)
 */
function handleVideoNanoPage(request, env) {
  const url = new URL(request.url);
  const currentLang = url.searchParams.get('lang') || 'zh';

  // 簡化版配置
  const nanoModels = [
    { id: 'svd', name: 'Stable Video Diffusion', provider: 'pollinations' },
    { id: 'svd-xt', name: 'SVD XT', provider: 'pollinations' },
    { id: 'animatediff', name: 'AnimateDiff', provider: 'pollinations' },
  ];

  const html = `<!DOCTYPE html>
<html lang="${currentLang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Flux AI Pro - 影片生成 Nano</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎬</text></svg>">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;background:linear-gradient(135deg,#0a0a0a 0%,#1a1a2e 100%);color:#fff;min-height:100vh}
.container{max-width:800px;margin:0 auto;padding:20px}
.header{display:flex;justify-content:space-between;align-items:center;margin-bottom:30px;padding:20px;background:rgba(255,255,255,0.05);border-radius:12px}
.logo{color:#f59e0b;font-size:24px;font-weight:800}
.nav-btn{padding:8px 16px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#9ca3af;cursor:pointer;font-size:14px;text-decoration:none;transition:all 0.3s}
.nav-btn:hover{border-color:#f59e0b;color:#fff}
.form-group{margin-bottom:16px}
label{display:block;margin-bottom:6px;font-weight:600;font-size:13px;color:#e5e7eb}
input,textarea,select{width:100%;padding:12px;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.2);border-radius:8px;color:#fff;font-size:14px;transition:all 0.3s}
input:focus,textarea:focus,select:focus{outline:none;border-color:#f59e0b;box-shadow:0 0 0 3px rgba(245,158,11,0.1)}
.btn{padding:14px 28px;border:none;border-radius:8px;font-size:16px;font-weight:700;cursor:pointer;transition:all 0.3s;display:inline-flex;align-items:center;gap:8px;justify-content:center;width:100%}
.btn-primary{background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#fff;box-shadow:0 4px 15px rgba(245,158,11,0.3)}
.btn-primary:disabled{opacity:0.5;cursor:not-allowed}
.video-container{background:rgba(0,0,0,0.4);border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);margin-top:20px}
.video-container video{width:100%;display:block}
.loading{text-align:center;padding:40px 20px;color:#9ca3af}
.spinner{border:3px solid rgba(255,255,255,0.1);border-top:3px solid #f59e0b;border-radius:50%;width:40px;height:40px;animation:spin 1s linear infinite;margin:0 auto 15px}
@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
</style>
</head>
<body>
<div class="container">
<div class="header">
    <div class="logo">🎬 Flux AI Pro <span style="font-size:12px;background:#f59e0b;padding:4px 8px;border-radius:6px">Nano</span></div>
    <div>
        <a href="/" class="nav-btn">🎨 圖像</a>
        <a href="/video" class="nav-btn">🎬 影片</a>
    </div>
</div>
<form id="nanoForm">
    <div class="form-group">
        <label>✍️ 提示詞</label>
        <textarea id="prompt" placeholder="描述你想要的影片..." rows="4" required></textarea>
    </div>
    <div class="form-group">
        <label>🤖 模型</label>
        <select id="model">
            ${nanoModels.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
        </select>
    </div>
    <div class="form-group">
        <label>📐 尺寸</label>
        <select id="size">
            <option value="480">480p (快速)</option>
            <option value="720">720p (標準)</option>
        </select>
    </div>
    <button type="submit" class="btn btn-primary" id="generateBtn">🎬 生成影片</button>
</form>
<div id="results"></div>
</div>
<script>
const nanoModels = ${JSON.stringify(nanoModels)};

document.getElementById('nanoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const btn = document.getElementById('generateBtn');
    const results = document.getElementById('results');
    const prompt = document.getElementById('prompt').value.trim();
    const model = document.getElementById('model').value;
    const size = document.getElementById('size').value;
    
    if (!prompt) return;
    
    btn.disabled = true;
    btn.textContent = '生成中...';
    results.innerHTML = '<div class="loading"><div class="spinner"></div><p>生成中，請稍候...</p></div>';
    
    try {
        const response = await fetch('/api/video/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: prompt,
                provider: 'pollinations',
                model: model,
                width: parseInt(size),
                height: parseInt(size),
                fps: 8,
                duration: 4,
                style: 'none',
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            results.innerHTML = \`
                <div class="video-container">
                    <video controls autoplay loop>
                        <source src="\${data.url}" type="video/mp4">
                    </video>
                </div>
                <div style="margin-top:15px;text-align:center">
                    <a href="\${data.url}" download="video.mp4" class="btn btn-primary" style="text-decoration:none">📥 下載影片</a>
                </div>
            \`;
        } else {
            throw new Error(data.error || '生成失敗');
        }
    } catch (error) {
        results.innerHTML = '<div class="loading"><p style="color:#ef4444">生成失敗: ' + error.message + '</p></div>';
    } finally {
        btn.disabled = false;
        btn.textContent = '🎬 生成影片';
    }
});
</script>
</body>
</html>`;

  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8', ...corsHeaders() } });
}

// =================================================================================
// 導出函數供 worker.js 使用
// =================================================================================
export { handleVideoAPI, handleVideoPage, handleVideoNanoPage };

// =================================================================================
// 整合完成！
// =================================================================================
// 請按照上述步驟將代碼添加到 worker.js 中
//
// 整合後的路由：
// - /video - 影片生成主頁面
// - /video/nano - 影片生成 Nano 版
// - /api/video/generate - 影片生成 API
// - /api/video/models - 獲取模型列表
// - /api/video/styles - 獲取風格列表
// - /api/video/sizes - 獲取尺寸預設
// =================================================================================

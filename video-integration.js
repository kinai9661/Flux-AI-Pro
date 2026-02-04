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
        { id: 'svd', name: 'Stable Video Diffusion', category: 'text-to-video', fps: 8, maxDuration: 4, description: '基於 Stable Diffusion 的影片生成模型' },
        { id: 'svd-xt', name: 'SVD XT', category: 'text-to-video', fps: 8, maxDuration: 4, description: 'SVD 的增強版本，質量更高' },
        { id: 'animatediff', name: 'AnimateDiff', category: 'text-to-video', fps: 8, maxDuration: 4, description: '專注於動畫風格的影片生成' },
        { id: 'zeroscope', name: 'ZeroScope', category: 'text-to-video', fps: 8, maxDuration: 4, description: '高質量影片生成模型' },
        { id: 'modelscope', name: 'ModelScope', category: 'text-to-video', fps: 8, maxDuration: 4, description: 'ModelScope 影片生成模型' },
        { id: 'cogvideox', name: 'CogVideoX', category: 'text-to-video', fps: 8, maxDuration: 4, description: '智譜 AI 的影片生成模型' },
        { id: 'seedance-pro', name: 'Seedance Pro', category: 'text-to-video', fps: 24, maxDuration: 5, description: 'Seedance Pro 專業級影片生成模型' },
        { id: 'seedance', name: 'Seedance', category: 'text-to-video', fps: 24, maxDuration: 5, description: 'Seedance 高品質影片生成模型' },
        { id: 'wan', name: 'Wan', category: 'text-to-video', fps: 24, maxDuration: 5, description: 'Wan 影片生成模型' },
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
      baseUrl: 'https://image.pollinations.ai/video',
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
  constructor(config = VIDEO_CONFIG) {
    this.config = config;
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
   */
  async generatePollinations(prompt, options) {
    const { model, width, height, fps, duration, referenceImage } = options;
    const apiConfig = this.config.API.pollinations;

    // 構建 URL
    let url = `${apiConfig.baseUrl}/${encodeURIComponent(prompt)}`;
    const params = new URLSearchParams();
    params.append('model', model);
    params.append('width', width);
    params.append('height', height);
    params.append('fps', fps);
    params.append('duration', duration);

    if (referenceImage) {
      params.append('image', referenceImage);
    }

    url += `?${params.toString()}`;

    this.logger.add('📤 發送請求到 Pollinations', { url });

    const response = await fetchWithTimeout(url, {}, apiConfig.timeout);

    if (!response.ok) {
      throw new Error(`Pollinations API 錯誤: ${response.status} ${response.statusText}`);
    }

    // Pollinations 直接返回影片文件
    const blob = await response.blob();
    const videoUrl = URL.createObjectURL(blob);

    return { url: videoUrl };
  }

  /**
   * Runway 影片生成
   */
  async generateRunway(prompt, options) {
    const { model, width, height, fps, duration, referenceImage, apiKey } = options;
    const apiConfig = this.config.API.runway;

    if (!apiKey) {
      throw new Error('Runway 需要 API Key');
    }

    const headers = {
      'Authorization': `Bearer ${apiKey}`,
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

    if (!apiKey) {
      throw new Error('Pika 需要 API Key');
    }

    const headers = {
      'Authorization': `Bearer ${apiKey}`,
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

    if (!apiKey) {
      throw new Error('Luma 需要 API Key');
    }

    const headers = {
      'Authorization': `Bearer ${apiKey}`,
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

    if (!apiKey) {
      throw new Error('Kling 需要 API Key');
    }

    const headers = {
      'Authorization': `Bearer ${apiKey}`,
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

      // 檢查影片生成限流和冷卻
      const rateLimiter = new VideoRateLimiter(env);
      const ip = rateLimiter.getClientIP(request);
      const limitCheck = await rateLimiter.checkAndRecord(ip);

      if (!limitCheck.allowed) {
        return new Response(JSON.stringify({
          error: limitCheck.reason,
          code: limitCheck.waitSeconds ? 'COOLDOWN' : 'QUOTA_EXCEEDED',
          waitSeconds: limitCheck.waitSeconds,
          remaining: limitCheck.remaining,
          resetTime: limitCheck.resetTime
        }), {
          status: 429,
          headers: corsHeaders({ 'Content-Type': 'application/json' }),
        });
      }

      const videoGenerator = new VideoGenerator();
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

      if (result.success) {
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
<html lang="${currentLang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Flux AI Pro - 影片生成</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎬</text></svg>">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;background:linear-gradient(135deg,#0a0a0a 0%,#1a1a2e 100%);color:#fff;min-height:100vh}
.container{max-width:100%;margin:0;padding:0;height:100vh;display:flex;flex-direction:column}
.top-nav{background:rgba(255,255,255,0.05);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,0.1);padding:15px 25px;display:flex;justify-content:space-between;align-items:center;flex-shrink:0}
.nav-left{display:flex;align-items:center;gap:20px}
.logo{color:#f59e0b;font-size:24px;font-weight:800;text-shadow:0 0 20px rgba(245,158,11,0.6);display:flex;align-items:center;gap:10px}
.nav-menu{display:flex;gap:10px;align-items:center}
.nav-btn{padding:8px 16px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#9ca3af;cursor:pointer;font-size:14px;font-weight:600;transition:all 0.3s;display:flex;align-items:center;gap:6px;text-decoration:none}
.nav-btn:hover{border-color:#f59e0b;color:#fff}
.nav-btn.active{background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#fff;border-color:#f59e0b}
.main-content{flex:1;display:flex;overflow:hidden}
.left-panel{width:320px;background:rgba(255,255,255,0.03);border-right:1px solid rgba(255,255,255,0.1);overflow-y:auto;padding:20px;flex-shrink:0}
.center-panel{flex:1;padding:20px;overflow-y:auto}
.right-panel{width:380px;background:rgba(255,255,255,0.03);border-left:1px solid rgba(255,255,255,0.1);overflow-y:auto;padding:20px;flex-shrink:0}
@media(max-width:1024px){.main-content{flex-direction:column}.left-panel,.right-panel{width:100%;border:none;border-bottom:1px solid rgba(255,255,255,0.1)}}
.form-group{margin-bottom:16px}
label{display:block;margin-bottom:6px;font-weight:600;font-size:13px;color:#e5e7eb}
input,textarea,select{width:100%;padding:10px;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.2);border-radius:8px;color:#fff;font-size:13px;transition:all 0.3s}
input:focus,textarea:focus,select:focus{outline:none;border-color:#f59e0b;box-shadow:0 0 0 3px rgba(245,158,11,0.1)}
select{background-color:#1e293b!important;color:#e2e8f0!important;cursor:pointer}
.btn{padding:12px 24px;border:none;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.3s;display:inline-flex;align-items:center;gap:8px;justify-content:center;width:100%}
.btn-primary{background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#fff;box-shadow:0 4px 15px rgba(245,158,11,0.3)}
.btn-primary:disabled{opacity:0.5;cursor:not-allowed}
.video-container{background:rgba(0,0,0,0.4);border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);margin-bottom:20px}
.video-container video{width:100%;display:block}
.video-info{padding:15px}
.video-meta{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:5px}
.model-badge,.provider-badge,.style-badge{padding:4px 10px;border-radius:6px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.1)}
.loading{text-align:center;padding:60px 20px;color:#9ca3af}
.spinner{border:3px solid rgba(255,255,255,0.1);border-top:3px solid #f59e0b;border-radius:50%;width:40px;height:40px;animation:spin 1s linear infinite;margin:0 auto 15px}
@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
.drag-drop-zone{border:2px dashed rgba(255,255,255,0.2);border-radius:12px;padding:20px;text-align:center;transition:all 0.3s ease;cursor:pointer;background:rgba(0,0,0,0.2);min-height:100px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px}
.drag-drop-zone:hover{border-color:rgba(245,158,11,0.5);background:rgba(245,158,11,0.05)}
.drag-drop-zone.drag-over{border-color:#f59e0b;background:rgba(245,158,11,0.15);transform:scale(1.02)}
.drag-drop-zone .drag-icon{font-size:32px;opacity:0.7}
.drag-drop-zone .drag-text{font-size:13px;color:#9ca3af}
.drag-drop-zone .drag-subtext{font-size:11px;color:#6b7280}
.footer{padding:20px;text-align:center;font-size:12px;color:#64748b;border-top:1px solid rgba(255,255,255,0.05);margin-top:auto;line-height:1.8}
.footer a{color:#fbbf24;text-decoration:none;transition:0.3s;margin:0 4px}
.footer a:hover{text-decoration:underline;color:#f59e0b}
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
    </div>
</div>
<div class="main-content">
<div class="left-panel">
    <div style="font-size:16px;font-weight:700;margin-bottom:20px;color:#f59e0b">⚙️ 影片參數</div>
    <form id="videoForm">
        <div class="form-group">
            <label>🏢 供應商</label>
            <select id="provider">${providerOptionsHTML}</select>
        </div>
        <div class="form-group" id="apiKeyGroup" style="display:none;background:rgba(245,158,11,0.1);padding:10px;border-radius:8px;border:1px solid rgba(245,158,11,0.3)">
            <label>API Key</label>
            <input type="password" id="apiKey" placeholder="輸入 API Key">
            <div style="font-size:11px;color:#ccc;margin-top:6px">API Key 將存儲在本地</div>
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
<div class="center-panel">
    <div id="results">
        <div class="loading">
            <div style="font-size:48px;margin-bottom:20px">🎬</div>
            <p>尚未生成任何影片</p>
            <p style="font-size:12px;color:#6b7280;margin-top:10px">輸入提示詞並點擊「開始生成」</p>
        </div>
    </div>
</div>
<div class="right-panel">
    <div class="form-group">
        <label>✍️ 提示詞</label>
        <textarea id="prompt" placeholder="描述你想要的影片..." rows="6" required></textarea>
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
    <div class="form-group">
        <label>📝 生成日誌</label>
        <div id="logs" style="background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:10px;height:200px;overflow-y:auto;font-size:11px;font-family:monospace;color:#9ca3af">
            <div>等待生成...</div>
        </div>
    </div>
</div>
</div>
<div class="footer">
    <span>Powered by Flux AI Pro • <a href="https://github.com/kinai9661/Flux-AI-Pro" target="_blank">Engine</a></span>
    <span style="opacity:0.5">|</span>
    <span style="opacity:0.9">友情鏈接: <a href="https://pollinations.ai" target="_blank">Pollinations.ai</a> • <a href="https://runwayml.com" target="_blank">Runway</a> • <a href="https://pika.art" target="_blank">Pika</a></span>
</div>
</div>
<script>
// 配置數據
const VIDEO_CONFIG = ${JSON.stringify(VIDEO_CONFIG)};

// 狀態管理
let isGenerating = false;
let uploadedImageUrl = null;

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

// 更新模型選單
function updateModelOptions() {
    const provider = providerSelect.value;
    const config = VIDEO_CONFIG.MODELS[provider];
    
    if (!config) return;
    
    // 顯示/隱藏 API Key 輸入框
    if (provider === 'pollinations') {
        apiKeyGroup.style.display = 'none';
    } else {
        apiKeyGroup.style.display = 'block';
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
            if (m.id === 'svd') opt.selected = true;
            optgroup.appendChild(opt);
        });
        modelSelect.appendChild(optgroup);
    }
}

// 更新尺寸參數
function updateSizeParams() {
    const sizeKey = sizeSelect.value;
    const sizeConfig = VIDEO_CONFIG.PRESET_SIZES[sizeKey];
    
    if (sizeConfig) {
        durationInput.value = sizeConfig.duration;
        fpsInput.value = sizeConfig.fps;
    }
}

// 添加日誌
function addLog(message, type = 'info') {
    const time = new Date().toLocaleTimeString();
    const color = type === 'error' ? '#ef4444' : type === 'success' ? '#22c55e' : '#9ca3af';
    const logEntry = document.createElement('div');
    logEntry.style.color = color;
    logEntry.textContent = \`[\${time}] \${message}\`;
    logsDiv.appendChild(logEntry);
    logsDiv.scrollTop = logsDiv.scrollHeight;
}

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
    
    // 保存 API Key
    const provider = providerSelect.value;
    if (provider !== 'pollinations') {
        localStorage.setItem(\`\${provider}_api_key\`, apiKeyInput.value);
    }
    
    // 清空日誌
    logsDiv.innerHTML = '';
    addLog('開始影片生成...', 'info');
    
    // 顯示加載動畫
    resultsDiv.innerHTML = '<div class="loading"><div class="spinner"></div><p>生成中，請稍候...</p></div>';
    
    const sizeConfig = VIDEO_CONFIG.PRESET_SIZES[sizeSelect.value];
    
    try {
        const response = await fetch('/api/video/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: prompt,
                provider: provider,
                model: modelSelect.value,
                width: sizeConfig.width,
                height: sizeConfig.height,
                fps: parseInt(fpsInput.value),
                duration: parseInt(durationInput.value),
                style: styleSelect.value,
                reference_image: uploadedImageUrl || referenceImageInput.value,
                api_key: apiKeyInput.value,
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            addLog('影片生成成功！', 'success');
            displayVideo(data);
        } else {
            throw new Error(data.error || '生成失敗');
        }
    } catch (error) {
        addLog('生成失敗: ' + error.message, 'error');
        resultsDiv.innerHTML = '<div class="loading"><p style="color:#ef4444">生成失敗: ' + error.message + '</p></div>';
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
            <div style="font-size:12px;color:#9ca3af;margin-top:8px">
                \${data.width}x\${data.height} | \${data.fps}fps | \${data.duration}s
            </div>
            <div style="margin-top:10px">
                <a href="\${data.url}" download="video.mp4" class="btn btn-primary" style="text-decoration:none;padding:8px 16px;font-size:12px">📥 下載影片</a>
            </div>
        </div>
    \`;
    resultsDiv.innerHTML = '';
    resultsDiv.appendChild(videoContainer);
}

// 事件監聽
providerSelect.addEventListener('change', updateModelOptions);
sizeSelect.addEventListener('change', updateSizeParams);

// 初始化
updateModelOptions();
updateSizeParams();
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

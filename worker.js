// ============================================
// 🔧 配置部分 - Pollinations Worker v9.5.3
// ============================================

const CONFIG = {
  VERSION: "9.5.3-gen-api",
  MAX_TIMEOUT: 30000,
  
  // ✅ 更新：新的 API 端點配置
  PROVIDERS: {
    pollinations: {
      name: "Pollinations.ai",
      endpoint: "https://gen.pollinations.ai",  // ← 新端點
      pathPrefix: "/image",                      // ← 路徑前綴
      type: "direct",
      requiresAuth: true                         // ← 需要認證
    }
  },
  
  // ✅ 更新：認證配置
  POLLINATIONS_AUTH: {
    enabled: true,                               // ← 默認啟用
    token: "",                                   // 將從環境變量讀取
    method: "bearer",                            // ← Bearer Token
    headerName: "Authorization"                  // ← Header 名稱
  },
  
  // 模型配置
  MODELS: {
    zimage: {
      name: "ZImage",
      id: "zimage",
      description: "高質量圖片生成，細節豐富",
      supportsSize: true,
      supportsEnhance: true,
      defaultSize: { width: 1024, height: 1024 },
      maxSize: { width: 2048, height: 2048 }
    },
    flux: {
      name: "FLUX",
      id: "flux",
      description: "最新穩定擴散模型，平衡質量與速度",
      supportsSize: true,
      supportsEnhance: true,
      defaultSize: { width: 1024, height: 1024 },
      maxSize: { width: 2048, height: 2048 }
    },
    turbo: {
      name: "Turbo",
      id: "turbo",
      description: "快速生成模式，適合預覽",
      supportsSize: true,
      supportsEnhance: false,
      defaultSize: { width: 1024, height: 1024 },
      maxSize: { width: 1536, height: 1536 }
    },
    kontext: {
      name: "Kontext",
      id: "kontext",
      description: "圖生圖模型，需提供參考圖片",
      supportsSize: true,
      supportsEnhance: false,
      supportsImageInput: true,
      defaultSize: { width: 1024, height: 1024 },
      maxSize: { width: 2048, height: 2048 }
    }
  },
  
  // 尺寸預設
  PRESET_SIZES: {
    square: { width: 1024, height: 1024, label: "正方形 1:1" },
    portrait: { width: 768, height: 1024, label: "豎版 3:4" },
    landscape: { width: 1024, height: 768, label: "橫版 4:3" },
    wide: { width: 1536, height: 640, label: "寬屏 21:9" }
  },
  
  // 質量模式
  QUALITY_MODES: {
    draft: { steps: 15, guidance: 5, label: "草稿" },
    standard: { steps: 20, guidance: 7.5, label: "標準" },
    high: { steps: 30, guidance: 10, label: "高質量" }
  },
  
  // 速率限制配置
  RATE_LIMIT: {
    enabled: false,
    windowMs: 60000,
    maxRequests: 10
  }
};
// ============================================
// 🛠️ 初始化和工具函數
// ============================================

/**
 * 初始化配置（從環境變量讀取）
 */
function initializeConfig(env) {
  const config = { ...CONFIG };
  
  // ✅ 從環境變量讀取 API Key
  if (env.POLLINATIONS_API_KEY) {
    config.POLLINATIONS_AUTH.enabled = true;
    config.POLLINATIONS_AUTH.token = env.POLLINATIONS_API_KEY;
    console.log('✅ Pollinations API Key loaded');
  } else {
    console.warn('⚠️ POLLINATIONS_API_KEY not found - API calls will fail');
  }
  
  // 可選：自定義端點
  if (env.POLLINATIONS_ENDPOINT) {
    config.PROVIDERS.pollinations.endpoint = env.POLLINATIONS_ENDPOINT;
    console.log(`📍 Custom endpoint: ${env.POLLINATIONS_ENDPOINT}`);
  }
  
  // 可選：自定義路徑前綴
  if (env.POLLINATIONS_PATH_PREFIX) {
    config.PROVIDERS.pollinations.pathPrefix = env.POLLINATIONS_PATH_PREFIX;
  }
  
  return config;
}

/**
 * 生成隨機種子
 */
function generateSeed() {
  return Math.floor(Math.random() * 1000000);
}

/**
 * 驗證參數
 */
function validateParams(params) {
  const errors = [];
  
  // 檢查提示詞
  if (!params.prompt || typeof params.prompt !== 'string') {
    errors.push('prompt is required and must be a string');
  } else if (params.prompt.length > 2000) {
    errors.push('prompt must be less than 2000 characters');
  }
  
  // 檢查模型
  if (params.model && !CONFIG.MODELS[params.model]) {
    errors.push(`Invalid model: ${params.model}. Available: ${Object.keys(CONFIG.MODELS).join(', ')}`);
  }
  
  // 檢查尺寸
  if (params.width) {
    const w = parseInt(params.width);
    if (isNaN(w) || w < 256 || w > 2048) {
      errors.push('width must be between 256 and 2048');
    }
  }
  
  if (params.height) {
    const h = parseInt(params.height);
    if (isNaN(h) || h < 256 || h > 2048) {
      errors.push('height must be between 256 and 2048');
    }
  }
  
  // 檢查數量
  if (params.n) {
    const n = parseInt(params.n);
    if (isNaN(n) || n < 1 || n > 4) {
      errors.push('n must be between 1 and 4');
    }
  }
  
  return errors;
}

/**
 * 清理和優化提示詞
 */
function optimizePrompt(prompt) {
  return prompt
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s,.:;!?()-]/g, '');
}

/**
 * 記錄請求
 */
function logRequest(params, url) {
  console.log('📤 Request:', {
    model: params.model,
    size: `${params.width}x${params.height}`,
    seed: params.seed,
    url: url.substring(0, 100) + '...'
  });
}
// ============================================
// 🔗 URL 構建函數
// ============================================

/**
 * ✅ 更新：構建 Pollinations API URL
 */
function buildPollinationsURL(params, config) {
  const provider = config.PROVIDERS.pollinations;
  
  // 構建基礎 URL
  const baseURL = `${provider.endpoint}${provider.pathPrefix}`;
  
  // URL 編碼提示詞
  const encodedPrompt = encodeURIComponent(params.prompt);
  
  // 構建完整 URL：https://gen.pollinations.ai/image/{prompt}
  const url = new URL(`${baseURL}/${encodedPrompt}`);
  
  // 添加查詢參數
  if (params.model) {
    url.searchParams.set('model', params.model);
  }
  
  if (params.width) {
    url.searchParams.set('width', params.width);
  }
  
  if (params.height) {
    url.searchParams.set('height', params.height);
  }
  
  if (params.seed) {
    url.searchParams.set('seed', params.seed);
  }
  
  // 可選參數
  if (params.nologo === true) {
    url.searchParams.set('nologo', 'true');
  }
  
  if (params.private === true) {
    url.searchParams.set('private', 'true');
  }
  
  if (params.enhance === true) {
    url.searchParams.set('enhance', 'true');
  }
  
  if (params.safe === true) {
    url.searchParams.set('safe', 'true');
  }
  
  // Kontext 模型的參考圖片
  if (params.model === 'kontext' && params.image) {
    url.searchParams.set('image', params.image);
  }
  
  // 高級參數
  if (params.guidance) {
    url.searchParams.set('guidance', params.guidance);
  }
  
  if (params.steps) {
    url.searchParams.set('steps', params.steps);
  }
  
  return url.toString();
}

/**
 * 批量構建 URL（支持多張圖片）
 */
function buildMultipleURLs(params, config, count) {
  const urls = [];
  const baseSeed = params.seed || generateSeed();
  
  for (let i = 0; i < count; i++) {
    const singleParams = {
      ...params,
      seed: baseSeed + i  // 每張圖片使用不同的種子
    };
    urls.push(buildPollinationsURL(singleParams, config));
  }
  
  return urls;
}
// ============================================
// 🌐 API 請求函數
// ============================================

/**
 * ✅ 更新：發送 Pollinations API 請求（帶 Bearer Token）
 */
async function makePollinationsRequest(url, config, options = {}) {
  const authConfig = config.POLLINATIONS_AUTH;
  
  // 構建請求 headers
  const headers = {
    'User-Agent': `Pollinations-Worker/${config.VERSION}`,
    'Accept': 'image/png, image/jpeg, image/webp, */*',
    ...options.headers
  };
  
  // ✅ 添加 Bearer Token 認證
  if (authConfig.enabled && authConfig.token) {
    headers[authConfig.headerName] = `Bearer ${authConfig.token}`;
    console.log('🔐 Authorization header added');
  } else {
    console.warn('⚠️ No authentication token - request may fail');
  }
  
  try {
    // 發送請求
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
      signal: options.signal || AbortSignal.timeout(config.MAX_TIMEOUT)
    });
    
    // ✅ 檢查響應狀態
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed: Invalid or missing API key');
      } else if (response.status === 403) {
        throw new Error('Access forbidden: Check API key permissions');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded: Please try again later');
      } else if (response.status === 500) {
        throw new Error('Server error: Pollinations API is temporarily unavailable');
      } else {
        const errorText = await response.text().catch(() => 'Unknown error');
        throw new Error(`API request failed (${response.status}): ${errorText}`);
      }
    }
    
    return response;
    
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout: Generation took too long');
    }
    throw error;
  }
}

/**
 * 批量請求圖片
 */
async function makeMultipleRequests(urls, config) {
  const promises = urls.map(url => 
    makePollinationsRequest(url, config)
      .then(response => response.arrayBuffer())
      .catch(error => ({ error: error.message }))
  );
  
  return await Promise.all(promises);
}

/**
 * 重試機制
 */
async function requestWithRetry(url, config, maxRetries = 3) {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      console.log(`🔄 Attempt ${i + 1}/${maxRetries}`);
      return await makePollinationsRequest(url, config);
    } catch (error) {
      lastError = error;
      
      // 不重試認證錯誤
      if (error.message.includes('Authentication') || error.message.includes('forbidden')) {
        throw error;
      }
      
      // 速率限制等待更長時間
      if (error.message.includes('Rate limit')) {
        await new Promise(resolve => setTimeout(resolve, (i + 1) * 5000));
      } else {
        await new Promise(resolve => setTimeout(resolve, (i + 1) * 1000));
      }
    }
  }
  
  throw lastError;
}
// ============================================
// 🎨 圖片生成主函數
// ============================================

/**
 * ✅ 更新：生成單張圖片
 */
async function generateSingleImage(params, env) {
  const config = initializeConfig(env);
  
  try {
    // 1. 驗證參數
    const errors = validateParams(params);
    if (errors.length > 0) {
      throw new Error(`Parameter validation failed: ${errors.join(', ')}`);
    }
    
    // 2. 設置默認值
    const model = params.model || 'flux';
    const width = params.width || CONFIG.MODELS[model].defaultSize.width;
    const height = params.height || CONFIG.MODELS[model].defaultSize.height;
    const seed = params.seed || generateSeed();
    
    // 3. 優化提示詞
    const optimizedPrompt = optimizePrompt(params.prompt);
    
    // 4. 構建請求參數
    const requestParams = {
      prompt: optimizedPrompt,
      model: model,
      width: width,
      height: height,
      seed: seed,
      nologo: params.nologo || false,
      private: params.private !== false,  // 默認私有
      enhance: params.enhance || false,
      safe: params.safe || false
    };
    
    // Kontext 模型參考圖片
    if (model === 'kontext' && params.image) {
      requestParams.image = params.image;
    }
    
    // 5. 構建 URL
    const url = buildPollinationsURL(requestParams, config);
    logRequest(requestParams, url);
    
    // 6. 發送請求（帶重試）
    const response = await requestWithRetry(url, config);
    
    // 7. 獲取圖片數據
    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('Content-Type') || 'image/png';
    
    console.log('✅ Image generated:', {
      size: imageBuffer.byteLength,
      type: contentType,
      seed: seed
    });
    
    // 8. 返回圖片
    return new Response(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': imageBuffer.byteLength,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Generated-By': 'Pollinations-Gen-API',
        'X-Model': model,
        'X-Seed': seed.toString(),
        'X-Size': `${width}x${height}`,
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    console.error('❌ Generation failed:', error);
    
    return new Response(JSON.stringify({
      error: true,
      message: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: error.message.includes('Authentication') ? 401 : 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

/**
 * ✅ 更新：生成多張圖片
 */
async function generateMultipleImages(params, env) {
  const config = initializeConfig(env);
  const count = Math.min(parseInt(params.n) || 1, 4);
  
  try {
    // 驗證參數
    const errors = validateParams(params);
    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
    
    // 優化提示詞
    params.prompt = optimizePrompt(params.prompt);
    
    // 構建多個 URL
    const urls = buildMultipleURLs(params, config, count);
    console.log(`📤 Generating ${count} images...`);
    
    // 批量請求
    const results = await makeMultipleRequests(urls, config);
    
    // 處理結果
    const images = [];
    const errors = [];
    
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      
      if (result.error) {
        errors.push({ index: i, error: result.error });
      } else {
        const base64 = btoa(
          String.fromCharCode(...new Uint8Array(result))
        );
        images.push({
          index: i,
          data: `data:image/png;base64,${base64}`,
          seed: (params.seed || generateSeed()) + i
        });
      }
    }
    
    console.log(`✅ Generated ${images.length}/${count} images`);
    
    // 返回 JSON 響應
    return new Response(JSON.stringify({
      success: true,
      count: images.length,
      images: images,
      errors: errors.length > 0 ? errors : undefined,
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    console.error('❌ Batch generation failed:', error);
    
    return new Response(JSON.stringify({
      error: true,
      message: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
// ============================================
// 🛣️ 路由處理
// ============================================

/**
 * 處理圖片生成請求
 */
async function handleGenerate(request, env) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405,
      headers: {
        'Allow': 'POST',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
  
  try {
    const body = await request.json();
    
    // 檢查是否批量生成
    const count = parseInt(body.n) || 1;
    
    if (count > 1) {
      return await generateMultipleImages(body, env);
    } else {
      return await generateSingleImage(body, env);
    }
    
  } catch (error) {
    return new Response(JSON.stringify({
      error: true,
      message: 'Invalid request body: ' + error.message
    }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

/**
 * 健康檢查
 */
async function handleHealth(env) {
  const config = initializeConfig(env);
  
  return new Response(JSON.stringify({
    status: 'ok',
    version: config.VERSION,
    endpoint: config.PROVIDERS.pollinations.endpoint,
    pathPrefix: config.PROVIDERS.pollinations.pathPrefix,
    authEnabled: config.POLLINATIONS_AUTH.enabled,
    hasApiKey: !!config.POLLINATIONS_AUTH.token,
    models: Object.keys(config.MODELS),
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

/**
 * 獲取模型列表
 */
async function handleModels() {
  const models = Object.entries(CONFIG.MODELS).map(([id, model]) => ({
    id: id,
    name: model.name,
    description: model.description,
    supportsSize: model.supportsSize,
    supportsEnhance: model.supportsEnhance,
    supportsImageInput: model.supportsImageInput,
    defaultSize: model.defaultSize,
    maxSize: model.maxSize
  }));
  
  return new Response(JSON.stringify({
    models: models,
    count: models.length
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

/**
 * 處理 CORS 預檢請求
 */
function handleOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
}
// ============================================
// 🎨 Web UI HTML 界面
// ============================================

/**
 * 生成 Web UI HTML
 */
function getWebUI() {
  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pollinations AI 圖片生成器 v9.5.3</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
      color: #333;
    }
    
    .container {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      overflow: hidden;
    }
    
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    
    .header h1 {
      font-size: 2em;
      margin-bottom: 10px;
    }
    
    .header .version {
      opacity: 0.9;
      font-size: 0.9em;
    }
    
    .header .api-status {
      margin-top: 15px;
      padding: 8px 16px;
      background: rgba(255,255,255,0.2);
      border-radius: 20px;
      display: inline-block;
      font-size: 0.85em;
    }
    
    .content {
      padding: 30px;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #555;
    }
    
    .form-group input[type="text"],
    .form-group textarea,
    .form-group select,
    .form-group input[type="number"] {
      width: 100%;
      padding: 12px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1em;
      transition: border-color 0.3s;
    }
    
    .form-group input:focus,
    .form-group textarea:focus,
    .form-group select:focus {
      outline: none;
      border-color: #667eea;
    }
    
    .form-group textarea {
      resize: vertical;
      min-height: 80px;
    }
    
    .row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }
    
    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
    }
    
    .checkbox-group input[type="checkbox"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
    
    .checkbox-group label {
      margin: 0;
      cursor: pointer;
      font-weight: normal;
    }
    
    .btn {
      width: 100%;
      padding: 15px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1.1em;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }
    
    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .btn-secondary {
      background: #6c757d;
      margin-top: 10px;
    }
    
    .output {
      margin-top: 30px;
      padding-top: 30px;
      border-top: 2px solid #e0e0e0;
    }
    
    .output h2 {
      margin-bottom: 20px;
      color: #555;
    }
    
    .image-container {
      position: relative;
      background: #f5f5f5;
      border-radius: 8px;
      overflow: hidden;
      min-height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .image-container img {
      max-width: 100%;
      height: auto;
      display: block;
    }
    
    .loading {
      text-align: center;
      padding: 40px;
    }
    
    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .error {
      background: #fee;
      color: #c33;
      padding: 15px;
      border-radius: 8px;
      margin-top: 15px;
    }
    
    .success {
      background: #efe;
      color: #3c3;
      padding: 15px;
      border-radius: 8px;
      margin-top: 15px;
    }
    
    .info {
      background: #e3f2fd;
      color: #1976d2;
      padding: 12px;
      border-radius: 6px;
      font-size: 0.9em;
      margin-top: 8px;
    }
    
    .image-meta {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 10px;
      margin-top: 15px;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
      font-size: 0.9em;
    }
    
    .image-meta .meta-item {
      display: flex;
      flex-direction: column;
    }
    
    .image-meta .meta-label {
      font-weight: 600;
      color: #666;
      margin-bottom: 4px;
    }
    
    .image-meta .meta-value {
      color: #333;
    }
    
    @media (max-width: 768px) {
      .row {
        grid-template-columns: 1fr;
      }
      
      .header h1 {
        font-size: 1.5em;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎨 Pollinations AI 圖片生成器</h1>
      <div class="version">v9.5.3-gen-api | Powered by gen.pollinations.ai</div>
      <div class="api-status" id="apiStatus">檢查 API 狀態中...</div>
    </div>
    
    <div class="content">
      <form id="generateForm">
        <div class="form-group">
          <label for="prompt">圖片描述 *</label>
          <textarea 
            id="prompt" 
            name="prompt" 
            placeholder="例如：a beautiful sunset over mountains, digital art style"
            required
          ></textarea>
          <div class="info">💡 提示：使用英文描述效果更佳，支持藝術風格、顏色、構圖等細節描述</div>
        </div>
        
        <div class="form-group">
          <label for="model">生成模型</label>
          <select id="model" name="model">
            <option value="flux">FLUX - 最新穩定模型（推薦）</option>
            <option value="zimage">ZImage - 高質量細節</option>
            <option value="turbo">Turbo - 快速生成</option>
            <option value="kontext">Kontext - 圖生圖（需參考圖）</option>
          </select>
        </div>
        
        <div class="row">
          <div class="form-group">
            <label for="width">寬度（像素）</label>
            <input type="number" id="width" name="width" value="1024" min="256" max="2048" step="64">
          </div>
          
          <div class="form-group">
            <label for="height">高度（像素）</label>
            <input type="number" id="height" name="height" value="1024" min="256" max="2048" step="64">
          </div>
        </div>
        
        <div class="row">
          <div class="form-group">
            <label for="seed">隨機種子（可選）</label>
            <input type="number" id="seed" name="seed" placeholder="留空自動生成">
          </div>
          
          <div class="form-group">
            <label for="numImages">生成數量</label>
            <select id="numImages" name="n">
              <option value="1">1 張</option>
              <option value="2">2 張</option>
              <option value="3">3 張</option>
              <option value="4">4 張</option>
            </select>
          </div>
        </div>
        
        <div class="form-group">
          <label>高級選項</label>
          <div class="checkbox-group">
            <input type="checkbox" id="enhance" name="enhance">
            <label for="enhance">AI 優化提示詞</label>
          </div>
          <div class="checkbox-group">
            <input type="checkbox" id="nologo" name="nologo">
            <label for="nologo">移除浮水印（需付費帳戶）</label>
          </div>
          <div class="checkbox-group">
            <input type="checkbox" id="private" name="private" checked>
            <label for="private">私密生成（不顯示在公開動態）</label>
          </div>
          <div class="checkbox-group">
            <input type="checkbox" id="safe" name="safe">
            <label for="safe">嚴格內容過濾</label>
          </div>
        </div>
        
        <button type="submit" class="btn" id="generateBtn">
          🚀 開始生成
        </button>
        
        <button type="button" class="btn btn-secondary" id="randomBtn">
          🎲 隨機種子
        </button>
      </form>
      
      <div class="output" id="output" style="display: none;">
        <h2>生成結果</h2>
        <div class="image-container" id="imageContainer">
          <div class="loading">
            <div class="spinner"></div>
            <p>正在生成圖片，請稍候...</p>
          </div>
        </div>
        <div id="imageMeta"></div>
      </div>
      
      <div id="message"></div>
    </div>
  </div>

  <script>
    // 檢查 API 狀態
    async function checkAPIStatus() {
      try {
        const response = await fetch('/health');
        const data = await response.json();
        const statusEl = document.getElementById('apiStatus');
        
        if (data.status === 'ok' && data.hasApiKey) {
          statusEl.textContent = '✅ API 已就緒';
          statusEl.style.background = 'rgba(76, 175, 80, 0.3)';
        } else if (data.status === 'ok' && !data.hasApiKey) {
          statusEl.textContent = '⚠️ 缺少 API Key';
          statusEl.style.background = 'rgba(255, 152, 0, 0.3)';
          showMessage('警告：未檢測到 POLLINATIONS_API_KEY，圖片生成可能失敗', 'error');
        } else {
          statusEl.textContent = '❌ API 不可用';
          statusEl.style.background = 'rgba(244, 67, 54, 0.3)';
        }
      } catch (error) {
        document.getElementById('apiStatus').textContent = '❌ 連接失敗';
      }
    }
    
    // 顯示消息
    function showMessage(text, type = 'info') {
      const messageEl = document.getElementById('message');
      messageEl.className = type;
      messageEl.textContent = text;
      messageEl.style.display = 'block';
      
      setTimeout(() => {
        messageEl.style.display = 'none';
      }, 5000);
    }
    
    // 生成隨機種子
    document.getElementById('randomBtn').addEventListener('click', () => {
      document.getElementById('seed').value = Math.floor(Math.random() * 1000000);
    });
    
    // 表單提交
    document.getElementById('generateForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const btn = document.getElementById('generateBtn');
      const output = document.getElementById('output');
      const container = document.getElementById('imageContainer');
      const metaEl = document.getElementById('imageMeta');
      
      // 禁用按鈕
      btn.disabled = true;
      btn.textContent = '⏳ 生成中...';
      
      // 顯示加載狀態
      output.style.display = 'block';
      container.innerHTML = '<div class="loading"><div class="spinner"></div><p>正在生成圖片，請稍候...</p></div>';
      metaEl.innerHTML = '';
      
      // 構建請求數據
      const formData = new FormData(e.target);
      const data = {
        prompt: formData.get('prompt'),
        model: formData.get('model'),
        width: parseInt(formData.get('width')),
        height: parseInt(formData.get('height')),
        seed: formData.get('seed') ? parseInt(formData.get('seed')) : undefined,
        n: parseInt(formData.get('n')),
        enhance: formData.get('enhance') === 'on',
        nologo: formData.get('nologo') === 'on',
        private: formData.get('private') === 'on',
        safe: formData.get('safe') === 'on'
      };
      
      try {
        const response = await fetch('/_internal/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || '生成失敗');
        }
        
        const contentType = response.headers.get('Content-Type');
        
        // 單張圖片
        if (contentType.startsWith('image/')) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          
          container.innerHTML = \`<img src="\${url}" alt="Generated image">\`;
          
          // 顯示元數據
          metaEl.innerHTML = \`
            <div class="image-meta">
              <div class="meta-item">
                <div class="meta-label">模型</div>
                <div class="meta-value">\${data.model}</div>
              </div>
              <div class="meta-item">
                <div class="meta-label">尺寸</div>
                <div class="meta-value">\${data.width} x \${data.height}</div>
              </div>
              <div class="meta-item">
                <div class="meta-label">種子</div>
                <div class="meta-value">\${data.seed || '隨機'}</div>
              </div>
              <div class="meta-item">
                <div class="meta-label">大小</div>
                <div class="meta-value">\${(blob.size / 1024).toFixed(2)} KB</div>
              </div>
            </div>
          \`;
          
          showMessage('✅ 圖片生成成功！', 'success');
        } 
        // 多張圖片
        else {
          const result = await response.json();
          
          if (result.images && result.images.length > 0) {
            container.innerHTML = result.images.map(img => 
              \`<img src="\${img.data}" alt="Generated image \${img.index + 1}" style="margin-bottom: 15px;">\`
            ).join('');
            
            showMessage(\`✅ 成功生成 \${result.images.length} 張圖片！\`, 'success');
          } else {
            throw new Error('未收到圖片數據');
          }
        }
        
      } catch (error) {
        container.innerHTML = \`<div class="error">❌ \${error.message}</div>\`;
        showMessage('生成失敗: ' + error.message, 'error');
      } finally {
        btn.disabled = false;
        btn.textContent = '🚀 開始生成';
      }
    });
    
    // 頁面加載時檢查狀態
    checkAPIStatus();
  </script>
</body>
</html>`;
}
// ============================================
// 🚀 主 Worker 導出函數
// ============================================

export default {
  /**
   * ✅ 主請求處理函數
   */
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    try {
      // CORS 預檢請求
      if (request.method === 'OPTIONS') {
        return handleOptions();
      }
      
      // API 路由
      switch (path) {
        // 圖片生成端點
        case '/_internal/generate':
          return await handleGenerate(request, env);
        
        // 健康檢查
        case '/health':
          return await handleHealth(env);
        
        // 模型列表
        case '/models':
          return await handleModels();
        
        // Web UI 首頁
        case '/':
          return new Response(getWebUI(), {
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              'Cache-Control': 'public, max-age=3600'
            }
          });
        
        // 404 未找到
        default:
          return new Response(JSON.stringify({
            error: true,
            message: 'Not found',
            availableEndpoints: [
              '/ - Web UI',
              '/_internal/generate - Image generation API',
              '/health - Health check',
              '/models - List available models'
            ]
          }), {
            status: 404,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          });
      }
      
    } catch (error) {
      console.error('❌ Worker error:', error);
      
      return new Response(JSON.stringify({
        error: true,
        message: 'Internal server error: ' + error.message,
        timestamp: new Date().toISOString()
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  }
};

// ============================================
// 📋 Pollinations Worker v9.5.3 - Dashboard Layout
// ============================================

const CONFIG = {
  POLLINATIONS_ENDPOINT: 'https://gen.pollinations.ai',
  PATH_PREFIX: '/image',
  AUTH_HEADER: 'Authorization',
  AVAILABLE_MODELS: ['zimage', 'flux', 'turbo', 'kontext'],
  DEFAULT_MODEL: 'flux',
  MIN_SIZE: 256,
  MAX_SIZE: 2048,
  DEFAULT_WIDTH: 1024,
  DEFAULT_HEIGHT: 1024,
  DEFAULT_TIMEOUT: 30000,
  MAX_RETRIES: 3,
  RETRY_DELAY: 2000,
  ERRORS: {
    NO_API_KEY: 'POLLINATIONS_API_KEY environment variable is not set',
    INVALID_MODEL: 'Invalid model specified',
    INVALID_SIZE: 'Width and height must be between 256 and 2048',
    INVALID_PROMPT: 'Prompt is required and must be a non-empty string',
    GENERATION_FAILED: 'Image generation failed',
    TIMEOUT: 'Request timeout',
    RATE_LIMIT: 'Rate limit exceeded'
  }
};
// ============================================
// 🛠️ 初始化和工具函數
// ============================================

function initializeConfig(env) {
  const runtimeConfig = { ...CONFIG };
  if (env.POLLINATIONS_ENDPOINT) {
    runtimeConfig.POLLINATIONS_ENDPOINT = env.POLLINATIONS_ENDPOINT;
  }
  if (env.DEFAULT_MODEL && CONFIG.AVAILABLE_MODELS.includes(env.DEFAULT_MODEL)) {
    runtimeConfig.DEFAULT_MODEL = env.DEFAULT_MODEL;
  }
  if (env.MAX_TIMEOUT) {
    runtimeConfig.DEFAULT_TIMEOUT = parseInt(env.MAX_TIMEOUT);
  }
  runtimeConfig.API_KEY = env.POLLINATIONS_API_KEY || null;
  return runtimeConfig;
}

function generateSeed() {
  return Math.floor(Math.random() * 1000000);
}

function validateParams(params) {
  const errors = [];
  if (!params.prompt || typeof params.prompt !== 'string' || params.prompt.trim().length === 0) {
    errors.push(CONFIG.ERRORS.INVALID_PROMPT);
  }
  if (params.model && !CONFIG.AVAILABLE_MODELS.includes(params.model)) {
    errors.push(`${CONFIG.ERRORS.INVALID_MODEL}. Available: ${CONFIG.AVAILABLE_MODELS.join(', ')}`);
  }
  if (params.width) {
    const width = parseInt(params.width);
    if (isNaN(width) || width < CONFIG.MIN_SIZE || width > CONFIG.MAX_SIZE) {
      errors.push(`Width ${CONFIG.ERRORS.INVALID_SIZE}`);
    }
  }
  if (params.height) {
    const height = parseInt(params.height);
    if (isNaN(height) || height < CONFIG.MIN_SIZE || height > CONFIG.MAX_SIZE) {
      errors.push(`Height ${CONFIG.ERRORS.INVALID_SIZE}`);
    }
  }
  return errors;
}

function normalizeParams(params, config) {
  return {
    prompt: params.prompt.trim(),
    model: params.model || config.DEFAULT_MODEL,
    width: parseInt(params.width) || config.DEFAULT_WIDTH,
    height: parseInt(params.height) || config.DEFAULT_HEIGHT,
    seed: params.seed ? parseInt(params.seed) : generateSeed(),
    nologo: params.nologo !== false,
    private: params.private === true,
    enhance: params.enhance === true
  };
}

function errorResponse(message, status = 400, details = null) {
  return new Response(JSON.stringify({
    error: true,
    message,
    details,
    timestamp: new Date().toISOString()
  }), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

function log(level, message, data = {}) {
  const timestamp = new Date().toISOString();
  const logData = { timestamp, level, message, ...data };
  console.log(JSON.stringify(logData));
}
// ============================================
// 🔗 URL 構建函數
// ============================================

function buildPollinationsURL(params, config) {
  const { prompt, model, width, height, seed, nologo, private: isPrivate, enhance } = params;
  let url = `${config.POLLINATIONS_ENDPOINT}${config.PATH_PREFIX}/${model}/${encodeURIComponent(prompt)}`;
  const queryParams = new URLSearchParams();
  queryParams.append('width', width.toString());
  queryParams.append('height', height.toString());
  queryParams.append('seed', seed.toString());
  if (nologo) queryParams.append('nologo', 'true');
  if (isPrivate) queryParams.append('private', 'true');
  if (enhance) queryParams.append('enhance', 'true');
  const queryString = queryParams.toString();
  if (queryString) url += `?${queryString}`;
  return url;
}

function buildMultipleURLs(params, config, count = 1) {
  const urls = [];
  const baseParams = { ...params };
  for (let i = 0; i < count; i++) {
    const urlParams = {
      ...baseParams,
      seed: baseParams.seed ? baseParams.seed + i : generateSeed()
    };
    urls.push(buildPollinationsURL(urlParams, config));
  }
  return urls;
}
// ============================================
// 🌐 API 請求函數
// ============================================

async function makePollinationsRequest(url, config, options = {}) {
  const { timeout = config.DEFAULT_TIMEOUT, signal } = options;
  const headers = {
    'Accept': 'image/png, image/jpeg, image/webp, image/*',
    'User-Agent': 'Pollinations-Worker/9.5.3'
  };
  if (config.API_KEY) {
    headers[config.AUTH_HEADER] = `Bearer ${config.API_KEY}`;
  }
  log('info', 'Making request to Pollinations API', { url });
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    const fetchSignal = signal || controller.signal;
    const response = await fetch(url, { method: 'GET', headers, signal: fetchSignal });
    clearTimeout(timeoutId);
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`API returned ${response.status}: ${errorText}`);
    }
    const contentType = response.headers.get('Content-Type') || '';
    if (!contentType.includes('image')) {
      throw new Error(`Expected image, got ${contentType}`);
    }
    log('info', 'Request successful', { status: response.status, contentType });
    return response;
  } catch (error) {
    if (error.name === 'AbortError') {
      log('error', 'Request timeout', { url, timeout });
      throw new Error(CONFIG.ERRORS.TIMEOUT);
    }
    log('error', 'Request failed', { url, error: error.message });
    throw error;
  }
}

async function makeMultipleRequests(urls, config) {
  const promises = urls.map(url => 
    makePollinationsRequest(url, config).catch(error => ({ error: error.message }))
  );
  return await Promise.all(promises);
}

async function requestWithRetry(url, config, maxRetries = CONFIG.MAX_RETRIES) {
  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      log('info', `Request attempt ${attempt}/${maxRetries}`, { url });
      const response = await makePollinationsRequest(url, config);
      return response;
    } catch (error) {
      lastError = error;
      log('warn', `Attempt ${attempt} failed`, { url, error: error.message });
      if (attempt < maxRetries) {
        const delay = CONFIG.RETRY_DELAY * attempt;
        log('info', `Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  log('error', 'All retry attempts failed', { url, maxRetries, lastError: lastError.message });
  throw lastError;
}
// ============================================
// 🎨 圖片生成主函數
// ============================================

async function generateSingleImage(params, env) {
  const config = initializeConfig(env);
  const validationErrors = validateParams(params);
  if (validationErrors.length > 0) {
    return errorResponse('Validation failed', 400, validationErrors);
  }
  const normalizedParams = normalizeParams(params, config);
  log('info', 'Generating single image', normalizedParams);
  try {
    const url = buildPollinationsURL(normalizedParams, config);
    const response = await requestWithRetry(url, config);
    const imageBlob = await response.blob();
    return new Response(imageBlob, {
      status: 200,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/png',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=31536000',
        'X-Generated-Seed': normalizedParams.seed.toString(),
        'X-Model': normalizedParams.model,
        'X-Dimensions': `${normalizedParams.width}x${normalizedParams.height}`
      }
    });
  } catch (error) {
    log('error', 'Image generation failed', { params: normalizedParams, error: error.message });
    return errorResponse(CONFIG.ERRORS.GENERATION_FAILED, 500, error.message);
  }
}

async function generateMultipleImages(params, env) {
  const config = initializeConfig(env);
  const count = Math.min(parseInt(params.count) || 1, 4);
  const validationErrors = validateParams(params);
  if (validationErrors.length > 0) {
    return errorResponse('Validation failed', 400, validationErrors);
  }
  const normalizedParams = normalizeParams(params, config);
  log('info', 'Generating multiple images', { ...normalizedParams, count });
  try {
    const urls = buildMultipleURLs(normalizedParams, config, count);
    const responses = await makeMultipleRequests(urls, config);
    const results = await Promise.all(
      responses.map(async (response, index) => {
        if (response.error) {
          return { success: false, error: response.error, seed: normalizedParams.seed + index };
        }
        const blob = await response.blob();
        const base64 = await blobToBase64(blob);
        return {
          success: true,
          seed: normalizedParams.seed + index,
          data: base64,
          contentType: response.headers.get('Content-Type')
        };
      })
    );
    return new Response(JSON.stringify({ success: true, count: results.length, results }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (error) {
    log('error', 'Batch generation failed', { params: normalizedParams, count, error: error.message });
    return errorResponse('Batch generation failed', 500, error.message);
  }
}

async function blobToBase64(blob) {
  const arrayBuffer = await blob.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return 'data:' + blob.type + ';base64,' + btoa(binary);
}
// ============================================
// 🛣️ 路由處理函數
// ============================================

async function handleGenerate(request, env) {
  if (request.method !== 'POST') {
    return errorResponse('Method not allowed. Use POST.', 405);
  }
  try {
    const contentType = request.headers.get('Content-Type') || '';
    let params;
    if (contentType.includes('application/json')) {
      params = await request.json();
    } else {
      return errorResponse('Content-Type must be application/json', 400);
    }
    if (params.count && params.count > 1) {
      return await generateMultipleImages(params, env);
    } else {
      return await generateSingleImage(params, env);
    }
  } catch (error) {
    log('error', 'Request handling failed', { error: error.message });
    return errorResponse('Invalid request', 400, error.message);
  }
}

async function handleHealth(env) {
  const config = initializeConfig(env);
  return new Response(JSON.stringify({
    status: 'ok',
    version: '9.5.3-dashboard',
    endpoint: config.POLLINATIONS_ENDPOINT,
    pathPrefix: config.PATH_PREFIX,
    authEnabled: !!config.API_KEY,
    hasApiKey: !!config.API_KEY,
    models: config.AVAILABLE_MODELS,
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}

async function handleModels() {
  return new Response(JSON.stringify({
    models: CONFIG.AVAILABLE_MODELS.map(model => ({
      id: model,
      name: model.toUpperCase(),
      description: getModelDescription(model)
    })),
    default: CONFIG.DEFAULT_MODEL
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}

function getModelDescription(model) {
  const descriptions = {
    'flux': 'Latest stable model with high quality output',
    'zimage': 'High detail and quality model',
    'turbo': 'Fast generation with good quality',
    'kontext': 'Context-aware image generation'
  };
  return descriptions[model] || 'Image generation model';
}

function handleOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
}
// ============================================
// 🎨 Web UI - 儀表板佈局
// ============================================

function getWebUI() {
  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pollinations AI 圖片生成器 v9.5.3</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}:root{--primary:#667eea;--primary-dark:#5568d3;--primary-light:rgba(102,126,234,0.1);--bg-main:#f8f9fa;--bg-sidebar:#fff;--bg-panel:#fff;--border:#e0e0e0;--text-primary:#333;--text-secondary:#666;--text-muted:#999;--success:#28a745;--danger:#dc3545;--spacing-xs:4px;--spacing-sm:8px;--spacing-md:16px;--spacing-lg:24px;--spacing-xl:32px;--shadow-sm:0 1px 3px rgba(0,0,0,0.1);--shadow-md:0 4px 6px rgba(0,0,0,0.1);--shadow-lg:0 10px 20px rgba(0,0,0,0.15);--radius-sm:6px;--radius-md:8px;--radius-lg:12px}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg-main);color:var(--text-primary);line-height:1.6}.header{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;padding:var(--spacing-lg) var(--spacing-xl);box-shadow:var(--shadow-md);position:sticky;top:0;z-index:100;display:flex;justify-content:space-between;align-items:center}.header-left{display:flex;align-items:center;gap:var(--spacing-md)}.header-logo{font-size:2em}.header-title h1{font-size:1.5em;font-weight:700;margin-bottom:var(--spacing-xs)}.header-version{font-size:0.85em;opacity:0.9}.header-right{display:flex;align-items:center;gap:var(--spacing-md)}.api-status{padding:var(--spacing-sm) var(--spacing-md);background:rgba(255,255,255,0.2);border-radius:20px;font-size:0.9em;display:flex;align-items:center;gap:var(--spacing-sm)}.menu-toggle{display:none;background:none;border:none;color:#fff;font-size:1.5em;cursor:pointer;padding:var(--spacing-sm)}.layout{display:grid;grid-template-columns:240px 1fr 300px;gap:var(--spacing-lg);padding:var(--spacing-lg);max-width:1800px;margin:0 auto;min-height:calc(100vh - 80px)}.left-sidebar{background:var(--bg-sidebar);border-radius:var(--radius-lg);box-shadow:var(--shadow-sm);padding:var(--spacing-lg);height:fit-content;position:sticky;top:100px}.nav-section{margin-bottom:var(--spacing-xl)}.nav-title{font-size:0.75em;font-weight:700;text-transform:uppercase;color:var(--text-muted);letter-spacing:0.5px;margin-bottom:var(--spacing-md)}.nav-item{display:flex;align-items:center;gap:var(--spacing-md);padding:var(--spacing-md);border-radius:var(--radius-md);cursor:pointer;transition:all 0.2s;margin-bottom:var(--spacing-sm);font-weight:500}.nav-item:hover{background:var(--primary-light);color:var(--primary)}.nav-item.active{background:var(--primary);color:#fff}.nav-icon{font-size:1.2em}.quick-ratios{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--spacing-sm);margin-bottom:var(--spacing-md)}.ratio-quick-btn{aspect-ratio:1;border:2px solid var(--border);border-radius:var(--radius-sm);background:#fff;cursor:pointer;transition:all 0.2s;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--spacing-xs);font-size:0.75em;color:var(--text-secondary)}.ratio-quick-btn:hover{border-color:var(--primary);background:var(--primary-light)}.ratio-quick-btn.active{border-color:var(--primary);background:var(--primary);color:#fff;font-weight:600}.ratio-quick-icon{width:20px;height:20px;background:currentColor;border-radius:2px}.ratio-quick-icon.landscape{width:28px;height:16px}.ratio-quick-icon.portrait{width:16px;height:28px}.ratio-quick-icon.wide{width:32px;height:14px}.quick-styles{display:grid;grid-template-columns:repeat(2,1fr);gap:var(--spacing-sm)}.style-quick-btn{padding:var(--spacing-md);border:2px solid var(--border);border-radius:var(--radius-md);background:#fff;cursor:pointer;transition:all 0.2s;display:flex;flex-direction:column;align-items:center;gap:var(--spacing-xs);text-align:center}.style-quick-btn:hover{border-color:var(--primary);background:var(--primary-light)}.style-quick-btn.active{border-color:var(--primary);background:var(--primary);color:#fff}.style-icon{font-size:1.5em}.style-name{font-size:0.85em;font-weight:500}.main-content{display:flex;flex-direction:column;gap:var(--spacing-lg)}.preview-area{background:var(--bg-panel);border-radius:var(--radius-lg);box-shadow:var(--shadow-sm);padding:var(--spacing-xl);min-height:500px}.preview-container{width:100%;min-height:400px;background:#f5f5f5;border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;border:2px dashed var(--border)}.preview-container.has-image{border:none;background:transparent}.preview-container img{max-width:100%;max-height:600px;border-radius:var(--radius-md);box-shadow:var(--shadow-lg)}.preview-placeholder{text-align:center;color:var(--text-muted);padding:var(--spacing-xl)}.preview-placeholder-icon{font-size:5em;opacity:0.3;margin-bottom:var(--spacing-md)}.loading{text-align:center;padding:var(--spacing-xl)}.spinner{border:4px solid #f3f3f3;border-top:4px solid var(--primary);border-radius:50%;width:50px;height:50px;animation:spin 1s linear infinite;margin:0 auto var(--spacing-lg)}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.preview-actions{display:flex;gap:var(--spacing-md);margin-top:var(--spacing-lg)}.btn{padding:var(--spacing-md) var(--spacing-lg);border:none;border-radius:var(--radius-md);font-size:1em;font-weight:600;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:var(--spacing-sm);justify-content:center}.btn-primary{background:linear-gradient(135deg,var(--primary) 0%,var(--primary-dark) 100%);color:#fff;flex:1}.btn-primary:hover:not(:disabled){transform:translateY(-2px);box-shadow:var(--shadow-md)}.btn-primary:disabled{opacity:0.6;cursor:not-allowed}.btn-success{background:var(--success);color:#fff}.btn-success:hover{background:#218838}.btn-secondary{background:var(--bg-main);color:var(--text-primary);border:2px solid var(--border)}.btn-secondary:hover{border-color:var(--primary);color:var(--primary)}.control-area{background:var(--bg-panel);border-radius:var(--radius-lg);box-shadow:var(--shadow-sm);padding:var(--spacing-xl)}.form-group{margin-bottom:var(--spacing-lg)}.form-label{display:block;font-weight:600;margin-bottom:var(--spacing-sm);color:var(--text-primary);font-size:0.95em}.form-input,.form-textarea,.form-select{width:100%;padding:var(--spacing-md);border:2px solid var(--border);border-radius:var(--radius-md);font-size:1em;transition:border-color 0.2s;font-family:inherit}.form-input:focus,.form-textarea:focus,.form-select:focus{outline:none;border-color:var(--primary)}.form-textarea{resize:vertical;min-height:100px}.form-hint{font-size:0.85em;color:var(--text-muted);margin-top:var(--spacing-sm)}.control-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:var(--spacing-md)}.right-panel{display:flex;flex-direction:column;gap:var(--spacing-lg);height:fit-content;position:sticky;top:100px}.panel-card{background:var(--bg-panel);border-radius:var(--radius-lg);box-shadow:var(--shadow-sm);padding:var(--spacing-lg)}.panel-title{font-size:0.95em;font-weight:700;margin-bottom:var(--spacing-md);color:var(--text-primary);display:flex;align-items:center;gap:var(--spacing-sm)}.stats-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:var(--spacing-md)}.stat-item{text-align:center;padding:var(--spacing-md);background:var(--bg-main);border-radius:var(--radius-md)}.stat-value{font-size:1.5em;font-weight:700;color:var(--primary);display:block}.stat-label{font-size:0.85em;color:var(--text-secondary);margin-top:var(--spacing-xs)}.param-list{display:flex;flex-direction:column;gap:var(--spacing-md)}.param-item{display:flex;justify-content:space-between;align-items:center;padding:var(--spacing-sm) 0;border-bottom:1px solid var(--border)}.param-item:last-child{border-bottom:none}.param-label{font-size:0.9em;color:var(--text-secondary)}.param-value{font-weight:600;color:var(--text-primary)}.recent-list{display:flex;flex-direction:column;gap:var(--spacing-md)}.recent-item{display:flex;gap:var(--spacing-md);padding:var(--spacing-sm);border-radius:var(--radius-md);cursor:pointer;transition:all 0.2s}.recent-item:hover{background:var(--bg-main)}.recent-thumb{width:60px;height:60px;border-radius:var(--radius-sm);object-fit:cover;background:var(--bg-main)}.recent-info{flex:1;display:flex;flex-direction:column;justify-content:center}.recent-prompt{font-size:0.85em;color:var(--text-primary);margin-bottom:var(--spacing-xs);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.recent-time{font-size:0.75em;color:var(--text-muted)}.view-all-btn{width:100%;padding:var(--spacing-md);background:var(--bg-main);border:2px dashed var(--border);border-radius:var(--radius-md);color:var(--text-secondary);cursor:pointer;transition:all 0.2s;font-weight:600}.view-all-btn:hover{border-color:var(--primary);color:var(--primary);background:var(--primary-light)}.history-page{display:none}.history-page.active{display:block}.history-header{background:var(--bg-panel);border-radius:var(--radius-lg);box-shadow:var(--shadow-sm);padding:var(--spacing-xl);margin-bottom:var(--spacing-lg);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:var(--spacing-md)}.history-controls{display:flex;gap:var(--spacing-md);align-items:center}.search-box{position:relative}.search-input{padding:var(--spacing-md) var(--spacing-md) var(--spacing-md) 40px;border:2px solid var(--border);border-radius:var(--radius-md);font-size:1em;width:300px;transition:border-color 0.2s}.search-input:focus{outline:none;border-color:var(--primary)}.search-icon{position:absolute;left:var(--spacing-md);top:50%;transform:translateY(-50%);color:var(--text-muted)}.gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:var(--spacing-lg)}.gallery-item{background:var(--bg-panel);border-radius:var(--radius-lg);overflow:hidden;box-shadow:var(--shadow-sm);transition:all 0.3s;cursor:pointer}.gallery-item:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg)}.gallery-thumb{width:100%;height:280px;object-fit:cover;background:var(--bg-main)}.gallery-info{padding:var(--spacing-lg)}.gallery-prompt{font-size:0.9em;color:var(--text-primary);margin-bottom:var(--spacing-md);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;line-height:1.4}.gallery-meta{display:flex;justify-content:space-between;font-size:0.8em;color:var(--text-muted);margin-bottom:var(--spacing-md)}.gallery-actions{display:flex;gap:var(--spacing-sm)}.gallery-actions button{flex:1;padding:var(--spacing-sm);border:none;border-radius:var(--radius-sm);font-size:0.85em;font-weight:600;cursor:pointer;transition:all 0.2s}.btn-reuse{background:var(--primary);color:#fff}.btn-reuse:hover{background:var(--primary-dark)}.btn-delete{background:var(--danger);color:#fff}.btn-delete:hover{background:#c82333}.empty-state{text-align:center;padding:calc(var(--spacing-xl)*2);color:var(--text-muted)}.empty-icon{font-size:5em;opacity:0.3;margin-bottom:var(--spacing-lg)}.modal{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:1000;align-items:center;justify-content:center}.modal.active{display:flex}.modal-content{max-width:95%;max-height:95%;position:relative}.modal-close{position:absolute;top:-50px;right:0;background:rgba(255,255,255,0.2);color:#fff;border:none;width:40px;height:40px;border-radius:50%;font-size:1.5em;cursor:pointer;transition:background 0.3s}.modal-close:hover{background:rgba(255,255,255,0.3)}.modal-image{max-width:100%;max-height:90vh;border-radius:var(--radius-md)}.message{position:fixed;top:100px;right:var(--spacing-lg);padding:var(--spacing-lg) var(--spacing-xl);border-radius:var(--radius-md);box-shadow:var(--shadow-lg);z-index:2000;animation:slideIn 0.3s;max-width:400px;display:flex;align-items:center;gap:var(--spacing-md)}@keyframes slideIn{from{transform:translateX(400px);opacity:0}to{transform:translateX(0);opacity:1}}.message.success{background:#d4edda;color:#155724;border-left:4px solid var(--success)}.message.error{background:#f8d7da;color:#721c24;border-left:4px solid var(--danger)}.message.info{background:#d1ecf1;color:#0c5460;border-left:4px solid #17a2b8}@media (max-width:1400px){.layout{grid-template-columns:220px 1fr 280px}}@media (max-width:1200px){.layout{grid-template-columns:200px 1fr}.right-panel{display:none}}@media (max-width:768px){.layout{grid-template-columns:1fr;padding:var(--spacing-md)}.left-sidebar{position:fixed;left:-260px;top:80px;bottom:0;width:240px;z-index:200;transition:left 0.3s;overflow-y:auto}.left-sidebar.open{left:0}.menu-toggle{display:block}.header{padding:var(--spacing-md) var(--spacing-lg)}.header-title h1{font-size:1.2em}.search-input{width:100%}.gallery{grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:var(--spacing-md)}}
  </style>
</head>
<body>
  <div class="header">
    <div class="header-left">
      <button class="menu-toggle" id="menuToggle">☰</button>
      <div class="header-logo">🎨</div>
      <div class="header-title">
        <h1>Pollinations AI</h1>
        <div class="header-version">v9.5.3 儀表板</div>
      </div>
    </div>
    <div class="header-right">
      <div class="api-status" id="apiStatus"><span>⏳</span><span>檢查中...</span></div>
    </div>
  </div>
  <div class="layout">
    <aside class="left-sidebar" id="leftSidebar">
      <div class="nav-section">
        <div class="nav-title">功能</div>
        <div class="nav-item active" data-page="generate"><span class="nav-icon">🎨</span><span>圖片生成</span></div>
        <div class="nav-item" data-page="history"><span class="nav-icon">📚</span><span>歷史記錄</span></div>
      </div>
      <div class="nav-section">
        <div class="nav-title">快捷比例</div>
        <div class="quick-ratios">
          <button class="ratio-quick-btn active" data-ratio="1:1" data-width="1024" data-height="1024"><div class="ratio-quick-icon"></div><span>1:1</span></button>
          <button class="ratio-quick-btn" data-ratio="16:9" data-width="1344" data-height="768"><div class="ratio-quick-icon landscape"></div><span>16:9</span></button>
          <button class="ratio-quick-btn" data-ratio="9:16" data-width="768" data-height="1344"><div class="ratio-quick-icon portrait"></div><span>9:16</span></button>
          <button class="ratio-quick-btn" data-ratio="4:3" data-width="1152" data-height="896"><div class="ratio-quick-icon landscape"></div><span>4:3</span></button>
          <button class="ratio-quick-btn" data-ratio="3:4" data-width="896" data-height="1152"><div class="ratio-quick-icon portrait"></div><span>3:4</span></button>
          <button class="ratio-quick-btn" data-ratio="21:9" data-width="1536" data-height="640"><div class="ratio-quick-icon wide"></div><span>21:9</span></button>
        </div>
      </div>
      <div class="nav-section">
        <div class="nav-title">快捷風格</div>
        <div class="quick-styles">
          <button class="style-quick-btn active" data-style="none"><span class="style-icon">∅</span><span class="style-name">無</span></button>
          <button class="style-quick-btn" data-style="photorealistic"><span class="style-icon">📷</span><span class="style-name">寫實</span></button>
          <button class="style-quick-btn" data-style="digital_art"><span class="style-icon">🎨</span><span class="style-name">數位</span></button>
          <button class="style-quick-btn" data-style="anime"><span class="style-icon">🎭</span><span class="style-name">動漫</span></button>
        </div>
      </div>
    </aside>
    <main class="main-content">
      <div id="generatePage">
        <div class="preview-area">
          <div class="preview-container" id="previewContainer">
            <div class="preview-placeholder"><div class="preview-placeholder-icon">🖼️</div><p>生成的圖片將在這裡顯示</p></div>
          </div>
          <div class="preview-actions" id="previewActions" style="display:none;">
            <button class="btn btn-success" id="downloadBtn"><span>📥</span><span>下載圖片</span></button>
            <button class="btn btn-secondary" id="saveBtn"><span>💾</span><span>保存到歷史</span></button>
          </div>
        </div>
        <div class="control-area">
          <form id="generateForm">
            <div class="form-group">
              <label class="form-label">📝 圖片描述</label>
              <textarea class="form-textarea" id="prompt" placeholder="描述您想要生成的圖片..." required></textarea>
              <div class="form-hint">💡 使用英文描述效果更佳</div>
            </div>
            <div class="control-row">
              <div class="form-group">
                <label class="form-label">🤖 生成模型</label>
                <select class="form-select" id="model">
                  <option value="flux">FLUX（推薦）</option>
                  <option value="zimage">ZImage</option>
                  <option value="turbo">Turbo</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">🎲 隨機種子</label>
                <input class="form-input" type="number" id="seed" placeholder="留空自動生成">
              </div>
            </div>
            <button type="submit" class="btn btn-primary" id="generateBtn"><span>🚀</span><span>開始生成</span></button>
          </form>
        </div>
      </div>
      <div class="history-page" id="historyPage">
        <div class="history-header">
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input type="text" class="search-input" id="searchInput" placeholder="搜索提示詞...">
          </div>
          <div class="history-controls">
            <select class="form-select" id="sortSelect" style="width:auto;">
              <option value="newest">最新優先</option>
              <option value="oldest">最舊優先</option>
            </select>
            <button class="btn btn-secondary" id="clearAllBtn"><span>🗑️</span><span>清空全部</span></button>
          </div>
        </div>
        <div class="gallery" id="gallery"></div>
        <div class="empty-state" id="emptyState"><div class="empty-icon">📭</div><h3>還沒有歷史記錄</h3><p>生成圖片後會自動保存在這裡</p></div>
      </div>
    </main>
    <aside class="right-panel">
      <div class="panel-card">
        <div class="panel-title"><span>📊</span><span>統計信息</span></div>
        <div class="stats-grid">
          <div class="stat-item"><span class="stat-value" id="totalCount">0</span><span class="stat-label">總數量</span></div>
          <div class="stat-item"><span class="stat-value" id="storageUsed">0</span><span class="stat-label">存儲(MB)</span></div>
        </div>
      </div>
      <div class="panel-card">
        <div class="panel-title"><span>🎯</span><span>當前參數</span></div>
        <div class="param-list">
          <div class="param-item"><span class="param-label">模型</span><span class="param-value" id="currentModel">FLUX</span></div>
          <div class="param-item"><span class="param-label">比例</span><span class="param-value" id="currentRatio">1:1</span></div>
          <div class="param-item"><span class="param-label">尺寸</span><span class="param-value" id="currentSize">1024×1024</span></div>
          <div class="param-item"><span class="param-label">風格</span><span class="param-value" id="currentStyle">無風格</span></div>
        </div>
      </div>
      <div class="panel-card">
        <div class="panel-title"><span>💾</span><span>最近生成</span></div>
        <div class="recent-list" id="recentList">
          <div class="empty-state" style="padding:var(--spacing-lg);"><p style="font-size:0.9em;">暫無記錄</p></div>
        </div>
        <button class="view-all-btn" id="viewAllBtn">📚 查看全部歷史</button>
      </div>
    </aside>
  </div>
  <div class="modal" id="imageModal">
    <div class="modal-content">
      <button class="modal-close" id="modalClose">✕</button>
      <img class="modal-image" id="modalImage" src="" alt="Preview">
    </div>
  </div>
  <div id="messageContainer"></div>
  <script>
    const STYLE_PRESETS={none:"",photorealistic:"photorealistic, professional photography, 8k uhd, dslr",digital_art:"digital art, vibrant colors, concept art, trending on artstation",oil_painting:"oil painting, artistic, painterly, fine art",anime:"anime style, manga art, cel shaded, vibrant",watercolor:"watercolor painting, soft colors, artistic",render_3d:"3d render, octane render, unreal engine",cyberpunk:"cyberpunk style, neon lights, futuristic",vintage:"vintage style, retro aesthetic, nostalgic",minimalist:"minimalist, clean, simple, modern design",fantasy:"fantasy art, magical, ethereal, epic",sketch:"pencil sketch, hand drawn, artistic"};const STYLE_NAMES={none:"無風格",photorealistic:"寫實",digital_art:"數位",oil_painting:"油畫",anime:"動漫",watercolor:"水彩",render_3d:"3D渲染",cyberpunk:"賽博朋克",vintage:"復古",minimalist:"極簡",fantasy:"奇幻",sketch:"素描"};let db;const DB_NAME="PollinationsHistory",DB_VERSION=1,STORE_NAME="images";function initDB(){return new Promise((e,t)=>{const n=indexedDB.open(DB_NAME,DB_VERSION);n.onerror=()=>t(n.error),n.onsuccess=()=>{db=n.result,e(db)},n.onupgradeneeded=e=>{const t=e.target.result;if(!t.objectStoreNames.contains(STORE_NAME)){const e=t.createObjectStore(STORE_NAME,{keyPath:"id",autoIncrement:!0});e.createIndex("timestamp","timestamp",{unique:!1}),e.createIndex("prompt","prompt",{unique:!1})}}})}async function saveToHistory(e){return new Promise((t,n)=>{const o=db.transaction([STORE_NAME],"readwrite").objectStore(STORE_NAME).add({...e,timestamp:Date.now()});o.onsuccess=()=>t(o.result),o.onerror=()=>n(o.error)})}async function getAllHistory(){return new Promise((e,t)=>{const n=db.transaction([STORE_NAME],"readonly").objectStore(STORE_NAME).getAll();n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function deleteHistory(e){return new Promise((t,n)=>{const o=db.transaction([STORE_NAME],"readwrite").objectStore(STORE_NAME).delete(e);o.onsuccess=()=>t(),o.onerror=()=>n(o.error)})}async function clearAllHistory(){return new Promise((e,t)=>{const n=db.transaction([STORE_NAME],"readwrite").objectStore(STORE_NAME).clear();n.onsuccess=()=>e(),n.onerror=()=>t(n.error)})}function showMessage(e,t="info"){const n=document.getElementById("messageContainer"),o=document.createElement("div");o.className=\`message \${t}\`,o.textContent=e,n.appendChild(o),setTimeout(()=>o.remove(),5e3)}function switchPage(e){document.querySelectorAll(".nav-item").forEach(t=>t.classList.toggle("active",t.dataset.page===e)),document.getElementById("generatePage").style.display="generate"===e?"block":"none",document.getElementById("historyPage").classList.toggle("active","history"===e),"history"===e&&loadHistory()}async function updateStats(){const e=await getAllHistory();document.getElementById("totalCount").textContent=e.length;let t=0;e.forEach(e=>{e.imageData&&(t+=e.imageData.length)});document.getElementById("storageUsed").textContent=(t/1024/1024).toFixed(2)}async function updateRecent(){const e=await getAllHistory();e.sort((e,t)=>t.timestamp-e.timestamp);const t=e.slice(0,3),n=document.getElementById("recentList");0===t.length?n.innerHTML='<div class="empty-state" style="padding:var(--spacing-lg);"><p style="font-size:0.9em;">暫無記錄</p></div>':n.innerHTML=t.map(e=>{const t=new Date(e.timestamp),n=Math.floor((Date.now()-e.timestamp)/6e4);let o=n<1?"剛剛":n<60?\`\${n}分鐘前\`:n<1440?\`\${Math.floor(n/60)}小時前\`:\`\${Math.floor(n/1440)}天前\`;return\`<div class="recent-item" onclick="viewImage(\${e.id})"><img class="recent-thumb" src="\${e.imageData}" alt=""><div class="recent-info"><div class="recent-prompt">\${e.prompt}</div><div class="recent-time">\${o}</div></div></div>\`}).join("")}async function loadHistory(){const e=await getAllHistory(),t=document.getElementById("sortSelect").value;e.sort((e,n)=>"newest"===t?n.timestamp-e.timestamp:e.timestamp-n.timestamp);const n=document.getElementById("searchInput").value.toLowerCase(),o=n?e.filter(e=>e.prompt.toLowerCase().includes(n)):e,a=document.getElementById("gallery"),r=document.getElementById("emptyState");0===o.length?(a.style.display="none",r.style.display="block"):(a.style.display="grid",r.style.display="none",a.innerHTML=o.map(e=>\`<div class="gallery-item"><img class="gallery-thumb" src="\${e.imageData}" alt="" onclick="viewImage(\${e.id})"><div class="gallery-info"><div class="gallery-prompt">\${e.prompt}</div><div class="gallery-meta"><span>\${e.model}</span><span>\${e.ratio}</span></div><div class="gallery-actions"><button class="btn-reuse" onclick="reuseParams(\${e.id})">🔄 重用</button><button class="btn-delete" onclick="deleteItem(\${e.id})">🗑️ 刪除</button></div></div></div>\`).join("")),updateStats()}async function reuseParams(e){const t=await getAllHistory(),n=t.find(t=>t.id===e);if(n){document.getElementById("prompt").value=n.originalPrompt||n.prompt,document.getElementById("model").value=n.model,document.getElementById("seed").value=n.seed||"";const e=document.querySelector(\`[data-ratio="\${n.ratio}"]\`);e&&(document.querySelectorAll(".ratio-quick-btn").forEach(e=>e.classList.remove("active")),e.classList.add("active"),updateCurrentParams());const t=document.querySelector(\`[data-style="\${n.style||"none"}"]\`);t&&(document.querySelectorAll(".style-quick-btn").forEach(e=>e.classList.remove("active")),t.classList.add("active"),updateCurrentParams()),switchPage("generate"),showMessage("✅ 參數已填充","success")}}async function deleteItem(e){confirm("確定要刪除這張圖片嗎？")&&(await deleteHistory(e),await loadHistory(),await updateRecent(),showMessage("✅ 已刪除","success"))}async function viewImage(e){const t=await getAllHistory(),n=t.find(t=>t.id===e);n&&(document.getElementById("modalImage").src=n.imageData,document.getElementById("imageModal").classList.add("active"))}function updateCurrentParams(){const e=document.querySelector(".ratio-quick-btn.active"),t=document.querySelector(".style-quick-btn.active"),n=document.getElementById("model").value;if(e){const t=e.dataset.ratio,n=e.dataset.width,o=e.dataset.height;document.getElementById("currentRatio").textContent=t,document.getElementById("currentSize").textContent=\`\${n}×\${o}\`}t&&(document.getElementById("currentStyle").textContent=STYLE_NAMES[t.dataset.style]||"無風格"),document.getElementById("currentModel").textContent=n.toUpperCase()}async function checkAPIStatus(){try{const e=await fetch("/health"),t=await e.json(),n=document.getElementById("apiStatus");t.status==="ok"&&t.hasApiKey?(n.innerHTML='<span>✅</span><span>API 已就緒</span>',n.style.background="rgba(76,175,80,0.3)"):t.status==="ok"&&!t.hasApiKey?(n.innerHTML='<span>⚠️</span><span>缺少 API Key</span>',n.style.background="rgba(255,152,0,0.3)"):(n.innerHTML='<span>❌</span><span>API 不可用</span>',n.style.background="rgba(244,67,54,0.3)")}catch(e){document.getElementById("apiStatus").innerHTML='<span>❌</span><span>連接失敗</span>'}}document.querySelectorAll(".nav-item").forEach(e=>{e.addEventListener("click",()=>switchPage(e.dataset.page))}),document.getElementById("menuToggle").addEventListener("click",()=>{document.getElementById("leftSidebar").classList.toggle("open")}),document.querySelectorAll(".ratio-quick-btn").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll(".ratio-quick-btn").forEach(e=>e.classList.remove("active")),e.classList.add("active"),updateCurrentParams()})}),document.querySelectorAll(".style-quick-btn").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll(".style-quick-btn").forEach(e=>e.classList.remove("active")),e.classList.add("active"),updateCurrentParams()})}),document.getElementById("model").addEventListener("change",updateCurrentParams),document.getElementById("viewAllBtn").addEventListener("click",()=>switchPage("history")),document.getElementById("sortSelect").addEventListener("change",loadHistory),document.getElementById("searchInput").addEventListener("input",loadHistory),document.getElementById("clearAllBtn").addEventListener("click",async()=>{confirm("確定要清空所有歷史記錄嗎？")&&(await clearAllHistory(),await loadHistory(),await updateRecent(),showMessage("✅ 已清空","success"))}),document.getElementById("modalClose").addEventListener("click",()=>{document.getElementById("imageModal").classList.remove("active")}),document.getElementById("imageModal").addEventListener("click",e=>{"imageModal"===e.target.id&&document.getElementById("imageModal").classList.remove("active")}),document.getElementById("generateForm").addEventListener("submit",async e=>{e.preventDefault();const t=document.getElementById("generateBtn"),n=document.getElementById("previewContainer"),o=document.getElementById("previewActions");t.disabled=!0,t.innerHTML='<span>⏳</span><span>生成中...</span>',n.innerHTML='<div class="loading"><div class="spinner"></div><p>正在生成圖片，請稍候...</p></div>',n.classList.remove("has-image"),o.style.display="none";const a=document.querySelector(".style-quick-btn.active"),r=a?a.dataset.style:"none",s=STYLE_PRESETS[r],i=document.querySelector(".ratio-quick-btn.active"),d=i.dataset.ratio,l=i.dataset.width,c=i.dataset.height,u=document.getElementById("prompt").value,m=s?\`\${u}, \${s}\`:u,p={prompt:m,model:document.getElementById("model").value,width:parseInt(l),height:parseInt(c),seed:document.getElementById("seed").value?parseInt(document.getElementById("seed").value):void 0};try{const e=await fetch("/_internal/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(p)});if(!e.ok){const t=await e.json();throw new Error(t.message||"生成失敗")}const t=await e.blob(),a=URL.createObjectURL(t),r=new FileReader;r.onloadend=async()=>{window.currentImage={imageData:r.result,originalPrompt:u,prompt:m,model:p.model,width:p.width,height:p.height,ratio:d,style:document.querySelector(".style-quick-btn.active").dataset.style,seed:p.seed||Math.floor(1e6*Math.random())},n.innerHTML=\`<img src="\${a}" alt="Generated image">\`,n.classList.add("has-image"),o.style.display="flex",showMessage("✅ 圖片生成成功！","success")},r.readAsDataURL(t)}catch(e){n.innerHTML=\`<div class="preview-placeholder"><div class="preview-placeholder-icon">❌</div><p>\${e.message}</p></div>\`,showMessage("生成失敗: "+e.message,"error")}finally{t.disabled=!1,t.innerHTML='<span>🚀</span><span>開始生成</span>'}}),document.getElementById("downloadBtn").addEventListener("click",()=>{if(window.currentImage){const e=document.createElement("a");e.href=window.currentImage.imageData,e.download=\`pollinations_\${Date.now()}.png\`,e.click(),showMessage("✅ 下載開始","success")}}),document.getElementById("saveBtn").addEventListener("click",async()=>{if(window.currentImage)try{await saveToHistory(window.currentImage),await updateStats(),await updateRecent(),showMessage("✅ 已保存到歷史","success")}catch(e){showMessage("保存失敗: "+e.message,"error")}}),async function(){try{await initDB(),await checkAPIStatus(),await updateStats(),await updateRecent(),console.log("✅ 初始化完成")}catch(e){console.error("初始化失敗:",e),showMessage("初始化失敗: "+e.message,"error")}}();
  </script>
</body>
</html>`;
}
// ============================================
// 🚀 主 Worker 導出函數
// ============================================

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    try {
      if (request.method === 'OPTIONS') {
        return handleOptions();
      }
      switch (path) {
        case '/_internal/generate':
          return await handleGenerate(request, env);
        case '/health':
          return await handleHealth(env);
        case '/models':
          return await handleModels();
        case '/':
          return new Response(getWebUI(), {
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              'Cache-Control': 'public, max-age=3600'
            }
          });
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

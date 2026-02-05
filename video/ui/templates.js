/**
 * 影片生成 UI 模板
 * Video Generation UI Templates
 */

export const VideoTemplates = {
  // 主頁面模板
  mainPage: `
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>影片生成 - Flux AI Pro</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      min-height: 100vh;
      color: #fff;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .header {
      text-align: center;
      padding: 30px 0;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      margin-bottom: 30px;
    }
    
    .header h1 {
      font-size: 2.5rem;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 10px;
    }
    
    .header p {
      color: rgba(255,255,255,0.7);
      font-size: 1.1rem;
    }
    
    .main-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
    }
    
    @media (max-width: 768px) {
      .main-content {
        grid-template-columns: 1fr;
      }
    }
    
    .panel {
      background: rgba(255,255,255,0.05);
      border-radius: 16px;
      padding: 25px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.1);
    }
    
    .panel-title {
      font-size: 1.3rem;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: rgba(255,255,255,0.9);
    }
    
    .form-input, .form-select, .form-textarea {
      width: 100%;
      padding: 12px 16px;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 8px;
      color: #fff;
      font-size: 1rem;
      transition: all 0.3s;
    }
    
    .form-input:focus, .form-select:focus, .form-textarea:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
    }
    
    .form-textarea {
      min-height: 120px;
      resize: vertical;
    }
    
    .upload-area {
      border: 2px dashed rgba(255,255,255,0.3);
      border-radius: 12px;
      padding: 40px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;
    }
    
    .upload-area:hover {
      border-color: #667eea;
      background: rgba(102, 126, 234, 0.1);
    }
    
    .upload-area.dragover {
      border-color: #667eea;
      background: rgba(102, 126, 234, 0.2);
    }
    
    .upload-icon {
      font-size: 3rem;
      margin-bottom: 10px;
    }
    
    .upload-text {
      color: rgba(255,255,255,0.7);
    }
    
    .upload-preview {
      margin-top: 15px;
      display: none;
    }
    
    .upload-preview img {
      max-width: 100%;
      max-height: 200px;
      border-radius: 8px;
    }
    
    .slider-container {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    
    .slider {
      flex: 1;
      -webkit-appearance: none;
      height: 6px;
      background: rgba(255,255,255,0.2);
      border-radius: 3px;
      outline: none;
    }
    
    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      background: #667eea;
      border-radius: 50%;
      cursor: pointer;
    }
    
    .slider-value {
      min-width: 50px;
      text-align: center;
      font-weight: 600;
    }
    
    .quota-display {
      background: rgba(102, 126, 234, 0.2);
      border-radius: 12px;
      padding: 15px;
      margin-bottom: 20px;
    }
    
    .quota-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    
    .quota-label {
      color: rgba(255,255,255,0.8);
    }
    
    .quota-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #667eea;
    }
    
    .quota-bar {
      height: 8px;
      background: rgba(255,255,255,0.1);
      border-radius: 4px;
      overflow: hidden;
    }
    
    .quota-progress {
      height: 100%;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      transition: width 0.3s;
    }
    
    .cooldown-timer {
      text-align: center;
      padding: 10px;
      background: rgba(239, 68, 68, 0.2);
      border-radius: 8px;
      margin-top: 10px;
      display: none;
    }
    
    .cooldown-timer.active {
      display: block;
    }
    
    .generate-btn {
      width: 100%;
      padding: 16px;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 12px;
      color: #fff;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }
    
    .generate-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
    }
    
    .generate-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .generate-btn .spinner {
      display: none;
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    .generate-btn.loading .spinner {
      display: block;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .progress-container {
      margin-top: 20px;
      display: none;
    }
    
    .progress-container.active {
      display: block;
    }
    
    .progress-bar {
      height: 6px;
      background: rgba(255,255,255,0.1);
      border-radius: 3px;
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      transition: width 0.3s;
      animation: pulse 2s ease-in-out infinite;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    
    .progress-text {
      text-align: center;
      margin-top: 10px;
      color: rgba(255,255,255,0.7);
    }
    
    .result-container {
      display: none;
    }
    
    .result-container.active {
      display: block;
    }
    
    .video-player {
      width: 100%;
      border-radius: 12px;
      overflow: hidden;
      background: #000;
    }
    
    .video-player video {
      width: 100%;
      display: block;
    }
    
    .result-actions {
      display: flex;
      gap: 10px;
      margin-top: 15px;
    }
    
    .action-btn {
      flex: 1;
      padding: 12px;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 8px;
      color: #fff;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    
    .action-btn:hover {
      background: rgba(255,255,255,0.2);
    }
    
    .history-section {
      margin-top: 30px;
    }
    
    .history-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 15px;
      margin-top: 15px;
    }
    
    .history-item {
      background: rgba(255,255,255,0.05);
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s;
    }
    
    .history-item:hover {
      transform: scale(1.05);
      box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    }
    
    .history-thumbnail {
      width: 100%;
      aspect-ratio: 16/9;
      background: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
    }
    
    .history-info {
      padding: 10px;
    }
    
    .history-prompt {
      font-size: 0.85rem;
      color: rgba(255,255,255,0.7);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .error-message {
      background: rgba(239, 68, 68, 0.2);
      border: 1px solid rgba(239, 68, 68, 0.5);
      border-radius: 8px;
      padding: 15px;
      margin-top: 15px;
      display: none;
    }
    
    .error-message.active {
      display: block;
    }
    
    .error-message p {
      color: #fca5a5;
    }
    
    .back-link {
      display: inline-block;
      margin-top: 20px;
      color: rgba(255,255,255,0.7);
      text-decoration: none;
      transition: color 0.3s;
    }
    
    .back-link:hover {
      color: #667eea;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎬 影片生成</h1>
      <p>使用 Pollinations.ai AI 技術生成精彩影片</p>
    </div>
    
    <div class="main-content">
      <!-- 左側：輸入表單 -->
      <div class="panel">
        <div class="panel-title">
          <span>✨</span>
          <span>生成設定</span>
        </div>
        
        <!-- 配額顯示 -->
        <div class="quota-display">
          <div class="quota-info">
            <span class="quota-label">剩餘配額</span>
            <span class="quota-value" id="quotaValue">--</span>
          </div>
          <div class="quota-bar">
            <div class="quota-progress" id="quotaProgress" style="width: 0%"></div>
          </div>
          <div class="cooldown-timer" id="cooldownTimer">
            冷卻中：<span id="cooldownTime">--</span>
          </div>
        </div>
        
        <!-- 提示詞輸入 -->
        <div class="form-group">
          <label class="form-label">提示詞</label>
          <textarea class="form-textarea" id="promptInput" placeholder="描述您想要生成的影片內容..."></textarea>
        </div>
        
        <!-- 圖片上傳 -->
        <div class="form-group">
          <label class="form-label">參考圖片（可選）</label>
          <div class="upload-area" id="uploadArea">
            <div class="upload-icon">📷</div>
            <div class="upload-text">拖曳圖片到這裡或點擊上傳</div>
            <input type="file" id="imageInput" accept="image/*" style="display: none;">
          </div>
          <div class="upload-preview" id="uploadPreview">
            <img id="previewImage" src="" alt="預覽">
          </div>
        </div>
        
        <!-- 模型選擇 -->
        <div class="form-group">
          <label class="form-label">模型</label>
          <select class="form-select" id="modelSelect">
            <option value="flux-video">Flux Video（預設）</option>
            <option value="turbo">Turbo（快速）</option>
          </select>
        </div>
        
        <!-- 尺寸選擇 -->
        <div class="form-group">
          <label class="form-label">尺寸</label>
          <select class="form-select" id="sizeSelect">
            <option value="1280x720">1280x720 (HD)</option>
            <option value="1920x1080">1920x1080 (Full HD)</option>
            <option value="720x720">720x720 (Square)</option>
            <option value="1080x1920">1080x1920 (Portrait)</option>
          </select>
        </div>
        
        <!-- FPS 調整 -->
        <div class="form-group">
          <label class="form-label">幀率 (FPS)</label>
          <div class="slider-container">
            <input type="range" class="slider" id="fpsSlider" min="24" max="60" value="24">
            <span class="slider-value" id="fpsValue">24</span>
          </div>
        </div>
        
        <!-- 持續時間調整 -->
        <div class="form-group">
          <label class="form-label">持續時間（秒）</label>
          <div class="slider-container">
            <input type="range" class="slider" id="durationSlider" min="3" max="10" value="5">
            <span class="slider-value" id="durationValue">5</span>
          </div>
        </div>
        
        <!-- 生成按鈕 -->
        <button class="generate-btn" id="generateBtn">
          <span class="spinner"></span>
          <span class="btn-text">開始生成</span>
        </button>
        
        <!-- 進度顯示 -->
        <div class="progress-container" id="progressContainer">
          <div class="progress-bar">
            <div class="progress-fill" id="progressFill" style="width: 0%"></div>
          </div>
          <div class="progress-text" id="progressText">正在生成影片...</div>
        </div>
        
        <!-- 錯誤訊息 -->
        <div class="error-message" id="errorMessage">
          <p id="errorText"></p>
        </div>
      </div>
      
      <!-- 右側：結果顯示 -->
      <div class="panel">
        <div class="panel-title">
          <span>🎥</span>
          <span>生成結果</span>
        </div>
        
        <!-- 影片播放器 -->
        <div class="result-container" id="resultContainer">
          <div class="video-player">
            <video id="videoPlayer" controls loop></video>
          </div>
          <div class="result-actions">
            <button class="action-btn" id="downloadBtn">
              <span>⬇️</span>
              <span>下載</span>
            </button>
            <button class="action-btn" id="shareBtn">
              <span>🔗</span>
              <span>分享</span>
            </button>
            <button class="action-btn" id="regenerateBtn">
              <span>🔄</span>
              <span>重新生成</span>
            </button>
          </div>
        </div>
        
        <!-- 空狀態 -->
        <div id="emptyState" style="text-align: center; padding: 60px 20px; color: rgba(255,255,255,0.5);">
          <div style="font-size: 4rem; margin-bottom: 20px;">🎬</div>
          <p>輸入提示詞並點擊生成按鈕開始創作</p>
        </div>
        
        <!-- 歷史記錄 -->
        <div class="history-section">
          <div class="panel-title">
            <span>📚</span>
            <span>歷史記錄</span>
          </div>
          <div class="history-grid" id="historyGrid">
            <!-- 歷史項目將動態插入 -->
          </div>
        </div>
      </div>
    </div>
    
    <a href="/" class="back-link">← 返回首頁</a>
  </div>
  
  <script>
    // JavaScript 將由 page-generator.js 動態生成
  </script>
</body>
</html>
  `,

  // Nano 版本模板
  nanoPage: `
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>影片生成 - Flux AI Pro</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      min-height: 100vh;
      color: #fff;
      padding: 15px;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
    }
    
    .header {
      text-align: center;
      padding: 20px 0;
    }
    
    .header h1 {
      font-size: 1.8rem;
      margin-bottom: 5px;
    }
    
    .header p {
      color: rgba(255,255,255,0.7);
      font-size: 0.9rem;
    }
    
    .form-group {
      margin-bottom: 15px;
    }
    
    .form-label {
      display: block;
      margin-bottom: 5px;
      font-size: 0.9rem;
      color: rgba(255,255,255,0.9);
    }
    
    .form-input, .form-select, .form-textarea {
      width: 100%;
      padding: 10px 12px;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 8px;
      color: #fff;
      font-size: 0.95rem;
    }
    
    .form-textarea {
      min-height: 80px;
      resize: vertical;
    }
    
    .upload-area {
      border: 2px dashed rgba(255,255,255,0.3);
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      cursor: pointer;
    }
    
    .upload-preview {
      margin-top: 10px;
      display: none;
    }
    
    .upload-preview img {
      max-width: 100%;
      max-height: 150px;
      border-radius: 6px;
    }
    
    .quota-display {
      background: rgba(102, 126, 234, 0.2);
      border-radius: 8px;
      padding: 10px;
      margin-bottom: 15px;
      text-align: center;
    }
    
    .quota-value {
      font-size: 1.3rem;
      font-weight: 700;
      color: #667eea;
    }
    
    .generate-btn {
      width: 100%;
      padding: 14px;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 10px;
      color: #fff;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
    }
    
    .generate-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .progress-container {
      margin-top: 15px;
      display: none;
    }
    
    .progress-container.active {
      display: block;
    }
    
    .progress-bar {
      height: 4px;
      background: rgba(255,255,255,0.1);
      border-radius: 2px;
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      animation: pulse 2s ease-in-out infinite;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    
    .result-container {
      margin-top: 20px;
      display: none;
    }
    
    .result-container.active {
      display: block;
    }
    
    .video-player video {
      width: 100%;
      border-radius: 8px;
    }
    
    .result-actions {
      display: flex;
      gap: 8px;
      margin-top: 10px;
    }
    
    .action-btn {
      flex: 1;
      padding: 10px;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 6px;
      color: #fff;
      font-size: 0.9rem;
      cursor: pointer;
    }
    
    .error-message {
      background: rgba(239, 68, 68, 0.2);
      border-radius: 6px;
      padding: 10px;
      margin-top: 10px;
      display: none;
    }
    
    .error-message.active {
      display: block;
    }
    
    .back-link {
      display: inline-block;
      margin-top: 15px;
      color: rgba(255,255,255,0.7);
      text-decoration: none;
      font-size: 0.9rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎬 影片生成</h1>
      <p>Pollinations.ai</p>
    </div>
    
    <div class="quota-display">
      <div>剩餘配額：<span class="quota-value" id="quotaValue">--</span></div>
    </div>
    
    <div class="form-group">
      <label class="form-label">提示詞</label>
      <textarea class="form-textarea" id="promptInput" placeholder="描述影片內容..."></textarea>
    </div>
    
    <div class="form-group">
      <label class="form-label">參考圖片（可選）</label>
      <div class="upload-area" id="uploadArea">
        <span>📷 點擊上傳</span>
        <input type="file" id="imageInput" accept="image/*" style="display: none;">
      </div>
      <div class="upload-preview" id="uploadPreview">
        <img id="previewImage" src="" alt="預覽">
      </div>
    </div>
    
    <div class="form-group">
      <label class="form-label">模型</label>
      <select class="form-select" id="modelSelect">
        <option value="flux-video">Flux Video</option>
        <option value="turbo">Turbo</option>
      </select>
    </div>
    
    <button class="generate-btn" id="generateBtn">開始生成</button>
    
    <div class="progress-container" id="progressContainer">
      <div class="progress-bar">
        <div class="progress-fill" id="progressFill" style="width: 0%"></div>
      </div>
    </div>
    
    <div class="result-container" id="resultContainer">
      <div class="video-player">
        <video id="videoPlayer" controls loop></video>
      </div>
      <div class="result-actions">
        <button class="action-btn" id="downloadBtn">⬇️ 下載</button>
        <button class="action-btn" id="regenerateBtn">🔄 重新生成</button>
      </div>
    </div>
    
    <div class="error-message" id="errorMessage">
      <p id="errorText"></p>
    </div>
    
    <a href="/" class="back-link">← 返回首頁</a>
  </div>
  
  <script>
    // JavaScript 將由 page-generator.js 動態生成
  </script>
</body>
</html>
  `
};

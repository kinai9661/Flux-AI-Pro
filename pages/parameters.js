/**
 * 參數調整頁面
 */

import { renderSidebar } from '../components/sidebar.js';
import { renderHeader } from '../components/header.js';

/**
 * 渲染參數調整頁面
 */
export function renderParametersPage() {
    return `
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>參數調整 - Flux AI Pro 管理後台</title>
    <link rel="stylesheet" href="/admin/styles/base.css">
    <style>
        .param-section { background: white; border-radius: 16px; margin-bottom: 20px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .param-section-header { padding: 20px 24px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; }
        .param-section-header h3 { font-size: 16px; color: #1f2937; display: flex; align-items: center; gap: 8px; }
        .param-section-body { padding: 20px 24px; }
        .param-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .param-item { padding: 16px; background: #f9fafb; border-radius: 8px; }
        .param-item label { display: block; font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 8px; }
        .param-item input, .param-item select { width: 100%; }
        .param-item .hint { font-size: 12px; color: #6b7280; margin-top: 4px; }
        .slider-container { display: flex; align-items: center; gap: 12px; }
        .slider-container input[type="range"] { flex: 1; }
        .slider-value { min-width: 60px; text-align: right; font-weight: 600; color: #667eea; }
    </style>
</head>
<body>
    ${renderSidebar('parameters')}
    
    <div class="main-content">
        ${renderHeader('參數調整')}
        
        <div style="padding: 24px;">
            <div class="param-section">
                <div class="param-section-header">
                    <h3>⚡ 優化規則</h3>
                    <button class="btn btn-primary btn-sm" onclick="saveOptimization()">保存設置</button>
                </div>
                <div class="param-section-body">
                    <div class="param-grid" id="optimizationGrid">
                        <div class="loading-state"><div class="spinner"></div><p>載入中...</p></div>
                    </div>
                </div>
            </div>
            
            <div class="param-section">
                <div class="param-section-header">
                    <h3>🚦 速率限制</h3>
                    <button class="btn btn-primary btn-sm" onclick="saveRateLimits()">保存設置</button>
                </div>
                <div class="param-section-body">
                    <div class="param-grid">
                        <div class="param-item">
                            <label>每分鐘最大請求數</label>
                            <div class="slider-container">
                                <input type="range" id="maxRequests" min="1" max="100" value="60" oninput="updateSliderValue(this)">
                                <span class="slider-value" id="maxRequestsValue">60</span>
                            </div>
                        </div>
                        <div class="param-item">
                            <label>超時時間 (秒)</label>
                            <div class="slider-container">
                                <input type="range" id="timeout" min="10" max="300" value="120" oninput="updateSliderValue(this)">
                                <span class="slider-value" id="timeoutValue">120</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        const token = localStorage.getItem('adminToken');
        if (!token) window.location.href = '/admin/login';
        
        let parameters = {};
        
        async function loadParameters() {
            try {
                const response = await fetch('/admin/api/parameters', {
                    headers: { 'Authorization': 'Bearer ' + token }
                });
                const data = await response.json();
                
                if (data.success) {
                    parameters = data.parameters || {};
                    renderOptimization();
                }
            } catch (error) {
                console.error('載入失敗:', error);
            }
        }
        
        function renderOptimization() {
            const optimization = parameters.optimization_rules || {};
            
            document.getElementById('optimizationGrid').innerHTML = \`
                <div class="param-item">
                    <label>自動優化</label>
                    <select id="autoOptimize">
                        <option value="true" \${optimization.auto_optimize !== false ? 'selected' : ''}>啟用</option>
                        <option value="false" \${optimization.auto_optimize === false ? 'selected' : ''}>禁用</option>
                    </select>
                </div>
                <div class="param-item">
                    <label>自動翻譯</label>
                    <select id="autoTranslate">
                        <option value="true" \${optimization.auto_translate !== false ? 'selected' : ''}>啟用</option>
                        <option value="false" \${optimization.auto_translate === false ? 'selected' : ''}>禁用</option>
                    </select>
                </div>
            \`;
            
            const rateLimits = parameters.rate_limits || {};
            document.getElementById('maxRequests').value = rateLimits.max_requests || 60;
            document.getElementById('timeout').value = rateLimits.timeout || 120;
            updateSliderValue(document.getElementById('maxRequests'));
            updateSliderValue(document.getElementById('timeout'));
        }
        
        function updateSliderValue(input) {
            document.getElementById(input.id + 'Value').textContent = input.value;
        }
        
        async function saveOptimization() {
            const data = {
                auto_optimize: document.getElementById('autoOptimize').value === 'true',
                auto_translate: document.getElementById('autoTranslate').value === 'true'
            };
            
            try {
                const response = await fetch('/admin/api/parameters/optimization', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(data)
                });
                
                if (response.ok) {
                    alert('保存成功！');
                } else {
                    alert('保存失敗');
                }
            } catch (error) {
                alert('網絡錯誤: ' + error.message);
            }
        }
        
        async function saveRateLimits() {
            const data = {
                max_requests: parseInt(document.getElementById('maxRequests').value),
                timeout: parseInt(document.getElementById('timeout').value)
            };
            
            try {
                const response = await fetch('/admin/api/parameters/rate-limits', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(data)
                });
                
                if (response.ok) {
                    alert('保存成功！');
                } else {
                    alert('保存失敗');
                }
            } catch (error) {
                alert('網絡錯誤: ' + error.message);
            }
        }
        
        loadParameters();
    </script>
</body>
</html>
    `;
}

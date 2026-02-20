/**
 * 儀表板頁面
 */

import { renderSidebar, getCurrentPageId } from '../components/sidebar.js';
import { renderHeader } from '../components/header.js';
import { renderStatCard } from '../components/common.js';
import { apiClient } from '../api/client.js';
import { formatDate } from '../utils/helpers.js';

/**
 * 渲染儀表板頁面
 */
export function renderDashboardPage() {
    return `
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>儀表板 - Flux AI Pro 管理後台</title>
    <link rel="stylesheet" href="/admin/styles/base.css">
</head>
<body>
    ${renderSidebar('dashboard')}
    
    <div class="main-content">
        ${renderHeader('儀表板')}
        
        <div class="stats-grid" id="statsGrid">
            <div class="stat-card">
                <div class="stat-value">-</div>
                <div class="stat-label">總供應商</div>
            </div>
            <div class="stat-card green">
                <div class="stat-value">-</div>
                <div class="stat-label">啟用供應商</div>
            </div>
            <div class="stat-card orange">
                <div class="stat-value">-</div>
                <div class="stat-label">總模型數</div>
            </div>
            <div class="stat-card blue">
                <div class="stat-value">-</div>
                <div class="stat-label">自定義供應商</div>
            </div>
        </div>
        
        <div style="padding: 24px;">
            <div class="card" style="margin-bottom: 20px;">
                <div class="card-header">
                    <h3>📊 系統狀態</h3>
                </div>
                <div class="card-body" id="systemStatus">
                    <div class="loading-state">
                        <div class="spinner"></div>
                        <p>載入中...</p>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3>🚀 快速操作</h3>
                </div>
                <div class="card-body">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
                        <a href="/admin/providers" class="card" style="padding: 20px; text-align: center; text-decoration: none; color: inherit;">
                            <div style="font-size: 32px; margin-bottom: 8px;">⚙️</div>
                            <div style="font-weight: 600;">模型配置</div>
                            <div style="font-size: 12px; color: #6b7280;">配置供應商和模型</div>
                        </a>
                        <a href="/admin/parameters" class="card" style="padding: 20px; text-align: center; text-decoration: none; color: inherit;">
                            <div style="font-size: 32px; margin-bottom: 8px;">🔧</div>
                            <div style="font-weight: 600;">參數調整</div>
                            <div style="font-size: 12px; color: #6b7280;">優化參數設置</div>
                        </a>
                        <a href="/admin/settings" class="card" style="padding: 20px; text-align: center; text-decoration: none; color: inherit;">
                            <div style="font-size: 32px; margin-bottom: 8px;">🔐</div>
                            <div style="font-weight: 600;">系統設置</div>
                            <div style="font-size: 12px; color: #6b7280;">密碼與備份</div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div id="modalContainer"></div>
    
    <script>
        const token = localStorage.getItem('adminToken');
        if (!token) {
            window.location.href = '/admin/login';
        }
        
        async function loadStats() {
            try {
                const response = await fetch('/admin/api/stats', {
                    headers: { 'Authorization': 'Bearer ' + token }
                });
                const data = await response.json();
                
                if (data.success) {
                    const stats = data.stats;
                    document.querySelector('.stats-grid').innerHTML = 
                        renderStatCard(stats.providers?.total || 0, '總供應商') +
                        renderStatCard(stats.providers?.enabled || 0, '啟用供應商', 'green') +
                        renderStatCard(stats.models?.total || 0, '總模型數', 'orange') +
                        renderStatCard(stats.providers?.custom || 0, '自定義供應商', 'blue');
                    
                    document.getElementById('systemStatus').innerHTML = \`
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
                            <div class="info-item">
                                <label>內建模型</label>
                                <span>\${stats.models?.builtin || 0} 個</span>
                            </div>
                            <div class="info-item">
                                <label>自定義模型</label>
                                <span>\${stats.models?.custom || 0} 個</span>
                            </div>
                            <div class="info-item">
                                <label>在線用戶</label>
                                <span>\${stats.online || 0} 人</span>
                            </div>
                            <div class="info-item">
                                <label>系統版本</label>
                                <span>v11.16.0</span>
                            </div>
                        </div>
                    \`;
                }
            } catch (error) {
                console.error('載入統計失敗:', error);
                document.getElementById('systemStatus').innerHTML = \`
                    <div class="error-state">
                        <p style="color: #ef4444;">載入失敗，請重新整理頁面</p>
                    </div>
                \`;
            }
        }
        
        function renderStatCard(value, label, variant = '') {
            return \`
                <div class="stat-card \${variant}">
                    <div class="stat-value">\${value}</div>
                    <div class="stat-label">\${label}</div>
                </div>
            \`;
        }
        
        loadStats();
    </script>
</body>
</html>
    `;
}

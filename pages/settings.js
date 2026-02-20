/**
 * 系統設置頁面模組
 * 處理密碼修改、數據備份、系統配置等功能
 */

import { apiClient } from '../api/client.js';
import { getToken, logout, checkAuthOrRedirect } from '../utils/auth.js';
import { showLoading, hideLoading, showToast, showError, confirm } from '../utils/helpers.js';
import { renderSidebar } from '../components/sidebar.js';
import { renderHeader } from '../components/header.js';

/**
 * 渲染系統設置頁面
 */
export async function renderSettingsPage() {
    // 檢查認證
    if (!checkAuthOrRedirect()) return;
    
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="admin-layout">
            ${renderSidebar('settings')}
            <div class="admin-main">
                ${renderHeader('系統設置')}
                <div class="admin-content">
                    <!-- 載入中 -->
                    <div id="settings-loading" class="loading-container">
                        <div class="loading-spinner"></div>
                        <p>載入中...</p>
                    </div>
                    
                    <!-- 設置內容 -->
                    <div id="settings-content" class="settings-container" style="display: none;">
                        <!-- 密碼修改區塊 -->
                        <div class="settings-section">
                            <div class="section-header">
                                <h3>🔐 密碼管理</h3>
                                <p class="section-desc">修改管理員登入密碼</p>
                            </div>
                            <div class="section-content">
                                <form id="password-form" class="settings-form">
                                    <div class="form-group">
                                        <label for="current-password">目前密碼</label>
                                        <input type="password" id="current-password" name="currentPassword" 
                                               placeholder="請輸入目前密碼" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="new-password">新密碼</label>
                                        <input type="password" id="new-password" name="newPassword" 
                                               placeholder="請輸入新密碼" required minlength="6">
                                    </div>
                                    <div class="form-group">
                                        <label for="confirm-password">確認新密碼</label>
                                        <input type="password" id="confirm-password" name="confirmPassword" 
                                               placeholder="請再次輸入新密碼" required>
                                    </div>
                                    <div class="form-actions">
                                        <button type="submit" class="btn btn-primary">更新密碼</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        
                        <!-- 全局設置區塊 -->
                        <div class="settings-section">
                            <div class="section-header">
                                <h3>⚙️ 全局配置</h3>
                                <p class="section-desc">系統運行參數配置</p>
                            </div>
                            <div class="section-content">
                                <form id="global-settings-form" class="settings-form">
                                    <div class="form-row">
                                        <div class="form-group">
                                            <label for="default-provider">預設供應商</label>
                                            <select id="default-provider" name="defaultProvider">
                                                <option value="pollinations">Pollinations</option>
                                                <option value="infip">Infip</option>
                                                <option value="aqua">Aqua</option>
                                                <option value="kinai">Kinai</option>
                                                <option value="airforce">Airforce</option>
                                                <option value="nonpon">Nonpon</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="default-model">預設模型</label>
                                            <input type="text" id="default-model" name="defaultModel" 
                                                   placeholder="flux">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group">
                                            <label for="max-width">最大寬度</label>
                                            <input type="number" id="max-width" name="maxWidth" 
                                                   placeholder="2048" min="256" max="4096">
                                        </div>
                                        <div class="form-group">
                                            <label for="max-height">最大高度</label>
                                            <input type="number" id="max-height" name="maxHeight" 
                                                   placeholder="2048" min="256" max="4096">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="checkbox-label">
                                            <input type="checkbox" id="enable-hd" name="enableHD">
                                            <span>啟用 HD 優化</span>
                                        </label>
                                    </div>
                                    <div class="form-group">
                                        <label class="checkbox-label">
                                            <input type="checkbox" id="enable-rate-limit" name="enableRateLimit">
                                            <span>啟用速率限制</span>
                                        </label>
                                    </div>
                                    <div class="form-actions">
                                        <button type="submit" class="btn btn-primary">保存配置</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        
                        <!-- 數據管理區塊 -->
                        <div class="settings-section">
                            <div class="section-header">
                                <h3>💾 數據管理</h3>
                                <p class="section-desc">備份與恢復系統數據</p>
                            </div>
                            <div class="section-content">
                                <div class="data-management">
                                    <div class="data-action">
                                        <div class="action-info">
                                            <h4>導出備份</h4>
                                            <p>將所有配置數據導出為 JSON 文件</p>
                                        </div>
                                        <button id="export-btn" class="btn btn-secondary">
                                            📤 導出備份
                                        </button>
                                    </div>
                                    <div class="data-action">
                                        <div class="action-info">
                                            <h4>導入恢復</h4>
                                            <p>從備份文件恢復配置數據</p>
                                        </div>
                                        <div class="import-wrapper">
                                            <input type="file" id="import-file" accept=".json" style="display: none;">
                                            <button id="import-btn" class="btn btn-secondary">
                                                📥 導入恢復
                                            </button>
                                        </div>
                                    </div>
                                    <div class="data-action danger">
                                        <div class="action-info">
                                            <h4>清除數據</h4>
                                            <p>清除所有自定義配置，恢復預設值</p>
                                        </div>
                                        <button id="clear-data-btn" class="btn btn-danger">
                                            🗑️ 清除數據
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 系統信息區塊 -->
                        <div class="settings-section">
                            <div class="section-header">
                                <h3>📊 系統信息</h3>
                                <p class="section-desc">當前系統狀態與統計</p>
                            </div>
                            <div class="section-content">
                                <div id="system-stats" class="stats-grid">
                                    <!-- 動態載入 -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 載入數據
    await loadSettingsData();
    
    // 綁定事件
    bindSettingsEvents();
}

/**
 * 載入設置數據
 */
async function loadSettingsData() {
    try {
        // 並行載入全局設置和系統統計
        const [globalSettings, stats] = await Promise.all([
            apiClient.getGlobalSettings(),
            apiClient.getStats()
        ]);
        
        // 填充全局設置表單
        if (globalSettings.success) {
            const settings = globalSettings.data;
            document.getElementById('default-provider').value = settings.defaultProvider || 'pollinations';
            document.getElementById('default-model').value = settings.defaultModel || 'flux';
            document.getElementById('max-width').value = settings.maxWidth || 2048;
            document.getElementById('max-height').value = settings.maxHeight || 2048;
            document.getElementById('enable-hd').checked = settings.enableHD !== false;
            document.getElementById('enable-rate-limit').checked = settings.enableRateLimit !== false;
        }
        
        // 渲染系統統計
        renderSystemStats(stats);
        
        // 顯示內容
        document.getElementById('settings-loading').style.display = 'none';
        document.getElementById('settings-content').style.display = 'block';
        
    } catch (error) {
        console.error('載入設置數據失敗:', error);
        showError('載入設置數據失敗');
    }
}

/**
 * 渲染系統統計
 */
function renderSystemStats(stats) {
    const container = document.getElementById('system-stats');
    
    if (!stats || !stats.success) {
        container.innerHTML = '<p class="no-data">無法獲取系統統計</p>';
        return;
    }
    
    const data = stats.stats;
    
    container.innerHTML = `
        <div class="stat-card">
            <div class="stat-icon">⚙️</div>
            <div class="stat-info">
                <span class="stat-value">${data.providers?.total || 0}</span>
                <span class="stat-label">供應商總數</span>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">✅</div>
            <div class="stat-info">
                <span class="stat-value">${data.providers?.enabled || 0}</span>
                <span class="stat-label">啟用供應商</span>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">🤖</div>
            <div class="stat-info">
                <span class="stat-value">${data.models?.total || 0}</span>
                <span class="stat-label">模型總數</span>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">🔧</div>
            <div class="stat-info">
                <span class="stat-value">${data.models?.custom || 0}</span>
                <span class="stat-label">自定義模型</span>
            </div>
        </div>
    `;
}

/**
 * 綁定設置頁面事件
 */
function bindSettingsEvents() {
    // 密碼修改表單
    document.getElementById('password-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await handlePasswordChange();
    });
    
    // 全局設置表單
    document.getElementById('global-settings-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await handleGlobalSettingsSave();
    });
    
    // 導出備份
    document.getElementById('export-btn').addEventListener('click', handleExportBackup);
    
    // 導入恢復
    const importBtn = document.getElementById('import-btn');
    const importFile = document.getElementById('import-file');
    
    importBtn.addEventListener('click', () => importFile.click());
    importFile.addEventListener('change', handleImportBackup);
    
    // 清除數據
    document.getElementById('clear-data-btn').addEventListener('click', handleClearData);
}

/**
 * 處理密碼修改
 */
async function handlePasswordChange() {
    const form = document.getElementById('password-form');
    const formData = new FormData(form);
    
    const currentPassword = formData.get('currentPassword');
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmPassword');
    
    // 驗證
    if (newPassword !== confirmPassword) {
        showToast('兩次輸入的密碼不一致', 'error');
        return;
    }
    
    if (newPassword.length < 6) {
        showToast('密碼長度至少需要 6 個字符', 'error');
        return;
    }
    
    try {
        showLoading('更新密碼中...');
        
        const result = await apiClient.updatePassword({
            currentPassword,
            newPassword
        });
        
        hideLoading();
        
        if (result.success) {
            showToast('密碼更新成功，請重新登入', 'success');
            setTimeout(() => {
                logout();
            }, 1500);
        } else {
            showToast(result.error || '密碼更新失敗', 'error');
        }
        
    } catch (error) {
        hideLoading();
        console.error('密碼更新失敗:', error);
        showToast('密碼更新失敗', 'error');
    }
}

/**
 * 處理全局設置保存
 */
async function handleGlobalSettingsSave() {
    const form = document.getElementById('global-settings-form');
    const formData = new FormData(form);
    
    const settings = {
        defaultProvider: formData.get('defaultProvider'),
        defaultModel: formData.get('defaultModel'),
        maxWidth: parseInt(formData.get('maxWidth')) || 2048,
        maxHeight: parseInt(formData.get('maxHeight')) || 2048,
        enableHD: document.getElementById('enable-hd').checked,
        enableRateLimit: document.getElementById('enable-rate-limit').checked
    };
    
    try {
        showLoading('保存配置中...');
        
        const result = await apiClient.updateGlobalSettings(settings);
        
        hideLoading();
        
        if (result.success) {
            showToast('配置保存成功', 'success');
        } else {
            showToast(result.error || '配置保存失敗', 'error');
        }
        
    } catch (error) {
        hideLoading();
        console.error('配置保存失敗:', error);
        showToast('配置保存失敗', 'error');
    }
}

/**
 * 處理導出備份
 */
async function handleExportBackup() {
    try {
        showLoading('導出備份中...');
        
        const result = await apiClient.exportBackup();
        
        hideLoading();
        
        if (result) {
            // 創建下載
            const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `flux-ai-backup-${new Date().toISOString().slice(0, 10)}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            showToast('備份導出成功', 'success');
        } else {
            showToast('備份導出失敗', 'error');
        }
        
    } catch (error) {
        hideLoading();
        console.error('備份導出失敗:', error);
        showToast('備份導出失敗', 'error');
    }
}

/**
 * 處理導入備份
 */
async function handleImportBackup(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
        const text = await file.text();
        const data = JSON.parse(text);
        
        // 確認導入
        const confirmed = await confirm('確定要導入此備份嗎？這將覆蓋當前所有配置。');
        if (!confirmed) {
            e.target.value = '';
            return;
        }
        
        showLoading('導入備份中...');
        
        const result = await apiClient.importBackup(data);
        
        hideLoading();
        
        if (result.success) {
            showToast('備份導入成功，頁面將重新載入', 'success');
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } else {
            showToast(result.error || '備份導入失敗', 'error');
        }
        
    } catch (error) {
        hideLoading();
        console.error('備份導入失敗:', error);
        showToast('備份文件格式錯誤', 'error');
    }
    
    e.target.value = '';
}

/**
 * 處理清除數據
 */
async function handleClearData() {
    const confirmed = await confirm(
        '確定要清除所有數據嗎？此操作不可恢復！',
        '危險操作'
    );
    
    if (!confirmed) return;
    
    const doubleConfirm = await confirm(
        '再次確認：這將刪除所有自定義配置，包括模型、供應商等。確定繼續？',
        '最後確認'
    );
    
    if (!doubleConfirm) return;
    
    try {
        showLoading('清除數據中...');
        
        // 清除 KV 存儲中的所有數據
        // 這裡需要調用後端 API 來執行清除操作
        // 目前先顯示提示
        hideLoading();
        showToast('數據清除功能需要後端支持', 'warning');
        
    } catch (error) {
        hideLoading();
        console.error('數據清除失敗:', error);
        showToast('數據清除失敗', 'error');
    }
}

export default renderSettingsPage;

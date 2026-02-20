/**
 * 模型配置頁面
 */

import { renderSidebar } from '../components/sidebar.js';
import { renderHeader } from '../components/header.js';

/**
 * 渲染模型配置頁面
 */
export function renderProvidersPage() {
    return `
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>模型配置 - Flux AI Pro 管理後台</title>
    <link rel="stylesheet" href="/admin/styles/base.css">
    <style>
        .dual-panel { display: flex; flex: 1; height: calc(100vh - 160px); }
        .provider-list-panel { width: 320px; background: white; border-right: 1px solid #e5e7eb; display: flex; flex-direction: column; overflow: hidden; }
        .panel-header { padding: 16px 20px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; }
        .panel-header h2 { font-size: 16px; color: #374151; }
        .provider-list { flex: 1; overflow-y: auto; padding: 8px; }
        .provider-item { display: flex; align-items: center; padding: 12px 16px; border-radius: 10px; cursor: pointer; transition: all 0.2s; margin-bottom: 4px; }
        .provider-item:hover { background: #f3f4f6; }
        .provider-item.active { background: #eef2ff; border-left: 3px solid #667eea; }
        .provider-item.disabled { opacity: 0.6; }
        .provider-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; margin-right: 12px; }
        .provider-icon.builtin { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
        .provider-icon.custom { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; }
        .provider-info { flex: 1; min-width: 0; }
        .provider-name { font-size: 14px; font-weight: 600; color: #1f2937; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .provider-models-count { font-size: 12px; color: #6b7280; }
        .provider-status-dot { width: 10px; height: 10px; border-radius: 50%; }
        .provider-status-dot.enabled { background: #10b981; box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2); }
        .provider-status-dot.disabled { background: #ef4444; }
        .detail-panel { flex: 1; background: #f9fafb; overflow-y: auto; padding: 24px; }
        .detail-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #9ca3af; }
        .detail-card { background: white; border-radius: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 20px; overflow: hidden; }
        .detail-card-header { padding: 20px 24px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; }
        .detail-card-body { padding: 20px 24px; }
        .provider-detail-header { display: flex; align-items: center; gap: 16px; }
        .provider-detail-icon { width: 60px; height: 60px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 28px; }
        .provider-detail-icon.builtin { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
        .provider-detail-icon.custom { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; }
        .provider-detail-info h2 { font-size: 20px; color: #1f2937; margin-bottom: 4px; }
        .provider-detail-info p { font-size: 14px; color: #6b7280; }
        .status-toggle { display: flex; align-items: center; gap: 12px; }
        .toggle-label { font-size: 14px; color: #6b7280; }
        .info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
        .info-item { padding: 12px 0; }
        .info-item label { display: block; font-size: 12px; color: #6b7280; margin-bottom: 4px; }
        .info-item span { font-size: 14px; color: #1f2937; }
        .model-list { display: grid; gap: 12px; }
        .model-item { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: #f9fafb; border-radius: 8px; }
        .model-info { flex: 1; }
        .model-name { font-size: 14px; font-weight: 500; color: #1f2937; }
        .model-id { font-size: 12px; color: #6b7280; font-family: monospace; }
        .search-box { padding: 12px 16px; border-bottom: 1px solid #e5e7eb; }
        .search-box input { width: 100%; padding: 10px 14px; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 14px; }
        .search-box input:focus { outline: none; border-color: #667eea; }
    </style>
</head>
<body>
    ${renderSidebar('providers')}
    
    <div class="main-content">
        ${renderHeader('模型配置')}
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-value" id="totalProviders">-</div>
                <div class="stat-label">總供應商</div>
            </div>
            <div class="stat-card green">
                <div class="stat-value" id="enabledProviders">-</div>
                <div class="stat-label">啟用供應商</div>
            </div>
            <div class="stat-card orange">
                <div class="stat-value" id="totalModels">-</div>
                <div class="stat-label">總模型數</div>
            </div>
            <div class="stat-card blue">
                <div class="stat-value" id="customProvidersCount">-</div>
                <div class="stat-label">自定義供應商</div>
            </div>
        </div>
        
        <div class="dual-panel">
            <div class="provider-list-panel">
                <div class="panel-header">
                    <h2>供應商列表</h2>
                    <button class="btn btn-primary btn-sm" onclick="showAddProviderModal()">+ 新增</button>
                </div>
                <div class="search-box">
                    <input type="text" id="searchInput" placeholder="搜尋供應商..." oninput="filterProviders()">
                </div>
                <div class="provider-list" id="providerList">
                    <div class="loading-state"><div class="spinner"></div><p>載入中...</p></div>
                </div>
            </div>
            
            <div class="detail-panel" id="detailPanel">
                <div class="detail-empty">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="80" height="80" style="opacity: 0.5; margin-bottom: 16px;">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                    </svg>
                    <p>選擇一個供應商查看詳情</p>
                </div>
            </div>
        </div>
    </div>
    
    <div id="modalContainer"></div>
    
    <script>
        const token = localStorage.getItem('adminToken');
        if (!token) window.location.href = '/admin/login';
        
        let allProviders = {};
        let allCustomProviders = {};
        let allCustomModels = {};
        let selectedProviderId = null;
        
        async function loadProviders() {
            try {
                const [providersRes, customProvidersRes, customModelsRes] = await Promise.all([
                    fetch('/admin/api/providers', { headers: { 'Authorization': 'Bearer ' + token } }),
                    fetch('/admin/api/providers/custom', { headers: { 'Authorization': 'Bearer ' + token } }),
                    fetch('/admin/api/models/custom', { headers: { 'Authorization': 'Bearer ' + token } })
                ]);
                
                const providersData = await providersRes.json();
                const customProvidersData = await customProvidersRes.json();
                const customModelsData = await customModelsRes.json();
                
                if (providersData.success) allProviders = providersData.providers || {};
                if (customProvidersData.success) allCustomProviders = customProvidersData.providers || {};
                if (customModelsData.success) allCustomModels = customModelsData.models || {};
                
                updateStats();
                renderProviderList();
            } catch (error) {
                console.error('載入失敗:', error);
                document.getElementById('providerList').innerHTML = '<div class="error-state"><p style="color:#ef4444;">載入失敗，請重新整理頁面</p></div>';
            }
        }
        
        function updateStats() {
            const totalProviders = Object.keys(allProviders).length + Object.keys(allCustomProviders).length;
            const enabledCount = Object.values(allProviders).filter(p => p.enabled).length + Object.values(allCustomProviders).filter(p => p.enabled).length;
            const totalModels = Object.values(allProviders).reduce((sum, p) => sum + (p.models?.length || 0), 0) + Object.values(allCustomProviders).reduce((sum, p) => sum + (p.models?.length || 0), 0) + Object.keys(allCustomModels).length;
            
            document.getElementById('totalProviders').textContent = totalProviders;
            document.getElementById('enabledProviders').textContent = enabledCount;
            document.getElementById('totalModels').textContent = totalModels;
            document.getElementById('customProvidersCount').textContent = Object.keys(allCustomProviders).length;
        }
        
        function renderProviderList() {
            const container = document.getElementById('providerList');
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            let html = '';
            
            // 合併供應商列表
            const allProvidersList = [];
            Object.entries(allProviders).forEach(([id, provider]) => {
                allProvidersList.push({ id, provider, isCustom: false });
            });
            Object.entries(allCustomProviders).forEach(([id, provider]) => {
                allProvidersList.push({ id, provider, isCustom: true });
            });
            
            // 按名稱排序
            allProvidersList.sort((a, b) => {
                const nameA = (a.provider.name || a.id).toLowerCase();
                const nameB = (b.provider.name || b.id).toLowerCase();
                return nameA.localeCompare(nameB, 'zh-TW');
            });
            
            // 渲染
            allProvidersList.forEach(({ id, provider, isCustom }) => {
                const providerName = (provider.name || id || '').toLowerCase();
                const providerId = (id || '').toLowerCase();
                if (providerName.includes(searchTerm) || providerId.includes(searchTerm)) {
                    const isActive = isCustom 
                        ? selectedProviderId === 'custom_' + id 
                        : selectedProviderId === id && !selectedProviderId.startsWith('custom_');
                    html += renderProviderItem(id, provider, isCustom, isActive);
                }
            });
            
            container.innerHTML = html || '<div class="empty-state"><p>沒有找到供應商</p></div>';
        }
        
        function renderProviderItem(id, provider, isCustom, isActive) {
            const modelCount = provider.models?.length || 0;
            const customModelsCount = isCustom ? 0 : Object.values(allCustomModels).filter(m => m.provider === id).length;
            const totalModels = modelCount + customModelsCount;
            
            return \`
                <div class="provider-item \${isActive ? 'active' : ''} \${!provider.enabled ? 'disabled' : ''}" 
                     onclick="selectProvider('\${isCustom ? 'custom_' + id : id}')">
                    <div class="provider-icon \${isCustom ? 'custom' : 'builtin'}">
                        \${isCustom ? '🔧' : getProviderIcon(id)}
                    </div>
                    <div class="provider-info">
                        <div class="provider-name">\${provider.name || id}\${isCustom ? ' <span style="font-size:10px;color:#f5576c;">(自定義)</span>' : ''}</div>
                        <div class="provider-models-count">\${totalModels} 個模型</div>
                    </div>
                    <div class="provider-status-dot \${provider.enabled ? 'enabled' : 'disabled'}"></div>
                </div>
            \`;
        }
        
        function getProviderIcon(id) {
            const icons = { pollinations: '🌸', infip: '🔮', aqua: '💧', kinai: '🎯', airforce: '✈️', nonpon: '🎨' };
            return icons[id] || '⚙️';
        }
        
        function selectProvider(id) {
            selectedProviderId = id;
            renderProviderList();
            renderProviderDetail(id);
        }
        
        function renderProviderDetail(id) {
            const container = document.getElementById('detailPanel');
            const isCustom = id.startsWith('custom_');
            const realId = isCustom ? id.replace('custom_', '') : id;
            const provider = isCustom ? allCustomProviders[realId] : allProviders[realId];
            
            if (!provider) {
                container.innerHTML = '<div class="detail-empty"><p>供應商不存在</p></div>';
                return;
            }
            
            const models = provider.models || [];
            const customModels = isCustom ? [] : Object.entries(allCustomModels).filter(([mid, m]) => m.provider === realId);
            
            container.innerHTML = \`
                <div class="detail-card">
                    <div class="detail-card-body">
                        <div class="provider-detail-header">
                            <div class="provider-detail-icon \${isCustom ? 'custom' : 'builtin'}">
                                \${isCustom ? '🔧' : getProviderIcon(realId)}
                            </div>
                            <div class="provider-detail-info">
                                <h2>\${provider.name || realId}</h2>
                                <p>\${provider.description || (isCustom ? '自定義供應商' : '內建供應商')}</p>
                            </div>
                        </div>
                        <div class="status-toggle" style="margin-top: 20px;">
                            <label class="toggle-switch">
                                <input type="checkbox" \${provider.enabled ? 'checked' : ''} onchange="toggleProvider('\${id}', this.checked)">
                                <span class="toggle-slider"></span>
                            </label>
                            <span class="toggle-label">\${provider.enabled ? '已啟用' : '已禁用'}</span>
                        </div>
                    </div>
                </div>
                
                <div class="detail-card">
                    <div class="detail-card-header">
                        <h3>📋 基本資訊</h3>
                        \${isCustom ? '<button class="btn btn-secondary btn-sm" onclick="editProvider(\\'' + realId + '\\')">編輯</button>' : ''}
                    </div>
                    <div class="detail-card-body">
                        <div class="info-grid">
                            <div class="info-item"><label>供應商 ID</label><span>\${realId}</span></div>
                            <div class="info-item"><label>類型</label><span>\${isCustom ? '自定義' : '內建'}</span></div>
                            <div class="info-item"><label>模型數量</label><span>\${models.length + customModels.length} 個</span></div>
                            <div class="info-item"><label>狀態</label><span style="color:\${provider.enabled ? '#10b981' : '#ef4444'}">\${provider.enabled ? '正常運行' : '已禁用'}</span></div>
                        </div>
                    </div>
                </div>
                
                <div class="detail-card">
                    <div class="detail-card-header">
                        <h3>🤖 模型列表</h3>
                        \${!isCustom ? '<button class="btn btn-primary btn-sm" onclick="showAddModelModal(\\'' + realId + '\\')">+ 新增模型</button>' : ''}
                    </div>
                    <div class="detail-card-body">
                        <div class="model-list">
                            \${models.map(m => \`
                                <div class="model-item">
                                    <div class="model-info">
                                        <div class="model-name">\${m.name || m.id}</div>
                                        <div class="model-id">\${m.id}</div>
                                    </div>
                                    <div>
                                        <span class="style-badge \${m.confirmed ? 'builtin' : 'custom'}">\${m.confirmed ? '已確認' : '測試中'}</span>
                                        <button class="btn btn-secondary btn-sm" onclick="editBuiltinModel('\${realId}', '\${m.id}')">編輯</button>
                                    </div>
                                </div>
                            \`).join('')}
                            \${customModels.map(([mid, m]) => \`
                                <div class="model-item">
                                    <div class="model-info">
                                        <div class="model-name">\${m.name || mid}</div>
                                        <div class="model-id">\${m.model_id || mid}</div>
                                    </div>
                                    <div>
                                        <button class="btn btn-secondary btn-sm" onclick="editModel('\${mid}')">編輯</button>
                                        <button class="btn btn-danger btn-sm" onclick="deleteModel('\${mid}')">刪除</button>
                                    </div>
                                </div>
                            \`).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="detail-card">
                    <div class="detail-card-header">
                        <h3>🔌 連線測試</h3>
                    </div>
                    <div class="detail-card-body">
                        <button class="btn btn-primary" onclick="testProvider('\${id}')">測試連線</button>
                        <div id="testResult" style="margin-top: 16px;"></div>
                    </div>
                </div>
                
                \${isCustom ? \`
                    <div class="detail-card">
                        <div class="detail-card-body">
                            <button class="btn btn-danger" onclick="deleteProvider('\${realId}')">刪除此供應商</button>
                        </div>
                    </div>
                \` : ''}
            \`;
        }
        
        async function toggleProvider(id, enabled) {
            const isCustom = id.startsWith('custom_');
            const realId = isCustom ? id.replace('custom_', '') : id;
            
            try {
                const endpoint = isCustom ? '/admin/api/providers/custom/' + realId : '/admin/api/providers/' + realId;
                const response = await fetch(endpoint, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({ enabled })
                });
                
                if (response.ok) {
                    if (isCustom) allCustomProviders[realId].enabled = enabled;
                    else allProviders[realId].enabled = enabled;
                    updateStats();
                    renderProviderList();
                    renderProviderDetail(id);
                }
            } catch (error) {
                alert('更新失敗: ' + error.message);
            }
        }
        
        async function testProvider(id) {
            const isCustom = id.startsWith('custom_');
            const realId = isCustom ? id.replace('custom_', '') : id;
            const resultDiv = document.getElementById('testResult');
            resultDiv.innerHTML = '<div class="loading-state"><p>⏳ 測試中...</p></div>';
            
            try {
                const response = await fetch('/admin/api/test-provider/' + realId + '?custom=' + isCustom, {
                    headers: { 'Authorization': 'Bearer ' + token }
                });
                const data = await response.json();
                
                if (data.success) {
                    resultDiv.innerHTML = '<div style="color: #10b981;">✅ 連線成功！延遲: ' + (data.latency || 'N/A') + 'ms</div>';
                } else {
                    resultDiv.innerHTML = '<div style="color: #ef4444;">❌ 連線失敗: ' + (data.error || '未知錯誤') + '</div>';
                }
            } catch (error) {
                resultDiv.innerHTML = '<div style="color: #ef4444;">❌ 測試錯誤: ' + error.message + '</div>';
            }
        }
        
        function filterProviders() {
            renderProviderList();
        }
        
        // 編輯內建模型
        function editBuiltinModel(providerId, modelId) {
            const provider = allProviders[providerId];
            const model = provider?.models?.find(m => m.id === modelId);
            
            if (!model) {
                alert('模型不存在');
                return;
            }
            
            document.getElementById('modalContainer').innerHTML = \`
                <div class="modal-overlay" onclick="closeModal(event)">
                    <div class="modal" onclick="event.stopPropagation()">
                        <h2>編輯模型</h2>
                        <form onsubmit="updateBuiltinModel(event, '\${providerId}', '\${modelId}')">
                            <div class="form-group">
                                <label class="form-label">模型 ID</label>
                                <input type="text" class="form-input" value="\${model.id}" disabled>
                            </div>
                            <div class="form-group">
                                <label class="form-label">顯示名稱 *</label>
                                <input type="text" class="form-input" id="editModelName" value="\${model.name || model.id}" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">描述</label>
                                <textarea class="form-textarea" id="editModelDesc" rows="2">\${model.description || ''}</textarea>
                            </div>
                            <div class="form-group">
                                <label class="form-label">最大尺寸</label>
                                <div style="display: flex; gap: 10px;">
                                    <input type="number" class="form-input" id="editModelMaxWidth" value="\${model.max_size || 2048}" placeholder="寬度">
                                    <input type="number" class="form-input" id="editModelMaxHeight" value="\${model.max_size || 2048}" placeholder="高度">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">狀態</label>
                                <select class="form-input" id="editModelConfirmed">
                                    <option value="true" \${model.confirmed ? 'selected' : ''}>已確認</option>
                                    <option value="false" \${!model.confirmed ? 'selected' : ''}>測試中</option>
                                </select>
                            </div>
                            <div class="form-actions">
                                <button type="button" class="btn btn-secondary" onclick="closeModal()">取消</button>
                                <button type="submit" class="btn btn-primary">保存</button>
                            </div>
                        </form>
                    </div>
                </div>
            \`;
        }
        
        // 更新內建模型
        async function updateBuiltinModel(event, providerId, modelId) {
            event.preventDefault();
            
            const name = document.getElementById('editModelName').value.trim();
            const description = document.getElementById('editModelDesc').value;
            const maxWidth = parseInt(document.getElementById('editModelMaxWidth').value) || 2048;
            const maxHeight = parseInt(document.getElementById('editModelMaxHeight').value) || 2048;
            const confirmed = document.getElementById('editModelConfirmed').value === 'true';
            
            try {
                const response = await fetch('/admin/api/providers/' + providerId, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({
                        models: allProviders[providerId].models.map(m =>
                            m.id === modelId ? { ...m, name, description, max_size: Math.max(maxWidth, maxHeight), confirmed } : m
                        )
                    })
                });
                
                const data = await response.json();
                if (data.success) {
                    // 更新本地數據
                    const modelIndex = allProviders[providerId].models.findIndex(m => m.id === modelId);
                    if (modelIndex !== -1) {
                        allProviders[providerId].models[modelIndex] = {
                            ...allProviders[providerId].models[modelIndex],
                            name, description, max_size: Math.max(maxWidth, maxHeight), confirmed
                        };
                    }
                    closeModal();
                    renderProviderDetail(selectedProviderId);
                } else {
                    alert('更新失敗: ' + (data.error || '未知錯誤'));
                }
            } catch (error) {
                alert('網絡錯誤: ' + error.message);
            }
        }
        
        // 新增自定義模型
        function showAddModelModal(providerId) {
            document.getElementById('modalContainer').innerHTML = \`
                <div class="modal-overlay" onclick="closeModal(event)">
                    <div class="modal" onclick="event.stopPropagation()">
                        <h2>新增自定義模型</h2>
                        <form onsubmit="createCustomModel(event, '\${providerId}')">
                            <div class="form-group">
                                <label class="form-label">模型 ID *</label>
                                <input type="text" class="form-input" id="newModelId" required placeholder="例如: my-model">
                            </div>
                            <div class="form-group">
                                <label class="form-label">顯示名稱 *</label>
                                <input type="text" class="form-input" id="newModelName" required placeholder="例如: 我的模型">
                            </div>
                            <div class="form-group">
                                <label class="form-label">API 模型 ID</label>
                                <input type="text" class="form-input" id="newModelApiId" placeholder="API 中的模型 ID">
                            </div>
                            <div class="form-group">
                                <label class="form-label">描述</label>
                                <textarea class="form-textarea" id="newModelDesc" rows="2" placeholder="模型描述"></textarea>
                            </div>
                            <div class="form-group">
                                <label class="form-label">最大尺寸</label>
                                <div style="display: flex; gap: 10px;">
                                    <input type="number" class="form-input" id="newModelMaxWidth" value="2048" placeholder="寬度">
                                    <input type="number" class="form-input" id="newModelMaxHeight" value="2048" placeholder="高度">
                                </div>
                            </div>
                            <div class="form-actions">
                                <button type="button" class="btn btn-secondary" onclick="closeModal()">取消</button>
                                <button type="submit" class="btn btn-primary">創建</button>
                            </div>
                        </form>
                    </div>
                </div>
            \`;
        }
        
        // 創建自定義模型
        async function createCustomModel(event, providerId) {
            event.preventDefault();
            
            const id = document.getElementById('newModelId').value.trim();
            const name = document.getElementById('newModelName').value.trim();
            const model_id = document.getElementById('newModelApiId').value.trim() || id;
            const description = document.getElementById('newModelDesc').value;
            const maxWidth = parseInt(document.getElementById('newModelMaxWidth').value) || 2048;
            const maxHeight = parseInt(document.getElementById('newModelMaxHeight').value) || 2048;
            
            try {
                const response = await fetch('/admin/api/models/custom', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({
                        id, name, model_id, description,
                        provider: providerId,
                        max_size: Math.max(maxWidth, maxHeight),
                        enabled: true,
                        confirmed: false
                    })
                });
                
                const data = await response.json();
                if (data.success) {
                    closeModal();
                    loadProviders();
                    if (selectedProviderId) renderProviderDetail(selectedProviderId);
                } else {
                    alert('創建失敗: ' + (data.error || '未知錯誤'));
                }
            } catch (error) {
                alert('網絡錯誤: ' + error.message);
            }
        }
        
        // 編輯自定義模型
        function editModel(modelId) {
            const model = allCustomModels[modelId];
            
            if (!model) {
                alert('模型不存在');
                return;
            }
            
            document.getElementById('modalContainer').innerHTML = \`
                <div class="modal-overlay" onclick="closeModal(event)">
                    <div class="modal" onclick="event.stopPropagation()">
                        <h2>編輯自定義模型</h2>
                        <form onsubmit="updateCustomModel(event, '\${modelId}')">
                            <div class="form-group">
                                <label class="form-label">模型 ID</label>
                                <input type="text" class="form-input" value="\${modelId}" disabled>
                            </div>
                            <div class="form-group">
                                <label class="form-label">顯示名稱 *</label>
                                <input type="text" class="form-input" id="editModelName" value="\${model.name || modelId}" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">API 模型 ID</label>
                                <input type="text" class="form-input" id="editModelApiId" value="\${model.model_id || modelId}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">描述</label>
                                <textarea class="form-textarea" id="editModelDesc" rows="2">\${model.description || ''}</textarea>
                            </div>
                            <div class="form-group">
                                <label class="form-label">最大尺寸</label>
                                <div style="display: flex; gap: 10px;">
                                    <input type="number" class="form-input" id="editModelMaxWidth" value="\${model.max_size || 2048}" placeholder="寬度">
                                    <input type="number" class="form-input" id="editModelMaxHeight" value="\${model.max_size || 2048}" placeholder="高度">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">狀態</label>
                                <select class="form-input" id="editModelEnabled">
                                    <option value="true" \${model.enabled !== false ? 'selected' : ''}>啟用</option>
                                    <option value="false" \${model.enabled === false ? 'selected' : ''}>禁用</option>
                                </select>
                            </div>
                            <div class="form-actions">
                                <button type="button" class="btn btn-secondary" onclick="closeModal()">取消</button>
                                <button type="submit" class="btn btn-primary">保存</button>
                            </div>
                        </form>
                    </div>
                </div>
            \`;
        }
        
        // 更新自定義模型
        async function updateCustomModel(event, modelId) {
            event.preventDefault();
            
            const name = document.getElementById('editModelName').value.trim();
            const model_id = document.getElementById('editModelApiId').value.trim();
            const description = document.getElementById('editModelDesc').value;
            const maxWidth = parseInt(document.getElementById('editModelMaxWidth').value) || 2048;
            const maxHeight = parseInt(document.getElementById('editModelMaxHeight').value) || 2048;
            const enabled = document.getElementById('editModelEnabled').value === 'true';
            
            try {
                const response = await fetch('/admin/api/models/custom/' + modelId, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({ name, model_id, description, max_size: Math.max(maxWidth, maxHeight), enabled })
                });
                
                const data = await response.json();
                if (data.success) {
                    // 更新本地數據
                    allCustomModels[modelId] = { ...allCustomModels[modelId], name, model_id, description, max_size: Math.max(maxWidth, maxHeight), enabled };
                    closeModal();
                    renderProviderDetail(selectedProviderId);
                } else {
                    alert('更新失敗: ' + (data.error || '未知錯誤'));
                }
            } catch (error) {
                alert('網絡錯誤: ' + error.message);
            }
        }
        
        // 刪除自定義模型
        async function deleteModel(modelId) {
            if (!confirm('確定要刪除此模型嗎？')) return;
            
            try {
                const response = await fetch('/admin/api/models/custom/' + modelId, {
                    method: 'DELETE',
                    headers: { 'Authorization': 'Bearer ' + token }
                });
                
                if (response.ok) {
                    delete allCustomModels[modelId];
                    updateStats();
                    if (selectedProviderId) renderProviderDetail(selectedProviderId);
                } else {
                    alert('刪除失敗');
                }
            } catch (error) {
                alert('網絡錯誤: ' + error.message);
            }
        }
        
        function showAddProviderModal() {
            document.getElementById('modalContainer').innerHTML = \`
                <div class="modal-overlay" onclick="closeModal(event)">
                    <div class="modal" onclick="event.stopPropagation()">
                        <h2>新增自定義供應商</h2>
                        <form onsubmit="createProvider(event)">
                            <div class="form-group">
                                <label class="form-label">供應商 ID *</label>
                                <input type="text" class="form-input" id="newProviderId" required placeholder="例如: my-provider">
                            </div>
                            <div class="form-group">
                                <label class="form-label">顯示名稱 *</label>
                                <input type="text" class="form-input" id="newProviderName" required placeholder="例如: 我的供應商">
                            </div>
                            <div class="form-group">
                                <label class="form-label">API URL *</label>
                                <input type="text" class="form-input" id="newProviderUrl" required placeholder="https://api.example.com">
                            </div>
                            <div class="form-group">
                                <label class="form-label">API Key</label>
                                <input type="text" class="form-input" id="newProviderKey" placeholder="API Key">
                            </div>
                            <div class="form-group">
                                <label class="form-label">描述</label>
                                <textarea class="form-textarea" id="newProviderDesc" rows="2" placeholder="供應商描述"></textarea>
                            </div>
                            <div class="form-actions">
                                <button type="button" class="btn btn-secondary" onclick="closeModal()">取消</button>
                                <button type="submit" class="btn btn-primary">創建</button>
                            </div>
                        </form>
                    </div>
                </div>
            \`;
        }
        
        async function createProvider(event) {
            event.preventDefault();
            
            const id = document.getElementById('newProviderId').value.trim();
            const name = document.getElementById('newProviderName').value.trim();
            const api_url = document.getElementById('newProviderUrl').value.trim();
            const api_key = document.getElementById('newProviderKey').value.trim();
            const description = document.getElementById('newProviderDesc').value;
            
            try {
                const response = await fetch('/admin/api/providers/custom', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({ id, name, api_url, api_key, description, enabled: true })
                });
                
                const data = await response.json();
                if (data.success) {
                    closeModal();
                    loadProviders();
                } else {
                    alert('創建失敗: ' + (data.error || '未知錯誤'));
                }
            } catch (error) {
                alert('網絡錯誤: ' + error.message);
            }
        }
        
        function closeModal(event) {
            if (event && event.target !== event.currentTarget) return;
            document.getElementById('modalContainer').innerHTML = '';
        }
        
        // 初始化
        loadProviders();
    </script>
</body>
</html>
    `;
}

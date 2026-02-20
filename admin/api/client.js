/**
 * Admin API Client
 * 封裝所有後台 API 請求
 */

export class AdminAPIClient {
    constructor() {
        this.baseURL = '/admin/api';
        this.token = null;
    }

    /**
     * 設置認證 Token
     */
    setToken(token) {
        this.token = token;
    }

    /**
     * 獲取認證 Token
     */
    getToken() {
        if (!this.token) {
            this.token = localStorage.getItem('adminToken');
        }
        return this.token;
    }

    /**
     * 檢查是否已認證
     */
    isAuthenticated() {
        return !!this.getToken();
    }

    /**
     * 基礎請求方法
     */
    async request(endpoint, options = {}) {
        const token = this.getToken();
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${this.baseURL}${endpoint}`, {
            ...options,
            headers
        });

        const data = await response.json();

        if (!response.ok) {
            throw new APIError(data.error || `HTTP ${response.status}`, response.status);
        }

        return data;
    }

    // ==================== 認證 API ====================

    /**
     * 登入
     */
    async login(username, password) {
        const data = await this.request('/login', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });
        if (data.success && data.token) {
            this.setToken(data.token);
            localStorage.setItem('adminToken', data.token);
        }
        return data;
    }

    /**
     * 登出
     */
    logout() {
        this.token = null;
        localStorage.removeItem('adminToken');
        window.location.href = '/admin/login';
    }

    /**
     * 驗證 Token
     */
    async verifyToken() {
        return this.request('/verify');
    }

    // ==================== 供應商 API ====================

    /**
     * 獲取所有供應商（內建）
     */
    async getProviders() {
        return this.request('/providers');
    }

    /**
     * 更新供應商
     */
    async updateProvider(providerId, data) {
        return this.request(`/providers/${providerId}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    /**
     * 獲取自定義供應商
     */
    async getCustomProviders() {
        return this.request('/providers/custom');
    }

    /**
     * 創建自定義供應商
     */
    async createCustomProvider(data) {
        return this.request('/providers/custom', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    /**
     * 更新自定義供應商
     */
    async updateCustomProvider(providerId, data) {
        return this.request(`/providers/custom/${providerId}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    /**
     * 刪除自定義供應商
     */
    async deleteCustomProvider(providerId) {
        return this.request(`/providers/custom/${providerId}`, {
            method: 'DELETE'
        });
    }

    /**
     * 測試供應商連線
     */
    async testProvider(providerId, isCustom = false) {
        return this.request(`/test-provider/${providerId}?custom=${isCustom}`);
    }

    // ==================== 模型 API ====================

    /**
     * 獲取自定義模型
     */
    async getCustomModels() {
        return this.request('/models/custom');
    }

    /**
     * 創建自定義模型
     */
    async createCustomModel(data) {
        return this.request('/models/custom', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    /**
     * 更新自定義模型
     */
    async updateCustomModel(modelId, data) {
        return this.request(`/models/custom/${modelId}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    /**
     * 刪除自定義模型
     */
    async deleteCustomModel(modelId) {
        return this.request(`/models/custom/${modelId}`, {
            method: 'DELETE'
        });
    }

    // ==================== 參數 API ====================

    /**
     * 獲取參數配置
     */
    async getParameters() {
        return this.request('/parameters');
    }

    /**
     * 更新優化規則
     */
    async updateOptimization(data) {
        return this.request('/parameters/optimization', {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    /**
     * 更新速率限制
     */
    async updateRateLimits(data) {
        return this.request('/parameters/rate-limits', {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    // ==================== 系統設置 API ====================

    /**
     * 獲取全局設置
     */
    async getGlobalSettings() {
        return this.request('/settings');
    }

    /**
     * 更新全局設置
     */
    async updateGlobalSettings(data) {
        return this.request('/settings', {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    /**
     * 更新密碼
     */
    async updatePassword(currentPassword, newPassword) {
        return this.request('/password', {
            method: 'PUT',
            body: JSON.stringify({ currentPassword, newPassword })
        });
    }

    // ==================== 統計與備份 API ====================

    /**
     * 獲取統計數據
     */
    async getStats() {
        return this.request('/stats');
    }

    /**
     * 導出備份
     */
    async exportBackup() {
        const token = this.getToken();
        const response = await fetch(`${this.baseURL}/backup/export`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.json();
    }

    /**
     * 導入備份
     */
    async importBackup(data) {
        return this.request('/backup/import', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
}

/**
 * API 錯誤類
 */
export class APIError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'APIError';
        this.status = status;
    }
}

// 導出單例
export const apiClient = new AdminAPIClient();

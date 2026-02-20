/**
 * Flux AI Pro - Admin 模組化系統
 * 主入口文件
 * 
 * 版本: 2.0.0
 * 更新: 模組化重構
 */

// ============================================
// 導出所有模組
// ============================================

// API 客戶端
export { AdminAPIClient, apiClient } from './api/client.js';

// 認證工具
export { 
    getToken, 
    setToken, 
    removeToken, 
    isAuthenticated, 
    checkAuthOrRedirect, 
    logout 
} from './utils/auth.js';

// 輔助函數
export { 
    debounce, 
    throttle, 
    formatDate, 
    formatNumber, 
    showLoading, 
    hideLoading, 
    showError, 
    showToast, 
    confirm,
    escapeHtml,
    parseJsonSafe
} from './utils/helpers.js';

// 組件
export { renderSidebar, NAV_ITEMS } from './components/sidebar.js';
export { renderHeader } from './components/header.js';
export { showModal, hideModal, showConfirmModal, showEditModal } from './components/modals.js';
export { 
    renderStatCard, 
    renderButton, 
    renderToggle, 
    renderTable, 
    renderPagination 
} from './components/common.js';

// 頁面
export { renderLoginPage } from './pages/login.js';
export { renderDashboardPage } from './pages/dashboard.js';
export { renderProvidersPage } from './pages/providers.js';
export { renderParametersPage } from './pages/parameters.js';
export { renderSettingsPage } from './pages/settings.js';

// 路由
export { 
    ROUTES, 
    getCurrentRoute, 
    navigateTo, 
    handleRouteChange, 
    initRouter 
} from './router.js';

// ============================================
// 初始化函數
// ============================================

/**
 * 初始化 Admin 系統
 */
export async function initAdmin() {
    // 等待 DOM 載入完成
    if (document.readyState === 'loading') {
        await new Promise(resolve => {
            document.addEventListener('DOMContentLoaded', resolve);
        });
    }
    
    // 初始化路由
    const { initRouter } = await import('./router.js');
    initRouter();
    
    console.log('✅ Flux AI Pro Admin 系統初始化完成');
}

// 自動初始化
if (typeof window !== 'undefined') {
    initAdmin().catch(console.error);
}

export default {
    initAdmin
};

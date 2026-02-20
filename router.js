/**
 * Admin 路由模組
 * 處理前端頁面路由和導航
 */

import { renderLoginPage } from './pages/login.js';
import { renderDashboardPage } from './pages/dashboard.js';
import { renderProvidersPage } from './pages/providers.js';
import { renderParametersPage } from './pages/parameters.js';
import { renderSettingsPage } from './pages/settings.js';
import { getToken } from './utils/auth.js';

/**
 * 路由配置
 */
export const ROUTES = {
    login: {
        path: '/admin/login',
        render: renderLoginPage,
        requiresAuth: false
    },
    dashboard: {
        path: '/admin',
        render: renderDashboardPage,
        requiresAuth: true
    },
    providers: {
        path: '/admin/providers',
        render: renderProvidersPage,
        requiresAuth: true
    },
    parameters: {
        path: '/admin/parameters',
        render: renderParametersPage,
        requiresAuth: true
    },
    settings: {
        path: '/admin/settings',
        render: renderSettingsPage,
        requiresAuth: true
    }
};

/**
 * 獲取當前路由
 */
export function getCurrentRoute() {
    const path = window.location.pathname;
    
    for (const [name, route] of Object.entries(ROUTES)) {
        if (route.path === path) {
            return { name, ...route };
        }
    }
    
    // 默認路由
    if (path === '/admin' || path === '/admin/') {
        return { name: 'dashboard', ...ROUTES.dashboard };
    }
    
    return null;
}

/**
 * 導航到指定路由
 */
export function navigateTo(routeName) {
    const route = ROUTES[routeName];
    if (!route) {
        console.error(`Route not found: ${routeName}`);
        return;
    }
    
    // 使用 History API 導航
    window.history.pushState({}, '', route.path);
    
    // 觸發路由變化
    handleRouteChange();
}

/**
 * 處理路由變化
 */
export async function handleRouteChange() {
    const route = getCurrentRoute();
    
    if (!route) {
        // 404 處理
        document.getElementById('app').innerHTML = `
            <div class="error-page">
                <h1>404</h1>
                <p>頁面未找到</p>
                <a href="/admin" class="btn btn-primary">返回首頁</a>
            </div>
        `;
        return;
    }
    
    // 檢查認證
    if (route.requiresAuth && !getToken()) {
        window.location.href = '/admin/login';
        return;
    }
    
    // 如果已登入且訪問登入頁，重定向到儀表板
    if (route.name === 'login' && getToken()) {
        window.location.href = '/admin';
        return;
    }
    
    // 渲染頁面
    try {
        await route.render();
    } catch (error) {
        console.error(`Error rendering page ${route.name}:`, error);
        document.getElementById('app').innerHTML = `
            <div class="error-page">
                <h1>錯誤</h1>
                <p>載入頁面時發生錯誤</p>
                <p class="error-details">${error.message}</p>
                <a href="/admin" class="btn btn-primary">返回首頁</a>
            </div>
        `;
    }
}

/**
 * 初始化路由
 */
export function initRouter() {
    // 監聽 popstate 事件（瀏覽器前進/後退）
    window.addEventListener('popstate', handleRouteChange);
    
    // 監聽點擊事件（處理內部連結）
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="/admin"]');
        if (link) {
            const href = link.getAttribute('href');
            
            // 忽略外部連結和帶有 target 的連結
            if (link.target || href.startsWith('http')) {
                return;
            }
            
            e.preventDefault();
            window.history.pushState({}, '', href);
            handleRouteChange();
        }
    });
    
    // 初始路由處理
    handleRouteChange();
}

export default {
    ROUTES,
    getCurrentRoute,
    navigateTo,
    handleRouteChange,
    initRouter
};

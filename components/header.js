/**
 * 頂部導航組件
 */

import { logout, getUserInfo } from '../utils/auth.js';

/**
 * 渲染頂部導航
 */
export function renderHeader(title) {
    const user = getUserInfo();
    const username = user?.username || 'Admin';
    
    return `
        <div class="top-bar">
            <h1>${title}</h1>
            <div class="flex items-center gap-md">
                <span class="text-secondary">歡迎，${username}</span>
                <button class="btn btn-danger btn-sm" onclick="handleLogout()">
                    登出
                </button>
            </div>
        </div>
    `;
}

/**
 * 登出處理函數
 */
window.handleLogout = function() {
    if (confirm('確定要登出嗎？')) {
        logout();
    }
};

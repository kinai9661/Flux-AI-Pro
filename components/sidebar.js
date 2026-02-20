/**
 * 側邊欄組件
 */

export const NAV_ITEMS = [
	{ id: 'dashboard', label: '儀表板', icon: '📊', path: '/admin' },
	{ id: 'providers', label: '模型配置', icon: '⚙️', path: '/admin/providers' },
	{ id: 'parameters', label: '參數調整', icon: '🔧', path: '/admin/parameters' },
	{ id: 'settings', label: '系統設置', icon: '🔐', path: '/admin/settings' }
];

/**
 * 渲染側邊欄
 */
export function renderSidebar(activePage) {
    return `
        <div class="sidebar">
            <div class="sidebar-header">
                🌸 Flux AI Pro
            </div>
            <nav class="sidebar-nav">
                ${NAV_ITEMS.map(item => `
                    <a href="${item.path}" 
                       class="nav-item ${activePage === item.id ? 'active' : ''}"
                       data-page="${item.id}">
                        <span class="nav-item-icon">${item.icon}</span>
                        <span>${item.label}</span>
                    </a>
                `).join('')}
            </nav>
        </div>
    `;
}

/**
 * 獲取當前頁面 ID
 */
export function getCurrentPageId() {
	const path = window.location.pathname;
	if (path === '/admin' || path === '/admin/') return 'dashboard';
	if (path.startsWith('/admin/providers')) return 'providers';
	if (path.startsWith('/admin/parameters')) return 'parameters';
	if (path.startsWith('/admin/settings')) return 'settings';
	return 'dashboard';
}

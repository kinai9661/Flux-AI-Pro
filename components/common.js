/**
 * 共用 UI 組件
 */

/**
 * 渲染統計卡片
 */
export function renderStatCard(value, label, variant = '') {
    return `
        <div class="stat-card ${variant}">
            <div class="stat-value">${value}</div>
            <div class="stat-label">${label}</div>
        </div>
    `;
}

/**
 * 渲染按鈕
 */
export function renderButton(text, options = {}) {
    const {
        type = 'primary',
        size = '',
        icon = '',
        onClick = '',
        disabled = false,
        className = ''
    } = options;
    
    const classes = ['btn', `btn-${type}`, size ? `btn-${size}` : '', className]
        .filter(Boolean)
        .join(' ');
    
    return `
        <button class="${classes}" 
                ${onClick ? `onclick="${onClick}"` : ''} 
                ${disabled ? 'disabled' : ''}>
            ${icon ? `<span>${icon}</span>` : ''}${text}
        </button>
    `;
}

/**
 * 渲染開關
 */
export function renderToggle(checked, onChange, id = '') {
    return `
        <label class="toggle-switch">
            <input type="checkbox" ${checked ? 'checked' : ''} 
                   onchange="${onChange}" ${id ? `id="${id}"` : ''}>
            <span class="toggle-slider"></span>
        </label>
    `;
}

/**
 * 渲染資訊項目
 */
export function renderInfoItem(label, value, className = '') {
    return `
        <div class="info-item ${className}">
            <label>${label}</label>
            <span>${value}</span>
        </div>
    `;
}

/**
 * 渲染表格
 */
export function renderTable(columns, rows, options = {}) {
    const { emptyMessage = '沒有資料', actions = null } = options;
    
    if (rows.length === 0) {
        return `<div class="empty-state"><p>${emptyMessage}</p></div>`;
    }
    
    return `
        <div class="table-container">
            <table class="table">
                <thead>
                    <tr>
                        ${columns.map(col => `<th>${col.label}</th>`).join('')}
                        ${actions ? '<th>操作</th>' : ''}
                    </tr>
                </thead>
                <tbody>
                    ${rows.map((row, index) => `
                        <tr>
                            ${columns.map(col => `
                                <td>${row[col.key] !== undefined ? row[col.key] : ''}</td>
                            `).join('')}
                            ${actions ? `<td>${actions(row, index)}</td>` : ''}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

/**
 * 渲染搜尋框
 */
export function renderSearchBox(placeholder = '搜尋...', onChange = '') {
    return `
        <div class="search-box">
            <input type="text" 
                   class="form-input" 
                   placeholder="${placeholder}"
                   ${onChange ? `oninput="${onChange}"` : ''}>
        </div>
    `;
}

/**
 * 渲染麵包屑
 */
export function renderBreadcrumb(items) {
    return `
        <div class="breadcrumb">
            ${items.map((item, index) => {
                const isLast = index === items.length - 1;
                if (isLast) {
                    return `<span class="breadcrumb-item active">${item.label}</span>`;
                }
                return `
                    <a href="${item.path}" class="breadcrumb-item">${item.label}</a>
                    <span class="breadcrumb-separator">/</span>
                `;
            }).join('')}
        </div>
    `;
}

/**
 * 渲染標籤
 */
export function renderTag(text, variant = 'default') {
    const colors = {
        default: 'background: #e5e7eb; color: #374151;',
        success: 'background: #d1fae5; color: #065f46;',
        warning: 'background: #fef3c7; color: #92400e;',
        error: 'background: #fee2e2; color: #991b1b;',
        info: 'background: #dbeafe; color: #1e40af;'
    };
    
    return `
        <span style="display: inline-block; padding: 2px 8px; border-radius: 4px; 
                     font-size: 12px; font-weight: 500; ${colors[variant] || colors.default}">
            ${text}
        </span>
    `;
}

/**
 * 渲染進度條
 */
export function renderProgress(value, max = 100, options = {}) {
    const { color = 'var(--primary-color)', showLabel = true, height = '8px' } = options;
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    
    return `
        <div class="progress-container">
            ${showLabel ? `<div class="progress-label">${value} / ${max}</div>` : ''}
            <div class="progress-bar" style="height: ${height}; background: #e5e7eb; border-radius: 4px; overflow: hidden;">
                <div class="progress-fill" style="width: ${percentage}%; height: 100%; background: ${color}; transition: width 0.3s ease;"></div>
            </div>
        </div>
    `;
}

/**
 * 渲染頭像
 */
export function renderAvatar(name, options = {}) {
    const { size = 40, color = 'var(--primary-color)' } = options;
    const initial = (name || '?').charAt(0).toUpperCase();
    
    return `
        <div class="avatar" style="width: ${size}px; height: ${size}px; border-radius: 50%; 
                                   background: ${color}; color: white; display: flex; 
                                   align-items: center; justify-content: center; font-weight: 600;">
            ${initial}
        </div>
    `;
}

/**
 * 渲染空狀態
 */
export function renderEmptyState(message, icon = '📭') {
    return `
        <div class="empty-state" style="padding: 40px; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 16px;">${icon}</div>
            <p style="color: var(--text-muted);">${message}</p>
        </div>
    `;
}

/**
 * 渲染載入狀態
 */
export function renderLoadingState(message = '載入中...') {
    return `
        <div class="loading-state" style="padding: 40px; text-align: center;">
            <div class="spinner" style="margin: 0 auto 16px;"></div>
            <p style="color: var(--text-muted);">${message}</p>
        </div>
    `;
}

/**
 * 渲染錯誤狀態
 */
export function renderErrorState(message, onRetry = null) {
    return `
        <div class="error-state" style="padding: 40px; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 16px;">❌</div>
            <p style="color: var(--error-color); margin-bottom: 16px;">${message}</p>
            ${onRetry ? `<button class="btn btn-secondary" onclick="${onRetry}">重試</button>` : ''}
        </div>
    `;
}

/**
 * 認證工具模組
 * 處理 Token 管理和認證檢查
 */

const TOKEN_KEY = 'adminToken';

/**
 * 獲取存儲的 Token
 */
export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

/**
 * 設置 Token
 */
export function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

/**
 * 移除 Token
 */
export function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
}

/**
 * 檢查是否已認證
 */
export function isAuthenticated() {
    return !!getToken();
}

/**
 * 解析 JWT Token
 */
export function parseToken(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

/**
 * 檢查 Token 是否過期
 */
export function isTokenExpired(token) {
    const parsed = parseToken(token || getToken());
    if (!parsed || !parsed.exp) return true;
    return parsed.exp * 1000 < Date.now();
}

/**
 * 檢查認證狀態並重定向
 */
export function checkAuthOrRedirect() {
    const token = getToken();
    if (!token || isTokenExpired(token)) {
        removeToken();
        window.location.href = '/admin/login';
        return false;
    }
    return true;
}

/**
 * 登出
 */
export function logout() {
    removeToken();
    window.location.href = '/admin/login';
}

/**
 * 獲取用戶資訊
 */
export function getUserInfo() {
    const token = getToken();
    if (!token) return null;
    return parseToken(token);
}

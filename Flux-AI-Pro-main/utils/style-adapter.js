// =================================================================================
//  風格適配器 (Style Adapter)
//  適配 Cloudflare Workers（服務器端）和瀏覽器（客戶端）環境
// =================================================================================

import { CORE_STYLES, CORE_CATEGORIES } from '../styles/core.js';
import { EXTENDED_STYLES, EXTENDED_CATEGORIES } from '../styles/extended.js';

/**
 * 服務器端風格管理器（Cloudflare Workers）
 * 不支持用戶自定義風格，只使用核心風格和擴展風格
 */
export class ServerStyleManager {
  constructor() {
    this.styles = { ...CORE_STYLES, ...EXTENDED_STYLES };
    this.categories = { ...CORE_CATEGORIES, ...EXTENDED_CATEGORIES };
  }

  getStyles() {
    return this.styles;
  }

  getCategories() {
    return this.categories;
  }

  getStats() {
    return {
      core: Object.keys(CORE_STYLES).length,
      extended: Object.keys(EXTENDED_STYLES).length,
      user: 0,
      total: Object.keys(this.styles).length
    };
  }

  // 獲取本地化的風格名稱
  getStyleName(styleKey, lang = 'zh') {
    const style = this.styles[styleKey];
    if (!style) return styleKey;
    
    if (typeof style.name === 'object') {
      return style.name[lang] || style.name['en'] || style.name['zh'] || styleKey;
    }
    return style.name || styleKey;
  }

  // 獲取本地化的風格描述
  getStyleDescription(styleKey, lang = 'zh') {
    const style = this.styles[styleKey];
    if (!style) return '';
    
    if (typeof style.description === 'object') {
      return style.description[lang] || style.description['en'] || style.description['zh'] || '';
    }
    return style.description || '';
  }

  // 獲取本地化的分類名稱
  getCategoryName(categoryKey, lang = 'zh') {
    const category = this.categories[categoryKey];
    if (!category) return categoryKey;
    
    if (typeof category.name === 'object') {
      return category.name[lang] || category.name['en'] || category.name['zh'] || categoryKey;
    }
    return category.name || categoryKey;
  }

  merge() {
    return {
      styles: this.styles,
      categories: this.categories,
      stats: this.getStats()
    };
  }
}

/**
 * 客戶端風格管理器（瀏覽器）
 * 支持用戶自定義風格，使用 IndexedDB
 */
export class ClientStyleManager {
  constructor() {
    this.coreStyles = CORE_STYLES;
    this.coreCategories = CORE_CATEGORIES;
    this.extendedStyles = EXTENDED_STYLES;
    this.extendedCategories = EXTENDED_CATEGORIES;
    this.userStyles = {};
    this.userCategories = {};
    this.dbName = 'FluxAI_Styles';
    this.dbVersion = 1;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;
    
    try {
      await this.loadUserStyles();
      this.initialized = true;
      console.log('✅ ClientStyleManager initialized');
    } catch (error) {
      console.error('❌ Failed to initialize ClientStyleManager:', error);
      this.initialized = true;
    }
  }

  async loadUserStyles() {
    try {
      const db = await this.openDB();
      const styles = await this.getAllFromDB(db, 'user_styles');
      const categories = await this.getAllFromDB(db, 'user_categories');
      
      this.userStyles = styles.reduce((acc, style) => {
        acc[style.id] = {
          name: style.name,
          prompt: style.prompt,
          negative: style.negative || "",
          category: style.category,
          icon: style.icon || "🎨",
          description: style.description || "",
          isUser: true,
          createdAt: style.createdAt || Date.now()
        };
        return acc;
      }, {});
      
      this.userCategories = categories.reduce((acc, cat) => {
        acc[cat.id] = {
          name: cat.name,
          icon: cat.icon,
          order: cat.order || 999
        };
        return acc;
      }, {});
      
      console.log(`📦 Loaded ${Object.keys(this.userStyles).length} user styles`);
    } catch (error) {
      console.error("Failed to load user styles:", error);
    }
  }

  merge() {
    const mergedStyles = {
      ...this.coreStyles,
      ...this.extendedStyles,
      ...this.userStyles
    };
    
    const mergedCategories = {
      ...this.coreCategories,
      ...this.extendedCategories,
      ...this.userCategories
    };
    
    return {
      styles: mergedStyles,
      categories: mergedCategories,
      stats: {
        core: Object.keys(this.coreStyles).length,
        extended: Object.keys(this.extendedStyles).length,
        user: Object.keys(this.userStyles).length,
        total: Object.keys(mergedStyles).length
      }
    };
  }

  async saveUserStyle(styleId, styleConfig) {
    try {
      const db = await this.openDB();
      await this.putToDB(db, 'user_styles', {
        id: styleId,
        ...styleConfig,
        createdAt: Date.now()
      });
      
      this.userStyles[styleId] = {
        ...styleConfig,
        isUser: true,
        createdAt: Date.now()
      };
      
      console.log(`✅ Saved user style: ${styleId}`);
      return { success: true, styleId };
    } catch (error) {
      console.error("Failed to save user style:", error);
      return { success: false, error: error.message };
    }
  }

  async deleteUserStyle(styleId) {
    try {
      const db = await this.openDB();
      await this.deleteFromDB(db, 'user_styles', styleId);
      delete this.userStyles[styleId];
      console.log(`🗑️ Deleted user style: ${styleId}`);
      return { success: true, styleId };
    } catch (error) {
      console.error("Failed to delete user style:", error);
      return { success: false, error: error.message };
    }
  }

  async updateUserStyle(styleId, styleConfig) {
    try {
      const db = await this.openDB();
      const existing = await this.getFromDB(db, 'user_styles', styleId);
      
      if (!existing) {
        return { success: false, error: 'Style not found' };
      }
      
      await this.putToDB(db, 'user_styles', {
        ...existing,
        ...styleConfig,
        id: styleId,
        updatedAt: Date.now()
      });
      
      this.userStyles[styleId] = {
        ...this.userStyles[styleId],
        ...styleConfig,
        isUser: true,
        updatedAt: Date.now()
      };
      
      console.log(`✏️ Updated user style: ${styleId}`);
      return { success: true, styleId };
    } catch (error) {
      console.error("Failed to update user style:", error);
      return { success: false, error: error.message };
    }
  }

  getUserStylesList() {
    return Object.entries(this.userStyles).map(([id, style]) => ({
      id,
      ...style
    }));
  }

  exportUserStyles() {
    return {
      styles: this.userStyles,
      categories: this.userCategories,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };
  }

  async importUserStyles(data) {
    try {
      if (!data.styles || typeof data.styles !== 'object') {
        throw new Error('Invalid import data');
      }
      
      const db = await this.openDB();
      let importedCount = 0;
      
      for (const [styleId, styleConfig] of Object.entries(data.styles)) {
        await this.putToDB(db, 'user_styles', {
          id: styleId,
          ...styleConfig,
          importedAt: Date.now()
        });
        importedCount++;
      }
      
      if (data.categories && typeof data.categories === 'object') {
        for (const [catId, catConfig] of Object.entries(data.categories)) {
          await this.putToDB(db, 'user_categories', {
            id: catId,
            ...catConfig
          });
        }
      }
      
      await this.loadUserStyles();
      
      console.log(`📥 Imported ${importedCount} user styles`);
      return { success: true, importedCount };
    } catch (error) {
      console.error("Failed to import user styles:", error);
      return { success: false, error: error.message };
    }
  }

  async clearUserStyles() {
    try {
      const db = await this.openDB();
      await this.clearStore(db, 'user_styles');
      await this.clearStore(db, 'user_categories');
      this.userStyles = {};
      this.userCategories = {};
      console.log('🧹 Cleared all user styles');
      return { success: true };
    } catch (error) {
      console.error("Failed to clear user styles:", error);
      return { success: false, error: error.message };
    }
  }

  // IndexedDB 輔助方法
  openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        if (!db.objectStoreNames.contains('user_styles')) {
          const styleStore = db.createObjectStore('user_styles', { keyPath: 'id' });
          styleStore.createIndex('createdAt', 'createdAt', { unique: false });
          styleStore.createIndex('category', 'category', { unique: false });
        }
        
        if (!db.objectStoreNames.contains('user_categories')) {
          db.createObjectStore('user_categories', { keyPath: 'id' });
        }
      };
    });
  }

  getAllFromDB(db, storeName) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  getFromDB(db, storeName, key) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  putToDB(db, storeName, data) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  deleteFromDB(db, storeName, key) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  clearStore(db, storeName) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.clear();
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
}

/**
 * 統一的風格管理器工廠
 * 根據環境自動選擇適當的管理器
 */
export function createStyleManager() {
  // 檢測是否在瀏覽器環境
  const isBrowser = typeof window !== 'undefined' && typeof indexedDB !== 'undefined';
  
  if (isBrowser) {
    console.log('🌐 Using ClientStyleManager (Browser)');
    return new ClientStyleManager();
  } else {
    console.log('☁️ Using ServerStyleManager (Cloudflare Worker)');
    return new ServerStyleManager();
  }
}

// 單例實例
export const styleManager = createStyleManager();

// 自動初始化（僅在瀏覽器環境中）
if (typeof window !== 'undefined') {
  styleManager.initialize().catch(console.error);
}

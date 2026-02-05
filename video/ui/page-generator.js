/**
 * 影片生成頁面生成器
 * Video Generation Page Generator
 */

import { VideoTemplates } from './templates.js';
import { VideoUIComponents } from './components.js';

/**
 * 頁面生成器類別
 */
export class VideoPageGenerator {
  /**
   * 生成主頁面
   * @returns {string} HTML 頁面
   */
  generateMainPage() {
    let html = VideoTemplates.mainPage;
    
    // 插入 JavaScript
    const scriptTag = `<script>${VideoUIComponents.mainPageScript}</script>`;
    html = html.replace(
      '  <script>\n    // JavaScript 將由 page-generator.js 動態生成\n  </script>',
      scriptTag
    );
    
    return html;
  }

  /**
   * 生成 Nano 版本頁面
   * @returns {string} HTML 頁面
   */
  generateNanoPage() {
    let html = VideoTemplates.nanoPage;
    
    // 插入 JavaScript
    const scriptTag = `<script>${VideoUIComponents.nanoPageScript}</script>`;
    html = html.replace(
      '  <script>\n    // JavaScript 將由 page-generator.js 動態生成\n  </script>',
      scriptTag
    );
    
    return html;
  }

  /**
   * 處理影片頁面請求
   * @param {Request} request - HTTP 請求
   * @returns {Response} HTTP 回應
   */
  handleVideoPage(request) {
    const url = new URL(request.url);
    
    if (url.pathname === '/video') {
      return new Response(this.generateMainPage(), {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-cache'
        }
      });
    }
    
    if (url.pathname === '/video/nano') {
      return new Response(this.generateNanoPage(), {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-cache'
        }
      });
    }
    
    return null;
  }
}

// 導出單例實例
export const videoPageGenerator = new VideoPageGenerator();

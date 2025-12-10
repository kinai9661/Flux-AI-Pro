# 🎨 Flux AI Pro - v8.8.1 智能自适应版

[![Deploy to Cloudflare Workers](https://img.shields.io/badge/Deploy%20to-Cloudflare%20Workers-orange?style=for-the-badge&logo=cloudflare)](https://workers.cloudflare.com/)
[![Version](https://img.shields.io/badge/Version-8.8.1-blue?style=for-the-badge)](https://github.com/kinai9661/Flux-AI-Pro)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Cost](https://img.shields.io/badge/Cost-100%25%20FREE-success?style=for-the-badge)](https://pollinations.ai/)

> **基於 Cloudflare Workers 的智能自适应 AI 图像生成平台**
> 
> **✨ 三档质量模式** | **🧠 智能提示词分析** | **⚡ 模型专属优化** | **🎨 19 个免费模型** | **🌍 自动中译英** | **完全开源**

---

## 🆕 v8.8.1 最新版本亮点

### 🎯 核心功能

#### 1️⃣ **三档质量模式系统**

| 模式 | 特性 | 最低分辨率 | 步数倍率 | 适用场景 |
|------|------|------------|----------|----------|
| **⚡ 经济模式** | 快速出图 | 1024px | 0.85× | 快速测试、草稿预览 |
| **⭐ 标准模式** | 平衡质量 | 1280px | 1.0× | 日常使用、一般项目 |
| **💎 超高清模式** | 极致质量 | 1536px | 1.35× | 最终交付、专业作品 |

#### 2️⃣ **智能提示词分析器**

自动分析提示词复杂度（0-100%），智能推荐最佳质量模式：

```javascript
// 分析维度
✓ 关键词复杂度: 'detailed', 'photorealistic', 'intricate' 等
✓ 提示词长度: >100字 / >200字
✓ 描述深度: 分句数量、细节层次

// 自动推荐
复杂度 > 70% → 超高清模式
复杂度 40-70% → 标准模式
复杂度 < 40% → 经济模式
```

#### 3️⃣ **自动中译英功能**

使用 Cloudflare Workers AI 免费翻译，提高中文提示词生成质量：

```javascript
// 自动检测中文并翻译
"一个穿着汉服的少女" → "A girl wearing traditional Chinese hanfu"

✓ 完全免费（Cloudflare Workers AI）
✓ 无需额外 API Key
✓ 支持中英文混合提示词
✓ 自动检测，纯英文不翻译
✓ 高可靠性，错误时保持原文
```

#### 4️⃣ **19 种 AI 模型**

包括 Flux Pro, Flux Realism, Nano Banana (🍌 Google Gemini), SD3.5, SDXL Lightning 等：

- **Flux 系列**: 7 种模型（基础/写实/动漫/3D/Pro/暗黑/极速）
- **Flux 高级版**: 3 种实验性模型（Flux 1.1 Pro, Kontext, Kontext Pro）
- **Nano Banana**: 2 种 Google Gemini 模型（支持4K、繁中文字、图像融合）
- **Stable Diffusion**: 5 种 SD 模型（SD3, SD3.5 Large/Turbo, SDXL, SDXL Lightning）

#### 5️⃣ **12 种艺术风格**

日本漫画、动漫、赛博朋克、写实照片、油画、水彩、像素艺术、吉卜力、美式漫画、素描、奇幻、矢量图

#### 6️⃣ **实时计时器**

生成过程中显示实时耗时，完成后显示总耗时

---

## ✨ 完整功能列表

- ✅ **自动高清 (Auto HD)**: 智能注入 8k/UHD 提示词 + 尺寸优化
- ✅ **智能参数优化**: 根据模型/尺寸/风格自动调整 Steps/Guidance
- ✅ **自动中译英**: 使用 Cloudflare Workers AI 免费翻译
- ✅ **19 种顶级模型**: Flux Pro/Realism, Nano Banana, SD3.5, SDXL Lightning 等
- ✅ **12 种艺术风格**: 日漫、赛博朋克、写实、油画、水彩等
- ✅ **私密模式**: 保护用户隐私
- ✅ **OpenAI 兼容 API**: 直接对接 NextChat/LobeChat
- ✅ **历史记录**: 本地存储最近 100 条
- ✅ **实时计时**: 生成过程实时显示耗时

---

## 🎨 模型与风格列表

### 19 个免费模型 (Pollinations.ai)

<details>
<summary><strong>查看完整列表 (点击展开)</strong></summary>

| 分类 | 模型 ID | 描述 | 质量配置 |
|------|---------|------|----------|
| **Flux 标准** | `flux` | 基础版 | 标准优化 |
| | `flux-realism` | 超写实 | 💎 极致细节 |
| | `flux-anime` | 动漫 | ⭐ 清晰度优先 |
| | `flux-3d` | 3D 渲染 | ⭐ 细节增强 |
| | `flux-pro` | 专业版 | 💎 最高质量 |
| | `any-dark` | 暗黑 | ⭐ 纹理增强 |
| | `turbo` | 极速版 | ⚡ 速度优先 |
| **Flux 高级** | `flux-1.1-pro` 🧪 | v1.1 Pro | 💎 最高质量 |
| | `flux-kontext` 🧪 | Context | ⭐ 标准 |
| | `flux-kontext-pro` 🧪 | Context Pro | 💎 专业级 |
| **Nano Banana** | `nanobanana` | Gemini 2.5 Flash | ⭐ 快速生成 |
| | `nanobanana-pro` | Gemini 3 Pro | 💎 4K+繁中文字 |
| **SD3 系列** | `sd3` 🧪 | SD3 标准 | ⭐ 质量增强 |
| | `sd3.5-large` 🧪 | SD3.5 Large | 💎 旗舰画质 |
| | `sd3.5-turbo` 🧪 | SD3.5 Turbo | ⚡ 快速迭代 |
| **SDXL** | `sdxl` 🧪 | SDXL 1.0 | ⭐ 质量增强 |
| | `sdxl-lightning` 🧪 | Lightning | ⚡ 闪电生成 |

> 🧪 = 实验性模型 (可能自动回退到稳定模型)

</details>

### 12 种艺术风格

| 风格 | 提示词加成 | 负面提示词 |
|------|------------|------------|
| 🏌 Japanese Manga | manga style, screentone | realistic, 3d render |
| ✨ Anime | vibrant colors, anime art | realistic, photograph |
| 📷 Photorealistic | 8k uhd, professional photography | anime, cartoon |
| 🌃 Cyberpunk | neon lights, futuristic | natural, rustic |
| 🎨 Oil Painting | classical style, brushstrokes | digital art, anime |
| 💧 Watercolor | soft colors, hand-painted | digital, sharp edges |
| 📐 Vector | flat design, clean lines | realistic, textured |
| 👾 Pixel Art | 8-bit style, pixelated | high resolution |
| 🌿 Studio Ghibli | Miyazaki style, whimsical | dark, gritty |
| 💥 Comic Book | bold lines, vibrant colors | manga, realistic |
| ✏️ Sketch | hand-drawn, graphite | colored, digital |
| 🐉 Fantasy | magical, epic fantasy | modern, mundane |

---

## 🚀 部署指南

### 前置要求
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (v3.0+)
- Cloudflare 账号 (免费计划即可)

### 快速部署

```bash
# 1. 克隆项目
git clone https://github.com/kinai9661/Flux-AI-Pro.git
cd Flux-AI-Pro

# 2. 安装 Wrangler
npm install -g wrangler
wrangler login

# 3. 部署
wrangler deploy

# 4. 访问 Worker URL
# 例: https://flux-ai-pro.your-subdomain.workers.dev
```

### 一键部署

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/kinai9661/Flux-AI-Pro)

---

## 🔌 API 文档

### 1. 图像生成 (Standard)

**Endpoint:** `POST /v1/images/generations`

#### Request Body
```json
{
  "prompt": "a futuristic city with flying cars, highly detailed",
  "model": "flux-realism",
  "quality_mode": "ultra",      // 🆕 "economy" | "standard" | "ultra"
  "width": 1536,
  "height": 1536,
  "style": "photorealistic",
  "n": 1,
  "auto_hd": true,              // 自动高清
  "auto_optimize": true,        // 智能优化
  "negative_prompt": "blurry, low quality",
  "seed": 123456,
  "private": true
}
```

#### Response
```json
{
  "created": 1733923200,
  "data": [
    {
      "url": "https://image.pollinations.ai/prompt/...",
      "provider": "Pollinations.ai",
      "model": "flux-realism",
      "width": 1536,
      "height": 1536,
      "seed": 123456,
      "quality_mode": "ultra",             // 🆕 使用的质量模式
      "prompt_complexity": 0.78,           // 🆕 提示词复杂度 (0-1)
      "hd_optimized": true,                // 是否 HD 优化
      "auto_translated": true,             // 🆕 是否自动翻译
      "hd_details": {                      // 🆕 HD 优化详情
        "hd_level": "maximum",
        "size_upscaled": true,
        "optimizations": [
          "HD增强: maximum",
          "尺寸优化: 1024x1024 → 1536x1536"
        ]
      },
      "auto_optimized": true,              // 是否智能优化
      "steps": 48,                         // 🆕 最终步数 (含质量模式加成)
      "guidance": 9.6,                     // 🆕 最终引导 (含质量模式加成)
      "cost": "FREE"
    }
  ]
}
```

### 2. 聊天生成 (OpenAI Compatible)

**Endpoint:** `POST /v1/chat/completions`

```json
{
  "model": "flux-pro",
  "messages": [
    { "role": "user", "content": "画一只在太空的猫，极致细节" }
  ],
  "quality_mode": "ultra",  // 🆕
  "width": 1536,
  "height": 1536,
  "auto_hd": true,
  "auto_optimize": true
}
```

### 3. 查询接口

| Endpoint | 方法 | 描述 |
|----------|------|------|
| `/v1/models` | GET | 列出所有可用模型 + 质量配置 |
| `/v1/providers` | GET | 查询提供商信息 |
| `/v1/styles` | GET | 列出所有风格预设 |
| `/health` | GET | 健康检查 + 版本信息 |

---

## ⚙️ 配置文件

### wrangler.toml
```toml
name = "flux-ai-pro"
main = "worker.js"
compatibility_date = "2025-12-10"

[vars]
PROJECT_VERSION = "8.8.1"
ENABLE_QUALITY_MODES = "true"
ENABLE_AUTO_TRANSLATE = "true"
```

---

## 📅 更新日志

### v8.8.1 (2025-12-11) - ✨ 移除中文提示
- **优化**: 移除主界面中文提示词相关提示文字
- **保留**: 后台自动翻译功能仍然工作
- **增强**: 界面更加简洁专业
- **修复**: 代码完整性验证和错误修复

### v8.8.0 (2025-12-10) - 🍌 Nano Banana
- **新增**: Nano Banana 模型支持 (Google Gemini 2.5 Flash / 3 Pro)
- **新增**: Nano Banana 专用界面 (/nanobanana)
- **支持**: 4K 画质、繁中文字生成、14 图融合

### v8.7.3 (2025-12-10) - 🌍 自动翻译
- **新增**: 自动中译英功能
- **使用**: Cloudflare Workers AI (@cf/meta/m2m100-1.2b)
- **提高**: 中文提示词生成质量
- **免费**: 完全免费，无需额外 API Key

### v8.7.2 (2025-12-10) - ⏱️ 实时计时
- **新增**: 生成图片实时计时功能
- **效果**: 每 100ms 更新一次已耗时间
- **显示**: 生成完成后显示总耗时

### v8.7.1 (2025-12-10) - 🇨🇳 中文支持
- **增强**: 中文提示词支持
- **添加**: 中文示例按钮
- **优化**: 中文用户体验

### v8.7.0 (2025-12-10) - 📁 配置文件
- **新增**: wrangler.toml 配置文件
- **简化**: 部署流程

### v8.6.1 (2025-12-04) - ✨ 优化版
- **新增**: 内容安全过滤机制
- **优化**: 代码架构清理
- **增强**: Web UI 用户体验

### v8.6.0 (2025-12-04) - 🧠 智能自适应版
- **新增**: 三档质量模式 (经济/标准/超高清)
- **新增**: 智能提示词复杂度分析器 (PromptAnalyzer)
- **新增**: 模型专属质量配置 (MODEL_QUALITY_PROFILES)
- **新增**: 增强 HD 提示词库 (三级: basic/enhanced/maximum)
- **新增**: 质量模式单选 UI (美观卡片设计)
- **优化**: HDOptimizer 支持质量模式参数
- **优化**: ParameterOptimizer 多维度计算 (模式倍率 + 模型加成)

### v8.5.0 (2025-11-29) - 💎 自动高清版
- **新增**: Auto HD (自动高清) 功能
- **新增**: HDOptimizer 类
- **优化**: Web UI 高清开关

### v8.4.0 - 🎬 动态 UI
- **新增**: 实时进度条模拟
- **新增**: 状态消息反馈

### v8.3.0 - 🧠 智能优化
- **新增**: 自动计算 Steps/Guidance

### v8.0.0 - 🦄 架构重构
- **重构**: 多提供商架构
- **新增**: 历史记录系统

---

## 🌐 演示与部署

- **最新演示站**: [https://koy.xx.kg/](https://koy.xx.kg/)
- **GitHub 仓库**: [kinai9661/Flux-AI-Pro](https://github.com/kinai9661/Flux-AI-Pro)
- **部署平台**: Cloudflare Workers (免费计划支持)

---

## 💡 使用建议

### 质量模式选择指南

| 场景 | 推荐模式 | 理由 |
|------|----------|------|
| 快速测试概念 | ⚡ 经济 | 速度优先，节省资源 |
| 日常社交媒体 | ⭐ 标准 | 平衡质量与速度 |
| 专业作品集 | 💎 超高清 | 极致细节，适合印刷 |
| 客户交付 | 💎 超高清 | 最高标准，零妃协 |
| 动画帧生成 | ⚡ 经济 | 批量生成，一致性优先 |
| 产品渲染图 | 💎 超高清 | 商业用途，细节重要 |

### 模型 + 模式组合推荐

```
顶级质量:
flux-realism + 超高清 + photorealistic 风格
→ 适合: 商业摄影、产品展示、人像特写

动漫高清:
flux-anime + 标准/超高清 + anime 风格
→ 适合: 游戏角色、漫画封面、插画

快速迭代:
turbo + 经济 + 任意风格
→ 适合: 概念草图、头脑风暴、A/B 测试

艺术创作:
flux-pro + 超高清 + oil-painting/watercolor
→ 适合: 数字艺术品、NFT、画廊展示

中文生成:
nanobanana-pro + 超高清 + 自动翻译
→ 适合: 繁中文字、中文海报、4K 画质
```

---

## ⚠️ 重要提醒

### Pollinations.ai 服务说明
1. **完全免费**，但服务稳定性由第三方控制
2. 请遵守其 [使用条款](https://pollinations.ai/terms)
3. 部分实验性模型可能不可用 (自动回退)

### 质量模式与性能
1. **超高清模式**会增加生成时间 (约 +35%)
2. **自动优化**会根据复杂度推荐最佳模式
3. 建议首次测试使用**标准模式**找到平衡点

### 自动翻译功能
1. **自动检测**中文提示词并翻译成英文
2. **提高质量**：Flux/SD 模型对英文理解更好
3. **完全免费**：使用 Cloudflare Workers AI
4. **高可靠**：翻译失败时自动使用原文

---

## 🤝 贡献

欢迎提交 Issue 或 Pull Request!

### 开发指南
```bash
# 本地开发
wrangler dev

# 部署测试
wrangler deploy --env dev

# 生产部署
wrangler deploy
```

---

## 📄 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件

---

## 🙏 致谢

- [Pollinations.ai](https://pollinations.ai/) - 免费 AI 图像生成服务
- [Cloudflare Workers](https://workers.cloudflare.com/) - 全球边缘计算平台
- [Black Forest Labs](https://blackforestlabs.ai/) - FLUX 系列模型
- [Stability AI](https://stability.ai/) - Stable Diffusion 系列
- [Google](https://deepmind.google/) - Gemini AI (用于 Nano Banana)

---

<div align="center">
  <sub>Made with ❤️ by <a href="https://github.com/kinai9661">kinai9661</a></sub>
  <br><br>
  <a href="https://workers.cloudflare.com">
    <img src="https://img.shields.io/badge/Cloudflare-Workers-orange?logo=cloudflare&style=flat-square" alt="Cloudflare Workers">
  </a>
  <a href="https://pollinations.ai">
    <img src="https://img.shields.io/badge/Pollinations-AI-green?style=flat-square" alt="Pollinations AI">
  </a>
  <a href="https://github.com/kinai9661/Flux-AI-Pro/stargazers">
    <img src="https://img.shields.io/github/stars/kinai9661/Flux-AI-Pro?style=flat-square" alt="GitHub stars">
  </a>
</div>
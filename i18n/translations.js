// =================================================================================
//  多語言翻譯檔案 (i18n Translations)
//  支援語言：繁體中文 (zh)、英文 (en)、日文 (ja)、韓文 (ko)、阿拉伯語 (ar - RTL)
// =================================================================================

export const TRANSLATIONS = {
  // ====== 繁體中文 (zh) ======
  zh: {
    // 導航選項
    nav_gen: "🎨 生成圖像",
    nav_his: "📚 歷史記錄",
    nav_video: "🎬 生成影片",
    nav_nano: "🍌 Nano版",
    
    // 設定標籤
    settings_title: "⚙️ 生成參數",
    provider_label: "API 供應商",
    model_label: "模型選擇",
    size_label: "尺寸預設",
    style_label: "藝術風格 🎨",
    quality_label: "質量模式",
    seed_label: "Seed (種子碼)",
    seed_random: "🎲 隨機",
    seed_lock: "🔒 鎖定",
    auto_opt_label: "✨ 自動優化",
    auto_opt_desc: "自動調整 Steps 與 Guidance",
    adv_settings: "🛠️ 進階參數",
    steps_label: "生成步數 (Steps)",
    guidance_label: "引導係數 (Guidance)",
    
    // 按鈕
    gen_btn: "🎨 開始生成",
    btn_export: "📥 導出",
    btn_clear: "🗑️ 清空",
    btn_reuse: "🔄 重用",
    btn_dl: "💾 下載",
    
    // 提示詞相關
    pos_prompt: "正面提示詞",
    neg_prompt: "負面提示詞 (可選)",
    ref_img: "參考圖像 (Img2Img) 📸",
    
    // 狀態訊息
    empty_title: "尚未生成任何圖像",
    no_history: "暫無歷史記錄",
    cooldown_msg: "⏳ 請等待冷卻時間...",
    generating: "生成中...",
    
    // 統計
    stat_total: "📊 總記錄數",
    stat_storage: "💾 存儲空間 (永久)",
    
    // Nano 版專用
    nano_title: "🍌 NanoBanana Pro - 控制台",
    nano_prompt: "Prompt",
    nano_canvas_ratio: "畫布比例",
    nano_style_settings: "風格與設定",
    nano_exclude: "排除",
    nano_energy_per_hour: "每小時能量",
    nano_consume_energy: "消耗 1 香蕉能量",
    nano_energy_recharging: "能量回充中",
    nano_injecting_energy: "正在注入 AI 能量",
    nano_generating: "生成中",
    nano_uploading_image: "上傳圖片",
    nano_energy_depleted: "本小時能量已耗盡",
    nano_come_back_later: "請稍後再來",
    nano_dice: "🎲 靈感骰子",
    
    // 提示詞生成器
    prompt_generator_title: "專業提示詞生成器",
    prompt_generator_upload_ref: "上傳參考圖片 (可選)",
    prompt_generator_select_image: "選擇圖片",
    prompt_generator_simple_desc: "簡單描述你想要的畫面",
    prompt_generator_generate: "生成專業提示詞",
    prompt_generator_apply: "應用到提示詞",
    prompt_generator_generated: "生成的專業提示詞",
    prompt_generator_tip: "💡 小提示：選擇左側的「藝術風格」後，生成器會自動融合該風格（如：賽博龐克、水墨畫等）到提示詞中，讓畫面更具藝術感！",
    
    // 質量模式
    quality_economy: "Economy",
    quality_standard: "Standard",
    quality_ultra: "Ultra HD",
    quality_economy_desc: "快速出圖",
    quality_standard_desc: "平衡質量與速度",
    quality_ultra_desc: "極致質量",
    
    // 供應商
    provider_pollinations: "Pollinations.ai (Free)",
    provider_infip: "Ghostbot (Infip) 🌟",
    provider_aqua: "Aqua Server 🌊",
    
    // 模型名稱
    model_kontext: "Kontext",
    model_nanobanana: "NanoBanana 🍌",
    model_seedream: "SeeDream",
    model_flux_schnell: "Flux Schnell",
    model_zimage: "Z-Image",
    model_klein: "FLUX.2 Klein",
    model_klein_large: "FLUX.2 Klein 9B",
    
    // 供應商統計
    provider_stats_title: "📊 供應商使用統計",
    provider_stats_total: "總生成次數",
    provider_stats_ratio: "使用比例",
    provider_stats_count: "使用次數",
    provider_stats_refresh: "重新整理",
    provider_stats_no_data: "暫無統計數據",
    
    // API Key
    api_key_label: "API Key",
    api_key_desc: "Stored locally",
    api_key_placeholder: "Paste your API Key here",
    api_key_get_key: "Get free key from",
    
    // NSFW
    nsfw_label: "🔞 解除成人內容限制 (NSFW)",
    nsfw_desc: "啟用此選項將允許生成成人內容 (僅 Infip)",
    
    // 批量生成
    batch_label: "🖼️ 批量生成",
    batch_size_label: "生成數量 (Batch Size)",
    
    // 錯誤訊息
    error_no_prompt: "⚠️ 請輸入提示詞",
    error_energy_depleted: "🚫 本小時能量已耗盡，請稍後再來！",
    error_image_too_large: "圖片太大！最大 32MB",
    error_invalid_file: "請選擇圖片文件",
    error_upload_failed: "上傳失敗",
    
    // 語言切換
    lang_switch: "EN / 繁中",
    lang_zh: "繁體中文",
    lang_en: "English",
    lang_ja: "日本語",
    lang_ko: "한국어",
    lang_ar: "العربية",
    lang_auto_detect: "🌐 自動偵測系統語言",
    lang_auto_detect_desc: "根據瀏覽器語言自動切換介面語言",
    
    // 風格類別
    style_category_basic: "基礎",
    style_category_illustration: "插畫動畫",
    style_category_manga: "漫畫風格",
    style_category_monochrome: "黑白單色",
    style_category_realistic: "寫實照片",
    style_category_painting: "繪畫風格",
    style_category_art_movement: "藝術流派",
    style_category_visual: "視覺風格",
    style_category_digital: "數位風格",
    style_category_traditional: "傳統藝術",
    style_category_aesthetic: "美學風格",
    style_category_scifi: "科幻",
    style_category_fantasy: "奇幻",
    
    // 風格名稱
    style_none: "無風格",
    style_anime: "動漫風格",
    style_ghibli: "吉卜力",
    style_manga: "日本漫畫",
    style_manga_color: "彩色日漫",
    style_american_comic: "美式漫畫",
    style_korean_webtoon: "韓國網漫",
    style_chibi: "Q版漫畫",
    style_black_white: "黑白",
    style_sketch: "素描",
    style_ink_drawing: "水墨畫",
    style_silhouette: "剪影",
    style_charcoal: "炭筆畫",
    style_photorealistic: "寫實照片",
    style_oil_painting: "油畫",
    style_watercolor: "水彩畫",
    style_impressionism: "印象派",
    style_abstract: "抽象派",
    style_cubism: "立體主義",
    style_surrealism: "超現實主義",
    style_pop_art: "普普藝術",
    style_neon: "霓虹燈",
    style_vintage: "復古",
    style_steampunk: "蒸汽朋克",
    style_minimalist: "極簡主義",
    style_vaporwave: "蒸氣波",
    style_pixel_art: "像素藝術",
    style_low_poly: "低多邊形",
    style_3d_render: "3D渲染",
    style_gradient: "漸變",
    style_glitch: "故障藝術",
    style_ukiyo_e: "浮世繪",
    style_stained_glass: "彩繪玻璃",
    style_paper_cut: "剪紙藝術",
    style_gothic: "哥特風格",
    style_art_nouveau: "新藝術",
    style_cyberpunk: "賽博朋克",
    style_fantasy: "奇幻風格",
    
    // 影片生成
    video_title: "🎬 影片生成",
    video_model_label: "影片模型",
    video_duration_label: "影片長度 (秒)",
    video_size_label: "影片尺寸",
    video_provider_label: "影片供應商",
    video_gen_btn: "🎬 開始生成影片",
    video_generating: "影片生成中...",
    video_error_no_prompt: "⚠️ 請輸入提示詞",
    video_error_limit_exceeded: "🚫 影片生成限額已滿",
    video_error_disabled: "影片生成功能尚未啟用",
    video_model_svd: "SVD",
    video_model_svd_xt: "SVD-XT",
    video_provider_pollinations: "Pollinations.ai"
  },
  
  // ====== 英文 (en) ======
  en: {
    // Navigation
    nav_gen: "🎨 Generate Image",
    nav_his: "📚 History",
    nav_video: "🎬 Generate Video",
    nav_nano: "🍌 Nano",
    
    // Settings
    settings_title: "⚙️ Generation Settings",
    provider_label: "API Provider",
    model_label: "Model Selection",
    size_label: "Image Size",
    style_label: "Art Style 🎨",
    quality_label: "Quality Mode",
    seed_label: "Seed Value",
    seed_random: "🎲 Random",
    seed_lock: "🔒 Lock",
    auto_opt_label: "✨ Auto Optimize",
    auto_opt_desc: "Automatically adjust Steps & Guidance",
    adv_settings: "🛠️ Advanced Settings",
    steps_label: "Generation Steps",
    guidance_label: "Guidance Scale",
    
    // Buttons
    gen_btn: "🎨 Start Generation",
    btn_export: "📥 Export",
    btn_clear: "🗑️ Clear All",
    btn_reuse: "🔄 Reuse Settings",
    btn_dl: "💾 Download",
    
    // Prompts
    pos_prompt: "Positive Prompt",
    neg_prompt: "Negative Prompt (Optional)",
    ref_img: "Reference Image (Img2Img) 📸",
    
    // Status Messages
    empty_title: "No images generated yet",
    no_history: "No history records found",
    cooldown_msg: "⏳ Please wait for cooldown...",
    generating: "Generating...",
    
    // Statistics
    stat_total: "📊 Total Records",
    stat_storage: "💾 Storage Space (Permanent)",
    
    // Nano Version
    nano_title: "🍌 NanoBanana Pro - Console",
    nano_prompt: "Prompt",
    nano_canvas_ratio: "Canvas Ratio",
    nano_style_settings: "Style & Settings",
    nano_exclude: "Exclude",
    nano_energy_per_hour: "Energy per Hour",
    nano_consume_energy: "Consume 1 Banana Energy",
    nano_energy_recharging: "Energy Recharging",
    nano_injecting_energy: "Injecting AI Energy...",
    nano_generating: "Generating",
    nano_uploading_image: "Uploading Image",
    nano_energy_depleted: "Energy Depleted This Hour",
    nano_come_back_later: "Please come back later",
    nano_dice: "🎲 Inspiration Dice",
    
    // Prompt Generator
    prompt_generator_title: "Professional Prompt Generator",
    prompt_generator_upload_ref: "Upload Reference Image (Optional)",
    prompt_generator_select_image: "Select Image",
    prompt_generator_simple_desc: "Simply describe the image you want",
    prompt_generator_generate: "Generate Professional Prompt",
    prompt_generator_apply: "Apply to Prompt",
    prompt_generator_generated: "Generated Professional Prompt",
    prompt_generator_tip: "💡 Tip: After selecting an 'Art Style' on the left, the generator will automatically blend that style (e.g., Cyberpunk, Ink Wash) into your prompt for more artistic results!",
    
    // Quality Modes
    quality_economy: "Economy",
    quality_standard: "Standard",
    quality_ultra: "Ultra HD",
    quality_economy_desc: "Fast generation",
    quality_standard_desc: "Balanced quality & speed",
    quality_ultra_desc: "Maximum quality",
    
    // Providers
    provider_pollinations: "Pollinations.ai (Free)",
    provider_infip: "Ghostbot (Infip) 🌟",
    provider_aqua: "Aqua Server 🌊",
    
    // Model Names
    model_kontext: "Kontext",
    model_nanobanana: "NanoBanana 🍌",
    model_seedream: "SeeDream",
    model_flux_schnell: "Flux Schnell",
    model_zimage: "Z-Image",
    model_klein: "FLUX.2 Klein",
    model_klein_large: "FLUX.2 Klein 9B",
    
    // Provider Stats
    provider_stats_title: "📊 Provider Usage Statistics",
    provider_stats_total: "Total Generations",
    provider_stats_ratio: "Usage Ratio",
    provider_stats_count: "Usage Count",
    provider_stats_refresh: "Refresh",
    provider_stats_no_data: "No statistics data available",
    
    // API Key
    api_key_label: "API Key",
    api_key_desc: "Stored locally",
    api_key_placeholder: "Paste your API Key here",
    api_key_get_key: "Get free key from",
    
    // NSFW
    nsfw_label: "🔞 Disable NSFW Filter",
    nsfw_desc: "Enable this option to allow adult content generation (Infip only)",
    
    // Batch Generation
    batch_label: "🖼️ Batch Generation",
    batch_size_label: "Batch Size",
    
    // Error Messages
    error_no_prompt: "⚠️ Please enter a prompt",
    error_energy_depleted: "🚫 Energy depleted this hour, please come back later!",
    error_image_too_large: "Image too large! Max size is 32MB",
    error_invalid_file: "Please select an image file",
    error_upload_failed: "Upload failed",
    
    // Language Switch
    lang_switch: "EN / 繁中",
    lang_zh: "繁體中文",
    lang_en: "English",
    lang_ja: "日本語",
    lang_ko: "한국어",
    lang_ar: "العربية",
    lang_auto_detect: "🌐 Auto-detect System Language",
    lang_auto_detect_desc: "Automatically switch interface language based on browser language",
    
    // Style Categories
    style_category_basic: "Basic",
    style_category_illustration: "Illustration & Animation",
    style_category_manga: "Manga Style",
    style_category_monochrome: "Monochrome",
    style_category_realistic: "Photorealistic",
    style_category_painting: "Painting Style",
    style_category_art_movement: "Art Movement",
    style_category_visual: "Visual Style",
    style_category_digital: "Digital Style",
    style_category_traditional: "Traditional Art",
    style_category_aesthetic: "Aesthetic Style",
    style_category_scifi: "Sci-Fi",
    style_category_fantasy: "Fantasy",
    
    // Style Names
    style_none: "No Style",
    style_anime: "Anime Style",
    style_ghibli: "Ghibli",
    style_manga: "Japanese Manga",
    style_manga_color: "Colored Manga",
    style_american_comic: "American Comic",
    style_korean_webtoon: "Korean Webtoon",
    style_chibi: "Chibi",
    style_black_white: "Black & White",
    style_sketch: "Sketch",
    style_ink_drawing: "Ink Wash",
    style_silhouette: "Silhouette",
    style_charcoal: "Charcoal",
    style_photorealistic: "Photorealistic",
    style_oil_painting: "Oil Painting",
    style_watercolor: "Watercolor",
    style_impressionism: "Impressionism",
    style_abstract: "Abstract",
    style_cubism: "Cubism",
    style_surrealism: "Surrealism",
    style_pop_art: "Pop Art",
    style_neon: "Neon",
    style_vintage: "Vintage",
    style_steampunk: "Steampunk",
    style_minimalist: "Minimalist",
    style_vaporwave: "Vaporwave",
    style_pixel_art: "Pixel Art",
    style_low_poly: "Low Poly",
    style_3d_render: "3D Render",
    style_gradient: "Gradient",
    style_glitch: "Glitch Art",
    style_ukiyo_e: "Ukiyo-e",
    style_stained_glass: "Stained Glass",
    style_paper_cut: "Paper Cut",
    style_gothic: "Gothic",
    style_art_nouveau: "Art Nouveau",
    style_cyberpunk: "Cyberpunk",
    style_fantasy: "Fantasy Style",
    
    // Video Generation
    video_title: "🎬 Video Generation",
    video_model_label: "Video Model",
    video_duration_label: "Duration (seconds)",
    video_size_label: "Video Size",
    video_provider_label: "Video Provider",
    video_gen_btn: "🎬 Start Video Generation",
    video_generating: "Generating video...",
    video_error_no_prompt: "⚠️ Please enter a prompt",
    video_error_limit_exceeded: "🚫 Video generation limit exceeded",
    video_error_disabled: "Video generation is not enabled",
    video_model_svd: "SVD",
    video_model_svd_xt: "SVD-XT",
    video_provider_pollinations: "Pollinations.ai"
  },
  
  // ====== 日文 (ja) ======
  ja: {
    // ナビゲーション
    nav_gen: "🎨 画像生成",
    nav_his: "📚 履歴",
    nav_video: "🎬 動画生成",
    nav_nano: "🍌 Nano版",
    
    // 設定
    settings_title: "⚙️ 生成設定",
    provider_label: "API プロバイダー",
    model_label: "モデル選択",
    size_label: "画像サイズ",
    style_label: "アートスタイル 🎨",
    quality_label: "品質モード",
    seed_label: "シード値",
    seed_random: "🎲 ランダム",
    seed_lock: "🔒 固定",
    auto_opt_label: "✨ 自動最適化",
    auto_opt_desc: "ステップ数とガイダンスを自動調整",
    adv_settings: "🛠️ 詳細設定",
    steps_label: "生成ステップ数",
    guidance_label: "ガイダンススケール",
    
    // ボタン
    gen_btn: "🎨 生成開始",
    btn_export: "📥 エクスポート",
    btn_clear: "🗑️ 全削除",
    btn_reuse: "🔄 再利用",
    btn_dl: "💾 ダウンロード",
    
    // プロンプト
    pos_prompt: "ポジティブプロンプト",
    neg_prompt: "ネガティブプロンプト（任意）",
    ref_img: "参照画像 (Img2Img) 📸",
    
    // ステータスメッセージ
    empty_title: "まだ画像が生成されていません",
    no_history: "履歴がありません",
    cooldown_msg: "⏳ クールダウンをお待ちください...",
    generating: "生成中...",
    
    // 統計
    stat_total: "📊 総記録数",
    stat_storage: "💾 ストレージ（永続）",
    
    // Nano版
    nano_title: "🍌 NanoBanana Pro - コンソール",
    nano_prompt: "プロンプト",
    nano_canvas_ratio: "キャンバス比率",
    nano_style_settings: "スタイルと設定",
    nano_exclude: "除外",
    nano_energy_per_hour: "1時間あたりのエネルギー",
    nano_consume_energy: "バナナエネルギー1消費",
    nano_energy_recharging: "エネルギー充電中",
    nano_injecting_energy: "AIエネルギー注入中...",
    nano_generating: "生成中",
    nano_uploading_image: "画像アップロード中",
    nano_energy_depleted: "今時間のエネルギーが枯渇しました",
    nano_come_back_later: "後でもう一度お越しください",
    nano_dice: "🎲 インスピレーションダイス",
    
    // プロンプトジェネレーター
    prompt_generator_title: "プロフェッショナルプロンプトジェネレーター",
    prompt_generator_upload_ref: "参照画像をアップロード（任意）",
    prompt_generator_select_image: "画像を選択",
    prompt_generator_simple_desc: "作成したい画像を簡単に説明",
    prompt_generator_generate: "プロフェッショナルプロンプトを生成",
    prompt_generator_apply: "プロンプトに適用",
    prompt_generator_generated: "生成されたプロフェッショナルプロンプト",
    prompt_generator_tip: "💡 ヒント：左側の「アートスタイル」を選択すると、ジェネレーターがそのスタイル（サイバーパンク、水墨画など）を自動的にプロンプトにブレンドし、より芸術的な結果が得られます！",
    
    // 品質モード
    quality_economy: "エコノミー",
    quality_standard: "スタンダード",
    quality_ultra: "ウルトラHD",
    quality_economy_desc: "高速生成",
    quality_standard_desc: "品質と速度のバランス",
    quality_ultra_desc: "最高品質",
    
    // プロバイダー
    provider_pollinations: "Pollinations.ai (無料)",
    provider_infip: "Ghostbot (Infip) 🌟",
    provider_aqua: "Aqua Server 🌊",
    
    // モデル名
    model_kontext: "Kontext",
    model_nanobanana: "NanoBanana 🍌",
    model_seedream: "SeeDream",
    model_flux_schnell: "Flux Schnell",
    model_zimage: "Z-Image",
    model_klein: "FLUX.2 Klein",
    model_klein_large: "FLUX.2 Klein 9B",
    
    // プロバイダー統計
    provider_stats_title: "📊 プロバイダー使用統計",
    provider_stats_total: "総生成回数",
    provider_stats_ratio: "使用比率",
    provider_stats_count: "使用回数",
    provider_stats_refresh: "更新",
    provider_stats_no_data: "統計データがありません",
    
    // API Key
    api_key_label: "APIキー",
    api_key_desc: "ローカルに保存",
    api_key_placeholder: "ここにAPIキーを貼り付け",
    api_key_get_key: "無料キーを取得",
    
    // NSFW
    nsfw_label: "🔞 NSFWフィルターを無効化",
    nsfw_desc: "このオプションを有効にすると、成人向けコンテンツの生成が可能になります（Infipのみ）",
    
    // バッチ生成
    batch_label: "🖼️ バッチ生成",
    batch_size_label: "バッチサイズ",
    
    // エラーメッセージ
    error_no_prompt: "⚠️ プロンプトを入力してください",
    error_energy_depleted: "🚫 今時間のエネルギーが枯渇しました。後でもう一度お越しください！",
    error_image_too_large: "画像が大きすぎます！最大サイズは32MBです",
    error_invalid_file: "画像ファイルを選択してください",
    error_upload_failed: "アップロードに失敗しました",
    
    // 言語切り替え
    lang_switch: "EN / 繁中",
    lang_zh: "繁體中文",
    lang_en: "English",
    lang_ja: "日本語",
    lang_ko: "한국어",
    lang_ar: "العربية",
    lang_auto_detect: "🌐 システム言語を自動検出",
    lang_auto_detect_desc: "ブラウザの言語設定に基づいてインターフェース言語を自動的に切り替えます",
    
    // スタイルカテゴリ
    style_category_basic: "基本",
    style_category_illustration: "イラスト・アニメ",
    style_category_manga: "漫画スタイル",
    style_category_monochrome: "モノクロ",
    style_category_realistic: "フォトリアル",
    style_category_painting: "絵画スタイル",
    style_category_art_movement: "芸術運動",
    style_category_visual: "ビジュアルスタイル",
    style_category_digital: "デジタルスタイル",
    style_category_traditional: "伝統芸術",
    style_category_aesthetic: "美学スタイル",
    style_category_scifi: "SF",
    style_category_fantasy: "ファンタジー",
    
    // スタイル名
    style_none: "スタイルなし",
    style_anime: "アニメスタイル",
    style_ghibli: "ジブリ",
    style_manga: "日本の漫画",
    style_manga_color: "カラー漫画",
    style_american_comic: "アメリカンコミック",
    style_korean_webtoon: "韓国ウェブトゥーン",
    style_chibi: "ちびキャラ",
    style_black_white: "白黒",
    style_sketch: "スケッチ",
    style_ink_drawing: "水墨画",
    style_silhouette: "シルエット",
    style_charcoal: "木炭画",
    style_photorealistic: "フォトリアル",
    style_oil_painting: "油絵",
    style_watercolor: "水彩画",
    style_impressionism: "印象派",
    style_abstract: "抽象派",
    style_cubism: "キュビズム",
    style_surrealism: "シュルレアリスム",
    style_pop_art: "ポップアート",
    style_neon: "ネオン",
    style_vintage: "ヴィンテージ",
    style_steampunk: "スチームパンク",
    style_minimalist: "ミニマリズム",
    style_vaporwave: "ベイパーウェーブ",
    style_pixel_art: "ピクセルアート",
    style_low_poly: "ローポリ",
    style_3d_render: "3Dレンダリング",
    style_gradient: "グラデーション",
    style_glitch: "グリッチアート",
    style_ukiyo_e: "浮世絵",
    style_stained_glass: "ステンドグラス",
    style_paper_cut: "切り絵",
    style_gothic: "ゴシック",
    style_art_nouveau: "アールヌーボー",
    style_cyberpunk: "サイバーパンク",
    style_fantasy: "ファンタジースタイル",
    
    // 動画生成
    video_title: "🎬 動画生成",
    video_model_label: "動画モデル",
    video_duration_label: "動画長さ (秒)",
    video_size_label: "動画サイズ",
    video_provider_label: "動画プロバイダー",
    video_gen_btn: "🎬 動画生成開始",
    video_generating: "動画生成中...",
    video_error_no_prompt: "⚠️ プロンプトを入力してください",
    video_error_limit_exceeded: "🚫 動画生成の制限を超えました",
    video_error_disabled: "動画生成機能は有効になっていません",
    video_model_svd: "SVD",
    video_model_svd_xt: "SVD-XT",
    video_provider_pollinations: "Pollinations.ai"
  },
  
  // ====== 韓文 (ko) ======
  ko: {
    // 네비게이션
    nav_gen: "🎨 이미지 생성",
    nav_his: "📚 기록",
    nav_video: "🎬 동영상 생성",
    nav_nano: "🍌 Nano",
    
    // 설정
    settings_title: "⚙️ 생성 설정",
    provider_label: "API 공급자",
    model_label: "모델 선택",
    size_label: "이미지 크기",
    style_label: "아트 스타일 🎨",
    quality_label: "품질 모드",
    seed_label: "시드 값",
    seed_random: "🎲 랜덤",
    seed_lock: "🔒 잠금",
    auto_opt_label: "✨ 자동 최적화",
    auto_opt_desc: "스텝 및 가이던스 자동 조정",
    adv_settings: "🛠️ 고급 설정",
    steps_label: "생성 스텝",
    guidance_label: "가이던스 스케일",
    
    // 버튼
    gen_btn: "🎨 생성 시작",
    btn_export: "📥 내보내기",
    btn_clear: "🗑️ 전체 삭제",
    btn_reuse: "🔄 설정 재사용",
    btn_dl: "💾 다운로드",
    
    // 프롬프트
    pos_prompt: "긍정적 프롬프트",
    neg_prompt: "부정적 프롬프트 (선택 사항)",
    ref_img: "참조 이미지 (Img2Img) 📸",
    
    // 상태 메시지
    empty_title: "아직 생성된 이미지가 없습니다",
    no_history: "기록이 없습니다",
    cooldown_msg: "⏳ 쿨다운을 기다려주세요...",
    generating: "생성 중...",
    
    // 통계
    stat_total: "📊 총 기록 수",
    stat_storage: "💾 저장 공간 (영구)",
    
    // Nano 버전
    nano_title: "🍌 NanoBanana Pro - 콘솔",
    nano_prompt: "프롬프트",
    nano_canvas_ratio: "캔버스 비율",
    nano_style_settings: "스타일 및 설정",
    nano_exclude: "제외",
    nano_energy_per_hour: "시간당 에너지",
    nano_consume_energy: "바나나 에너지 1 소모",
    nano_energy_recharging: "에너지 충전 중",
    nano_injecting_energy: "AI 에너지 주입 중...",
    nano_generating: "생성 중",
    nano_uploading_image: "이미지 업로드 중",
    nano_energy_depleted: "이번 시간 에너지가 소진되었습니다",
    nano_come_back_later: "나중에 다시 방문해주세요",
    nano_dice: "🎲 영감 주사위",
    
    // 프롬프트 생성기
    prompt_generator_title: "전문 프롬프트 생성기",
    prompt_generator_upload_ref: "참조 이미지 업로드 (선택 사항)",
    prompt_generator_select_image: "이미지 선택",
    prompt_generator_simple_desc: "원하는 이미지를 간단히 설명",
    prompt_generator_generate: "전문 프롬프트 생성",
    prompt_generator_apply: "프롬프트에 적용",
    prompt_generator_generated: "생성된 전문 프롬프트",
    prompt_generator_tip: "💡 팁: 왼쪽의 '아트 스타일'을 선택하면 생성기가 해당 스타일(사이버펑크, 수묵화 등)을 자동으로 프롬프트에 혼합하여 더 예술적인 결과를 얻을 수 있습니다!",
    
    // 품질 모드
    quality_economy: "이코노미",
    quality_standard: "스탠다드",
    quality_ultra: "울트라 HD",
    quality_economy_desc: "빠른 생성",
    quality_standard_desc: "품질과 속도의 균형",
    quality_ultra_desc: "최고 품질",
    
    // 공급자
    provider_pollinations: "Pollinations.ai (무료)",
    provider_infip: "Ghostbot (Infip) 🌟",
    provider_aqua: "Aqua Server 🌊",
    
    // 모델 이름
    model_kontext: "Kontext",
    model_nanobanana: "NanoBanana 🍌",
    model_seedream: "SeeDream",
    model_flux_schnell: "Flux Schnell",
    model_zimage: "Z-Image",
    model_klein: "FLUX.2 Klein",
    model_klein_large: "FLUX.2 Klein 9B",
    
    // 공급자 통계
    provider_stats_title: "📊 공급자 사용 통계",
    provider_stats_total: "총 생성 횟수",
    provider_stats_ratio: "사용 비율",
    provider_stats_count: "사용 횟수",
    provider_stats_refresh: "새로고침",
    provider_stats_no_data: "통계 데이터가 없습니다",
    
    // API Key
    api_key_label: "API 키",
    api_key_desc: "로컬에 저장",
    api_key_placeholder: "여기에 API 키를 붙여넣으세요",
    api_key_get_key: "무료 키 받기",
    
    // NSFW
    nsfw_label: "🔞 NSFW 필터 비활성화",
    nsfw_desc: "이 옵션을 활성화하면 성인 콘텐츠 생성이 허용됩니다 (Infip만 해당)",
    
    // 배치 생성
    batch_label: "🖼️ 배치 생성",
    batch_size_label: "배치 크기",
    
    // 오류 메시지
    error_no_prompt: "⚠️ 프롬프트를 입력하세요",
    error_energy_depleted: "🚫 이번 시간 에너지가 소진되었습니다. 나중에 다시 방문해주세요!",
    error_image_too_large: "이미지가 너무 큽니다! 최대 크기는 32MB입니다",
    error_invalid_file: "이미지 파일을 선택하세요",
    error_upload_failed: "업로드 실패",
    
    // 언어 전환
    lang_switch: "EN / 繁中",
    lang_zh: "繁體中文",
    lang_en: "English",
    lang_ja: "日本語",
    lang_ko: "한국어",
    lang_ar: "العربية",
    lang_auto_detect: "🌐 시스템 언어 자동 감지",
    lang_auto_detect_desc: "브라우저 언어 설정에 따라 인터페이스 언어를 자동으로 전환합니다",
    
    // 스타일 카테고리
    style_category_basic: "기본",
    style_category_illustration: "일러스트레이션 & 애니메이션",
    style_category_manga: "만화 스타일",
    style_category_monochrome: "단색",
    style_category_realistic: "포토리얼리즘",
    style_category_painting: "회화 스타일",
    style_category_art_movement: "예술 운동",
    style_category_visual: "비주얼 스타일",
    style_category_digital: "디지털 스타일",
    style_category_traditional: "전통 예술",
    style_category_aesthetic: "미학 스타일",
    style_category_scifi: "SF",
    style_category_fantasy: "판타지",
    
    // 스타일 이름
    style_none: "스타일 없음",
    style_anime: "애니메이션 스타일",
    style_ghibli: "지브리",
    style_manga: "일본 만화",
    style_manga_color: "컬러 만화",
    style_american_comic: "미국 만화",
    style_korean_webtoon: "한국 웹툰",
    style_chibi: "치비",
    style_black_white: "흑백",
    style_sketch: "스케치",
    style_ink_drawing: "수묵화",
    style_silhouette: "실루엣",
    style_charcoal: "목탄화",
    style_photorealistic: "포토리얼리즘",
    style_oil_painting: "유화",
    style_watercolor: "수채화",
    style_impressionism: "인상주의",
    style_abstract: "추상주의",
    style_cubism: "입체주의",
    style_surrealism: "초현실주의",
    style_pop_art: "팝 아트",
    style_neon: "네온",
    style_vintage: "빈티지",
    style_steampunk: "스팀펑크",
    style_minimalist: "미니멀리즘",
    style_vaporwave: "베이퍼웨이브",
    style_pixel_art: "픽셀 아트",
    style_low_poly: "로우 폴리",
    style_3d_render: "3D 렌더링",
    style_gradient: "그라데이션",
    style_glitch: "글리치 아트",
    style_ukiyo_e: "우키요에",
    style_stained_glass: "스테인드글라스",
    style_paper_cut: "종이 절기",
    style_gothic: "고딕",
    style_art_nouveau: "아르 누보",
    style_cyberpunk: "사이버펑크",
    style_fantasy: "판타지 스타일",
    
    // 동영상 생성
    video_title: "🎬 동영상 생성",
    video_model_label: "동영상 모델",
    video_duration_label: "동영상 길이 (초)",
    video_size_label: "동영상 크기",
    video_provider_label: "동영상 공급자",
    video_gen_btn: "🎬 동영상 생성 시작",
    video_generating: "동영상 생성 중...",
    video_error_no_prompt: "⚠️ 프롬프트를 입력하세요",
    video_error_limit_exceeded: "🚫 동영상 생성 한도 초과",
    video_error_disabled: "동영상 생성 기능이 활성화되지 않았습니다",
    video_model_svd: "SVD",
    video_model_svd_xt: "SVD-XT",
    video_provider_pollinations: "Pollinations.ai"
  },
  
  // ====== 阿拉伯語 (ar) - RTL ======
  ar: {
    // التنقل
    nav_gen: "🎨 إنشاء صورة",
    nav_his: "📚 السجل",
    nav_video: "🎬 إنشاء فيديو",
    nav_nano: "🍌 Nano",
    
    // الإعدادات
    settings_title: "⚙️ إعدادات الإنشاء",
    provider_label: "مزود API",
    model_label: "اختيار النموذج",
    size_label: "حجم الصورة",
    style_label: "النمط الفني 🎨",
    quality_label: "وضع الجودة",
    seed_label: "قيمة البذرة",
    seed_random: "🎲 عشوائي",
    seed_lock: "🔒 قفل",
    auto_opt_label: "✨ تحسين تلقائي",
    auto_opt_desc: "ضبط الخطوات والتوجيه تلقائيًا",
    adv_settings: "🛠️ إعدادات متقدمة",
    steps_label: "خطوات الإنشاء",
    guidance_label: "مقياس التوجيه",
    
    // الأزرار
    gen_btn: "🎨 بدء الإنشاء",
    btn_export: "📥 تصدير",
    btn_clear: "🗑️ مسح الكل",
    btn_reuse: "🔄 إعادة الاستخدام",
    btn_dl: "💾 تنزيل",
    
    // المطالبات
    pos_prompt: "موجه إيجابي",
    neg_prompt: "موجه سلبي (اختياري)",
    ref_img: "صورة مرجعية (Img2Img) 📸",
    
    // رسائل الحالة
    empty_title: "لم يتم إنشاء أي صور بعد",
    no_history: "لا توجد سجلات",
    cooldown_msg: "⏳ يرجى الانتظار...",
    generating: "جاري الإنشاء...",
    
    // الإحصائيات
    stat_total: "📊 إجمالي السجلات",
    stat_storage: "💾 مساحة التخزين (دائمة)",
    
    // إصدار Nano
    nano_title: "🍌 NanoBanana Pro - وحدة التحكم",
    nano_prompt: "موجه",
    nano_canvas_ratio: "نسبة اللوحة",
    nano_style_settings: "النمط والإعدادات",
    nano_exclude: "استبعاد",
    nano_energy_per_hour: "الطاقة لكل ساعة",
    nano_consume_energy: "استهلاك 1 طاقة موز",
    nano_energy_recharging: "إعادة شحن الطاقة",
    nano_injecting_energy: "حقن طاقة AI...",
    nano_generating: "جاري الإنشاء",
    nano_uploading_image: "رفع الصورة",
    nano_energy_depleted: "نفدت الطاقة لهذه الساعة",
    nano_come_back_later: "يرجى العودة لاحقًا",
    nano_dice: "🎲 نرد الإلهام",
    
    // مولد المطالبات
    prompt_generator_title: "مولد المطالبات الاحترافي",
    prompt_generator_upload_ref: "رفع صورة مرجعية (اختياري)",
    prompt_generator_select_image: "اختر صورة",
    prompt_generator_simple_desc: "صف الصورة التي تريدها ببساطة",
    prompt_generator_generate: "إنشاء موجه احترافي",
    prompt_generator_apply: "تطبيق على الموجه",
    prompt_generator_generated: "الموجه الاحترافي المُنشأ",
    prompt_generator_tip: "💡 نصيحة: بعد تحديد 'نمط فني' على اليسار، سيقوم المولد بدمج هذا النمط (مثل السايبربانك، الرسم بالحبر) تلقائيًا في موجهك للحصول على نتائج أكثر فنية!",
    
    // أوضاع الجودة
    quality_economy: "اقتصادي",
    quality_standard: "قياسي",
    quality_ultra: "فائق الدقة",
    quality_economy_desc: "إنشاء سريع",
    quality_standard_desc: "توازن الجودة والسرعة",
    quality_ultra_desc: "أقصى جودة",
    
    // المزودون
    provider_pollinations: "Pollinations.ai (مجاني)",
    provider_infip: "Ghostbot (Infip) 🌟",
    provider_aqua: "Aqua Server 🌊",
    
    // أسماء النماذج
    model_kontext: "Kontext",
    model_nanobanana: "NanoBanana 🍌",
    model_seedream: "SeeDream",
    model_flux_schnell: "Flux Schnell",
    model_zimage: "Z-Image",
    model_klein: "FLUX.2 Klein",
    model_klein_large: "FLUX.2 Klein 9B",
    
    // إحصائيات المزود
    provider_stats_title: "📊 إحصائيات استخدام المزود",
    provider_stats_total: "إجمالي الإنشاءات",
    provider_stats_ratio: "نسبة الاستخدام",
    provider_stats_count: "عدد الاستخدام",
    provider_stats_refresh: "تحديث",
    provider_stats_no_data: "لا توجد بيانات إحصائية",
    
    // مفتاح API
    api_key_label: "مفتاح API",
    api_key_desc: "مخزن محليًا",
    api_key_placeholder: "الصق مفتاح API هنا",
    api_key_get_key: "احصل على مفتاح مجاني من",
    
    // NSFW
    nsfw_label: "🔞 تعطيل فلتر NSFW",
    nsfw_desc: "تمكين هذا الخيار للسماح بإنشاء محتوى للبالغين (Infip فقط)",
    
    // الإنشاء المجموع
    batch_label: "🖼️ إنشاء مجموع",
    batch_size_label: "حجم المجموعة",
    
    // رسائل الخطأ
    error_no_prompt: "⚠️ يرجى إدخال موجه",
    error_energy_depleted: "🚫 نفدت الطاقة لهذه الساعة، يرجى العودة لاحقًا!",
    error_image_too_large: "الصورة كبيرة جدًا! الحد الأقصى 32 ميجابايت",
    error_invalid_file: "يرجى اختيار ملف صورة",
    error_upload_failed: "فشل الرفع",
    
    // تبديل اللغة
    lang_switch: "EN / 繁中",
    lang_zh: "繁體中文",
    lang_en: "English",
    lang_ja: "日本語",
    lang_ko: "한국어",
    lang_ar: "العربية",
    lang_auto_detect: "🌐 الكشف التلقائي عن لغة النظام",
    lang_auto_detect_desc: "التبديل التلقائي للغة الواجهة بناءً على لغة المتصفح",
    
    // فئات الأنماط
    style_category_basic: "أساسي",
    style_category_illustration: "الرسوم المتحركة",
    style_category_manga: "نمط المانغا",
    style_category_monochrome: "أحادي اللون",
    style_category_realistic: "واقعي",
    style_category_painting: "نمط الرسم",
    style_category_art_movement: "الحركة الفنية",
    style_category_visual: "النمط البصري",
    style_category_digital: "النمط الرقمي",
    style_category_traditional: "الفن التقليدي",
    style_category_aesthetic: "النمط الجمالي",
    style_category_scifi: "الخيال العلمي",
    style_category_fantasy: "الخيال",
    
    // أسماء الأنماط
    style_none: "بدون نمط",
    style_anime: "نمط الأنمي",
    style_ghibli: "جيبلي",
    style_manga: "مانغا يابانية",
    style_manga_color: "مانغا ملونة",
    style_american_comic: "كتاب هزلي أمريكي",
    style_korean_webtoon: "ويبتون كوري",
    style_chibi: "تشيبي",
    style_black_white: "أبيض وأسود",
    style_sketch: "رسم تخطيطي",
    style_ink_drawing: "رسم بالحبر",
    style_silhouette: "ظل",
    style_charcoal: "رسم بالفحم",
    style_photorealistic: "واقعي",
    style_oil_painting: "رسم بالزيت",
    style_watercolor: "رسم بالألوان المائية",
    style_impressionism: "الانطباعية",
    style_abstract: "تجريدي",
    style_cubism: "التكعيبية",
    style_surrealism: "السريالية",
    style_pop_art: "فن البوب",
    style_neon: "نيون",
    style_vintage: "عتيق",
    style_steampunk: "ستيمبانك",
    style_minimalist: "تقليلي",
    style_vaporwave: "فابورويف",
    style_pixel_art: "فن البكسل",
    style_low_poly: "متعدد الأضلاع المنخفض",
    style_3d_render: "عرض ثلاثي الأبعاد",
    style_gradient: "تدرج",
    style_glitch: "فن الخلل",
    style_ukiyo_e: "أوكييو-إي",
    style_stained_glass: "زجاج ملون",
    style_paper_cut: "قص الورق",
    style_gothic: "قوطي",
    style_art_nouveau: "الفن الجديد",
    style_cyberpunk: "سايبربانك",
    style_fantasy: "نمط الخيال",
    
    // إنشاء الفيديو
    video_title: "🎬 إنشاء الفيديو",
    video_model_label: "نموذج الفيديو",
    video_duration_label: "مدة الفيديو (ثواني)",
    video_size_label: "حجم الفيديو",
    video_provider_label: "مزود الفيديو",
    video_gen_btn: "🎬 بدء إنشاء الفيديو",
    video_generating: "جاري إنشاء الفيديو...",
    video_error_no_prompt: "⚠️ يرجى إدخال موجه",
    video_error_limit_exceeded: "🚫 تم تجاوز حد إنشاء الفيديو",
    video_error_disabled: "إنشاء الفيديو غير مفعّل",
    video_model_svd: "SVD",
    video_model_svd_xt: "SVD-XT",
    video_provider_pollinations: "Pollinations.ai"
  }
};

// ====== 語言配置 ======
export const LANGUAGE_CONFIG = {
  zh: {
    name: "繁體中文",
    nativeName: "繁體中文",
    flag: "🇹🇼",
    direction: "ltr",
    dateFormat: "zh-TW"
  },
  en: {
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
    direction: "ltr",
    dateFormat: "en-US"
  },
  ja: {
    name: "日本語",
    nativeName: "日本語",
    flag: "🇯🇵",
    direction: "ltr",
    dateFormat: "ja-JP"
  },
  ko: {
    name: "한국어",
    nativeName: "한국어",
    flag: "🇰🇷",
    direction: "ltr",
    dateFormat: "ko-KR"
  },
  ar: {
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇸🇦",
    direction: "rtl",
    dateFormat: "ar-SA"
  }
};

// ====== 支援的語言列表 ======
export const SUPPORTED_LANGUAGES = Object.keys(LANGUAGE_CONFIG);

// ====== 預設語言 ======
export const DEFAULT_LANGUAGE = 'zh';

// ====== 獲取翻譯 ======
export function getTranslation(lang, key) {
  const translations = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANGUAGE];
  return translations[key] || key;
}

// ====== 獲取所有翻譯 ======
export function getTranslations(lang) {
  return TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANGUAGE];
}

// ====== 檢查語言是否支援 ======
export function isLanguageSupported(lang) {
  return SUPPORTED_LANGUAGES.includes(lang);
}

// ====== 獲取語言配置 ======
export function getLanguageConfig(lang) {
  return LANGUAGE_CONFIG[lang] || LANGUAGE_CONFIG[DEFAULT_LANGUAGE];
}

// =================================================================================
//  核心風格配置 (Core Styles)
//  從 worker.js 提取的 127 種核心風格
//  支援多語言 (zh, en, ja, ko, ar)
// =================================================================================

export const CORE_STYLES = {
  none: {
    name: { zh: "無風格", en: "No Style", ja: "スタイルなし", ko: "스타일 없음", ar: "بدون نمط" },
    prompt: "",
    negative: "",
    category: "basic",
    icon: "⚡",
    description: { zh: "使用原始提示詞", en: "Use original prompt", ja: "元のプロンプトを使用", ko: "원본 프롬프트 사용", ar: "استخدام المطالب الأصلي" }
  },
  anime: {
    name: { zh: "動漫風格", en: "Anime Style", ja: "アニメスタイル", ko: "애니메이션 스타일", ar: "أنمي" },
    prompt: "anime style, anime art, vibrant colors, cel shading, detailed anime",
    negative: "realistic, photograph, 3d, ugly",
    category: "illustration",
    icon: "🎭",
    description: { zh: "日系動漫風格", en: "Japanese anime style", ja: "日本のアニメスタイル", ko: "일본 애니메이션 스타일", ar: "نمط الأنمي الياباني" }
  },
  ghibli: {
    name: { zh: "吉卜力", en: "Ghibli", ja: "ジブリ", ko: "지브리", ar: "جيبلي" },
    prompt: "Studio Ghibli style, Hayao Miyazaki, anime, soft colors, whimsical, detailed background, hand-drawn",
    negative: "realistic, dark, 3D, western animation",
    category: "illustration",
    icon: "🍃",
    description: { zh: "宮崎駿動畫風格", en: "Miyazaki animation style", ja: "宮崎駿アニメーションスタイル", ko: "미야자키 애니메이션 스타일", ar: "نمط رسوم متحركة ميازاكي" }
  },
  manga: {
    name: { zh: "日本漫畫", en: "Manga", ja: "日本の漫画", ko: "일본 만화", ar: "مانغا يابانية" },
    prompt: "manga style, japanese comic art, black and white, screentones, halftone patterns, dynamic poses, detailed linework",
    negative: "color, colorful, realistic, photo, western comic",
    category: "manga",
    icon: "📖",
    description: { zh: "經典日本漫畫黑白網點", en: "Classic Japanese manga B&W", ja: "クラシック日本漫画白黒", ko: "클래식 일본 만화 흑백", ar: "مانغا يابانية كلاسيكية بالأبيض والأسود" }
  },
  "manga-color": {
    name: { zh: "彩色日漫", en: "Colored Manga", ja: "カラー漫画", ko: "컬러 만화", ar: "مانغا ملونة" },
    prompt: "colored manga style, japanese comic art, vibrant colors, cel shading, clean linework, digital coloring",
    negative: "realistic, photo, western style, messy",
    category: "manga",
    icon: "🎨",
    description: { zh: "彩色日本漫畫風格", en: "Colored Japanese manga", ja: "カラー日本漫画", ko: "컬러 일본 만화", ar: "مانغا يابانية ملونة" }
  },
  "american-comic": {
    name: { zh: "美式漫畫", en: "American Comic", ja: "アメリカンコミック", ko: "미국 만화", ar: "كوميكس أمريكي" },
    prompt: "american comic book style, bold lines, vibrant colors, superhero art, dynamic action, dramatic shading",
    negative: "anime, manga, realistic photo, soft",
    category: "manga",
    icon: "💥",
    description: { zh: "美國超級英雄漫畫", en: "American superhero comics", ja: "アメリカのスーパーヒーローコミック", ko: "미국 슈퍼히어로 만화", ar: "كوميكس الأبطال الخارقين الأمريكية" }
  },
  "korean-webtoon": {
    name: { zh: "韓國網漫", en: "Korean Webtoon", ja: "韓国ウェブトゥーン", ko: "한국 웹툰", ar: "مانهوا كورية" },
    prompt: "korean webtoon style, manhwa art, detailed linework, soft colors, romantic, vertical scroll format",
    negative: "american comic, rough sketch, dark",
    category: "manga",
    icon: "📱",
    description: { zh: "韓國網路漫畫風格", en: "Korean webtoon style", ja: "韓国ウェブトゥーンスタイル", ko: "한국 웹툰 스타일", ar: "نمط المانهوا الكورية" }
  },
  chibi: {
    name: { zh: "Q版漫畫", en: "Chibi", ja: "ちびキャラ", ko: "치비", ar: "تشيبي" },
    prompt: "chibi style, super deformed, cute, kawaii, big head small body, simple features, adorable",
    negative: "realistic proportions, serious, dark",
    category: "manga",
    icon: "🥰",
    description: { zh: "Q版可愛漫畫風格", en: "Cute chibi manga style", ja: "可愛いちびキャラスタイル", ko: "귀여운 치비 스타일", ar: "نمط مانغا تشيبي لطيف" }
  },
  "black-white": {
    name: { zh: "黑白", en: "Black & White", ja: "白黒", ko: "흑백", ar: "أبيض وأسود" },
    prompt: "black and white, monochrome, high contrast, dramatic lighting, grayscale",
    negative: "color, colorful, vibrant, saturated",
    category: "monochrome",
    icon: "⚫⚪",
    description: { zh: "純黑白高對比效果", en: "Pure B&W high contrast", ja: "純粋な白黒ハイコントラスト", ko: "순수 흑백 하이 콘트라스트", ar: "تباين عالي بالأبيض والأسود" }
  },
  sketch: {
    name: { zh: "素描", en: "Sketch", ja: "スケッチ", ko: "스케치", ar: "رسم تخطيطي" },
    prompt: "pencil sketch, hand drawn, graphite drawing, detailed shading, artistic sketch, loose lines",
    negative: "color, digital, polished, photo",
    category: "monochrome",
    icon: "✏️",
    description: { zh: "鉛筆素描手繪質感", en: "Pencil sketch hand-drawn", ja: "鉛筆スケッチ手描き", ko: "연필 스케치 손그림", ar: "رسم تخطيطي بالقلم الرصاص" }
  },
  "ink-drawing": {
    name: { zh: "水墨畫", en: "Ink Painting", ja: "水墨画", ko: "수묵화", ar: "رسم بالحبر" },
    prompt: "traditional chinese ink painting, sumi-e, brush strokes, minimalist, zen aesthetic, black ink on white paper",
    negative: "color, western style, detailed, cluttered",
    category: "monochrome",
    icon: "🖌️",
    description: { zh: "中國傳統水墨畫", en: "Traditional Chinese ink painting", ja: "中国伝統水墨画", ko: "중국 전통 수묵화", ar: "الرسم الصيني التقليدي بالحبر" }
  },
  silhouette: {
    name: { zh: "剪影", en: "Silhouette", ja: "シルエット", ko: "실루엣", ar: "ظل" },
    prompt: "silhouette art, stark contrast, black shapes, minimalist, dramatic, shadow play, clean edges",
    negative: "detailed, realistic, colorful, textured",
    category: "monochrome",
    icon: "👤",
    description: { zh: "剪影藝術極簡構圖", en: "Silhouette art minimalist", ja: "シルエットアートミニマル", ko: "실루엣 아트 미니멀", ar: "فن الظل البسيط" }
  },
  charcoal: {
    name: { zh: "炭筆畫", en: "Charcoal", ja: "木炭画", ko: "목탄화", ar: "رسم بالفحم" },
    prompt: "charcoal drawing, rough texture, dramatic shading, expressive, smudged, artistic, monochrome",
    negative: "clean, digital, colorful, precise",
    category: "monochrome",
    icon: "🖤",
    description: { zh: "炭筆繪畫粗糙質感", en: "Charcoal drawing rough texture", ja: "木炭画粗いテクスチャ", ko: "목탄화 거친 질감", ar: "رسم بالفحم بقوة خشنة" }
  },
  photorealistic: {
    name: { zh: "寫實照片", en: "Photorealistic", ja: "フォトリアル", ko: "포토리얼리스틱", ar: "واقعي" },
    prompt: "photorealistic, 8k uhd, high quality, detailed, professional photography, sharp focus",
    negative: "anime, cartoon, illustration, painting, drawing, art",
    category: "realistic",
    icon: "📷",
    description: { zh: "攝影級寫實效果", en: "Photography-level realism", ja: "写真級リアリズム", ko: "사진급 리얼리즘", ar: "واقعية مستوى التصوير" }
  },
  "oil-painting": {
    name: { zh: "油畫", en: "Oil Painting", ja: "油絵", ko: "유화", ar: "رسم زيتي" },
    prompt: "oil painting, canvas texture, visible brushstrokes, rich colors, artistic, masterpiece",
    negative: "photograph, digital art, anime, flat",
    category: "painting",
    icon: "🖼️",
    description: { zh: "經典油畫質感", en: "Classic oil painting texture", ja: "クラシック油絵テクスチャ", ko: "클래식 유화 질감", ar: "ملمس الرسم الزيتي الكلاسيكي" }
  },
  watercolor: {
    name: { zh: "水彩畫", en: "Watercolor", ja: "水彩画", ko: "수채화", ar: "رسم مائي" },
    prompt: "watercolor painting, soft colors, watercolor texture, artistic, hand-painted, paper texture, flowing colors",
    negative: "photograph, digital, sharp edges, 3d",
    category: "painting",
    icon: "💧",
    description: { zh: "清新水彩風格", en: "Fresh watercolor style", ja: "フレッシュ水彩画スタイル", ko: "신선한 수채화 스타일", ar: "نمط الرسم المائي المنعش" }
  },
  impressionism: {
    name: { zh: "印象派", en: "Impressionism", ja: "印象派", ko: "인상주의", ar: "انطباعية" },
    prompt: "impressionist painting, soft brushstrokes, light and color focus, Monet style, outdoor scene, visible brush marks",
    negative: "sharp, detailed, photorealistic, dark",
    category: "art-movement",
    icon: "🌅",
    description: { zh: "印象派繪畫光影捕捉", en: "Impressionist light & color", ja: "印象派光と色", ko: "인상주의 빛과 색", ar: "الانطباعية الضوء واللون" }
  },
  abstract: {
    name: { zh: "抽象派", en: "Abstract", ja: "抽象画", ko: "추상화", ar: "تجريدي" },
    prompt: "abstract art, non-representational, geometric shapes, bold colors, modern art, expressive",
    negative: "realistic, figurative, detailed, representational",
    category: "art-movement",
    icon: "🎭",
    description: { zh: "抽象藝術幾何圖形", en: "Abstract art geometric", ja: "抽象アート幾何学", ko: "추상 아트 기하학", ar: "الفن التجريدي الهندسي" }
  },
  cubism: {
    name: { zh: "立體主義", en: "Cubism", ja: "キュビズム", ko: "큐비즘", ar: "تكعيبية" },
    prompt: "cubist style, geometric shapes, multiple perspectives, fragmented, Picasso inspired, angular forms",
    negative: "realistic, smooth, traditional, single perspective",
    category: "art-movement",
    icon: "🔷",
    description: { zh: "立體主義多視角解構", en: "Cubism multi-perspective", ja: "キュビズム多視点", ko: "큐비즘 다중 시점", ar: "التكعيبية متعددة المنظور" }
  },
  surrealism: {
    name: { zh: "超現實主義", en: "Surrealism", ja: "シュルレアリスム", ko: "초현실주의", ar: "سريالية" },
    prompt: "surrealist art, dreamlike, bizarre, impossible scenes, Salvador Dali style, imaginative, symbolic",
    negative: "realistic, mundane, ordinary, logical",
    category: "art-movement",
    icon: "🌀",
    description: { zh: "超現實主義夢幻場景", en: "Surrealist dreamlike scenes", ja: "シュルレアリスム夢のようなシーン", ko: "초현실주의 꿈 같은 장면", ar: "مشاهد حلمية سريالية" }
  },
  "pop-art": {
    name: { zh: "普普藝術", en: "Pop Art", ja: "ポップアート", ko: "팝 아트", ar: "فن البوب" },
    prompt: "pop art style, bold colors, comic book elements, Andy Warhol inspired, retro, screen print effect",
    negative: "subtle, muted, traditional, realistic",
    category: "art-movement",
    icon: "🎪",
    description: { zh: "普普藝術大膽色彩", en: "Pop art bold colors", ja: "ポップアート大胆な色", ko: "팝 아트 대담한 색상", ar: "فن البوب ألوان جريئة" }
  },
  neon: {
    name: { zh: "霓虹燈", en: "Neon", ja: "ネオン", ko: "네온", ar: "نيون" },
    prompt: "neon lights, glowing, vibrant neon colors, night scene, electric, luminous, dark background",
    negative: "daylight, muted, natural, dull",
    category: "visual",
    icon: "💡",
    description: { zh: "霓虹燈發光效果", en: "Neon lights glowing", ja: "ネオンライト発光", ko: "네온 조명 발광", ar: "أضواء النيون المتوهجة" }
  },
  vintage: {
    name: { zh: "復古", en: "Vintage", ja: "ヴィンテージ", ko: "빈티지", ar: "عتيق" },
    prompt: "vintage style, retro, aged, nostalgic, warm tones, classic, faded colors, old photograph",
    negative: "modern, futuristic, clean, vibrant",
    category: "visual",
    icon: "📻",
    description: { zh: "復古懷舊褪色效果", en: "Vintage nostalgic faded", ja: "ヴィンテージノスタルジック褪色", ko: "빈티지 향수 퇴색", ar: "عتيق نوستالجيا باهت" }
  },
  steampunk: {
    name: { zh: "蒸汽朋克", en: "Steampunk", ja: "スチームパンク", ko: "스팀펑크", ar: "بخار بانك" },
    prompt: "steampunk style, Victorian era, brass and copper, gears and mechanisms, mechanical, industrial",
    negative: "modern, minimalist, clean, futuristic",
    category: "visual",
    icon: "⚙️",
    description: { zh: "蒸汽朋克機械美學", en: "Steampunk mechanical aesthetic", ja: "スチームパンク機械美学", ko: "스팀펑크 기계 미학", ar: "جماليات بخار بانك الميكانيكية" }
  },
  minimalist: {
    name: { zh: "極簡主義", en: "Minimalist", ja: "ミニマリズム", ko: "미니멀리즘", ar: "تبسيطية" },
    prompt: "minimalist design, clean, simple, geometric, negative space, modern, uncluttered",
    negative: "detailed, complex, ornate, busy",
    category: "visual",
    icon: "◽",
    description: { zh: "極簡設計留白美學", en: "Minimalist negative space", ja: "ミニマリズム余白美学", ko: "미니멀리즘 여백 미학", ar: "التبسيطية المساحة السلبية" }
  },
  vaporwave: {
    name: { zh: "蒸氣波", en: "Vaporwave", ja: "ベイパーウェイブ", ko: "베이퍼웨이브", ar: "فابرويف" },
    prompt: "vaporwave aesthetic, retro futuristic, pastel colors, glitch art, 80s 90s nostalgia, neon pink and blue",
    negative: "realistic, natural, muted, traditional",
    category: "visual",
    icon: "🌴",
    description: { zh: "蒸氣波復古未來", en: "Vaporwave retro futuristic", ja: "ベイパーウェイブレトロフューチャー", ko: "베이퍼웨이브 레트로 퓨처", ar: "فابرويف ريترو مستقبلي" }
  },
  "pixel-art": {
    name: { zh: "像素藝術", en: "Pixel Art", ja: "ピクセルアート", ko: "픽셀 아트", ar: "فن البكسل" },
    prompt: "pixel art, 8-bit, 16-bit, retro gaming style, pixelated, nostalgic, limited color palette",
    negative: "high resolution, smooth, realistic, detailed",
    category: "digital",
    icon: "🎮",
    description: { zh: "像素藝術復古遊戲", en: "Pixel art retro gaming", ja: "ピクセルアートレトロゲーム", ko: "픽셀 아트 레트로 게임", ar: "فن البكسل ألعاب ريترو" }
  },
  "low-poly": {
    name: { zh: "低多邊形", en: "Low Poly", ja: "ローポリゴン", ko: "로우 폴리", ar: "بولي منخفض" },
    prompt: "low poly 3d, geometric, faceted, minimalist 3d art, polygonal, angular shapes",
    negative: "high poly, detailed, realistic, organic",
    category: "digital",
    icon: "🔺",
    description: { zh: "低多邊形3D幾何", en: "Low poly 3D geometric", ja: "ローポリゴン3D幾何学", ko: "로우 폴리 3D 기하학", ar: "بولي منخفض 3D هندسي" }
  },
  "3d-render": {
    name: { zh: "3D渲染", en: "3D Render", ja: "3Dレンダリング", ko: "3D 렌더링", ar: "عرض ثلاثي الأبعاد" },
    prompt: "3d render, cinema 4d, octane render, detailed, professional lighting, ray tracing, photorealistic 3d",
    negative: "2d, flat, hand drawn, sketchy",
    category: "digital",
    icon: "🎬",
    description: { zh: "專業3D渲染寫實光影", en: "Professional 3D render lighting", ja: "プロフェッショナル3Dレンダリング照明", ko: "프로페셔널 3D 렌더링 조명", ar: "عرض ثلاثي الأبعاد احترافي إضاءة" }
  },
  gradient: {
    name: { zh: "漸變", en: "Gradient", ja: "グラデーション", ko: "그라데이션", ar: "تدرج" },
    prompt: "gradient art, smooth color transitions, modern, vibrant gradients, soft blending, colorful",
    negative: "solid colors, flat, harsh edges, traditional",
    category: "digital",
    icon: "🌈",
    description: { zh: "漸變藝術柔和過渡", en: "Gradient art soft transition", ja: "グラデーションアートソフトトランジション", ko: "그라데이션 아트 소프트 트랜지션", ar: "فن التدرج انتقال ناعم" }
  },
  glitch: {
    name: { zh: "故障藝術", en: "Glitch Art", ja: "グリッチアート", ko: "글리치 아트", ar: "فن الخلل" },
    prompt: "glitch art, digital corruption, RGB shift, distorted, cyberpunk, data moshing, scanlines",
    negative: "clean, perfect, traditional, smooth",
    category: "digital",
    icon: "📺",
    description: { zh: "故障美學數位崩壞", en: "Glitch aesthetic digital corruption", ja: "グリッチ美学デジタル破損", ko: "글리치 미학 디지털 손상", ar: "جماليات الخلل فساد رقمي" }
  },
  "ukiyo-e": {
    name: { zh: "浮世繪", en: "Ukiyo-e", ja: "浮世絵", ko: "우키요에", ar: "أوكييو-إي" },
    prompt: "ukiyo-e style, japanese woodblock print, Hokusai inspired, traditional japanese art, flat colors, bold outlines",
    negative: "modern, western, photographic, 3d",
    category: "traditional",
    icon: "🗾",
    description: { zh: "日本浮世繪木刻版畫", en: "Japanese ukiyo-e woodblock", ja: "日本浮世絵木版画", ko: "일본 우키요에 목판화", ar: "أوكييو-إي اليابانية خشب" }
  },
  "stained-glass": {
    name: { zh: "彩繪玻璃", en: "Stained Glass", ja: "ステンドグラス", ko: "스테인드글라스", ar: "زجاج ملون" },
    prompt: "stained glass art, colorful, leaded glass, church window style, luminous, geometric patterns, light through glass",
    negative: "realistic, photographic, modern, opaque",
    category: "traditional",
    icon: "🪟",
    description: { zh: "彩繪玻璃透光效果", en: "Stained glass light through", ja: "ステンドグラス光透過", ko: "스테인드글라스 빛 투과", ar: "زجاج ملون ضوء من خلال" }
  },
  "paper-cut": {
    name: { zh: "剪紙藝術", en: "Paper Cut", ja: "切り絵", ko: "종이 자르기", ar: "قص الورق" },
    prompt: "paper cut art, layered paper, shadow box effect, intricate patterns, handcrafted, silhouette",
    negative: "painted, digital, realistic, photographic",
    category: "traditional",
    icon: "✂️",
    description: { zh: "剪紙藝術層次堆疊", en: "Paper cut layered stacking", ja: "切り絵レイヤー積み重ね", ko: "종이 자르기 레이어 쌓기", ar: "قص الورق تراكم الطبقات" }
  },
  gothic: {
    name: { zh: "哥特風格", en: "Gothic", ja: "ゴシック", ko: "고딕", ar: "قوطي" },
    prompt: "gothic style, dark, ornate, Victorian gothic, mysterious, dramatic, baroque elements, elegant darkness",
    negative: "bright, cheerful, minimalist, modern",
    category: "aesthetic",
    icon: "🦇",
    description: { zh: "哥特美學黑暗華麗", en: "Gothic aesthetic dark elegant", ja: "ゴシック美学ダークエレガント", ko: "고딕 미학 다크 우아", ar: "جماليات قوطي داكن أنيق" }
  },
  "art-nouveau": {
    name: { zh: "新藝術", en: "Art Nouveau", ja: "アールヌーボー", ko: "아르 누보", ar: "آرت نوفو" },
    prompt: "art nouveau style, organic forms, flowing lines, decorative, elegant, floral motifs, Alphonse Mucha inspired",
    negative: "geometric, minimalist, modern, rigid",
    category: "aesthetic",
    icon: "🌺",
    description: { zh: "新藝術流動線條", en: "Art nouveau flowing lines", ja: "アールヌーボー流れる線", ko: "아르 누보 흐르는 선", ar: "آرت نوفو خطوط متدفقة" }
  },
  cyberpunk: {
    name: { zh: "賽博朋克", en: "Cyberpunk", ja: "サイバーパンク", ko: "사이버펑크", ar: "سايبربانك" },
    prompt: "cyberpunk style, neon lights, futuristic, sci-fi, dystopian, high-tech low-life, blade runner style",
    negative: "natural, rustic, medieval, fantasy",
    category: "scifi",
    icon: "🌃",
    description: { zh: "賽博朋克未來科幻", en: "Cyberpunk future sci-fi", ja: "サイバーパンク未来SF", ko: "사이버펑크 미래 SF", ar: "سايبربانك مستقبل خيال علمي" }
  },
  fantasy: {
    name: { zh: "奇幻風格", en: "Fantasy", ja: "ファンタジー", ko: "판타지", ar: "خيال" },
    prompt: "fantasy art, magical, epic fantasy, detailed fantasy illustration, mystical, enchanted",
    negative: "modern, realistic, mundane, contemporary",
    category: "fantasy",
    icon: "🐉",
    description: { zh: "奇幻魔法世界", en: "Fantasy magical world", ja: "ファンタジー魔法の世界", ko: "판타지 마법의 세계", ar: "عالم الخيال السحري" }
  }
};

export const CORE_CATEGORIES = {
  'basic': {
    name: { zh: '基礎', en: 'Basic', ja: '基本', ko: '기본', ar: 'أساسي' },
    icon: '⚡',
    order: 1
  },
  'illustration': {
    name: { zh: '插畫動畫', en: 'Illustration', ja: 'イラスト', ko: '일러스트', ar: 'توضيح' },
    icon: '🎨',
    order: 2
  },
  'manga': {
    name: { zh: '漫畫風格', en: 'Manga', ja: '漫画', ko: '만화', ar: 'مانغا' },
    icon: '📖',
    order: 3
  },
  'monochrome': {
    name: { zh: '黑白單色', en: 'Monochrome', ja: '白黒', ko: '흑백', ar: 'أبيض وأسود' },
    icon: '⚫',
    order: 4
  },
  'realistic': {
    name: { zh: '寫實照片', en: 'Photorealistic', ja: 'フォトリアル', ko: '포토리얼', ar: 'واقعي' },
    icon: '📷',
    order: 5
  },
  'painting': {
    name: { zh: '繪畫風格', en: 'Painting', ja: '絵画', ko: '회화', ar: 'رسم' },
    icon: '🖼️',
    order: 6
  },
  'art-movement': {
    name: { zh: '藝術流派', en: 'Art Movement', ja: '美術運動', ko: '미술 운동', ar: 'حركة فنية' },
    icon: '🎭',
    order: 7
  },
  'visual': {
    name: { zh: '視覺風格', en: 'Visual Style', ja: 'ビジュアルスタイル', ko: '비주얼 스타일', ar: 'نمط بصري' },
    icon: '✨',
    order: 8
  },
  'digital': {
    name: { zh: '數位風格', en: 'Digital', ja: 'デジタル', ko: '디지털', ar: 'رقمي' },
    icon: '💻',
    order: 9
  },
  'traditional': {
    name: { zh: '傳統藝術', en: 'Traditional', ja: '伝統', ko: '전통', ar: 'تقليدي' },
    icon: '🏛️',
    order: 10
  },
  'aesthetic': {
    name: { zh: '美學風格', en: 'Aesthetic', ja: '美学', ko: '미학', ar: 'جماليات' },
    icon: '🌟',
    order: 11
  },
  'scifi': {
    name: { zh: '科幻', en: 'Sci-Fi', ja: 'SF', ko: 'SF', ar: 'خيال علمي' },
    icon: '🚀',
    order: 12
  },
  'fantasy': {
    name: { zh: '奇幻', en: 'Fantasy', ja: 'ファンタジー', ko: '판타지', ar: 'خيال' },
    icon: '🐉',
    order: 13
  }
};

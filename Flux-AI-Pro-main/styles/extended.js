// =================================================================================
//  擴展風格配置 (Extended Styles)
//  額外的藝術風格，可持續擴展
//  支援多語言 (zh, en, ja, ko, ar)
// =================================================================================

export const EXTENDED_STYLES = {
  // ====== 賽博朋克擴展 ======
  "cyberpunk-2077": {
    name: { zh: "賽博朋克 2077", en: "Cyberpunk 2077", ja: "サイバーパンク2077", ko: "사이버펑크 2077", ar: "سايبربانك 2077" },
    prompt: "cyberpunk 2077 style, neon lights, futuristic city, high-tech low-life, night city, chrome, cybernetics, holographic displays, rain-soaked streets, blade runner aesthetic, keanu reeves, johnny silverhand",
    negative: "natural, rustic, medieval, fantasy, daylight, organic, clean",
    category: "scifi",
    icon: "🌃",
    description: "CDPR 賽博朋克 2077 遊戲風格"
  },
  "cyberpunk-retro": {
    name: { zh: "復古賽博", en: "Retro Cyberpunk", ja: "レトロサイバーパンク", ko: "레트로 사이버펑크", ar: "سايبربانك ريترو" },
    prompt: "retro cyberpunk, 80s aesthetic, vhs glitch, analog technology, cassette futurism, neon pink and cyan, grid patterns, wireframe graphics, synthwave, outrun",
    negative: "modern, clean, realistic, high definition, 4k",
    category: "scifi",
    icon: "📼",
    description: "80 年代復古賽博朋克"
  },
  "cyberpunk-noir": {
    name: { zh: "賽博黑色", en: "Cyberpunk Noir", ja: "サイバーパンク・ノワール", ko: "사이버펑크 누아르", ar: "سايبربانك نوار" },
    prompt: "cyberpunk noir, dark detective, rain, neon reflections, shadows, mystery, film noir aesthetic, futuristic noir, blade runner 2049, ryan gosling",
    negative: "bright, cheerful, colorful, daylight, clean",
    category: "scifi",
    icon: "🌧️",
    description: "黑色電影風格賽博朋克"
  },

  // ====== 奇幻擴展 ======
  "dark-fantasy": {
    name: { zh: "黑暗奇幻", en: "Dark Fantasy", ja: "ダークファンタジー", ko: "다크 판타지", ar: "الخيال المظلم" },
    prompt: "dark fantasy, gothic horror, eldritch horror, lovecraftian, ominous atmosphere, twisted creatures, ancient ruins, forbidden magic, shadows and darkness, bloodborne, dark souls",
    negative: "bright, cheerful, cute, colorful, lighthearted, daylight",
    category: "fantasy",
    icon: "🌑",
    description: "黑暗哥特奇幻風格"
  },
  "high-fantasy": {
    name: { zh: "高等奇幻", en: "High Fantasy", ja: "ハイファンタジー", ko: "하이 판타지", ar: "الخيال العالي" },
    prompt: "high fantasy, epic fantasy, tolkien style, majestic castles, noble knights, dragons, elves, dwarves, magical realms, heroic quests, lord of the rings, middle earth",
    negative: "modern, urban, sci-fi, dark horror, gritty",
    category: "fantasy",
    icon: "🏰",
    description: "托爾金式高等奇幻"
  },
  "fairy-tale": {
    name: { zh: "童話風格", en: "Fairy Tale", ja: "童話", ko: "동화", ar: "حكاية خرافية" },
    prompt: "fairy tale style, whimsical, magical, enchanted forest, fairy lights, dreamlike, storybook illustration, disney style, princess, castle, magical creatures",
    negative: "dark, gritty, realistic, horror, modern",
    category: "fantasy",
    icon: "🧚",
    description: "經典童話故事風格"
  },
  "mythology": {
    name: { zh: "神話風格", en: "Mythology", ja: "神話", ko: "신화", ar: "الأساطير" },
    prompt: "mythological art, greek mythology, roman mythology, norse mythology, gods and goddesses, ancient temples, epic scenes, classical art, renaissance painting",
    negative: "modern, sci-fi, anime, cartoon",
    category: "fantasy",
    icon: "⚡",
    description: "古典神話藝術風格"
  },

  // ====== 藝術運動擴展 ======
  "art-deco": {
    name: { zh: "裝飾藝術", en: "Art Deco", ja: "アールデコ", ko: "아르 데코", ar: "فن ديكو" },
    prompt: "art deco style, geometric patterns, gold and black, luxury, elegance, 1920s, great gatsby, streamlined forms, decorative motifs, jazz age, roaring twenties",
    negative: "minimalist, rustic, organic, asymmetrical, modern",
    category: "art-movement",
    icon: "💎",
    description: "1920 年代裝飾藝術風格"
  },
  "bauhaus": {
    name: { zh: "包豪斯", en: "Bauhaus", ja: "バウハウス", ko: "바우하우스", ar: "باوهاوس" },
    prompt: "bauhaus style, minimalist geometric, primary colors, functional design, clean lines, abstract shapes, modernist, industrial, walter gropius, german design",
    negative: "ornate, decorative, organic, traditional, baroque",
    category: "art-movement",
    icon: "🔲",
    description: "德國包豪斯設計風格"
  },
  "expressionism": {
    name: { zh: "表現主義", en: "Expressionism", ja: "表現主義", ko: "표현주의", ar: "التعبيرية" },
    prompt: "expressionist art, emotional, distorted, bold colors, edvard munch, the scream, german expressionism, angst, psychological, intense",
    negative: "realistic, calm, peaceful, photorealistic",
    category: "art-movement",
    icon: "😱",
    description: "德國表現主義風格"
  },
  "dadaism": {
    name: { zh: "達達主義", en: "Dadaism", ja: "ダダイスム", ko: "다다이즘", ar: "الدادائية" },
    prompt: "dada art, absurd, collage, ready-made, anti-art, marcel duchamp, chaotic, nonsensical, avant-garde, experimental",
    negative: "traditional, realistic, beautiful, harmonious",
    category: "art-movement",
    icon: "🎭",
    description: "達達主義反藝術風格"
  },
  "fauvism": {
    name: { zh: "野獸派", en: "Fauvism", ja: "フォーヴィスム", ko: "포비즘", ar: "الفوفية" },
    prompt: "fauvism, wild beasts, bold unnatural colors, henri matisse, expressive, vibrant, simplified forms, emotional color",
    negative: "realistic, muted, natural colors, detailed",
    category: "art-movement",
    icon: "🦁",
    description: "野獸派大膽色彩風格"
  },

  // ====== 視覺風格擴展 ======
  "synthwave": {
    name: { zh: "合成波", en: "Synthwave", ja: "シンセウェーブ", ko: "신스웨이브", ar: "سينثويف" },
    prompt: "synthwave, retrowave, 80s nostalgia, neon grids, sunset, palm trees, digital landscape, vhs aesthetic, purple and pink gradient, outrun, driving at night",
    negative: "natural, realistic, daylight, organic, clean",
    category: "visual",
    icon: "🌆",
    description: "80 年代合成波音樂視覺風格"
  },
  "outrun": {
    name: { zh: "Outrun", en: "Outrun", ja: "アウトラン", ko: "아웃런", ar: "أوتران" },
    prompt: "outrun aesthetic, retro futuristic, 80s sports cars, neon lights, sunset, palm trees, wireframe landscapes, digital dreams, kung fury, miami vice",
    negative: "modern, realistic, daylight, natural, vintage",
    category: "visual",
    icon: "🚗",
    description: "Outrun 駕駛遊戲風格"
  },
  "retro-wave": {
    name: { zh: "復古波", en: "Retro Wave", ja: "レトロウェーブ", ko: "레트로 웨이브", ar: "موجة ريترو" },
    prompt: "retrowave, 80s retro, cassette tapes, vhs, crt monitors, scanlines, pixel art, neon, nostalgia, analog technology",
    negative: "modern, digital, clean, 4k, realistic",
    category: "visual",
    icon: "📼",
    description: "80 年代復古科技風格"
  },
  "y2k": {
    name: { zh: "千禧風格", en: "Y2K", ja: "Y2K", ko: "Y2K", ar: "Y2K" },
    prompt: "y2k aesthetic, year 2000, millennium, chrome, metallic, futuristic 2000s, britney spears, nsync, bubblegum, glossy, iridescent",
    negative: "grunge, dark, vintage, rustic, organic",
    category: "visual",
    icon: "✨",
    description: "2000 年代千禧美學"
  },
  "grunge": {
    name: { zh: "垃圾搖滾", en: "Grunge", ja: "グランジ", ko: "그런지", ar: "غرنج" },
    prompt: "grunge aesthetic, 90s, kurt cobain, nirvana, flannel, distressed, dirty, raw, alternative rock, seattle, moody",
    negative: "clean, polished, bright, cheerful, pop",
    category: "visual",
    icon: "🎸",
    description: "90 年代垃圾搖滾風格"
  },

  // ====== 數位風格擴展 ======
  "voxel-art": {
    name: { zh: "體素藝術", en: "Voxel Art", ja: "ボクセルアート", ko: "복셀 아트", ar: "فن فوكسل" },
    prompt: "voxel art, 3D pixel art, blocky, minecraft style, cubic, isometric, colorful blocks, low poly 3D, lego-like",
    negative: "smooth, realistic, organic, high detail, curved",
    category: "digital",
    icon: "🧊",
    description: "3D 體素像素藝術"
  },
  "isometric": {
    name: { zh: "等距視角", en: "Isometric", ja: "等角投影", ko: "등각 투영", ar: "أيزومتريك" },
    prompt: "isometric art, isometric view, 2.5D, architectural, clean lines, flat design, geometric, city builder style, simcity, diorama",
    negative: "perspective, realistic, organic, messy, 3d realistic",
    category: "digital",
    icon: "📐",
    description: "等距視角建築風格"
  },
  "flat-design": {
    name: { zh: "扁平設計", en: "Flat Design", ja: "フラットデザイン", ko: "플랫 디자인", ar: "تصميم مسطح" },
    prompt: "flat design, minimalist, clean, simple shapes, solid colors, no gradients, modern ui, material design, vector art",
    negative: "realistic, 3d, textured, detailed, skeuomorphic",
    category: "digital",
    icon: "🔷",
    description: "現代扁平設計風格"
  },
  "skeuomorphic": {
    name: { zh: "擬物化", en: "Skeuomorphic", ja: "スキューモーフィック", ko: "스큐어모픽", ar: "سكويومورفيك" },
    prompt: "skeuomorphic design, realistic textures, leather, wood, metal, glass, shadows, depth, apple ios 6 style, realistic ui",
    negative: "flat, minimalist, abstract, simple",
    category: "digital",
    icon: "📱",
    description: "擬物化設計風格"
  },
  "generative-art": {
    name: { zh: "生成藝術", en: "Generative Art", ja: "ジェネラティブアート", ko: "제너레이티브 아트", ar: "فن توليدي" },
    prompt: "generative art, algorithmic, procedural, mathematical, fractal, geometric patterns, code-generated, complex, intricate, computational art",
    negative: "hand-drawn, organic, realistic, traditional",
    category: "digital",
    icon: "🔮",
    description: "算法生成藝術風格"
  },

  // ====== 傳統藝術擴展 ======
  "byzantine": {
    name: { zh: "拜占庭", en: "Byzantine", ja: "ビザンティン", ko: "비잔틴", ar: "بيزنطي" },
    prompt: "byzantine art, gold leaf, religious icons, mosaics, rich colors, ornate patterns, medieval, eastern orthodox, halos, divine",
    negative: "minimalist, modern, secular, plain, protestant",
    category: "traditional",
    icon: "✝️",
    description: "拜占庭帝國藝術風格"
  },
  "celtic": {
    name: { zh: "凱爾特", en: "Celtic", ja: "ケルト", ko: "켈트", ar: "كلتي" },
    prompt: "celtic art, celtic knots, intricate patterns, interlacing, medieval, ornamental, green and gold, ancient irish, druidic",
    negative: "minimalist, modern, geometric simple, clean",
    category: "traditional",
    icon: "☘️",
    description: "凱爾特結節藝術風格"
  },
  "art-nouveau-2": {
    name: { zh: "新藝術 2", en: "Art Nouveau 2", ja: "アールヌーボー2", ko: "아르 누보 2", ar: "الفن الجديد 2" },
    prompt: "art nouveau extended, alphonse mucha, gustav klimt, decorative, ornate, flowing lines, floral, elegant, gold leaf, vienna secession",
    negative: "minimalist, geometric, modern, industrial",
    category: "traditional",
    icon: "🌸",
    description: "新藝術運動擴展風格"
  },
  "rococo": {
    name: { zh: "洛可可", en: "Rococo", ja: "ロココ", ko: "로코코", ar: "روكوكو" },
    prompt: "rococo art, ornate, delicate, pastel colors, playful, decorative, french, 18th century, fragonard, boucher, elegant",
    negative: "dark, serious, minimalist, modern",
    category: "traditional",
    icon: "🎀",
    description: "18 世紀洛可可藝術風格"
  },

  // ====== 美學風格擴展 ======
  "cottagecore": {
    name: { zh: "鄉村風", en: "Cottagecore", ja: "コテージコア", ko: "코티지코어", ar: "كوتاجكور" },
    prompt: "cottagecore aesthetic, cottage, garden, flowers, vintage, pastoral, cozy, romantic, english countryside, cottage life, baking, nature",
    negative: "urban, modern, industrial, dark, gritty",
    category: "aesthetic",
    icon: "🏡",
    description: "鄉村生活美學風格"
  },
  "dark-academia": {
    name: { zh: "黑暗學院", en: "Dark Academia", ja: "ダークアカデミア", ko: "다크 아카데미아", ar: "الأكاديمية المظلمة" },
    prompt: "dark academia aesthetic, old books, libraries, universities, tweed, vintage, scholarly, gothic, mysterious, classic literature, oxford",
    negative: "bright, colorful, modern, casual, sporty",
    category: "aesthetic",
    icon: "📚",
    description: "學術黑暗美學風格"
  },
  "light-academia": {
    name: { zh: "明亮學院", en: "Light Academia", ja: "ライトアカデミア", ko: "라이트 아카데미아", ar: "الأكاديمية الفاتحة" },
    prompt: "light academia aesthetic, art museums, coffee shops, vintage, scholarly, soft colors, classical, romantic, european, poetry",
    negative: "dark, gritty, modern, streetwear",
    category: "aesthetic",
    icon: "☕",
    description: "學術明亮美學風格"
  },
  "royalcore": {
    name: { zh: "皇室風", en: "Royalcore", ja: "ロイヤルコア", ko: "로열코어", ar: "رويالكور" },
    prompt: "royalcore aesthetic, royalty, princess, queen, palace, crown, jewels, elegant, regal, luxury, monarchy, tiara",
    negative: "casual, modern, street, grunge",
    category: "aesthetic",
    icon: "👸",
    description: "皇室貴族美學風格"
  },

  // ====== 科幻擴展 ======
  "space-opera": {
    name: { zh: "太空歌劇", en: "Space Opera", ja: "スペースオペラ", ko: "스페이스 오페라", ar: "أوبرا الفضاء" },
    prompt: "space opera, star wars, star trek, epic space battles, alien worlds, spaceships, futuristic, grand scale, adventure, cosmic",
    negative: "grounded, realistic, modern day, small scale",
    category: "scifi",
    icon: "🚀",
    description: "太空歌劇科幻風格"
  },
  "hard-scifi": {
    name: { zh: "硬科幻", en: "Hard Sci-Fi", ja: "ハードSF", ko: "하드 SF", ar: "الخيال العلمي الصلب" },
    prompt: "hard science fiction, realistic space, nasa, astronauts, space stations, satellites, realistic technology, physics-based, the martian, interstellar",
    negative: "fantasy, magic, unrealistic, cartoonish",
    category: "scifi",
    icon: "🛸",
    description: "硬核科幻風格"
  },
  "solarpunk": {
    name: { zh: "太陽朋克", en: "Solarpunk", ja: "ソーラーパンク", ko: "솔라펑크", ar: "سولاربانك" },
    prompt: "solarpunk, renewable energy, green technology, sustainable, utopian, solar panels, wind turbines, gardens, eco-friendly, bright future",
    negative: "dystopian, dark, polluted, industrial, cyberpunk",
    category: "scifi",
    icon: "☀️",
    description: "太陽朋克烏托邦風格"
  },
  "biopunk": {
    name: { zh: "生物朋克", en: "Biopunk", ja: "バイオパンク", ko: "바이오펑크", ar: "بايوبانك" },
    prompt: "biopunk, genetic engineering, biotechnology, organic technology, dna, mutations, biological horror, body horror, genetic modification",
    negative: "mechanical, robotic, clean, sterile",
    category: "scifi",
    icon: "🧬",
    description: "生物科技朋克風格"
  },

  // ====== 動漫擴展 ======
  "shonen": {
    name: { zh: "少年漫", en: "Shonen", ja: "少年漫画", ko: "소년 만화", ar: "شونين" },
    prompt: "shonen anime style, action-packed, dynamic poses, battle manga, dragon ball, naruto, one piece, intense, powerful, energetic",
    negative: "slice of life, calm, peaceful, realistic",
    category: "illustration",
    icon: "⚔️",
    description: "少年漫畫動作風格"
  },
  "shojo": {
    name: { zh: "少女漫", en: "Shojo", ja: "少女漫画", ko: "소녀 만화", ar: "شوجو" },
    prompt: "shojo anime style, romantic, delicate, sparkles, flowers, soft colors, sailor moon, cardcaptor sakura, cute, emotional",
    negative: "dark, gritty, action-heavy, realistic",
    category: "illustration",
    icon: "💖",
    description: "少女漫畫浪漫風格"
  },
  "seinen": {
    name: { zh: "青年漫", en: "Seinen", ja: "青年漫画", ko: "청년 만화", ar: "سينين" },
    prompt: "seinen anime style, mature, detailed, realistic proportions, darker themes, berserk, attack on titan, vinland saga, complex",
    negative: "cute, childish, simple, bright",
    category: "illustration",
    icon: "🗡️",
    description: "青年漫畫成熟風格"
  },
  "isekai": {
    name: { zh: "異世界", en: "Isekai", ja: "異世界", ko: "이세계", ar: "إيسيكاي" },
    prompt: "isekai anime style, fantasy world, transported to another world, rpg elements, magic, adventure, sword art online, overlord, konosuba",
    negative: "modern day, realistic, slice of life",
    category: "illustration",
    icon: "🌀",
    description: "異世界動漫風格"
  },

  // ====== 日本漫畫作者風格 ======
  "oda-eiichiro": {
    name: { zh: "尾田榮一郎", en: "Eiichiro Oda", ja: "尾田栄一郎", ko: "오다 에이이치로", ar: "أودا إيتشيرو" },
    prompt: "eiichiro oda style, one piece manga, dynamic action poses, exaggerated expressions, detailed character designs, adventurous, pirate aesthetic, bold linework, vibrant colors, comic book style",
    negative: "realistic, photograph, 3d, western comic, stiff",
    category: "manga-author",
    icon: "🏴‍☠️",
    description: "《海賊王》作者尾田榮一郎風格"
  },
  "kishimoto-masashi": {
    name: { zh: "岸本齊史", en: "Masashi Kishimoto", ja: "岸本斉史", ko: "키시모토 마사시", ar: "كيشيموتو ماساشي" },
    prompt: "masashi kishimoto style, naruto manga, ninja aesthetic, dynamic action scenes, detailed ninja gear, chakra effects, dramatic poses, shonen manga style, japanese comic art",
    negative: "realistic, photograph, western comic, soft",
    category: "manga-author",
    icon: "🍥",
    description: "《火影忍者》作者岸本齊史風格"
  },
  "toriyama-akira": {
    name: { zh: "鳥山明", en: "Akira Toriyama", ja: "鳥山明", ko: "토리야마 아키라", ar: "تورياما أكيرا" },
    prompt: "akira toriyama style, dragon ball manga, classic shonen, muscular characters, dynamic action poses, martial arts, dragon ball aesthetic, bold outlines, vibrant colors, retro anime",
    negative: "realistic, photograph, 3d, western comic",
    category: "manga-author",
    icon: "🐉",
    description: "《七龍珠》作者鳥山明風格"
  },
  "araki-hirohiko": {
    name: { zh: "荒木飛呂彥", en: "Hirohiko Araki", ja: "荒木飛呂彦", ko: "아라키 히로히코", ar: "آراكي هيروهيكو" },
    prompt: "hirohiko araki style, jojo's bizarre adventure, unique poses, fashion-forward, stylish, dramatic, bold colors, manga art, distinctive character designs, jojo aesthetic",
    negative: "realistic, photograph, conventional, boring",
    category: "manga-author",
    icon: "✨",
    description: "《JoJo的奇妙冒險》作者荒木飛呂彥風格"
  },
  "kubo-tite": {
    name: { zh: "久保帶人", en: "Tite Kubo", ja: "久保帯人", ko: "쿠보 타이테", ar: "كوبو تيتي" },
    prompt: "tite kubo style, bleach manga, shinigami aesthetic, detailed character designs, sword fighting, soul reaper, dramatic poses, gothic elements, japanese comic art",
    negative: "realistic, photograph, western comic, cute",
    category: "manga-author",
    icon: "⚔️",
    description: "《死神》作者久保帶人風格"
  },
  "togashi-yoshihiro": {
    name: { zh: "富堅義博", en: "Yoshihiro Togashi", ja: "冨樫義博", ko: "토가시 요시히로", ar: "توجاشي يوشيhiro" },
    prompt: "yoshihiro togashi style, hunter x hunter manga, detailed character designs, nen abilities, dynamic action, shonen manga, adventure, japanese comic art, intricate details",
    negative: "realistic, photograph, western comic, simple",
    category: "manga-author",
    icon: "🎯",
    description: "《獵人》作者富堅義博風格"
  },
  "aoyama-gosho": {
    name: { zh: "青山剛昌", en: "Gosho Aoyama", ja: "青山剛昌", ko: "아오야마 고쇼", ar: "أوياما غوشو" },
    prompt: "gosho aoyama style, detective conan manga, mystery, detective aesthetic, detailed character designs, crime solving, japanese comic art, classic manga style",
    negative: "realistic, photograph, western comic, action-heavy",
    category: "manga-author",
    icon: "🔍",
    description: "《名偵探柯南》作者青山剛昌風格"
  },
  "takahashi-rumiko": {
    name: { zh: "高橋留美子", en: "Rumiko Takahashi", ja: "高橋留美子", ko: "타카하시 루미코", ar: "تاكاهاشي روميكو" },
    prompt: "rumiko takahashi style, ranma 1/2, inuyasha, romantic comedy, fantasy, detailed character designs, classic shojo/shonen blend, japanese comic art, expressive",
    negative: "realistic, photograph, western comic, dark",
    category: "manga-author",
    icon: "🌸",
    description: "《亂馬1/2》《犬夜叉》作者高橋留美子風格"
  },
  "tezuka-osamu": {
    name: { zh: "手塚治蟲", en: "Osamu Tezuka", ja: "手塚治虫", ko: "데즈카 오사무", ar: "تيزوكا أوسامو" },
    prompt: "osamu tezuka style, astro boy, classic manga, retro anime, black and white manga, detailed linework, manga pioneer, japanese comic art, vintage style",
    negative: "realistic, photograph, modern, 3d",
    category: "manga-author",
    icon: "🤖",
    description: "《原子小金剛》作者手塚治蟲風格"
  },
  "miyazaki-hayao": {
    name: { zh: "宮崎駿", en: "Hayao Miyazaki", ja: "宮崎駿", ko: "미야자키 하야오", ar: "مياازاكي هاياو" },
    prompt: "hayao miyazaki style, studio ghibli, spirited away, howl's moving castle, anime art, soft colors, detailed backgrounds, whimsical, magical, hand-drawn animation style",
    negative: "realistic, photograph, western animation, dark",
    category: "manga-author",
    icon: "🍃",
    description: "吉卜力工作室宮崎駿風格"
  },
  "shinkai-makoto": {
    name: { zh: "新海誠", en: "Makoto Shinkai", ja: "新海誠", ko: "신카이 마코토", ar: "شينكاي ماكوتو" },
    prompt: "makoto shinkai style, your name, weathering with you, anime art, photorealistic backgrounds, emotional, atmospheric, detailed scenery, modern anime aesthetic, beautiful lighting",
    negative: "cartoonish, simple, western animation, flat",
    category: "manga-author",
    icon: "☁️",
    description: "《你的名字》作者新海誠風格"
  },
  "isayama-hajime": {
    name: { zh: "諫山創", en: "Hajime Isayama", ja: "諫山創", ko: "이사야마 하지메", ar: "إساياما هاجيمي" },
    prompt: "hajime isayama style, attack on titan, dark fantasy, intense action, detailed character designs, titan aesthetic, gritty, dramatic, manga art, horror elements",
    negative: "cute, cheerful, colorful, lighthearted",
    category: "manga-author",
    icon: "🗡️",
    description: "《進擊的巨人》作者諫山創風格"
  },
  "gotouge-koyoharu": {
    name: { zh: "吾峠呼世晴", en: "Koyoharu Gotouge", ja: "吾峠呼世晴", ko: "고토게 코요하루", ar: "غوتوغي كويوهارو" },
    prompt: "koyoharu gotouge style, demon slayer, kimetsu no yaiba, detailed character designs, demon slayer aesthetic, dynamic action, beautiful art, japanese comic art, fantasy",
    negative: "realistic, photograph, western comic, simple",
    category: "manga-author",
    icon: "🌙",
    description: "《鬼滅之刃》作者吾峠呼世晴風格"
  },
  "fujiko-f-fujio": {
    name: { zh: "藤子·F·不二雄", en: "Fujiko F. Fujio", ja: "藤子・F・不二雄", ko: "후지코 F. 후지오", ar: "فوجيكو إف فوجيو" },
    prompt: "fujiko f fujio style, doraemon, classic manga, retro anime, cute characters, adventure, japanese comic art, family-friendly, nostalgic style",
    negative: "realistic, photograph, dark, gritty",
    category: "manga-author",
    icon: "🐱",
    description: "《哆啦A夢》作者藤子·F·不二雄風格"
  },
  "horikoshi-kohei": {
    name: { zh: "堀越耕平", en: "Kohei Horikoshi", ja: "堀越耕平", ko: "호리코시 코헤이", ar: "هوريكوشي كوهي" },
    prompt: "kohei horikoshi style, my hero academia, superhero manga, dynamic action, detailed character designs, hero aesthetic, shonen manga, japanese comic art, vibrant",
    negative: "realistic, photograph, western comic, dark",
    category: "manga-author",
    icon: "💪",
    description: "《我的英雄學院》作者堀越耕平風格"
  },

  // ====== 繪畫擴展 ======
  "acrylic": {
    name: { zh: "丙烯畫", en: "Acrylic", ja: "アクリル画", ko: "아크릴화", ar: "أكريليك" },
    prompt: "acrylic painting, bold colors, textured, vibrant, modern, thick brushstrokes, expressive, contemporary art",
    negative: "watercolor, oil painting, soft, delicate",
    category: "painting",
    icon: "🎨",
    description: "丙烯顏料繪畫風格"
  },
  "pastel": {
    name: { zh: "粉彩畫", en: "Pastel", ja: "パステル画", ko: "파스텔화", ar: "باستيل" },
    prompt: "pastel art, soft colors, chalk, delicate, dreamy, gentle, muted tones, romantic, impressionist",
    negative: "bold, dark, vibrant, harsh",
    category: "painting",
    icon: "🖍️",
    description: "粉彩筆繪畫風格"
  },
  "gouache": {
    name: { zh: "水粉畫", en: "Gouache", ja: "グワッシュ", ko: "구아슈", ar: "غواش" },
    prompt: "gouache painting, opaque watercolor, matte finish, flat colors, illustrative, design, bold, graphic",
    negative: "transparent, glossy, realistic, detailed",
    category: "painting",
    icon: "🖌️",
    description: "水粉顏料繪畫風格"
  },
  "encaustic": {
    name: { zh: "蠟畫", en: "Encaustic", ja: "エンカウスティック", ko: "엔카우스틱", ar: "إنكوستيك" },
    prompt: "encaustic painting, wax medium, textured, layered, luminous, ancient, ethereal, abstract, beeswax",
    negative: "smooth, flat, digital, clean",
    category: "painting",
    icon: "🕯️",
    description: "熱蠟繪畫風格"
  }
};

export const EXTENDED_CATEGORIES = {
  'cyberpunk': { name: '賽博朋克', icon: '🌃', order: 14 },
  'dark-fantasy': { name: '黑暗奇幻', icon: '🌑', order: 15 },
  'high-fantasy': { name: '高等奇幻', icon: '🏰', order: 16 },
  'fairy-tale': { name: '童話', icon: '🧚', order: 17 },
  'mythology': { name: '神話', icon: '⚡', order: 18 },
  'retro': { name: '復古', icon: '📼', order: 19 },
  'academic': { name: '學院風', icon: '📚', order: 20 },
  'royal': { name: '皇室風', icon: '👸', order: 21 },
  'eco': { name: '生態', icon: '☀️', order: 22 },
  'anime-genre': { name: '動漫類型', icon: '📺', order: 23 },
  'manga-author': { name: '漫畫作者', icon: '✏️', order: 24 }
};

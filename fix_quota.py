# fix_quota.py
# 執行方式: python fix_quota.py
#
# 修復內容:
#   [Quota] 1. 還原 worker.js（如果已損壞）
#   [Quota] 2. 注入 safeSetItem 防爆保護
#   [Quota] 3. addToHistory 改存 URL（不存 base64）
#   [Quota] 4. generate 流程傳入 res.url 到 addToHistory
#   [Quota] 5. 限制歷史記錄最多 200 筆
#   [Quota] 6. imgSrc 改用 url 欄位
#   [Font]  7. 載入 Noto Sans 全語言字體（TC/JP/KR/Arabic）
#   [Font]  8. 加入 :lang() CSS 字體規則
#   [Font]  9. setLanguage() 更新 html lang 屬性
#   [Font] 10. nanoSetLanguage() 更新 html lang 屬性

import subprocess, sys

GOOD_SHA = '8c9a42d08a5b32e5db549311c99f0310c51e7eda'

# ============================================================
# Step 0: 如果 worker.js 已損壞，先還原
# ============================================================
with open('worker.js', 'r', encoding='utf-8') as f:
    current = f.read()

if len(current) < 10000:
    print(f'⚠️  worker.js 已損壞 ({len(current)} bytes)，正在從 Git 历史還原...')
    result = subprocess.run(['git', 'show', f'{GOOD_SHA}:worker.js'], capture_output=True)
    if result.returncode != 0:
        result2 = subprocess.run(['git', 'restore', '--source', GOOD_SHA, 'worker.js'], capture_output=True)
        if result2.returncode != 0:
            print(f'❌ 還原失敗: {result2.stderr.decode()}')
            print('請手動執行: git show 8c9a42d08a5b32e5db549311c99f0310c51e7eda:worker.js > worker.js')
            sys.exit(1)
        with open('worker.js', 'r', encoding='utf-8') as f:
            current = f.read()
    else:
        current = result.stdout.decode('utf-8', errors='replace')
        with open('worker.js', 'w', encoding='utf-8') as f:
            f.write(current)
    print(f'✅ 還原完成，大小: {len(current)/1024:.1f} KB')
else:
    print(f'✅ worker.js 正常，大小: {len(current)/1024:.1f} KB')

print('')
content = current
original_size = len(content)

# ============================================================
# 修改 1: safeSetItem 防爆
# ============================================================
MARKER = '// ====== IndexedDB 管理核心 (解決死圖) ======'
SAFE_BLOCK = """// ====== localStorage QuotaExceededError \u9632\u8b77 ======
(function(){
    const _orig = Storage.prototype.setItem;
    Storage.prototype.setItem = function(key, value) {
        try {
            _orig.call(this, key, value);
        } catch(e) {
            if(e.name === 'QuotaExceededError' || e.code === 22 || e.code === 1014) {
                console.warn('\\u26a0\\ufe0f localStorage quota exceeded for key:', key);
                try {
                    let maxKey = '', maxSize = 0;
                    for(let k of Object.keys(this)){
                        const s = (this.getItem(k)||'').length;
                        if(s > maxSize){ maxSize = s; maxKey = k; }
                    }
                    if(maxKey && maxKey !== key) {
                        this.removeItem(maxKey);
                        console.warn('\\ud83d\\uddd1\\ufe0f Removed largest key:', maxKey, '(' + (maxSize/1024).toFixed(1) + 'KB)');
                    }
                    _orig.call(this, key, value);
                } catch(e2) { console.error('localStorage setItem failed after cleanup:', e2); }
            } else { throw e; }
        }
    };
})();

"""
if MARKER in content:
    content = content.replace(MARKER, SAFE_BLOCK + MARKER)
    print('✅ 修改 1: safeSetItem 防護已注入')
else:
    print('❌ 修改 1: 找不到 IndexedDB 標記')

# ============================================================
# 修改 2: addToHistory 改存 URL
# ============================================================
OLD_ADD = ('async function addToHistory(item){\r\n    let base64Data = item.image;\r\n    if(!base64Data && item.url){\r\n        try{\r\n            const resp = await fetch(item.url);\r\n            const blob = await resp.blob();\r\n            base64Data = await new Promise(r=>{const fr=new FileReader();fr.onload=()=>r(fr.result);fr.readAsDataURL(blob);});\r\n        }catch(e){console.error("Image convert failed",e);}\r\n    }\r\n    const record={\r\n        id: Date.now()+Math.random(), timestamp: new Date().toISOString(), prompt: item.prompt, model: item.model, style: item.style, seed: item.seed, base64: base64Data || item.url\r\n    };\r\n    await saveToDB(record);\r\n}')
NEW_ADD = ('async function addToHistory(item){\r\n    // \u2705 \u53ea\u5b58 URL\uff0c\u4e0d\u8f49 base64\uff08\u9632\u6b62 QuotaExceededError\uff09\r\n    const record={\r\n        id: Date.now()+Math.random(),\r\n        timestamp: new Date().toISOString(),\r\n        prompt: item.prompt,\r\n        model: item.model,\r\n        style: item.style,\r\n        seed: item.seed,\r\n        url: item.url || item.image || \'\',\r\n        width: item.width || 1024,\r\n        height: item.height || 1024\r\n    };\r\n    const MAX_RECORDS = 200;\r\n    try {\r\n        const all = await getHistoryFromDB();\r\n        if(all.length >= MAX_RECORDS){\r\n            const oldest = all[all.length-1];\r\n            if(oldest && oldest.id) await deleteFromDB(oldest.id);\r\n        }\r\n    } catch(e){ console.warn(\'History cleanup failed:\', e); }\r\n    await saveToDB(record);\r\n}')
if OLD_ADD in content:
    content = content.replace(OLD_ADD, NEW_ADD)
    print('✅ 修改 2: addToHistory 已改為 URL + 200 筆限制')
elif OLD_ADD.replace('\r\n','\n') in content:
    content = content.replace(OLD_ADD.replace('\r\n','\n'), NEW_ADD.replace('\r\n','\n'))
    print('✅ 修改 2: addToHistory 已改為 URL + 200 筆限制 (LF)')
else:
    print('❌ 修改 2: 找不到 addToHistory')

# ============================================================
# 修改 3: generate 流程加入 res.url
# ============================================================
OLD_GEN = ('                let base64=reader.result;\r\n                const realSeed = res.headers.get(\'X-Seed\');\r\n                const item={ image:base64, prompt, model:res.headers.get(\'X-Model\'), seed: realSeed, style:res.headers.get(\'X-Style\') };\r\n                await addToHistory(item);')
NEW_GEN = ('                let base64=reader.result;\r\n                const realSeed = res.headers.get(\'X-Seed\');\r\n                const item={ image:base64, url: res.url||\'\', prompt, model:res.headers.get(\'X-Model\'), seed: realSeed, style:res.headers.get(\'X-Style\') };\r\n                await addToHistory(item); // 只存 URL')
if OLD_GEN in content:
    content = content.replace(OLD_GEN, NEW_GEN)
    print('✅ 修改 3: generate 流程已加入 res.url')
elif OLD_GEN.replace('\r\n','\n') in content:
    content = content.replace(OLD_GEN.replace('\r\n','\n'), NEW_GEN.replace('\r\n','\n'))
    print('✅ 修改 3: generate 流程已加入 res.url (LF)')
else:
    print('❌ 修改 3: 找不到 generate 流程')

# ============================================================
# 修改 4: imgSrc 改用 url
# ============================================================
OLD_IMGSRC = "        const imgSrc = item.base64 || item.url;"
NEW_IMGSRC = "        const imgSrc = item.url || item.base64 || '';"
if OLD_IMGSRC in content:
    content = content.replace(OLD_IMGSRC, NEW_IMGSRC)
    print('✅ 修改 4: imgSrc 已改用 url 優先')
else:
    print('❌ 修改 4: 找不到 imgSrc')

# ============================================================
# 修改 5+6: 字體修復 — Nano 頁面 <head>
# ============================================================
FONT_BLOCK = """<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Noto+Sans+JP:wght@400;500;700&family=Noto+Sans+KR:wght@400;500;700&family=Noto+Sans+Arabic:wght@400;500;700&display=swap" rel="stylesheet">
<style>
/* ====== Per-language font stack ====== */
:lang(zh), :lang(zh-TW), :lang(zh-CN) {
  font-family: 'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', 'Heiti TC', sans-serif !important;
}
:lang(ja) {
  font-family: 'Noto Sans JP', 'Hiragino Sans', 'Yu Gothic', 'Meiryo', sans-serif !important;
}
:lang(ko) {
  font-family: 'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif !important;
}
:lang(ar) {
  font-family: 'Noto Sans Arabic', 'Segoe UI', 'Tahoma', sans-serif !important;
  direction: rtl;
}
</style>
"""

NANO_TITLE = '<title>\U0001f34c Nano Pro - Gemini 3 Pro \u63a7\u5236\u53f0</title>\r\n<link rel="icon"'
MAIN_TITLE = '<title>Flux AI Pro v${CONFIG.PROJECT_VERSION}</title>\r\n<link rel="icon"'

if NANO_TITLE in content:
    content = content.replace(NANO_TITLE, NANO_TITLE + '\r\n' + FONT_BLOCK)
    print('✅ 修改 5: Noto Sans 字體已注入 Nano 頁面')
else:
    print('❌ 修改 5: 找不到 Nano 頁面 title')

if MAIN_TITLE in content:
    content = content.replace(MAIN_TITLE, MAIN_TITLE + '\r\n' + FONT_BLOCK)
    print('✅ 修改 6: Noto Sans 字體已注入主頁面')
else:
    print('❌ 修改 6: 找不到主頁面 title')

# ============================================================
# 修改 7: setLanguage() 更新 html lang 屬性 (主頁面)
# ============================================================
OLD_SET_LANG = ('    // 更新 RTL 方向\r\n    const langConfig = LANGUAGE_CONFIG[curLang];\r\n    if (langConfig && langConfig.direction === \'rtl\') {\r\n        document.documentElement.setAttribute(\'dir\', \'rtl\');\r\n    } else {\r\n        document.documentElement.removeAttribute(\'dir\');\r\n    }\r\n    \r\n    updateLang();\r\n    updateLangButton();\r\n    updateStyleOptions();\r\n}')
NEW_SET_LANG = ('    // 更新 RTL 方向 + html lang 屬性\r\n    const langConfig = LANGUAGE_CONFIG[curLang];\r\n    const langMap = { zh: \'zh-TW\', en: \'en\', ja: \'ja\', ko: \'ko\', ar: \'ar\' };\r\n    document.documentElement.lang = langMap[curLang] || curLang;\r\n    if (langConfig && langConfig.direction === \'rtl\') {\r\n        document.documentElement.setAttribute(\'dir\', \'rtl\');\r\n    } else {\r\n        document.documentElement.removeAttribute(\'dir\');\r\n        document.documentElement.setAttribute(\'dir\', \'ltr\');\r\n    }\r\n    \r\n    updateLang();\r\n    updateLangButton();\r\n    updateStyleOptions();\r\n}')
if OLD_SET_LANG in content:
    content = content.replace(OLD_SET_LANG, NEW_SET_LANG)
    print('✅ 修改 7: setLanguage() 已加入 html lang 更新')
else:
    print('❌ 修改 7: 找不到 setLanguage RTL 區塊')

# ============================================================
# 修改 8: nanoSetLanguage() 更新 html lang 屬性 (Nano 頁面)
# ============================================================
OLD_NANO_RTL = ('        // 更新 RTL 方向\r\n        const langConfig = NANO_LANGUAGE_CONFIG[nanoCurLang];\r\n        if (langConfig && langConfig.direction === \'rtl\') {\r\n            document.documentElement.setAttribute(\'dir\', \'rtl\');\r\n        } else {\r\n            document.documentElement.removeAttribute(\'dir\');\r\n        }\r\n        \r\n        nanoUpdateLang();\r\n        nanoUpdateLangButton();\r\n    }')
NEW_NANO_RTL = ('        // 更新 RTL 方向 + html lang 屬性\r\n        const langConfig = NANO_LANGUAGE_CONFIG[nanoCurLang];\r\n        const langMap = { zh: \'zh-TW\', en: \'en\', ja: \'ja\', ko: \'ko\', ar: \'ar\' };\r\n        document.documentElement.lang = langMap[nanoCurLang] || nanoCurLang;\r\n        if (langConfig && langConfig.direction === \'rtl\') {\r\n            document.documentElement.setAttribute(\'dir\', \'rtl\');\r\n        } else {\r\n            document.documentElement.removeAttribute(\'dir\');\r\n            document.documentElement.setAttribute(\'dir\', \'ltr\');\r\n        }\r\n        \r\n        nanoUpdateLang();\r\n        nanoUpdateLangButton();\r\n    }')
if OLD_NANO_RTL in content:
    content = content.replace(OLD_NANO_RTL, NEW_NANO_RTL)
    print('✅ 修改 8: nanoSetLanguage() 已加入 html lang 更新')
else:
    print('❌ 修改 8: 找不到 nanoSetLanguage RTL 區塊')

# ============================================================
# 寫回 + 驗證
# ============================================================
print('\n💾 寫回 worker.js...')
with open('worker.js', 'w', encoding='utf-8') as f:
    f.write(content)
new_size = len(content)
print(f'   新大小: {new_size/1024:.1f} KB (差異: +{new_size - original_size} bytes)')

print('\n🔍 驗證修改結果:')
checks = [
    ('safeSetItem 防護',            'QuotaExceededError \u9632\u8b77' in content),
    ('addToHistory 只存 URL',        'MAX_RECORDS = 200' in content),
    ('generate 傳入 res.url',        "url: res.url||''" in content),
    ('imgSrc url 優先',             "item.url || item.base64 || ''" in content),
    ('Noto Sans 字體 (Nano)',       'Noto+Sans+TC' in content[140000:220000]),
    ('Noto Sans 字體 (Main)',       'Noto+Sans+TC' in content[245000:300000]),
    (':lang(ar) CSS',              ':lang(ar)' in content),
    ('setLanguage lang 屬性',      'langMap[curLang]' in content),
    ('nanoSetLanguage lang 屬性',  'langMap[nanoCurLang]' in content),
]
all_ok = True
for name, ok in checks:
    print(f"  {'\u2705' if ok else '\u274c'} {name}")
    if not ok: all_ok = False

if all_ok:
    print('\n\U0001f389 全部 9 項修改成功\uff01請執行:')
    print('   git add worker.js')
    print("   git commit -m 'fix: 修復 QuotaExceeded + 字體亂碼'")
    print('   git push')
else:
    print('\n\u26a0\ufe0f  部分修改失敗，請檢查上方錯誤')

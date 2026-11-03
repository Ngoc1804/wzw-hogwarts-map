from pathlib import Path
import re,json
p=Path(__file__).parent
# The v2 source is retained for drawing primitives; no campaign location IDs are read by v3.
original=json.loads((p/'original-shell.json').read_text())
legacy=(p/'legacy.js').read_text().replace('const MAP_DATA=null;','const MAP_DATA=window.MAP_DATA||{};')
for name in ['renderMap','mapActorsAndHints','selectPlace']:
 legacy=legacy.replace('function '+name+'(', 'function legacy_'+name+'(')
v2=(p/'upgrade.js').read_text().replace('startAtlas();','')
# Remove obsolete matching against campaign-specific code names from drawing-motif inference.
v2=re.sub(r'\|l-[a-z]+','',v2)
css=original['style']+'\n'+(p/'upgrade.css').read_text()
script='/* Universal Map Engine v3.0.0 — geography and story policy supplied by each prompt. */\n(()=>{\nconst root=document.getElementById("wzw-map-root")||document.body;\nconst style=document.createElement("style");style.textContent='+json.dumps(css,ensure_ascii=False)+';document.head.append(style);\nroot.style.width="100%";root.style.height="100%";root.style.minWidth="0";root.innerHTML='+json.dumps(original['shell'],ensure_ascii=False)+';\n'+legacy+'\n'+v2+'\n'+(p/'v3.js').read_text()+'\n})();\n'
(p/'wzw-engine.js').write_text(script)
print('Built v3:',len(script.encode()),'bytes')

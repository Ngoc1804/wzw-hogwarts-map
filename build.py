from pathlib import Path
import json,re
root=Path(__file__).parent
original=json.loads((root/'original-shell.json').read_text())
style=original['style']+'\n'+(root/'upgrade.css').read_text()
shell=original['shell']
js=(root/'legacy.js').read_text()

js=js.replace('const MAP_DATA=null;', 'const MAP_DATA=window.MAP_DATA||{};')
# Replace renderer/selector declarations with the reviewed upgrade implementations.
# Keep original footprint and name-ribbon drawing functions byte-for-byte.
for name in ['renderMap','mapActorsAndHints','selectPlace']:
    js=js.replace('function '+name+'(', 'function legacy_'+name+'(')
engine='/* WzW Map Engine v2.0.0 | Original UI preserved | See README.md */\n(()=>{\nconst root=document.getElementById("wzw-map-root")||document.body;\nconst style=document.createElement("style");style.textContent='+json.dumps(style,ensure_ascii=False)+';document.head.append(style);\nroot.style.width="100%";root.style.height="100%";root.style.minWidth="0";root.innerHTML='+json.dumps(shell,ensure_ascii=False)+';\n'+js+'\n'+(root/'upgrade.js').read_text()+'\n})();\n'
(root/'wzw-engine.js').write_text(engine)
print('Built',len(engine.encode()),'bytes')

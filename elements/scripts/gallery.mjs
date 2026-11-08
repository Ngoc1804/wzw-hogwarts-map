import fs from 'node:fs';import path from 'node:path';import zlib from 'node:zlib';
const root=path.resolve(import.meta.dirname,'..'),catalog=JSON.parse(fs.readFileSync(path.join(root,'catalog.json'),'utf8')),frames={};
for(const e of catalog.elements)frames[e.id]=fs.readFileSync(path.join(root,e.file),'utf8');
const file=path.join(root,'index.html'),html=fs.readFileSync(file,'utf8'),blob=zlib.gzipSync(JSON.stringify({catalog,frames}),{level:9}).toString('base64');
fs.writeFileSync(file,html.replace(/(<script id="kit" type="application\/octet-stream">)[\s\S]*?(<\/script>)/,(_,a,b)=>a+blob+b));
console.log(catalog.elements.length+' framework cards rebuilt');

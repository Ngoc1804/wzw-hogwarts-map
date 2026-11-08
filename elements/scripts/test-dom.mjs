import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import assert from 'node:assert/strict';
import {JSDOM,VirtualConsole} from 'jsdom';

const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const catalog=JSON.parse(fs.readFileSync(path.join(root,'catalog.json'),'utf8'));
const payload=JSON.parse(zlib.gunzipSync(Buffer.from(html.match(/<script id="kit"[^>]*>(.*?)<\/script>/s)[1],'base64')));
assert.deepEqual(payload.catalog,catalog);
for(const item of catalog.elements)assert.equal(payload.frames[item.id],fs.readFileSync(path.join(root,item.file),'utf8'));
const errors=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
const dom=new JSDOM(html,{runScripts:'dangerously',virtualConsole:vc,beforeParse(w){
  w.Blob=globalThis.Blob;w.Response=globalThis.Response;w.DecompressionStream=globalThis.DecompressionStream;
  w.URL.createObjectURL=()=> 'blob:test';w.URL.revokeObjectURL=()=>{};
  w.HTMLAnchorElement.prototype.click=function(){w.lastDownload=this.download};
}});
try{
  const w=dom.window,d=w.document,get=id=>d.getElementById(id);
  const checkInstanceIds=()=>{
    const ids=[...d.querySelectorAll('[id]')].map(e=>e.id);
    assert.equal(ids.length,new Set(ids).size,'Gallery SVG instances must have unique IDs');
    for(const svg of d.querySelectorAll('figure>svg')){
      const own=new Set([svg,...svg.querySelectorAll('[id]')].map(e=>e.id).filter(Boolean));
      for(const node of [svg,...svg.querySelectorAll('*')])for(const a of node.attributes){
        for(const match of a.value.matchAll(/url\(\s*["']?#([^\s)"']+)/g))assert(own.has(match[1]),'Cross-card URL reference: '+match[1]);
        if(a.localName==='href'&&a.value.startsWith('#'))assert(own.has(a.value.slice(1)),'Cross-card href: '+a.value);
      }
    }
  };
  const until=Date.now()+5000;while(!d.querySelector('article')&&Date.now()<until)await new Promise(r=>setTimeout(r,20));
  assert(d.querySelector('article'),'Gallery did not render');
  checkInstanceIds();
  assert(get('count').textContent.includes('/ '+catalog.elements.length+' element'));
  get('category').value='';get('category').dispatchEvent(new w.Event('change'));
  assert.equal(d.querySelectorAll('article').length,24);
  const first=d.querySelector('article small').textContent;get('next').click();assert.notEqual(d.querySelector('article small').textContent,first);
  checkInstanceIds();
  get('search').value='hagrid';get('search').dispatchEvent(new w.Event('input'));
  assert.equal(d.querySelectorAll('article').length,1);
  d.querySelector('article button').click();assert.equal(w.lastDownload,'house.hagrid-hex.svg');
  get('mode').value='neutral';get('mode').dispatchEvent(new w.Event('change'));assert(d.body.classList.contains('neutral'));
  assert.deepEqual(errors,[]);
  console.log('PASS current gallery: catalog/frame equality, pagination, search, neutral view, SVG download');
}finally{dom.window.close()}

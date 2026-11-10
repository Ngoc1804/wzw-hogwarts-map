// Reproducible local/CI browser suite; generated artifacts remain outside source.
const cp=require('node:child_process'),path=require('node:path'),fs=require('node:fs');
const temp=fs.mkdtempSync('/tmp/wzw-demo2-'),env={...process.env,CHROMIUM_PATH:process.env.CHROMIUM_PATH||(fs.existsSync('/usr/bin/chromium')?'/usr/bin/chromium':require('playwright').chromium.executablePath())};
const run=(cmd,args)=>cp.execFileSync(cmd,args,{cwd:path.resolve(__dirname,'..'),env,stdio:'inherit',timeout:120000});
run('python',['tools/build_runtime.py','--out',temp,'--data','tools/fixtures/scene.json','--embed-atlas','--debug']);
for(const test of ['test_entry_browser.cjs','test_flow_browser.cjs','test_coverage_browser.cjs','test_exterior_browser.cjs','test_demo2_browser.cjs'])run('node',['tools/'+test,temp+'/'+(test==='test_entry_browser.cjs'?'bundle.js':'preview.html')]);
run('node',['tools/test_loader_browser.cjs']);
const experiments=temp+'-experiments';run('python',['tools/prepare_experiment.py','--out',experiments]);run('node',['tools/test_experiments.cjs',experiments]);
console.log('PASS all Demo 2 browser suites; artifacts:',temp);

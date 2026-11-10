// Reproducible local/CI browser suite; generated artifacts remain outside source.
const cp=require('node:child_process'),path=require('node:path'),fs=require('node:fs');
const temp=fs.mkdtempSync('/tmp/wzw-demo2-'),env={...process.env,CHROMIUM_PATH:process.env.CHROMIUM_PATH||require('playwright').chromium.executablePath()};
const run=(cmd,args)=>cp.execFileSync(cmd,args,{cwd:path.resolve(__dirname,'..'),env,stdio:'inherit',timeout:120000});
run('python',['tools/build_runtime.py','--out',temp,'--data','tools/fixtures/scene.json','--embed-atlas','--debug']);
// Chromium can exhaust shared CI resources after a sequence of artwork browsers.
// Verify the exact production bootstrap against the new candidate first.
run('node',['tools/test_loader_browser.cjs',temp+'/bundle.js']);
for(const test of ['test_entry_browser.cjs','test_flow_browser.cjs','test_coverage_browser.cjs','test_exterior_browser.cjs','test_demo2_browser.cjs','test_demo3_browser.cjs','test_generated_baseline_browser.cjs','test_demo3_design_browser.cjs','test_locality_floors_browser.cjs'])run('node',['tools/'+test,temp+'/'+(test==='test_entry_browser.cjs'?'bundle.js':'preview.html')]);

const experiments=temp+'-experiments';run('python',['tools/prepare_experiment.py','--out',experiments]);run('node',['tools/test_experiments.cjs',experiments]);
console.log('PASS Demo 3 browser suites; artifacts:',temp);

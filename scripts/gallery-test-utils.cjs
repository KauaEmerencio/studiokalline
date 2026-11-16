const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

function loadSource(file, resolver = name => name) {
  const mod = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  vm.runInNewContext(code, { module: mod, exports: mod.exports, require: resolver }, { filename: file });
  return mod.exports;
}
function sourceData() { return loadSource('src/data/site.ts'); }
function assetUrl(source, base) {
  const stem = path.parse(source).name;
  const extension = path.extname(source);
  const file = fs.readdirSync('dist/assets').find(file => file.startsWith(`${stem}-`) && file.endsWith(extension));
  if (!file) throw new Error(`Missing built asset for ${source}`);
  return new URL(`/assets/${file}`, base).href;
}
module.exports = { loadSource, sourceData, assetUrl };

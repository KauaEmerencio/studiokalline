import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import ts from "typescript";

const root = process.cwd();
function files(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? files(file) : [file];
  });
}
function exactCase(file) {
  const relative = path.relative(root, file);
  let directory = root;
  for (const segment of relative.split(path.sep)) {
    assert(fs.readdirSync(directory).includes(segment), `Missing or incorrect case: ${relative}`);
    directory = path.join(directory, segment);
  }
}
const sources = files(path.join(root, "src")).filter(file => /\.(tsx?|css)$/.test(file));
let checked = 0;
for (const file of sources) {
  const content = fs.readFileSync(file, "utf8");
  const imports = ts.preProcessFile(content).importedFiles;
  for (const imported of imports) {
    if (!imported.fileName.startsWith(".")) continue;
    const base = path.resolve(path.dirname(file), imported.fileName);
    const resolved = [base, ...[".ts", ".tsx", ".css", "/index.ts", "/index.tsx"].map(extension => base + extension)]
      .find(candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
    assert(resolved, `Unresolved import in ${path.relative(root, file)}: ${imported.fileName}`);
    exactCase(resolved);
    checked++;
  }
}
const inputs = [...sources, path.join(root, "index.html"), path.join(root, "vite.config.ts")];
if (fs.existsSync("dist")) inputs.push(...files(path.join(root, "dist")).filter(file => /\.(js|html|css)$/.test(file)));
const suspected = [];
for (const file of inputs) {
  const content = fs.readFileSync(file, "utf8");
  if (/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|\bAKIA[A-Z0-9]{16}\b|\bgh[pousr]_[A-Za-z0-9]{30,}|\bsk-(?:proj-)?[A-Za-z0-9_-]{30,}/.test(content)) {
    suspected.push(path.relative(root, file));
  }
}
assert.deepEqual(suspected, [], "Review possible secrets in these files (values are intentionally omitted)");
console.log(`Checked ${checked} local imports with exact case across ${sources.length} source files; no matches for common credential patterns. This is not a full secret-history scan.`);

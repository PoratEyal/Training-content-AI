const fs = require("fs");
const path = require("path");

// === JavaScript ===
const jsDir = path.join(__dirname, "../build/static/js");
const jsFiles = fs.readdirSync(jsDir);
const mainJs = jsFiles.find(name => /^main\..*\.js$/.test(name));

if (!mainJs) {
  console.error("❌ main.[hash].js not found.");
  process.exit(1);
}

const jsSrc = path.join(jsDir, mainJs);
const jsDest = path.join(jsDir, "main.js");
fs.copyFileSync(jsSrc, jsDest);
console.log(`✅ Copied ${mainJs} to main.js`);

// === CSS ===
const cssDir = path.join(__dirname, "../build/static/css");
const cssFiles = fs.readdirSync(cssDir);
const mainCss = cssFiles.find(name => /^main\..*\.css$/.test(name));

if (!mainCss) {
  console.error("❌ main.[hash].css not found.");
  process.exit(1);
}

const cssSrc = path.join(cssDir, mainCss);
const cssDest = path.join(cssDir, "main.css");
fs.copyFileSync(cssSrc, cssDest);
console.log(`✅ Copied ${mainCss} to main.css`);

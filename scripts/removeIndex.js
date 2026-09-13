const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "../build/index.html");

if (fs.existsSync(indexPath)) {
  fs.unlinkSync(indexPath);
  console.log("🧹 Removed build/index.html");
} else {
  console.log("✅ No index.html in build — nothing to clean");
}

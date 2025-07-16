const { execSync } = require("child_process");

const files = [
  "index.words.he.html",
  "index.words.en.html",
  "index.words.es.html",
  "index.words.ar.html",
  "index.youth.he.html",
  "index.youth.en.html",
  "index.youth.es.html",
  "index.youth.ar.html",
  "index.practice.he.html",
  "index.practice.en.html",
  "index.practice.es.html",
  "index.practice.ar.html",
];

files.forEach((file) => {
  const input = `public/${file}`;
  const output = `build/${file}`;
  execSync(
    `npx html-minifier-terser ${input} -o ${output} --collapse-whitespace --remove-comments --remove-attribute-quotes --minify-css true --minify-js true`,
    { stdio: "inherit" }
  );
});

console.log("🎉 All HTML files minified successfully!");

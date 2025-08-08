const { execSync } = require("child_process");

const files = [
  "index.youth.he.html",
  "index.youth.en.html",
  "index.youth.es.html",
  "index.youth.ar.html",
  "index.youth.content.he.html",
  "index.event.he.html",
  "index.event.en.html",
  "index.event.es.html",
  "index.event.ar.html",
  "index.best.he.html",
  "index.best.en.html",
  "index.best.es.html",
  "index.best.ar.html",
  "index.practice.he.html",
  "index.practice.en.html",
  "index.practice.es.html",
  "index.practice.ar.html",
  "index.words.he.html",
  "index.words.en.html",
  "index.words.es.html",
  "index.words.ar.html",
];

files.forEach((file) => {
  const input = `public/index/${file}`;
  const output = `build/${file}`;
  execSync(
    `npx html-minifier-terser ${input} -o ${output} --collapse-whitespace --remove-comments --remove-attribute-quotes --minify-css true --minify-js true`,
    { stdio: "inherit" }
  );
});

console.log("🎉 All HTML files minified successfully!");

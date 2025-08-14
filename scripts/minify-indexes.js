const { execSync } = require("child_process");

const files = [
  "index.youth.he.html",
  "index.youth.en.html",
  "index.youth.es.html",
  "index.youth.ar.html",
  "index.youth.content.he.html",
  "index.youth.content.friendship.he.html",
  "index.youth.content.games.he.html",
  "index.youth.content.holidays.he.html",
  "index.youth.content.intro.he.html",
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
  "index.youth.faq.he.html",
  "index.youth.faq.en.html",
  "index.youth.faq.es.html",
  "index.youth.faq.ar.html",
  "index.event.faq.he.html",
  "index.event.faq.en.html",
  "index.event.faq.es.html",
  "index.event.faq.ar.html",
  "index.best.faq.he.html",
  "index.best.faq.en.html",
  "index.best.faq.es.html",
  "index.best.faq.ar.html",
  "index.practice.faq.he.html",
  "index.practice.faq.en.html",
  "index.practice.faq.es.html",
  "index.practice.faq.ar.html",
  "index.words.faq.he.html",
  "index.words.faq.en.html",
  "index.words.faq.es.html",
  "index.words.faq.ar.html",
  "index.privacy.he.html",
  "index.privacy.en.html",
  "index.privacy.es.html",
  "index.privacy.ar.html",

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

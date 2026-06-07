const { execSync } = require("child_process");

const files = [
  "index.youth.he.html",
  "index.youth.en.html",
  "index.youth.es.html",
  "index.youth.ar.html",
  "index.youth.fr.html",
  "index.youth.content.he.html",
  "index.youth.content.friendship.he.html",
  "index.youth.content.games.he.html",
  "index.youth.content.holidays.he.html",
  "index.youth.content.intro.he.html",
  "index.event.he.html",
  "index.event.en.html",
  "index.event.es.html",
  "index.event.ar.html",
  "index.event.fr.html",
  "index.practice.he.html",
  "index.practice.en.html",
  "index.practice.es.html",
  "index.practice.ar.html",
  "index.practice.fr.html",
  "index.words.he.html",
  "index.words.en.html",
  "index.words.es.html",
  "index.words.ar.html",
  "index.words.fr.html",
  "index.youth.faq.he.html",
  "index.youth.faq.en.html",
  "index.youth.faq.es.html",
  "index.youth.faq.ar.html",
  "index.youth.faq.fr.html",
  "index.event.faq.he.html",
  "index.event.faq.en.html",
  "index.event.faq.es.html",
  "index.event.faq.ar.html",
  "index.event.faq.fr.html",
  "index.practice.faq.he.html",
  "index.practice.faq.en.html",
  "index.practice.faq.es.html",
  "index.practice.faq.ar.html",
  "index.practice.faq.fr.html",
  "index.words.faq.he.html",
  "index.words.faq.en.html",
  "index.words.faq.es.html",
  "index.words.faq.ar.html",
  "index.words.faq.fr.html",
  "index.privacy.he.html",
  "index.privacy.en.html",
  "index.privacy.es.html",
  "index.privacy.ar.html",
  "index.privacy.fr.html",

];

const fs = require("fs");
const version = Date.now();

files.forEach((file) => {
  const input = `public/index/${file}`;
  const output = `build/${file}`;
  execSync(
    `npx html-minifier-terser ${input} -o ${output} --collapse-whitespace --remove-comments --remove-attribute-quotes --minify-css true --minify-js true`,
    { stdio: "inherit" }
  );

  if (fs.existsSync(output)) {
    let content = fs.readFileSync(output, "utf8");
    content = content.replace(/\/static\/js\/main\.js/g, `/static/js/main.js?v=${version}`);
    content = content.replace(/\/static\/css\/main\.css/g, `/static/css/main.css?v=${version}`);
    fs.writeFileSync(output, content, "utf8");
  }
});

console.log(`🎉 All HTML files minified and versioned (v=${version}) successfully!`);

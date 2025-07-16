@echo off
echo Compressing index.html files before deploy...

cmd /c "npx html-minifier-terser public/index.words.he.html -o build/index.words.he.html --collapse-whitespace --remove-comments --remove-attribute-quotes --minify-css true --minify-js true"
cmd /c "npx html-minifier-terser public/index.words.en.html -o build/index.words.en.html --collapse-whitespace --remove-comments --remove-attribute-quotes --minify-css true --minify-js true"
cmd /c "npx html-minifier-terser public/index.words.es.html -o build/index.words.es.html --collapse-whitespace --remove-comments --remove-attribute-quotes --minify-css true --minify-js true"
cmd /c "npx html-minifier-terser public/index.words.ar.html -o build/index.words.ar.html --collapse-whitespace --remove-comments --remove-attribute-quotes --minify-css true --minify-js true"

echo Done!
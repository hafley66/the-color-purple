const pug = require('pug')
const fs = require('fs')
// const paths = require('./build/components/static/PathGen.js').default
const resume = require('./build/components/static/Resume.js').default
const about = require('./build/components/static/About.js').default

const comp = 'src/components/'
const boot = 'src/bootstrap-app/'

let filename = comp + 'site/build.pug'
let sitePug = fs.readFileSync(filename);
let siteHtml = pug.render(sitePug, {resume, about, filename})

console.log(siteHtml);
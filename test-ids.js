import fs from 'fs';
const poemsDir = fs.readdirSync('src/content/poems');
console.log(poemsDir.slice(0, 5));

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const crypto = require('crypto');
const { execSync } = require('child_process');
const TurndownService = require('turndown');

const turndownService = new TurndownService();
turndownService.addRule('br', {
  filter: 'br',
  replacement: function () {
    return '<br/>\n';
  }
});

const BASE_DIR = path.join(__dirname, '../archive-downloads/websites/www.palabradelmundo.cult.cu');
const SRC_DIR = path.join(__dirname, '../src/content');
const ASSETS_IMG_DIR = path.join(__dirname, '../src/assets');

// Ensure output directories exist
const contentDirs = ['books', 'poets', 'poems'];
contentDirs.forEach((dir) => {
  const dirPath = path.join(SRC_DIR, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

function copyImage(imgSrc, currentDir) {
  if (!imgSrc) return '';
  const decodedSrc = decodeURIComponent(imgSrc);
  // Resolve the path relative to the HTML file's directory
  const srcPath = path.resolve(currentDir, decodedSrc);
  const ext = path.extname(decodedSrc).split('?')[0] || '.jpg';
  const imgName = crypto.createHash('md5').update(decodedSrc).digest('hex') + ext;
  
  const destDir = path.join(ASSETS_IMG_DIR, 'palabra-images');
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  
  const destPath = path.join(destDir, imgName);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    // Relative path from src/content/collection/slug/index.mdx to src/assets/palabra-images/
    return `../../../assets/palabra-images/${imgName}`;
  }
  return '';
}

function escapeMDX(str) {
  return str.replace(/([{}])/g, '\\$1');
}

function extractBooks() {
  const booksDir = path.join(BASE_DIR, 'books');
  if (!fs.existsSync(booksDir)) return;

  const books = fs.readdirSync(booksDir);
  books.forEach(slug => {
    const indexPath = path.join(booksDir, slug, 'index.html');
    if (!fs.existsSync(indexPath)) return;

    const html = fs.readFileSync(indexPath, 'utf-8');
    const $ = cheerio.load(html);
    const item = $('.list-blog li').first();

    let title = item.find('h3').text().trim();
    if (!title) return;
    
    // Find cover image
    let coverSrc = item.find('a').attr('href'); // Usually wrapping the img
    if (!coverSrc || !coverSrc.match(/\.(jpeg|jpg|png|gif)$/i)) {
      coverSrc = item.find('img').attr('src');
    }
    const newCoverSrc = copyImage(coverSrc, path.dirname(indexPath));
    
    // Find author description/name
    item.find('img').remove();
    const descriptionHtml = item.find('p').html() || '';
    const descriptionText = item.find('p').text().trim();
    const descriptionMd = escapeMDX(turndownService.turndown(descriptionHtml));
    
    // See if there's a specific author link or name
    let authorId = '';
    let authorName = descriptionText.split('\n')[1]?.trim() || descriptionText;

    let frontmatter = `---
title: ${JSON.stringify(title)}
`;
    if (newCoverSrc) frontmatter += `cover: "${newCoverSrc}"\n`;
    if (authorId) frontmatter += `authorId: "${authorId}"\n`;
    if (authorName) frontmatter += `authorName: ${JSON.stringify(authorName)}\n`;
    
    frontmatter += `---\n\n${descriptionMd}`;
    
    const outDir = path.join(SRC_DIR, 'books', slug);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.mdx'), frontmatter);
  });
  console.log(`Extracted books.`);
}

function extractPoets() {
  const poetsDir = path.join(BASE_DIR, 'directorio', 'poetas');
  if (!fs.existsSync(poetsDir)) return;

  const poets = fs.readdirSync(poetsDir);
  poets.forEach(slug => {
    const indexPath = path.join(poetsDir, slug, 'index.html');
    if (!fs.existsSync(indexPath)) return;

    const html = fs.readFileSync(indexPath, 'utf-8');
    const $ = cheerio.load(html);
    const item = $('.list-blog.autor-view li').first();
    
    let name = item.find('h3').text().trim();
    if (!name) return;
    
    const photoSrc = item.find('.autor-face').attr('src');
    const newPhotoSrc = copyImage(photoSrc, path.dirname(indexPath));
    item.find('img').remove(); // Remove all images to avoid MDX import errors
    
    const bioHTML = item.find('p').html() || item.html() || '';
    const bioMd = escapeMDX(turndownService.turndown(bioHTML));
    
    let frontmatter = `---
name: ${JSON.stringify(name)}
`;
    if (newPhotoSrc) frontmatter += `photo: "${newPhotoSrc}"\n`;
    frontmatter += `---\n\n${bioMd}`;
    
    const outDir = path.join(SRC_DIR, 'poets', slug);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.mdx'), frontmatter);
  });
  console.log(`Extracted poets.`);
}

function extractPoems() {
  const poemsDir = path.join(BASE_DIR, 'directorio', 'poemas');
  if (!fs.existsSync(poemsDir)) return;

  const poetDirs = fs.readdirSync(poemsDir);
  poetDirs.forEach(poetSlug => {
    const pDir = path.join(poemsDir, poetSlug);
    if (!fs.statSync(pDir).isDirectory()) return;

    const poems = fs.readdirSync(pDir);
    poems.forEach(poemSlug => {
      const indexPath = path.join(pDir, poemSlug, 'index.html');
      if (!fs.existsSync(indexPath)) return;

      const html = fs.readFileSync(indexPath, 'utf-8');
      const $ = cheerio.load(html);
      const item = $('.list-blog.autor-view li').first();

      let title = item.find('h3').text().trim();
      if (!title) return;
      
      item.find('img').remove();
      let contentHtml = item.find('p').html() || '';
      
      // Preserve poem verse structure
      contentHtml = contentHtml.replace(/<br\s*\/?>\n?/gi, '\n');
      contentHtml = contentHtml.replace(/\n/g, '<br>');
      
      const contentMd = escapeMDX(turndownService.turndown(contentHtml));

      let frontmatter = `---
title: ${JSON.stringify(title)}
poetId: "${poetSlug}"
---\n\n${contentMd}`;
      
      const outDir = path.join(SRC_DIR, 'poems', poemSlug);
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, 'index.mdx'), frontmatter);
    });
  });
  console.log(`Extracted poems.`);
}

console.log('Starting extraction...');
extractBooks();
extractPoets();
extractPoems();
console.log('Done!');

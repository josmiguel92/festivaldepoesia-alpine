const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const TurndownService = require('turndown');

const turndownService = new TurndownService();

// configuration
const siteBaseDir = path.join(__dirname, '../archive-downloads/websites/www.cubapoesia.cult.cu');
const inputDirs = [
    path.join(siteBaseDir, 'es'),
    siteBaseDir
];
const outputDir = path.join(__dirname, '../src/content/blog/');
const assetsDir = path.join(__dirname, '../src/assets/archive/');

if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

let count = 0;
const processedSlugs = new Set();

function processDirectory(directory) {
  if (!fs.existsSync(directory)) return;

  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'wp-content' && file !== 'wp-includes' && file !== 'wp-json') {
          processDirectory(fullPath);
      }
    } else if (file === 'index.html' && !fullPath.includes('/category/') && !fullPath.includes('/tag/') && !fullPath.includes('/page/')) {
      extractArticle(fullPath);
    }
  }
}

function extractArticle(filePath) {
    const html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html);
    
    if (!$('body').hasClass('single-post')) return;

    const title = $('.entry-title').first().text().trim();
    if (!title) return;

    const parts = filePath.split(path.sep);
    const slug = parts[parts.length - 2];

    // IGNORE URLs with ? or strange characters
    if (slug.includes('?') || slug.includes('=')) return;
    
    if (processedSlugs.has(slug)) return;

    const dateStr = $('time.entry-date').attr('datetime');
    const contentHtml = $('.entry-content').html();
    if (!contentHtml) return;

    let author = $('.author.vcard .fn').first().text().trim() || 'CubaPoesía';
    let category = $('.cat-links a').first().text().trim() || 'Archivo Histórico';

    const tags = [];
    $('.tags-links a').each((i, el) => {
        const t = $(el).text().trim();
        if (t && !tags.includes(t)) tags.push(t);
    });

    let excerpt = $('.entry-content p').first().text().trim();
    if (excerpt.length > 150) excerpt = excerpt.substring(0, 147) + '...';
    if (!excerpt) excerpt = 'Artículo recuperado del archivo histórico.';

    let thumbLocalPath = '../../../assets/LOGO_FEST_OFICIAL.PNG'; // default
    let imgEl = $('.single-thumb img').first();
    let originalImgUrl = imgEl.attr('data-lazy-src') || imgEl.attr('src');
    
    if (!originalImgUrl || originalImgUrl.startsWith('data:')) {
       originalImgUrl = $('.single-thumb noscript img').first().attr('src');
    }

    if (originalImgUrl) {
        const match = originalImgUrl.match(/wp-content\/uploads\/.+/);
        if (match) {
            const relPath = match[0].split('?')[0]; 
            const absoluteDownloadPath = path.join(siteBaseDir, relPath);
            if (fs.existsSync(absoluteDownloadPath)) {
                const ext = path.extname(absoluteDownloadPath) || '.jpg';
                const newAssetPath = path.join(assetsDir, `${slug}${ext}`);
                fs.copyFileSync(absoluteDownloadPath, newAssetPath);
                thumbLocalPath = `../../../assets/archive/${slug}${ext}`;
            }
        }
    }

    let markdown = turndownService.turndown(contentHtml);
    
    // Fix MDX JSX syntax issues by escaping { and <
    markdown = markdown.replace(/\{/g, '\\{').replace(/\}/g, '\\}').replace(/</g, '\\<');

    const outPath = path.join(outputDir, slug, 'index.mdx');
    if (!fs.existsSync(path.dirname(outPath))) {
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
    }

    const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
date: ${dateStr ? new Date(dateStr).toISOString() : new Date().toISOString()}
category: "${category.replace(/"/g, '\\"')}"
author: "${author.replace(/"/g, '\\"')}"
excerpt: "${excerpt.replace(/"/g, '\\"').replace(/\n/g, ' ')}"
thumbnail: ${thumbLocalPath}
tags: ${JSON.stringify(tags)}
---

${markdown}
`;
    fs.writeFileSync(outPath, frontmatter);
    processedSlugs.add(slug);
    count++;
}

console.log("Iniciando extracción masiva con correcciones MDX...");
inputDirs.forEach(dir => processDirectory(dir));
console.log(`¡Proceso finalizado! Se extrajeron ${count} artículos limpios.`);

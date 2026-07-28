import fs from 'fs';
import path from 'path';

const backupDir = '.backup-posts';
const outputDir = 'src/content/blog';
const assetsDir = 'src/assets';

// Ensure directories exist
if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true });
}
fs.mkdirSync(outputDir, { recursive: true });
fs.mkdirSync(assetsDir, { recursive: true });

const files = fs.readdirSync(backupDir).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const content = fs.readFileSync(path.join(backupDir, file), 'utf8');
  
  // Extract frontmatter
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return;
  
  const frontmatterStr = match[1];
  const body = match[2];
  
  // Simple parser
  const lines = frontmatterStr.split('\n');
  const metadata = {};
  
  let currentKey = null;
  for (const line of lines) {
    if (line.startsWith('  ')) continue; // Skip nested objects for simplicity in this migration
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      if (value.startsWith("'") || value.startsWith('"')) value = value.substring(1, value.length - 1);
      metadata[key] = value;
    }
  }
  
  // Map fields
  const title = metadata.title || 'Untitled';
  let excerpt = metadata.description || 'No description provided';
  if (excerpt.length < 5) excerpt = title; // quietpages might need a proper length excerpt
  const date = metadata.pubDate || '2024-01-01';
  let author = 'Cubapoesia';
  
  let thumbnailStr = '../../assets/autumn-scene.webp';
  
  if (metadata.cover) {
    const coverPathStr = metadata.cover;
    // e.g. /articles/Palestine-Israel-Conlict-result.webp
    const filename = coverPathStr.split('/').pop();
    const sourcePath = path.join('public', coverPathStr.startsWith('/') ? coverPathStr.substring(1) : coverPathStr);
    
    if (fs.existsSync(sourcePath)) {
      const destPath = path.join(assetsDir, filename);
      fs.copyFileSync(sourcePath, destPath);
      thumbnailStr = `../../assets/${filename}`;
    }
  }

  const newFrontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
excerpt: "${excerpt.replace(/"/g, '\\"')}"
date: ${date}
category: "General"
author: "${author}"
thumbnail: ${thumbnailStr}
---`;
  
  const slug = file.replace('.md', '');
  const postDir = path.join(outputDir, slug);
  fs.mkdirSync(postDir, { recursive: true });
  
  fs.writeFileSync(path.join(postDir, 'index.mdx'), newFrontmatter + '\n' + body);
  console.log(`Migrated ${file} -> ${slug}/index.mdx`);
});

console.log('Migration complete!');

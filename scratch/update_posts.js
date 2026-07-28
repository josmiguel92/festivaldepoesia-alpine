import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basePath = path.join(__dirname, '..', 'src', 'content', 'blog');
const updates = {
  '1.convocatoria-habana-palestina': { category: '"convocatorias"', tags: '["poesia", "habana", "palestina"]' },
  '2.call-habana-palestina': { category: '"convocatorias"', tags: '["poesia", "habana", "palestina"]' },
  '3.call-for-the-28th-havana-poetry-festival': { category: '"convocatorias"', tags: '["poesia", "habana"]' },
  '31-festival-2025': { category: '"noticias"', tags: '["poesia", "habana", "festival-2025", "homenaje"]' },
  '32-festival-2026': { category: '"noticias"', tags: '["poesia", "habana", "festival-2026", "mitin-virtual"]' },
  '4.acciones-poeticas-festival-mayo-junio-2024': { category: '"noticias"', tags: '["poesia", "habana", "festival-2024"]' },
  '5.convocatoria-festival-poesia-2024': { category: '"convocatorias"', tags: '["poesia", "habana", "festival-2024"]' },
  '6.noticias-de-cubapoesia-marzo-2024': { category: '"noticias"', tags: '["poesia"]' },
  'convocatoria-2027': { category: '"convocatorias"', tags: '["poesia", "habana", "festival-2027", "mitin-virtual"]' }
};

for (const [folder, data] of Object.entries(updates)) {
  const p = path.join(basePath, folder, 'index.mdx');
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    // Replace category
    content = content.replace(/^category:.*$/m, `category: ${data.category}`);
    // Replace tags if exist, otherwise add them
    if (content.match(/^tags:.*$/m)) {
      content = content.replace(/^tags:.*$/m, `tags: ${data.tags}`);
    } else {
      // Add tags after category
      content = content.replace(/^category:.*$/m, `category: ${data.category}\ntags: ${data.tags}`);
    }
    fs.writeFileSync(p, content);
    console.log(`Updated ${folder}`);
  } else {
    console.log(`File not found: ${p}`);
  }
}

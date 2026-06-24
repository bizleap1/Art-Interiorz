const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'artifacts/artz-interior/public/assets/portfolio/new');

async function processImages() {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;
    const filePath = path.join(dir, file);
    const tempPath = filePath + '.tmp';
    
    console.log(`Processing ${file}...`);
    try {
      await sharp(filePath)
        .resize(1000, null, { withoutEnlargement: true }) // resize width to 1000px max
        .jpeg({ quality: 75 }) // compress to 75% quality JPEG
        .toFile(tempPath);
        
      fs.renameSync(tempPath, filePath);
      console.log(`Saved ${file}`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}

processImages();

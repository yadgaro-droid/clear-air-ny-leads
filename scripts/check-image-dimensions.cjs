const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function checkDimensions() {
  const dir = path.join(__dirname, '..', 'public', 'images', 'before-after');
  const files = fs.readdirSync(dir).filter(f => f.includes('-mobile.webp'));

  for (const file of files) {
    const meta = await sharp(path.join(dir, file)).metadata();
    console.log(`${file}: ${meta.width}x${meta.height}`);
  }
}

checkDimensions();

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, '../public/images/before-after');
const images = [
  'flexible-duct-before.jpeg',
  'flexible-duct-after.jpeg',
  'vent-opening-before.jpeg',
  'vent-opening-after.jpeg',
  'rigid-opening-before.jpeg',
  'rigid-opening-after.jpeg'
];

async function convertToWebP() {
  console.log('Starting WebP conversion...\n');

  for (const image of images) {
    const inputPath = path.join(inputDir, image);
    const outputPath = path.join(inputDir, image.replace('.jpeg', '.webp'));

    try {
      const originalStats = fs.statSync(inputPath);
      const originalSize = (originalStats.size / 1024).toFixed(2);

      await sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(outputPath);

      const webpStats = fs.statSync(outputPath);
      const webpSize = (webpStats.size / 1024).toFixed(2);
      const savings = ((1 - webpStats.size / originalStats.size) * 100).toFixed(1);

      console.log(`✓ ${image}`);
      console.log(`  Original: ${originalSize} KB`);
      console.log(`  WebP: ${webpSize} KB`);
      console.log(`  Savings: ${savings}%\n`);
    } catch (error) {
      console.error(`✗ Error converting ${image}:`, error.message);
    }
  }

  console.log('Conversion complete!');
}

convertToWebP().catch(console.error);

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function convertImagesToWebP() {
  const publicDir = path.join(__dirname, '..', 'public', 'images', 'before-after');

  // All gallery images to convert (already aligned and cropped)
  const images = [
    'vent-opening-before.jpeg',
    'vent-opening-after.jpeg',
    'rigid-opening-before.jpeg',
    'rigid-opening-after.jpeg',
    'duct-interior-before.jpeg',
    'duct-interior-after.jpeg',
    'flexible-duct-before.jpeg',
    'flexible-duct-after.jpeg'
  ];

  console.log('🔄 Converting aligned JPEG images to WebP format...\n');
  console.log('⚠️  IMPORTANT: Preserving exact dimensions and alignment!\n');

  let totalOriginalSize = 0;
  let totalWebPSize = 0;

  for (const imageFile of images) {
    const jpegPath = path.join(publicDir, imageFile);
    const webpPath = path.join(publicDir, imageFile.replace('.jpeg', '.webp'));

    // Check if JPEG exists
    if (!fs.existsSync(jpegPath)) {
      console.log(`⚠️  Skipping ${imageFile} (not found)`);
      continue;
    }

    // Get original JPEG size
    const jpegStats = fs.statSync(jpegPath);
    const jpegSizeKB = (jpegStats.size / 1024).toFixed(1);
    totalOriginalSize += jpegStats.size;

    // Get image metadata to preserve exact dimensions
    const metadata = await sharp(jpegPath).metadata();

    // Convert to WebP (quality 85 for optimal compression/quality balance)
    await sharp(jpegPath)
      .webp({ quality: 85 })
      .toFile(webpPath);

    // Get WebP size
    const webpStats = fs.statSync(webpPath);
    const webpSizeKB = (webpStats.size / 1024).toFixed(1);
    totalWebPSize += webpStats.size;

    const savings = ((1 - webpStats.size / jpegStats.size) * 100).toFixed(1);

    console.log(`✅ ${imageFile}`);
    console.log(`   Dimensions: ${metadata.width}x${metadata.height} (preserved)`);
    console.log(`   JPEG: ${jpegSizeKB} KiB → WebP: ${webpSizeKB} KiB`);
    console.log(`   Savings: ${savings}%\n`);
  }

  const totalOriginalKB = (totalOriginalSize / 1024).toFixed(1);
  const totalWebPKB = (totalWebPSize / 1024).toFixed(1);
  const totalSavings = ((1 - totalWebPSize / totalOriginalSize) * 100).toFixed(1);

  console.log('📊 SUMMARY:');
  console.log(`   Total JPEG size: ${totalOriginalKB} KiB`);
  console.log(`   Total WebP size: ${totalWebPKB} KiB`);
  console.log(`   Total savings: ${totalSavings}%\n`);

  console.log('✅ Conversion complete!');
  console.log('📋 Next steps:');
  console.log('   1. Update React components to use <picture> tags');
  console.log('   2. Test visual appearance on staging');
  console.log('   3. Verify alignment is preserved');
}

convertImagesToWebP().catch(console.error);

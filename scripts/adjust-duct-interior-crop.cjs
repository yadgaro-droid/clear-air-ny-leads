const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

/**
 * Adjust vertical crop position for duct-interior images
 *
 * @param {number} offset - Vertical offset (-100 to +100)
 *   Positive offset = crop lower (show more center, less top)
 *   Negative offset = crop higher (show more top, less center)
 */
async function adjustDuctInteriorCrop(offset = 0) {
  const publicDir = path.join(__dirname, '..', 'public', 'images', 'before-after');

  // Source images (from OneDrive)
  const beforeSource = 'C:\\Users\\yadga\\OneDrive\\Air duct\\תמונות\\לפני ואחרי\\Duct before.jpeg';
  const afterSource = 'C:\\Users\\yadga\\OneDrive\\Air duct\\תמונות\\לפני ואחרי\\Duct after.jpeg';

  // Output paths
  const beforeOutput = path.join(publicDir, 'duct-interior-before.jpeg');
  const afterOutput = path.join(publicDir, 'duct-interior-after.jpeg');

  console.log(`🔧 Adjusting duct interior crop with offset: ${offset > 0 ? '+' : ''}${offset}px`);
  console.log(`   Positive = show more center (crop lower)`);
  console.log(`   Negative = show more top (crop higher)\n`);

  // Source image dimensions
  const beforeMeta = await sharp(beforeSource).metadata();
  const afterMeta = await sharp(afterSource).metadata();

  console.log('Source images:', beforeMeta.width, 'x', beforeMeta.height);

  // Target final dimensions (4:3 ratio)
  const targetWidth = 2000;
  const targetHeight = 1500;

  // Base crop positions (from previous alignment)
  const baseBeforeTop = 20;
  const baseAfterTop = 80;  // 60px offset for alignment

  // Apply offset (positive = shift DOWN = show more center)
  const beforeTop = Math.max(0, Math.min(beforeMeta.height - targetHeight, baseBeforeTop + offset));
  const afterTop = Math.max(0, Math.min(afterMeta.height - targetHeight, baseAfterTop + offset));

  // BEFORE image crop
  const beforeCrop = {
    left: Math.floor((beforeMeta.width - targetWidth) / 2),  // Center horizontally
    top: beforeTop,
    width: targetWidth,
    height: targetHeight
  };

  // AFTER image crop (maintain 60px offset)
  const afterCrop = {
    left: Math.floor((afterMeta.width - targetWidth) / 2),
    top: afterTop,
    width: targetWidth,
    height: targetHeight
  };

  console.log('Crop settings:');
  console.log(`  BEFORE: top=${beforeTop} (base: ${baseBeforeTop} + offset: ${offset})`);
  console.log(`  AFTER:  top=${afterTop} (base: ${baseAfterTop} + offset: ${offset})`);
  console.log(`  Alignment offset maintained: ${afterTop - beforeTop}px\n`);

  console.log('Processing strategy:');
  console.log(`  Extract crop: ${targetWidth}x${targetHeight} directly from source\n`);

  // Backup existing images
  if (fs.existsSync(beforeOutput)) {
    const timestamp = Date.now();
    fs.copyFileSync(beforeOutput, `${beforeOutput}.backup-${timestamp}`);
    console.log(`📦 Backed up: duct-interior-before.jpeg`);
  }
  if (fs.existsSync(afterOutput)) {
    const timestamp = Date.now();
    fs.copyFileSync(afterOutput, `${afterOutput}.backup-${timestamp}`);
    console.log(`📦 Backed up: duct-interior-after.jpeg\n`);
  }

  // Process BEFORE image
  console.log('Processing BEFORE image...');
  await sharp(beforeSource)
    .extract(beforeCrop)
    .jpeg({ quality: 92 })
    .toFile(beforeOutput);

  console.log(`✅ Created: ${beforeOutput}`);

  // Process AFTER image
  console.log('Processing AFTER image...');
  await sharp(afterSource)
    .extract(afterCrop)
    .jpeg({ quality: 92 })
    .toFile(afterOutput);

  console.log(`✅ Created: ${afterOutput}`);

  console.log('\n🎯 Crop adjustment complete!');
  console.log('📋 Next steps:');
  console.log('   1. Check localhost:8081 to verify crop position');
  console.log('   2. If not centered enough, run again with larger positive offset');
  console.log('   3. Convert to WebP: node scripts/convert-images-to-webp.cjs');
}

// Get offset from command line argument
const offset = parseInt(process.argv[2] || '0', 10);

if (isNaN(offset) || offset < -100 || offset > 100) {
  console.error('❌ Error: Offset must be between -100 and +100');
  console.log('Usage: node scripts/adjust-duct-interior-crop.cjs <offset>');
  console.log('Example: node scripts/adjust-duct-interior-crop.cjs 50');
  console.log('         (shifts crop down by 50px to show more center)');
  process.exit(1);
}

adjustDuctInteriorCrop(offset).catch(console.error);

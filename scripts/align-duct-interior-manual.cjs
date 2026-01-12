const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

/**
 * Manually align duct-interior images with independent control
 *
 * Usage: node scripts/align-duct-interior-manual.cjs <beforeTop> <afterTop>
 * Example: node scripts/align-duct-interior-manual.cjs 200 350
 */
async function alignDuctInteriorManual(beforeTop, afterTop) {
  const publicDir = path.join(__dirname, '..', 'public', 'images', 'before-after');

  // Source images (from OneDrive)
  const beforeSource = 'C:\\Users\\yadga\\OneDrive\\Air duct\\תמונות\\לפני ואחרי\\Duct before.jpeg';
  const afterSource = 'C:\\Users\\yadga\\OneDrive\\Air duct\\תמונות\\לפני ואחרי\\Duct after.jpeg';

  // Output paths
  const beforeOutput = path.join(publicDir, 'duct-interior-before.jpeg');
  const afterOutput = path.join(publicDir, 'duct-interior-after.jpeg');

  console.log('🔧 Manual alignment for duct-interior images');
  console.log(`   BEFORE: top=${beforeTop}`);
  console.log(`   AFTER:  top=${afterTop}`);
  console.log(`   Offset: ${afterTop - beforeTop}px\n`);

  // Source image dimensions
  const beforeMeta = await sharp(beforeSource).metadata();
  const afterMeta = await sharp(afterSource).metadata();

  console.log('Source images:', beforeMeta.width, 'x', beforeMeta.height, '\n');

  // Target final dimensions (4:3 ratio)
  const targetWidth = 2000;
  const targetHeight = 1500;

  // Calculate safe crop boundaries
  const maxBeforeTop = beforeMeta.height - targetHeight;
  const maxAfterTop = afterMeta.height - targetHeight;

  if (beforeTop < 0 || beforeTop > maxBeforeTop) {
    console.error(`❌ BEFORE top=${beforeTop} out of range (0 to ${maxBeforeTop})`);
    process.exit(1);
  }

  if (afterTop < 0 || afterTop > maxAfterTop) {
    console.error(`❌ AFTER top=${afterTop} out of range (0 to ${maxAfterTop})`);
    process.exit(1);
  }

  // BEFORE image crop
  const beforeCrop = {
    left: Math.floor((beforeMeta.width - targetWidth) / 2),
    top: beforeTop,
    width: targetWidth,
    height: targetHeight
  };

  // AFTER image crop
  const afterCrop = {
    left: Math.floor((afterMeta.width - targetWidth) / 2),
    top: afterTop,
    width: targetWidth,
    height: targetHeight
  };

  console.log('Crop settings:');
  console.log(`  BEFORE: left=${beforeCrop.left}, top=${beforeTop}, size=${targetWidth}x${targetHeight}`);
  console.log(`  AFTER:  left=${afterCrop.left}, top=${afterTop}, size=${targetWidth}x${targetHeight}\n`);

  // Backup existing images
  const timestamp = Date.now();
  if (fs.existsSync(beforeOutput)) {
    fs.copyFileSync(beforeOutput, `${beforeOutput}.backup-${timestamp}`);
    console.log(`📦 Backed up: duct-interior-before.jpeg`);
  }
  if (fs.existsSync(afterOutput)) {
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

  console.log('\n🎯 Manual alignment complete!');
  console.log('📋 Next steps:');
  console.log('   1. Check localhost:8081 to verify alignment');
  console.log('   2. Adjust values and re-run if needed');
  console.log('   3. Convert to WebP: node scripts/convert-images-to-webp.cjs');
  console.log('\n💡 Tips:');
  console.log('   - Increase BEFORE top = show lower part (more center)');
  console.log('   - Increase AFTER top = show lower part');
  console.log('   - Try to match horizontal ridges between images');
}

// Get positions from command line arguments
const beforeTop = parseInt(process.argv[2], 10);
const afterTop = parseInt(process.argv[3], 10);

if (isNaN(beforeTop) || isNaN(afterTop)) {
  console.error('❌ Error: Both beforeTop and afterTop required');
  console.log('\nUsage: node scripts/align-duct-interior-manual.cjs <beforeTop> <afterTop>');
  console.log('\nExamples:');
  console.log('  node scripts/align-duct-interior-manual.cjs 150 250  # Try different alignment');
  console.log('  node scripts/align-duct-interior-manual.cjs 200 350  # Shift after much lower');
  console.log('\nImage dimensions: 2048x2048');
  console.log('Target crop: 2000x1500');
  console.log('Valid range for top: 0 to 548 (2048 - 1500)');
  process.exit(1);
}

alignDuctInteriorManual(beforeTop, afterTop).catch(console.error);

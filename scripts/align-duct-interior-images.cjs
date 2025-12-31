const sharp = require('sharp');
const path = require('path');

async function alignDuctInteriorImages() {
  const publicDir = path.join(__dirname, '..', 'public', 'images', 'before-after');

  // Input images (from OneDrive source)
  const beforeSource = 'C:\\Users\\yadga\\OneDrive\\Air duct\\תמונות\\לפני ואחרי\\Duct before.jpeg';
  const afterSource = 'C:\\Users\\yadga\\OneDrive\\Air duct\\תמונות\\לפני ואחרי\\Duct after.jpeg';

  // Output paths
  const beforeOutput = path.join(publicDir, 'duct-interior-before.jpeg');
  const afterOutput = path.join(publicDir, 'duct-interior-after.jpeg');

  console.log('🔍 Analyzing duct interior images...');

  // Get image metadata
  const beforeMeta = await sharp(beforeSource).metadata();
  const afterMeta = await sharp(afterSource).metadata();

  console.log('Before image:', beforeMeta.width, 'x', beforeMeta.height);
  console.log('After image:', afterMeta.width, 'x', afterMeta.height);

  // Target dimensions - 4:3 ASPECT RATIO for uniform gallery
  // Professional standard ratio for consistent appearance across all gallery images
  // Focus on horizontal duct ridges/features for alignment
  const targetWidth = 2000;   // 4:3 ratio width
  const targetHeight = 1500;  // 4:3 ratio height (2000 / 1.333)

  // BEFORE image - start with standard crop
  const beforeCrop = {
    left: 4,
    top: 20,  // Start near top
    width: targetWidth,
    height: targetHeight
  };

  // AFTER image - shift DOWN to align horizontal ridges with BEFORE
  // The horizontal duct ridges in AFTER are currently too HIGH
  const afterCrop = {
    left: 4,
    top: 80,  // Shift 60px DOWN from BEFORE to align horizontal ridges
    width: targetWidth,
    height: targetHeight
  };

  console.log('\n✂️  Cropping duct interior images...');
  console.log('Before crop:', beforeCrop);
  console.log('After crop:', afterCrop);

  // Create backup of existing images if they exist
  const fs = require('fs');
  if (fs.existsSync(beforeOutput)) {
    const backupBefore = path.join(publicDir, 'duct-interior-before-backup.jpeg');
    fs.copyFileSync(beforeOutput, backupBefore);
    console.log('📦 Backed up existing BEFORE image');
  }
  if (fs.existsSync(afterOutput)) {
    const backupAfter = path.join(publicDir, 'duct-interior-after-backup.jpeg');
    fs.copyFileSync(afterOutput, backupAfter);
    console.log('📦 Backed up existing AFTER image');
  }

  // Process BEFORE image
  await sharp(beforeSource)
    .extract(beforeCrop)
    .resize(targetWidth, targetHeight, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 92 })
    .toFile(beforeOutput);

  console.log('✅ Created:', beforeOutput);

  // Process AFTER image
  await sharp(afterSource)
    .extract(afterCrop)
    .resize(targetWidth, targetHeight, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 92 })
    .toFile(afterOutput);

  console.log('✅ Created:', afterOutput);

  console.log('\n🎯 Duct interior images processed!');
  console.log('Check alignment and adjust offsets if needed.');
}

alignDuctInteriorImages().catch(console.error);

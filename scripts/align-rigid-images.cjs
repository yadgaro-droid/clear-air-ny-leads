const sharp = require('sharp');
const path = require('path');

async function alignRigidImages() {
  const publicDir = path.join(__dirname, '..', 'public', 'images', 'before-after');

  // Input images (from OneDrive source)
  const beforeSource = 'C:\\Users\\yadga\\OneDrive\\Air duct\\תמונות\\לפני ואחרי\\פתח קשיח לפני.jpeg';
  const afterSource = 'C:\\Users\\yadga\\OneDrive\\Air duct\\תמונות\\לפני ואחרי\\פתח קשיח לאחרי.jpeg';

  // Output paths
  const beforeOutput = path.join(publicDir, 'rigid-opening-before.jpeg');
  const afterOutput = path.join(publicDir, 'rigid-opening-after.jpeg');

  console.log('🔍 Analyzing rigid duct opening images...');

  // Get image metadata
  const beforeMeta = await sharp(beforeSource).metadata();
  const afterMeta = await sharp(afterSource).metadata();

  console.log('Before image:', beforeMeta.width, 'x', beforeMeta.height);
  console.log('After image:', afterMeta.width, 'x', afterMeta.height);

  // Target dimensions - 4:3 ASPECT RATIO for uniform gallery
  // Professional standard ratio for consistent appearance across all gallery images
  // Source images are portrait (1530 x 2040), will crop to landscape 4:3
  const targetWidth = 1520;   // Use nearly full width available
  const targetHeight = 1140;  // 4:3 ratio height (1520 / 1.333)

  // CRITICAL: Main transformation is at the BOTTOM - debris vs clean
  // User feedback: Focus on bottom area where dirt accumulates
  // Source image: 1530x2040, Crop: 1520x1140
  // Available vertical space: 900px (2040 - 1140)
  // To show BOTTOM: start crop near the bottom

  // BEFORE image - show bottom area with heavy debris
  const beforeCrop = {
    left: 5,  // Minimal left margin
    top: 850,  // Start LOW to capture bottom debris area
    width: targetWidth,
    height: targetHeight
  };

  // AFTER image - maintain 50px offset for alignment
  const afterCrop = {
    left: 5,  // Same horizontal position
    top: 900,  // 50px LOWER than BEFORE to maintain alignment
    width: targetWidth,
    height: targetHeight
  };

  console.log('\n✂️  Cropping rigid duct images...');
  console.log('Before crop:', beforeCrop);
  console.log('After crop:', afterCrop);

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

  console.log('\n🎯 Rigid duct images processed!');
  console.log('Check alignment and adjust offset if needed.');
}

alignRigidImages().catch(console.error);

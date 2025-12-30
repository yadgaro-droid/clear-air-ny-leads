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

  // Target dimensions - NEAR-FULL IMAGE to show maximum detail
  // Images are portrait (1530 x 2040), so adjust accordingly
  const targetWidth = 1520;   // Nearly full width (1530 - 10px margins)
  const targetHeight = 1850;  // Tall enough to show duct + surrounding debris

  // Based on visual analysis:
  // BEFORE: Duct opening in middle area, lots of debris at bottom
  // AFTER: Duct opening appears slightly HIGHER in frame (cleaner bottom area)
  // Need to offset: BEFORE should start lower OR AFTER should start higher

  // BEFORE image - has debris at bottom, duct appears in middle area
  const beforeCrop = {
    left: 5,  // Minimal left margin
    top: 50,  // Start at 50px to capture top area
    width: targetWidth,
    height: targetHeight
  };

  // AFTER image - needs to shift DOWN to align with BEFORE
  // The outer ring in AFTER is currently too HIGH, so increase top offset
  const afterCrop = {
    left: 5,  // Same horizontal position
    top: 100,  // Start 50px LOWER than BEFORE (was 20, now 100) to align outer ring
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

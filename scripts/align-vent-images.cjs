const sharp = require('sharp');
const path = require('path');

async function alignVentImages() {
  const publicDir = path.join(__dirname, '..', 'public', 'images', 'before-after');

  // Input images (from OneDrive source)
  const beforeSource = 'C:\\Users\\yadga\\OneDrive\\Air duct\\תמונות\\לפני ואחרי\\פתח תעלה לפני.jpeg';
  const afterSource = 'C:\\Users\\yadga\\OneDrive\\Air duct\\תמונות\\לפני ואחרי\\פתח תעלה אחרי.jpeg';

  // Output paths
  const beforeOutput = path.join(publicDir, 'vent-opening-before.jpeg');
  const afterOutput = path.join(publicDir, 'vent-opening-after.jpeg');

  console.log('🔍 Re-cropping to show actual vent opening (not shadows)...');

  // Get image metadata
  const beforeMeta = await sharp(beforeSource).metadata();
  const afterMeta = await sharp(afterSource).metadata();

  console.log('Before image:', beforeMeta.width, 'x', beforeMeta.height);
  console.log('After image:', afterMeta.width, 'x', afterMeta.height);

  // Target dimensions - 4:3 ASPECT RATIO for uniform gallery
  // Professional standard ratio for consistent appearance across all gallery images
  const targetWidth = 2000;   // 4:3 ratio width
  const targetHeight = 1500;  // 4:3 ratio height (2000 / 1.333)

  // MAINTAIN ALIGNMENT: Keep the 150px offset that worked perfectly
  // Show almost the complete photo with minimal cropping

  // BEFORE image - vent is higher, so we crop from a higher position
  // Start very close to the top edge
  const beforeCrop = {
    left: 4,  // Start almost at left edge (minimal margin)
    top: 20,  // Start very close to top (was 50, now 20)
    width: targetWidth,
    height: targetHeight
  };

  // AFTER image - maintain the 150px offset for perfect alignment
  // Start 150px lower than BEFORE (20 + 150 = 170)
  const afterCrop = {
    left: 4,  // Same horizontal position as BEFORE
    top: 170,  // Start at 170px down (maintains 150px offset from BEFORE)
    width: targetWidth,
    height: targetHeight
  };

  console.log('\n✂️  Cropping and aligning images...');
  console.log('Before crop:', beforeCrop);
  console.log('After crop:', afterCrop);

  // Process BEFORE image
  await sharp(beforeSource)
    .extract(beforeCrop)
    .resize(targetWidth, targetHeight, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 90 })
    .toFile(beforeOutput);

  console.log('✅ Created:', beforeOutput);

  // Process AFTER image
  await sharp(afterSource)
    .extract(afterCrop)
    .resize(targetWidth, targetHeight, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 90 })
    .toFile(afterOutput);

  console.log('✅ Created:', afterOutput);

  console.log('\n🎯 Images aligned! The circular vent opening should now be in the same position in both images.');
}

alignVentImages().catch(console.error);

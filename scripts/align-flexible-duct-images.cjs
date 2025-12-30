const sharp = require('sharp');
const path = require('path');

async function alignFlexibleDuctImages() {
  const publicDir = path.join(__dirname, '..', 'public', 'images', 'before-after');

  // Input images (from OneDrive source)
  const beforeSource = 'C:\\Users\\yadga\\OneDrive\\Air duct\\תמונות\\לפני ואחרי\\תעלה גמישה לפני.jpeg';
  const afterSource = 'C:\\Users\\yadga\\OneDrive\\Air duct\\תמונות\\לפני ואחרי\\תעלה גמישה אחרי.jpeg';

  // Output paths
  const beforeOutput = path.join(publicDir, 'flexible-duct-before.jpeg');
  const afterOutput = path.join(publicDir, 'flexible-duct-after.jpeg');

  console.log('🔍 Analyzing flexible duct images for outer ring alignment...');

  // Get image metadata
  const beforeMeta = await sharp(beforeSource).metadata();
  const afterMeta = await sharp(afterSource).metadata();

  console.log('Before image:', beforeMeta.width, 'x', beforeMeta.height);
  console.log('After image:', afterMeta.width, 'x', afterMeta.height);

  // Target dimensions - NEAR-FULL IMAGE to show maximum detail of spiral rings
  // These are portrait images showing the inside of the flexible duct
  const targetWidth = 1520;   // Nearly full width
  const targetHeight = 1850;  // Tall enough to show full spiral pattern

  // Based on visual analysis:
  // BEFORE: Spiral duct centered, dust visible on rings, appears well-centered
  // AFTER: Clean spiral duct, appears in similar position
  // The spiral rings should align - focus on making the outer/visible rings match

  // BEFORE image - spiral appears centered, capture from near top
  const beforeCrop = {
    left: 5,  // Minimal left margin
    top: 50,  // Start near top to show full spiral
    width: targetWidth,
    height: targetHeight
  };

  // AFTER image - appears to be taken from very similar position
  // May need slight vertical offset to align the spiral rings
  const afterCrop = {
    left: 5,  // Same horizontal position
    top: 70,  // Start slightly lower (20px offset) to align outer rings
    width: targetWidth,
    height: targetHeight
  };

  console.log('\n✂️  Cropping flexible duct images with focus on outer ring alignment...');
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

  console.log('\n🎯 Flexible duct images processed with outer ring alignment!');
  console.log('The spiral grooves should now be better aligned.');
}

alignFlexibleDuctImages().catch(console.error);

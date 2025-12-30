const sharp = require('sharp');
const path = require('path');

async function analyzeDuctImages() {
  const beforeSource = 'C:\\Users\\yadga\\OneDrive\\Air duct\\תמונות\\לפני ואחרי\\Duct before.jpeg';
  const afterSource = 'C:\\Users\\yadga\\OneDrive\\Air duct\\תמונות\\לפני ואחרי\\Duct after.jpeg';

  console.log('🔍 Analyzing duct interior images...\n');

  // Get image metadata
  const beforeMeta = await sharp(beforeSource).metadata();
  const afterMeta = await sharp(afterSource).metadata();

  console.log('BEFORE image:');
  console.log(`  Dimensions: ${beforeMeta.width} x ${beforeMeta.height}`);
  console.log(`  Format: ${beforeMeta.format}`);
  console.log(`  Orientation: ${beforeMeta.width > beforeMeta.height ? 'Landscape' : 'Portrait'}`);

  console.log('\nAFTER image:');
  console.log(`  Dimensions: ${afterMeta.width} x ${afterMeta.height}`);
  console.log(`  Format: ${afterMeta.format}`);
  console.log(`  Orientation: ${afterMeta.width > afterMeta.height ? 'Landscape' : 'Portrait'}`);

  console.log('\n📊 Analysis complete!');
}

analyzeDuctImages().catch(console.error);

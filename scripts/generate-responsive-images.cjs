const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

/**
 * Generate mobile-optimized responsive images
 * Mobile size: 800px width (for screens up to 768px)
 */
async function generateResponsiveImages() {
  console.log('🖼️  Generating mobile-optimized responsive images...\n');

  const mobileWidth = 800;
  const webpQuality = 85;

  // Hero images to optimize
  const heroImages = [
    {
      source: 'src/assets/hero-duct-cleaning.webp',
      output: 'src/assets/hero-duct-cleaning-mobile.webp'
    },
    {
      source: 'src/assets/services-hero.webp',
      output: 'src/assets/services-hero-mobile.webp'
    }
  ];

  // Gallery slider images to optimize
  const galleryImages = [
    'vent-opening-before.webp',
    'vent-opening-after.webp',
    'rigid-opening-before.webp',
    'rigid-opening-after.webp',
    'duct-interior-before.webp',
    'duct-interior-after.webp',
    'flexible-duct-before.webp',
    'flexible-duct-after.webp'
  ];

  let totalOriginalSize = 0;
  let totalMobileSize = 0;

  // Process hero images
  console.log('📱 Processing hero images...\n');
  for (const img of heroImages) {
    const sourcePath = path.join(__dirname, '..', img.source);
    const outputPath = path.join(__dirname, '..', img.output);

    if (!fs.existsSync(sourcePath)) {
      console.log(`⚠️  Skipping ${img.source} (not found)`);
      continue;
    }

    const sourceStats = fs.statSync(sourcePath);
    const sourceSizeKB = (sourceStats.size / 1024).toFixed(1);
    totalOriginalSize += sourceStats.size;

    // Get source metadata
    const metadata = await sharp(sourcePath).metadata();

    // Resize to mobile width, maintain aspect ratio
    await sharp(sourcePath)
      .resize(mobileWidth, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: webpQuality })
      .toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    const outputSizeKB = (outputStats.size / 1024).toFixed(1);
    totalMobileSize += outputStats.size;

    const savings = ((1 - outputStats.size / sourceStats.size) * 100).toFixed(1);

    console.log(`✅ ${path.basename(img.source)}`);
    console.log(`   Original: ${metadata.width}x${metadata.height} (${sourceSizeKB} KiB)`);
    console.log(`   Mobile: ${mobileWidth}px width (${outputSizeKB} KiB)`);
    console.log(`   Savings: ${savings}%\n`);
  }

  // Process gallery images
  console.log('🖼️  Processing gallery slider images...\n');
  const galleryDir = path.join(__dirname, '..', 'public', 'images', 'before-after');

  for (const imageFile of galleryImages) {
    const sourcePath = path.join(galleryDir, imageFile);
    const outputPath = path.join(galleryDir, imageFile.replace('.webp', '-mobile.webp'));

    if (!fs.existsSync(sourcePath)) {
      console.log(`⚠️  Skipping ${imageFile} (not found)`);
      continue;
    }

    const sourceStats = fs.statSync(sourcePath);
    const sourceSizeKB = (sourceStats.size / 1024).toFixed(1);
    totalOriginalSize += sourceStats.size;

    // Get source metadata
    const metadata = await sharp(sourcePath).metadata();

    // Resize to mobile width, maintain aspect ratio
    await sharp(sourcePath)
      .resize(mobileWidth, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: webpQuality })
      .toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    const outputSizeKB = (outputStats.size / 1024).toFixed(1);
    totalMobileSize += outputStats.size;

    const savings = ((1 - outputStats.size / sourceStats.size) * 100).toFixed(1);

    console.log(`✅ ${imageFile}`);
    console.log(`   Original: ${metadata.width}x${metadata.height} (${sourceSizeKB} KiB)`);
    console.log(`   Mobile: ${mobileWidth}px width (${outputSizeKB} KiB)`);
    console.log(`   Savings: ${savings}%\n`);
  }

  const totalOriginalKB = (totalOriginalSize / 1024).toFixed(1);
  const totalMobileKB = (totalMobileSize / 1024).toFixed(1);
  const totalSavings = ((1 - totalMobileSize / totalOriginalSize) * 100).toFixed(1);

  console.log('📊 SUMMARY:');
  console.log(`   Total original size: ${totalOriginalKB} KiB`);
  console.log(`   Total mobile size: ${totalMobileKB} KiB`);
  console.log(`   Total savings: ${totalSavings}%\n`);

  console.log('✅ Responsive image generation complete!');
  console.log('📋 Next steps:');
  console.log('   1. Update React components to use mobile images on mobile devices');
  console.log('   2. Test on localhost:8082 to verify');
  console.log('   3. Deploy to staging for PageSpeed testing');
}

generateResponsiveImages().catch(console.error);

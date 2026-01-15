const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

/**
 * Generate hero-specific responsive images
 * Hero display size: 567×690px (not 665px like other images)
 */
async function generateHeroImages() {
  console.log('🎯 Generating hero-optimized responsive images...\n');

  const heroWidth = 567; // Exact display width for hero slider
  const webpQuality = 85;

  // Hero flexible-duct images need special sizing
  const heroImages = [
    {
      source: 'public/images/before-after/flexible-duct-before.webp',
      output: 'public/images/before-after/flexible-duct-before-mobile.webp'
    },
    {
      source: 'public/images/before-after/flexible-duct-after.webp',
      output: 'public/images/before-after/flexible-duct-after-mobile.webp'
    }
  ];

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  console.log('📱 Processing hero slider images...\n');

  for (const img of heroImages) {
    const sourcePath = path.join(__dirname, '..', img.source);
    const outputPath = path.join(__dirname, '..', img.output);

    if (!fs.existsSync(sourcePath)) {
      console.log(`⚠️  Skipping ${img.source} (not found)`);
      continue;
    }

    // Get current mobile version stats (before optimization)
    if (fs.existsSync(outputPath)) {
      const currentStats = fs.statSync(outputPath);
      const currentSizeKB = (currentStats.size / 1024).toFixed(1);
      totalOriginalSize += currentStats.size;
      console.log(`📊 Current ${path.basename(img.output)}: ${currentSizeKB} KiB`);
    }

    // Get source metadata
    const sourceMetadata = await sharp(sourcePath).metadata();

    // Resize to hero display width (567px), maintain aspect ratio
    await sharp(sourcePath)
      .resize(heroWidth, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: webpQuality })
      .toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    const outputSizeKB = (outputStats.size / 1024).toFixed(1);
    totalOptimizedSize += outputStats.size;

    const metadata = await sharp(outputPath).metadata();

    console.log(`✅ ${path.basename(img.source)}`);
    console.log(`   Source: ${sourceMetadata.width}×${sourceMetadata.height}`);
    console.log(`   Optimized: ${metadata.width}×${metadata.height} (${outputSizeKB} KiB)`);

    if (totalOriginalSize > 0) {
      const savings = ((1 - outputStats.size / (totalOriginalSize / 2)) * 100).toFixed(1);
      console.log(`   Estimated savings: ${savings}%\n`);
    } else {
      console.log('');
    }
  }

  if (totalOriginalSize > 0) {
    const totalOriginalKB = (totalOriginalSize / 1024).toFixed(1);
    const totalOptimizedKB = (totalOptimizedSize / 1024).toFixed(1);
    const totalSavings = ((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1);

    console.log('📊 SUMMARY:');
    console.log(`   Original total: ${totalOriginalKB} KiB (665×809px)`);
    console.log(`   Optimized total: ${totalOptimizedKB} KiB (567×690px)`);
    console.log(`   Total savings: ${totalSavings}%\n`);
  }

  console.log('✅ Hero image optimization complete!');
  console.log('📋 Expected PageSpeed impact: +2-3 points, -27.8 KiB');
}

generateHeroImages().catch(console.error);

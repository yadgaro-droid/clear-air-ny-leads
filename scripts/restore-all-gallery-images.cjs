const fs = require('fs');
const path = require('path');

function restoreAllGalleryImages() {
  const timestamp = process.argv[2];

  if (!timestamp) {
    console.error('❌ Error: Please provide a timestamp');
    console.log('Usage: node scripts/restore-all-gallery-images.cjs <timestamp>');
    console.log('Example: node scripts/restore-all-gallery-images.cjs 2025-12-31T00-11-26');
    process.exit(1);
  }

  const publicDir = path.join(__dirname, '..', 'public', 'images', 'before-after');

  const imagePairs = [
    { name: 'vent-opening', files: ['before', 'after'] },
    { name: 'rigid-opening', files: ['before', 'after'] },
    { name: 'duct-interior', files: ['before', 'after'] }
  ];

  console.log(`🔄 Restoring all gallery images from backup (${timestamp})...\n`);

  let restoreCount = 0;

  imagePairs.forEach(pair => {
    pair.files.forEach(type => {
      const backupFile = path.join(publicDir, `${pair.name}-${type}-backup-${timestamp}.jpeg`);
      const targetFile = path.join(publicDir, `${pair.name}-${type}.jpeg`);

      if (fs.existsSync(backupFile)) {
        fs.copyFileSync(backupFile, targetFile);
        console.log(`✅ Restored: ${pair.name}-${type}.jpeg`);
        restoreCount++;
      } else {
        console.log(`⚠️  Backup not found: ${pair.name}-${type}-backup-${timestamp}.jpeg`);
      }
    });
  });

  console.log(`\n✅ Restore complete! ${restoreCount} files restored.`);
}

restoreAllGalleryImages();

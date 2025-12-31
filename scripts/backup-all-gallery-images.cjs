const fs = require('fs');
const path = require('path');

function backupAllGalleryImages() {
  const publicDir = path.join(__dirname, '..', 'public', 'images', 'before-after');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);

  const imagePairs = [
    { name: 'vent-opening', files: ['before', 'after'] },
    { name: 'rigid-opening', files: ['before', 'after'] },
    { name: 'duct-interior', files: ['before', 'after'] }
  ];

  console.log(`📦 Creating backup of all gallery images (${timestamp})...\n`);

  let backupCount = 0;

  imagePairs.forEach(pair => {
    pair.files.forEach(type => {
      const sourceFile = path.join(publicDir, `${pair.name}-${type}.jpeg`);
      const backupFile = path.join(publicDir, `${pair.name}-${type}-backup-${timestamp}.jpeg`);

      if (fs.existsSync(sourceFile)) {
        fs.copyFileSync(sourceFile, backupFile);
        console.log(`✅ Backed up: ${pair.name}-${type}.jpeg`);
        backupCount++;
      } else {
        console.log(`⚠️  Not found: ${pair.name}-${type}.jpeg`);
      }
    });
  });

  console.log(`\n📦 Backup complete! ${backupCount} files backed up.`);
  console.log(`Timestamp: ${timestamp}`);
  console.log(`\nTo restore, run: node scripts/restore-all-gallery-images.cjs ${timestamp}`);
}

backupAllGalleryImages();

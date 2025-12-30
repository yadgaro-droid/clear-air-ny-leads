const fs = require('fs');
const path = require('path');

function restoreDuctInteriorImages() {
  const publicDir = path.join(__dirname, '..', 'public', 'images', 'before-after');

  const backupBefore = path.join(publicDir, 'duct-interior-before-backup.jpeg');
  const backupAfter = path.join(publicDir, 'duct-interior-after-backup.jpeg');

  const beforeOutput = path.join(publicDir, 'duct-interior-before.jpeg');
  const afterOutput = path.join(publicDir, 'duct-interior-after.jpeg');

  console.log('🔄 Restoring duct interior images from backup...');

  if (fs.existsSync(backupBefore)) {
    fs.copyFileSync(backupBefore, beforeOutput);
    console.log('✅ Restored BEFORE image');
  } else {
    console.log('⚠️  No BEFORE backup found');
  }

  if (fs.existsSync(backupAfter)) {
    fs.copyFileSync(backupAfter, afterOutput);
    console.log('✅ Restored AFTER image');
  } else {
    console.log('⚠️  No AFTER backup found');
  }

  console.log('✅ Restore complete!');
}

restoreDuctInteriorImages();

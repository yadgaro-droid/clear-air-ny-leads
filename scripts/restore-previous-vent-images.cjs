const fs = require('fs');
const path = require('path');

// Restore the previous version of vent opening images
const publicDir = path.join(__dirname, '..', 'public', 'images', 'before-after');

const beforeBackup = path.join(publicDir, 'vent-opening-before-backup.jpeg');
const afterBackup = path.join(publicDir, 'vent-opening-after-backup.jpeg');
const beforeCurrent = path.join(publicDir, 'vent-opening-before.jpeg');
const afterCurrent = path.join(publicDir, 'vent-opening-after.jpeg');

console.log('🔄 Restoring previous vent opening images...\n');

// Check if backups exist
if (!fs.existsSync(beforeBackup) || !fs.existsSync(afterBackup)) {
  console.log('❌ Backup files not found!');
  console.log('Looking for:');
  console.log('  -', beforeBackup);
  console.log('  -', afterBackup);
  process.exit(1);
}

// Restore backups
fs.copyFileSync(beforeBackup, beforeCurrent);
fs.copyFileSync(afterBackup, afterCurrent);

console.log('✅ Restored:', beforeCurrent);
console.log('✅ Restored:', afterCurrent);
console.log('\n🎯 Previous version has been restored!');
console.log('Refresh your browser to see the changes.');

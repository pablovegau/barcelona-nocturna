#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'fs';
import { glob } from 'glob';

console.log('🔄 Restoring pages after testing build...');

// Find all backup files
const backupFiles = glob.sync('src/**/*.backup');

if (backupFiles.length === 0) {
  console.log('ℹ️  No backup files found');
  process.exit(0);
}

// Restore files from backup
backupFiles.forEach(backupPath => {
  const originalPath = backupPath.replace('.backup', '');
  
  if (existsSync(backupPath)) {
    const backupContent = readFileSync(backupPath, 'utf8');
    writeFileSync(originalPath, backupContent);
    unlinkSync(backupPath);
    
    console.log(`🔙 Restored: ${originalPath}`);
  }
});

console.log('✅ All files restored to original state'); 
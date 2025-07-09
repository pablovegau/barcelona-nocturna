#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

console.log('🔧 Preparing pages for static testing build...');

// Files to modify for testing
const filesToModify = [
  {
    path: 'src/pages/characters.astro',
    modifications: [
      {
        from: 'export const prerender = false;',
        to: '// export const prerender = false; // Temporarily disabled for testing'
      },
      {
        from: 'const selectedClans = getSearchParamAsArray(Astro.url, \'clan\');',
        to: 'const selectedClans: string[] = []; // Default for testing'
      },
      {
        from: 'const selectedEntityTypes = getSearchParamAsArray(Astro.url, \'entityType\');',
        to: 'const selectedEntityTypes: string[] = []; // Default for testing'
      },
      {
        from: 'const selectedFactions = getSearchParamAsArray(Astro.url, \'faction\');',
        to: 'const selectedFactions: string[] = []; // Default for testing'
      }
    ]
  }
];

// Create backup and modify files
filesToModify.forEach(({ path, modifications }) => {
  const fullPath = resolve(path);
  const originalContent = readFileSync(fullPath, 'utf8');
  
  // Create backup
  const backupPath = `${fullPath}.backup`;
  writeFileSync(backupPath, originalContent);
  console.log(`📄 Created backup: ${backupPath}`);
  
  // Apply modifications
  let modifiedContent = originalContent;
  modifications.forEach(({ from, to }) => {
    modifiedContent = modifiedContent.replace(from, to);
  });
  
  writeFileSync(fullPath, modifiedContent);
  console.log(`✏️  Modified: ${path}`);
});

console.log('✅ Files prepared for testing build'); 
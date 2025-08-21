const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

console.log('🚀 Starting Real Estate Abroad CMS...');

// Ensure database directory exists
const tmpDir = path.join(__dirname, '.tmp');
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir, { recursive: true });
  console.log('✅ Created .tmp directory');
}

// Create empty database file if it doesn't exist
const dbPath = path.join(tmpDir, 'data.db');
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, '');
  console.log('✅ Created SQLite database file');
}

// Start Strapi
console.log('🚀 Starting Strapi...');
const strapi = spawn('npm', ['run', 'start:strapi'], {
  stdio: 'inherit',
  env: { ...process.env }
});

strapi.on('close', (code) => {
  console.log(`Strapi process exited with code ${code}`);
  process.exit(code);
});
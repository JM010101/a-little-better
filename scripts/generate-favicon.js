// Simple script to generate favicon.ico placeholder
// Note: For production, use a proper tool like sharp or imagemagick
// This creates a basic SVG that browsers can use

const fs = require('fs');
const path = require('path');

// Create a simple SVG favicon
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#00d4ff;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#00ff88;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#b400ff;stop-opacity:1" />
    </linearGradient>
  </defs>
  <circle cx="16" cy="16" r="15" fill="url(#grad)" opacity="0.9"/>
  <path d="M 10 16 L 16 10 M 16 10 L 22 10 M 16 10 L 16 22" 
        stroke="white" 
        stroke-width="2.5" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        fill="none"/>
  <circle cx="20" cy="12" r="1.5" fill="white"/>
</svg>`;

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent);
console.log('✅ Favicon SVG created successfully');


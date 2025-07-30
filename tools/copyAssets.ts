import fs from 'fs';
import path from 'path';

const copyRecursive = (src: string, dest: string) => {
  const stats = fs.statSync(src);
  
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    const files = fs.readdirSync(src);
    for (const file of files) {
      copyRecursive(path.join(src, file), path.join(dest, file));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
};

const copyAssets = () => {
  try {
    const configSrc = path.join(__dirname, '../config');
    const configDest = path.join(__dirname, '../dist/config');
    
    copyRecursive(configSrc, configDest);
    
    console.log('Config files copied to dist/config');
  } catch (error) {
    console.error('Error copying assets:', error);
    process.exit(1);
  }
};

copyAssets();
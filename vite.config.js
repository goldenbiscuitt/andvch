import { defineConfig } from 'vite'
import { resolve } from 'path'
import fs from 'fs'
import path from 'path'

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  const entries = fs.readdirSync(src, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.name === '.DS_Store') continue

    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

function copyAssetsPlugin() {
  return {
    name: 'copy-assets-plugin',
    closeBundle() {
      const src = resolve(__dirname, 'assets/img')
      const dest = resolve(__dirname, 'dist/assets/img')
      if (fs.existsSync(src)) {
        copyDir(src, dest)
      }
      
      // Copy .nojekyll to dist root
      const nojekyllSrc = resolve(__dirname, '.nojekyll')
      const nojekyllDest = resolve(__dirname, 'dist/.nojekyll')
      if (fs.existsSync(nojekyllSrc)) {
        fs.copyFileSync(nojekyllSrc, nojekyllDest)
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/andvch/', // Use absolute repository path for GitHub Pages
  plugins: [copyAssetsPlugin()],
  build: {
    cssMinify: 'esbuild', // Prevent Lightning CSS from stripping unprefixed backdrop-filter properties
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        project: resolve(__dirname, 'project.html')
      }
    }
  }
})


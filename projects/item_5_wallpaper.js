export default {
  id: 'wallpaper',
  title: 'Favorite Wallpaper',
  description: 'Sharing my absolute favorite desktop and mobile backdrop, along with high-res download options and a preview of an upcoming interactive, canvas-driven generative wallpaper generation page.',
  visuals: `
    <div class="project-visual p-vis-wallpaper-1">
      <img src="assets/img/fav_wallpaper.webp" alt="Favorite Wallpaper" class="wallpaper-large-img" loading="lazy" draggable="false">
    </div>
    <div class="project-visual p-vis-wallpaper-2">
      <div class="p-details-box">
        <span class="p-category">Curated Art</span>
        <h3>Aesthetic & Download</h3>
        <p>This wallpaper is selected for its high-definition visual appeal, smooth gradients, and balanced layout. It makes any digital workspace feel premium and clean. Click below to download the high-resolution file directly.</p>
        <div class="download-container" style="margin-top: 30px; display: flex; gap: 16px; flex-wrap: wrap;">
          <a href="assets/img/fav_wallpaper.png" download="fav_wallpaper.png" class="download-btn magnetic-link" style="text-decoration: none;">
            <span class="btn-arrow">&darr;</span> <span class="btn-text">download wallpaper</span>
          </a>
          <a href="https://4kwallpapers.com/abstract/windows-11-stock-orange-abstract-dark-background-8960.html" target="_blank" rel="noopener noreferrer" class="download-btn magnetic-link" style="text-decoration: none;">
            <span class="btn-arrow">&rarr;</span> <span class="btn-text">download original size</span>
          </a>
        </div>
        <p class="attribution-text" style="font-size: 0.8rem; margin-top: 24px; opacity: 0.5; font-family: var(--font-mono); line-height: 1.5;">
          Wallpaper attribution &amp; copyright &copy; <a href="https://4kwallpapers.com" target="_blank" rel="noopener noreferrer" style="color: var(--text-primary); text-decoration: underline;">4kwallpapers.com</a>.
        </p>
      </div>
    </div>
    <div class="project-visual p-vis-wallpaper-3">
      <div class="p-details-box">
        <span class="p-category">Future Vision</span>
        <h3>Generative Canvas Creator</h3>
        <p>I plan on creating a simple wallpaper generation page soon. By leveraging procedural generation, noise synthesis, and interactive color controls, users will be able to customize, generate, and export their own unique high-resolution wallpapers in real-time.</p>
      </div>
    </div>
  `
};

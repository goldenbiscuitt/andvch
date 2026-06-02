export default {
  id: 'ambient',
  title: 'Ambient Gradient Flow',
  description: 'Exploring dynamic mesh gradients, color transitions, and text clipping techniques to create immersive ambient backgrounds. Backgrounds that shift slowly like digital lava.',
  visuals: `
    <div class="project-visual p-vis-ambient-1">
      <video src="assets/img/ambient.c1027bf9.webm" autoplay loop muted playsinline class="ambient-video" draggable="false"></video>
      <div class="ambient-text-glow">FLOW</div>
    </div>
    <div class="project-visual p-vis-ambient-2">
      <div class="p-details-box">
        <span class="p-category">Digital Art</span>
        <h3>Interactive Mesh Transitions</h3>
        <p>By shifting the position of three large radial gradients via CSS, we achieve a liquid, fluid animation that makes the screen feel organic, soft, and alive.</p>
      </div>
    </div>
  `,
  attribution: 'Originally designed by Adrian Zumbrunnen (https://azumbrunnen.me/)'
};

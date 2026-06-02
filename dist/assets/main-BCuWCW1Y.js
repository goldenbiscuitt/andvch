(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function s(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=s(i);fetch(i.href,o)}})();const pe={id:"wish",title:"Wish 107.5 Concept",titleHtml:'<a href="https://wish1075.com" target="_blank" rel="noopener noreferrer" class="wish-title-link">Wish 107.5 App</a> Concept',description:"Redesigning the visual and interactive identity of Wish 107.5 Mobile App. Bringing high-fidelity live audio broadcasts together with modern interfaces.",visuals:`
    <div class="project-visual p-vis-wish-mocks">
      <img src="assets/img/wish_project/wish_mock_1.png" alt="Wish Mock 1" class="mobile-mock-reveal" draggable="false">
      <img src="assets/img/wish_project/wish_mock_2.png" alt="Wish Mock 2" class="mobile-mock-reveal" draggable="false">
      <img src="assets/img/wish_project/wish_mock_3.png" alt="Wish Mock 3" class="mobile-mock-reveal" draggable="false">
    </div>
    <div class="project-visual p-vis-wish-3">
      <div class="p-details-box">
        <span class="p-category">Mobile App Concept</span>
        <h3>Sneak Peek</h3>
        <p>This is a sneakpeek of the new Wish1075 Mobile App that includes your favourite Wishclusives available offline and within one app, stream high quality wishclusives, Live Digital Radio Streaming, and Intuitive Mobile App Experience.</p>
      </div>
    </div>
    <div class="project-visual p-vis-wish-1">
      <div class="wish-logo-container">
        <img src="https://cdn.prod.website-files.com/66e1987f36e4944240bc5ab8/6701637328a69477c92c2652_Wish-Logo.svg" alt="Wish 107.5 Logo" class="wish-logo-img-detail" draggable="false">
      </div>
      <div class="wish-reveal-content">
        <h3 class="wish-reveal-title">Treat yourself to good music.</h3>
        <p class="wish-reveal-desc">Music is a language of its own. At Wish 107.5, you can enjoy this art form in many ways — be it through the radio, a musical vehicle, or recorded performances accessible on demand.</p>
        <div class="wish-btn-group">
          <a href="https://wish1075.com" target="_blank" rel="noopener noreferrer" class="wish-action-btn magnetic-link">
            <span class="btn-text">Listen</span>
          </a>
          <a href="https://www.youtube.com/@WishFM1075official" target="_blank" rel="noopener noreferrer" class="wish-action-btn secondary-btn magnetic-link">
            <span class="btn-text">Subscribe</span>
          </a>
        </div>
      </div>
    </div>
    <div class="p-vis-wish-disclaimer">
      <p class="wish-disclaimer-text">This is a mockup presented to wish1075 and is not yet implemented. this project isn't directly associated with wish1075 yet, and/or accepts any payment to do so.</p>
    </div>
  `},ge={id:"orb",title:"The Orb Project",description:"An interactive, web-based physics simulation exploring gravitational pull, organic particle systems, and color blending inside a virtual glass sphere. Built with custom shaders and HTML5 Canvas.",visuals:`
    <div class="project-visual p-vis-orb-1">
      <div class="physics-sphere">
        <div class="glow-orb"></div>
      </div>
    </div>
    <div class="project-visual p-vis-orb-2">
      <div class="p-details-box">
        <span class="p-category">Creative Coding</span>
        <h3>Liquid Physics & Gravity Fields</h3>
        <p>A canvas element rendering 2,000 active particles responding to cursor proximity, magnetic boundaries, and friction constants inside a glass-morphic circular boundary.</p>
      </div>
    </div>
  `},me={id:"medium",title:"Medium 12 DP Grid",description:"A typographic experiment focusing on structural grid alignments, precise vertical rhythms, and layout configurations built entirely with 12 DP baseline grids. Every typographic element snaps to strict vertical lines.",visuals:`
    <div class="project-visual p-vis-medium-1">
      <div class="grid-spec-layout">
        <div class="grid-spec-line"></div>
        <div class="grid-spec-line"></div>
        <div class="grid-spec-line"></div>
        <div class="grid-spec-text">12 DP BASELINE SYSTEM</div>
      </div>
    </div>
    <div class="project-visual p-vis-medium-2">
      <div class="p-details-box">
        <span class="p-category">Design Engineering</span>
        <h3>Mathematical Layout Rhythms</h3>
        <p>Analyzing horizontal grids, font heights, and gutters. Every margin, padding, line height, and element dimension is mathematically derived from a 12px / 12dp grid token system.</p>
      </div>
    </div>
  `,attribution:"Originally designed by Adrian Zumbrunnen (https://azumbrunnen.me/)"},ve={id:"e",title:"Apple Design Study",description:"An exploration of dynamic motion, material rendering, and circular geometries in modern hardware product interfaces.",visuals:`
    <div class="project-visual p-vis-e-1">
      <video src="assets/img/apple.webm" autoplay loop muted playsinline class="apple-large-video" draggable="false" style="width: 100%; height: 100%; object-fit: cover;"></video>
    </div>
    <div class="project-visual p-vis-e-2">
      <div class="p-details-box">
        <span class="p-category">Motion Graphics</span>
        <h3>Apple Design Language</h3>
        <p>A study focusing on continuous animations, smooth transformations, and organic movement patterns within a circular interface layout.</p>
      </div>
    </div>
  `},ue={id:"wallpaper",title:"Favorite Wallpaper",description:"Sharing my absolute favorite desktop and mobile backdrop, along with high-res download options and a preview of an upcoming interactive, canvas-driven generative wallpaper generation page.",visuals:`
    <div class="project-visual p-vis-wallpaper-1">
      <img src="assets/img/fav_wallpaper.png" alt="Favorite Wallpaper" class="wallpaper-large-img" draggable="false">
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
  `},he={id:"directory-app",title:"Map Project",description:"An interactive mapping and geospatial visualization application designed for location intelligence, route optimization, and spatial asset management.",visuals:`
    <div class="project-visual p-vis-directory-1">
      <img src="assets/img/directory-app/map_project_1.png" alt="Map Project Cover" class="directory-large-img" draggable="false">
    </div>
    <div class="project-visual p-vis-directory-2">
      <div class="p-details-box">
        <span class="p-category">Geospatial Visualization</span>
        <h3>Interactive Location Intelligence</h3>
        <p>An intuitive spatial analytics platform designed to visualize location data, track assets, and map physical networks. I managed the project, and spearheaded the development from foundation to release, decreased cost by around 90% by optimizing document reads and user traffic of around 2million traffic reads.</p>
      </div>
    </div>
    <div class="project-visual p-vis-directory-3">
      <img src="assets/img/directory-app/map_project_2.png" alt="Map Analytics Interface" class="report-img" draggable="false" style="width: 100%; height: auto; display: block;">
    </div>
    <div class="project-visual p-vis-directory-4">
      <div class="p-details-box">
        <span class="p-category">Spatial Analytics</span>
        <h3>Advanced Routing & Analysis</h3>
        <p>Comprehensive geospatial insights displaying optimized routing path layouts, spatial queries, and geographic boundaries. My roles in this project is not only to deliver in a timely manner, but deliver with security in mind, this system is as robust as Google Maps itself, and prevents overusage and delivers quality geospatial information of the client's asset.</p>
      </div>
    </div>
    <div class="project-visual p-vis-directory-5">
      <img src="assets/img/directory-app/map_project_3.png" alt="Routing and Boundaries" class="report-img" draggable="false" style="width: 100%; height: auto; display: block;">
    </div>
    <div class="project-visual p-vis-directory-4">
      <div class="p-details-box">
        <span class="p-category">Responsive Design</span>
        <h3>Mobile Web Experience</h3>
        <p>Designed with a mobile-first responsive layout to provide field teams and on-the-go administrators with access to high-fidelity geospatial intelligence, user discovery, and real-time asset updates.</p>
      </div>
    </div>
    <div class="project-visual p-vis-directory-mocks">
      <img src="assets/img/directory-app/mobile_mock_1.png" alt="Mobile View 1" class="mobile-mock-reveal" draggable="false">
      <img src="assets/img/directory-app/mobile_mock_2.png" alt="Mobile View 2" class="mobile-mock-reveal" draggable="false">
      <img src="assets/img/directory-app/mobile_mock_3.png" alt="Mobile View 3" class="mobile-mock-reveal" draggable="false">
    </div>
  `},ye={id:"car",title:"Neon Cyberpunk Car",description:"A retro-futuristic vector drawing and animation study, featuring glowing cyan and yellow neon outlines, rotating wheels, and parallax movement. Relive the synthwave arcade aesthetics.",visuals:`
    <div class="project-visual p-vis-car-1">
      <div class="neon-car-large">
        <div class="car-body-large"></div>
        <div class="car-wheel-large wl1"></div>
        <div class="car-wheel-large wl2"></div>
      </div>
    </div>
    <div class="project-visual p-vis-car-2">
      <div class="p-details-box">
        <span class="p-category">Motion Design</span>
        <h3>Vector Outlining & Neon Trails</h3>
        <p>Constructed entirely using native HTML tags and CSS borders. Wheels rotate continuously while a glow keyframe creates neon pulsations to simulate speed and cybernetic motion.</p>
      </div>
    </div>
  `,attribution:"Originally designed by Adrian Zumbrunnen (https://azumbrunnen.me/)"},fe={id:"grad",title:"AND. VCH Brand Identity",description:"The foundational design system and visual language of AND. VCH. Exploring how high-contrast layouts, deep dark gradients, and modular typography systems define identity.",visuals:`
    <div class="project-visual p-vis-grad-1">
      <img src="assets/img/main_logo.jpg" alt="AND. VCH Logo" class="brand-logo-large" draggable="false">
    </div>
    <div class="project-visual p-vis-grad-2">
      <div class="p-details-box">
        <span class="p-category">Branding System</span>
        <h3>Minimalist Identity & High Contrast</h3>
        <p>A unified identity framework representing precision, minimal lines, and contrast. Featuring typographic grids, custom typography tokens, and a monochrome editorial feel.</p>
      </div>
    </div>
  `},we={id:"voice",title:"PinasSalin",description:"A Filipino Sign Language (FSL) translation platform bridging communication gaps between local dialects, international languages, and sign language.",visuals:`
    <div class="project-visual p-vis-voice-1">
      <img src="assets/img/pinassalin/pinassalin_demo_1.jpg" alt="PinasSalin Translation Interface" class="pinassalin-large-img" draggable="false">
    </div>
    <div class="project-visual p-vis-voice-2">
      <div class="p-details-box">
        <span class="p-category">FSL Translation Platform</span>
        <h3>Bridging Dialects and Sign Languages</h3>
        <p>PinasSalin is a Filipino Sign Language Translation platform. It enables users to translate local dialects into local and international languages, and also enables sign language to be translated to each language, creating a truly inclusive, multi-way communication bridge.</p>
      </div>
    </div>
    <div class="project-visual p-vis-voice-3">
      <img src="assets/img/pinassalin/pinassalin_demo_2.jpg" alt="PinasSalin Real-time Recognition" class="report-img" draggable="false" style="width: 100%; height: auto; display: block;">
    </div>
    <div class="project-visual p-vis-voice-4">
      <div class="p-details-box">
        <span class="p-category">Adaptive Communication</span>
        <h3>Bidirectional Multi-lingual Engine</h3>
        <p>Built with accessibility in mind, PinasSalin translates regional dialects into both domestic and international written or spoken languages. Simultaneously, it maps sign language gestures to text or audio outputs, allowing sign language users to communicate fluently with others in their native languages.</p>
      </div>
    </div>
    <div class="project-visual p-vis-voice-5">
      <img src="assets/img/pinassalin/pinassalin_demo_3.jpg" alt="PinasSalin Speech and Text Translation" class="report-img" draggable="false" style="width: 100%; height: auto; display: block;">
    </div>
    <div class="project-visual p-vis-voice-disclaimer">
      <p class="voice-disclaimer-text">Note: PinasSalin is currently in demo mode. The team is actively refining translation datasets and gesture recognition to support more regional dialects and sign variations.</p>
    </div>
  `},be={id:"g",title:"Google Cloth Design Study",description:"A photographic study capturing high-contrast fabric textures, physical folds, and micro-weaves of fabric design under macro lighting.",visuals:`
    <div class="project-visual p-vis-g-1">
      <img src="assets/img/googlecloth.jpg" alt="Google Cloth Detail" class="googlecloth-large-img" draggable="false" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
    <div class="project-visual p-vis-g-2">
      <div class="p-details-box">
        <span class="p-category">Textile Design Study</span>
        <h3>Google Cloth Textures</h3>
        <p>This macro photographic analysis explores high-contrast woven fabric structures, soft folds, and texture depths under specialized lighting conditions.</p>
      </div>
    </div>
  `,attribution:"Originally designed by Adrian Zumbrunnen (https://azumbrunnen.me/)"},xe={id:"ambient",title:"Ambient Gradient Flow",description:"Exploring dynamic mesh gradients, color transitions, and text clipping techniques to create immersive ambient backgrounds. Backgrounds that shift slowly like digital lava.",visuals:`
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
  `,attribution:"Originally designed by Adrian Zumbrunnen (https://azumbrunnen.me/)"},Le={id:"yellow",title:"Yellow Box Geometry",description:"An abstract art piece combining rigid yellow rectangular outlines with fluid, offset pink circles to study visual balance and asymmetry in a CSS layout.",visuals:`
    <div class="project-visual p-vis-yellow-1">
      <img src="assets/img/one.png" alt="Yellow Box Detail" class="yellow-large-img" draggable="false" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
    <div class="project-visual p-vis-yellow-2">
      <div class="p-details-box">
        <span class="p-category">Abstract Art Study</span>
        <h3>Asymmetrical Compositions</h3>
        <p>This design experiment explores visual weight, spatial balance, and the contrast between sharp rectangular borders and circular color fills.</p>
      </div>
    </div>
  `,attribution:"Originally designed by Adrian Zumbrunnen (https://azumbrunnen.me/)"},je={id:"m",title:"The M Outline Study",description:"An outline typography study focused on the stroke-width, alignment, and transparent fill of modern geometric letterforms, creating a stencil effect.",visuals:`
    <div class="project-visual p-vis-m-1">
      <div class="giant-glyph-m">M</div>
    </div>
    <div class="project-visual p-vis-m-2">
      <div class="p-details-box">
        <span class="p-category">Outline Typography</span>
        <h3>Negative Space & Silhouette</h3>
        <p>A bold outline study. By using transparent fills and stroke values on large typographic shapes, the letters merge seamlessly with grid lines underneath.</p>
      </div>
    </div>
  `,attribution:"Originally designed by Adrian Zumbrunnen (https://azumbrunnen.me/)"},Ee={id:"32",title:"Project 23 Graphic Layout",description:"A high-fidelity graphic showcase highlighting abstract textured elements and mixed media composition, blending retro photography with modern 3D shapes.",visuals:`
    <div class="project-visual p-vis-32-1">
      <img src="assets/img/23.png" alt="23" class="graphic-23-large" draggable="false">
    </div>
    <div class="project-visual p-vis-32-2">
      <div class="p-details-box">
        <span class="p-category">Graphic Composition</span>
        <h3>Layered Mixed Media Layouts</h3>
        <p>A collage layout showing how noise overlays, half-tone details, and retro photography blend together into a modern visual statement.</p>
      </div>
    </div>
  `},ke={id:"green",title:"Google Watch Concept",description:"A concept study and motion design layout exploring dynamic interfaces, ambient watch faces, and tactile hardware design.",visuals:`
    <div class="project-visual p-vis-green-1">
      <video src="assets/img/watch.webm" autoplay loop muted playsinline class="green-large-video" draggable="false" style="width: 100%; height: 100%; object-fit: cover;"></video>
    </div>
    <div class="project-visual p-vis-green-2">
      <div class="p-details-box">
        <span class="p-category">Product Design Concept</span>
        <h3>Ambient Smartwatch Interfaces</h3>
        <p>This design explores fluid visual states on round smartwatch screens, focusing on responsive UI structures and context-aware animations.</p>
      </div>
    </div>
  `},Se={id:"watch",title:"AI Personal Contextualization",description:"Designing high-context, personal AI dashboards that learn and adapt to user habits, display context-relevant actions, and optimize routine workflows on smartwear.",visuals:`
    <div class="project-visual p-vis-watch-1">
      <img src="assets/img/AI_Personal_Contextualization.jpg" alt="AI Personal Contextualization" class="watch-large" draggable="false">
    </div>
    <div class="project-visual p-vis-watch-2">
      <div class="p-details-box">
        <span class="p-category">Product Design</span>
        <h3>Proactive Intelligence System</h3>
        <p>Instead of manual queries, the system uses proactive intelligence to surface actions based on calendars, locations, biometrics, and active app states.</p>
      </div>
    </div>
  `},Te={id:"smart",title:"PesoOS",description:"An upcoming operating system design exploration focusing on beautiful dark mode interface aesthetics, elegant typography, and smooth interactions.",visuals:`
    <div class="project-visual p-vis-smart-1">
      <svg id="LoadingLogo" data-name="Loading Logo" xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 1050 1050" class="pesoos-large-svg" aria-label="Loading..." draggable="false">
        <g>
          <path 
            fill="hsl(var(--primary))"
            opacity="0.25"
            d="M0,475C0,118.75,118.75,0,475,0s475,118.75,475,475-118.75,475-475,475S0,831.25,0,475"
            class="animate-wave-reveal origin-center"
            style="animation-delay: 0.4s;"
          />
          <circle 
            fill="hsl(var(--primary))"
            opacity="0.5"
            cx="475" cy="475" r="400" 
            class="animate-wave-reveal origin-center"
            style="animation-delay: 0.2s;"
          />
          <circle 
            fill="hsl(var(--primary))"
            opacity="0.75"
            cx="475" cy="475" r="300" 
            class="animate-wave-reveal origin-center"
            style="animation-delay: 0s;"
          />
          <circle fill="hsl(var(--primary))" cx="475" cy="475" r="200" />
        </g>
        <path fill="#fff" d="M335.33,426.51c1.17-12.04,13.22-25.63,25.82-25.63h15.56v-49.97c0-11.49,14.06-24.68,25.5-25.03,37.37,1.19,75.88-1.74,113.12-.06,67.45,3.04,114.36,68.38,95.02,133.46-12.48,41.99-51.12,71.9-95.02,73.77l-81.13-.02v66.44c0,12.6-13.59,24.64-25.63,25.81h-6.23c-3.11-.64-6.01-1.32-8.92-2.61-8.13-3.61-16.71-13.97-16.71-23.19v-66.44h-15.56c-9.45,0-20.08-9-23.57-17.44-1.1-2.67-1.61-5.39-2.25-8.18v-6.22c.64-3.11,1.32-6.01,2.62-8.92,3.61-8.12,14-16.71,23.2-16.71h15.56v-17.21h-15.56c-9.45,0-20.08-9-23.57-17.44-1.1-2.67-1.61-5.39-2.25-8.18.14-2.01-.19-4.24,0-6.22ZM434.2,475.56l80.39.02c56.46-6.12,56.48-86.16,0-92.28l-80.39.02v17.57h79.65c2.18,0,6.99,1.68,9.1,2.61,22.21,9.87,22.21,42.37,0,52.24-2.11.94-6.92,2.61-9.1,2.61h-79.65v17.21Z"/>
      </svg>
    </div>
    <div class="project-visual p-vis-smart-2">
      <div class="p-details-box">
        <span class="p-category">Operating System Design</span>
        <h3>PesoOS (Coming Soon)</h3>
        <p>A desktop environment reimagined from the ground up, built for simplicity, high performance, and deep aesthetics.</p>
      </div>
    </div>
  `},K=[pe,ge,me,ve,ue,he,ye,fe,we,be,xe,Le,je,Ee,ke,Se,Te];document.body.classList.add("fade-in");const W=document.getElementById("splash-screen");W&&setTimeout(()=>{W.classList.add("slide-up"),document.body.classList.add("splash-revealed"),document.body.classList.remove("splash-active"),setTimeout(()=>{W.style.display="none",W.remove()},1200)},3200);document.addEventListener("contextmenu",e=>{e.preventDefault()});const ie=[],ae=["bonjour.","hola.","nǐ hǎo.","ciao.","hallo.","olá.","namaste.","salaam.","hey.","hi."];let U=0;const j=document.getElementById("greeting");let J=!1;const ne=["view","explore","details","process","case"],Ce=document.querySelectorAll(".dense-card");Ce.forEach(e=>{if(!e.classList.contains("no-hover")){if(e.classList.contains("c-watch")){e.classList.add("has-overlay");const t=document.createElement("div");t.className="card-overlay watch-overlay",t.innerHTML='<span class="overlay-text watch-overlay-text">ai personal contextualization <br/> (coming soon)</span>',e.appendChild(t)}else if(e.classList.contains("c-smart")){e.classList.add("has-overlay");const t=document.createElement("div");t.className="card-overlay",t.innerHTML='<span class="overlay-text" style="text-transform: none;">PesoOS (soon)</span>',e.appendChild(t)}else if(e.classList.contains("c-orb")){e.classList.add("has-overlay");const t=document.createElement("div");t.className="card-overlay",t.innerHTML='<span class="overlay-text" style="text-transform: none;">experiments (soon)</span>',e.appendChild(t)}else if(e.classList.contains("c-car")){e.classList.add("has-overlay");const t=document.createElement("div");t.className="card-overlay",t.innerHTML='<span class="overlay-text" style="text-transform: none;">time experiment (soon)</span>',e.appendChild(t)}else if(e.classList.contains("c-voice")){e.classList.add("has-overlay");const t=document.createElement("div");t.className="card-overlay",t.innerHTML='<span class="overlay-text" style="text-transform: none;">FSL translator</span>',e.appendChild(t)}else if(e.classList.contains("c-wish")){e.classList.add("has-overlay");const t=document.createElement("div");t.className="card-overlay",t.innerHTML='<span class="overlay-text" style="text-transform: none;">wish app concept</span>',e.appendChild(t)}else if(e.classList.contains("c-wallpaper")){e.classList.add("has-overlay");const t=document.createElement("div");t.className="card-overlay",t.innerHTML='<span class="overlay-text" style="text-transform: none;">wavy fabric</span>',e.appendChild(t)}else if(e.classList.contains("c-directory-app")){e.classList.add("has-overlay");const t=document.createElement("div");t.className="card-overlay",t.innerHTML='<span class="overlay-text" style="text-transform: none;">Map Project</span>',e.appendChild(t)}else if(e.classList.contains("c-m")){e.classList.add("has-overlay");const t=document.createElement("div");t.className="card-overlay",t.innerHTML='<span class="overlay-text" style="text-transform: none;">mindful editor fork (soon)</span>',e.appendChild(t)}else if(e.classList.contains("c-green")){e.classList.add("has-overlay");const t=document.createElement("div");t.className="card-overlay",t.innerHTML='<span class="overlay-text" style="text-transform: none;">google watch concept (soon)</span>',e.appendChild(t)}else if(e.className.length%2===0){e.classList.add("has-overlay");const s=document.createElement("div");s.className="card-overlay";const n=ne[Math.floor(Math.random()*ne.length)];s.innerHTML=`<span class="overlay-text">${n}</span>`,e.appendChild(s)}}e.addEventListener("click",()=>{if(e.classList.contains("non-clickable"))return;const t=e.getAttribute("data-project-id");t?window.location.href=`project.html?id=${t}`:window.location.href="project.html"})});const Q=document.getElementById("project-title"),Me=document.getElementById("project-description"),N=document.getElementById("project-visuals-container"),$=document.getElementById("prev-project"),O=document.getElementById("next-project");if(Q){let e=!1;const s=new URLSearchParams(window.location.search).get("id")||"wish";let n=K.findIndex(p=>p.id===s);n===-1&&(n=0);const i=K[n];if(i.titleHtml?Q.innerHTML=i.titleHtml:Q.textContent=i.title,Me.textContent=i.description,N){N.innerHTML=i.visuals;const p=N.querySelector(".p-vis-directory-mocks, .p-vis-wish-mocks");if(p){const E=p.querySelectorAll(".mobile-mock-reveal"),H=()=>{if(window.innerWidth>768){const g=p.getBoundingClientRect(),c=g.top+window.scrollY;g.height;const u=window.innerHeight,h=document.documentElement.scrollHeight-u,L=c<u?0:c-u,y=c<u?Math.max(L+10,Math.min(h,c-u*.2)):h;let m=0;y>L?m=(window.scrollY-L)/(y-L):m=1,m=Math.max(0,Math.min(1,m)),E.forEach((C,w)=>{const D=0+w*.2,P=.6+w*.2;let M=0;m<D?M=0:m>P?M=1:M=(m-D)/(P-D),C.style.opacity=M,C.style.transform=`translateX(${(1-M)*-30}px)`})}else E.forEach(g=>{const c=g.getBoundingClientRect(),u=c.top+window.scrollY,x=c.height,h=window.innerHeight,y=document.documentElement.scrollHeight-h,m=u<h?0:u-h,C=u<h?Math.max(m+10,Math.min(y,u+x-h*.3)):Math.min(y,u+x-h*.3);let w=0;C>m?w=(window.scrollY-m)/(C-m):w=1,w=Math.max(0,Math.min(1,w)),g.style.opacity=w,g.style.transform=`translateX(${(1-w)*-30}px)`})};H(),window.addEventListener("scroll",H,{passive:!0}),window.addEventListener("resize",H,{passive:!0})}const v=N.querySelector(".p-vis-wish-1");if(v){const E=v.querySelector(".wish-logo-container"),H=v.querySelector(".wish-reveal-content"),k=v.querySelector(".wish-reveal-title"),g=v.querySelector(".wish-reveal-desc"),c=v.querySelector(".wish-btn-group"),u="Treat yourself to good music.";let x=null,h=!1,L=!1,y=!1,m=0;k&&(k.textContent=""),g&&(g.style.opacity="0",g.style.transform="translateY(10px)"),c&&(c.style.opacity="0",c.style.transform="translateY(10px)");const C=()=>{if(E&&v){const r=v.offsetWidth,f=E.offsetWidth,_=E.offsetLeft,Z=r/2-(_+f/2);v.style.setProperty("--shift-x",`${Z}px`)}},w=r=>{x&&clearInterval(x),k.textContent="",k.classList.add("typing"),g.style.opacity="0",g.style.transform="translateY(10px)",c.style.opacity="0",c.style.transform="translateY(10px)";let f=0;x=setInterval(()=>{f<u.length?(k.textContent+=u[f],f++):(clearInterval(x),k.classList.remove("typing"),g.style.transition="opacity 0.6s ease, transform 0.6s ease",g.style.opacity="1",g.style.transform="translateY(0)",setTimeout(()=>{!y&&r||(c.style.transition="opacity 0.6s ease, transform 0.6s ease",c.style.opacity="1",c.style.transform="translateY(0)",setTimeout(()=>{!y&&r||(L=!0,r&&z())},600))},300))},50)},D=()=>{x&&clearInterval(x),k.textContent="",k.classList.remove("typing"),g.style.transition="opacity 0.3s ease, transform 0.3s ease",g.style.opacity="0",g.style.transform="translateY(10px)",c.style.transition="opacity 0.3s ease, transform 0.3s ease",c.style.opacity="0",c.style.transform="translateY(10px)"},P=r=>{e&&(r.deltaY>0?r.preventDefault():z())},M=r=>{r.touches&&r.touches[0]&&(m=r.touches[0].clientY)},te=r=>{if(e&&r.touches&&r.touches[0]){const f=r.touches[0].clientY;m-f>0?r.preventDefault():z(),m=f}},se=r=>{e&&[32,34,40].includes(r.keyCode)&&r.preventDefault()},z=()=>{e=!1,window.removeEventListener("wheel",P),window.removeEventListener("touchstart",M),window.removeEventListener("touchmove",te),window.removeEventListener("keydown",se)},le=()=>{L=!1,y=!1,z(),v.classList.remove("slid-left"),D()},re=()=>{v.classList.add("slid-left"),setTimeout(()=>{y&&w(!0)},600)},V=()=>{const r=window.innerWidth>768,f=window.scrollY,_=v.getBoundingClientRect(),Z=_.top+f,ce=_.height,de=window.innerHeight,R=Z+ce/2-de/2;r&&E&&H?(f>=R&&!L&&(e||(e=!0,window.scrollTo({top:R,behavior:"smooth"}),window.addEventListener("wheel",P,{passive:!1}),window.addEventListener("touchstart",M,{passive:!0}),window.addEventListener("touchmove",te,{passive:!1}),window.addEventListener("keydown",se,{passive:!1})),y||(y=!0,re())),f<R-80&&(L||y)&&le()):E&&H&&(E.style.transform="none",y=!0,f>R?h||(h=!0,w(!1)):h&&(h=!1,D()))};C(),V(),window.addEventListener("scroll",V,{passive:!0}),window.addEventListener("resize",()=>{C(),V()},{passive:!0})}}const o=["orb","medium","e","grad","g","ambient","32","watch","smart","car","m","yellow","green"],d=K.filter(p=>!o.includes(p.id));let S=d.findIndex(p=>p.id===i.id);S===-1&&(S=0);const B=d[(S-1+d.length)%d.length],A=d[(S+1)%d.length],T=(p,v)=>{p.preventDefault(),document.body.classList.remove("fade-in"),document.body.classList.add("fade-out"),setTimeout(()=>{window.location.href=v},400)};$&&($.href=`project.html?id=${B.id}`,$.addEventListener("click",p=>T(p,$.href))),O&&(O.href=`project.html?id=${A.id}`,O.addEventListener("click",p=>T(p,O.href)));const X=document.querySelector(".project-header");if(X){const p=()=>{window.scrollY<=0?X.classList.remove("header-hidden"):X.classList.add("header-hidden")};p(),window.addEventListener("scroll",p,{passive:!0})}}function Ae(){!j||J||(J=!0,j.style.opacity="0",j.style.transform="translateY(5px)",setTimeout(()=>{U=(U+1)%ae.length,j.textContent=ae[U],j.style.transition="opacity 0.5s ease, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",j.style.opacity="1",j.style.transform="translateY(0)",setTimeout(()=>{J=!1,j.style.transition="opacity 0.4s ease, transform 0.4s ease"},500)},400))}j&&(j.style.transition="opacity 0.4s ease, transform 0.4s ease",setInterval(Ae,3500));const Ie={root:null,rootMargin:"0px",threshold:.15},oe=new IntersectionObserver((e,t)=>{e.forEach(s=>{s.isIntersecting&&(s.target.style.opacity="1",s.target.style.transform="translateY(0)",setTimeout(()=>{s.target.style&&(s.target.style.transform="none",s.target.style.transition="none")},1e3),t.unobserve(s.target))})},Ie);document.querySelectorAll(".project-card").forEach((e,t)=>{e.style.opacity="0",e.style.transform="translateY(40px)";const s=t%4*.1;e.style.transition=`opacity 0.8s ease ${s}s, transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) ${s}s`,oe.observe(e)});document.querySelectorAll(".list-section").forEach((e,t)=>{e.style.opacity="0",e.style.transform="translateY(30px)",e.style.transition="opacity 0.8s ease 0.1s, transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) 0.1s",oe.observe(e)});const a=document.getElementById("custom-cursor");let F;window.addEventListener("mousemove",e=>{a&&!a.classList.contains("card-mode")&&(a.style.transform=`translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`)});document.addEventListener("mouseover",e=>{const t=e.target;if(t.closest(".interaction-card, .magnetic-link")){a&&a.classList.remove("text-mode");return}if((["H1","P","SPAN","A","TEXTAREA"].includes(t.tagName)||t.classList.contains("spec-label")||t.classList.contains("spec-size"))&&!t.closest(".project-card.placeholder-1")&&!t.closest(".color-spheres-container")){const i=window.getComputedStyle(t);let o=parseFloat(i.lineHeight);(isNaN(o)||i.lineHeight==="normal")&&(o=parseFloat(i.fontSize)*1.2),a&&(a.classList.add("text-mode"),a.style.height=`${o}px`)}else a&&(a.classList.remove("text-mode"),a.style.height="")});document.querySelectorAll(".interaction-card, .magnetic-link").forEach(e=>{let t,s,n;e.addEventListener("mouseenter",i=>{var A;if(a){a.classList.add("card-mode"),a.classList.add("transitioning");const T=(A=e.querySelector(".btn-text"))==null?void 0:A.textContent.trim().toLowerCase();console.log("Hovering card, btn text:",T),T==="explore"&&a.classList.add("explore-hover"),clearTimeout(F),F=setTimeout(()=>{a.classList.remove("transitioning")},300)}t=e.getBoundingClientRect(),s=t.left+t.width/2,n=t.top+t.height/2,a&&(a.style.width=`${t.width}px`,a.style.height=`${t.height}px`,e.classList.contains("say-hi-btn")||e.classList.contains("social-link")||e.classList.contains("expand-btn")?a.style.borderRadius="9999px":a.style.borderRadius="24px"),e.style.transition="transform 0.1s ease-out, background-color 0.1s ease";const o=i.clientX-s,d=i.clientY-n,S=o*.03,B=d*.03;a&&(a.style.transform=`translate(${s+S}px, ${n+B}px) translate(-50%, -50%)`)}),e.addEventListener("mousemove",i=>{const o=i.clientX,d=i.clientY,S=o-s,B=d-n,A=S*.03,T=B*.03;e.style.transform=`translate(${A}px, ${T}px)`,a&&(a.style.transform=`translate(${s+A}px, ${n+T}px) translate(-50%, -50%)`)}),e.addEventListener("mouseleave",i=>{a&&(a.classList.remove("card-mode"),a.classList.remove("explore-hover"),a.classList.add("transitioning"),clearTimeout(F),F=setTimeout(()=>{a.classList.remove("transitioning")},300),a.style.width="",a.style.height="",a.style.borderRadius="",a.style.transform=`translate(${i.clientX}px, ${i.clientY}px) translate(-50%, -50%)`),e.style.transition="transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.3s ease",e.style.transform="translate(0px, 0px)"})});const l=document.getElementById("hero-say-hi");document.getElementById("message-overlay");const I=document.getElementById("message-input"),b=document.getElementById("msg-send-btn"),He=document.getElementById("hero-actions"),De=document.getElementById("message-actions");let ee=!1;l&&l.addEventListener("click",e=>{if(e.preventDefault(),document.body.classList.contains("session-active")){const t=l.getBoundingClientRect();He.appendChild(l);const s=l.querySelector(".btn-arrow"),n=l.querySelector(".btn-text");ee?(s&&(s.style.display="none"),n&&(n.innerHTML="thank you!")):(s&&(s.style.display="inline-block",s.innerHTML="&rarr;"),n&&(n.innerHTML="say hi")),document.body.classList.remove("session-active");const i=l.getBoundingClientRect(),o=t.left-i.left,d=t.top-i.top;l.style.transition="none",l.style.transform=`translate(${o}px, ${d}px)`,l.offsetWidth,l.style.transition="transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",l.style.transform="translate(0px, 0px)",setTimeout(()=>l.style.transition="",600)}else{ee=!1;const t=l.getBoundingClientRect();document.body.classList.add("session-active"),I.value="",b.classList.remove("fade-in"),b.classList.add("hidden"),De.insertBefore(l,b);const s=l.querySelector(".btn-arrow"),n=l.querySelector(".btn-text");s&&(s.style.display="inline-block",s.innerHTML="&larr;"),n&&(n.innerHTML="go back");const i=l.getBoundingClientRect(),o=t.left-i.left,d=t.top-i.top;l.style.transition="none",l.style.transform=`translate(${o}px, ${d}px)`,l.offsetWidth,l.style.transition="transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",l.style.transform="translate(0px, 0px)",setTimeout(()=>l.style.transition="",600),setTimeout(()=>I.focus(),600)}});I&&I.addEventListener("input",()=>{I.value.trim().length>0?b.classList.contains("hidden")&&(b.classList.remove("hidden"),b.classList.add("fade-in")):(b.classList.add("hidden"),b.classList.remove("fade-in"))});b&&b.addEventListener("click",()=>{ee=!0;let e=I.value.trim();e.length>250&&(e=e.substring(0,250));const t=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;");t.length>0&&(ie.push({id:Date.now(),text:t,timestamp:new Date().toISOString()}),console.log("Message added. Current DB:",ie)),confetti({particleCount:60,spread:70,origin:{y:.8},colors:["#ffffff","#00e5ff","#ff00ff"]}),b.classList.add("hidden"),b.classList.remove("fade-in"),setTimeout(()=>{l.click(),I.value=""},400)});const G=document.getElementById("write-expand-btn"),q=document.getElementById("write-extra");if(G&&q){const e=q.querySelectorAll(".article-item");G.addEventListener("click",t=>{t.preventDefault(),q.classList.contains("expanded")?(G.classList.remove("active"),q.classList.remove("expanded"),e.forEach(n=>{n.style.transitionDelay="0s"})):(G.classList.add("active"),q.classList.add("expanded"),e.forEach((n,i)=>{n.style.transitionDelay=`${.1+i*.05}s`}))})}document.querySelectorAll("img, a").forEach(e=>{e.addEventListener("dragstart",t=>t.preventDefault())});document.querySelectorAll(".write-card").forEach(e=>{const t=document.createElement("div");t.className="draft-overlay",t.innerHTML='<span class="draft-text">still in draft</span>',e.appendChild(t);let s=null;e.addEventListener("click",n=>{n.preventDefault(),t.classList.contains("active")?(t.classList.remove("active"),s&&(clearTimeout(s),s=null)):(t.classList.add("active"),s&&clearTimeout(s),s=setTimeout(()=>{t.classList.remove("active"),s=null},1500))})});const Y=document.querySelector(".explore-btn");if(Y){let e=null;Y.addEventListener("click",t=>{t.preventDefault(),Y.classList.contains("overlay-active")?(Y.classList.remove("overlay-active"),e&&(clearTimeout(e),e=null)):(Y.classList.add("overlay-active"),e&&clearTimeout(e),e=setTimeout(()=>{Y.classList.remove("overlay-active"),e=null},2e3))})}

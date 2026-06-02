(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function s(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(i){if(i.ep)return;i.ep=!0;const o=s(i);fetch(i.href,o)}})();const ye={id:"wish",title:"Wish 107.5 Concept",titleHtml:'<a href="https://wish1075.com" target="_blank" rel="noopener noreferrer" class="wish-title-link">Wish 107.5 App</a> Concept',description:"Redesigning the visual and interactive identity of Wish 107.5 Mobile App. Bringing high-fidelity live audio broadcasts together with modern interfaces.",visuals:`
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
  `},fe={id:"orb",title:"The Orb Project",description:"An interactive, web-based physics simulation exploring gravitational pull, organic particle systems, and color blending inside a virtual glass sphere. Built with custom shaders and HTML5 Canvas.",visuals:`
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
  `},we={id:"medium",title:"Medium 12 DP Grid",description:"A typographic experiment focusing on structural grid alignments, precise vertical rhythms, and layout configurations built entirely with 12 DP baseline grids. Every typographic element snaps to strict vertical lines.",visuals:`
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
  `,attribution:"Originally designed by Adrian Zumbrunnen (https://azumbrunnen.me/)"},be={id:"e",title:"Apple Design Study",description:"An exploration of dynamic motion, material rendering, and circular geometries in modern hardware product interfaces.",visuals:`
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
  `},xe={id:"wallpaper",title:"Favorite Wallpaper",description:"Sharing my absolute favorite desktop and mobile backdrop, along with high-res download options and a preview of an upcoming interactive, canvas-driven generative wallpaper generation page.",visuals:`
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
  `},Le={id:"directory-app",title:"Map Project",description:"An interactive mapping and geospatial visualization application designed for location intelligence, route optimization, and spatial asset management.",visuals:`
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
  `},Se={id:"car",title:"Neon Cyberpunk Car",description:"A retro-futuristic vector drawing and animation study, featuring glowing cyan and yellow neon outlines, rotating wheels, and parallax movement. Relive the synthwave arcade aesthetics.",visuals:`
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
  `,attribution:"Originally designed by Adrian Zumbrunnen (https://azumbrunnen.me/)"},ke={id:"grad",title:"AND. VCH Brand Identity",description:"The foundational design system and visual language of AND. VCH. Exploring how high-contrast layouts, deep dark gradients, and modular typography systems define identity.",visuals:`
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
  `},Ee={id:"voice",title:"PinasSalin",description:"A Filipino Sign Language (FSL) translation platform bridging communication gaps between local dialects, international languages, and sign language.",visuals:`
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
  `},je={id:"g",title:"Google Cloth Design Study",description:"A photographic study capturing high-contrast fabric textures, physical folds, and micro-weaves of fabric design under macro lighting.",visuals:`
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
  `,attribution:"Originally designed by Adrian Zumbrunnen (https://azumbrunnen.me/)"},Te={id:"ambient",title:"Ambient Gradient Flow",description:"Exploring dynamic mesh gradients, color transitions, and text clipping techniques to create immersive ambient backgrounds. Backgrounds that shift slowly like digital lava.",visuals:`
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
  `,attribution:"Originally designed by Adrian Zumbrunnen (https://azumbrunnen.me/)"},Ce={id:"yellow",title:"Yellow Box Geometry",description:"An abstract art piece combining rigid yellow rectangular outlines with fluid, offset pink circles to study visual balance and asymmetry in a CSS layout.",visuals:`
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
  `,attribution:"Originally designed by Adrian Zumbrunnen (https://azumbrunnen.me/)"},Me={id:"m",title:"The M Outline Study",description:"An outline typography study focused on the stroke-width, alignment, and transparent fill of modern geometric letterforms, creating a stencil effect.",visuals:`
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
  `,attribution:"Originally designed by Adrian Zumbrunnen (https://azumbrunnen.me/)"},Ae={id:"32",title:"Project 23 Graphic Layout",description:"A high-fidelity graphic showcase highlighting abstract textured elements and mixed media composition, blending retro photography with modern 3D shapes.",visuals:`
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
  `},Ie={id:"green",title:"Google Watch Concept",description:"A concept study and motion design layout exploring dynamic interfaces, ambient watch faces, and tactile hardware design.",visuals:`
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
  `},He={id:"watch",title:"AI Personal Contextualization",description:"Designing high-context, personal AI dashboards that learn and adapt to user habits, display context-relevant actions, and optimize routine workflows on smartwear.",visuals:`
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
  `},Ye={id:"smart",title:"PesoOS",description:"An upcoming operating system design exploration focusing on beautiful dark mode interface aesthetics, elegant typography, and smooth interactions.",visuals:`
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
  `},Q=[ye,fe,we,be,xe,Le,Se,ke,Ee,je,Te,Ce,Me,Ae,Ie,He,Ye];document.body.classList.add("fade-in");const Z=(e,t)=>{e&&e.preventDefault&&e.preventDefault(),document.body.classList.remove("fade-in"),document.body.classList.add("fade-out"),setTimeout(()=>{window.location.href=t},400)};document.querySelectorAll('a[href="index.html"]').forEach(e=>{e.addEventListener("click",t=>{Z(t,e.href)})});window.addEventListener("keydown",e=>{const t=e.key==="r"||e.key==="R"||e.keyCode===82||e.code==="KeyR";(e.ctrlKey||e.metaKey)&&e.shiftKey&&t&&sessionStorage.setItem("hard_refresh_triggered","true")});const z=document.getElementById("splash-screen");var de;const De=((de=performance.getEntriesByType("navigation")[0])==null?void 0:de.type)==="reload",Be=sessionStorage.getItem("hard_refresh_triggered")==="true";sessionStorage.removeItem("hard_refresh_triggered");z&&(De&&!Be?(z.remove(),document.body.classList.add("splash-revealed"),document.body.classList.remove("splash-active")):setTimeout(()=>{z.classList.add("slide-up"),document.body.classList.add("splash-revealed"),document.body.classList.remove("splash-active"),setTimeout(()=>{z.style.display="none",z.remove()},1200)},3200));document.addEventListener("contextmenu",e=>{e.preventDefault()});const le=[],re=["bonjour.","hola.","nǐ hǎo.","ciao.","hallo.","olá.","namaste.","salaam.","hey.","hi."];let ee=0;const E=document.getElementById("greeting");let te=!1;const ce=["view","explore","details","process","case"],Pe=document.querySelectorAll(".dense-card");Pe.forEach(e=>{if(!e.classList.contains("no-hover")){if(e.classList.contains("c-watch")){e.classList.add("has-overlay");const t=document.createElement("div");t.className="card-overlay watch-overlay",t.innerHTML='<span class="overlay-text watch-overlay-text">ai personal contextualization <br/> (coming soon)</span>',e.appendChild(t)}else if(e.classList.contains("c-smart")){e.classList.add("has-overlay");const t=document.createElement("div");t.className="card-overlay",t.innerHTML='<span class="overlay-text" style="text-transform: none;">PesoOS (soon)</span>',e.appendChild(t)}else if(e.classList.contains("c-orb")){e.classList.add("has-overlay");const t=document.createElement("div");t.className="card-overlay",t.innerHTML='<span class="overlay-text" style="text-transform: none;">experiments (soon)</span>',e.appendChild(t)}else if(e.classList.contains("c-car")){e.classList.add("has-overlay");const t=document.createElement("div");t.className="card-overlay",t.innerHTML='<span class="overlay-text" style="text-transform: none;">time experiment (soon)</span>',e.appendChild(t)}else if(e.classList.contains("c-voice")){e.classList.add("has-overlay");const t=document.createElement("div");t.className="card-overlay",t.innerHTML='<span class="overlay-text" style="text-transform: none;">FSL translator</span>',e.appendChild(t)}else if(e.classList.contains("c-wish")){e.classList.add("has-overlay");const t=document.createElement("div");t.className="card-overlay",t.innerHTML='<span class="overlay-text" style="text-transform: none;">wish app concept</span>',e.appendChild(t)}else if(e.classList.contains("c-wallpaper")){e.classList.add("has-overlay");const t=document.createElement("div");t.className="card-overlay",t.innerHTML='<span class="overlay-text" style="text-transform: none;">wavy fabric</span>',e.appendChild(t)}else if(e.classList.contains("c-directory-app")){e.classList.add("has-overlay");const t=document.createElement("div");t.className="card-overlay",t.innerHTML='<span class="overlay-text" style="text-transform: none;">Map Project</span>',e.appendChild(t)}else if(e.classList.contains("c-m")){e.classList.add("has-overlay");const t=document.createElement("div");t.className="card-overlay",t.innerHTML='<span class="overlay-text" style="text-transform: none;">mindful editor fork (soon)</span>',e.appendChild(t)}else if(e.classList.contains("c-green")){e.classList.add("has-overlay");const t=document.createElement("div");t.className="card-overlay",t.innerHTML='<span class="overlay-text" style="text-transform: none;">google watch concept (soon)</span>',e.appendChild(t)}else if(e.className.length%2===0){e.classList.add("has-overlay");const s=document.createElement("div");s.className="card-overlay";const a=ce[Math.floor(Math.random()*ce.length)];s.innerHTML=`<span class="overlay-text">${a}</span>`,e.appendChild(s)}}e.addEventListener("click",t=>{if(e.classList.contains("non-clickable"))return;const s=e.getAttribute("data-project-id"),a=s?`project.html?id=${s}`:"project.html";Z(t,a)})});const se=document.getElementById("project-title"),_e=document.getElementById("project-description"),O=document.getElementById("project-visuals-container"),F=document.getElementById("prev-project"),X=document.getElementById("next-project");if(se){let e=!1;const s=new URLSearchParams(window.location.search).get("id")||"wish";let a=Q.findIndex(d=>d.id===s);a===-1&&(a=0);const i=Q[a];if(i.titleHtml?se.innerHTML=i.titleHtml:se.textContent=i.title,_e.textContent=i.description,O){O.innerHTML=i.visuals;const d=O.querySelector(".p-vis-directory-mocks, .p-vis-wish-mocks");if(d){const T=d.querySelectorAll(".mobile-mock-reveal"),D=()=>{if(window.innerWidth>768){const g=d.getBoundingClientRect(),p=g.top+window.scrollY;g.height;const v=window.innerHeight,u=document.documentElement.scrollHeight-v,k=p<v?0:p-v,h=p<v?Math.max(k+10,Math.min(u,p-v*.2)):u;let m=0;h>k?m=(window.scrollY-k)/(h-k):m=1,m=Math.max(0,Math.min(1,m)),T.forEach((A,w)=>{const B=0+w*.2,R=.6+w*.2;let I=0;m<B?I=0:m>R?I=1:I=(m-B)/(R-B),A.style.opacity=I,A.style.transform=`translateX(${(1-I)*-30}px)`})}else T.forEach(g=>{const p=g.getBoundingClientRect(),v=p.top+window.scrollY,S=p.height,u=window.innerHeight,h=document.documentElement.scrollHeight-u,m=v<u?0:v-u,A=v<u?Math.max(m+10,Math.min(h,v+S-u*.3)):Math.min(h,v+S-u*.3);let w=0;A>m?w=(window.scrollY-m)/(A-m):w=1,w=Math.max(0,Math.min(1,w)),g.style.opacity=w,g.style.transform=`translateX(${(1-w)*-30}px)`})};D(),window.addEventListener("scroll",D,{passive:!0}),window.addEventListener("resize",D,{passive:!0})}const f=O.querySelector(".p-vis-wish-1");if(f){const T=f.querySelector(".wish-logo-container"),D=f.querySelector(".wish-reveal-content"),C=f.querySelector(".wish-reveal-title"),g=f.querySelector(".wish-reveal-desc"),p=f.querySelector(".wish-btn-group"),v="Treat yourself to good music.";let S=null,u=!1,k=!1,h=!1,m=0;C&&(C.textContent=""),g&&(g.style.opacity="0",g.style.transform="translateY(10px)"),p&&(p.style.opacity="0",p.style.transform="translateY(10px)");const A=()=>{if(T&&f){const r=f.offsetWidth,y=T.offsetWidth,q=T.offsetLeft,J=r/2-(q+y/2);f.style.setProperty("--shift-x",`${J}px`)}},w=r=>{S&&clearInterval(S),C.textContent="",C.classList.add("typing"),g.style.opacity="0",g.style.transform="translateY(10px)",p.style.opacity="0",p.style.transform="translateY(10px)";let y=0;S=setInterval(()=>{y<v.length?(C.textContent+=v[y],y++):(clearInterval(S),C.classList.remove("typing"),g.style.transition="opacity 0.6s ease, transform 0.6s ease",g.style.opacity="1",g.style.transform="translateY(0)",setTimeout(()=>{!h&&r||(p.style.transition="opacity 0.6s ease, transform 0.6s ease",p.style.opacity="1",p.style.transform="translateY(0)",setTimeout(()=>{!h&&r||(k=!0,r&&W())},600))},300))},50)},B=()=>{S&&clearInterval(S),C.textContent="",C.classList.remove("typing"),g.style.transition="opacity 0.3s ease, transform 0.3s ease",g.style.opacity="0",g.style.transform="translateY(10px)",p.style.transition="opacity 0.3s ease, transform 0.3s ease",p.style.opacity="0",p.style.transform="translateY(10px)"},R=r=>{e&&(r.deltaY>0?r.preventDefault():W())},I=r=>{r.touches&&r.touches[0]&&(m=r.touches[0].clientY)},ne=r=>{if(e&&r.touches&&r.touches[0]){const y=r.touches[0].clientY;m-y>0?r.preventDefault():W(),m=y}},oe=r=>{e&&[32,34,40].includes(r.keyCode)&&r.preventDefault()},W=()=>{e=!1,window.removeEventListener("wheel",R),window.removeEventListener("touchstart",I),window.removeEventListener("touchmove",ne),window.removeEventListener("keydown",oe)},me=()=>{k=!1,h=!1,W(),f.classList.remove("slid-left"),B()},ve=()=>{f.classList.add("slid-left"),setTimeout(()=>{h&&w(!0)},600)},U=()=>{const r=window.innerWidth>768,y=window.scrollY,q=f.getBoundingClientRect(),J=q.top+y,ue=q.height,he=window.innerHeight,N=J+ue/2-he/2;r&&T&&D?(y>=N&&!k&&(e||(e=!0,window.scrollTo({top:N,behavior:"smooth"}),window.addEventListener("wheel",R,{passive:!1}),window.addEventListener("touchstart",I,{passive:!0}),window.addEventListener("touchmove",ne,{passive:!1}),window.addEventListener("keydown",oe,{passive:!1})),h||(h=!0,ve())),y<N-80&&(k||h)&&me()):T&&D&&(T.style.transform="none",h=!0,y>N?u||(u=!0,w(!1)):u&&(u=!1,B()))};A(),U(),window.addEventListener("scroll",U,{passive:!0}),window.addEventListener("resize",()=>{A(),U()},{passive:!0})}}const o=["orb","medium","e","grad","g","ambient","32","watch","smart","car","m","yellow","green"],c=Q.filter(d=>!o.includes(d.id));let L=c.findIndex(d=>d.id===i.id);L===-1&&(L=0);const M=c[(L-1+c.length)%c.length],Y=c[(L+1)%c.length];F&&(F.href=`project.html?id=${M.id}`,F.addEventListener("click",d=>Z(d,F.href))),X&&(X.href=`project.html?id=${Y.id}`,X.addEventListener("click",d=>Z(d,X.href)));const j=document.querySelector(".project-header");if(j){const d=()=>{window.scrollY<=0?j.classList.remove("header-hidden"):j.classList.add("header-hidden")};d(),window.addEventListener("scroll",d,{passive:!0})}}function Re(){!E||te||(te=!0,E.style.opacity="0",E.style.transform="translateY(5px)",setTimeout(()=>{ee=(ee+1)%re.length,E.textContent=re[ee],E.style.transition="opacity 0.5s ease, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",E.style.opacity="1",E.style.transform="translateY(0)",setTimeout(()=>{te=!1,E.style.transition="opacity 0.4s ease, transform 0.4s ease"},500)},400))}E&&(E.style.transition="opacity 0.4s ease, transform 0.4s ease",setInterval(Re,3500));const qe={root:null,rootMargin:"0px",threshold:.15},pe=new IntersectionObserver((e,t)=>{e.forEach(s=>{s.isIntersecting&&(s.target.style.opacity="1",s.target.style.transform="translateY(0)",setTimeout(()=>{s.target.style&&(s.target.style.transform="none",s.target.style.transition="none")},1e3),t.unobserve(s.target))})},qe);document.querySelectorAll(".project-card").forEach((e,t)=>{e.style.opacity="0",e.style.transform="translateY(40px)";const s=t%4*.1;e.style.transition=`opacity 0.8s ease ${s}s, transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) ${s}s`,pe.observe(e)});document.querySelectorAll(".list-section").forEach((e,t)=>{e.style.opacity="0",e.style.transform="translateY(30px)",e.style.transition="opacity 0.8s ease 0.1s, transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) 0.1s",pe.observe(e)});const n=document.getElementById("custom-cursor");let K,P=0,_=0,b=null;window.addEventListener("mousemove",e=>{P=e.clientX,_=e.clientY,n&&!n.classList.contains("card-mode")&&(n.style.transform=`translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`)});document.addEventListener("mouseover",e=>{const t=e.target;if(t.closest(".interaction-card, .magnetic-link")){n&&n.classList.remove("text-mode");return}if((["H1","P","SPAN","A","TEXTAREA"].includes(t.tagName)||t.classList.contains("spec-label")||t.classList.contains("spec-size"))&&!t.closest(".project-card.placeholder-1")&&!t.closest(".color-spheres-container")){const i=window.getComputedStyle(t);let o=parseFloat(i.lineHeight);(isNaN(o)||i.lineHeight==="normal")&&(o=parseFloat(i.fontSize)*1.2),n&&(n.classList.add("text-mode"),n.style.height=`${o}px`)}else n&&(n.classList.remove("text-mode"),n.style.height="")});function ge(e,t,s){var j;b=e,n&&(n.classList.add("card-mode"),n.classList.add("transitioning"),((j=e.querySelector(".btn-text"))==null?void 0:j.textContent.trim().toLowerCase())==="explore"&&n.classList.add("explore-hover"),e.classList.contains("wish-action-btn")&&n.classList.add("wish-btn-hover"),clearTimeout(K),K=setTimeout(()=>{n.classList.remove("transitioning")},300));const a=e.getBoundingClientRect(),i=a.left+a.width/2,o=a.top+a.height/2;if(n){n.style.width=`${a.width}px`,n.style.height=`${a.height}px`;const d=window.getComputedStyle(e);n.style.borderRadius=d.borderRadius}e.style.transition="transform 0.1s ease-out, background-color 0.1s ease";const c=t-i,L=s-o,M=c*.03,Y=L*.03;n&&(n.style.transform=`translate(${i+M}px, ${o+Y}px) translate(-50%, -50%)`)}function ie(e,t,s){n&&(n.classList.remove("card-mode"),n.classList.remove("explore-hover"),n.classList.remove("wish-btn-hover"),n.classList.add("transitioning"),clearTimeout(K),K=setTimeout(()=>{n.classList.remove("transitioning")},300),n.style.width="",n.style.height="",n.style.borderRadius="",n.style.transform=`translate(${t}px, ${s}px) translate(-50%, -50%)`),e&&(e.style.transition="transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.3s ease",e.style.transform="translate(0px, 0px)")}document.querySelectorAll(".interaction-card, .magnetic-link").forEach(e=>{let t,s,a;e.addEventListener("mouseenter",i=>{ge(e,i.clientX,i.clientY),t=e.getBoundingClientRect(),s=t.left+t.width/2,a=t.top+t.height/2}),e.addEventListener("mousemove",i=>{if(b!==e)return;t=e.getBoundingClientRect(),s=t.left+t.width/2,a=t.top+t.height/2;const o=i.clientX,c=i.clientY,L=o-s,M=c-a,Y=L*.03,j=M*.03;e.style.transform=`translate(${Y}px, ${j}px)`,n&&(n.style.transform=`translate(${s+Y}px, ${a+j}px) translate(-50%, -50%)`)}),e.addEventListener("mouseleave",i=>{b===e&&(b=null),ie(e,i.clientX,i.clientY)})});window.addEventListener("scroll",()=>{const e=document.elementFromPoint(P,_),t=e?e.closest(".interaction-card, .magnetic-link"):null;if(t)if(t===b){const s=b.getBoundingClientRect(),a=s.left+s.width/2,i=s.top+s.height/2,o=P-a,c=_-i,L=o*.03,M=c*.03;b.style.transform=`translate(${L}px, ${M}px)`,n&&(n.style.transform=`translate(${a+L}px, ${i+M}px) translate(-50%, -50%)`)}else{const s=b;b=null,s&&ie(s,P,_),ge(t,P,_)}else if(b){const s=b;b=null,ie(s,P,_)}},{passive:!0});const l=document.getElementById("hero-say-hi");document.getElementById("message-overlay");const H=document.getElementById("message-input"),x=document.getElementById("msg-send-btn"),ze=document.getElementById("hero-actions"),$e=document.getElementById("message-actions");let ae=!1;l&&l.addEventListener("click",e=>{if(e.preventDefault(),document.body.classList.contains("session-active")){const t=l.getBoundingClientRect();ze.appendChild(l);const s=l.querySelector(".btn-arrow"),a=l.querySelector(".btn-text");ae?(s&&(s.style.display="none"),a&&(a.innerHTML="thank you!")):(s&&(s.style.display="inline-block",s.innerHTML="&rarr;"),a&&(a.innerHTML="say hi")),document.body.classList.remove("session-active");const i=l.getBoundingClientRect(),o=t.left-i.left,c=t.top-i.top;l.style.transition="none",l.style.transform=`translate(${o}px, ${c}px)`,l.offsetWidth,l.style.transition="transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",l.style.transform="translate(0px, 0px)",setTimeout(()=>l.style.transition="",600)}else{ae=!1;const t=l.getBoundingClientRect();document.body.classList.add("session-active"),H.value="",x.classList.remove("fade-in"),x.classList.add("hidden"),$e.insertBefore(l,x);const s=l.querySelector(".btn-arrow"),a=l.querySelector(".btn-text");s&&(s.style.display="inline-block",s.innerHTML="&larr;"),a&&(a.innerHTML="go back");const i=l.getBoundingClientRect(),o=t.left-i.left,c=t.top-i.top;l.style.transition="none",l.style.transform=`translate(${o}px, ${c}px)`,l.offsetWidth,l.style.transition="transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",l.style.transform="translate(0px, 0px)",setTimeout(()=>l.style.transition="",600),setTimeout(()=>H.focus(),600)}});H&&H.addEventListener("input",()=>{H.value.trim().length>0?x.classList.contains("hidden")&&(x.classList.remove("hidden"),x.classList.add("fade-in")):(x.classList.add("hidden"),x.classList.remove("fade-in"))});x&&x.addEventListener("click",()=>{ae=!0;let e=H.value.trim();e.length>250&&(e=e.substring(0,250));const t=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;");t.length>0&&(le.push({id:Date.now(),text:t,timestamp:new Date().toISOString()}),console.log("Message added. Current DB:",le)),confetti({particleCount:60,spread:70,origin:{y:.8},colors:["#ffffff","#00e5ff","#ff00ff"]}),x.classList.add("hidden"),x.classList.remove("fade-in"),setTimeout(()=>{l.click(),H.value=""},400)});const G=document.getElementById("write-expand-btn"),$=document.getElementById("write-extra");if(G&&$){const e=$.querySelectorAll(".article-item");G.addEventListener("click",t=>{t.preventDefault(),$.classList.contains("expanded")?(G.classList.remove("active"),$.classList.remove("expanded"),e.forEach(a=>{a.style.transitionDelay="0s"})):(G.classList.add("active"),$.classList.add("expanded"),e.forEach((a,i)=>{a.style.transitionDelay=`${.1+i*.05}s`}))})}document.querySelectorAll("img, a").forEach(e=>{e.addEventListener("dragstart",t=>t.preventDefault())});document.querySelectorAll(".write-card").forEach(e=>{const t=document.createElement("div");t.className="draft-overlay",t.innerHTML='<span class="draft-text">still in draft</span>',e.appendChild(t);let s=null;e.addEventListener("click",a=>{a.preventDefault(),t.classList.contains("active")?(t.classList.remove("active"),s&&(clearTimeout(s),s=null)):(t.classList.add("active"),s&&clearTimeout(s),s=setTimeout(()=>{t.classList.remove("active"),s=null},1500))})});const V=document.querySelector(".explore-btn");if(V){let e=null,t=!1;V.addEventListener("click",s=>{s.preventDefault();const a=V.querySelector(".btn-arrow"),i=V.querySelector(".btn-text");t?(t=!1,a&&(a.style.display="inline-block"),i&&(i.innerHTML="explore"),e&&(clearTimeout(e),e=null)):(t=!0,a&&(a.style.display="none"),i&&(i.innerHTML="come back soon!"),e&&clearTimeout(e),e=setTimeout(()=>{t=!1,a&&(a.style.display="inline-block"),i&&(i.innerHTML="explore"),e=null},2e3))})}

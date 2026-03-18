# Aqualibrium Ocean Adventures

A premium, single-page web application built for **Aqualibrium Ocean Adventures**, offering guided small-group ocean experiences consisting of kayaking, snorkelling, and e-biking along the coastline of Fremantle, Perth, and Bremer Bay.

## Overview
The website is designed with a unique **OzeGlass** design system—a refined, ultra-modern glassmorphism aesthetic built entirely from scratch using native CSS variables. The goal is to provide a serene, premium, and airy coastal feel with robust layout components. 

The site operates entirely client-side without a complex backend, ensuring maximum performance, zero layout shifts, and total autonomy.

### Key Features
- **Dynamic OzeGlass UI:** A custom glassmorphism styling matrix utilizing `backdrop-filter: blur`, subtle dropshadows, and ~50% opacity translucent cards to securely float UI elements above the ocean background media.
- **Light / Dark Theme Engine:** Native CSS variable injection toggled via a pure Javascript handler, preserving user preference inside LocalStorage.
- **Hero Video Integration:** A seamless, looping HTML5 background video spanning the hero CTA, with overlay opacity heavily reduced to prioritize media visibility while keeping text crisp.
- **Responsive Pricing Calculator:** A strictly Javascript-driven form calculator that instantly computes specific **price-per-person** totals across matrix breakpoints depending on the selected Tour and Group Size.
- **Native Mailto Booking Workflow:** Zero-dependency static form routing that generates pre-filled payloads directed heavily at the default email client (via `window.location.href`) without requiring Formspree or PHP backend webhooks.
- **Continuous Deployment Pipeline:** Seamless integration configured for Hostinger Git Webhooks to automatically pull and extract directly from the `main` GitHub branch onto the origin server's `public_html` root upon every push.

## Technology Stack
- **HTML5:** Semantic architecture optimized for zero-dependency structural layouts.
- **Vanilla CSS3:** Advanced fluid typography, Flexbox, native CSS Grids, and root `var(--)` tokenization.
- **Vanilla Javascript (ES6+):** Lightweight DOM manipulation, calculations, caching, and anchor scrolling offset handlers. 

## File Structure

```text
aqualibrium/
├── index.html        # Main SPA markup and DOM structure
├── privacy.html      # Brochure privacy policy with 'noindex' routing
├── terms.html        # Terms and conditions including booking variations
├── robots.txt        # Search engine routing configurations
├── .gitignore        # Native OS system file exclusions (.DS_Store, Thumbs.db)
├── css/
│   └── style.css     # Master stylesheet encompassing layout, typography, and OzeGlass themes
├── js/
│   └── script.js     # Global DOM events, theme listeners, booking math, and smooth scrolling
├── images/           # Compressed .webp assets, .mp4 hero video, and logos
├── .github/          
│   └── workflows/
│       └── deploy.yml # GitHub Actions SFTP fallback pipeline
├── deploy.sh         # Bash script automating staging, commit messaging, and git pushing
└── README.md         # Documentation
```

## Local Development & Execution

1. Clone or download the repository to your local machine.
2. The project contains zero build tools, bundlers, or Node.js dependencies. You can run the environment natively using any standard localhost server extension (like Live Server caching) or by opening `index.html` directly in the browser. 

## Deployment

The website uses a hybrid continuous deployment workflow connected to the `github.com:coldix/aqualibrium.git` repository:

1. **Using the deployment script:** The quickest way to push local live edits is to execute `bash deploy.sh` within your terminal. The script will securely verify your current branch, snapshot operations, accept a commit message, and sequence the `git push origin main`. 
2. **Hostinger Integration:** Ensure your Hostinger Git settings are mapped precisely to deploy to the `public_html` directory itself, *not* a localized `/aqualibrium` subfolder wrapper. Whenever `main` receives an update, it instantly replicates to the live web endpoint.
3. **SFTP Fallback:** In the event the generic Git webhook triggers a merge interruption on the server end, the `deploy.yml` GitHub Action securely overrides and pushes raw files through `SFTP_HOST` Secrets variables to seamlessly bypass lockouts.

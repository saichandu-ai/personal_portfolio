# TADIKAMALLA VENKATA SAI CHANDU — PREMIUM 3D GLASSMORPHISM PORTFOLIO
### OBSIDIAN × EMERALD — INTERACTIVE DIGITAL EXPERIENCE

An award-winning caliber interactive portfolio built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Three.js**, **React Three Fiber (@react-three/fiber)**, **@react-three/drei**, and **Framer Motion**.

---

## 💎 Design Identity: Obsidian × Emerald

- **Primary Background**: `#050706` (Obsidian Black)
- **Secondary Background**: `#0B100D` (Deep Slate Obsidian)
- **Deep Background**: `#111A15`
- **Primary Accent**: `#00E6A0` (Electric Emerald)
- **Secondary Accent**: `#8BFFD5` (Luminous Mint)
- **Deep Emerald**: `#087F5B`
- **Primary Text**: `#F5FFF9`
- **Secondary Text**: `#A7B5AD`
- **Glass Surfaces**: `rgba(255, 255, 255, 0.045)` with `backdrop-filter: blur(20px)`
- **Glass Borders**: `rgba(0, 230, 160, 0.20)`

---

## 🚀 Key Features

1. **Cinematic 3D Loading Sequence**:
   - Animated emerald glass sphere with counter-rotating rings and glowing core.
   - Smooth typographic reveal of full name: `TADIKAMALLA VENKATA SAI CHANDU`.
   - Real-time percentage counter and smooth exit transition into the homepage.

2. **Advanced Interactive Background System (Three.js & R3F)**:
   - Real-time cursor-following 3D emerald point lighting.
   - Floating 3D particle constellation (380+ points desktop, 180 mobile) with continuous wave physics and cursor repulsion.
   - Central transparent emerald glass sphere with physical material transmission, roughness, and concentric rings.
   - Continuous 3D environment transitions across sections (**Home, About, Education, Skills, Projects, Certifications, Journey, Contact**).

3. **Authentic Official Social Media Brand Icons**:
   - Official vector paths for **LinkedIn** and **GitHub**.
   - Circular glassmorphism containers with emerald hover glow, subtle 3D tilt, and accessible floating tooltips.
   - Integrated into Hero, Floating Navbar, Contact section, and Footer.

4. **Interactive 3D Glassmorphism Cards**:
   - Mouse-tracking dynamic reflection lighting inside the glass surface.
   - Subtle 3D tilt physics calculated on cursor coordinates.
   - Emerald border highlights on hover.

5. **Centralized Data Model (`data/portfolio.ts`)**:
   - Single source of truth for all personal details, education records, skills, projects, certifications, and milestones.

---

## 📁 Project Architecture

```
├── app/
│   ├── globals.css           # Obsidian × Emerald design tokens, glass classes, animations
│   ├── icon.svg              # Bespoke monogram favicon
│   ├── layout.tsx            # SEO metadata, OpenGraph, Space Grotesk & Inter typography
│   └── page.tsx              # Main entry point with SceneProvider & lazy background
├── components/
│   ├── 3d/
│   │   ├── GlassSphereHero.tsx        # High-refraction emerald glass sphere with rings
│   │   ├── InteractiveBackground.tsx  # Dynamic Three.js Canvas with SSR fallback
│   │   ├── ParticleField.tsx          # 3D floating emerald & mint particle system
│   │   ├── SceneContext.tsx           # Mouse tracking & active section observer
│   │   ├── SceneLighting.tsx          # Real-time cursor-following 3D lights
│   │   └── SectionStructures.tsx      # Morphing geometric structures per section
│   ├── ui/
│   │   ├── BrandIcons.tsx             # Official LinkedIn & GitHub glass components
│   │   ├── GlassCard.tsx              # 3D tilt & mouse reflection glass container
│   │   ├── MagneticButton.tsx         # Spring-physics magnetic buttons
│   │   └── Modal.tsx                  # Accessible glassmorphism modal dialog
│   ├── About.tsx                      # Beyond the Code, pillars & interests
│   ├── Certifications.tsx             # Azure AI & FCC Python credentials
│   ├── Contact.tsx                    # Validated form with mailto/webhook dispatch
│   ├── Education.tsx                  # Vertical glowing timeline (B.Tech, Inter, SSC)
│   ├── Footer.tsx                     # Minimal footer with back-to-top & copyright
│   ├── Hero.tsx                       # Full-screen 3D hero with CTA & verified links
│   ├── Journey.tsx                    # Always Learning roadmap (01 to 05)
│   ├── LoadingScreen.tsx              # Cinematic preloader
│   ├── Navbar.tsx                     # Floating glass pill navbar with indicator
│   └── Skills.tsx                     # Technical arsenal (C, Java, Python, SQL, AI, ML)
├── data/
│   └── portfolio.ts                   # Centralized portfolio data
└── public/
    ├── certificates/                  # Vector badges (azure-ai.svg, fcc-python.svg)
    ├── images/                        # OpenGraph preview asset (og-preview.svg)
    └── resume/                        # PDF resume drop location
```

---

## 🛠️ Local Development & Running

### 1. Prerequisites
- Node.js 18.18+ or 20+ (Node 24 fully supported)
- npm 9+

### 2. Installation
```bash
npm install --legacy-peer-deps
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Create Production Build
```bash
npm run build
```

### 5. Run Production Server
```bash
npm run start
```

---

## ✏️ Customization Guide

### 1. Update Personal Info & Social Links
Open `data/portfolio.ts` and modify the `personal` object:
```ts
personal: {
  name: "TADIKAMALLA VENKATA SAI CHANDU",
  role: "B.Tech Artificial Intelligence & Machine Learning Student",
  email: "your-email@example.com",
  social: {
    linkedin: "https://www.linkedin.com/in/saichandutadikamalla",
    github: "https://github.com/saichandu-ai",
  },
  // ...
}
```

### 2. Adding / Updating Projects
Add or edit project entries in `data/portfolio.ts` under `projects`:
```ts
{
  id: "my-new-project",
  title: "PROJECT NAME",
  category: "Machine Learning System",
  description: "Description of what it accomplishes...",
  liveUrl: "https://your-demo-url.com", // or null
  githubUrl: "https://github.com/saichandu-ai/repo-name", // or null for placeholder modal
  tags: ["Python", "PyTorch", "Next.js"],
  features: ["Feature 1", "Feature 2"],
  featured: false
}
```

### 3. Adding Your PDF Resume
1. Save your resume PDF as:
   `public/resume/Tadikamalla_Venkata_Sai_Chandu_Resume.pdf`
2. Open `data/portfolio.ts` and set:
   ```ts
   resume: {
     fileName: "Tadikamalla_Venkata_Sai_Chandu_Resume.pdf",
     filePath: "/resume/Tadikamalla_Venkata_Sai_Chandu_Resume.pdf",
     isAvailable: true, // <-- Change to true
   }
   ```
3. The **Download Resume** button in the Hero section will now immediately download or open your actual PDF!

### 4. Configuring Contact Form Backend
The contact form currently validates inputs and opens the user's default email client (`mailto:`) with all fields neatly formatted.

To connect a serverless webhook (e.g., [Web3Forms](https://web3forms.com) or [Formspree](https://formspree.io)):
1. Get a free API access key from Web3Forms or Formspree.
2. In `components/Contact.tsx`, replace the `window.location.href = mailtoUrl;` line in `handleSubmit` with:
```ts
const response = await fetch("https://api.web3forms.com/submit", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    access_key: "YOUR_WEB3FORMS_ACCESS_KEY",
    name: form.name,
    email: form.email,
    subject: form.subject || "Portfolio Contact",
    message: form.message,
  }),
});
```

---

## 🌐 Deployment Instructions

### Deploy to Vercel (Recommended)
1. Push this repository to your GitHub account:
   ```bash
   git add .
   git commit -m "feat: complete obsidian x emerald 3d portfolio"
   git branch -M main
   git remote add origin https://github.com/saichandu-ai/portfolio.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Framework Preset will automatically detect **Next.js**.
5. Click **"Deploy"**. Your website will be live worldwide on an ultra-fast global edge network with automatic HTTPS!

### Deploy to Render
1. Create a new **Web Service** on [Render](https://render.com).
2. Connect your GitHub repository.
3. Build Command: `npm run build`
4. Start Command: `npm start`
5. Click **"Create Web Service"**.

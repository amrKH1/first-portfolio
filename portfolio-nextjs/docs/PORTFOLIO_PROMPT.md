# Portfolio Website Prompt & Design Specification

A comprehensive, professional prompt/spec that describes the portfolio website so it can be reused for design, development, QA, and content work.

## 1) Purpose & Audience
- Purpose: Present a full‑stack web & mobile developer with a professional, corporate‑level portfolio that converts viewers into leads/opportunities.
- Audience: Hiring managers, tech leads, founders, and clients seeking senior engineering expertise.

## 2) Brand Voice & Tone
- Confident, precise, and solution‑oriented
- Technical depth without jargon overload
- Professional, reliable, and results‑driven

## 3) Information Architecture (Single‑page layout with anchored sections)
- Navigation (sticky): Home, About, Skills, Projects, Experience, Contact
- Sections (order):
  1. Home (Hero)
  2. About
  3. Skills & Technologies
  4. Featured Projects
  5. Work Experience (Timeline)
  6. Contact
- Footer with minimal legal/info links (if needed)

## 4) Visual System

### 4.1 Color Palette (Tailwind tokens)
- Primary (Indigo/Navy):
  - DEFAULT: #312e81
  - 600: #4f46e5 (focus/interactive)
- Secondary (Cyan):
  - DEFAULT: #0891b2
- Accent (Warm Amber):
  - DEFAULT: #f59e0b (sparingly for highlights)
- Neutral/Gray (Slate‑like):
  - 900: #0f172a  
  - 600: #475569  
  - 100: #f1f5f9  
  - 50:  #f8fafc

Guidelines:
- Use primary for key actions, active states, and highlights.
- Use secondary for subtle gradients, supporting accents.
- Use accent sparingly for badges or highlight strips.
- Backgrounds: white and gray‑50/100 sections alternate to create rhythm.

### 4.2 Typography
- Base family: Inter (system fallback: ui‑sans‑serif, system‑ui, sans‑serif)
- Weights: 400, 500, 600, 700 (favor 600/700 for headings; maintain strong hierarchy)
- Line height: 1.7 body; 1.2 headings

Recommended scale (approx):
- h1: 36–60px responsive (3xl–6xl Tailwind)
- h2: 28–40px (2xl–4xl)
- h3: 20–24px (xl–2xl)
- Body: 16–18px with comfortable spacing

### 4.3 Spacing & Layout Rhythm
- Section vertical spacing: 80–112px (py‑20 to py‑28)
- Grid gutters: 24–32px (gap‑6 to gap‑8)
- Keep consistent padding container: max‑w‑6xl/7xl with px‑5/6

### 4.4 Elevation & Surfaces
- Cards: white surface, subtle 1px border (gray‑200/black/5) and shadow‑light by default; elevate to shadow‑medium and slight translateY on hover.
- Use backdrop‑blur on nav and select overlays for premium feel.

### 4.5 Interactions & Motion
- Use tasteful hover states: color shifts, subtle scale (1.02–1.05), and shadow increase.
- AOS (Animate On Scroll): fade‑up/right/left; durations 600–1200ms; once: true.
- Custom keyframes: float, glow, fadeInUp for discrete accents—not excessive.

### 4.6 Accessibility
- Color contrast AA+ for text on backgrounds.
- Focus outline uses primary 600 (#4f46e5). Maintain visible outlines for keyboard users.
- Semantic headings and landmarks per section.

## 5) Component Specs

### 5.1 Navigation (Sticky)
- Position: fixed, top: 0, full width, z‑index above content.
- Background: white with backdrop‑blur‑xl; scrolled state increases border contrast.
- Links: medium weight; active link underlined via small gradient bar; hover opacity and color shift to primary.
- Mobile: slide‑down panel with rounded list items and hover backgrounds.

### 5.2 Hero (Home)
- Goal: Make a strong first impression with name, animated title (typing), concise value prop.
- Layout: 2‑column on large screens (content left, image/visual right), stacked on mobile.
- Buttons: primary gradient (indigo→cyan) and outlined secondary with subtle hover scale and glow.
- Social buttons: rounded, glassy (backdrop‑blur), enlarge on hover.

### 5.3 About
- Brief, professional summary emphasizing outcomes: performance, quality, delivery.
- Optional quick facts list (years of experience, specialties, domains).

### 5.4 Skills & Technologies
- Grid of category cards: each with icon, title, and list of skills with proficiency bars.
- Category chip: soft gradient backgrounds matching brand palette.
- Bars: rounded, animated width on in‑view; small numeric % label.

### 5.5 Featured Projects
- Cards include title, short description, tech tags, and actions (live/github).
- Image area: placeholder gradient with overlay actions on hover.
- Hover: elevate card, translateY, reveal overlay buttons.
- Tags: compact rounded chips with soft border.

### 5.6 Work Experience (Timeline)
- Vertical centerline on desktop; items alternate left/right; stacked on mobile.
- Each item: period (primary), role (bold), company (medium), description, skills chips.
- Subtle desktop arrow pointer to the timeline from the card.

### 5.7 Contact
- Contact info: icon + label + value with hover link color shifts to primary.
- Form: large, rounded inputs with 2px borders, clear focus ring (#4f46e5), subtle scale and shadow on focus.
- Submit button: .btn.btn‑primary; disable state reduces opacity.
- Notifications: success (green), error (red) dismiss automatically.

### 5.8 Footer (if present)
- Minimal, quiet, legible; small text.

## 6) Responsiveness
- Breakpoints: xs (475px), sm, md, lg, xl, 2xl
- Mobile: stacked sections; space‑efficient components; larger tap targets.
- Tablet: two‑column layouts for skills/projects where possible.
- Desktop: generous spacing, 2–3 column grids for projects, 4 col for skills.

## 7) Content Guidance (Business‑ready)
- Keep copy results‑oriented: outcomes, metrics, stack, role.
- Projects: include 1–2 quantified achievements if available.
- Experience: role, company, period, responsibilities, key results.
- Skills: group by domain (Frontend/Backend/Mobile/DevOps) and list primary tools.

## 8) Performance & Quality
- Optimize images (WebP/AVIF). Use responsive sizes or placeholders.
- Keep animations performant (avoid layout thrash; rely on transform/opacity).
- Linting, formatting, and accessible aria labels for interactive elements.

## 9) Technical Notes (current codebase)
- Framework: Next.js 14 (App Router). TailwindCSS for styling.
- AOS used for on‑scroll animations (initialized in app/page.tsx).
- Tailwind config extends colors, animations, shadows, spacing, and screens.
- Sections implemented as components (Navigation, Hero, About, Skills, Projects, Experience, Contact, Footer).
- Admin/blog removed; portfolio‑only build.

## 10) Example Class Patterns
- Primary button: `btn btn-primary`
- Section shell: `py-24 bg-white|bg-gray-50`
- Card: `bg-white rounded-2xl border border-gray-200 shadow-light hover:shadow-medium hover:-translate-y-1 transition`
- Heading underline: small gradient bar from primary to primary‑dark

## 11) Navigation Anchors
- `#home`, `#about`, `#skills`, `#projects`, `#experience`, `#contact`
- Smooth scroll with offset for sticky nav

## 12) Future Extensions (Optional)
- Case studies pages per project
- Downloadable resume (PDF) button in Hero or About
- Testimonials and certifications section

---

# Prompt (Copy‑paste Ready)

You are designing and polishing a professional developer portfolio website with the following requirements:

- Brand voice: confident, technical, results‑driven.
- Visual: corporate‑level, modern, clean; indigo/cyan primary accents; warm accent sparingly.
- Sections: Home (Hero), About, Skills, Projects, Experience, Contact. Sticky nav with anchors.
- Components: premium cards with subtle borders and shadows; tasteful hover states; backdrop blur for nav.
- Typography: Inter; strong hierarchy (h1–h3 600–700 weight), readable body 16–18px with 1.7 line height.
- Responsiveness: mobile‑first, tablet optimized grids, desktop generous spacing.
- Accessibility: visible focus outline (#4f46e5), AA+ contrast, semantic headings.
- Motion: subtle AOS animations (fade, slide), smooth transforms/opacity, no excessive motion.
- Content style: concise outcomes, stacks, responsibilities; business‑ready copy.
- Performance: optimized assets (WebP/AVIF), transform/opacity animations only.

Deliver the UI consistent with the palette:
- Primary DEFAULT #312e81; Primary 600 #4f46e5
- Secondary DEFAULT #0891b2; Accent DEFAULT #f59e0b
- Gray 900 #0f172a, 600 #475569, 100 #f1f5f9, 50 #f8fafc

Ensure cards, buttons, forms, and navigation match the above spec and feel premium, trustworthy, and modern.


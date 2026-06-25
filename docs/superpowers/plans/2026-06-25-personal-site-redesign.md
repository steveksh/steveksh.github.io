# Personal Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign steveksh.github.io to a clean academic-researcher aesthetic — no background animations, Inter font, content-first layout, full mobile responsiveness, and content updated from the latest resume.

**Architecture:** Split into three files: `css/style.css` (all styles), `js/main.js` (typed hero, hamburger, scroll fade-in, active nav), `index.html` (HTML structure only, links to both). Blog nav updated separately. All vanilla — no build step, deploys as-is on GitHub Pages.

**Tech Stack:** HTML5, CSS3 (custom properties, Grid, Flexbox, clamp()), Vanilla JS (IntersectionObserver, setInterval), Inter via Google Fonts CDN.

## Global Constraints
- No CSS frameworks, no JS libraries, no build step
- GitHub Pages compatible — all paths relative, no server-side rendering
- Mobile breakpoint: ≤768px (hamburger nav, single-column layouts)
- Font: Inter via `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap`
- Background: `#0a0a0f` throughout — no alternating section backgrounds
- Primary accent: `#58a6ff` (blue), secondary: `#a78bfa` (purple — research tags only), green `#3fb950` for "Live" badge only
- All external links: `target="_blank" rel="noopener"`
- Remove entirely: aurora divs, neural canvas, Gojo easter egg button+overlay+scripts
- Videos (blackjack_rl.mp4, gojo_domain.mp4) remain in repo — just not referenced from index.html
- Section order: Hero → Research → Papers → Projects → Experience → Education → Contact

---

### Task 1: Create CSS file

**Files:**
- Create: `css/style.css`

- [ ] **Step 1: Create the CSS directory and file**

Create `css/style.css` with this full content:

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #0a0a0f;
  --surface: #111118;
  --border: #1e1e2e;
  --accent: #58a6ff;
  --accent2: #a78bfa;
  --text: #e6edf3;
  --muted: #8b949e;
  --radius: 10px;
}

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 15px;
  line-height: 1.65;
}

/* ── NAV ── */
nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(10, 10, 15, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

.nav-logo {
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--accent);
  text-decoration: none;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1.8rem;
}

.nav-links a {
  color: var(--muted);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s;
}

.nav-links a:hover,
.nav-links a[aria-current="true"] { color: var(--text); }

.nav-hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  min-width: 44px;
  min-height: 44px;
  align-items: center;
  justify-content: center;
}

.nav-hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
  transition: transform 0.2s, opacity 0.2s;
}

.nav-drawer {
  display: none;
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  padding: 0.5rem 0;
  z-index: 99;
  flex-direction: column;
}

.nav-drawer.open { display: flex; }

.nav-drawer a {
  display: block;
  color: var(--muted);
  text-decoration: none;
  font-size: 0.9rem;
  padding: 0.8rem 2rem;
  border-bottom: 1px solid var(--border);
  transition: color 0.2s, background 0.2s;
  min-height: 44px;
}

.nav-drawer a:last-child { border-bottom: none; }
.nav-drawer a:hover { color: var(--text); background: var(--surface); }

/* ── HERO ── */
.hero {
  max-width: 720px;
  margin: 0 auto;
  padding: clamp(70px, 10vw, 120px) 2rem clamp(60px, 8vw, 100px);
  text-align: center;
}

.hero-avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 2px solid var(--border);
  margin: 0 auto 1.5rem;
  display: block;
  object-fit: cover;
}

.hero h1 {
  font-size: clamp(2rem, 5vw, 2.8rem);
  font-weight: 800;
  letter-spacing: -0.5px;
  margin-bottom: 0.6rem;
}

.hero-typed {
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  color: var(--accent);
  font-weight: 500;
  margin-bottom: 1.2rem;
  min-height: 1.7em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
}

.typed-cursor {
  display: inline-block;
  width: 2px;
  height: 1.1em;
  background: var(--accent);
  animation: blink 0.8s step-end infinite;
  flex-shrink: 0;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.hero-bio {
  color: var(--muted);
  font-size: 0.95rem;
  max-width: 500px;
  margin: 0 auto 2rem;
  line-height: 1.75;
}

.hero-cta {
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* ── BUTTONS ── */
.btn {
  display: inline-block;
  padding: 9px 22px;
  border-radius: var(--radius);
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s, transform 0.15s;
  min-height: 44px;
  line-height: 26px;
}

.btn:hover { opacity: 0.85; transform: translateY(-1px); }
.btn-primary { background: var(--accent); color: #0a0a0f; }
.btn-outline { border: 1px solid var(--border); color: var(--text); }

/* ── SECTIONS ── */
section {
  padding: clamp(50px, 8vw, 90px) 2rem;
  border-top: 1px solid var(--border);
}

.container { max-width: 800px; margin: 0 auto; }

.section-label {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--accent);
  margin-bottom: 0.4rem;
}

.section-title {
  font-size: clamp(1.4rem, 3vw, 1.85rem);
  font-weight: 800;
  margin-bottom: 0.3rem;
  letter-spacing: -0.3px;
}

.section-sub {
  color: var(--muted);
  font-size: 0.88rem;
  margin-bottom: 2.2rem;
}

/* ── RESEARCH ── */
.research-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.research-tag {
  background: rgba(167, 139, 250, 0.08);
  border: 1px solid rgba(167, 139, 250, 0.25);
  color: var(--accent2);
  font-size: 0.8rem;
  font-weight: 500;
  padding: 5px 14px;
  border-radius: 20px;
}

.currently-card {
  background: rgba(88, 166, 255, 0.04);
  border: 1px solid rgba(88, 166, 255, 0.18);
  border-radius: var(--radius);
  padding: 1.1rem 1.4rem;
  display: flex;
  gap: 1.2rem;
  align-items: flex-start;
}

.currently-label {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
  white-space: nowrap;
  padding-top: 2px;
  flex-shrink: 0;
}

.currently-text {
  color: var(--muted);
  font-size: 0.88rem;
  line-height: 1.65;
}

/* ── PAPERS ── */
.papers-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.paper-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.3rem 1.5rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.5rem;
  transition: border-color 0.2s, transform 0.2s;
}

.paper-card:hover { border-color: var(--accent); transform: translateY(-2px); }

.paper-info { flex: 1; }
.paper-info h4 { font-size: 0.95rem; font-weight: 700; margin-bottom: 0.25rem; line-height: 1.45; }
.paper-meta { color: var(--muted); font-size: 0.8rem; margin-bottom: 0.35rem; line-height: 1.55; }

.paper-tag {
  font-size: 0.7rem;
  background: rgba(88, 166, 255, 0.08);
  border: 1px solid rgba(88, 166, 255, 0.22);
  color: var(--accent);
  padding: 2px 10px;
  border-radius: 20px;
  display: inline-block;
  margin-top: 0.3rem;
}

.paper-link {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid var(--border);
  color: var(--muted);
  font-size: 0.78rem;
  font-weight: 600;
  padding: 7px 14px;
  border-radius: 8px;
  text-decoration: none;
  transition: border-color 0.2s, color 0.2s;
  align-self: flex-start;
  white-space: nowrap;
  min-height: 36px;
}

.paper-link:hover { border-color: var(--accent); color: var(--accent); }

/* ── PROJECTS ── */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  transition: border-color 0.2s, transform 0.2s;
}

.card:hover { border-color: var(--accent); transform: translateY(-3px); }
.card.featured { border-color: rgba(88, 166, 255, 0.2); }

.card-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.6rem;
}

.card-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(88, 166, 255, 0.08);
  border-radius: 6px;
  flex-shrink: 0;
  color: var(--accent);
}

.card-icon svg { width: 14px; height: 14px; stroke: currentColor; }

.card h3 { font-size: 0.92rem; font-weight: 700; }
.card h3 a { color: var(--text); text-decoration: none; }
.card h3 a:hover { color: var(--accent); }

.card p {
  color: var(--muted);
  font-size: 0.82rem;
  flex: 1;
  margin-bottom: 1rem;
  line-height: 1.55;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}

.card-lang {
  font-size: 0.75rem;
  color: var(--muted);
  display: flex;
  align-items: center;
  gap: 5px;
}

.lang-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.card-link { font-size: 0.75rem; color: var(--accent); text-decoration: none; font-weight: 500; }
.card-link:hover { text-decoration: underline; }

/* ── TIMELINE ── */
.timeline { display: flex; flex-direction: column; gap: 2.2rem; }

.timeline-item {
  display: grid;
  grid-template-columns: 148px 1fr;
  gap: 1.5rem;
  align-items: start;
}

.timeline-date { color: var(--muted); font-size: 0.78rem; padding-top: 2px; line-height: 1.4; }

.timeline-content h4 { font-size: 0.92rem; font-weight: 700; margin-bottom: 0.15rem; }

.timeline-content .company {
  color: var(--accent);
  font-size: 0.8rem;
  margin-bottom: 0.6rem;
  font-weight: 500;
}

.timeline-bullets { list-style: none; display: flex; flex-direction: column; gap: 0.35rem; }

.timeline-bullets li {
  color: var(--muted);
  font-size: 0.82rem;
  padding-left: 1.1rem;
  position: relative;
  line-height: 1.55;
}

.timeline-bullets li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: rgba(255,255,255,0.15);
}

/* ── EDUCATION ── */
.edu-list { display: flex; flex-direction: column; gap: 1rem; }

.edu-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.2rem 1.5rem;
  transition: border-color 0.2s;
}

.edu-card:hover { border-color: var(--accent); }
.edu-card h4 { font-size: 0.92rem; font-weight: 700; margin-bottom: 0.2rem; }

.edu-card .edu-school {
  color: var(--accent);
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
}

.edu-card .edu-meta { color: var(--muted); font-size: 0.8rem; line-height: 1.6; }

.edu-badge {
  display: inline-block;
  margin-top: 0.6rem;
  font-size: 0.7rem;
  background: rgba(63, 185, 80, 0.08);
  border: 1px solid rgba(63, 185, 80, 0.25);
  color: #3fb950;
  padding: 2px 10px;
  border-radius: 20px;
}

.edu-badge.upcoming {
  background: rgba(88, 166, 255, 0.08);
  border-color: rgba(88, 166, 255, 0.25);
  color: var(--accent);
}

/* ── CONTACT ── */
#contact { text-align: center; }

.contact-links {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 10px 20px;
  border-radius: var(--radius);
  text-decoration: none;
  color: var(--text);
  font-size: 0.875rem;
  font-weight: 500;
  transition: border-color 0.2s, color 0.2s;
  min-height: 44px;
}

.contact-link:hover { border-color: var(--accent); color: var(--accent); }

/* ── FOOTER ── */
footer {
  text-align: center;
  padding: 2rem;
  color: var(--muted);
  font-size: 0.78rem;
  border-top: 1px solid var(--border);
}

/* ── SCROLL FADE ── */
.section-fade {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.section-fade.visible { opacity: 1; transform: translateY(0); }

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .nav-links { display: none; }
  .nav-hamburger { display: flex; }

  .timeline-item { grid-template-columns: 1fr; gap: 0.25rem; }
  .timeline-date { color: var(--muted); font-size: 0.75rem; }

  .paper-card { flex-direction: column; gap: 0.8rem; }
  .paper-link { align-self: flex-start; }

  .projects-grid { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
  nav { padding: 0 1rem; }
  section { padding: 40px 1rem; }
  .hero { padding: 60px 1rem 50px; }
  .container { max-width: 100%; }
}
```

- [ ] **Step 2: Verify the CSS file exists**

Open the file in an editor and confirm it saved correctly. You should see `:root` at the top and `@media (max-width: 480px)` near the bottom.

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: add clean academic CSS for site redesign"
```

---

### Task 2: Create JS file

**Files:**
- Create: `js/main.js`

- [ ] **Step 1: Create the JS file**

Create `js/main.js` with this full content:

```javascript
// ── TYPED HERO TEXT ──────────────────────────────────────────
(function () {
  var el = document.getElementById('typed-text');
  if (!el) return;

  var phrases = ['AI Engineer', 'Federated Learning', 'LLM Agents', 'Reinforcement Learning', 'RecSys'];
  var phraseIndex = 0;
  var charIndex = 0;
  var deleting = false;
  var WRITE = 80;
  var DELETE = 40;
  var PAUSE_END = 1800;
  var PAUSE_START = 400;

  function tick() {
    var phrase = phrases[phraseIndex];
    if (!deleting) {
      el.textContent = phrase.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === phrase.length) {
        deleting = true;
        setTimeout(tick, PAUSE_END);
        return;
      }
      setTimeout(tick, WRITE);
    } else {
      el.textContent = phrase.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, PAUSE_START);
        return;
      }
      setTimeout(tick, DELETE);
    }
  }

  setTimeout(tick, 600);
})();

// ── HAMBURGER NAV ────────────────────────────────────────────
(function () {
  var btn = document.getElementById('hamburger');
  var drawer = document.getElementById('nav-drawer');
  if (!btn || !drawer) return;

  btn.addEventListener('click', function () {
    var isOpen = drawer.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  // Exposed for inline onclick on drawer links
  window.closeDrawer = function () {
    drawer.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  };
})();

// ── SCROLL FADE-IN ───────────────────────────────────────────
(function () {
  var els = document.querySelectorAll('.section-fade');
  if (!('IntersectionObserver' in window)) {
    for (var i = 0; i < els.length; i++) els[i].classList.add('visible');
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(function (el) { observer.observe(el); });
})();

// ── ACTIVE NAV HIGHLIGHT ─────────────────────────────────────
(function () {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (a) { a.removeAttribute('aria-current'); });
        var active = document.querySelector('.nav-links a[href="#' + entry.target.id + '"]');
        if (active) active.setAttribute('aria-current', 'true');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(function (s) { observer.observe(s); });
})();
```

- [ ] **Step 2: Commit**

```bash
git add js/main.js
git commit -m "feat: add vanilla JS for typed hero, hamburger nav, scroll fade, active nav"
```

---

### Task 3: Rewrite index.html

**Files:**
- Modify: `index.html` (full rewrite)

- [ ] **Step 1: Replace the entire contents of index.html**

Replace `index.html` with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Steve Kan — AI Engineer & Researcher</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

<!-- NAV -->
<nav>
  <a href="#" class="nav-logo">steveksh</a>
  <ul class="nav-links">
    <li><a href="#research">Research</a></li>
    <li><a href="#papers">Papers</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#experience">Experience</a></li>
    <li><a href="#education">Education</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="blog/index.html">Blog</a></li>
  </ul>
  <button class="nav-hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">
    <span></span>
    <span></span>
    <span></span>
  </button>
</nav>

<!-- MOBILE DRAWER -->
<div class="nav-drawer" id="nav-drawer">
  <a href="#research" onclick="closeDrawer()">Research</a>
  <a href="#papers" onclick="closeDrawer()">Papers</a>
  <a href="#projects" onclick="closeDrawer()">Projects</a>
  <a href="#experience" onclick="closeDrawer()">Experience</a>
  <a href="#education" onclick="closeDrawer()">Education</a>
  <a href="#contact" onclick="closeDrawer()">Contact</a>
  <a href="blog/index.html">Blog</a>
</div>

<!-- HERO -->
<div class="hero">
  <img
    src="https://github.com/steveksh.png"
    alt="Steve Kan"
    class="hero-avatar"
    onerror="this.style.display='none'"
  />
  <h1>Steve Kan</h1>
  <div class="hero-typed">
    <span id="typed-text"></span><span class="typed-cursor"></span>
  </div>
  <p class="hero-bio">
    AI Engineer and researcher building intelligent systems — from federated learning and LLM agents
    to recommendation engines and cloud-native ML pipelines.
  </p>
  <div class="hero-cta">
    <a href="https://github.com/steveksh" class="btn btn-primary" target="_blank" rel="noopener">GitHub</a>
    <a href="#research" class="btn btn-outline">View Research</a>
  </div>
</div>

<!-- RESEARCH -->
<section id="research">
  <div class="container section-fade">
    <div class="section-label">Research</div>
    <h2 class="section-title">Research Interests</h2>
    <p class="section-sub">Areas I study, build, and publish in.</p>
    <div class="research-tags">
      <span class="research-tag">Federated Learning</span>
      <span class="research-tag">Recommendation Systems</span>
      <span class="research-tag">Reinforcement Learning</span>
      <span class="research-tag">LLM Agents</span>
      <span class="research-tag">MLOps</span>
      <span class="research-tag">Multimodal Learning</span>
    </div>
    <div class="currently-card">
      <div class="currently-label">Currently</div>
      <div class="currently-text">
        Deepening reinforcement learning algorithms — policy gradients, model-based RL, and planning.
        Next up: robotics and frontend development.
      </div>
    </div>
  </div>
</section>

<!-- PAPERS -->
<section id="papers">
  <div class="container section-fade">
    <div class="section-label">Publications</div>
    <h2 class="section-title">Papers</h2>
    <p class="section-sub">Research I've contributed to.</p>
    <div class="papers-list">

      <div class="paper-card">
        <div class="paper-info">
          <h4>Vertical Federated Learning – An Application for Financial Institutions</h4>
          <p class="paper-meta">Co-author · July 2024</p>
          <p class="paper-meta">Privacy-preserving credit risk modeling across bank and non-bank institutions. Benchmarks FedAvg and FedReconstruct; assesses accuracy, privacy, and regulatory compliance trade-offs.</p>
          <span class="paper-tag">Federated Learning</span>
        </div>
        <a href="https://drive.google.com/file/d/1FO3equcsRwMISJocDL3CSqXnqCFo-Qbq/view?usp=sharing" class="paper-link" target="_blank" rel="noopener">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          Read
        </a>
      </div>

      <div class="paper-card">
        <div class="paper-info">
          <h4>Multimodal Recommendation Engine with Feature Encoders</h4>
          <p class="paper-meta">City University of Hong Kong · 2024</p>
          <p class="paper-meta">Leverages multimodal feature encoders to improve item representation and personalisation accuracy in recommendation systems.</p>
          <span class="paper-tag">Recommendation Systems</span>
        </div>
        <a href="https://drive.google.com/file/d/1RyAwljzNSBOyA1m259oKwbifMyE_NTsX/view?usp=sharing" class="paper-link" target="_blank" rel="noopener">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          Read
        </a>
      </div>

      <div class="paper-card">
        <div class="paper-info">
          <h4>Blackjack Reinforcement Learning</h4>
          <p class="paper-meta">City University of Hong Kong · 2024</p>
          <p class="paper-meta">Training an RL agent to play Blackjack optimally using classic reinforcement learning algorithms, policy evaluation, and Monte Carlo methods.</p>
          <span class="paper-tag">Reinforcement Learning</span>
        </div>
        <a href="https://drive.google.com/file/d/1TsN0t1nbf3SLS9z8c3F4stncPLfe2ntS/view?usp=sharing" class="paper-link" target="_blank" rel="noopener">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          Read
        </a>
      </div>

    </div>
  </div>
</section>

<!-- PROJECTS -->
<section id="projects">
  <div class="container section-fade">
    <div class="section-label">Work</div>
    <h2 class="section-title">Projects</h2>
    <p class="section-sub">Things I've built.</p>
    <div class="projects-grid">

      <div class="card featured">
        <div class="card-header">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <h3><a href="https://www.learn2play.app/" target="_blank" rel="noopener">Learn2Play</a></h3>
        </div>
        <p>AI-powered native iOS app (Dart) helping kids learn through play. FastAPI backend on GCP with Firebase auth and custom AI agents for OCR content recognition. Secured HKD 100K seed funding from Cyberport CMF.</p>
        <div class="card-footer">
          <span class="card-lang"><span class="lang-dot" style="background:#3fb950"></span>Live · Dart / Python</span>
          <a href="https://www.learn2play.app/" class="card-link" target="_blank" rel="noopener">Visit →</a>
        </div>
      </div>

      <div class="card featured">
        <div class="card-header">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
          </div>
          <h3><a href="https://github.com/steveksh/Federated-Learning" target="_blank" rel="noopener">Federated Learning</a></h3>
        </div>
        <p>Original research and implementation of federated learning — distributed ML across decentralized devices without sharing raw data. Implements FedAvg and FedReconstruct with privacy analysis.</p>
        <div class="card-footer">
          <span class="card-lang"><span class="lang-dot" style="background:#3572A5"></span>Python</span>
          <a href="https://github.com/steveksh/Federated-Learning" class="card-link" target="_blank" rel="noopener">View →</a>
        </div>
      </div>

      <div class="card featured">
        <div class="card-header">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
          </div>
          <h3><a href="https://github.com/steveksh/Black-Jack-RL" target="_blank" rel="noopener">Blackjack RL</a></h3>
        </div>
        <p>RL agent learning to play Blackjack optimally using policy evaluation, value iteration, and Monte Carlo methods. Includes a live training demo. SDSC 6007 coursework.</p>
        <div class="card-footer">
          <span class="card-lang"><span class="lang-dot" style="background:#DA5B0B"></span>Jupyter / Python</span>
          <a href="https://github.com/steveksh/Black-Jack-RL" class="card-link" target="_blank" rel="noopener">View →</a>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <h3><a href="https://github.com/steveksh/recommendation" target="_blank" rel="noopener">Recommendation System</a></h3>
        </div>
        <p>Collaborative filtering and content-based recommendation engine from scratch. Matrix factorization and item-based similarity models.</p>
        <div class="card-footer">
          <span class="card-lang"><span class="lang-dot" style="background:#DA5B0B"></span>Jupyter / Python</span>
          <a href="https://github.com/steveksh/recommendation" class="card-link" target="_blank" rel="noopener">View →</a>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.9 12.5 19.79 19.79 0 0 1 1.92 4 2 2 0 0 1 3.9 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <h3><a href="https://github.com/steveksh/Flight-Planner-Web-App" target="_blank" rel="noopener">Flight Planner</a></h3>
        </div>
        <p>Web application for flight planning built with Python — handles routing, scheduling, and data lookup with a clean API layer.</p>
        <div class="card-footer">
          <span class="card-lang"><span class="lang-dot" style="background:#3572A5"></span>Python</span>
          <a href="https://github.com/steveksh/Flight-Planner-Web-App" class="card-link" target="_blank" rel="noopener">View →</a>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <h3><a href="https://github.com/steveksh/Product-Ratings-Classifier" target="_blank" rel="noopener">Product Classifier</a></h3>
        </div>
        <p>NLP classifier predicting product ratings from text reviews using TF-IDF, embeddings, and gradient boosting.</p>
        <div class="card-footer">
          <span class="card-lang"><span class="lang-dot" style="background:#DA5B0B"></span>Jupyter / Python</span>
          <a href="https://github.com/steveksh/Product-Ratings-Classifier" class="card-link" target="_blank" rel="noopener">View →</a>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
          </div>
          <h3><a href="https://github.com/steveksh/rdashboard.io" target="_blank" rel="noopener">R Markdown Dashboard</a></h3>
        </div>
        <p>Interactive data visualization dashboard with R Markdown — analytical storytelling with real datasets and Shiny interactivity.</p>
        <div class="card-footer">
          <span class="card-lang"><span class="lang-dot" style="background:#198CE7"></span>R / HTML</span>
          <a href="https://github.com/steveksh/rdashboard.io" class="card-link" target="_blank" rel="noopener">View →</a>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- EXPERIENCE -->
<section id="experience">
  <div class="container section-fade">
    <div class="section-label">Experience</div>
    <h2 class="section-title">Work History</h2>
    <p class="section-sub">Where I've applied and built.</p>
    <div class="timeline">

      <div class="timeline-item">
        <div class="timeline-date">Feb 2026 – Present</div>
        <div class="timeline-content">
          <h4>AI Engineer</h4>
          <div class="company">Wipro Capco · Hong Kong</div>
          <ul class="timeline-bullets">
            <li>Built end-to-end AI Underwriting Agent for Life Insurance on Azure with CI/CD and Docker</li>
            <li>Architected Agent-to-Agent (A2A) orchestration for tool centralization and AI Agent Builder platforms</li>
            <li>Built Siamese neural networks for forgery detection and wet signature verification</li>
            <li>Developed cross-product sales intelligence tool using multi-agent workflows (orchestrator, evaluator, aggregator, domain agents)</li>
            <li>Led ML/LLMOps workflows including ETL pipelines and monitoring on Databricks and Power BI</li>
          </ul>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-date">Sep 2024 – Present</div>
        <div class="timeline-content">
          <h4>Co-owner & Lead Developer</h4>
          <div class="company">Learn2Play · Hong Kong</div>
          <ul class="timeline-bullets">
            <li>Secured HKD 100K seed funding from Cyberport Creative Micro Fund</li>
            <li>End-to-end development of native iOS app (Dart) and FastAPI backend deployed on GCP</li>
            <li>Integrated custom AI agents for OCR-based content recognition with Firebase and MySQL auth</li>
          </ul>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-date">Jun 2024 – Jan 2026</div>
        <div class="timeline-content">
          <h4>Regional Data Scientist</h4>
          <div class="company">Richemont · Hong Kong</div>
          <ul class="timeline-bullets">
            <li>Delivered propensity-model pipelines (XGB/RF/LGBM) driving €3M+ incremental product sales (FY25–26)</li>
            <li>Deployed Deep Matrix Factorization and GRU models with 68–82% Top-K accuracy for product recommendations</li>
            <li>Productionized 14 boutique performance forecasting models at 60–85% monthly accuracy</li>
            <li>Deployed product-recommendation AI agent powered by Chainlit, LangGraph, ChromaDB, MCPs, and Redis</li>
            <li>Implemented Variational Autoencoders and Federated Learning to mask PIIs for model training</li>
          </ul>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-date">Jul 2022 – Jun 2024</div>
        <div class="timeline-content">
          <h4>Data Scientist</h4>
          <div class="company">Hotmob Limited · Hong Kong</div>
          <ul class="timeline-bullets">
            <li>Fine-tuned and deployed a Content Classification Model (BERT) at 66% accuracy using FastAPI and Docker</li>
            <li>Built fraud detection models for insurance claims using Keras and Azure ML Studio (70% Recall)</li>
            <li>Developed in-house RAG chatbots with graph generation using FAISS, PaLM, LangChain, and Looker SDK</li>
            <li>Python API developer for in-house AI marketing content generator (Django, Gemini, RAG)</li>
          </ul>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-date">Jan – Aug 2020</div>
        <div class="timeline-content">
          <h4>Research Analyst</h4>
          <div class="company">Ontario Ministry of Infrastructure · Toronto</div>
          <ul class="timeline-bullets">
            <li>Migrated legacy SQL scripts to R, optimizing data workflows with custom geocoding functions</li>
            <li>Location analysis with spatial data, geocoding, and construction funding estimates using R and SQL</li>
          </ul>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-date">Sep – Dec 2018</div>
        <div class="timeline-content">
          <h4>Project Assistant / Learning Developer</h4>
          <div class="company">Seneca College · Markham, ON</div>
          <ul class="timeline-bullets">
            <li>Designed online courses and vector arts using Articulate 360, WordPress, and Adobe Creative Cloud</li>
          </ul>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-date">Jan – Apr 2018</div>
        <div class="timeline-content">
          <h4>Event Management Trainee</h4>
          <div class="company">Canadian Chamber of Commerce · Hong Kong</div>
          <ul class="timeline-bullets">
            <li>Monitored membership database and produced P&amp;L reports using Excel and NeonCRM</li>
            <li>Designed infographics, booklets, and marketing campaigns using Adobe CC and Mailchimp</li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- EDUCATION -->
<section id="education">
  <div class="container section-fade">
    <div class="section-label">Education</div>
    <h2 class="section-title">Academic Background</h2>
    <p class="section-sub">Degrees and certifications.</p>
    <div class="edu-list">

      <div class="edu-card">
        <h4>Master of Data Science (MSDS)</h4>
        <div class="edu-school">City University of Hong Kong · Hong Kong</div>
        <div class="edu-meta">
          2023 – 2025 &nbsp;·&nbsp; 4.0 GPA &nbsp;·&nbsp; Distinction<br>
          Research: Multimodal Recommendation Systems &amp; Federated Learning<br>
          Courses: NLP, Stochastic Optimizations, Dynamic Programming &amp; Reinforcement Learning
        </div>
        <span class="edu-badge">Distinction</span>
      </div>

      <div class="edu-card">
        <h4>Bachelor of Arts — Econometrics &amp; Business (Co-op)</h4>
        <div class="edu-school">University of Waterloo · Kitchener, ON</div>
        <div class="edu-meta">2016 – 2021 &nbsp;·&nbsp; 3.7 GPA &nbsp;·&nbsp; Distinction</div>
        <span class="edu-badge">Distinction</span>
      </div>

      <div class="edu-card">
        <h4>Professional Machine Learning Engineer (PMLE)</h4>
        <div class="edu-school">Google Cloud · Certification</div>
        <div class="edu-meta">Scheduled: May 2026</div>
        <span class="edu-badge upcoming">Upcoming</span>
      </div>

    </div>
  </div>
</section>

<!-- CONTACT -->
<section id="contact">
  <div class="container section-fade">
    <div class="section-label">Contact</div>
    <h2 class="section-title">Get In Touch</h2>
    <p class="section-sub">Open to AI/ML projects, research collaborations, and opportunities.</p>
    <div class="contact-links">
      <a href="https://github.com/steveksh" class="contact-link" target="_blank" rel="noopener">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
        GitHub
      </a>
      <a href="https://linkedin.com/in/steve-kan-789907157" class="contact-link" target="_blank" rel="noopener">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        LinkedIn
      </a>
      <a href="mailto:kanstevie4@gmail.com" class="contact-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        Email
      </a>
    </div>
  </div>
</section>

<footer>
  <p>Built with GitHub Pages &nbsp;·&nbsp; © 2026 Steve Kan</p>
</footer>

<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open index.html in Chrome and verify**

Check:
- Inter font loads (text should look noticeably different from system-ui)
- No aurora blobs, no neural canvas visible
- Hero shows name + blinking cursor (typed text starts after ~600ms)
- All 7 sections appear with correct headings
- Nav links scroll to the right sections

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: rewrite index.html with academic researcher layout and resume content"
```

---

### Task 4: Update blog/index.html nav

**Files:**
- Modify: `blog/index.html`

- [ ] **Step 1: Update the nav in blog/index.html**

Replace the entire `<nav>` block in `blog/index.html` with:

```html
<nav>
  <a href="../index.html" class="nav-logo">steveksh</a>
  <ul class="nav-links">
    <li><a href="../index.html#research">Research</a></li>
    <li><a href="../index.html#papers">Papers</a></li>
    <li><a href="../index.html#projects">Projects</a></li>
    <li><a href="../index.html#experience">Experience</a></li>
    <li><a href="../index.html#education">Education</a></li>
    <li><a href="../index.html#contact">Contact</a></li>
    <li><a href="index.html" class="active">Blog</a></li>
  </ul>
  <button class="nav-hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">
    <span></span>
    <span></span>
    <span></span>
  </button>
</nav>
<div class="nav-drawer" id="nav-drawer">
  <a href="../index.html#research">Research</a>
  <a href="../index.html#papers">Papers</a>
  <a href="../index.html#projects">Projects</a>
  <a href="../index.html#experience">Experience</a>
  <a href="../index.html#education">Education</a>
  <a href="../index.html#contact">Contact</a>
  <a href="index.html">Blog</a>
</div>
```

Also add these two lines to the `<head>` of `blog/index.html`, after the existing `<style>` block:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

And update the `body` font-family in the blog's inline `<style>`:

```css
body { background: var(--bg); color: var(--text); font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; }
```

And add at the bottom of the blog's `<style>` block:

```css
.nav-hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 8px; min-width: 44px; min-height: 44px; align-items: center; justify-content: center; }
.nav-hamburger span { display: block; width: 22px; height: 2px; background: var(--text); border-radius: 2px; }
.nav-drawer { display: none; position: fixed; top: 60px; left: 0; right: 0; background: var(--bg); border-bottom: 1px solid var(--border); padding: 0.5rem 0; z-index: 99; flex-direction: column; }
.nav-drawer.open { display: flex; }
.nav-drawer a { display: block; color: var(--muted); text-decoration: none; font-size: 0.9rem; padding: 0.8rem 2rem; border-bottom: 1px solid var(--border); transition: color 0.2s; min-height: 44px; }
.nav-drawer a:last-child { border-bottom: none; }
.nav-drawer a:hover { color: var(--text); }
@media (max-width: 768px) { nav ul { display: none; } .nav-hamburger { display: flex; } }
```

And add the hamburger JS before `</body>`:

```html
<script>
(function () {
  var btn = document.getElementById('hamburger');
  var drawer = document.getElementById('nav-drawer');
  if (!btn || !drawer) return;
  btn.addEventListener('click', function () {
    var isOpen = drawer.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });
})();
</script>
```

- [ ] **Step 2: Open blog/index.html in Chrome and verify nav links work**

- [ ] **Step 3: Commit**

```bash
git add blog/index.html
git commit -m "feat: update blog nav to match redesigned site structure"
```

---

### Task 5: Responsive testing + final commit

**Files:** No code changes — verification only

- [ ] **Step 1: Test at mobile 375px (iPhone SE)**

Open Chrome DevTools → Device Toolbar → set to 375px wide.
Verify:
- Hamburger button appears (nav links hidden)
- Tapping hamburger shows the drawer
- Drawer links navigate correctly and close the drawer
- Timeline items stack vertically (single column)
- Paper cards stack vertically
- Projects grid goes to 1 column
- All text is readable without horizontal scroll

- [ ] **Step 2: Test at tablet 768px**

Set DevTools to 768px wide.
Verify:
- Hamburger still showing (breakpoint is ≤768px)
- Projects show in a 2-column grid (auto-fill kicks in)
- Paper cards are still stacked

- [ ] **Step 3: Test at desktop 1280px**

Set DevTools to 1280px wide.
Verify:
- Full nav visible (no hamburger)
- Projects in 3-column grid
- Timeline shows 2-column layout (date | content)
- Paper cards show inline (title left, Read button right)
- Scroll fade-in works (sections animate in as you scroll)
- Typed text cycles through all 5 phrases correctly

- [ ] **Step 4: Final commit**

```bash
git add -A
git status
git commit -m "chore: personal site redesign complete — academic aesthetic, responsive, resume content updated"
```

- [ ] **Step 5: Push to GitHub Pages**

```bash
git push origin main
```

After ~1 minute, visit https://steveksh.github.io to verify the live site matches local.

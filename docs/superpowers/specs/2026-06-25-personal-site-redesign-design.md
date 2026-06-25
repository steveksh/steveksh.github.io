# Personal Site Redesign — Design Spec
*Date: 2026-06-25*

## Goal
Redesign steveksh.github.io from a "dark portfolio with animations" to a clean, academic-researcher aesthetic that surfaces research credentials, real impact metrics, and personality through content rather than visual noise. Fully responsive (mobile + desktop). Vanilla JS only — no build step, stays deployable on GitHub Pages as-is.

## Aesthetic Foundation
- **Background:** Single near-black `#0a0a0f` across entire page — no alternating section fills, no aurora blobs, no neural canvas
- **Font:** Inter via Google Fonts CDN (body 15px, generous heading scale)
- **Primary accent:** `#58a6ff` (blue) — section labels, links, tags
- **Secondary accent:** `#a78bfa` (purple) — research-area tags only
- **Section dividers:** Single `1px` horizontal rules, no color blocks
- **Remove entirely:** Aurora animation, neural network canvas, Gojo easter egg, all `rgba` section backgrounds

## Page Structure
```
Sticky Nav (hamburger on mobile ≤768px)
Hero
Research
Papers
Projects
Experience
Education
Contact
Footer
```

## Section Details

### Nav
- Logo: `steveksh` in accent blue
- Links: Research · Papers · Projects · Experience · Education · Contact · Blog
- Mobile: hamburger icon (☰) toggles a full-width dropdown menu — vanilla JS toggle
- Sticky, backdrop-filter blur, thin bottom border

### Hero
- GitHub avatar (110px circle, accent border)
- Name: `Steve Kan` — large, bold
- Typed JS effect cycling through: `"AI Engineer"` → `"Federated Learning"` → `"LLM Agents"` → `"Reinforcement Learning"` → `"RecSys"` (simple vanilla JS, no library)
- 2-line bio: punchy, first-person, non-corporate
- CTA buttons: `GitHub Profile` (primary) + `View Research` (outline, scrolls to #research)

### Research
- Section label: `RESEARCH` small-caps
- Research area tags: Federated Learning, Recommendation Systems, Reinforcement Learning, LLM Agents, MLOps
- "Currently" callout card: `"Deepening reinforcement learning algorithms. Next up: robotics and frontend development."` — styled as a highlighted note

### Papers
- Full titles from resume:
  1. Vertical Federated Learning – An Application for Financial Institutions (co-author, July 2024)
  2. Multimodal Recommendation Engine with Feature Encoders
  3. Blackjack Reinforcement Learning
- Each paper: title, 1-line description, tag, "Read Paper" button linking to Google Drive PDFs
- Elevated visual treatment — larger cards, more whitespace

### Projects
- Grid layout (auto-fill, min 270px) — same as current but cleaned up
- Richer descriptions from resume (Learn2Play: native iOS/Dart + GCP + HKD 100K funding)
- Featured card for Learn2Play and Federated Learning
- Remove emojis from card icons, replace with minimal SVG icons

### Experience
- Timeline with real metrics surfaced:
  - Wipro Capco (Feb 2026–Present): AI underwriting agent, Siamese nets, A2A orchestration
  - Richemont (Jun 2024–Jan 2026): €3M+ incremental revenue, 68–82% Top-K accuracy, 14 forecasting models
  - Hotmob (Jul 2022–Jun 2024): BERT classifier, fraud detection, RAG chatbots
  - Ontario Ministry (Jan–Aug 2020): Geocoding, R workflows
  - Seneca College (Sept–Dec 2018): eLearning development
  - Canadian Chamber of Commerce (Jan–Apr 2018): Events, membership DB

### Education (new section)
- City University of Hong Kong — MSc Data Science (2023–2025), 4.0 GPA, Distinction
  - Research areas: Multimodal Recommendation Systems, Federated Learning
  - Relevant courses: NLP, Stochastic Optimizations, DP & RL
- University of Waterloo — BA Econometrics + Business Co-op (2016–2021), 3.7 GPA, Distinction
- Google Cloud PMLE — scheduled May 2026

### Contact
- Email + GitHub links, centered
- Short open-to-opportunities copy

## JavaScript (Vanilla Only)

1. **Typed hero effect** — cycles text in the tagline, simple setInterval with character-by-character write + erase
2. **Mobile hamburger menu** — toggle class on nav, CSS handles show/hide
3. **Scroll fade-in** — IntersectionObserver on all `.section-fade` elements, adds `.visible` class that triggers CSS `opacity` + `translateY` transition
4. **Active nav highlight** — IntersectionObserver per section, updates nav link `aria-current` + style

## Responsiveness
- Mobile breakpoint: `≤768px` — hamburger nav, single-column layouts
- Tablet: `769px–1024px` — 2-col grid for projects
- Desktop: `>1024px` — full layout
- All font sizes use `clamp()` for fluid scaling
- Touch targets minimum 44px

## Content Updates (from resume)
- Capco entry: retitle "Wipro Capco", add 4–5 bullet points
- Richemont: add metrics (€3M+, accuracy ranges)
- Hotmob: mention BERT, RAG, fraud detection
- Learn2Play: Dart/iOS, GCP, HKD 100K seed funding
- Paper titles updated to match resume exactly
- Education section: new, pulled from resume
- Canadian Chamber of Commerce: add to experience

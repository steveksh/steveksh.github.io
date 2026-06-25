# Split-Panel Layout Redesign — Design Spec
*Date: 2026-06-25*

## Goal
Replace the single-column scroll site with a two-column split-panel layout: fixed left sidebar (profile) + right tabbed content panel. Light mode. No infinite scrolling.

## Layout
- Full-viewport, no page-level scroll
- Left sidebar: `260px` fixed width, `#f3f4f6` background, `1px #e5e7eb` right border
- Right panel: `calc(100vw - 260px)`, `#ffffff`, overflow-y auto per tab
- Max-width wrapper: `1200px` centered, full-height
- Mobile ≤768px: sidebar becomes compact top banner (avatar + name + links inline), tabs become horizontal scrollable row, content panel below

## Left Sidebar Content
- Avatar (88px circle, thin `#e5e7eb` border)
- Name: Steve Kan (bold, `#111827`)
- Typed cycling title (vanilla JS, same phrases as before)
- Research area tags (`#7c3aed` pill style)
- Divider line
- Links: GitHub, LinkedIn, Email (icon + label, full-width buttons)

## Right Panel — Tabs
Tab bar at top of right panel: Research | Papers | Projects | Experience | Education
- Active tab: `#2563eb` bottom border + `#111827` text
- Inactive: `#6b7280` text
- On click: old content fades out, new content fades in (CSS opacity transition 200ms)
- JS manages `data-tab` attributes, no page reload

## Color Palette (Light Mode)
- Page bg: `#f3f4f6` (sidebar), `#ffffff` (content)
- Primary text: `#111827`
- Muted text: `#6b7280`
- Border: `#e5e7eb`
- Accent: `#2563eb` (blue — active tabs, links)
- Research tags: `#7c3aed` (purple)
- Green badges: `#16a34a`

## JS (Vanilla)
- Tab switching: click handler on tab bar, toggle `active` class, fade content panels
- Typed hero text: same IIFE as before
- Mobile hamburger: not needed (sidebar always visible or collapses to banner)

## Files Changed
- `index.html` — full rewrite (new structure)
- `css/style.css` — full rewrite (light mode, split panel)
- `js/main.js` — update (add tab switching, keep typed text, remove hamburger)
- `blog/index.html` — update nav styling only (light mode colors)

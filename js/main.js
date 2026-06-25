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

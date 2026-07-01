// ── TAB SWITCHING ────────────────────────────────────────────
(function () {
  var tabs = document.querySelectorAll('.tab-btn');
  var panes = document.querySelectorAll('.tab-pane');
  if (!tabs.length || !panes.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = this.getAttribute('data-tab');

      tabs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');

      panes.forEach(function (pane) {
        pane.classList.remove('active');
      });

      var targetPane = document.getElementById('tab-' + target);
      if (targetPane) {
        targetPane.classList.add('active');
        targetPane.scrollTop = 0;
      }
    });
  });
})();

// ── TYPED HERO TEXT ──────────────────────────────────────────
(function () {
  var el = document.getElementById('typed-text');
  if (!el) return;

  var phrases = ['AI Engineer', 'Data Scientist / Data Engineer', 'Machine Learning Engineer', 'Cloud Solution Architect', 'Federated Learning', 'Agentic Workflows', 'Reinforcement Learning', 'Recommendation Systems'];
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

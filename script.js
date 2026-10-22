const toggle = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const label = document.getElementById('themeLabel');
  const body = document.body;

  function applyTheme(theme){
    body.setAttribute('data-theme', theme);
    if(theme === 'dark'){ icon.textContent = '☀'; label.textContent = 'Terang'; }
    else { icon.textContent = '☾'; label.textContent = 'Gelap'; }
  }

  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'dark' : 'light');

  toggle.addEventListener('click', () => {
    const current = body.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  // One orchestrated load moment: draw the hero connector line once.
  const line = document.getElementById('drawLine');
  if(line){
    const len = line.getTotalLength();
    line.style.strokeDasharray = len;
    line.style.strokeDashoffset = len;
    requestAnimationFrame(() => {
      line.style.transition = 'stroke-dashoffset 1.1s ease .15s';
      line.style.strokeDashoffset = '0';
    });
  }

(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  /* ================= Data ================= */
  const ICON = (slug, color) => 'https://cdn.simpleicons.org/' + slug + (color ? '/' + color : '');
  const TECH = {
    'PHP': ICON('php'), 'Laravel': ICON('laravel'), 'MySQL': ICON('mysql'),
    'Dart': ICON('dart'), 'Flutter': ICON('flutter'), 'FastAPI': ICON('fastapi'),
    'Python': ICON('python'), 'Scikit-learn': ICON('scikitlearn'), 'OpenCV': ICON('opencv'),
    'Git': ICON('git'), 'GitHub': ICON('github', 'ffffff'), 'Figma': ICON('figma')
  };

  const PROJECTS = [
    {
      id: 'capsee', title: 'Capsee', image: 'images/capsee.png',
      desc: 'Aplikasi mobile untuk memantau dan mendeteksi kondisi tanaman cabai pasca berbunga dengan machine learning.',
      longDesc: 'Capsee adalah aplikasi mobile untuk memantau dan mendeteksi kondisi tanaman cabai pasca berbunga dengan machine learning. Pengguna memotret tanaman lewat kamera atau galeri, lalu aplikasi memberi diagnosis dan rekomendasi penanganan. Proyek ini dikerjakan bersama tim PBL, dan saya mengerjakan halaman Riwayat serta Rekomendasi Penanganan.',
      tags: ['Flutter', 'Dart', 'FastAPI', 'Python', 'Figma', 'GitHub'],
      repo: 'https://github.com/sileysa/capsee'
    },
    {
      id: 'absensi-vhiadrink', title: 'Absensi Vhiadrink', image: 'images/absensi-vhiadrink.png',
      desc: 'Aplikasi absensi berbasis web yang dibangun dengan Laravel untuk mencatat kehadiran secara digital.',
      longDesc: 'Absensi Vhiadrink adalah aplikasi absensi berbasis web yang dibangun dengan Laravel untuk mencatat kehadiran secara digital. Aplikasi ini membantu proses pencatatan lebih rapi dan mudah dipantau.',
      tags: ['PHP', 'Laravel', 'MySQL', 'GitHub'],
      repo: 'https://github.com/sileysa/Absensi_Vhiadrink', demo: 'https://robbycatur.web.id/'
    },
    {
      id: 'koskita', title: 'KosKita', image: 'images/koskita.png',
      desc: 'Website kos hasil proyek PBL semester 4 bersama Kelompok 1, dievaluasi dengan standar ISO 25010.',
      longDesc: 'KosKita adalah website kos hasil proyek PBL semester 4 bersama Kelompok 1. Kualitas perangkat lunaknya dievaluasi dengan standar ISO 25010, dan website ini sudah bisa diakses secara online.',
      tags: ['PHP', 'Laravel', 'MySQL', 'ISO 25010', 'GitHub'],
      repo: 'https://github.com/sileysa/PBL_Kel1-Kos', demo: 'https://sileysa.my.id/'
    },
    {
      id: 'website-inlet', title: 'Website Inlet', image: 'images/website-inlet.png',
      /* Ganti deskripsi ini dengan penjelasan proyek Inlet yang sebenarnya */
      desc: 'Proyek pembuatan website Inlet. Buka repository untuk melihat struktur dan kodenya.',
      longDesc: 'Website Inlet adalah proyek pembuatan website. Buka repository di GitHub untuk melihat struktur dan kodenya.',
      tags: ['Git', 'GitHub'],
      repo: 'https://github.com/sileysa/website-inlet', demo: 'https://pblinlet.vercel.app/'
    }
  ];

  const CERTIFICATES = [
    {
      date: '2024',
      image: 'images/certificates/sertif-pkm.jpg'
    },
    {
      date: '2026',
      image: 'images/certificates/sertif-benpel.png'
    },
    {
      date: '2025',
      image: 'images/certificates/sertif-kopdd.png'
    },
    {
      date: '2025',
      image: 'images/certificates/koor-acara.png'
    },
    {
      date: '2025',
      image: 'images/certificates/koor-konsumsi.png'
    },
    {
      date: '2025',
      image: 'images/certificates/anggota-acara.png'
    },
    {
      date: '2025',
      image: 'images/certificates/anggota-kestari.png'
    },
    {
      date: '2025',
      image: 'images/certificates/anggota-humas.png'
    },
    {
      date: '2026',
      image: 'images/certificates/anggota-humas-2.png'
    },
    {
      date: '2025',
      image: 'images/certificates/anggota-konsumsi.png'
    },
  ];

  const SKILLS = ['PHP', 'Laravel', 'MySQL', 'Dart', 'Flutter', 'FastAPI', 'Python', 'Scikit-learn', 'OpenCV', 'Git', 'GitHub', 'Figma'];

  const ROLES = ['Informatics Engineering Student', 'Web Developer (Laravel)', 'Mobile Developer (Flutter)', 'Open for Internship'];

  const EMAIL = 'sileysafaedatulnuraini984@gmail.com';

  /* ================= Loader ================= */
  const loader = $('#loader');
  function startLoader() {
    if (sessionStorage.getItem('portfolio-intro') === '1' || reduceMotion) { loader.remove(); return; }
    document.body.classList.add('locked');
    const num = $('#loaderNum'), bar = $('#loaderBar');
    const DURATION = 2200, t0 = performance.now();
    (function step(now) {
      const p = Math.min(1, (now - t0) / DURATION);
      const v = Math.round(p * 100);
      num.textContent = v;
      bar.style.transform = 'scaleX(' + (v / 100) + ')';
      if (p < 1) return requestAnimationFrame(step);
      setTimeout(() => {
        loader.classList.add('is-leaving');
        document.body.classList.remove('locked');
        sessionStorage.setItem('portfolio-intro', '1');
        setTimeout(() => loader.remove(), 800);
      }, 250);
    })(t0);
  }
  try { startLoader(); } catch (e) { loader && loader.remove(); document.body.classList.remove('locked'); }

  /* ================= Bintang & meteor ================= */
  (function stars() {
    const c = $('#stars'); if (!c) return;
    const x = c.getContext('2d');
    let w = 0, h = 0, list = [];
    const mobile = matchMedia('(max-width:767px)').matches;
    const COUNT = mobile ? 150 : 300;
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 2);
      w = window.innerWidth; h = window.innerHeight;
      c.width = w * dpr; c.height = h * dpr;
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function make() {
      list = Array.from({ length: COUNT }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: 0.4 + Math.random() * 1.3, s: 0.08 + Math.random() * 0.35, a: 0.2 + Math.random() * 0.7
      }));
    }
    function draw() {
      x.clearRect(0, 0, w, h);
      for (const s of list) {
        x.globalAlpha = s.a;
        x.fillStyle = '#fff';
        x.beginPath(); x.arc(s.x, s.y, s.r, 0, 6.2832); x.fill();
        if (!reduceMotion) { s.y -= s.s; if (s.y < -4) { s.y = h + 4; s.x = Math.random() * w; } }
      }
      x.globalAlpha = 1;
    }
    resize(); make(); draw();
    window.addEventListener('resize', () => { resize(); make(); draw(); });
    if (reduceMotion) return;
    let paused = false;
    document.addEventListener('visibilitychange', () => { paused = document.hidden; if (!paused) loop(); });
    function loop() { if (paused) return; draw(); requestAnimationFrame(loop); }
    loop();

    const m = $('#meteors');
    if (m && !mobile) {
      for (let i = 0; i < 10; i++) {
        const s = document.createElement('span');
        s.className = 'meteor';
        s.style.setProperty('--t', (-15 + Math.random() * 50) + '%');
        s.style.setProperty('--l', (-10 + Math.random() * 100) + '%');
        s.style.setProperty('--d', (8 + Math.random() * 5) + 's');
        s.style.setProperty('--delay', (-Math.random() * 12) + 's');
        m.appendChild(s);
      }
    }
  })();

  /* ================= Navbar ================= */
  const burger = $('#burger'), navMobile = $('#navMobile');
  burger.addEventListener('click', () => {
    const open = navMobile.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
  });
  $$('a', navMobile).forEach(a => a.addEventListener('click', () => {
    navMobile.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false');
  }));
  const SECTIONS = ['Home', 'About', 'Portofolio', 'Contact'];
  function spy() {
    const line = window.innerHeight * 0.38;
    let current = SECTIONS[0];
    SECTIONS.forEach(id => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= line) current = id; });
    $$('[data-section]').forEach(a => a.classList.toggle('is-active', a.dataset.section === current));
  }
  window.addEventListener('scroll', spy, { passive: true });
  window.addEventListener('resize', spy);
  spy();

  /* ================= Mesin ketik ================= */
  (function typewriter() {
    const el = $('#typeText'); if (!el) return;
    if (reduceMotion) { el.textContent = ROLES[0]; return; }
    let role = 0, idx = 0, deleting = false;
    function tick() {
      const word = ROLES[role];
      if (!deleting) {
        idx++; el.textContent = word.slice(0, idx);
        if (idx === word.length) { deleting = true; return setTimeout(tick, 2000); }
        return setTimeout(tick, 90);
      }
      idx--; el.textContent = word.slice(0, idx);
      if (idx === 0) { deleting = false; role = (role + 1) % ROLES.length; return setTimeout(tick, 300); }
      setTimeout(tick, 45);
    }
    tick();
  })();

  /* ================= Kartu gantung (fisika sederhana) ================= */
  (function lanyard() {
    const root = $('#lanyard'); if (!root) return;
    const pivot = $('.lanyard-pivot', root);
    const card = $('.card-hang', root);
    const flipEl = $('.card-flip', root);
    let ang = 0, vel = 0, flip = 0, flipTarget = 0;
    let dragging = false, moved = false, lastAng = 0, lastT = performance.now(), lastFlipAt = performance.now();
    let visible = true;

    function anchor() { const r = pivot.getBoundingClientRect(); return { x: r.left, y: r.top }; }
    function toggleFlip() { flipTarget = flipTarget === 0 ? 180 : 0; lastFlipAt = performance.now(); if (reduceMotion) { flip = flipTarget; apply(); } }
    function apply() {
      pivot.style.transform = 'rotate(' + ang.toFixed(2) + 'deg)';
      flipEl.style.transform = 'rotateY(' + flip.toFixed(1) + 'deg)';
    }

    card.addEventListener('pointerdown', e => {
      dragging = true; moved = false; vel = 0;
      card.setPointerCapture(e.pointerId);
    });
    card.addEventListener('pointermove', e => {
      if (!dragging) return;
      const a = anchor();
      const dx = e.clientX - a.x, dy = Math.max(60, e.clientY - a.y);
      const next = -Math.atan2(dx, dy) * 180 / Math.PI;
      if (Math.abs(next - ang) > 0.6) moved = true;
      ang = Math.max(-40, Math.min(40, next));
      if (reduceMotion) apply();
    });
    function release() { if (!dragging) return; dragging = false; lastFlipAt = performance.now(); if (!moved) toggleFlip(); }
    card.addEventListener('pointerup', release);
    card.addEventListener('pointercancel', () => { dragging = false; });
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFlip(); } });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(es => { visible = es[0].isIntersecting; }, { threshold: 0 }).observe(root);
    }

    if (reduceMotion) { apply(); return; }
    function tick(now) {
      const dt = Math.min(0.033, (now - lastT) / 1000); lastT = now;
      if (visible) {
        if (dragging) {
          vel = (ang - lastAng) / Math.max(dt, 0.001) * 0.6 + vel * 0.4;
        } else {
          const acc = -32 * ang - 1.7 * vel + Math.sin(now / 1500) * 2.2;
          vel += acc * dt; ang += vel * dt;
        }
        lastAng = ang;
        if (!dragging && now - lastFlipAt > 7000) toggleFlip();
        flip += (flipTarget - flip) * Math.min(1, dt * 6);
        apply();
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  })();

  /* ================= Foto About: sorot untuk foto kedua ================= */
  (function portrait() {
    const stage = $('#portraitStage'); if (!stage) return;
    const frame = $('.portrait', stage);
    let timer;
    frame.addEventListener('pointermove', e => {
      const r = frame.getBoundingClientRect();
      stage.style.setProperty('--hx', ((e.clientX - r.left) / r.width * 100) + '%');
      stage.style.setProperty('--hy', ((e.clientY - r.top) / r.height * 100) + '%');
      stage.classList.add('is-hover');
      clearTimeout(timer);
    });
    frame.addEventListener('pointerleave', () => { timer = setTimeout(() => stage.classList.remove('is-hover'), 1500); });
  })();

  /* ================= Portfolio: render ================= */
  function techChip(name) {
    const url = TECH[name];
    const chip = document.createElement('span');
    chip.className = 'chip';
    if (url) {
      const img = document.createElement('img');
      img.src = url; img.alt = ''; img.loading = 'lazy';
      img.addEventListener('error', () => img.remove());
      chip.appendChild(img);
    }
    chip.appendChild(document.createTextNode(name));
    return chip;
  }

  const grid = $('#projectGrid');
  PROJECTS.forEach(p => {
    const art = document.createElement('article');
    art.className = 'project-card reveal';
    art.innerHTML =
      '<div class="thumb photo"><img alt="" loading="lazy"><span class="photo-fallback" aria-hidden="true"></span></div>' +
      '<div class="card-body"><h3 class="card-title"></h3><p class="card-desc"></p>' +
      '<button type="button" class="details-btn"><span>Details</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button></div>';
    const thumb = $('.thumb', art), img = $('img', art);
    img.src = p.image; img.alt = 'Tampilan ' + p.title;
    img.addEventListener('error', () => thumb.classList.add('no-img'));
    $('.photo-fallback', art).textContent = p.title;
    $('.card-title', art).textContent = p.title;
    $('.card-desc', art).textContent = p.desc;
    $('.details-btn', art).addEventListener('click', () => { location.hash = '#/project/' + p.id; });
    grid.appendChild(art);
  });

  /* ================= Certificates: render ================= */

  const certificateGrid = $('#certificateGrid');

  CERTIFICATES.forEach(cert => {
    const card = document.createElement('article');
    card.className = 'certificate-card reveal';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'certificate-image';

    const img = document.createElement('img');
    img.src = cert.image;
    img.alt = 'Sertifikat ' + cert.title;
    img.loading = 'lazy';

    const info = document.createElement('div');
    info.className = 'certificate-info';

    const title = document.createElement('h3');
    title.textContent = cert.title;

    const issuer = document.createElement('p');
    issuer.textContent = cert.issuer;

    const date = document.createElement('span');
    date.textContent = cert.date;

    button.appendChild(img);

    button.addEventListener('click', () => {
      const preview = $('#certificatePreview');
      const previewImg = $('#certificatePreviewImg');

      previewImg.src = cert.image;
      previewImg.alt = 'Sertifikat ' + cert.title;
      preview.classList.add('is-open');
      preview.setAttribute('aria-hidden', 'false');
    });

    img.addEventListener('error', () => {
      card.classList.add('no-certificate');
    });

    info.append(title, issuer, date);
    card.append(button, info);
    certificateGrid.appendChild(card);
  });

  const certificatePreview = $('#certificatePreview');

  $('#certificateClose').addEventListener('click', () => {
    certificatePreview.classList.remove('is-open');
    certificatePreview.setAttribute('aria-hidden', 'true');
  });

  certificatePreview.addEventListener('click', e => {
    if (e.target === certificatePreview) {
      certificatePreview.classList.remove('is-open');
      certificatePreview.setAttribute('aria-hidden', 'true');
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      certificatePreview.classList.remove('is-open');
      certificatePreview.setAttribute('aria-hidden', 'true');
    }
  });

  const skillGrid = $('#skillGrid');
  SKILLS.forEach(name => {
    const card = document.createElement('article');
    card.className = 'tech-card';
    const img = document.createElement('img');
    img.className = 'tech-logo'; img.alt = ''; img.loading = 'lazy'; img.src = TECH[name];
    img.addEventListener('error', () => img.remove());
    const h = document.createElement('h3'); h.className = 'tech-name'; h.textContent = name;
    card.append(img, h);
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
    skillGrid.appendChild(card);
  });

  $$('.tab-btn').forEach(btn => btn.addEventListener('click', () => {
    $$('.tab-btn').forEach(b => { const on = b === btn; b.classList.toggle('is-active', on); b.setAttribute('aria-selected', String(on)); });
    $$('.tab-panel').forEach(p => { p.hidden = p.id !== 'panel-' + btn.dataset.tab; });
    revealScan();
  }));

  /* ================= Muncul saat scroll ================= */
  let io = null;
  function revealScan() {
    if (reduceMotion || !('IntersectionObserver' in window)) { $$('.reveal').forEach(el => el.classList.add('in')); return; }
    if (!io) io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    $$('.reveal:not(.in)').forEach(el => io.observe(el));
  }
  revealScan();

  /* ================= Halaman detail proyek ================= */
  const homeView = $('#homeView'), detailView = $('#detailView'), nav = $('#nav');
  let cameFromSite = false;
  function showDetail(p) {
    $('#detailTitle').textContent = p.title;
    $('#detailCrumb').textContent = p.title;
    $('#detailDesc').textContent = p.longDesc;
    const chips = $('#detailChips'); chips.textContent = '';
    p.tags.forEach(t => chips.appendChild(techChip(t)));
    const links = $('#detailLinks'); links.textContent = '';
    const repo = document.createElement('a');
    repo.className = 'btn-primary'; repo.href = p.repo; repo.target = '_blank'; repo.rel = 'noopener noreferrer'; repo.textContent = 'Lihat repository';
    links.appendChild(repo);
    if (p.demo) {
      const d = document.createElement('a');
      d.className = 'btn-secondary'; d.href = p.demo; d.target = '_blank'; d.rel = 'noopener noreferrer'; d.textContent = 'Buka website';
      links.appendChild(d);
    }
    const prev = $('#detailPreview'), img = $('#detailImg');
    prev.classList.remove('no-img');
    $('#detailFallback').textContent = p.title;
    img.alt = 'Tampilan ' + p.title; img.src = p.image;
    homeView.hidden = true; detailView.hidden = false; nav.hidden = true;
    document.title = p.title + ' | Sileysa Faedatul Nuraini';
    window.scrollTo(0, 0);
  }
  function showHome(scrollToPortfolio) {
    detailView.hidden = true; homeView.hidden = false; nav.hidden = false;
    document.title = 'Sileysa Faedatul Nuraini | Portofolio';
    if (scrollToPortfolio) requestAnimationFrame(() => { const el = $('#Portofolio'); if (el) el.scrollIntoView(); });
    revealScan();
  }
  function route() {
    const m = location.hash.match(/^#\/project\/([^/]+)\/?$/);
    const p = m && PROJECTS.find(x => x.id === decodeURIComponent(m[1]));
    if (p) { showDetail(p); } else if (!detailView.hidden) { showHome(true); }
  }
  window.addEventListener('hashchange', () => { cameFromSite = true; route(); });
  $('#detailBack').addEventListener('click', () => {
    if (cameFromSite) history.back(); else { history.replaceState(null, '', '#Portofolio'); route(); showHome(true); }
  });
  route();

  /* ================= Kontak ================= */
  const form = $('#contactForm'), note = $('#formNote');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(form);
    const name = String(d.get('name') || '').trim(), mail = String(d.get('email') || '').trim(), msg = String(d.get('message') || '').trim();
    const subject = 'Pesan portofolio dari ' + name;
    const body = msg + '\n\n— ' + name + ' (' + mail + ')';
    note.textContent = 'Membuka aplikasi email Anda...';
    window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
  $('#copyEmail').addEventListener('click', async e => {
    const btn = e.currentTarget, old = btn.textContent;
    try { await navigator.clipboard.writeText(EMAIL); btn.textContent = 'Email disalin'; }
    catch (err) { btn.textContent = EMAIL; }
    setTimeout(() => { btn.textContent = old; }, 2000);
  });

  /* ================= Footer ================= */
  $('#year').textContent = new Date().getFullYear();
  $('#toTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));
})();
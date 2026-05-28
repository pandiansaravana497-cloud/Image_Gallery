/**
 * GalleryLab — script.js
 * Handles: slides, autoplay, fullscreen, filters, keyboard, thumbnails, dots
 */

"use strict";

/* ── State ── */
let allImages   = [...GALLERY_DATA];   // GALLERY_DATA injected from Django template
let filtered    = [...allImages];
let cur         = 0;
let autoplay    = false;
let timer       = null;
const INTERVAL  = 4000;

/* ── DOM refs ── */
const slidesWrap   = document.getElementById('slides-wrap');
const dotsBar      = document.getElementById('dots-bar');
const thumbsStrip  = document.getElementById('thumbs-strip');
const counter      = document.getElementById('v-counter');
const progressFill = document.getElementById('progress-fill');
const capTitle     = document.getElementById('cap-title');
const capDesc      = document.getElementById('cap-desc');
const filterList   = document.getElementById('filter-list');
const navShowing   = document.getElementById('nav-showing');

// Sidebar info
const sbTitle = document.getElementById('sb-title');
const sbCat   = document.getElementById('sb-cat');
const sbIdx   = document.getElementById('sb-idx');
const sbTotal = document.getElementById('sb-total');

// Fullscreen
const fsOverlay = document.getElementById('fs-overlay');
const fsImg     = document.getElementById('fs-img');
const fsTitle   = document.getElementById('fs-title');
const fsDesc    = document.getElementById('fs-desc');
const fsCat     = document.getElementById('fs-cat');
const fsDots    = document.getElementById('fs-dots');

/* ════════════════════════════════════
   BUILD GALLERY
════════════════════════════════════ */
function buildGallery() {
  slidesWrap.innerHTML = '';
  dotsBar.innerHTML    = '';
  thumbsStrip.innerHTML = '';
  fsDots.innerHTML     = '';

  filtered.forEach((img, i) => {
    /* ── Slide ── */
    const slide = document.createElement('div');
    slide.className = 'slide' + (i === 0 ? ' active' : '');
    slide.innerHTML = `
      <img src="${img.src}" alt="${img.title}" loading="${i < 2 ? 'eager' : 'lazy'}"/>
      <div class="slide-overlay">
        <h2>${img.title}</h2>
        <p>${img.desc || img.description || ''}</p>
      </div>`;
    slide.addEventListener('click', openFullscreen);
    slidesWrap.appendChild(slide);

    /* ── Dot ── */
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsBar.appendChild(dot);

    /* ── FS Dot ── */
    const fsDot = document.createElement('button');
    fsDot.className = 'dot' + (i === 0 ? ' active' : '');
    fsDot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    fsDot.addEventListener('click', () => goTo(i));
    fsDots.appendChild(fsDot);

    /* ── Thumbnail ── */
    const thumb = document.createElement('div');
    thumb.className = 'thumb' + (i === 0 ? ' active' : '');
    thumb.innerHTML = `
      <img src="${img.src}" alt="${img.title}" loading="lazy"/>
      <div class="thumb-label">${img.title}</div>`;
    thumb.addEventListener('click', () => goTo(i));
    thumbsStrip.appendChild(thumb);
  });

  // Update filter counts
  updateFilterCounts();
}

/* ════════════════════════════════════
   NAVIGATION
════════════════════════════════════ */
function goTo(idx) {
  cur = (idx + filtered.length) % filtered.length;
  updateUI();
  if (autoplay) resetProgress();
}

function change(dir) { goTo(cur + dir); }

function updateUI() {
  const img = filtered[cur];

  /* Slides */
  document.querySelectorAll('#slides-wrap .slide').forEach((s, i) =>
    s.classList.toggle('active', i === cur));

  /* Dots (main + fs) */
  document.querySelectorAll('#dots-bar .dot').forEach((d, i) =>
    d.classList.toggle('active', i === cur));
  document.querySelectorAll('#fs-dots .dot').forEach((d, i) =>
    d.classList.toggle('active', i === cur));

  /* Thumbnails */
  const thumbs = thumbsStrip.querySelectorAll('.thumb');
  thumbs.forEach((t, i) => t.classList.toggle('active', i === cur));
  if (thumbs[cur]) {
    thumbs[cur].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  /* Counter */
  counter.textContent = `${cur + 1} / ${filtered.length}`;

  /* Caption */
  const desc = img.desc || img.description || '';
  capTitle.textContent = img.title;
  capDesc.textContent  = desc;

  /* Sidebar info */
  sbTitle.textContent = img.title;
  sbCat.textContent   = img.category || '—';
  sbIdx.textContent   = `${cur + 1} of ${filtered.length}`;

  /* Fullscreen sync */
  fsImg.src   = img.src;
  fsImg.alt   = img.title;
  fsTitle.textContent = img.title;
  fsDesc.textContent  = desc;
  fsCat.textContent   = img.category || '';
}

/* ════════════════════════════════════
   AUTOPLAY
════════════════════════════════════ */
function startProgress() {
  progressFill.style.transition = 'none';
  progressFill.style.width = '0%';
  requestAnimationFrame(() => requestAnimationFrame(() => {
    progressFill.style.transition = `width ${INTERVAL}ms linear`;
    progressFill.style.width = '100%';
  }));
}

function resetProgress() {
  clearTimeout(timer);
  startProgress();
  timer = setTimeout(() => change(1), INTERVAL);
}

function stopProgress() {
  clearTimeout(timer);
  progressFill.style.transition = 'none';
  progressFill.style.width = '0%';
}

function toggleAutoplay() {
  autoplay = !autoplay;
  const btn  = document.getElementById('autoplay-btn');
  const lbl  = document.getElementById('autoplay-label');
  const poly = document.getElementById('play-icon-poly');

  if (autoplay) {
    lbl.textContent = 'Pause';
    poly.setAttribute('points', '6,4 10,4 10,20 6,20 M14,4 18,4 18,20 14,20');
    btn.classList.add('hbtn--accent');
    resetProgress();
  } else {
    lbl.textContent = 'Autoplay';
    poly.setAttribute('points', '5,3 19,12 5,21');
    btn.classList.remove('hbtn--accent');
    stopProgress();
  }
}

/* ════════════════════════════════════
   FULLSCREEN
════════════════════════════════════ */
function openFullscreen() {
  updateUI();
  fsOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeFullscreen() {
  fsOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* ════════════════════════════════════
   FILTERS
════════════════════════════════════ */
function applyFilter(cat) {
  filtered = cat === 'All'
    ? [...allImages]
    : allImages.filter(img => img.category === cat);

  cur = 0;
  buildGallery();
  updateUI();
  navShowing.textContent = filtered.length;
  sbTotal.textContent    = filtered.length;

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cat === cat);
  });
}

function updateFilterCounts() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    const cat   = btn.dataset.cat;
    const count = cat === 'All'
      ? allImages.length
      : allImages.filter(img => img.category === cat).length;
    let badge = btn.querySelector('.filter-count');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'filter-count';
      btn.appendChild(badge);
    }
    badge.textContent = count;
  });
}

/* ════════════════════════════════════
   EVENT LISTENERS
════════════════════════════════════ */
document.getElementById('btn-prev').addEventListener('click',  () => change(-1));
document.getElementById('btn-next').addEventListener('click',  () => change(1));
document.getElementById('btn-prev2').addEventListener('click', () => change(-1));
document.getElementById('btn-next2').addEventListener('click', () => change(1));
document.getElementById('autoplay-btn').addEventListener('click', toggleAutoplay);
document.getElementById('fullscreen-btn').addEventListener('click', openFullscreen);
document.getElementById('fs-close').addEventListener('click', closeFullscreen);
document.getElementById('fs-prev').addEventListener('click', () => { change(-1); });
document.getElementById('fs-next').addEventListener('click', () => { change(1); });

/* Close FS on overlay bg click */
fsOverlay.addEventListener('click', e => {
  if (e.target === fsOverlay) closeFullscreen();
});

/* Filter buttons */
filterList.addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
  if (btn) applyFilter(btn.dataset.cat);
});

/* Keyboard */
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft')  { e.preventDefault(); change(-1); }
  if (e.key === 'ArrowRight') { e.preventDefault(); change(1); }
  if (e.key === ' ')          { e.preventDefault(); toggleAutoplay(); }
  if (e.key === 'f' || e.key === 'F') openFullscreen();
  if (e.key === 'Escape')     closeFullscreen();
});

/* Touch swipe on viewer */
(function() {
  let startX = 0;
  const viewer = document.getElementById('viewer');
  viewer.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  viewer.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) change(dx < 0 ? 1 : -1);
  });
})();

/* ════════════════════════════════════
   INIT
════════════════════════════════════ */
buildGallery();
updateUI();

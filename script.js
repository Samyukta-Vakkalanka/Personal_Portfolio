/* =====================================================
   NAVBAR — add .scrolled shadow after user scrolls
   ===================================================== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


/* =====================================================
   SCROLL FADE-IN — Intersection Observer
   ===================================================== */
const fadeEls = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Stagger siblings slightly for a nicer cascade
      const siblings = [...entry.target.parentElement.children].filter(
        el => el.classList.contains('fade-in')
      );
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 70);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => fadeObserver.observe(el));


/* =====================================================
   PROJECT FILTERS
   ===================================================== */
const filterBtns    = document.querySelectorAll('.filter-btn');
const projectCards  = document.querySelectorAll('.proj-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const categories = card.dataset.category || '';
      const show = filter === 'all' || categories.split(' ').includes(filter);
      card.classList.toggle('hidden', !show);
    });
  });
});


/* =====================================================
   HERO — animated data-point dots in background
   ===================================================== */
const heroDots = document.querySelector('.hero-bg-dots');

if (heroDots) {
  const count = 22;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'hero-dot';

    const size     = 3 + Math.random() * 7;
    const opacity  = 0.035 + Math.random() * 0.065;
    const duration = 4.5 + Math.random() * 6;
    const delay    = Math.random() * 5;

    // Spread across full hero, avoid very center where text lives
    const x = Math.random() * 100;
    const y = Math.random() * 100;

    dot.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      top: ${y}%;
      opacity: ${opacity};
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
    `;
    heroDots.appendChild(dot);
  }
}


/* =====================================================
   SMOOTH SCROLL for nav links (fallback for older Safari)
   ===================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 68; // nav height
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

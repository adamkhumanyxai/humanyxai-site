/* ============================================================
   HumanyxAI — scroll-reveal patch (reveal.js)
   Load after site.js with `defer`. Marks elements with
   [data-reveal] (or children of [data-reveal-group]) to rise in
   as they enter the viewport. No-JS and reduced-motion safe.
   ============================================================ */
(function () {
  // Respect reduced motion: skip arming entirely, content stays visible.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('reveal-armed');

  // Assign stagger indices within groups
  document.querySelectorAll('[data-reveal-group]').forEach(group => {
    Array.from(group.children).forEach((child, i) => {
      child.style.setProperty('--i', i);
    });
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('revealed');
      io.unobserve(entry.target); // reveal once, then leave it alone
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('[data-reveal], [data-reveal-group]').forEach(el => io.observe(el));
})();

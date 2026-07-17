(() => {
  const checkoutUrl = 'https://academy.itstart.com.ua/testdrive';
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

  // Load the latest mobile and CTA fixes without changing the main A-version.
  if (!$('link[data-5dniv-fixes]')) {
    const fixes = document.createElement('link');
    fixes.rel = 'stylesheet';
    fixes.href = 'fixes.css?v=2';
    fixes.dataset['5dnivFixes'] = 'true';
    document.head.appendChild(fixes);
  }

  // All vacancy examples in this B-version are presented as remote roles.
  $$('.vacancy-meta').forEach((node) => {
    node.textContent = 'Дистанційно';
  });

  $$('[data-checkout]').forEach((link) => {
    const url = new URL(checkoutUrl, window.location.href);
    const params = new URLSearchParams(window.location.search);
    params.forEach((value, key) => url.searchParams.set(key, value));
    link.href = url.toString();
  });

  const menuButton = $('.menu-button');
  const mobileNav = $('.mobile-nav');
  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      document.body.classList.toggle('menu-open', isOpen);
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });
    $$('a', mobileNav).forEach((link) => link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.classList.remove('menu-open');
      menuButton.setAttribute('aria-expanded', 'false');
    }));
  }

  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  // Do not cover the real purchase button with the sticky mobile bar.
  const pricingSection = $('.pricing-section');
  const mobileBuyBar = $('.mobile-buy-bar');
  if (pricingSection && mobileBuyBar && 'IntersectionObserver' in window) {
    const pricingObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        mobileBuyBar.classList.toggle('is-hidden', entry.isIntersecting);
      });
    }, { threshold: 0.12 });
    pricingObserver.observe(pricingSection);
  }

  const countdown = $('#offer-countdown');
  if (countdown) {
    const key = 'itstart-5dniv-deadline';
    const duration = 10 * 60 * 1000;
    let deadline = Number(sessionStorage.getItem(key));
    if (!deadline || deadline <= Date.now()) {
      deadline = Date.now() + duration;
      sessionStorage.setItem(key, String(deadline));
    }
    const render = () => {
      const remaining = Math.max(0, deadline - Date.now());
      const total = Math.ceil(remaining / 1000);
      countdown.textContent = `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
    };
    render();
    setInterval(render, 1000);
  }

  const year = $('#current-year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
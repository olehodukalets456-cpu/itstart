(() => {
  // ЄДИНІ НАЛАШТУВАННЯ, ЯКІ ТРЕБА ЗМІНИТИ ПЕРЕД ЗАПУСКОМ
  const CONFIG = {
    checkoutUrl: 'https://academy.itstart.com.ua/',
    price: '990',
  };

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

  // Ціна та checkout URL
  $$('[data-price]').forEach((node) => { node.textContent = CONFIG.price; });
  $$('[data-checkout]').forEach((link) => {
    const url = new URL(CONFIG.checkoutUrl, window.location.href);
    const current = new URLSearchParams(window.location.search);
    current.forEach((value, key) => url.searchParams.set(key, value));
    link.href = url.toString();
  });

  // Навігаційні CTA ведуть до ціни, checkout-кнопки — до платформи
  $$('[data-cta]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = $('#pricing');
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Mobile menu
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

  // Header state
  const header = $('.site-header');
  const setHeader = () => header?.classList.toggle('scrolled', window.scrollY > 20);
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  // Scroll reveal
  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  // Interactive QA challenge
  const targets = $$('.bug-target');
  const countNode = $('#challenge-count');
  const progressBar = $('#challenge-progress-bar');
  const feedback = $('#challenge-feedback');
  const resetButton = $('#reset-challenge');
  let found = new Set();

  const updateChallenge = (message) => {
    if (countNode) countNode.textContent = String(found.size);
    if (progressBar) progressBar.style.width = `${(found.size / Math.max(targets.length, 1)) * 100}%`;
    if (feedback && message) feedback.textContent = message;
    if (found.size === targets.length && feedback) {
      feedback.textContent = 'Готово. Ти щойно виконав базову exploratory-перевірку — на курсі навчимо оформлювати це професійно.';
      showToast('3/3 баги знайдено. Непогано для першої QA-задачі.');
    }
  };

  targets.forEach((target) => {
    target.addEventListener('click', () => {
      const bug = target.dataset.bug;
      if (!bug || found.has(bug)) return;
      found.add(bug);
      target.classList.add('found');
      target.setAttribute('aria-pressed', 'true');
      updateChallenge(target.dataset.message);
    });
  });

  resetButton?.addEventListener('click', () => {
    found = new Set();
    targets.forEach((target) => {
      target.classList.remove('found');
      target.setAttribute('aria-pressed', 'false');
    });
    updateChallenge('Підказка: перевір ціну, поле форми та текст кнопки.');
  });

  // Toast
  const toast = $('#toast');
  let toastTimer;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 3500);
  }

  // Track CTA intent before redirect. Pixel event fires only if fbq exists.
  $$('[data-checkout]').forEach((link) => {
    link.addEventListener('click', () => {
      if (typeof window.fbq === 'function') {
        window.fbq('trackCustom', 'CheckoutIntent', { product: 'QA Test Drive', value: Number(CONFIG.price), currency: 'UAH' });
      }
    });
  });

  $('#current-year').textContent = String(new Date().getFullYear());
})();

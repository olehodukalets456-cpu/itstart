(() => {
  const CONFIG = {
    checkoutUrl: 'https://academy.itstart.com.ua/testdrive',
    price: '990',
  };

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

  // Team copy
  $$('.person-name').forEach((node) => {
    if (node.textContent.trim() === 'Катя') node.textContent = 'Катерина';
  });

  $$('.person-card').forEach((card) => {
    const name = $('.person-name', card)?.textContent.trim();
    if (name === 'Катерина') {
      const note = $('.person-note', card);
      if (note) note.textContent = 'Координація навчання та підтримка студентів';
    }
  });

  $$('.mentor-card').forEach((card) => {
    const heading = $('h3', card);
    if (!heading) return;

    const name = heading.textContent.trim();
    const list = $('.mentor-list', card);
    if (!list) return;

    if (name === 'Олег Матвієв') {
      list.innerHTML = `
        <li>13 років досвіду в IT.</li>
        <li>5 років досвіду у викладанні онлайн.</li>
        <li>Має власну IT-компанію.</li>
        <li>Кар’єрний консультант для початківців.</li>
      `;
    }

    if (name === 'Катя' || name === 'Катерина') {
      heading.textContent = 'Катерина';
      const image = $('img', card);
      if (image) image.alt = 'Катерина — куратор навчального процесу';
      list.innerHTML = `
        <li>Координує навчальний процес і комунікацію зі студентами.</li>
        <li>Допомагає з навчальною платформою та організаційними питаннями.</li>
        <li>Стежить за прогресом і своєчасним проходженням матеріалів.</li>
        <li>Підтримує студентів на кожному етапі навчання.</li>
      `;
    }
  });

  $$('[data-price]').forEach((node) => {
    node.textContent = CONFIG.price;
  });

  $$('[data-checkout]').forEach((link) => {
    const url = new URL(CONFIG.checkoutUrl, window.location.href);
    const current = new URLSearchParams(window.location.search);
    current.forEach((value, key) => url.searchParams.set(key, value));
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

    $$('a', mobileNav).forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.classList.remove('menu-open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const header = $('.site-header');
  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 20);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  const countdown = $('#offer-countdown');
  if (countdown) {
    const storageKey = 'itstart-offer-deadline';
    const duration = 10 * 60 * 1000;
    let deadline = Number(sessionStorage.getItem(storageKey));

    if (!deadline || deadline <= Date.now()) {
      deadline = Date.now() + duration;
      sessionStorage.setItem(storageKey, String(deadline));
    }

    let timer;
    const renderCountdown = () => {
      const remaining = Math.max(0, deadline - Date.now());
      const totalSeconds = Math.ceil(remaining / 1000);
      const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
      const seconds = String(totalSeconds % 60).padStart(2, '0');
      countdown.textContent = `${minutes}:${seconds}`;
      if (remaining <= 0 && timer) clearInterval(timer);
    };

    renderCountdown();
    timer = setInterval(renderCountdown, 1000);
  }

  $$('[data-checkout]').forEach((link) => {
    link.addEventListener('click', () => {
      if (typeof window.fbq === 'function') {
        window.fbq('trackCustom', 'CheckoutIntent', {
          product: 'ITStart 5-day QA program',
          value: Number(CONFIG.price),
          currency: 'UAH',
        });
      }
    });
  });

  const yearNode = $('#current-year');
  if (yearNode) yearNode.textContent = String(new Date().getFullYear());
})();
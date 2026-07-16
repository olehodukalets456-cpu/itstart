(() => {
  // ЄДИНІ НАЛАШТУВАННЯ, ЯКІ ТРЕБА ЗМІНИТИ ПЕРЕД ЗАПУСКОМ
  const CONFIG = {
    checkoutUrl: 'https://academy.itstart.com.ua/',
    price: '990',
  };

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

  // Додаткові стилі блоку команди.
  if (!$('link[data-team-styles]')) {
    const teamStyles = document.createElement('link');
    teamStyles.rel = 'stylesheet';
    teamStyles.href = 'assets/team.css';
    teamStyles.dataset.teamStyles = 'true';
    document.head.appendChild(teamStyles);
  }

  // Перший екран: замінюємо демо з багами на команду програми.
  const heroVisual = $('.hero-visual');
  if (heroVisual) {
    heroVisual.setAttribute('aria-label', 'Команда програми ITStart');
    heroVisual.innerHTML = `
      <div class="hero-team">
        <div class="hero-team-kicker">Команда ITStart</div>
        <div class="hero-team-stage" aria-hidden="true">
          <img class="hero-person hero-oleh" src="assets/oleh.svg" alt="">
          <img class="hero-person hero-katya" src="assets/katya.svg" alt="">
        </div>
        <div class="hero-team-meta">
          <a class="team-chip" href="https://www.linkedin.com/in/olehmatviev32/" target="_blank" rel="noopener noreferrer">
            <strong>Олег Матвієв</strong>
            <span>Founder & Product Lead ↗</span>
          </a>
          <div class="team-chip">
            <strong>Катя</strong>
            <span>Куратор програми</span>
          </div>
        </div>
      </div>
    `;
  }

  // Прибираємо інтерактив «знайди баг» з першого екрана і весь окремий мінітест.
  const secondaryHeroButton = $('.hero-actions .button-ghost');
  if (secondaryHeroButton) {
    secondaryHeroButton.href = '#mentor';
    secondaryHeroButton.textContent = 'Хто веде програму';
  }
  $('#challenge')?.remove();

  // Оновлюємо блок команди нижче на сторінці.
  const mentorSection = $('#mentor');
  if (mentorSection) {
    mentorSection.innerHTML = `
      <div class="container mentor-grid">
        <div class="mentor-team-visual reveal">
          <img class="mentor-team-person mentor-team-oleh" src="assets/oleh.svg" alt="Олег Матвієв — засновник і Product Lead ITStart">
          <img class="mentor-team-person mentor-team-katya" src="assets/katya.svg" alt="Катя — куратор програми ITStart">
          <div class="mentor-team-labels">
            <div class="mentor-label">
              <strong>Олег Матвієв</strong>
              <span>Founder & Product Lead</span>
            </div>
            <div class="mentor-label">
              <strong>Катя</strong>
              <span>Куратор програми</span>
            </div>
          </div>
        </div>
        <div class="mentor-copy reveal delay-1">
          <div class="eyebrow eyebrow-dark"><span></span> Команда програми</div>
          <h2>За навчанням стоять <em>люди, а не безіменна платформа.</em></h2>
          <p class="mentor-intro">Олег відповідає за продуктову стратегію ITStart, структуру навчання та розвиток платформи. Його професійний профіль відкритий — поточну роль та інформацію про досвід можна переглянути у LinkedIn.</p>
          <div class="mentor-points">
            <div><strong>Продукт і програма</strong><span>Побудова навчального шляху, практичних матеріалів та цифрової платформи ITStart.</span></div>
            <div><strong>Вебпроєкти</strong><span>Робота з цифровими продуктами, користувацькими сценаріями та запуском онлайн-проєктів.</span></div>
            <div><strong>Відкрита репутація</strong><span>Публічний LinkedIn із роллю Founder & Product Lead at ITStart.</span></div>
          </div>
          <a class="text-link linkedin-link" href="https://www.linkedin.com/in/olehmatviev32/" target="_blank" rel="noopener noreferrer">Профіль Олега в LinkedIn</a>
          <div class="curator-note">
            <strong>Катя — куратор програми</strong>
            <span>Допомагає з навчальною платформою, організаційними питаннями та проходженням завдань.</span>
          </div>
        </div>
      </div>
    `;
  }

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

  // Track CTA intent before redirect. Pixel event fires only if fbq exists.
  $$('[data-checkout]').forEach((link) => {
    link.addEventListener('click', () => {
      if (typeof window.fbq === 'function') {
        window.fbq('trackCustom', 'CheckoutIntent', {
          product: 'QA Test Drive',
          value: Number(CONFIG.price),
          currency: 'UAH',
        });
      }
    });
  });

  const yearNode = $('#current-year');
  if (yearNode) yearNode.textContent = String(new Date().getFullYear());
})();

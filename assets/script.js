(() => {
  const CONFIG = {
    checkoutUrl: 'https://academy.itstart.com.ua/',
    price: '990',
  };

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

  if (!$('link[data-team-styles]')) {
    const teamStyles = document.createElement('link');
    teamStyles.rel = 'stylesheet';
    teamStyles.href = 'assets/team.css';
    teamStyles.dataset.teamStyles = 'true';
    document.head.appendChild(teamStyles);
  }

  const heroVisual = $('.hero-visual');
  if (heroVisual) {
    heroVisual.setAttribute('aria-label', 'Команда курсу ITStart');
    heroVisual.innerHTML = `
      <div class="hero-team-card">
        <div class="hero-team-headline">Команда курсу</div>
        <div class="hero-team-photos" aria-hidden="true">
          <img class="hero-team-photo hero-team-photo-oleh" src="assets/oleh.png" alt="">
          <img class="hero-team-photo hero-team-photo-katya" src="assets/katya.png" alt="">
        </div>
        <div class="hero-team-info-grid">
          <a class="person-card person-card-link" href="https://www.linkedin.com/in/olehmatviev32/" target="_blank" rel="noopener noreferrer">
            <div class="person-name">Олег Матвієв</div>
            <div class="person-role">Засновник академії та головний куратор курсу</div>
            <div class="person-note">Переглянути LinkedIn ↗</div>
          </a>
          <div class="person-card">
            <div class="person-name">Катя</div>
            <div class="person-role">Куратор навчального процесу</div>
            <div class="person-note">Супровід студентів та організаційна підтримка</div>
          </div>
        </div>
      </div>
    `;
  }

  const secondaryHeroButton = $('.hero-actions .button-ghost');
  if (secondaryHeroButton) {
    secondaryHeroButton.href = '#mentor';
    secondaryHeroButton.textContent = 'Команда курсу';
  }

  $('#challenge')?.remove();

  const mentorSection = $('#mentor');
  if (mentorSection) {
    mentorSection.innerHTML = `
      <div class="container mentor-section-inner">
        <div class="section-team-heading reveal">
          <div class="eyebrow eyebrow-dark"><span></span> Команда ITStart</div>
          <h2>Хто стоїть за програмою</h2>
        </div>

        <div class="mentor-cards reveal delay-1">
          <article class="mentor-card mentor-card-primary">
            <div class="mentor-photo-wrap mentor-photo-wrap-oleh">
              <img class="mentor-photo" src="assets/oleh.png" alt="Олег Матвієв — засновник академії та головний куратор курсу">
            </div>
            <div class="mentor-card-body">
              <h3>Олег Матвієв</h3>
              <p class="mentor-role">Засновник академії та головний куратор курсу</p>
              <ul class="mentor-list">
                <li>Відповідає за структуру навчання, логіку програми та якість матеріалів.</li>
                <li>Формує практичні завдання, щоб студенти працювали не з «водою», а з реальними сценаріями.</li>
                <li>Професійний профіль відкритий — поточну роль та досвід можна перевірити у LinkedIn.</li>
              </ul>
              <a class="mentor-link" href="https://www.linkedin.com/in/olehmatviev32/" target="_blank" rel="noopener noreferrer">LinkedIn Олега ↗</a>
            </div>
          </article>

          <article class="mentor-card">
            <div class="mentor-photo-wrap mentor-photo-wrap-katya">
              <img class="mentor-photo" src="assets/katya.png" alt="Катя — куратор навчального процесу">
            </div>
            <div class="mentor-card-body">
              <h3>Катя</h3>
              <p class="mentor-role">Куратор навчального процесу</p>
              <ul class="mentor-list">
                <li>Супроводжує студентів під час проходження програми.</li>
                <li>Допомагає з організаційними питаннями та навігацією по платформі.</li>
                <li>Стежить, щоб студент не «випав» з процесу та дійшов до результату.</li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    `;
  }

  $$('[data-price]').forEach((node) => { node.textContent = CONFIG.price; });
  $$('[data-checkout]').forEach((link) => {
    const url = new URL(CONFIG.checkoutUrl, window.location.href);
    const current = new URLSearchParams(window.location.search);
    current.forEach((value, key) => url.searchParams.set(key, value));
    link.href = url.toString();
  });

  $$('[data-cta]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = $('#pricing');
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
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

  const header = $('.site-header');
  const setHeader = () => header?.classList.toggle('scrolled', window.scrollY > 20);
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

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

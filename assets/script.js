// Meta Pixel
!function(f,b,e,v,n,t,s){
  if(f.fbq)return;
  n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
  t=b.createElement(e);t.async=!0;t.src=v;
  s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s);
}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','927099470417748');
fbq('track','PageView');

// TikTok Pixel
!function(w,d,t){
  w.TiktokAnalyticsObject=t;
  var ttq=w[t]=w[t]||[];
  ttq.methods=['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie','holdConsent','revokeConsent','grantConsent'];
  ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
  for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
  ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
  ttq.load=function(e,n){
    var r='https://analytics.tiktok.com/i18n/pixel/events.js',o=n&&n.partner;
    ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=r;
    ttq._t=ttq._t||{};ttq._t[e]=+new Date;
    ttq._o=ttq._o||{};ttq._o[e]=n||{};
    n=document.createElement('script');n.type='text/javascript';n.async=!0;n.src=r+'?sdkid='+e+'&lib='+t;
    e=document.getElementsByTagName('script')[0];e.parentNode.insertBefore(n,e);
  };
  ttq.load('D9F3T33C77U2EG6DNHE0');
  ttq.page();
}(window,document,'ttq');

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
        <li>Засновник ITStart і автор програми для новачків.</li>
        <li>Побудував навчання на практичних задачах QA, а не на сухій теорії.</li>
        <li>Допомагає пройти шлях від повного нуля до розуміння професії.</li>
        <li>Відповідає за методологію, практику та кар’єрний маршрут студентів.</li>
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

  // About QA copy shared by both landing variants.
  const aboutSummary = $('#about .large-copy .muted');
  if (aboutSummary) {
    aboutSummary.textContent = 'За 5 днів ви отримаєте набір знань для старту й зрозумієте, як виглядає робота тестувальника на практиці.';
  }

  // Compact career block copy for mobile and desktop.
  const careerCopy = $('.career-copy');
  if (careerCopy) {
    const intro = $('p', careerCopy);
    const emphasis = $('strong', careerCopy);

    if (intro) {
      intro.textContent = 'Це легка для опанування віддалена IT-професія: тестувальник перевіряє сайти й застосунки, знаходить помилки та допомагає команді випускати якісний продукт.';
    }

    if (emphasis) emphasis.remove();
  }

  const benefitContent = [
    ['Швидкий старт', 'Можна зайти в IT без технічної освіти, коду й сильної англійської.'],
    ['100% віддалено', 'Працюйте з дому або з будь-якої точки світу, де є інтернет.'],
    ['Стабільний попит', 'Бізнесу постійно потрібні спеціалісти, які перевіряють якість продукту.'],
    ['Зростання доходу', 'З досвідом і новими навичками дохід у QA зростає.'],
    ['Зрозумілий вхід', 'Професію реально опанувати дорослим новачкам без перевантаження.'],
    ['Розвиток далі', 'Після старту можна перейти в automation, аналітику, product або management.'],
  ];

  $$('.market-benefits article').forEach((card, index) => {
    const content = benefitContent[index];
    if (!content) return;
    const heading = $('h3', card);
    const text = $('p', card);
    if (heading) heading.textContent = content[0];
    if (text) text.textContent = content[1];
  });

  const marketBenefits = $('.market-benefits');
  if (marketBenefits && !$('.career-conclusion')) {
    const conclusion = document.createElement('div');
    conclusion.className = 'container career-conclusion reveal';
    conclusion.innerHTML = `
      <strong>Ми проведемо вас до першої роботи в IT.</strong>
      <a class="button button-primary button-large" data-checkout href="${CONFIG.checkoutUrl}">Почати старт у новій професії</a>
    `;
    marketBenefits.insertAdjacentElement('afterend', conclusion);
  }

  // Work.ua block: remote format and honest entry-level context.
  $$('.vacancy-meta').forEach((node) => {
    node.textContent = 'Дистанційно';
  });

  $$('.vacancy-card').forEach((card) => {
    if ($('.vacancy-entry-note', card)) return;
    const meta = $('.vacancy-meta', card);
    if (!meta) return;

    const note = document.createElement('div');
    note.className = 'vacancy-entry-note';
    note.textContent = 'На ринку є вакансії для кандидатів без комерційного досвіду.';
    meta.insertAdjacentElement('afterend', note);
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

(() => {
  'use strict';

  const doc = document.documentElement;
  const languageButton = document.querySelector('#lang-toggle');
  const languageLabel = document.querySelector('#lang-label');
  const themeButton = document.querySelector('#theme-toggle');
  const menuButton = document.querySelector('#mobile-toggle');
  const mobileNav = document.querySelector('#mobile-nav');
  const header = document.querySelector('.header');
  const metaDescription = document.querySelector('meta[name="description"]');
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  const LAUNCH_DATE_ISO = '2026-12-01T00:00:00+03:00';
  const LAUNCH_TIMESTAMP = Date.parse(LAUNCH_DATE_ISO);
  const SECOND_MS = 1000;
  const countdown = {
    values: document.querySelector('#countdown-values'),
    finished: document.querySelector('#countdown-finished'),
    days: document.querySelector('#countdown-days'),
    hours: document.querySelector('#countdown-hours'),
    minutes: document.querySelector('#countdown-minutes'),
    seconds: document.querySelector('#countdown-seconds')
  };


  const STORAGE = Object.freeze({language: 'npac-lang', theme: 'npac-theme'});
  const META = {
    ru: {
      title: 'NikPACore — Скоро запуск | Python Backend Engineering',
      description: 'NikPACore — персональный сайт Николая Петухова, Python Backend Engineer. Сайт готовится к запуску. Проекты на GitHub.'
    },
    en: {
      title: 'NikPACore — Coming Soon | Python Backend Engineering',
      description: 'NikPACore — personal portfolio of Nikolay Petukhov, Python Backend Engineer. Coming soon. Projects on GitHub.'
    }
  };

  const TRANSLATIONS = {
    ru: {
      skip: 'Перейти к содержимому',
      navServices: 'Услуги',
      navProjects: 'Проекты',
      navLab: 'Лаборатория',
      navAbout: 'Обо мне',
      navContact: 'Связаться',
      eyebrow: 'NIKPACORE.RU / SITE IN DEVELOPMENT',
      intro: 'Николай Петухов · Python Backend Engineer',
      heroOne: 'Сайт готовится',
      heroTwo: 'к запуску.',
      description: 'Здесь появятся мои проекты, инженерные кейсы и заметки о backend-разработке. Пока пространство собирается, исходный код уже доступен на GitHub.',
      exploreGithub: 'Посмотреть GitHub',
      whatsNext: 'Что здесь будет',
      note: 'Надёжные системы начинаются с продуманных решений.',
      countdownHeading: 'ДО 1 ДЕКАБРЯ',
      countdownDays: 'ДНЕЙ',
      countdownHours: 'ЧАСОВ',
      countdownMinutes: 'МИНУТ',
      countdownSeconds: 'СЕКУНД',
      countdownFinished: 'Отсчёт завершён.',
      sectionEyebrow: 'СКОРО НА САЙТЕ',
      sectionTitle: 'Что появится здесь',
      sectionLead: 'Здесь будут реальные проекты, инженерные решения и практические разборы.',
      cardProjectsTitle: 'Проекты и кейсы',
      cardProjectsDesc: 'Реальные репозитории, задачи, выбранные технические решения и их ограничения.',
      cardProjectsLink: 'Пока на GitHub',
      cardLabTitle: 'Инженерная лаборатория',
      cardLabDesc: 'Интерактивные сценарии backend-архитектуры и разбор инженерных компромиссов.',
      comingSoon: 'В разработке',
      cardServicesTitle: 'Услуги и сотрудничество',
      cardServicesDesc: 'Python backend, API, интеграции, PostgreSQL и фоновые задачи.',
      cardServicesLink: 'Как связаться',
      aboutEyebrow: 'ОБО МНЕ',
      aboutTitle: 'За кодом — инженер.',
      aboutText: 'Я Николай Петухов. Занимаюсь Python backend-разработкой, проектированием API и работой с данными. NikPACore станет единым пространством для моих проектов и профессионального опыта.',
      contactTitle: 'Пока сайт строится —\nдавай оставаться на связи.',
      contactDescription: 'Мой GitHub уже открыт. Там можно посмотреть исходники и развитие проектов.',
      backTop: 'Наверх'
    },
    en: {
      skip: 'Skip to content',
      navServices: 'Services',
      navProjects: 'Projects',
      navLab: 'Lab',
      navAbout: 'About',
      navContact: 'Contact',
      eyebrow: 'NIKPACORE.RU / SITE IN DEVELOPMENT',
      intro: 'Nikolay Petukhov · Python Backend Engineer',
      heroOne: 'A new site is',
      heroTwo: 'taking shape.',
      description: 'This will be the home of my projects, engineering case studies, and backend development notes. While the site comes together, the code is already available on GitHub.',
      exploreGithub: 'Explore GitHub',
      whatsNext: 'What is coming',
      note: 'Reliable systems start with deliberate decisions.',
      countdownHeading: 'UNTIL DECEMBER 1',
      countdownDays: 'DAYS',
      countdownHours: 'HOURS',
      countdownMinutes: 'MINUTES',
      countdownSeconds: 'SECONDS',
      countdownFinished: 'Countdown complete.',
      sectionEyebrow: 'COMING TO THE SITE',
      sectionTitle: 'What to expect',
      sectionLead: 'Real projects, engineering decisions, and practical technical write-ups.',
      cardProjectsTitle: 'Projects and case studies',
      cardProjectsDesc: 'Real repositories, engineering problems, design decisions, and trade-offs.',
      cardProjectsLink: 'Browse on GitHub',
      cardLabTitle: 'Engineering Lab',
      cardLabDesc: 'Interactive backend architecture scenarios and explanations of technical trade-offs.',
      comingSoon: 'In development',
      cardServicesTitle: 'Services and collaboration',
      cardServicesDesc: 'Python backend, APIs, integrations, PostgreSQL, and background processing.',
      cardServicesLink: 'Get in touch',
      aboutEyebrow: 'ABOUT',
      aboutTitle: 'The engineer behind the code.',
      aboutText: 'I’m Nikolay Petukhov. I work with Python backend development, API design, and data. NikPACore will bring my projects and professional background together in one place.',
      contactTitle: 'While the site takes shape,\nlet’s stay connected.',
      contactDescription: 'My GitHub is already public. Explore the source code and follow project development.',
      backTop: 'Back to top'
    }
  };


  function readPreference(key, fallback) {
    try { return localStorage.getItem(key) || fallback; }
    catch { return fallback; }
  }

  function savePreference(key, value) {
    try { localStorage.setItem(key, value); }
    catch {  }
  }

  let language = readPreference(STORAGE.language, 'ru') === 'en' ? 'en' : 'ru';
  let theme = readPreference(STORAGE.theme, 'dark') === 'light' ? 'light' : 'dark';

  function applyLanguage(nextLanguage, persist = true) {
    language = nextLanguage === 'en' ? 'en' : 'ru';
    doc.lang = language;
    const copy = TRANSLATIONS[language];

    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.dataset.i18n;
      if (Object.prototype.hasOwnProperty.call(copy, key)) element.textContent = copy[key];
    });


    languageLabel.textContent = language === 'ru' ? 'EN' : 'RU';
    languageButton.setAttribute('aria-label', language === 'ru' ? 'Switch to English' : 'Переключить на русский');
    document.querySelector('.desktop-nav').setAttribute('aria-label', language === 'ru' ? 'Основная навигация' : 'Main navigation');
    mobileNav.setAttribute('aria-label', language === 'ru' ? 'Мобильная навигация' : 'Mobile navigation');
    document.querySelector('.hero-visual').setAttribute('aria-label',
      language === 'ru'
        ? 'Схематичная иллюстрация компонентов backend: API, данные и фоновые задачи'
        : 'Illustrative backend system diagram: API, data and background jobs');
    document.title = META[language].title;
    metaDescription.content = META[language].description;

    updateMenuLabel();
    countdown.values.setAttribute('aria-label', language === 'ru' ? 'Время до 1 декабря' : 'Time until December 1');
    updateThemeLabel();
    if (persist) savePreference(STORAGE.language, language);
  }

  function updateThemeLabel() {
    const description = language === 'ru'
      ? (theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему')
      : (theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    themeButton.setAttribute('aria-label', description);
    themeButton.setAttribute('title', description);
    themeButton.setAttribute('aria-pressed', String(theme === 'light'));
  }

  function applyTheme(nextTheme, persist = true) {
    theme = nextTheme === 'light' ? 'light' : 'dark';
    doc.dataset.theme = theme;
    metaThemeColor.content = theme === 'dark' ? '#0c1222' : '#f9f8f3';
    updateThemeLabel();
    if (persist) savePreference(STORAGE.theme, theme);
  }


  function updateMenuLabel() {
    const isOpen = !mobileNav.hidden;
    const label = language === 'ru'
      ? (isOpen ? 'Закрыть меню' : 'Открыть меню')
      : (isOpen ? 'Close menu' : 'Open menu');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', label);
  }

  function closeMenu(restoreFocus = false) {
    mobileNav.hidden = true;
    updateMenuLabel();
    if (restoreFocus) menuButton.focus();
  }

  function toggleMenu() {
    mobileNav.hidden = !mobileNav.hidden;
    updateMenuLabel();
  }

  function updateCountdown() {
    const secondsLeft = Math.max(0, Math.ceil((LAUNCH_TIMESTAMP - Date.now()) / SECOND_MS));
    if (secondsLeft === 0) {
      countdown.values.hidden = true;
      countdown.finished.hidden = false;
      return true;
    }

    countdown.days.textContent = String(Math.floor(secondsLeft / 86400)).padStart(2, '0');
    countdown.hours.textContent = String(Math.floor((secondsLeft % 86400) / 3600)).padStart(2, '0');
    countdown.minutes.textContent = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
    countdown.seconds.textContent = String(secondsLeft % 60).padStart(2, '0');
    return false;
  }


  let countdownInterval = null;
  function tickCountdown() {
    if (updateCountdown() && countdownInterval !== null) {
      window.clearInterval(countdownInterval);
      countdownInterval = null;
    }
  }

  languageButton.addEventListener('click', () => applyLanguage(language === 'ru' ? 'en' : 'ru'));
  themeButton.addEventListener('click', () => applyTheme(theme === 'dark' ? 'light' : 'dark'));
  menuButton.addEventListener('click', toggleMenu);

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => closeMenu());
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobileNav.hidden) closeMenu(true);
  });
  document.addEventListener('pointerdown', event => {
    if (!mobileNav.hidden && !header.contains(event.target)) closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1000 && !mobileNav.hidden) closeMenu();
  });

  document.querySelector('#year').textContent = String(new Date().getFullYear());
  applyLanguage(language, false);
  applyTheme(theme, false);

  tickCountdown();
  if (!countdown.finished.hidden) return;
  countdownInterval = window.setInterval(tickCountdown, 1000);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) tickCountdown();
  });
})();

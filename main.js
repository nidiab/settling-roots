// Shared language handling for Settling Roots pages
(function() {
  function setLangAttributes(lang) {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-lang', lang);
  }

  function updateDataI18n(dict) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict && dict[key]) {
        el.textContent = dict[key];
      }
    });
  }
  
  // Support HTML content via data-i18n-html
  (function enhanceHtmlI18n() {
    const elements = document.querySelectorAll('[data-i18n-html]');
    // Patch updateDataI18n to also process HTML keys
    const originalUpdate = updateDataI18n;
    updateDataI18n = function(dict) {
      originalUpdate(dict);
      elements.forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        if (dict && dict[key]) {
          el.innerHTML = dict[key];
        }
      });
    };
  })();

  function detectPage() {
    const path = (location.pathname || '').toLowerCase();
    if (path.endsWith('about.html')) return 'about';
    return 'index';
  }

  const localeCache = new Map(); // key: `${page}:${lang}` -> JSON

  function loadLocale(page, lang) {
    const key = `${page}:${lang}`;
    if (localeCache.has(key)) return Promise.resolve(localeCache.get(key));
    const url = `locales/${lang}/${page}.json`;
    return fetch(url, { cache: 'no-cache' })
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load ${url}`);
        return res.json();
      })
      .then(json => {
        localeCache.set(key, json);
        return json;
      })
      .catch(err => {
        console.error(err);
        return null;
      });
  }

  async function updateTexts(lang) {
    const page = detectPage();
    const dict = await loadLocale(page, lang);
    if (!dict) return;
    // Update elements with data-i18n only (fully declarative)
    updateDataI18n(dict);
    if (dict.pageTitle) {
      document.title = dict.pageTitle;
    }
  }

  // Removed hardcoded translations; now loaded dynamically from /locales

  document.addEventListener('DOMContentLoaded', function () {
    const languageSelect = document.getElementById('languageSelect');
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    setLangAttributes(savedLang);
    if (languageSelect) languageSelect.value = savedLang;
    updateTexts(savedLang);

    if (languageSelect) {
      languageSelect.addEventListener('change', function() {
        const lang = languageSelect.value;
        setLangAttributes(lang);
        localStorage.setItem('preferredLanguage', lang);
        updateTexts(lang);
      });
    }
  });
})();

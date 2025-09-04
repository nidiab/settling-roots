import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import { loadLocale } from './i18n';
import './app.css';

const LangContext = createContext({ lang: 'en', setLang: () => {} });

function usePageKey(pathname) {
  if (pathname.endsWith('/about')) return 'about';
  if (pathname.endsWith('/products') || pathname === '/' || pathname === '') return 'products';
  return 'products';
}

export function useI18n() {
  return useContext(LangContext);
}

function LanguageSelector() {
  const { lang, setLang, dict } = useI18n();
  return (
    <div className="language-selector" role="group" aria-label="Language selector">
      <button
        type="button"
        className={`flag-btn ${lang === 'en' ? 'active' : ''}`}
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        title={dict?.langEnglish ?? 'English'}
      >
        <img className="flag-img" src="/flags/en.svg" width="20" height="14" alt="English" />
        <span className="label">EN</span>
      </button>
      <button
        type="button"
        className={`flag-btn ${lang === 'pt' ? 'active' : ''}`}
        onClick={() => setLang('pt')}
        aria-pressed={lang === 'pt'}
        title={dict?.langPortuguese ?? 'Português'}
      >
        <img className="flag-img" src="/flags/pt.svg" width="20" height="14" alt="Português" />
        <span className="label">PT</span>
      </button>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const [lang, setLang] = useState(() => localStorage.getItem('preferredLanguage') || 'en');
  const [dict, setDict] = useState(null);
  const pageKey = usePageKey(location.pathname);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-lang', lang);
    localStorage.setItem('preferredLanguage', lang);
  }, [lang]);

  useEffect(() => {
    let alive = true;
    loadLocale(pageKey, lang).then((d) => {
      if (!alive) return;
      setDict(d);
      if (d?.pageTitle) document.title = d.pageTitle;
    });
    return () => {
      alive = false;
    };
  }, [pageKey, lang]);

  // Send GA4 page_view on route change if GA is loaded
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'page_view', {
          page_path: location.pathname + location.search,
        });
      }
    } catch (e) {
      // ignore analytics errors in client
    }
  }, [location.pathname, location.search]);

  const ctx = useMemo(() => ({ lang, setLang, dict }), [lang, dict]);

  return (
    <LangContext.Provider value={ctx}>
      <header className="site-header" role="banner">
        <div className="header-inner">
          <LanguageSelector />
        </div>
      </header>
      <main className="card" role="main">
        <img className="logo" src="/logo.png" alt="Settling Roots Portugal logo" />
        <Routes>
          <Route path="/" element={<Products dict={dict} />} />
          <Route path="/about" element={<About dict={dict} />} />
          <Route path="/products" element={<Products dict={dict} />} />
          <Route path="/home" element={<Home dict={dict} />} />
        </Routes>
      </main>
      <footer>
        <span> {new Date().getFullYear()} Settling Roots</span>{' '}
        <nav aria-label="Footer">
          <Link to="/">{dict?.home ?? 'Home'}</Link> ·{' '}
          <Link to="/about">{dict?.about ?? 'About'}</Link> ·{' '}
          <Link to="/products">{dict?.products ?? 'Products'}</Link>
        </nav>
      </footer>
    </LangContext.Provider>
  );
}

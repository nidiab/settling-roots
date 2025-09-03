import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import { loadLocale } from './i18n'
import './app.css'

const LangContext = createContext({ lang: 'en', setLang: () => {} })

function usePageKey(pathname) {
  if (pathname.endsWith('/about')) return 'about'
  return 'index'
}

export function useI18n() {
  return useContext(LangContext)
}

function LanguageSelector() {
  const { lang, setLang, dict } = useI18n()
  return (
    <div className="language-selector">
      <select
        id="languageSelect"
        value={lang}
        onChange={(e) => setLang(e.target.value)}
      >
        <option value="en">{dict?.langEnglish ?? 'English'}</option>
        <option value="pt">{dict?.langPortuguese ?? 'Português'}</option>
      </select>
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const [lang, setLang] = useState(() => localStorage.getItem('preferredLanguage') || 'en')
  const [dict, setDict] = useState(null)
  const pageKey = usePageKey(location.pathname)

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
    document.documentElement.setAttribute('data-lang', lang)
    localStorage.setItem('preferredLanguage', lang)
  }, [lang])

  useEffect(() => {
    let alive = true
    loadLocale(pageKey, lang).then((d) => {
      if (!alive) return
      setDict(d)
      if (d?.pageTitle) document.title = d.pageTitle
    })
    return () => {
      alive = false
    }
  }, [pageKey, lang])

  // Send GA4 page_view on route change if GA is loaded
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'page_view', {
          page_path: location.pathname + location.search,
        })
      }
    } catch (e) {
      // ignore analytics errors in client
    }
  }, [location.pathname, location.search])

  const ctx = useMemo(() => ({ lang, setLang, dict }), [lang, dict])

  return (
    <LangContext.Provider value={ctx}>
      <main className="card" role="main">
        <img className="logo" src="/logo.png" alt="Settling Roots Portugal logo" />
        <LanguageSelector />
        <Routes>
          <Route path="/" element={<Home dict={dict} />} />
          <Route path="/about" element={<About dict={dict} />} />
        </Routes>
      </main>
      <footer>
        <span>© {new Date().getFullYear()} Settling Roots</span>
        {" "}
        {pageKey === 'about' ? (
          <Link to="/">{dict?.home ?? 'Home'}</Link>
        ) : (
          <Link to="/about">{dict?.about ?? 'About'}</Link>
        )}
      </footer>
    </LangContext.Provider>
  )
}

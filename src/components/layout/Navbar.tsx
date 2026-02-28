import Container from './Container'
import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { navigationItems } from '../../constants/navigation'
import { animationDuration, animationEase } from '../../utils/animations'
import { useLanguage } from '../../context/LanguageContext'
import { languages, type Language } from '../../i18n/translations'
import logoImage from '../../assets/images/logo.jpg'

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M13.5 8.75V6.8c0-.73.43-.9.73-.9h1.72V3h-2.37c-2.88 0-3.53 2.16-3.53 3.53v2.22H8v3.03h2.05V21h3.45v-9.22h2.32l.31-3.03h-2.63z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M6.94 8.5a1.98 1.98 0 1 1 0-3.97 1.98 1.98 0 0 1 0 3.97zM5.2 9.95h3.5V20.5H5.2V9.95zm5.72 0h3.36v1.44h.05c.47-.89 1.61-1.83 3.31-1.83 3.54 0 4.2 2.33 4.2 5.36v5.58h-3.5v-4.94c0-1.18-.02-2.7-1.64-2.7-1.64 0-1.9 1.28-1.9 2.61v5.03h-3.5V9.95z" />
    </svg>
  )
}

function HomeTabIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 10.5 12 3l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 9.8V20h11V9.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function WorkTabIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7.5h16a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1Z" strokeLinecap="round" />
      <path d="M9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v1.5" strokeLinecap="round" />
      <path d="M3 12h18" strokeLinecap="round" />
    </svg>
  )
}

function BlogTabIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" strokeLinecap="round" />
      <path d="M8 8h8M8 12h8M8 16h5" strokeLinecap="round" />
    </svg>
  )
}

function ContactTabIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6.5h16a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7.5a1 1 0 0 1 1-1Z" strokeLinecap="round" />
      <path d="m4 8 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MobileTabIcon({ tabKey }: { tabKey: (typeof navigationItems)[number]['key'] }) {
  if (tabKey === 'home') return <HomeTabIcon />
  if (tabKey === 'work') return <WorkTabIcon />
  if (tabKey === 'blog') return <BlogTabIcon />
  return <ContactTabIcon />
}

function Navbar() {
  const sectionHashes = useMemo(() => navigationItems.map((item) => item.href), [])
  const [activeHash, setActiveHash] = useState('#home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDesktopLangOpen, setIsDesktopLangOpen] = useState(false)
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const { language, setLanguage, t } = useLanguage()
  const desktopLangRef = useRef<HTMLDivElement | null>(null)
  const mobileLangRef = useRef<HTMLDivElement | null>(null)

  const socialLinks = [
    { label: 'Facebook', href: 'https://facebook.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
  ]

  const languageLabels: Record<Language, string> = {
    uz: 'UZ',
    ru: 'RU',
    en: 'EN',
  }

  useEffect(() => {
    let frameId = 0

    const resolveState = () => {
      const scrolled = window.scrollY > 20
      setIsScrolled((prev) => (prev === scrolled ? prev : scrolled))

      const scrollPosition = window.scrollY + 140
      const sections = sectionHashes
        .map((hash) => document.querySelector(hash) as HTMLElement | null)
        .filter((section): section is HTMLElement => section !== null)

      let currentHash = '#home'
      for (const section of sections) {
        if (scrollPosition >= section.offsetTop) {
          currentHash = `#${section.id}`
        }
      }
      setActiveHash((prev) => (prev === currentHash ? prev : currentHash))
    }

    const onScroll = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(resolveState)
    }

    resolveState()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('hashchange', resolveState)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('hashchange', resolveState)
    }
  }, [sectionHashes])

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (desktopLangRef.current && !desktopLangRef.current.contains(target)) {
        setIsDesktopLangOpen(false)
      }
      if (mobileLangRef.current && !mobileLangRef.current.contains(target)) {
        setIsMobileLangOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDesktopLangOpen(false)
        setIsMobileLangOpen(false)
      }
    }

    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleEscape)
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <>
      <motion.header
        key={`desktop-header-${language}`}
        initial={shouldReduceMotion ? undefined : { y: -60, opacity: 0 }}
        animate={shouldReduceMotion ? undefined : { y: 0, opacity: 1 }}
        transition={{ duration: animationDuration.base, ease: animationEase }}
        className="sticky top-4 z-50 hidden sm:block pb-6"
      >
        <Container
          className={[
            'glass-header flex h-[72px] items-center justify-between gap-4 rounded-2xl px-5 transition-[background-color,backdrop-filter,box-shadow,border-color,transform,opacity] duration-300',
            isScrolled
              ? 'translate-y-0 opacity-100'
              : 'opacity-95',
          ].join(' ')}
        >
          <a href="#home" className="flex shrink-0 items-center gap-3 text-white">
            <span className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full p-0.5 shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
              <img
                src={logoImage}
                alt="Nazirov's Holding logo"
                className="h-full w-full scale-[2] rounded-full object-cover object-center"
              />
            </span>
            <span className="text-xl font-semibold tracking-tight">{t.navbar.brand}</span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className={[
                  'relative rounded-full px-2 py-1.5 text-[15px] font-medium transition-colors duration-300',
                  activeHash === item.href ? 'text-primary' : 'text-white/85 hover:text-primary',
                ].join(' ')}
              >
                {t.navbar.menu[item.key]}
                {activeHash === item.href && (
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: animationDuration.fast, ease: animationEase }}
                    className="absolute inset-x-1 -bottom-0.5 h-0.5 origin-left rounded-full bg-primary"
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 text-white/80">
            <div ref={desktopLangRef} className="relative">
              <button
                type="button"
                onClick={() => setIsDesktopLangOpen((prev) => !prev)}
                className="glass-pill inline-flex min-w-14 items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold uppercase text-white outline-none ring-offset-0 transition hover:text-primary"
                aria-haspopup="menu"
                aria-expanded={isDesktopLangOpen}
                aria-label="Language selector"
              >
                {languageLabels[language]}
                <span className="text-[10px] text-white/75">▾</span>
              </button>
              {isDesktopLangOpen && (
                <div className="glass-header absolute right-0 top-[calc(100%+0.4rem)] z-50 min-w-20 rounded-xl p-1">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => {
                        setLanguage(lang)
                        setIsDesktopLangOpen(false)
                      }}
                      className={[
                        'w-full rounded-lg px-2 py-1.5 text-center text-xs font-semibold uppercase transition',
                        language === lang ? 'bg-white/15 text-primary' : 'text-white/85 hover:bg-white/10',
                      ].join(' ')}
                    >
                      {languageLabels[lang]}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="hidden items-center gap-2 md:flex">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-white/85 transition-colors hover:border-primary/70 hover:text-primary"
                  aria-label={social.label}
                >
                  {social.label === 'Facebook' ? <FacebookIcon /> : <LinkedinIcon />}
                </a>
              ))}
            </div>
          </div>
        </Container>
      </motion.header>

      <motion.nav
        key={`mobile-nav-${language}`}
        initial={shouldReduceMotion ? undefined : { opacity: 0 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1 }}
        transition={{ duration: 0.22, ease: animationEase }}
        className="glass-mobile-tab fixed inset-x-3 bottom-4 z-50 rounded-2xl p-1.5 sm:hidden"
        aria-label="Mobile bottom navigation"
      >
        <ul className="grid grid-cols-4 gap-1 text-center">
          {navigationItems.map((item) => (
            <li key={item.key}>
              <a
                href={item.href}
                className={[
                  'relative flex min-h-11 flex-col items-center justify-center rounded-xl px-1 py-1 text-[9px] font-medium transition',
                  activeHash === item.href ? 'glass-pill text-white' : 'text-white/85 hover:bg-white/10 hover:text-white',
                ].join(' ')}
              >
                <span className="text-[11px] leading-none">
                  <MobileTabIcon tabKey={item.key} />
                </span>
                <span className="mt-1 truncate">{t.navbar.menu[item.key]}</span>
                {activeHash === item.href && (
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '55%', opacity: 1 }}
                    transition={{ duration: animationDuration.fast, ease: animationEase }}
                    className="absolute -top-0.5 h-0.5 rounded-full bg-primary"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
      </motion.nav>

      <div ref={mobileLangRef} className="fixed right-3 top-3 z-[60] sm:hidden">
        <button
          type="button"
          onClick={() => setIsMobileLangOpen((prev) => !prev)}
          className="glass-header inline-flex min-w-14 items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold uppercase text-white outline-none ring-offset-0 transition hover:text-primary"
          aria-haspopup="menu"
          aria-expanded={isMobileLangOpen}
          aria-label="Mobile language selector"
        >
          {languageLabels[language]}
          <span className="text-[10px] text-white/75">▾</span>
        </button>
        {isMobileLangOpen && (
          <div className="glass-header absolute right-0 top-[calc(100%+0.4rem)] z-50 min-w-20 rounded-xl p-1">
            {languages.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => {
                  setLanguage(lang)
                  setIsMobileLangOpen(false)
                }}
                className={[
                  'w-full rounded-lg px-2 py-1.5 text-center text-[11px] font-semibold uppercase transition',
                  language === lang ? 'bg-white/15 text-primary' : 'text-white/85 hover:bg-white/10',
                ].join(' ')}
              >
                {languageLabels[lang]}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Navbar

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Container from '../layout/Container'
import Button from '../ui/Button'
import Checkbox from '../ui/Checkbox'
import Input from '../ui/Input'
import bgSectionOne from '../../assets/images/bg-section-one.avif'
import ScrollReveal from '../common/ScrollReveal'
import { animationDuration, animationEase, scaleIn } from '../../utils/animations'
import { useLanguage } from '../../context/LanguageContext'

function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 640px)').matches : false,
  )
  const [email, setEmail] = useState('')
  const [isConsentChecked, setIsConsentChecked] = useState(false)
  const { scrollYProgress, scrollY } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const { language, t } = useLanguage()

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 640px)')
    const setFromQuery = () => setIsMobile(mediaQuery.matches)
    setFromQuery()
    mediaQuery.addEventListener('change', setFromQuery)
    return () => mediaQuery.removeEventListener('change', setFromQuery)
  }, [])

  const shouldAnimate = !shouldReduceMotion
  const verticalOffset = isMobile ? 12 : 20
  const parallaxMax = shouldAnimate ? 24 : 0
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, parallaxMax])
  const indicatorOpacity = useTransform(scrollY, [0, 100], [1, 0])
  const isSubmitDisabled = email.trim().length === 0 || !isConsentChecked

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen overflow-hidden"
      aria-label="Hero"
    >
      <motion.div
        style={{ y: parallaxY, backgroundImage: `url(${bgSectionOne})` }}
        className="absolute inset-0 bg-cover bg-center will-change-transform mt-[-2%]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1C2D]/95 via-[#0B1C2D]/75 to-[#0B1C2D]/95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(138,176,255,0.26),transparent_46%),radial-gradient(circle_at_80%_85%,rgba(87,129,235,0.2),transparent_48%)]" />
      <Container className="relative z-10 flex min-h-screen items-start pt-[calc(8rem+env(safe-area-inset-top))] sm:pt-[calc(9.5rem+env(safe-area-inset-top))]">
        <div className="w-full max-w-[390px] space-y-4 sm:max-w-xl sm:space-y-5">
          <h1 className="text-[50px] font-extrabold leading-[0.96] tracking-tight text-white sm:text-[62px] lg:text-[68px]">
            <motion.span
              key={`hero-line1-${language}`}
              className="block"
              initial={shouldAnimate ? { opacity: 0, y: verticalOffset } : undefined}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: animationDuration.base, ease: animationEase }}
            >
              {t.hero.headline.line1}
            </motion.span>
            <motion.span
              key={`hero-line2-${language}`}
              className="block text-primary"
              initial={shouldAnimate ? { opacity: 0, y: verticalOffset } : undefined}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: animationDuration.base, ease: animationEase, delay: 0.08 }}
            >
              {t.hero.headline.line2}
            </motion.span>
            <motion.span
              key={`hero-line3-${language}`}
              className="block"
              initial={shouldAnimate ? { opacity: 0, y: verticalOffset } : undefined}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: animationDuration.base, ease: animationEase, delay: 0.16 }}
            >
              {t.hero.headline.line3Prefix} <span className="text-primary">{t.hero.headline.line3Accent}</span>
            </motion.span>
          </h1>

          <motion.p
            key={`hero-subtitle-${language}`}
            className="max-w-full text-[0.95rem] text-white/75 sm:max-w-lg sm:text-[1rem]"
            initial={shouldAnimate ? { opacity: 0 } : undefined}
            animate={shouldAnimate ? { opacity: 1 } : undefined}
            transition={{ duration: animationDuration.base, ease: animationEase, delay: 0.22 }}
          >
            {t.hero.subtitle}
          </motion.p>

          <ScrollReveal key={`hero-form-${language}`} variants={scaleIn} delay={0.25}>
            <form
              className="relative w-full overflow-hidden rounded-[26px] border border-white/30 bg-[linear-gradient(160deg,rgba(110,154,224,0.34),rgba(53,83,140,0.42)_56%,rgba(23,40,72,0.55))] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-1px_0_rgba(255,255,255,0.08),0_22px_42px_rgba(3,11,26,0.52)] backdrop-blur-xl sm:max-w-[380px] sm:px-4.5 sm:py-4.5"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_4%,rgba(255,255,255,0.35),transparent_48%)]" />
              <div className="relative z-10 space-y-2 sm:space-y-2.5">
                <label htmlFor="email" className="block text-sm font-semibold text-white/95 sm:text-sm">
                  {t.hero.form.emailLabel} <span className="text-primary">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  aria-label="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <Checkbox
                  id="newsletter"
                  label={t.hero.form.consentLabel}
                  checked={isConsentChecked}
                  onChange={(event) => setIsConsentChecked(event.target.checked)}
                />
                <Button type="submit" className="mt-1" disabled={isSubmitDisabled}>
                  {t.hero.form.submitLabel}
                </Button>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </Container>

      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-16 left-1/2 hidden -translate-x-1/2 flex-col items-center sm:bottom-14 sm:flex"
      >
        <div className="flex h-12 w-7 justify-center rounded-full border border-white/35 bg-white/10 p-1">
          <motion.span
            className="h-2.5 w-2.5 rounded-full bg-white/90"
            animate={shouldAnimate ? { y: [0, 16, 0] } : undefined}
            transition={{ duration: animationDuration.slow, repeat: Infinity, ease: animationEase }}
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero

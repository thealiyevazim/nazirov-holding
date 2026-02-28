import { useEffect, useState, type PropsWithChildren } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { animationDuration, animationEase, fadeInUp } from '../../utils/animations'

type ScrollRevealProps = PropsWithChildren<{
  className?: string
  variants?: Variants
  delay?: number
}>

function ScrollReveal({ children, className = '', variants = fadeInUp, delay = 0 }: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 640px)').matches : false,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 640px)')
    const setFromQuery = () => setIsMobile(mediaQuery.matches)
    mediaQuery.addEventListener('change', setFromQuery)
    return () => mediaQuery.removeEventListener('change', setFromQuery)
  }, [])

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      transition={{
        duration: isMobile ? animationDuration.fast : animationDuration.base,
        ease: animationEase,
        delay: isMobile ? Math.min(delay, 0.12) : delay,
      }}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal

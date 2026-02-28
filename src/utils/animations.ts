import type { Variants } from 'framer-motion'

export const animationEase = 'easeOut' as const

export const animationDuration = {
  fast: 0.6,
  base: 0.7,
  slow: 0.9,
} as const

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: animationDuration.base, ease: animationEase },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: animationDuration.base, ease: animationEase },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.12,
      ease: animationEase,
      duration: animationDuration.base,
    },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 18 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: animationDuration.base, ease: animationEase },
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: animationDuration.base, ease: animationEase },
  },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: animationDuration.base, ease: animationEase },
  },
}

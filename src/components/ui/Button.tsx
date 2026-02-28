import { motion, useReducedMotion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import { animationDuration, animationEase } from '../../utils/animations'

type ButtonProps = HTMLMotionProps<'button'> & {
  className?: string
}

function Button({ className = '', type = 'button', ...props }: ButtonProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.button
      type={type}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              scale: 1.03,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55), 0 14px 30px rgba(244,180,0,0.42)',
            }
      }
      whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
      transition={{ duration: animationDuration.fast, ease: animationEase }}
      className={[
        'inline-flex h-11 items-center justify-center rounded-full border border-[#F3CF63]/70 bg-[linear-gradient(180deg,#FFD86E_0%,#F4B400_72%,#DEA106_100%)] px-8 text-base font-extrabold tracking-[0.01em] text-[#1A2640] shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_10px_24px_rgba(244,180,0,0.36)] transition-[box-shadow,filter] duration-300 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-darkBg disabled:cursor-not-allowed disabled:opacity-60 sm:h-12',
        className,
      ]
        .join(' ')
        .trim()}
      {...props}
    />
  )
}

export default Button

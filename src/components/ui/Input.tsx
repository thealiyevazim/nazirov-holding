import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
}

function Input({ className = '', type = 'text', ...props }: InputProps) {
  return (
    <input
      type={type}
      className={[
        'h-10 w-full rounded-xl border border-white/35 bg-[linear-gradient(180deg,rgba(173,203,243,0.36),rgba(124,157,205,0.3))] px-4 text-sm text-white placeholder:text-white/58 shadow-[inset_0_1px_0_rgba(255,255,255,0.38),inset_0_-1px_0_rgba(255,255,255,0.1),0_10px_24px_rgba(7,16,34,0.34)] transition-[border-color,box-shadow,background-color] duration-200 focus-visible:border-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 sm:h-12',
        className,
      ]
        .join(' ')
        .trim()}
      {...props}
    />
  )
}

export default Input

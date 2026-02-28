import type { InputHTMLAttributes } from 'react'

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string
  className?: string
}

function Checkbox({ id, label, className = '', ...props }: CheckboxProps) {
  const checkboxId = id ?? 'checkbox-consent'

  return (
    <label htmlFor={checkboxId} className={`flex items-center gap-2 text-xs text-white/85 sm:text-sm ${className}`.trim()}>
      <input
        id={checkboxId}
        type="checkbox"
        className="h-3 w-3 rounded-[2px] border border-white/40 bg-white/10 text-primary accent-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] transition-transform duration-200 checked:scale-110 focus-visible:ring-2 focus-visible:ring-primary/70 sm:h-3.5 sm:w-3.5"
        {...props}
      />
      <span>{label}</span>
    </label>
  )
}

export default Checkbox

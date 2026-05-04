import clsx from 'clsx'
import Link from 'next/link'

const variantClasses = {
  primary: 'border-red-500 bg-red-500 text-white shadow-[0_10px_35px_rgba(225,6,0,0.35)] hover:bg-red-600 hover:border-red-600',
  secondary: 'border-white/35 bg-white/5 text-white backdrop-blur-md hover:border-white/60 hover:bg-white/10 hover:shadow-[0_8px_28px_rgba(255,255,255,0.18)]',
}

const sizeClasses = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  href = '#',
  as,
  variant = 'primary',
  size = 'md',
  glow = false,
  icon,
  iconPosition = 'right',
  className = '',
  children,
  ...props
}) {
  const Component = as ?? (href ? Link : 'button')

  const classes = clsx(
    'inline-flex items-center justify-center gap-2 rounded-full border font-semibold transition duration-300 will-change-transform',
    'hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black',
    sizeClasses[size] ?? sizeClasses.md,
    variantClasses[variant] ?? variantClasses.primary,
    glow && 'cta-glow-button',
    className,
  )

  const content = (
    <>
      {icon && iconPosition === 'left' ? <span aria-hidden="true" className="inline-flex">{icon}</span> : null}
      <span>{children}</span>
      {icon && iconPosition !== 'left' ? <span aria-hidden="true" className="inline-flex">{icon}</span> : null}
    </>
  )

  if (Component === Link) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    )
  }

  return (
    <Component className={classes} {...props}>
      {content}
    </Component>
  )
}

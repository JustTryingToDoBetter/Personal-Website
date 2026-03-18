import clsx from 'clsx'
import Link from 'next/link'

export default function Button({ href = '#', variant = 'primary', className = '', children }) {
  const classes = clsx(
    'inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-sm font-semibold transition duration-300 will-change-transform',
    'hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
    {
      'border-red-500 bg-red-500 text-white shadow-[0_10px_35px_rgba(225,6,0,0.35)] hover:bg-red-600 hover:border-red-600': variant === 'primary',
      'border-white/35 bg-white/5 text-white backdrop-blur-md hover:border-white/60 hover:bg-white/10 hover:shadow-[0_8px_28px_rgba(255,255,255,0.18)]': variant === 'secondary',
    },
    className,
  )

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}

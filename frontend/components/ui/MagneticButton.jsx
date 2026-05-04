'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

export default function MagneticButton({ href = '#', variant = 'primary', className = '', children, ...props }) {
  const prefersReducedMotion = useReducedMotion()
  const [hoverStyle, setHoverStyle] = useState({ x: 0, y: 0 })

  const classes = clsx(
    'inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-sm font-semibold transition duration-300 will-change-transform',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
    {
      'border-red-500 bg-red-500 text-white shadow-[0_10px_35px_rgba(225,6,0,0.35)] hover:bg-red-600 hover:border-red-600': variant === 'primary',
      'border-white/40 bg-white/10 text-white backdrop-blur-md hover:border-white/70 hover:bg-white/20 hover:shadow-[0_8px_28px_rgba(255,255,255,0.18)]': variant === 'secondary',
    },
    className,
  )

  return (
    <motion.div
      animate={prefersReducedMotion ? { x: 0, y: 0, scale: 1 } : { ...hoverStyle, scale: hoverStyle.x || hoverStyle.y ? 1.03 : 1 }}
      transition={{ type: 'spring', stiffness: 280, damping: 18, mass: 0.35 }}
      onMouseMove={(event) => {
        if (prefersReducedMotion) return
        const rect = event.currentTarget.getBoundingClientRect()
        const dx = (event.clientX - (rect.left + rect.width / 2)) * 0.15
        const dy = (event.clientY - (rect.top + rect.height / 2)) * 0.15
        setHoverStyle({ x: Math.max(-10, Math.min(10, dx)), y: Math.max(-8, Math.min(8, dy)) })
      }}
      onMouseLeave={() => setHoverStyle({ x: 0, y: 0 })}
      className="inline-flex"
    >
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    </motion.div>
  )
}

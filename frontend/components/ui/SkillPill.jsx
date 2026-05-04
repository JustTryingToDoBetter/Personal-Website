'use client'

import { motion, useReducedMotion } from 'framer-motion'

export default function SkillPill({ children, className = '' }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.span
      whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
      whileFocus={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-flex items-center rounded-full border border-white/18 bg-white/[0.07] px-3 py-1.5 text-xs text-gray-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm sm:text-sm ${className}`}
    >
      {children}
    </motion.span>
  )
}

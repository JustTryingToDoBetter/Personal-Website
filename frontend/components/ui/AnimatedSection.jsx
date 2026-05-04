'use client'

import { motion, useReducedMotion } from 'framer-motion'

const viewportDefaults = { once: true, amount: 0.28 }

export const sectionRevealVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.99 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function AnimatedSection({
  as: Component = motion.div,
  className = '',
  variants,
  initial = 'hidden',
  whileInView = 'visible',
  viewport,
  children,
  ...props
}) {
  const prefersReducedMotion = useReducedMotion()
  const reveal = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2, ease: 'linear' } },
      }
    : variants || sectionRevealVariants

  return (
    <Component
      className={className}
      variants={reveal}
      initial={initial}
      whileInView={whileInView}
      viewport={viewport || viewportDefaults}
      {...props}
    >
      {children}
    </Component>
  )
}

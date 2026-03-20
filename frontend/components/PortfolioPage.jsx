'use client'

import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import TopNav from '@/components/layout/TopNav'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Section from '@/components/ui/Section'
import { projects } from '@/data/projects'

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const skillList = [
  'Frontend Architecture',
  'AI Product Engineering',
  'Motion Design Systems',
  'Performance Optimization',
  'API and Platform Design',
  'Design-to-Code Workflows',
]

export default function PortfolioPage() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const cursorXSpring = useSpring(cursorX, { stiffness: 320, damping: 32, mass: 0.2 })
  const cursorYSpring = useSpring(cursorY, { stiffness: 320, damping: 32, mass: 0.2 })

  const [cursorVisible, setCursorVisible] = useState(false)
  const [cursorInteractive, setCursorInteractive] = useState(false)

  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 18, mass: 0.3 })
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 18, mass: 0.3 })

  const portraitX = useTransform(smoothX, [-1, 1], [-16, 16])
  const portraitY = useTransform(smoothY, [-1, 1], [-12, 12])
  const orbOneX = useTransform(smoothX, [-1, 1], [-24, 24])
  const orbOneY = useTransform(smoothY, [-1, 1], [-20, 20])
  const orbTwoX = useTransform(smoothX, [-1, 1], [18, -18])
  const orbTwoY = useTransform(smoothY, [-1, 1], [14, -14])

  const heroHandlers = useMemo(
    () => ({
      onMouseMove: (event) => {
        const bounds = event.currentTarget.getBoundingClientRect()
        const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
        const y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1
        mouseX.set(x)
        mouseY.set(y)
      },
      onMouseLeave: () => {
        mouseX.set(0)
        mouseY.set(0)
      },
    }),
    [mouseX, mouseY],
  )

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!isFinePointer) return undefined

    const handleMove = (event) => {
      cursorX.set(event.clientX)
      cursorY.set(event.clientY)
      setCursorVisible(true)

      const interactiveTarget = event.target.closest('a, button, .project-card, .hero-portrait-card')
      setCursorInteractive(Boolean(interactiveTarget))
    }

    const handleLeave = () => {
      setCursorVisible(false)
      setCursorInteractive(false)
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseout', handleLeave)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseout', handleLeave)
    }
  }, [cursorX, cursorY])

  return (
    <main className="portfolio-root">
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        className="page-reveal"
      />

      <motion.div
        className="custom-cursor"
        style={{ x: cursorXSpring, y: cursorYSpring }}
        animate={{
          opacity: cursorVisible ? 1 : 0,
          scale: cursorVisible ? (cursorInteractive ? 1.75 : 1) : 0.5,
          backgroundColor: cursorInteractive ? 'rgba(225, 6, 0, 0.35)' : 'rgba(255, 255, 255, 0.22)',
        }}
        transition={{ duration: 0.18 }}
      />

      <TopNav />

      <Section
        id="hero"
        className="relative min-h-[calc(100vh-4rem)] overflow-hidden pt-8 md:pt-12"
      >
        <motion.div className="hero-orb hero-orb-one" style={{ x: orbOneX, y: orbOneY }} />
        <motion.div className="hero-orb hero-orb-two" style={{ x: orbTwoX, y: orbTwoY }} />
        <div className="hero-grid" />
        <div className="hero-noise" />

        <div
          className="relative grid min-h-[74vh] gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center"
          {...heroHandlers}
        >
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.p
              variants={fadeUp}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-gray-200"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500" />
              Open For Select Projects
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl leading-[1.04] text-white sm:text-5xl lg:text-7xl"
            >
              Jaydin Morrison
              <span className="mt-3 block text-lg font-semibold uppercase tracking-[0.14em] text-red-400 sm:text-xl">
                Software Engineer 
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-base text-gray-200 sm:text-lg">
              Crafting polished digital products with strong engineering foundations,
              expressive animation, and intuitive user interaction.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <Button href="#projects">View Projects</Button>
              <Button href="#contact" variant="secondary">
                Contact Me
              </Button>
            </motion.div>
          </motion.div>

          <motion.div style={{ x: portraitX, y: portraitY }} className="hero-portrait-shell">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="hero-portrait-card"
            >
              <Image
                src="/jojo.png"
                alt="Profile placeholder"
                width={900}
                height={1100}
                className="hero-portrait-image"
                priority
              />
              <Card className="hero-chip hero-chip-top p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gray-300">Focus</p>
                <p className="mt-2 text-sm text-white">Premium web apps and AI-driven tooling</p>
              </Card>
              <Card className="hero-chip hero-chip-bottom p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gray-300">Available</p>
                <p className="mt-2 text-sm text-white">Remote collaborations and product sprints</p>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      <Section id="about" className="pt-6 md:pt-10">
        <div className="grid gap-5 lg:grid-cols-[1.1fr,0.9fr]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
            <Card className="p-7 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-red-400">About</p>
              <h2 className="mt-4 font-display text-3xl text-white">Building digital products with precision and personality.</h2>
              <p className="mt-4 text-gray-200">
                I blend software engineering, visual design, and interaction choreography to craft
                fast, expressive experiences that feel intentional at every touchpoint.
              </p>
            </Card>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
            <Card className="p-7 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-red-400">Skills</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {skillList.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-gray-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>

      <Section id="projects">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl text-white">Projects</h2>
          <p className="text-sm text-gray-300">Selected case studies</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="project-card"
            >
              <div className="project-image-wrap">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={900}
                  height={580}
                  className="project-image"
                  loading="lazy"
                />
                <div className="project-overlay">
                  <span className="rounded-full border border-white/45 bg-black/35 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white">
                    View Details
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl text-white">{project.title}</h3>
                <p className="mt-2 text-sm text-gray-200">{project.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id="contact" className="pb-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp}>
          <Card className="p-7 sm:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-red-400">Contact</p>
            <h2 className="mt-4 font-display text-3xl text-white sm:text-4xl">Let us build something remarkable.</h2>
            <p className="mt-4 max-w-2xl text-gray-200">
              Reach out for product partnerships, AI-powered experiences, or full-cycle application development.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="mailto:hello@example.com">Contact Me</Button>
              <Button href="#projects" variant="secondary">
                View Projects
              </Button>
            </div>
          </Card>
        </motion.div>
      </Section>
    </main>
  )
}

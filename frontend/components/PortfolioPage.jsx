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
  'Statistical modeling',
  'Design-to-Code Workflows',
  'Secure system design',
  'Microservices architecture',
  'Pipeline orchestration',
  'Evolutionary algorithms'
]

const techStackItems = [
  'Python',
  'JavaScript',
  'TypeScript',
  'R',
  'SQL',
  'FastAPI',
  'Django',
  'Docker',
  'Kubernetes',
  'PostgreSQL',
  'Git',
  'AWS',
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
        className="relative min-h-[calc(90vh-4rem)] overflow-hidden pt-3 sm:pt-6 md:pt-10"
      >
        <motion.div className="hero-orb hero-orb-one" style={{ x: orbOneX, y: orbOneY }} />
        <motion.div className="hero-orb hero-orb-two" style={{ x: orbTwoX, y: orbTwoY }} />
        <div className="hero-grid" />
        <div className="hero-noise" />

        <div
          className="relative grid min-h-[62vh] items-center gap-6 pb-2 sm:min-h-[68vh] sm:grid-cols-[1.05fr,0.95fr] sm:gap-8 lg:min-h-[72vh]"
          {...heroHandlers}
        >
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.p
              variants={fadeUp}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gray-200 sm:mb-5 sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.22em]"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500" />
              Open For Select Projects
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-display text-3xl leading-[1.04] text-white sm:text-5xl lg:text-7xl"
            >
              Jaydin Morrison
              <span className="mt-2 block text-sm font-semibold uppercase tracking-[0.12em] text-red-400 sm:mt-3 sm:text-xl sm:tracking-[0.14em]">
                Software Engineer
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-sm text-gray-200 sm:mt-6 sm:text-lg">
              Crafting polished digital products with strong engineering foundations,
              expressive animation, and intuitive user interaction.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-5 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3">
              <Button href="#projects">View Projects</Button>
              <Button href="#contact" variant="secondary">
                Contact Me
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mobile-tech-cloud sm:hidden"
          >
            {techStackItems.map((item, index) => {
              const angle = (index / techStackItems.length) * Math.PI * 2
              const ring = index % 3
              const radiusX = ring === 0 ? 19 : ring === 1 ? 25 : 30
              const radiusY = ring === 0 ? 16 : ring === 1 ? 21 : 24
              const offsetX = 50 + Math.cos(angle) * radiusX
              const offsetY = 50 + Math.sin(angle) * radiusY
              const duration = 9.8 + (index % 4) * 1.15
              const delay = (index % 6) * -0.75

              return (
                <span
                  key={item}
                  className="mobile-tech-pill-anchor"
                  style={{
                    '--tx': `${offsetX}%`,
                    '--ty': `${offsetY}%`,
                  }}
                >
                  <motion.span
                    className="mobile-tech-pill"
                    animate={{
                      x: [0, (index % 2 === 0 ? 1 : -1) * (10 + (index % 3) * 4), (index % 2 === 0 ? -1 : 1) * (8 + (index % 4) * 2), 0],
                      y: [0, (index % 3 === 0 ? -1 : 1) * (9 + (index % 4) * 3), (index % 2 === 0 ? 1 : -1) * (7 + (index % 3) * 2), 0],
                    }}
                    transition={{
                      duration,
                      delay,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {item}
                  </motion.span>
                </span>
              )
            })}
          </motion.div>

          <motion.div style={{ x: portraitX, y: portraitY }} className="hero-portrait-shell hidden sm:block">
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
              <Card className="hero-chip hero-chip-top p-3 sm:p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gray-300">Focus</p>
                <p className="mt-2 text-sm text-white">Premium web apps and AI-driven tooling</p>
              </Card>
              <Card className="hero-chip hero-chip-bottom p-3 sm:p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gray-300">Available</p>
                <p className="mt-2 text-sm text-white">Remote collaborations and product sprints</p>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      <Section id="about" className="pt-3 md:pt-8">
        <div className="compact-lane grid grid-flow-col auto-cols-[92%] gap-3 overflow-x-auto pb-2 sm:auto-cols-[72%] md:grid-flow-row md:auto-cols-auto md:overflow-visible md:pb-0 lg:grid-cols-[1.1fr,0.9fr]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
            <Card className="h-full p-5 sm:p-7">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-red-400">About</p>
              <h2 className="mt-4 font-display text-2xl text-white sm:text-3xl">Building digital products with precision and personality.</h2>
              <p className="mt-3 text-sm text-gray-200 sm:text-base">
                I blend software engineering, visual design, and interaction choreography to craft
                fast, expressive experiences that feel intentional at every touchpoint.
              </p>
            </Card>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="hidden md:block">
            <Card className="h-full p-5 sm:p-7">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-red-400">Skills</p>
              <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                {skillList.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs text-gray-100 sm:px-3 sm:py-1.5 sm:text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>

      <Section id="projects" className="pt-2 sm:pt-6">
        <div className="mb-6 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end sm:gap-4">
          <h2 className="font-display text-2xl text-white sm:text-3xl">Projects</h2>
          <p className="text-sm text-gray-300">Selected case studies</p>
        </div>

        <div className="compact-lane flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:grid md:snap-none md:overflow-visible md:pb-0 md:[grid-template-columns:repeat(2,minmax(0,1fr))] xl:[grid-template-columns:repeat(3,minmax(0,1fr))]">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="project-card min-w-[84%] snap-start sm:min-w-[66%] md:min-w-0"
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
              <div className="p-4 sm:p-5">
                <h3 className="font-display text-lg text-white sm:text-xl">{project.title}</h3>
                <p className="mt-1.5 text-xs text-gray-200 sm:mt-2 sm:text-sm">{project.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id="contact" className="pb-10 pt-4 sm:pb-14 sm:pt-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp}>
          <Card className="p-5 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-red-400">Contact</p>
            <h2 className="mt-4 font-display text-2xl text-white sm:text-4xl">Let us build something remarkable.</h2>
            <p className="mt-3 max-w-2xl text-sm text-gray-200 sm:mt-4 sm:text-base">
              Reach out for product partnerships, AI-powered experiences, or full-cycle application development.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3">
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

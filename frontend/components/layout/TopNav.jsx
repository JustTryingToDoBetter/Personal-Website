import Button from '@/components/ui/Button'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function TopNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#hero" className="font-display text-lg text-white">
          Your Name
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-gray-300 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <Button href="#contact" variant="secondary" className="px-4 py-2 text-xs sm:text-sm">
          Contact Me
        </Button>
      </div>
    </header>
  )
}

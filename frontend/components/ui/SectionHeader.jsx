import clsx from 'clsx'

export default function SectionHeader({ label, title, description, className = '' }) {
  return (
    <header className={clsx('max-w-2xl', className)}>
      {label ? <p className="font-mono text-xs uppercase tracking-[0.2em] text-red-400">{label}</p> : null}
      <h2 className="mt-3 font-display text-2xl text-white sm:text-3xl">{title}</h2>
      {description ? <p className="mt-2 text-sm text-gray-200 sm:text-base">{description}</p> : null}
    </header>
  )
}

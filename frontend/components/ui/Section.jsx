import clsx from 'clsx'

export default function Section({ id, className = '', children }) {
  return (
    <section id={id} className={clsx('relative py-14 md:py-20', className)}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  )
}

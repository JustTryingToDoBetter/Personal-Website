import './globals.css'

export const metadata = {
  title: 'Premium Portfolio',
  description: 'Personal portfolio with premium interactions and smooth animations.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

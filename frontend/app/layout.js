import './globals.css'

export const metadata = {
  title: 'Premium Portfolio',
  description: 'Personal portfolio with premium interactions and smooth animations.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        black: '#0B0B0F',
        surface: '#121217',
        white: '#F5F5F7',
        red: {
          500: '#E10600',
          600: '#C00500',
        },
        gray: {
          400: '#9CA3AF',
          600: '#4B5563',
        },
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        display: ['Geist', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        lg: '0.5rem',
      },
      typography: () => ({
        invert: {
          css: {
            color: '#F5F5F7',
            '--tw-prose-headings': '#F5F5F7',
            '--tw-prose-body': '#9CA3AF',
            '--tw-prose-links': '#F5F5F7',
            '--tw-prose-bold': '#F5F5F7',
            '--tw-prose-code': '#F5F5F7',
            '--tw-prose-pre-bg': '#121217',
            '--tw-prose-pre-code': '#F5F5F7',
            '--tw-prose-quotes': '#F5F5F7',
            '--tw-prose-hr': 'rgba(75, 85, 99, 0.5)',
          },
        },
      }),
    },
  },
  plugins: [typography],
}

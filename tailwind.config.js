/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        lime: '#9CBD05',
        paper: '#F5F5F5',
        softWhite: '#FFFCFC',
        footerMuted: 'rgba(255,255,255,0.6)',
        footerBody: 'rgba(255,255,255,0.7)',
        footerFine: 'rgba(255,255,255,0.4)'
      },
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        accent: ['Inter', 'sans-serif']
      },
      maxWidth: {
        shell: '1247px',
        content: '1175px'
      },
      letterSpacing: {
        display: '-0.025em'
      },
      boxShadow: {
        hero: 'inset 0 0 0 9999px rgba(0,0,0,0.22)'
      }
    }
  },
  plugins: []
}

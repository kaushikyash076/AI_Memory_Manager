/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        heading: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      colors: {
        background: '#111215',
        'background-alt': '#191a20',
        card: '#181826',
        primary: '#0fd7f3',
        'primary-hover': '#34b8ed',
        'text-primary': '#fafbfc',
        'text-secondary': '#818596',
        border: '#24242a',
        success: '#65e97c',
        warning: '#f9c851',
        danger: '#fa5c5c',
        accent: '#7c3aed',
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 8px 24px 0 rgba(14,16,19,0.17)',
      },
    },
  },
  plugins: [],
};

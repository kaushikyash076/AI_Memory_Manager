/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'background': '#FFFFFF',
        'background-alt': '#F3F4F6',
        'primary': '#0540AE',
        'secondary': '#EB49A8',
        'text-primary': '#111827',
        'text-secondary': '#4B5563',
      },
      fontFamily: {
        heading: ['Figtree', 'sans-serif'],
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

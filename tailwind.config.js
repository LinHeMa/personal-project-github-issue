/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-green': '#2ba44e',
        'primary-icon-gray': '#57606a',
        'primary-bg-gray': '#f6f8fa',
      },
      screens: {
        sm: '544px',
        md: '768px',
        lg: '1012px',
      },
      container: {
        padding: {
          sm: '16px',
          md: '24px',
          lg: '32px',
        },
      },
    },
  },
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  plugins: [
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/line-clamp'),
    // require('@tailwindcss/aspect-ratio')
  ],
};

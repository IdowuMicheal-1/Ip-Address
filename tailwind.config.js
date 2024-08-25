/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        verDarkGray:'hsl(0, 0%, 17%)',
        darkGray:'hsl(0, 0%, 59%)'
      },
      fontFamily:{
        'sans':['Rubik']
      },
      backgroundImage:{
        'top-Lgheader':"url('./assets/images/pattern-bg-desktop.png')",
        'top-Smheader':"url('./assets/images/pattern-bg-mobile.png')",
      }
    },
  },
  plugins: [],
}


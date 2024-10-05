/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        Mine: "Minecraft"
      },
      zIndex : {
        "1" : 1,
        "2" : 2,
        "60" : 60,
        "29" : 29,
      },
      height: {
        
      }
    },
  },
  plugins: [],
}

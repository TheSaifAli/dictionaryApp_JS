/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {
      colors:{
        brown:{
          light:'#A1887F',
          medium:'#8D6E63',
          dark:'#795548',
          extraDark:'#5D4037'
        }
      },
      screens:{
        'sm':'425px',
        'md':'768px',
         
      }
    },
  },
  plugins: [],
}


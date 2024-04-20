import type { Config } from "tailwindcss";


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          'apodCard': "url('/apodCard.png')",
          'epicCard' : "url('/epicCard.jpg')",
          'insightCard' : "url('/insightCard.jpg')",
          'marsCard' : "url('/marsCard.jpg')",
           'backgroundLarge2Nav': "url('/backgroundNav.jpg')",
          'backgroundLarge2' : "url('/backgroundLarge2.jpg')",
          'moonIcon' : "url('/moonIcon.png')",
          'videoButton' :"url('/videoButton0.png')"
        
        
          
      },
      colors: {
        customGray: '#242624',
      },
      keyframes: {
       
        animateSubir : {
          '0%' :{
            opacity: '0'
          },
          '100%' : {
            opacity: '25%'
          } 
        },
      },
      animation: {
        'animateSubirr': 'animateSubir 2s ease-in-out ',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['hover'], // Adicione a variante hover para a classe opacity
    },
  },
  plugins: [],
};
export default config;

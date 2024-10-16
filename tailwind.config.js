/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        
          primary: "#FFB703",   // Une couleur chaude, jaune/orangée
          secondary: "#023047", // Un bleu foncé pour le contraste
          accent: "#E63946",    // Un rouge profond pour les boutons et les détails
          background: "#f4f4f9" // Un gris clair pour le fond
        
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#10b981",   // 成長綠
        secondary: "#6366f1", // 心理藍
        accent: "#f59e0b",    // 警示橘
      }
    },
  },
  plugins: [],
}
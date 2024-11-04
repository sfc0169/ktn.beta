/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",       // appフォルダ内のすべてのファイル
    "./pages/**/*.{js,jsx,ts,tsx}",     // pagesフォルダ内のすべてのファイル
    "./components/**/*.{js,jsx,ts,tsx}" // componentsフォルダ内のすべてのファイル
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
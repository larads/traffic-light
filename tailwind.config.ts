import { fontFamily } from "./src/styles/fonts-family"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*/**"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily
    },
  },
  plugins: [],
}
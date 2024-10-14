import withMT from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F6F6F8",
          100: "#C9CBD8",
          200: "#9CA0B7",
          300: "#707696",
          400: "#434D75",
          500: "#172554",
          600: "#122051",
          700: "#0D1C4D",
          800: "#091749",
          900: "#051344",
        },
      },
      fontFamily: {
        amaranth: "Amaranth",
        poppins: "Poppins",
      },
    },
  },
  plugins: [],
});

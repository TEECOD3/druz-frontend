import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  fonts: {
    body: "Mulish, sans-serif",
    heading: "Playfair Display, serif",
    mono: "Menlo, monospace",
  },
  colors: {
    brand: {
      primary: "#3B9795",
      borderColor: "rgba(0, 0, 0, 0.08)",
      grey: "#A0AEC0",
      orangeButton: {
        500: "#fb8f1d",
        600: "#e27604",
      },
    },
  },
  fontWeights: {
    heading: 600,
    bolder: 800,
    boldest: 900,
  },
});

export default customTheme;

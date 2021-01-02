import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: "Rubik, sans-serif",
      },
      // a: {
      //   color: "teal.500",
      //   _hover: {
      //     textDecoration: "underline",
      //   },
      // },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: 700,
        fontFamily: "Rubik, sans-serif",
      },
    },
  },
  colors: {
    brand: {
      primary: "#3B9795",
      borderColor: "rgba(0, 0, 0, 0.08)",
      white: "#ffffff",
      black: "#2D3748",
      grey: "#A0AEC0",
      greyText: "#8E8E93",
      primaryButton: {
        500: "#3B9795",
        600: "#20615f",
      },
    },
  },
  fontWeights: {
    heading: 600,
    bolder: 800,
    boldest: 900,
  },
});

export const mainColors = {
  primary: "#3B9795",
  borderColor: "rgba(0, 0, 0, 0.08)",
  white: "#ffffff",
};

export default customTheme;

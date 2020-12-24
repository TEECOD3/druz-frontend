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
      },
    },
  },
  colors: {
    brand: {
      primary: "#3B9795",
      borderColor: "rgba(0, 0, 0, 0.08)",
      white: "#ffffff",
      grey: "#A0AEC0",
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

import * as React from "react";
import { Box, useColorMode } from "@chakra-ui/react";
import Navbar from "./navbar";
import Footer from "./footer";
import { backgroundColor, color } from "utils/colorValues";

const Wrapper: React.FC<React.ReactNode> = (props) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      bg={backgroundColor[colorMode]}
      color={color[colorMode]}
      minH="100vh"
      position="relative"
    >
      <Navbar />
      <Box pt="5rem" />

      <Box overflow="hidden" pb="5rem">
        {props.children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Wrapper;

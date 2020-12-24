import * as React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import Navbar from "./navbar";
import Footer from "./footer";
import { backgroundColor, color } from "utils/colorValues";

const Wrapper: React.FC<React.ReactNode> = (props) => {
  const bg = useColorModeValue(backgroundColor.light, backgroundColor.dark);
  const colorValue = useColorModeValue(color.light, color.dark);
  return (
    <Box bg={bg} color={colorValue} minH="100vh" position="relative">
      <Navbar />
      <Box pt="5rem" />

      <Box overflow="hidden" pb="7rem">
        {props.children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Wrapper;

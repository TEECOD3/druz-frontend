import * as React from "react";
import Link from "next/link";
import { Box, Text, useColorMode } from "@chakra-ui/react";
import { borderColor } from "utils/colorValues";

const Footer: React.FC = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
      position="absolute"
      bottom="0"
      height="auto"
      w="100%"
      py={["1.3rem", "1.6rem"]}
      px={["1rem", "1.5rem", "2rem"]}
      borderTop={`1px solid ${borderColor[colorMode]}`}
      borderBottom="6px solid #3B9795"
    >
      <Box m="0 auto" maxW={["1200px"]}>
        <Text fontSize="md" d="block" textAlign="center">
          &copy; {new Date().getFullYear()}{" "}
          <Link href="https://twitter.com/druz_app">
            <a>Druz</a>
          </Link>{" "}
          |{" "}
          <Link href="/disclaimer">
            <a>Disclaimer</a>
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;

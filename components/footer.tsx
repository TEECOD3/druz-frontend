import * as React from "react";
import Link from "next/link";
import { Box, Text } from "@chakra-ui/react";

const Footer: React.FC = () => {
  return (
    <Box
      position="absolute"
      bottom="0"
      height="auto"
      w="100%"
      pb={["2rem", "3rem"]}
      px={["1rem", "1.5rem", "2rem"]}
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

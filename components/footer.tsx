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
          <Text
            color="brand.primary"
            fontWeight={500}
            _hover={{ textDecoration: "underline" }}
            as="span"
          >
            <Link href="https://twitter.com/druz_app">
              <a>Druz</a>
            </Link>
          </Text>{" "}
          &#8226;{" "}
          <Text
            color="brand.primary"
            fontWeight={500}
            _hover={{ textDecoration: "underline" }}
            as="span"
          >
            <Link href="/privacy-policy">
              <a>Privacy Policy</a>
            </Link>
          </Text>{" "}
          &#8226;{" "}
          <Text
            color="brand.primary"
            fontWeight={500}
            _hover={{ textDecoration: "underline" }}
            as="span"
          >
            <Link href="/terms-of-use">
              <a>Terms of Use</a>
            </Link>
          </Text>{" "}
          <Text d={{ base: "none", md: "inline" }} as="span">
            &#8226;
          </Text>{" "}
          <Text
            color="brand.primary"
            fontWeight={500}
            _hover={{ textDecoration: "underline" }}
            d={{ base: "block", md: "inline" }}
            textAlign="center"
            as="span"
          >
            <Link href="mailto:druzcontact@gmail.com">
              <a>Contact us</a>
            </Link>
          </Text>
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;

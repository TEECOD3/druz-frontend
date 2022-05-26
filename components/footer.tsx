import * as React from "react";
import Link from "next/link";
import { Box, Text, useColorMode, VStack, HStack } from "@chakra-ui/react";
import { borderColor } from "utils/colorValues";
import Container from "components/container";
import { useScript } from "../hooks/useScript";

const Footer: React.FC = () => {
  const { colorMode } = useColorMode();

  const ref = React.useRef<HTMLDivElement>(null);
  useScript("https://commerce.coinbase.com/v1/checkout.js?version=201807", ref);
  return (
    <Box
      position="absolute"
      bottom="0"
      height="auto"
      w="100%"
      py={["1.3rem"]}
      px={["1rem", "1.5rem", "2rem"]}
      borderTop={`1px solid ${borderColor[colorMode]}`}
      borderBottom="6px solid #3B9795"
    >
      <Container>
        <VStack spacing={2}>
          <HStack flexWrap="wrap" justify="center" spacing={4}>
            <Link passHref href="/about">
              <Text
                _hover={{ textDecoration: "underline" }}
                fontSize="sm"
                color="brand.primary"
                fontWeight={500}
                as="a"
              >
                About Druz
              </Text>
            </Link>
            <Link passHref href="/how-it-works">
              <Text
                _hover={{ textDecoration: "underline" }}
                fontSize="sm"
                color="brand.primary"
                fontWeight={500}
                as="a"
              >
                How it works
              </Text>
            </Link>
            <Link passHref href="/contact">
              <Text
                _hover={{ textDecoration: "underline" }}
                fontSize="sm"
                color="brand.primary"
                fontWeight={500}
                as="a"
              >
                Contact us
              </Text>
            </Link>
          </HStack>
          <HStack flexWrap="wrap" justify="center" spacing={4}>
            <Link passHref href="/faq">
              <Text
                _hover={{ textDecoration: "underline" }}
                fontSize="sm"
                color="brand.primary"
                fontWeight={500}
                as="a"
              >
                FAQs
              </Text>
            </Link>
            <Link passHref href="/privacy-policy">
              <Text
                _hover={{ textDecoration: "underline" }}
                fontSize="sm"
                color="brand.primary"
                fontWeight={500}
                as="a"
              >
                Privacy policy
              </Text>
            </Link>
            <Link passHref href="/terms-of-use">
              <Text
                _hover={{ textDecoration: "underline" }}
                fontSize="sm"
                color="brand.primary"
                fontWeight={500}
                as="a"
              >
                Terms of use
              </Text>
            </Link>
          </HStack>
          <Text fontSize="sm" textAlign="center" fontWeight={500}>
            &copy; Druz {new Date().getFullYear()}
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Footer;

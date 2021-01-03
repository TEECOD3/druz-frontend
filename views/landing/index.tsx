import * as React from "react";
import Link from "next/link";
import {
  Box,
  Heading,
  Text,
  Image,
  Stack,
  chakra,
  useColorMode,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Container from "components/container";
import { Button } from "components/buttons";
import { GetStartedIcon } from "utils/customIcons";
import { borderColor } from "utils/colorValues";

const LandingPage: React.FC = () => {
  const { colorMode } = useColorMode();

  return (
    <Box mt={[16, 20]}>
      <Container>
        <motion.div
          initial={{ y: 2000, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Heading mb={[4, 6]} as="h1" size="xl" textAlign="center">
            Find out what people think about you.
          </Heading>
          <Text maxWidth="900px" mx="auto" mb={[8, 10]} textAlign="center">
            Druz is an interactive, fun, secure and safe app. Create an account,
            set your questions, share your profile link and see what your
            friends think about you!{" "}
            <chakra.span fontWeight={500} fontStyle="italic">
              All for free
            </chakra.span>
          </Text>
          <Link href="/register" passHref>
            <Button
              toAnimate={true}
              d="flex"
              w="fit-content"
              as="a"
              rightIcon={<GetStartedIcon />}
              height="3.2rem"
              mx="auto"
            >
              Get Started
            </Button>
          </Link>
        </motion.div>

        <Box mb={[16, 20]}>
          <motion.div
            initial={{ y: -2000, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <Image
              d={colorMode == "dark" ? "block" : "none"}
              mt={[4, 6]}
              mx="auto"
              src="/images/landing_people_dark.svg"
              alt="A group of people searching for something"
            />

            <Image
              d={colorMode == "dark" ? "none" : "block"}
              mt={[4, 6]}
              mx="auto"
              src="/images/landing_people.svg"
              alt="A group of people searching for something"
            />
          </motion.div>
        </Box>

        <Box mb={[10, 20, 36]}>
          <motion.div
            initial={{ y: -1000, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <Stack
              mb={{ base: 12, md: 20 }}
              spacing="2rem"
              justify="space-between"
              align="center"
              direction={{ base: "column", md: "row" }}
            >
              <Box mb={{ base: 4, md: 0 }}>
                <Box
                  p={4}
                  w="fit-content"
                  borderRadius="5px"
                  backgroundColor="brand.primary"
                >
                  <Image alt="" src="/images/flexible.svg" />
                </Box>
                <Text my={2} fontWeight={500} fontSize="lg">
                  Flexible
                </Text>
                <Text maxWidth={["400px"]}>
                  Edit, add to and remove default questions as well as add your
                  own personal questions.
                </Text>
              </Box>
              <Box>
                <Box
                  p={4}
                  w="fit-content"
                  borderRadius="5px"
                  backgroundColor="brand.primary"
                >
                  <Image alt="" src="/images/landing_free.svg" />
                </Box>
                <Text my={2} fontWeight={500} fontSize="lg">
                  100% Free
                </Text>
                <Text maxWidth={["400px"]}>
                  Access all of Druz&apos; features without having to pay a
                  penny.
                </Text>
              </Box>
            </Stack>
            <Stack
              spacing="2rem"
              justify="space-between"
              align="center"
              direction={{ base: "column", md: "row" }}
            >
              <Box mb={{ base: 4, md: 0 }}>
                <Box
                  p={4}
                  w="fit-content"
                  borderRadius="5px"
                  backgroundColor="brand.primary"
                >
                  <Image alt="" src="/images/landing_secure.svg" />
                </Box>
                <Text my={2} fontWeight={500} fontSize="lg">
                  Secure And Private
                </Text>
                <Text maxWidth={["400px"]}>
                  Messages are secured with end to end encryption and your
                  account is secure.
                </Text>
              </Box>
              <Box>
                <Box
                  p={4}
                  w="fit-content"
                  borderRadius="5px"
                  backgroundColor="brand.primary"
                >
                  <Image alt="" src="/images/landing_simple.svg" />
                </Box>
                <Text my={2} fontWeight={500} fontSize="lg">
                  Simple To Use
                </Text>
                <Text maxWidth={["400px"]}>
                  Easy to setup, Navigate and answer questions with ease.
                </Text>
              </Box>
            </Stack>
          </motion.div>
        </Box>
      </Container>

      <Box
        borderTop={`1px solid ${borderColor[colorMode]}`}
        pt={{ base: 14, md: 24 }}
        mb={{ base: 10, md: 16 }}
      >
        <Container>
          <Heading textAlign="center" size="lg" mb={[4, 6]} as="h2">
            Ready to dive in? <br /> Start creating questions
          </Heading>
          <Link href="/register" passHref>
            <Button
              toAnimate={true}
              d="flex"
              w="fit-content"
              as="a"
              height="3.2rem"
              mx="auto"
            >
              Get Started
            </Button>
          </Link>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;

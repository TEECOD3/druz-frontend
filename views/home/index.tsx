import * as React from "react";
import {
  Box,
  Text,
  Stack,
  HStack,
  Heading,
  InputGroup,
  InputRightElement,
  Button as ChakraButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { ImTwitter } from "react-icons/im";
import PageTransition from "components/pageTransition";
import Container from "components/container";
import { QuestionIcon, ResponseIcon } from "utils/customIcons";
import CustomInput from "components/customInput";
import { color } from "utils/colorValues";

const Home: React.FC = () => {
  const { colorMode } = useColorMode();
  const colorValue = useColorModeValue(color.light, color.dark);

  return (
    <PageTransition>
      <Container>
        <Box mt={[0, 4, 20]}>
          <Stack
            align="center"
            justify="space-between"
            direction={{ base: "column", md: "row" }}
          >
            <Box mb={{ base: 10, md: 0 }} flexBasis="40%">
              <Heading mb={4} size="lg" as="h1">
                Welcome back Erons
              </Heading>
              <Text mb={{ base: 6, md: 8 }}>
                Share your Druz link with friends and have take on your
                challenge
              </Text>
              <InputGroup mb={{ base: 6, md: 8 }}>
                <CustomInput
                  backgroundColor={colorMode == "dark" ? "inherit" : "#d3edff"}
                  color={colorValue}
                  isReadOnly
                  defaultValue="https://druz.xyz/erons"
                />
                <InputRightElement height="100%" width="5.5rem">
                  <ChakraButton
                    colorScheme="brand.primaryButton"
                    backgroundColor="brand.primary"
                    height="2.2rem"
                    fontWeight="normal"
                    fontSize="sm"
                    color="brand.white"
                  >
                    Copy
                  </ChakraButton>
                </InputRightElement>
              </InputGroup>
              <HStack
                align="center"
                justify={{ base: "center", md: "flex-start" }}
                spacing="1rem"
              >
                <FaFacebook
                  size="2.5rem"
                  color="#3B5998"
                  style={{ cursor: "pointer" }}
                />
                <IoLogoWhatsapp
                  size="2.5rem"
                  color="#2cb742"
                  style={{ cursor: "pointer" }}
                />
                <ImTwitter
                  size="2.5rem"
                  color="#00aced"
                  style={{ cursor: "pointer" }}
                />
              </HStack>
            </Box>
            <Box width={["100%", "70%", "100%"]} flexBasis="50%">
              <Stack
                justify="space-between"
                align="center"
                direction={{ base: "column", md: "row" }}
              >
                <Box
                  width="100%"
                  flexBasis="48%"
                  shadow={colorMode == "dark" ? "dark-lg" : "base"}
                  borderRadius="5px"
                  mb={{ base: 6, md: 0 }}
                  py={{ base: 4, md: 6 }}
                  px={10}
                >
                  <HStack mb={{ base: 8, md: 12 }} justify="space-between">
                    <ResponseIcon w="1.7rem" h="1.7rem" />
                    <Text fontSize="2xl" fontWeight="bold">
                      10
                    </Text>
                  </HStack>
                  <Text
                    mb={4}
                    fontSize="lg"
                    color={colorMode == "dark" ? "inherit" : "brand.greyText"}
                    fontWeight={500}
                  >
                    Responses
                  </Text>
                  <HStack justify="flex-end">
                    <Text fontWeight={500} color="brand.primary">
                      <Link href="/responses">
                        <a>View all</a>
                      </Link>
                    </Text>
                  </HStack>
                </Box>

                <Box
                  flexBasis="48%"
                  width="100%"
                  shadow={colorMode == "dark" ? "dark-lg" : "base"}
                  borderRadius="5px"
                  mb={{ base: 6, md: 0 }}
                  py={{ base: 4, md: 6 }}
                  px={10}
                >
                  <HStack mb={{ base: 8, md: 12 }} justify="space-between">
                    <QuestionIcon w="1.7rem" h="1.7rem" />
                    <Text fontSize="2xl" fontWeight="bold">
                      20
                    </Text>
                  </HStack>
                  <Text
                    mb={4}
                    fontSize="lg"
                    color={colorMode == "dark" ? "inherit" : "brand.greyText"}
                    fontWeight={500}
                  >
                    Questions
                  </Text>
                  <HStack justify="flex-end">
                    <Text fontWeight={500} color="brand.primary">
                      <Link href="/responses">
                        <a>View all</a>
                      </Link>
                    </Text>
                  </HStack>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Container>
    </PageTransition>
  );
};

export default Home;

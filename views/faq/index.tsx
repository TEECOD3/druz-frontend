import * as React from "react";
import Link from "next/link";
import {
  Box,
  Text,
  Heading,
  useColorMode,
  HStack,
  VStack,
  SlideFade,
} from "@chakra-ui/react";
import { Button } from "components/buttons";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import Container from "components/container";
import PageTransition from "components/pageTransition";
import { questionsData } from "./questionsData";

const FAQ: React.FC = () => {
  const { colorMode } = useColorMode();
  const [currentDisplay, setCurrentDisplay] = React.useState<number | null>(
    null,
  );

  const handleDisplayAnswer = (idx: number) => {
    setCurrentDisplay(currentDisplay === idx ? null : idx);
  };

  return (
    <PageTransition>
      <Container>
        <Box mb={{ base: 10, md: 16 }} mt={{ base: 4, md: 10 }}>
          <Heading textAlign="center" as="h1">
            Frequently Asked Questions
          </Heading>

          <VStack
            spacing={4}
            mt={{ base: 6, md: 12 }}
            maxWidth="900px"
            mx="auto"
            align="stretch"
          >
            {questionsData.map((questionSet, idx) => (
              <Box
                key={idx}
                border={
                  currentDisplay == idx ? "1px solid rgba(0, 0, 0, 0.08)" : 0
                }
                borderRadius="20px"
                shadow={
                  currentDisplay !== idx
                    ? "none"
                    : colorMode == "dark"
                    ? "2xl"
                    : "sm"
                }
                backgroundColor={
                  currentDisplay === idx && colorMode == "dark"
                    ? "#191d27"
                    : "inherit"
                }
              >
                <HStack
                  align="center"
                  justify="space-between"
                  p={["1rem 1rem 0 1rem", "1.5rem 2rem 0 2rem"]}
                  cursor="pointer"
                  fontWeight={700}
                  onClick={() => {
                    handleDisplayAnswer(idx);
                  }}
                  color="brand.primary"
                >
                  <Text fontSize={{ base: "md", md: "lg" }}>
                    {questionSet.question}
                  </Text>

                  {currentDisplay == idx ? (
                    <ChevronUpIcon h="2rem" w="2rem" />
                  ) : (
                    <ChevronDownIcon h="2rem" w="2rem" />
                  )}
                </HStack>
                <SlideFade offsetY={50} in={currentDisplay == idx}>
                  <Box
                    d={currentDisplay == idx ? "block" : "none"}
                    p={["1rem", "1.5rem 2rem"]}
                  >
                    <Text>{questionSet.answer}</Text>
                  </Box>
                </SlideFade>
              </Box>
            ))}
          </VStack>

          <Box>
            <Heading
              mx="auto"
              size="lg"
              textAlign="center"
              mb={{ base: 2, md: 4 }}
              as="h2"
            >
              Still need help?
            </Heading>
            <Text
              mb={{ base: 4, md: 6 }}
              maxW="600px"
              mx="auto"
              textAlign="center"
              fontSize={{ base: "md", md: "lg" }}
            >
              Our team is happy to answer your questions. Contact us and we’ll
              be in touch as soon as possible.
            </Text>

            <Link href="/contact" passHref>
              <Button
                toAnimate={true}
                d="flex"
                w="fit-content"
                as="a"
                height="3.2rem"
                mx="auto"
                px="4rem"
              >
                Contact us
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </PageTransition>
  );
};

export default FAQ;

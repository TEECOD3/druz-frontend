import * as React from "react";
import Link from "next/link";
import { Box, Text, Heading, Stack, StackProps, Image } from "@chakra-ui/react";
import Container from "components/container";
import PageTransition from "components/pageTransition";
import { Button } from "components/buttons";

const HowItWorksStack = (props: StackProps) => {
  return (
    <Stack
      justify="space-between"
      align="flex-start"
      mb={{ base: "3rem", md: "4rem" }}
      direction={{ base: "column", md: "row" }}
      {...props}
    />
  );
};

const HowItWorks: React.FC = () => {
  return (
    <PageTransition>
      <Container>
        <Box mb={{ base: 16, md: 20 }} mt={{ base: 4, md: 6 }}>
          <Heading textAlign="center" as="h1">
            How Druz works
          </Heading>

          <Box mx="auto" maxWidth="900px" mt={{ base: 8, md: 16 }}>
            <HowItWorksStack>
              <Box flexBasis="50%">
                <Heading size="md" mb="1rem" as="h4">
                  Create your account
                </Heading>
                <Text
                  maxWidth="550px"
                  color="brand.lightBlack"
                  fontSize={["16px"]}
                >
                  Get started by creating your account with basic information
                  like your username, email address and password.
                </Text>
              </Box>

              <Image
                border="1px solid rgba(0, 0, 0, 0.08)"
                w={["100%", "70%", "25%"]}
                src="/images/register_screen.jpg"
              />
            </HowItWorksStack>
            <HowItWorksStack direction={{ base: "column-reverse", md: "row" }}>
              <Image
                border="1px solid rgba(0, 0, 0, 0.08)"
                w={["100%", "70%", "25%"]}
                src="/images/questions_screen.jpg"
              />

              <Box flexBasis="50%">
                <Box ml={[0, 0, "auto"]} maxWidth="550px">
                  <Heading size="md" mb="1rem" as="h4">
                    Edit/add to your questions
                  </Heading>
                  <Text color="brand.lightBlack" fontSize={["16px"]}>
                    You can add to, remove or edit the default questions however
                    you like.
                  </Text>
                </Box>
              </Box>
            </HowItWorksStack>
            <HowItWorksStack>
              <Box flexBasis="50%">
                <Heading size="md" mb="1rem" as="h4">
                  Share your profile link
                </Heading>
                <Text
                  maxWidth="550px"
                  color="brand.lightBlack"
                  fontSize={["16px"]}
                >
                  Copy your profile link and share to your friends, followers or
                  on your stories.
                </Text>
              </Box>

              <Image
                border="1px solid rgba(0, 0, 0, 0.08)"
                w={["100%", "70%", "25%"]}
                src="/images/copy_link_screen.jpg"
              />
            </HowItWorksStack>
            <HowItWorksStack direction={{ base: "column-reverse", md: "row" }}>
              <Image
                border="1px solid rgba(0, 0, 0, 0.08)"
                w={["100%", "70%", "25%"]}
                src="/images/challenge_screen.jpg"
              />
              <Box flexBasis="50%">
                <Box maxWidth="550px" ml={[0, 0, "auto"]}>
                  <Heading size="md" mb="1rem" as="h4">
                    Have your friends answer your questions
                  </Heading>
                  <Text
                    maxWidth="550px"
                    color="brand.lightBlack"
                    fontSize={["16px"]}
                  >
                    Your friends can now answer your questions when they click
                    on your profile link.
                  </Text>
                </Box>
              </Box>
            </HowItWorksStack>
            <HowItWorksStack>
              <Box flexBasis="50%">
                <Heading size="md" mb="1rem" as="h4">
                  View your responses
                </Heading>
                <Text
                  maxWidth="550px"
                  color="brand.lightBlack"
                  fontSize={["16px"]}
                >
                  You can view all the responses submitted by those who answered
                  your questions.
                </Text>
              </Box>
              <Image
                border="1px solid rgba(0, 0, 0, 0.08)"
                w={["100%", "70%", "25%"]}
                src="/images/responses_screen.jpg"
              />
            </HowItWorksStack>
          </Box>
        </Box>

        <Heading textAlign="center" size="lg" mb={[4, 6]} as="h2">
          Don&rsquo;t have an account yet?
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
    </PageTransition>
  );
};

export default HowItWorks;

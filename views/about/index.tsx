import * as React from "react";
import Link from "next/link";
import { Box, Text, Heading } from "@chakra-ui/react";
import Container from "components/container";
import PageTransition from "components/pageTransition";

const About: React.FC = () => {
  return (
    <PageTransition>
      <Container>
        <Box
          mx="auto"
          maxWidth="900px"
          mb={{ base: 10, md: 16 }}
          mt={{ base: 4, md: 10 }}
        >
          <Heading textAlign="center" as="h1">
            About Druz
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} mt={8}>
            Druz is a fun and interactive social platform that helps users find
            out what their friends, family and fans think about them by getting
            them to answer questions they set on their profile.
          </Text>
          <Text fontSize={{ base: "md", md: "lg" }} mt={4}>
            There are some default questions already setup for newly registered
            users that make it easy for them to share their link and start
            viewing responses as soon as possible.
          </Text>
          <Text fontSize={{ base: "md", md: "lg" }} mt={4}>
            Druz makes it very easy for users to share their link on other
            social media platforms too so that their followers and contacts can
            take their challenge.
          </Text>
          <Text fontSize={{ base: "md", md: "lg" }} mt={4}>
            If you don&rsquo;t have an account yet, check out{" "}
            <Link href="/how-it-works" passHref>
              <Text
                fontWeight={500}
                color="brand.primary"
                _hover={{ textDecor: "underline" }}
                as="a"
              >
                how it works
              </Text>
            </Link>{" "}
            and get started for free!
          </Text>
        </Box>
      </Container>
    </PageTransition>
  );
};

export default About;

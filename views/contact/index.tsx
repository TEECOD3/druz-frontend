import * as React from "react";
import { Box, Text, Heading, HStack } from "@chakra-ui/react";
import { HiOutlineMail } from "react-icons/hi";
import { ImTwitter } from "react-icons/im";
import Container from "components/container";
import PageTransition from "components/pageTransition";

const Contact: React.FC = () => {
  return (
    <PageTransition>
      <Container>
        <Box mb={{ base: 10, md: 16 }} mt={{ base: 4, md: 10 }}>
          <Heading mb={4} textAlign="center" as="h1">
            Say Hi
          </Heading>
          <Text
            textAlign="center"
            maxW="450px"
            fontWeight={500}
            mx="auto"
            fontSize={{ base: "md", md: "lg" }}
          >
            We’ll be happy to answer all your questions or inquiries, feel free
            to say Hello.
          </Text>
          <HStack justify="center" spacing={4} mt={{ base: 6, md: 12 }}>
            <Box
              transition="transform ease-in .3s"
              _hover={{ transform: "scale(1.1)" }}
            >
              <a rel="noreferrer" target="_blank" href="mailto:hello@druz.xyz">
                <HiOutlineMail size="50px" />
              </a>
            </Box>
            <Box
              transition="transform ease-in .3s"
              _hover={{ transform: "scale(1.1)" }}
            >
              <a
                rel="noreferrer"
                target="_blank"
                href="https://twitter.com/druz_app"
              >
                <ImTwitter color="#00aced" size="48px" />
              </a>
            </Box>
          </HStack>
        </Box>
      </Container>
    </PageTransition>
  );
};

export default Contact;

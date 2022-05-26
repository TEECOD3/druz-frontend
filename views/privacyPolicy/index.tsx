import * as React from "react";
import { Box, Text, Heading } from "@chakra-ui/react";
import Container from "components/container";
import PageTransition from "components/pageTransition";

const PrivacyPolicy: React.FC = () => {
  return (
    <PageTransition>
      <Container>
        <Box
          mx="auto"
          maxWidth="800px"
          mb={{ base: 10, md: 16 }}
          mt={{ base: 4, md: 10 }}
        >
          <Heading textAlign="center" as="h1">
            Privacy Policy
          </Heading>
          <Text mt={8}>
            Some parts of our platform can be accessed without registration and
            other parts can only be accessed by registered users. While signing
            up, We require you to provide some of your information like your
            name and email address.
          </Text>
          <Text mt={4}>
            {" "}
            Most of your information like Email, responses sent to and from
            other users are not shared with the public or any other third party.
            Your name and questions however will appear to the public by
            default.{" "}
          </Text>{" "}
          <Text mt={4}>
            To maintain the safety and security of our users, we record your IP
            address when you register and send responses to other users. <br />
          </Text>
        </Box>
      </Container>
    </PageTransition>
  );
};

export default PrivacyPolicy;

import * as React from "react";
import { Box, Text, Heading } from "@chakra-ui/react";
import Container from "components/container";
import PageTransition from "components/pageTransition";

const TermsOfUse: React.FC = () => {
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
            Terms of use
          </Heading>
          <Text mt={8}>
            The following apply both to registered and non-registered users of
            this app.
          </Text>
          <Text mt={4}>
            All users must refrain from insult and abuse of the app&apos;s
            services.
          </Text>
          <Text mt={4}>
            We have the right to block any user from accessing our services.
          </Text>
          <Text mt={4}>
            We have the right to remove content or accounts for any reason we
            see adequate. We constantly monitor and will do well to block or
            remove content that we consider to be harassing or bullying.
          </Text>
          <Text mt={4}>
            We have the right to modify our terms of usage whenever adequate.
          </Text>
          <Text mt={4}>
            All content created and shared is the sole responsibility of the
            person who originated such content which is carried out at their own
            risk.
          </Text>
          <Text mt={4}>
            You will be solely responsible for any damage or loss to you or any
            other party resulting therefrom. All communicated content on the
            website is the responsibility of the respective users and we are not
            responsible for any content or any damage that could result from any
            content or the use of our services, even if caused or contributed by
            our negligence.
          </Text>
        </Box>
      </Container>
    </PageTransition>
  );
};

export default TermsOfUse;

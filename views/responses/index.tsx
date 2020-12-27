import * as React from "react";
import {
  Text,
  Heading,
  Box,
  Stack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import PageTransition from "components/pageTransition";
import Container from "components/container";
import SingleResponse from "./singleResponse";

const Responses: React.FC = () => {
  const { colorMode } = useColorMode();
  const boxBackgroundColor = useColorModeValue(
    "rgba(242, 242, 242, 0.25)",
    "rgb(25 29 39)",
  );

  return (
    <PageTransition>
      <Box
        border="1px solid rgba(160, 174, 192, 0.15)"
        backgroundColor={boxBackgroundColor}
        py={4}
      >
        <Container>
          <Box mx="auto" width={["100%", "70%", "50%"]}>
            <Stack
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align="center"
            >
              <Heading size="md" as="h1">
                All Responses
              </Heading>
            </Stack>
          </Box>
        </Container>
      </Box>
      <Box pt={{ base: 6, md: 8 }}>
        <Container>
          <Text
            fontWeight="bold"
            textAlign="center"
            mb={4}
            color={colorMode == "dark" ? "inherit" : "brand.grey"}
          >
            Showing 1 - 10 of 50 responses
          </Text>
          {new Array(10).fill("_").map((_, idx) => (
            <SingleResponse key={idx} />
          ))}
        </Container>
      </Box>
    </PageTransition>
  );
};

export default Responses;

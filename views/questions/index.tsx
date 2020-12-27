import * as React from "react";
import {
  Text,
  Heading,
  Box,
  Stack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import PageTransition from "components/pageTransition";
import Container from "components/container";
import { Button } from "components/buttons";
import SingleQuestion from "./singleQuestion";

const Questions: React.FC = () => {
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
          <Box mx="auto" width={{ base: "100%", md: "70%" }}>
            <Stack
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align="center"
            >
              <Heading mb={{ base: 4, md: 0 }} size="md" as="h1">
                All Questions
              </Heading>
              <Button margin="0" leftIcon={<AddIcon />}>
                Add a New Question
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
      <Box pt={{ base: 6, md: 8 }}>
        <Container>
          <Text
            mx="auto"
            width={{ base: "100%", md: "70%" }}
            fontWeight="bold"
            mb={4}
            color={colorMode == "dark" ? "inherit" : "brand.grey"}
          >
            Showing 10 Questions
          </Text>
          {new Array(10).fill("_").map((_, idx) => (
            <SingleQuestion key={idx} />
          ))}
        </Container>
      </Box>
    </PageTransition>
  );
};

export default Questions;

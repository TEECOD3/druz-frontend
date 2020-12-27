import * as React from "react";
import {
  Box,
  Text,
  useColorMode,
  VStack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { PersonIcon } from "utils/customIcons";

const SingleQuestion: React.FC = () => {
  const { colorMode } = useColorMode();
  const boxBackgroundColor = useColorModeValue(
    "rgba(242, 242, 242, 0.25)",
    "rgb(25 29 39)",
  );
  return (
    <VStack
      spacing={0}
      border={colorMode == "dark" ? 0 : "1px solid rgba(0, 0, 0, 0.08)"}
      shadow={colorMode == "dark" ? "dark-lg" : "none"}
      borderRadius="5px"
      align="flex-start"
      mb={{ base: 4, md: 6 }}
      width={["100%", "70%", "50%"]}
      mx="auto"
    >
      <Box p={{ base: "1rem", md: "1rem 1.5rem" }}>
        <Text fontWeight={500} d="flex" alignItems="center" fontSize="lg">
          <PersonIcon h="1.2rem" w="1.2rem" mr=".5rem" /> Mike Tyson
        </Text>
      </Box>
      <HStack
        p={{ base: ".7rem", md: ".7rem 1.5rem" }}
        width="100%"
        justify="flex-start"
        align="center"
        spacing={{ base: "1rem", md: "2rem" }}
        backgroundColor={boxBackgroundColor}
      >
        <Text color={colorMode == "dark" ? "inherit" : "brand.grey"}>
          3 days ago
        </Text>
        <Text color="brand.primary" cursor="pointer" fontWeight="bold">
          View response
        </Text>
      </HStack>
    </VStack>
  );
};

export default SingleQuestion;

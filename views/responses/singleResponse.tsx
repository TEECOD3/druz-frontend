import * as React from "react";
import {
  Box,
  Text,
  useColorMode,
  VStack,
  HStack,
  Skeleton,
  useColorModeValue,
} from "@chakra-ui/react";
import { PersonIcon } from "utils/customIcons";
import { Answer } from "types/mainTypes";

interface IResponse {
  loading: boolean;
  name?: string;
  answers?: { question: string; answer: string }[];
  questionId: string;
  date?: string;
}

const SingleQuestion: React.FC<IResponse> = ({
  name,
  loading,
  answers,
  date,
}) => {
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
        <Skeleton isLoaded={!loading}>
          <Text fontWeight={500} d="flex" alignItems="center" fontSize="lg">
            <PersonIcon h="1.2rem" w="1.2rem" mr=".5rem" />
            {name ? name : "loading loading loading"}
          </Text>
        </Skeleton>
      </Box>
      <HStack
        p={{ base: ".7rem", md: ".7rem 1.5rem" }}
        width="100%"
        justify="flex-start"
        align="center"
        spacing={{ base: "1rem", md: "2rem" }}
        backgroundColor={boxBackgroundColor}
      >
        <Skeleton isLoaded={!loading}>
          <Text color={colorMode == "dark" ? "inherit" : "brand.grey"}>
            {date ? date : "loading loading loading"}
          </Text>
        </Skeleton>
        <Skeleton isLoaded={!loading}>
          <Text color="brand.primary" cursor="pointer" fontWeight="bold">
            View response
          </Text>
        </Skeleton>
      </HStack>
    </VStack>
  );
};

export default SingleQuestion;

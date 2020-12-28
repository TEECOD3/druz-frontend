import * as React from "react";
import {
  Box,
  Text,
  useColorMode,
  VStack,
  HStack,
  useColorModeValue,
  Skeleton,
} from "@chakra-ui/react";
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";

interface IQuestion {
  loading: boolean;
  content: string;
  handleEditQuestion: (id: string, question: string) => void;
  questionId: string;
  handleRemoveQuestion: (id: string) => void;
}

const SingleQuestion: React.FC<IQuestion> = ({
  loading,
  content,
  questionId,
  handleEditQuestion,
  handleRemoveQuestion,
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
      width={{ base: "100%", md: "70%" }}
      mx="auto"
    >
      <Box width="100%" p={{ base: "1rem", md: "1rem 1.5rem" }}>
        <Skeleton isLoaded={!loading}>
          <Text fontWeight={500} fontSize="lg">
            {content ? content : "loading loading loading loading loading"}
          </Text>
        </Skeleton>
      </Box>
      <HStack
        py=".7rem"
        px={{ base: "3rem", md: "2rem" }}
        width="100%"
        justify="flex-end"
        align="center"
        spacing={{ base: "1rem", md: "2rem" }}
        backgroundColor={boxBackgroundColor}
      >
        <Skeleton isLoaded={!loading}>
          <HStack
            onClick={() => {
              handleEditQuestion(questionId, content);
            }}
            cursor="pointer"
            align="center"
          >
            <HiOutlinePencil size="1.2rem" color="#3B9795" />
            <Text color="#3B9795">Edit</Text>
          </HStack>
        </Skeleton>
        <Skeleton isLoaded={!loading}>
          <HStack
            onClick={() => {
              handleRemoveQuestion(questionId);
            }}
            cursor="pointer"
            align="center"
          >
            <RiDeleteBin6Line size="1.2rem" color="#E53E3E" />
            <Text color="#E53E3E">Remove</Text>
          </HStack>
        </Skeleton>
      </HStack>
    </VStack>
  );
};

export default SingleQuestion;

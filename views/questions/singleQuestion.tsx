import * as React from "react";
import {
  Box,
  Text,
  useColorMode,
  VStack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";

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
    >
      <Box width="100%" p={{ base: "1rem", md: "1rem 1.5rem" }}>
        <Text fontSize="lg">How&rsquo;s my name stored on your phone?</Text>
      </Box>
      <HStack
        p={{ base: ".7rem", md: ".7rem 1.5rem" }}
        width="100%"
        justify="flex-end"
        align="center"
        spacing={{ base: "1rem", md: "2rem" }}
        backgroundColor={boxBackgroundColor}
      >
        <HStack cursor="pointer" align="center">
          <HiOutlinePencil size="1.2rem" color="A0AEC0" />
          <Text>Edit</Text>
        </HStack>
        <HStack cursor="pointer" align="center">
          <RiDeleteBin6Line size="1.2rem" color="A0AEC0" />
          <Text>Remove</Text>
        </HStack>
      </HStack>
    </VStack>
  );
};

export default SingleQuestion;

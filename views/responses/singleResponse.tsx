import * as React from "react";
import {
  Box,
  Text,
  useColorMode,
  VStack,
  HStack,
  Skeleton,
  useColorModeValue,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "utils/axios";
import { WiMoonAltNew } from "react-icons/wi";
import Moment from "react-moment";
import { PersonIcon } from "utils/customIcons";
import { Button } from "components/buttons";

interface IResponse {
  loading: boolean;
  name?: string;
  answers?: { question: string; answer: string }[];
  read?: boolean | undefined;
  responseId: string;
  date?: string;
}

const SingleQuestion: React.FC<IResponse> = ({
  name,
  loading,
  answers,
  read,
  responseId,
  date,
}) => {
  const { colorMode } = useColorMode();
  const boxBackgroundColor = useColorModeValue(
    "rgba(242, 242, 242, 0.25)",
    "rgb(25 29 39)",
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [viewed, setViewed] = React.useState<boolean | undefined>(read);

  const markAnswerRead = async (responseId: string) => {
    try {
      await axios.patch(`/api/v1/answer/read/${responseId}`);
    } catch (err) {
      // catch error or something
    }
  };

  React.useEffect(() => {
    setViewed(read);
  }, [read]);

  return (
    <VStack
      spacing={0}
      border='border=" 1px solid rgba(0, 0, 0, 0.08)"'
      shadow={colorMode == "dark" ? "dark-lg" : "md"}
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
            {date ? <Moment fromNow>{date}</Moment> : "loading loading loading"}
          </Text>
        </Skeleton>
        <Skeleton isLoaded={!loading}>
          <Text
            onClick={() => {
              onOpen();
              viewed === false && markAnswerRead(responseId);
              setViewed(true);
            }}
            color="brand.primary"
            cursor="pointer"
            fontWeight="bold"
          >
            View response
          </Text>
        </Skeleton>
        <Skeleton ml={{ base: 2, md: 0 }} isLoaded={!loading}>
          {viewed === false && (
            <Box ml={{ base: 2, md: 0 }}>
              <WiMoonAltNew size=".8rem" color="#3B9795" />
            </Box>
          )}
        </Skeleton>
      </HStack>

      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <Box mx="1.2rem">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader mb={4}></ModalHeader>
            <ModalCloseButton size="lg" />
            <ModalBody>
              <Box>
                {answers?.map((elem, index) => {
                  return (
                    <Box
                      borderLeft="3px solid #319795"
                      mb={["1.3rem", "1.6rem"]}
                      key={index}
                      shadow={colorMode == "dark" ? "dark-lg" : "md"}
                      padding={["1rem .5rem", "1.5rem 1rem"]}
                    >
                      <Text style={{ wordWrap: "break-word" }} fontSize="md">
                        <Text fontWeight="bold" as="span">
                          Question:
                        </Text>{" "}
                        {elem.question} <br />
                        <Text fontWeight="bold" as="span">
                          Answer:
                        </Text>{" "}
                        {elem.answer}
                      </Text>
                    </Box>
                  );
                })}
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button
                _focus={{ outline: 0 }}
                onClick={onClose}
                margin="0 0 0 auto"
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Box>
      </Modal>
    </VStack>
  );
};

export default SingleQuestion;

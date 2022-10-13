import * as React from "react";
import axios from "utils/axios";
import {
  Text,
  Heading,
  Box,
  Stack,
  Image,
  useColorMode,
  useColorModeValue,
  Skeleton,
  InputGroup,
  InputRightElement,
  Button as ChakraButton,
  useClipboard,
  Flex,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { useToasts } from "react-toast-notifications";
import PageTransition from "components/pageTransition";
import Container from "components/container";
import CustomInput from "components/customInput";
import { Button } from "components/buttons";
import { color } from "utils/colorValues";
import SingleMessage from "./singleMessage";
import { AllDocs, Message } from "types/mainTypes";

const Messages: React.FC = () => {
  const { addToast } = useToasts();
  const { colorMode } = useColorMode();
  const boxBackgroundColor = useColorModeValue(
    "rgba(242, 242, 242, 0.25)",
    "rgb(25 29 39)",
  );
  const [
    allMessages,
    setAllMessages,
  ] = React.useState<AllDocs<Message> | null>();
  const [user, setUser] = React.useState("");
  const [loading, setLoading] = React.useState<boolean>(true);

  const colorValue = useColorModeValue(color.light, color.dark);
  const userLink = `https://druz.xyz/${user}`;
  const { hasCopied, onCopy } = useClipboard(userLink);

  const handleCopy = () => {
    onCopy();
    addToast("Link copied to clipboard!", { appearance: "success" });
  };

  const getMessages = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/v1/auth/user?alongwith=messages&page=${page}`,
      );
      const { data } = res;
      setAllMessages(data?.data?.user?.messages);
      setUser(data?.data?.user?.name);
    } catch (err) {
      // catch error
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getMessages(1);
  }, []);

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
                All Messages
              </Heading>
            </Stack>
          </Box>
        </Container>
      </Box>
      <Box
        mt={
          !loading && allMessages && allMessages?.docs?.length <= 0 ? 0 : "-5px"
        }
        pt={
          !loading && allMessages && allMessages?.docs?.length <= 0
            ? 0
            : { base: 6, md: 8 }
        }
      >
        <Container>
          {loading ? (
            <Text textAlign="center" mb={4}>
              <Skeleton as="span" isLoaded={!loading}>
                Showing 1 - 10 of 50 messages
              </Skeleton>
            </Text>
          ) : !loading &&
            allMessages &&
            allMessages?.docs?.length <= 0 ? null : allMessages?.page &&
            allMessages?.limit &&
            allMessages?.totalDocs ? (
            <Text
              fontWeight="bold"
              textAlign="center"
              mb={4}
              color={colorMode == "dark" ? "inherit" : "brand.grey"}
            >
              Showing {(allMessages?.page - 1) * allMessages?.limit + 1} -{" "}
              {allMessages?.docs?.length === allMessages.limit
                ? allMessages?.page * allMessages?.limit
                : allMessages?.docs?.length +
                  (allMessages?.totalPages - 1) * allMessages?.limit}{" "}
              of {allMessages?.totalDocs} messages
            </Text>
          ) : null}

          {loading
            ? new Array(5)
                .fill("_")
                .map((_, idx) => (
                  <SingleMessage
                    messageId={idx.toString()}
                    loading={loading}
                    key={idx}
                  />
                ))
            : allMessages?.docs?.map(({ name, message, read, _id, date }) => (
                <SingleMessage
                  name={name}
                  message={message}
                  read={read}
                  messageId={_id}
                  key={_id}
                  loading={loading}
                  date={date}
                />
              ))}

          <Flex
            width={["100%", "70%", "50%"]}
            mx="auto"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button
              small
              _focus={{ outline: 0 }}
              display={allMessages?.hasPrevPage ? "block" : "none"}
              mt={["2rem", "2.5rem"]}
              margin="0"
              leftIcon={<ArrowLeftIcon />}
              onClick={() => {
                typeof window !== "undefined" && window.scrollTo(0, 0);
                allMessages?.prevPage && getMessages(allMessages.prevPage);
              }}
            >
              Newer
            </Button>

            <Button
              small
              _focus={{ outline: 0 }}
              display={allMessages?.hasNextPage ? "block" : "none"}
              mt={["2rem", "2.5rem"]}
              margin="0"
              rightIcon={<ArrowRightIcon />}
              onClick={() => {
                typeof window !== "undefined" && window.scrollTo(0, 0);
                allMessages?.nextPage && getMessages(allMessages.nextPage);
              }}
            >
              Older
            </Button>
          </Flex>
          <Box>
            {!loading && allMessages && allMessages?.docs?.length <= 0 && (
              <Box>
                <Image
                  d={colorMode == "dark" ? "none" : "block"}
                  mt="-5px"
                  mx="auto"
                  src="/images/no_response.svg"
                />
                <Image
                  d={colorMode == "dark" ? "block" : "none"}
                  mt="-5px"
                  mx="auto"
                  src="/images/no_response_dark.svg"
                />
                <Heading
                  mx="auto"
                  maxWidth="500px"
                  textAlign="center"
                  my={6}
                  as="h4"
                  size="md"
                  fontWeight={500}
                >
                  You&apos;ve not had any message yet. Share your profile link
                  with your friends and have them take on your challenge{" "}
                  <span role="img" aria-labelledby="hand emoji">
                    👇
                  </span>
                </Heading>
                <InputGroup
                  mx="auto"
                  maxWidth="500px"
                  textAlign="center"
                  mb={{ base: 6, md: 8 }}
                >
                  <CustomInput
                    backgroundColor={
                      colorMode == "dark" ? "inherit" : "#d3edff"
                    }
                    color={colorValue}
                    isReadOnly
                    defaultValue={`https://druz.xyz/${user}`}
                  />
                  <InputRightElement height="100%" width="5.5rem">
                    <ChakraButton
                      colorScheme="brand.primaryButton"
                      backgroundColor="brand.primary"
                      height="2.2rem"
                      fontWeight="normal"
                      fontSize="sm"
                      color="brand.white"
                      onClick={handleCopy}
                    >
                      {hasCopied ? "Copied" : "Copy"}
                    </ChakraButton>
                  </InputRightElement>
                </InputGroup>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </PageTransition>
  );
};

export default Messages;

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
import SingleResponse from "./singleResponse";
import { AllDocs, Answer } from "types/mainTypes";

const Responses: React.FC = () => {
  const { addToast } = useToasts();
  const { colorMode } = useColorMode();
  const boxBackgroundColor = useColorModeValue(
    "rgba(242, 242, 242, 0.25)",
    "rgb(25 29 39)",
  );
  const [
    allResponses,
    setAllResponses,
  ] = React.useState<AllDocs<Answer> | null>();
  const [user, setUser] = React.useState("");
  const [loading, setLoading] = React.useState<boolean>(true);

  const colorValue = useColorModeValue(color.light, color.dark);
  const userLink = `https://druz.xyz/${user}`;
  const { hasCopied, onCopy } = useClipboard(userLink);

  const handleCopy = () => {
    onCopy();
    addToast("Link copied to clipboard!", { appearance: "success" });
  };

  const getResponses = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/v1/auth/user?alongwith=answers&page=${page}`,
      );
      const { data } = res;
      setAllResponses(data?.data?.user?.answers);
      setUser(data?.data?.user?.name);
    } catch (err) {
      // catch error
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getResponses(1);
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
                All Responses
              </Heading>
            </Stack>
          </Box>
        </Container>
      </Box>
      <Box
        mt={
          !loading && allResponses && allResponses?.docs?.length <= 0
            ? 0
            : "-5px"
        }
        pt={
          !loading && allResponses && allResponses?.docs?.length <= 0
            ? 0
            : { base: 6, md: 8 }
        }
      >
        <Container>
          {loading ? (
            <Text textAlign="center" mb={4}>
              <Skeleton as="span" isLoaded={!loading}>
                Showing 1 - 10 of 50 responses
              </Skeleton>
            </Text>
          ) : !loading &&
            allResponses &&
            allResponses?.docs?.length <= 0 ? null : allResponses?.page &&
            allResponses?.limit &&
            allResponses?.totalDocs ? (
            <Text
              fontWeight="bold"
              textAlign="center"
              mb={4}
              color={colorMode == "dark" ? "inherit" : "brand.grey"}
            >
              Showing {(allResponses?.page - 1) * allResponses?.limit + 1} -{" "}
              {allResponses?.docs?.length === allResponses.limit
                ? allResponses?.page * allResponses?.limit
                : allResponses?.docs?.length +
                  (allResponses?.totalPages - 1) * allResponses?.limit}{" "}
              of {allResponses?.totalDocs} responses
            </Text>
          ) : null}

          {loading
            ? new Array(5)
                .fill("_")
                .map((_, idx) => (
                  <SingleResponse
                    responseId={idx.toString()}
                    loading={loading}
                    key={idx}
                  />
                ))
            : allResponses?.docs?.map((response) => (
                <SingleResponse
                  name={response.name}
                  answers={response.answers}
                  read={response.read}
                  responseId={response._id}
                  key={response._id}
                  loading={loading}
                  date={response.date}
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
              display={allResponses?.hasPrevPage ? "block" : "none"}
              mt={["2rem", "2.5rem"]}
              margin="0"
              leftIcon={<ArrowLeftIcon />}
              onClick={() => {
                typeof window !== "undefined" && window.scrollTo(0, 0);

                allResponses?.prevPage && getResponses(allResponses.prevPage);
              }}
            >
              Newer
            </Button>

            <Button
              small
              _focus={{ outline: 0 }}
              display={allResponses?.hasNextPage ? "block" : "none"}
              mt={["2rem", "2.5rem"]}
              margin="0"
              rightIcon={<ArrowRightIcon />}
              onClick={() => {
                typeof window !== "undefined" && window.scrollTo(0, 0);
                allResponses?.nextPage && getResponses(allResponses.nextPage);
              }}
            >
              Older
            </Button>
          </Flex>
          <Box>
            {!loading && allResponses && allResponses?.docs?.length <= 0 && (
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
                  You&apos;ve not had any response to your questions yet. Share
                  your profile link with your friends and have them take on your
                  challenge{" "}
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
                    defaultValue={`https://druz.xyz/${user}/questions`}
                  />
                  <InputRightElement height="100%" width="5.5rem">
                    <ChakraButton
                      colorScheme="brand.primaryButton"
                      backgroundColor="brand.primary"
                      height="2.2rem"
                      fontWeight="normal"
                      fontSize="sm"
                      color="brand.white"
                      onClick={() => {
                        handleCopy();
                      }}
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

export default Responses;

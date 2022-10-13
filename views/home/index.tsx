import * as React from "react";
import {
  Box,
  Text,
  Stack,
  HStack,
  Heading,
  InputGroup,
  InputRightElement,
  Button as ChakraButton,
  Skeleton,
  useColorMode,
  useColorModeValue,
  useClipboard,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import Link from "next/link";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { useToasts } from "react-toast-notifications";
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { ImTwitter } from "react-icons/im";
import PageTransition from "components/pageTransition";
import Container from "components/container";
import { ResponseIcon } from "utils/customIcons";
import CustomInput from "components/customInput";
import { color } from "utils/colorValues";
import axios from "utils/axios";
import capitalizeString from "utils/capitalizeString";
import { User } from "types/mainTypes";
import Badge from "components/Badge";

const Home: React.FC = () => {
  const { addToast } = useToasts();
  const { colorMode } = useColorMode();
  const colorValue = useColorModeValue(color.light, color.dark);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [user, setUser] = React.useState<User | null>(null);
  const userLink = `https://druz.xyz/${user?.name}`;
  const { hasCopied, onCopy } = useClipboard(userLink);

  const handleCopy = () => {
    onCopy();
    addToast("Link copied to clipboard!", { appearance: "success" });
  };

  React.useEffect(() => {
    const getDashboard = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/v1/profile/dashboard");
        const { data } = res;
        setUser(data?.data?.user);
      } catch (err) {
        // error boundary or something
      } finally {
        setLoading(false);
      }
    };

    getDashboard();
  }, []);

  return (
    <PageTransition>
      <Container>
        <Box mt={[0, 4, 20]}>
          <Stack
            align="center"
            justify="space-between"
            direction={{ base: "column", md: "row" }}
          >
            <Box mb={{ base: 10, md: 0 }} flexBasis="40%">
              <Skeleton isLoaded={!loading}>
                <Heading mb={4} size="lg" as="h1">
                  Welcome back {user && capitalizeString(user?.name)}
                </Heading>
                <Text mb={{ base: 6, md: 8 }}>
                  Share your Druz link with friends and have them take on your
                  challenge{" "}
                  <span role="img" aria-labelledby="hand emoji">
                    👇
                  </span>
                </Text>
                <InputGroup mb={{ base: 6, md: 8 }}>
                  <CustomInput
                    color={colorValue}
                    isReadOnly
                    defaultValue={`https://druz.xyz/${user?.name}`}
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
                {/* <Text
                  textAlign={{ base: "center", md: "left" }}
                  mb={2}
                  fontWeight={500}
                  fontSize="lg"
                >
                  Share on social media
                </Text> */}
                <HStack
                  align="center"
                  justify={{ base: "center", md: "flex-start" }}
                  spacing="1rem"
                >
                  <FacebookShareButton
                    url={userLink}
                    quote={
                      "Take this little challenge and let me know what you think about me \n\n"
                    }
                    hashtag="druz_app"
                  >
                    <FaFacebook
                      size="30px"
                      color="#3B5998"
                      style={{ cursor: "pointer" }}
                    />
                  </FacebookShareButton>

                  <WhatsappShareButton
                    url={userLink}
                    title={
                      "Take this little challenge and let me know what you think about me 🤗\n\n"
                    }
                  >
                    <IoLogoWhatsapp
                      size="30px"
                      color="#2cb742"
                      style={{ cursor: "pointer" }}
                    />
                  </WhatsappShareButton>

                  <TwitterShareButton
                    url={userLink}
                    title={
                      "Take this little challenge and let me know what you think about me 🤗\n\n"
                    }
                    via="druz_app"
                    hashtags={["druz_app"]}
                    related={["druz_app"]}
                  >
                    <ImTwitter
                      size="30px"
                      color="#00aced"
                      style={{ cursor: "pointer" }}
                    />
                  </TwitterShareButton>
                </HStack>
              </Skeleton>
            </Box>

            <Box width={["100%", "70%", "100%"]} flexBasis="50%">
              <Stack
                justify="space-between"
                align="center"
                direction={{ base: "column", md: "row" }}
              >
                <Box
                  border=" 1px solid rgba(0, 0, 0, 0.08)"
                  width="100%"
                  flexBasis="48%"
                  shadow={colorMode == "dark" ? "dark-lg" : "md"}
                  borderRadius="5px"
                  mb={{ base: 6, md: 0 }}
                  py={{ base: 4, md: 6 }}
                  px={10}
                >
                  <Skeleton mb={{ base: 8, md: 12 }} isLoaded={!loading}>
                    <HStack mb={{ base: 8, md: 12 }} justify="space-between">
                      <Box
                        position="relative"
                        _before={{
                          content: `'${
                            (user?.unreadMessages || 0) < 100
                              ? user?.unreadMessages
                              : "99+"
                          }'`,
                          position: "absolute",
                          padding:
                            (user?.unreadMessages || 0) > 99
                              ? "1px 4px"
                              : "1px 7px",
                          top: "-8px",
                          left: "-8px",
                          fontSize: "12px",
                          color: "#fff",
                          backgroundColor: "#3B9795",
                          display:
                            (user?.unreadMessages || 0) >= 1
                              ? "inherit"
                              : "none",
                          borderRadius: "50%",
                        }}
                      >
                        <EmailIcon w="1.7rem" h="1.7rem" color="#A0AEC0" />
                      </Box>

                      <Text fontSize="2xl" fontWeight="bold">
                        {user?.messages}
                      </Text>
                    </HStack>
                  </Skeleton>
                  <Skeleton mb={4} isLoaded={!loading}>
                    <HStack mb={4}>
                      <Text
                        fontSize="lg"
                        color={
                          colorMode == "dark" ? "inherit" : "brand.greyText"
                        }
                        fontWeight={500}
                        mr={-1}
                      >
                        Messages
                      </Text>
                      <Badge text="New!" />
                    </HStack>
                  </Skeleton>

                  <Skeleton isLoaded={!loading}>
                    <HStack justify="flex-end">
                      <Text
                        _hover={{ textDecoration: "underline" }}
                        fontWeight={500}
                        color="brand.primary"
                      >
                        <Link href="/messages">
                          <a>View all</a>
                        </Link>
                      </Text>
                    </HStack>
                  </Skeleton>
                </Box>

                <Box
                  border=" 1px solid rgba(0, 0, 0, 0.08)"
                  width="100%"
                  flexBasis="48%"
                  shadow={colorMode == "dark" ? "dark-lg" : "md"}
                  borderRadius="5px"
                  mb={{ base: 6, md: 0 }}
                  py={{ base: 4, md: 6 }}
                  px={10}
                >
                  <Skeleton mb={{ base: 8, md: 12 }} isLoaded={!loading}>
                    <HStack mb={{ base: 8, md: 12 }} justify="space-between">
                      <Box
                        position="relative"
                        _before={{
                          content: `'${
                            (user?.unread || 0) < 100 ? user?.unread : "99+"
                          }'`,
                          position: "absolute",
                          padding:
                            (user?.unread || 0) > 99 ? "1px 4px" : "1px 7px",
                          top: "-8px",
                          left: "-8px",
                          fontSize: "12px",
                          color: "#fff",
                          backgroundColor: "#3B9795",
                          display:
                            (user?.unread || 0) >= 1 ? "inherit" : "none",
                          borderRadius: "50%",
                        }}
                      >
                        <ResponseIcon w="1.7rem" h="1.7rem" />
                      </Box>

                      <Text fontSize="2xl" fontWeight="bold">
                        {user?.answers}
                      </Text>
                    </HStack>
                  </Skeleton>
                  <Skeleton mb={4} isLoaded={!loading}>
                    <Text
                      mb={4}
                      fontSize="lg"
                      color={colorMode == "dark" ? "inherit" : "brand.greyText"}
                      fontWeight={500}
                    >
                      Responses
                    </Text>
                  </Skeleton>

                  <Skeleton isLoaded={!loading}>
                    <HStack justify="flex-end">
                      <Text
                        _hover={{ textDecoration: "underline" }}
                        fontWeight={500}
                        color="brand.primary"
                      >
                        <Link href="/responses">
                          <a>View all</a>
                        </Link>
                      </Text>
                    </HStack>
                  </Skeleton>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Container>
    </PageTransition>
  );
};

export default Home;

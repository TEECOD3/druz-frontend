import * as React from "react";
import axios from "utils/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  useColorMode,
  useColorModeValue,
  Heading,
  chakra,
  Text,
  useDisclosure,
  SlideFade,
  HStack,
} from "@chakra-ui/react";
import { useViewportScroll } from "framer-motion";
import {
  HamburgerIcon,
  SettingsIcon,
  ChevronDownIcon,
  EmailIcon,
} from "@chakra-ui/icons";
import { FaSun } from "react-icons/fa";
import { AiOutlineHome, AiOutlineQuestionCircle } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import Container from "./container";
import MobileNav from "./mobileNav";
import { OutlinedButton } from "./buttons";
import { MoonIcon, ResponseIcon } from "utils/customIcons";
import { backgroundColor, color } from "utils/colorValues";
import UserService from "utils/UserService";
import Badge from "components/Badge";

const pathsToRemoveShadow = ["/", "/login", "/register"];
const pathsToRemoveLastNavItem = ["/register", "/login"];

const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const backgroundColorValue = useColorModeValue(
    backgroundColor.light,
    backgroundColor.dark,
  );
  const colorValue = useColorModeValue(color.light, color.dark);
  const router = useRouter();
  const { isOpen: isMenuOpen, onToggle: onMenuToggle } = useDisclosure();

  const [showMobileNav, setShowMobileNav] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);

  const ref = React.useRef<HTMLHeadingElement>();
  const [y, setY] = React.useState(0);
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {};
  const { scrollY } = useViewportScroll();

  const handleRemoveMobileNav = () => {
    setShowMobileNav(false);
  };
  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/auth/logout");
      router.replace("/login");
    } catch (err) {
      // catch error
    } finally {
      UserService.clearCredentials();
    }
  };

  const navLinkTextColor = (path: string): string => {
    return router.pathname == path ? "inherit" : "brand.grey";
  };
  const navLinkIconColor = (path: string): string => {
    return router.pathname == path ? "#3B9795" : "#A0AEC0";
  };
  const borderColor = (path: string): string => {
    return router.pathname == path ? "#3B9795" : "transparent";
  };

  React.useEffect(() => {
    const getToken = localStorage.getItem("druz_token");
    setLoggedIn(!!getToken);
  }, []);

  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);
  return (
    <>
      <chakra.header
        shadow={
          !pathsToRemoveShadow.includes(router.pathname)
            ? colorMode == "dark"
              ? "xl"
              : "base"
            : y > height
            ? colorMode == "dark"
              ? "xl"
              : "base"
            : undefined
        }
        transition="box-shadow 0.2s"
        w="100%"
        backgroundColor={
          colorMode == "dark" && y > height
            ? "rgb(25 29 39)"
            : backgroundColorValue
        }
        mb={router.pathname == "/questions" ? 0 : "1rem"}
        position="fixed"
        top="0"
        zIndex="400"
      >
        <Container>
          <Flex
            position="relative"
            justify="space-between"
            align="center"
            m="0 auto"
          >
            <Heading
              fontWeight={900}
              py={[2, 4]}
              color="brand.primary"
              as="h1"
              size="lg"
            >
              <Link href={loggedIn ? "/home" : "/"}>
                <a>
                  Druz
                  <span aria-labelledby="eyes emoji" role="img">
                    👀
                  </span>
                </a>
              </Link>
            </Heading>

            {loggedIn && (
              <HStack
                d={{ base: "none", md: "flex" }}
                spacing={{ md: "1.5rem", lg: "2rem" }}
              >
                <Link href="/home" passHref>
                  <HStack
                    as="a"
                    _after={{
                      content: '""',
                      background: borderColor("/home"),
                      height: "3px",
                      position: "absolute",
                      bottom: 0,
                      width: "5.5rem",
                      borderRadius: "40px 40px 0 0",
                    }}
                    py=".5rem"
                  >
                    <AiOutlineHome
                      size="1.4rem"
                      color={navLinkIconColor("/home")}
                    />
                    <Text
                      color={navLinkTextColor("/home")}
                      fontSize="md"
                      fontWeight={500}
                    >
                      Home
                    </Text>
                  </HStack>
                </Link>
                <Link href="/messages" passHref>
                  <HStack
                    as="a"
                    _after={{
                      content: '""',
                      background: borderColor("/messages"),
                      height: "3px",
                      position: "absolute",
                      bottom: 0,
                      width: "9rem",
                      borderRadius: "40px 40px 0 0",
                    }}
                    py=".5rem"
                  >
                    <EmailIcon
                      h="1.4rem"
                      w="1.4rem"
                      color={navLinkIconColor("/messages")}
                    />
                    <Text
                      color={navLinkTextColor("/messages")}
                      fontSize="md"
                      fontWeight={500}
                      mr={{ sm: 0, md: 0, lg: "-5px" }}
                    >
                      Messages
                    </Text>
                    <Box display={{ sm: "none", lg: "block" }}>
                      <Badge text="New!" />
                    </Box>
                  </HStack>
                </Link>
                <Link href="/responses" passHref>
                  <HStack
                    as="a"
                    _after={{
                      content: '""',
                      background: borderColor("/responses"),
                      height: "3px",

                      position: "absolute",
                      bottom: 0,
                      width: "8rem",
                      borderRadius: "40px 40px 0 0",
                    }}
                    py=".5rem"
                  >
                    <ResponseIcon
                      w="1.4rem"
                      h="1.4rem"
                      color={navLinkIconColor("/responses")}
                    />
                    <Text
                      color={navLinkTextColor("/responses")}
                      fontSize="md"
                      fontWeight={500}
                    >
                      Responses
                    </Text>
                  </HStack>
                </Link>
                <Link href="/questions" passHref>
                  <HStack
                    as="a"
                    _after={{
                      content: '""',
                      background: borderColor("/questions"),
                      height: "3px",

                      position: "absolute",
                      bottom: 0,
                      width: "8rem",
                      borderRadius: "40px 40px 0 0",
                    }}
                    py=".5rem"
                  >
                    <AiOutlineQuestionCircle
                      size="1.4rem"
                      color={navLinkIconColor("/questions")}
                    />
                    <Text
                      color={navLinkTextColor("/questions")}
                      fontSize="md"
                      fontWeight={500}
                    >
                      Questions
                    </Text>
                  </HStack>
                </Link>
              </HStack>
            )}
            <Flex
              py={[2, 4]}
              d={{ base: "none", md: "flex" }}
              justify="space-between"
              align="center"
            >
              <Box
                onClick={toggleColorMode}
                as="button"
                mr={!pathsToRemoveLastNavItem.includes(router.pathname) ? 4 : 0}
                padding="5px"
              >
                <MoonIcon
                  d={colorMode === "light" ? "flex" : "none"}
                  w="22px"
                  h="22px"
                  color="transparent"
                />
                <FaSun
                  style={{
                    display: colorMode === "dark" ? "flex" : "none",
                    color: "#718096",
                    width: "22px",
                    height: "22px",
                  }}
                />
              </Box>
              {!pathsToRemoveLastNavItem.includes(router.pathname) && (
                <Box>
                  {!loggedIn ? (
                    <Link href="/login" passHref>
                      <OutlinedButton
                        toAnimate={true}
                        as="a"
                        d="flex"
                        w="fit-content"
                        height="2.5rem"
                      >
                        Login
                      </OutlinedButton>
                    </Link>
                  ) : (
                    <>
                      <Box onClick={onMenuToggle} cursor="pointer">
                        {/* <Image
                          borderRadius="50%"
                          w="2rem"
                          src={"/images/default_avatar.svg"}
                          alt=""
                        /> */}
                        <ChevronDownIcon h="2rem" w="2rem" />
                      </Box>
                      <Box
                        d={isMenuOpen ? "block" : "none"}
                        position="absolute"
                        top="3.5rem"
                        right={0}
                        p={4}
                        borderRadius="5px"
                        shadow={colorMode == "dark" ? "dark-lg" : "base"}
                        background={backgroundColorValue}
                      >
                        <SlideFade offsetX={0} offsetY={30} in={isMenuOpen}>
                          <Link href="/settings" passHref>
                            <Text
                              mb={6}
                              fontWeight={500}
                              pr={16}
                              as="a"
                              d="flex"
                              alignItems="center"
                              color="brand.primary"
                              fontSize="md"
                            >
                              <SettingsIcon color="brand.primary" mr={2} />
                              Settings
                            </Text>
                          </Link>

                          <Text
                            cursor="pointer"
                            pr={16}
                            onClick={handleLogout}
                            fontWeight={500}
                            d="flex"
                            alignItems="center"
                            color="#C53030"
                            fontSize="md"
                          >
                            <FiLogOut
                              style={{
                                marginRight: ".5rem",
                                display: "inline-block",
                                color: "#C53030",
                              }}
                            />
                            Logout
                          </Text>
                        </SlideFade>
                      </Box>
                    </>
                  )}
                </Box>
              )}
            </Flex>
            <Flex
              justify="flex-end"
              align="center"
              d={{ base: "flex", md: "none" }}
            >
              <Box
                mr=".8rem"
                onClick={toggleColorMode}
                as="button"
                padding="5px"
              >
                <MoonIcon
                  d={colorMode === "light" ? "flex" : "none"}
                  w="20px"
                  h="20px"
                  color="transparent"
                />
                <FaSun
                  style={{
                    display: colorMode === "dark" ? "flex" : "none",
                    color: "#718096",
                    width: "20px",
                    height: "20px",
                  }}
                />
              </Box>
              <HamburgerIcon
                onClick={() => setShowMobileNav(true)}
                w="20px"
                h="20px"
                color={colorValue}
              />
            </Flex>
          </Flex>
        </Container>
      </chakra.header>
      {showMobileNav && (
        <MobileNav
          handleRemoveMobileNav={handleRemoveMobileNav}
          handleLogout={handleLogout}
          loggedIn={loggedIn}
        />
      )}
    </>
  );
};

export default Header;

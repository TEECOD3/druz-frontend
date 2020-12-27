import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Box,
  Flex,
  List,
  ListItem,
  useColorMode,
  Link as ChakraLink,
  HStack,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { CloseIcon, SettingsIcon } from "@chakra-ui/icons";
import { AiOutlineHome, AiOutlineQuestionCircle } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { FaSun } from "react-icons/fa";
import { MoonIcon, ResponseIcon } from "utils/customIcons";
import { color, backgroundColor } from "utils/colorValues";

interface MobileNavProps {
  handleRemoveMobileNav: () => unknown;
  loggedIn: boolean;
}

const MobileNav: React.FC<MobileNavProps> = ({
  handleRemoveMobileNav,
  loggedIn,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  const navLinkTextColor = (path: string): string => {
    return router.pathname == path ? "inherit" : "brand.grey";
  };
  const navLinkIconColor = (path: string): string => {
    return router.pathname == path ? "#3B9795" : "#A0AEC0";
  };
  const borderBottom = (path: string): string => {
    return router.pathname == path ? "3px solid #3B9795" : "1px solid #bdbdbd";
  };

  const handleLogout = () => {
    typeof window != "undefined" && localStorage.clear();
    router.replace("/login");
  };

  return (
    <Box
      maxWidth="800px"
      px="1.2rem"
      pt="2rem"
      position="fixed"
      height="100vh"
      zIndex="9999"
      top="0"
      width="100%"
      backgroundColor={backgroundColor[colorMode]}
      color={color[colorMode]}
    >
      <motion.div
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Flex justify="space-between" align="center">
          <CloseIcon
            onClick={handleRemoveMobileNav}
            w="20px"
            h="20px"
            color={color[colorMode]}
          />
          <Box onClick={toggleColorMode} as="button" padding="5px">
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
        </Flex>

        <Box mt="1rem">
          <List
            mt="2rem"
            height="100%"
            display="flex"
            justifyContent="space-around"
            flexDir="column"
          >
            {loggedIn ? (
              <>
                {" "}
                <ListItem
                  py="1rem"
                  fontWeight="500"
                  borderTop="1px solid #bdbdbd"
                  borderBottom={borderBottom("/home")}
                >
                  <Link href="/home">
                    <HStack
                      pb={router.pathname == "/home" ? ".5rem" : ".8rem"}
                      spacing={4}
                    >
                      <AiOutlineHome
                        size="1.5rem"
                        color={navLinkIconColor("/home")}
                      />
                      <ChakraLink
                        color={navLinkTextColor("/home")}
                        display="flex"
                        _hover={{ textDecoration: "none" }}
                        onClick={handleRemoveMobileNav}
                      >
                        Home
                      </ChakraLink>
                    </HStack>
                  </Link>
                </ListItem>
                <ListItem
                  py="1rem"
                  fontWeight="500"
                  borderBottom={borderBottom("/responses")}
                >
                  <Link href="/responses">
                    <HStack
                      pb={router.pathname == "/responses" ? ".5rem" : ".8rem"}
                      spacing={4}
                    >
                      <ResponseIcon
                        w="1.5rem"
                        h="1.5rem"
                        color={navLinkIconColor("/responses")}
                      />
                      <ChakraLink
                        color={navLinkTextColor("/responses")}
                        display="flex"
                        _hover={{ textDecoration: "none" }}
                        onClick={handleRemoveMobileNav}
                      >
                        Responses
                      </ChakraLink>
                    </HStack>
                  </Link>
                </ListItem>
                <ListItem
                  py="1rem"
                  fontWeight="500"
                  borderBottom={borderBottom("/questions")}
                >
                  <Link href="/questions">
                    <HStack
                      pb={router.pathname == "/questions" ? ".5rem" : ".8rem"}
                      spacing={4}
                    >
                      <AiOutlineQuestionCircle
                        size="1.5rem"
                        color={navLinkIconColor("/questions")}
                      />
                      <ChakraLink
                        color={navLinkTextColor("/questions")}
                        display="flex"
                        _hover={{ textDecoration: "none" }}
                        onClick={handleRemoveMobileNav}
                      >
                        Questions
                      </ChakraLink>
                    </HStack>
                  </Link>
                </ListItem>
                <ListItem
                  py="1rem"
                  fontWeight="500"
                  borderBottom={borderBottom("/settings")}
                >
                  <Link href="/settings">
                    <HStack
                      pb={router.pathname == "/settings" ? ".5rem" : ".8rem"}
                      spacing={4}
                    >
                      <SettingsIcon
                        h="1.5rem"
                        w="1.5rem"
                        color={navLinkIconColor("/settings")}
                      />
                      <ChakraLink
                        color={navLinkTextColor("/settings")}
                        display="flex"
                        _hover={{ textDecoration: "none" }}
                        onClick={handleRemoveMobileNav}
                      >
                        Settings
                      </ChakraLink>
                    </HStack>
                  </Link>
                </ListItem>
                <ListItem
                  py="1rem"
                  fontWeight="500"
                  borderBottom="1px solid #bdbdbd"
                  onClick={() => {
                    handleLogout();
                    handleRemoveMobileNav();
                  }}
                >
                  <HStack pb=".8rem" spacing={4}>
                    <FiLogOut size="1.5rem" color="#C53030" />
                    <Text color="#C53030">Logout</Text>
                  </HStack>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem
                  py="1rem"
                  fontWeight="500"
                  borderTop="1px solid #bdbdbd"
                  borderBottom="1px solid #bdbdbd"
                >
                  <Link href="/register">
                    <ChakraLink
                      pb=".8rem"
                      display="block"
                      _hover={{ textDecoration: "none" }}
                      onClick={handleRemoveMobileNav}
                    >
                      Get Started
                    </ChakraLink>
                  </Link>
                </ListItem>
                <ListItem
                  py="1rem"
                  fontWeight="500"
                  borderBottom="1px solid #bdbdbd"
                >
                  <Link href="/login">
                    <ChakraLink
                      pb=".8rem"
                      display="block"
                      _hover={{ textDecoration: "none" }}
                      onClick={handleRemoveMobileNav}
                    >
                      Login
                    </ChakraLink>
                  </Link>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </motion.div>
    </Box>
  );
};

export default MobileNav;

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
import { CloseIcon, SettingsIcon, EmailIcon } from "@chakra-ui/icons";
import { AiOutlineHome, AiOutlineQuestionCircle } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { ResponseIcon } from "utils/customIcons";
import { color, backgroundColor } from "utils/colorValues";
import Badge from "components/Badge";

interface MobileNavProps {
  handleRemoveMobileNav: () => unknown;
  handleLogout: () => void;
  loggedIn: boolean;
}

const MobileNav: React.FC<MobileNavProps> = ({
  handleRemoveMobileNav,
  loggedIn,
  handleLogout,
}) => {
  const { colorMode } = useColorMode();
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
                  py=".6rem"
                  fontWeight="500"
                  borderTop="1px solid #bdbdbd"
                  borderBottom={borderBottom("/home")}
                >
                  <Link href="/home" passHref>
                    <HStack
                      as="a"
                      py={router.pathname == "/home" ? ".5rem" : ".8rem"}
                      spacing={4}
                    >
                      <AiOutlineHome
                        size="1.4rem"
                        color={navLinkIconColor("/home")}
                      />
                      <Text
                        color={navLinkTextColor("/home")}
                        display="flex"
                        fontSize="xl"
                        onClick={handleRemoveMobileNav}
                      >
                        Home
                      </Text>
                    </HStack>
                  </Link>
                </ListItem>
                <ListItem
                  py=".6rem"
                  fontWeight="500"
                  borderBottom={borderBottom("/messages")}
                >
                  <Link href="/messages" passHref>
                    <HStack
                      as="a"
                      py={router.pathname == "/messages" ? ".5rem" : ".8rem"}
                      spacing={4}
                    >
                      <EmailIcon
                        h="1.4rem"
                        w="1.4rem"
                        color={navLinkIconColor("/messages")}
                      />
                      <Text
                        color={navLinkTextColor("/messages")}
                        display="flex"
                        fontSize="xl"
                        onClick={handleRemoveMobileNav}
                        mr="-10px"
                      >
                        Messages
                      </Text>
                      <Badge text="New!" />
                    </HStack>
                  </Link>
                </ListItem>
                <ListItem
                  py=".6rem"
                  fontWeight="500"
                  borderBottom={borderBottom("/responses")}
                >
                  <Link href="/responses" passHref>
                    <HStack
                      as="a"
                      py={router.pathname == "/responses" ? ".5rem" : ".8rem"}
                      spacing={4}
                    >
                      <ResponseIcon
                        w="1.4rem"
                        h="1.4rem"
                        color={navLinkIconColor("/responses")}
                      />
                      <Text
                        color={navLinkTextColor("/responses")}
                        display="flex"
                        fontSize="xl"
                        onClick={handleRemoveMobileNav}
                      >
                        Responses
                      </Text>
                    </HStack>
                  </Link>
                </ListItem>
                <ListItem
                  py=".6rem"
                  fontWeight="500"
                  borderBottom={borderBottom("/questions")}
                >
                  <Link href="/questions" passHref>
                    <HStack
                      as="a"
                      py={router.pathname == "/questions" ? ".5rem" : ".8rem"}
                      spacing={4}
                    >
                      <AiOutlineQuestionCircle
                        size="1.4rem"
                        color={navLinkIconColor("/questions")}
                      />
                      <Text
                        color={navLinkTextColor("/questions")}
                        display="flex"
                        fontSize="xl"
                        onClick={handleRemoveMobileNav}
                      >
                        Questions
                      </Text>
                    </HStack>
                  </Link>
                </ListItem>
                <ListItem
                  py=".6rem"
                  fontWeight="500"
                  borderBottom={borderBottom("/settings")}
                >
                  <Link href="/settings" passHref>
                    <HStack
                      as="a"
                      py={router.pathname == "/settings" ? ".5rem" : ".8rem"}
                      spacing={4}
                    >
                      <SettingsIcon
                        h="1.4rem"
                        w="1.4rem"
                        color={navLinkIconColor("/settings")}
                      />
                      <Text
                        color={navLinkTextColor("/settings")}
                        display="flex"
                        fontSize="xl"
                        onClick={handleRemoveMobileNav}
                      >
                        Settings
                      </Text>
                    </HStack>
                  </Link>
                </ListItem>
                <ListItem
                  py=".6rem"
                  fontWeight="500"
                  borderBottom="1px solid #bdbdbd"
                  onClick={() => {
                    handleLogout();
                    handleRemoveMobileNav();
                  }}
                >
                  <HStack py=".8rem" spacing={4}>
                    <FiLogOut size="1.4rem" color="#C53030" />
                    <Text fontSize="xl" color="#C53030">
                      Logout
                    </Text>
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
                      py=".8rem"
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
                      py=".8rem"
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

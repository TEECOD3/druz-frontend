import React from "react";
import Link from "next/link";
import {
  Box,
  Flex,
  List,
  ListItem,
  useColorMode,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { OutlinedButton } from "./buttons";
import { color, backgroundColor, borderColor } from "utils/colorValues";

interface MobileNavProps {
  showMobileNav: boolean;
  handleRemoveMobileNav: () => unknown;
  loggedIn: boolean;
}

const MobileNav: React.FC<MobileNavProps> = ({
  showMobileNav,
  handleRemoveMobileNav,
  loggedIn,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
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
      display={showMobileNav ? "block" : "none"}
    >
      <Flex justify="space-between" align="center">
        <CloseIcon
          onClick={handleRemoveMobileNav}
          w="20px"
          h="20px"
          color={color[colorMode]}
        />
        <Box onClick={toggleColorMode} as="button" mr={4} padding="5px">
          <MoonIcon
            d={colorMode === "light" ? "flex" : "none"}
            w="20px"
            h="20px"
            color="#718096"
          />
          <SunIcon
            d={colorMode === "dark" ? "flex" : "none"}
            w="20px"
            h="20px"
            color="#718096"
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
                borderBottom="1px solid #bdbdbd"
              >
                <Link href="/home">
                  <ChakraLink
                    pb=".8rem"
                    display="block"
                    _hover={{ textDecoration: "none" }}
                    onClick={handleRemoveMobileNav}
                  >
                    Home
                  </ChakraLink>
                </Link>
              </ListItem>
              <ListItem
                py="1rem"
                fontWeight="500"
                borderBottom="1px solid #bdbdbd"
              >
                <Link href="/responses">
                  <ChakraLink
                    pb=".8rem"
                    display="block"
                    _hover={{ textDecoration: "none" }}
                    onClick={handleRemoveMobileNav}
                  >
                    Responses
                  </ChakraLink>
                </Link>
              </ListItem>
              <ListItem
                py="1rem"
                fontWeight="500"
                borderBottom="1px solid #bdbdbd"
              >
                <Link href="/questions">
                  <ChakraLink
                    pb=".8rem"
                    display="block"
                    _hover={{ textDecoration: "none" }}
                    onClick={handleRemoveMobileNav}
                  >
                    Questions
                  </ChakraLink>
                </Link>
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
    </Box>
  );
};

export default MobileNav;

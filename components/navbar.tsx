import * as React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Box, Flex, useColorMode, Heading } from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import Container from "./container";
import MobileNav from "./mobileNav";
import { OutlinedButton } from "./buttons";
import { backgroundColor, color } from "utils/colorValues";

const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  const [showMobileNav, setShowMobileNav] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const handleRemoveMobileNav = () => {
    setShowMobileNav(false);
  };
  const handleLogout = () => {
    localStorage.clear();
    router.replace("/login");
  };

  return (
    <>
      <Box
        w="100%"
        backgroundColor={backgroundColor[colorMode]}
        mb="1rem"
        py={[".5rem"]}
        position="fixed"
        top="0"
        zIndex="400"
      >
        <Container>
          <Flex
            px={["1rem", "1.5rem", "2rem"]}
            justify="space-between"
            align="center"
            m="0 auto"
          >
            <Heading as="h1" size="xl">
              <Link href="/">
                <a>
                  Druz
                  <span aria-labelledby="eyes emoji" role="img">
                    👀
                  </span>
                </a>
              </Link>
            </Heading>
            {/* the second flex items */}
            <Flex
              d={["none", "none", "flex"]}
              justify="space-between"
              align="center"
            >
              <Box onClick={toggleColorMode} as="button" mr={4} padding="5px">
                <MoonIcon
                  d={colorMode === "light" ? "flex" : "none"}
                  w={["18px", "25px"]}
                  h={["18px", "25px"]}
                  color="#718096"
                />
                <SunIcon
                  d={colorMode === "dark" ? "flex" : "none"}
                  w={["18px", "25px"]}
                  h={["18px", "25px"]}
                  color="#718096"
                />
              </Box>
              <OutlinedButton>Login</OutlinedButton>
            </Flex>
            <Box d={["block", "block", "none"]}>
              <HamburgerIcon
                onClick={() => setShowMobileNav(true)}
                w="20px"
                h="20px"
                color={color[colorMode]}
              />
            </Box>
          </Flex>
        </Container>
      </Box>
      <MobileNav
        showMobileNav={showMobileNav}
        handleRemoveMobileNav={handleRemoveMobileNav}
        loggedIn={loggedIn}
      />
    </>
  );
};

export default Header;

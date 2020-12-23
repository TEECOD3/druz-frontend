import * as React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Box, Flex, useColorMode, Heading } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FaSun } from "react-icons/fa";
import Container from "./container";
import MobileNav from "./mobileNav";
import { OutlinedButton } from "./buttons";
import { MoonIcon } from "utils/customIcons";
import { backgroundColor, color, borderColor } from "utils/colorValues";

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
        py={[2, 4]}
        position="fixed"
        top="0"
        zIndex="400"
        borderBottom={`1px solid ${borderColor[colorMode]}`}
      >
        <Container>
          <Flex
            px={["1rem", "1.5rem", "2rem"]}
            justify="space-between"
            align="center"
            m="0 auto"
          >
            <Heading color="brand.primary" as="h1" size="lg">
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
              <Link href="/login" passHref>
                <OutlinedButton d="flex" w="fit-content" as="a" height="2.5rem">
                  Login
                </OutlinedButton>
              </Link>
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

import * as React from "react";
import { Box, Heading } from "@chakra-ui/react";
import Link from "next/link";
import PageTransition from "components/pageTransition";
import Container from "components/container";
import { Button } from "components/buttons";

const NotFound: React.FC = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const getToken = localStorage.getItem("druz_token");
    setLoggedIn(!!getToken);
  }, []);
  return (
    <PageTransition>
      <Container>
        <Box mt={[10, 12, 20]}>
          <Box>
            <Heading
              as="h1"
              size="lg"
              textAlign="center"
              mb="2rem"
              width={["100%", "70%"]}
              mx={["auto", "auto"]}
            >
              Oh sh*t, The user profile or page you requested may have been
              deleted or never existed{" "}
              <span aria-labelledby="sobbing face emoji" role="img">
                😪
              </span>
            </Heading>
            <Link href={loggedIn ? "/home" : "/"} passHref>
              <Button
                toAnimate={true}
                d="flex"
                w="fit-content"
                as="a"
                height="3.2rem"
                mx="auto"
              >
                Go Home
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </PageTransition>
  );
};

export default NotFound;

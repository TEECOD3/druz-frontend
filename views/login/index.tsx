import * as React from "react";
import Link from "next/link";
import {
  Box,
  Text,
  Stack,
  Image,
  Heading,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button as ChakraButton,
  useColorMode,
} from "@chakra-ui/react";
import Container from "components/container";
import { Button } from "components/buttons";
import CustomInput from "components/customInput";
import PageTransition from "components/pageTransition";

const Login: React.FC = () => {
  const { colorMode } = useColorMode();
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <PageTransition>
      <Container>
        <Box mb={{ base: 10, md: 16 }} mt={{ base: 2, md: 16 }}>
          <Stack
            align={{ base: "flex-start", md: "center" }}
            justify="space-between"
            direction={{ base: "column-reverse", md: "row" }}
          >
            <Box mt={{ base: "2rem", md: 0 }} flexBasis="40%">
              <Image
                d={colorMode == "dark" ? "none" : "block"}
                alt="A Lady multitasking"
                src="/images/login_signup.svg"
              />
              <Image
                d={colorMode == "dark" ? "block" : "none"}
                alt="A Lady multitasking"
                src="/images/login_singup_dark.svg"
              />
            </Box>
            <Box width={["100%", "70%", "auto"]} flexBasis="40%">
              <Box mb={{ base: 6, md: 8 }}>
                <Heading mb={2} as="h1" size="lg">
                  Login
                </Heading>
                <Text>Welcome back to Druz</Text>
              </Box>

              <Box>
                <form>
                  <FormControl mb={{ base: 4, md: 6 }} id="name">
                    <FormLabel
                      color={colorMode == "dark" ? "inherit" : "brand.greyText"}
                    >
                      Name
                    </FormLabel>
                    <CustomInput placeholder="Jabari" isRequired type="text" />
                  </FormControl>
                  <FormControl mb={{ base: 4, md: 6 }} id="password">
                    <FormLabel
                      color={colorMode == "dark" ? "inherit" : "brand.greyText"}
                    >
                      Password
                    </FormLabel>
                    <InputGroup>
                      <CustomInput
                        isRequired
                        type={showPassword ? "text" : "password"}
                      />
                      <InputRightElement height="100%" width="5.5rem">
                        <ChakraButton
                          colorScheme="brand.primaryButton"
                          backgroundColor="brand.primary"
                          height="2.2rem"
                          fontWeight="normal"
                          fontSize="sm"
                          color="brand.white"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </ChakraButton>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <Button
                    height="3.5rem"
                    fullWidth={true}
                    mt={{ base: 4, md: 6 }}
                  >
                    Login
                  </Button>
                  <Text
                    d="block"
                    mt={4}
                    color={colorMode == "dark" ? "inherit" : "brand.greyText"}
                    as="small"
                  >
                    Don&apos;t have an account?{" "}
                    <Text
                      _hover={{ textDecor: "underline" }}
                      fontWeight="bold"
                      as="span"
                    >
                      <Link href="/register">
                        <a>Create now</a>
                      </Link>
                    </Text>{" "}
                  </Text>
                </form>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Container>
    </PageTransition>
  );
};

export default Login;

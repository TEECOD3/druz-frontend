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

const Register: React.FC = () => {
  const { colorMode } = useColorMode();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  return (
    <PageTransition>
      <Container>
        <Box mb={{ base: 10, md: 16 }} mt={{ base: 2, md: 16 }}>
          <Stack
            align="flex-start"
            justify="space-between"
            direction={{ base: "column-reverse", md: "row" }}
          >
            <Box mt={{ base: "2rem", md: "3rem" }} flexBasis="40%">
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
                  Create your account
                </Heading>
                <Text>Start creating questions with Druz</Text>
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
                  <FormControl mb={{ base: 4, md: 6 }} id="email">
                    <FormLabel
                      color={colorMode == "dark" ? "inherit" : "brand.greyText"}
                    >
                      Email
                    </FormLabel>
                    <CustomInput
                      placeholder="jabari@yahoo.com"
                      isRequired
                      type="email"
                    />
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
                      <InputRightElement height="100%" width="4.5rem">
                        <ChakraButton
                          h="1.75rem"
                          size="sm"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </ChakraButton>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <FormControl mb={{ base: 4, md: 6 }} id="confirmPassword">
                    <FormLabel
                      color={colorMode == "dark" ? "inherit" : "brand.greyText"}
                    >
                      Confirm Password
                    </FormLabel>
                    <InputGroup>
                      <CustomInput
                        isRequired
                        type={showConfirmPassword ? "text" : "password"}
                      />
                      <InputRightElement height="100%" width="4.5rem">
                        <ChakraButton
                          h="1.75rem"
                          size="sm"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? "Hide" : "Show"}
                        </ChakraButton>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <Button
                    height="3.5rem"
                    fullWidth={true}
                    mt={{ base: 4, md: 6 }}
                  >
                    Create Account
                  </Button>
                  <Text
                    d="block"
                    mt={4}
                    color={colorMode == "dark" ? "inherit" : "brand.greyText"}
                    as="small"
                  >
                    Already have an account?{" "}
                    <Text
                      _hover={{ textDecor: "underline" }}
                      fontWeight="bold"
                      as="span"
                    >
                      <Link href="/login">
                        <a>Login here</a>
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

export default Register;

import * as React from "react";
import {
  Text,
  Box,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Button as ChakraButton,
  useColorMode,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import PageTransition from "components/pageTransition";
import Container from "components/container";
import CustomInput from "components/customInput";
import { Button } from "components/buttons";
import { PersonIcon, KeyIcon } from "utils/customIcons";

interface IViewStates {
  personal: "PERSONAL";
  security: "SECURITY";
}
const VIEW_STATES: IViewStates = {
  personal: "PERSONAL",
  security: "SECURITY",
};

const Settings: React.FC = () => {
  const { colorMode } = useColorMode();
  const [showOldPassword, setShowOldPassword] = React.useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = React.useState<boolean>(false);
  const [currentViewState, setCurrentViewState] = React.useState<
    "PERSONAL" | "SECURITY"
  >("PERSONAL");

  const changeToPersonal = () => {
    setCurrentViewState("PERSONAL");
  };
  const changeToSecurity = () => {
    setCurrentViewState(VIEW_STATES.security);
  };

  return (
    <PageTransition>
      <Container>
        <Box
          mb={{ base: 10, md: 16 }}
          mt={{ base: 0, md: 16 }}
          mx="auto"
          maxW="550px"
        >
          <VStack>
            <HStack
              spacing={{ base: "1rem", md: "2rem" }}
              justify="space-between"
              align="center"
              width="100%"
              mb={{ base: 12, md: 16 }}
            >
              <VStack
                onClick={changeToPersonal}
                cursor="pointer"
                align="center"
                width="100%"
                px={{ base: 4, md: 12 }}
                py={{ base: 6, md: 12 }}
                borderRadius="10px"
                boxShadow={
                  currentViewState == VIEW_STATES.personal &&
                  colorMode !== "dark"
                    ? "xs"
                    : colorMode == "dark"
                    ? "dark-lg"
                    : "base"
                }
                border={
                  currentViewState == VIEW_STATES.personal
                    ? `${colorMode == "dark" ? "3px" : "2px"} solid #3B9795`
                    : 0
                }
              >
                <PersonIcon
                  color={
                    currentViewState == VIEW_STATES.personal
                      ? "#3B9795"
                      : "#A0AEC0"
                  }
                  w={{ base: "2rem", md: "3rem" }}
                  h={{ base: "2rem", md: "3rem" }}
                />
                <Text
                  fontWeight={500}
                  textAlign="center"
                  fontSize="lg"
                  mt={[2, 4]}
                  color={
                    currentViewState == VIEW_STATES.personal
                      ? "#3B9795"
                      : "#A0AEC0"
                  }
                >
                  Personal
                </Text>
              </VStack>
              <VStack
                boxShadow={
                  currentViewState == VIEW_STATES.security &&
                  colorMode !== "dark"
                    ? "xs"
                    : colorMode == "dark"
                    ? "dark-lg"
                    : "base"
                }
                border={
                  currentViewState == VIEW_STATES.security
                    ? `${colorMode == "dark" ? "3px" : "2px"} solid #3B9795`
                    : 0
                }
                onClick={changeToSecurity}
                cursor="pointer"
                align="center"
                width="100%"
                px={{ base: 4, md: 12 }}
                py={{ base: 6, md: 12 }}
                borderRadius="10px"
              >
                <KeyIcon
                  color={
                    currentViewState == VIEW_STATES.security
                      ? "#3B9795"
                      : "#A0AEC0"
                  }
                  w={{ base: "2rem", md: "3rem" }}
                  h={{ base: "2rem", md: "3rem" }}
                />
                <Text
                  fontSize="lg"
                  fontWeight={500}
                  textAlign="center"
                  mt={[2, 4]}
                  color={
                    currentViewState == VIEW_STATES.security
                      ? "#3B9795"
                      : "#A0AEC0"
                  }
                >
                  Security
                </Text>
              </VStack>
            </HStack>

            <Box width="100%" maxW="500px">
              <Box mx="auto">
                {currentViewState == VIEW_STATES.personal ? (
                  <form>
                    <FormControl mb={{ base: 4, md: 6 }} id="name">
                      <FormLabel
                        color={
                          colorMode == "dark" ? "inherit" : "brand.greyText"
                        }
                      >
                        Name
                      </FormLabel>
                      <CustomInput
                        placeholder="Jabari"
                        isRequired
                        type="text"
                      />
                    </FormControl>
                    <FormControl mb={{ base: 4, md: 6 }} id="email">
                      <FormLabel
                        color={
                          colorMode == "dark" ? "inherit" : "brand.greyText"
                        }
                      >
                        Email
                      </FormLabel>
                      <CustomInput
                        placeholder="jabari@gmail.com"
                        isRequired
                        type="email"
                      />
                    </FormControl>
                    <Button
                      height="3.5rem"
                      fullWidth={true}
                      mt={{ base: 4, md: 6 }}
                    >
                      Update
                    </Button>
                  </form>
                ) : (
                  <form>
                    <FormControl mb={{ base: 4, md: 6 }} id="oldPassword">
                      <FormLabel
                        color={
                          colorMode == "dark" ? "inherit" : "brand.greyText"
                        }
                      >
                        Old Password
                      </FormLabel>
                      <InputGroup>
                        <CustomInput
                          isRequired
                          type={showOldPassword ? "text" : "password"}
                        />
                        <InputRightElement height="100%" width="5.5rem">
                          <ChakraButton
                            colorScheme="brand.primaryButton"
                            backgroundColor="brand.primary"
                            height="2.2rem"
                            fontWeight="normal"
                            fontSize="sm"
                            color="brand.white"
                            onClick={() => setShowOldPassword(!showOldPassword)}
                          >
                            {showOldPassword ? "Hide" : "Show"}
                          </ChakraButton>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <FormControl mb={{ base: 4, md: 6 }} id="newPassword">
                      <FormLabel
                        color={
                          colorMode == "dark" ? "inherit" : "brand.greyText"
                        }
                      >
                        New Password
                      </FormLabel>
                      <InputGroup>
                        <CustomInput
                          isRequired
                          type={showNewPassword ? "text" : "password"}
                        />

                        <InputRightElement height="100%" width="5.5rem">
                          <ChakraButton
                            colorScheme="brand.primaryButton"
                            backgroundColor="brand.primary"
                            height="2.2rem"
                            fontWeight="normal"
                            fontSize="sm"
                            color="brand.white"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? "Hide" : "Show"}
                          </ChakraButton>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <Button
                      height="3.5rem"
                      fullWidth={true}
                      mt={{ base: 4, md: 6 }}
                    >
                      Update Password
                    </Button>
                  </form>
                )}
              </Box>
            </Box>
          </VStack>
        </Box>
      </Container>
    </PageTransition>
  );
};

export default Settings;

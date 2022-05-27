import * as React from "react";
import { useRouter } from "next/router";
import axios from "utils/axios";
import { useToasts } from "react-toast-notifications";
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
  Skeleton,
  Modal,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";
import PageTransition from "components/pageTransition";
import Container from "components/container";
import CustomInput from "components/customInput";
import { Button } from "components/buttons";
import { PersonIcon, KeyIcon } from "utils/customIcons";
import { User } from "types/mainTypes";
import UserService from "utils/UserService";
import { AxiosError } from "axios";

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
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { addToast } = useToasts();
  const [showOldPassword, setShowOldPassword] = React.useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [user, setUser] = React.useState<User | null>(null);
  const [currentViewState, setCurrentViewState] = React.useState<
    "PERSONAL" | "SECURITY"
  >("PERSONAL");
  const [editProfileLoading, setEditProfileLoading] = React.useState<boolean>(
    false,
  );
  const [editPasswordLoading, setEditPasswordLoading] = React.useState<boolean>(
    false,
  );

  const [profileValues, setProfileValues] = React.useState({
    name: user?.name,
    email: user?.email || "",
  });
  const [passwords, setPasswords] = React.useState({
    oldPassword: "",
    newPassword: "",
  });
  const { oldPassword, newPassword } = passwords;

  const handleChangeProfileValues = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setProfileValues({
      ...profileValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const editProfile = async (payload: {
      name?: string;
      email?: string | undefined;
    }) => {
      setEditProfileLoading(true);
      try {
        const res = await axios.patch("/api/v1/profile", payload);
        const { data } = res;
        const { email, name } = data?.data;
        setProfileValues({
          name,
          email: email || "",
        });
        addToast("Profile updated", { appearance: "success" });
      } catch (err) {
        if ((err as AxiosError)?.response?.data) {
          addToast((err as AxiosError)?.response?.data?.errors?.[0]?.msg, {
            appearance: "error",
          });
        }
      } finally {
        setEditProfileLoading(false);
      }
    };
    editProfile({
      name: profileValues.name,
      email: profileValues.email ? profileValues.email : undefined,
    });
  };

  const handleUpdatePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const editPassword = async (payload: {
      password: { old: string; new: string };
    }) => {
      setEditPasswordLoading(true);
      try {
        await axios.patch("/api/v1/profile/password", payload);

        setPasswords({
          oldPassword: "",
          newPassword: "",
        });
        addToast("Password updated", { appearance: "success" });
      } catch (err) {
        if ((err as AxiosError)?.response?.data) {
          addToast((err as AxiosError)?.response?.data?.errors?.[0]?.msg, {
            appearance: "error",
          });
        }
      } finally {
        setEditPasswordLoading(false);
      }
    };
    editPassword({
      password: { old: passwords.oldPassword, new: passwords.newPassword },
    });
  };

  const permanentlyDeleteAccount = async () => {
    try {
      await axios.delete("/api/v1/profile/");
    } catch (err) {
      // catch error
    } finally {
      UserService.clearCredentials();
      router.replace("/");
    }
  };

  const changeToPersonal = () => {
    setCurrentViewState("PERSONAL");
  };
  const changeToSecurity = () => {
    setCurrentViewState(VIEW_STATES.security);
  };

  React.useEffect(() => {
    const getDashboard = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/v1/profile/dashboard");
        const { data } = res;
        setUser(data?.data?.user);
        const { name, email } = data?.data?.user;
        setProfileValues({ name, email });
      } catch (err) {
        //  catch error
      } finally {
        setLoading(false);
      }
    };

    getDashboard();
  }, []);

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
                    : "1px solid rgba(0, 0, 0, 0.08)"
                }
              >
                <Skeleton
                  w={{ base: "2rem", md: "3rem" }}
                  h={{ base: "2rem", md: "3rem" }}
                  isLoaded={!loading}
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
                </Skeleton>
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
                  <Skeleton isLoaded={!loading}>Profile</Skeleton>
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
                    : "1px solid rgba(0, 0, 0, 0.08)"
                }
                onClick={changeToSecurity}
                cursor="pointer"
                align="center"
                width="100%"
                px={{ base: 4, md: 12 }}
                py={{ base: 6, md: 12 }}
                borderRadius="10px"
              >
                <Skeleton
                  w={{ base: "2rem", md: "3rem" }}
                  h={{ base: "2rem", md: "3rem" }}
                  isLoaded={!loading}
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
                </Skeleton>
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
                  <Skeleton isLoaded={!loading}>Security</Skeleton>
                </Text>
              </VStack>
            </HStack>

            <Box width="100%" maxW="500px">
              <Box mx="auto">
                {currentViewState == VIEW_STATES.personal ? (
                  <>
                    <form onSubmit={handleUpdateProfile}>
                      <FormControl mb={{ base: 4, md: 6 }} id="name">
                        <Skeleton isLoaded={!loading}>
                          <FormLabel
                            htmlFor="name"
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
                            name="name"
                            value={profileValues.name}
                            onChange={handleChangeProfileValues}
                          />
                        </Skeleton>
                      </FormControl>
                      <FormControl mb={{ base: 4, md: 6 }} id="email">
                        <Skeleton isLoaded={!loading}>
                          <FormLabel
                            htmlFor="email"
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
                            name="email"
                            value={profileValues.email}
                            onChange={handleChangeProfileValues}
                          />
                        </Skeleton>
                      </FormControl>

                      <Skeleton
                        height="3.5rem"
                        mt={{ base: 4, md: 6 }}
                        isLoaded={!loading}
                      >
                        <Button
                          height="3.5rem"
                          fullWidth={true}
                          mt={{ base: 4, md: 6 }}
                          isLoading={editProfileLoading}
                          type="submit"
                        >
                          Update
                        </Button>
                      </Skeleton>
                    </form>

                    <Skeleton
                      height="3.5rem"
                      mt={{ base: 10, md: 16 }}
                      isLoaded={!loading}
                    >
                      <Button
                        height="3.5rem"
                        fullWidth={true}
                        mt={{ base: 10, md: 16 }}
                        leftIcon={<WarningTwoIcon />}
                        _hover={{ backgroundColor: "red.600" }}
                        backgroundColor="red.500"
                        onClick={onOpen}
                      >
                        Delete my account
                      </Button>
                    </Skeleton>
                  </>
                ) : (
                  <form onSubmit={handleUpdatePassword}>
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
                          name="oldPassword"
                          value={oldPassword}
                          onChange={handleChangePassword}
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
                          name="newPassword"
                          value={newPassword}
                          onChange={handleChangePassword}
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
                      type="submit"
                      isLoading={editPasswordLoading}
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

      <Modal isCentered size="sm" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Box>
            <ModalHeader>Delete your account?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                Are you sure you want to permanently delete your account? This
                action cannot be reversed.
              </Text>
              <Button
                _focus={{ outline: 0 }}
                _hover={{ backgroundColor: "red.600" }}
                backgroundColor="red.500"
                onClick={permanentlyDeleteAccount}
                display="block"
                leftIcon={<WarningTwoIcon />}
                mt={3}
                fullWidth
              >
                Yes please
              </Button>
            </ModalBody>

            <ModalFooter>
              <ChakraButton
                onClick={onClose}
                _focus={{ outline: 0 }}
                colorScheme="blue"
                mr={3}
              >
                Close
              </ChakraButton>
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>
    </PageTransition>
  );
};

export default Settings;

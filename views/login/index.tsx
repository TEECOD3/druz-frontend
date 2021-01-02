import * as React from "react";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/router";
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
  useColorMode,
} from "@chakra-ui/react";
import { useToasts } from "react-toast-notifications";
import { useFormik, FormikState } from "formik";
import Container from "components/container";
import { Button } from "components/buttons";
import CustomInput from "components/customInput";
import PageTransition from "components/pageTransition";
import UserService from "utils/UserService";
import axios, { setAuthorization } from "utils/axios";

interface IUser {
  name: string;
  password: string;
}

const Login: React.FC = () => {
  const { addToast } = useToasts();
  const router = useRouter();
  const { colorMode } = useColorMode();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const loginUser = async (
    user: IUser,
    resetForm: (nextState?: Partial<FormikState<IUser>>) => void,
  ) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/v1/auth/login", user);
      const { data } = res;
      UserService.setToken(data.data.token);
      setAuthorization(data.data.token);

      resetForm();
      addToast("Successfully logged in!", {
        appearance: "success",
      });
      setTimeout(() => {
        router.replace("/home");
      }, 1500);
    } catch (err) {
      UserService.clearCredentials();
      if (err.response) {
        const response = err.response;
        if (response.data) {
          addToast(response.data.errors?.[0]?.msg, {
            appearance: "error",
          });
        } else if (response.status) {
          const status = response.status;
          if (/^4/.test(status)) {
            addToast("Invalid values entered. Please try again", {
              appearance: "error",
            });
          } else if (/^5/.test(status)) {
            addToast("Something went wrong. Please refresh and try again", {
              appearance: "error",
            });
          }
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const validate = (values: IUser) => {
    const errors: {
      name?: string;
      password?: string;
    } = {};
    if (!values.name) {
      errors.name = "Name is required";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      const { name, password } = values;
      loginUser({ name, password }, resetForm);
    },
  });

  return (
    <PageTransition>
      <Container>
        <Box mb={{ base: 10, md: 16 }} mt={{ base: 2, md: 16 }}>
          <Stack
            align={{ base: "flex-start", md: "center" }}
            justify="space-between"
            direction={{ base: "column-reverse", md: "row" }}
          >
            <Box
              d={{ base: "none", md: "block" }}
              mt={{ base: "2rem", md: 0 }}
              flexBasis="40%"
            >
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
                <form onSubmit={formik.handleSubmit}>
                  <FormControl mb={{ base: 4, md: 6 }} id="name">
                    <FormLabel
                      color={colorMode == "dark" ? "inherit" : "brand.greyText"}
                    >
                      Name
                    </FormLabel>
                    <CustomInput
                      placeholder="Jabari"
                      isRequired
                      type="text"
                      name="name"
                      id="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <Text as="small" color="red.400">
                        {formik.errors.name}
                      </Text>
                    ) : null}
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
                        id="password"
                        name="password"
                        pr="4.5rem"
                        placeholder="**********"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                      <InputRightElement height="100%" width="5.5rem">
                        {!showPassword && (
                          <AiOutlineEye
                            size="1.8rem"
                            onClick={() => setShowPassword(!showPassword)}
                            color={colorMode == "dark" ? "inherit" : "#8E8E93"}
                          />
                        )}
                        {showPassword && (
                          <AiOutlineEyeInvisible
                            size="1.8rem"
                            onClick={() => setShowPassword(!showPassword)}
                            color={colorMode == "dark" ? "inherit" : "#8E8E93"}
                          />
                        )}
                      </InputRightElement>
                    </InputGroup>
                    {formik.touched.password && formik.errors.password ? (
                      <Text as="small" color="red.400">
                        {formik.errors.password}
                      </Text>
                    ) : null}
                  </FormControl>
                  <Button
                    height="3.5rem"
                    fullWidth={true}
                    mt={{ base: 4, md: 6 }}
                    type="submit"
                    isLoading={loading}
                  >
                    Login
                  </Button>
                  <Stack
                    direction={{ base: "column", md: "row" }}
                    align="center"
                    justify="space-between"
                    mt={4}
                  >
                    <Text
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

                    <Text
                      _hover={{ textDecor: "underline" }}
                      fontWeight="bold"
                      color={colorMode == "dark" ? "inherit" : "brand.greyText"}
                      as="small"
                    >
                      <Link href="/forgot-password">
                        <a>Forgot your password?</a>
                      </Link>
                    </Text>
                  </Stack>
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

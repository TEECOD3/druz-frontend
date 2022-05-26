import * as React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
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
import { AxiosError } from "axios";

interface IUser {
  name: string;
  email: string;
  password: string;
}

interface IValues extends IUser {
  confirmPassword: string;
}

const Register: React.FC = () => {
  const router = useRouter();
  const { addToast } = useToasts();
  const { colorMode } = useColorMode();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(
    false,
  );
  const [loading, setLoading] = React.useState<boolean>(false);

  const registerUser = async (
    user: IUser,
    resetForm: (nextState?: Partial<FormikState<IValues>>) => void,
  ) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/v1/auth/register", user);
      const { data } = res;
      UserService.setToken(data.data.token);
      setAuthorization(data.data.token);

      resetForm();
      addToast("Successfully registered!", {
        appearance: "success",
      });
      setTimeout(() => {
        router.replace("/home");
      }, 1500);
    } catch (err) {
      UserService.clearCredentials();
      if ((err as AxiosError).response) {
        const response = (err as AxiosError).response;
        if (response?.data && addToast) {
          addToast(response.data.errors?.[0]?.msg, {
            appearance: "error",
          });
        } else if (response?.status) {
          const status = response.status;
          if (/^4/.test(String(status))) {
            addToast("Invalid values entered. Please try again", {
              appearance: "error",
            });
          } else if (/^5/.test(String(status))) {
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

  const validate = (values: IValues) => {
    const errors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    if (!values.name) {
      errors.name = "Name is required";
    } else if (values.name.length > 15) {
      errors.name = "Name must be 15 characters or less";
    } else if (!/^[a-z0-9_]+$/gi.test(values.name)) {
      errors.name =
        "Your name can only contain letters, numbers and underscore";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be at least 4 characters";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm your password";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords don't match!";
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      const { name, email, password } = values;
      registerUser(
        { name: name.trim(), email: email.trim(), password },
        resetForm,
      );
    },
  });

  return (
    <PageTransition>
      <Container>
        <Box
          mb={{ base: 10, md: 16 }}
          mt={
            router.query.value === "createYourAccount" ? 2 : { base: 2, md: 16 }
          }
        >
          {router.query.value === "createYourAccount" ? (
            <Text
              fontSize={["lg", "xl", "2xl"]}
              mx="auto"
              mb={{ base: 6, md: 8 }}
              maxWidth="700px"
              color="#38A169"
              fontWeight={500}
              textAlign={{ base: "left", md: "center" }}
            >
              Now it&apos;s your turn to create an account and dare your friends
              to tell you what they think about you!!{" "}
              <span aria-labelledby="blushing face emoji" role="img">
                😊
              </span>
            </Text>
          ) : null}
          <Stack
            align="flex-start"
            justify="space-between"
            direction={{ base: "column-reverse", md: "row" }}
          >
            <Box
              d={{ base: "none", md: "block" }}
              mt={{ base: "2rem", md: "3rem" }}
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
                  Create your account
                </Heading>
                <Text>Start creating questions with Druz</Text>
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
                      name="email"
                      id="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <Text as="small" color="red.400">
                        {formik.errors.email}
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
                        name="password"
                        id="password"
                        placeholder="***********"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                      <InputRightElement height="100%" width="5.5rem">
                        {!showPassword && (
                          <AiOutlineEye
                            cursor="pointer"
                            size="1.8rem"
                            onClick={() => setShowPassword(!showPassword)}
                            color={colorMode == "dark" ? "inherit" : "#8E8E93"}
                          />
                        )}
                        {showPassword && (
                          <AiOutlineEyeInvisible
                            cursor="pointer"
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
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="**********"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                      />
                      <InputRightElement height="100%" width="5.5rem">
                        {!showConfirmPassword && (
                          <AiOutlineEye
                            cursor="pointer"
                            size="1.8rem"
                            color={colorMode == "dark" ? "inherit" : "#8E8E93"}
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          />
                        )}
                        {showConfirmPassword && (
                          <AiOutlineEyeInvisible
                            cursor="pointer"
                            size="1.8rem"
                            color={colorMode == "dark" ? "inherit" : "#8E8E93"}
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          />
                        )}
                      </InputRightElement>
                    </InputGroup>
                    {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword ? (
                      <Text as="small" color="red.400">
                        {formik.errors.confirmPassword}
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

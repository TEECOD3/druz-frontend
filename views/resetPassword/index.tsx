import * as React from "react";
import axios from "utils/axios";
import { useRouter } from "next/router";
import {
  Text,
  FormControl,
  FormLabel,
  Box,
  Heading,
  InputRightElement,
  InputGroup,
  useColorMode,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useFormik, FormikState } from "formik";
import PageTransition from "components/pageTransition";
import Container from "components/container";
import { Button } from "components/buttons";
import CustomInput from "components/customInput";
import { useToasts } from "react-toast-notifications";

interface Props {
  token: string;
  email: string;
}

const ResetPassword: React.FC<Props> = ({ token, email }) => {
  const router = useRouter();
  const { addToast } = useToasts();
  const { colorMode } = useColorMode();
  const [showPassword, setShowPassword] = React.useState(false);
  const handlePasswordClick = () => setShowPassword(!showPassword);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const [loading, setLoading] = React.useState<boolean>(false);
  const handleConfirmPasswordClick = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handlePasswordReset = async (
    passwordObject: { password: string },
    token: string,
    email: string,
    resetForm: (
      nextState?: Partial<
        FormikState<{ password: string; confirmPassword: string }>
      >,
    ) => void,
  ) => {
    setLoading(true);
    try {
      await axios.patch(
        `/api/v1/auth/reset-password/${token}/${email}`,
        passwordObject,
      );
      resetForm();
      addToast("password reset successfully!", { appearance: "success" });
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      if (err?.response?.data) {
        addToast(err.response.data.errors?.[0]?.msg, { appearance: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  const validate = (values: { password: string; confirmPassword: string }) => {
    const errors: { password?: string; confirmPassword?: string } = {};
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
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      handlePasswordReset(
        { password: values.password },
        token,
        email,
        resetForm,
      );
    },
  });

  React.useEffect(() => {
    if (!email || !token) {
      router.replace("/");
    }
  }, [email, token, router]);

  return (
    <PageTransition>
      <Container>
        <Box mt={{ base: 8, md: 12 }}>
          <Heading
            textAlign="center"
            as="h1"
            size="xl"
            mx="auto"
            mb={[".5rem", "1.3rem"]}
          >
            Reset your password
          </Heading>
          <Box
            mb="3rem"
            maxWidth="500px"
            mx="auto"
            mt={["2rem", "3rem", "3.5rem"]}
          >
            <form onSubmit={formik.handleSubmit}>
              <FormControl mb={["1rem", "1.5rem", "2rem"]}>
                <FormLabel isRequired htmlFor="password">
                  Password
                </FormLabel>
                <InputGroup size="md">
                  <CustomInput
                    id="password"
                    name="password"
                    pr="4.5rem"
                    type={showPassword ? "text" : "password"}
                    placeholder="New password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />

                  <InputRightElement height="100%" width="5.5rem">
                    {!showPassword && (
                      <AiOutlineEye
                        cursor="pointer"
                        size="1.8rem"
                        onClick={handlePasswordClick}
                        color={colorMode == "dark" ? "inherit" : "#8E8E93"}
                      />
                    )}
                    {showPassword && (
                      <AiOutlineEyeInvisible
                        cursor="pointer"
                        size="1.8rem"
                        onClick={handlePasswordClick}
                        color={colorMode == "dark" ? "inherit" : "#8E8E93"}
                      />
                    )}
                  </InputRightElement>
                </InputGroup>
                {formik.errors.password && formik.touched.password ? (
                  <Text as="small" color="red.400">
                    {formik.errors.password}
                  </Text>
                ) : null}
              </FormControl>

              <FormControl mb={["1rem", "1.5rem", "2rem"]}>
                <FormLabel isRequired htmlFor="confirmPassword">
                  Confirm password
                </FormLabel>
                <InputGroup size="md">
                  <CustomInput
                    id="confirmPassword"
                    name="confirmPassword"
                    pr="4.5rem"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  <InputRightElement height="100%" width="5.5rem">
                    {!showConfirmPassword && (
                      <AiOutlineEye
                        cursor="pointer"
                        size="1.8rem"
                        color={colorMode == "dark" ? "inherit" : "#8E8E93"}
                        onClick={handleConfirmPasswordClick}
                      />
                    )}
                    {showConfirmPassword && (
                      <AiOutlineEyeInvisible
                        cursor="pointer"
                        size="1.8rem"
                        color={colorMode == "dark" ? "inherit" : "#8E8E93"}
                        onClick={handleConfirmPasswordClick}
                      />
                    )}
                  </InputRightElement>
                </InputGroup>
                {formik.errors.confirmPassword &&
                formik.touched.confirmPassword ? (
                  <Text as="small" color="red.400">
                    {formik.errors.confirmPassword}
                  </Text>
                ) : null}
              </FormControl>

              <Button type="submit" isLoading={loading} fullWidth>
                Save password
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </PageTransition>
  );
};

export default ResetPassword;

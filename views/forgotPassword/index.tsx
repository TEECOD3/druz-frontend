import * as React from "react";
import axios from "utils/axios";
import { Text, FormControl, FormLabel, Box, Heading } from "@chakra-ui/react";
import { useFormik } from "formik";
import Link from "next/link";
import PageTransition from "components/pageTransition";
import Container from "components/container";
import { Button } from "components/buttons";
import CustomInput from "components/customInput";

const ForgotPassword: React.FC = () => {
  const [successfulSubmit, setSuccessfulSubmit] = React.useState<boolean>(
    false,
  );
  const [loading, setLoading] = React.useState<boolean>(false);

  const forgotPassword = async (payload: { name: string }) => {
    setLoading(true);
    try {
      await axios.post("/api/v1/auth/forgot-password", payload);
    } catch (err) {
      // catch error
    } finally {
      setSuccessfulSubmit(true);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      forgotPassword({ name: values.name });
    },
  });

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
            Forgot your password?
          </Heading>
          <Box maxWidth="500px" mx="auto" textAlign="center">
            <Box
              as="span"
              style={{ display: successfulSubmit ? "none" : "block" }}
            >
              Enter your name below and we&apos;ll send a reset link to the
              email address you set up for your account.
            </Box>
            {successfulSubmit && (
              <Text fontSize="2xl" as="h2">
                Reset link sent!
              </Text>
            )}
          </Box>

          <Box
            mb="3rem"
            maxWidth="500px"
            mx="auto"
            mt={["2rem", "3rem", "3.5rem"]}
          >
            {successfulSubmit && (
              <>
                <Box
                  borderColor="teal.500"
                  borderWidth="2px"
                  rounded="lg"
                  p="6"
                >
                  Check your inbox for the next steps. If you don&apos;t receive
                  an email, and it&apos;s not in your spam folder this could
                  mean you signed up with a different address or you didn&apos;t
                  setup your profile with your email address.
                </Box>
                <Box
                  d="flex"
                  justifyContent="center"
                  alignItems="center"
                  mt={["1rem", "1.5rem"]}
                  mb="3rem"
                  textAlign="center"
                >
                  <Link href="/login" passHref>
                    <Text as="a" mr={4} href="/login" color="teal.500">
                      Login
                    </Text>
                  </Link>{" "}
                  or{" "}
                  <Link href="/register" passHref>
                    <Text as="a" ml={4} href="/register" color="teal.500">
                      Sign up
                    </Text>
                  </Link>
                </Box>
              </>
            )}
            <form
              style={{ display: successfulSubmit ? "none" : "block" }}
              onSubmit={formik.handleSubmit}
            >
              <FormControl isRequired mb={["1rem", "1.5rem", "2rem"]}>
                <FormLabel htmlFor="name">Your name</FormLabel>
                <CustomInput
                  name="name"
                  id="name"
                  type="text"
                  isRequired
                  placeholder="Your name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              </FormControl>

              <Button isLoading={loading} fullWidth type="submit">
                {" "}
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </PageTransition>
  );
};

export default ForgotPassword;

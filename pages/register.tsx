import * as React from "react";
import { useRouter } from "next/router";
import UserService from "utils/UserService";
import RegisterPage from "../views/register";
import Page from "../components/page";

const Register: React.FC = () => {
  const router = useRouter();
  React.useEffect(() => {
    if (UserService.getToken()) {
      router.replace("/home");
    }
  }, [router]);

  return (
    <Page
      image={"/images/banner.png"}
      title={"Join Druz | Druz"}
      description={
        "Druz is an interactive, fun, secure and safe app. Create an account, set your questions, share your profile link and see what your friends think about you. All for free!"
      }
    >
      <RegisterPage />
    </Page>
  );
};

export default Register;

import RegisterPage from "../views/register";
import Page from "../components/page";
import useRouteVisibility from "hooks/useRouteVisibility";

const Register: React.FC = () => {
  const shouldRender = useRouteVisibility("public");
  return (
    <Page
      image={"/images/banner.png"}
      title={"Join Druz | Druz"}
      description={
        "Druz is an interactive, fun, secure and safe app. Create an account, set your questions, share your profile link and see what your friends think about you. All for free!"
      }
    >
      {shouldRender && <RegisterPage />}
    </Page>
  );
};

export default Register;

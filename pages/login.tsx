import LoginPage from "../views/login";
import Page from "../components/page";
import useRouteVisibility from "hooks/useRouteVisibility";

const Login: React.FC = () => {
  const shouldRender = useRouteVisibility("public");
  return (
    <>
      {shouldRender && (
        <Page
          image={"/images/banner.png"}
          title={"Sign in to Druz | Druz"}
          description={
            "Druz is an interactive, fun, secure and safe app. Create an account, set your questions, share your profile link and see what your friends think about you. All for free!"
          }
        >
          <LoginPage />
        </Page>
      )}
    </>
  );
};

export default Login;

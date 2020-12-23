import LoginPage from "../views/login";
import Page from "../components/page";

const Login: React.FC = () => {
  return (
    <Page
      image={"/images/banner.png"}
      title={"Sign in to Druz | Druz"}
      description={
        "Druz is an interactive, fun, secure and safe app. Create an account, set your questions, share your profile link and see what your friends think about you. All for free!"
      }
    >
      <LoginPage />
    </Page>
  );
};

export default Login;

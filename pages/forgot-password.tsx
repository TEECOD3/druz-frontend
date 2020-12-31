import ForgotPasswordPage from "../views/forgotPassword";
import Page from "../components/page";

const ForgotPassword: React.FC = () => {
  return (
    <Page
      image={"/images/banner.png"}
      title={"Forgot your password? | Druz"}
      description={
        "Druz is an interactive, fun, secure and safe app. Create an account, set your questions, share your profile link and see what your friends think about you. All for free!"
      }
    >
      <ForgotPasswordPage />
    </Page>
  );
};

export default ForgotPassword;

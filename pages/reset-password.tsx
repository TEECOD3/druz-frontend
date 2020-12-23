import ResetPasswordPage from "../views/resetPassword";
import Page from "../components/page";

const ResetPassword: React.FC = () => {
  return (
    <Page
      image={"/images/banner.png"}
      title={"Reset your password | Druz"}
      description={
        "Druz is an interactive, fun, secure and safe app. Create an account, set your questions, share your profile link and see what your friends think about you. All for free!"
      }
    >
      <ResetPasswordPage />
    </Page>
  );
};

export default ResetPassword;

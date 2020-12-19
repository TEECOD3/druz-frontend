import RegisterPage from "../views/register";
import Page from "../components/page";

const Register: React.FC = () => {
  return (
    <Page
      image={"/images/banner.jpg"}
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

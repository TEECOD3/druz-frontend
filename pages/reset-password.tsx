import ResetPasswordPage from "../views/resetPassword";
import Page from "../components/page";

const ResetPassword: React.FC<{ token: string; email: string }> = ({
  token,
  email,
}) => {
  return (
    <Page
      image={"/images/banner.png"}
      title={"Reset your password | Druz"}
      description={
        "Druz is an interactive, fun, secure and safe app. Create an account, set your questions, share your profile link and see what your friends think about you. All for free!"
      }
    >
      <ResetPasswordPage token={token} email={email} />
    </Page>
  );
};

// @ts-ignore
export const getServerSideProps: GetServerSideProps = (context) => {
  const token = context?.query?.t;
  const email = context?.query?.email;

  if (!token || !email) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      token,
      email,
    },
  };
};

export default ResetPassword;

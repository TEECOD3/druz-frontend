import PrivacyPolicyPage from "../views/privacyPolicy";
import Page from "../components/page";

const PrivacyPolicy: React.FC = () => {
  return (
    <Page
      image={"/images/banner.png"}
      title={"Privacy policy | Druz"}
      description={
        "Druz is an interactive, fun, secure and safe app. Create an account, set your questions, share your profile link and see what your friends think about you. All for free!"
      }
    >
      <PrivacyPolicyPage />
    </Page>
  );
};

export default PrivacyPolicy;

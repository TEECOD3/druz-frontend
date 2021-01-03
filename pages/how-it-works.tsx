import HowItWorksPage from "../views/howItWorks";
import Page from "../components/page";

const HowItWorks: React.FC = () => {
  return (
    <Page
      image={"/images/banner.png"}
      title={"How it works | Druz"}
      description={
        "Druz is an interactive, fun, secure and safe app. Create an account, set your questions, share your profile link and see what your friends think about you. All for free!"
      }
    >
      <HowItWorksPage />
    </Page>
  );
};

export default HowItWorks;

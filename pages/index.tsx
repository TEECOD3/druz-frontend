import LandingPage from "../views/landing";
import Page from "../components/page";

const Landing: React.FC = () => {
  return (
    <Page
      image={"/images/banner.jpg"}
      title={"Find out what others think about you | Druz"}
      description={
        "Druz is an interactive, fun, secure and safe app. Create an account, set your questions, share your profile link and see what your friends think about you. All for free!"
      }
    >
      <LandingPage />
    </Page>
  );
};

export default Landing;

import AboutPage from "../views/about";
import Page from "../components/page";

const About: React.FC = () => {
  return (
    <Page
      image={"/images/banner.png"}
      title={"About | Druz"}
      description={
        "Druz is an interactive, fun, secure and safe app. Create an account, set your questions, share your profile link and see what your friends think about you. All for free!"
      }
    >
      <AboutPage />
    </Page>
  );
};

export default About;

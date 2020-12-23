import HomePage from "../views/home";
import Page from "../components/page";

const Home: React.FC = () => {
  return (
    <Page
      image={"/images/banner.png"}
      title={"Home | Druz"}
      description={
        "Druz helps you find out what people think about you by getting them to answer some questions."
      }
    >
      <HomePage />
    </Page>
  );
};

export default Home;

import HomePage from "../views/home";
import Page from "../components/page";
import useRouteVisibility from "hooks/useRouteVisibility";

const Home: React.FC = () => {
  const shouldRender = useRouteVisibility("private");
  return (
    <Page
      image={"/images/banner.png"}
      title={"Home | Druz"}
      description={
        "Druz helps you find out what people think about you by getting them to answer some questions."
      }
    >
      {shouldRender && <HomePage />}
    </Page>
  );
};

export default Home;

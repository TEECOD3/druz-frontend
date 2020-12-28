import LandingPage from "../views/landing";
import Page from "../components/page";
import useRouteVisibility from "hooks/useRouteVisibility";

const Landing: React.FC = () => {
  const shouldRender = useRouteVisibility("public");
  return (
    <>
      {shouldRender && (
        <Page
          image={"/images/banner.png"}
          title={"Find out what people think about you | Druz"}
          description={
            "Druz is an interactive, fun, secure and safe app. Create an account, set your questions, share your profile link and see what your friends think about you. All for free!"
          }
        >
          <LandingPage />
        </Page>
      )}
    </>
  );
};

export default Landing;

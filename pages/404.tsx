import NotFoundPage from "../views/notFound";
import Page from "../components/page";
import useRouteVisibility from "hooks/useRouteVisibility";

const NotFound: React.FC = () => {
  const shouldRender = useRouteVisibility("any");
  return (
    <Page
      image={"/images/banner.png"}
      title={"Page not found | Druz"}
      description={
        "Druz is an interactive, fun, secure and safe app. Create an account, set your questions, share your profile link and see what your friends think about you. All for free!"
      }
    >
      {shouldRender && <NotFoundPage />}
    </Page>
  );
};

export default NotFound;

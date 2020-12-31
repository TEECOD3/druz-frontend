import NotFoundPage from "../views/notFound";
import Page from "../components/page";

const NotFound: React.FC = () => {
  return (
    <Page
      image={"/images/banner.png"}
      title={"Page not found | Druz"}
      description={
        "Druz is an interactive, fun, secure and safe app. Create an account, set your questions, share your profile link and see what your friends think about you. All for free!"
      }
    >
      <NotFoundPage />
    </Page>
  );
};

export default NotFound;

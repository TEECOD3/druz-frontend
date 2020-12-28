import ResponsesPage from "views/responses";
import Page from "components/page";
import useRouteVisibility from "hooks/useRouteVisibility";

const Responses: React.FC = () => {
  const shouldRender = useRouteVisibility("private");
  return (
    <>
      {shouldRender && (
        <Page
          image={"/images/banner.png"}
          title={"Your Responses"}
          description={
            "Druz helps you find out what people think about you by getting them to answer some questions."
          }
        >
          <ResponsesPage />
        </Page>
      )}
    </>
  );
};

export default Responses;

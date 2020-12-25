import ResponsesPage from "views/responses";
import Page from "components/page";

const Responses: React.FC = () => {
  return (
    <Page
      image={"/images/banner.png"}
      title={"Your Responses"}
      description={
        "Druz helps you find out what people think about you by getting them to answer some questions."
      }
    >
      <ResponsesPage />
    </Page>
  );
};

export default Responses;

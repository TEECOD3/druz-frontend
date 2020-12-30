import QuestionsPage from "views/questions";
import Page from "components/page";
import useRouteVisibility from "hooks/useRouteVisibility";

const Questions: React.FC = () => {
  const shouldRender = useRouteVisibility("private");
  return (
    <Page
      image={"/images/banner.png"}
      title={"Your Questions"}
      description={
        "Druz helps you find out what people think about you by getting them to answer some questions."
      }
    >
      {shouldRender && <QuestionsPage />}
    </Page>
  );
};

export default Questions;

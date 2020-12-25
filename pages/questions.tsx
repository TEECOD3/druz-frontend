import QuestionsPage from "views/questions";
import Page from "components/page";

const Questions: React.FC = () => {
  return (
    <Page
      image={"/images/banner.png"}
      title={"Your Questions"}
      description={
        "Druz helps you find out what people think about you by getting them to answer some questions."
      }
    >
      <QuestionsPage />
    </Page>
  );
};

export default Questions;

import AnswersPage from "../views/answers";
import Page from "../components/page";

const Answers: React.FC = () => {
  return (
    <Page
      image={"/images/banner.png"}
      title={"Your Answers"}
      description={
        "Druz helps you find out what others think about you by getting them to answer some questions."
      }
    >
      <AnswersPage />
    </Page>
  );
};

export default Answers;

import MessagesPage from "views/messages";
import Page from "components/page";
import useRouteVisibility from "hooks/useRouteVisibility";

const Messages: React.FC = () => {
  const shouldRender = useRouteVisibility("private");
  return (
    <Page
      image={"/images/banner.png"}
      title={"Your Messages"}
      description={
        "Druz helps you find out what people think about you by getting them to answer some questions."
      }
    >
      {shouldRender && <MessagesPage />}
    </Page>
  );
};

export default Messages;

import SettingsPage from "views/settings";
import Page from "components/page";
import useRouteVisibility from "hooks/useRouteVisibility";

const Settings: React.FC = () => {
  const shouldRender = useRouteVisibility("private");
  return (
    <>
      {shouldRender && (
        <Page
          image={"/images/banner.png"}
          title={"Your profile settings"}
          description={
            "Druz helps you find out what people think about you by getting them to answer some Profile."
          }
        >
          <SettingsPage />
        </Page>
      )}
    </>
  );
};

export default Settings;

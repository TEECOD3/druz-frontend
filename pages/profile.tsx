import ProfilePage from "views/profile";
import Page from "components/page";

const Profile: React.FC = () => {
  return (
    <Page
      image={"/images/banner.png"}
      title={"Your profile settings"}
      description={
        "Druz helps you find out what people think about you by getting them to answer some Profile."
      }
    >
      <ProfilePage />
    </Page>
  );
};

export default Profile;

import ContactPage from "../views/contact";
import Page from "../components/page";

const Contact: React.FC = () => {
  return (
    <Page
      image={"/images/banner.png"}
      title={"Contact Us | Druz"}
      description={
        "Druz is an interactive, fun, secure and safe app. Create an account, set your questions, share your profile link and see what your friends think about you. All for free!"
      }
    >
      <ContactPage />
    </Page>
  );
};

export default Contact;

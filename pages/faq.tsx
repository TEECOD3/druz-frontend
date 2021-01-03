import FAQPage from "../views/faq";
import Page from "../components/page";

const FAQ: React.FC = () => {
  return (
    <Page
      image={"/images/banner.png"}
      title={"Frequently Asked Questions | Druz"}
      description={
        "Druz is an interactive, fun, secure and safe app. Create an account, set your questions, share your profile link and see what your friends think about you. All for free!"
      }
    >
      <FAQPage />
    </Page>
  );
};

export default FAQ;

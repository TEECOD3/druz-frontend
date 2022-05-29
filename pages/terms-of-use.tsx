import TermsOfUsePage from "../views/termsOfUse";
import Page from "../components/page";
import useAnalytics from "hooks/useAnalytics";
import React from "react";

const TermsOfUse: React.FC = () => {
  const analytics = useAnalytics();
  React.useEffect(() => {
    analytics.pageViewed("terms-of-use");
  }, [analytics]);

  return (
    <Page
      image={"/images/banner.png"}
      title={"Privacy policy | Druz"}
      description={
        "Druz is an interactive, fun, secure and safe app. Create an account, set your questions, share your profile link and see what your friends think about you. All for free!"
      }
    >
      <TermsOfUsePage />
    </Page>
  );
};

export default TermsOfUse;

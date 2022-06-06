import { useCallback } from "react";
import useAnalyticsContext from "./analytics-context/useAnalyticsContext";

const useAnalytics = () => {
  const { analytics } = useAnalyticsContext();

  const handlePageViewed = useCallback(
    (name: string, category = "App") => {
      analytics?.page(category, name);
    },
    [analytics],
  );

  const trackButtonClicked = useCallback(
    (title: string) => {
      analytics?.track("Button Clicked", {
        title,
      });
    },
    [analytics],
  );

  const identifyUser = useCallback(
    (name: string) => {
      analytics?.identify({
        name,
      });
    },
    [analytics],
  );

  return {
    handlePageViewed,
    trackButtonClicked,
    identifyUser,
  };
};

export default useAnalytics;

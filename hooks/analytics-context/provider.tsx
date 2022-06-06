import React, { useState, useEffect } from "react";
import { AnalyticsBrowser, Analytics } from "@segment/analytics-next";
import { AnalyticsContext } from "./context";

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

const WRITE_KEY = "r0kbaxHCqkEHZ2fqRSQX6u5MCo7pRyIn";

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({
  children,
}) => {
  const [analytics, setAnalytics] = useState<Analytics | undefined>(undefined);

  useEffect(() => {
    const loadAnalytics = async () => {
      if (!WRITE_KEY || !analytics) {
        return;
      }

      const [response] = await AnalyticsBrowser.load({ writeKey: WRITE_KEY });
      setAnalytics(response);
    };
    if (process.env.NODE_ENV !== "development") {
      loadAnalytics();
    }
  }, [analytics]);

  return (
    <AnalyticsContext.Provider value={{ analytics }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

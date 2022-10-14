import * as React from "react";
import axios from "utils/axios";
import { useRouter } from "next/router";
import customTheme from "../utils/customTheme";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { ToastProvider } from "react-toast-notifications";
import "react-notifications/lib/notifications.css";
import { NotificationManager } from "react-notifications";
import { NotificationContainer } from "react-notifications";
import PageLoader from "components/pageLoader";
import * as gtag from "utils/gtag";
import UserService from "utils/UserService";

interface Props {
  Component: React.FC;
  pageProps: any;
}

const MyApp: React.FC<Props> = ({ Component, pageProps }) => {
  const [loaded, setLoaded] = React.useState(false);

  const router = useRouter();

  React.useEffect(() => {
    axios.interceptors.response.use(
      (res) => Promise.resolve(res),
      (err) => {
        if (!err.response) {
          NotificationManager.error("Check your network connection");
        }

        if (err.response.status == 401 && router.pathname !== "/login") {
          setTimeout(() => {
            router.replace("/login");
            typeof window != "undefined" && UserService.clearCredentials();
          }, 0);
        }
        return Promise.reject(err);
      },
    );
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  React.useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 100);
  }, []);
  return (
    <ToastProvider autoDismiss autoDismissTimeout={3000}>
      <ChakraProvider resetCSS theme={customTheme}>
        <PageLoader loaded={loaded} />
        <Box d={loaded ? "block" : "none"}>
          <Component {...pageProps} />
          <NotificationContainer />
        </Box>
      </ChakraProvider>
    </ToastProvider>
  );
};

export default MyApp;

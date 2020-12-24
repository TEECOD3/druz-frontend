import * as React from "react";
import customTheme from "../utils/customTheme";
import { ChakraProvider, Box } from "@chakra-ui/react";
import PageLoader from "components/pageLoader";

interface Props {
  Component: React.FC;
  pageProps: any;
}

const MyApp: React.FC<Props> = ({ Component, pageProps }) => {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 100);
  }, []);
  return (
    <>
      <ChakraProvider resetCSS theme={customTheme}>
        <PageLoader loaded={loaded} />
        <Box d={loaded ? "block" : "none"}>
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
    </>
  );
};

export default MyApp;

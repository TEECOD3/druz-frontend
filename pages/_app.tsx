import * as React from "react";
import customTheme from "../utils/customTheme";
import { ChakraProvider } from "@chakra-ui/react";

interface Props {
  Component: React.FC;
  pageProps: any;
}

const MyApp: React.FC<Props> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;

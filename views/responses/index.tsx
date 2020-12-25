import * as React from "react";
import { Text } from "@chakra-ui/react";
import PageTransition from "components/pageTransition";
import Container from "components/container";

const Responses: React.FC = () => {
  return (
    <PageTransition>
      <Container>
        <Text>Responses page</Text>
      </Container>
    </PageTransition>
  );
};

export default Responses;

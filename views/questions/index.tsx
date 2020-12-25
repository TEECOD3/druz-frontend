import * as React from "react";
import { Text } from "@chakra-ui/react";
import PageTransition from "components/pageTransition";
import Container from "components/container";

const Questions: React.FC = () => {
  return (
    <PageTransition>
      <Container>
        <Text>Questions page</Text>
      </Container>
    </PageTransition>
  );
};

export default Questions;

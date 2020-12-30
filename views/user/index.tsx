import * as React from "react";
import { Box } from "@chakra-ui/react";
import PageTransition from "components/pageTransition";
import Container from "components/container";
import UserWelcome from "./userWelcome";
import UserChallenge from "./userChallenge";

interface UserProps {
  user: {
    name: string;
    questions: { content: string; _id: string; data: string }[];
    _id: string;
  };
}

const User: React.FC<UserProps> = ({ user }) => {
  const { name } = user;
  const [startChallenge, setStartChallenge] = React.useState<boolean>(false);

  const handleStartChallenge = () => {
    setStartChallenge(true);
  };
  return (
    <PageTransition>
      <Container>
        <Box>
          {startChallenge ? (
            <UserChallenge user={user} />
          ) : (
            <UserWelcome
              name={name}
              handleStartChallenge={handleStartChallenge}
            />
          )}
        </Box>
      </Container>
    </PageTransition>
  );
};

export default User;

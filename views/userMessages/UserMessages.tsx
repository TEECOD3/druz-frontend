import * as React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useToasts } from "react-toast-notifications";
import PageTransition from "components/pageTransition";
import Container from "components/container";
import UserWelcome from "./userWelcome";
import UserChallenge from "./userChallenge";

interface UserQuestionsProps {
  user: {
    name: string;
    questions: { content: string; _id: string; data: string }[];
    _id: string;
  };
  error?: boolean;
  noResponse?: boolean;
  noUser?: boolean;
}

export const UserMessages: React.FC<UserQuestionsProps> = ({
  user,
  error,
  noResponse,
  noUser,
}) => {
  const { addToast } = useToasts();
  const [startChallenge, setStartChallenge] = React.useState<boolean>(false);

  const handleStartChallenge = () => {
    setStartChallenge(true);
  };

  React.useEffect(() => {
    if (noResponse || error) {
      addToast("Something went wrong. Please refresh and try again", {
        appearance: "warning",
      });
    }
  }, [addToast, error, noResponse]);
  return (
    <PageTransition>
      <Container>
        {error || noResponse ? null : noUser ? (
          <>
            <Text
              mt={["3rem", "5rem", "9rem"]}
              textAlign="center"
              mb="2rem"
              fontSize={["lg", "xl"]}
              width={["100%", "70%"]}
              mx={["auto", "auto"]}
            >
              Oops, There&apos;s no user with the name{" "}
              <Text as="span" fontWeight="bold">
                {user?.name}
              </Text>{" "}
              <span aria-labelledby="tears face emoji" role="img">
                😪
              </span>{" "}
              <Text as="span">
                The account may have been deleted or never existed
              </Text>
            </Text>
          </>
        ) : (
          <Box>
            {startChallenge ? (
              <UserChallenge user={user} />
            ) : (
              <UserWelcome
                name={user?.name}
                handleStartChallenge={handleStartChallenge}
              />
            )}
          </Box>
        )}
      </Container>
    </PageTransition>
  );
};

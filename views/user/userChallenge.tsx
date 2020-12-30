import * as React from "react";
import { Box, Text, FormControl, FormLabel, Input } from "@chakra-ui/react";
import Questions from "./questions";
import { Button } from "components/buttons";

interface UserProps {
  user: {
    name: string;
    questions: { content: string; _id: string; data: string }[];
    _id: string;
  };
}

const UserChallenge: React.FC<UserProps> = ({ user }) => {
  const [challengeState, setChallengeState] = React.useState<
    "name" | "questions"
  >("name");
  const [yourName, setYourName] = React.useState<string>("");

  const handleSubmitFormName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setChallengeState("questions");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYourName(e.target.value);
  };
  const handleClick = () => {
    setChallengeState("questions");
  };

  const challengeContent = () => {
    if (challengeState === "name") {
      return (
        <Box>
          <form onSubmit={handleSubmitFormName}>
            <FormControl mb={[".5rem", "1.5rem"]}>
              <FormLabel
                fontSize={["2xl", "2xl", "3xl"]}
                textAlign="center"
                display="block"
                mb={["1.5rem", "2rem"]}
                htmlFor="name"
              >
                What&apos;s your name?
              </FormLabel>
              <Input
                backgroundColor="#fff"
                color="rgb(26, 32, 44)"
                type="text"
                id="name"
                name="name"
                required
                maxLength={20}
                placeholder="Your name"
                onChange={handleChange}
                value={yourName}
              />
            </FormControl>

            <Button fullWidth type="submit" textAlign="center">
              Submit
            </Button>
          </form>
          <Text
            mt={["2rem", "2.3rem", "2.5rem"]}
            fontWeight="bold"
            textAlign="center"
            fontSize={["xl", "2xl", "2xl"]}
          >
            {" "}
            or
          </Text>{" "}
          <br />
          <Button onClick={handleClick}>Continue Anonymously</Button>
        </Box>
      );
    } else if (challengeState === "questions") {
      return <Questions yourName={yourName} user={user} />;
    }
  };
  return (
    <Box
      maxWidth="500px"
      mx="auto"
      mt={["2rem", "3rem", "3.5rem"]}
      mb={["2rem", "3rem"]}
    >
      {challengeContent()}
    </Box>
  );
};

export default UserChallenge;

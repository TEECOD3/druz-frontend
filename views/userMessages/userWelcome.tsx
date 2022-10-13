import * as React from "react";
import Link from "next/link";
import { Box, Text } from "@chakra-ui/react";
import capitalizeString from "utils/capitalizeString";
import { Button } from "components/buttons";

interface Props {
  name: string;
  handleStartChallenge: () => void;
}

const UserWelcome: React.FC<Props> = ({ name, handleStartChallenge }) => {
  const capitalizedUser = capitalizeString(name);
  return (
    <Box mb={["2rem", "3rem"]}>
      <Text
        textAlign="center"
        as="h1"
        fontWeight="bold"
        fontSize={["2xl", "3xl", "4xl"]}
        px={[".6rem", 0]}
        mt={["3rem", "3rem", "4rem"]}
        mx="auto"
        mb={["2rem", "2.5rem"]}
      >
        {capitalizedUser} has a challenge for you!
      </Text>
      <Text
        textAlign="center"
        fontSize={["lg", "lg", "xl"]}
        mx="auto"
        mb={["1.5rem", "1.7rem", "2rem"]}
        maxWidth="600px"
      >
        Leave a message for them and let them know what you think about them or
        anything else you&apos;d like them to know.
      </Text>
      <Text
        textAlign="center"
        fontSize={["lg", "lg", "xl"]}
        mx="auto"
        mb={["1.5rem", "1.7rem", "2rem"]}
        maxWidth="600px"
      >
        Don&apos;t worry about {capitalizedUser} finding out who you are, you
        can choose to carry out the challenge anonymously{" "}
        <span aria-labelledby="cool emoji" role="img">
          😎
        </span>
      </Text>
      <Button onClick={handleStartChallenge}>Get started!</Button>
      <Text
        textAlign="center"
        fontSize={["lg", "lg", "xl"]}
        mx="auto"
        mb={["1.5rem", "1.7rem", "2rem"]}
        maxWidth="600px"
        mt={14}
      >
        or answer their questions{" "}
        <Link passHref href={`/${name}/questions`}>
          <Text
            _hover={{ textDecoration: "underline" }}
            color="brand.primary"
            fontWeight={500}
            as="a"
          >
            here
          </Text>
        </Link>
      </Text>
    </Box>
  );
};

export default UserWelcome;

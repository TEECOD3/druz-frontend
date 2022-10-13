import * as React from "react";
import Link from "next/link";
import { Box, Text } from "@chakra-ui/react";

interface NoQuestionsProps {
  username: string;
}

export const NoQuestions: React.FC<NoQuestionsProps> = ({ username }) => {
  return (
    <Box>
      <Text
        mt={["3rem", "5rem", "9rem"]}
        textAlign="center"
        mb="2rem"
        fontSize={["lg", "xl"]}
        width={["100%", "70%"]}
        mx={["auto", "auto"]}
      >
        Oops, this user doesn&apos;t have questions setup yet. But you can leave
        them a message{" "}
        <Link passHref href={`/${username}`}>
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

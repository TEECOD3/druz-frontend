import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import axios from "utils/axios";
import { Box, Text, FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import { Button } from "components/buttons";
import UserService from "utils/UserService";

interface Props {
  user: {
    name: string;
    questions: { content: string; _id: string; data: string }[];
    _id: string;
  };
  yourName: string;
}

export const Message: React.FC<Props> = ({ user, yourName }) => {
  const [message, setMessage] = useState("");
  const [finished, setFinished] = useState<boolean>(false);

  const router = useRouter();

  const isAuthenticated = !!UserService.getToken();
  const { _id } = user;

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const submitMessage = async (
    payload: { name?: string; message: string },
    userId: string,
  ) => {
    try {
      await axios.post(`/api/v1/message/${userId}`, payload);

      setTimeout(() => {
        if (isAuthenticated) {
          router.push("/home");
        } else {
          router.push("/register?value=createYourAccount");
        }
      }, 1600);
    } catch (err) {
      // catch errors
    }
  };

  const handleSubmitMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFinished(true);
    if (yourName) {
      submitMessage({ message, name: yourName }, _id);
    } else {
      submitMessage({ message }, _id);
    }
  };
  return (
    <Box>
      {finished ? (
        <Text
          mt={["4rem", "5rem"]}
          textAlign="center"
          as="h2"
          fontWeight="bold"
          fontSize={["2xl", "3xl", "3xl"]}
          mx="auto"
          mb={[".5rem", "1.3rem"]}
        >
          Message submitted successfully! <br />{" "}
          {!isAuthenticated ? "Now, it's your turn 😉" : null}
        </Text>
      ) : (
        <form onSubmit={handleSubmitMessage}>
          <FormControl mb={[".5rem", "1.5rem"]}>
            <FormLabel
              fontSize={["2xl", "2xl", "3xl"]}
              textAlign="center"
              display="block"
              mb={["1.5rem", "2rem"]}
              htmlFor="question"
            >
              Leave a message for {user.name}
            </FormLabel>
            <Textarea
              backgroundColor="#fff"
              color="rgb(26, 32, 44)"
              type="text"
              rows={10}
              id="question"
              name="question"
              required
              placeholder="Your answer"
              maxLength={500}
              onChange={handleMessageChange}
              value={message}
            />
          </FormControl>

          <Button fullWidth type="submit">
            Submit
          </Button>
        </form>
      )}
    </Box>
  );
};

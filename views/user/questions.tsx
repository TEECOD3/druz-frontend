import * as React from "react";
import { useRouter } from "next/router";
import axios from "utils/axios";
import { Box, Text, FormControl, Textarea, FormLabel } from "@chakra-ui/react";
import UserService from "utils/UserService";
import { Button } from "components/buttons";

interface Props {
  user: {
    name: string;
    questions: { content: string; _id: string; data: string }[];
    _id: string;
  };
  yourName: string;
}

type ControlledAnswers = {
  question: string;
  answer: string;
}[];

const Questions: React.FC<Props> = ({ user, yourName }) => {
  const router = useRouter();
  const isAuthenticated = !!UserService.getToken();
  const { _id, questions } = user;

  const [questionStage, setQuestionStage] = React.useState<number>(0);
  const [finished, setFinished] = React.useState<boolean>(false);
  const [
    controlledAnswers,
    setControlledAnswers,
  ] = React.useState<ControlledAnswers>(
    questions.map((e) => {
      return { question: e.content, answer: "" };
    }),
  );

  const submitAnswers = async (
    answers: { name?: string; answers: ControlledAnswers },
    userId: string,
  ) => {
    try {
      await axios.post(`/api/v1/answer/${userId}`, answers);

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

  const handleSubmitQuestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (questionStage + 1 < questions.length) {
      setQuestionStage(questionStage + 1);
    } else {
      setFinished(true);

      if (yourName) {
        submitAnswers(
          {
            name: yourName,
            answers: controlledAnswers,
          },
          _id,
        );
      } else {
        submitAnswers({ answers: controlledAnswers }, _id);
      }
    }
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAnswers = [...controlledAnswers];
    newAnswers[questionStage].answer = e.target.value;
    setControlledAnswers(newAnswers);
  };

  return (
    <Box mb={["2rem", "2.3rem", "2.5rem"]}>
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
          Answers submitted successfully! <br />{" "}
          {!isAuthenticated ? "Now, it's your turn 😉" : null}
        </Text>
      ) : (
        <form onSubmit={handleSubmitQuestion}>
          <FormControl mb={[".5rem", "1.5rem"]}>
            <FormLabel
              fontSize={["2xl", "2xl", "3xl"]}
              textAlign="center"
              display="block"
              mb={["1.5rem", "2rem"]}
              htmlFor="question"
            >
              {questionStage + 1}. <br /> {questions[questionStage].content}
            </FormLabel>
            <Textarea
              backgroundColor="#fff"
              color="rgb(26, 32, 44)"
              type="text"
              id="question"
              name="question"
              required
              placeholder="Your answer"
              maxLength={200}
              onChange={handleAnswerChange}
              value={controlledAnswers[questionStage].answer}
            />
          </FormControl>

          <Button fullWidth type="submit">
            {questionStage + 1 < questions.length ? "Next" : "Submit"}
          </Button>
        </form>
      )}
    </Box>
  );
};

export default Questions;

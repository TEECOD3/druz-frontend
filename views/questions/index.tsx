import * as React from "react";
import axios from "utils/axios";
import {
  Text,
  Heading,
  Box,
  Stack,
  useColorMode,
  useColorModeValue,
  Skeleton,
  Modal,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  FormLabel,
  FormControl,
  Textarea,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useToasts } from "react-toast-notifications";
import { AddIcon } from "@chakra-ui/icons";
import PageTransition from "components/pageTransition";
import Container from "components/container";
import { Button } from "components/buttons";
import SingleQuestion from "./singleQuestion";
import { Questions as QuestionsType } from "types/mainTypes";

const Questions: React.FC = () => {
  const { addToast } = useToasts();
  const { colorMode } = useColorMode();
  const boxBackgroundColor = useColorModeValue(
    "rgba(242, 242, 242, 0.25)",
    "rgb(25 29 39)",
  );
  const [questions, setQuestions] = React.useState<QuestionsType>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [questionModalState, setQuestionModalState] = React.useState<
    "add" | "edit" | null
  >(null);
  const [editQuestionId, setEditQuestionId] = React.useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [minMaxContent, setMinMaxContent] = React.useState("");

  const addQuestion = async (payload: { question: string }) => {
    try {
      const res = await axios.patch("/api/v1/question", payload);
      const { data } = res;
      addToast("Question successfully added!", { appearance: "success" });
      setQuestions(data?.data?.questions);
    } catch (err) {
      if (err.response) {
        const response = err.response;
        if (response.data) {
          addToast(response.data.errors?.[0]?.msg, { appearance: "error" });
        } else {
          addToast("Something went wrong, please refresh and try again", {
            appearance: "error",
          });
        }
      }
    }
  };

  const editQuestion = async (
    questionId: string,
    questionObject: { question: string },
  ) => {
    try {
      const res = await axios.patch(
        `/api/v1/question/edit/${questionId}`,
        questionObject,
      );
      const { data } = res;
      addToast("Question successfully edited!", { appearance: "success" });
      setQuestions(data?.data?.questions);
    } catch (err) {
      if (err.response) {
        const response = err.response;
        if (response.data) {
          addToast(response.data.errors?.[0]?.msg, { appearance: "error" });
        } else {
          addToast("Something went wrong, please refresh and try again", {
            appearance: "error",
          });
        }
      }
    }
  };

  const deleteQuestion = async (questionId: string) => {
    try {
      const res = await axios.delete(`/api/v1/question/${questionId}`);
      const { data } = res;
      addToast("Question successfully deleted!", { appearance: "success" });
      setQuestions(data?.data?.questions);
    } catch (err) {
      if (err.response) {
        const response = err.response;
        if (response.data) {
          addToast(response.data.errors?.[0]?.msg, { appearance: "error" });
        } else {
          addToast("Something went wrong, please refresh and try again", {
            appearance: "error",
          });
        }
      }
    }
  };

  const validate = (values: { question: string }) => {
    const errors: { question?: string } = {};
    if (!values.question) {
      errors.question = "Question can't be empty";
    } else if (values.question.length < 5) {
      errors.question = "Your question must be at least 5 characters";
    } else if (values.question.length > 120) {
      errors.question = "Your question should not be more than 120 characters";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      question: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      onClose();
      if (questionModalState === "add") {
        addQuestion({ question: values.question });
      } else if (questionModalState === "edit") {
        editQuestion(editQuestionId, { question: values.question });
      }
      resetForm();
    },
  });

  const {
    isOpen: isMinMaxOpen,
    onOpen: onMinMaxOpen,
    onClose: onMinMaxClose,
  } = useDisclosure();

  const handleAddQuestion = () => {
    if (questions.length >= 12) {
      onMinMaxOpen();
      setMinMaxContent("You must have 12 questions or less in your profile");
      setTimeout(() => {
        onMinMaxClose();
      }, 3000);
    } else {
      setQuestionModalState("add");
      onOpen();
    }
  };

  const handleEditQuestion = (id: string, question: string) => {
    setQuestionModalState("edit");
    setEditQuestionId(id);
    formik.values.question = question;
    onOpen();
  };

  const handleRemoveQuestion = (id: string) => {
    if (questions.length <= 2) {
      onMinMaxOpen();
      setMinMaxContent("You must have at least 2 questions in your profile");
      setTimeout(() => {
        onMinMaxClose();
      }, 3000);
    } else {
      deleteQuestion(id);
    }
  };

  React.useEffect(() => {
    const getQuestions = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/v1/auth/user");
        const { data } = res;
        setQuestions(data?.data?.user?.questions);
      } catch (err) {
        // catch error
      } finally {
        setLoading(false);
      }
    };

    setTimeout(() => {
      getQuestions();
    }, 3500);
  }, []);

  return (
    <PageTransition>
      <Box
        border="1px solid rgba(160, 174, 192, 0.15)"
        backgroundColor={boxBackgroundColor}
        py={4}
      >
        <Container>
          <Box mx="auto" width={{ base: "100%", md: "70%" }}>
            <Stack
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align="center"
            >
              <Heading mb={{ base: 4, md: 0 }} size="md" as="h1">
                All Questions
              </Heading>
              <Skeleton isLoaded={!loading}>
                <Button
                  onClick={handleAddQuestion}
                  height="2.7rem"
                  margin="0"
                  leftIcon={<AddIcon />}
                >
                  Add a New Question
                </Button>
              </Skeleton>
            </Stack>
          </Box>
        </Container>
      </Box>
      <Box pt={{ base: 6, md: 8 }}>
        <Container>
          <Text
            mx="auto"
            width={{ base: "100%", md: "70%" }}
            fontWeight="bold"
            mb={4}
            color={colorMode == "dark" ? "inherit" : "brand.grey"}
          >
            <Skeleton as="p" isLoaded={!loading}>
              Showing {questions.length} Questions
            </Skeleton>
          </Text>

          {loading
            ? new Array(8)
                .fill("_")
                .map((_, idx) => (
                  <SingleQuestion
                    content={"loading"}
                    handleEditQuestion={handleEditQuestion}
                    handleRemoveQuestion={handleRemoveQuestion}
                    questionId={idx.toString()}
                    loading={loading}
                    key={idx}
                  />
                ))
            : questions.map((question) => (
                <SingleQuestion
                  content={question.content}
                  handleEditQuestion={handleEditQuestion}
                  handleRemoveQuestion={handleRemoveQuestion}
                  questionId={question._id}
                  key={question._id}
                  loading={loading}
                />
              ))}
        </Container>
      </Box>

      {/* modals */}
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <Box>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {questionModalState === "add"
                ? "Add a new question to your profile"
                : "Edit your question"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={formik.handleSubmit}>
                <FormControl mb={["1rem", "1.5rem", "2rem"]}>
                  <FormLabel htmlFor="question">Question</FormLabel>
                  <Textarea
                    backgroundColor="#fff"
                    color="rgb(26, 32, 44)"
                    name="question"
                    id="question"
                    type="text"
                    placeholder="Add your new question"
                    onChange={formik.handleChange}
                    value={formik.values.question}
                    required
                    maxLength={123}
                  />
                  {formik.errors.question ? (
                    <Text as="small" color="red.400">
                      {formik.errors.question}
                    </Text>
                  ) : null}
                </FormControl>
                <Button small fullWidth type="submit">
                  Submit
                </Button>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button
                small
                _focus={{ outline: 0 }}
                _hover={{ backgroundColor: "red.600" }}
                backgroundColor="red.500"
                color="#fff"
                onClick={onClose}
                display="block"
                margin="0 0 0 auto"
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Box>
      </Modal>

      {/* minmax error */}
      <Modal isCentered isOpen={isMinMaxOpen} onClose={onMinMaxClose}>
        <Box>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <Text
                textAlign="center"
                color="red.500"
                fontWeight="bold"
                fontSize="lg"
                p="3rem"
              >
                {minMaxContent}
              </Text>
            </ModalBody>
          </ModalContent>
        </Box>
      </Modal>
    </PageTransition>
  );
};

export default Questions;

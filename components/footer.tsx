import * as React from "react";
import Link from "next/link";
import {
  Box,
  Text,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { borderColor } from "utils/colorValues";
import { Button } from "components/buttons";

const Footer: React.FC = () => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      position="absolute"
      bottom="0"
      height="auto"
      w="100%"
      py={["1.3rem", "1.6rem"]}
      px={["1rem", "1.5rem", "2rem"]}
      borderTop={`1px solid ${borderColor[colorMode]}`}
      borderBottom="6px solid #3B9795"
    >
      <Box m="0 auto" maxW={["1200px"]}>
        <Text fontSize="md" d="block" textAlign="center">
          &copy; {new Date().getFullYear()}{" "}
          <Text
            color="brand.primary"
            fontWeight={500}
            _hover={{ textDecoration: "underline" }}
            as="span"
          >
            <Link href="https://twitter.com/druz_app">
              <a>Druz</a>
            </Link>
          </Text>{" "}
          &#8226;{" "}
          <Text
            color="brand.primary"
            fontWeight={500}
            _hover={{ textDecoration: "underline" }}
            as="span"
            cursor="pointer"
            onClick={onOpen}
          >
            Disclaimer
          </Text>{" "}
          <Text d={{ base: "none", md: "inline" }} as="span">
            &#8226;
          </Text>{" "}
          <Text
            color="brand.primary"
            fontWeight={500}
            _hover={{ textDecoration: "underline" }}
            d={{ base: "block", md: "inline" }}
            textAlign="center"
            as="span"
          >
            <Link href="mailto:hello@druz.xyz">
              <a>Contact us</a>
            </Link>
          </Text>
        </Text>
      </Box>

      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <Box>
          <ModalOverlay />
          <ModalContent top={0}>
            <ModalHeader fontSize={["xl", "2xl"]}>Disclaimer</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                Druz is an interactive, fun, secure and safe app, where you can
                create questions and get your friends, family or others to take
                your challenge by answering your questions with an option to do
                so anonymously. Please read our Privacy Policy and Terms of
                usage below before making use of our service.
              </Text>
              <Box
                fontSize="lg"
                display="block"
                my=".6rem"
                fontWeight="bold"
                as="span"
              >
                Privacy Policy
              </Box>{" "}
              Some parts of our platform can be accessed without registration
              and other parts can only be accessed by registered users. While
              signing up, We require you to provide some of your information
              like your name and email address.
              <br />
              Most of your information like Email, responses sent to and from
              other users are not shared with the public or any other third
              party. Your name and questions however will appear to the public
              by default. <br />
              To maintain the safety and security of our users, we record your
              IP address when you register and send responses to other users.{" "}
              <br />
              <Box
                fontSize="lg"
                display="block"
                my=".6rem"
                fontWeight="bold"
                as="span"
              >
                Terms of use
              </Box>{" "}
              The following apply both to registered and non-registered users of
              this app. <br /> All users must refrain from insult and abuse of
              the app&apos;s services.
              <br />
              We have the right to block any user from accessing our services.{" "}
              <br />
              We have the right to remove content or accounts for any reason we
              see adequate. We constantly monitor and will do well to block or
              remove content that we consider to be harassing or bullying.{" "}
              <br />
              We have the right to modify our terms of usage whenever adequate.{" "}
              <br />
              All content created and shared is the sole responsibility of the
              person who originated such content which is carried out at their
              own risk. <br />
              You will be solely responsible for any damage or loss to you or
              any other party resulting therefrom. All communicated content on
              the website is the responsibility of the respective users and we
              are not responsible for any content or any damage that could
              result from any content or the use of our services, even if caused
              or contributed by our negligence.
            </ModalBody>

            <ModalFooter>
              <Button margin="0 0 0 auto" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Box>
      </Modal>
    </Box>
  );
};

export default Footer;

import * as React from "react";
import {
  ButtonProps,
  Button as ChakraButton,
  useColorMode,
} from "@chakra-ui/react";

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <ChakraButton
      as="button"
      borderRadius="5px"
      py="1rem"
      px="1.4rem"
      color="brand.white"
      // transition=".3s ease-out"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      bgColor="brand.primary"
      _hover={{ paddingRight: "2rem" }}
      {...props}
    />
  );
};

export const OutlinedButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { colorMode } = useColorMode();
  return (
    <ChakraButton
      as="button"
      borderRadius="5px"
      py="1rem"
      px="1.4rem"
      color="brand.white"
      // transition=".3s ease-out"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      bgColor="brand.primary"
      _hover={{ paddingRight: "2rem" }}
      {...props}
    />
  );
};

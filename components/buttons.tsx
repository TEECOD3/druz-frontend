import * as React from "react";
import { ButtonProps, Button as ChakraButton } from "@chakra-ui/react";
import { mainColors } from "utils/customTheme";

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <ChakraButton
      as="button"
      borderRadius="5px"
      height="3rem"
      px="1.4rem"
      color="brand.white"
      transition=".2s ease-out"
      bgColor="brand.primary"
      _hover={{ paddingRight: "1.6rem" }}
      fontWeight={500}
      {...props}
    />
  );
};

export const OutlinedButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <ChakraButton
      as="button"
      borderRadius="5px"
      height="2.8rem"
      px="1.4rem"
      color="brand.primary"
      transition=".2s ease-out"
      background="none"
      border={`1px solid ${mainColors.primary}`}
      _hover={{ paddingRight: "1.6rem" }}
      fontWeight={500}
      {...props}
    />
  );
};

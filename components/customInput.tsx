import * as React from "react";
import { Input, InputProps, useColorMode } from "@chakra-ui/react";

const CustomInput: React.FC<InputProps> = (props: InputProps) => {
  const { colorMode } = useColorMode();
  return (
    <Input
      py="1.7rem"
      backgroundColor={colorMode == "dark" ? "inherit" : "#e9f6ff"}
      color={colorMode == "dark" ? "inherit" : "brand.greyText"}
      fontWeight={500}
      borderStyle={colorMode == "dark" ? "solid" : "hidden"}
      {...props}
    />
  );
};

export default CustomInput;

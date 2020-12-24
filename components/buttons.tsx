import * as React from "react";
import {
  ButtonProps,
  Button as ChakraButton,
  forwardRef,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { mainColors } from "utils/customTheme";

export const Button: React.FC<ButtonProps> = forwardRef(
  (props: ButtonProps, ref) => {
    return (
      <motion.div
        style={{ width: "fit-content", margin: "0 auto" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChakraButton
          colorScheme="brand.primaryButton"
          borderRadius="5px"
          height="3rem"
          px="1.4rem"
          color="brand.white"
          bgColor="brand.primary"
          fontWeight={500}
          {...props}
          ref={ref}
        />
      </motion.div>
    );
  },
);

export const OutlinedButton: React.FC<ButtonProps> = forwardRef(
  (props: ButtonProps, ref) => {
    return (
      <motion.div
        style={{ width: "fit-content", margin: "0 auto" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChakraButton
          borderRadius="5px"
          height="2.8rem"
          px="1.4rem"
          color="brand.primary"
          background="none"
          _hover={{ background: "none" }}
          border={`1px solid ${mainColors.primary}`}
          fontWeight={500}
          {...props}
          ref={ref}
        />
      </motion.div>
    );
  },
);

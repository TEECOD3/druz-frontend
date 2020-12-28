import * as React from "react";
import {
  ButtonProps as ChakraButtonProps,
  Button as ChakraButton,
  forwardRef,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { mainColors } from "utils/customTheme";

interface ButtonProps extends ChakraButtonProps {
  toAnimate?: boolean;
  fullWidth?: boolean;
  margin?: string;
  small?: boolean;
}

export const Button: React.FC<ButtonProps> = forwardRef(
  (props: ButtonProps, ref) => {
    const { toAnimate, fullWidth, small, margin, ...rest } = props;
    return (
      <motion.div
        style={{
          width: fullWidth ? "100%" : "fit-content",
          margin: margin ? margin : "0 auto",
        }}
        whileHover={{ scale: toAnimate ? 1.05 : 1 }}
        whileTap={{ scale: toAnimate ? 0.9 : 1 }}
      >
        <ChakraButton
          width={fullWidth ? "100%" : "auto"}
          colorScheme="brand.primaryButton"
          borderRadius="5px"
          height={small ? "2.7rem" : "3rem"}
          px="1.4rem"
          color="brand.white"
          bgColor="brand.primary"
          fontWeight={500}
          {...rest}
          ref={ref}
        />
      </motion.div>
    );
  },
);

export const OutlinedButton: React.FC<ButtonProps> = forwardRef(
  (props: ButtonProps, ref) => {
    const { toAnimate, fullWidth, small, margin, ...rest } = props;
    return (
      <motion.div
        style={{
          width: fullWidth ? "100%" : "fit-content",
          margin: margin ? margin : "0 auto",
        }}
        whileHover={{ scale: toAnimate ? 1.05 : 1 }}
        whileTap={{ scale: toAnimate ? 0.9 : 1 }}
      >
        <ChakraButton
          width={fullWidth ? "100%" : "auto"}
          borderRadius="5px"
          height={small ? "2.5rem" : "2.8rem"}
          px="1.4rem"
          color="brand.primary"
          background="none"
          _hover={{ background: "none" }}
          border={`1px solid ${mainColors.primary}`}
          fontWeight={500}
          {...rest}
          ref={ref}
        />
      </motion.div>
    );
  },
);

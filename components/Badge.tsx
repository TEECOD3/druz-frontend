import * as React from "react";
import { Box } from "@chakra-ui/react";

interface BadgeProps {
  text: string;
}

const Badge: React.FC<BadgeProps> = ({ text }) => {
  return (
    <Box
      fontSize="9px"
      fontWeight={700}
      letterSpacing=".5px"
      backgroundColor="brand.primary"
      borderRadius={3}
      color="white"
      padding="1px 4px"
    >
      {text?.toUpperCase()}
    </Box>
  );
};

export default Badge;

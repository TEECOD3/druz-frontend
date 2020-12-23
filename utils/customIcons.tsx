import * as React from "react";
import { Icon, IconProps } from "@chakra-ui/react";

export const MoonIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <Icon viewBox="0 0 20 20" {...props}>
      <path
        fill="currentColor"
        d="M18.354 12.854A9 9 0 016.646 1.146 9.003 9.003 0 0010 18.5a9.003 9.003 0 008.354-5.646z"
        stroke="#A0AEC0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export const GetStartedIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <Icon viewBox="0 0 18 18" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.602.727a.625.625 0 01.13.697l-7.072 15.91a.625.625 0 01-1.146-.01l-2.552-5.957-5.958-2.552A.625.625 0 01.996 7.67L16.906.599a.625.625 0 01.695.128h.001z"
        fill="#fff"
      />
    </Icon>
  );
};

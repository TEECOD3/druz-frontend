import * as React from "react";
import { Icon, IconProps, useColorModeValue } from "@chakra-ui/react";
import { backgroundColor } from "utils/colorValues";

interface IconsWithColor extends IconProps {
  color?: string;
}

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

export const ResponseIcon: React.FC<IconsWithColor> = (
  props: IconsWithColor,
) => {
  const backgroundColorValue = useColorModeValue(
    backgroundColor.light,
    backgroundColor.dark,
  );
  return (
    <Icon viewBox="0 0 29 29" {...props}>
      <path
        d="M21.792 7.167h2.916a2.917 2.917 0 012.917 2.916v8.75a2.917 2.917 0 01-2.917 2.917h-2.916v5.833l-5.834-5.833h-5.833a2.907 2.907 0 01-2.062-.855m0 0l4.979-4.978h5.833A2.917 2.917 0 0021.792 13V4.25a2.917 2.917 0 00-2.917-2.917H4.292A2.917 2.917 0 001.375 4.25V13a2.917 2.917 0 002.917 2.917h2.916v5.833l.855-.855z"
        stroke={props.color ? props.color : "#A0AEC0"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={backgroundColorValue}
      />
    </Icon>
  );
};

export const QuestionIcon: React.FC<IconsWithColor> = (
  props: IconsWithColor,
) => {
  const backgroundColorValue = useColorModeValue(
    backgroundColor.light,
    backgroundColor.dark,
  );
  return (
    <Icon viewBox="0 0 29 30" {...props}>
      <path
        d="M9 10.625c.8-1.699 2.96-2.917 5.5-2.917 3.223 0 5.833 1.959 5.833 4.375 0 2.042-1.863 3.755-4.383 4.24-.79.151-1.45.787-1.45 1.594m0 4.375h.015M27.625 15a13.125 13.125 0 11-26.25 0 13.125 13.125 0 0126.25 0z"
        stroke={props.color ? props.color : "#A0AEC0"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={backgroundColorValue}
      />
    </Icon>
  );
};

export const KeyIcon: React.FC<IconsWithColor> = (props: IconsWithColor) => {
  const backgroundColorValue = useColorModeValue(
    backgroundColor.light,
    backgroundColor.dark,
  );
  return (
    <Icon viewBox="0 0 30 29" {...props}>
      <path
        d="M19.375 7.208a2.917 2.917 0 012.917 2.917l-2.917-2.917zm8.75 2.917A8.751 8.751 0 0116.833 18.5l-3.291 3.292h-2.917v2.916H7.708v2.917H3.333a1.458 1.458 0 01-1.458-1.458v-3.772c0-.386.154-.757.427-1.03L11 12.666a8.75 8.75 0 1117.125-2.542z"
        stroke={props.color ? props.color : "#A0AEC0"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={backgroundColorValue}
      />
    </Icon>
  );
};

export const PersonIcon: React.FC<IconsWithColor> = (props: IconsWithColor) => {
  const backgroundColorValue = useColorModeValue(
    backgroundColor.light,
    backgroundColor.dark,
  );
  return (
    <Icon viewBox="0 0 30 29" {...props}>
      <path
        d="M17.833 7.208a5.833 5.833 0 11-11.666 0 5.833 5.833 0 0111.666 0zM12 17.417A10.208 10.208 0 001.79 27.625h20.417A10.208 10.208 0 0012 17.417z"
        stroke={props.color ? props.color : "#A0AEC0"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={backgroundColorValue}
      />
    </Icon>
  );
};

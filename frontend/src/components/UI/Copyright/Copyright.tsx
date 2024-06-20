import { Typography, Link } from "@mui/material";

type AlignType =
  | "right"
  | "left"
  | "center"
  | "inherit"
  | "justify"
  | undefined;

interface CopyrightProps {
  alignText?: AlignType;
  [key: string]: any; // To accept any other props
}
const Copyright = ({ alignText, ...props }: CopyrightProps) => {
  return (
    <Typography
      variant="body1"
      color="text.secondary"
      align={alignText}
      {...props}
    >
      {"Copyright © "}
      {/* TBC */}
      <Link href="https://www.linkedin.com/in/patryk-majchrzakdev/">
        Boilerplate Application
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;

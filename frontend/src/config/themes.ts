// MUI themes setup

import { createTheme } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";

export const lightTheme: Theme = createTheme({
  palette: {
    mode: "light",
  },
});

export const darkTheme: Theme = createTheme({
  palette: {
    mode: "dark",
  },
});

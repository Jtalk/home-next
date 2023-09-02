import { createTheme } from "@mui/material";

const Theme = createTheme({
  typography: {
    // https://mui.com/material-ui/customization/typography/
    // I don't want to worry about custom fonts & FontLoader.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
export default Theme;

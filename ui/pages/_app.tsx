import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { Theme } from "../src/shared/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={Theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

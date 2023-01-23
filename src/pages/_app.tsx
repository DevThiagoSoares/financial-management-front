import React from "react";
import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";
import { ModalProvider as Modal } from "../shared/hooks/useModal";
import { ToastProvider } from "../shared/hooks/useToast";
import * as locales from "@mui/material/locale";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  type SupportedLocales = keyof typeof locales;
  const theme = useTheme();
  const [locale, setLocale] = React.useState<SupportedLocales>("ptBR");
  const themeWithLocale = React.useMemo(
    () => createTheme(theme, locales[locale]),
    [locale, theme]
  );
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={themeWithLocale}>
        <ToastProvider>
          <SnackbarProvider maxSnack={3}>
            <Modal>
              <Component {...pageProps} />
            </Modal>
          </SnackbarProvider>
        </ToastProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

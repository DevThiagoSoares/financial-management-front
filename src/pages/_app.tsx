import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";
import { ModalProvider as Modal } from "../shared/hooks/useModal";
import { ToastProvider } from "../shared/hooks/useToast";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ToastProvider>
        <SnackbarProvider maxSnack={3}>
          <Modal>
            <Component {...pageProps} />
          </Modal>
        </SnackbarProvider>
      </ToastProvider>
    </SessionProvider>
  );
}

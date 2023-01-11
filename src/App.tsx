// import { brown } from '@mui/material/colors'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { ModalProvider } from './shared/hooks/useModal'
import { ToastProvider } from './shared/hooks/useToast'
import { LightTheme } from './shared/themes'

export function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <BrowserRouter>
        <ToastProvider>
          <ModalProvider>
            <AppRoutes />
          </ModalProvider>
        </ToastProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

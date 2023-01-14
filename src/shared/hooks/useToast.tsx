import { AlertColor } from '@mui/material'
import { createContext, ReactNode, useContext, useState } from 'react'

interface ActionToastProps {
  message: string
  type: AlertColor | undefined
}

interface ToastContextProps {
  open: boolean
  closeToast: () => void
  message: string
  type: AlertColor | undefined
  actionToast: (data: ActionToastProps) => void
}

interface ToastProviderProps {
  children: ReactNode
}

const ToastContext = createContext({} as ToastContextProps)

export function ToastProvider({ children }: ToastProviderProps) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState<AlertColor | undefined>()

  const actionToast = (data: ActionToastProps) => {
    setOpen(true)
    setMessage(data.message)
    setType(data.type)
  }

  const closeToast = () => {
    setOpen(false)
  }

  return (
    <ToastContext.Provider
      value={{
        open,
        closeToast,
        message,
        type,
        actionToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}
export function useToast() {
  return useContext(ToastContext)
}

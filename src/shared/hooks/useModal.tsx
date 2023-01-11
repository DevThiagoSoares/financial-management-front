import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

interface ModalContextProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  openModal: () => void
  closeModal: () => void
}

interface ModalProviderProps {
  children: ReactNode
}

const ModalContext = createContext({} as ModalContextProps)

export function ModalProvider({ children }: ModalProviderProps) {
  const [open, setOpen] = useState(false)

  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  return (
    <ModalContext.Provider value={{ open, setOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  return useContext(ModalContext)
}

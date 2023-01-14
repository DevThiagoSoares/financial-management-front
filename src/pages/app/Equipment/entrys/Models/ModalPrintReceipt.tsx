import { Box, Button } from '@mui/material'
import { ModalContainer } from '../../../../../components/ModalContainer'
import { useModal } from '../../../../../shared/hooks/useModal'

export function ModalPrintReceipt() {
  const { open, setOpen, closeModal } = useModal()

  return (
    <>
      <ModalContainer
        open={open}
        setOpen={setOpen}
        title="Imprimir Comprovante"
        subtitle="Deseja imprimir o comprovante de entrada?"
        maxWidth="xl"
        actions={false}
      >
        <Box
          sx={{
            display: 'flex',
            width: '576px',
            justifyContent: 'flex-end',
          }}
        >
          <Button onClick={closeModal}>Descartar</Button>
          <Button variant="contained" /* type="submit" */ onClick={closeModal}>
            Imprimir
          </Button>
        </Box>
      </ModalContainer>
    </>
  )
}

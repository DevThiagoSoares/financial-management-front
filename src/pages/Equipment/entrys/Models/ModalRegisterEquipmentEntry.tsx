import { Box, Button } from '@mui/material'

import { ModalContainer } from '../../../../components/ModalContainer'

import { useModal } from '../../../../shared/hooks/useModal'

export function ModalRegisterEquipmentEntry() {
  const { open, setOpen, closeModal } = useModal()

  return (
    <>
      <ModalContainer
        open={open}
        setOpen={setOpen}
        title="Registrar Entrada"
        subtitle=""
        maxWidth="xl"
        actions={false}
      >
        <Box
          component="form"
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
            gridTemplateAreas: `
              ". ."
              "br br"
              "ar ar"
              ". ."

              `,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gridArea: 'ar',
              gap: '0.5rem',
            }}
          >
            <Button onClick={closeModal}>Cancelar</Button>
            <Button variant="contained" type="submit">
              REGISTRAR ENTRADA
            </Button>
          </Box>{' '}
        </Box>
      </ModalContainer>
    </>
  )
}

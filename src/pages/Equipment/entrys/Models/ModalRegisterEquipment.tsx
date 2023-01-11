import { Box, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { ModalContainer } from '../../../../components/ModalContainer'

import { useModal } from '../../../../shared/hooks/useModal'
import { TabModal } from '../../components/TabModal'

export function ModalRegisterEquipment() {
  const { open, setOpen, closeModal } = useModal()

  return (
    <>
      <ModalContainer
        open={open}
        setOpen={setOpen}
        title="Equipamentos"
        subtitle=""
        maxWidth="xl"
        actions={false}
      >
        <Button
          onClick={closeModal}
          sx={{
            position: 'absolute',
            right: 20,
            top: 20,
            color: (theme) => theme.palette.grey[700],
            '&:hover': {
              backgroundColor: 'white',
            },
          }}
        >
          <CloseIcon />
        </Button>

        <Box
          component="form"
          sx={{
            width: '100%',
            display: 'grid',
          }}
        >
          <TabModal />
        </Box>
      </ModalContainer>
    </>
  )
}

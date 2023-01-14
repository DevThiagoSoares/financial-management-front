import { Box, Button, Divider, TextField } from '@mui/material'
import { ModalContainer } from '../../../../../components/ModalContainer'
import { useModal } from '../../../../../shared/hooks/useModal'
import { Teste } from './teste'

export function ModalRegisterExit() {
  const { open, setOpen, closeModal } = useModal()

  return (
    <>
      <ModalContainer
        open={open}
        setOpen={setOpen}
        title="Registrar Saída"
        subtitle="Preencha as informações para registrar a saída."
        maxWidth="xl"
        actions={false}
      >
        <Box
          component="form"
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 0.08fr',
            gap: '1.5rem',
            gridTemplateAreas: `
              "ar ar ."
              ". . ."
            `,
          }}
        >
          <TextField
            required
            size="small"
            name="rg"
            label="Colaborador"
            variant="outlined"
            color="secondary"
            sx={{ gridArea: 'ar' }}
          />
          <TextField
            required
            size="small"
            name="Date"
            label="Data Marcada"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Teste equipments={''} />
        <Divider sx={{ marginBottom: '20px', marginTop: '20px' }} />
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
          <TextField
            required
            size="small"
            name="company"
            label="Tipo do equipamento"
            variant="outlined"
          />
          <TextField
            required
            size="small"
            name="visited"
            label="Modelo"
            variant="outlined"
            color="secondary"
          />
          <TextField
            required
            size="small"
            name="name"
            label="Observação"
            variant="outlined"
            color="secondary"
            sx={{ gridArea: 'br' }}
          />
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

import { Box, Button, TextField } from '@mui/material'
import CreateSelect from '../../../components/CreateSelect'

import { ModalContainer } from '../../../components/ModalContainer'

import { useModal } from '../../../shared/hooks/useModal'

export function CreateModal() {
  const { open, setOpen, closeModal } = useModal()

  return (
    <>
      {/* ModalContainer é um componente de modal */}
      <ModalContainer
        open={open}
        setOpen={setOpen}
        title="Criar agendamento"
        subtitle="Preencha as informações para criar um novo agendamento."
        maxWidth="xl"
        actions={false}
      >
        <Box
          component="form"
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: '1fr 0.08fr',
            gap: '1.5rem',
            gridTemplateAreas: `
              ". . ."
            `,
          }}
        >
          <TextField
            required
            size="small"
            name="Date"
            label="Data da Visita"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            required
            size="small"
            name="Hours"
            label="Hora da Visita"
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            required
            size="small"
            name="rg"
            label="RG"
            variant="outlined"
            color="secondary"
            type="number"
          />
        </Box>

        <Box
          component="form"
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
            gridTemplateAreas: `
              ". ."
              ". ."
              ". ."
              "br br"
              "ar ar"`,
          }}
        >
          <TextField
            required
            size="small"
            name="name"
            label="Nome"
            variant="outlined"
            color="secondary"
          />
          <TextField
            required
            size="small"
            name="company"
            label="Empresa"
            variant="outlined"
          />
          <TextField
            required
            size="small"
            name="visited"
            label="Quem vai ser visitado"
            variant="outlined"
            color="secondary"
          />
          {/* CreateSelect é um componente que exige duas propriedades:
          propriedade title altera o título da label
          propriedade option adiciona o array de strings das opções de select */}
          <CreateSelect
            title="Setor Visitado"
            option={[
              { name: 'Administração', value: 1 },
              { name: 'Departamento de P&D', value: 2 },
              { name: 'Recursos Humanos', value: 3 },
              { name: 'Outros', value: 4 },
            ]}
          />
          <CreateSelect
            title="Refeições"
            option={[
              { name: 'Café', value: 1 },
              { name: 'Almoço', value: 2 },
              { name: 'Jantar', value: 3 },
            ]}
          />
          <CreateSelect
            title="Pagamentos"
            option={[
              { name: 'Sim', value: 1 },
              { name: 'Não', value: 2 },
            ]}
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
              Salvar
            </Button>
          </Box>
        </Box>
      </ModalContainer>
    </>
  )
}

import { ChangeEvent, useState } from 'react'
import { Avatar, Box, Button, Divider, TextField } from '@mui/material'
// import { any } from '../../interfaces/visitant'
import { maxNumberInput } from '../../../../../shared/lib/maxNumberLength'
import PhotoModal from '../PhotoModal'

export function Visitant({
  changeNewVisitant,
  visitant,
  changePhotoNewVisitant,
}: any) {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleRemovePhoto = () => {
    changePhotoNewVisitant(null)
  }

  return (
    <>
      <PhotoModal
        handleClose={handleClose}
        open={open}
        changePhotoNewVisitant={changePhotoNewVisitant}
      />
      <Box
        sx={{
          marginTop: '2.5rem',
          display: 'grid',
          gridAutoColumns: '1fr',
          gridAutoRows: '1fr',
          gridTemplateColumns: '1fr 1fr ',
          gridTemplateRows: '1fr 1fr ',
          gap: '1.5rem',
          gridTemplateAreas: `
            ". ar "
            ". ."
            ". ."`,
        }}
      >
        <TextField
          required
          size="small"
          name="rg"
          label="RG"
          type="number"
          onChange={changeNewVisitant}
          value={visitant.rg}
          onInput={(event: ChangeEvent<HTMLInputElement>) =>
            maxNumberInput(event, 8)
          }
          InputProps={{
            inputProps: {
              min: 0,
            },
          }}
        />
        <TextField
          required
          size="small"
          name="name"
          label="Nome"
          sx={{ gridArea: 'ar' }}
          onChange={changeNewVisitant}
          value={visitant.name}
        />
        <TextField
          required
          size="small"
          name="company"
          label="Empresa"
          value={visitant.company}
          onChange={changeNewVisitant} // criando valores de forma dinamica dentro objeto (o estado de registration)
        />

        <TextField
          required
          size="small"
          name="departmentVisited"
          label="Setor visitado"
          onChange={changeNewVisitant}
          value={visitant.departmentVisited}
        />

        <TextField
          required
          size="small"
          name="visitedPerson"
          label="Quem foi visitado"
          onChange={changeNewVisitant}
          value={visitant.visitedPerson}
          color="secondary"
        />
        <TextField
          required
          size="small"
          name="badge"
          label="Crachá"
          onChange={changeNewVisitant}
          value={visitant.badge}
        />
      </Box>
      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'center',
          border: '1px solid #9A9A9A',
          borderRadius: '4px',
        }}
      >
        <Avatar
          sx={{
            m: 1,
            height: '80px',
            width: '80px',
          }}
          alt="Remy Sharp"
          src={visitant.photo || undefined}
        />
        <Button sx={{ m: 1 }} variant="contained" onClick={handleClickOpen}>
          TIRAR FOTO
        </Button>
        <Button
          sx={{ m: 1 }}
          variant="outlined"
          type="button"
          onClick={handleRemovePhoto}
        >
          Remover
        </Button>
      </Box>
    </>
  )
}

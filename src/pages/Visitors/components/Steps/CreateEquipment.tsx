import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'
import { ChangeEvent, useState, KeyboardEvent } from 'react'
import { EquipmentDataProps, EquipmentProps } from '../../interfaces/equipment'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Add } from '@mui/icons-material'

export function Equipment({
  equipments,
  handleModifyEquipments,
}: EquipmentProps) {
  const [equipmentData, setEquipmentData] = useState<EquipmentDataProps>(
    {} as EquipmentDataProps,
  )

  const handleChangeSelectNewEquipmentData = (
    event: SelectChangeEvent<string>,
  ) => {
    setEquipmentData((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }))
  }

  const handleChangeEquipmentData = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value =
      name === 'isEquipment'
        ? event.target.checked
        : event.target.value.trimStart().toUpperCase()

    setEquipmentData((state) => ({
      ...state,
      [name]: value,
    }))
  }

  const clearEquipmentData = () => {
    setEquipmentData({
      brand: '',
      equipmentType: '',
      isEquipment: true,
      justification: '',
      seals: [],
      seal: {
        numbering: '',
      },
    })
  }

  const handleChangeSeal = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const { value } = event.target
    const copyEquipments = [...equipments]
    const copyEquipament = copyEquipments[index]
    copyEquipments[index] = {
      ...copyEquipament,
      seal: {
        numbering: value,
      },
    }
    handleModifyEquipments(copyEquipments)
  }

  const handleAddSeal = (index: number) => {
    const copyEquipments = [...equipments]
    const copyEquipament = copyEquipments[index]
    const copyEquipamentSeal = copyEquipament.seal

    const isExistSeal = copyEquipament.seals.find(
      (item) => item.numbering === copyEquipamentSeal.numbering,
    )
    if (!isExistSeal) {
      copyEquipments[index] = {
        ...copyEquipament,
        seals: [...copyEquipament.seals, copyEquipamentSeal],
        seal: {
          numbering: '',
        },
      }
      handleModifyEquipments(copyEquipments)
    }
  }

  const handleDeleteCurrentSeal = (index: number, seal: string) => {
    const copyEquipments = [...equipments]
    const copyEquipament = copyEquipments[index]
    const filteredSeal = copyEquipament.seals.filter(
      (item) => item.numbering !== seal,
    )
    copyEquipments[index] = {
      ...copyEquipament,
      seals: filteredSeal,
    }
    handleModifyEquipments(copyEquipments)
  }

  const handleAddEquipment = () => {
    const newEquipment = {
      ...equipmentData,
      seals: [],
    }

    const newEquipments = [...equipments, newEquipment]
    handleModifyEquipments(newEquipments)
    clearEquipmentData()
  }

  const handleDeleteCurrentEquipment = (index: number) => {
    const newEquipments = equipments.filter((item, i) => i !== index)
    handleModifyEquipments(newEquipments)
  }

  function handleAddSealsByEnter(
    event: KeyboardEvent<HTMLDivElement>,
    index: number,
  ) {
    if (event.key === 'Enter') {
      handleAddSeal(index)
    }
  }

  const isEmpty = !(
    equipmentData.justification?.length &&
    equipmentData.equipmentType?.length &&
    equipmentData.brand?.length
  )

  return (
    <>
      <Box
        sx={{
          marginTop: '1.5rem',
          display: 'grid',
          gridAutoColumns: '1fr',
          gridAutoRows: '1fr',
          gridTemplateColumns: '1fr 1fr 1fr ',
          gridTemplateRows: '1fr',
          gap: 2,
        }}
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                name="isEquipment"
                checked={equipmentData.isEquipment}
                onChange={handleChangeEquipmentData}
              />
            }
            label="Possui equipamento"
          />
        </FormGroup>
      </Box>
      <Box
        sx={{
          marginTop: '1rem',
          display: 'grid',
          gridAutoColumns: '1fr',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr',
          gap: '1.5rem',
          gridTemplateAreas: `
              "ar ar ar"`,
        }}
      >
        <TextField
          required={!equipments.length}
          size="small"
          name="justification"
          label="Justificativa da entrada"
          value={equipmentData.justification}
          disabled={!equipmentData.isEquipment}
          sx={{ gridArea: 'ar' }}
          onChange={handleChangeEquipmentData}
        />
      </Box>
      <Divider sx={{ marginTop: 2, marginBotton: 2 }} />
      <Typography variant="subtitle1" sx={{ marginTop: 2, fontWeight: 450 }}>
        Dados do equipamento
      </Typography>
      <Box
        sx={{
          marginTop: 2,

          display: 'grid',
          gridAutoColumns: '1fr',
          gridAutoRows: '1fr',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr',
          gap: '1.5rem',
          gridTemplateAreas: `
          ". . "`,
        }}
        gap={1}
      >
        <FormControl size="small">
          <InputLabel>Tipo de equipamento</InputLabel>

          <Select
            size="small"
            labelId="equipmentType"
            name="equipmentType"
            label="Tipo do equipamento"
            onChange={handleChangeSelectNewEquipmentData}
            value={equipmentData.equipmentType}
            disabled={!equipmentData.isEquipment}
          >
            <MenuItem value="Notebook">Notebook</MenuItem>
            <MenuItem value="Celular">Celular</MenuItem>
            <MenuItem value="Camera">Camera</MenuItem>
          </Select>
        </FormControl>

        <TextField
          required={!equipments.length} // lógica para requerir campo somente quando
          // o tamanho do array diferente de 0 (! = negação))
          size="small"
          name="brand"
          label="Marca/Identificador"
          value={equipmentData.brand}
          onChange={handleChangeEquipmentData}
          disabled={!equipmentData.isEquipment}
        />
      </Box>
      <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          disabled={isEmpty}
          variant="contained"
          type="button"
          onClick={handleAddEquipment}
        >
          Adicionar equipamento
        </Button>
      </Box>
      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      <Typography variant="subtitle1" sx={{ marginTop: 2, fontWeight: 450 }}>
        Lista de Equipamentos
      </Typography>

      {equipments.length > 0 &&
        equipments.map((item, index) => (
          <Box
            key={'equip_item_' + index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 3,
              marginTop: '2rem',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <IconButton onClick={() => handleDeleteCurrentEquipment(index)}>
                <DeleteOutlineIcon color="secondary" />
              </IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <span>
                  {item.equipmentType} - {item.brand}
                </span>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: 'auto',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  listStyle: 'none',
                  gap: 2,
                  p: 0.5,
                  m: 0,
                }}
                component="ul"
              >
                {item.seals.length > 0 &&
                  item.seals.map((element) => (
                    <Chip
                      key={'seal' + index}
                      onDelete={() =>
                        handleDeleteCurrentSeal(index, element.numbering)
                      }
                      label={element.numbering}
                    />
                  ))}
              </Box>

              <OutlinedInput
                required={!item.seals.length}
                size="small"
                placeholder="Digite o lacre"
                type="text"
                value={item?.seal?.numbering}
                onChange={(event) => handleChangeSeal(event, index)}
                onKeyPress={(event) => handleAddSealsByEnter(event, index)}
                autoFocus
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle add"
                      edge="end"
                      onClick={() => handleAddSeal(index)}
                      disabled={!item?.seal?.numbering}
                    >
                      <Add />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Box>
          </Box>
        ))}

      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
    </>
  )
}

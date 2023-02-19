import * as React from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

import { TextField } from '@mui/material'

interface EquipmentsStepProps {
  equipments: string
}

export function Teste({ equipments }: EquipmentsStepProps) {
  const [asEquipment, setAsEquipment] = React.useState(false)

  return (
    <>
      Sem Equipamento
      <FormControlLabel
        sx={{ marginLeft: '10px' }}
        control={
          <Switch
            checked={asEquipment}
            onChange={(e) => setAsEquipment(e.target.checked)}
            color="primary"
            value="dynamic-class-name"
          />
        }
        label="Com Equipamento"
      />
      <TextField
        size="small"
        name="entryJustification"
        label="Data Prevista do Retorno"
        value={equipments}
        disabled={!asEquipment}
        sx={{ gridArea: 'ar' }}
      />
    </>
  )
}

import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import { VehicleProps } from '../../interfaces/vehicle'

export function Vehicle({ changeNewVehicleData, vehicleData }: VehicleProps) {
  return (
    <>
      <Box
        sx={{
          marginTop: '1.5rem',
          display: 'grid',
          gridAutoColumns: '1fr',
          gridAutoRows: '1fr',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gridTemplateRows: '1fr',
          gap: 2,
        }}
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                name="isVehicle"
                checked={vehicleData.isVehicle}
                onChange={changeNewVehicleData}
              />
            }
            label="Possui veículo"
          />
        </FormGroup>
      </Box>

      <Box
        sx={{
          marginTop: '1.5rem',
          display: 'grid',
          gridAutoColumns: '1fr',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr',
          gap: '1.5rem',
          gridTemplateAreas: `
            ". ."
            ". . "
            "ar ar"`,
        }}
      >
        <TextField
          required
          size="small"
          name="plateVehicle"
          label="Placa do carro"
          onChange={changeNewVehicleData}
          value={vehicleData.plateVehicle}
          inputProps={{ maxLength: 7 }}
          disabled={!vehicleData.isVehicle}
        />

        <TextField
          required
          size="small"
          name="plateTruck"
          label="Placa da carreta"
          onChange={changeNewVehicleData}
          value={vehicleData.plateTruck}
          inputProps={{ maxLength: 7 }}
          disabled={!vehicleData.isVehicle}
        />

        <TextField
          required
          size="small"
          name="carBrand"
          label="Marca do veículo"
          onChange={changeNewVehicleData}
          value={vehicleData.carBrand}
          disabled={!vehicleData.isVehicle}
        />
        <TextField
          required
          size="small"
          name="color"
          label="Cor do veículo"
          onChange={changeNewVehicleData}
          value={vehicleData.color}
          disabled={!vehicleData.isVehicle}
        />
        <TextField
          required
          size="small"
          name="provider"
          label="Fornecedor"
          onChange={changeNewVehicleData}
          value={vehicleData.provider}
          disabled={!vehicleData.isVehicle}
        />
        <TextField
          required
          size="small"
          name="shippingCompany"
          label="Transportadora"
          onChange={changeNewVehicleData}
          value={vehicleData.shippingCompany}
          disabled={!vehicleData.isVehicle}
        />
      </Box>

      <Box
        sx={{
          marginTop: '1.0rem',
          display: 'flex',
          justifyContent: 'flex-start',
          gridArea: ' ',
          gap: 1,
        }}
      >
        <FormControl
          sx={{
            display: 'inlineFlex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 2,
          }}
          disabled={!vehicleData.isVehicle}
          required
        >
          <FormLabel id="area-label" color="secondary">
            Finalidade da entrada
          </FormLabel>

          <RadioGroup
            row
            aria-labelledby="area-label"
            name="justification"
            onChange={changeNewVehicleData}
            value={vehicleData.willEnter}
          >
            <FormControlLabel
              value="coleta"
              control={
                <Radio
                  sx={{
                    '& .MuiSvgIcon-root': {
                      fontSize: 16,
                    },
                  }}
                />
              }
              label="Coleta"
            />
            <FormControlLabel
              value="devolucao"
              control={
                <Radio
                  sx={{
                    '& .MuiSvgIcon-root': {
                      fontSize: 16,
                    },
                  }}
                />
              }
              label="Devolução"
            />
            <FormControlLabel
              value="entrega"
              control={
                <Radio
                  sx={{
                    '& .MuiSvgIcon-root': {
                      fontSize: 16,
                    },
                  }}
                />
              }
              label="Entrega"
            />
            <FormControlLabel
              value="outros"
              control={
                <Radio
                  sx={{
                    '& .MuiSvgIcon-root': {
                      fontSize: 16,
                    },
                  }}
                />
              }
              label="Outros"
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </>
    // <Box
    // sx={{
    //   marginTop: '1.5rem',
    //   display: 'grid',
    //   gridAutoColumns: '1fr',
    //   gridAutoRows: '1fr',
    //   gridTemplateColumns: '1fr 1fr 1fr ',
    //   gridTemplateRows: '1fr',
    //   gap: 2,
    // }}
    // >
    //   <TextField
    //     required
    //     size="small"
    //     name="plateVehicle"
    //     label="Placa do carro"
    //     onChange={changeNewVehicleData}
    //     value={vehicleData.plateVehicle}
    //     onInput={(event: ChangeEvent<HTMLInputElement>) =>
    //       maxNumberInput(event, 7)
    //     }
    //     sx={{ gridArea: 'ac', maxWidth: '112px' }}
    //   />
    //   <TextField
    //     required
    //     size="small"
    //     name="plateTruck"
    //     label="Placa da carreta"
    //     onChange={changeNewVehicleData}
    //     value={vehicleData.plateTruck}
    //     onInput={(event: ChangeEvent<HTMLInputElement>) =>
    //       maxNumberInput(event, 7)
    //     }
    //     sx={{ gridArea: 'ae' }}
    //   />
    //   <Box sx={{ display: 'flex', gap: '1.5rem' }}>
    //     <TextField
    //       required
    //       size="small"
    //       name="carBrand"
    //       label="Marca do veículo"
    //       type="number"
    //       onChange={changeNewVehicleData}
    //       value={vehicleData.carBrand}
    //     />
    //     <TextField
    //       size="small"
    //       name="color"
    //       label="Cor do veículo"
    //       onChange={changeNewVehicleData}
    //       value={vehicleData.color}
    //     />
    //   </Box>

    //   <TextField
    //     required
    //     size="small"
    //     name="provider"
    //     label="Fornecedor"
    //     onChange={changeNewVehicleData}
    //     value={vehicleData.provider}
    //   />
    //   <TextField
    //     required
    //     size="small"
    //     name="shippingCompany"
    //     label="Transportadora"
    //     onChange={changeNewVehicleData}
    //     value={vehicleData.shippingCompany}
    //   />

    // </Box>
  )
}

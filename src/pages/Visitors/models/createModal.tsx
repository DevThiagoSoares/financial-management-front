import { ChangeEvent, FormEvent, useState } from 'react'
import { ModalContainer } from '../../../components/ModalContainer'
import { Box, Button, Step, StepLabel, Stepper } from '@mui/material'
import { useModal } from '../../../shared/hooks/useModal'
import { useToast } from '../../../shared/hooks/useToast'
import { EquipmentDataProps } from '../interfaces/equipment'
import { createVisitor } from '../../../services/visitors'
import { VehicleDataProps } from '../interfaces/vehicle'
import { Equipment } from '../components/Steps/CreateEquipment'
import { Vehicle } from '../components/Steps/CreateVehicle'
import { Visitant } from '../components/Steps/CreateVisitant'
import { UpdateVisitorsListProps, VisitantProps } from '../interfaces/visitant'

const steps = ['Visitante', 'Equipamento', 'Veículo']

export function CreateVisitorsModal({
  updateVisitorsList,
}: UpdateVisitorsListProps) {
  const [visitant, setVisitant] = useState<VisitantProps>({} as VisitantProps)
  const [equipments, setEquipments] = useState<EquipmentDataProps[]>([])
  const [vehicleData, setVehicleData] = useState<VehicleDataProps>(
    {} as VehicleDataProps,
  )
  const [activeStep, setActiveStep] = useState(0)

  const { open, closeModal, setOpen } = useModal()
  const { actionToast } = useToast()

  const handleModifyEquipments = (equipments: EquipmentDataProps[]) => {
    setEquipments(equipments)
  }

  const changeNewVisitant = (event: ChangeEvent<HTMLInputElement>) => {
    setVisitant((state) => ({
      ...state,
      [event.target.name]: event.target.value.trimStart().toUpperCase(),
    }))
  }

  const changePhotoNewVisitant = (photo: string | null) => {
    setVisitant((state) => ({ ...state, photo }))
  }

  const changeNewVehiclesData = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value =
      name === 'isVehicle'
        ? event.target.checked
        : event.target.value.trimStart().toUpperCase()

    setVehicleData((state) => ({
      ...state,
      [name]: value,
    }))
  }
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  const handleCreateNewVisitor = async (event: FormEvent) => {
    event.preventDefault()

    if (activeStep === 2) {
      try {
        const response = await createVisitor(visitant, equipments, vehicleData)

        if (response.status === 201) {
          handleFinish()
          actionToast({
            message: 'Visitante cadastrado com sucesso',
            type: 'success',
          })
          updateVisitorsList()
        }
      } catch (error: any) {
        if (!error?.response?.data.message) {
          actionToast({ message: 'Internal server error', type: 'error' })
        }
        if (error?.response?.data) {
          actionToast({
            message: error.response.data.message[0],
            type: 'error',
          })
        }
      }
    } else {
      handleNext()
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleFinish = () => {
    setVisitant({} as VisitantProps)
    setEquipments([])
    setVehicleData({} as VehicleDataProps)
    setActiveStep(0)
    closeModal()
  }

  return (
    <>
      <ModalContainer
        open={open}
        setOpen={setOpen}
        title="Cadastrar visita"
        subtitle="Preencha as informações para cadastrar uma nova visita."
        actions={false}
        maxWidth="md"
      >
        <Box
          onSubmit={handleCreateNewVisitor}
          component="form"
          sx={{ width: '100%', minWidth: '800px' }}
        >
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {}

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              )
            })}
          </Stepper>
          {activeStep === 0 && (
            <Visitant
              visitant={visitant}
              changeNewVisitant={changeNewVisitant}
              changePhotoNewVisitant={changePhotoNewVisitant}
            />
          )}
          {activeStep === 1 && (
            <Equipment
              equipments={equipments}
              handleModifyEquipments={handleModifyEquipments}
            />
          )}
          {activeStep === 2 && (
            <Vehicle
              vehicleData={vehicleData}
              changeNewVehicleData={changeNewVehiclesData}
            />
          )}

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: '2rem' }}>
            <Button onClick={handleFinish} sx={{ mr: 1 }}>
              Cancelar
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {activeStep > 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                voltar
              </Button>
            )}
            <Button variant="contained" type="submit">
              {activeStep === steps.length - 1 ? 'Salvar' : 'Continuar'}
            </Button>
          </Box>
        </Box>
      </ModalContainer>
    </>
  )
}

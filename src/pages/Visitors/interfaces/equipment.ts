export interface Seal {
  numbering: string
}

export interface EquipmentDataProps {
  justification: string
  equipmentType: string
  brand: string
  seals: Seal[]
  isEquipment: boolean
  seal: Seal
}

export interface EquipmentProps {
  equipments: EquipmentDataProps[]
  handleModifyEquipments: (equipments: EquipmentDataProps[]) => void
}

import { EquipmentProps } from "./equipment";
import { AddressDataProps } from "./vehicle";
import { LoanProps } from "./visitant";

export interface PersonalDataProps {
  id: string;
  name: string;
  fone: string;
  address: AddressDataProps;
  loan: LoanProps[];
}

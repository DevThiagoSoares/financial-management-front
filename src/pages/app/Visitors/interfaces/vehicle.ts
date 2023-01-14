import { ChangeEvent } from "react";

export interface AddressDataProps {
  id: string;
  street: string;
  district: string;
  number: string;
  city: string;
  clientId: string;
}

export interface AddressProps {
  changeNewAddressData: (event: ChangeEvent<HTMLInputElement>) => void;
  addressData: AddressDataProps;
}

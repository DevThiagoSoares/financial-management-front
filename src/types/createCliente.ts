export interface ICreateCliente {
  name: string;
  fone: string;
  street: string;
  district: string;
  number: string;
  city: string;
  loan: number;
}
export interface ICreateClientePost {
  name: string;
  fone: string;
  address: {
    street: string;
    district: string;
    number: string;
    city: string;
  };
  loan: Iloan[];
}

export interface Iloan {
  value_loan: number;
}

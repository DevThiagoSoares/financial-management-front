export interface ISignUp {
  name: string;
  login: string;
  password: string;
  confirmPassword?: string;
  isAdm?: boolean;
}
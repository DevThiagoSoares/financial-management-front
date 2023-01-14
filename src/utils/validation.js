import * as z from "zod";

export const loginSchema = z.object({
  login: z
    .string({ required_error: "Requerido" })
    .email({ message: "E-mail inválido" }),
  password: z
    .string({ required_error: "Requerido" })
    .regex(
      new RegExp(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/),
      {
        message:
          "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número ou caractere especial",
      }
    ),
});

export const signUpSchema = z.object({
  name: z.string({ required_error: "Requerido" }),
  login: z
    .string({ required_error: "Requerido" })
    .email({ message: "E-mail inválido" }),
  password: z
    .string({ required_error: "Requerido" })
    .regex(
      new RegExp(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/),
      {
        message:
          "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número ou caractere especial",
      }
    ),
  confirmPassword: z
    .string({ required_error: "Requerido" })
    .regex(
      new RegExp(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/),
      {
        message:
          "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número ou caractere especial",
      }
    ),
  isAdmin: z.boolean().default(false),
});

export const createClientSchema = z.object({
  name: z.string({ required_error: "Requerido" }),
  fone: z
    .string({ required_error: "Requerido" })
    .min(10, { message: "O telefone deve conter no minimo 10 dígitos" })
    .max(11, { message: "O telefone deve conter no máximo 11 dígitos" }),
  street: z.string({ required_error: "Requerido" }),
  district: z.string({ required_error: "Requerido" }),
  number: z.string({ required_error: "Requerido" }),
  city: z.string({ required_error: "Requerido" }),
  loan: z
    .string({ required_error: "Requerido" })
    .regex(new RegExp(/^[0-9]+$/), {
      message: "O empréstimo deve conter apenas números",
    }),
});

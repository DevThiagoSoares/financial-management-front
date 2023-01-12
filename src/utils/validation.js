import * as z from 'zod';

export const loginSchema = z.object({
  login: z.string({required_error: "Requerido"}).email({ message: 'E-mail inválido' }),
  password: z.string({required_error: "Requerido"}).regex(new RegExp(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/), {
    message: 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número ou caractere especial',
}),
});

export const signUpSchema = z.object({
  name: z.string({required_error: "Requerido"}),
  login: z.string({required_error: "Requerido"}).email({ message: 'E-mail inválido' }),
  password: z.string({required_error: "Requerido"}).regex(new RegExp(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/), {
    message: 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número ou caractere especial',
}),
  confirmPassword:  z.string({required_error: "Requerido"}).regex(new RegExp(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/), {
    message: 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número ou caractere especial',
}),
  isAdmin: z.boolean().default(false)
  
});

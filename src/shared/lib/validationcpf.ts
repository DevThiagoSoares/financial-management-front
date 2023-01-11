export function validationCpf(cpf: Number) {
  let cpfA = cpf.toString()
  cpfA = cpfA.replace(/\D/g, '')
  cpfA = cpfA.replace(/(\d{3})(\d)/, '$1.$2')
  cpfA = cpfA.replace(/(\d{3})(\d)/, '$1.$2')
  cpfA = cpfA.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  return cpfA
}

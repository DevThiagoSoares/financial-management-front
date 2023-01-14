import { ChangeEvent } from 'react'

export const maxNumberInput = (
  event: ChangeEvent<HTMLInputElement>,
  maxLength: number,
) => {
  return (event.target.value = event.target.value.slice(0, maxLength))
}

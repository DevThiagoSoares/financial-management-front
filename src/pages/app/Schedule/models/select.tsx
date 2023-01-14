import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

interface DataProps {
  value: number | string
  label: string
}

interface CreateSelectProps {
  title: string
  data: DataProps[]
}

export default function SelectFood({ title, data }: CreateSelectProps) {
  const [age, setAge] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value)
  }

  const array = ['Café', 'arroz', 'lorena']

  const NewArray = array.map((item: string) => (
    <MenuItem key={item}>{item}</MenuItem>
  ))

  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">{title}</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={age}
        label={title}
        onChange={handleChange}
      >
        {NewArray}
      </Select>
    </FormControl>
  )
}

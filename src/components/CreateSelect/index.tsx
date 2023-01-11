import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useState } from 'react'

interface OptionsProps {
  name: string
  value: number
}

interface CreateSelectProps {
  title: string
  option: OptionsProps[]
}

export default function CreateSelect({ title, option }: CreateSelectProps) {
  const [selected, setSelected] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value)
  }

  // const array = ['Café', 'arroz', 'lorena']
  // {option.map((item: string) => (
  //    <MenuItem key={item}>{item}</MenuItem>
  //  ))}
  const NewArray = option.map((item) => (
    <MenuItem key={item.value} value={item.value}>
      {item.name}
    </MenuItem>
  ))

  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">{title}</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={selected}
        label={title}
        onChange={handleChange}
      >
        {NewArray}
      </Select>
    </FormControl>
  )
}

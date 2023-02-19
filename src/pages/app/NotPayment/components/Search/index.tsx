import SearchIcon from '@mui/icons-material/Search'
import {
  IconButton,
  FormControl,
  InputAdornment,
  TextField,
} from '@mui/material'

export function Search() {
  return (
    <>
      <FormControl size="small"></FormControl>
      <TextField
        color="secondary"
        variant="outlined"
        label="Pesquisar Equipamentos"
        placeholder=""
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="delete">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  )
}

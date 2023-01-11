import { createTheme } from '@mui/material'

export const colors = {
  background_dark: '#F9F9F9',
  background_base: '#FFFFFF',
  primary_light: '#5E839C',
  primary_dark: '#123650',
  primary_lightest: '#D4E2ED',
  primary_base: '#284B63',
  primary_darkest: '#042033',
  secondary_lightest: '#FF9999',
  secondary_light: '#FF4D5B',
  secondary_dark: '#B3000E',
  secondary_base: '#DC0032',
  secondary_darkest: '#660000',
  neutral_light: '#DDDDDD',
  neutral_dark: '#565656',
  neutral_lightest: '#EFEFEF',
  neutral_base: '#9A9A9A',
  neutral_darkest: '#2B2B2B',
}

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: colors.primary_base,
      contrastText: colors.background_base,
    },
    secondary: {
      main: colors.neutral_dark,
      contrastText: colors.background_base,
    },
    background: {
      default: colors.background_dark,
      paper: colors.background_base,
    },
  },
})

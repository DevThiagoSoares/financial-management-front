import * as React from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList/'
import TabPanel from '@mui/lab/TabPanel'

export function TabModal() {
  const [value, setValue] = React.useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <>
      <Box minWidth={'600px'} sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderColor: 'Background' }}>
            <TabList
              TabIndicatorProps={{
                hidden: true,
              }}
              onChange={handleChange}
              sx={{
                '& button': { borderRadius: 1 },
                '& button:hover': { backgroundColor: '#F9F9F9' },
                '& button:active': { backgroundColor: '#00000029' },
                '& button.Mui-selected': {
                  backgroundColor: '#284B63',
                  color: '#fff',
                },
              }}
            >
              <Tab label="Itens" value="1" />
              <Tab label="Saída" value="2" />
            </TabList>
          </Box>

          <TabPanel value="1">camera - nikkon - quant 2</TabPanel>
          <TabPanel value="2">
            Saída: 20/07/2020 16:30 / Equipamentos: celular (note10), celular
            (note 10)
          </TabPanel>
        </TabContext>
      </Box>
    </>
  )
}

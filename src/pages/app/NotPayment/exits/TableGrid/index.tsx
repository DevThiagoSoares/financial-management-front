import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import DevicesIcon from '@mui/icons-material/Devices'
import PrintIcon from '@mui/icons-material/Print'
import { table, tableContainer } from './styles'
import { Box } from '@mui/system'
import { Button, IconButton } from '@mui/material'

interface TableGridProps {
  rows: any[]
  columns: GridColDef[]
}

export function TableGrid({ rows, columns }: TableGridProps) {
  const actionColumn: GridColDef[] = [
    {
      field: 'menu',
      headerName: ' ',
      type: 'string',
      align: 'right',
      renderCell: () => (
        <>
          <Box sx={{ mx: 'auto', width: '100' }}>
            <IconButton>
              <DevicesIcon color="secondary" />
            </IconButton>
            <IconButton>
              <PrintIcon color="secondary" />
            </IconButton>
            <Button sx={{ border: 1 }}>registrar retorno</Button>
          </Box>
        </>
      ),
    },
  ]

  columns = [...columns, ...actionColumn]
  return (
    <Box sx={tableContainer}>
      <DataGrid
        rows={rows}
        pageSize={12}
        rowsPerPageOptions={[]}
        disableColumnMenu
        columns={columns.map((column: GridColDef) => ({
          ...column,
          flex: 1,
          sortable: false,
          headerClassName: 'super-app-theme--header',
        }))}
        sx={table}
      />
    </Box>
  )
}

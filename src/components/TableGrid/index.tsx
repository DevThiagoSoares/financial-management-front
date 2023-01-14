import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { table, tableContainer } from './styles'
import { Box } from '@mui/system'
import { IconButton } from '@mui/material'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop'

interface TableGridProps {
  rows: any[]
  columns: GridColDef[]
  handlePrinter?: (row: any) => void
  handleDelete?: (row: any) => void
  handleEdit?: (row: any) => void
}

export function TableGrid({
  rows,
  columns,
  handlePrinter,
  handleDelete,
  handleEdit,
}: TableGridProps) {
  const actionColumn: GridColDef[] = [
    {
      field: 'menu',
      headerName: ' ',
      type: 'string',
      align: 'right',
      renderCell: ({ row }) => (
        <>
          {handlePrinter && (
            <IconButton onClick={() => handlePrinter(row)}>
              <LocalPrintshopIcon color="primary" />
            </IconButton>
          )}
          {handleDelete && (
            <IconButton onClick={() => handleDelete(row)}>
              <DeleteIcon color="primary" />
            </IconButton>
          )}
          {handleEdit && (
            <IconButton onClick={() => handleEdit(row)}>
              <EditIcon color="primary" />
            </IconButton>
          )}
        </>
      ),
    },
  ]

  columns = [...columns, ...actionColumn]
  return (
    <Box sx={tableContainer}>
      <DataGrid
        getRowId={(row) => row.id}
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

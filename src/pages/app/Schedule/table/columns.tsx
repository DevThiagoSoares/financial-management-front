import { GridColDef } from '@mui/x-data-grid'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

export const columns: GridColDef[] = [
  {
    headerName: 'ID do agendamento',
    field: 'idShedule',
    renderCell: (params) => (
      <>
        {params.value}
        <ContentCopyIcon
          color="primary"
          sx={{
            marginLeft: 1.4,
          }}
        />
      </>
    ),
  },
  {
    field: 'data',
    headerName: 'Data da visita',
  },
  {
    field: 'Hora',
    headerName: 'Hora da visita',
  },
  {
    field: 'RG',
    headerName: 'RG',
  },
  {
    field: 'Nome',
    headerName: 'Nome',
  },
  {
    field: 'Empresa',
    headerName: 'Empresa',
  },
  {
    field: 'Setor',
    headerName: 'Setor  visitado',
  },
  {
    field: 'visitado',
    headerName: 'Quem vai ser visitado',
  },
  {
    field: 'Refeição',
    headerName: 'Refeição',
  },
  {
    field: 'Pagamento',
    headerName: 'Pagamento',
  },
]

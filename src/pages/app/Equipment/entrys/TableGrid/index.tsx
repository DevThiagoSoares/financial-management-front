import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DevicesIcon from "@mui/icons-material/Devices";
import PrintIcon from "@mui/icons-material/Print";
import { table, tableContainer } from "./styles";
import { Box } from "@mui/system";
import { Button, IconButton } from "@mui/material";

interface TableGridProps {
  rows: any[];
  columns: GridColDef[];
  exit: () => void;
  view: () => void;
  print: () => void;
}

export function TableGrid({
  rows,
  columns,
  exit,
  view,
  print,
}: TableGridProps) {
  const actionColumn: GridColDef[] = [
    {
      field: "menu",
      headerName: " ",
      type: "string",
      align: "right",
      renderCell: (row: any) => (
        <>
          <Box sx={{ mx: "auto", width: "100" }}>
            {/* <IconButton>
              <DevicesIcon color="secondary" onClick={view} />
            </IconButton>
            <IconButton>
              <PrintIcon color="secondary" onClick={print} />
            </IconButton> */}
            <Button onClick={exit} sx={{ border: 1 }}>
              REGISTRO DE PAGAMENTO
            </Button>
          </Box>
        </>
      ),
    },
  ];

  columns = [...columns, ...actionColumn];
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
          headerClassName: "super-app-theme--header",
        }))}
        sx={table}
      />
    </Box>
  );
}

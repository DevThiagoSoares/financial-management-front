import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Nome",
  },
  {
    field: "fone",
    headerName: "Telefone",
  },
  {
    field: "street",
    headerName: "Rua",
  },
  {
    field: "district",
    headerName: "Bairro",
  },
  {
    field: "number",
    headerName: "N°",
  },
  {
    field: "city",
    headerName: "Cidade",
  },
  {
    field: "loan",
    headerName: "Valor Emprestado",
  },
];

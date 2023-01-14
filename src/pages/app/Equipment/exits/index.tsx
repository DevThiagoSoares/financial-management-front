import { Avatar, Box, Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

import { Search } from "../components/Search";
import { TableGrid } from "./TableGrid";
import { ExitProps } from "../interfaces/exists";

export function Exits() {
  const [rows, setRows] = useState<ExitProps[]>([]);

  const responseData: ExitProps[] = [
    {
      id: "1",
      name: "Adriane Lavareda de Almeida",
      register: "20/07/2022 15:14",
      forecastReturn: "-",
      sectorVisited: "-",
      foto: "https://mui.com/static/images/avatar/7.jpg",
    },
    {
      id: "2",
      name: "Adriano Pinto de Souza",
      register: "20/07/2022 15:14",
      forecastReturn: "-",
      sectorVisited: "-",
      foto: "https://mui.com/static/images/avatar/6.jpg",
    },
    {
      id: "3",
      name: "Adriane Lavareda de Almeida",
      register: "20/07/2022 15:14",
      forecastReturn: "20/07/2022",
      sectorVisited: "20/07/2022",
      foto: "https://mui.com/static/images/avatar/4.jpg",
    },
    {
      id: "4",
      name: "Joelma de Souza Gemaque",
      register: "20/07/2022 15:14",
      forecastReturn: "-",
      sectorVisited: "-",
      foto: "https://mui.com/static/images/avatar/3.jpg",
    },
    {
      id: "5",
      name: "Vivian Zaira Nascimento",
      register: "20/07/2022 15:14",
      forecastReturn: "20/07/2022",
      sectorVisited: "-",
      foto: "https://mui.com/static/images/avatar/2.jpg",
    },
  ];

  const columns: GridColDef[] = [
    {
      headerName: "Foto",
      field: "foto",
      renderCell: (params) => (
        <>
          <Avatar src={params.value} />
        </>
      ),
    },
    {
      field: "name",
      headerName: "Nome",
    },
    {
      field: "register",
      headerName: "Data/hora saída",
    },
    {
      field: "forecastReturn",
      headerName: "Data prevista do retorno",
    },
    {
      field: "sectorVisited",
      headerName: "Data real do retorno",
    },
  ];

  useEffect(() => {
    setRows(responseData);
  }, []);
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Search />
        <Button variant="contained" sx={{ marginLeft: "8px" }}>
          REGISTRAR SAÍDA DE EQUIPAMENTO
        </Button>
      </Box>
      <br />
      <TableGrid rows={rows} columns={columns} />
    </>
  );
}

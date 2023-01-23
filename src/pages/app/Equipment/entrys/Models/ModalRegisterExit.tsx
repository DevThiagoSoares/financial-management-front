import { Token } from "@mui/icons-material";
import { Box, Button, Divider, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { log } from "console";
import { useEffect, useState } from "react";
import { ModalContainer } from "../../../../../components/ModalContainer";
import { getClient } from "../../../../../services/client";
import { useModal } from "../../../../../shared/hooks/useModal";
import { table, tableContainer } from "../../exits/TableGrid/styles";
import { TableGrid } from "../TableGrid";
import { Teste } from "./teste";

interface LoanProps {
  clientId: string;
  createdAt: Date;
  dueDate?: Date;
  id: string;
  interest_rate: number;
  payment?: [];
  payment_settled: boolean;
  rest_loan: number;
  startDate: Date;
  updatedAt?: Date;
  value_loan: number;
}

export function ModalRegisterExit({
  token,
  id,
}: {
  token: string;
  id: string;
}) {
  const { open, setOpen, closeModal } = useModal();
  const [rows, setRows] = useState<LoanProps[]>([]);

  useEffect(() => {
    async function data() {
      const response = await getClient(token, id);
      setRows(response?.data?.loan);
    }
    data();
    console.log(rows);
  }, [id]);

  const columns: GridColDef[] = [
    {
      field: "interest_rate",
      headerName: "Taxa de Juros",
      width: 100,
      align: "center",
      renderCell: (params) => {
        return params.value + "%";
      },
    },
    {
      field: "value_loan",
      headerName: "Valor do Empréstimo",
      width: 100,
      align: "center",
      renderCell: (param) => {
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(param.value);
      },
    },
    // {
    //   field: "rest_loan",
    //   headerName: "Valor Restante",
    //   width: 100,
    // align: "center",
    //   renderCell: (param) => {
    //     return new Intl.NumberFormat("pt-BR", {
    //       style: "currency",
    //       currency: "BRL",
    //     }).format(param.value);
    //   },
    // },
    {
      field: "payment_settled",
      headerName: "Pagamento Quitado",
      width: 100,
      align: "center",
      renderCell: (param) => {
        return param.value ? "Sim" : "Não";
      },
    },
    {
      field: "startDate",
      headerName: "Data de Início",
      width: 100,
      align: "center",
      renderCell: (param) => {
        return new Intl.DateTimeFormat("pt-BR").format(new Date(param.value));
      },
    },
    {
      field: "dueDate",
      headerName: "Data de Vencimento",
      renderCell: (param) => {
        return new Intl.DateTimeFormat("pt-BR").format(new Date(param.value));
      },
    },
  ];

  return (
    <>

      <ModalContainer
        open={open}
        setOpen={setOpen}
        title="Registrar pagamento"
        subtitle="Preencha as informações para registrar pagamento."
        maxWidth="xl"
        actions={false}
        
      >
                  <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpenLoan(param.row.id)}
            >
              Registrar Pagamento
            </Button>
        {/* <TableGrid rows={rows} columns={columns} /> */}
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            
            // height: "calc(100vh - 348px)",

            height: "calc(100vh - 348px)",
          }}
        >
          <DataGrid
            rows={rows}
            pageSize={12}
            rowsPerPageOptions={[]}
            // disableColumnMenu
            columns={columns.map((column: GridColDef) => ({
              ...column,
              flex: 1,
              sortable: true,
              // headerClassName: "super-app-theme--header",
            }))}
            sx={table}
          />
        </Box>
      </ModalContainer>
    </>
  );
}

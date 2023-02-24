import { Token } from "@mui/icons-material";
import { Box, Button, Divider, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { log } from "console";
import { useEffect, useState } from "react";
import { ModalContainer } from "../../../../../components/ModalContainer";
import { getLoanNotPayment } from "../../../../../services/client";
import { useModal } from "../../../../../shared/hooks/useModal";
import { table, tableContainer } from "../../exits/TableGrid/styles";
import { TableGrid } from "../TableGrid";
import { ModalFullPay } from "./ModalFullPay";
import { ModalRegisterLoan } from "./ModalRegisterLoan";
import { ModalRegisterPayment } from "./ModalRegisterPayment";
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

export function ModalNotPayment({
  token,
  id,
}: {
  token: string;
  id: string;
}) {
  const { open, setOpen, closeModal } = useModal();
  const [rows, setRows] = useState<LoanProps[]>([]);
  const [type, setType] = useState<{
    entry: boolean;
    exit: boolean;
    view: boolean;
    print: boolean;
    loan: boolean;
    payment: boolean;
    full: boolean;
  }>({
    entry: false,
    exit: false,
    view: false,
    print: false,
    loan: false,
    payment: false,
    full: false,
  });
  const handleModal = () => {
    setType({
      entry: false,
      exit: false,
      view: false,
      print: false,
      loan: false,
      payment: false,
      full: false,
    });
  };
  useEffect(() => {
    async function data() {
      const response = await getLoanNotPayment(token, id);
      setRows(response?.data);
    }
    data();
    console.log(rows);
  }, [id, type]);

  const columns: GridColDef[] = [
    {
      field: "interest_rate",
      headerName: "Taxa de Juros",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params.value + "%";
      },
    },
    {
      field: "value_loan",
      headerName: "Valor do Empréstimo",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (param) => {
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(param.value);
      },
    },
    {
      field: "rest_loan",
      headerName: "Valor Restante",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (param) => {
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(param.value);
      },
    },
    {
      field: "payment_settled",
      headerName: "Pagamento Quitado",
      headerAlign: "center",
      align: "center",
      width: 100,
      renderCell: (param) => {
        return param.value ? "Sim" : "Não";
      },
    },
    {
      field: "startDate",
      headerName: "Data de Início",
      headerAlign: "center",
      align: "center",
      width: 100,
      renderCell: (param) => {
        return new Intl.DateTimeFormat("pt-BR").format(new Date(param.value));
      },
    },
    {
      field: "dueDate",
      headerName: "Data de Vencimento",
      headerAlign: "center",
      align: "center",
      renderCell: (param) => {
        return new Intl.DateTimeFormat("pt-BR").format(new Date(param.value));
      },
    },
    {
      field: "actions",
      headerName: "Ações",
      headerAlign: "center",
      width: 600,
      align: "center",
      renderCell: (param) => {
        return (
          <>
            <Button
              variant="contained"
              color="info"
              onClick={() => handleOpenFullPay(param.row.id)}
              sx={{ mr: .3 }}
            >
              Total
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpenLoanPayment(param.row.id)}
            >
              Parcial
            </Button>
          </>
        );
      },
    },
  ];
  const [idLoan, setId] = useState<string>("");
  const [paymentId, setPaymentId] = useState<string>("");

  const handleOpenLoan = (idClient: string) => {
    setType({
      entry: false,
      exit: false,
      view: false,
      print: false,
      loan: true,
      payment: false,
      full: false
    });
    setOpen(true);
    setId(idClient);
  };

  const handleOpenLoanPayment = (paymentId: string) => {
    setType({
      entry: false,
      exit: false,
      view: false,
      print: false,
      loan: false,
      payment: true,
      full: false
    });
    setOpen(true);
    setPaymentId(paymentId);
  };

  const handleOpenFullPay = (paymentId: string) => {
    setType({
      entry: false,
      exit: false,
      view: false,
      print: false,
      loan: false,
      payment: false,
      full: true,
    });

    setId(paymentId);
  };

  return (
    <>
      <ModalContainer
        open={open}
        setOpen={setOpen}
        title="Empréstimo(s)"
        subtitle="Preencha as informações para registrar pagamento."
        maxWidth="xl"
        actions={false}
      >
        {type.payment && (
          <ModalRegisterPayment id={paymentId} modal={handleModal} />
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenLoan(id)}
        >
          Adicionar Empréstimo

        </Button>

        {/* <TableGrid rows={rows} columns={columns} /> */}
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "left",

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

      {type.loan && <ModalRegisterLoan id={idLoan} modal={handleModal} />}
      {type.full && <ModalFullPay id={idLoan} modal={handleModal} />}
    </>
  );
}

import { Avatar, Box, Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useModal } from "../../../../shared/hooks/useModal";
import { Search } from "../components/Search";
import { TableGrid } from "./TableGrid";
import { EntryProps } from "../interfaces/entrys";
import { ModalRegisterEquipmentEntry } from "./Models/ModalRegisterEquipmentEntry";
// import { ModalPrintReceipt } from './Models/ModalPrintReceipt'
import { ModalRegisterEquipment } from "./Models/ModalRegisterEquipment";
import { ModalRegisterExit } from "./Models/ModalRegisterExit";

import { ModalPrintReceipt } from "./Models/ModalPrintReceipt";
import { api } from "../../../../services/api";
import { getAllClients } from "../../../../services/client";
import { useSession } from "next-auth/react";
import { ModalRegisterLoan } from "./Models/ModalRegisterLoan";
import { useRouter } from "next/router";
import { ModalRegisterPayment } from "./Models/ModalRegisterPayment";
import { ModalNotPayment } from "./Models/ModalNotPayment";

export interface ClientProps {
  id: string;
  name: string;
  fone: string;
  address: {
    id: string;
    street: string;
    district: string;
    number: string;
    city: string;
    clientId: string;
    createdAt: Date;
    updatedAt?: Date;
  };
  loan: {
    id: string;
    value_loan: number;
    interest_rate: number;
    clientId: string;
    createdAt: Date;
    updatedAt?: Date;
  }[];
  createdAt?: Date;
}

export function Entrys() {
  const [rows, setRows] = useState<ClientProps[]>([]);
  const { setOpen } = useModal();
  const [type, setType] = useState<{
    payment?: JSX.Element;
    entry: boolean;
    exit: boolean;
    view: boolean;
    print: boolean;
    loan: boolean;
  }>({
    entry: false,
    exit: false,
    view: false,
    print: false,
    loan: false,
  });
  const [id, setId] = useState<string>("");
  const [updateRows, setUpdateRows] = useState<boolean>(false);
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    async function func() {
      if (session)
      if (session.accessToken as string) {
        const type = router.pathname === "/app/NotPayment" ? "notPayment" : "paymentConfirmed";
        const res = await getAllClients(session?.accessToken, type);
        setRows(res.data.items);
      }
    }
    func();
  }, [session?.accessToken, updateRows]);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nome",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "data",
      headerName: "Data do Emprestimo",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "dataFinal",
      headerName: "Data do Pagamento",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "value_loan",
      renderCell: (param) => {
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(param.row.total);
      },
      headerName: "Valor Emprestado",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "interest_rate",
      renderCell: (param) => {
        return param.row.loan[0].interest_rate + "%";
      },
      headerName: "Juros Aplicado",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "pagar",
      headerName: "Valor a Pagar",
      headerAlign: "center",
      align: "center",
      renderCell: (param) => {
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(param.row.pagar);
      },
    },
    {
      field: "actions",
      headerName: "Ações",
      headerAlign: "center",
      align: "center",
      renderCell: (param) => {
        console.log()
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleOpenModalExit(param.row.id)
              }}
            >
              Ver
            </Button>
          </>
        );
      },
    },
  ];

  // useEffect(() => {
  //   setRows(responseData);
  // }, []);

  const handleOpenModalEntry = () => {
    setType({
      entry: true,
      exit: false,
      view: false,
      print: false,
      loan: false,
    });
    setOpen(true);
  };

  const handleOpenModalExit = (idClient: string) => {
    setType({
      entry: false,
      exit: true,
      view: false,
      print: false,
      loan: false,
    });
    setOpen(true);
    setId(idClient);
  };

  const handleOpenModalView = () => {
    setType({
      entry: false,
      exit: false,
      view: true,
      print: false,
      loan: false,
    });
    setOpen(true);
  };

  const handleOpenModalPrint = () => {
    setType({
      entry: false,
      exit: false,
      view: false,
      print: true,
      loan: false,
    });
    setOpen(true);
  };

  const handleOpenLoan = (idClient: string) => {
    setType({
      entry: false,
      exit: false,
      view: false,
      print: false,
      loan: true,
    });
    setOpen(true);
    setId(idClient);
  };


  const handleOpenCancel = () => {
    setUpdateRows(!updateRows);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {/* <Search /> */}
        <Button
          size="medium"
          variant="contained"
          onClick={handleOpenModalEntry}
          sx={{ marginLeft: "8px" }}
        >
          CADASTRO DE CLIENTES
        </Button>
      </Box>
      <br />

      <TableGrid
        rows={rows}
        columns={columns}
        // exit={handleOpenModalExit(rows.id)}
        view={handleOpenModalView}
        print={handleOpenModalPrint}

      />
      {type.entry && (
        <ModalRegisterEquipmentEntry ontoggle={handleOpenCancel} />
      )}
      {type.exit && (
        <ModalRegisterExit id={id} token={session?.accessToken as string} />
      )}
      {type.view && <ModalRegisterEquipment />}
      {type.print && <ModalPrintReceipt />}
    </>
  );
}

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

interface ClientProps {
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
    entry: boolean;
    exit: boolean;
    view: boolean;
    print: boolean;
  }>({
    entry: false,
    exit: false,
    view: false,
    print: false,
  });
  const { data: session } = useSession();

  useEffect(() => {
    async function func() {
      if (session.accessToken) {
        console.log(session.accessToken);

        const res = await getAllClients(session?.accessToken);

        setRows(res.data.items);
      }
    }
    console.log(func());
  }, [session]);

  const responseData: ClientProps[] = [
    // {
    //   id: ,
    //   name: "Adriane Lavareda de Almeida",
    //   entryDate: "20/07/2022 15:14",
    //   departureDate: "20/07/2022 15:14",
    //   foto: "https://mui.com/static/images/avatar/7.jpg",
    // },
    // {
    //   id: "2",
    //   entryDate: "20/07/2022 15:14",
    //   departureDate: "20/07/2022 15:14",
    //   name: "Adriano Pinto de Souza",
    //   foto: "https://mui.com/static/images/avatar/6.jpg",
    // },
  ];

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nome",
    },
    {
      field: "data",
      headerName: "Data do Emprestimo",
    },
    {
      field: "dataFinal",
      headerName: "Data do Pagamento",
    },
    {
      field: "fees",
      headerName: "Juros Aplicado",
    },
    {
      field: "total",
      headerName: "Valor a Pagar",
    },
  ];

  useEffect(() => {
    setRows(responseData);
  }, []);

  const handleOpenModalEntry = () => {
    setType({ entry: true, exit: false, view: false, print: false });
    setOpen(true);
  };

  const handleOpenModalExit = () => {
    setType({ entry: false, exit: true, view: false, print: false });
    setOpen(true);
  };

  const handleOpenModalView = () => {
    setType({ entry: false, exit: false, view: true, print: false });
    setOpen(true);
  };

  const handleOpenModalPrint = () => {
    setType({ entry: false, exit: false, view: false, print: true });
    setOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Search />
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
        exit={handleOpenModalExit}
        view={handleOpenModalView}
        print={handleOpenModalPrint}
      />
      {type.entry && <ModalRegisterEquipmentEntry />}
      {type.exit && <ModalRegisterExit />}
      {type.view && <ModalRegisterEquipment />}
      {type.print && <ModalPrintReceipt />}
    </>
  );
}

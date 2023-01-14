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

export function Entrys({ session }: { session: any }) {
  const [rows, setRows] = useState<EntryProps[]>([]);
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

  const responseData: EntryProps[] = [
    {
      id: "1",
      name: "Adriane Lavareda de Almeida",
      entryDate: "20/07/2022 15:14",
      departureDate: "20/07/2022 15:14",
      foto: "https://mui.com/static/images/avatar/7.jpg",
    },
    {
      id: "2",
      entryDate: "20/07/2022 15:14",
      departureDate: "20/07/2022 15:14",
      name: "Adriano Pinto de Souza",
      foto: "https://mui.com/static/images/avatar/6.jpg",
    },
  ];

  const columns: GridColDef[] = [
    {
      headerName: "Foto",
      field: "foto",
      renderCell: (params: any) => (
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
      field: "entryDate",
      headerName: "Data/Hora de Entrada",
    },
    {
      field: "departureDate",
      headerName: "Data/Hora de Saída",
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
          REGISTRAR ENTRADA DE EQUIPAMENTO
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

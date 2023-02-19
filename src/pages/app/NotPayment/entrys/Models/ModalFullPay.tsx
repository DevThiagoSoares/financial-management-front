import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { getSession, useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import { useForm, Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import { ModalContainer } from "../../../../../components/ModalContainer/indexSmall";
import Input from "../../../../../components/TextField";
import { InputMask } from "../../../../../components/TextField/mask";
import {
  CreateAFullPay,
  createClient,
  createLoan,
} from "../../../../../services/client";

import { useModal } from "../../../../../shared/hooks/useModal";
import {
  ICreateCliente,
  ICreateClientePost,
  Iloan,
} from "../../../../../types/createCliente";
import {
  createClientSchema,
  createLoanSchema,
} from "../../../../../utils/validation";

export function ModalFullPay({ id, modal }: { id: string; modal: () => void }) {
  const { open, setOpen, closeModal } = useModal();

  const { enqueueSnackbar } = useSnackbar();

  const handleCancel = () => {
    modal();
  };

  const { data: session } = useSession();
  const onSubmit = async () => {
    try {
      CreateAFullPay(session?.accessToken as string, id);

      enqueueSnackbar("Emprestimo pago com sucesso", {
        variant: "success",
      });
      modal();
      // closeModal();
      // reset();
    } catch (error) {
      enqueueSnackbar("Ocorreu um erro ao pagar o Emprestimo", {
        variant: "error",
      });
    }
  };

  return (
    <>
      <ModalContainer
        open={open}
        setOpen={setOpen}
        title="Efetuar o Pagamento da divida?"
        subtitle=""
        maxWidth="sm"
        actions={false}
      >
        <Box
          component="form"
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
            gridTemplateAreas: `
            
              "br .
            

              `,
          }}
          onSubmit={onSubmit}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gridArea: "br",
              gap: "0.5rem",
            }}
          >
            <Button onClick={handleCancel}>Não</Button>
            <Button variant="contained" type="button" onClick={onSubmit}>
              Sim
            </Button>
          </Box>{" "}
        </Box>
      </ModalContainer>
    </>
  );
}

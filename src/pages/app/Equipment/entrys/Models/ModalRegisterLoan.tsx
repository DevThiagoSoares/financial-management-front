import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { getSession, useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import { useForm, Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import { ModalContainer } from "../../../../../components/ModalContainer";
import Input from "../../../../../components/TextField";
import { InputMask } from "../../../../../components/TextField/mask";
import { createClient, createLoan } from "../../../../../services/client";

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

export function ModalRegisterLoan(id: string) {
  const { open, setOpen, closeModal } = useModal();

  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    control,
    reset,
    register,
    watch,
    formState: { errors },
  } = useForm<Iloan>({
    resolver: zodResolver(createLoanSchema),
  });

  console.log(id);

  const { data: session } = useSession();
  const onSubmit = async (data: Iloan) => {
    console.log(data);

    const { dueDate, value_loan, interest_rate } = data;
    try {
      const convertValue = (value: number) => {
        return +value
          .toString()
          .replaceAll("R$ ", "")
          .replaceAll(".", "")
          .replace(",", ".");
      };

      createLoan(session?.accessToken as string, id.id, {
        value_loan: convertValue(value_loan),
        interest_rate: +(+interest_rate
          .toString()
          .replace(",", ".")
          .replace("%", "") as number),
        dueDate,
      } as any);

      enqueueSnackbar("Cliente cadastrado com sucesso", {
        variant: "success",
      });
      closeModal();
    } catch (error) {
      enqueueSnackbar(`"Ocorreu um erro ao cadastar o cliente"`, {
        variant: "error",
      });
    }
  };

  return (
    <>
      <ModalContainer
        open={open}
        setOpen={setOpen}
        title="Registrar Cliente"
        subtitle=""
        maxWidth="xl"
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
              ". ."
              "br br"
              "br br"
              "br br"
              "ar ar"
              ". ."

              `,
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputMask
            label="Valor do emprestimo"
            control={control}
            errors={errors.value_loan?.message}
            name="value_loan"
            prefix="R$ "
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale
            fullWidth
          />
          <InputMask
            label="Juros em %"
            control={control}
            errors={errors.interest_rate?.message}
            name="interest_rate"
            suffix="%"
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale
            fullWidth
          />
          <InputLabel id="dueDatel">Prazo de Pagamento</InputLabel>
          <Controller
            control={control}
            name="dueDate"
            render={({ field }) => (
              <Select id="dueDatel" labelId="dueDatel" {...field}>
                <MenuItem value="1 semana">1 semana</MenuItem>
                <MenuItem value="1 mês">1 mês</MenuItem>
              </Select>
            )}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gridArea: "ar",
              gap: "0.5rem",
            }}
          >
            <Button onClick={closeModal}>Cancelar</Button>
            <Button
              variant="contained"
              type="button"
              onClick={handleSubmit(onSubmit)}
            >
              REGISTRAR FINANCIAMENTO
            </Button>
          </Box>{" "}
        </Box>
      </ModalContainer>
    </>
  );
}

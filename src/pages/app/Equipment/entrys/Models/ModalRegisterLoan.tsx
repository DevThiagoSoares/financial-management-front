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

export function ModalRegisterLoan({
  id,
  modal,
}: {
  id: string;
  modal: () => void;
}) {
  const { open, setOpen, closeModal } = useModal();

  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    control,
    reset,
    register,
    resetField,
    watch,
    formState: { errors },
  } = useForm<Iloan>({
    resolver: zodResolver(createLoanSchema),
  });

  console.log(id);

  const handleCancel = () => {
    resetField("value_loan");
    resetField("interest_rate");
    resetField("dueDate");
    modal();
  };

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

      createLoan(session?.accessToken as string, id, {
        value_loan: convertValue(value_loan),
        interest_rate: +(+interest_rate
          .toString()
          .replace(",", ".")
          .replace("%", "") as number),
        dueDate,
      } as any);

      enqueueSnackbar("Emprestimo cadastrado com sucesso", {
        variant: "success",
      });

      resetField("value_loan");
      resetField("interest_rate");
      resetField("dueDate");
      modal();
      // closeModal();
      // reset();
    } catch (error) {
      enqueueSnackbar("Ocorreu um erro ao cadastar o Emprestimo", {
        variant: "error",
      });
    }
  };

  return (
    <>
      <ModalContainer
        open={open}
        setOpen={setOpen}
        title="Registrar Empréstimo"
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
          <Controller
            control={control}
            name="dueDate"
            render={({ field }) => (
              <>
                <Select
                  id="dueDatel"
                  label="Prazo de Pagamento"
                  labelId="dueDatelId"
                  defaultValue="Prazo de Pagamento"
                  {...field}
                >
                  <MenuItem value={"Prazo de Pagamento"}>
                    Prazo de Pagamento
                  </MenuItem>
                  <MenuItem value="1 semana">1 semana</MenuItem>
                  <MenuItem value="1 mês">1 mês</MenuItem>
                </Select>
                {errors.dueDate?.message && (
                  <FormHelperText
                    sx={{
                      color: "red",
                    }}
                  >
                    {" "}
                    {errors.dueDate.message}{" "}
                  </FormHelperText>
                )}
              </>
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
            <Button onClick={handleCancel}>Cancelar</Button>
            <Button
              variant="contained"
              type="button"
              onClick={handleSubmit(onSubmit)}
            >
              REGISTRAR 
              </Button>
          </Box>{" "}
        </Box>
      </ModalContainer>
    </>
  );
}

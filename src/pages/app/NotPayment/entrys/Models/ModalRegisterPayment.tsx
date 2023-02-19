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
import {
  createClient,
  createLoan,
  createPayment,
} from "../../../../../services/client";

import { useModal } from "../../../../../shared/hooks/useModal";
import {
  ICreateCliente,
  ICreateClientePost,
  Iloan,
  IPayment,
} from "../../../../../types/createCliente";
import {
  createClientSchema,
  createLoanSchema,
  createValueSchema,
} from "../../../../../utils/validation";

export function ModalRegisterPayment({
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
    resetField,
    register,
    watch,
    formState: { errors },
  } = useForm<IPayment>({
    resolver: zodResolver(createValueSchema),
  });

  const { data: session } = useSession();
  const onSubmit = async (data: IPayment) => {
    const { dueDate, value } = data;
    try {
      const convertValue = (value: number) => {
        return +value
          .toString()
          .replaceAll("R$ ", "")
          .replaceAll(".", "")
          .replace(",", ".");
      };

      createPayment(session?.accessToken as string, id, {
        value: convertValue(value),
        dueDate,
      } as any);

      enqueueSnackbar("Pagamento realizado com sucesso", {
        variant: "success",
      });
      // closeModal();
      handleCancel();
    } catch (error) {
      enqueueSnackbar(`"Ocorreu um erro ao realizado o pagamento"`, {
        variant: "error",
      });
    }
  };

  const handleCancel = () => {
    resetField("value");
    resetField("dueDate");
    modal();
  };

  return (
    <>
      <ModalContainer
        open={open}
        setOpen={setOpen}
        title="Registrar pagamento"
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
            errors={errors.value?.message}
            name="value"
            prefix="R$ "
            thousandSeparator="."
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
              REGISTRAR PAGAMENTO
            </Button>
          </Box>{" "}
        </Box>
      </ModalContainer>
    </>
  );
}

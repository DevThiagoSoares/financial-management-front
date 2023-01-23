import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from "@mui/material";
import { getSession, useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import { useForm, Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import { ModalContainer } from "../../../../../components/ModalContainer";
import Input from "../../../../../components/TextField";
import { InputMask } from "../../../../../components/TextField/mask";
import { createClient } from "../../../../../services/client";

import { useModal } from "../../../../../shared/hooks/useModal";
import {
  ICreateCliente,
  ICreateClientePost,
} from "../../../../../types/createCliente";
import { createClientSchema } from "../../../../../utils/validation";

export function ModalRegisterLoan(id:string) {
  const { open, setOpen, closeModal } = useModal();

  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    control,
    reset,
    register,
    watch,
    formState: { errors },
  } = useForm<ICreateCliente>({
    resolver: zodResolver(createClientSchema),
  });

  console.log(id);
  
  const { data: session } = useSession();
  const onSubmit = async (data: ICreateCliente) => {
    const {
      city,
      district,
      fone,
      value_loan,
      interest_rate,
      name,
      number,
      street,
    } = data;
    try {
      const convertValue = (value: number) => {
        return +value
          .toString()
          .replaceAll("R$ ", "")
          .replaceAll(".", "")
          .replace(",", ".");
      };
      createClient(
        {
          name,
          fone,
          address: {
            city,
            district,
            street,
            number,
          },
          loan: [
            {
              value_loan: convertValue(value_loan),
              interest_rate: +(+interest_rate
                .toString()
                .replace(",", ".")
                .replace("%", "") as number),
            },
          ],
        } as ICreateClientePost,
        session?.accessToken as string
      );

      enqueueSnackbar("Cliente cadastrado com sucesso", {
        variant: "success",
      });
      closeModal();
    } catch (error) {
      enqueueSnackbar(
        `"Ocorreu um erro ao cadastar o cliente"`,
        {
          variant: "error",
        }
      );
    }
  };

  console.log(watch("value_loan"));

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
          <Input
            label="Nome"
            control={control}
            errors={errors.name?.message}
            nameField="name"
          />
          <Input
            label="Telefone"
            control={control}
            errors={errors.fone?.message}
            nameField="fone"
          />
          <Input
            label="Cidade"
            control={control}
            errors={errors.city?.message}
            nameField="city"
          />
          <Input
            label="Bairro"
            control={control}
            errors={errors.district?.message}
            nameField="district"
          />
          <Input
            label="Rua"
            control={control}
            errors={errors.street?.message}
            nameField="street"
          />
          <Input
            label="Numero"
            control={control}
            errors={errors.number?.message}
            nameField="number"
          />
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gridArea: "ar",
              gap: "0.5rem",
            }}
          >
            <Button onClick={closeModal}>Cancelar</Button>
            <Button variant="contained" type="submit">
              REGISTRAR CLIENTE
            </Button>
          </Box>{" "}
        </Box>
      </ModalContainer>
    </>
  );
}

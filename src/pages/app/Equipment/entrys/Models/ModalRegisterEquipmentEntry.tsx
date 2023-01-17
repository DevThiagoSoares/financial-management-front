import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button } from "@mui/material";
import { getSession, useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

import { ModalContainer } from "../../../../../components/ModalContainer";
import Input from "../../../../../components/TextField";
import { createClient } from "../../../../../services/client";

import { useModal } from "../../../../../shared/hooks/useModal";
import {
  ICreateCliente,
  ICreateClientePost,
} from "../../../../../types/createCliente";
import { createClientSchema } from "../../../../../utils/validation";

export function ModalRegisterEquipmentEntry() {
  const { open, setOpen, closeModal } = useModal();

  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ICreateCliente>({
    resolver: zodResolver(createClientSchema),
  });

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
          loan: [{ value_loan: +value_loan, interest_rate: +interest_rate }],
        } as ICreateClientePost,
        session?.accessToken as string
      );

      enqueueSnackbar("Cliente cadastrado com sucesso", {
        variant: "success",
      });
      closeModal();
    } catch (error) {
      enqueueSnackbar(
        `${error?.message ?? "Ocorreu um erro ao cadastar o cliente"}`,
        {
          variant: "error",
        }
      );
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
          {/* make a array of loan value */}
          <Input
            label="Valor do emprestimo"
            control={control}
            errors={errors.value_loan?.message}
            nameField="value_loan"
            type="text"
            // add R$  before value input
          />
          <Input
            label="Juros em %"
            control={control}
            errors={errors.interest_rate?.message}
            nameField="interest_rate"
            type="text"
            // add R$  before value input
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

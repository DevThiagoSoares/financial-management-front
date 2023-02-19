import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ISignUp } from "../types/signup";
import { signUpSchema } from "../utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "../services/user";
import Router from "next/router";
import { useSnackbar } from "notistack";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUpSide() {
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
  });
  const [samePassword, setSamePassword] = React.useState<boolean>(false);

  React.useEffect(() => {
    setSamePassword(false);
  }, [watch("password"), watch("confirmPassword")]);

  const onSubmit: SubmitHandler<ISignUp> = async (data) => {
    console.log("Errors", errors);

    if (data.password !== data.confirmPassword) {
      console.log("passwords are not the same");
      console.log(samePassword);

      setSamePassword(true);
      return;
    }
    let { confirmPassword, login, name, password, isAdm } = data;

    isAdm = true;

    await createUser({
      login,
      name,
      password,
      isAdm,
    }).then(() => {
      enqueueSnackbar("Usuario cadastrado com sucesso", { variant: "info" });
      Router.push("/app");
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random/?finance)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t: any) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Cadastro
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nome"
                    autoComplete="name"
                    autoFocus
                    helperText={errors.name?.message}
                    FormHelperTextProps={{ error: !!errors.name?.message }}
                    {...field}
                  />
                )}
              />
              <Controller
                name="login"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="login"
                    label="Email"
                    autoComplete="login"
                    autoFocus
                    helperText={errors.login?.message}
                    FormHelperTextProps={{ error: !!errors.login?.message }}
                    {...field}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Senha"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    helperText={errors.password?.message}
                    FormHelperTextProps={{ error: !!errors.password?.message }}
                    {...field}
                  />
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Confirmar a senha"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                    helperText={
                      errors.confirmPassword?.message ??
                      (samePassword === true && "Senhas não conferem")
                    }
                    FormHelperTextProps={{
                      error: samePassword || !!errors.confirmPassword?.message,
                    }}
                    {...field}
                  />
                )}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={Object.keys(errors).length > 0 || samePassword}
                sx={{ mt: 3, mb: 2 }}
              >
                Cadastrar
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Já possui uma conta? Entre aqui."}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

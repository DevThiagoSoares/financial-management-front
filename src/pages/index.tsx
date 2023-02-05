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
import { ILogin } from "../types/login";
import { loginSchema } from "../utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useSnackbar } from "notistack";
import Input from "../components/TextField";
import axios from "axios";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://google.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    console.log("Errors", errors);
    console.log("data", data);

    const isValidate = await loginSchema.parse(data);
    if (isValidate) {

    await axios.post('/api/auth/login', data).then(async () => {

      enqueueSnackbar("Login realizado com sucesso", {
        variant: "success",
        transitionDuration: { appear: 50000 },
        autoHideDuration: 1000,
      });
     await signIn("credentials", {
        login: data.login,
        password: data.password,
  
        callbackUrl: `${window.location.origin}/app`,
      });
    }).catch((err) => {
      enqueueSnackbar("Email ou senha inválidos", {
        variant: "error",
        transitionDuration: { appear: 50000 },
        autoHideDuration: 1000,
      });
    })


     
    }
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
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <Input
                control={control}
                errors={errors.login?.message}
                label="E-Mail"
                nameField="login"
                type="email"
              />
              <Input
                control={control}
                errors={errors.password?.message}
                label="Senha"
                nameField="password"
                type="password"
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                // check if fields are empty or not
                disabled={Object.keys(errors).length > 0}
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                {/* <Grid item>
                  <Link href="/signup" variant="body2">
                    {"não tem uma conta? Cadastre-se"}
                  </Link>
                </Grid> */}
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

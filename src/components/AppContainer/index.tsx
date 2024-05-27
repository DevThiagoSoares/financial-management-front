import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { MenuList } from "./MenuList";
import { Content } from "./Content";
import LogoCore from "../../assets/icons/logocore.svg";
import { AppBar, ButtonStyled, Drawer, DrawerHeader } from "./styles";
import { useSession, signOut, getSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { authOptions } from "../../pages/api/auth/[...nextauth].page";
import { unstable_getServerSession } from "next-auth";
// import { getServerSession } from "next-auth/next"

interface AppContainerProps {
  children?: React.ReactNode;
}

export function AppContainer({ children }: AppContainerProps) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const router = useRouter()

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const { data: session } = useSession();
  // const session = await unstable_getServerSession(authOptions);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon color="primary" />
            </IconButton>
            {/* <img src={LogoCore} alt="Logo do Core" /> */}
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography color="primary" variant="body2" noWrap component="button" onClick={() => {
              router.push("/app")
            }} sx={{ background: 'none', border: 'none' }} >
              Financeiro
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" color="primary">
            <ButtonStyled startIcon={<AccountCircleIcon color="primary" />}>
              <Typography
                color="primary"
                variant="body2"
                noWrap
                component="div"
              >
                {session?.user?.name}
              </Typography>
            </ButtonStyled>
            <Button variant="text">
              <LogoutIcon
                onClick={() => {
                  signOut();
                  Router.push("/");
                }}
              />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <MenuList open={open} />
      </Drawer>

      <Content>{children}</Content>
    </Box>
  );
}

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const session = await getSession({ req });

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       session,
//     },
//   };
// };

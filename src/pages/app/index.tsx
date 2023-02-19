import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { DefaultLayout } from "../../layouts/DefaultLayouts";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Router from "next/router";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

export default function page() {
  return (
    <>
      <DefaultLayout>
        <Box
          sx={{
            width: "100wv",
            height: "490px",
          }}
        >

          {/* CREATE A BUTTON TO SIGNUP WITH MATERIAL COMPONENTS 
          
        */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => Router.push("/signup")}
        > 
          Criar uma conta de usuário Admin
        </Button>
        
          
        </Box>
      </DefaultLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
};

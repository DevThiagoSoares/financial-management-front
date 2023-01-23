import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { DefaultLayout } from "../../layouts/DefaultLayouts";
import Box from "@mui/material/Box";

export default function page() {
  return (
    <>
      <DefaultLayout>
        <Box
          sx={{
            width: "100wv",
            height: "490px",
          }}
        ></Box>
      </DefaultLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

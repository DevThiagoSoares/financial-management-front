import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { DefaultLayout } from "../../../layouts/DefaultLayouts";
import { authOptions } from "../../api/auth/[...nextauth].page";
import { TabComponent } from "./components/TabComponent";

export default function Equipaments({
  session,
  token,
}: {
  session: any;
  token: string;
}) {
  return (
    <>
      <DefaultLayout>
        <TabComponent />
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


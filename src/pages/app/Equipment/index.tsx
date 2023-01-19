import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { DefaultLayout } from "../../../layouts/DefaultLayouts";
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

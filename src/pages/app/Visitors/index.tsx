import { useEffect, useState } from "react";
import { ToolbarContainer } from "../../../components/ToolbarContainer";
import { TableGrid } from "../../../components/TableGrid";
import { columns } from "./table/columns";
import { useToast } from "../../../shared/hooks/useToast";
import { CreateVisitorsModal } from "./models/createModal";
import { PersonalDataProps } from "./interfaces/personal";
import { findManyVisitors } from "../../../services/visitors";
import { ToastContainer } from "../../../components/ToastContainer";

export function Visitors() {
  const [personals, setPersonals] = useState<PersonalDataProps[]>([]);
  const { actionToast } = useToast();

  useEffect(() => {
    console.log(personals);
    listAll();
  }, []);

  const listAll = () => {
    findManyVisitors()
      .then((response) => {
        setPersonals(response.data);
      })
      .catch((error) => {
        console.log("aqui");
        if (!error?.response?.data.message) {
          actionToast({ message: "Internal server error", type: "error" });
        }
        if (error?.response?.data) {
          actionToast({
            message: error.response.data.message[0],
            type: "error",
          });
        }
      });
  };

  const updateVisitorsList = async () => {
    listAll();
  };

  return (
    <>
      <ToastContainer />

      <CreateVisitorsModal updateVisitorsList={updateVisitorsList} />
      <ToolbarContainer title="Emprestimo" captionButton="Cadastrar Credor" />
      <TableGrid rows={personals} columns={columns} />
    </>
  );
}

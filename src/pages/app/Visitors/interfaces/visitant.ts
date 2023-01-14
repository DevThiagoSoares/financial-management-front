import { ChangeEvent } from "react";

export interface LoanProps {
  id: string;
  value_loan: number;
  clientId?: string;
}

export interface LoanStepProps {
  changeNewLoan: (event: ChangeEvent<HTMLInputElement>) => void;
  loan: LoanProps;
  changePhotoNewLoan: (photo: string | null) => void;
}
export interface UpdateVisitorsListProps {
  updateVisitorsList: () => void;
}

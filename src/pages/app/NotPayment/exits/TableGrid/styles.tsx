import { colors } from "../../../../../shared/themes";

export const tableContainer = {
  display: "flex",
  flex: 1,
  height: "calc(100vh - 248px)",
};

export const table = {
  width: "100%",
  border: 0,
  "& .super-app-theme--header": {
    backgroundColor: colors.primary_lightest,
    border: colors.primary_lightest,
    color: colors.neutral_darkest,
    padding: "20px",
  },
  "& .MuiDataGrid-cell": {
    padding: "24px",
  },
  "& .MuiDataGrid-iconSeparator": {
    color: colors.primary_lightest,
  },
};

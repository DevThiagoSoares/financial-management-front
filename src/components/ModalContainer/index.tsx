import React from "react";
import Button from "@mui/material/Button";

import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import { colors } from "../../shared/themes";
import { Dialog, DialogProps } from "@mui/material";

interface ModalContainerProps extends DialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  subtitle: string;
  actions?: boolean;
  children: React.ReactNode;
}

export function ModalContainer({
  open,
  setOpen,
  title,
  subtitle,
  children,
  actions = true,
  ...props
}: ModalContainerProps) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open} {...props} sx={{}}>
        <DialogTitle
          sx={{
            padding: "2.5rem 2.5rem 0 2.5rem",
            color: colors.primary_base,
            fontSize: "1.25rem",
          }}
        >
          {title}
          <Typography
            sx={{ color: colors.neutral_dark, fontSize: "0.875rem" }}
            variant="subtitle1"
          >
            {subtitle}
          </Typography>
        </DialogTitle>
        <DialogContent style={{ padding: "2.5rem", width: "100%" }}>
          {children}
        </DialogContent>
        {actions && (
          <DialogActions sx={{ padding: "0 2.5rem 2.5rem 2.5rem" }}>
            <Button variant="text" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="contained">Cadastrar</Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
}

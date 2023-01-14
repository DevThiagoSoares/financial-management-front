import { TextField, TextFieldProps } from "@mui/material";
import { Controller } from "react-hook-form";

export default function Input({
  nameField,
  label,
  errors,
  type,
  control,
  // add props form TextField
  data,
}: {
  nameField: any;
  label: string;
  errors: any;
  type?: string;
  control: any;
  data?: TextFieldProps;
} & TextFieldProps) {
  return (
    <Controller
      name={nameField}
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <TextField
          margin="normal"
          required
          fullWidth
          id={nameField}
          label={label}
          type={type || "text"}
          autoComplete={nameField}
          autoFocus
          helperText={errors}
          FormHelperTextProps={{ error: !!errors }}
          {...field}
        />
      )}
    />
  );
}

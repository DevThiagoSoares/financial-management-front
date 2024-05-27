import { NumericFormat } from "react-number-format";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

export function InputMask({
  control,
  errors,
  prefix,
  thousandSeparator,
  decimalSeparator,
  decimalScale,
  fixedDecimalScale,
  fullWidth,
  name,
  label,
  suffix,
  format,
  mask,
}: {
  control: any;
  errors: any;
  prefix?: string;
  thousandSeparator?: string;
  decimalSeparator?: string;
  decimalScale?: number;
  fixedDecimalScale?: boolean;
  fullWidth?: boolean;
  name: string;
  label: string;
  suffix?: string;
  format?: any;
  mask?: string;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <NumericFormat
          label={label}
          helperText={errors}
          FormHelperTextProps={{ error: !!errors }}
          prefix={prefix} // add R$  before value input'
          thousandSeparator={thousandSeparator}
          decimalSeparator={decimalSeparator}
          decimalScale={decimalScale}
          suffix={suffix}
          fixedDecimalScale={fixedDecimalScale}
          fullWidth={fullWidth}
          // format={format}
          // mask={mask}
          {...field}
          customInput={TextField}
        />
      )}
    />
  );
}

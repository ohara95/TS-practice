import React, { FC } from "react";
import TextField from "@material-ui/core/TextField";

type Props = {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  label: string;
};
export const CustomInput: FC<Props> = ({ value, onChange, label }) => (
  <TextField value={value} onChange={onChange} label={label} />
);

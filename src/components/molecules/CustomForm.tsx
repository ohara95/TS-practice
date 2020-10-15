import React, { FC } from "react";
import { CustomInput, CustomButton } from "../atoms";
import Grid from "@material-ui/core/Grid";

type Props = {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  text: string;
  label: string;
};
const InvitationGroup: FC<Props> = ({
  value,
  onChange,
  onClick,
  text,
  label,
}) => (
  <form>
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item xs={9}>
        <CustomInput value={value} onChange={onChange} label={label} />
      </Grid>
      <Grid item xs={3}>
        <CustomButton onClick={onClick} text={text} />
      </Grid>
    </Grid>
  </form>
);

export default InvitationGroup;

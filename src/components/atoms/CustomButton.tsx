import React, { FC } from "react";
import Button from "@material-ui/core/Button";

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  text: string;
};

export const CustomButton: FC<Props> = ({ onClick, text }) => (
  <Button onClick={onClick}>{text}</Button>
);

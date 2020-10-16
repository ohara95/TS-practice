import React, { FC } from "react";
import CustomForm from "../molecules/CustomForm";

type Props = {
  invitationCode: string;
  setInvitationCode: (param: string) => void;
};
const InvitationGroup: FC<Props> = ({ invitationCode, setInvitationCode }) => {
  const inventMenber = () => {
    if (!invitationCode) {
      return alert("入力してください");
    }
    setInvitationCode("");
  };
  return (
    <CustomForm
      value={invitationCode}
      onChange={(e) => {
        setInvitationCode(e.target.value);
      }}
      onClick={inventMenber}
      text="招待"
      label="招待コード"
    />
  );
};

export default InvitationGroup;

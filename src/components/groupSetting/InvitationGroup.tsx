import React, { FC } from "react";
import CustomForm from "../molecules/CustomForm";
import firebase, { db } from "../../config/firebase";
import { currentGroupId } from "../../atoms_recoil";
import { useRecoilValue } from "recoil";

type Props = {
  invitationCode: string;
  setInvitationCode: (param: string) => void;
};

const InvitationGroup: FC<Props> = ({ invitationCode, setInvitationCode }) => {
  const currentId = useRecoilValue(currentGroupId);
  const inventMember = () => {
    if (!invitationCode) {
      return alert("入力してください");
    }
    const userRef = db.collection("users").doc(invitationCode);
    db.collection("groups")
      .doc(currentId)
      .update({
        users: firebase.firestore.FieldValue.arrayUnion(userRef),
      });
    setInvitationCode("");
  };
  return (
    <CustomForm
      value={invitationCode}
      onChange={(e) => {
        setInvitationCode(e.target.value);
      }}
      onClick={inventMember}
      text="招待"
      label="招待コード"
    />
  );
};

export default InvitationGroup;

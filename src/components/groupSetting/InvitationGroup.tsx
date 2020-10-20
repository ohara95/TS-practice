import React, { FC, useContext } from "react";
import CustomForm from "../molecules/CustomForm";
import firebase, { db } from "../../config/firebase";
import { usersData } from "../../atoms_recoil";
import { useRecoilValue } from "recoil";
import { AuthContext } from "../../AuthService";

type Props = {
  invitationCode: string;
  setInvitationCode: (param: string) => void;
};

const InvitationGroup: FC<Props> = ({ invitationCode, setInvitationCode }) => {
  const { user } = useContext(AuthContext);
  const users = useRecoilValue(usersData);
  const activeId = users.find((db) => db.id === user.uid)?.activeGroupId;
  const inventMember = () => {
    if (!invitationCode) {
      return alert("入力してください");
    }
    const userRef = db.collection("users").doc(invitationCode);
    db.collection("groups")
      .doc(activeId)
      .update({
        users: firebase.firestore.FieldValue.arrayUnion(userRef),
      })
      .then(() => {
        alert("追加出来ました！");
        setInvitationCode("");
      });
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

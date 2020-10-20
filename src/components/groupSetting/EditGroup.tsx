import React, { FC, useContext } from "react";
import { useRecoilValue } from "recoil";
import { db } from "../../config/firebase";
import { usersData } from "../../atoms_recoil";
import CustomForm from "../molecules/CustomForm";
import { AuthContext } from "../../AuthService";

type Props = {
  editGroupName: string;
  setEditGroupName: (param: string) => void;
};

const EditGroup: FC<Props> = ({ editGroupName, setEditGroupName }) => {
  const users = useRecoilValue(usersData);
  const { user } = useContext(AuthContext);
  const activeId = users.find((db) => db.id === user.uid).activeGroupId;
  const onBtnClick = () => {
    if (!editGroupName) {
      return alert("入力して下さい！");
    }

    if (activeId) {
      db.doc(`groups/${activeId}`).update({ name: editGroupName });
      setEditGroupName("");
    }
  };
  return (
    <CustomForm
      value={editGroupName}
      onChange={(e) => {
        setEditGroupName(e.target.value);
      }}
      onClick={onBtnClick}
      text="変更"
      label="グループ名変更"
    />
  );
};

export default EditGroup;

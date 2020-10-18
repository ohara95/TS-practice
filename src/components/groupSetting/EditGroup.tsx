import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import { db } from "../../config/firebase";
import { currentGroupId } from "../../atoms_recoil";
import CustomForm from "../molecules/CustomForm";

type Props = {
  editGroupName: string;
  setEditGroupName: (param: string) => void;
};

const EditGroup: FC<Props> = ({ editGroupName, setEditGroupName }) => {
  const currentId = useRecoilValue(currentGroupId);
  const onBtnClick = () => {
    if (!editGroupName) {
      return alert("入力して下さい！");
    }

    if (currentId) {
      db.doc(`groups/${currentId}`).update({
        name: editGroupName,
      });
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

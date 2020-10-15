import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import { db } from "../../config/firebase";
import { currentGroupData } from "../../atoms_recoil";
import CustomForm from "../molecules/CustomForm";
//material
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

type Props = {
  editGroupName: string;
  setEditGroupName: (param: string) => void;
};

const EditGroup: FC<Props> = ({ editGroupName, setEditGroupName }) => {
  const currentGroup = useRecoilValue(currentGroupData);
  const onBtnClick = () => {
    if (!editGroupName) alert("グループ名を入力して下さい！");

    if (currentGroup) {
      db.collection("groups")
        .doc(currentGroup.id)
        .get()
        .then((details) => {
          // ref = DocumentReference
          details.ref.update({
            groupName: editGroupName,
          });
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

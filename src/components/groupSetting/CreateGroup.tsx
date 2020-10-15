import React, { FC, useContext } from "react";
import firebase, { db } from "../../config/firebase";
import { AuthContext } from "../../AuthService";
import CustomForm from "../molecules/CustomForm";

type Props = {
  groupName: string;
  setGroupName: (param: string) => void;
};

const CreateGroup: FC<Props> = ({ groupName, setGroupName }) => {
  const { user } = useContext(AuthContext);
  const addGroup = () => {
    setGroupName("");
    db.collection("groups")
      .doc()
      .set({
        groupName,
        owner: user.uid,
        users: firebase.firestore.FieldValue.arrayUnion(user.uid),
        createdAt: new Date(),
      });
  };

  return (
    <CustomForm
      value={groupName}
      onChange={(e) => {
        setGroupName(e.target.value);
      }}
      onClick={addGroup}
      text="作成"
      label="グループ作成"
    />
  );
};

export default CreateGroup;

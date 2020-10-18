import React, { FC, useContext } from "react";
import firebase, { db } from "../config/firebase";
import { AuthContext } from "../AuthService";
import CustomForm from "./molecules/CustomForm";

type Props = {
  groupName: string;
  setGroupName: (param: string) => void;
};

const CreateGroup: FC<Props> = ({ groupName, setGroupName }) => {
  const { user } = useContext(AuthContext);
  const addGroup = () => {
    if (!groupName) {
      return alert("入力してください");
    }
    const userRef = db.collection("users").doc(user.uid);
    db.collection("groups").add({
      groupName,
      owner: userRef,
      users: firebase.firestore.FieldValue.arrayUnion(userRef),
      createdAt: new Date(),
      iconUrl: "",
    });
    setGroupName("");
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

import React, { useState, useContext } from "react";
import firebase, { db } from "../config/firebase";
import { AuthContext } from "../AuthService";
// material
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
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
    <form>
      <TextField
        value={groupName}
        onChange={(e) => {
          setGroupName(e.target.value);
        }}
        label="CreateRoom"
      />
      <Button onClick={addGroup}>作成</Button>
    </form>
  );
};

export default CreateGroup;

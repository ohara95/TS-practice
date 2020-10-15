import React, { FC, useContext } from "react";
import firebase, { db } from "../../config/firebase";
import { AuthContext } from "../../AuthService";

// material
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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

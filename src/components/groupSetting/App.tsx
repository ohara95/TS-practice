import React, { useState, useContext } from "react";
import CreateGroup from "./CreateGroup";
import EditGroup from "./EditGroup";

const App = () => {
  const [groupName, setGroupName] = useState("");
  const [editGroupName, setEditGroupName] = useState("");

  return (
    <>
      <CreateGroup {...{ groupName, setGroupName }} />
      <EditGroup {...{ editGroupName, setEditGroupName }} />
    </>
  );
};

export default App;

import React, { useState, useContext } from "react";
import CreateGroup from "./CreateGroup";
import EditGroup from "./EditGroup";
import InvitationGroup from "./InvitationGroup";

const App = () => {
  const [groupName, setGroupName] = useState("");
  const [editGroupName, setEditGroupName] = useState("");
  const [invitationCode, setInvitationCode] = useState("");

  return (
    <>
      <CreateGroup {...{ groupName, setGroupName }} />
      <EditGroup {...{ editGroupName, setEditGroupName }} />
      <InvitationGroup {...{ invitationCode, setInvitationCode }} />
    </>
  );
};

export default App;

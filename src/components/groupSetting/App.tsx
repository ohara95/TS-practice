import React, { useState, useContext } from "react";
import CreateGroup from "./CreateGroup";
import EditGroup from "./EditGroup";
import InvitationGroup from "./InvitationGroup";
import IconUpload from "./IconUpload";

const App = () => {
  const [groupName, setGroupName] = useState("");
  const [editGroupName, setEditGroupName] = useState("");
  const [invitationCode, setInvitationCode] = useState("");
  const [icon, setIcon] = useState("");

  return (
    <div style={{ lineHeight: 5 }}>
      <CreateGroup {...{ groupName, setGroupName }} />
      <EditGroup {...{ editGroupName, setEditGroupName }} />
      <InvitationGroup {...{ invitationCode, setInvitationCode }} />
      <IconUpload {...{ icon, setIcon }} />
    </div>
  );
};

export default App;

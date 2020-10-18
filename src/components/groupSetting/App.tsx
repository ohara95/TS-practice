import React, { useState } from "react";
import EditGroup from "./EditGroup";
import InvitationGroup from "./InvitationGroup";
import IconUpload from "./IconUpload";

const App = () => {
  const [editGroupName, setEditGroupName] = useState("");
  const [invitationCode, setInvitationCode] = useState("");
  const [icon, setIcon] = useState("");

  return (
    <div style={{ lineHeight: 5 }}>
      <EditGroup {...{ editGroupName, setEditGroupName }} />
      <InvitationGroup {...{ invitationCode, setInvitationCode }} />
      <IconUpload {...{ icon, setIcon }} />
    </div>
  );
};

export default App;

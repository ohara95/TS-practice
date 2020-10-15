import React from "react";
import { auth } from "../../config/firebase";
//component
import Chat from "../chat";
import Profile from "../Profile";
import GroupList from "../GroupList";
import CreateGroup from "../CreateGroup";
// material
import Button from "@material-ui/core/Button";

const Top = () => {
  return (
    <>
      <Chat />
      <CreateGroup />
      <GroupList />
      <Profile />
      <Button
        onClick={() => {
          auth.signOut();
        }}
      >
        ログアウト
      </Button>
    </>
  );
};

export default Top;

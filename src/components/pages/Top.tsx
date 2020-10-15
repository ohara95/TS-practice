import React from "react";
import Chat from "../chat";
import Profile from "../Profile";
import Button from "@material-ui/core/Button";
import { auth } from "../../config/firebase";

const Top = () => {
  return (
    <>
      <Chat />
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

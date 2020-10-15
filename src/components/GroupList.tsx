import React, { useContext } from "react";
import { AuthContext } from "../AuthService";

const GroupList = () => {
  const { groups, user } = useContext(AuthContext);

  const displayGroup = () => {};
  return <ul></ul>;
};

export default GroupList;

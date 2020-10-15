import React, { useContext } from "react";
import { AuthContext } from "./AuthService";
import { atom } from "recoil";

export const userData = atom({
  key: "userData",
  default: null,
});

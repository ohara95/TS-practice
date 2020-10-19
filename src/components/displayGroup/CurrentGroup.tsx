import React, { FC, useEffect, useContext } from "react";
import { currentGroupId, usersData } from "../../atoms_recoil";
import { useRecoilState, useRecoilValue } from "recoil";
import { db } from "../../config/firebase";
import { AuthContext } from "../../AuthService";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { deepOrange } from "@material-ui/core/colors";
import { Users, Group } from "../../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemText: {
      marginLeft: 10,
    },
    currentGroup: {
      backgroundColor: deepOrange[50],
    },
  })
);

type Props = {
  id: string;
  name: string;
  icon: string;
};

const CurrentGroup: FC<Props> = ({ id, name, icon }) => {
  const classes = useStyles();
  const [currentId, setCurrentId] = useRecoilState(currentGroupId);
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useRecoilState(usersData);

  const setActiveGroup = (id) => {
    setCurrentId(id);
    db.collection("users").doc(user.uid).update({
      activeGroupId: id,
    });
    setUsers(users.map((user) => ({ ...user, activeGroupId: id })));
  };

  const currentUser = users.find((db) => db.id === user.uid).activeGroupId;

  return (
    <>
      <Divider />
      <ListItem
        button
        onClick={() => {
          setActiveGroup(id);
        }}
        className={currentUser === id && classes.currentGroup}
      >
        <Avatar aria-label="recipe" src={icon ? icon : "/"} />
        <ListItemText primary={name} className={classes.itemText} />
      </ListItem>
    </>
  );
};

export default CurrentGroup;

import React, { FC, useEffect, useContext } from "react";
import { currentGroupId, usersData, groupsData } from "../../atoms_recoil";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { db } from "../../config/firebase";
import { AuthContext } from "../../AuthService";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { deepOrange, red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemText: {
      marginLeft: 10,
    },
    currentGroup: {
      backgroundColor: deepOrange[50],
    },
    iconColor: {
      color: red["A200"],
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
  const setCurrentId = useSetRecoilState(currentGroupId);
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useRecoilState(usersData);
  const groups = useRecoilValue(groupsData);

  const setActiveGroup = (id) => {
    setCurrentId(id);
    db.collection("users").doc(user.uid).update({
      activeGroupId: id,
    });
    setUsers(users.map((user) => ({ ...user, activeGroupId: id })));
  };

  const currentUser = users.find((db) => db.id === user.uid).activeGroupId;
  const isFavorite = groups.find((group) => group.id === id)?.favorite;

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
        {isFavorite && <FavoriteIcon className={classes.iconColor} />}
      </ListItem>
    </>
  );
};

export default CurrentGroup;

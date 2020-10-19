import React, { FC } from "react";
import { currentGroupId } from "../../atoms_recoil";
import { useRecoilState } from "recoil";
import firebase from "../../config/firebase";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { grey } from "@material-ui/core/colors";
import { Users } from "../../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemText: {
      marginLeft: 10,
    },
    currentGroup: {
      backgroundColor: grey[300],
    },
  })
);

type Props = {
  id: string;
  name: string;
  icon: string;
  users: Users[];
};

const CurrentGroup: FC<Props> = ({ id, name, icon, users }) => {
  const classes = useStyles();
  const [currentId, setCurrentId] = useRecoilState(currentGroupId);

  return (
    <>
      <Divider />
      <ListItem
        button
        onClick={() => {
          setCurrentId(id);
        }}
        className={currentId === id && classes.currentGroup}
      >
        <Avatar aria-label="recipe" src={icon ? icon : "/"} />
        <ListItemText primary={name} className={classes.itemText} />
      </ListItem>
    </>
  );
};

export default CurrentGroup;

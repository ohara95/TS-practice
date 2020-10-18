import React, { FC } from "react";
import { currentGroupId } from "../../atoms_recoil";
import { useRecoilState } from "recoil";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { grey } from "@material-ui/core/colors";

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
};

const CurrentGroup: FC<Props> = ({ id, name, icon }) => {
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

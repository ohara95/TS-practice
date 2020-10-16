import React, { FC } from "react";
import { currentGroupId } from "../../atoms_recoil";
import { useSetRecoilState } from "recoil";
import { Group } from "../../typs";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemText: {
      marginLeft: 10,
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

  return (
    <>
      <ListItem
        button
        onClick={() => {
          setCurrentId(id);
        }}
      >
        <Avatar aria-label="recipe" src={icon ? icon : "/"} />
        <ListItemText primary={name} className={classes.itemText} />
      </ListItem>
    </>
  );
};

export default CurrentGroup;

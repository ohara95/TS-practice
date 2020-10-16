import React, { FC } from "react";
import { currentGroupId } from "../../atoms_recoil";
import { useRecoilState } from "recoil";
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
  groups: Group[];
  icon: string;
};

const CurrentGroup: FC<Props> = ({ id, name, groups, icon }) => {
  const classes = useStyles();
  const [currentId, setCurrentId] = useRecoilState(currentGroupId);

  console.log(currentId);

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

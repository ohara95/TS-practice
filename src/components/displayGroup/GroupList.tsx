import React from "react";
import { groupsData } from "../../atoms_recoil";
import { useRecoilValue } from "recoil";
import CurrentGroup from "./CurrentGroup";
import { Group } from "../../typs";

// material
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    itemText: {
      marginLeft: 10,
    },
  })
);

const GroupList = () => {
  const classes = useStyles();
  const groups = useRecoilValue<Group[]>(groupsData);

  return (
    <div className={classes.root}>
      <List component="nav">
        {groups &&
          groups.map((group) => (
            <CurrentGroup
              id={group.id}
              name={group.groupName}
              icon={group.iconUrl}
            />
          ))}
      </List>
      <Divider />
    </div>
  );
};

export default GroupList;

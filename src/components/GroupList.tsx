import React, { useContext } from "react";
import { AuthContext } from "../AuthService";
import firebase from "../config/firebase";
import { groupsData, currentGroupId } from "../atoms_recoil";
import { useRecoilValue, useSetRecoilState } from "recoil";
// material
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import DraftsIcon from "@material-ui/icons/Drafts";

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
  const groups = useRecoilValue(groupsData);
  const setCurrentGroupId = useSetRecoilState(currentGroupId);

  const clickGroup = (id: string) => {
    setCurrentGroupId(id);
  };
  return (
    <div className={classes.root}>
      {groups &&
        groups.map((group) => {
          return (
            <>
              <List component="nav">
                <ListItem
                  button
                  onClick={() => {
                    clickGroup(group.id);
                  }}
                >
                  <Avatar aria-label="recipe">
                    <DraftsIcon />
                  </Avatar>
                  <ListItemText
                    primary={group.groupName}
                    className={classes.itemText}
                  />
                </ListItem>
              </List>
              <Divider />
            </>
          );
        })}
    </div>
  );
};

export default GroupList;
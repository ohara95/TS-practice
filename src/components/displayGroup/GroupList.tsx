import React, { useContext } from "react";
import { groupsData } from "../../atoms_recoil";
import { useRecoilValue } from "recoil";
import CurrentGroup from "./CurrentGroup";

// material
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const GroupList = () => {
  const classes = useStyles();
  const groups = useRecoilValue(groupsData);

  return (
    <div className={classes.root}>
      <List component="nav">
        {groups.length ? (
          groups.map((group) => (
            <CurrentGroup
              key={group.id}
              id={group?.id}
              name={group.name}
              icon={group.iconUrl}
            />
          ))
        ) : (
          <CircularProgress />
        )}
      </List>
    </div>
  );
};

export default GroupList;

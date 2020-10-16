import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { currentGroupId, groupsData, usersData } from "../atoms_recoil";

//component
import CustomModal from "./organisms/CustomModal";
import GroupSetting from "./groupSetting";
// material
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { deepOrange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24,
    background: deepOrange[300],
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  groupIcon: {
    marginRight: 10,
  },
}));

const Header = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const currentId = useRecoilValue(currentGroupId);
  const groups = useRecoilValue(groupsData);
  const dbUsers = useRecoilValue(usersData);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const groupContext = () => groups.find((group) => group.id === currentId);
  const groupUsers = groups.find((group) => group.users);

  return (
    <>
      <CssBaseline />
      <AppBar position="absolute">
        <Toolbar className={classes.toolbar}>
          <Avatar
            alt="groupIcon"
            src={groupContext()?.iconUrl}
            className={classes.groupIcon}
          />
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {groupContext()?.groupName}
          </Typography>
          <AvatarGroup max={4}>
            {groupUsers?.users.map((user) => {
              if (dbUsers) {
                return dbUsers.map((fireStoreUser) => {
                  if (fireStoreUser.id === user) {
                    return (
                      <Avatar
                        alt={fireStoreUser.name}
                        src={fireStoreUser.avatarUrl}
                      />
                    );
                  }
                });
              }
            })}
          </AvatarGroup>
          <IconButton color="inherit" onClick={handleOpen}>
            <Badge color="secondary">
              <MoreVertIcon />
            </Badge>
          </IconButton>
          <CustomModal
            render={<GroupSetting />}
            open={open}
            close={handleClose}
            title="グループ設定"
            src={groupContext()?.iconUrl}
          />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;

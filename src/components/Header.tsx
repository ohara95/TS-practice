import React, { useState, useEffect, useContext } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { animateScroll as scroll } from "react-scroll";
import { groupsData, usersData } from "../atoms_recoil";
import UserListModal from "./organisms/UserList";
import { AuthContext } from "../AuthService";
import { db } from "../config/firebase";

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
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24,
    background: deepOrange[300],
  },
  menuButton: {
    marginRight: 36,
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
  const [userOpen, setUserOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const groups = useRecoilValue(groupsData);
  const [users, setUsers] = useRecoilState(usersData);
  const { user } = useContext(AuthContext);

  //memo動かない
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const groupModalOpen = () => setOpen(true);
  const groupModalClose = () => setOpen(false);
  const userModalOpen = () => setUserOpen(true);
  const userModalClose = () => setUserOpen(false);

  useEffect(() => {
    if (users) {
      setActiveId(users.find((db) => db.id === user.uid)?.activeGroupId);
    }
  }, [users]);

  useEffect(() => {
    if (activeId === "first" && groups) {
      const groupId = groups.find((group) => group).id;
      db.collection("users").doc(user.uid).update({
        activeGroupId: groupId,
      });
      setUsers(users.map((user) => ({ ...user, activeGroupId: groupId })));
    }
  }, [groups]);

  const groupContext = groups.find((group) => group.id === activeId);

  return (
    <>
      <CssBaseline />
      <AppBar position="absolute">
        <Toolbar className={classes.toolbar}>
          <Avatar
            alt="groupIcon"
            src={groupContext && groupContext.iconUrl}
            className={classes.groupIcon}
          />
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
            onClick={scrollToTop}
          >
            {groupContext ? groupContext.name : <CircularProgress />}
          </Typography>
          {groupContext ? (
            <AvatarGroup max={4} onClick={userModalOpen}>
              {groupContext.users.map((db) => (
                <Avatar key={db.name} alt={db.name} src={db.avatarUrl} />
              ))}
            </AvatarGroup>
          ) : (
            <CircularProgress />
          )}
          <IconButton color="inherit" onClick={groupModalOpen}>
            <Badge color="secondary">
              <MoreVertIcon />
            </Badge>
          </IconButton>
          <CustomModal
            render={<GroupSetting />}
            open={open}
            close={groupModalClose}
            title={groupContext && groupContext.name}
            src={groupContext && groupContext.iconUrl}
            favorite={groupContext && groupContext.favorite}
            currentId={activeId}
          />
          <UserListModal
            open={userOpen}
            close={userModalClose}
            title="USERLIST"
            users={groupContext && groupContext.users}
          />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;

import React from "react";
import { useRecoilValue } from "recoil";
import { currentGroupId, groupsData } from "../atoms_recoil";
//component
import GroupModal from "../components/organisms/GroupModal";
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
import DraftsIcon from "@material-ui/icons/Drafts";

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
}));

const Header = () => {
  const classes = useStyles();
  const currentId = useRecoilValue(currentGroupId);
  const groups = useRecoilValue(groupsData);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const displayGroupName = () => {
    return groups.find((group) => group.id === currentId)?.groupName;
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="absolute">
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {displayGroupName()}
          </Typography>
          {/** 参加メンバーのアイコン */}
          <AvatarGroup max={4}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          </AvatarGroup>
          <IconButton color="inherit" onClick={handleOpen}>
            <Badge color="secondary">
              <MoreVertIcon />
            </Badge>
          </IconButton>
          <GroupModal open={open} close={handleClose} title="グループ設定" />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;

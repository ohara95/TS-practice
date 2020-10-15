import React from "react";
import { useRecoilValue } from "recoil";
import { currentGroupData } from "../atoms_recoil";
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
import DraftsIcon from "@material-ui/icons/Drafts";
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
}));

const Header = () => {
  const classes = useStyles();
  const currentGroup = useRecoilValue(currentGroupData);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            {currentGroup && currentGroup.groupName}
          </Typography>
          {/** 参加メンバーのアイコン */}
          <Avatar aria-label="recipe">
            <DraftsIcon />
          </Avatar>
          <IconButton color="inherit" onClick={handleOpen}>
            <Badge color="secondary">
              <MoreVertIcon />
            </Badge>
          </IconButton>
          <GroupModal open={open} close={handleClose} />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;

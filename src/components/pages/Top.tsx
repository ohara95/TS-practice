import React from "react";
//component
import Chat from "../chat";
import Profile from "../Profile";
import Header from "../Header";
// material
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    background: "white",
  },
  container: {
    paddingLeft: theme.spacing(4),
  },
  appBarSpacer: theme.mixins.toolbar,
  drawerPaper: {
    height: "100vh",
    position: "relative",
    whiteSpace: "nowrap",
    width: "100%",
    zIndex: 0,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  sideBorder: {
    borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
  },
}));

const Top = () => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div className={classes.container}>
          <Grid container direction="row" justify="space-between">
            <Grid item xs={9} style={{ marginTop: 30, paddingRight: 30 }}>
              <Chat />
            </Grid>
            <Grid item xs={3} className={classes.sideBorder}>
              <Drawer
                variant="permanent"
                classes={{
                  paper: clsx(classes.drawerPaper),
                }}
              >
                <Profile />
              </Drawer>
            </Grid>
          </Grid>
        </div>
      </main>
    </>
  );
};

export default Top;

import React from "react";
//component
import Chat from "../chat";
import Profile from "../Profile";
import Header from "../Header";
// material
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    background: "white",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  appBarSpacer: theme.mixins.toolbar,
}));

const Top = () => {
  const classes = useStyles();
  return (
    <>
      <Header />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container direction="row" justify="space-between" spacing={2}>
            <Grid item xs={9}>
              <Chat />
            </Grid>
            <Grid item xs={3}>
              <Profile />
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default Top;

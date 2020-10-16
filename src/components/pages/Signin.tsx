import React, { useContext } from "react";
import firebase from "../../config/firebase";
import { AuthContext } from "../../AuthService";
import { useForm, Controller } from "react-hook-form";
import { Link, Redirect, useHistory } from "react-router-dom";
// material
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "70%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type UseForm = {
  email: string;
  password: string;
};

const Signin = () => {
  const classes = useStyles();
  const { errors, control, handleSubmit } = useForm<UseForm>();
  const history = useHistory();

  const { user } = useContext(AuthContext);

  const onFormSubmit = (data: UseForm) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        history.push("/");
      })
      .catch((e) => {
        if (e.code === "auth/wrong-password") {
          return alert("パスワードが無効です");
        }
        if (e.code === "auth/too-many-requests") {
          return alert("しばらく時間をおいて再度お試しください");
        }
        console.log(e, "signin");
      });
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12} sm={6}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              ログイン
            </Typography>
            <form
              onSubmit={handleSubmit(onFormSubmit)}
              className={classes.form}
              noValidate
            >
              <Controller
                name="email"
                defaultValue=""
                control={control}
                rules={{ required: true }}
                as={
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="メールアドレス"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                }
              />
              {errors.email && <Typography>入力してください</Typography>}
              <Controller
                name="password"
                defaultValue=""
                control={control}
                rules={{ required: true }}
                as={
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="パスワード"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                }
              />
              {errors.password && <Typography>入力してください</Typography>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                　ログイン
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/">パスワードをお忘れですか？</Link>
                </Grid>
                <Grid item>
                  <Link to="/signup">{"新規登録はこちら"}</Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Signin;

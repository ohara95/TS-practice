import React, { useContext } from "react";
import firebase from "../../config/firebase";
import { AuthContext } from "../../AuthService";
import { useForm, Controller } from "react-hook-form";
import { Link, Redirect, useHistory } from "react-router-dom";
import { isLoading } from "../../atoms_recoil";
import { useRecoilState } from "recoil";
import Spinner from "../pages/Spinner";
// material
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange, grey } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    background: "white",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    color: deepOrange[200],
    backgroundColor: "white",
  },
  form: {
    width: "70%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: deepOrange[200],
    fontWeight: "bold",
    color: "white",
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
  const [loading, setLoading] = useRecoilState(isLoading);

  const { user } = useContext(AuthContext);

  const onFormSubmit = (data: UseForm) => {
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        setLoading(false);
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

  if (!user) {
    setLoading(false);
  } else {
    setLoading(true);
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12} sm={6}>
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <VpnKeyIcon style={{ fontSize: 40 }} />
                </Avatar>
                <Typography
                  component="h1"
                  variant="h5"
                  style={{ color: grey[700] }}
                >
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
                    className={classes.submit}
                  >
                    ログイン
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link to="/confirmpass">パスワードをお忘れですか？</Link>
                    </Grid>
                    <Grid item>
                      <Link to="/signup">新規登録はこちら→</Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Signin;

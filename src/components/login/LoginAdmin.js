import { Box, Grid, Paper } from "@mui/material";
import LoginForm from "./LoginForm";
import { userActions } from "../../store/slices/user-slice";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useDispatch } from "react-redux/es/exports";
import { useState } from "react";
import { useSelector } from "react-redux";

const LoginAdmin = () => {
  const stateToken = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      dispatch(userActions.login({ token: user.accessToken }));
    } else {
      dispatch(userActions.removeUser());
    }
  });

  const loginHandler = (email, pass) => {
    setError(null);
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, pass)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Ошибка авторизации");
        }
      })
      .catch((err) => setError(err.message));
    setIsLoading(false);
  };

  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <Grid container>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            background: "url(https://source.unsplash.com/random)",
            height: "100vh",
            backgroundSize: "cover",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <LoginForm
              error={error}
              loading={isLoading}
              onLogin={loginHandler}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginAdmin;

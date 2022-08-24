import { Box, TextField, Button, Alert, CircularProgress } from "@mui/material";
import { useRef } from "react";

const LoginForm = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const onLoginSubmit = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const pass = passwordRef.current.value;

    props.onLogin(email, pass);
  };

  return (
    <Box component="form" noValidate onSubmit={onLoginSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        inputRef={emailRef}
      />
      <TextField
        inputRef={passwordRef}
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Войти
      </Button>
      {props.loading && <CircularProgress sx={{ m: "auto", display: "block" }} />}
      {props.error && <Alert severity="error">{props.error}</Alert>}
    </Box>
  );
};

export default LoginForm;

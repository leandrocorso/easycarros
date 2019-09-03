import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
// Material UI
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  makeStyles,
  TextField
} from "@material-ui/core";
// Authentication
import LoginService from "../../services/LoginService";
// Actions
import { auth, clearAuthMessages } from "../../redux/login/actions";
// Components
import Alert from "../../components/Alert";
// Utils
import { validEmail } from "../../utils";
import { APP_NAME } from "../../utils/constants";

// Styles
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100vh"
  },
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 120,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(4),
    borderRadius: 10
  },
  formGroup: {
    marginBottom: theme.spacing(2)
  }
}));

function Login(props) {
  // Check if is logged to set redirect state
  const isAuth = LoginService.isAuthenticated();
  useEffect(() => {
    setRedirect(isAuth);
  }, [isAuth]);

  // Set dispatch instance
  const dispatch = useDispatch();

  // Setting states
  const [redirect, setRedirect] = useState(false);
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState();
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState();

  // Getting props from reducer
  const loginReducer = useSelector(state => state.login);

  // Changing the fields value
  const handleChange = event => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  // Sending data
  const handleSubmit = event => {
    event.preventDefault();

    // Validate e-mail
    if (!email) {
      setEmailError("E-mail is required");
    } else {
      if (!validEmail(email)) {
        setEmailError("Invalid e-mail");
      } else {
        setEmailError("");
      }
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }

    dispatch(auth(email, password));
  };

  // Clear the alert message
  const handleAlertClose = () => {
    dispatch(clearAuthMessages());
  };

  // Styles
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* Redirect */}
      {redirect && <Redirect to="/veiculos" />}

      {/* Page title */}
      <Box
        bgcolor="primary.main"
        color="primary.contrastText"
        className={classes.logo}
      >
        {APP_NAME}
      </Box>

      {/* Error messages */}
      {loginReducer.error && (
        <Alert
          testId="loginMessage"
          variant="error"
          open={!!loginReducer.error}
          message={loginReducer.error}
          onAlertClose={handleAlertClose}
        />
      )}

      {/* Login form */}
      <form onSubmit={handleSubmit} data-testid="loginForm">
        {/* E-mail */}
        <FormGroup className={classes.formGroup}>
          <FormControl>
            <TextField
              label="E-mail"
              onChange={e => setEmail(e.target.value)}
              name="email"
              autoComplete="off"
              error={!!emailError}
              helperText={emailError}
              inputProps={{
                "data-testid": "loginEmail"
              }}
            />
          </FormControl>
        </FormGroup>

        {/* Password */}
        <FormGroup className={classes.formGroup}>
          <FormControl>
            <TextField
              label="Senha"
              onChange={e => setPassword(e.target.value)}
              type="password"
              name="password"
              autoComplete="off"
              error={!!passwordError}
              helperText={passwordError}
              inputProps={{
                "data-testid": "loginPassword"
              }}
            />
          </FormControl>
        </FormGroup>

        {/* Send button */}
        <FormGroup className={classes.formGroup}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Entrar
          </Button>
        </FormGroup>
      </form>
    </div>
  );
}

export default Login;

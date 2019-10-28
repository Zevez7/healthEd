import React, { useState } from "react";
import { Paper, TextField, Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { auth } from "../Components/Firebase";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles({
  Box: {
    textAlign: "center"
  },
  Paper: {
    maxWidth: 600,
    marginTop: 100,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "whitesmoke"
  },
  TextField: {
    marginTop: 30,
    backgroundColor: "white"
  },

  Title: {
    margin: 30,
    fontWeight: "900"
  },
  Button: {
    backgroundColor: "white",
    marginTop: 40
  },
  ErrorMessage: {
    height: 30,
    color: "red",
    paddingTop: 5
  }
});

function Login() {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [redirect, setRedirect] = useState(false);
  // const handleChange = email => event => {
  //   setemail({ ...email, [email]: event.target.value });
  // };

  const handleSubmit = e => {
    e.preventDefault();
    var registrationInfo = {
      email: email,
      password: password
    };

    auth
      .signInWithEmailAndPassword(
        registrationInfo.email,
        registrationInfo.password
      )
      .then(() => {
        setErrorMessage(null);
        setPassword("");
        setEmail("");
        console.log("login successful");
        setRedirect(true);
      })
      .catch(error => {
        if (error.message !== null) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage(null);
        }
      });
  };

  return (
    <div>
      {redirect && <Redirect to="/" />}

      <Box className={classes.Box}>
        <form onSubmit={handleSubmit}>
          <Paper className={classes.Paper}>
            <Box>
              <Typography variant="h3" className={classes.Title}>
                LOGIN
              </Typography>
            </Box>

            <TextField
              label="Email Address"
              className={classes.TextField}
              value={email}
              onChange={e => setEmail(e.target.value)}
              margin="normal"
              variant="outlined"
            />
            <br />
            <TextField
              label="Password"
              className={classes.TextField}
              value={password}
              onChange={e => setPassword(e.target.value)}
              margin="normal"
              variant="outlined"
              type="password"
              autoComplete="current-password"
            />
            <Box className={classes.ErrorMessage}>
              {errorMessage && errorMessage}
            </Box>
            <Box>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                type="submit"
                className={classes.Button}
              >
                Submit
              </Button>
            </Box>
          </Paper>
        </form>
      </Box>
    </div>
  );
}

export default Login;

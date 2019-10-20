import React, { useState } from "react";
import { Paper, TextField, Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
  }
});

function SignUp() {
  const classes = useStyles();

  const [values, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <Box className={classes.Box}>
        <Paper className={classes.Paper}>
          <Box>
            <Typography variant="h3" className={classes.Title}>
              SIGNUP
            </Typography>
          </Box>

          <TextField
            label="Email Address"
            // className={classes.textField}
            className={classes.TextField}
            value={values}
            onChange={e => setEmail(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <br />
          <TextField
            label="Password"
            // className={classes.textField}
            className={classes.TextField}
            value={password}
            onChange={e => setPassword(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <Box>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              className={classes.Button}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Box>
    </div>
  );
}

export default SignUp;

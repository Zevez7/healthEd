import React, { useState } from "react";
import { Paper, TextField, Box, Typography, Button } from "@material-ui/core";

function SignUp() {
  const [values, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SignUp = {
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
  };

  return (
    <div>
      <Box style={SignUp.Box}>
        <Paper style={SignUp.Paper}>
          <Box>
            <Typography variant="h3" style={SignUp.Title}>
              SIGNUP
            </Typography>
          </Box>

          <TextField
            label="Email Address"
            // className={classes.textField}
            style={SignUp.TextField}
            value={values}
            onChange={e => setEmail(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <br />
          <TextField
            label="Password"
            // className={classes.textField}
            style={SignUp.TextField}
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
              style={SignUp.Button}
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

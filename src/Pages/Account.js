import React from "react";
import { Box, Paper, Button, Typography } from "@material-ui/core/";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  input: {
    margin: 1
  },
  title: {
    fontWeight: 700
  },
  topSpacing: {
    paddingTop: 50
  },
  content: {
    padding: 30,
    marginTop: 20,
    backgroundColor: "whitesmoke",
    marginRight: "auto",
    maxWidth: 500
  },
  Button: {
    backgroundColor: "white",
    marginTop: 40
  },
  Clear: {
    backgroundColor: "white",
    marginTop: 40,
    marginRight: 30
  }
});

function Account() {
  const classes = useStyles();

  return (
    <div>
      <Box className={classes.topSpacing}></Box>
      <Typography variant="h4" className={classes.title}>
        ACCOUNT
      </Typography>
      <Paper className={classes.content}>
        <Typography variant="h5">DATWestern</Typography>
        <Typography variant="subtitle2">Username</Typography>

        <br />
        <Typography variant="h5">Oksmuerhouse@gmail.com</Typography>
        <Typography variant="subtitle2">Email</Typography>

        <br />

        <Box>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            disabled
            className={classes.Clear}
            // onClick={handleClearChange}
          >
            CANCEL
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            className={classes.Button}
          >
            EDIT
          </Button>
        </Box>
      </Paper>
    </div>
  );
}

export default Account;

import React, { useContext, useEffect, useState } from "react";
import { Box, Paper, Button, Typography } from "@material-ui/core/";

import { makeStyles } from "@material-ui/core/styles";
import { UserContext, UserDataContext } from "../App";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexWrap: "wrap"
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
    width: "auto"
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

  const UserCT = useContext(UserContext);
  const UserDataCT = useContext(UserDataContext);

  //****testing
  console.log("UserCT", UserCT);
  //****testing
  console.log("UserDataCT", UserDataCT);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (UserDataCT) {
      setUserName(UserDataCT.userName);
      setEmail(UserDataCT.email);
    }
  }, [UserDataCT]);

  return (
    <div>
      <Box className={classes.topSpacing}></Box>
      <Typography variant="h4" className={classes.title}>
        ACCOUNT
      </Typography>
      <Paper className={classes.content}>
        <Typography variant="h5">{userName ? userName : "loading"}</Typography>
        <Typography variant="subtitle2">Username</Typography>

        <br />
        <Typography variant="h5">{email ? email : "loading"}</Typography>
        <Typography variant="subtitle2">Email Address</Typography>

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

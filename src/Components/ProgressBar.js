import React, { useContext } from "react";
import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Box
} from "@material-ui/core";
import { makeStyles, withStyles, lighten } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Link } from "react-router-dom";
import ConfirmationDialogBox from "../Components/ConfirmationDialogBox";
import { db } from "./Firebase";
import { UserDataContext } from "../App";

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten("#008000", 0.7)
  },
  bar: {
    borderRadius: 0,
    backgroundColor: "#008000"
  }
})(LinearProgress);

const useStyles = makeStyles({
  Unit: {
    padding: 2,
    backgroundColor: "whitesmoke"
  },
  Card: {
    marginBottom: 15
  },
  Body: {
    paddingTop: 7
  },
  AlignRight: {
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "#F5F5F5"
  },
  RemoveBtn: {
    padding: 3
  }
});

//****testing

function ProgressBar(props) {
  const classes = useStyles();
  const userDataCT = useContext(UserDataContext);

  // const filteredSavedMedia = () => {
  //   //****testing
  // };

  const RemoveProgress = () => {
    // copy userDataCT.savedMedia into a new object
    // delete the localSavedMedia that matches the quiz id
    const localSavedMedia = { ...userDataCT.savedMedia };
    delete localSavedMedia[props.id];
    console.log("localSavedMedia", localSavedMedia);

    // this remove progress is basically replacing the old savedMedia
    // with a new savedMedia with the delete progress gone
    db.collection("users")
      .doc(`${props.userId}`)
      .update({
        savedMedia: localSavedMedia
      })
      .then(() => {
        console.log("Remove media from progress");
        props.handleSnackBarOpen();
      })
      .catch(error => {
        console.error("Error removing document: ", error);
      });
  };

  //****testing
  console.log("props.id", props.id);
  console.log("props.userId", props.userId);
  console.log("props.progress", props.progress);
  return (
    <div>
      <Card className={classes.Card}>
        <Link to={`/mediapage/${props.id}/${props.progress}`}>
          <CardActionArea className={classes.Unit}>
            <CardContent>
              <Typography variant="h5">{props.title}</Typography>
              <BorderLinearProgress
                className={classes.Margin}
                variant="determinate"
                color="primary"
                value={props.length}
              />
              <Typography
                className={classes.Body}
                variant="body2"
                color="textPrimary"
              >
                {props.body}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <Box className={classes.AlignRight}>
          <CardActions className={classes.RemoveBtn}>
            <ConfirmationDialogBox
              buttonText={"Remove"}
              title={"Remove Saved Progress"}
              message={"Are you sure you want to remove saved progress?"}
              cancel={"Cancel"}
              cancelColor={"secondary"}
              accept={"Submit"}
              acceptColor={"primary"}
              size={"small"}
              variant={"text"}
              ButtonColor={"primary"}
              acceptFunction={() => RemoveProgress()}
            />
          </CardActions>
        </Box>
      </Card>
    </div>
  );
}

export default ProgressBar;

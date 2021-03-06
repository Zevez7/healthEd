import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, Paper, Button, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Quiz from "../Components/Quiz.js";
import { db } from "../Components/Firebase";
import useSnackBar from "../Hooks/useSnackBar";
import { MediaContext, UserContext } from "../App";

// icons
import ArrowBack from "@material-ui/icons/KeyboardArrowLeft";
import ArrowForward from "@material-ui/icons/KeyboardArrowRight";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

const useStyles = makeStyles({
  title: { padding: 10 },
  h100: {
    height: 100,
    width: "auto"
  },
  placeholder: {
    height: "auto",
    width: "auto",
    backgroundColor: "whitesmoke"
  },
  userName: {
    padding: 5
  },
  userNameBox: { marginTop: 20 },
  description: {
    padding: 5
  },
  date: {
    padding: 5,
    paddingTop: 0
  },
  slide: {
    padding: 50
  },
  buttonBox: {
    paddingTop: 20,
    paddingBottom: 20
  },
  counterBox: {
    paddingLeft: 20,
    paddingRight: 20
  },
  Bookmark: {
    float: "right"
  },
  BookMarkIcon: {
    fontSize: 30
  },
  SnackbarSuccessful: {
    backgroundColor: "#4CAF50",
    color: "white"
  }
});

function MediaPage(props) {
  const classes = useStyles();

  const mediaCT = useContext(MediaContext);
  const userCT = useContext(UserContext);

  // custom snackBar Hook array destructuring
  const [
    handleSnackBarOpen,
    handleSnackBarClose,
    stateSnackBar,
    stringMessage
  ] = useSnackBar("Progress Saved Successfully");

  // custom snackBar Hook object destructuring
  const { vertical, horizontal, open } = stateSnackBar;

  const SnackBarElement = (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      key={`${vertical},${horizontal}`}
      open={open}
      onClose={handleSnackBarClose}
      ContentProps={{
        "aria-describedby": "message-id",
        classes: { root: classes.SnackbarSuccessful }
      }}
      message={<span id="message-id">{stringMessage}</span>}
    />
  );

  // data is populated by props passed down and match with url parameter mediaId and filtered
  // media var will be set first
  // changes in the media will cause useEffect to run
  const mediaLS = JSON.parse(localStorage.getItem("mediaLS"));

  // set media to passed mediaCT or mediaLS
  const media =
    mediaCT.length > 0
      ? mediaCT.find(item => item.id.toString() === props.match.params.mediaId)
      : mediaLS;

  //store filtered media to localStorage called mediaLS
  //when media changes, store a new localStorage with useEffect
  useEffect(() => {
    localStorage.setItem("mediaLS", JSON.stringify(media));
  }, [media]);

  // setting state for slide count to display
  // props.match.params.slide returns a string,
  // must subtract 1 to get num for count array index
  const [count, setCount] = useState(
    parseInt(props.match.params.slideNum)
      ? parseInt(props.match.params.slideNum) - 1
      : 0
  );

  const countMax = Object.keys(media.slide).length - 1;

  // update will create a new Mid object if there isn't anyone
  // and will overwrite if the Mid object if there is one
  const saveProgress = () => {
    db.collection(`users`)
      .doc(userCT.uid)
      .update({
        [`savedMedia.${media.id}`]: { slide: count + 1, name: media.title }
      })
      .then(() => handleSnackBarOpen());
  };

  // logic to disable to show back arrow and front arrow
  const disableBack = () => (count === 0 ? true : false);
  const disableForward = () => (count === countMax ? true : false);

  const ArrowBackButton = () => {
    setCount(count - 1);
    // this will reset the radioButton group select value when clicking on the ArrowBackButton
  };

  const arrowForwardClickHandle = () => {
    setCount(count + 1);
  };

  return (
    <>
      {/* custom snackbar hook */}
      {SnackBarElement}
      <div className={classes.h100} />
      <Box className={classes.title}>
        <Box className={classes.Bookmark}>
          {userCT && (
            <Button onClick={() => saveProgress()} size="large">
              <BookmarkBorderIcon className={classes.BookMarkIcon} /> Save
              Progress
            </Button>
          )}
        </Box>
        <Typography variant="h4">{media.title}</Typography>
      </Box>
      <Paper className={classes.placeholder}>
        <Typography className={classes.slide} variant="h5">
          {media.slide[count].content}
        </Typography>
      </Paper>

      {/* inserting the question ID associated with the slide. using props */}
      {media.slide[count].Qid && (
        <Box>
          <Quiz Qid={media.slide[count].Qid} key={media.slide[count].Qid} />
        </Box>
      )}

      {/* Slide Screen */}
      <Box align="center" className={classes.buttonBox}>
        <Button
          onClick={() => ArrowBackButton()}
          disabled={disableBack()}
          size="large"
        >
          <ArrowBack />
          Previous
        </Button>
        <Box className={classes.counterBox} component="span">
          {count + 1} / {countMax + 1}
        </Box>
        <Button
          onClick={arrowForwardClickHandle}
          disabled={disableForward()}
          size="large"
        >
          Next <ArrowForward />
        </Button>
      </Box>
    </>
  );
}

export default MediaPage;

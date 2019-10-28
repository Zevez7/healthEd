import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, Paper, Button } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/KeyboardArrowLeft";
import ArrowForward from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles } from "@material-ui/core/styles";
import Quiz from "../Components/Quiz.js";
import { MediaContext } from "../App";

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
  }
});

function MediaPage(props) {
  const classes = useStyles();

  const mediaCT = useContext(MediaContext);

  // data is populated by props passed down and match with url parameter mediaId and filtered
  // media var will be set first
  // changes in the media will cause useEffect to run

  const mediaLS = JSON.parse(localStorage.getItem("mediaLS"));
  //****testing
  console.log("mediaLS", mediaLS);

  // set media to passed mediaCT or mediaLS
  const media =
    mediaCT.length > 0
      ? mediaCT.find(item => item.id.toString() === props.match.params.mediaId)
      : mediaLS;

  //****testing
  console.log("mediaCT", mediaCT);
  console.log("media", media);

  useEffect(() => {
    //store filtered media to localStorage called mediaLS
    //when media changes, store a new localStorage with useEffect
    localStorage.setItem("mediaLS", JSON.stringify(media));
    console.log("useEffect mediaLS");
  }, [media]);

  console.log("media after useEffect", media);

  //****testing
  // console.log("mediaState", mediaState);

  // setting state for slide count to display
  const [count, setCount] = useState(0);

  const countMax = Object.keys(media.slide).length - 1;

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
      <div className={classes.h100} />
      <Box className={classes.title}>
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

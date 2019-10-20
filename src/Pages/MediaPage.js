import React, { useState } from "react";
import { Box, Typography, Paper, Button } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/KeyboardArrowLeft";
import ArrowForward from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles } from "@material-ui/core/styles";

import TestData from "../Data/testData.json";
import Quiz from "../Components/Quiz.js";

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

function MediaPage({ match }) {
  const classes = useStyles();

  const media =
    TestData &&
    TestData.find(item => item.id.toString() === match.params.mediaId);

  // setting state for slide count to display
  const [count, setCount] = useState(1);

  const countMax = Object.keys(media.slide).length;

  console.log(countMax);
  // logic to disable to show back arrow and front arrow
  const disableBack = () => (count === 1 ? true : false);
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

      <Box>
        {/* inserting the question ID associated with the slide. using props */}
        <Quiz Qid={media.slide[count].Qid} key={media.slide[count].Qid} />
      </Box>

      <hr />
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
          {count} / {countMax}
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

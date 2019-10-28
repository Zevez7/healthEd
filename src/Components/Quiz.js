import React, { useState, useContext } from "react";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography
} from "@material-ui/core";
// import QData from "../Data/questionData.json";
import { makeStyles } from "@material-ui/core/styles";
import { QuestionContext } from "../App";

const useStyles = makeStyles({
  question: {
    padding: 20
  },
  FormControl: {
    padding: 30
  },
  ansDisplay: {
    visibility: "hidden"
  },
  ansCorrect: {
    color: "green",
    fontWeight: "600"
  },
  ansIncorrect: {
    color: "red",
    fontWeight: "600"
  }
});

function Quiz(props) {
  const classes = useStyles();
  const questionCT = useContext(QuestionContext);

  const [correctAns, setCorrectAns] = useState(null);
  const [value, setValue] = useState("");
  // styling

  // this will check if the index of the selected radio box matches the correct answers
  // correct matches will CL "correct answer"
  const checkCorrect = (index, numCorrect, item) => {
    if (index === numCorrect) {
      setCorrectAns(true);
      console.log("correct answer", `correct answer for ${index}`);
    } else {
      setCorrectAns(false);
      console.log(`answer not correct ${index}`);
    }
    setValue(item);
  };

  // match the passed Qid prop from landing with the questionCT to get one item
  const OneQ =
    questionCT &&
    questionCT.find(item => {
      return item.id === props.Qid;
    });

  //****testing
  console.log("questionCT", questionCT);

  //****testing
  console.log("OneQ", OneQ);

  // map through the oneQ choice to find the choices to map through it
  const QChoice = OneQ.choices.map((item, index) => (
    <FormControlLabel
      key={index}
      value={item}
      control={
        <Radio
          color="primary"
          key={index}
          value={item}
          onChange={e => checkCorrect(index, OneQ.answer, item)}
        />
      }
      label={item}
    />
  ));

  // display logic for when correctAns is selected or not
  let correctAnsDisplay;

  if (correctAns === true) {
    correctAnsDisplay = (
      <Typography className={classes.ansCorrect}> Correct </Typography>
    );
  } else if (correctAns === false) {
    correctAnsDisplay = (
      <Typography className={classes.ansIncorrect}> Incorrect </Typography>
    );
  } else {
    correctAnsDisplay = (
      <Typography className={classes.ansDisplay}>
        {" "}
        invisible placeholder{" "}
      </Typography>
    );
  }

  return (
    <div>
      <FormControl component="fieldset" className={classes.FormControl}>
        <Typography className={classes.question} variant="h6">
          {OneQ.question}
        </Typography>
        {correctAnsDisplay}
        <RadioGroup
          aria-label="gender"
          name={`${props.Qid}`}
          value={value}
          // onChange={handleChange}
        >
          {QChoice}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default Quiz;

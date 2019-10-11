import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography
} from "@material-ui/core";
import QData from "../Data/questionData.json";

function Quiz(props) {
  const [correctAns, setCorrectAns] = useState(null);
  const [value, setValue] = useState("");
  // styling
  const quiz = {
    question: {
      padding: 20
    },
    FormControl: {
      padding: 30
    },
    ansDisplay: {
      visibility: "hidden"
    }
  };

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

  // match the passed Qid prop from landing with the Qdata to get one item
  const OneQ = QData && QData.find(item => item.Qid === props.Qid);
  // console.log("props.Qid", props.Qid);
  // console.log(OneQ);

  // map through the oneQ choice to find the choices to map through it
  const QChoice = OneQ.Choice.map((item, index) => (
    <FormControlLabel
      key={index}
      value={item}
      control={
        <Radio
          color="primary"
          key={index}
          value={item}
          onChange={e => checkCorrect(index, OneQ.Correct, item)}
        />
      }
      label={item}
    />
  ));

  let correctAnsDisplay;

  if (correctAns === true) {
    correctAnsDisplay = <Typography> Correct </Typography>;
  } else if (correctAns === false) {
    correctAnsDisplay = <Typography> Incorrect </Typography>;
  } else {
    correctAnsDisplay = (
      <Typography style={quiz.ansDisplay}> empty </Typography>
    );
  }

  return (
    <div>
      <FormControl component="fieldset" style={quiz.FormControl}>
        <Typography style={quiz.question} variant="h6">
          {OneQ.Question}
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

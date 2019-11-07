import React, { useContext } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { QuestionContext } from "../App";

const useStyles = makeStyles({
  ChoiceItem: {
    paddingLeft: 15
  }
});

const QuestionExpPanel = props => {
  const classes = useStyles();
  const questionCT = useContext(QuestionContext);

  // using the media question id from the slide to
  // find the matching question from questionCT
  const OneQ = questionCT.find(item => {
    return item.id === props.Qid;
  });

  return (
    <div>
      <Typography>Question: {OneQ.question} </Typography>
      <Typography>Answer: {OneQ.answer + 1} </Typography>
      <Typography>
        Choices:
        {OneQ.choices.map((item, index) => {
          return (
            <Typography className={classes.ChoiceItem}>
              {index + 1}. {item}
            </Typography>
          );
        })}
      </Typography>
    </div>
  );
};

export default QuestionExpPanel;

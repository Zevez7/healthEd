import React, { useState, useContext } from "react";
import { db } from "./Firebase";
import { MediaContext } from "../App";

import {
  Button,
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  DialogActions,
  Box,
  MenuItem,
  Typography
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  QuizButton: {
    backgroundColor: "white"
  },
  CorrectAnswer: {
    marginTop: 5,
    marginBottom: 20,
    width: 300
  },
  ChoiceButton: {
    backgroundColor: "white",
    marginTop: 10,
    marginLeft: 10
  },
  ChoiceBox: {
    textAlign: "center"
  },
  Button: {
    backgroundColor: "white",
    marginTop: 40
  },
  Clear: {
    backgroundColor: "white",
    marginTop: 40,
    marginRight: 30
  },
  Question: {
    marginBottom: 20
  }
});

export default function FormDialog(props) {
  const classes = useStyles();
  const mediaCT = useContext(MediaContext);

  // const selectAnswer = [1, 2, 3, 4];

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [NoAnswerChoice, setNoAnswerChoice] = useState(false);

  const handleQuestionChange = e =>
    setQuestion((e.target.name = e.target.value));
  const handleAnswerChange = e => setAnswer((e.target.name = e.target.value));

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const blankChoice = {};
  // creating a pure array with dot spread notation and setting it to slide dysyr
  // this will prevent blankChoice variable from changing with setSlide method call
  const [choices, setChoices] = useState([{ ...blankChoice }]);

  const addAnswer = () => {
    // adding object inside the slide array require dot spread notation
    // to append the extra array to the array of slide
    // the array of slide will then be mapped in the return
    // the mapping will added all the name,key, label, id
    setChoices([...choices, { ...blankChoice }]);
  };

  //****testing
  console.log("mediaCT", mediaCT);
  //****testing
  console.log("answer", answer);

  const addQuestion = e => {
    e.preventDefault();

    if (typeof answer == "number") {
      // add the question to the database
      // grab the question's ID from the database
      db.collection(`questions`)
        .add({
          question: question,
          answer: answer,
          choices: choices
        })
        .then(docRef => {
          // find the array element from the mediaCT list that matches props.Mid
          let media = mediaCT.find(item => item.id.toString() === props.Mid);

          // go in and add the new Qid in the slide object array of the media element array
          media.slide[props.index].Qid = docRef.id;

          // now reinsert the media.slide with the new Qid as whole to the database

          db.collection("media")
            .doc(props.Mid)
            .update({
              slide: media.slide
            });
        })
        .then(() => {
          console.log("Firebase Add Question");
        })
        .catch(error => {
          console.error("Firebase Add Question error:", error);
        });

      setQuestion("");
      setAnswer("");
      setChoices([]);
    } else {
      setNoAnswerChoice(true);
    }
  };

  const removeChoice = () => {
    const removeLast = choices.slice(0, -1);

    setChoices(removeLast);
  };

  //****testing
  console.log("props.Mid", props.Mid);

  //****testing
  console.log("props.index", props.index);

  const handleSlideChange = e => {
    // creating a pure array with dot spread notation of the already populated slide state
    const updatedChoice = [...choices];
    console.log("1updatedChoice", updatedChoice);
    //adding nested obj using bracket updateslide[1][content] to e.target.value
    // the updateslide will update input changed based on the target.dataset.idx
    updatedChoice[e.target.dataset.idx] = e.target.value;

    // @todo add quiz id here

    console.log("2updatedChoice", updatedChoice[e.target.dataset.idx]);

    // update the element of that value to the slide state
    setChoices(updatedChoice);
  };

  const handleClearChange = () => {
    setChoices([]);
    setQuestion("");
    setAnswer("");
    setNoAnswerChoice(false);
    console.log("slidecleared");
  };
  //****testing
  console.log("choice", choices);

  return (
    <div>
      <Button
        className={classes.QuizButton}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        size="small"
      >
        Add Question
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {" "}
        <form onSubmit={addQuestion}>
          <DialogTitle id="form-dialog-title">Add Quiz Question </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="question"
              label="Question"
              value={question}
              type="text"
              variant="outlined"
              fullWidth
              onChange={handleQuestionChange}
              className={classes.Question}
              required
            />
            {NoAnswerChoice ? (
              <Typography variant="body1" color="secondary">
                Choose An Answer
              </Typography>
            ) : null}
            <TextField
              id="outlined-select-currency"
              select
              label="Answer"
              className={classes.CorrectAnswer}
              value={answer}
              onChange={handleAnswerChange}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              helperText="Please Select The Correct Choice"
              margin="dense"
              variant="outlined"
              required
            >
              {choices.map((item, index) => (
                <MenuItem key={index} value={index}>
                  {index + 1}
                </MenuItem>
              ))}
            </TextField>

            {choices.map((val, idx) => {
              //  mapping create a new const slideId from the index value of the map
              const choiceId = `choice-${idx}`;
              return (
                <React.Fragment key={`choice-${idx}`}>
                  <TextField
                    key={`choice-${idx}`}
                    label={`Choice #${idx + 1}`}
                    name={choiceId}
                    id={choiceId}
                    className={classes.TextField}
                    InputProps={{
                      inputProps: {
                        // this attribute is required to target the data-set of the slide array
                        "data-idx": `${idx}`
                      }
                    }}
                    value={choices[idx].slideName}
                    onChange={handleSlideChange}
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    required
                  />

                  <br />
                </React.Fragment>
              );
            })}

            <Box className={classes.ChoiceBox}>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                className={classes.ChoiceButton}
                onClick={removeChoice}
              >
                Remove Choice
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                className={classes.ChoiceButton}
                onClick={addAnswer}
              >
                Add Choice
              </Button>
            </Box>
          </DialogContent>
          <DialogActions className={classes.DialogAction}>
            <Box>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                className={classes.Clear}
                onClick={handleClearChange}
              >
                CLEAR
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                className={classes.Button}
                type="submit"
              >
                Submit
              </Button>
            </Box>
          </DialogActions>{" "}
        </form>
      </Dialog>
    </div>
  );
}

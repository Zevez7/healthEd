import React, { useState, useContext } from "react";
import {
  Paper,
  TextField,
  Box,
  Typography,
  Button,
  Snackbar
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { db } from "../Components/Firebase";
import useSnackBar from "../Hooks/useSnackBar";
import { UserDataContext } from "../App";

import { DateTime } from "luxon";

// styling
const useStyles = makeStyles({
  Box: {
    textAlign: "center"
  },
  Paper: {
    maxWidth: 600,
    marginTop: 100,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "whitesmoke"
  },
  TextField: {
    marginTop: 20,
    backgroundColor: "white"
  },

  Title: {
    margin: 30,
    fontWeight: "900"
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
    textAlign: "left",
    paddingLeft: 5
  },
  QTypo: {
    fontSize: "0.7rem"
  },
  SnackbarSuccessful: {
    backgroundColor: "#4CAF50",
    color: "white"
  }
});

function Submit() {
  const classes = useStyles();
  const userDataCT = useContext(UserDataContext);
  // custom snackBar Hook array destructuring
  const [
    handleSnackBarOpen,
    handleSnackBarClose,
    stateSnackBar,
    stringMessage
  ] = useSnackBar("Media Successfully Added");

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

  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");

  const handleTitleChange = e => setTitle((e.target.name = e.target.value));
  const handleInfoChange = e => setInfo((e.target.name = e.target.value));

  const username = userDataCT && userDataCT.userName;

  // luxon, add a iso timestamp 
  const now = DateTime.local().toISO();


  const addMedia = e => {
    e.preventDefault();

    db.collection(`media`)
      .add({
        title: title,
        info: info,
        slide: slide,
        username: username,
        date: now
      })
      .then(() => {
        setTitle("");
        setInfo("");
        setSlide([]);
        handleSnackBarOpen();
        console.log("Firebase Media add");
      })
      .catch(error => {
        console.error("Firebase Media add error:", error);
      });
  };

  // object with a key of slide and a value of " "
  const blankSlide = {};
  // creating a pure array with dot spread notation and setting it to slide dysyr
  // this will prevent blankslide variable from changing with setSlide method call
  const [slide, setSlide] = useState([{ ...blankSlide }]);

  const addSlide = () => {
    // adding object inside the slide array require dot spread notation
    // to append the extra array to the array of slide
    // the array of slide will then be mapped in the return
    // the mapping will added all the name,key, label, id
    setSlide([...slide, { ...blankSlide }]);
  };

  const handleSlideChange = e => {
    // creating a pure array with dot spread notation of the already populated slide state
    const updatedSlides = [...slide];
    console.log("1updatedSlides", updatedSlides);
    //adding nested obj using bracket updateslide[1][content] to e.target.value
    // the updateslide will update input changed based on the target.dataset.idx
    updatedSlides[e.target.dataset.idx]["content"] = e.target.value;

    // @todo add quiz id here

    console.log("2updatedSlides", updatedSlides[e.target.dataset.idx]);

    // update the element of that value to the slide state
    setSlide(updatedSlides);
  };

  // clear button require setState to be an empty array and string quote.
  const handleClearChange = () => {
    setSlide([]);
    setTitle("");
    setInfo("");
    console.log("slidecleared");
  };

  console.log("slide", slide);

  return (
    <>
      {/* custom snackbar hook */}
      {SnackBarElement}

      <Box className={classes.Box}>
        <Paper className={classes.Paper}>
          <Box>
            <Typography variant="h3" className={classes.Title}>
              SUBMIT MEDIA
            </Typography>
          </Box>
          <form onSubmit={addMedia}>
            <TextField
              label="Title"
              name="title"
              id="title"
              className={classes.TextField}
              value={title}
              onChange={handleTitleChange}
              margin="normal"
              variant="outlined"
              fullWidth
              required={true}
            />
            <br />

            <TextField
              label="Info"
              name="info"
              id="info"
              className={classes.TextField}
              value={info}
              onChange={handleInfoChange}
              margin="normal"
              variant="outlined"
              multiline
              rows="3"
              fullWidth
              required={true}
            />
            <br />

            {slide.map((val, idx) => {
              //  mapping create a new const slideId from the index value of the map
              const slideId = `slide-${idx}`;
              return (
                <div key={`slide-${idx}`}>
                  <TextField
                    key={`slide-${idx}`}
                    label={`Slide #${idx + 1}`}
                    name={slideId}
                    id={slideId}
                    className={classes.TextField}
                    InputProps={{
                      inputProps: {
                        // this attribute is required to target the data-set of the slide array
                        "data-idx": `${idx}`
                      }
                    }}
                    value={slide[idx].slideName}
                    onChange={handleSlideChange}
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows="3"
                    fullWidth
                    required={true}
                  />

                  <br />
                </div>
              );
            })}

            <br />

            <Box>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                className={classes.Button}
                onClick={addSlide}
              >
                Add New Slide
              </Button>
            </Box>

            <br />

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
          </form>
        </Paper>
      </Box>
    </>
  );
}

export default Submit;

import React, { useState } from "react";
import { Paper, TextField, Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
    marginTop: 10,
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
  }
});

function Submit(props) {
  const classes = useStyles();

  // const [title, setTitle] = useState({ title: "" });
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");

  const handleTitleChange = e => setTitle((e.target.name = e.target.value));

  const handleInfoChange = e => setInfo((e.target.name = e.target.value));

  // object with a key of slide and a value of " "
  const blankSlide = { slide: "" };
  // creating a pure array with dot spread notation and setting it to slide dysyr
  // this will prevent blankslide variable from changing with setSlide method call
  const [slide, setSlide] = useState([{ ...blankSlide }]);

  const addSlide = () => {
    // adding object inside the slide array require dot spread notation
    // to append the extra array to the array of slide
    // the array of slide will then be mapped in the render function
    setSlide([...slide, { ...blankSlide }]);
  };

  const handleSlideChange = e => {
    // creating a pure array with dot spread notation of the already populated slide state
    const updatedSlides = [...slide];
    console.log("1updatedSlides", updatedSlides);
    // find the array element with the dataset idx and setting the specific slide
    // to the value of that element
    updatedSlides[e.target.dataset.idx] = e.target.value;
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

  console.log(slide);

  console.log("passedApp quizData", props.quizData);
  return (
    <>
      <Box className={classes.Box}>
        <Paper className={classes.Paper}>
          <Box>
            <Typography variant="h3" className={classes.Title}>
              SUBMIT
            </Typography>
          </Box>
          <form>
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
            />
            <br />

            {slide.map((val, idx) => {
              // when mapping create a new const slideId from the index value of the map
              const slideId = `slide-${idx}`;
              return (
                <>
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
                  />
                  <br />
                </>
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
                Add New Content
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

import React, { useState } from "react";
import { Paper, TextField, Box, Typography, Button } from "@material-ui/core";

// styling
const submit = {
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
};

function Submit() {
  // const [title, setTitle] = useState({ title: "" });
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");

  const handleTitleChange = e => setTitle((e.target.name = e.target.value));

  const handleInfoChange = e => setInfo((e.target.name = e.target.value));

  // object with a key value pair of slide and empty string
  const blankSlide = { slide: "" };
  // creating a pure array with dot spread notation and setting it to slide
  // this will prevent blankslide variable from changing with setSlide method call
  const [slide, setSlide] = useState([{ ...blankSlide }]);

  const addSlide = () => {
    setSlide([...slide, { ...blankSlide }]);
  };

  const handleSlideChange = e => {
    // creating a pure array with dot spread notation
    const updatedSlides = [...slide];
    console.log("1updatedSlides", updatedSlides);
    // find the array element with the dataset idx and setting to the value of that element
    updatedSlides[e.target.dataset.idx] = e.target.value;
    // update the element of that value to the slide state
    console.log("2updatedSlides", updatedSlides[e.target.dataset.idx]);

    setSlide(updatedSlides);
  };

  const handClearChange = () => {
    setSlide([{ slide: "" }]);
    setTitle("");
    setInfo("");
    console.log("slidecleared");
  };

  console.log(slide);
  return (
    <>
      <Box style={submit.Box}>
        <Paper style={submit.Paper}>
          <Box>
            <Typography variant="h3" style={submit.Title}>
              SUBMIT
            </Typography>
          </Box>
          <form>
            <TextField
              label="Title"
              name="title"
              id="title"
              style={submit.TextField}
              value={title}
              onChange={handleTitleChange}
              margin="normal"
              variant="outlined"
            />
            <br />

            <TextField
              label="Info"
              name="info"
              id="info"
              style={submit.TextField}
              value={info}
              onChange={handleInfoChange}
              margin="normal"
              variant="outlined"
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
                    style={submit.TextField}
                    InputProps={{
                      inputProps: {
                        "data-idx": `${idx}`
                      }
                    }}
                    value={slide[idx].slideName}
                    onChange={handleSlideChange}
                    margin="normal"
                    variant="outlined"
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
                style={submit.Button}
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
                style={submit.Clear}
                onClick={handClearChange}
              >
                CLEAR
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                style={submit.Button}
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

import React, { useState, useContext } from "react";
import { Paper, TextField, Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { db } from "../Components/Firebase";
import { UserContext } from "../App";

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
  }
});

function Submit(props) {
  const classes = useStyles();
  const userCT = useContext(UserContext);

  // useEffect(() => {

  // }, []);

  //****testing
  console.log("userCT", userCT);
  // const [title, setTitle] = useState({ title: "" });
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");

  const handleTitleChange = e => setTitle((e.target.name = e.target.value));
  const handleInfoChange = e => setInfo((e.target.name = e.target.value));

  const addMedia = e => {
    e.preventDefault();

    db.collection(`media`)
      .add({
        title: title,
        info: info,
        slide: slide
      })
      .then(() => {
        console.log("Firebase Media add");
      })
      .catch(error => {
        console.error("Firebase Media add error:", error);
      });

    setTitle("");
    setInfo("");
    setSlide([]);
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

  console.log("passedApp quizData", props.quizData);
  return (
    <>
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
                    required={true}
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

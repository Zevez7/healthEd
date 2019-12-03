import React from "react";
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Box,
  Grid
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// component
import LibraryQuestion from "./LibraryQuestion";
import QuestionModal from "./QuestionModal";
import DeleteQuestion from "./DeleteQuestion";
import DeleteMedia from "./DeleteMedia";

import { makeStyles } from "@material-ui/core/styles";
// import { QuestionContext } from "../App";

import { DateTime } from "luxon";

// takes the dataString and coverts it to luxonDT
// return the luxonDT to readable localstring
const DateTimeToString = dataString => {
  const dt = DateTime.fromISO(dataString);
  return dt.toLocaleString();
};

const useStyles = makeStyles({
  Details: {
    display: "block",
    backgroundColor: "white",
    padding: 0
  },
  Slides: { marginTop: 10 },
  SlideUnit: { display: "block", padding: 15 },
  Content: {
    marginTop: 3,
    width: "100%",
    display: "block"
  },
  Question: {
    marginTop: 10
  },
  Spacer: {
    marginTop: 0
  },
  ExpansionPanel: {
    backgroundColor: "whitesmoke"
  },
  AlignRight: {
    display: "flex",
    justifyContent: "flex-end"
  },
  DeleteMedia: { padding: 15 }
});

const ExpPanel = props => {
  const classes = useStyles();

  // check to see if Media Qid exist in QuestionCT

  return (
    <Box>
      <ExpansionPanel className={classes.ExpansionPanel}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.Title}
        >
          <Typography variant="h6">{props.title}</Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails className={classes.Details}>
          <Box className={`${classes.DeleteMedia} bgHover`}>
            <Typography variant="body1">{props.username}</Typography>
            <Typography variant="body1">ID: {props.id}</Typography>
            <Typography variant="body1">
              date: {DateTimeToString(props.date)}
            </Typography>
            <Typography variant="body1">Info: {props.info}</Typography>
            <Box className={classes.AlignRight}>
              <DeleteMedia
                Id={props.id}
                handleSnackBarOpen={props.handleSnackBarOpen}
                title={props.title}
              />
            </Box>
          </Box>

          <Box
            className={classes.Spacer}
            borderTop={1}
            borderColor="grey.300"
          />
          {props.slide &&
            props.slide.map((item, index) => (
              <div className="bgHover">
                <Box className={classes.SlideUnit} key={`item.title ${index}`}>
                  Slide - {index + 1}
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Box className={classes.Content}>{item.content}</Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box className={classes.Question}>
                        {item.Qid ? (
                          <>
                            QID - {item.Qid}
                            <LibraryQuestion Qid={item.Qid} />
                            <DeleteQuestion
                              Qid={item.Qid}
                              Mid={props.id}
                              index={index}
                              handleSnackBarOpen={props.handleSnackBarOpen}
                            />
                          </>
                        ) : (
                          <QuestionModal Mid={props.id} index={index} />
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            ))}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Box>
  );
};

export default ExpPanel;

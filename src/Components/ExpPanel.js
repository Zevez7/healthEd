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
import QuestionExpPanel from "./QuestionExpPanel";
import QuestionModal from "../Components/QuestionModal";
import DeleteQuestion from "../Components/DeleteQuestion";

import { makeStyles } from "@material-ui/core/styles";
// import { QuestionContext } from "../App";

const useStyles = makeStyles({
  Details: {
    display: "block"
  },
  Slides: { marginTop: 10 },
  SlideUnit: { display: "block", paddingTop: 10 },
  Content: {
    marginTop: 3,
    width: "100%",
    display: "block"
  },
  Question: {
    marginTop: 10,
    marginBottom: 10
  },
  Spacer: {
    marginTop: 10
  }
});

const ExpPanel = props => {
  const classes = useStyles();
  // const questionCT = useContext(QuestionContext);

  // check to see if Media Qid exist in QuestionCT

  return (
    <Box>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">{props.title}</Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails className={classes.Details}>
          <Typography variant="body1">ID: {props.id}</Typography>
          <Typography variant="body1">Info: {props.info}</Typography>
          <Box className={classes.Spacer}></Box>

          {props.slide &&
            props.slide.map((item, index) => (
              <Box
                className={classes.SlideUnit}
                key={`item.title ${index}`}
                borderTop={1}
                borderColor="grey.500"
              >
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
                          <QuestionExpPanel Qid={item.Qid} />
                          <DeleteQuestion
                            Qid={item.Qid}
                            Mid={props.id}
                            index={index}
                          />
                        </>
                      ) : (
                        <QuestionModal Mid={props.id} index={index} />
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ))}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Box>
  );
};

export default ExpPanel;

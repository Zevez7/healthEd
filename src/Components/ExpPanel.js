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
import QuestionModal from "../Components/QuestionModal";
import QuestionExpPanel from "./QuestionExpPanel";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  Details: {
    display: "block"
  },
  Slides: { marginTop: 10 },
  SlideUnit: { display: "block", paddingTop: 10 },
  Content: {
    marginTop: 3
  },
  Question: {
    marginTop: 10,
    marginBottom: 10
  }
});

const ExpPanel = props => {
  const classes = useStyles();

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
          <Typography component="div" className={classes.Slides}>
            {props.slide &&
              props.slide.map((item, index) => (
                <Box
                  className={classes.SlideUnit}
                  key={`item.title ${index}`}
                  borderTop={1}
                  borderColor="grey.500"
                >
                  Slide - {index + 1}
                  <Grid container spacing={0}>
                    <Grid item sx={12}>
                      <Box>
                        <Box className={classes.Content}>
                          {item.content}
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Omnis repellendus aliquam sapiente
                          necessitatibus quo est minima harum veritatis sed rem
                          ipsam, quae optio voluptatum odit excepturi. Autem
                          ipsum error recusandae?
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item sx={12}>
                      <Box className={classes.Question}>
                        {item.Qid ? (
                          <>
                            QID - {item.Qid}
                            <QuestionExpPanel Qid={item.Qid} />
                          </>
                        ) : (
                          <QuestionModal slideId={props.id} index={index} />
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              ))}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Box>
  );
};

export default ExpPanel;

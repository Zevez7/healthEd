import React from "react";
import {
  Typography,
  Card,
  CardActionArea,
  CardContent
} from "@material-ui/core";
import { makeStyles, withStyles, lighten } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Link } from "react-router-dom";

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten("#008000", 0.7)
  },
  bar: {
    borderRadius: 0,
    backgroundColor: "#008000"
  }
})(LinearProgress);

const useStyles = makeStyles({
  Unit: {
    padding: 2,
    backgroundColor: "whitesmoke"
  },
  Card: {
    margin: 15
  },
  Body: {
    paddingTop: 7
  }
});

//****testing

function ProgressBar(props) {
  const classes = useStyles();

  console.log("props.progress", props.progress);
  return (
    <div>
      <Link to={`/mediapage/${props.id}/${props.progress}`}>
        <Card className={classes.Card}>
          <CardActionArea className={classes.Unit}>
            <CardContent>
              <Typography variant="h5">{props.title}</Typography>
              <BorderLinearProgress
                className={classes.Margin}
                variant="determinate"
                color="primary"
                value={props.length}
              />
              <Typography
                className={classes.Body}
                variant="body2"
                color="textPrimary"
              >
                {props.body}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </div>
  );
}

export default ProgressBar;

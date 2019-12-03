import React from "react";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Typography
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    maxWidth: 350,
    maxHeight: 350,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "whitesmoke"
  },
  media: {
    height: 20,
    backgroundColor: "#FFFF33"
  },
  box: {
    textAlign: "left"
  },
  username: {
    height: 30
  }
});

function ThumbUnit(props) {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} align="center">
        <Box className={classes.box}>
          <Card className={classes.card}>
            {/* add the props.id to pass it to the linked page with react router */}
            <Link to={`/mediapage/${props.id}`}>
              <CardActionArea>
                <Box className={classes.media} title="no media" />
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {props.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Link>

            <CardActions>
              <Button size="small" className={classes.username}>
                {props.username}
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Grid>
    </>
  );
}

export default ThumbUnit;

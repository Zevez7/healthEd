import React from "react";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from "@material-ui/core";
import { Link } from "react-router-dom";
const cardStyle = {
  card: {
    maxWidth: 350,
    maxHeight: 350,
    marginLeft: "auto",
    marginRight: "auto"
  },
  media: {
    height: 20,
    backgroundColor: "#FFFF33"
  },
  box: {
    textAlign: "left"
  }
};
function ThumbUnit(props) {
  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} align="center">
        <Box style={cardStyle.box}>
          <Card style={cardStyle.card}>
            <Link to={`/mediapage/${props.id}`}>
              <CardActionArea>
                <CardMedia
                  style={cardStyle.media}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h4">
                    {props.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {props.body}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Link>

            <CardActions>
              <Button size="small" color="primary">
                Username
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Grid>
    </>
  );
}

export default ThumbUnit;

import React from "react";
import { Box, Grid } from "@material-ui/core/";
import ThumbUnit from "../Components/ThumbUnit";
import TestData from "../Data/testData.json";
// import { Route } from "react-router-dom";
// import MediaPage from "../Pages/MediaPage";
const landing = {
  Spacing: {
    paddingTop: 50
  }
};

function Landing() {
  return (
    <div>
      <Box style={landing.Spacing}></Box>
      <Box>
        <Grid container spacing={2} alignItems="center">
          {TestData.map((item, key) => (
            <ThumbUnit
              key={key}
              title={item.title}
              body={item.body}
              id={item.id}
            />
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default Landing;

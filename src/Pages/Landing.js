import React, { useState, useEffect } from "react";
import { Box, Grid, TextField } from "@material-ui/core/";
import ThumbUnit from "../Components/ThumbUnit";
import TestData from "../Data/testData.json";
import { makeStyles } from "@material-ui/core/styles";

// import { Route } from "react-router-dom";
// import MediaPage from "../Pages/MediaPage";

const useStyles = makeStyles({
  Spacing: {
    paddingTop: 50
  },
  Searching: {
    padding: 20
  }
});

function Landing() {
  const classes = useStyles();

  const [searchValue, setSearchValue] = useState("");
  const [filteredTestData, setFilteredTestData] = useState(TestData);

  // useEffect is rendered every time searchValue state is changed
  // this is considered to be a callback effect to setFilteredTestData
  useEffect(() => {
    let filtered = TestData.filter(data => {
      return data.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
    });
    setFilteredTestData(filtered);
    console.log("useEffect run");
  }, [searchValue]);

  return (
    <div>
      <Box className={classes.Spacing} />

      <Box className={classes.Searching}>
        <TextField
          id="standard-name"
          label="Search"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          margin="normal"
        />
      </Box>
      <Box>
        <Grid container spacing={2} alignItems="center">
          {filteredTestData.map((item, key) => (
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

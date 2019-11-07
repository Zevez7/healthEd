import React, { useState, useEffect, useContext } from "react";
import { Box, Grid, TextField } from "@material-ui/core/";
import ThumbUnit from "../Components/ThumbUnit";

import { makeStyles } from "@material-ui/core/styles";
import { MediaContext } from "../App";

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
  
  // mediaCT is data pulled from app
  const mediaCT = useContext(MediaContext);

  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState(mediaCT);

  // useEffect is rendered every time searchValue state is changed
  // this is considered to be a callback effect to setFilteredData
  useEffect(() => {
    let filtered = mediaCT.filter(data => {
      return data.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
    });
    setFilteredData(filtered);
  }, [searchValue, mediaCT]);

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
          {filteredData.map((item, key) => (
            <ThumbUnit
              key={key}
              title={item.title}
              body={item.info}
              id={item.id}
              username={item.username}
            />
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default Landing;

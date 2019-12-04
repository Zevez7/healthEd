import React, { useState, useContext } from "react";
import { Box, Grid, TextField } from "@material-ui/core/";
import ThumbUnit from "../Components/ThumbUnit";

import { makeStyles } from "@material-ui/core/styles";
import { MediaContext } from "../App";
import useSearchBar from "./../Hooks/useSearchBar";

const useStyles = makeStyles({
  Spacing: {
    paddingTop: 50
  },
  Searching: {
    paddingTop: 20,
    paddingBottom: 20
  }
});

function Landing() {
  const classes = useStyles();

  // mediaCT is data pulled from app
  const mediaCT = useContext(MediaContext);

  // custom search bar hook
  const [searchValue, setSearchValue] = useState("");
  const [FilteredSearchData] = useSearchBar(mediaCT, "title", searchValue);

  const SearchBarElement = (
    <Box className={classes.Searching}>
      <TextField
        id="standard-name"
        label="Search"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        margin="normal"
      />
    </Box>
  );

  console.log("landing rendering");

  return (
    <div>
      <Box className={classes.Spacing} />

      {SearchBarElement}
      <Box>
        <Grid container spacing={2} alignItems="center">
          {FilteredSearchData.map((item, key) => (
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

export default React.memo(Landing);

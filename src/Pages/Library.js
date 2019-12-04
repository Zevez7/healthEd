import React, { useContext, useState } from "react";
import { Box, Snackbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import LibraryMedia from "../Components/LibraryMedia";
import { MediaContext } from "../App";
import useSnackBar from "../Hooks/useSnackBar";
import { TextField } from "@material-ui/core/";
import useSearchBar from "./../Hooks/useSearchBar";

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  topSpacing: {
    paddingTop: 40
  },
  Panel: {
    marginBottom: 10
  },
  SnackbarDelete: {
    backgroundColor: "#4CAF50",
    color: "white"
  },
  title: {
    fontWeight: 700
  },
  Searching: {
    paddingTop: 20,
    paddingBottom: 20
  }
});

const Library = () => {
  const classes = useStyles();
  const mediaCT = useContext(MediaContext);

  //****testing
  console.log("mediaCT landing", mediaCT);

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
  // custom snackBar hook
  const [
    handleSnackBarOpen,
    handleSnackBarClose,
    stateSnackBar,
    stringMessage
  ] = useSnackBar("Successfully Deleted");

  const { vertical, horizontal, open } = stateSnackBar;

  const SnackBarElement = (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      key={`${vertical},${horizontal}`}
      open={open}
      onClose={handleSnackBarClose}
      ContentProps={{
        "aria-describedby": "message-id",
        classes: { root: classes.SnackbarDelete }
      }}
      message={<span id="message-id">{stringMessage}</span>}
    />
  );

  return (
    <div className={classes.root}>
      {SnackBarElement}
      <Box className={classes.topSpacing}></Box>
      <Typography variant="h4" className={classes.title}>
        LIBRARY
      </Typography>
      {SearchBarElement}
      {FilteredSearchData.map((item, index) => (
        <Box className={classes.Panel} key={`media-${index}`}>
          <LibraryMedia
            handleSnackBarOpen={handleSnackBarOpen}
            id={item.id}
            title={item.title}
            slide={item.slide}
            info={item.info}
            username={item.username}
            date={item.date}
          />
        </Box>
      ))}
    </div>
  );
};

export default Library;

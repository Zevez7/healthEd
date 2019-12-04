import React, { useContext, useState, useEffect } from "react";
import { Box, Snackbar, Typography, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import LibraryMedia from "../Components/LibraryMedia";
import { MediaContext, UserDataContext } from "../App";
import useSnackBar from "../Hooks/useSnackBar";
import useSearchBar from "../Hooks/useSearchBar";

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  Panel: {
    marginBottom: 10
  },
  SnackbarDelete: {
    backgroundColor: "#F44336",
    color: "white"
  },
  topSpacing: {
    paddingTop: 40
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
  const userDataCT = useContext(UserDataContext);
  const [userMedia, setUserMedia] = useState([]);

  //****testing
  console.log("mediaCT landing", mediaCT);

  // filters out all media that doesn't match the current userData userName
  useEffect(() => {
    if (mediaCT && userDataCT) {
      const userNameFilter = mediaCT.filter(data => {
        return data.username === userDataCT.userName;
      });
      setUserMedia(userNameFilter);
    }
  }, [mediaCT, userDataCT]);

  // custom search bar hook
  const [searchValue, setSearchValue] = useState("");
  const [FilteredSearchData] = useSearchBar(userMedia, "title", searchValue);

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

  // custom snackBar Hook array destructuring
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
        MEDIA
      </Typography>
      {SearchBarElement}
      {FilteredSearchData.length > 0 ? (
        FilteredSearchData.map((item, index) => (
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
        ))
      ) : (
        <Typography variant="body1">No media has been submitted</Typography>
      )}
    </div>
  );
};

export default Library;

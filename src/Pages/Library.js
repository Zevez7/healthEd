import React, { useContext } from "react";
import { Box, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import LibraryMedia from "../Components/LibraryMedia";
import { MediaContext } from "../App";
import useSnackBar from "../Hooks/useSnackBar";

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  Spacer: {
    marginTop: 40
  },
  Panel: {
    marginBottom: 10
  },
  SnackbarDelete: {
    backgroundColor: "#F44336",
    color: "white"
  }
});

const Library = () => {
  const classes = useStyles();
  const mediaCT = useContext(MediaContext);

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
      <Box className={classes.Spacer}></Box>

      {mediaCT.map((item, index) => (
        <Box className={classes.Panel} key={`media-${index}`}>
          <LibraryMedia
            handleSnackBarOpen={handleSnackBarOpen}
            id={item.id}
            title={item.title}
            slide={item.slide}
            info={item.info}
          />
        </Box>
      ))}
    </div>
  );
};

export default Library;

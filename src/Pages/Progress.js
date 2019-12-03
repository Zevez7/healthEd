import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Snackbar, Typography } from "@material-ui/core";
import ProgressBar from "../Components/ProgressBar";
import useSnackBar from "../Hooks/useSnackBar";

import { MediaContext, UserDataContext, UserContext } from "../App";

const useStyles = makeStyles({
  title: {
    fontWeight: 700
  },
  topSpacing: {
    paddingTop: 40
  },
  SnackbarSuccessful: {
    backgroundColor: "#4CAF50",
    color: "white"
  }
});

function Progress() {
  console.log("progress rendering");
  const classes = useStyles();

  const mediaCT = useContext(MediaContext);
  const userDataCT = useContext(UserDataContext);
  const userCT = useContext(UserContext);

  // custom snackBar Hook array destructuring
  const [
    handleSnackBarOpen,
    handleSnackBarClose,
    stateSnackBar,
    stringMessage
  ] = useSnackBar("Saved Media Removed Successfully");

  // custom snackBar Hook object destructuring
  const { vertical, horizontal, open } = stateSnackBar;

  const SnackBarElement = (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      key={`${vertical},${horizontal}`}
      open={open}
      onClose={handleSnackBarClose}
      ContentProps={{
        "aria-describedby": "message-id",
        classes: { root: classes.SnackbarSuccessful }
      }}
      message={<span id="message-id">{stringMessage}</span>}
    />
  );

  const [userMediaData, setUserMediaData] = useState([]);

  useEffect(() => {
    if (userDataCT && mediaCT) {
      // Go into the userData and return an array of savedMedia
      const MediaArray = Object.keys(userDataCT.savedMedia);
      // from the main mediaCT list, filter out the media that matches
      // the mediaArray by checking if the mediaCT item id is present in the mediaArray
      const userMediaDataTemp = mediaCT.filter(item =>
        MediaArray.includes(item.id)
      );

      //this forLoop will add a new object (progress) and its corresponding slide value to each element of userMediaDataTemp
      userMediaDataTemp.forEach(item => {
        const UserMediaID = item.id;
        item.progress = userDataCT.savedMedia[UserMediaID].slide;
      });
      setUserMediaData(userMediaDataTemp);
    }
  }, [userDataCT, mediaCT]);

  //****testing
  console.log("userDataCT", userDataCT);
  //****testing
  console.log("userMediaData", userMediaData);

  return (
    <>
      {/* custom snackbar hook */}
      {SnackBarElement}
      <Box className={classes.topSpacing}></Box>
      <Typography variant="h4" className={classes.title}>
        PROGRESS
      </Typography>
      <Box className={classes.topSpacing}></Box>
      {userMediaData.length > 0 ? (
        userMediaData.map((item, index) => (
          <ProgressBar
            title={item.title}
            body={item.info}
            // length only accepts int value while progress/maxslide is a fraction
            length={(item.progress / item.slide.length) * 100}
            id={item.id}
            key={`${item}-${index}`}
            progress={item.progress}
            userId={userCT.uid}
            handleSnackBarOpen={handleSnackBarOpen}
          />
        ))
      ) : (
        <Typography variant="body1">No media has been saved</Typography>
      )}
    </>
  );
}

export default Progress;

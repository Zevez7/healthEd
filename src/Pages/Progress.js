import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import ProgressBar from "../Components/ProgressBar";

import { MediaContext, UserDataContext } from "../App";

const useStyles = makeStyles({
  title: {
    fontWeight: 700
  },
  topSpacing: {
    paddingTop: 50
  }
});

function Progress() {
  const classes = useStyles();

  const mediaCT = useContext(MediaContext);
  const userDataCT = useContext(UserDataContext);

  // get the Mid and put them into an array
  let MediaArray = userDataCT && Object.keys(userDataCT.savedMedia);

  const UserMediaData =
    mediaCT &&
    MediaArray &&
    mediaCT.filter(item => MediaArray.includes(item.id));

  // adding progress properties by getting the slide number from userDataCT
  // UserMediaData is directly mutated
  for (let x in UserMediaData) {
    // change dot notation into a variable and using brackets
    const UserMediaID = UserMediaData[x].id;
    UserMediaData[x].progress = userDataCT.savedMedia[UserMediaID].slide;
  }

  useEffect(() => {
    for (let x in UserMediaData) {
      // change dot notation into a variable and using brackets
      const UserMediaID = UserMediaData[x].id;
      UserMediaData[x].progress = userDataCT.savedMedia[UserMediaID].slide;
    }
  }, [UserMediaData, userDataCT, mediaCT]);

  //****testing
  console.log("MediaArray", MediaArray);

  //****testing
  console.log("UserMediaData", UserMediaData);
  //****testing
  console.log("userDataCT", userDataCT);

  return (
    <div>
      <Box className={classes.topSpacing}></Box>
      <Typography variant="h4" className={classes.title}>
        PROGRESS
      </Typography>
      <Box className={classes.topSpacing}></Box>
      {UserMediaData &&
        UserMediaData.map((item, index) => (
          <ProgressBar
            title={item.title}
            body={item.info}
            // length only accepts int value while progress/maxslide is a fraction
            length={(item.progress / item.slide.length) * 100}
            id={item.id}
            key={`${item}-${index}`}
            progress={item.progress}
          />
        ))}
    </div>
  );
}

export default Progress;

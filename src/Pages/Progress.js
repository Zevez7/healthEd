import React, { useContext, useEffect, useState } from "react";
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
  console.log("rendering");

  const classes = useStyles();

  const mediaCT = useContext(MediaContext);
  const userDataCT = useContext(UserDataContext);

  const [userMediaData, setUserMediaData] = useState(() => {
    return localStorage.getItem("userMediaDataLS")
      ? JSON.parse(localStorage.getItem("userMediaDataLS"))
      : [];
  });

  useEffect(() => {
    if (userDataCT && mediaCT) {
      const MediaArray = Object.keys(userDataCT.savedMedia);
      const userMediaDataTemp = mediaCT.filter(item =>
        MediaArray.includes(item.id)
      );

      userMediaDataTemp.forEach(item => {
        const UserMediaID = item.id;
        item.progress = userDataCT.savedMedia[UserMediaID].slide;
      });
      setUserMediaData(userMediaDataTemp);
    }
  }, [userDataCT, mediaCT]);

  // LocalStorage
  useEffect(() => {
    localStorage.setItem("userMediaDataLS", JSON.stringify(userMediaData));
  }, [userMediaData]);

  return (
    <div>
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
          />
        ))
      ) : (
        <Typography variant="body1">No media has been saved</Typography>
      )}
    </div>
  );
}

export default Progress;

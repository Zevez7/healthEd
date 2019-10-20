import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import ProgressBar from "../Components/ProgressBar";

import TestData from "../Data/testData.json";
import UserData from "../Data/userData.json";

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

  // find the array with the object that matches the email or name
  const jasonData = UserData.find(item => item.name.toLowerCase() === "jason");
  // console.log(jasonData);

  // return the matched array and access the media for the user
  // this is an array of object MediaArray
  let userMediaArray = [];
  for (const t in jasonData.media) {
    userMediaArray.push(jasonData.media[t]);
  }
  // console.log("array", userMediaArray);

  // this array will hold the filtered media based on the userMediaArray
  let userFilteredTestData = [];

  // this will loop through userMediaArray and use TestData.filter to only
  // return mediaData array that matches userMediaArray id
  for (let x in userMediaArray) {
    const filteredTestData = TestData.filter(item => {
      // userMediaArray is a string and not a number, you need to parseInt to get number
      return parseInt(userMediaArray[x].id) === item.id;
    });
    // map through the array of each media object
    // add progress & maxSlide key/value
    const addprogress = filteredTestData.map(item => {
      // set the max slideCount by getting the keys for all slide
      item.maxSlide = Object.keys(item.slide).length;
      item.progress = parseInt(userMediaArray[x].progress);
      return item;
    });
    // console.log("addprogress", addprogress);
    // console.log("filteredTestData", filteredTestData);

    // push each addprogress array element to userFilteredTestData using spread operator
    userFilteredTestData = [...userFilteredTestData, ...addprogress];
  }

  console.log("userFilteredTestData", userFilteredTestData);

  return (
    <div>
      <Box className={classes.topSpacing}></Box>
      <Typography variant="h4" className={classes.title}>
        PROGRESS
      </Typography>
      <Box className={classes.topSpacing}></Box>
      {userFilteredTestData.map((item, index) => (
        <ProgressBar
          title={item.title}
          body={item.body}
          // length only accepts int value while progress/maxslide is a fraction
          length={(item.progress / item.maxSlide) * 100}
          id={item.id}
          key={`${item}-${index}`}
        />
      ))}
    </div>
  );
}

export default Progress;

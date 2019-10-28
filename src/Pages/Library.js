import React, { useContext } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ExpPanel from "../Components/ExpPanel";
import { MediaContext } from "../App";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  Spacer: {
    marginTop: 40
  },
  Panel: {
    marginBottom: 10
  }
}));

const Library = () => {
  const classes = useStyles();
  const mediaCT = useContext(MediaContext);

  return (
    <div className={classes.root}>
      <Box className={classes.Spacer}></Box>

      {mediaCT.map((item, index) => (
        <Box className={classes.Panel} key={`media-${index}`}>
          <ExpPanel
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

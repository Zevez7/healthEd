import React from "react";
import { Button } from "@material-ui/core";

import { db } from "./Firebase";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  QuizButton: {
    backgroundColor: "white"
  }
});

const DeleteMedia = props => {
  const classes = useStyles();

  // delete media doc from media collection Doc
  const deleteMedia = Id => {
    db.collection("media")
      .doc(Id)
      .delete()
      .then(() => {
        console.log("Delete Qid from Question");
        props.handleSnackBarOpen();
      })
      .catch(error => {
        console.error("Error removing document: ", error);
      });
  }; // custom snackBar Hook array destructuring

  // delete Qid from media doc nested in slide Qid
  // due to nested obj inside slide array
  // you cannot directly delete it with firestore
  // you need to copy mediaCT, find media doc
  // delete Qid from media doc/slide/array
  // update whole slide with updated deleted Qid

  // call both delete from media and question at the same time

  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        className={classes.ChoiceButton}
        onClick={e => deleteMedia(props.Id)}
      >
        Delete Media
      </Button>
    </div>
  );
};

export default DeleteMedia;

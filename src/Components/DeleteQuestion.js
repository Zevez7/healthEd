import React, { useContext } from "react";
import { Button } from "@material-ui/core";

import { db } from "../Components/Firebase";
import { MediaContext } from "../App";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  QuizButton: {
    backgroundColor: "white"
  }
});

const DeleteQuestion = props => {
  const classes = useStyles();

  const mediaCT = useContext(MediaContext);

  // delete question from questions Doc
  const deleteQuestionDoc = Qid => {
    db.collection("questions")
      .doc(Qid)
      .delete()
      .then(() => {
        console.log("Delete Qid from Question");
        props.handleSnackBarOpen("Question Successfully Deleted");
      })
      .catch(error => {
        console.error("Error removing document: ", error);
      });
  };

  // delete Qid from media doc nested in slide Qid
  // due to nested obj inside slide array
  // you cannot directly delete it with firestore
  // you need to copy mediaCT, find media doc
  // delete Qid from media doc/slide/array
  // update whole slide with updated deleted Qid

  const deleteMediaQID = Qid => {
    const OneMedia = mediaCT.find(item => item.id.toString() === props.Mid);
    // OneMedia.slide[props.index].Qid = docRef.id;
    delete OneMedia.slide[props.index].Qid;

    db.collection("media")
      .doc(props.Mid)
      .update({
        slide: OneMedia.slide
      })
      .then(() => {
        console.log("Deleted Qid from Media!");
      })
      .catch(error => {
        console.error("Unable to delete Qid from Media: ", error);
      });
  };

  // call both delete from media and question at the same time
  const deleteQidHandler = Qid => {
    deleteMediaQID(Qid);
    deleteQuestionDoc(Qid);
  };

  //****testing
  // console.log("OneMedia", OneMedia);
  console.log("prop.Qid", props.Qid);
  console.log("prop.Mid", props.Mid);
  //****testing
  console.log("props.index", props.index);
  //****testing
  console.log("mediaCT", mediaCT);

  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        className={classes.ChoiceButton}
        onClick={e => deleteQidHandler(props.Qid)}
      >
        Delete Question
      </Button>
    </div>
  );
};

export default DeleteQuestion;

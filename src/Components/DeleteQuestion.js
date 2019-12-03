import React, { useContext } from "react";

import { db } from "../Components/Firebase";
import { MediaContext } from "../App";
import { makeStyles } from "@material-ui/core/styles";
import ConfirmationDialogBox from "./ConfirmationDialogBox";
import { QuestionContext } from "../App";

const useStyles = makeStyles({
  ChoiceButton: {
    backgroundColor: "white"
  },
  AlignRight: {
    display: "flex",
    justifyContent: "flex-end"
  }
});

const DeleteQuestion = props => {
  const classes = useStyles();
  const questionCT = useContext(QuestionContext);

  // using the media question id from the slide to
  // find the matching question from questionCT
  const OneQ = questionCT.find(item => {
    return item.id === props.Qid;
  });

  //****testing
  console.log("deletequestion rendering");

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

  return (
    <div className={classes.AlignRight}>
      <ConfirmationDialogBox
        title={"Delete Confirmation"}
        message={`Are you sure you want to delete? 
        ${OneQ.question}`}
        buttonText={"Delete Question"}
        buttonColor={"Delete Question"}
        cancel={"Cancel"}
        cancelColor={"primary"}
        accept={"Delete"}
        acceptColor={"secondary"}
        acceptFunction={() => deleteQidHandler(props.Qid)}
      />
    </div>
  );
};

export default DeleteQuestion;

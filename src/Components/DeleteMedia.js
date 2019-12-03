import React from "react";
import { db } from "./Firebase";
import ConfirmationDialogBox from "./ConfirmationDialogBox";
// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles({
//   ChoiceButton: {
//     backgroundColor: "white"
//   }
// });

const DeleteMedia = props => {
  // const classes = useStyles();
  // delete media doc from media collection Doc
  const deleteMedia = Id => {
    db.collection("media")
      .doc(Id)
      .delete()
      .then(() => {
        console.log("Delete Qid from media");
        props.handleSnackBarOpen();
      })
      .catch(error => {
        console.error("Error removing document: ", error);
      });
  }; // custom snackBar Hook array destructuring

  return (
    <ConfirmationDialogBox
      title={"Delete Confirmation"}
      message={`Are you sure you want to delete? 
        ${props.title}`}
      buttonText={"Delete Media"}
      cancel={"Cancel"}
      cancelColor={"primary"}
      accept={"Delete"}
      acceptColor={"secondary"}
      acceptFunction={() => deleteMedia(props.Id)}
    />
  );
};

export default DeleteMedia;

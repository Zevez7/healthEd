import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

/* 
this component can create a confirmation dialog box 
you can pass a function into the acceptFunction to 
call a function when you click the accept button

these are the acceptable props that can be pass to customize 
the dialog box: 
    <Confirmation
        buttonText={"Button Text"}
        title={"dialog title"}
        message={"dialog message"}
        cancel={"Cancel"}  *button
        cancelColor={"secondary"}
        accept={"Submit"} *button
        acceptColor={"secondary"}
        acceptFunction={() => function(argument)}
        size = {"medium"},
        variant = {"outlined"}
    />
*/

export default function ConfirmationDialogBox({
  acceptFunction,
  buttonText = "Button Text",
  ButtonColor = "secondary",
  title = "dialog title",
  message = "dialog message",
  cancel = "Cancel",
  cancelColor = "secondary",
  accept = "Submit",
  acceptColor = "primary",
  size = "medium",
  variant = "outlined"
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    setOpen(false);

    // if no function is passed into the acceptFunction props
    // handleAccept function will not call acceptFunction
    if (acceptFunction) {
      acceptFunction();
    }
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        color={ButtonColor}
        onClick={handleClickOpen}
      >
        {buttonText}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color={cancelColor}>
            {cancel}
          </Button>
          <Button onClick={handleAccept} color={acceptColor} autoFocus>
            {accept}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

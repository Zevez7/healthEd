import { useState } from "react";

function useSnackBar(message) {
  const [stateSnackBar, setStateSnackBar] = useState({
    open: false,
    vertical: "top",
    horizontal: "center"
  });

  const handleSnackBarOpen = () => {
    setStateSnackBar({ ...stateSnackBar, open: true });
    console.log("snackbar opened");
  };

  const handleSnackBarClose = () => {
    setStateSnackBar({ ...stateSnackBar, open: false });
  };

  const stringMessage = message;

  return [
    handleSnackBarOpen,
    handleSnackBarClose,
    stateSnackBar,
    stringMessage
  ];
}

export default useSnackBar;

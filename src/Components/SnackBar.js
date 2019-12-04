import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

export default function PositionedSnackbar(props) {
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center"
  });

  const { vertical, horizontal, open } = state;

  const handleClick = () => () => {
    setState({ ...state, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  props.HandleSnackBarOpen && handleClick()

  //****testing
  console.log("props.HandleSnackBarOpen", props.HandleSnackBarOpen);
  return (
    <div>
      {props.HandleSnackBarOpen && <Button>Top-Center</Button>}

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        open={open}
        onClose={handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">I love snacks</span>}
      />
    </div>
  );
}

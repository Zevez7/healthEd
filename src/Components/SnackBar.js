import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

export default function PositionedSnackbar({ show }) {
  const [state, setState] = React.useState({
    open: show,
    vertical: "top",
    horizontal: "center"
  });

  const { vertical, horizontal, open } = state;

  const handleClick = newState => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  

  //****testing
  console.log("show", show);

  return (
    <div>
      <Button onClick={handleClick({ vertical: "top", horizontal: "center" })}>
        Top-Center
      </Button>

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

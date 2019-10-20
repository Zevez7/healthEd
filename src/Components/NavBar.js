import React from "react";
import { Link } from "react-router-dom";

import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Fab
} from "@material-ui/core";

const Navbar = {
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: 2
  },
  title: {
    flexGrow: 1,
    fontWeight: 800
  },
  toolBar: {
    backgroundColor: "#1976D2"
  },
  addIcon: {
    backgroundColor: "#1976D2",
    marginRight: 3
  }
};

function NavBar(props) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar style={Navbar.toolBar}>
          <IconButton
            edge="start"
            style={Navbar.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={props.toggleDrawerOpen("left", true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h5" style={Navbar.title}>
            <Link to={"/"}>HEALTH ED </Link>
          </Typography>
          <Link to={"/submit"}>
            <Fab
              color="inherit"
              size="small"
              aria-label="add"
              style={Navbar.addIcon}
            >
              <AddIcon />
            </Fab>
          </Link>

          <Link to={"/login"}>
            <Button color="inherit">Login</Button>
          </Link>
          <Link to={"/signup"}>
            <Button color="inherit">SignUp</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;

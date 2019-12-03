import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { UserContext, UserDataContext } from "../App";

import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Fab,
  Box,
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
  Drawer
} from "@material-ui/core";

// icon import
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
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
    marginRight: 3,
    color: "white"
  },
  Add: {
    marginRight: 5,
    display: "inline",
    color: "inherit",
    backgroundColor: "inherit"
  },
  Button: {
    fontSize: "1rem"
  },
  UserName: {
    paddingLeft: 10,
    paddingRight: 5,
    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: 1.75,
    letterSpacing: "0.02857em",
    textTransform: "uppercase"
  }
});

function NavBar(props) {
  const userCT = useContext(UserContext);
  const userDataCT = useContext(UserDataContext);

  const classes = useStyles();
  // pass toggleDrawer open to Nav component

  const [drawer, setDrawer] = useState({
    left: false
  });
  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawer({ ...drawer, [side]: open });
  };

  // set links and name to the sideNav
  const sideNavLink = [
    { name: "HEALTHED", icon: <HomeIcon />, link: "/" },
    { name: "PPROGRESS", icon: <TrendingUpIcon />, link: "/progress" },
    { name: "ACCOUNT", icon: <PersonIcon />, link: "/account" },
    { name: "LIBRARY", icon: <AttachFileIcon />, link: "/library" },
    { name: "MEDIA", icon: <PlayArrowIcon />, link: "/usermedia" }
  ];

  const sideNav = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {sideNavLink.map((item, index) => (
          <React.Fragment key={`${item}-${index}`}>
            <Link to={item.link}>
              <ListItem button key={item.name}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            </Link>
          </React.Fragment>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <Drawer open={drawer.left} onClose={toggleDrawer("left", false)}>
        {sideNav("left")}
      </Drawer>
      <AppBar position="static">
        <Toolbar className={classes.toolBar}>
          {userCT !== null ? (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer("left", true)}
            >
              <MenuIcon />
            </IconButton>
          ) : null}

          <Typography variant="h5" className={classes.title}>
            <Link to={"/"}>HEALTH ED </Link>
          </Typography>

          {userCT !== null ? (
            <Box>
              <Box className={classes.Add}>
                <Link to={"/submit"}>
                  <Fab
                    color="secondary"
                    size="small"
                    aria-label="add"
                    className={classes.addIcon}
                  >
                    <AddIcon />
                  </Fab>
                </Link>
                <Typography display="inline" className={classes.UserName}>
                  {userDataCT && userDataCT.userName}
                </Typography>
              </Box>

              <Button
                color="inherit"
                onClick={() => {
                  props.authLogOut();
                }}
                className={classes.Button}
              >
                LOGOUT
              </Button>
            </Box>
          ) : (
            <>
              <Link to={"/login"}>
                <Button color="inherit" className={classes.Button}>
                  LOGIN
                </Button>
              </Link>
              <Link to={"/signup"}>
                <Button color="inherit" className={classes.Button}>
                  SIGNUP
                </Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;

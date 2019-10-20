import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
// import { db } from "../src/Components/Firebase";

// component
import NavBar from "./Components/NavBar";
import ScrollToTop from "./Components/ScrollToTop";

// data
import QData from "./Data/questionData.json";

// pages
import Landing from "./Pages/Landing";
import Account from "./Pages/Account";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import MediaPage from "./Pages/MediaPage";
import Submit from "./Pages/Submit";
import Progress from "./Pages/Progress";

import {
  Container,
  ListItemText,
  ListItemIcon,
  ListItem,
  // Divider,
  List,
  // Button,
  Drawer
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// icon import
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

function App() {
  const classes = useStyles();
  const [drawer, setDrawer] = useState({
    left: false
  });
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    // storing setQuizData as state
    // this will allow data to be send down the component tree to
    setQuizData(QData);

    // empty array for second paramater will mean that useEffect
    // hook will only be called once right after initial rendering
  }, []);

  console.log(quizData);
  // const [dataReturn, setDataReturn] = useState([]);

  // parameter is passed after every render & update
  // useEffect(() => {
  //   db.collection("users")
  //     .get()
  //     .then(snapshot => {
  //       let data = [];
  //       snapshot.docs.forEach(doc => data.push({ ...doc.data(), id: doc.id }));
  //       console.log(data); // array of cities objects
  //       setDataReturn(data);
  //     });

  // adding an empty [] array for the 2nd variable will prevent
  // updating of dataReturn from passing after every render
  // this will only fetch data on mounting of the component
  // }, []);

  // console.log(dataReturn);

  // useEffect runs side effect based on certain parameter
  // useEffect will run after every render and update

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawer({ ...drawer, [side]: open });
  };

  const sideBarLink = [
    { name: "HEALTHED", icon: <HomeIcon />, link: "/" },
    { name: "PPROGRESS", icon: <TrendingUpIcon />, link: "/progress" },
    { name: "ACCOUNT", icon: <PersonIcon />, link: "/account" }
  ];

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {sideBarLink.map((item, index) => (
          <>
            <Link to={item.link} key={`${item}-${index}`}>
              <ListItem button key={item.name}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            </Link>
          </>
        ))}
      </List>
    </div>
  );

  return (
    <div className="App">
      <Router>
        <ScrollToTop>
          <NavBar toggleDrawerOpen={toggleDrawer} />
          <Drawer open={drawer.left} onClose={toggleDrawer("left", false)}>
            {sideList("left")}
          </Drawer>{" "}
          <Container align="left">
            <Switch>
              <Route exact path="/" render={props => <Landing />} />
              <Route path="/mediapage/:mediaId" component={MediaPage} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route
                path="/submit"
                render={props => <Submit {...props} quizData={quizData} />}
              />
              <Route path="/account" render={props => <Account {...props} />} />
              <Route
                path="/progress"
                render={props => <Progress {...props} />}
              />
            </Switch>
          </Container>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;

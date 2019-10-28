import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { db, auth } from "../src/Components/Firebase";

// component
import NavBar from "./Components/NavBar";
import ScrollToTop from "./Components/ScrollToTop";

// data
// import QData from "./Data/questionData.json";

// pages
import Landing from "./Pages/Landing";
import Account from "./Pages/Account";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import MediaPage from "./Pages/MediaPage";
import Submit from "./Pages/Submit";
import Progress from "./Pages/Progress";
import Library from "./Pages/Library";

import { Container } from "@material-ui/core";

// context exporter
export const UserContext = createContext();
export const MediaContext = createContext();
export const QuestionContext = createContext();

function App() {
  const [questionData, setQuestionData] = useState([]);
  useEffect(() => {
    const questionUnsubscribe = db
      .collection("questions")
      .onSnapshot(snapshot => {
        let data = [];
        snapshot.docs.forEach(doc => data.push({ ...doc.data(), id: doc.id }));
        setQuestionData(data);
        console.log("questions-data", data); // array of objects
      });
    return () => questionUnsubscribe();
  }, []);

  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var uid = user.uid;
        var providerData = user.providerData;
        setUser(user);
        //****testing
        console.log("user", user);
        // ...
      } else {
        // User is signed out.
        // ...
      }
      console.log("displayName", displayName);
      //****testing
      console.log("email", email);
      //****testing
      console.log("uid", uid);
      //****testing
      console.log("providerData", providerData);
    });
  }, []);

  const [dataReturn, setDataReturn] = useState([]);
  useEffect(
    () => {
      const unsubscribe = db.collection("media").onSnapshot(snapshot => {
        let data = [];
        snapshot.docs.forEach(doc => data.push({ ...doc.data(), id: doc.id }));
        setDataReturn(data);
        console.log("firebase-data", data); // array of objects
      });
      return () => unsubscribe();
    },
    // adding an empty [] array for the 2nd variable will prevent
    // updating of dataReturn from passing after every render
    // this will only fetch data on mounting of the component

    // if component is unmounted, it will remove the db connection
    // however this is the main app, so db connection will not unmount probably
    []
  );

  const authLogOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("sign-out successful");
        setUser(null);
      })
      .catch(() => {
        console.log("sign-out NOT successful");
      });
  };

  return (
    <div className="App">
      <Router>
        <ScrollToTop>
          <UserContext.Provider value={user}>
            <MediaContext.Provider value={dataReturn}>
              <QuestionContext.Provider value={questionData}>
                <NavBar authLogOut={authLogOut} />
                <Container align="left">
                  <Switch>
                    <Route
                      exact
                      path="/"
                      render={props => <Landing {...props} />}
                    />
                    <Route
                      path="/mediapage/:mediaId"
                      render={props => <MediaPage {...props} />}
                    />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={SignUp} />
                    <Route
                      path="/submit"
                      render={props => <Submit {...props} />}
                    />
                    <Route
                      path="/account"
                      render={props => <Account {...props} />}
                    />
                    <Route
                      path="/progress"
                      render={props => (
                        <Progress {...props} dataReturn={dataReturn} />
                      )}
                    />{" "}
                    <Route
                      path="/library"
                      render={props => (
                        <Library {...props} dataReturn={dataReturn} />
                      )}
                    />
                  </Switch>
                </Container>
              </QuestionContext.Provider>
            </MediaContext.Provider>
          </UserContext.Provider>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;

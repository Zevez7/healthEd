import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { db, auth } from "../src/Components/Firebase";

// component
import NavBar from "./Components/NavBar";
import ScrollToTop from "./Components/ScrollToTop";

// pages
import Landing from "./Pages/Landing";
import Account from "./Pages/Account";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import MediaPage from "./Pages/MediaPage";
import Submit from "./Pages/Submit";
import Progress from "./Pages/Progress";
import Library from "./Pages/Library";
import UserMedia from "./Pages/UserMedia";

import { Container } from "@material-ui/core";

// context exporter
export const UserContext = createContext();
export const MediaContext = createContext();
export const QuestionContext = createContext();
export const UserDataContext = createContext();

function App() {
  const [questionData, setQuestionData] = useState([]);
  const [mediaData, setMediaData] = useState([]);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  console.log("app rendering");

  // Effect only run once on initial render
  useEffect(() => {
    console.log("Running initial useEffect");

    // getting the questions from the database
    const questionUnsubscribe = db
      .collection("questions")
      .onSnapshot(snapshot => {
        let data = [];
        snapshot.docs.forEach(doc => data.push({ ...doc.data(), id: doc.id }));
        setQuestionData(data);
      });

    // getting media data from database
    const mediaUnsubscribe = db.collection("media").onSnapshot(snapshot => {
      let data = [];
      snapshot.docs.forEach(doc => data.push({ ...doc.data(), id: doc.id }));
      setMediaData(data);
      console.log("firebase-data", data); // array of objects
    });
    // logging in user
    auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        // const displayName = user.displayName;
        // const email = user.email;
        // const uid = user.uid;
        // const providerData = user.providerData;
        setUser(user);
        console.log("user", user);
        console.log("user is logged in");
      } else {
        console.log("user not logged in");
      }
    });

    // getting the user's data if user is logged in
    auth.onAuthStateChanged(user => {
      if (user != null) {
        db.collection("users")
          .doc(user.uid)
          .onSnapshot(doc => {
            if (doc.exists) {
              console.log("User Data", doc.data());
              setUserData(doc.data());
            } else {
              console.log("doc do not exist");
            }
          });
      } else {
        console.log("user not found");
      }
    });

    return () => {
      questionUnsubscribe();
      mediaUnsubscribe();
      //****testing
      console.log("unsubscribe");
    };
  }, []);

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
            <MediaContext.Provider value={mediaData}>
              <QuestionContext.Provider value={questionData}>
                <UserDataContext.Provider value={userData}>
                  <NavBar authLogOut={authLogOut} />
                  <Container align="left">
                    <Switch>
                      <Route
                        exact
                        path="/"
                        render={props => <Landing {...props} />}
                      />
                      <Route
                        path="/mediapage/:mediaId/:slideNum?"
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
                          <Progress {...props} mediaData={mediaData} />
                        )}
                      />
                      <Route
                        path="/library"
                        render={props => (
                          <Library {...props} mediaData={mediaData} />
                        )}
                      />
                      <Route
                        path="/usermedia"
                        render={props => (
                          <UserMedia {...props} mediaData={mediaData} />
                        )}
                      />
                    </Switch>
                  </Container>
                </UserDataContext.Provider>
              </QuestionContext.Provider>
            </MediaContext.Provider>
          </UserContext.Provider>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;

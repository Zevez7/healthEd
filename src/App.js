import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
// import { db } from "../src/Components/Firebase";
import { Container } from "@material-ui/core";
import NavBar from "./Components/NavBar";
import ScrollToTop from "./Components/ScrollToTop";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import MediaPage from "./Pages/MediaPage";
import Submit from "./Pages/Submit";
import QData from "./Data/questionData.json";

function App() {
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
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

  return (
    <div className="App">
      <Router>
        <ScrollToTop>
          <NavBar />
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
            </Switch>
          </Container>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;

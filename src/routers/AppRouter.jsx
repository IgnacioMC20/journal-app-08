import React, { useEffect, useState } from "react";
// import { Redirect } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //   Link
} from "react-router-dom";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from './AuthRouter'

import { firebase } from "../firebase/firebase-config";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const dispatch = useDispatch();

  const [cheching, setCheching] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {

    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if(user?.uid){
        dispatch( login(user.uid, user.displayName) )
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
    });
    setCheching(false);

  }, [dispatch, setCheching, setIsLoggedIn])
  
  if(cheching){
    return <h1>Loading... {isLoggedIn}</h1>
  }
  else{
  return (
    <div>
      <Router>
        <div>
          <Switch>
            {/* <Route path="/auth" component={AuthRouter} />
            <Route exact path="/" component={JournalScreen} /> */}

            <PublicRoute path="/auth" isAuthenticated={isLoggedIn} component={AuthRouter} />
            <PrivateRoute isAuthenticated={isLoggedIn} exact path="/" component={JournalScreen} />

            {/* <Redirect to="/auth/login" /> */}

          </Switch>
        </div>
      </Router>
    </div>
  )
}
}

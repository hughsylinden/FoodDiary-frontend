import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './LandingPage';
import SignIn from "./SignIn";
import SignUp from "./SignUp"
import FoodDiary from "./FoodDiary"
import { UserProvider } from "../contexts/UserContext";
import '../styles/App.css';

function App({match}) {
  return (
    <Router>
      <div className="App">
        <UserProvider>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/fooddiary/:id" element={<FoodDiary/>} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/signup" element={<SignUp />} /> 
          </Routes>
        </UserProvider>
      </div>
    </Router>
  );
}

export default App;
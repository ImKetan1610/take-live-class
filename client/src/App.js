import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import EventList from "./components/EventList";
import EventDetails from "./components/EventDetails";
import AcceptedEventsList from "./components/AcceptedEventList";
import RequestedEventsList from "./components/RequestedEventList";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/" component={EventList} />
          <Route path="/events/:id" component={EventDetails} />
          <Route path="/accepted-events" component={AcceptedEventsList} />
          <Route path="/requested-events" component={RequestedEventsList} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

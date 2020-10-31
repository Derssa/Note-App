import React from "react";
import CreateNote from "./notes/CreateNote";
import EditNote from "./notes/EditNote";
import Home from "./notes/Home";
import Nav from "./notes/Nav";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Notes = ({ setIsLogin }) => {
  return (
    <Router>
      <div className="note-Page">
        <Nav setIsLogin={setIsLogin} />
        <section>
          <Route exact path="/" component={Home} />
          <Route exact path="/create" component={CreateNote} />
          <Route exact path="/edit/:id" component={EditNote} />
        </section>
      </div>
    </Router>
  );
};

export default Notes;

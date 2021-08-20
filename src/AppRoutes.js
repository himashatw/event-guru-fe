import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import Header from "./Components/HomePage/Header";
import HomePage from "./Components/HomePage/HomePage";

function AppRoutes() {
   return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/admin/dashboard" component={AdminDashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default AppRoutes

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddNewAd from "./Components/Admin/AddNewAd";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import Header from "./Components/HomePage/Header";
import HomePage from "./Components/HomePage/HomePage";

function AppRoutes() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          {/* **COMMON ROUTES BEGIN** */}
          <Route exact path="/" component={HomePage} />
          {/* **COMMON ROUTES END** */}

          {/* **ADMIN ROUTES BEGIN** */}
          <Route exact path="/admin/dashboard" component={AdminDashboard} />
          <Route exact path="/admin/newad" component={AddNewAd} />
          {/* **ADMIN ROUTES END** */}

          {/* **OWNER ROUTES BEGIN** */}

          {/* **OWNER ROUTES END** */}

          {/* **ORGANIZER ROUTES BEGIN** */}

          {/* **ORGANIZER ROUTES END** */}

          {/* **USER ROUTE BEGIN** */}

          {/* **USER ROUTE END** */}
        </Switch>
      </div>
    </Router>
  );
}

export default AppRoutes;

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddNewAd from "./Components/Admin/AddNewAd";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import Header from "./Components/HomePage/Header";
import HomePage from "./Components/HomePage/HomePage";
import CreateCustomizedPackage from "./Components/EventOrganizer/CustomizePackage/CreateCustomizedPackage";
import ViewCustomizedPackage from "./Components/EventOrganizer/CustomizePackage/ViewCustomizedPackage"
import ViewCustomizerPackageApproval from "./Components/EventOrganizer/CustomizePackage/ViewCustomizerPackageApproval";
import UpdateCustomizedPackage from "./Components/EventOrganizer/CustomizePackage/UpdateCustomizedPackage";
import Login from "./Components/Login/Login";
import UserRegister from "./Components/User/Registration";
import PropertyOwnerRegister from "./Components/PropertyOwner/Registration";
import EventOrganizerRegister from "./Components/EventOrganizer/Registration";
import ContactUs from "./Components/HomePage/ContactUsPage";
import Enquiry from "./Components/User/Enquiry";

function AppRoutes() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          {/* **COMMON ROUTES BEGIN** */}
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/ContactUs" component={ContactUs} />
          {/* **COMMON ROUTES END** */}

          {/* **ADMIN ROUTES BEGIN** */}
          <Route exact path="/admin/dashboard" component={AdminDashboard} />
          <Route exact path="/admin/newad" component={AddNewAd} />
          {/* **ADMIN ROUTES END** */}

          {/* **OWNER ROUTES BEGIN** */}
          <Route exact path="/owner/register" component={PropertyOwnerRegister} />

          {/* **OWNER ROUTES END** */}

          {/* **ORGANIZER ROUTES BEGIN** */}
          <Route exact path="/eventorganizer/register" component={EventOrganizerRegister} />
          <Route exact path="/eventorganizer/addcustomizedpackage" >
            <CreateCustomizedPackage />
          </Route>
          <Route exact path="/eventorganizer/customizedpackages" >
            <ViewCustomizedPackage />
          </Route>
          <Route exact path="/eventorganizer/packagesapproval" >
            <ViewCustomizerPackageApproval />
          </Route>
          <Route exact path="/eventorganizer/editpackages/:id" >
            <UpdateCustomizedPackage />
          </Route>

          {/* **ORGANIZER ROUTES END** */}

          {/* **USER ROUTE BEGIN** */}
          <Route exact path="/user/register" component={UserRegister} />
          <Route exact path="/user/enquiry" component={Enquiry} />
          {/* **USER ROUTE END** */}
        </Switch>
      </div>
    </Router>
  );
}

export default AppRoutes;

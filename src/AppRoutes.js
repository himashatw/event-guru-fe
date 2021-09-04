import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddNewAd from "./Components/Admin/AddNewAd";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import Header from "./Components/HomePage/Header";
import HomePage from "./Components/HomePage/HomePage";
import CreateCustomizedPackage from "./Components/EventOrganizer/CustomizePackage/CreateCustomizedPackage";
import ViewCustomizedPackage from "./Components/EventOrganizer/CustomizePackage/ViewCustomizedPackage";
import ViewCustomizerPackageApproval from "./Components/EventOrganizer/CustomizePackage/ViewCustomizerPackageApproval";
import UpdateCustomizedPackage from "./Components/EventOrganizer/CustomizePackage/UpdateCustomizedPackage";
import Login from "./Components/Login/Login";
import UserRegister from "./Components/User/Registration";
import PropertyOwnerRegister from "./Components/PropertyOwner/Registration";
import EventOrganizerRegister from "./Components/EventOrganizer/Registration";
import ContactUs from "./Components/HomePage/ContactUsPage";
import Enquiry from "./Components/User/Enquiry/Enquiry";
import ViewAdd from "./Components/User/Advertisment/ViewAdvertisment";
import UserDashboard from "./Components/User/UserDashboard";
import NewPackage from "./Components/PropertyOwner/NewPackage";
import ViewPackages from "./Components/PropertyOwner/ViewPackages";
import OwnerDashboard from "./Components/PropertyOwner/OwnerDashboard";
import OfferDashboard from "./Components/EventOrganizer/SlideBar/OfferDashBoard";
import OfferFormDashBoard from "./Components/EventOrganizer/SlideBar/OfferFormDashBoard";
import LatestOffers from "./Components/EventOrganizer/ViewPackages/LatestOffers";

function AppRoutes() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          {/* **COMMON ROUTES BEGIN** */}
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/contactus" component={ContactUs} />
          {/* **COMMON ROUTES END** */}

          {/* **ADMIN ROUTES BEGIN** */}
          <Route exact path="/admin/dashboard" component={AdminDashboard} />
          <Route exact path="/admin/newad" component={AddNewAd} />
          {/* **ADMIN ROUTES END** */}

          {/* **OWNER ROUTES BEGIN** */}
          <Route
            exact
            path="/owner/register"
            component={PropertyOwnerRegister}
          />
          <Route exact path="/owner/newpackage" component={NewPackage} />
          <Route exact path="/owner/packages" component={ViewPackages} />
          <Route exact path="/owner/dashboard" component={OwnerDashboard} />

          {/* **OWNER ROUTES END** */}

          {/* **ORGANIZER ROUTES BEGIN** */}
          <Route
            exact
            path="/eventorganizer/register"
            component={EventOrganizerRegister}
          />
          <Route exact path="/eventorganizer/addcustomizedpackage">
            <CreateCustomizedPackage />
          </Route>
          <Route exact path="/eventorganizer/customizedpackages">
            <ViewCustomizedPackage />
          </Route>
          <Route exact path="/eventorganizer/packagesapproval">
            <ViewCustomizerPackageApproval />
          </Route>
          <Route exact path="/eventorganizer/editpackages/:id">
            <UpdateCustomizedPackage />
          </Route>
          <Route exact path="/eventorganizer/customdashboard">
            <OfferFormDashBoard />
          </Route>
          <Route exact path="/eventorganizer/dashboard">
            <OfferDashboard />
          </Route>
          <Route exact path="/eventorganizer/latestoffers">
            <LatestOffers />
          </Route>
          {/* **ORGANIZER ROUTES END** */}

          {/* **USER ROUTE BEGIN** */}
          <Route exact path="/user/register" component={UserRegister} />
          <Route exact path="/user/enquiry/:id" component={Enquiry} />
          <Route exact path="/view/advertisment" component={ViewAdd} />
          <Route exact path="/user/dashboard" component={UserDashboard} />
          {/* **USER ROUTE END** */}
        </Switch>
      </div>
    </Router>
  );
}

export default AppRoutes;

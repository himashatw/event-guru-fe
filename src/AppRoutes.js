import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddNewAd from "./Components/Admin/AddNewAd";
import AdminDashboard from "./Components/Admin/AdminDashboard";
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
import AdminHeader from "./Components/Admin/AdminHeader";
import AdminStats from "./Components/Admin/AdminStats";
import RegistrationHome from "./Components/Registration/RegistrationPage";
import EditPackage from "./Components/PropertyOwner/EditPackage";
import AdminReport from "./Components/Admin/AdminReport";
import ManageRegistrations from "./Components/Admin/ManageRegistrations";
import OtherOffers from "./Components/EventOrganizer/ViewPackages/OtherOffers";
import PartyOffers from "./Components/EventOrganizer/ViewPackages/PartyOffers";
import ShowOffers from "./Components/EventOrganizer/ViewPackages/ShowOffers";
import WeddingOffers from "./Components/EventOrganizer/ViewPackages/WeddingOffers";
import EventOrganizerHeader from "./Components/EventOrganizer/SlideBar/EventOrganizerHeader";
import ConfirmPayment from "./Components/User/Payment/Payment";


function AppRoutes() {
  return (
    <Router>
      <div>
        <Switch>
          {/* **COMMON ROUTES BEGIN** */}
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/contactus" component={ContactUs} />
          <Route exact path="/register" component={RegistrationHome} />
          {/* **COMMON ROUTES END** */}

          {/* **ADMIN ROUTES BEGIN** */}
          <Route exact path="/admin/dashboard">
            <AdminHeader />
            <AdminDashboard />
          </Route>
          <Route exact path="/admin/newad">
            <AdminHeader />
            <AddNewAd />
          </Route>
          <Route exact path="/admin/statistics">
            <AdminHeader />
            <AdminStats />
          </Route>
          <Route exact path="/admin/manageregistrations">
            <AdminHeader />
            <ManageRegistrations />
          </Route>
          {/* <Route exact path={["/admin/newad", "/admin/dashboard"]} component={AdminHeader} /> */}
          {/* **ADMIN ROUTES END** */}

          {/* **OWNER ROUTES BEGIN** */}
          <Route
            exact
            path="/owner/register"
            component={PropertyOwnerRegister}
          />
          <Route exact path="/owner/newpackage" component={NewPackage} />
          <Route exact path="/owner/packages" component={ViewPackages} />
          <Route exact path="/owner/dashboard/:id" component={OwnerDashboard} />
          <Route exact path="/owner/editpackage/:id" component={EditPackage} />

          {/* **OWNER ROUTES END** */}

          {/* **ORGANIZER ROUTES BEGIN** */}
          <Route
            exact
            path="/eventorganizer/register"
            component={EventOrganizerRegister}
          />
          <Route exact path="/eventorganizer/addcustomizedpackage">
            <EventOrganizerHeader />
            <CreateCustomizedPackage />
          </Route>
          <Route exact path="/eventorganizer/customizedpackages">
            <EventOrganizerHeader />
            <ViewCustomizedPackage />
          </Route>
          <Route exact path="/eventorganizer/packagesapproval">
            <EventOrganizerHeader />
            <ViewCustomizerPackageApproval />
          </Route>
          <Route exact path="/eventorganizer/editpackages/:id">
            <EventOrganizerHeader />
            <UpdateCustomizedPackage />
          </Route>
          <Route exact path="/eventorganizer/customdashboard">
            <EventOrganizerHeader />
            <OfferFormDashBoard />
          </Route>
          <Route exact path="/eventorganizer/dashboard">
            <EventOrganizerHeader />
            <OfferDashboard />
          </Route>
          <Route exact path="/eventorganizer/latestoffers">
            <EventOrganizerHeader />
            <LatestOffers />
          </Route>
          <Route exact path="/eventorganizer/otherOffers">
            <EventOrganizerHeader />
            <OtherOffers />
          </Route>
          <Route exact path="/eventorganizer/partyoffers">
            <EventOrganizerHeader />
            <PartyOffers />
          </Route>
          <Route exact path="/eventorganizer/showoffers">
            <EventOrganizerHeader />
            <ShowOffers />
          </Route>
          <Route exact path="/eventorganizer/wedding">
            <EventOrganizerHeader />
            <WeddingOffers />
          </Route>
          {/* **ORGANIZER ROUTES END** */}

          {/* **USER ROUTE BEGIN** */}
          <Route exact path="/user/register" component={UserRegister} />
          <Route exact path="/user/enquiry/:id" component={Enquiry} />
          <Route exact path="/view/advertisment/:id" component={ViewAdd} />
          <Route exact path="/user/dashboard/:id" component={UserDashboard} />
          <Route exact path="/user/payment/:id" component={ConfirmPayment} />
          {/* **USER ROUTE END** */}
        </Switch>
      </div>
    </Router>
  );
}

export default AppRoutes;

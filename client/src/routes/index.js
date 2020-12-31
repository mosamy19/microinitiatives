import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthLayout from "../layouts/Auth";
import DashboardLayout from "../layouts/Dashboard";
import MainLayout from "../layouts/Main";
import PublicLayout from "../layouts/Public";
import Contact from "../pages/Contact";
import Successmsg from "../pages/Contact/components/Successmsg";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Dashboard/Users";
import Dashboardinitiatives from "../pages/Dashboard/Initiatives/index";
import Dashboardcomment from "../pages/Dashboard/Comments";
import Home from "../pages/Home";
import Browseallinitiatives from "../pages/Home/components/browse-all-initiatives";
import Browsesingleinitiative from "../pages/Home/components/browse-single-initiative";
import Details from "../pages/Home/components/details/index";
import Allinitiatives from "../pages/Initiatives/all-initiatives";
import CloneOtherInitiative from "../pages/Initiatives/cloneinitiative";
import Editinitiative from "../pages/Initiatives/myinitiatives/component/Editinitiative";
import Newinitiative from "../pages/Initiatives/myinitiatives/component/Newinitiative";
import MyAllinitiatives from "../pages/Initiatives/myinitiatives/Myinitiatives";
import Singleinitiative from "../pages/Initiatives/single-initiatives";
import NotFound from "../pages/NotFound";
import Notifications from "../pages/Notifications";
import Publicprofile from "../pages/Publicprofile";
import Settings from "../pages/Settings";
import Forgetpassword from "../pages/Users/Forgetpassword";
import Login from "../pages/Users/Login";
import Resetmessage from "../pages/Users/Resetmessage";
import Resetpassword from "../pages/Users/Resetpassword";
import Signup from "../pages/Users/Signup";
import AdminRouteWithLayout from "./AdminRouteWithLayout";
import PrivateRouteWithLayout from "./PrivateRouteWithLayout";
import RouteWithLayout from "./RouteWithLayout";
import Categories from "../pages/Dashboard/Categories";
import Emailconfirmation from "../pages/Users/Emailconfirmation";

const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        {/* all admin routes */}
        <AdminRouteWithLayout
          layout={DashboardLayout}
          path="/dashboard"
          exact
          component={Dashboard}
        />
        <AdminRouteWithLayout
          layout={DashboardLayout}
          path="/dashboard/users"
          exact
          component={Users}
        />
        <AdminRouteWithLayout
          layout={DashboardLayout}
          path="/dashboard/initiatives"
          exact
          component={Dashboardinitiatives}
        />
        <AdminRouteWithLayout
          layout={DashboardLayout}
          path="/dashboard/comments"
          exact
          component={Dashboardcomment}
        />
        <AdminRouteWithLayout
          layout={DashboardLayout}
          path="/dashboard/categories"
          exact
          component={Categories}
        />

        {/* all public routes */}
        <RouteWithLayout
          layout={PublicLayout}
          path="/"
          exact
          component={Home}
        />
        <RouteWithLayout
          layout={PublicLayout}
          path="/details"
          component={Details}
        />
        <RouteWithLayout
          layout={PublicLayout}
          path="/contact-us"
          component={Contact}
        />
        <RouteWithLayout
          layout={PublicLayout}
          path="/contact/:message"
          component={Successmsg}
        />
        <RouteWithLayout
          layout={PublicLayout}
          path="/browse-all-initiatives"
          component={Browseallinitiatives}
        />
        <RouteWithLayout
          layout={PublicLayout}
          path="/browse-single-initiative/:initiativeId"
          component={Browsesingleinitiative}
        />

        {/* all public auth routes */}
        <RouteWithLayout layout={AuthLayout} path="/login" component={Login} />
        <RouteWithLayout
          layout={AuthLayout}
          path="/signup"
          component={Signup}
        />
        <RouteWithLayout
          layout={AuthLayout}
          path="/confirm-email"
          component={Emailconfirmation}
        />
        <RouteWithLayout
          layout={AuthLayout}
          path="/forget-password"
          component={Forgetpassword}
        />
        <RouteWithLayout
          layout={AuthLayout}
          path="/reset-message"
          component={Resetmessage}
        />
        <RouteWithLayout
          layout={AuthLayout}
          path="/reset-password/:token"
          component={Resetpassword}
        />

        {/* all protected routes  */}
        <PrivateRouteWithLayout
          layout={MainLayout}
          path="/all-initiatives"
          component={Allinitiatives}
        />
        <PrivateRouteWithLayout
          layout={MainLayout}
          path="/single-initiative/:initiativeId"
          component={Singleinitiative}
        />
        <PrivateRouteWithLayout
          layout={MainLayout}
          path="/my-initiatives"
          component={MyAllinitiatives}
        />
        <PrivateRouteWithLayout
          layout={MainLayout}
          path="/clone-initiative/:initiativeId/:initiativeAuthor/:type"
          component={CloneOtherInitiative}
        />
        <PrivateRouteWithLayout
          layout={MainLayout}
          path="/new-initiative"
          component={Newinitiative}
        />
        <PrivateRouteWithLayout
          layout={MainLayout}
          path="/edit-initiative/:initiativeId/:type"
          component={Editinitiative}
        />
        <PrivateRouteWithLayout
          layout={MainLayout}
          path="/settings"
          component={Settings}
        />
        <PrivateRouteWithLayout
          layout={MainLayout}
          path="/notifications"
          component={Notifications}
        />
        <PrivateRouteWithLayout
          layout={MainLayout}
          path="/public-profile/:id"
          component={Publicprofile}
        />

        {/* not found page route */}
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default AppRoutes;

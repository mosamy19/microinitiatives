import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "../components/partials/Navigation";
import AuthLayout from "../layouts/Auth";
import MainLayout from "../layouts/Main";
import PublicLayout from "../layouts/Public";
import Home from "../pages/Home";
import Details from "../pages/Home/Details";
import Allinitiatives from "../pages/Initiatives/all-initiatives";
import CloneOtherInitiative from "../pages/Initiatives/cloneinitiative";
import Newinitiative from "../pages/Initiatives/myinitiatives/component/Newinitiative";
import MyAllinitiatives from "../pages/Initiatives/myinitiatives/Myinitiatives";
import Singleinitiative from "../pages/Initiatives/single-initiatives";
import NotFound from "../pages/NotFound";
import Notifications from "../pages/Notifications";
import Publicprofile from "../pages/Publicprofile";
import Settings from "../pages/Settings";
import Activateaccount from "../pages/Users/Activateaccount";
import Forgetpassword from "../pages/Users/Forgetpassword";
import Login from "../pages/Users/Login";
import Resetmessage from "../pages/Users/Resetmessage";
import Resetpassword from "../pages/Users/Resetpassword";
import Signup from "../pages/Users/Signup";
import PrivateRouteWithLayout from "./PrivateRouteWithLayout";
import RouteWithLayout from "./RouteWithLayout";

const AppRoutes = () => {
  return (
    <Router>
      <Switch>
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
        <RouteWithLayout layout={AuthLayout} path="/login" component={Login} />
        <RouteWithLayout
          layout={AuthLayout}
          path="/signup"
          component={Signup}
        />
        <RouteWithLayout
          layout={AuthLayout}
          path="/account-activation/:token"
          component={Activateaccount}
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
          path="/clone-initiative/:id/:initiativeAuthor/:initiativeTitle/:initiativeCategory"
          component={CloneOtherInitiative}
        />
        <PrivateRouteWithLayout
          layout={MainLayout}
          path="/new-initiative"
          component={Newinitiative}
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

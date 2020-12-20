import React from 'react';
import {useSelector} from 'react-redux'
import { Route, Redirect } from "react-router-dom";

const AdminRouteWithLayout = ({
  layout: Layout,
  component: Component,
  ...rest
}) => {
  const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);
  console.log(isAuthenticated, isAdmin);
  return (
    <Route
      render={(props) =>
        isAuthenticated && isAdmin ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
      {...rest}
    />
  );
};

export default AdminRouteWithLayout;
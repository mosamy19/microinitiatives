import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRouteWithLayout = ({
  auth,
  layout: Layout,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      render={(props) =>
        auth.isAuthenticated ? (
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
const mapStateToProps = (state) => ({ auth: state.auth });
export default connect(mapStateToProps)(PrivateRouteWithLayout);

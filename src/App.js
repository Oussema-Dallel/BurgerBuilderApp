import React, { Component, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import * as actionCreators from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));
    const Orders = React.lazy(() => import("./containers/Orders/Orders"));
    const Auth = React.lazy(() => import("./containers/Auth/Auth"));

    if (this.props.isAuthenticated) {
      return (
        <div>
          <Layout>
            <Switch>
              <Suspense
                fallback={
                  <div>
                    <h1>Loading ...</h1>
                  </div>
                }
              >
                <Route path="/checkout" component={Checkout} />
                <Route path="/orders" component={Orders} />
                <Route path="/auth" component={Auth} />
                <Route path="/logout" component={Logout} />
                <Route path="/" exact component={BurgerBuilder} />
              </Suspense>
              <Redirect to="/" />
            </Switch>
          </Layout>
        </div>
      );
    } else {
      return (
        <div>
          <Layout>
            <Switch>
              <Suspense
                fallback={
                  <div style={{ textAlign: "center" }}>
                    <h1>Loading ...</h1>
                  </div>
                }
              >
                <Route path="/auth" component={Auth} />
                <Route path="/" exact component={BurgerBuilder} />
              </Suspense>
              <Redirect to="/" />
            </Switch>
          </Layout>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actionCreators.authCheckStatus())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);

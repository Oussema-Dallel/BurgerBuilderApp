import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
class Checkout extends Component {
  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  checkoutConfirmedHandler = () => {
    this.props.history.replace(this.props.match.url + "/chekout-contact-data");
  };
  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      const purchasedCheck = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchasedCheck}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCanceled={this.checkoutCanceledHandler}
            checkoutConfirmed={this.checkoutConfirmedHandler}
          />
          <Route
            path={this.props.match.url + "/chekout-contact-data"}
            component={ContactData}
          />
        </div>
      );
    }

    return <div>{summary}</div>;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);

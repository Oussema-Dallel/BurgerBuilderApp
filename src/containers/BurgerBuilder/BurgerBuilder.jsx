//this is a simple code snippet of a stateful component, though the data is hard coded here
//this component acts as the container of all components wchich contribute to the burger building
//as such it imports all of the necessary components such as the Burger itself and and the
//burger controls component  which is basically the buttons for adding or removing ingredients
//from the displayed burger.

import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BurgerControls/BurgerControls";
import Aux from "../../hoc/Aux";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

export class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onSetIngredients();
  }
  updatePurchasedHandler = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onPurchaseInit();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let burger = <Spinner />;
    let orderSummary = null;
    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BurgerControls
            disabled={disabledInfo}
            removedIngredients={this.props.onRemoveIngredient}
            addedIngredients={this.props.onAddIngredient}
            price={this.props.price}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
            purchasable={this.updatePurchasedHandler(this.props.ingredients)}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          price={this.props.price}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseConfirmed={this.purchaseContinueHandler}
        />
      );
    }
    if (this.props.error) {
      burger = <p>Something didn't Work !!</p>;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.idToken !== null,
    path: state.auth.path
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: ingredientName =>
      dispatch(actionCreators.addIngredients(ingredientName)),
    onRemoveIngredient: ingredientName =>
      dispatch(actionCreators.removeIngredients(ingredientName)),
    onSetIngredients: () => dispatch(actionCreators.initIngredients()),
    onPurchaseInit: () => dispatch(actionCreators.purchaseInit()),
    onAuthRedirectPath: path => dispatch(actionCreators.authRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));

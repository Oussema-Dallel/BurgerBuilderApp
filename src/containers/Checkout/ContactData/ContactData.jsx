import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/spinner";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";
import * as actionCreators from "../../../store/actions/index";
import withErrorHandling from "../../../hoc/withErrorHandler/withErrorHandler";
import { checkValidity } from "../../../shared/utility";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      postalCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Postal Code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest",
        valid: true
      }
    },
    loading: false,
    formIsValid: false
  };

  orderHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let formelementIdentifier in this.state.orderForm) {
      formData[formelementIdentifier] = this.state.orderForm[
        formelementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    };

    this.props.onBurgerPurchase(order, this.props.token);
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = {
      ...this.state.orderForm
    };
    const updatedformElement = {
      ...updatedForm[inputIdentifier]
    };
    updatedformElement.value = event.target.value;
    if (updatedformElement.validation) {
      updatedformElement.valid = checkValidity(
        updatedformElement.validation,
        updatedformElement.value
      );
      updatedformElement.touched = true;
    }

    updatedForm[inputIdentifier] = updatedformElement;
    let formIsValid = true;
    for (inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updatedForm, formIsValid: formIsValid });
  };

  render() {
    let formArray = [];
    for (let key in this.state.orderForm) {
      formArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formArray.map(formEl => {
          return (
            <Input
              key={formEl.id}
              elementType={formEl.config.elementType}
              elementConfig={formEl.config.elementConfig}
              value={formEl.config.value}
              invalid={!formEl.config.valid}
              touched={formEl.config.touched}
              shouldValidate={formEl.config.validation}
              changed={event => this.inputChangedHandler(event, formEl.id)}
            />
          );
        })}

        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Please Enter your credentials to continue</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.idToken,
    userId: state.auth.localId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onBurgerPurchase: (orderData, token) =>
      dispatch(actionCreators.purchaseBurger(orderData, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandling(ContactData, axios));

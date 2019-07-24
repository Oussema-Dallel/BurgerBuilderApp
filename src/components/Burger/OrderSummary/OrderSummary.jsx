import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

const OrderSummary = props => {
  const ingredientsSummary = Object.keys(props.ingredients).map(igKey => (
    <li key={igKey}>
      <span style={{ textTransform: "capitalize" }}>{igKey}:</span>
      {props.ingredients[igKey]}
    </li>
  ));
  return (
    <Aux>
      <h3>Your order Summary</h3>
      <p>The burger's details : </p>
      <ul>{ingredientsSummary}</ul>
      <p>
        <strong>Total price: {props.price.toFixed(2)}</strong>
      </p>
      <p>porceed to your checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCanceled}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.purchaseConfirmed}>
        Continue
      </Button>
    </Aux>
  );
};

export default OrderSummary;

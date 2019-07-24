import React from "react";
import Button from "../../UI/Button/Button";
import Burger from "../../Burger/Burger";

import classes from "./CheckoutSummary.css";

const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Hope it tastes good !!</h1>
      <Burger
        style={{ width: "100%", margin: "auto" }}
        ingredients={props.ingredients}
      />
      <Button btnType="Danger" clicked={props.checkoutCanceled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkoutConfirmed}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;

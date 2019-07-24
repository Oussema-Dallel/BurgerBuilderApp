import React from "react";
import classes from "./BurgerControls.css";
import BurgerControl from "./BurgerControl/BurgerControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
  { label: "Bacon", type: "bacon" }
];

const BurgerControls = props => {
  return (
    <div className={classes.BurgerControls}>
      <p>
        Total price : <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map(ctrl => {
        return (
          <BurgerControl
            key={ctrl.label}
            label={ctrl.label}
            added={() => props.addedIngredients(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
            removed={() => props.removedIngredients(ctrl.type)}
          />
        );
      })}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        {props.isAuth ? "Checkout" : "Authenticate to Continue"}
      </button>
    </div>
  );
};

export default BurgerControls;

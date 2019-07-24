import React from "react";
import classes from "./Order.css";

const Order = props => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }
  const ingredientsOutput = ingredients.map(ig => {
    return (
      <span
        key={ig.name}
        style={{
          textTransform: "capitalize",
          dipslay: "inline-block",
          margin: "0 2px",
          padding: "5px",
          border: "1px solid #eee",
          boxSizing: "border-box"
        }}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredient : {ingredientsOutput}</p>
      <p>
        Price <strong>{props.price} EUR</strong>
      </p>
    </div>
  );
};

export default Order;

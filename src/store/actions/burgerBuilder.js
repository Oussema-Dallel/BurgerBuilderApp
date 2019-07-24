import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios-orders";

export const addIngredients = name => {
  return {
    type: actionTypes.ADDINGREDIENTS,
    ingredientName: name
  };
};

export const removeIngredients = name => {
  return {
    type: actionTypes.REMOVEINGREDIENTS,
    ingredientName: name
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const failedIngredientsLoad = () => {
  return {
    type: actionTypes.FAILED_INGREDIENTS_LOAD
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios
      .get("https://burgerbuilder-bf6fb.firebaseio.com/ingredients.json")
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(failedIngredientsLoad());
      });
  };
};

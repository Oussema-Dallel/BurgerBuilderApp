import * as actionTypes from "./actions/actionTypes";

const INGREDIENT_PRICES = {
  salad: 0.3,
  bacon: 0.5,
  meat: 1.5,
  cheese: 1
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADDINGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
      };
    case actionTypes.REMOVEINGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        totalPrice: 4,
        building: false
      };
    case actionTypes.FAILED_INGREDIENTS_LOAD:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};

export default reducer;

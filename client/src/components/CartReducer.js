export const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return action.cart;
    case "ADD_ITEM":
      return [...state, action.item];
    case "REMOVE_ITEM":
      return state.filter((item) => item._id !== action._id);
    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item._id === action._id ? { ...item, quantity: action.quantity } : item
      );
    case "EMPTY_CART":
      return [];
    default:
      return state;
  }
};

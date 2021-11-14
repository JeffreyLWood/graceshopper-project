import axios from 'axios';
import { ThunkMiddleware } from 'redux-thunk';
import { useDispatch } from 'react-redux';

// ACTION TYPES
const GET_ITEMS = 'GET_ITEMS';
const ADD_ITEM = 'ADD_ITEM';
const EDIT_ITEM = 'EDIT_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const PURCHASE_ITEMS = 'PURCHASE_ITEMS';

//ACTION CREATORS
const getItems = items => {
  return {
    type: GET_ITEMS,
    items,
  };
};

const addItem = newCart => {
  return {
    type: ADD_ITEM,
    newCart,
  };
};

const editItem = newCart => {
  return {
    type: EDIT_ITEM,
    newCart,
  };
};

const removeItem = itemId => {
  return {
    type: REMOVE_ITEM,
    itemId,
  };
};

const purchaseItems = newCart => {
  return {
    type: PURCHASE_ITEMS,
    newCart,
  };
};

//THUNK CREATORS
export const fetchItems = userId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/cart/${userId}`);
    dispatch(getItems(data.items));
  } catch (err) {
    return err;
  }
};

export const addItemToCart = (item, userId) => async dispatch => {
  try {
    const { data } = await axios.put(`/api/cart/${userId}`, item);
    dispatch(addItem(data));
  } catch (err) {
    return err;
  }
};

export const editItemInCart = (userId, itemId, quantity) => async dispatch => {
  try {
    const { data } = await axios.put(`/api/cart/${userId}/edit`, {
      itemId,
      quantity,
    });
    dispatch(editItem(data));
  } catch (err) {
    return err;
  }
};

export const removeItemFromCart = (itemId, userId) => async dispatch => {
  try {
    await axios.delete(`/api/cart/${userId}/${itemId}`);
    dispatch(removeItem(itemId));
  } catch (err) {
    return err;
  }
};

export const checkoutCart = userId => async dispatch => {
  try {
    await axios.delete(`/api/cart/${userId}/checkout`);
    dispatch(purchaseItems(itemId));
  } catch (err) {
    return err;
  }
};

//REDUCER
export default function (state = [{}], action) {
  switch (action.type) {
    case GET_ITEMS:
      return action.items;
    case ADD_ITEM:
      return action.newCart;
    case EDIT_ITEM:
      return action.newCart;
    case PURCHASE_ITEMS:
      return action.newCart;
    case REMOVE_ITEM:
      const cartState = state.filter(item => item.id !== action.itemId);
      return cartState;
    default:
      return state;
  }
}

import {
  ADD_TO_CART,
  DECREASE_TO_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE,
  RECEIVE_PRODUCTS
} from '../constants/ActionTypes'

const initialState = {
  addedIds: [],
  quantityById: {}
}

const addedIds = (state = initialState.addedIds, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS: 
      return [
        ...state,
        ...action.products.map(product => product.id)
      ]
    case ADD_TO_CART:
      if (state.indexOf(action.productId) !== -1) {
        return state
      }
      return [ ...state, action.productId ]
    default:
      return state
  }
}

const quantityById = (state = initialState.quantityById, action) => {
  const { productId } = action
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        ...action.products.reduce((obj, product) => {
          obj[product.id] = product.quantity
          return obj
        }, {})
      }
    case ADD_TO_CART:
      return { ...state,
        [productId]: (state[productId] || 0) + 1
      }
    case DECREASE_TO_CART:
      return { ...state,
        [productId]: (state[productId] || 1) - 1
      }
    default:
      return state
  }
}

export const getQuantity = (state, productId) =>
  state.quantityById[productId] || 0

export const getAddedIds = state => state.addedIds

const cart = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState
    case CHECKOUT_FAILURE:
      return action.cart
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action)
      }
  }
}

export default cart

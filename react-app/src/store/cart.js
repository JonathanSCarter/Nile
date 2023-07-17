//TYPES
const GET_CART = 'carts/GET_CART'

//ACTIONS
const actionGetCart = (carts) => ({
  type: GET_CART,
  payload: carts
})

//THUNK
export const thunkGetCart = () => async (dispatch) => {
  const res = await fetch('/api/carts/')
  if(res.ok) {
    const data = await res.json();
    dispatch(actionGetCart(data))
  }
}

export const thunkAddToCart = (payload) => async (dispatch) => {
  fetch('/api/carts/', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
}

export const thunkUpdateCount = (id, count) => async (dispatch) => {
  const res = await fetch(`/api/carts/${id}/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(count)
  })
  if(res.ok) {
    const data = await res.json();
    dispatch(actionGetCart(data))
  }
}

export const thunkPurchaseCart = () => async (dispatch) => {
  const res = await fetch(`/api/carts/purchase`)
}

export const thunkDeleteCart = (id) => async (dispatch) => {
  const res = await fetch(`/api/carts/${id}/delete`)
  if(res.ok) {
    const data = await res.json();
    dispatch(actionGetCart(data))
  }
}

//REDUX
const initialState = {cartItems: {}}

const cart = (state = initialState, action) => {
  switch(action.type){
    case GET_CART: {
      const newState = {cartItems: {}}
      action.payload.forEach(cartItem => newState.cartItems[cartItem.id] = cartItem)
      return newState
    }

    default:
      return state
  }
}

export default cart

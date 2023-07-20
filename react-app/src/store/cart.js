//TYPES
const GET_CART = 'carts/GET_CART'
const GET_OLD_CART = 'carts/GET_OLD_CART'


//ACTIONS
const actionGetCart = (carts) => ({
  type: GET_CART,
  payload: carts
})

const actionGetOldCart = (carts) => ({
  type: GET_OLD_CART,
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
  const res = await fetch('/api/carts/', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  if(res && res.ok) {
    const data = await res.json();
    dispatch(actionGetCart(data))
  }
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
  fetch(`/api/carts/purchase`)
}

export const thunkDeleteCart = (id) => async (dispatch) => {
  const res = await fetch(`/api/carts/${id}/delete`)
  if(res.ok) {
    const data = await res.json();
    dispatch(actionGetCart(data))
  }
}

export const thunkGetPurchases = () => async (dispatch) => {
  const res = await fetch('/api/carts/purchased')
  if(res.ok) {
    const data = await res.json();
    dispatch(actionGetOldCart(data))
  }
}

//REDUX
const initialState = {cartItems: {}, oldCartItems: {}}

const cart = (state = initialState, action) => {
  switch(action.type){
    case GET_CART: {
      const newState = {...state, cartItems: {}}
      action.payload.forEach(cartItem => newState.cartItems[cartItem.id] = cartItem)
      return newState
    }
    case GET_OLD_CART: {
      const newState = {...state, oldCartItems: {}}
      action.payload.forEach(purchase => newState.oldCartItems[purchase.id] = purchase)
      return newState
    }
    default:
      return state
  }
}

export default cart

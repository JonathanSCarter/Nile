//Types
const GET_ITEMS = '/items/GET_ITEMS'

const GET_ITEM = '/items/GET_ITEM'

//ACTIONS
const actionGetItems = (items) => ({
  type: GET_ITEMS,
  payload: items
})
const actionGetItem = (item) => ({
  type: GET_ITEM,
  payload: item
})

//THUNK
export const thunkGetItems = () => async (dispatch) => {
  const res = await fetch("/api/items/")
  if (res.ok) {
    const data = await res.json();
    dispatch(actionGetItems(data))
  }
}

export const thunkGetItem = (id) => async (dispatch) => {
  const res = await fetch(`/api/items/${id}`)
  if (res.ok) {
    const data = await res.json();
    dispatch(actionGetItem(data))
  }
}

export const thunkPostItem = (item) => async (dispatch) => {
  const res = await fetch("/api/items/", {
    method: "POST",
    body: item
})
  if (res.ok) {
    const data = await res.json();
    return data
  }
  else {
    const errorData = await res.json();
    return errorData
  }
}

export const thunkPutItem = (item, id) => async (dispatch) => {
  const res = await fetch(`/api/items/${id}/update`, {
    method: "POST",
    body: item
})
  if (res.ok) {
    const data = await res.json();
    return data
  }
  else {
    const errorData = await res.json();
    return errorData
  }
}

export const thunkPutItemImage = (item, id) => async (dispatch) => {
  const res = await fetch(`/api/items/${id}/update/image`, {
    method: "POST",
    body: item
})
  if (res.ok) {
    const data = await res.json();
    return data
  }
  else {
    const errorData = await res.json();
    return errorData
  }
}

export const thunkDeleteItem = (id) => async (dispatch) => {
  const res = await fetch(`/api/items/${id}/delete`)
  if (res.ok) {
    const data = await res.json();
    dispatch(actionGetItem(data))
  }
}

//REDUX
const initialState = {allItems: {}, singleItem: {}}

const items = (state = initialState, action) => {
  switch(action.type){
    case GET_ITEMS: {
      const newState = {...state, allItems: {}}
      action.payload.forEach(item => newState.allItems[item.id] = item)
      return newState
    }
    case GET_ITEM:{
      const newState = {...state, singleItem: {}}
      newState.singleItem = action.payload
      return newState
    }
    // case POST_ITEM:{
    //   return state
    // }
    default:
      return state
  }
}

export default items

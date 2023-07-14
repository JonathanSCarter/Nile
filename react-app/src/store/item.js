//Types
const GET_ITEMS = '/items/GET_ITEMS'
const POST_ITEM = '/items/POST_ITEM'

//ACTIONS
const actionGetItems = (items) => ({
  type: GET_ITEMS,
  payload: items
})
const actionPostItem = (item) => ({
  type: POST_ITEM,
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
export const thunkPostItem = (item) => async (dispatch) => {
  console.log('this is a triumph');
  console.log(item, 'this is my item');
  console.log("is still still working?")
  const res = await fetch("/api/items/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
})
console.log(res, 'this is my res');
  if (res.ok) {
    const data = await res.json();
    dispatch(actionPostItem(data))
    return data
  }
  else {
    const errorData = await res.json();
    return errorData
  }
}

//REDUX
const initialState = {allItems: {}, singleItem: {}}

const items = (state = initialState, action) => {
  switch(action.type){
    case GET_ITEMS:
      const newState = {...state, allItems: {}}
      action.payload.forEach(item => newState.allItems[item.id] = item)
      return newState
    case POST_ITEM:
      return state
    default:
      return state
  }
}

export default items

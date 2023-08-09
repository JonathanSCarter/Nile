import { thunkGetItem } from "./item";

//TYPES
const GET_REVIEWS = '/reviews/REVIEW_ITEMS'

//ACTIONS
const actionGetReviews = (reviews) => ({
  type: GET_REVIEWS,
  payload: reviews
})

//THUNK
export const thunkGetReviews = (id) => async (dispatch) => {
  const res = await fetch(`/api/items/${id}/reviews`)
  if(res.ok){
    const data = await res.json();
    dispatch(actionGetReviews(data))
  }
}

export const thunkPostReview = (id, payload) => async (dispatch) => {
  const res = await fetch(`/api/items/${id}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  dispatch(thunkGetReviews(id))
  dispatch(thunkGetItem(id))
}

export const thunkUpdateReview = (id, payload, itemId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  dispatch(thunkGetReviews(itemId))
  dispatch(thunkGetItem(itemId))

}

export const thunkDeleteReview = (id, itemId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${id}`, {
    method: "DELETE",
  })
  dispatch(thunkGetReviews(itemId))
  dispatch(thunkGetItem(itemId))

}

//REDUX
const initialState = {allReviews: {}}

const reviews = (state = initialState, action) => {
  switch(action.type){
    case GET_REVIEWS: {
      const newState = {...state, allReviews: {}}
      action.payload.forEach(review => newState.allReviews[review.id] = review)
      return newState
    }
    default:
      return state
  }
}

export default reviews

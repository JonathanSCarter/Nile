import React, {useState} from 'react'
import { thunkDeleteItem } from '../../store/item'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { useHistory } from "react-router-dom";
import './DeleteItem.css'
function DeleteItem({id}){
  const history = useHistory()
  const {closeModal} = useModal()
  const dispatch = useDispatch()
  const confirmDelete = () => {
    dispatch(thunkDeleteItem(parseInt(id)))
    closeModal()
    history.push('/')
  }

  return (
    <div className='delete-modal'>
    <h1>Are you sure you want to delete this listing?</h1>
    <span>
    <button onClick={closeModal}>No</button>
    <button onClick={confirmDelete}>Yes, I'm sure I want to delete this listing</button>
    </span>
    </div>
  )
}

export default DeleteItem

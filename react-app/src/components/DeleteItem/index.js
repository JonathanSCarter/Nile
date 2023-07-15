import React, {useState} from 'react'
import { thunkDeleteItem } from '../../store/item'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'

function DeleteItem({id}){
  const {closeModal} = useModal()
  const dispatch = useDispatch()
  const confirmDelete = () => {
    dispatch(thunkDeleteItem(parseInt(id)))
    closeModal()
  }

  return (
    <>
    <h1>Are you sure you want to delete this listing?</h1>
    <button onClick={closeModal}>No</button>
    <button onClick={confirmDelete}>Yes, I'm sure I want to delete this listing</button>
    </>
  )
}

export default DeleteItem

import React, {useState} from 'react'
import { thunkPostItem } from '../../store/item'
import { useDispatch } from 'react-redux'

function ItemForm(){
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [img, setImg] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('test');
    const data = {
      "name":name,
      "price":price,
      "discount":discount,
      "img":img,
      "description":description,
      "category":category
    }
    console.log(data, 'this is my data object');
    const res = await dispatch(thunkPostItem(data))

    console.log(res);
  }

  return(
    <form onSubmit={(e) => handleSubmit(e)}>
    Name<input placeholder='name' value={name} onChange={(e) => setName(e.target.value)}></input>
    Price<input type='number' placeholder='price' value={price} onChange={(e) => setPrice(e.target.value)}></input>
    Discount<input type='number' placeholder='discount' value={discount} onChange={(e) => setDiscount(e.target.value)}></input>
    Image<input placeholder='img' value={img} onChange={(e) => setImg(e.target.value)}></input>
    Description<input placeholder='description' value={description} onChange={(e) => setDescription(e.target.value)}></input>
    Category<input placeholder='category' value={category} onChange={(e) => setCategory(e.target.value)}></input>
    <button type='submit'>Create Item</button>
    </form>
  )

}

export default ItemForm

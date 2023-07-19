import React, {useEffect, useState} from 'react'
import { thunkGetItem, thunkPutItem, thunkPutItemImage } from '../../store/item'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';

function UpdateItemForm({}){
  const dispatch = useDispatch();
  const history = useHistory()
  const item = useSelector(state => state.items.singleItem)
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);
  const [discount, setDiscount] = useState(item.discount);
  const [image, setImage] = useState(item.image);
  const [description, setDescription] = useState(item.description);
  const [category, setCategory] = useState(item.category);
  const [errors, setErrors] = useState({});
  const user = useSelector(state => state.session.user);
  const { id } = useParams();

  useEffect(() => {
    dispatch(thunkGetItem(id))
  }, [])

  useEffect(() => {
    if(user.id != item.seller_id){
      history.push('/')
    }
    setName(item.name);
    setPrice(item.price);
    setDiscount(item.discount);
    setImage(item.image);
    setDescription(item.description);
    setCategory(item.category);
  }, [item])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("seller_id", user.id);
    const res = await dispatch(thunkPutItem(formData, id));

    if(res.errors){
      setErrors(res.errors);
    } else {
      history.push(`/items/${id}`)
    }

  }

  const handleImage = async (e) => {
    e.preventDefault();
    setErrors({});
    const formData = new FormData();
    formData.append("image", image);
    const res = await dispatch(thunkPutItemImage(formData, id));

    if(res.errors){
      setErrors(res.errors);
    } else {
      history.push(`/items/${id}`)
    }
  }
  return(
    <>
    <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
    Name<input placeholder='name' value={name} onChange={(e) => setName(e.target.value)}></input>{errors.name}
    Price<input type='number' placeholder='price' value={price} onChange={(e) => setPrice(e.target.value)}></input>{errors.price}
    Discount<input type='number' placeholder='discount' value={discount} onChange={(e) => setDiscount(e.target.value)}></input>{errors.discount}
    Description<input placeholder='description' value={description} onChange={(e) => setDescription(e.target.value)}></input>{errors.description}
    Category<input placeholder='category' value={category} onChange={(e) => setCategory(e.target.value)}></input>{errors.category}
    <button type='submit'>Update Item Details</button>
    </form>
    <form onSubmit={handleImage} encType='multipart/form-data'>
    Image<input type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])}></input>{errors.image}
    <button type='submit'>Update Image</button>
    </form>
    </>
  )

}

export default UpdateItemForm

import React, {useEffect, useState} from 'react'
import { thunkPostItem } from '../../store/item'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';

function ItemForm(){
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState({});
  const user = useSelector(state => state.session.user);

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
    const res = await dispatch(thunkPostItem(formData));

    if(res.errors){
      console.log(res.errors);
      setErrors(res.errors);
    } else {
      history.push(`/items/${res.id}`)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === '-' || e.key === 'e') {
      e.preventDefault();
    }
  };

  return(
    <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
    <label>Name</label><input placeholder='name' value={name} onChange={(e) => setName(e.target.value)}></input>{errors.name}
    Price<input onKeyPress={handleKeyPress} type='number' placeholder='price' min='0' value={price} onChange={(e) => setPrice(e.target.value)}></input>{errors.price}
    Discount<input onKeyPress={handleKeyPress} type='number' placeholder='discount' value={discount} min='0'onChange={(e) => setDiscount(e.target.value)}></input>{errors.discount}
    Image<input type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])}></input>{errors.image}
    Description<input placeholder='description' value={description} onChange={(e) => setDescription(e.target.value)}></input>{errors.description}
    Category<input placeholder='category' value={category} onChange={(e) => setCategory(e.target.value)}></input>{errors.category}
    <button type='submit'>Create Item</button>
    </form>
  )

}

export default ItemForm

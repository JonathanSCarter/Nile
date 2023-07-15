import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetItems } from '../../store/item';
import Item from '../Item'
function ItemSearch(){
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const items = useSelector(state => state.items.allItems);
  const normalizedItems = [...Object.values(items)];
  useEffect(() => {
    dispatch(thunkGetItems());
  }, [])

  const filteredItems = normalizedItems.filter(item => item.name.includes(query));
  console.log(filteredItems);
  return (
    <>
    <input placeholder='search' value={query} onChange={(e) => setQuery(e.target.value)}></input>
    {filteredItems.map((item) => {
      return (<Item item={item}/>)
    }
    )}
    </>
  )
}


export default ItemSearch

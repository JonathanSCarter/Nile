import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetItems } from '../../store/item';
import Item from '../Item'
import './itemSearch.css'
function ItemSearch(){
  const dispatch = useDispatch();
  const items = useSelector(state => state.items.allItems);
  const normalizedItems = [...Object.values(items)];
  const [isReady, setIsReady] = useState(false)
  useEffect(() => {
    if (document.referrer === '') {
      dispatch(thunkGetItems()).then(() => {
        setIsReady(true);
      })
    }
  }, []);

  return (isReady || document.referrer) ? (
    <>
    <div className='item-holder'>
    {normalizedItems.length ? normalizedItems.map((item) => {
      return (<Item item={item}/>)
    }
    ) :
    <div>There are no results for this search. Please try a different search.</div>}
    </div>
    </>
  ) : null
}


export default ItemSearch

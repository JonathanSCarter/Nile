import React, {useEffect, useState} from 'react';
import './OldCartItem.css'
function OldCartItem({cart}){
  return (
    <div className='order-history-item'>
    <h2>You bought {cart.count} {cart.item_name}{cart.item_name[-1] === 's' ? cart.count > 1 ? "'s" : null : cart.count > 1 ? 's' : null} on {cart.purchased_at}</h2>
    </div>
  )
}

export default OldCartItem

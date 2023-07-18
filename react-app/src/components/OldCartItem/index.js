import React, {useEffect, useState} from 'react';

function OldCartItem({cart}){
  return (
    <div>
    <p>{cart.item.name}</p>
    <p>{cart.purchased_at}</p>
    </div>
  )
}

export default OldCartItem

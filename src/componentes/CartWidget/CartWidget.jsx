//import React from 'react'
import './CartWidget.css'

const CartWidget = () => {
    const imgCarrito = "https://cdn-icons-png.flaticon.com/512/107/107831.png";
  return (
    <div>
        <img className = 'imgCarrito' src={imgCarrito} alt={"cart"} />
        <strong> 10 </strong>

    </div>
  )
}

export default CartWidget
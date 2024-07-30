import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, removeItem } from '../redux/cartSlice'

export default function Cart() {

    const { items } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    console.log(items)
    return (
        <div>
            <h2>Cart</h2>
            {items.length === 0 && <p>Your cart is empty</p>}

            {
                items.map(item => (
                    <div key={item.id}>
                        <h4>{item.name}</h4>
                        <button onClick={() => dispatch(removeItem(item.id))}>remove</button>
                    </div>
                ))
            }

            {items.length > 0 && (
                <button onClick={() => dispatch(clearCart())}>clear cart</button>
            )}
        </div>
    )
}

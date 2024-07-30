import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/productSlice'
import { addItem } from '../redux/cartSlice'

export default function Products() {
    const { products, status, error } = useSelector(state => state.products)
    const dispatch = useDispatch()

    useEffect(() => {
        if (status === "start") {
            dispatch(fetchProducts())
        }
    }, [])
    console.log(products)
    return (
        <div>
            {
                products.map(item => (
                    <div key={item.id}>
                        <h3>{item.name}</h3>
                        <p>{item.price}</p>
                        {/* <button>add</button> */}
                        <button onClick={() => dispatch(addItem(item))}>add</button>
                    </div>
                ))
            }
        </div>
    )
}

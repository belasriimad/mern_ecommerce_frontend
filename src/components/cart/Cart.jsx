import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrementQ, incrementQ, removeFromCart } from '../../redux/slices/cartSlice'
import { Link } from 'react-router-dom'

export default function Cart() {
    const { cartItems } = useSelector(state => state.cart)
    const dispatch = useDispatch()

    return (
        <div className='container'>
            <div className="row my-5">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            {
                                !cartItems.length ? 
                                    <div className="alert laert-info">
                                        Your cart is empty!
                                    </div>
                                :
                                <div>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>Subtotal</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cartItems.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{ index += 1}</td>
                                                        <td>
                                                            <img src={item.image} alt={item.name} 
                                                                className='img-fluid rounded' 
                                                                width={60}
                                                                height={60}
                                                            />
                                                        </td>
                                                        <td> {item.name} </td>
                                                        <td>
                                                            <i className="fas fa-caret-down"
                                                                onClick={() => dispatch(decrementQ(item))}
                                                                style={{cursor: 'pointer'}}
                                                                ></i>
                                                            <span className="mx-4">
                                                                {item.quantity}
                                                            </span>
                                                            <i className="fas fa-caret-up"
                                                                onClick={() => dispatch(incrementQ(item))}
                                                                style={{cursor: 'pointer'}}
                                                            ></i>
                                                        </td>
                                                        <td> ${item.price} </td>
                                                        <td> ${item.price * item.quantity} </td>
                                                        <td>
                                                            <i 
                                                                onClick={() => dispatch(removeFromCart(item))}
                                                                className="fas fa-xmark text-danger"
                                                                style={{cursor: 'pointer'}}></i>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                            <tr>
                                                <td colSpan={4} className='text-center fw-bold'>
                                                    Total
                                                </td>
                                                <td colSpan={5} className='text-center fw-bold'>
                                                    <span className="border border-dark rounded p-1 fw-bold">
                                                        ${
                                                            cartItems.reduce((acc, item) => acc += item.price * item.quantity, 0)
                                                        }
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="d-flex justify-content-end align-items-center">
                                        <Link to="/checkout" className='btn btn-primary rounded-0'>
                                            Checkout
                                        </Link>
                                        <Link to="/" className='btn btn-dark rounded-0 mx-1'>
                                            Continue shopping
                                        </Link>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

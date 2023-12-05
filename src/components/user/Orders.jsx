import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Orders() {
    const[orders, setOrders] = useState([])
    const[ordersToShow, setOrdersToShow] = useState(3)
    const { isLoggedIn, token } = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if(!isLoggedIn) {
            navigate('/login')
        }else {
            const fetchUserOrders = async () => {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
                try {
                    const response = await axios.get('http://localhost:3001/orders'
                    , config)
                   setOrders(response.data)
                } catch (error) {
                    console.log(error);
                }
            }
            fetchUserOrders()
        }
    }, [isLoggedIn])

    const loadMoreOrders = () => {
        if(ordersToShow >= orders.length) {
            return;
        }else {
            setOrdersToShow(prevOrdersToShow => prevOrdersToShow + 5)
        }
    }

    return (
        <div className='container'>
            <div className="row my-5">
                <div className="col-md-8 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <table className="table table-responsive">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders?.slice(0, ordersToShow).map((order, index) => (
                                            <tr key={index}>
                                                <td>{index += 1}</td>
                                                <td>{order.productName}</td>
                                                <td>${order.price}</td>
                                                <td>{order.qty}</td>
                                                <td>${order.total}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-center mt-4">
                                {
                                    ordersToShow < orders.length && 
                                    <button 
                                        onClick={() => loadMoreOrders()}
                                        className="btn btn-sm btn-primary">
                                        Load more
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

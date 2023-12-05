import React, { useEffect, useState } from 'react'
import ProductListItem from './ProductListItem'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function Product() {
    const[product, setProduct] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/products/${id}`)
                setProduct(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProduct()
    }, [id])
    return (
        <div className='container'>
            <div className="row my-5">
                {
                    product ? <ProductListItem product={product} single={true} />
                        :
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

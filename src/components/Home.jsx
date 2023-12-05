import React, { useEffect, useState } from 'react'
import ProductListItem from './products/ProductListItem'
import axios from 'axios'
import Categories from './categories/Categories';
import { useParams } from 'react-router-dom';

export default function Home() {
    const[products, setProducts] = useState([]);
    const { category_id } = useParams()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
               if(category_id) {
                    const response = await axios.get(`http://localhost:3001/products/category/${category_id}`);
                    setProducts(response.data);
               }else {
                    const response = await axios.get('http://localhost:3001/products');
                    setProducts(response.data);
               }
            } catch (error) {
                console.log(error);
            }
        }
        fetchProducts();
    }, [category_id])

    return (
        <div className='container'>
            <Categories />
            <div className="row my-5">
                {
                    products?.map(product => <ProductListItem 
                        key={product._id} product={product} />)
                }
            </div>
        </div>
    )
}

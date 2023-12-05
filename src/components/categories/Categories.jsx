import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Categories() {
    const[categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3001/categories');
                setCategories(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCategories()
    }, [])

    return (
        <div className='container'>
            <div className="row my-5">
                <div className="col-md-6 mx-auto">
                    <Link to="/" className="btn btn-outline-dark mx-1" >
                        All
                    </Link>
                    {
                        categories?.map(category => (
                            <Link to={`/products/category/${category._id}`} className="btn btn-outline-dark mx-1" 
                                key={category._id}>
                                { category.name }
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setCurrentUser, setLoggedInOut, setToken } from '../../redux/slices/userSlice'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Header() {
    const { cartItems } = useSelector(state => state.cart)
    const { token, isLoggedIn, user } = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        const getLoggedInUser = async () => {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
            try {
                const response = await axios.get('http://localhost:3001/users/user'
                , config)
                dispatch(setCurrentUser(response.data.user))
            } catch (error) {
                if(error?.response?.status === 401) {
                    sessionStorage.removeItem('currentToken')   
                    dispatch(setLoggedInOut(false))
                    dispatch(setToken(''))     
                }
                console.log(error);
            }
        }
        if (token) getLoggedInUser()
    }, [token])

    const logoutUser = () => {
        sessionStorage.removeItem('currentToken')   
        dispatch(setLoggedInOut(false))
        dispatch(setToken(''))     
        dispatch(setCurrentUser(null))
        toast.success('Logged out successfully', {
            position: toast.POSITION.TOP_RIGHT
        })
        navigate('/login')
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">MERN Ecommerce</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">
                                <i className="fas fa-home"></i> Home
                            </Link>
                        </li>
                        {
                            !isLoggedIn ?
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">
                                        <i className="fas fa-user-plus"></i> Register
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        <i className="fas fa-sign-in"></i> Login
                                    </Link>
                                </li>
                            </> :
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/user/orders">
                                        <i className="fas fa-user"></i> { user?.username }
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link border-0 bg-light" 
                                        onClick={() => logoutUser()}>
                                        <i className="fas fa-sign-in"></i> Logout
                                    </button>
                                </li>
                            </>
                        }
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">
                                <i className="fas fa-shopping-cart"></i> 
                                ({cartItems.length})
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

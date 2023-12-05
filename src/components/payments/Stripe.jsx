import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from './CheckoutForm'

export default function Stripe({ amount }) {
    const[clientSecret, setClientSecret] = useState('')
    const total = amount * 100
    const { isLoggedIn } = useSelector(state => state.user)
    const navigate = useNavigate()
    const stripePromise = loadStripe('pk_test_51C19VNGin0JfRTbQJZzE65nNwvuwtvQBPNPlVkV9g05afJvlEBKpszLgV3ca4cBiHBZT5QUwCEL3Q9znRBRT7Bj400YJwuA7kf')

    useEffect(() => {
        if(!isLoggedIn) {
            navigate('/login')
        }else {
            const fetchClientSecret = async () => {
                try {
                    const response = await axios.post('http://localhost:3001/payments/pay', 
                    { 
                        amount: total
                    })
                    setClientSecret(response.data.clientSecret)
                } catch (error) {
                    console.log(error)
                }
            }
            fetchClientSecret()
        }
    }, [isLoggedIn])

    return (
        <>
            {
                stripePromise && clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <CheckoutForm />
                    </Elements>
                )
            }
        </>
    )
}

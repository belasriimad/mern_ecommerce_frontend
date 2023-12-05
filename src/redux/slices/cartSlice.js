import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'


const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const item = action.payload
            let productItem = state.cartItems.find(product => product.id === item.id)
            if(productItem) {
                productItem.quantity += 1
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
                toast.success('Your product has been updated.', {
                    position: toast.POSITION.TOP_RIGHT
                })
            }else {
                state.cartItems = [item, ...state.cartItems]
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
                toast.success('Your product has been saved.', {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
        },
        incrementQ(state, action) {
            const item = action.payload
            let productItem = state.cartItems.find(product => product.id === item.id)
            if(productItem) {
                if(productItem.quantity === productItem.maxQty) {
                    toast.info(`You cannot order more than ${productItem.maxQty}`, {
                        position: toast.POSITION.TOP_RIGHT
                    })
                }else {
                    productItem.quantity += 1
                    localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
                }
            }
        },
        decrementQ(state, action) {
            const item = action.payload
            let productItem = state.cartItems.find(product => product.id === item.id)
            if(productItem) {
                productItem.quantity -= 1
                if(productItem.quantity === 0) {
                    state.cartItems = state.cartItems.filter(product => product.id !== item.id)
                    localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
                }
            }
        },
        removeFromCart(state, action) {
            const item = action.payload
            state.cartItems = state.cartItems.filter(product => product.id !== item.id)
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            toast.success('Your product has been removed from the cart', {
                position: toast.POSITION.TOP_RIGHT
            })
        },
        clearCartItems(state, action) {
            localStorage.removeItem('cartItems')
            state.cartItems = []
        }
    }
})

const cartReducer = cartSlice.reducer;

export const { addToCart, incrementQ, decrementQ, removeFromCart, clearCartItems } = cartSlice.actions;

export default cartReducer;
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/slices/cartSlice";
import userReducer from "../redux/slices/userSlice";



const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer
    }
})

export default store;
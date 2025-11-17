import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import sellerSlice from "./seller/sellerSlice";
import sellerProductSlice from "./seller/sellerProductSlice"
import productSlice from "./customer/ProductSlice"
import authSlice from "./AuthSllice"
import cartSlice from "./customer/cartSlice"
import orderSilce from "./customer/orderSlice"
import wishlistSlice from "./customer/wishlistSlice"
import sellerOrderSlice from "./seller/sellerOrderSlice"
import transactionSlice from "./seller/transactionSlice"
import adminSlice from "./admin/adminSlice"
import customerSlice from "./customer/customerSlice"

const rootReducer=combineReducers({
    seller: sellerSlice,
    sellerProduct:sellerProductSlice,
    product:productSlice,
    auth:authSlice,
    cart:cartSlice,
    order:orderSilce,
    wishlist:wishlistSlice,
    customer:customerSlice,
    

    //seller slice
    sellerOrder:sellerOrderSlice,
    transactions:transactionSlice,
    //admin
    admin:adminSlice,
});

const store=configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware()
})

export type AppDispatch=typeof store.dispatch;
export type RootState=ReturnType<typeof rootReducer>;

export const useAppDispatch=()=>useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState>=useSelector;

export default store 
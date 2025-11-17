import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, ThemeProvider } from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Navbar from './customer/components/Navbar/Navbar';
import customerTheme from './Theme/customerTheme';
import Home from './customer/pages/Home/Home';
import Product from './customer/pages/Product/Product';
import ProductDetails from './customer/pages/Page Details/ProductDetails';
import Review from './customer/pages/Review/Review';
import Cart from './customer/pages/Cart/Cart';
import Checkout from './customer/pages/Checkout/Checkout';
import Account from './customer/pages/Account/Account';
import { Route, Routes, useNavigate } from 'react-router-dom';
import BecomeSeller from './Become Seller/BecomeSeller';
import SellerDashboard from './seller/pages/SellerDashboard/SellerDashboard';
import AdminDashboard from './admin/Pages/Dashboard/Dashboard';
import { fetchProducts } from './State/fetchProduct';
import { useAppDispatch, useAppSelector } from './State/Store';
import { fetchSellerProfile } from './State/seller/sellerSlice';
import Auth from './customer/Auth/Auth';
import { fetchUserProfile } from './State/AuthSllice';
import PaymentSuccess from './customer/PaymentSuccess';
import Wishlist from './customer/Wishlist/Wishlist';
import { createHomeCategories } from './State/customer/customerSlice';
import { homeCategories } from './data/HomeCategories';



function App() {
  const dispatch= useAppDispatch();
  const {seller,auth} =useAppSelector(store=>store)
  const navigate=useNavigate()
  useEffect(()=>{
    dispatch(fetchSellerProfile(localStorage.getItem("jwt") || ""))
    dispatch(createHomeCategories(homeCategories))
  }, [])

  useEffect(()=>{
    if(seller.profile){
      navigate("/seller")
    }
  }, [seller.profile])

  useEffect(()=>{
    dispatch(fetchUserProfile({jwt: auth.jwt || localStorage.getItem("jwt")}))
  },[auth.jwt])
  // console.log("User profile ",auth)
  return (
    <ThemeProvider theme={customerTheme}>
        <div>
          {/* <h1 className='py-10 text-5xl'>name: {auth.user?.email}</h1> */}
          <Navbar/>
          
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Auth/>}/>
            <Route path="/products/:category" element={<Product/>}/>
            <Route path="/reviews/:productId" element={<Review/>}/>
            <Route path="/product-details/:categoryId/:name/:productId" element={<ProductDetails/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/wishlist" element={<Wishlist/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/payment-success/:orderId" element={<PaymentSuccess/>}/>
            <Route path="/become-seller" element={<BecomeSeller/>}/>
            <Route path="/account/*" element={<Account/>}/>
            <Route path="/seller/*" element={<SellerDashboard/>}/>
            <Route path="/admin/*" element={<AdminDashboard/>}/>
          </Routes>
        </div>
    </ThemeProvider>
  );
}

export default App;


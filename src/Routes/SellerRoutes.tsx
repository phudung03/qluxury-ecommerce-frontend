
import React from "react";
import { Route, Routes } from "react-router-dom";
import SellerDashboard from "../seller/pages/SellerDashboard/SellerDashboard";
import Product from "../seller/pages/Products/Product";
import Transaction from "../seller/pages/Payment/Transaction";
import Payment from "../seller/pages/Payment/Payment";
import Profile from "../seller/pages/Account/Profile";
import Orders from "../seller/pages/Orders/Orders";

import { Dashboard } from "@mui/icons-material";
import { AddProductForm } from "../seller/pages/Products/AddProduct";

const SellerRoutes = () =>{
    return(
        <div>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/products" element={<Product/>}/>
                <Route path="/add-product" element={<AddProductForm/>}/>
                <Route path="/orders" element={<Orders/>}/>
                <Route path="/account" element={<Profile/>}/>
                <Route path="/payment" element={<Payment/>}/>
                <Route path="/transaction" element={<Transaction/>}/>
            </Routes>
        </div>
    )
}

export default SellerRoutes
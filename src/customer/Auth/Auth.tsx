import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Button } from "@mui/material";

const Auth = ()=>{
    const[isLogin,setIsLogin]= useState(true);
    return(
        <div className="flex justify-center h-[90vh] items-center">
            <div className="max-w-md h-[108vh] rounded-md pt-8 shadow-lg">
                <img className="w-full rounded-t-md" src="https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/184494/Originals/anh-bia-nam-27.jpg" alt="" />
            
                <div className="mt-8 px-10">
                    {isLogin ? <LoginForm/> : <RegisterForm/>}
                <div className="flex items-center gap-1 justify-center mt-5">
                    <p>{isLogin && "Don't "} have Account</p>
                    <Button size="small" onClick={()=> setIsLogin(!isLogin)}>
                        {isLogin ? "Create Account" : "login"}
                    </Button>
                </div>
                </div>
            </div>
        </div>
    )
}
export default Auth 
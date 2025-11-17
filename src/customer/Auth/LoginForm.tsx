import React from "react";
import store, { useAppDispatch, useAppSelector } from "../../State/Store";
import { useFormik } from "formik";
import { Button, CircularProgress, TextField } from "@mui/material";
import { sendLoginSignupOtp, signin } from "../../State/AuthSllice";

const LoginForm = ()=>{

    const dispatch=useAppDispatch()
    const {auth} = useAppSelector(store=>store)
        const formik = useFormik({
            initialValues:{
                email:"",
                otp:""
            },
            onSubmit:(values)=>{
                console.log("form data",values)
                dispatch(signin(values))
            }
        })
    const handleSendOtp=()=>{
            dispatch(sendLoginSignupOtp({email:formik.values.email}))
        }
    return(
        <div>
            <h1 className="text-center font-bold text-xl text-[#00927c] pb-8">Login</h1>
            <div className="space-y-5">
            <TextField fullWidth name="email" label="Email" value={formik.values.email}
                onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}>
            </TextField> 
            {
                auth.otpSent && <div className="space-y-2">
                        <p className="font-medium text-sm opacity-60">Enter OTP sent to your email </p>
                        <TextField fullWidth name="otp" label="Otp" value={formik.values.otp}
                            onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.otp && Boolean(formik.errors.otp)}
                            helperText={formik.touched.otp && formik.errors.otp}>
                        </TextField> </div>
       
            }
            {auth.otpSent? <Button onClick={() => formik.handleSubmit()} fullWidth variant="contained" sx={{py:"11px"}}>
                Login
            </Button> : <Button onClick={handleSendOtp} fullWidth variant="contained" sx={{py:"11px"}}>
                {auth.loading?<CircularProgress/>:"Send otp"}
                
            </Button>}
            
        </div>
        </div>
    )
}
export default LoginForm 
import { Box, TextField } from "@mui/material";
import React from "react";

const BecomeSellerFormStep1=({formik} :any)=>{
    return(
        <Box>
            <p className="text-xl font0bold text-center pb-9">Contact Details</p>
            <div className="space-y-9">
                <TextField fullWidth name="mobile" label="Mobile" value={formik.values.mobile} onChange={formik.handleChange} error={formik.touched.mobile && formik.error.mobile} helperText={formik.touched.mobile && formik.error.mobile}>

                </TextField>
                <TextField fullWidth name="GSTIN" label="GSTIN" value={formik.values.GSTIN} onChange={formik.handleChange} error={formik.touched.GSTIN && formik.error.GSTIN} helperText={formik.touched.GSTIN && formik.error.GSTIN}>
                    
                </TextField>
            </div>
        </Box>
    )
}

export default BecomeSellerFormStep1
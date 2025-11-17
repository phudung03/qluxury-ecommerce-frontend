import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coupon, CouponState } from "../../types/couponTypes";
import { api } from "../../config/Api";

const API_URL="/api/coupons";

export const createCoupon = createAsyncThunk<
    Coupon,
    {coupon: any; jwt:string},
    {rejectValue:string}
>("coupon/createCoupon",async({coupon,jwt},{rejectWithValue})=>{
    try{
        const response = await api.post(`${API_URL}/admin/create`,coupon,{
            headers:{Authorization: `Bearer ${jwt}`},
        });
        console.log("created coupon ",response.data)
        return response.data;
    }catch(error:any){
        return rejectWithValue(error.response?.data || "Failed to create coupon");
    }
});

export const deleteCoupon = createAsyncThunk<
    string,
    {id: number; jwt:string},
    {rejectValue:string}
>("coupon/deleteCoupon",async({id,jwt},{rejectWithValue})=>{
    try{
        const response = await api.delete(`${API_URL}/admin/delete/${id}`,{
            headers:{Authorization: `Bearer ${jwt}`},
        });
        
        return response.data;
    }catch(error:any){
        return rejectWithValue(error.response?.data || "Failed to delete coupon");
    }
});

export const fetchAllCoupons = createAsyncThunk<
    Coupon[],
    string,
    {rejectValue:string}
>("coupon/fetchAllCoupons",async(jwt,{rejectWithValue})=>{
    try{
        const response = await api.get(`${API_URL}/admin/all`,{
            headers:{Authorization: `Bearer ${jwt}`},
        });
        
        return response.data;
    }catch(error:any){
        return rejectWithValue(error.response?.data || "Failed to delete coupon");
    }
});

const initialState:CouponState={
    coupons:[],
    cart: null,
    loading:false,
    error:null,
    couponCreated: false,
    couponApplied: false,
};

const couponSlice = createSlice({
    name: "coupon",
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
         builder
        .addCase(createCoupon.pending, (state)=>{
            state.loading=true;
            state.error=null;
            state.couponCreated=false;
        })
        .addCase(createCoupon.fulfilled, 
            (state, action:PayloadAction<Coupon>)=>{
            state.loading=false;
            state.error=null;
            // Thêm coupon mới vào mảng coupons
            state.coupons.push(action.payload);
            state.couponCreated=true;
        })
        
        .addCase(createCoupon.rejected, 
            (state,action:PayloadAction<string | undefined>)=>{
            state.loading=false;
            state.error=action.payload || "ailed tocreate coupon";
            state.couponCreated=false;
        })

        .addCase(deleteCoupon.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(deleteCoupon.fulfilled, 
            (state, action)=>{
            state.loading=false;
            state.coupons = state.coupons.filter(
                (coupon) => coupon.id !== parseInt(action.meta.arg.id.toString())
            );
        })
        .addCase(deleteCoupon.rejected, 
            (state,action:PayloadAction<string | undefined>)=>{
            state.loading=false;
            state.error=action.payload || "ailed tocreate coupon";
        })

        .addCase(fetchAllCoupons.pending, (state)=>{
            state.loading=true;
            state.error=null;
            state.couponCreated=false;
        })
        .addCase(fetchAllCoupons.fulfilled, 
            (state, action:PayloadAction<Coupon[]>)=>{
            state.loading=false;
            state.coupons = action.payload;
        })
        .addCase(fetchAllCoupons.rejected, 
            (state,action:PayloadAction<string | undefined>)=>{
            state.loading=false;
            state.error=action.payload || "ailed tocreate coupon";
        });
    },
});

export default couponSlice.reducer;
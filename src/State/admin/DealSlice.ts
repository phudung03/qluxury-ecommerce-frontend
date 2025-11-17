import { error } from "console";
import { ApiResponse, Deal, DealsState } from "../../types/dealTypes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

const initialState: DealsState={
    deals:[],
    loading:false,
    error: null,
    dealCreated: false,
    dealUpdated:false,
};

export const createDeal = createAsyncThunk(
    "deals/createDeal",
    async(deal:any, {rejectWithValue}) =>{
        try{
            const response = await api.post(`/admin/deals`,deal,{
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            });
            console.log("created deal ",response.data)
            return response.data;
        }catch(error: any){
            console.log("error ",error.response)
            
            return rejectWithValue(error.response?.data?.message || "Failed to create deal");
            
        }
    }
);

export const getAllDeals = createAsyncThunk(
    "deals/getAllDeals",
    async(_, {rejectWithValue}) =>{
        try{
            const response = await api.get(`/admin/deals`,{
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            });
            console.log("get all deal ",response.data)
            return response.data;
        }catch(error: any){
            console.log("error ",error.response)
            
            return rejectWithValue(error.response?.data?.message || "Failed to create deal");
            
        }
    }
);

export const deleteDeal = createAsyncThunk<ApiResponse, number>(
    "deals/deleteDeal",
    async(id:number, {rejectWithValue}) =>{
        try{
            const response = await api.delete(`/admin/deals/${id}`,{
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            });
            
            return response.data;
        }catch(error: any){
            console.log("error ",error.response)
            
            return rejectWithValue(error.response?.data?.message || "Failed to create deal");
            
        }
    }
);

interface UpdateDealPayload {
    id: number;
    deal: any;
}

export const updateDeal = createAsyncThunk<
    Deal,
    UpdateDealPayload, // Kiểu dữ liệu đầu vào (id và deal)
    { rejectValue: string } // Kiểu dữ liệu lỗi
>("deals/updateDeal", 
    async ({ id, deal }, { rejectWithValue }) => {
        try {
            // Sử dụng api.patch như trong hình ảnh
            const response = await api.patch(`/admin/deals/${id}`, deal, {
                headers: {
                    
                    "Content-type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            });
            console.log("updated deal ", response.data);
            return response.data;
        } catch (error: any) {
            console.log("error ", error.response);

            return rejectWithValue(
                error.response?.data?.message || "Failed to update deal"
            );
        }
    }
);

const dealSlice =createSlice({
    name: "deals",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(getAllDeals.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
    
        .addCase(getAllDeals.fulfilled, 
            (state, action)=>{
            state.loading=false;
            state.deals=action.payload ;

        })
        
        .addCase(getAllDeals.rejected, 
            (state,action)=>{
            state.loading=false;
            state.error=action.payload as string;
        })

        .addCase(createDeal.pending, (state)=>{
            state.loading=true;
            state.error=null;
            state.dealCreated=false;
        })
        .addCase(createDeal.fulfilled, 
            (state, action:PayloadAction<Deal>)=>{
            state.loading=false;
            state.deals.push(action.payload)
            state.dealCreated=true;
        })
        
        .addCase(createDeal.rejected, 
            (state,action)=>{
            state.loading=false;
            state.error=action.payload as string;
        })

        .addCase(deleteDeal.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })     
        .addCase(deleteDeal.fulfilled, 
            (state, action)=>{
            state.loading=false;
            // Lấy ID từ action meta (tham số đã gửi đi)
            const deletedId = action.meta.arg;
            // Lọc ra deal đã xóa khỏi mảng deals
            state.deals = state.deals.filter(
                (deal) => deal.id !== deletedId
            );
        })
        .addCase(deleteDeal.rejected, 
            (state, action)=>{
            state.loading=false;
            state.error=action.payload as string;
        })

        .addCase(updateDeal.pending, (state)=>{
            state.loading=true;
            state.error=null;
            state.dealUpdated=false;
        })
        .addCase(updateDeal.fulfilled, 
            (state, action:PayloadAction<Deal>)=>{
            state.loading=false;
            state.dealUpdated=true;
            const index = state.deals.findIndex((deal) => deal.id === action.payload.id);
            if(index !== -1){
                state.deals[index] = action.payload;
            }
        })
        
        .addCase(updateDeal.rejected, 
            (state,action)=>{
            state.loading=false;
            state.error=action.payload as string;
        })
    }
})

export default dealSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/userTypes";
import { Order } from "../../types/orderTypes";
import { Seller } from "../../types/SellerTypes";
import { api } from "../../config/Api";
import { error } from "console";
export interface Transaction{
    id:number;
    customer: User;
    order: Order;
    seller: Seller;
    date: string;
}
interface TransactionState{
    transactions: Transaction[];
    transaction: Transaction | null;
    loading: boolean;
    error:string | null;
}

const initialState: TransactionState = {
    transactions: [],
    transaction: null,
    loading: false,
    error: null,
};

export const fetchTransactionsBySeller = createAsyncThunk<
    Transaction[],
    string, {rejectValue:string}
    >('transactions/fetchTransactionsBySeller',async(jwt,{rejectWithValue})=>{
        try{
            const response = await api.get('/api/transactions/seller',{
                headers:{
                    Authorization: `Bearer ${jwt}`,
                },
            });
            
            console.log("fetchTransactionsBySeller ",response.data);
            return response.data;
        }catch(error:any){
            if(error.response){
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue('Failed to fetch transactions')
        }
    });

    export const fetchAllTransactions = createAsyncThunk<
    Transaction[],
    void, {rejectValue:string}
    >('transactions/fetchAllTransactions',async(_,{rejectWithValue})=>{
        try{
            const response = await api.get('/api/transactions');
               
            
            return response.data;
        }catch(error:any){
            if(error.response){
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue('Failed to fetch all transactions');
        }
    });

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchTransactionsBySeller.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchTransactionsBySeller.fulfilled, 
            (state, action)=>{
            state.transactions=action.payload;
            state.loading=false;
        })
        .addCase(fetchTransactionsBySeller.rejected, (state,action)=>{
            state.loading=false;
            state.error=action.payload as string;
        })

        .addCase(fetchAllTransactions.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchAllTransactions.fulfilled, 
            (state, action)=>{
            state.transactions=action.payload;
            state.loading=false;
        })
        .addCase(fetchAllTransactions.rejected, (state,action)=>{
            state.loading=false;
            state.error=action.payload as string;
        })
    }
})

export default transactionSlice.reducer;
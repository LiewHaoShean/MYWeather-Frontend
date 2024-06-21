import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetErrAction, resetSuccessAction } from "../globalAction/globalActions";

const initialState = {
    loading: false,
    error: null,
    isCompleted: false,
    payment: null,
    payments: [],
    isFetched: false,
    isApproved: false
}

export const makePaymentAction = createAsyncThunk(
    "payment/makePayment",
    async({cardNumber, cardHolderName, amount, type}, {rejectWithValue, getState, dispatch})=>{
        try{
            const token = getState()?.users?.userAuth.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const {data} = await axios.post(`${baseURL.serverURL}/payment/makePayment`, {
                cardNumber, cardHolderName, amount, type
            }, config);
            return data
        }catch(error){
            return rejectWithValue(error?.response?.data);
        }
    }
)

export const getAllTransactionAction = createAsyncThunk(
    "payment/getAllTransaction",
    async(payload, {rejectWithValue, getState, dispatch})=>{
        try{
            const token = getState()?.users?.userAuth.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const {data} = await axios.get(`${baseURL.serverURL}/payment/getAllTransaction`,
                config
            );
            return data;
        }catch (error){
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const transactionApprovalAction = createAsyncThunk(
    "payment/approvePayment",
    async({paymentId}, {rejectWithValue, getState, dispatch})=>{
        console.log(paymentId)
        try{
            const token = getState()?.users?.userAuth.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const {data} = await axios.post(`${baseURL.serverURL}/payment/approvePayment`,
                {paymentId},
                config
            );
            return data;
        }catch(error){
            return rejectWithValue(error?.response?.data);
        }
    }
)

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    extraReducers: (builder)=>{
        //makepayment
        builder.addCase(makePaymentAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(makePaymentAction.fulfilled, (state, action) => {
            state.payment = action.payload;
            state.loading = false;
            state.isCompleted = true
        });
        builder.addCase(makePaymentAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.payment = null
        });
        //reset error action
        builder.addCase(resetErrAction.pending, (state)=>{
            state.error = null;
        });
        //reset success action
        builder.addCase(resetSuccessAction.pending,(state)=>{
            state.isFetched = false;
            state.isApproved = false;
            state.isCompleted = false;
        });
        //getAllPayment
        builder.addCase(getAllTransactionAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(getAllTransactionAction.fulfilled, (state, action) => {
            state.payments = action.payload;
            state.loading = false;
            state.isCompleted = true;
            state.isFetched = true;
        });
        builder.addCase(getAllTransactionAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.payments = null;
            state.isFetched = false;
        });
        //PaymentApprove
        builder.addCase(transactionApprovalAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(transactionApprovalAction.fulfilled, (state, action) => {
            state.payment = action.payload;
            state.loading = false;
            state.isCompleted = true;
            state.isApproved = true;
        });
        builder.addCase(transactionApprovalAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.payment = null;
            state.isApproved = false;
        });
    }
})

const paymentReducer = paymentSlice.reducer;

export default paymentReducer;
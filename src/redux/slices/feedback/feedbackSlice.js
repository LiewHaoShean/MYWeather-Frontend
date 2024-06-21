import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetErrAction, resetSuccessAction } from "../globalAction/globalActions";

const initialState = {
    loading: false,
    error: null,
    isCompleted: false,
    feedback: null,
    feedbacks: [],
    isFeedbackFetch: false
}

export const giveFeedbackAction = createAsyncThunk(
    "feedback/giveFeedback",
    async({rating, description}, {rejectWithValue, getState, dispatch})=>{
        try{
            //get token
            const token = getState()?.users?.userAuth.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            //make request
            const {data} = await axios.post(`${baseURL.serverURL}/feedback/giveFeedback`, {
                rating, description
            }, config);
            return data
        }catch (error){
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const fetchAllFeedbackAction = createAsyncThunk(
    "feedback/getAllFeedback",
    async(payload, {rejectWithValue, getState, dispatch})=>{
        try{
            const token = getState()?.users?.userAuth.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const {data} = await axios.get(`${baseURL.serverURL}/feedback/getAllFeedback`,
                config
            );
            return data
        }catch(error){
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const fetchOneFeedbackAction = createAsyncThunk(
    "feedback/getOneFeedback",
    async(feedbackId, {rejectWithValue, getState, dispatch})=>{
        const token = getState().users.userAuth.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try{
            console.log(feedbackId);
            const {data} = await axios.get(`${baseURL.serverURL}/feedback/getOneFeedback/${feedbackId}`,
                config
            );
            return data
        } catch(error){
            return rejectWithValue(error?.response.data);
        }
    }
)

const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    extraReducers: (builder)=>{
        //giveFeedback
        builder.addCase(giveFeedbackAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(giveFeedbackAction.fulfilled, (state, action) => {
            state.feedback = action.payload;
            state.loading = false;
            state.isCompleted = true
        });
        builder.addCase(giveFeedbackAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
        //reset error action
        builder.addCase(resetErrAction.pending, (state)=>{
            state.error = null;
        });
        //reset success action
        builder.addCase(resetSuccessAction.pending,(state)=>{
            state.isCompleted = false;
        })
        //getAllFeedback
        builder.addCase(fetchAllFeedbackAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(fetchAllFeedbackAction.fulfilled, (state, action) => {
            state.feedbacks = action.payload;
            state.loading = false;
            state.isFeedbackFetch = true;
        });
        builder.addCase(fetchAllFeedbackAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.feedbacks = null;
            state.isFeedbackFetch = false;
        });
        //getOneFeedbacl
        builder.addCase(fetchOneFeedbackAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(fetchOneFeedbackAction.fulfilled, (state, action) => {
            state.feedback = action.payload;
            state.loading = false;
            state.error = null;
            state.isFeedbackFetch = true;
        });
        builder.addCase(fetchOneFeedbackAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.feedback = null;
            state.isFeedbackFetch = false;
        });
    }
});

const feedbackReducer = feedbackSlice.reducer;

export default feedbackReducer;
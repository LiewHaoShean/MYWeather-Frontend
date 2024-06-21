import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetErrAction, resetSuccessAction } from "../globalAction/globalActions";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";


const initialState = {
    likeLoading: false,
    likeError: null,
    isLiked: false,
    like: null,
    isFetched: false,
    likes: [],
    isDisliked: false,
}

export const likePostAction = createAsyncThunk(
    "post/likePost",
    async(postId, {rejectWithValue, getState, dispatch})=>{
        try{
            const token = getState().users.userAuth.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const {data} = await axios.get(`${baseURL.serverURL}/like/likePost/${postId}`,
                config
            );
            return data
        } catch (error) {
            return rejectWithValue(error?.response.data);
        }
    }
)

export const fetchLikePostAction = createAsyncThunk(
    "post/fetchLikePost",
    async(payload, {rejectWithValue, getState,dispatch})=>{
        try{
            const token = getState().users.userAuth.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const {data} = await axios.get(`${baseURL.serverURL}/like/fetchLikePost`,
                config
            )
            return data
        }catch(error){
            return rejectWithValue(error?.response.data);
        }
    }
);

export const dislikePostAction = createAsyncThunk(
    "post/dislikePost",
    async(postId, {rejectWithValue, getState, dispatch})=>{
        try{
            const token = getState().users.userAuth.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const {data} = await axios.delete(`${baseURL.serverURL}/like/dislikePost/${postId}`,
                config
            );
            return data
        } catch (error) {
            return rejectWithValue(error?.response.data);
        }
    }
)

const likeSlice = createSlice({
    name: "like",
    initialState,
    extraReducers: (builder)=>{
        ///likePost
        builder.addCase(likePostAction.pending, (state)=>{
            state.likeLoading = true;
        });
        builder.addCase(likePostAction.fulfilled, (state, action)=>{
            state.likeLoading = false;
            state.like = action.payload;
            state.likeError = null;
            state.isLiked = true;
        });
        builder.addCase(likePostAction.rejected, (state, action)=>{
            state.likeLoading = false;
            state.like = null;
            state.likeError = action.payload;
            state.isLiked = false;
        });
        // reset success
        builder.addCase(resetSuccessAction.pending, (state, action)=>{
            state.isLiked = false;
            state.isDisliked = false;
        });
        //reset error action
        builder.addCase(resetErrAction.pending, (state)=>{
            state.likeError = null;
        });
        ///fetchLikePost
        builder.addCase(fetchLikePostAction.pending, (state)=>{
            state.likeLoading = true;
        });
        builder.addCase(fetchLikePostAction.fulfilled, (state, action)=>{
            state.likeLoading = false;
            state.likes = action.payload;
            state.likeError = null;
            state.isFetched = true
        });
        builder.addCase(fetchLikePostAction.rejected, (state, action)=>{
            state.likeLoading = false;
            state.likes = null;
            state.likeError = action.payload;
            state.isFetched = false
        });
        ///dislikePost
        builder.addCase(dislikePostAction.pending, (state)=>{
            state.likeLoading = true;
        });
        builder.addCase(dislikePostAction.fulfilled, (state, action)=>{
            state.likeLoading = false;
            state.like = action.payload;
            state.likeError = null;
            state.isDisliked = true;
        });
        builder.addCase(dislikePostAction.rejected, (state, action)=>{
            state.likeLoading = false;
            state.like = null;
            state.likeError = action.payload;
            state.isDisliked = false;
        });
    }
});

const likeReducer = likeSlice.reducer;

export default likeReducer;
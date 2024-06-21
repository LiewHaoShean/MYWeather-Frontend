import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetErrAction, resetSuccessAction } from "../globalAction/globalActions";

const initialState = {
    commentLoading: false,
    commentError: null,
    isCommentAdded: false,
    isCommentFetched: false,
    comment: null,
    comments: [],
}

export const createCommentAction = createAsyncThunk(
    "comment/createComment",
    async({newComment, postId}, {rejectWithValue, getState, dispatch})=>{
        try{
            const token = getState().users.userAuth.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const {data} = await axios.post(`${baseURL.serverURL}/comment/createComment`,
                {newComment, postId},
                config
            );
            return data
        }catch(error){
            return rejectWithValue(error?.response.data);
        }
    }
);

export const fetchCommentAction = createAsyncThunk(
    "comment/fetchComment",
    async(postId, {rejectWithValue, getState, dispatch})=>{
        try{
            const token = getState().users.userAuth.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const {data} = await axios.post(`${baseURL.serverURL}/comment/getComment`,
                postId,
                config
            );
            return data
        }catch(error){
            return rejectWithValue(error?.response.data);
        }
    }
)

const commentSlice = createSlice({
    name: "comment",
    initialState,
    extraReducers: (builder)=> {
        //postComment
        builder.addCase(createCommentAction.pending, (state)=>{
            state.commentLoading = true;
        });
        builder.addCase(createCommentAction.fulfilled, (state, action)=>{
            state.commentLoading = false;
            state.comment = action.payload;
            state.commentError = null;
            state.isCommentAdded = true;
        });
        builder.addCase(createCommentAction.rejected, (state, action)=>{
            state.commentLoading = false;
            state.comment = null;
            state.commentError = action.payload;
            state.isCommentAdded = false;
        });
        // reset success
        builder.addCase(resetSuccessAction.pending, (state, action)=>{
            state.isCommentFetched = false;
            state.isCommentAdded = false;
        });
        //reset error action
        builder.addCase(resetErrAction.pending, (state)=>{
            state.isCommentFetched = null;
        });
        //getComment
        builder.addCase(fetchCommentAction.pending, (state)=>{
            state.commentLoading = true;
        });
        builder.addCase(fetchCommentAction.fulfilled, (state, action)=>{
            state.commentLoading = false;
            state.comments = action.payload;
            state.commentError = null;
            state.isCommentFetched = true;
        });
        builder.addCase(fetchCommentAction.rejected, (state, action)=>{
            state.commentLoading = false;
            state.comments = null;
            state.commentError = action.payload;
            state.isCommentFetched = false;
        });
    }
})

const commentReducer = commentSlice.reducer;

export default commentReducer;
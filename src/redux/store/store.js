import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/users/userSlice";
import weatherReducer from "../slices/weather/weatherSlice";
import feedbackReducer from "../slices/feedback/feedbackSlice";
import postReducer from "../slices/post/postSlice";
import likeReducer from "../slices/like/likeSlice";
import commentReducer from "../slices/comment/commentSlice";
import tagReducer from "../slices/tag/tagSlice";
import paymentReducer from "../slices/payment/paymentSlice";

const store = configureStore({
    reducer: {
        users: userReducer,
        weather: weatherReducer,
        feedback: feedbackReducer,
        post: postReducer,
        like: likeReducer,
        comment: commentReducer,
        tag: tagReducer,
        payment: paymentReducer
    },
});

export default store
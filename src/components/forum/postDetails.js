import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOnePostAction } from "../../redux/slices/post/postSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaHeart, FaRegCommentAlt, FaRegHeart } from "react-icons/fa";
import { likePostAction } from "../../redux/slices/like/likeSlice";
import "../../typingAnimation.css";
import { IoIosSend } from "react-icons/io";
import { BiMailSend } from "react-icons/bi";
import { createCommentAction, fetchCommentAction } from "../../redux/slices/comment/commentSlice";
import SuccessMsg from "../global/successMsg";
import ErrorMsg from "../global/erroMsg";

export default function PostDetails({ postId }) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (postId) {
            dispatch(fetchOnePostAction(postId));
        }
    }, [dispatch, postId]);

    const { loading, error, post, isFound } = useSelector((state) => state?.post);

    const {likeLoading, likeError, like, isLiked} = useSelector((state)=>state?.like);

    const postFound = post?.postFound;

    const [expanded, setExpanded] = useState(false);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [newComment, setNewComment] = useState("");

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleCommentClick = () => {
        setShowCommentInput(true);
        dispatch(fetchCommentAction({postId}));
    };

    const {comment, comments, isCommentFetched, commentLoading, isCommentAdded} = useSelector((state)=>state?.comment);
    console.log(comments?.comment);

    const handleCommentSubmit = () => {
        dispatch(createCommentAction({newComment, postId}));
        setNewComment("");
    };

    useEffect(() => {
        if (comment?.status === "success") {
            dispatch(fetchCommentAction({postId}));
            dispatch(fetchOnePostAction(postId))
        }
      }, [isCommentAdded]);

    if (!isFound || !postFound) {
        return null;
    }
    const handleOnClick = (postId) => {
        dispatch(likePostAction(postId));
    }

    const isPostLiked = (postId) => post?.userLikes.includes(postId);

    //timezoneconverter
    function convertUTCtoMalaysiaTime(utcDateString) {
        const date = new Date(utcDateString);
        const options = {
            timeZone: 'Asia/Kuala_Lumpur',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        return date.toLocaleString('en-GB', options);
    }

    return (
        <>
            {error && <ErrorMsg message={error?.message}/>}
            {isCommentAdded && <SuccessMsg message={comment?.message}/>}
            <div className='max-h-[95vh] w-fit bg-white rounded-lg shadow-md-2 my-4 shadow-black flex flex-col pt-4 overflow-auto scrollable-content-y'>
                <div className='h-fit w-full bg-white rounded-lg shadow-md-2 my-4 shadow-black flex flex-col pt-4'>
                    <div className='h-fit w-full flex flex-row justify-start'>
                        <div className='flex flex-row flex-wrap justify-between m-4 ml-8 w-fit'>
                            <img src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' className='h-20 w-20 rounded-full' alt='User Avatar' />
                            <div className='pt-2 px-3 flex flex-col items-center'>
                                <h1 className='text-xl'>{postFound?.user.fullname}</h1>
                                <p className='text-xs mx-auto text-slate-400 text-center'>{convertUTCtoMalaysiaTime(postFound?.updatedAt).split(",")}</p>
                                <div className={`${postFound?.tag?.color} w-fit rounded-xl px-2 mb-2`}>
                                    <h1>{postFound?.tag?.name}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='h-3/6 w-full px-8'>
                        <h1 className='text-2xl py-2'>{postFound?.title}</h1>
                        <div className='grid grid-cols-4 gap-2 h-fit'>
                            {postFound?.images.slice(0, expanded ? postFound?.images.length : 2).map((image, index) => (
                                <img key={index} src={image} className='object-cover h-64' style={{ aspectRatio: '1 / 1' }} alt={`Post Image ${index + 1}`} />
                            ))}
                        </div>
                        {postFound?.images.length > 2 && (
                            <button onClick={handleExpandClick} className='text-blue-500 mt-2'>
                                {expanded ? 'Show Less' : 'Show More'}
                            </button>
                        )}
                        <p className='text-md mt-4'>{postFound?.description}</p>
                    </div>
                    <div className='h-1/6 w-full flex flex-row justify-end px-8'>
                        <div className='flex flex-row w-32 h-20 flex-wrap content-center justify-around'>
                            <div className='w-14 h-fit flex flex-row flex-wrap '>
                                <FaRegCommentAlt className='mt-1 text-xl mx-1' onClick={handleCommentClick} />
                                <p className='text-md'>{postFound?.comments.length}</p>
                            </div>
                            <div className='h-fit w-14 flex flex-row flex-wrap'>
                                {isPostLiked(postFound._id) ? (
                                    <FaHeart className={`mt-1 text-xl mx-1 text-red-600`} onClick={() => handleOnClick(postFound._id)} />
                                ) : (
                                    <FaRegHeart className={`mt-1 text-xl mx-1 hover:text-red-600`} onClick={() => handleOnClick(postFound._id)} />
                                )}
                                <p className='text-md'>{postFound?.likes.length}</p>
                            </div>
                        </div>
                    </div>
                    {showCommentInput && (
                        <>
                            <div className='px-8 border-t border-gray-300'>
                                {isCommentFetched && comments?.comment.length > 0 ? 
                                (comments?.comment.map((comment, index) => (
                                    <div key={index} className='border-t py-4'>
                                        <div className='flex flex-row flex-wrap justify-between content-start ml-8 w-fit'>
                                            <img src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' className='h-12 w-12 rounded-full' alt='User Avatar' />
                                            <div className='px-3'>
                                                <h1 className='text-lg'>{comment?.user.fullname}</h1>
                                                <p className='text-xs mx-auto text-slate-400 text-center'>{convertUTCtoMalaysiaTime(comment?.updatedAt).split(",")}</p>
                                            </div>
                                        </div>
                                        <p className="ml-8 py-2 text-xl">{comment?.content}</p>
                                    </div>
                                ))) : (
                                    <div className="py-4">
                                        <p className="text-slate-400">No comments yet.Add one?</p>
                                    </div>
                                )}
                            </div>
                            <div className='px-8 py-4 border-t border-gray-300'>
                                <input
                                    type='text'
                                    placeholder='Add a comment...'
                                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <button
                                    className='mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none'
                                    onClick={handleCommentSubmit}
                                >
                                    {commentLoading ? <BiMailSend className="text-2xl mx-4"/> : <IoIosSend className="text-2xl mx-4" />}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
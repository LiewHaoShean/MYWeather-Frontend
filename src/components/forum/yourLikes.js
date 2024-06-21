import React, { useEffect, useState } from 'react';
import { FaRegClock } from "react-icons/fa6";
import { FaFire, FaHeart } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPostAction, fetchOwnPostAction } from '../../redux/slices/post/postSlice';
import { Link } from "react-router-dom";
import PostDetails from './postDetails';
import Modal from './model';
import SuccessMsg from '../global/successMsg';
import { dislikePostAction, fetchLikePostAction, likePostAction } from '../../redux/slices/like/likeSlice';
import ErrorMsg from '../global/erroMsg';
import SuccessNotification from '../global/successNotification';


export default function YourLikes(){
    const dispatch = useDispatch();

    const {loading, error, posts, isFound} = useSelector((state)=>state?.post);

    const {likeLoading, likeError, likes, isLiked, isFetched, like, isDisliked} = useSelector((state)=>state?.like);

    useEffect(()=>{
        dispatch(fetchLikePostAction())
    },[dispatch, isLiked, isDisliked])

    useEffect(()=>{
        dispatch(fetchAllPostAction())
    }, [dispatch, isLiked, isDisliked])

    console.log(likes);

    const user = posts?.userFound;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);

    const handleMoreClick = (postId) => {
        setSelectedPostId(postId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPostId(null);
        dispatch(fetchAllPostAction());
    };

    const handleOnClick = (postId) => {
        dispatch(likePostAction(postId));
    }
    const handleLikeClick = (postId) => {
        dispatch(likePostAction(postId));
    };

    const handleDislikeClick = (postId) => {
        dispatch(dislikePostAction(postId));
    }     

    // useEffect(() => {
    //     if (isLiked) {
    //         window.location.reload();
    //     }
    // }, [isLiked]);

    const isPostLiked = (postId) => posts?.userLikes?.includes(postId);
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
    };

    return (
        <>
            {isDisliked && <SuccessNotification message={like?.message} time={5000}/>}
            {error && <ErrorMsg message={error?.message}/>}
            {isLiked && <SuccessMsg message={like?.message}/>}
            {isFetched && likeError && <ErrorMsg message={likeError?.message}/>}
            <div className="m-4 h-[75%] w-full overflow-hidden">
                <div className='h-full w-full flex flex-col justify-normal content-center overflow-y-auto scrollable-content-y'>
                {likes?.likePostFound?.map((like, index)=>
                        (
                            <div className='h-fit w-[90%] bg-white shadow-sm my-4 shadow-black flex flex-col'>
                                <div className='h-fit w-full flex flex-row justify-between '>
                                    <div className='flex flex-row flex-wrap justify-between m-4 ml-8 w-fit'>
                                        <img src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' className='h-20 w-20 rounded-full' />
                                        <div className='pt-2 px-3 '>
                                            <h1 className='text-xl'>{like?.user?.fullname}</h1>
                                            <p className='text-xs my-auto mx-auto text-slate-400 text-center'>{convertUTCtoMalaysiaTime(like?.post?.updatedAt).split(",")}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <BsThreeDotsVertical className='text-4xl m-6' />
                                    </div>
                                </div>
                                <div className='h-fit w-full px-8'>
                                    <h1 className='text-3xl py-2'>{like?.post?.title}</h1>
                                    <p className='text-lg'>{like?.post?.description.slice(0, 200)}... <span onClick={() => handleMoreClick(like?.post._id)} className='text-sm text-blue-900 font-bold hover:text-lg cursor-pointer'>more</span></p>
                                </div>
                                <div className='h-fit w-full flex flex-row justify-end px-8'>
                                    <div className='flex flex-row w-32 justify-around py-10'>
                                        <div className='w-14 h-full flex flex-row flex-wrap '>
                                            <FaRegCommentAlt className='mt-1 text-xl mx-1 hover:text-blue-500' onClick={() => handleMoreClick(like?.post?._id)}/>
                                            <p className='text-md'>{like?.post?.comments.length}</p>
                                        </div>
                                        <div className='h-full w-14 flex flex-row flex-wrap'>
                                            {isPostLiked(like?.post?._id) ? <FaHeart className={`mt-1 text-xl mx-1 text-red-600`} onClick={() => handleDislikeClick(like?.post?._id)} /> : <FaRegHeart className={`mt-1 text-xl mx-1 hover:text-red-600`} onClick={() => handleLikeClick(like?.post?._id)} />}
                                            <p className='text-md'>{like?.post?.likes.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    ))}
                </div>
                <Modal isOpen={isModalOpen} onClose={handleCloseModal} width="w-8/12" top="top-6">
                    {selectedPostId && <PostDetails postId={selectedPostId} />}
                </Modal>
            </div>
        </>
    )
}
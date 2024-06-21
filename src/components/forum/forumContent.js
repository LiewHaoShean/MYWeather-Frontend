import { Tab } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { FaRegClock, FaFire, FaRegCommentAlt, FaRegHeart } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPostAction} from '../../redux/slices/post/postSlice';
import { Link, useParams } from "react-router-dom";
import Modal from './model';
import PostDetails from './postDetails';
import SuccessMsg from '../global/successMsg';
import ErrorMsg from '../global/erroMsg';
import { dislikePostAction, likePostAction } from '../../redux/slices/like/likeSlice';
import { FaHeart } from "react-icons/fa";
import SuccessNotification from '../global/successNotification';


export default function ForumContent() {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);

    const { loading, error, posts, isFound, userLikes } = useSelector((state) => state?.post);

    const {likeLoading, likeError, like, isLiked, isDisliked} = useSelector((state)=>state?.like);

    useEffect(() => {
        dispatch(fetchAllPostAction());
    }, [dispatch, isDisliked, isLiked]);

    const handleMoreClick = (postId) => {
        setSelectedPostId(postId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPostId(null);
        dispatch(fetchAllPostAction())
    };

    const handleLikeClick = (postId) => {
        dispatch(likePostAction(postId));
    };

    const handleDislikeClick = (postId) => {
        dispatch(dislikePostAction(postId));
    }    

    const isPostLiked = (postId) => posts?.userLikes.includes(postId);
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
            {isDisliked && <SuccessNotification message={like?.message} time={5000}/>}
            {error && <ErrorMsg message={error?.message}/>}
            {isLiked && <SuccessMsg message={like?.message}/>}
            {likeError && <ErrorMsg message={likeError?.message}/>}
            <div className='px-6 h-full'>
                <Tab.Group>
                    <Tab.List className="flex flex-row px-4">
                        <Tab as={React.Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'bg-blue-500 text-white' : 'bg-slate-200 text-black'
                                    } px-4 py-2 m-4 rounded-3xl flex flex-row outline-none`}
                                >
                                    <FaRegClock className='mt-1 mx-1' />
                                    New
                                </button>
                            )}
                        </Tab>
                        <Tab as={React.Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'bg-blue-500 text-white' : 'bg-slate-200 text-black'
                                    } px-4 py-2 m-4 rounded-3xl flex flex-row outline-none`}
                                >
                                    <FaFire className='mt-1 mx-1' />
                                    Hot
                                </button>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels className="h-full">
                        <Tab.Panel className="h-[75%] w-full overflow-hidden">
                            <div className='h-full w-full grid grid-cols-2 gap-2 overflow-y-auto scrollable-content-y'>
                                {isFound && posts?.postFound?.map((post) => (
                                    <div key={post._id} className='h-fit w-[95%] bg-white shadow-sm my-4 shadow-black flex flex-col mx-2'>
                                        <div className='h-fit w-full flex flex-row justify-between '>
                                            <div className='flex flex-row flex-wrap justify-between m-4 ml-8 w-fit'>
                                                <img src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' className='h-20 w-20 rounded-full' alt='User Avatar' />
                                                <div className='pt-2 px-3 flex flex-col items-center'>
                                                    <h1 className='text-xl'>{post?.user?.fullname}</h1>
                                                    <p className='text-xs my-auto mx-auto text-slate-400 text-center'>{convertUTCtoMalaysiaTime(post?.updatedAt).split(",")}</p>
                                                    <div className={`${post?.tag?.color} w-fit rounded-xl px-2 mb-2`}>
                                                        <h1>{post?.tag?.name}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <BsThreeDotsVertical className='text-4xl my-6 mx-2' />
                                            </div>
                                        </div>
                                        <div className='h-fit w-full px-8'>
                                            <h1 className='text-3xl py-2'>{post.title}</h1>
                                            <p className='text-lg'>{post.description.slice(0, 200)}... <span onClick={() => handleMoreClick(post._id)} className='text-sm text-blue-900 font-bold hover:text-lg cursor-pointer'>more</span></p>
                                        </div>
                                        <div className='h-fit w-full flex flex-row justify-end px-8'>
                                            <div className='flex flex-row w-32 justify-around py-10'>
                                                <div className='w-14 h-full flex flex-row flex-wrap '>
                                                    <FaRegCommentAlt className='mt-1 text-xl mx-1 hover:text-blue-500' onClick={() => handleMoreClick(post._id)}/>
                                                    <p className='text-md'>{post.comments.length}</p>
                                                </div>
                                                <div className='h-full w-14 flex flex-row flex-wrap'>
                                                {isPostLiked(post._id) ? <FaHeart className={`mt-1 text-xl mx-1 text-red-600`} onClick={() => handleDislikeClick(post._id)} /> : <FaRegHeart className={`mt-1 text-xl mx-1 hover:text-red-600`} onClick={() => handleLikeClick(post._id)} />}
                                                    <p className='text-md'>{post?.likes.length}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Tab.Panel>
                        <Tab.Panel className="h-[75%] w-full overflow-hidden">
                        <div className='h-full w-full grid grid-cols-2 gap-2 overflow-y-auto scrollable-content-y'>
                            {isFound && posts?.postFound?.filter(post => post.likes.length >= 5).map((post) => (
                                <div key={post._id} className='h-fit w-[95%] bg-white shadow-sm my-4 shadow-black flex flex-col mx-2'>
                                    <div className='h-fit w-full flex flex-row justify-between '>
                                        <div className='flex flex-row flex-wrap justify-between m-4 ml-8 w-fit'>
                                            <img src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' className='h-20 w-20 rounded-full' alt='User Avatar' />
                                            <div className='pt-2 px-3 '>
                                                <h1 className='text-xl'>{post?.user?.fullname}</h1>
                                                <p className='text-xs my-auto mx-auto text-slate-400 text-center'>{convertUTCtoMalaysiaTime(post?.updatedAt)}</p>
                                                <div>
                                                    <h1>{post?.tag?.name}</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <BsThreeDotsVertical className='text-4xl my-6 mx-2' />
                                        </div>
                                    </div>
                                    <div className='h-fit w-full px-8'>
                                        <h1 className='text-3xl py-2'>{post.title}</h1>
                                        <p className='text-lg'>{post.description.slice(0, 200)}... <span onClick={() => handleMoreClick(post._id)} className='text-sm text-blue-900 font-bold hover:text-lg cursor-pointer'>more</span></p>
                                    </div>
                                    <div className='h-fit w-full flex flex-row justify-end px-8'>
                                        <div className='flex flex-row w-32 justify-around py-10'>
                                            <div className='w-14 h-full flex flex-row flex-wrap '>
                                                <FaRegCommentAlt className='mt-1 text-xl mx-1 hover:text-blue-500' onClick={() => handleMoreClick(post._id)}/>
                                                <p className='text-md'>{post.comments.length}</p>
                                            </div>
                                            <div className='h-full w-14 flex flex-row flex-wrap'>
                                                {isPostLiked(post._id) ? <FaHeart className={`mt-1 text-xl mx-1 text-red-600`} onClick={() => handleDislikeClick(post._id)} /> : <FaRegHeart className={`mt-1 text-xl mx-1 hover:text-red-600`} onClick={() => handleLikeClick(post._id)} />}
                                                <p className='text-md'>{post?.likes.length}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>

                <Modal isOpen={isModalOpen} onClose={handleCloseModal} width='w-8/12' top="top-6">
                    {selectedPostId && <PostDetails postId={selectedPostId} />}
                </Modal>
            </div>
        </>
    )
};
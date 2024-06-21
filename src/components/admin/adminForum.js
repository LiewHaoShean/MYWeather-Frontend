import React, { useEffect, useState } from "react";
import { FaHeart, FaTags, FaFilter, FaRegCommentAlt, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPostAction, fetchMostLikePostAction } from "../../redux/slices/post/postSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "../forum/model";
import PostDetails from "../forum/postDetails";
import  "../../typingAnimation.css";
import AddTag from "./addTag";
import ErrorMsg from "../global/erroMsg";
import { getAllTagAction } from "../../redux/slices/tag/tagSlice";


export default function AdminForum(){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchMostLikePostAction())
    },[dispatch]);

    useEffect(()=>{
        dispatch(fetchAllPostAction())
    },[dispatch]);

    useEffect(()=>{
        dispatch((getAllTagAction()))
    },[dispatch]);

    const {loading, mostLikePost, isFound, error, posts} = useSelector((state)=>state?.post);

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

    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);

    const handleMoreClick = (postId) => {
        setSelectedPostId(postId);
        setIsPostModalOpen(true);
    };

    const handleClosePostModal = () => {
        setIsPostModalOpen(false);
        setSelectedPostId(null);
        dispatch(fetchMostLikePostAction());
    };

    const [isTagModalOpen, setIsTagModalOpen] = useState(false);

    const handleTagClick = () => {
        setIsTagModalOpen(true);
    };

    const handleCloseTagModal = () => {
        setIsTagModalOpen(false);

    };

    const {tags} = useSelector((state)=>state?.tag);
    
    const totalPosts = posts?.postFound?.length
    return (
        <>
            {error && <ErrorMsg message={error?.message}/>}
            <div className="h-screen bg-gray-100 flex flex-col pl-6 p-4">
                <h1 className="text-5xl  font-bold p-2 h-[9%]">Welcome Back, Admin!</h1>
                <div className="flex bg-gray-200 flex-col h-[91%] p-4 px-6">
                    <div className="grid grid-cols-4 h-3/6 col-start-1 col-end-2 gap-4 py-4">
                        <div className="bg-white p-4 rounded shadow-md hover:shadow-xl">
                            <h2 className="text-2xl font-semibold">Total Posts</h2>
                            <p className="text-4xl font-bold">{totalPosts}</p>
                            <div className="mt-2">
                            {tags?.tagFound?.map((tag) => {
                                // Calculate the percentage of posts for each tag
                                const percentage = totalPosts > 0 ? (tag?.posts?.length / totalPosts) * 100 : 0;

                                return (
                                    <React.Fragment key={tag.name}>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm">{tag.name}</span>
                                            <span className="text-sm">{percentage.toFixed(2)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 h-1 mb-2">
                                            <div className={`${tag.color} h-1`} style={{ width: `${percentage}%` }}></div>
                                        </div>
                                    </React.Fragment>
                                );
                            })}
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded shadow-md hover:shadow-xl col-start-2 col-end-5">
                            <h2 className="text-xl font-semibold ml-10">Most Likes in this week</h2>
                            <div className='h-fit w-[90%] bg-white shadow-sm my-4 shadow-black flex flex-col ml-10'>
                                <div className='h-fit w-full flex flex-row justify-between '>
                                    <div className='flex flex-row flex-wrap justify-between mt-2 ml-8 w-fit'>
                                        <img src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' className='h-12 w-12 rounded-full' />
                                        <div className='pt-1 px-3 '>
                                            <h1 className='text-md'>{mostLikePost?.postFound?.user?.fullname}</h1>
                                            <p className='text-xs my-auto mx-auto text-slate-400 text-center'>{convertUTCtoMalaysiaTime(mostLikePost?.postFound?.updatedAt).split(",")}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <BsThreeDotsVertical className='text-2xl m-3' />
                                    </div>
                                </div>
                                <div className='h-fit w-full px-8'>
                                    <h1 className='text-lg'>{mostLikePost?.postFound?.title}</h1>
                                    <p className='text-sm'>{mostLikePost?.postFound?.description.slice(0, 200)}... <span onClick={() => handleMoreClick(mostLikePost?.postFound?._id)} className='text-sm text-blue-900 font-bold cursor-pointer'>more</span></p>
                                </div>
                                <div className='h-fit w-full flex flex-row justify-end px-8'>
                                    <div className='flex flex-row w-32 justify-around py-4'>
                                        <div className='w-14 h-full flex flex-row flex-wrap '>
                                            <FaRegCommentAlt className='mt-1 text-lg mx-1 hover:text-blue-500' onClick={() => handleMoreClick(mostLikePost?.postFound?._id)}/>
                                            <p className='text-sm'>{mostLikePost?.postFound?.comments.length}</p>
                                        </div>
                                        <div className='h-full w-14 flex flex-row flex-wrap'>
                                            <FaRegHeart className={`mt-1 text-lg mx-1 hover:text-red-600`}/>
                                            <p className='text-sm'>{mostLikePost?.postFound?.likes.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 h-96 overflow-hidden rounded shadow-md w-95vh hover:shadow-xl">
                        <div className="flex justify-between items-center mb-4 ">
                            <h2 className="text-2xl font-semibold">View Forum</h2>
                            <div className="flex space-x-2">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2" onClick={() => handleTagClick()}>
                                    <FaTags />
                                    <span>Add Tags</span>
                                </button>
                                <button className="bg-gray-200 text-black px-4 py-2 rounded flex items-center space-x-2">
                                    <FaFilter />
                                    <span>Filter</span>
                                </button>
                            </div>
                        </div>
                        <div className="overflow-y-auto h-[85%] scrollable-content-y">
                            <table className="min-w-full h-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2">Date</th>
                                        <th className="py-2">FullName</th>
                                        <th className="py-2">Title</th>
                                        <th className="py-2 px-3">Description</th>
                                        <th className="py-2">Tags</th>
                                        <th className="py-2">Likes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isFound && posts?.postFound?.map((post, index) => (
                                        <tr key={index} className="border-t">
                                            <td className="py-2 text-center">{new Date(post?.updatedAt).toLocaleString()}</td>
                                            <td className="py-2 text-center">{post?.user?.fullname}</td>
                                            <td className="py-2 text-center">{post?.title}</td>
                                            <td className="py-3 px-3 text-center w-[48rem]">{post?.description}</td>
                                            <td className="py-2 text-center">
                                                <span className= {`text-black px-2 py-1 rounded-full text-xs ${post?.tag?.color}`}>
                                                    {post?.tag?.name}
                                                </span>
                                            </td>
                                            <td className="py-2">
                                                <div className="h-full flex flex-row flex-wrap content-center justify-center">
                                                    {post?.likes?.length}
                                                    <FaHeart className="text-red-500 ml-2 mt-1" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Modal isOpen={isPostModalOpen} onClose={handleClosePostModal} width='w-8/12' top="top-6">
                    {selectedPostId && <PostDetails postId={selectedPostId}/>}
                </Modal>
                <Modal isOpen={isTagModalOpen} onClose={handleCloseTagModal} width='w-fit' top="top-2">
                    {<AddTag postId={null} />}
                </Modal>
            </div>
        </>
  );
}
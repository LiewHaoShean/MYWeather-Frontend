import { CgFeed } from "react-icons/cg";
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { BiSolidPackage } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllFeedbackAction } from "../../redux/slices/feedback/feedbackSlice";
import Modal from "../forum/model";
import FeedbackDetails from "./feedbackDetails";
import ErrorMsg from "../global/erroMsg";


export default function AdminFeedback(){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchAllFeedbackAction())
    }, [dispatch]);

    const {loading, feedbacks, isFeedbackFetch, error} = useSelector((state)=>state?.feedback);

    //rating count respectively
    // Calculate the rating counts
    const ratingCounts = Array.isArray(feedbacks?.feebackFound) 
        ? feedbacks?.feebackFound?.reduce((acc, feedback) => {
            const rating = feedback.rating;
            acc[rating] = (acc[rating] || 0) + 1;
            return acc;
        }, {1: 0, 2: 0, 3: 0, 4: 0, 5: 0})
        : {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};

    const oneStarCount = ratingCounts[1];
    const twoStarCount = ratingCounts[2];
    const threeStarCount = ratingCounts[3];
    const fourStarCount = ratingCounts[4];
    const fiveStarCount = ratingCounts[5];

    const data = {
        labels: [],
        datasets: [
          {
            data: [oneStarCount, twoStarCount, threeStarCount, fourStarCount, fiveStarCount],
            backgroundColor: ['#3B82F6', '#FF0000', '#FFA500', '#FFFF00', '#32CD32'], // Colors for each section
            hoverBackgroundColor: ['#2563EB', '#E60000', '#FF7F00', '#FFEB00', '#28A745'],
          },
        ],
    };

    const options = {
        plugins: {
          legend: {
            display: false, // Hides the legend
          },
        },
    };


    const StarRating = ({ rating }) => {
        return (
            <div className="py-2 flex flex-row justify-center">
                {[...Array(rating)].map((_, index) => (
                    <FaStar key={index} className="text-3xl text-yellow-300" />
                ))}
            </div>
        );
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);

    const handleMoreClick = (feedbackId) => {
        setSelectedFeedbackId(feedbackId);
        setIsModalOpen(true);
        
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    //average rating count
    const ratingsLst = feedbacks?.feebackFound?.map(feedback=>feedback.rating);

    const sumOfRatings = ratingsLst?.reduce((acc, rating)=> acc + rating, 0);

    const averageRating = sumOfRatings / ratingsLst?.length;
    
    return (
        <>
            {error && <ErrorMsg message={error?.message}/>}
            <div className="h-screen bg-gray-100 flex flex-col pl-6 p-4">
                <h1 className="text-5xl font-bold pl-10 p-2 h-[9%]">Welcome Back, Admin!</h1>
                <div className="bg-gray-200 flex flex-col h-[91%] p-4 px-6">
                    <div className="grid grid-cols-4 h-3/6 gap-4 py-4">
                        <div className="bg-white col-start-1 col-end-2 rounded-lg h-full w-full shadow-md">
                            <div className="grid grid-cols-2 grid-rows-2 h-full w-full gap-2 p-4">
                                <div className="col-start-1 col-end-2 row-start-1 row-end-2 text-3xl font-bold flex flex-col justify-center pl-8">
                                    <h1>Feedback</h1>
                                    <h1>Collected</h1>
                                </div>
                                <div className="col-start-2 col-end-3 row-start-1 row-end-2 h-full w-full flex flex-col justify-center pl-5">
                                    <CgFeed className="text-7xl mt-1"/>
                                </div>
                                <div className="col-start-1 col-end-3 row-start-2 row-end-3 h-full w-full text-center pr-2">
                                    <h1 className="text-7xl font-bold">{feedbacks?.feebackFound?.length}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white col-start-2 col-end-4 rounded-lg flex flex-row shadow-md">
                            <div className="w-full h-full p-4">
                                <h1 className="text-3xl font-bold pl-8">Rating</h1>
                                <div className= "w-full h-5/6 flex justify-center">
                                    <Pie data={data} options={options} />
                                </div>
                            </div>
                            <div className="w-full h-full p-4">
                                <div className="w-full h-full p-4 flex flex-col justify-between py-6">
                                    <div className="w-full flex flex-row ">
                                        <div className="flex flex-row flex-wrap content-center mt-1">
                                            <div className="w-4 h-4 rounded-full bg-blue-600"></div>
                                        </div>
                                        <h1 className="text-2xl px-6 font-bold">1 star</h1>
                                    </div>
                                    <div className="w-full flex flex-row">
                                        <div className="flex flex-row flex-wrap content-center mt-1">
                                            <div className="w-4 h-4 rounded-full bg-red-600"></div>
                                        </div>
                                        <h1 className="text-2xl px-6 font-bold">2 stars</h1>
                                    </div>
                                    <div className="w-full flex flex-row">
                                        <div className="flex flex-row flex-wrap content-center mt-1">
                                            <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                                        </div>
                                        <h1 className="text-2xl px-6 font-bold">3 stars</h1>
                                    </div>
                                    <div className="w-full flex flex-row">
                                        <div className="flex flex-row flex-wrap content-center mt-1">
                                            <div className="w-4 h-4 rounded-full bg-yellow-300"></div>
                                        </div>
                                        <h1 className="text-2xl px-6 font-bold">4 stars</h1>
                                    </div>
                                    <div className="w-full flex flex-row">
                                        <div className="flex flex-row flex-wrap content-center mt-1">
                                            <div className="w-4 h-4 rounded-full bg-green-600"></div>
                                        </div>
                                        <h1 className="text-2xl px-6 font-bold">5 stars</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white col-start-4 col-end-5 rounded-lg flex flex-col shadow-md">
                            <div className="w-full h-2/6 text-center flex items-end justify-center">
                                <BiSolidPackage className="text-7xl"/>
                            </div>
                            <div className="w-full h-fit text-center">
                                <h1 className="text-4xl font-bold">Overall Rating</h1>
                            </div>
                            <div className="w-full h-2/6 text-center flex flex-row flex-wrap justify-center">
                                <h1 className="text-7xl font-bold">{averageRating}</h1>
                                <div className="h-full flex items-center">
                                    <FaStar className="text-5xl flex mb-1 text-yellow-400"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 h-96 overflow-hidden rounded shadow-md w-95vh">
                        <div className="h-1/6 w-full border-b-2">
                            <h1 className="text-3xl font-bold pl-8">View FeedBack</h1>
                        </div>
                        <div className="h-5/6 w-full overflow-hidden">
                            <div className="overflow-y-auto grid grid-cols-4 gap-4 p-4 w-full h-full scrollable-content-y">
                            {isFeedbackFetch && feedbacks?.feebackFound?.map((feedback)=> (
                                
                                    <div className="h-64 w-full bg-white shadow-md rounded-lg flex flex-col px-6 border-2">
                                        <div className="pt-6 pb-0">
                                            <div className="h-fit flex flex-row flex-wrap justify-center p-4 border-2 rounded-lg">
                                                <div className="px-4">
                                                    <img src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' className='h-14 w-14 rounded-full' alt='User Avatar' />
                                                </div>
                                                <div className="">
                                                    <h1 className="text-lg font-semibold">{feedback?.user?.fullname}</h1>
                                                    <p className="text-sm text-center text-slate-400">Joined since 2024</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="py-2 flex flex-row justify-center">
                                            <StarRating rating={feedback?.rating} />
                                        </div>
                                        <div className="w-full h-full flex flex-col justify-between pb-2">
                                            <p className="text-sm">{feedback?.description.slice(0,100)}</p>
                                            <p className="text-xs font-bold text-blue-700 hover:cursor-pointer" onClick={() => handleMoreClick(feedback?._id)}>More...</p>
                                        </div>
                                    </div>                                
                            ))
                            }
                            </div>
                        </div>
                    </div>
                </div>
                <Modal isOpen={isModalOpen} onClose={handleCloseModal} width='w-[35rem]' top="top-4">
                    {selectedFeedbackId && <FeedbackDetails feedbackId={selectedFeedbackId} />}
                </Modal>
            </div>
        </>
    )
}
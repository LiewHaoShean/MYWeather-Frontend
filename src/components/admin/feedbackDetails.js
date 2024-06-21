import { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneFeedbackAction } from "../../redux/slices/feedback/feedbackSlice";


export default function FeedbackDetails({feedbackId}){
    const dispatch = useDispatch();

    console.log(feedbackId);
    useEffect(()=>{
        dispatch(fetchOneFeedbackAction(feedbackId));
    }, [dispatch]);

    const StarRating = ({ rating }) => {
        return (
            <div className="py-2 flex flex-row justify-center">
                {[...Array(rating)].map((_, index) => (
                    <FaStar key={index} className="text-5xl text-yellow-300" />
                ))}
            </div>
        );
    };

    const {loading, error, feedback} = useSelector((state)=>state?.feedback);
    
    return (
        <>
        <div className='max-h-[95vh] w-full bg-white rounded-lg'>
                <div className='h-fit w-full bg-white rounded-lg shadow-md-2 my-4 shadow-black flex flex-col pt-4'>
                    <div className="h-fit w-full bg-white shadow-md rounded-lg flex flex-col px-6">
                        <div className="pt-6 pb-0">
                            <div className="h-full flex flex-row flex-wrap justify-center p-4 border-2 rounded-lg">
                                <div className="px-4">
                                    <img src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' className='h-20 w-20 rounded-full' alt='User Avatar' />
                                </div>
                                <div className="">
                                    <h1 className="text-2xl mt-2 font-semibold">{feedback?.feedbackFound?.user?.fullname}</h1>
                                    <p className="text-sm text-center text-slate-400">Joined since 2024</p>
                                </div>
                            </div>
                        </div>
                        <div className="py-2 flex flex-row justify-center">
                            <StarRating rating={feedback?.feedbackFound?.rating} />
                        </div>
                        <div className="w-full h-full flex flex-col justify-between">
                            <p className="text-lg pb-10 pl-2">{feedback?.feedbackFound?.description.slice(0,100)}</p>
                        </div>
                    </div> 
                </div>
            </div>
        </>
    )
}
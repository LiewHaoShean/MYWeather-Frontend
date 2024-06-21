import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransactionAction, transactionApprovalAction } from "../../redux/slices/payment/paymentSlice";
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { FaArrowTrendUp } from "react-icons/fa6";
import SuccessNotification from "../global/successNotification";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export default function AdminPayment(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {loading, payments, error, isFetched, isApproved, payment} = useSelector((state)=>state?.payment);


    useEffect(()=>{
        dispatch(getAllTransactionAction())
    },[dispatch, isApproved]);

    const totalTrans = payments?.paymentFound?.length;

    console.log(typeof(totalTrans));
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

    //chart data
    const data = {
        labels: ['Jun', 'July', 'Aug', 'Sep', 'Oct'],
        datasets: [
            {
            type: 'bar',
            label: 'Bar Dataset',
            data: [totalTrans, 0, 0, 0, 0],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            yAxisID: 'y',
            },
            {
            type: 'line',
            label: 'Line Dataset',
            data: [totalTrans, 0, 0, 0, 0],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
            yAxisID: 'y1',
            },
        ],
    };
    
    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        scales: {
            y: {
            type: 'linear',
            display: true,
            position: 'left',
            },
            y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
                drawOnChartArea: false,
            },
            },
        },
    };
    //gradual increase animation
    const [count, setCount] = useState(0);
    const target = totalTrans;
    const [earningsCount, setEarningsCount] = useState(0);
    const earnings = payments?.paymentFound?.reduce((acc, payment) => acc + payment?.amount, 0);
    const increment = 1; // Adjust the increment as needed
    const earningsIncrement = 1;
    const duration = 2000; // Duration of the animation in milliseconds
    const earningsDuration = 1;
    const interval = duration / (target / increment);
    const earningInterval = earningsDuration / (earnings/earningsIncrement)

    useEffect(() => {
        const timer = setInterval(() => {
        setCount((prevCount) => {
            const newCount = prevCount + increment;
            if (newCount >= target) {
            clearInterval(timer);
            return target;
            }
            return newCount;
        });
        }, interval);

        return () => clearInterval(timer);
    }, [target, increment, interval]);

    useEffect(() => {
        const timer = setInterval(() => {
        setEarningsCount((prevCount) => {
            const newCount = prevCount + earningsIncrement;
            if (newCount >= earnings) {
            clearInterval(timer);
            return earnings;
            }
            return newCount;
        });
        }, earningInterval);

        return () => clearInterval(timer);
    }, [earnings, earningsIncrement, earningInterval]);

    const onClickHandler = (paymentId) => {
        dispatch(transactionApprovalAction({paymentId}));
        dispatch(getAllTransactionAction)
    };

    return(
        <>
            {/* {error && <ErrorMsg message={error?.message}/>} */}
            {isApproved && <SuccessNotification message={payment?.message} time={5000}/>}
            <div className="h-screen bg-gray-100 flex flex-col pl-6 p-4">
                <h1 className="text-5xl  font-bold p-2 h-[9%]">Welcome Back, Admin!</h1>
                <div className="flex bg-gray-200 flex-col h-[91%] p-4 px-6">
                    <div className="grid grid-cols-4 h-3/6 gap-4 py-4">
                        <div className="bg-white col-start-1 col-end-4 p-4 rounded shadow-md hover:shadow-xl flex flex-row">
                            <div className="h-full w-[40%] ">
                                <h2 className="text-4xl font-bold ml-20">Total Subscribers</h2>
                                <div className="h-28 flex items-end justify-center">
                                    <p className="text-8xl font-bold text-center">{count}</p>
                                </div>
                                <div className="h-20 flex flex-col items-center justify-start">
                                    <p className="text-xl">This month: 2</p>
                                    <div className="flex text-green-500">
                                        <FaArrowTrendUp className="text-xl mt-1 " />
                                        <p>+2.05</p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-64 w-[60%] pt-10">
                                <Bar data={data} options={options}/>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded shadow-md hover:shadow-xl col-start-4 col-end-5 flex flex-row">
                            <div className="h-full w-full">
                                <h2 className="text-4xl font-bold">Total Earnings</h2>
                                <div className="h-28 flex items-end justify-center">
                                    <p className="text-7xl font-bold text-center">${earningsCount}</p>
                                </div>
                                <div className="h-20 flex flex-col items-center justify-start">
                                    <p className="text-xl">This month: $69</p>
                                    <div className="flex text-green-500">
                                        <FaArrowTrendUp className="text-xl mt-1 " />
                                        <p>+2.05</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 h-3/6 overflow-hidden rounded shadow-md w-95vh hover:shadow-xl">
                        <div className="flex justify-between items-center mb-4 mx-4">
                            <h2 className="text-2xl font-semibold ml-6">Transactions</h2>
                            <div className="flex space-x-2 w-96">
                                <div class="relative w-96">
                                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                    </div>
                                    <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Transactions..." required />
                                    <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-y-auto h-[80%] scrollable-content-y mx-4">
                            <table className="min-w-full bg-white">
                                <thead className="border-b-2 border-t-2"> 
                                    <tr className="text-slate-400">
                                        <th className="py-2">Username</th>
                                        <th className="py-2 ">E-mail Address</th>
                                        <th className="py-2">Status</th>
                                        <th className="py-2 px-3">Date</th>
                                        <th className="py-2">Amount(RM)</th>
                                        <th className="py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isFetched && payments?.paymentFound.map((transaction)=>(
                                    <tr className="hover:bg-slate-100">
                                        <td className="py-2 text-center">{transaction?.user?.fullname}</td>
                                        <td className="py-2 text-center">{transaction?.user?.email}</td>
                                        <td className="py-2 text-center">{transaction?.status}</td>
                                        <td className="py-2 text-center">{convertUTCtoMalaysiaTime(transaction?.updatedAt)}</td>
                                        <td className="py-2 text-center">{transaction?.amount}</td>
                                        <td className="py-2 text-center">
                                            {transaction?.status=="pending" ? (
                                                <button onClick={()=>onClickHandler(transaction?._id)}>
                                                    <div className="bg-blue-500 px-4 py-1 rounded-full">
                                                        <h1 className="text-sm">Accept</h1>
                                                    </div>
                                                </button>
                                            ) : (
                                                <button disabled>
                                                    <div className="bg-gray-400 px-4 py-1 rounded-full">
                                                        <h1 className="text-sm text-gray-500">Accept</h1>
                                                    </div>
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                    ))}
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
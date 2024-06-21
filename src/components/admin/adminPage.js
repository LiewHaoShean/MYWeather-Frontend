import React, { useEffect, useState } from "react";
import { FaHeart, FaTags, FaFilter } from "react-icons/fa";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUserAction } from "../../redux/slices/users/userSlice";
import ErrorMsg from "../global/erroMsg";

const generateWaveData = (numPoints) => {
    const data = [];
    for (let i = 0; i < numPoints; i++) {
      const x = i / 4;
      const y = Math.sin(x) + (Math.random() - 0.5) * 0.2; // Adding random variation
      data.push(y);
    }
    return data;
  };

export default function AdminPage(){
    const dispatch = useDispatch();

    const posts = [
        {
          date: "2024-06-09T12:00",
          user: "Ali Aiman",
          title: "Traffic Jam in KL",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          tags: ["Traffic Alert"],
          likes: 40,
        },
        // Add more post objects here if needed
    ];

    const data = {
        labels: Array(50).fill(''),
        datasets: [
          {
            label: 'Wave Line',
            data: generateWaveData(50),
            borderColor: '#3b82f6',
            borderWidth: 2,
            fill: false,
            pointRadius: 0,
            tension: 0.4,
          },
        ],
      };
    
      const options = {
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: { display: false },
          y: { display: false },
        },
      };

      useEffect(()=>{
        dispatch(fetchAllUserAction())
      },[dispatch])

      const {loading, users, error} = useSelector((state)=>state?.users);

      const [premiumCount, setPremiumCount] = useState(0);
    const [normalCount, setNormalCount] = useState(0);

    useEffect(() => {
        const premiumUsers = users?.userFound?.filter(user => user.idPremium).length;
        const normalUsers = users?.userFound?.filter(user => !user.idPremium).length;

        setPremiumCount(premiumUsers);
        setNormalCount(normalUsers);
    }, [users?.userFound]);

    const pieData = {
        labels: ['Premium', 'Non-premium'],
        datasets: [
          {
            data: [((premiumCount/users?.userFound?.length)*100), ((normalCount/users?.userFound?.length)*100)], // Percentage data for the pie chart
            backgroundColor: ['#3B82F6', '#93C5FD'], // Colors for active and inactive
            hoverBackgroundColor: ['#2563EB', '#60A5FA'],
          },
        ],
      };

    return (
        <>
            {error && <ErrorMsg message={error?.message}/>}
            <div className="h-screen bg-gray-100 flex flex-col pl-6 p-4">
                <h1 className="text-5xl font-bold p-2 h-[9%]">Welcome Back, Admin!</h1>
                <div className="bg-gray-200 flex flex-col h-[91%] p-4 px-6">
                    <div className="grid grid-cols-3 h-3/6 gap-4 py-4">
                        <div className="bg-white p-4 rounded col-start-1 col-end-2 shadow-md">
                            <div className="flex flex-col pl-4">
                                <h2 className="text-4xl font-bold p-2">Total Users</h2>
                                <div className="flex flex-row flex-wrap content-center justify-start p-2">
                                    <p className="text-5xl font-bold">{users?.userFound?.length}</p>
                                    <div className="flex flex-row content-center flex-wrap mt-2 text-lg ml-2 font-bold">
                                        <MdKeyboardDoubleArrowUp className="text-green-300"/>
                                        <p className="text-xs text-green-300"> new users(+7%)</p>
                                    </div>
                                </div>
                                <div className="relative w-full h-32 flex flex-row flex-wrap content-center justify-start">
                                    <Line data={data} options={options} />
                                    <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                                        <div className="flex items-center">
                                            <div className="relative">
                                                <div className="absolute top-0 left-6 w-2 h-2 bg-blue-500 rounded-full"></div>
                                                <div className="absolute top-0 right-2 transform translate-x-1/2 -translate-y-1/2 bg-white rounded-md px-2 py-1 shadow-md">
                                                2
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="bg-white p-4 rounded shadow-md col-start-2 col-end-4">
                            <div className="flex flex-row flex-wrap justify-between">
                                <div className="flex flex-col px-4">
                                    <h2 className="text-2xl font-semibold pl-4 p-2">Active User</h2>
                                    <div className="flex flex-col p-2">
                                        <div className="flex flex-col text-2xl">
                                            <h1 className="text-blue-500">Premium User</h1>
                                            <p>{premiumCount} ({((premiumCount/users?.userFound?.length)*100).toFixed(0)}%)</p>
                                        </div>
                                        <div className="flex flex-col text-2xl">
                                            <h1 className="text-red-500">Non-premium User</h1>
                                            <p>{normalCount} ({((normalCount/users?.userFound?.length)*100).toFixed(0)}%)</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-64 w-fit px-40">
                                    <Pie data={pieData} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 h-3/6 overflow-hidden rounded shadow-md w-95vh">
                        <div className="flex justify-between items-center mb-4 mx-4">
                            <h2 className="text-2xl font-semibold pl-4 ml-6">View Registered User</h2>
                            <div className="flex space-x-2 w-96">
                                <div class="relative w-96">
                                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                    </div>
                                    <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Users..." required />
                                    <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                                    </div>
                                </div>
                        </div>
                        <div className="overflow-y-auto h-[80%] scrollable-content-y mx-4">
                            <table className="min-w-full bg-white">
                                <thead className="border-b-2 border-t-2">
                                    <tr>
                                        <th className="py-2">Full Name</th>
                                        <th className="py-2">E-mail Address</th>
                                        <th className="py-2">Age</th>
                                        <th className="py-2">Phone Number</th>
                                        <th className="py-2">isPremium</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users?.userFound?.map((user, index) => (
                                        <tr key={index} className="hover:bg-slate-100">
                                            <td className="py-2 text-center">{user.fullname}</td>
                                            <td className="py-2 text-center">{user?.email}</td>
                                            <td className="py-2 text-center">{user?.age}</td>
                                            <td className="py-2 text-center">{user?.phoneNumber}</td>
                                            <td className="py-2 text-center">{user?.idPremium ? "premium" : "Non-premium"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
  );
}
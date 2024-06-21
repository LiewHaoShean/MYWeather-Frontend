import React from 'react';
import { FaUsers } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { RiDiscussLine } from "react-icons/ri";
import { RiFeedbackFill } from "react-icons/ri";
import { Link, NavLink, Outlet } from 'react-router-dom';
import { RiAdminFill } from "react-icons/ri";
import { BiLogOutCircle } from "react-icons/bi";

const menuContent = [
    {
        name: "User",
        href: "user",
        icon: <FaUsers className="mx-2 text-3xl"/>,
        current: false
    },
    {
        name: "Payment",
        href: "payment",
        icon: <MdOutlinePayment className="mx-2 text-3xl"/>,
        current: false,
    },
    {
        name: "Forum",
        href: "forum",
        icon: <RiDiscussLine className="mx-2 text-3xl"/>,
        current: false,
    },
    {
        name: "Feedback",
        href: "feedback",
        icon: <RiFeedbackFill className='mx-2 text-3xl'/>
    }
]

const AdminNav = () => {
  return (
    <>
        <div className="flex flex-col w-20 hover:w-64 transition-all duration-300 h-screen justify-between bg-gray-800 text-white overflow-hidden group fixed z-50">
            <div className="flex items-center justify-start p-4 h-20 border-b border-gray-700">
                <RiAdminFill className='text-3xl mx-2'/>
                <span className="text-2xl font-semibold hidden group-hover:inline-block text-white">Admin</span>
            </div>
            <div className="flex flex-col mb-48 p-4">
                {menuContent.map((item) => (
                <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) => {
                    return (
                        'text-xl font-semibold w-full h-14 my-2 flex items-center group-hover:justify-items-center ' +
                        (!isActive
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'bg-gray-900 text-white')
                    )
                    }}
                >
                    {item.icon}
                    <span className="hidden group-hover:inline-block ml-2 ">{item.name}</span>
                </NavLink>
                ))}
            </div>
            <div className='p-4 border-t border-gray-700 '>
                <Link to="/">
                    <div className='flex items-center justify-start content-center h-12 hover:bg-gray-700'>
                        <BiLogOutCircle className='text-3xl mx-2 mt-1'/>
                        <span className="text-2xl font-semibold hidden group-hover:inline-block text-white ml-2">Quit</span>
                    </div>
                </Link>
            </div>
        </div>
        <div className='w-11.5/12 ml-20 oveflow-none'>
            <Outlet />
        </div>
    </>
  );
};

export default AdminNav;
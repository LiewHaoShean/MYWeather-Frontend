import Navbar from "../homepage/navbar";
import "../../typingAnimation.css";
import { FaSearch } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import { GoCommentDiscussion } from "react-icons/go";
import { CiStickyNote } from "react-icons/ci";
import { SlLike } from "react-icons/sl";
import { useEffect } from "react";
import "../../index.css";
import { FaRegStar } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";


const menuContent = [
    {
        name: "Forum",
        href: "content",
        icon: <GoCommentDiscussion className="mx-2 text-2xl"/>,
        current: false
    },
    {
        name: "Your Post",
        href: "post",
        icon: <CiStickyNote className="mx-2 text-2xl"/>,
        current: false,
    },
    {
        name: "Your Likes",
        href: "likes",
        icon: <SlLike className="mx-2 text-2xl"/>,
        current: false,
    }
]

export default function ForumPage(){

    useEffect(() => {
        // Add the custom class to the body element
        document.body.style.overflow = 'hidden';
    
        // Cleanup function to remove the class when the component is unmounted
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, []);
      
    return (
        <>
            <Navbar/>
            <div className="h-screen">
                <div className="relative w-full h-2/6 mt-16">
                    <div className="bg-opacity-image absolute inset-0"></div>
                    <div className="w-5/6 m-auto h-full flex flex-col flex-wrap content-center justify-center relative z-10">
                        <div className="mx-auto mt-6 py-3 animated-text">
                            <span className="text-5xl font-inter font-medium"></span>
                        </div>
                        <div className="mx-auto py-3 relative">
                            <input
                                className="w-[52rem] h-14 outline-none pl-14 font-inter text-lg shadow-white shadow-sm"
                                placeholder="Search"
                            />
                            <FaSearch className="absolute top-7 left-4 text-2xl text-slate-400" />
                        </div>
                    </div>
                </div>
                <div className="h-4/6 w-full flex flex-row flex-wrap">
                    <div className="w-1/6 h-full flex flex-col justify-start flex-wrap cotent-center">
                        <div className="h-[38%] w-full flex flex-col flex-wrap content-center">
                            <div className="pl-8">
                                <h1 className="text-xl font-inter font-bold pt-2">Menu</h1>
                            </div>
                            <div className="flex flex-col flex-wrap h-fit w-full justify-start content-start py-2 ">
                                {menuContent.map((item)=> (
                                    <NavLink 
                                        key={item.name}
                                        to={item.href}
                                        className={({
                                            isActive
                                        }) =>{
                                            return (
                                                'text-xl font-semibold w-full px-10 h-12 flex flex-row hover:bg-blue-100 py-2 relative ' +
                                                (!isActive
                                                    ? ''
                                                    : 'bg-blue-100 active-menu')
                                            )
                                        }}
                                        >
                                            {item.icon}
                                            {item.name}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                        <div className="h-[35%] w-full flex flex-row content-center justify-center flex-wrap">
                            <div className="w-[80%] bg-white h-[80%] shadow-sm shadow-black flex flex-col">
                                <div className="flex flex-row w-full flex-wrap content-center px-3 h-2/6">
                                    <FaRegStar  className="mt-1 mx-1 text-yellow-300"/>
                                    <h1>Must-read posts</h1>
                                </div>
                                <div className="h-4/6 px-2 text-sm  text-blue-500 font-bold">
                                    <li>
                                        Selangor Weather Alert at next 2 weeks
                                    </li>
                                    <li>
                                        Malaysia hot weather in 14 areas
                                    </li>
                                </div>
                            </div>
                        </div>
                        <div className="h-[15%] w-full flex flex-row flex-wrap justify-center content-center">
                            <NavLink to="addPost" className="button-89 flex" role="button"><FaPlus className="mt-1"/> POST</NavLink>
                        </div>
                    </div>
                    <div className="h-full w-5/6 bg-slate-50">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}
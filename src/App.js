import logo from './logo.svg';
import './App.css';
import Navbar from './components/homepage/navbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as React from "react";
import Login from './components/forms/signIn';
import Register from './components/forms/signUp';
import WeatherPage from './components/weather/weatherPage';
import AdminPage from './components/admin/adminPage';
import ForumPage from './components/forum/forumPage';
import ForecastPage from './components/forecast/forecastPage';
import HomePage from './components/homepage/homepage';
import Footer from './components/homepage/footer';
import VerifyEmail from './components/forms/verifyEmail';
import ForumContent from './components/forum/forumContent';
import YourPost from './components/forum/yourPost';
import YourLikes from './components/forum/yourLikes';
import AddPost from './components/forum/addPost';
import PostDetails from './components/forum/postDetails';
import AdminNav from './components/admin/adminNav';
import AdminForum from './components/admin/adminForum';
import AdminFeedback from './components/admin/adminFeedback';
import AdminRoute from './components/AuthRoute/AuthRoute';
import PremiumRoute from './components/AuthRoute/PremiumRoute';
import Payment from './components/subscription/payment';
import ScrollToTop from './components/scrollToTop';
import AdminPayment from './components/admin/adminPayment';
import Profile from './components/homepage/profile';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ForgorPassword from './components/forms/forgotPassword';
import ChangePassword from './components/forms/changePassword';

function App() {
  
  return (
    <BrowserRouter>
      <ToastContainer />
        <ScrollToTop/>
        <Routes>  
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/weather' element={<WeatherPage/>}></Route>
          <Route path='/forum' element={<ForumPage/>}>
            <Route path='content' element={<ForumContent/>}></Route>
            <Route path='post' element={<YourPost/>}></Route>
            <Route path='likes' element={<YourLikes/>}></Route>
            <Route path='addPost' element={<AddPost/>}></Route>
            <Route path='postDetails/:postId' element={<PostDetails/>}></Route>
          </Route>
          <Route path='/admin' element={
            <AdminRoute>
              <AdminNav/>
            </AdminRoute>
          }>
            <Route path='user' element={<AdminPage/>}></Route>
            <Route path='forum' element={<AdminForum />}></Route>
            <Route path='feedback' element={<AdminFeedback />}></Route>
            <Route path='payment' element={<AdminPayment />}></Route>
          </Route>
          <Route path='/forecast' element={
            <PremiumRoute >
              <ForecastPage/>
            </PremiumRoute>
            }></Route>
          <Route path='/verify-email/:token' element={<VerifyEmail/>}></Route>
          <Route path='/payment' element={<Payment/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/forgotPassword' element={<ForgorPassword />}></Route>
          <Route path='/changePassword' element={<ChangePassword />}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App;
